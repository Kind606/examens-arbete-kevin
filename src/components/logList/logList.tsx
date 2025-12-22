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

  return (
    <div className={styles.logsList}>
      <h2>Exercise Logs</h2>
      {logs.map((log) => (
        <div key={log.id} className={styles.logCard}>
          <div className={styles.logItem}>
            <div className={styles.date}>
              <p>
                <strong>
                  {new Date(log.createdAt).toLocaleDateString("sv-SE")}
                </strong>
              </p>
            </div>
            <div className={styles.stats}>
              <p>Sets: {log.sets ?? "-"}</p>
              <p>Reps: {log.reps ?? "-"}</p>
              <p>Vikt: {log.weight ?? "N/A"} Kg</p>
            </div>
          </div>
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
      ))}
    </div>
  );
}
