"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";
import styles from "./logoutBtn.module.css";

export default function LogoutButton() {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    document.cookie = "auth_token=; path=/; max-age=0; samesite=strict";
    router.push("/login");
  };

  return (
    <button onClick={handleLogout} className={styles.LogoutButton}>
      Logga ut
    </button>
  );
}
