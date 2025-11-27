import Link from "next/link";
import styles from "../navBar.module.css";
import ProfileLink from "../profileLink/profileLink";

export default function DesktopNav() {
  return (
    <div className={styles.NavLinksContainer}>
      <ul className={styles.desktopLinks}>
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
      </ul>
      <div>
        <ProfileLink />
      </div>
    </div>
  );
}
