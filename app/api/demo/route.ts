import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { question } = await req.json();

  const completion = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    {
      role: "system",
      content: `Bạn là giáo viên Toán.

Yêu cầu:

- Giải chi tiết từng bước
- Tất cả công thức phải viết bằng LaTeX
- Công thức phải đặt trong $$ $$

Ví dụ:

$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

Không viết dạng text như:

x = (-b ± sqrt(...)) / 2a`,
    },
    {
      role: "user",
      content: question,
    },
  ],
});

  return NextResponse.json({
    answer: completion.choices[0].message.content,
  });
}