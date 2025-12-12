"use server";

import { PrismaClient } from "@/generated/prisma/client";
import NavBar from "@/src/components/navBar/navBar";
import SplitDayClient from "./splitDayClient";
import { requireUser } from "@/src/hooks/requireUser";
import styles from "./splitDayPage.module.css";

const prisma = new PrismaClient();

interface DayPageProps {
  params: Promise<{ slug: string; daySlug: string }>;
}

export default async function DayPage({ params }: DayPageProps) {
  // server-side auth
  const user = await requireUser();

  const { slug, daySlug } = await params;

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
      <SplitDayClient user={user} day={day} splitSlug={slug} daySlug={daySlug} />
    </div>
  );
}
