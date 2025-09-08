import { NextRequest, NextResponse } from "next/server";
import * as prismic from "@prismicio/client";

// Helper function to extract title from different document types
function getDocumentTitle(document: any): string {
  const data = document.data;

  // Check for different title field patterns based on document type
  if (data.title) {
    // For blog, blog_post, page, gallery documents that have a 'title' field
    return Array.isArray(data.title)
      ? data.title[0]?.text || "Untitled"
      : data.title;
  }

  if (data.name) {
    // For categorie documents that have a 'name' field
    return data.name;
  }

  if (data.site_title) {
    // For settings documents that have a 'site_title' field
    return data.site_title;
  }

  // Fallback to meta_title or document UID
  return data.meta_title || document.uid || "Untitled";
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const typeParam = searchParams.get("type") || "album";
    const uid = searchParams.get("uid") || "veronique_sylvain"; // Default to test album

    // Define valid document types
    const validTypes = [
      "about",
      "page",
      "album",
      "categorie",
      "blog",
      "blog_post",
      "contact",
      "gallery",
      "recette",
      "settings",
    ] as const;
    type ValidDocumentType = (typeof validTypes)[number];

    // Validate and cast the type
    const type: ValidDocumentType = validTypes.includes(
      typeParam as ValidDocumentType,
    )
      ? (typeParam as ValidDocumentType)
      : "album";

    const repositoryName = "alainbphoto";
    const client = prismic.createClient(repositoryName, {
      accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    });

    const document = await client.getByUID(type, uid);

    console.log("Document structure:", JSON.stringify(document.data, null, 2));

    // Check if the document has slices (some document types like 'settings' don't have slices)
    const hasSlices = "slices" in document.data;

    // Analyze the slices structure
    const analysis = {
      documentInfo: {
        id: document.id,
        uid: document.uid,
        type: document.type,
        title: getDocumentTitle(document),
        hasSlices,
      },
      slicesCount: hasSlices ? (document.data as any).slices?.length || 0 : 0,
      slices: hasSlices
        ? (document.data as any).slices?.map((slice: any, index: number) => ({
            index,
            slice_type: slice.slice_type,
            slice_label: slice.slice_label,
            primaryFields: Object.keys(slice.primary || {}),
            itemsCount: slice.items?.length || 0,
            firstItem: slice.items?.[0] || null,
            sampleItemStructure: slice.items?.[0]
              ? Object.keys(slice.items[0])
              : [],
          })) || []
        : [],
    };

    return NextResponse.json(analysis);
  } catch (error: any) {
    console.error("Analysis error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
