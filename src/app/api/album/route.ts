// /app/album/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const password = data.form_password;
  
  // Do your password check logic here



  // Example: redirect or return a response
  if (password === "secret") {
    return NextResponse.redirect(new URL("/album/protected", request.url));
  }
  return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}