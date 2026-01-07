"use client";

import { Exercise, ExerciseType } from "@/src/types";
import styles from "./addExerciseBtn.module.css";
import { useAddExercise } from "./addExerciseBtnHook";

export default function AddExerciseBtn({
  dayId,
  onExerciseAdded,
}: {
  dayId: string;
  onExerciseAdded: (exercise: Exercise) => void;
}) {
  const {
    showPopover,
    newExercise,
    exerciseType,
    newSets,
    newReps,
    newVideoURL,
    setNewExercise,
    setExerciseType,
    setNewSets,
    setNewReps,
    openPopover,
    handleCancel,
    handleAdd,
    setNewVideoURL,
  } = useAddExercise(dayId, onExerciseAdded);

  return (
    <>
      <button className={styles.addButton} onClick={openPopover}>
        LÄGG TILL ÖVNING
      </button>

      {showPopover && (
        <div className={styles.overlay} onClick={handleCancel}>
          <div className={styles.popover} onClick={(e) => e.stopPropagation()}>
            <input
              aria-label="Övnings namn"
              type="text"
              placeholder="Övnings namn"
              value={newExercise}
              onChange={(e) => setNewExercise(e.target.value)}
              autoFocus
            />

            <div className={styles.selectGroup}>
              <label htmlFor="exerciseType">Övningstyp:</label>
              <select
                id="exerciseType"
                value={exerciseType}
                onChange={(e) =>
                  setExerciseType(e.target.value as ExerciseType)
                }
                className={styles.select}
              >
                <option value={ExerciseType.STRENGTH}>
                  Styrka (Reps/Vikt)
                </option>
                <option value={ExerciseType.CARDIO}>
                  Kardio (Tid/Distans)
                </option>
              </select>
            </div>

            <input
              aria-label="VideoURL"
              type="url"
              placeholder="VideoURL (valfritt)"
              value={newVideoURL}
              onChange={(e) => setNewVideoURL(e.target.value)}
            />
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
