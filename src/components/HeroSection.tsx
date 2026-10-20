import React from "react";
import { ArrowDown, Sparkles, Cpu, Layers, ExternalLink } from "lucide-react";
import { HeroData } from "@/data/types";

interface HeroSectionProps {
  data: HeroData;
}

export default function HeroSection({ data }: HeroSectionProps) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Subtle Gradient & Grid Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
        <div className="w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl -translate-y-16 translate-x-20" />
      </div>

      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300 mb-8 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="tracking-wide">{data.badge}</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
          {data.headlinePrefix}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
            {data.hardwareHighlight}
          </span>{" "}
          &amp; Solusi{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400">
            {data.softwareHighlight}
          </span>
          .
        </h1>

        {/* Sub-headline */}
        <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          {data.subheadline}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <a
            href="#projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm transition-all shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/25 active:scale-[0.99]"
          >
            <span>{data.ctaPortfolio}</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 hover:text-white font-medium text-sm transition-all"
          >
            <span>{data.ctaContact}</span>
          </a>
        </div>

        {/* Quick Tech Highlights Badge Row */}
        <div className="mt-16 pt-8 border-t border-zinc-800/60 w-full max-w-xl flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>ESP32 &amp; C/C++</span>
          </div>
          <div className="h-3 w-px bg-zinc-800" />
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>MQTT Protocol &amp; APIs</span>
          </div>
          <div className="h-3 w-px bg-zinc-800" />
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Next.js &amp; Cloud Systems</span>
          </div>
        </div>
      </div>
    </section>
  );
}
