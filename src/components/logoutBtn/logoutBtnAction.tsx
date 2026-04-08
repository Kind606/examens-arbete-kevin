"use server";

import { cookies } from "next/headers";

/**
 * Server action to clear the authentication cookie
 */
export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  return { success: true };
}
