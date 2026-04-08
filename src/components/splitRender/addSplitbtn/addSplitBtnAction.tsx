"use server";

import { prisma } from "@/src/lib/prisma";
import { checkRateLimit, RATE_LIMITS } from "@/src/lib/rateLimit";
import { slugify } from "@/src/utils/slugify";

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
  // Rate limiting
  const rateLimitCheck = checkRateLimit(
    `split:create:${userId}`,
    RATE_LIMITS.CREATE,
  );
  if (rateLimitCheck.limited) {
    throw new Error("Too many requests. Please try again later.");
  }

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
