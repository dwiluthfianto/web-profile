import { getStoredFileAction } from "@/lib/neon.actions";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ fileId: string }> }
) {
  const { fileId } = await params;
  if (!fileId) {
    return new NextResponse("Not Found", { status: 404 });
  }

  try {
    const file = await getStoredFileAction(fileId);
    if (!file) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return new NextResponse(new Uint8Array(file.buffer), {
      headers: {
        "Content-Type": file.contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (e) {
    console.error("Failed to load file:", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
