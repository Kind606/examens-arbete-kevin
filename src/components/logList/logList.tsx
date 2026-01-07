"use client";

import { LogListProps } from "@/src/types";
import styles from "./logList.module.css";
import { useLogList } from "./logListHook";

export default function LogList({ logs, setLogs }: LogListProps) {
  const {
    sortedLogs,
    sortOrder,
    expandedLogs,
    handleDelete,
    toggleSortOrder,
    toggleExpanded,
    getStrengthComparison,
  } = useLogList(logs, setLogs);

  if (logs.length === 0) return <p>Inga loggar tillagda än.</p>;

  return (
    <div className={styles.logsList}>
      <div className={styles.header}>
        <h2>Exercise Logs</h2>
        <button className={styles.sortButton} onClick={toggleSortOrder}>
          {sortOrder === "newest" ? "↓ Nyaste" : "↑ Äldsta"}
        </button>
      </div>
      {sortedLogs.map((log, index) => {
        const comparison = getStrengthComparison(index);
        const isExpanded = expandedLogs.has(log.id);

        return (
          <div key={log.id} className={styles.logCard}>
            <div className={styles.logItem}>
              <div
                className={styles.date}
                onClick={() => toggleExpanded(log.id)}
                style={{ cursor: "pointer" }}
              >
                <p>
                  <span className={styles.expandIcon}>
                    {isExpanded ? "▼" : "▶"}
                  </span>
                  <strong>
                    {new Date(log.createdAt).toLocaleDateString("sv-SE")}
                  </strong>
                  {((sortOrder === "newest" && index === 0) ||
                    (sortOrder === "oldest" &&
                      index === sortedLogs.length - 1)) && (
                    <span className={styles.latestBadge}>Senaste</span>
                  )}
                </p>
              </div>

              {isExpanded && (
                <>
                  <div className={styles.stats}>
                    <p>Antal sets: {log.sets.length}</p>
                    {log.sets.map((set, idx) => (
                      <div key={idx} className={styles.setInfo}>
                        <span className={styles.setLabel}>Set {idx + 1}:</span>
                        <span
                          className={`${styles.setBadge} ${styles.repsBadge}`}
                        >
                          {set.reps ?? "-"} reps
                        </span>
                        <span
                          className={`${styles.setBadge} ${styles.weightBadge}`}
                        >
                          {set.weight ?? "Kroppsvikt"} kg
                        </span>
                      </div>
                    ))}
                  </div>

                  {comparison && comparison.weightDiff !== 0 && (
                    <div
                      className={`${styles.strengthComparison} ${
                        comparison.weightDiff > 0
                          ? styles.positive
                          : styles.negative
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
                          `Ökning! +${comparison.weightDiff} kg sedan senaste`}
                        {comparison.weightDiff < 0 &&
                          `Minskning: ${comparison.weightDiff} kg sedan senaste`}
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
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
