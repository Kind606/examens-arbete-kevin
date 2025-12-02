"use server";

import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export async function addSplitAction(title: string, userId: string) {
  if (!userId) throw new Error("User ID is required");

  const slug =
    title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  const split = await prisma.split.create({
    data: {
      title,
      slug,
      userId,
    },
  });

  return {
    id: split.id,
    title: split.title,
    slug: split.slug,
    createdAt: split.createdAt.toISOString(),
  };
}
