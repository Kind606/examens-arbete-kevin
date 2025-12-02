import { PrismaClient } from "@/generated/prisma/client";
import { verifyToken } from "@/src/components/loginComps/loginFormActions";
import NavBar from "@/src/components/navBar/navBar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

interface SplitPageProps {
  params: Promise<{ slug: string }>;
}

export default async function SplitPage({ params }: SplitPageProps) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const user = token ? await verifyToken(token) : null;

  const split = await prisma.split.findUnique({
    where: { slug },
  });

  if (!split) {
    return <div>Split not found</div>;
  }

  if (!user) {
    return redirect("/login");
  }

  return (
    <div>
      <NavBar />
      <h1>{split.title}</h1>
      <p>Created at: {new Date(split.createdAt).toLocaleString()}</p>
    </div>
  );
}
