"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";

const stats = [
  {
    value: "16+",
    label: "Open Positions",
    icon: BriefcaseBusiness,
  },
  {
    value: "4+",
    label: "Business Divisions",
    icon: Building2,
  },
  {
    value: "Growing",
    label: "Professional Team",
    icon: Users,
  },
];

export default function CareersHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-28 sm:pt-32 lg:pt-36">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-blue-100/50 blur-[120px]" />

        <div className="absolute -right-32 top-0 h-[500px] w-[500px] rounded-full bg-slate-100 blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#0A2E6F 1px, transparent 1px), linear-gradient(90deg, #0A2E6F 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid min-h-[680px] items-center gap-14 pb-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:pb-24">
          {/* =====================================================
              LEFT CONTENT
          ===================================================== */}

          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/70 px-4 py-2"
            >
              <Sparkles className="h-4 w-4 text-[#0A2E6F]" />

              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0A2E6F] sm:text-xs">
                Careers at Simmply Perfect Group
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.1,
              }}
              className="mt-7 max-w-3xl text-4xl font-bold leading-[1.08] tracking-[-0.04em] text-[#071224] sm:text-5xl lg:text-[64px]"
            >
              Build your career.
              <span className="block text-[#0A2E6F]">
                Shape better spaces.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.2,
              }}
              className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg"
            >
              Join a growing team of professionals, designers, engineers,
              technicians, craftsmen, and business specialists working together
              to transform residential and commercial spaces.
            </motion.p>

            {/* Location */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.3,
              }}
              className="mt-6 flex items-center gap-2 text-sm font-medium text-slate-500"
            >
              <MapPin className="h-4 w-4 text-[#0A2E6F]" />

              <span>Career opportunities in Hyderabad</span>
            </motion.div>

            {/* Buttons */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.35,
              }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="#openings"
                className="group inline-flex h-14 min-w-[190px] items-center justify-center gap-2 rounded-full bg-[#0A2E6F] px-7 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(10,46,111,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#08265d] hover:shadow-[0_18px_45px_rgba(10,46,111,0.3)]"
              >
                Explore Openings

                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
              </Link>

              <Link
                href="/about"
                className="group inline-flex h-14 min-w-[190px] items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0A2E6F]/30 hover:text-[#0A2E6F] hover:shadow-lg"
              >
                About Our Company

                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>

            {/* Stats */}

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.5,
              }}
              className="mt-12 grid max-w-2xl grid-cols-3 border-t border-slate-200 pt-7"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className={`${
                      index !== stats.length - 1
                        ? "border-r border-slate-200"
                        : ""
                    } ${index !== 0 ? "pl-4 sm:pl-7" : "pr-4 sm:pr-7"}`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="hidden h-4 w-4 text-[#0A2E6F] sm:block" />

                      <h3 className="text-xl font-bold tracking-tight text-[#0A2E6F] sm:text-2xl">
                        {stat.value}
                      </h3>
                    </div>

                    <p className="mt-1 text-[10px] font-semibold uppercase leading-4 tracking-[0.1em] text-slate-400 sm:text-xs">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* =====================================================
              RIGHT VISUAL
          ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: 35,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.9,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative hidden lg:block"
          >
            {/* Main Card */}

            <div className="relative overflow-hidden rounded-[36px] bg-[#071224] p-3 shadow-[0_35px_90px_rgba(7,18,36,0.2)]">
              <div className="relative min-h-[520px] overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0A2E6F] via-[#0b347c] to-[#071224] p-9">
                {/* Grid Pattern */}

                <div
                  className="absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage:
                      "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
                    backgroundSize: "42px 42px",
                  }}
                />

                {/* Glow */}

                <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-400/20 blur-[90px]" />

                <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-white/10 blur-[100px]" />

                {/* Content */}

                <div className="relative flex h-full min-h-[440px] flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-100 backdrop-blur-md">
                      We&apos;re hiring
                    </div>

                    <h2 className="mt-7 max-w-sm text-4xl font-bold leading-tight tracking-[-0.03em] text-white">
                      Your next opportunity starts here.
                    </h2>

                    <p className="mt-5 max-w-sm text-sm leading-7 text-blue-100/75">
                      Work alongside experienced professionals and contribute to
                      projects that create meaningful, functional, and
                      beautifully designed spaces.
                    </p>
                  </div>

                  {/* Job Categories */}

                  <div className="space-y-3">
                    {[
                      "Engineering & Projects",
                      "Design & Creative",
                      "Sales & Operations",
                    ].map((item, index) => (
                      <motion.div
                        key={item}
                        initial={{
                          opacity: 0,
                          x: 20,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          duration: 0.5,
                          delay: 0.65 + index * 0.1,
                        }}
                        whileHover={{
                          x: 5,
                        }}
                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.08] px-5 py-4 backdrop-blur-md transition-colors hover:bg-white/[0.13]"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-sm font-bold text-white">
                            {String(index + 1).padStart(2, "0")}
                          </div>

                          <span className="text-sm font-semibold text-white">
                            {item}
                          </span>
                        </div>

                        <ArrowUpRight className="h-4 w-4 text-blue-200" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}

            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-7 -left-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                  <BriefcaseBusiness className="h-6 w-6 text-[#0A2E6F]" />
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Current Opportunities
                  </p>

                  <p className="mt-0.5 text-xl font-bold text-[#071224]">
                    16+ Openings
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}