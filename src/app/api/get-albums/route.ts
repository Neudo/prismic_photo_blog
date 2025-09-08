import { NextResponse } from "next/server";
import { createClient } from "@/prismicio";

export async function GET() {
  try {
    const client = createClient();
    const albums = await client.getAllByType("album");

    const albumsList = albums.map((album) => ({
      uid: album.uid,
      title: album.data.meta_title || album.uid,
      id: album.id,
    }));

    return NextResponse.json(albumsList);
  } catch (error) {
    console.error("Error fetching albums:", error);
    return NextResponse.json(
      { error: "Failed to fetch albums" },
      { status: 500 },
    );
  }
}
