import LoginForm from "@/src/components/loginComps/loginForm";
import { GuestRoute } from "@/src/hooks/useGuestRoute";
import Image from "next/image";
import styles from "./login.module.css";

export default async function LoginPage() {
  await GuestRoute();
  return (
    <div className={styles.LoginContainer}>
      <div className={styles.Splash}>
        <LoginForm />
        <Image
          src="/Logo.svg"
          alt="Logo"
          width={120}
          height={120}
          className={styles.Logo}
        />
      </div>
    </div>
  );
}
