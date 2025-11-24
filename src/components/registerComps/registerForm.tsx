import Link from "next/link";
import styles from "../loginComps/loginform.module.css";

function RegisterForm() {
  return (
    <form className={styles.LoginForm}>
      <h3>REGISTERA</h3>
      <p>välkommen! vänligen fyll i med dina uppgifter</p>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Username</label>
        <input type="text" />

        <label className={styles.label}>Password</label>
        <input type="password" />
      </div>
      <hr />
      <div className={styles.NoAccContainer}>
        <p>Har du inte redan ett konto?</p>
        <Link href="/login">Logga in här!</Link>
      </div>
      <button type="submit">Registera</button>
    </form>
  );
}

export default RegisterForm;
