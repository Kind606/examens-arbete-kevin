"use client";

import { Exercise, ExerciseType } from "@/src/types";
import { useEffect, useRef, useState } from "react";
import { addExerciseAction } from "./addExerciseBtnAction";
import { cacheExerciseDetailsAction } from "./cacheExerciseDetailsAction";
import { FORM_DEFAULTS } from "./constants";
import { getExerciseDetailsAction } from "./getExerciseDetailsAction";
import {
  ExerciseSearchResult,
  searchExercisesAction,
} from "./searchExerciseAction";
import { getMediaUrl, parseExerciseId } from "./utils";

export function useAddExercise(
  dayId: string,
  userId: string,
  onExerciseAdded: (ex: Exercise) => void,
) {
  const [showPopover, setShowPopover] = useState(false);
  const [newExercise, setNewExercise] = useState("");
  const [exerciseType, setExerciseType] = useState<ExerciseType>(
    ExerciseType.STRENGTH,
  );
  const [newSets, setNewSets] = useState<number>(FORM_DEFAULTS.SETS);
  const [newReps, setNewReps] = useState<number>(FORM_DEFAULTS.REPS);
  const [videoUrl, setVideoUrl] = useState("");

  const [searchResults, setSearchResults] = useState<ExerciseSearchResult[]>(
    [],
  );
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFetchingDetails, setIsFetchingDetails] = useState(false);

  // Track when user selects an exercise to prevent triggering search
  const isSelectingExercise = useRef(false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      // Skip search if user just selected an exercise
      if (isSelectingExercise.current) {
        isSelectingExercise.current = false;
        return;
      }

      if (
        !newExercise ||
        newExercise.trim().length < FORM_DEFAULTS.MIN_SEARCH_LENGTH
      ) {
        setSearchResults([]);
        setShowSuggestions(false);
        return;
      }

      setIsSearching(true);
      const results = await searchExercisesAction(newExercise.trim());
      setSearchResults(results);
      setShowSuggestions(results.length > 0);
      setIsSearching(false);
    }, FORM_DEFAULTS.DEBOUNCE_MS);

    return () => clearTimeout(timeoutId);
  }, [newExercise]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-search-container]")) {
        setShowSuggestions(false);
      }
    };

    if (showSuggestions) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showSuggestions]);

  const openPopover = () => setShowPopover(true);

  const handleCancel = () => {
    setNewExercise("");
    setExerciseType(ExerciseType.STRENGTH);
    setNewSets(FORM_DEFAULTS.SETS);
    setNewReps(FORM_DEFAULTS.REPS);
    setVideoUrl("");
    setSearchResults([]);
    setShowSuggestions(false);
    setIsFetchingDetails(false);
    setShowPopover(false);
  };

  const handleSelectExercise = async (exercise: ExerciseSearchResult) => {
    // Set flag to prevent search from triggering
    isSelectingExercise.current = true;

    // Close suggestions and clear search results BEFORE setting the name
    setShowSuggestions(false);
    setSearchResults([]);
    setNewExercise(exercise.name);

    const exerciseId = parseExerciseId(exercise.externalId);

    setIsFetchingDetails(true);
    const details = await getExerciseDetailsAction(exerciseId);
    setIsFetchingDetails(false);

    if (!details) {
      setVideoUrl(exercise.imageUrl || "");
      return;
    }

    const mediaUrl = getMediaUrl(details.videoUrl, details.imageUrl);
    setVideoUrl(mediaUrl);

    if (details.exerciseType === "CARDIO") {
      setExerciseType(ExerciseType.CARDIO);
      setNewSets(0);
      setNewReps(0);
    } else {
      setExerciseType(ExerciseType.STRENGTH);
      if (newSets === 0) setNewSets(FORM_DEFAULTS.SETS);
      if (newReps === 0) setNewReps(FORM_DEFAULTS.REPS);
    }

    cacheExerciseDetailsAction(
      exercise.externalId,
      details.name,
      details.bodyParts[0] || "Exercise",
      details.targetMuscles[0] || "Various",
      details.equipments[0] || "Various",
      mediaUrl,
      details.imageUrl,
    ).catch(console.error);
  };

  const handleAdd = async () => {
    if (!newExercise || !newExercise.trim()) return;

    try {
      const added = await addExerciseAction(
        dayId,
        newExercise.trim(),
        exerciseType,
        newSets,
        newReps,
        videoUrl || "",
        userId,
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
    newReps,
    searchResults,
    isSearching,
    showSuggestions,
    isFetchingDetails,
    setNewExercise,
    setExerciseType,
    setNewSets,
    setNewReps,
    openPopover,
    handleAdd,
    handleCancel,
    handleSelectExercise,
    setShowSuggestions,
  };
}
