"use client";
import RegisterForm from "@/src/components/registerComps/registerForm";
import Image from "next/image";
import styles from "./Register.module.css";

export default function RegisterPage() {
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
