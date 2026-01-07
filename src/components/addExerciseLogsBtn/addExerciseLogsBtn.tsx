"use client";

import { ExerciseLog, SetData } from "@/src/types";
import { useFieldArray, useForm } from "react-hook-form";
import styles from "../addExerciseBtn/addExerciseBtn.module.css";
import { useAddExerciseLog } from "./addExerciseLogsBtnHook";

interface ExerciseLogFormData {
  sets: SetData[];
  comment: string;
}

export default function AddExerciseLogBtn({
  exerciseId,
  onLogAdded,
}: {
  exerciseId: string;
  onLogAdded: (log: ExerciseLog) => void;
}) {
  const { showPopover, loading, openPopover, handleAdd, handleCancel } =
    useAddExerciseLog(exerciseId, onLogAdded);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<ExerciseLogFormData>({
    defaultValues: {
      sets: [{ reps: 0, weight: null }],
      comment: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sets",
  });

  const onSubmit = async (data: ExerciseLogFormData) => {
    const success = await handleAdd(data.sets, data.comment, setError);
    if (success) {
      reset();
    }
  };

  const onCancel = () => {
    handleCancel();
    reset();
  };

  return (
    <>
      <button className={styles.addExerciseLogBtn} onClick={openPopover}>
        Lägg till övningslogg
      </button>

      {showPopover && (
        <div className={styles.overlay} onClick={onCancel}>
          <div className={styles.popover} onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.inputGroup}>
                <h3>Sets ({fields.length})</h3>

                {fields.map((field, index) => (
                  <div key={field.id} className={styles.setRow}>
                    <span className={styles.setLabel}>Set {index + 1}</span>

                    <div className={styles.setInputs}>
                      <div>
                        <label>Reps *</label>
                        <input
                          type="number"
                          {...register(`sets.${index}.reps`, {
                            required: "Reps krävs",
                            min: { value: 1, message: "Minst 1 rep" },
                            valueAsNumber: true,
                          })}
                          className={
                            errors.sets?.[index]?.reps ? styles.invalid : ""
                          }
                        />
                        {errors.sets?.[index]?.reps && (
                          <span className={styles.error}>
                            {errors.sets[index]?.reps?.message}
                          </span>
                        )}
                      </div>

                      <div>
                        <label>Vikt (kg)</label>
                        <input
                          type="number"
                          step="0.5"
                          {...register(`sets.${index}.weight`, {
                            min: { value: 0, message: "Kan inte vara negativ" },
                            setValueAs: (v) =>
                              v === "" || v === null ? null : Number(v),
                          })}
                          className={
                            errors.sets?.[index]?.weight ? styles.invalid : ""
                          }
                        />
                        {errors.sets?.[index]?.weight && (
                          <span className={styles.error}>
                            {errors.sets[index]?.weight?.message}
                          </span>
                        )}
                      </div>

                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className={styles.removeSetBtn}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => append({ reps: 0, weight: null })}
                  className={styles.addSetBtn}
                >
                  + Lägg till set
                </button>

                <div className={styles.commentGroup}>
                  <label>Kommentar</label>
                  <textarea
                    {...register("comment")}
                    placeholder="Kändes tungt, PR, osv..."
                    rows={4}
                  />
                </div>
              </div>

              <div className={styles.buttonGroup}>
                <button
                  type="submit"
                  className={styles.popaddButton}
                  disabled={loading}
                >
                  {loading ? "LÄGGER TILL..." : "LÄGG TILL"}
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className={styles.cancelButton}
                  disabled={loading}
                >
                  AVBRYT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
