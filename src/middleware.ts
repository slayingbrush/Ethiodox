import { NextRequest, NextResponse } from "next/server";
import { verifySanctuarySession } from "@/lib/sanctuary-auth";

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE ?? "";
const COOKIE_NAME = "ethiodox_admin_session";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const { pathname } = req.nextUrl;

  // Allow the login page itself to render (so user can enter passcode)
  if (pathname === "/sanctuary") {
    return NextResponse.next();
  }

  // Sub-routes require valid auth cookie
  const session = token ? await verifySanctuarySession(token, ADMIN_PASSCODE) : null;
  if (!session) {
    const loginUrl = new URL("/sanctuary", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Editors can only access their blog workspace and profile page.
  const isEditorAllowedPath =
    pathname.startsWith("/sanctuary/blogs") || pathname.startsWith("/sanctuary/profile");
  if (session.role === "writer" && !isEditorAllowedPath) {
    const writerHome = new URL("/sanctuary/blogs", req.url);
    return NextResponse.redirect(writerHome);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/sanctuary/:path*"],
};
