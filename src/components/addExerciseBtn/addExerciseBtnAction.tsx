"use server";

import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

function slugifyExercise(name: string) {
  const map: Record<string, string> = {
    å: "a",
    ä: "a",
    ö: "o",
    Å: "a",
    Ä: "a",
    Ö: "o",
  };

  return name
    .toLowerCase()
    .replace(/[åäöÅÄÖ]/g, (match) => map[match] || match)
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export async function addExerciseAction(
  dayId: string,
  name: string,
  sets: number,
  reps: number,
  videoURL: string
) {
  const baseSlug = slugifyExercise(name);
  let slug = baseSlug;
  let counter = 1;

  while (await prisma.exercise.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter++}`;
  }

  return await prisma.exercise.create({
    data: {
      name,
      slug,
      dayId,
      defaultSets: sets,
      defaultReps: reps,
      videoUrl: videoURL,
    },
  });
}
