"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";

const benefits = [
  {
    number: "01",
    title: "Career Growth",
    description:
      "Build practical expertise, take on meaningful responsibilities, and grow your career alongside an expanding organization.",
    icon: TrendingUp,
  },
  {
    number: "02",
    title: "Collaborative Culture",
    description:
      "Work with professionals across design, engineering, sales, operations, construction, and specialized technical teams.",
    icon: Users,
  },
  {
    number: "03",
    title: "Meaningful Projects",
    description:
      "Contribute to residential and commercial projects that transform spaces and create lasting value for our customers.",
    icon: BriefcaseBusiness,
  },
  {
    number: "04",
    title: "Ideas That Matter",
    description:
      "Bring your experience, creativity, and ideas to the table in an environment that values initiative and improvement.",
    icon: Lightbulb,
  },
  {
    number: "05",
    title: "Professional Standards",
    description:
      "Work within a quality-focused environment built around accountability, safety, professionalism, and customer satisfaction.",
    icon: ShieldCheck,
  },
  {
    number: "06",
    title: "One Growing Team",
    description:
      "Become part of a diverse workforce where every role contributes to delivering complete solutions and exceptional results.",
    icon: HeartHandshake,
  },
];

export default function BenefitsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F7F9FC] py-16 sm:py-20 lg:py-24">
      {/* BACKGROUND */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-[400px] w-[400px] rounded-full bg-blue-100/40 blur-[130px]" />

        <div className="absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-slate-200/50 blur-[150px]" />
      </div>

      {/* MAIN CONTAINER */}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* HEADER */}

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-20">
          {/* LEFT */}

          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#0A2E6F]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#0A2E6F] sm:text-[11px]">
                Why Join Us
              </span>
            </div>

            <h2 className="mt-4 max-w-xl text-3xl font-bold leading-[1.1] tracking-[-0.04em] text-[#071224] sm:text-4xl lg:text-[46px]">
              More than a job.

              <span className="mt-1 block text-[#0A2E6F]">
                Build something meaningful.
              </span>
            </h2>
          </div>

          {/* RIGHT */}

          <div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
              At Simmply Perfect Group, every role contributes to the way we
              design, build, renovate, and transform spaces. We bring together
              professionals from different industries and create opportunities
              to learn, contribute, and grow.
            </p>
          </div>
        </div>

        {/* DIVIDER */}

        <div className="mt-10 h-px w-full bg-slate-200" />

        {/* BENEFITS GRID */}

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <motion.article
                key={benefit.title}
                whileHover={{
                  y: -7,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
                className="group relative flex min-h-[260px] overflow-hidden rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_-25px_rgba(15,23,42,0.22)] sm:p-7"
              >
                {/* HOVER BACKGROUND */}

                <div className="absolute inset-0 bg-gradient-to-br from-[#0A2E6F] via-[#0B347A] to-[#061A40] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* BACKGROUND NUMBER */}

                <span className="pointer-events-none absolute -right-2 -top-5 select-none text-[95px] font-black leading-none tracking-[-0.08em] text-slate-50 transition-all duration-500 group-hover:-translate-x-2 group-hover:translate-y-2 group-hover:text-white/[0.06]">
                  {benefit.number}
                </span>

                {/* CARD CONTENT */}

                <div className="relative z-10 flex w-full flex-col">
                  {/* TOP */}

                  <div className="flex items-start justify-between">
                    {/* ICON */}

                    <div className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-blue-100 bg-blue-50 text-[#0A2E6F] transition-all duration-500 group-hover:scale-110 group-hover:border-white/15 group-hover:bg-white/10 group-hover:text-white">
                      <Icon className="h-[18px] w-[18px]" />
                    </div>

                    {/* ARROW */}

                    <div className="flex h-9 w-9 translate-x-2 -translate-y-2 items-center justify-center rounded-full border border-transparent opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:border-white/10 group-hover:bg-white/10 group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4 text-white" />
                    </div>
                  </div>

                  {/* BOTTOM */}

                  <div className="mt-auto pt-8">
                    {/* LABEL */}

                    <div className="flex items-center gap-2">
                      <span className="h-px w-4 bg-[#0A2E6F]/40 transition-colors duration-500 group-hover:bg-blue-200/60" />

                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 transition-colors duration-500 group-hover:text-blue-200">
                        Benefit {benefit.number}
                      </p>
                    </div>

                    {/* TITLE */}

                    <h3 className="mt-3 text-xl font-bold tracking-[-0.025em] text-[#071224] transition-colors duration-500 group-hover:text-white sm:text-[22px]">
                      {benefit.title}
                    </h3>

                    {/* DESCRIPTION */}

                    <p className="mt-2.5 text-[13px] leading-6 text-slate-500 transition-colors duration-500 group-hover:text-blue-100/80 sm:text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>

                {/* BOTTOM LINE */}

                <div className="absolute bottom-0 left-6 right-6 h-px origin-left scale-x-0 bg-gradient-to-r from-blue-300 via-white to-transparent transition-transform duration-500 group-hover:scale-x-100" />
              </motion.article>
            );
          })}
        </div>

        {/* BOTTOM CTA */}

        <div className="relative mt-8 overflow-hidden rounded-[22px] border border-slate-200 bg-white px-5 py-5 shadow-[0_10px_40px_-25px_rgba(15,23,42,0.2)] sm:px-7">
          {/* DECORATION */}

          <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-blue-50 blur-[60px]" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            {/* LEFT */}

            <div className="flex items-center gap-4">
              <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[#0A2E6F] shadow-[0_10px_25px_-10px_rgba(10,46,111,0.5)] sm:flex">
                <Users className="h-[18px] w-[18px] text-white" />
              </div>

              <div>
                <h3 className="text-sm font-bold tracking-[-0.01em] text-[#071224] sm:text-[15px]">
                  Different skills. One shared purpose.
                </h3>

                <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500 sm:text-[13px]">
                  Explore our current opportunities and find the role that
                  matches your experience and ambitions.
                </p>
              </div>
            </div>

            {/* BUTTON */}

            <a
              href="#openings"
              className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[#0A2E6F] px-5 text-xs font-bold text-white shadow-[0_10px_25px_-10px_rgba(10,46,111,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#08265D] sm:text-sm"
            >
              View Opportunities

              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}