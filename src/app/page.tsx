import { verifyToken } from "@/src/components/loginComps/loginFormActions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import NavBar from "../components/navBar/navBar";
import HomeClient from "./homeClient";
import styles from "./page.module.css";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const user = token ? await verifyToken(token) : null;

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className={styles.container}>
      <NavBar />
      <HomeClient user={user} />
    </div>
  );
}
