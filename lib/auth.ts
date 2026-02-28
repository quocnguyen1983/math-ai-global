import jwt from "jsonwebtoken";
import prisma from "./prisma";

export async function getUserFromToken(req: Request) {
  const cookie = req.headers.get("cookie");
  if (!cookie) return null;

  const token = cookie
    .split("; ")
    .find((c) => c.startsWith("token="))
    ?.split("=")[1];

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    return user;
  } catch {
    return null;
  }
}