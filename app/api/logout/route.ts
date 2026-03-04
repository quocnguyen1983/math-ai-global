import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST() {

  const response = NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_APP_URL));

  response.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return response;

}