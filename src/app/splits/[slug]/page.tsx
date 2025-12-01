import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

interface SplitPageProps {
  params: Promise<{ slug: string }>;
}

export default async function SplitPage({ params }: SplitPageProps) {
  const { slug } = await params;
  if (!slug) return <div>Invalid URL</div>;

  const split = await prisma.split.findUnique({
    where: { slug },
  });

  if (!split) return <div>Split not found</div>;

  return (
    <div>
      <h1>{split.title}</h1>
      <p>Created at: {new Date(split.createdAt).toLocaleString()}</p>
    </div>
  );
}
