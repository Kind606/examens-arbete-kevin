

import { verifyToken } from "@/src/components/loginComps/loginFormActions"; // new server-side function

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function requireUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  const user = token ? await verifyToken(token) : null;

  if (!user) {
    redirect("/login");
  }

  return user;
}
