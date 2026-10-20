import React from "react";
import {
  Cpu,
  CircuitBoard,
  Zap,
  Layers,
  Radio,
  Network,
  Wifi,
  Binary,
  Share2,
  Code2,
  Terminal,
  Layout,
  Server,
  Palette,
  TerminalSquare,
  Boxes,
  Database,
  Activity,
  GitBranch,
} from "lucide-react";
import { SkillCategory } from "@/data/content";

interface SkillsSectionProps {
  skills: SkillCategory[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cpu,
  CircuitBoard,
  Zap,
  Layers,
  Radio,
  Network,
  Wifi,
  Binary,
  Share2,
  Code2,
  Terminal,
  Layout,
  Server,
  Palette,
  TerminalSquare,
  Boxes,
  Database,
  Activity,
  GitBranch,
};

export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-zinc-950/40">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            Keahlian &amp; Tech Stack
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2 mb-4">
            Perangkat &amp; Teknologi yang Saya Gunakan
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Kombinasi teknologi yang mencakup level perangkat keras (hardware), protokol jaringan IoT, hingga komputasi cloud dan pengembangan web modern.
          </p>
        </div>

        {/* 4 Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((category, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700/80 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white tracking-tight">
                    {category.title}
                  </h3>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700/60">
                    Category 0{idx + 1}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                  {category.description}
                </p>

                {/* Skills List in this Category */}
                <div className="space-y-2.5">
                  {category.skills.map((skill, sIdx) => {
                    const IconComponent = iconMap[skill.icon] || Cpu;
                    return (
                      <div
                        key={sIdx}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800/60 hover:border-emerald-500/40 hover:bg-zinc-800/40 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-colors">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">
                            {skill.name}
                          </span>
                        </div>
                        {skill.level && (
                          <span className="text-[11px] text-zinc-400 font-mono">
                            {skill.level}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
