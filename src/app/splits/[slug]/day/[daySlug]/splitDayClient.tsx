"use client";

import { SplitDayClientProps } from "@/src/types";

export default function SplitDayClient({ day }: SplitDayClientProps) {
  return (
    <div>
      <h1>{day.name}</h1>

      <h2>Exercises:</h2>
      <ul>
        {day.exercises?.map((ex) => (
          <li key={ex.id}>{ex.name}</li>
        ))}
      </ul>
    </div>
  );
}
