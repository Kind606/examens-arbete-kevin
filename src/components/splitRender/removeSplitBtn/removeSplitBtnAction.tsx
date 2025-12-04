"use server";

import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export async function removeSplitAction(splitId: string, userId: string) {
  // First, delete all days for this split
  await prisma.day.deleteMany({
    where: { splitId },
  });

  // Now delete the split itself
  const deletedSplit = await prisma.split.deleteMany({
    where: {
      id: splitId,
      userId: userId,
    },
  });

  return deletedSplit;
}
