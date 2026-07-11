"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import {
  ArrowDown,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Images,
  Layers3,
  MapPin,
  Sparkles,
} from "lucide-react";

/* =========================================================
   ANIMATION VARIANTS
========================================================= */

const containerVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

/* =========================================================
   PROJECT CATEGORIES
========================================================= */

const projectCategories = [
  {
    number: "01",
    title: "Windows & Doors",
  },

  {
    number: "02",
    title: "Luxury Interiors",
  },

  {
    number: "03",
    title: "Complete Renovations",
  },
];

/* =========================================================
   PROJECT STATS
========================================================= */

const projectStats = [
  {
    icon: Images,
    value: "5000+",
    label: "PROJECTS DELIVERED",
  },

  {
    icon: Building2,
    value: "3+",
    label: "BUSINESS DIVISIONS",
  },

  {
    icon: CheckCircle2,
    value: "Growing",
    label: "PROJECT PORTFOLIO",
  },
];

/* =========================================================
   GALLERY HERO
========================================================= */

export default function GalleryHero() {
  /* =========================================================
     SCROLL TO PROJECTS
  ========================================================= */

  const scrollToProjects = () => {
    const projectsSection =
      document.getElementById("featured-projects");

    if (!projectsSection) return;

    projectsSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section
      className="
        relative
        overflow-hidden
        border-b
        border-slate-200
        bg-[#F8FAFD]
        pt-24
        sm:pt-28
        lg:pt-32
      "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* GRID */}

        <div
          className="absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(10,46,111,0.045) 1px, transparent 1px),
              linear-gradient(90deg, rgba(10,46,111,0.045) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* LEFT GLOW */}

        <div
          className="
            absolute
            -left-52
            top-16
            h-[500px]
            w-[500px]
            rounded-full
            bg-blue-100/50
            blur-[160px]
          "
        />

        {/* RIGHT GLOW */}

        <div
          className="
            absolute
            -right-52
            bottom-0
            h-[550px]
            w-[550px]
            rounded-full
            bg-slate-200/70
            blur-[170px]
          "
        />

        {/* CENTER LIGHT */}

        <div
          className="
            absolute
            left-1/2
            top-0
            h-[500px]
            w-[500px]
            -translate-x-1/2
            rounded-full
            bg-white/80
            blur-[150px]
          "
        />
      </div>

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div
        className="
          relative
          mx-auto
          max-w-7xl
          px-5
          sm:px-6
          lg:px-8
        "
      >
        {/* ===================================================
            HERO GRID
        =================================================== */}

        <div
          className="
            grid
            min-h-[690px]
            gap-14
            pb-16
            pt-10
            lg:grid-cols-[1.15fr_0.85fr]
            lg:items-center
            lg:gap-20
            lg:pb-20
            lg:pt-12
          "
        >
          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10"
          >
            {/* ===============================================
                EYEBROW
            =============================================== */}

            <motion.div
              variants={itemVariants}
              className="
                inline-flex
                items-center
                gap-2.5
                rounded-full
                border
                border-blue-200
                bg-blue-50/80
                px-4
                py-2.5
                shadow-sm
                backdrop-blur-sm
              "
            >
              <Sparkles className="h-4 w-4 text-[#0A2E6F]" />

              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-[#0A2E6F]
                  sm:text-xs
                "
              >
                Projects by Simmply Perfect Group
              </span>
            </motion.div>

            {/* ===============================================
                HEADING
            =============================================== */}

            <motion.h1
              variants={itemVariants}
              className="
                mt-8
                max-w-3xl
                text-[46px]
                font-bold
                leading-[1.04]
                tracking-[-0.045em]
                text-[#071224]
                sm:text-6xl
                lg:text-[68px]
              "
            >
              Explore spaces.

              <span className="mt-1 block text-[#0A2E6F]">
                Discover our work.
              </span>
            </motion.h1>

            {/* ===============================================
                DESCRIPTION
            =============================================== */}

            <motion.p
              variants={itemVariants}
              className="
                mt-8
                max-w-2xl
                text-sm
                leading-7
                text-slate-600
                sm:text-base
                sm:leading-8
                lg:text-lg
              "
            >
              Discover selected residential and commercial projects
              across premium windows and doors, thoughtfully designed
              interiors, and complete renovation solutions delivered
              by Simmply Perfect Group.
            </motion.p>

            {/* ===============================================
                LOCATION / SUPPORTING INFO
            =============================================== */}

            <motion.div
              variants={itemVariants}
              className="
                mt-6
                flex
                items-center
                gap-2.5
                text-sm
                text-slate-500
              "
            >
              <MapPin className="h-4 w-4 text-[#0A2E6F]" />

              <span>
                Projects across Hyderabad and surrounding locations
              </span>
            </motion.div>

            {/* ===============================================
                CTA BUTTONS
            =============================================== */}

            <motion.div
              variants={itemVariants}
              className="
                mt-9
                flex
                flex-col
                gap-3
                sm:flex-row
                sm:items-center
              "
            >
              {/* EXPLORE PROJECTS */}

              <button
                type="button"
                onClick={scrollToProjects}
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  bg-[#0A2E6F]
                  px-7
                  py-4
                  text-sm
                  font-bold
                  text-white
                  shadow-[0_14px_35px_-15px_rgba(10,46,111,0.7)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#123D80]
                  hover:shadow-[0_20px_45px_-15px_rgba(10,46,111,0.8)]
                "
              >
                Explore Projects

                <ArrowDown
                  className="
                    h-4
                    w-4
                    transition-transform
                    duration-300
                    group-hover:translate-y-1
                  "
                />
              </button>

              {/* CONTACT */}

              <Link
                href="/contact"
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  border
                  border-slate-200
                  bg-white
                  px-7
                  py-4
                  text-sm
                  font-bold
                  text-slate-700
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#0A2E6F]/30
                  hover:text-[#0A2E6F]
                  hover:shadow-md
                "
              >
                Start Your Project

                <ArrowUpRight
                  className="
                    h-4
                    w-4
                    transition-transform
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </Link>
            </motion.div>

            {/* ===============================================
                PROJECT STATS
            =============================================== */}

            <motion.div
              variants={itemVariants}
              className="
                mt-12
                grid
                max-w-3xl
                gap-0
                border-t
                border-slate-200
                pt-7
                sm:grid-cols-3
              "
            >
              {projectStats.map((stat, index) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className={`
                      flex
                      items-start
                      gap-3
                      py-4
                      sm:py-0

                      ${
                        index !== 0
                          ? "sm:border-l sm:border-slate-200 sm:pl-7"
                          : ""
                      }
                    `}
                  >
                    <Icon
                      className="
                        mt-1
                        h-4
                        w-4
                        shrink-0
                        text-[#0A2E6F]
                      "
                    />

                    <div>
                      <p
                        className="
                          text-xl
                          font-bold
                          leading-none
                          tracking-[-0.025em]
                          text-[#0A2E6F]
                          sm:text-2xl
                        "
                      >
                        {stat.value}
                      </p>

                      <p
                        className="
                          mt-2
                          text-[9px]
                          font-bold
                          uppercase
                          tracking-[0.16em]
                          text-slate-400
                          sm:text-[10px]
                        "
                      >
                        {stat.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* =================================================
              RIGHT SHOWCASE PANEL
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.85,
              delay: 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              relative
              mx-auto
              w-full
              max-w-[530px]
              lg:mx-0
              lg:justify-self-end
            "
          >
            {/* ===============================================
                MAIN PANEL OUTER
            =============================================== */}

            <div
              className="
                relative
                overflow-hidden
                rounded-[42px]
                bg-[#071224]
                p-3
                shadow-[0_35px_80px_-30px_rgba(7,18,36,0.45)]
              "
            >
              {/* =============================================
                  INNER PANEL
              ============================================= */}

              <div
                className="
                  relative
                  min-h-[560px]
                  overflow-hidden
                  rounded-[32px]
                  border
                  border-white/10
                  bg-gradient-to-br
                  from-[#164C9A]
                  via-[#0A3478]
                  to-[#071D45]
                  px-8
                  py-9
                  sm:min-h-[590px]
                  sm:px-10
                  sm:py-10
                "
              >
                {/* GRID */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-[0.12]
                  "
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)
                    `,
                    backgroundSize: "44px 44px",
                  }}
                />

                {/* GLOW */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-28
                    -top-28
                    h-[320px]
                    w-[320px]
                    rounded-full
                    bg-blue-300/15
                    blur-[100px]
                  "
                />

                {/* CONTENT */}

                <div className="relative z-10">
                  {/* STATUS */}

                  <div
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-white/15
                      bg-white/10
                      px-4
                      py-2
                      backdrop-blur-md
                    "
                  >
                    <span
                      className="
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-blue-200
                      "
                    />

                    <span
                      className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.18em]
                        text-blue-100
                      "
                    >
                      Our Portfolio
                    </span>
                  </div>

                  {/* HEADING */}

                  <h2
                    className="
                      mt-9
                      max-w-md
                      text-3xl
                      font-bold
                      leading-tight
                      tracking-[-0.035em]
                      text-white
                      sm:text-[40px]
                    "
                  >
                    Every project tells
                    <span className="block">
                      a unique story.
                    </span>
                  </h2>

                  {/* DESCRIPTION */}

                  <p
                    className="
                      mt-6
                      max-w-md
                      text-sm
                      leading-7
                      text-blue-100/70
                    "
                  >
                    Explore projects shaped by thoughtful design,
                    professional execution, premium materials, and
                    attention to every detail.
                  </p>

                  {/* =========================================
                      PROJECT CATEGORY CARDS
                  ========================================= */}

                  <div className="mt-8 space-y-3">
                    {projectCategories.map((category) => (
                      <button
                        type="button"
                        key={category.number}
                        onClick={scrollToProjects}
                        className="
                          group
                          flex
                          w-full
                          items-center
                          justify-between
                          rounded-[18px]
                          border
                          border-white/10
                          bg-white/[0.09]
                          px-5
                          py-4
                          text-left
                          backdrop-blur-md
                          transition-all
                          duration-300
                          hover:-translate-y-0.5
                          hover:border-white/20
                          hover:bg-white/[0.14]
                        "
                      >
                        <div className="flex items-center gap-4">
                          <span
                            className="
                              flex
                              h-10
                              w-10
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              bg-white/10
                              text-xs
                              font-bold
                              text-white
                            "
                          >
                            {category.number}
                          </span>

                          <span
                            className="
                              text-sm
                              font-bold
                              text-white
                            "
                          >
                            {category.title}
                          </span>
                        </div>

                        <ArrowUpRight
                          className="
                            h-4
                            w-4
                            text-blue-100
                            transition-transform
                            duration-300
                            group-hover:-translate-y-0.5
                            group-hover:translate-x-0.5
                          "
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* DECORATIVE TEXT */}

                <span
                  className="
                    pointer-events-none
                    absolute
                    -bottom-10
                    -right-3
                    text-[130px]
                    font-bold
                    leading-none
                    tracking-[-0.08em]
                    text-white/[0.025]
                  "
                >
                  SPG
                </span>
              </div>
            </div>

            {/* ===============================================
                FLOATING CARD
            =============================================== */}

            
          </motion.div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM DECORATIVE LINE
      ===================================================== */}

      <div
        className="
          absolute
          bottom-0
          left-0
          h-px
          w-full
          bg-gradient-to-r
          from-transparent
          via-[#0A2E6F]/15
          to-transparent
        "
      />
    </section>
  );
}