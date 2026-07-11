"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  Check,
  MapPin,
  X,
} from "lucide-react";

import type { GalleryProject } from "@/types/gallery";

type ProjectModalProps = {
  project: GalleryProject | null;
  onClose: () => void;
};

export default function ProjectModal({
  project,
  onClose,
}: ProjectModalProps) {
  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/75 backdrop-blur-md"
          />

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.97,
            }}
            className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[28px] bg-white shadow-2xl"
          >
            <div className="relative h-[320px] overflow-hidden sm:h-[400px]">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

              <button
                type="button"
                onClick={onClose}
                className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-800 backdrop-blur-md"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="absolute bottom-6 left-6 right-6">
                <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
                  {project.category}
                </span>

                <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                  {project.title}
                </h2>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap gap-5 border-b border-slate-200 pb-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#0A2E6F]" />
                  {project.location}
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-[#0A2E6F]" />
                  {project.year}
                </div>
              </div>

              <p className="mt-6 leading-8 text-slate-600">
                {project.description}
              </p>

              <h3 className="mt-8 text-lg font-bold text-[#071224]">
                Project Services
              </h3>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {project.services.map((service) => (
                  <div
                    key={service}
                    className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600"
                  >
                    <Check className="h-4 w-4 text-[#0A2E6F]" />

                    {service}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}