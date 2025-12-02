import { PrismaClient } from "@/generated/prisma/client";
import NavBar from "@/src/components/navBar/navBar";
import { requireUser } from "@/src/hooks/requireUser";
import SplitClient from "./splitClient";

const prisma = new PrismaClient();

interface SplitPageProps {
  params: Promise<{ slug: string }>;
}

export default async function SplitPage({ params }: SplitPageProps) {
  const { slug } = await params;
  const user = await requireUser();

  const split = await prisma.split.findUnique({
    where: { slug },
  });

  if (!split) {
    return <div>Split not found</div>;
  }

  return (
    <div>
      <NavBar />
      <SplitClient user={user} split={split} />
    </div>
  );
}
