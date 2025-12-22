"use server";

import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export async function deleteExerciseAction(id: string) {
  await prisma.exerciseLog.deleteMany({
    where: { exerciseId: id },
  });

  return await prisma.exercise.delete({
    where: { id: id },
  });
}
