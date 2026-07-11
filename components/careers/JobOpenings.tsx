"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
} from "lucide-react";

import { jobs } from "@/data/jobs";
import type { Job } from "@/types/careers";

import JobCard from "./JobCard";

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

  const animationFrameRef =
    useRef<number | null>(null);

  const lastTimestampRef =
    useRef<number | null>(null);

  const pauseTimeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const isPausedRef = useRef(false);

  const [isDragging, setIsDragging] = useState(false);

  const dragStartXRef = useRef(0);

  const dragStartScrollLeftRef = useRef(0);

  /* =========================================================
     PAUSE AUTO SCROLL
  ========================================================= */

  const pauseAutoScroll = useCallback(
    (duration = 1800) => {
      isPausedRef.current = true;

      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }

      pauseTimeoutRef.current = setTimeout(() => {
        isPausedRef.current = false;
      }, duration);
    },
    [],
  );

  /* =========================================================
     CONTINUOUS AUTO SCROLL

     IMPORTANT:
     - Jobs are rendered only once.
     - No duplicated cards.
     - When reaching the end, scrolling reverses.
  ========================================================= */

  useEffect(() => {
    const container = scrollContainerRef.current;

    if (!container) return;

    let direction = 1;

    const AUTO_SCROLL_SPEED = 24;

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const deltaTime =
        timestamp - lastTimestampRef.current;

      lastTimestampRef.current = timestamp;

      if (
        !isPausedRef.current &&
        !isDragging
      ) {
        const maxScroll =
          container.scrollWidth -
          container.clientWidth;

        if (maxScroll > 0) {
          container.scrollLeft +=
            direction *
            AUTO_SCROLL_SPEED *
            (deltaTime / 1000);

          if (
            container.scrollLeft >=
            maxScroll - 1
          ) {
            direction = -1;
          }

          if (container.scrollLeft <= 1) {
            direction = 1;
          }
        }
      }

      animationFrameRef.current =
        requestAnimationFrame(animate);
    };

    animationFrameRef.current =
      requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(
          animationFrameRef.current,
        );
      }

      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }

      lastTimestampRef.current = null;
    };
  }, [isDragging]);

  /* =========================================================
     BUTTON SCROLL
  ========================================================= */

  const scrollCards = useCallback(
    (direction: "left" | "right") => {
      const container =
        scrollContainerRef.current;

      if (!container) return;

      pauseAutoScroll();

      const card =
        container.querySelector<HTMLElement>(
          "[data-job-card]",
        );

      const scrollAmount = card
        ? card.offsetWidth + 16
        : 320;

      container.scrollBy({
        left:
          direction === "left"
            ? -scrollAmount
            : scrollAmount,
        behavior: "smooth",
      });
    },
    [pauseAutoScroll],
  );

  /* =========================================================
     MOUSE DRAG
  ========================================================= */

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    const container =
      scrollContainerRef.current;

    if (!container) return;

    pauseAutoScroll();

    setIsDragging(true);

    dragStartXRef.current = event.pageX;

    dragStartScrollLeftRef.current =
      container.scrollLeft;
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (!isDragging) return;

    const container =
      scrollContainerRef.current;

    if (!container) return;

    event.preventDefault();

    const distance =
      event.pageX - dragStartXRef.current;

    container.scrollLeft =
      dragStartScrollLeftRef.current -
      distance;
  };

  const stopDragging = () => {
    if (!isDragging) return;

    setIsDragging(false);

    pauseAutoScroll(1000);
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section
      id="openings"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="flex flex-col gap-6 border-b border-slate-200 pb-8 lg:flex-row lg:items-end lg:justify-between">
          {/* LEFT */}

          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#0A2E6F]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#0A2E6F]">
                Current Opportunities
              </span>
            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-[#071224] sm:text-4xl lg:text-[44px]">
              Find your next
              <span className="text-[#0A2E6F]">
                {" "}
                opportunity.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-[15px]">
              Explore opportunities across sales,
              engineering, technical services, creative
              teams, operations, and business support.
            </p>
          </div>

          {/* CONTROLS */}

          <div className="flex items-center gap-4">
            <span className="hidden text-xs font-medium text-slate-400 sm:block">
              Scroll or use controls
            </span>

            <button
              type="button"
              onClick={() => scrollCards("left")}
              aria-label="Previous jobs"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[#0A2E6F] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0A2E6F]/30 hover:bg-[#0A2E6F] hover:text-white hover:shadow-md"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => scrollCards("right")}
              aria-label="Next jobs"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[#0A2E6F] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0A2E6F]/30 hover:bg-[#0A2E6F] hover:text-white hover:shadow-md"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ===================================================
            OPENINGS INFORMATION
        =================================================== */}

        <div className="mt-7 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0A2E6F]">
              <BriefcaseBusiness className="h-[17px] w-[17px]" />
            </div>

            <div>
              <p className="text-sm font-bold text-[#071224]">
                {jobs.length} Current Openings
              </p>

              <p className="mt-0.5 text-xs text-slate-400">
                Discover your next career opportunity
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />

            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
              Hiring Now
            </span>
          </div>
        </div>

        {/* ===================================================
            JOB CARDS
        =================================================== */}

        <div className="relative mt-8">
          {/*
            IMPORTANT:

            No left fade.
            No right fade.
            No mask-image.
            No gradient overlay.

            Therefore the first and last cards remain
            completely visible.
          */}

          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
            onTouchStart={() => pauseAutoScroll()}
            onTouchMove={() => pauseAutoScroll()}
            className={`
              flex gap-4 overflow-x-auto pb-5
              [scrollbar-width:none]
              [-ms-overflow-style:none]
              [&::-webkit-scrollbar]:hidden
              ${
                isDragging
                  ? "cursor-grabbing select-none"
                  : "cursor-grab"
              }
            `}
          >
            {jobs.map((job) => (
              <div
                key={job.id}
                data-job-card
                className="
                  w-[280px]
                  min-w-[280px]
                  sm:w-[300px]
                  sm:min-w-[300px]
                  lg:w-[310px]
                  lg:min-w-[310px]
                "
              >
                <JobCard
                  job={job}
                  onViewDetails={onViewDetails}
                  onApply={onApply}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ===================================================
            MOBILE SCROLL INDICATOR
        =================================================== */}

        <div className="mt-2 flex items-center justify-center gap-2 sm:hidden">
          <ArrowLeft className="h-3.5 w-3.5 text-slate-300" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
            Swipe to explore
          </span>

          <ArrowRight className="h-3.5 w-3.5 text-slate-300" />
        </div>
      </div>
    </section>
  );
}