import Link from "next/link";
import ProfileLink from "../profileLink/profileLink";
import styles from "../navBar.module.css";

export default function DesktopNav() {
  return (
    <ul className={styles.NavLinksContainer}>
      <div className={styles.desktopLinks}>
        <li>
          <Link href="/" className={styles.NavLink}>
            HEM
          </Link>
        </li>
        <li>
          <Link href="/" className={styles.NavLink}>
            HOME
          </Link>
        </li>
        <li>
          <Link href="/" className={styles.NavLink}>
            HOME
          </Link>
        </li>
      </div>

      <ProfileLink />
    </ul>
  );
}
