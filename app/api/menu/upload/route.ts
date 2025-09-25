// app/api/menu/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import streamifier from "streamifier";
import { COOKIE_NAME, verifyAdminToken } from "@/lib/auth"; // adjust path to your lib/auth

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    // --- auth: verify admin cookie ---
    const token = req.cookies.get(COOKIE_NAME)?.value;
    if (!token)
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    try {
      verifyAdminToken(token);
    } catch {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // --- parse uploaded file from multipart/form-data ---
    const form = await req.formData();
    const file = form.get("file") as Blob | null;
    if (!file)
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );

    const buffer = Buffer.from(await file.arrayBuffer());

    // --- upload to Cloudinary ---
    const result: UploadApiResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "menu" }, // optional folder
        (err, res) => {
          if (err) reject(err);
          else resolve(res!);
        }
      );
      streamifier.createReadStream(buffer).pipe(uploadStream);
    });

    return NextResponse.json({ success: true, url: result.secure_url });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : "Upload failed",
      },
      { status: 500 }
    );
  }
}
