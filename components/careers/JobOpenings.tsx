"use client";

import { useCallback, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
} from "lucide-react";

import JobCard from "@/components/careers/JobCard";
import { jobs } from "@/data/jobs";

import type { Job } from "@/types/careers";

/* =========================================================
   PROPS
========================================================= */

type JobOpeningsProps = {
  onViewDetails: (job: Job) => void;
  onApply: (job: Job) => void;
};

/* =========================================================
   COMPONENT
========================================================= */

export default function JobOpenings({
  onViewDetails,
  onApply,
}: JobOpeningsProps) {
  const scrollContainerRef =
    useRef<HTMLDivElement | null>(null);

  /* =========================================================
     SCROLL LEFT
  ========================================================= */

  const scrollLeft = useCallback(() => {
    const container = scrollContainerRef.current;

    if (!container) return;

    container.scrollBy({
      left: -380,
      behavior: "smooth",
    });
  }, []);

  /* =========================================================
     SCROLL RIGHT
  ========================================================= */

  const scrollRight = useCallback(() => {
    const container = scrollContainerRef.current;

    if (!container) return;

    container.scrollBy({
      left: 380,
      behavior: "smooth",
    });
  }, []);

  /* =========================================================
     EMPTY STATE
  ========================================================= */

  if (!jobs || jobs.length === 0) {
    return (
      <section
        id="openings"
        className="bg-white px-5 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-16 text-center">
            <BriefcaseBusiness className="mx-auto h-8 w-8 text-[#0A2E6F]" />

            <h2 className="mt-5 text-2xl font-bold text-[#071224]">
              No Current Openings
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
              There are currently no job opportunities
              available. Please check again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section
      id="openings"
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-blue-50/70 blur-[130px]" />

        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-slate-100 blur-[130px]" />
      </div>

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="flex flex-col gap-8 border-b border-slate-200 pb-10 lg:flex-row lg:items-end lg:justify-between">
          {/* LEFT */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.6,
            }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#0A2E6F]" />

              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0A2E6F]">
                Join Our Team
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-[#071224] sm:text-4xl lg:text-5xl">
              Current Career
              <span className="text-[#0A2E6F]">
                {" "}
                Opportunities
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base sm:leading-8">
              Explore opportunities across sales,
              engineering, technical services, creative
              teams, operations, and business support.
            </p>
          </motion.div>

          {/* RIGHT CONTROLS */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              delay: 0.1,
            }}
            className="flex items-center justify-between gap-5 lg:justify-end"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0A2E6F]">
                <BriefcaseBusiness className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-bold text-[#071224]">
                  {jobs.length} Current Openings
                </p>

                <p className="mt-0.5 text-xs text-slate-400">
                  Find your next opportunity
                </p>
              </div>
            </div>

            {/* DESKTOP BUTTONS */}

            <div className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={scrollLeft}
                aria-label="Previous jobs"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-300 hover:border-[#0A2E6F] hover:bg-[#0A2E6F] hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={scrollRight}
                aria-label="Next jobs"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-300 hover:border-[#0A2E6F] hover:bg-[#0A2E6F] hover:text-white"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* ===================================================
            JOB CARDS
        =================================================== */}

        <div className="mt-10">
          <div
            ref={scrollContainerRef}
            className="
              flex
              snap-x
              snap-mandatory
              gap-5
              overflow-x-auto
              pb-5
              scroll-smooth
              overscroll-x-contain
              [scrollbar-width:thin]
              [scrollbar-color:#CBD5E1_transparent]
            "
          >
            {jobs.map((job, index) => (
              <div
                key={job.id}
                className="
                  w-[290px]
                  shrink-0
                  snap-start
                  sm:w-[310px]
                  lg:w-[330px]
                "
              >
                <JobCard
                  job={job}
                  index={index}
                  onViewDetails={onViewDetails}
                  onApply={onApply}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ===================================================
            MOBILE NAVIGATION
        =================================================== */}

        <div className="mt-5 flex items-center justify-between sm:hidden">
          <p className="text-xs font-medium text-slate-400">
            Swipe to explore opportunities
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={scrollLeft}
              aria-label="Previous jobs"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[#0A2E6F]"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={scrollRight}
              aria-label="Next jobs"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0A2E6F] text-white"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}