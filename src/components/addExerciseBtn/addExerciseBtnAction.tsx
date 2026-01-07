"use server";

import { PrismaClient } from "@/generated/prisma/client";
import { ExerciseType } from "@/src/types";
import { slugify } from "@/src/utils/slugify";

const prisma = new PrismaClient();

export async function addExerciseAction(
  dayId: string,
  name: string,
  exerciseType: ExerciseType,
  sets: number,
  reps: number,
  videoURL: string
) {
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
