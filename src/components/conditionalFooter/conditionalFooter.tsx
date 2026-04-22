"use client";

import { usePathname } from "next/navigation";
import Footer from "./footer/footer";

const EXCLUDED_PATHS = ["/login", "/register"];

export default function ConditionalFooter() {
  const pathname = usePathname();

  if (EXCLUDED_PATHS.includes(pathname)) {
    return null;
  }

  return <Footer />;
}
