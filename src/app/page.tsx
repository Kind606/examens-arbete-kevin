"use client";
import LogoutButton from "../components/logoutBtn";
import NavBar from "../components/navBar/navBar";
import { useProtectedRoute } from "../hooks/useProtectedRoute";
import styles from "./page.module.css";

export default function Home() {
  useProtectedRoute();
  return (
    <div className={styles.container}>
      <NavBar />
      <main className={styles.main}>
        <div className={styles.content}>
          <h1>Hej hej</h1>
          <LogoutButton />
        </div>
      </main>
    </div>
  );
}
