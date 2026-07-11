"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { completedProjects } from "@/data/gallery";

import type {
  GalleryProject,
  ProjectCategory,
} from "@/types/gallery";

type CompletedProjectsProps = {
  onProjectClick: (project: GalleryProject) => void;
};

const filters: Array<"All" | ProjectCategory> = [
  "All",
  "Windows & Doors",
  "Interiors",
  "Renovations",
];

export default function CompletedProjects({
  onProjectClick,
}: CompletedProjectsProps) {
  const [activeFilter, setActiveFilter] =
    useState<"All" | ProjectCategory>("All");

  const projects =
    activeFilter === "All"
      ? completedProjects
      : completedProjects.filter(
          (project) => project.category === activeFilter,
        );

  return (
    <section className="bg-[#F8FAFC] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0A2E6F]">
              Completed Projects
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-[-0.04em] text-[#071224] sm:text-5xl">
              Projects delivered with precision.
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                type="button"
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                  activeFilter === filter
                    ? "bg-[#0A2E6F] text-white"
                    : "border border-slate-200 bg-white text-slate-500 hover:border-[#0A2E6F] hover:text-[#0A2E6F]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.button
              layout
              type="button"
              key={project.id}
              onClick={() => onProjectClick(project)}
              className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white text-left"
            >
              <div className="h-[270px] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0A2E6F]">
                  {project.category}
                </p>

                <div className="mt-3 flex items-start justify-between gap-4">
                  <h3 className="text-xl font-bold text-[#071224]">
                    {project.title}
                  </h3>

                  <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-300 transition-colors group-hover:text-[#0A2E6F]" />
                </div>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {project.shortDescription}
                </p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
