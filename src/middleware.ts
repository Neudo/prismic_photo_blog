import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Add a new header x-current-path which passes the path to downstream components
  const { pathname } = request.nextUrl;
  const albumSlugMatch = pathname.match(/^\/album\/([^\/]+)/);
  const headers = new Headers(request.headers);
  headers.set("x-current-path", request.nextUrl.pathname);
  
  if (albumSlugMatch) {
    const slug = albumSlugMatch[1];
    const cookieName = `album_access_${slug}`;
    const hasAccess = request.cookies.get(cookieName)?.value === "true";

    if (!hasAccess) {
      // Redirect to album password page
      return NextResponse.redirect(new URL("/album", request.url));
    }
  }
  return NextResponse.next({ headers });

}


export const config = {
  matcher: [
    // match all routes except static files and APIs
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
