"use server";

import { prisma } from "@/src/lib/prisma";
import { checkRateLimit, RATE_LIMITS } from "@/src/lib/rateLimit";
import { ExerciseType } from "@/src/types";
import { slugify } from "@/src/utils/slugify";

export async function addExerciseAction(
  dayId: string,
  name: string,
  exerciseType: ExerciseType,
  sets: number,
  reps: number,
  videoURL: string,
  userId: string,
) {
  // Rate limiting
  const rateLimitCheck = checkRateLimit(
    `exercise:create:${userId}`,
    RATE_LIMITS.CREATE,
  );
  if (rateLimitCheck.limited) {
    throw new Error("Too many requests. Please try again later.");
  }

  // Authorization: Verify user owns the day
  const day = await prisma.day.findUnique({
    where: { id: dayId },
    include: { split: true },
  });

  if (!day || day.split.userId !== userId) {
    throw new Error(
      "Unauthorized: You don't have permission to add exercises to this day",
    );
  }

  const baseSlug = slugify(name);
  let slug = baseSlug;
  let counter = 1;

  while (await prisma.exercise.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter++}`;
  }

  return await prisma.exercise.create({
    data: {
      name,
      slug,
      exerciseType,
      dayId,
      defaultSets: sets,
      defaultReps: reps,
      videoUrl: videoURL,
    },
  });
}
