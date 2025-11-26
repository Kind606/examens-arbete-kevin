"use client";

import { useAuthStore } from "@/src/store/authStore";
import Link from "next/link";
import LogoutButton from "../../logoutBtn/logoutBtn";
import styles from "./mobileMenu.module.css";

export default function MobileMenu({ close }: { close: () => void }) {
  const user = useAuthStore((state) => state.user);
  return (
    <div className={styles.MobileMenu}>
      <div className={styles.MobileProfile}>
        <span>inloggad som</span>
        <p>{user?.username}</p>
      </div>
      <Link className={styles.MobileLink} href="/" onClick={close}>
        HEM
      </Link>
      <Link className={styles.MobileLink} href="/" onClick={close}>
        HOME
      </Link>
      <Link className={styles.MobileLink} href="/" onClick={close}>
        HOME
      </Link>

      <LogoutButton />
    </div>
  );
}
