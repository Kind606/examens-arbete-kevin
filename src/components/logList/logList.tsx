"use client";

import { ExerciseLog } from "@/src/types";
import Image from "next/image";
import styles from "./logList.module.css";
import { useLogRender } from "./logListRemoveBtnHook";

interface LogListProps {
  initialLogs: ExerciseLog[];
}

export default function LogList({ initialLogs }: LogListProps) {
  const { logs, handleDelete } = useLogRender(initialLogs);

  if (logs.length === 0) return <p>Inga loggar tillagda än.</p>;

  return (
    <div className={styles.logsList}>
      <h2>Exercise Logs</h2>
      {logs.map((log) => (
        <div key={log.id} className={styles.logCard}>
          <div className={styles.logItem}>
            <p>
              <strong>
                {new Date(log.createdAt).toLocaleDateString("sv-SE")}
              </strong>
            </p>
            <div>
              <p>Sets: {log.sets ?? "-"}</p>
              <p>Reps: {log.reps ?? "-"}</p>
              <p>Vikt: {log.weight ?? "N/A"} Kg</p>
            </div>
          </div>
          {log.comment && <p>Kommentar: {log.comment}</p>}
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
