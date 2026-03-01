import { NextResponse } from "next/server";
import { PayOS } from "@payos/node";
import prisma from "@/lib/prisma";
import { getUserFromToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const payos = new PayOS({
  clientId: process.env.PAYOS_CLIENT_ID!,
  apiKey: process.env.PAYOS_API_KEY!,
  checksumKey: process.env.PAYOS_CHECKSUM_KEY!,
});
    const user = await getUserFromToken(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { plan, amount } = await req.json();

    const orderCode = Date.now();

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        plan,
        amount,
        orderCode: BigInt(orderCode)
      }
    });

    const paymentLink = await payos.paymentRequests.create({
  orderCode: orderCode,
  amount: amount,
  description: `Nang cap goi ${plan}`,
  returnUrl: "https://toanlop12-ai-production.up.railway.app/payment-success",
  cancelUrl: "https://toanlop12-ai-production.up.railway.app/payment-cancel",
});

    return NextResponse.json({ checkoutUrl: paymentLink.checkoutUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}