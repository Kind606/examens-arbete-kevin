import { ExerciseLogClientProps } from "@/src/types";

export default function ExerciseClient({
  user,
  day,
  exercise,
}: ExerciseLogClientProps) {
  return (
    <div>
      <h1>{exercise.name}</h1>
      <p>{exercise.videoUrl}</p>

      <ul>
       
      </ul>
    </div>
  );
}
