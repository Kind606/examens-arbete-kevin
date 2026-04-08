"use server";

import { prisma } from "@/src/lib/prisma";
import { checkRateLimit, RATE_LIMITS } from "@/src/lib/rateLimit";

export async function deleteExerciseLogAction(logId: string, userId: string) {
  // Rate limiting
  const rateLimitCheck = checkRateLimit(
    `exerciselog:delete:${userId}`,
    RATE_LIMITS.DELETE,
  );
  if (rateLimitCheck.limited) {
    throw new Error("Too many requests. Please try again later.");
  }

  // Authorization: Verify user owns the log
  const log = await prisma.exerciseLog.findUnique({
    where: { id: logId },
    include: {
      exercise: {
        include: {
          day: {
            include: { split: true },
          },
        },
      },
    },
  });

  if (!log || log.exercise.day.split.userId !== userId) {
    throw new Error(
      "Unauthorized: You don't have permission to delete this log",
    );
  }

  return await prisma.exerciseLog.delete({
    where: { id: logId },
  });
}
