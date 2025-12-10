"use client";

import { useState } from "react";
import { addExerciseAction } from "./addExerciseBtnAction";

export function useAddExercise(
  dayId: string,
  onExerciseAdded: (ex: unknown) => void
) {
  const [showPopover, setShowPopover] = useState(false);
  const [newExercise, setNewExercise] = useState("");
  const [newSets, setNewSets] = useState(3);
  const [newReps, setNewReps] = useState(10);

  const openPopover = () => setShowPopover(true);

  const handleCancel = () => {
    setNewExercise("");
    setNewSets(3);
    setNewReps(10);
    setShowPopover(false);
  };

  const handleAdd = async () => {
    if (!newExercise.trim()) return;

    try {
      const added = await addExerciseAction(
        dayId,
        newExercise.trim(),
        newSets,
        newReps
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
    newSets,
    newReps,
    setNewExercise,
    setNewSets,
    setNewReps,
    openPopover,
    handleAdd,
    handleCancel,
  };
}
