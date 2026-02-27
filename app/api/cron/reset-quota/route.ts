import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.user.updateMany({
      data: {
        questionsUsed: 0,
        tokensUsed: 0,
      },
    });

    return NextResponse.json({ message: "Quota reset thành công" });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Có lỗi xảy ra" }, { status: 500 });
  }
}