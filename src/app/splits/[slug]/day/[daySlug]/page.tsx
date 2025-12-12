"use server";

import { PrismaClient } from "@/generated/prisma/client";
import NavBar from "@/src/components/navBar/navBar";
import SplitDayClient from "./splitDayClient";

const prisma = new PrismaClient();

interface DayShowcaseProps {
  params: Promise<{ slug: string; daySlug: string }>;
}

export default async function DayShowcase({ params }: DayShowcaseProps) {
  const { slug, daySlug } = await params;

  const split = await prisma.split.findUnique({
    where: { slug },
  });

  if (!split) return <div>Split not found</div>;

  const day = await prisma.day.findUnique({
    where: {
      slug_splitId: {
        slug: daySlug,
        splitId: split.id,
      },
    },
    include: {
      exercises: true,
    },
  });

  if (!day) return <div>Day not found</div>;

  return (
    <div>
      <NavBar />
      <SplitDayClient day={day} splitSlug={slug} daySlug={daySlug} />
    </div>
  );
}
