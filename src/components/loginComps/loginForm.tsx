"use client";

import { User } from "@/src/types";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useLogin } from "./loginFormHook";
import styles from "./loginform.module.css";

function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<User>();

  const { handleLogin } = useLogin();

  const onSubmit = (data: User) => {
    handleLogin(data.username, data.password, setError);
  };

  return (
    <form className={styles.LoginForm} onSubmit={handleSubmit(onSubmit)}>
      <h3>LOGIN</h3>
      <p>välkommen! vänligen fyll i med dina uppgifter</p>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Username</label>
        <input
          aria-label="username"
          type="text"
          {...register("username", {
            required: "Användarnamn krävs",
            minLength: {
              value: 1,
              message: "Användarnamn måste vara minst 1 tecken",
            },
          })}
          className={`${styles.input} ${errors.username ? styles.invalid : ""}`}
        />
        {errors.username && (
          <span className={styles.error}>{errors.username.message}</span>
        )}

        <label className={styles.label}>Password</label>
        <input
          aria-label="password"
          type="password"
          {...register("password", {
            required: "Lösenord krävs",
            minLength: {
              value: 8,
              message: "Lösenord måste vara minst 8 tecken",
            },
          })}
          className={`${styles.input} ${errors.password ? styles.invalid : ""}`}
        />
        {errors.password && (
          <span className={styles.error}>{errors.password.message}</span>
        )}

        <Link href="/forgot-password">glömt lösenord?</Link>
      </div>

      <hr />

      <div className={styles.NoAccContainer}>
        <p>Har du inte ett konto?</p>
        <Link href="/register">Skapa konto</Link>
      </div>

      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
