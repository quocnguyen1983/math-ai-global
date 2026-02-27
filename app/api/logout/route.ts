import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST() {
  const response = NextResponse.json({ message: "Đã đăng xuất" });

  response.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0), // 👈 Xóa cookie
    path: "/",
  });

  return response;
}