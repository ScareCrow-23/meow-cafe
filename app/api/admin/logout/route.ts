// app/api/admin/logout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "../../../../lib/auth"; // adjust path

export async function POST(req: NextRequest) {
  const res = NextResponse.json({ success: true });
  // expire cookie
  res.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  return res;
}
