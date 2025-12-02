"use server";

import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export async function fetchUserSplits(userId: string) {
  try {
    const splits = await prisma.split.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return splits.map((split) => ({
      id: split.id,
      title: split.title,
      slug: split.slug,
      userId: split.userId,
      createdAt: split.createdAt,
    }));
  } catch (err) {
    console.error("Error fetching splits:", err);
    throw new Error("Failed to fetch splits");
  }
}
