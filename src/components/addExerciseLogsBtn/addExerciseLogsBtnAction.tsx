"use server";

import { SetData } from "@/generated/prisma";
import { prisma } from "@/src/lib/prisma";
import { checkRateLimit, RATE_LIMITS } from "@/src/lib/rateLimit";

export async function addExerciseLogAction(
  exerciseId: string,
  sets: SetData[],
  comment: string,
  userId: string,
) {
  // Rate limiting
  const rateLimitCheck = checkRateLimit(
    `exerciselog:create:${userId}`,
    RATE_LIMITS.CREATE,
  );
  if (rateLimitCheck.limited) {
    throw new Error("Too many requests. Please try again later.");
  }

  // Authorization: Verify user owns the exercise
  const exercise = await prisma.exercise.findUnique({
    where: { id: exerciseId },
    include: {
      day: {
        include: { split: true },
      },
    },
  });

  if (!exercise || exercise.day.split.userId !== userId) {
    throw new Error(
      "Unauthorized: You don't have permission to add logs to this exercise",
    );
  }

  return await prisma.exerciseLog.create({
    data: {
      exerciseId,
      sets,
      comment,
    },
  });
}
