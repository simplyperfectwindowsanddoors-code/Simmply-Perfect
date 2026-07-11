"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  MapPin,
} from "lucide-react";

import { featuredProjects } from "@/data/gallery";

import type { GalleryProject } from "@/types/gallery";

type FeaturedProjectsProps = {
  onProjectClick: (project: GalleryProject) => void;
};

export default function FeaturedProjects({
  onProjectClick,
}: FeaturedProjectsProps) {
  return (
    <section
      id="featured-projects"
      className="bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0A2E6F]">
            Featured Projects
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-[-0.04em] text-[#071224] sm:text-5xl">
            Selected work that defines our standards.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <motion.button
              type="button"
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
              }}
              onClick={() => onProjectClick(project)}
              className="group relative h-[480px] overflow-hidden rounded-[28px] text-left"
            >
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071224] via-[#071224]/15 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-7">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-200">
                  {project.category}
                </p>

                <h3 className="mt-2 text-2xl font-bold text-white">
                  {project.title}
                </h3>

                <div className="mt-3 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-sm text-slate-300">
                    <MapPin className="h-4 w-4" />
                    {project.location}
                  </span>

                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#071224]">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
