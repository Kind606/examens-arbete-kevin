"use server";

import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

const DAYS = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"];

export async function addSplitAction(title: string, userId: string) {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  const split = await prisma.split.create({
    data: {
      title,
      slug,
      userId,
      days: {
        create: DAYS.map((day) => ({
          name: day,
          slug: day.toLowerCase(),
        })),
      },
    },
    include: { days: true },
  });

  return {
    id: split.id,
    title: split.title,
    slug: split.slug,
    userId: split.userId,
    createdAt: split.createdAt,
    days: split.days.map((d) => ({ id: d.id, name: d.name, slug: d.slug })),
  };
}
