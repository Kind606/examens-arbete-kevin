"use client";

import SplitRender from "@/src/components/splitRender/splitRender";
import { useAuthStore } from "@/src/store/authStore";
import { useSplitStore } from "@/src/store/splitStore";
import { useEffect } from "react";
import { AuthUser, Split } from "../types";
import styles from "./page.module.css";

interface HomeClientProps {
  user: AuthUser;
  initialSplits: Split[];
}

export default function HomeClient({ user, initialSplits }: HomeClientProps) {
  const { splits, setSplits } = useSplitStore();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    login(user);

    if (splits.length === 0 && initialSplits.length > 0) {
      setSplits(initialSplits);
    }
  }, [user, initialSplits, login, splits, setSplits]);

  return (
    <main className={styles.main}>
      <div className={styles.splash}>
        <div className={styles.welcomeBox}>
          <h1>Välkommen!</h1>
          <h1>Här nere ser du alla dina splits</h1>
        </div>

        <div className={styles.splits}>
          <h1>Dina splits</h1>
          <SplitRender userId={user.id} initialSplits={initialSplits} />
        </div>
      </div>
    </main>
  );
}
