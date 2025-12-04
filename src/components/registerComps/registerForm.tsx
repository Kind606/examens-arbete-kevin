"use client";

import Link from "next/link";
import styles from "../loginComps/loginform.module.css";
import { useRegisterForm } from "./registerFormHook";

function RegisterForm() {
  const { register, handleSubmit, errors, loading, error } = useRegisterForm();

  return (
    <form className={styles.LoginForm} onSubmit={handleSubmit}>
      <h3>REGISTERA</h3>
      <p>välkommen! vänligen fyll i med dina uppgifter</p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className={styles.inputGroup}>
        <label className={styles.label}>Username</label>
        <input
          aria-label="username"
          type="text"
          className={styles.input}
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && (
          <p style={{ color: "red" }}>{errors.username.message}</p>
        )}

        <label className={styles.label}>Password</label>
        <input
          aria-label="password"
          type="password"
          className={styles.input}
          {...register("password", {
            required: "Password is required",
            minLength: { value: 8, message: "Password must be at least 8 characters" },
          })}
        />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )}
      </div>

      <hr />

      <div className={styles.NoAccContainer}>
        <p>Har du redan ett konto?</p>
        <Link href="/login">Logga in här!</Link>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Registerar..." : "Registera"}
      </button>
    </form>
  );
}

export default RegisterForm;
