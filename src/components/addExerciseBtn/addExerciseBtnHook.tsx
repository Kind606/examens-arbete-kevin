"use client";

import { Exercise } from "@/src/types";
import { useState } from "react";
import { addExerciseAction } from "./addExerciseBtnAction";

export function useAddExercise(
  dayId: string,
  onExerciseAdded: (ex: Exercise) => void
) {
  const [showPopover, setShowPopover] = useState(false);
  const [newExercise, setNewExercise] = useState("");
  const [newSets, setNewSets] = useState(3);
  const [newReps, setNewReps] = useState(10);
  const [newVideoURL, setNewVideoURL] = useState("");

  const openPopover = () => setShowPopover(true);

  const handleCancel = () => {
    setNewExercise("");
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
        newSets,
        newReps,
        newVideoURL.trim(),
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
    newVideoURL,
    newReps,
    setNewExercise,
    setNewSets,
    setNewReps,
    openPopover,
    handleAdd,
    handleCancel,
    setNewVideoURL,
  };
}
