import React from "react";
import { Cpu, Server, Radio, ShieldCheck } from "lucide-react";
import { AboutData } from "@/data/types";

interface AboutSectionProps {
  data: AboutData;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cpu,
  Server,
  Radio,
  ShieldCheck,
};

export default function AboutSection({ data }: AboutSectionProps) {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Heading & Narrative */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
                {data.sectionTitle}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2 mb-6">
                {data.heading}
              </h2>
              <div className="space-y-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
                <p>{data.p1}</p>
                <p>{data.p2}</p>
                <p>{data.p3}</p>
              </div>
            </div>

            {/* Quick Metrics / Stats */}
            <div className="mt-8 pt-8 border-t border-zinc-800 grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold text-white tracking-tight">{data.metric1Number}</p>
                <p className="text-xs text-zinc-400 mt-1">{data.metric1Label}</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-400 tracking-tight">{data.metric2Number}</p>
                <p className="text-xs text-zinc-400 mt-1">{data.metric2Label}</p>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Pillar Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.pillars.map((pillar, idx) => {
              const Icon = iconMap[pillar.iconName] || Cpu;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-emerald-500/30 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-emerald-400 group-hover:scale-105 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-all mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-semibold text-white tracking-tight mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
