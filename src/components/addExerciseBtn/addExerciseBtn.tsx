"use client";

import { Exercise, ExerciseType } from "@/src/types";
import styles from "./addExerciseBtn.module.css";
import { useAddExercise } from "./addExerciseBtnHook";

export default function AddExerciseBtn({
  dayId,
  userId,
  onExerciseAdded,
}: {
  dayId: string;
  userId: string;
  onExerciseAdded: (exercise: Exercise) => void;
}) {
  const {
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
    handleCancel,
    handleAdd,
    handleSelectExercise,
    setShowSuggestions,
  } = useAddExercise(dayId, userId, onExerciseAdded);

  return (
    <>
      <button className={styles.addButton} onClick={openPopover}>
        LÄGG TILL ÖVNING
      </button>

      {showPopover && (
        <div className={styles.overlay} onClick={handleCancel}>
          <div className={styles.popover} onClick={(e) => e.stopPropagation()}>
            <div className={styles.searchContainer} data-search-container>
              <div className={styles.inputWrapper}>
                <input
                  aria-label="Övnings namn"
                  type="text"
                  placeholder="Sök övning..."
                  value={newExercise || ""}
                  onChange={(e) => {
                    setNewExercise(e.target.value);
                    setShowSuggestions(true);
                  }}
                  autoFocus
                  className={styles.input}
                />
                {(isSearching || isFetchingDetails) && (
                  <div className={styles.loadingSpinner} />
                )}
              </div>
              {showSuggestions && searchResults.length > 0 && (
                <div className={styles.suggestions}>
                  {searchResults.map((exercise) => (
                    <button
                      key={exercise.externalId}
                      className={styles.suggestionItem}
                      onClick={() => handleSelectExercise(exercise)}
                      onMouseDown={(e) => e.stopPropagation()}
                      type="button"
                    >
                      <span className={styles.suggestionName}>
                        {exercise.name}
                      </span>
                      {(exercise.muscleGroup || exercise.equipment) && (
                        <span className={styles.suggestionMeta}>
                          {exercise.muscleGroup}
                          {exercise.muscleGroup && exercise.equipment && " • "}
                          {exercise.equipment}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

          

            {exerciseType === ExerciseType.STRENGTH && (
              <div className={styles.setInputGroup}>
                <label htmlFor="sets">Sets:</label>
                <input
                  aria-label="Sets"
                  type="text"
                  placeholder="Sets"
                  value={newSets}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*$/.test(val))
                      setNewSets(val === "" ? 0 : Number(val));
                  }}
                />
                <label htmlFor="reps">Reps:</label>
                <input
                  aria-label="Reps"
                  type="text"
                  placeholder="Reps"
                  value={newReps}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*$/.test(val))
                      setNewReps(val === "" ? 0 : Number(val));
                  }}
                />
              </div>
            )}

            <div className={styles.buttonGroup}>
              <button className={styles.popaddButton} onClick={handleAdd}>
                LÄGG TILL
              </button>
              <button className={styles.cancelButton} onClick={handleCancel}>
                AVBRYT
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
