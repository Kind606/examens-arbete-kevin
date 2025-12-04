"use server";
import { PrismaClient } from "@/generated/prisma/client";
const prisma = new PrismaClient();

export default async function dayShowcase({
  params,
}: {
  params: { slug: string; daySlug: string };
}) {
  return <div> test</div>;
}
