"use client";

import { useAuthStore } from "@/src/store/authStore";
import { useEffect, useRef, useState } from "react";
import LogoutButton from "../../logoutBtn/logoutBtn";
import styles from "./profileLink.module.css";

export default function ProfileLink() {
  const user = useAuthStore((state) => state.user);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className={styles.ProfileContainer} ref={dropdownRef}>
      <button
        className={styles.ProfileLink}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={styles.ProfileSpan}>inloggad som</span>
        <p>{user?.username}</p>
      </button>

      {open && (
        <div className={styles.Dropdown}>
          <LogoutButton />
        </div>
      )}
    </div>
  );
}
