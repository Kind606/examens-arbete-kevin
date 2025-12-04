"use server";

import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

const DAYS = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"];

// Helper to convert day names to ASCII-friendly slugs
function slugifyDay(name: string) {
  const map: Record<string, string> = {
    å: "a",
    ä: "a",
    ö: "o",
    Å: "a",
    Ä: "a",
    Ö: "o",
  };
  return name
    .toLowerCase()
    .replace(/[åäöÅÄÖ]/g, (match) => map[match] || match)
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

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
          name: day, // Keep original name with å, ö, etc.
          slug: slugifyDay(day), // ASCII-friendly slug
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
