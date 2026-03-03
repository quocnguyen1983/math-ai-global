import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Thiếu thông tin" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "Support <onboarding@resend.dev>",
      to: process.env.EMAIL_USER!, // email admin
      subject: "Yêu cầu hỗ trợ mới",
      html: `
        <h2>Yêu cầu hỗ trợ</h2>
        <p><b>Họ tên:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Nội dung:</b></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Lỗi gửi email" },
      { status: 500 }
    );
  }
}