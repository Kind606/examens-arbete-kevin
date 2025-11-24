import LoginForm from "@/src/components/loginComps/loginForm";
import styles from "./login.module.css";

export default function LoginPage() {
  return (
    <div className={styles.LoginContainer}>
      <div className={styles.Splash}>
        <LoginForm />
        <img src="./Logo.svg" alt="Logo" className={styles.Logo} />
      </div>
    </div>
  );
}
