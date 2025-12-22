"use client";

import { useState } from "react";
import { ExerciseLog } from "@/src/types";
import { deleteExerciseLogAction } from "./logListRemoveBtnAction";

export function useLogRender(initialLogs: ExerciseLog[]) {
  const [logs, setLogs] = useState(initialLogs);

  const handleDelete = async (id: string) => {


    try {
      await deleteExerciseLogAction(id); 
      setLogs((prev) => prev.filter((log) => log.id !== id)); 
    } catch (err) {
      console.error("Failed to delete log:", err);
    }
  };

  return { logs, handleDelete };
}
