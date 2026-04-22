"use client";

import styles from "./returnBtn.module.css";

export interface ReturnBtnProps {
  onClick?: () => void;
}

export default function ReturnBtn({ onClick }: ReturnBtnProps) {
  return (
    <button className={styles.button} onClick={onClick}>
      <span className={styles.arrow}>←</span>
      <span className={styles.text}>Tillbaka</span>
    </button>
  );
}
