import ExternalLink from "../../icons/externalLink";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerSection}>
        <h4>Kontakt</h4>
        <ul className={styles.contactList}>
          <li>
            <a href="mailto:info@täningsplannerare.com">
              Email
              <ExternalLink size={16} />
            </a>
          </li>
          <li>
            <a href="tel:+1234567890">
              Telefon
              <ExternalLink size={16} />
            </a>
          </li>
          <li>
            <a
              href="https://www.google.com/maps/place/Stockholm,+Sweden"
              target="_blank"
              rel="noopener noreferrer"
            >
              Plats
              <ExternalLink size={16} />
            </a>
          </li>
        </ul>
      </div>
      <p className={styles.copyright}>
        © 2024 Täningsplannerare. All rights reserved.
      </p>
    </footer>
  );
}
