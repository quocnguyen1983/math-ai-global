import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {

  const form = await req.formData()
  const id = form.get("id") as string

  await prisma.user.delete({
    where: { id }
  })

  return NextResponse.redirect(new URL("/admin/users", req.url))
}