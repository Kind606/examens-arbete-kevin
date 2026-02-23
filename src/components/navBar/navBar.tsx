"use client";

import Image from "next/image";
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

      <Image
        src="/Logo.svg"
        alt="Logo"
        width={80}
        height={60}
        className={styles.Logo}
      />
      <div ref={mobileRef}>
        {mobileOpen && <MobileMenu close={() => setMobileOpen(false)} />}
      </div>
    </nav>
  );
}
