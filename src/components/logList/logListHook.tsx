"use client";

import { ExerciseLog } from "@/src/types";
import { useState } from "react";
import { deleteExerciseLogAction } from "./logListRemoveBtnAction";

export function useLogList(
  logs: ExerciseLog[],
  setLogs: React.Dispatch<React.SetStateAction<ExerciseLog[]>>
) {
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const handleDelete = async (id: string) => {
    try {
      await deleteExerciseLogAction(id);
      setLogs((prev) => prev.filter((log) => log.id !== id));
    } catch (err) {
      console.error("Failed to delete log:", err);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"));
  };

  const sortedLogs = [...logs].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  const getStrengthComparison = (index: number) => {
    if (sortOrder !== "newest") return null;
    if (index !== 0) return null;
    if (sortedLogs.length < 2) return null;

    const currentLog = sortedLogs[0];
    const previousLog = sortedLogs[1];

    const currentMaxWeight = Math.max(
      ...currentLog.sets.map((s) => s.weight ?? 0)
    );
    const previousMaxWeight = Math.max(
      ...previousLog.sets.map((s) => s.weight ?? 0)
    );

    const weightDiff = currentMaxWeight - previousMaxWeight;

    return { weightDiff };
  };

  return {
    sortedLogs,
    sortOrder,
    handleDelete,
    toggleSortOrder,
    getStrengthComparison,
  };
}
