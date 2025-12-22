"use server";

import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export async function deleteExerciseLogAction(logId: string) {
  return await prisma.exerciseLog.delete({
    where: { id: logId },
  });
}
