"use client";

import { useSplitStore } from "@/src/store/splitStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AddSplitBtn from "../addSplitbtn/addSplitBtn";
import styles from "./splitRender.module.css";
import { useFetchSplits } from "./splitRenderHook";

interface SplitRenderProps {
  userId: string;
}

export default function SplitRender({ userId }: SplitRenderProps) {
  const { splits, loading, error, setSplits } = useSplitStore();
  const { fetchSplits } = useFetchSplits();
  const router = useRouter();

  useEffect(() => {
    if (userId) {
      fetchSplits(userId);
    }
  }, [userId, fetchSplits]);

  const handleDelete = (id: string) => {
    const confirmed = confirm(
      "Är du säker på att du vill ta bort denna split?"
    );
    if (!confirmed) return;

    setSplits(splits.filter((split) => split.id !== id));
    // TODO: Call server action to delete split from DB
  };

  const handleEdit = (id: string) => {
    const newTitle = prompt("Ange nytt namn för split:");
    if (!newTitle) return;

    setSplits(
      splits.map((split) =>
        split.id === id ? { ...split, title: newTitle } : split
      )
    );
    // TODO: Call server action to update split title in DB
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (splits.length === 0) return <div>No splits found</div>;

  return (
    <div className={styles.splitRender}>
      {splits.map((split) => (
        <div
          key={split.id}
          className={styles.splitCard}
          onClick={() => router.push(`/splits/${split.id}`)}
          style={{ cursor: "pointer", position: "relative" }}
        >
          <h3>{split.title}</h3>

          <div style={{ position: "absolute", top: 10, right: 10 }}>
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevent navigating when editing
                handleEdit(split.id);
              }}
              style={{ marginRight: 8 }}
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevent navigating when deleting
                handleDelete(split.id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <AddSplitBtn />
    </div>
  );
}
