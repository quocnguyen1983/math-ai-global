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
      content: `Bạn là giáo viên toán. Hãy giải bài toán từng bước rõ ràng.
Các công thức toán phải viết bằng LaTeX giữa $$ $$.
Ví dụ: $$x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$$.
Không dùng \\[ \\].`,
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