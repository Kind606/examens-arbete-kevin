"use client";

import { ExerciseLog } from "@/src/types";
import styles from "./addExerciseLogsBtn.module.css";
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
                type="number"
                value={sets}
                onChange={(e) => setSets(Number(e.target.value))}
              />

              <label>Reps</label>
              <input
                type="number"
                value={reps}
                onChange={(e) => setReps(Number(e.target.value))}
              />

              <label>Vikt (kg)</label>
              <input
                type="number"
                value={weight ?? ""}
                onChange={(e) =>
                  setWeight(e.target.value ? Number(e.target.value) : null)
                }
              />

              <label>Kommentar</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Kändes tungt, PR, osv..."
              />
            </div>

            <div className={styles.buttonGroup}>
              <button onClick={handleAdd}>LÄGG TILL</button>
              <button onClick={handleCancel}>AVBRYT</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
