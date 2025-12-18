import { PrismaClient } from "@/generated/prisma/client";
import NavBar from "@/src/components/navBar/navBar";
import { requireUser } from "@/src/hooks/requireUser";
import ExerciseLogClient from "./exerciseLogClient";

const prisma = new PrismaClient();

interface ExerciseLogProps {
  params: Promise<{ slug: string; daySlug: string; exerciseSlug: string }>;
}

export default async function ExercisePage({ params }: ExerciseLogProps) {
  const user = await requireUser();

  const { slug, daySlug, exerciseSlug } = await params;

  const split = await prisma.split.findUnique({ where: { slug } });
  if (!split) return <div>Split not found</div>;

  const day = await prisma.day.findUnique({
    where: { slug_splitId: { slug: daySlug, splitId: split.id } },
    include: { exercises: true },
  });
  if (!day) return <div>Day not found</div>;

  const exercise = await prisma.exercise.findFirst({
    where: { slug: exerciseSlug, dayId: day.id },
  });
  if (!exercise) return <div>Exercise not found</div>;

  return (
    <div>
      <NavBar />
      <ExerciseLogClient user={user} day={day} exercise={exercise} />
    </div>
  );
}
