"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./navBar.module.css";

import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  

  return (
    <nav className={styles.NavBar}>
      <button
        className={styles.Hamburger}
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        ☰
      </button>

      <DesktopNav />

      <Image
        src="/Logo.svg"
        alt="Logo"
        width={120}
        height={120}
        className={styles.Logo}
      />
      {mobileOpen && <MobileMenu close={() => setMobileOpen(false)} />}
    </nav>
  );
}
