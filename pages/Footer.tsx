import React from "react";
import Link from "next/link";
import { Github, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-slate-400 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* LEFT - COPYRIGHT */}
        <p className="text-sm text-center md:text-left">
          © {currentYear} Yaswanth Palivela. All rights reserved.
        </p>

        {/* RIGHT - SOCIAL ICONS */}
        <div className="flex items-center gap-5">
          <Link
            href="https://github.com/yaswanthpalivela"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="w-5 h-5 hover:text-white transition duration-300 hover:scale-110" />
          </Link>

          <Link
            href="https://linkedin.com/in/yaswanthpalivela"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="w-5 h-5 hover:text-white transition duration-300 hover:scale-110" />
          </Link>

          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="w-5 h-5 hover:text-white transition duration-300 hover:scale-110" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
