"use client";

import { Exercise, ExerciseType } from "@/src/types";
import { useState } from "react";
import { addExerciseAction } from "./addExerciseBtnAction";

export function useAddExercise(
  dayId: string,
  onExerciseAdded: (ex: Exercise) => void
) {
  const [showPopover, setShowPopover] = useState(false);
  const [newExercise, setNewExercise] = useState("");
  const [exerciseType, setExerciseType] = useState<ExerciseType>(
    ExerciseType.STRENGTH
  );
  const [newSets, setNewSets] = useState(3);
  const [newReps, setNewReps] = useState(10);
  const [newVideoURL, setNewVideoURL] = useState("");

  const openPopover = () => setShowPopover(true);

  const handleCancel = () => {
    setNewExercise("");
    setExerciseType(ExerciseType.STRENGTH);
    setNewSets(3);
    setNewReps(10);
    setNewVideoURL("");
    setShowPopover(false);
  };

  const handleAdd = async () => {
    if (!newExercise.trim()) return;

    try {
      const added = await addExerciseAction(
        dayId,
        newExercise.trim(),
        exerciseType,
        newSets,
        newReps,
        newVideoURL.trim()
      );

      onExerciseAdded(added);
    } catch (err) {
      console.error(err);
    }

    handleCancel();
  };

  return {
    showPopover,
    newExercise,
    exerciseType,
    newSets,
    newVideoURL,
    newReps,
    setNewExercise,
    setExerciseType,
    setNewSets,
    setNewReps,
    openPopover,
    handleAdd,
    handleCancel,
    setNewVideoURL,
  };
}
