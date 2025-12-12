
"use server";

import { PrismaClient } from "@/generated/prisma/client";
import { verifyToken } from "@/src/components/loginComps/loginFormActions";
import NavBar from "@/src/components/navBar/navBar";
import AddExerciseBtn from "@/src/components/addExerciseBtn/addExerciseBtn";
import ExerciseRender from "@/src/components/exerciseRender/exerciseRender";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import styles from "./splitDayPage.module.css";


const prisma = new PrismaClient();

interface DayPageProps {
  params: Promise<{ slug: string; daySlug: string }>;
}

export default async function DayPage({ params }: DayPageProps) {
  const { slug, daySlug } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const user = token ? await verifyToken(token) : null;
  if (!user) return redirect("/login");

  const split = await prisma.split.findUnique({ where: { slug } });
  if (!split) return <div>Split not found</div>;

  const day = await prisma.day.findUnique({
    where: { slug_splitId: { slug: daySlug, splitId: split.id } },
    include: { exercises: true },
  });
  if (!day) return <div>Day not found</div>;

  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.header}>
        <a href={`/splits/${slug}`}>&lt; Back</a>
        <h1>{day.name}</h1>
      </div>

      <h2>Exercises:</h2>
      <ExerciseRender
        splitSlug={slug}
        daySlug={daySlug}
        initialExercises={day.exercises}
      />

      <AddExerciseBtn dayId={day.id} onExerciseAdded={() => {}} />
    </div>
  );
}
