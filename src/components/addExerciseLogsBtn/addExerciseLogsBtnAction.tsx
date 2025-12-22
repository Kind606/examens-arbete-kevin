"use server";

import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export async function addExerciseLogAction(
  exerciseId: string,
  sets: number,
  reps: number,
  weight: number | null,
  comment: string
) {
  return await prisma.exerciseLog.create({
    data: {
      exerciseId,
      sets,
      reps,
      weight,
      comment,
    },
  });
}
