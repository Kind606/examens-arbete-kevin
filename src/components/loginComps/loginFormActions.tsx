"use server";

import { PrismaClient } from "@/generated/prisma/client";
import { AuthUser } from "@/src/types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

interface JwtPayload {
  id: string;
  username: string;
}

export async function loginUser(
  username: string,
  password: string
): Promise<AuthUser | null> {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return null;

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return null;

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: "1d",
  });

  await prisma.user.update({
    where: { id: user.id },
    data: { token },
  });

  return { id: user.id, username: user.username, token };
}

export async function verifyToken(token: string): Promise<AuthUser | null> {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
    });

    if (!user) return null;

    return { id: user.id, username: user.username, token };
  } catch (err) {
    console.error("JWT verification error:", err);
    return null;
  }
}
