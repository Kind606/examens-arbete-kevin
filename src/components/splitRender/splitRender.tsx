"use client";

import { useSplitStore } from "@/src/store/splitStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AddSplitBtn from "./addSplitbtn/addSplitBtn";
import EditSplitBtn from "./editSplitBtn/editSplitBtn";
import RemoveSplitBtn from "./removeSplitBtn/removeSplitBtn";
import styles from "./splitRender.module.css";
import { useFetchSplits } from "./splitRenderHook";

interface SplitRenderProps {
  userId: string;
}

export default function SplitRender({ userId }: SplitRenderProps) {
  const { splits, loading, error } = useSplitStore();
  const { fetchSplits } = useFetchSplits();
  const router = useRouter();

  useEffect(() => {
    if (userId) {
      fetchSplits(userId);
    }
  }, [userId, fetchSplits]);

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

          <div>
            <EditSplitBtn splitId={split.id} currentTitle={split.title} />
            <RemoveSplitBtn splitId={split.id} style={{ marginLeft: "8px" }} />
          </div>
        </div>
      ))}
      <AddSplitBtn />
    </div>
  );
}
