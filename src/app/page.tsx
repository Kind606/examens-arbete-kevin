"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LogoutButton from "../components/logoutBtn";
import { useAuthStore } from "../store/authStore";
import styles from "./page.module.css";

export default function Home() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login"); 
  }, [user, router]);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.content}>
          <h1>Hej hej</h1>
          <LogoutButton />
        </div>
      </main>
    </div>
  );
}
