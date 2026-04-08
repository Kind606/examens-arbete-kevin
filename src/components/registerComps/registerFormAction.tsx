// src/components/registerComps/registerFormAction.ts
"use server";

import { prisma } from "@/src/lib/prisma";
import { checkRateLimit, RATE_LIMITS } from "@/src/lib/rateLimit";
import bcrypt from "bcryptjs";

export async function registerUser(username: string, password: string) {
  try {
    // Rate limiting by username
    const rateLimitCheck = checkRateLimit(
      `register:${username}`,
      RATE_LIMITS.REGISTER,
    );
    if (rateLimitCheck.limited) {
      return {
        success: false,
        error: "Too many registration attempts. Please try again later.",
      };
    }

    if (!username || !password) {
      return {
        success: false,
        error: "Username and password are required",
      };
    }

    // Validate password strength
    if (password.length < 8) {
      return {
        success: false,
        error: "Password must be at least 8 characters",
      };
    }

    const exsistingUser = await prisma.user.findUnique({ where: { username } });
    if (exsistingUser) {
      return {
        success: false,
        error: "Username already taken",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return {
      success: true,
      data: {
        id: user.id,
        username: user.username,
      },
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}
