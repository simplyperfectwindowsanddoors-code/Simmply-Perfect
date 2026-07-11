"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Mail,
} from "lucide-react";

export default function CareersCTA() {
  const scrollToOpenings = () => {
    document.getElementById("openings")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="bg-white px-5 py-14 sm:px-6 sm:py-16 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{
          duration: 0.65,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-[#0A2E6F]"
      >
        {/* =====================================================
            BACKGROUND DECORATION
        ===================================================== */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 -top-32 h-[360px] w-[360px] rounded-full bg-blue-400/20 blur-[100px]" />

          <div className="absolute -bottom-44 left-1/4 h-[350px] w-[350px] rounded-full bg-blue-300/10 blur-[110px]" />

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "radial-gradient(white 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="absolute -right-10 top-1/2 hidden -translate-y-1/2 select-none text-[190px] font-black leading-none tracking-[-0.08em] text-white/[0.025] lg:block">
            JOIN
          </div>
        </div>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div className="relative grid gap-8 px-6 py-10 sm:px-9 sm:py-12 lg:grid-cols-[1fr_auto] lg:items-center lg:px-12">
          {/* ===================================================
              LEFT CONTENT
          =================================================== */}

          <div className="max-w-2xl">
            {/* LABEL */}

            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-blue-300" />

              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-200">
                Your Next Opportunity
              </span>
            </div>

            {/* HEADING */}

            <h2 className="mt-4 text-3xl font-bold leading-[1.1] tracking-[-0.04em] text-white sm:text-4xl lg:text-[42px]">
              Ready to build your
              <span className="text-blue-300">
                {" "}
                career with us?
              </span>
            </h2>

            {/* DESCRIPTION */}

            <p className="mt-4 max-w-xl text-sm leading-7 text-blue-100/65 sm:text-[15px]">
              Explore our current opportunities and find a role where your
              skills, experience, and ideas can contribute to meaningful work
              and long-term growth.
            </p>
          </div>

          {/* ===================================================
              ACTIONS
          =================================================== */}

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            {/* PRIMARY BUTTON */}

            <button
              type="button"
              onClick={scrollToOpenings}
              className="group inline-flex h-12 min-w-[190px] items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-[#0A2E6F] shadow-[0_12px_30px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.22)]"
            >
              <BriefcaseBusiness className="h-4 w-4" />

              Explore Open Roles

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* SECONDARY BUTTON */}

            <a
              href="mailto:simplyperfectwindowsanddoors@gmail.com"
              className="group inline-flex h-12 min-w-[190px] items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-6 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.12]"
            >
              <Mail className="h-4 w-4" />

              Contact Careers
            </a>
          </div>
        </div>

        {/* =====================================================
            BOTTOM INFORMATION
        ===================================================== */}

        <div className="relative border-t border-white/10 px-6 py-4 sm:px-9 lg:px-12">
          <div className="flex flex-col gap-2 text-[11px] text-blue-100/45 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Join professionals across technical, creative, sales, and
              business teams.
            </p>

            <p className="font-semibold text-blue-200/60">
              Simmply Perfect Group Careers
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}