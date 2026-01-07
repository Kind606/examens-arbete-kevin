"use client";

import Image from "next/image";
import styles from "../addSplitbtn/addSplitBtn.module.css";
import { useRemoveSplit } from "./removeSplitBtnHook";
import { RemoveSplitBtnProps } from "@/src/types";

export default function RemoveSplitBtn({ splitId }: RemoveSplitBtnProps) {
  const { removeSplit } = useRemoveSplit();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeSplit(splitId);
  };

  return (
    <button className={styles.button} onClick={handleClick}>
      <Image src="/delete.svg" alt="Delete" width={24} height={24} />
    </button>
  );
}
