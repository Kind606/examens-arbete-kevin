"use client";

import { ExerciseLog, ExerciseType, SetData } from "@/src/types";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { addExerciseLogAction } from "./addExerciseLogsBtnAction";

interface ExerciseLogFormData {
  sets: SetData[];
  comment: string;
}

export function useAddExerciseLog(
  exerciseId: string,
  exerciseType: ExerciseType,
  userId: string,
  onLogAdded: (log: ExerciseLog) => void,
) {
  const [showPopover, setShowPopover] = useState(false);
  const [loading, setLoading] = useState(false);

  const isCardio = exerciseType === ExerciseType.CARDIO;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<ExerciseLogFormData>({
    defaultValues: {
      sets: isCardio
        ? [{ time: 0, distance: null, reps: null, weight: null }]
        : [{ reps: 0, weight: null, time: null, distance: null }],
      comment: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sets",
  });

  const openPopover = () => setShowPopover(true);

  const onSubmit = async (data: ExerciseLogFormData) => {
    setLoading(true);

    try {
      const log = await addExerciseLogAction(
        exerciseId,
        data.sets,
        data.comment.trim(),
        userId,
      );

      onLogAdded(log);
      setShowPopover(false);
      reset();
    } catch (err) {
      console.error("Failed to add exercise log:", err);

      const errorMessage =
        err instanceof Error ? err.message : "Något gick fel";

      setError("comment", {
        type: "manual",
        message: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => {
    setShowPopover(false);
    reset();
  };

  return {
    showPopover,
    loading,
    isCardio,
    register,
    control,
    handleSubmit,
    errors,
    fields,
    append,
    remove,
    openPopover,
    onSubmit,
    onCancel,
  };
}
