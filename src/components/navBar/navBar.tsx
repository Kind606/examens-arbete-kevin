import Link from "next/link";
import styles from "./navBar.module.css";
import Image from "next/image";


export default function NavBar() {
  return (
    <nav className={styles.NavBar}>
      <ul className={styles.NavLinksContainer}>
        <li>
          <Link href="/" className={styles.NavLink}>HEM</Link>
        </li>
        <li>
          <Link href="/" className={styles.NavLink}>HOME</Link>
        </li>
        <li>
          <Link href="/" className={styles.NavLink}>HOME</Link>
        </li>
      </ul>
      <Image
        src="/Logo.svg"
        alt="Logo"
        width={120}
        height={120}
        className={styles.Logo}
      />
    </nav>
  );
}
