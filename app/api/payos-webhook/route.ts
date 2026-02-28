import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { PayOS } from "@payos/node";

export async function POST(req: Request) {
  const payos = new PayOS({
  clientId: process.env.PAYOS_CLIENT_ID!,
  apiKey: process.env.PAYOS_API_KEY!,
  checksumKey: process.env.PAYOS_CHECKSUM_KEY!,
});
  const body = await req.json();

  // ✅ verify chữ ký
  const webhookData = await payos.webhooks.verify(body);

  if (!webhookData) {
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  const { orderCode } = webhookData;

  const order = await prisma.order.findUnique({
    where: { orderCode },
  });

  if (!order) {
    return NextResponse.json(
      { error: "Order not found" },
      { status: 404 }
    );
  }

  await prisma.order.update({
    where: { id: order.id },
    data: { status: "PAID" },
  });

  await prisma.user.update({
    where: { id: order.userId },
    data: {
      plan: order.plan,
    },
  });

  return NextResponse.json({ success: true });
}