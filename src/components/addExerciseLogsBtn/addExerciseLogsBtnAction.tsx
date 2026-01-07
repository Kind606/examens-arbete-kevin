"use server";

import { SetData } from "@/generated/prisma";
import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export async function addExerciseLogAction(
  exerciseId: string,
  sets: SetData[],
  comment: string
) {
  return await prisma.exerciseLog.create({
    data: {
      exerciseId,
      sets,
      comment,
    },
  });
}
