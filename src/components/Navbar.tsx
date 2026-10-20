"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Menu, X, ArrowUpRight } from "lucide-react";
import { NavbarData } from "@/data/types";

interface NavbarProps {
  data: NavbarData;
}

export default function Navbar({ data }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#030712]/80 backdrop-blur-md border-b border-zinc-800/80 py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-zinc-100 hover:text-emerald-400 transition-colors group"
          >
            <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors">
              <Terminal className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="font-semibold tracking-tight text-base">
              {data.brandFirst}
              <span className="text-emerald-400">{data.brandLast}</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {data.navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-zinc-400 hover:text-zinc-100 transition-colors text-sm font-medium tracking-wide"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-emerald-300 border border-zinc-800 hover:border-emerald-500/40 text-xs font-medium tracking-wide transition-all shadow-sm"
            >
              <span>{data.ctaText}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
            </a>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-zinc-100 focus:outline-none"
              aria-label="Toggle navigation menu"
              suppressHydrationWarning
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 pb-4 border-t border-zinc-800/80 bg-[#030712]/95 backdrop-blur-xl rounded-2xl px-4 flex flex-col gap-3 shadow-xl">
            {data.navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-300 hover:text-emerald-400 transition-colors text-sm py-1.5 font-medium"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center py-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold"
            >
              {data.ctaText} Sekarang
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
