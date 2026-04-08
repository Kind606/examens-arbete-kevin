import { prisma } from "@/src/lib/prisma";
import { Day, Exercise, GetExerciseContextProps } from "@/src/types";

export async function getExerciseContext({
  splitSlug,
  daySlug,
  exerciseSlug,
  userId,
}: GetExerciseContextProps & { userId?: string }) {
  const split = await prisma.split.findUnique({
    where: { slug: splitSlug },
  });
  if (!split) return null;

  // Authorization: Verify user owns the split if userId is provided
  if (userId && split.userId !== userId) {
    throw new Error(
      "Unauthorized: You don&apos;t have permission to view this exercise",
    );
  }

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
