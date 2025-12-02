"use server";
import { PrismaClient } from "@/generated/prisma/client";
import { requireUser } from "@/src/hooks/requireUser";
const prisma = new PrismaClient();

export default async function dayShowcase({
  params,
}: {
  params: { slug: string; daySlug: string };
}) {
  const { slug: splitSlug, daySlug } = params;
  const user = await requireUser();

  const day = await prisma.day.findFirst({
    where: {
      slug: daySlug,
      split: { slug: splitSlug, userId: user.id },
    },
    include: { exercises: true },
  });
  return <div> test</div>;
}
