"use client";
import LoginForm from "@/src/components/loginComps/loginForm";
import { useGuestRoute } from "@/src/hooks/useGuestRoute";
import Image from "next/image";
import styles from "./login.module.css";

export default function LoginPage() {
  useGuestRoute();
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
