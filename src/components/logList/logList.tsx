"use client";

import { ExerciseType, LogListProps } from "@/src/types";
import styles from "./logList.module.css";
import { useLogList } from "./logListHook";

export default function LogList({
  exercise,
  logs,
  setLogs,
  userId,
}: LogListProps) {
  const {
    groupedLogs,
    sortOrder,
    dateFilter,
    expandedLogs,
    handleDelete,
    toggleSortOrder,
    setDateFilter,
    toggleExpanded,
    getStrengthComparison,
    visibleCounts,
    loadMore,
  } = useLogList(logs, setLogs, userId);

  const isCardio = exercise.exerciseType === ExerciseType.CARDIO;

  if (logs.length === 0) return <p>Inga loggar tillagda än.</p>;

  const allSortedLogs = [
    ...groupedLogs.today,
    ...groupedLogs.thisWeek,
    ...groupedLogs.earlier,
  ];

  const renderLogGroup = (
    groupLogs: typeof groupedLogs.today,
    groupName: keyof typeof visibleCounts,
    title: string,
  ) => {
    if (groupLogs.length === 0) return null;

    const visible = groupLogs.slice(0, visibleCounts[groupName]);
    const hasMore = groupLogs.length > visibleCounts[groupName];

    return (
      <div className={styles.logGroup}>
        <h3 className={styles.groupTitle}>{title}</h3>
        {visible.map((log) => {
          const comparison = getStrengthComparison(log, allSortedLogs);
          const isExpanded = expandedLogs.has(log.id);
          const isLatest =
            sortOrder === "newest" && log.id === allSortedLogs[0]?.id;

          return (
            <div key={log.id} className={styles.logCard}>
              <div className={styles.logItem}>
                <div
                  className={styles.date}
                  onClick={() => toggleExpanded(log.id)}
                  style={{ cursor: "pointer" }}
                >
                  <p>
                    <span
                      className={`${styles.expandIcon} ${
                        isExpanded ? styles.open : ""
                      }`}
                    >
                      ▶
                    </span>
                    <strong>
                      {new Date(log.createdAt).toLocaleDateString("sv-SE")}
                    </strong>
                    {isLatest && (
                      <span className={styles.latestBadge}>Senaste</span>
                    )}
                  </p>
                </div>

                {isExpanded && (
                  <>
                    <div className={styles.stats}>
                      {log.sets.map((set, idx) => (
                        <div key={idx} className={styles.setInfo}>
                          <span className={styles.setLabel}>
                            Set {idx + 1}:
                          </span>
                          {isCardio ? (
                            <>
                              <span
                                className={`${styles.setBadge} ${styles.timeBadge}`}
                              >
                                {set.time
                                  ? `${Math.floor(set.time / 60)}:${String(
                                      set.time % 60,
                                    ).padStart(2, "0")} min`
                                  : "-"}
                              </span>
                              {set.distance && (
                                <span
                                  className={`${styles.setBadge} ${styles.distanceBadge}`}
                                >
                                  {set.distance} km
                                </span>
                              )}
                            </>
                          ) : (
                            <>
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
                            </>
                          )}
                        </div>
                      ))}
                    </div>

                    {comparison && (
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
                          {comparison.weightDiff > 0
                            ? `Ökning! +${comparison.weightDiff} kg sedan senaste`
                            : `Minskning: ${comparison.weightDiff} kg sedan senaste`}
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
        {hasMore && (
          <button
            className={styles.loadMoreBtn}
            onClick={() => loadMore(groupName)}
          >
            Visa fler ({groupLogs.length - visibleCounts[groupName]} kvar)
          </button>
        )}
      </div>
    );
  };

  return (
    <div className={styles.logsList}>
      <div className={styles.header}>
        <h2>Exercise Logs</h2>
        <div className={styles.controls}>
          <select
            className={styles.filterSelect}
            value={dateFilter}
            onChange={(e) =>
              setDateFilter(
                e.target.value as "7days" | "30days" | "3months" | "all",
              )
            }
          >
            <option value="7days">Senaste 7 dagarna</option>
            <option value="30days">Senaste 30 dagarna</option>
            <option value="3months">Senaste 3 månaderna</option>
            <option value="all">Alla</option>
          </select>
          <button className={styles.sortButton} onClick={toggleSortOrder}>
            {sortOrder === "newest" ? "↓ Nyaste" : "↑ Äldsta"}
          </button>
        </div>
      </div>

      {renderLogGroup(groupedLogs.today, "today", "Idag")}
      {renderLogGroup(groupedLogs.thisWeek, "thisWeek", "Den här veckan")}
      {renderLogGroup(groupedLogs.earlier, "earlier", "Tidigare")}
    </div>
  );
}
