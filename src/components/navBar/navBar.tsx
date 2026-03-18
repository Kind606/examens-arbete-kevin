"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./navBar.module.css";

import DesktopNav from "./desktop/DesktopNav";
import MobileMenu from "./mobileMenu/MobileMenu";
import useNavBar from "./navBarHook";

export default function NavBar() {
  const { mobileOpen, setMobileOpen, mobileRef } = useNavBar();

  return (
    <nav className={styles.NavBar}>
      <button
        className={styles.Hamburger}
        onClick={() => setMobileOpen(!mobileOpen)}
        id="mobile-toggle"
      >
        ☰
      </button>

      <DesktopNav />

      <Link href="/" className={styles.LogoLink}>
        <Image
          src="/Logo.svg"
          alt="Logo"
          width={80}
          height={60}
          className={styles.Logo}
        />
      </Link>
      <div ref={mobileRef}>
        {mobileOpen && <MobileMenu close={() => setMobileOpen(false)} />}
      </div>
    </nav>
  );
}
