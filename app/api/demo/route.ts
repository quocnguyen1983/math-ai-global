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
        content:
      
"Bạn là giáo viên toán. Hãy giải bài toán chi tiết từng bước. Nếu có công thức toán hãy viết bằng LaTeX giữa $$ $$.",
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