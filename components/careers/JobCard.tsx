"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Clock3,
  IndianRupee,
  MapPin,
} from "lucide-react";

import type { Job } from "@/types/careers";

/* =========================================================
   TYPES
========================================================= */

type JobCardProps = {
  job: Job;
  index?: number;
  onViewDetails: (job: Job) => void;
  onApply: (job: Job) => void;
};

/* =========================================================
   JOB CARD
========================================================= */

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
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.04, 0.25),
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -5,
      }}
      className="
        group
        relative
        flex
        h-full
        min-h-[365px]
        flex-col
        overflow-hidden
        rounded-[22px]
        border
        border-slate-200
        bg-white
        p-5
        shadow-[0_12px_35px_-22px_rgba(15,23,42,0.20)]
        transition-[border-color,box-shadow]
        duration-500
        hover:border-[#0A2E6F]/25
        hover:shadow-[0_24px_55px_-28px_rgba(10,46,111,0.30)]
        sm:p-6
      "
    >
      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-48
          w-48
          rounded-full
          bg-blue-50
          opacity-0
          blur-[55px]
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />

      {/* TOP HOVER LINE */}

      <div
        className="
          absolute
          left-0
          top-0
          h-[3px]
          w-0
          bg-[#0A2E6F]
          transition-all
          duration-500
          group-hover:w-full
        "
      />

      {/* =====================================================
          CARD HEADER
      ===================================================== */}

      <div className="relative flex items-start justify-between gap-4">
        {/* ICON */}

        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-blue-100
            bg-blue-50
            text-[#0A2E6F]
            transition-all
            duration-500
            group-hover:border-[#0A2E6F]
            group-hover:bg-[#0A2E6F]
            group-hover:text-white
          "
        >
          <Icon className="h-[18px] w-[18px]" />
        </div>

        {/* DEPARTMENT */}

        <div
          className="
            max-w-[65%]
            truncate
            rounded-full
            border
            border-slate-200
            bg-slate-50
            px-3
            py-1.5
            text-[9px]
            font-bold
            uppercase
            tracking-[0.14em]
            text-slate-500
            transition-colors
            duration-300
            group-hover:border-blue-100
            group-hover:bg-blue-50
            group-hover:text-[#0A2E6F]
          "
        >
          {job.department}
        </div>
      </div>

      {/* =====================================================
          JOB INFORMATION
      ===================================================== */}

      <div className="relative mt-6">
        <p
          className="
            text-[9px]
            font-bold
            uppercase
            tracking-[0.2em]
            text-[#0A2E6F]
          "
        >
          Career Opportunity
        </p>

        <h3
          className="
            mt-2.5
            min-h-[54px]
            text-xl
            font-bold
            leading-[1.3]
            tracking-[-0.025em]
            text-[#071224]
            transition-colors
            duration-300
            group-hover:text-[#0A2E6F]
          "
        >
          {job.title}
        </h3>

        <p
          className="
            mt-3
            line-clamp-3
            min-h-[66px]
            text-[13px]
            leading-[22px]
            text-slate-500
          "
        >
          {job.description}
        </p>
      </div>

      {/* =====================================================
          JOB INFORMATION GRID
      ===================================================== */}

      <div className="relative mt-5 grid grid-cols-2 gap-2">
        {/* LOCATION */}

        <div
          className="
            flex
            min-h-[40px]
            items-center
            gap-2
            rounded-xl
            bg-slate-50
            px-3
            py-2
          "
        >
          <MapPin className="h-3.5 w-3.5 shrink-0 text-[#0A2E6F]" />

          <span className="truncate text-[10px] font-semibold text-slate-600">
            {job.location}
          </span>
        </div>

        {/* JOB TYPE */}

        <div
          className="
            flex
            min-h-[40px]
            items-center
            gap-2
            rounded-xl
            bg-slate-50
            px-3
            py-2
          "
        >
          <Clock3 className="h-3.5 w-3.5 shrink-0 text-[#0A2E6F]" />

          <span className="truncate text-[10px] font-semibold text-slate-600">
            {job.type}
          </span>
        </div>

        {/* EXPERIENCE */}

        <div
          className="
            flex
            min-h-[40px]
            items-center
            gap-2
            rounded-xl
            bg-slate-50
            px-3
            py-2
          "
        >
          <BriefcaseBusiness className="h-3.5 w-3.5 shrink-0 text-[#0A2E6F]" />

          <span className="truncate text-[10px] font-semibold text-slate-600">
            {job.experience}
          </span>
        </div>

        {/* CTC */}

        <div
          className="
            flex
            min-h-[40px]
            items-center
            gap-2
            rounded-xl
            bg-slate-50
            px-3
            py-2
          "
        >
          <IndianRupee className="h-3.5 w-3.5 shrink-0 text-[#0A2E6F]" />

          <span className="truncate text-[10px] font-semibold text-slate-600">
            {job.ctc}
          </span>
        </div>
      </div>

      {/* =====================================================
          CARD ACTIONS
      ===================================================== */}

      <div className="relative mt-auto grid grid-cols-2 gap-2.5 pt-6">
        {/* VIEW DETAILS */}

        <button
          type="button"
          onClick={() => onViewDetails(job)}
          className="
            group/details
            inline-flex
            h-11
            cursor-pointer
            items-center
            justify-center
            gap-1.5
            rounded-full
            border
            border-slate-200
            bg-white
            px-3
            text-[11px]
            font-bold
            text-slate-700
            transition-all
            duration-300
            hover:border-[#0A2E6F]
            hover:bg-blue-50/40
            hover:text-[#0A2E6F]
          "
        >
          View Details

          <ArrowRight
            className="
              h-3.5
              w-3.5
              transition-transform
              duration-300
              group-hover/details:translate-x-1
            "
          />
        </button>

        {/* APPLY NOW */}

        <button
          type="button"
          onClick={() => onApply(job)}
          className="
            group/apply
            inline-flex
            h-11
            cursor-pointer
            items-center
            justify-center
            gap-1.5
            rounded-full
            bg-[#0A2E6F]
            px-3
            text-[11px]
            font-bold
            text-white
            shadow-[0_10px_25px_rgba(10,46,111,0.18)]
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:bg-[#08265d]
            hover:shadow-[0_14px_30px_rgba(10,46,111,0.28)]
          "
        >
          Apply Now

          <ArrowRight
            className="
              h-3.5
              w-3.5
              transition-transform
              duration-300
              group-hover/apply:translate-x-1
            "
          />
        </button>
      </div>
    </motion.article>
  );
}