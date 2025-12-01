"use server";

import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

/**
 * Edit a split title
 * @param splitId - ID of the split to edit
 * @param newTitle - New title for the split
 * @param userId - ID of the currently logged-in user
 */
export async function editSplitAction(
  splitId: string,
  newTitle: string,
  userId: string
) {
  // Only update the split if it belongs to this user
  const split = await prisma.split.updateMany({
    where: {
      id: splitId,
      userId: userId,
    },
    data: {
      title: newTitle,
    },
  });

  if (split.count === 0) {
    throw new Error("Split not found or you are not allowed to edit it");
  }

  return {
    id: splitId,
    title: newTitle,
  };
}
