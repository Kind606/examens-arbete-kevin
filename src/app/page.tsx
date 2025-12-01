"use client";
import NavBar from "../components/navBar/navBar";
import SplitRender from "../components/splitRender/splitRender";
import { useProtectedRoute } from "../hooks/useProtectedRoute";
import styles from "./page.module.css";

export default function Home() {
  useProtectedRoute();
  return (
    <div className={styles.container}>
      <NavBar />
      <main className={styles.main}>
        <div className={styles.splash}>
          <div className={styles.welcomeBox}>
            <h1>Välkommen!</h1>
            <br />
            <h1>Här nere ser du alla dina splits</h1>
          </div>
          <div className={styles.splits}>
            <SplitRender />
          </div>
        </div>
      </main>
    </div>
  );
}
