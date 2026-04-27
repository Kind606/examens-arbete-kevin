"use server";

import { prisma } from "@/src/lib/prisma";

export async function cacheExerciseDetailsAction(
  externalId: string,
  name: string,
  category: string,
  muscleGroup: string,
  equipment: string,
  videoUrl: string,
  imageUrl: string,
): Promise<void> {
  try {
    await prisma.exerciseTemplate.upsert({
      where: { externalId },
      create: {
        externalId,
        name,
        category,
        muscleGroup,
        equipment,
        videoUrl,
        imageUrl,
      },
      update: {
        name,
        category,
        muscleGroup,
        equipment,
        videoUrl,
        imageUrl,
      },
    });
  } catch (error) {
    console.error("Error caching exercise details:", error);
  }
}
