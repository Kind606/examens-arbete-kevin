import Link from "next/link";
import styles from "../navBar.module.css";
import ProfileLink from "../profileLink/profileLink";

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
            OM OSS
          </Link>
        </li>
        <li>
          <Link href="/" className={styles.NavLink}>
            KONTAKTA OSS
          </Link>
        </li>
      </div>

      <ProfileLink />
    </ul>
  );
}
