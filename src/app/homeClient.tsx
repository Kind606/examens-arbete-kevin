"use client";

import { SplitRender } from "@/src";
import { useHomeClient } from "../hooks/homeClinetHook";
import { AuthUser } from "../types";
import styles from "./page.module.css";

interface HomeClientProps {
  user: AuthUser;
}

export default function HomeClient({ user }: HomeClientProps) {
  useHomeClient(user);
  return (
    <main className={styles.main}>
      <div className={styles.splash}>
        <div className={styles.welcomeBox}>
          <h1>Välkommen!</h1>
          <h1>Här nere ser du alla dina splits</h1>
        </div>

        <div className={styles.splits}>
          <h1>Dina splits</h1>
          <SplitRender userId={user.id} />
        </div>
      </div>
    </main>
  );
}
