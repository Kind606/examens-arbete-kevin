"use client";

import { ExerciseLog } from "@/src/types";
import { useState } from "react";
import { addExerciseLogAction } from "./addExerciseLogsBtnAction";

export function useAddExerciseLog(
  exerciseId: string,
  onLogAdded: (log: ExerciseLog) => void
) {
  const [showPopover, setShowPopover] = useState(false);
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);
  const [weight, setWeight] = useState<number | null>(null);
  const [comment, setComment] = useState("");

  const openPopover = () => setShowPopover(true);

  const handleCancel = () => {
    setSets(3);
    setReps(10);
    setWeight(null);
    setComment("");
    setShowPopover(false);
  };

  const handleAdd = async () => {
    try {
      const log = await addExerciseLogAction(
        exerciseId,
        sets,
        reps,
        weight,
        comment.trim()
      );

      onLogAdded({
        ...log,
        sets: log.sets ?? 0,
        reps: log.reps ?? 0,
        weight: log.weight ?? 0,
        comments: log.comment ?? "",
      });
      handleCancel();
    } catch (err) {
      console.error("Failed to add exercise log:", err);
    }
  };

  return {
    showPopover,
    sets,
    reps,
    weight,
    comment,
    setSets,
    setReps,
    setWeight,
    setComment,
    openPopover,
    handleAdd,
    handleCancel,
  };
}
