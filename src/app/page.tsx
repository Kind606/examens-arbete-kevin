import { PrismaClient } from "@/generated/prisma/client";
import { verifyToken } from "@/src/components/loginComps/loginFormActions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import NavBar from "../components/navBar/navBar";
import HomeClient from "./homeClient";
import styles from "./page.module.css";

const prisma = new PrismaClient();

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const user = token ? await verifyToken(token) : null;

  if (!user) {
    return redirect("/login");
  }

  const splits = await prisma.split.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className={styles.container}>
      <NavBar />
      <HomeClient user={user} initialSplits={splits} />
    </div>
  );
}
