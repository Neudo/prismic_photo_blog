# Intégration Prismic API - Guide Complet

## 📋 Prérequis pour l'intégration Prismic

Pour envoyer des images directement sur Prismic via l'API, vous devez :

### 1. Obtenir un Token d'Accès Permanent

1. Connectez-vous à votre dashboard Prismic
2. Allez dans **Settings** > **API & Security**
3. Créez un nouveau **Permanent Access Token** avec permissions d'écriture
4. Ajoutez le token dans votre fichier `.env` :
```env
PRISMIC_ACCESS_TOKEN=your-permanent-token-here
PRISMIC_REPOSITORY_NAME=starter-blog-photo
```

### 2. Utiliser l'API Migration de Prismic

L'API Migration permet de créer et modifier des documents. Voici les étapes :

#### Installation du client Migration
```bash
npm install @prismicio/client @prismicio/migrate
```

#### Exemple de code pour uploader des images vers Prismic

```typescript
// src/app/api/upload-to-prismic/route.ts
import { createClient } from '@prismicio/client'
import * as prismic from '@prismicio/client'
import { PrismicDocument } from '@prismicio/types'

export async function uploadToPrismic(
  images: File[],
  documentId: string,
  documentType: 'album' | 'categorie'
) {
  const client = createClient(process.env.PRISMIC_REPOSITORY_NAME!, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN
  })

  // 1. Upload images to Prismic Media Library
  const uploadedImages = []
  for (const image of images) {
    const formData = new FormData()
    formData.append('file', image)
    
    const response = await fetch(
      `https://${process.env.PRISMIC_REPOSITORY_NAME}.prismic.io/assets`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.PRISMIC_ACCESS_TOKEN}`,
          'Repository': process.env.PRISMIC_REPOSITORY_NAME!
        },
        body: formData
      }
    )
    
    const uploadedImage = await response.json()
    uploadedImages.push(uploadedImage)
  }

  // 2. Update the document with new images
  const document = await client.getByUID(documentType, documentId)
  
  // Add images to the appropriate slice
  // This depends on your document structure
  const updatedSlices = [...document.data.slices]
  
  // Find or create an Images slice
  let imagesSlice = updatedSlices.find(slice => slice.slice_type === 'images')
  if (!imagesSlice) {
    imagesSlice = {
      slice_type: 'images',
      slice_label: null,
      items: [],
      primary: {}
    }
    updatedSlices.push(imagesSlice)
  }
  
  // Add new images to the slice
  for (const img of uploadedImages) {
    imagesSlice.items.push({
      image: {
        url: img.url,
        alt: img.alt || '',
        dimensions: img.dimensions
      }
    })
  }

  // 3. Update document via Migration API
  const migration = prismic.createMigration()
  
  migration.updateDocument(document, {
    ...document.data,
    slices: updatedSlices
  })
  
  await migration.commit({
    repository: process.env.PRISMIC_REPOSITORY_NAME!,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN!
  })
}
```

## 🗑️ Gestion de la Suppression d'Images

### Option 1: Intégration dans Prismic (Recommandé)

1. Utilisez l'interface Prismic pour gérer les contenus
2. Installez Slice Machine pour une gestion locale
3. Les modifications se synchronisent automatiquement

### Option 2: API de Suppression

```typescript
// src/app/api/delete-image/route.ts
export async function DELETE(request: Request) {
  const { documentId, documentType, imageUrl } = await request.json()
  
  const client = createClient(process.env.PRISMIC_REPOSITORY_NAME!, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN
  })
  
  // Get the document
  const document = await client.getByUID(documentType, documentId)
  
  // Remove image from slices
  const updatedSlices = document.data.slices.map(slice => {
    if (slice.slice_type === 'images') {
      return {
        ...slice,
        items: slice.items.filter(item => item.image.url !== imageUrl)
      }
    }
    return slice
  })
  
  // Update document
  const migration = prismic.createMigration()
  migration.updateDocument(document, {
    ...document.data,
    slices: updatedSlices
  })
  
  await migration.commit({
    repository: process.env.PRISMIC_REPOSITORY_NAME!,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN!
  })
}
```

## 🔐 Sécurité

- **Ne jamais exposer** le token Prismic côté client
- Toujours valider les permissions côté serveur
- Utiliser des variables d'environnement pour les credentials
- Implémenter une authentification robuste pour les pages d'administration

## 📚 Ressources

- [Documentation API Migration Prismic](https://prismic.io/docs/migration-api)
- [Documentation Media API](https://prismic.io/docs/media-api)
- [Client JavaScript Prismic](https://prismic.io/docs/technical-reference/prismicio-client)

## ⚠️ Limitations

- La Media Library Prismic a des limites de taille (10MB par image)
- Les quotas API dépendent de votre plan Prismic
- Les modifications via API Migration peuvent prendre quelques secondes pour se propager

## 💡 Alternative: Cloudinary ou AWS S3

Pour une gestion plus avancée des images, considérez :
- **Cloudinary** : Transformation d'images à la volée, CDN intégré
- **AWS S3** : Stockage illimité, intégration avec CloudFront
- **Vercel Blob** : Solution simple pour projets Next.js sur Vercel