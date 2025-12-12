"use client";

import { Exercise } from "@/src/types";
import { useAddExercise } from "./addExerciseBtnHook";
import styles from "./addExerciseBtn.module.css";

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
    setNewExercise,
    setNewSets,
    setNewReps,
    openPopover,
    handleCancel,
    handleAdd,
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
              placeholder="Exercise name"
              value={newExercise}
              onChange={(e) => setNewExercise(e.target.value)}
              autoFocus
            />
            <div className={styles.setInputGroup}>
            <input
              type="number"
              placeholder="Sets"
              value={newSets}
              onChange={(e) => setNewSets(Number(e.target.value))}
            />

            <input
              type="number"
              placeholder="Reps"
              value={newReps}
              onChange={(e) => setNewReps(Number(e.target.value))}
            />
            </div>

            <div className={styles.buttonGroup}>
              <button className={styles.addButton} onClick={handleAdd}>
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
