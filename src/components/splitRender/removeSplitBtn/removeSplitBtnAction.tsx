"use server";

import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

/**
 * Remove a split
 * @param splitId - ID of the split to remove
 * @param userId - ID of the currently logged-in user
 */
export async function removeSplitAction(splitId: string, userId: string) {
  // Only delete the split if it belongs to this user
  const split = await prisma.split.deleteMany({
    where: {
      id: splitId,
      userId: userId,
    },
  });

  if (split.count === 0) {
    throw new Error("Split not found or you are not allowed to delete it");
  }

  return true;
}
