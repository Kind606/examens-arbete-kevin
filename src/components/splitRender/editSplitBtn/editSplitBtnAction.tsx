"use server";

import { PrismaClient } from "@/generated/prisma/client";
import { slugify } from "@/src/utils/slugify";

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
  userId: string,
) {
  const newSlug = slugify(newTitle);

  const split = await prisma.split.updateMany({
    where: {
      id: splitId,
      userId: userId,
    },
    data: {
      title: newTitle,
      slug: newSlug,
    },
  });

  if (split.count === 0) {
    throw new Error("Split not found or you are not allowed to edit it");
  }

  return {
    id: splitId,
    title: newTitle,
    slug: newSlug,
  };
}
