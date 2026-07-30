"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/mycompo/Navbar";


export default function NavbarSwitcher() {
  const pathname = usePathname();

  // Match ONLY /projects/:id (not /projects or /projects/)
  const isProjectDetail =
    pathname.startsWith("/projects/") && pathname.split("/").length === 3;

  return isProjectDetail ? "" : <Navbar />;
}