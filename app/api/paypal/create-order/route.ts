import { NextResponse } from "next/server";
import client from "@/lib/paypal";
import paypal from "@paypal/checkout-server-sdk";

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

    const request = new paypal.orders.OrdersCreateRequest();

    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: amount.toString(),
          },
        },
      ],
    });

    const order = await client.execute(request);

    return NextResponse.json({ id: order.result.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error creating order" }, { status: 500 });
  }
}