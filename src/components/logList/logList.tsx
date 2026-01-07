"use client";

import { LogListProps } from "@/src/types";
import styles from "./logList.module.css";
import { deleteExerciseLogAction } from "./logListRemoveBtnAction";

export default function LogList({ logs, setLogs }: LogListProps) {
  const handleDelete = async (id: string) => {
    try {
      await deleteExerciseLogAction(id);
      setLogs((prev) => prev.filter((log) => log.id !== id));
    } catch (err) {
      console.error("Failed to delete log:", err);
    }
  };

  if (logs.length === 0) return <p>Inga loggar tillagda än.</p>;

  const getStrengthComparison = (index: number) => {
    if (index !== 0) return null; 
    if (logs.length < 2) return null; 

    const currentLog = logs[0];
    const previousLog = logs[1];

    const weightDiff = (currentLog.weight || 0) - (previousLog.weight || 0);

    return { weightDiff };
  };

  return (
    <div className={styles.logsList}>
      <h2>Exercise Logs</h2>
      {logs.map((log, index) => {
        const comparison = getStrengthComparison(index);

        return (
          <div key={log.id} className={styles.logCard}>
            <div className={styles.logItem}>
              <div className={styles.date}>
                <p>
                  <strong>
                    {new Date(log.createdAt).toLocaleDateString("sv-SE")}
                  </strong>
                  {index === 0 && (
                    <span className={styles.latestBadge}>Senaste</span>
                  )}
                </p>
              </div>
              <div className={styles.stats}>
                <p>Sets: {log.sets ?? "-"}</p>
                <p>Reps: {log.reps ?? "-"}</p>
                <p>Vikt: {log.weight ?? "N/A"} Kg</p>
              </div>
            </div>

            {comparison && comparison.weightDiff !== 0 && (
              <div
                className={`${styles.strengthComparison} ${
                  comparison.weightDiff > 0 ? styles.positive : styles.negative
                }`}
              >
                <p
                  className={`${styles.comparisonText} ${
                    comparison.weightDiff > 0
                      ? styles.positive
                      : styles.negative
                  }`}
                >
                  {comparison.weightDiff > 0 &&
                    `Ökning! +${comparison.weightDiff} kg`}
                  {comparison.weightDiff < 0 &&
                    `Minskning: ${comparison.weightDiff} kg`}
                </p>
              </div>
            )}

            {log.comment && (
              <p className={styles.comment}>Kommentar: {log.comment}</p>
            )}
            <button
              className={styles.deleteBtn}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDelete(log.id);
              }}
            >
              <p>Ta bort</p>
            </button>
          </div>
        );
      })}
    </div>
  );
}
