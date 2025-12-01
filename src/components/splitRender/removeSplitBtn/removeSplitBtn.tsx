"use client";

import Image from "next/image";
import styles from "../editSplitBtn/editSplitBtn.module.css";
import { useRemoveSplit } from "./removeSplitBtnHook";


interface RemoveSplitBtnProps {
  splitId: string;
}

export default function RemoveSplitBtn({ splitId }: RemoveSplitBtnProps) {
  const { removeSplit } = useRemoveSplit();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation
    removeSplit(splitId);
  };

  return (
    <button className={styles.button} onClick={handleClick}>
      <Image src="/delete.svg" alt="Delete" width={24} height={24} />
    </button>
  );
}
