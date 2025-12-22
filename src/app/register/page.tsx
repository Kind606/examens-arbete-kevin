import RegisterForm from "@/src/components/registerComps/registerForm";
import { GuestRoute } from "@/src/hooks/GuestRoute";
import Image from "next/image";
import styles from "../login/login.module.css";

export default async function RegisterPage() {
  await GuestRoute();
  return (
    <div className={styles.LoginContainer}>
      <div className={styles.Splash}>
        <RegisterForm />
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
