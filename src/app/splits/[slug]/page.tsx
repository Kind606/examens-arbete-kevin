"use server";

import { PrismaClient } from "@/generated/prisma/client";
import NavBar from "@/src/components/navBar/navBar";
import { requireUser } from "@/src/hooks/requireUser";
import { SplitPageProps } from "@/src/types";
import SplitClient from "./splitClient";
import styles from "./splitPage.module.css";

const prisma = new PrismaClient();

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
