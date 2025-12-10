"use server";

import { PrismaClient } from "@/generated/prisma/client";
const prisma = new PrismaClient();

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export async function addExerciseAction(
  dayId: string,
  name: string,
  sets: number,
  reps: number
) {
  return await prisma.exercise.create({
    data: {
      name,
      slug: slugify(name),
      dayId,
      defaultSets: sets,
      defaultReps: reps,
    },
  });
}
