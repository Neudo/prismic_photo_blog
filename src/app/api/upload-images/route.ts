import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import * as prismic from '@prismicio/client'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const destination = formData.get('destination') as string
    const targetId = formData.get('targetId') as string
    const images = formData.getAll('images') as File[]

    if (!images || images.length === 0) {
      return NextResponse.json(
        { error: 'No images provided' },
        { status: 400 }
      )
    }

    if (!destination || !targetId) {
      return NextResponse.json(
        { error: 'Destination and target ID are required' },
        { status: 400 }
      )
    }

    // Initialize Prismic client
    const repositoryName = 'alainbphoto'
    const client = prismic.createClient(repositoryName, {
      accessToken: process.env.PRISMIC_ACCESS_TOKEN
    })

    // Get the document to update
    const documentType = destination === 'album' ? 'album' : 'categorie'
    let document
    
    try {
      document = await client.getByUID(documentType, targetId)
    } catch (error) {
      return NextResponse.json(
        { error: `Document ${documentType}/${targetId} not found` },
        { status: 404 }
      )
    }

    const uploadedAssets = []
    let prismicErrors = []
    
    // Phase 1: Upload images to Prismic Media Library
    for (let i = 0; i < images.length; i++) {
      const image = images[i]
      const modelName = formData.get(`modelName_${i}`) as string || ''
      
      const timestamp = Date.now()
      const random = Math.random().toString(36).substring(2, 9)
      const extension = path.extname(image.name)
      
      let filename: string
      if (modelName) {
        const sanitizedModelName = modelName.replace(/[^a-zA-Z0-9-_]/g, '_')
        filename = `${sanitizedModelName}_${timestamp}-${random}${extension}`
      } else {
        filename = `${timestamp}-${random}${extension}`
      }
      
      // No local save needed in production - direct upload to Prismic only

      // Upload to Prismic Media Library
      try {
        console.log(`Uploading ${filename} to Prismic Media Library...`)
        
        const imageFormData = new FormData()
        imageFormData.append('file', image)

        const uploadResponse = await fetch(
          `https://asset-api.prismic.io/assets`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.PRISMIC_WRITE_API}`,
              'repository': repositoryName
            },
            body: imageFormData
          }
        )

        if (uploadResponse.ok) {
          const uploadResult = await uploadResponse.json()
          console.log(`Successfully uploaded ${filename} to Prismic:`, uploadResult.url)
          
          uploadedAssets.push({
            ...uploadResult,
            modelName,
            filename
          })
        } else {
          const errorText = await uploadResponse.text()
          console.error(`Failed to upload ${filename} to Prismic:`, uploadResponse.status, errorText)
          prismicErrors.push(`${filename}: ${uploadResponse.status} ${errorText}`)
        }
      } catch (uploadError: any) {
        console.error(`Error uploading ${filename} to Prismic:`, uploadError.message)
        prismicErrors.push(`${filename}: ${uploadError.message}`)
      }
    }

    // Phase 2: Update Prismic document with new images (if uploads succeeded)
    let documentUpdateSuccess = false
    
    if (uploadedAssets.length > 0) {
      try {
        console.log(`Updating ${documentType} ${targetId} with ${uploadedAssets.length} new images...`)
        
        // Prepare the document data
        const updatedData: any = { ...document.data }
        
        if (!updatedData.slices) {
          updatedData.slices = []
        }
        
        // Find the Images slice
        let imagesSlice = updatedData.slices.find((slice: any) => slice.slice_type === 'images')
        
        if (!imagesSlice) {
          // Create new Images slice if it doesn't exist
          imagesSlice = {
            slice_type: 'images',
            slice_label: null,
            id: `images$${crypto.randomUUID()}`,
            variation: 'default',
            version: '1.0.0',
            primary: {},
            items: []
          }
          updatedData.slices.push(imagesSlice)
        }
        
        
        // Clean existing items and preserve model_name
        imagesSlice.items = imagesSlice.items.map((item: any) => ({
          image: item.image,
          model_name: item.model_name || null
        }))
        
        // Add new images to the slice
        for (const asset of uploadedAssets) {
          const newItem = {
            image: {
              dimensions: {
                width: asset.width || 800,
                height: asset.height || 600
              },
              alt: null,
              copyright: null,
              url: asset.url,
              id: asset.id,
              edit: {
                x: 0,
                y: 0,
                zoom: 1,
                background: "transparent"
              }
            },
            model_name: asset.modelName || null
          }
          
          imagesSlice.items.push(newItem)
        }

        // Update document using Migration API
        const updateResponse = await fetch(
          `https://migration.prismic.io/documents/${document.id}`,
          {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${process.env.PRISMIC_WRITE_API}`,
              'Content-Type': 'application/json',
              'repository': repositoryName
            },
            body: JSON.stringify({
              uid: document.uid,
              data: updatedData
            })
          }
        )

        if (updateResponse.ok) {
          const updateResult = await updateResponse.json()
          console.log('Document update successful:', updateResult)
          documentUpdateSuccess = true
        } else {
          const updateError = await updateResponse.text()
          console.error('Failed to update document:', updateResponse.status, updateError)
          prismicErrors.push(`Document update failed: ${updateResponse.status} ${updateError}`)
        }

      } catch (updateError: any) {
        console.error('Error updating Prismic document:', updateError.message)
        prismicErrors.push(`Document update error: ${updateError.message}`)
      }
    }

    const targetType = destination === 'album' ? 'Album' : 'Catégorie'
    const documentTitle = document.data.meta_title || 
      (destination === 'categorie' && 'name' in document.data ? document.data.name : null) || 
      targetId

    return NextResponse.json({
      success: true,
      count: images.length,
      prismicUploaded: uploadedAssets.length,
      documentUpdated: documentUpdateSuccess,
      prismicErrors: prismicErrors.length > 0 ? prismicErrors : undefined,
      destination: `${targetType}: ${documentTitle}`,
      message: documentUpdateSuccess && uploadedAssets.length > 0
        ? `${uploadedAssets.length} images ajoutées à "${documentTitle}" dans Prismic.`
        : prismicErrors.length === 0
        ? `${images.length} images uploadées vers Prismic.`
        : `${images.length} images traitées. ${prismicErrors.length} erreurs Prismic.`,
      debug: {
        repositoryName,
        documentType,
        documentId: document.id,
        hasReadToken: !!process.env.PRISMIC_ACCESS_TOKEN,
        hasWriteToken: !!process.env.PRISMIC_WRITE_API,
        uploadedAssets: uploadedAssets.length,
        documentUpdateSuccess
      }
    })

  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Error uploading images: ' + (error.message || 'Unknown error') },
      { status: 500 }
    )
  }
}

// Configure Next.js to handle larger file uploads
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb'
    }
  }
}