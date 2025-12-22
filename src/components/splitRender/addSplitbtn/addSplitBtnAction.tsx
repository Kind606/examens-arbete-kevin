"use server";

import { PrismaClient } from "@/generated/prisma/client";
import { slugify } from "@/src/utils/slugify";

const prisma = new PrismaClient();

const DAYS = [
  "Måndag",
  "Tisdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lördag",
  "Söndag",
];

export async function addSplitAction(title: string, userId: string) {
  const splitSlug = slugify(title);

  const split = await prisma.split.create({
    data: {
      title,
      slug: splitSlug,
      userId,
      days: {
        create: DAYS.map((day) => ({
          name: day,
          slug: slugify(day),
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
