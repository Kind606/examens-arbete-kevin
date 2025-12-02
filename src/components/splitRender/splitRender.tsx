"use client";

import { useSplitStore } from "@/src/store/splitStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import AddSplitBtn from "./addSplitbtn/addSplitBtn";
import EditSplitBtn from "./editSplitBtn/editSplitBtn";
import RemoveSplitBtn from "./removeSplitBtn/removeSplitBtn";

import styles from "./splitRender.module.css";

interface SplitRenderProps {
  userId: string;
  initialSplits: Array<{
    id: string;
    title: string;
    slug: string;
    createdAt: Date;
  }>;
}

export default function SplitRender({ initialSplits }: SplitRenderProps) {
  const { splits, setSplits } = useSplitStore();
  const router = useRouter();

  useEffect(() => {
    if (splits.length === 0 && initialSplits.length > 0) {
      setSplits(initialSplits);
    }
  }, [splits, initialSplits, setSplits]);

  if (splits.length === 0) {
    return (
      <div className={styles.splitRender}>
        <p>No splits found</p>
        <AddSplitBtn />
      </div>
    );
  }

  return (
    <div className={styles.splitRender}>
      {splits.map((split) => (
        <div
          key={split.slug}
          className={styles.splitCard}
          onClick={() => router.push(`/splits/${split.slug}`)}
          style={{ cursor: "pointer", position: "relative" }}
        >
          <h3>{split.title}</h3>

          <div className={styles.buttonGroup}>
            <EditSplitBtn splitId={split.id} currentTitle={split.title} />
            <RemoveSplitBtn splitId={split.id} />
          </div>
        </div>
      ))}

      <AddSplitBtn />
    </div>
  );
}
