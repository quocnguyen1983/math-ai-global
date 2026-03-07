import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export async function POST(req: NextRequest) {
 // ✅ Lấy token từ cookie (CÁCH ĐÚNG)
const token = req.cookies.get("token")?.value;

if (!token) {
  return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
}

// ✅ Verify token
let decoded: any;

try {
  decoded = jwt.verify(token, process.env.JWT_SECRET!);
} catch (err) {
  return NextResponse.json({ error: "Token không hợp lệ" }, { status: 401 });
}

// ✅ Lấy user từ database
const user = await prisma.user.findUnique({
  where: { id: (decoded as any).id },
});

if (!user) {
  return NextResponse.json({ error: "User không tồn tại" }, { status: 404 });
}
  try {
    const { message } = await req.json();
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
  role: "system",
  content: `
Bạn là AI toán học.
Khi viết công thức toán, LUÔN đặt công thức trong dấu $$ $$.
Ví dụ:
$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$
Bạn là trợ lý toán học cho học sinh lớp 12.

Khi bài toán có hàm số, hãy luôn viết rõ dạng:

y = ...

Ví dụ:
y = x^2 - 3x + 1

Luôn trình bày lời giải rõ ràng từng bước.
Khi viết công thức toán hoặc bảng Latex phải đặt trong:

$$
...
$$
$$
\begin{matrix}{c|c}
x & y \\
-2 & -35 \\
-1 & -7 \\
0 & -1 \\
1 & 1 \\
2 & 17
\end{array}
$$
`
},
        { role: "user", content: message },
      ],
    });
    const usedTokens = completion.usage?.total_tokens || 0;

await prisma.user.update({
  where: { id: user.id },
  data: {
    questionsUsed: { increment: 1 },
    tokensUsed: { increment: usedTokens },
  },
});
    return NextResponse.json({
  reply: completion.choices[0].message.content,
});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ reply: "Có lỗi xảy ra." });
  }
}
