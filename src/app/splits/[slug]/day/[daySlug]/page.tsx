"use server";
import { PrismaClient } from "@/generated/prisma/client";
import NavBar from "@/src/components/navBar/navBar";
import SplitDayClient from "./splitDayClient";

const prisma = new PrismaClient();

export default async function dayShowcase({
  params,
}: {
  params: { slug: string; daySlug: string };
}) {
  return (
    <div>
      <NavBar />
      <SplitDayClient />
    </div>
  );
}
