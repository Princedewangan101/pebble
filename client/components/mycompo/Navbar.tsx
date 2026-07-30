"use client";

import Link from "next/link";
import React from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between w-full py-2 px-2 md:px-12 bg-transparent text-white border-slate-800 ">

        <h3 className="cursor-default">
          Build.<span className="text-[#4f39f6]">web</span>
        </h3>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 transition duration-500">
          <Link href="/my_projects" className="text-slate-500 hover:text-slate-300 transition  cursor-default">
            projects
          </Link>
          <Link href="/pricing" className="text-slate-500 hover:text-slate-300 transition  cursor-default">
            pricing
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden active:scale-90 transition"
          onClick={() => setMenuOpen(true)}
        >
          <svg width="26" height="26" stroke="currentColor">
            <path d="M4 5h16" />
            <path d="M4 12h16" />
            <path d="M4 19h16" />
          </svg>
        </button>
      </nav>

      {/* MOBILE OVERLAY MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-100 bg-black/60 text-white backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden">
          <Link href="#products" onClick={() => setMenuOpen(false)}>
            Products
          </Link>
          <Link href="#resources" onClick={() => setMenuOpen(false)}>
            Resources
          </Link>
          <Link href="#stories" onClick={() => setMenuOpen(false)}>
            Stories
          </Link>
          <Link href="#pricing" onClick={() => setMenuOpen(false)}>
            Pricing
          </Link>

          <button
            className="active:ring-3 active:ring-white size-10 p-1 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-black rounded-md"
            onClick={() => setMenuOpen(false)}
          >
            <svg width="24" height="24" stroke="currentColor">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
