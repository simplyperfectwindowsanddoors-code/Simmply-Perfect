"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
} from "lucide-react";

import { upcomingProjects } from "@/data/gallery";

import type { GalleryProject } from "@/types/gallery";

type UpcomingProjectsProps = {
  onProjectClick: (project: GalleryProject) => void;
};

export default function UpcomingProjects({
  onProjectClick,
}: UpcomingProjectsProps) {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-b border-slate-200 pb-10 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0A2E6F]">
              Upcoming Projects
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-[-0.04em] text-[#071224] sm:text-5xl">
              What we are building next.
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-7 text-slate-500 lg:justify-self-end">
            Discover upcoming residential and commercial projects currently in
            planning, design, and development.
          </p>
        </div>

        <div className="mt-10 space-y-4">
          {upcomingProjects.map((project, index) => (
            <motion.button
              type="button"
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              onClick={() => onProjectClick(project)}
              className="group grid w-full overflow-hidden rounded-[24px] border border-slate-200 bg-white text-left transition-all duration-300 hover:border-[#0A2E6F]/30 hover:shadow-xl lg:grid-cols-[280px_1fr_auto] lg:items-center"
            >
              <div className="h-[220px] overflow-hidden lg:h-[190px]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-6 lg:p-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0A2E6F]">
                  {project.category}
                </p>

                <h3 className="mt-2 text-2xl font-bold text-[#071224]">
                  {project.title}
                </h3>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                  {project.shortDescription}
                </p>

                <div className="mt-4 flex flex-wrap gap-5 text-xs font-semibold text-slate-400">
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {project.location}
                  </span>

                  <span className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    {project.year}
                  </span>
                </div>
              </div>

              <div className="hidden pr-8 lg:block">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-all duration-300 group-hover:border-[#0A2E6F] group-hover:bg-[#0A2E6F] group-hover:text-white">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}