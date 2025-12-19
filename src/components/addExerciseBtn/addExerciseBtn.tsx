"use client";

import { Exercise } from "@/src/types";
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
    newSets,
    newReps,
    newVideoURL,
    setNewExercise,
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
              type="text"
              placeholder="Övnings namn"
              value={newExercise}
              onChange={(e) => setNewExercise(e.target.value)}
              autoFocus
            />
            <input
              type="url"
              placeholder="VideoURL (valfritt)"
              value={newVideoURL}
              onChange={(e) => setNewVideoURL(e.target.value)}
              autoFocus
            />
            <div className={styles.setInputGroup}>
                <label htmlFor="sets">Sets:</label>
                <input
                  type="text"
                  placeholder="Sets"
                  value={newSets}
                  onChange={(e) => setNewSets(Number(e.target.value))}
                />
                <label htmlFor="reps">Reps:</label>
              <input
                type="text"
                placeholder="Reps"
                value={newReps}
                onChange={(e) => setNewReps(Number(e.target.value))}
              />
            </div>

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
