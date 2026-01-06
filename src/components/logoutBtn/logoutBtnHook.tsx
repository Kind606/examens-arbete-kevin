import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/authStore";

export default function LogoutBtnHook() {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    document.cookie = "auth_token=; path=/; max-age=0; samesite=strict";
    router.push("/login");
    router.refresh();
  };
  return { handleLogout };
}
