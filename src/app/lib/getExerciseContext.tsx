import { PrismaClient } from "@/generated/prisma/client";
import { Day, Exercise, GetExerciseContextProps } from "@/src/types";

const prisma = new PrismaClient();

export async function getExerciseContext({
  splitSlug,
  daySlug,
  exerciseSlug,
}: GetExerciseContextProps) {
  const split = await prisma.split.findUnique({
    where: { slug: splitSlug },
  });
  if (!split) return null;

  const day = await prisma.day.findUnique({
    where: {
      slug_splitId: {
        slug: daySlug,
        splitId: split.id,
      },
    },
    include: {
      exercises: {
        orderBy: { id: "asc" },
      },
    },
  });
  if (!day) return null;

  const index = day.exercises.findIndex((ex) => ex.slug === exerciseSlug);
  if (index === -1) return null;

  const exercise = await prisma.exercise.findUnique({
    where: { id: day.exercises[index].id },
    include: {
      logs: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!exercise) return null;

  return {
    day: day as Day,
    exercise: exercise as Exercise,
    prevExercise: index > 0 ? (day.exercises[index - 1] as Exercise) : null,
    nextExercise:
      index < day.exercises.length - 1
        ? (day.exercises[index + 1] as Exercise)
        : null,
  };
}
