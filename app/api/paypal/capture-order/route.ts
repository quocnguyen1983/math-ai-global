import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/paypal";
import paypal from "@paypal/checkout-server-sdk";

export async function POST(req: NextRequest) {
  const { orderID } = await req.json();

  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});

  const capture = await client.execute(request);

  return NextResponse.json({ success: true });
}