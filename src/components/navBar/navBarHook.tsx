"use client";
import { useEffect, useRef, useState } from "react";

export default function useNavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (mobileRef.current && !mobileRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    const onResize = () => {
      if (window.innerWidth > 800) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      document.removeEventListener("mousedown", handler);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return { mobileOpen, setMobileOpen, mobileRef };
}
