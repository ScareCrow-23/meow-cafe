// app/api/admin/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  signAdminToken,
  verifyAdminCredentials,
  COOKIE_NAME,
  COOKIE_MAX_AGE,
} from "../../../../lib/auth"; // adjust path as needed

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Missing email or password" },
        { status: 400 }
      );
    }

    const ok = await verifyAdminCredentials(email, password);
    if (!ok) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = signAdminToken({ email });

    const res = NextResponse.json({ success: true });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });

    return res;
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : "Unexpected error",
      },
      { status: 500 }
    );
  }
}
