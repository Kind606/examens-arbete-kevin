import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/authStore";
import { logoutUser } from "./logoutBtnAction";

export default function LogoutBtnHook() {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = async () => {
    logout();
    // Clear cookie server-side for security
    await logoutUser();
    router.push("/login");
    router.refresh();
  };
  return { handleLogout };
}
