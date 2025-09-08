import { NextResponse } from "next/server";
import { createClient } from "@/prismicio";

export async function GET() {
  try {
    const client = createClient();
    const categories = await client.getAllByType("categorie");

    const categoriesList = categories.map((category) => ({
      uid: category.uid,
      title: category.data.name || category.uid,
      id: category.id,
    }));

    return NextResponse.json(categoriesList);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}
