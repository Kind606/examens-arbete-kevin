"use client";
import { useEffect, useRef, useState } from "react";

export default function useNavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      const toggleButton = document.getElementById("mobile-toggle");

      if (
        mobileRef.current &&
        !mobileRef.current.contains(target) &&
        toggleButton !== target &&
        !toggleButton?.contains(target)
      ) {
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
