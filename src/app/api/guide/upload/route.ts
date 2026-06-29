import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization");
    const formData = await request.formData();

    const response = await fetch(`${API_URL}/guides/upload`, {
      method: "POST",
      headers: {
        ...(token && { Authorization: token }),
      },
      body: formData,
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error uploading guide image:", error);
    return NextResponse.json({ success: false, message: "Failed to upload image" }, { status: 500 });
  }
}
