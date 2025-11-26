"use client";
import RegisterForm from "@/src/components/registerComps/registerForm";
import { useGuestRoute } from "@/src/hooks/useGuestRoute";
import Image from "next/image";
import styles from "./Register.module.css";

export default function RegisterPage() {
  useGuestRoute();
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
