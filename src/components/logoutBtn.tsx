"use client";

import styles from "./logoutBtn.module.css";
import LogoutBtnHook from "./logoutBtnHook";

export default function LogoutButton() {
  const { handleLogout } = LogoutBtnHook();

  return (
    <button onClick={handleLogout} className={styles.LogoutButton}>
      Logga ut
    </button>
  );
}
