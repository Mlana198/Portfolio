import React from "react";
import { ExternalLink, CheckCircle2 } from "lucide-react";
import { Project } from "@/data/content";

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
            Portfolio Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2 mb-4">
            Proyek Pilihan IoT &amp; TI
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Implementasi nyata dari arsitektur IoT mulai dari akuisisi sensor hardware, telemetry nirkabel, hingga backend cloud.
          </p>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-emerald-500/40 transition-all p-7 flex flex-col justify-between group hover:shadow-xl hover:shadow-emerald-950/20"
            >
              <div>
                {/* Top Badge & Action Links */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                        aria-label={`Source code of ${project.title}`}
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                        aria-label={`Live demo of ${project.title}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors mb-3">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Architecture Highlights */}
                <div className="space-y-2 mb-6">
                  <p className="text-[11px] font-semibold text-zinc-300 uppercase tracking-wider">
                    Sorotan Arsitektur:
                  </p>
                  {project.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags Footer */}
              <div className="pt-5 border-t border-zinc-800/80 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-zinc-800/70 text-zinc-300 border border-zinc-700/40"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
