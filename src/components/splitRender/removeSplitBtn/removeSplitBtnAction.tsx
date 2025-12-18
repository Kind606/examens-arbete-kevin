"use server";

import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export async function removeSplitAction(splitId: string, userId: string) {
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
