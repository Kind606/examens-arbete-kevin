"use client";

import { ExerciseLog } from "@/src/types";
import styles from "../addExerciseBtn/addExerciseBtn.module.css";
import { useAddExerciseLog } from "./addExerciseLogsBtnHook";

export default function AddExerciseLogBtn({
  exerciseId,
  onLogAdded,
}: {
  exerciseId: string;
  onLogAdded: (log: ExerciseLog) => void;
}) {
  const {
    showPopover,
    sets,
    reps,
    weight,
    comment,
    setSets,
    setReps,
    setWeight,
    setComment,
    openPopover,
    handleAdd,
    handleCancel,
  } = useAddExerciseLog(exerciseId, onLogAdded);

  return (
    <>
      <button className={styles.addExerciseLogBtn} onClick={openPopover}>
        Lägg till övningslogg
      </button>

      {showPopover && (
        <div className={styles.overlay} onClick={handleCancel}>
          <div className={styles.popover} onClick={(e) => e.stopPropagation()}>
            <div className={styles.inputGroup}>
              <label>Sets</label>
              <input
                type="text"
                value={sets}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d*$/.test(val)) setSets(val === "" ? 0 : Number(val));
                }}
              />

              <label>Reps</label>
              <input
                type="text"
                value={reps}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d*$/.test(val)) setReps(val === "" ? 0 : Number(val));
                }}
              />

              <label>Vikt (kg)</label>
              <input
                type="text"
                value={weight ?? ""}
                onChange={(e) =>
                  setWeight(e.target.value ? Number(e.target.value) : null)
                }
              />
              <div className={styles.commentGroup}>
                <label>Kommentar</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Kändes tungt, PR, osv..."
                  rows={4}
                />
              </div>
            </div>

            <div className={styles.buttonGroup}>
              <button onClick={handleAdd} className={styles.popaddButton}>
                LÄGG TILL
              </button>
              <button onClick={handleCancel} className={styles.cancelButton}>
                AVBRYT
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
