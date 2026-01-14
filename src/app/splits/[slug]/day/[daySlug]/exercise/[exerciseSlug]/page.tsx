import { NavBar } from "@/src";
import { getExerciseContext } from "@/src/app/lib/getExerciseContext";
import { requireUser } from "@/src/hooks/requireUser";
import { ExercisePageProps } from "@/src/types";
import ExerciseClient from "./exerciseClient";

export default async function ExercisePage({ params }: ExercisePageProps) {
  const user = await requireUser();
  const { slug, daySlug, exerciseSlug } = await params;

  const context = await getExerciseContext({
    splitSlug: slug,
    daySlug,
    exerciseSlug,
  });

  if (!context) return <div>Exercise not found</div>;

  const { day, exercise, prevExercise, nextExercise } = context;

  return (
    <>
      <NavBar />
      <ExerciseClient
        user={user}
        day={day}
        exercise={exercise}
        splitSlug={slug}
        daySlug={daySlug}
        prevExercise={prevExercise}
        nextExercise={nextExercise}
      />
    </>
  );
}
