"use client";

import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  Layers3,
  TrendingUp,
  Users,
} from "lucide-react";

const reasons = [
  {
    title: "Real Experience",
    description: "Work on meaningful residential and commercial projects.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Multiple Career Paths",
    description: "Grow across technical, creative, sales, and business teams.",
    icon: Layers3,
  },
  {
    title: "Career Growth",
    description: "Build practical expertise as our organization continues to grow.",
    icon: TrendingUp,
  },
  {
    title: "Collaborative Team",
    description: "Work with skilled professionals from diverse industries.",
    icon: Users,
  },
];

const stats = [
  {
    value: "3000+",
    label: "Projects",
  },
  {
    value: "18+",
    label: "Years Experience",
  },
  {
    value: "99.12%",
    label: "Client Satisfaction",
  },
  {
    value: "4+",
    label: "Business Divisions",
  },
];

export default function WhySimmplyPerfect() {
  return (
    <section className="relative overflow-hidden bg-[#071B3D] py-14 sm:py-16 lg:py-20">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[130px]" />

        <div className="absolute -bottom-52 right-0 h-[450px] w-[450px] rounded-full bg-blue-400/[0.07] blur-[140px]" />
      </div>

      {/* =====================================================
          CONTAINER
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
          {/* LEFT */}

          <motion.div
            initial={{
              opacity: 0,
              y: 18,
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
              duration: 0.55,
            }}
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-blue-300" />

              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-200">
                Why Simmply Perfect
              </span>
            </div>

            <h2 className="mt-4 max-w-lg text-3xl font-bold leading-[1.1] tracking-[-0.04em] text-white sm:text-4xl">
              Grow with a company
              <span className="text-blue-300">
                {" "}
                building what matters.
              </span>
            </h2>
          </motion.div>

          {/* RIGHT */}

          <motion.p
            initial={{
              opacity: 0,
              y: 18,
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
              duration: 0.55,
              delay: 0.08,
            }}
            className="max-w-2xl text-sm leading-7 text-blue-100/60"
          >
            Join a growing organization where professionals from different
            industries work together to design, build, renovate, and deliver
            meaningful solutions for residential and commercial customers.
          </motion.p>
        </div>

        {/* ===================================================
            REASONS
        =================================================== */}

        <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <motion.article
                key={reason.title}
                initial={{
                  opacity: 0,
                  y: 18,
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
                  duration: 0.5,
                  delay: index * 0.05,
                }}
                whileHover={{
                  y: -4,
                }}
                className="group rounded-[18px] border border-white/10 bg-white/[0.055] p-5 transition-all duration-300 hover:border-blue-300/20 hover:bg-white/[0.085]"
              >
                <div className="flex items-start gap-4">
                  {/* ICON */}

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.07] text-blue-300 transition-all duration-300 group-hover:bg-blue-400/15">
                    <Icon className="h-[17px] w-[17px]" />
                  </div>

                  {/* CONTENT */}

                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {reason.title}
                    </h3>

                    <p className="mt-1.5 text-xs leading-5 text-blue-100/50">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* ===================================================
            STATISTICS
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 18,
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
            duration: 0.55,
            delay: 0.15,
          }}
          className="mt-6 grid grid-cols-2 overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.045] lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`
                px-4 py-5 text-center

                ${index % 2 === 0 ? "border-r border-white/10" : ""}

                ${index < 2 ? "border-b border-white/10 lg:border-b-0" : ""}

                ${index === 1 ? "lg:border-r lg:border-white/10" : ""}

                ${index === 2 ? "lg:border-r lg:border-white/10" : ""}
              `}
            >
              <p className="text-2xl font-bold tracking-[-0.04em] text-white">
                {stat.value}
              </p>

              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-blue-200/45">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}