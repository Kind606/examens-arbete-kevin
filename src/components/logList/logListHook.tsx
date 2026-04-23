"use client";

import { ExerciseLog } from "@/src/types";
import { useMemo, useState } from "react";
import { deleteExerciseLogAction } from "./logListRemoveBtnAction";

type DateFilter = "7days" | "30days" | "3months" | "all";

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
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
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
    const now = new Date();
    const filterDate = new Date();

    // Apply date filter
    switch (dateFilter) {
      case "7days":
        filterDate.setDate(now.getDate() - 7);
        break;
      case "30days":
        filterDate.setDate(now.getDate() - 30);
        break;
      case "3months":
        filterDate.setMonth(now.getMonth() - 3);
        break;
      default:
        filterDate.setFullYear(2000); // All logs
    }

    const filtered = logs.filter(
      (log) => new Date(log.createdAt) >= filterDate,
    );

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
  }, [logs, dateFilter, sortOrder]);

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
    dateFilter,
    handleDelete,
    toggleSortOrder,
    setDateFilter,
    getStrengthComparison,
    expandedLogs,
    toggleExpanded,
    visibleCounts,
    loadMore,
  };
}
