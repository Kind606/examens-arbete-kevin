"use server";

import { PrismaClient } from "@/generated/prisma/client";
import { NavBar } from "@/src";
import { requireUser } from "@/src/hooks/requireUser";
import SplitClient from "./splitClient";
import styles from "./splitPage.module.css";

const prisma = new PrismaClient();

interface SplitPageProps {
  params: Promise<{ slug: string }>;
}

export default async function SplitPage({ params }: SplitPageProps) {
  const user = await requireUser();

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
      <SplitClient user={user} split={split} />
    </div>
  );
}
