"use client";

import { ArrowUpRight } from "lucide-react";

import type { Project } from "@/lib/site-data";
import { Tilt } from "@/components/site/tilt";
import { cn } from "@/lib/utils";

interface WorkCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

export function WorkCard({ project, index, featured }: WorkCardProps) {
  return (
    <Tilt
      max={5}
      as="article"
      className={cn("work-card group", featured && "lg:col-span-2")}
      innerClassName="aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-surface lg:aspect-auto lg:h-[420px]"
    >
      <img
        src={project.imageUrl}
        alt={`${project.title} for ${project.client}`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
      />

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between p-5">
        <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] font-medium tracking-wide text-white backdrop-blur-md">
          {project.category}
        </span>
        <span className="font-mono text-xs text-white/60">{String(index + 1).padStart(2, "0")}</span>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-4 p-5 sm:p-6">
        <div className="min-w-0">
          <p className="mb-1.5 text-xs text-zinc-400">{project.client}</p>
          <h3 className={cn("leading-tight text-white", featured ? "text-2xl sm:text-3xl" : "text-xl")}>
            {project.title}
          </h3>
        </div>
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition-all duration-300 group-hover:bg-brand group-hover:text-white sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
          <ArrowUpRight className="size-5" />
        </span>
      </div>
    </Tilt>
  );
}
