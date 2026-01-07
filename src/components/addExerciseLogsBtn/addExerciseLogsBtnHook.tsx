"use client";

import { ExerciseLog, SetData } from "@/src/types";
import { useState } from "react";
import { UseFormSetError } from "react-hook-form";
import { addExerciseLogAction } from "./addExerciseLogsBtnAction";

interface ExerciseLogFormData {
  sets: SetData[];
  comment: string;
}

export function useAddExerciseLog(
  exerciseId: string,
  onLogAdded: (log: ExerciseLog) => void
) {
  const [showPopover, setShowPopover] = useState(false);
  const [loading, setLoading] = useState(false);

  const openPopover = () => setShowPopover(true);

  const handleCancel = () => {
    setShowPopover(false);
  };

  const handleAdd = async (
    sets: SetData[],
    comment: string,
    setError: UseFormSetError<ExerciseLogFormData>
  ) => {
    setLoading(true);

    try {
      const log = await addExerciseLogAction(exerciseId, sets, comment.trim());

      onLogAdded(log);
      setShowPopover(false);
      return true;
    } catch (err) {
      console.error("Failed to add exercise log:", err);

      const errorMessage =
        err instanceof Error ? err.message : "Något gick fel";

      setError("comment", {
        type: "manual",
        message: errorMessage,
      });

      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    showPopover,
    loading,
    openPopover,
    handleAdd,
    handleCancel,
  };
}
