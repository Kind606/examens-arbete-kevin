"use server";

import { prisma } from "@/src/lib/prisma";
import { checkRateLimit, RATE_LIMITS } from "@/src/lib/rateLimit";

export async function removeSplitAction(splitId: string, userId: string) {
  // Rate limiting
  const rateLimitCheck = checkRateLimit(
    `split:delete:${userId}`,
    RATE_LIMITS.DELETE,
  );
  if (rateLimitCheck.limited) {
    throw new Error("Too many requests. Please try again later.");
  }

  await prisma.exerciseLog.deleteMany({
    where: {
      exercise: {
        day: {
          splitId: splitId,
        },
      },
    },
  });

  await prisma.exercise.deleteMany({
    where: {
      day: {
        splitId: splitId,
      },
    },
  });

  await prisma.day.deleteMany({
    where: {
      splitId: splitId,
    },
  });

  const deletedSplit = await prisma.split.deleteMany({
    where: {
      id: splitId,
      userId: userId,
    },
  });

  return deletedSplit;
}
