import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer
      className={` flex flex-col bg-[#101010] items-center justify-around w-full py-16 text-sm text-gray-800/70`}
    >
      {/* Navigation Links */}
      <div className="flex items-center gap-8">
        <Link
          href="/"
          className="font-medium text-slate-500 hover:text-slate-100"
        >
          Home
        </Link>
        <Link
          href="/my_projects"
          className="font-medium text-slate-500 hover:text-slate-100"
        >
          My Projects
        </Link>
        <Link
          href="/community"
          className="font-medium text-slate-500 hover:text-slate-100"
        >
          Community
        </Link>
        <Link
          href="/pricing"
          className="font-medium text-slate-500 hover:text-slate-100"
        >
          Pricing
        </Link>
      </div>

      {/* Social Icons */}
      <div className="flex items-center gap-4 mt-8 text-indigo-500 ">
        <Link href="/">
          <Facebook className="w-5 h-5 hover:-translate-y-1 transition hover:text-slate-100" />
        </Link>
        <Link href="/">
          <Twitter className="hover:text-slate-100 w-5 h-5 hover:-translate-y-1 transition" />
        </Link>
        <Link href="/">
          <Instagram className="w-5 h-5 hover:-translate-y-1 transition hover:text-slate-100" />
        </Link>
        <Link href="/">
          <Linkedin className="w-5 h-5 hover:-translate-y-1 transition hover:text-slate-100" />
        </Link>
        <Link href="/">
          <Github className="w-5 h-5 hover:-translate-y-1 transition hover:text-slate-100" />
        </Link>
      </div>

      <div className="mt-8 text-center text-slate-500">
        Copyright © 2025{" "}
        <Link href="/" className="underline hover:text-slate-100">
          PrebuiltUI
        </Link>
        . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
