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
    // ================= UPDATE DATABASE =================

const orderCode = BigInt((webhookData as any).orderCode);
const status = (webhookData as any).status;

 const code = (webhookData as any).code;

if (code === "00") {
  console.log("💰 Payment confirmed for order:", orderCode.toString());

  // Tìm order trong DB
  const order = await prisma.order.findUnique({
    where: { orderCode },
  });

  if (order) {
    // Update trạng thái order
    await prisma.order.update({
      where: { orderCode },
      data: { status: "paid" },
    });

    // Update user plan
    await prisma.user.update({
      where: { id: order.userId },
      data: {
        plan: order.plan,
        questionsUsed: 0,
        tokensUsed: 0,
        monthlyResetAt: new Date(),
      },
    });

    console.log("🚀 User upgraded to:", order.plan);
  } else {
    console.log("❌ Order not found in DB");
  }
}

// ====================================================
    return new Response("OK", { status: 200 });

  } catch (error) {
    console.error("❌ Webhook error:", error);

    // QUAN TRỌNG: luôn trả về 200
    return new Response("OK", { status: 200 });
  }
}