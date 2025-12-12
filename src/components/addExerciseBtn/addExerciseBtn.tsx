"use client";

import { Exercise } from "@/src/types";
import { useAddExercise } from "./addExerciseBtnHook";

export default function AddExerciseBtn({
  dayId,
  onExerciseAdded,
}: {
  dayId: string;
  onExerciseAdded: (exercise: Exercise) => void;
}) {
  const {
    showPopover,
    newExercise,
    newSets,
    newReps,
    setNewExercise,
    setNewSets,
    setNewReps,
    openPopover,
    handleCancel,
    handleAdd,
  } = useAddExercise(dayId, onExerciseAdded);

  return (
    <>
      <button onClick={openPopover}>Add Exercise</button>

      {showPopover && (
        <div onClick={handleCancel}>
          <div onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              placeholder="Exercise name"
              value={newExercise}
              onChange={(e) => setNewExercise(e.target.value)}
            />

            <input
              type="number"
              placeholder="Sets"
              value={newSets}
              onChange={(e) => setNewSets(Number(e.target.value))}
            />

            <input
              type="number"
              placeholder="Reps"
              value={newReps}
              onChange={(e) => setNewReps(Number(e.target.value))}
            />

            <button onClick={handleAdd}>Add</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
}
