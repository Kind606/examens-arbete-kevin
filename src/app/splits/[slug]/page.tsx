"use server";
import { PrismaClient } from "@/generated/prisma/client";
import { verifyToken } from "@/src/components/loginComps/loginFormActions";
import NavBar from "@/src/components/navBar/navBar";
import SplitCard from "@/src/components/splitCard/splitCard";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import styles from "./splitPage.module.css";


const prisma = new PrismaClient();

interface SplitPageProps {
  params: Promise<{ slug: string }>;
}

export default async function SplitPage({ params }: SplitPageProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const user = token ? await verifyToken(token) : null;

  if (!user) return redirect("/login");

  const { slug } = await params;

  const split = await prisma.split.findUnique({
    where: { slug },
    include: {
      days: {
        include: {
          exercises: true,
        },
      },
    },
  });

  if (!split) return <div>Split not found</div>;

  return (
    <div className={styles.container}>
      <NavBar />

      <div className={styles.textContainer}>
        <Link href="/">&lt; Tillbaka</Link>
        <h1>{split.title}</h1>
      </div>

      <div className={styles.cardsGrid}>
        {split.days?.map((day) => (
          <SplitCard
            key={day.slug}
            splitSlug={split.slug}
            daySlug={day.slug}
            dayName={day.name}
            exercises={day.exercises}
            isEmpty={day.exercises.length === 0}
          />
        )) ?? []}
      </div>
    </div>
  );
}
