"use client";

import { ExerciseLog } from "@/src/types";
import { useMemo, useState } from "react";
import { deleteExerciseLogAction } from "./logListRemoveBtnAction";

type GroupedLogs = {
  today: ExerciseLog[];
  thisWeek: ExerciseLog[];
  earlier: ExerciseLog[];
};

export function useLogList(
  logs: ExerciseLog[],
  setLogs: React.Dispatch<React.SetStateAction<ExerciseLog[]>>,
  userId: string,
) {
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [expandedLogs, setExpandedLogs] = useState<Set<string>>(new Set());
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [visibleCounts, setVisibleCounts] = useState({
    today: 8,
    thisWeek: 8,
    earlier: 8,
  });

  const toggleExpanded = (logId: string) => {
    setExpandedLogs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(logId)) {
        newSet.delete(logId);
      } else {
        newSet.add(logId);
      }
      return newSet;
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteExerciseLogAction(id, userId);
      setLogs((prev) => prev.filter((log) => log.id !== id));
    } catch (err) {
      console.error("Failed to delete log:", err);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"));
  };

  const filteredAndGroupedLogs = useMemo(() => {
    // Apply date range filter
    let filtered = logs;

    if (startDate || endDate) {
      filtered = logs.filter((log) => {
        const logDate = new Date(log.createdAt);
        logDate.setHours(0, 0, 0, 0);

        if (startDate && endDate) {
          const start = new Date(startDate);
          start.setHours(0, 0, 0, 0);
          const end = new Date(endDate);
          end.setHours(23, 59, 59, 999);
          return logDate >= start && logDate <= end;
        } else if (startDate) {
          const start = new Date(startDate);
          start.setHours(0, 0, 0, 0);
          return logDate >= start;
        } else if (endDate) {
          const end = new Date(endDate);
          end.setHours(23, 59, 59, 999);
          return logDate <= end;
        }
        return true;
      });
    }

    const sorted = [...filtered].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    // Group by time periods
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    weekStart.setHours(0, 0, 0, 0);

    const grouped: GroupedLogs = {
      today: [],
      thisWeek: [],
      earlier: [],
    };

    sorted.forEach((log) => {
      const logDate = new Date(log.createdAt);
      logDate.setHours(0, 0, 0, 0);

      if (logDate.getTime() === today.getTime()) {
        grouped.today.push(log);
      } else if (logDate >= weekStart) {
        grouped.thisWeek.push(log);
      } else {
        grouped.earlier.push(log);
      }
    });

    return grouped;
  }, [logs, startDate, endDate, sortOrder]);

  const loadMore = (group: keyof GroupedLogs) => {
    setVisibleCounts((prev) => ({
      ...prev,
      [group]: prev[group] + 10,
    }));
  };

  const getStrengthComparison = (log: ExerciseLog, allLogs: ExerciseLog[]) => {
    const currentIndex = allLogs.findIndex((l) => l.id === log.id);
    if (currentIndex === -1 || currentIndex === allLogs.length - 1) return null;

    const previousLog = allLogs[currentIndex + 1];
    const currentMaxWeight = Math.max(...log.sets.map((s) => s.weight ?? 0));
    const previousMaxWeight = Math.max(
      ...previousLog.sets.map((s) => s.weight ?? 0),
    );

    const weightDiff = currentMaxWeight - previousMaxWeight;
    return weightDiff !== 0 ? { weightDiff } : null;
  };

  return {
    groupedLogs: filteredAndGroupedLogs,
    sortOrder,
    startDate,
    endDate,
    handleDelete,
    toggleSortOrder,
    setStartDate,
    setEndDate,
    getStrengthComparison,
    expandedLogs,
    toggleExpanded,
    visibleCounts,
    loadMore,
  };
}
