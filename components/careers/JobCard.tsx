"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Clock3,
  IndianRupee,
  MapPin,
} from "lucide-react";

import type { Job } from "./types";

type JobCardProps = {
  job: Job;
  index?: number;
  onViewDetails: (job: Job) => void;
  onApply: (job: Job) => void;
};

export default function JobCard({
  job,
  index = 0,
  onViewDetails,
  onApply,
}: JobCardProps) {
  const Icon = job.icon;

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 24,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.05, 0.3),
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -6,
      }}
      className="group relative flex h-full min-h-[390px] flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_-24px_rgba(15,23,42,0.22)] transition-[border-color,box-shadow] duration-500 hover:border-[#0A2E6F]/20 hover:shadow-[0_24px_60px_-28px_rgba(10,46,111,0.3)] sm:p-7"
    >
      {/* =====================================================
          DECORATIVE BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-blue-50 opacity-0 blur-[60px] transition-opacity duration-500 group-hover:opacity-100" />

      <div className="absolute left-0 top-0 h-[3px] w-0 bg-[#0A2E6F] transition-all duration-500 group-hover:w-full" />

      {/* =====================================================
          CARD HEADER
      ===================================================== */}

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-[#0A2E6F] transition-all duration-500 group-hover:border-[#0A2E6F] group-hover:bg-[#0A2E6F] group-hover:text-white">
          <Icon className="h-5 w-5" />
        </div>

        <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500 transition-colors duration-300 group-hover:border-blue-100 group-hover:bg-blue-50 group-hover:text-[#0A2E6F]">
          {job.department}
        </div>
      </div>

      {/* =====================================================
          JOB INFORMATION
      ===================================================== */}

      <div className="relative mt-7">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0A2E6F]">
          Career Opportunity
        </p>

        <h3 className="mt-3 min-h-[58px] text-xl font-bold leading-[1.3] tracking-[-0.025em] text-[#071224] transition-colors duration-300 group-hover:text-[#0A2E6F] sm:text-[22px]">
          {job.title}
        </h3>

        <p className="mt-4 line-clamp-3 min-h-[72px] text-sm leading-6 text-slate-500">
          {job.description}
        </p>
      </div>

      {/* =====================================================
          JOB META DATA
      ===================================================== */}

      <div className="relative mt-6 grid grid-cols-2 gap-2">
        <div className="flex min-h-[42px] items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-[#0A2E6F]" />

          <span className="truncate text-[11px] font-semibold text-slate-600">
            {job.location}
          </span>
        </div>

        <div className="flex min-h-[42px] items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5">
          <Clock3 className="h-3.5 w-3.5 shrink-0 text-[#0A2E6F]" />

          <span className="truncate text-[11px] font-semibold text-slate-600">
            {job.type}
          </span>
        </div>

        <div className="flex min-h-[42px] items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5">
          <BriefcaseBusiness className="h-3.5 w-3.5 shrink-0 text-[#0A2E6F]" />

          <span className="truncate text-[11px] font-semibold text-slate-600">
            {job.experience}
          </span>
        </div>

        <div className="flex min-h-[42px] items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5">
          <IndianRupee className="h-3.5 w-3.5 shrink-0 text-[#0A2E6F]" />

          <span className="truncate text-[11px] font-semibold text-slate-600">
            {job.ctc}
          </span>
        </div>
      </div>

      {/* =====================================================
          CARD ACTIONS
      ===================================================== */}

      <div className="relative mt-auto grid grid-cols-2 gap-3 pt-7">
        <button
          type="button"
          onClick={() => onViewDetails(job)}
          className="group/details inline-flex h-12 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 transition-all duration-300 hover:border-[#0A2E6F] hover:text-[#0A2E6F]"
        >
          View Details

          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/details:translate-x-1" />
        </button>

        <button
          type="button"
          onClick={() => onApply(job)}
          className="group/apply inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0A2E6F] px-4 text-xs font-bold text-white shadow-[0_10px_25px_rgba(10,46,111,0.18)] transition-all duration-300 hover:bg-[#08265d] hover:shadow-[0_14px_30px_rgba(10,46,111,0.28)]"
        >
          Apply Now

          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/apply:translate-x-1" />
        </button>
      </div>
    </motion.article>
  );
}