"use server";

import { prisma } from "@/src/lib/prisma";
import { checkRateLimit, RATE_LIMITS } from "@/src/lib/rateLimit";
import { AuthUser } from "@/src/types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// Enforce JWT_SECRET is set - no fallback to weak default
if (!process.env.JWT_SECRET) {
  throw new Error(
    "JWT_SECRET environment variable is not set. Please configure it in your .env file.",
  );
}
const JWT_SECRET: string = process.env.JWT_SECRET;

interface JwtPayload {
  id: string;
  username: string;
}

export async function loginUser(
  username: string,
  password: string,
): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
  // Rate limiting by username to prevent brute force
  const rateLimitCheck = checkRateLimit(`login:${username}`, RATE_LIMITS.LOGIN);
  if (rateLimitCheck.limited) {
    return {
      success: false,
      error: "Too many login attempts. Please try again later.",
    };
  }

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    return { success: false, error: "Invalid credentials" };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return { success: false, error: "Invalid credentials" };
  }

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: "1d",
  });

  await prisma.user.update({
    where: { id: user.id },
    data: { token },
  });

  // Set secure cookie server-side
  const cookieStore = await cookies();
  cookieStore.set("auth_token", token, {
    httpOnly: true, // Prevents XSS attacks
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    sameSite: "strict", // CSRF protection
    maxAge: 86400, // 1 day
    path: "/",
  });

  return {
    success: true,
    user: { id: user.id, username: user.username, token },
  };
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
