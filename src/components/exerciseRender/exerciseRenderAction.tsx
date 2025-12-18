"use server";

import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export async function deleteExerciseAction(id: string) {
  return await prisma.exercise.delete({
    where: { id },
  });
}
