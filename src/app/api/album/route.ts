import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/prismicio";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const password = data.form_password;

  const client = createClient();
  const albums = await client.getAllByType("album");

  // Find the album with the matching password
  const album = albums.find(
    (album) => album.data?.album_password === password
  );

  if (album && album.url) {
    // Ensure the URL is absolute for NextResponse.redirect
    const cookieName = `album_access_${album.uid}`;
    const response = NextResponse.redirect(new URL(album.url, request.url));
    response.cookies.set(cookieName, "true", { path: `/album/${album.uid}` });
    return response;
  }

  return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}