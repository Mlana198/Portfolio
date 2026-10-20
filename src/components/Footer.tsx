import React from "react";
import { Terminal } from "lucide-react";
import { FooterData } from "@/data/types";

interface FooterProps {
  data: FooterData;
}

export default function Footer({ data }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-[#030712] text-xs text-zinc-500">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand & Rights */}
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="text-zinc-400 font-medium">{data.ownerName}</span>
          <span>•</span>
          <span>© {currentYear} All rights reserved.</span>
        </div>

        {/* Tech Stack Badge */}
        <div className="flex items-center gap-1.5 text-zinc-400">
          <span>{data.subText}</span>
        </div>
      </div>
    </footer>
  );
}
