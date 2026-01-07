// src/components/registerComps/registerFormAction.ts
"use server";

import { PrismaClient } from "@/generated/prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function registerUser(username: string, password: string) {
  try {
    if (!username || !password) {
      return {
        success: false,
        error: "Username and password are required",
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
