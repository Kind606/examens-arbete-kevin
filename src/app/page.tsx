import NavBar from "../components/navBar/navBar";
import SplitRender from "../components/splitRender/splitRender";
import { requireUser } from "../hooks/requireUser";
import styles from "./page.module.css";

export default async function Home() {
  const user = await requireUser();

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
            <h1>Dina splits</h1>
            <SplitRender userId={user.id} />
          </div>
        </div>
      </main>
    </div>
  );
}
