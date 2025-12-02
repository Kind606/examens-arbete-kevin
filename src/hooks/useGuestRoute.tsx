import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "../components/loginComps/loginFormActions";

export async function GuestRoute() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return;

  const user = await verifyToken(token);

  if (user) {
    redirect("/");
  }
}
