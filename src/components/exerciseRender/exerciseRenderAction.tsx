"use server";

import { prisma } from "@/src/lib/prisma";
import { checkRateLimit, RATE_LIMITS } from "@/src/lib/rateLimit";

export async function deleteExerciseAction(id: string, userId: string) {
  // Rate limiting
  const rateLimitCheck = checkRateLimit(
    `exercise:delete:${userId}`,
    RATE_LIMITS.DELETE,
  );
  if (rateLimitCheck.limited) {
    throw new Error("Too many requests. Please try again later.");
  }

  // Authorization: Verify user owns the exercise
  const exercise = await prisma.exercise.findUnique({
    where: { id },
    include: {
      day: {
        include: { split: true },
      },
    },
  });

  if (!exercise || exercise.day.split.userId !== userId) {
    throw new Error(
      "Unauthorized: You don't have permission to delete this exercise",
    );
  }

  await prisma.exerciseLog.deleteMany({
    where: { exerciseId: id },
  });

  return await prisma.exercise.delete({
    where: { id: id },
  });
}
