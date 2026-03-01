import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { PayOS } from "@payos/node";

export async function POST(req: Request) {
  console.log("🔥 PAYOS WEBHOOK HIT");

  const payos = new PayOS({
    clientId: process.env.PAYOS_CLIENT_ID!,
    apiKey: process.env.PAYOS_API_KEY!,
    checksumKey: process.env.PAYOS_CHECKSUM_KEY!,
  });

  try {
    const body = await req.json();

    const webhookData = await payos.webhooks.verify(body);

    if (!webhookData) {
      return new Response("Invalid signature", { status: 400 });
    }

    console.log("✅ Webhook verified:", webhookData);

    return new Response("OK", { status: 200 });

  } catch (error) {
    console.error("❌ Webhook error:", error);

    // QUAN TRỌNG: luôn trả về 200
    return new Response("OK", { status: 200 });
  }
}