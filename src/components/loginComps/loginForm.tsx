import styles from "./loginform.module.css";

function LoginForm() {
  return (
    <form className={styles.LoginForm}>
      <h3>LOGIN</h3>
      <p>välkommen! vänligen fyll i med dina uppgifter</p>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Username</label>
        <input type="text" />
        <label className={styles.label}>Password</label>
        <input type="password" />
        <a href="#">glömt lösenord?</a>
      </div>
      <hr />

      <button>Login</button>
    </form>
  );
}

export default LoginForm;
