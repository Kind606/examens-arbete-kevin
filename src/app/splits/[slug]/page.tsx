"use server";

import { NavBar } from "@/src";
import { requireUser } from "@/src/hooks/requireUser";
import { prisma } from "@/src/lib/prisma";
import SplitClient from "./splitClient";
import styles from "./splitPage.module.css";

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

  // Authorization: Verify user owns the split
  if (split.userId !== user.id) {
    return (
      <div>Unauthorized: You don&apos;t have permission to view this split</div>
    );
  }

  return (
    <div className={styles.container}>
      <NavBar />
      <SplitClient user={user} split={split} />
    </div>
  );
}
