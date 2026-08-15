"use client";

import Link from "next/link";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Clock,
  ExternalLink,
  Hammer,
  Home,
  Images,
  Layers,
  Play,
  Sparkles,
  Tv,
  Warehouse,
  Wrench,
  X,
} from "lucide-react";

/* =========================================================
   YOUTUBE VIDEOS
========================================================= */

const youtubeVideos = [
  {
    id: "vid-1",
    title: "Simmply Perfect Windows & Doors - Theme Song",
    duration: "03:55",
    embedId: "VNWaeyvvwCo",
    category: "Windows & Doors",
  },
  {
    id: "vid-2",
    title:
      "Customer Positive Feedback about Simmply Perfect Windows & Doors",
    duration: "00:13",
    embedId: "vLjkmSap5V4",
    category: "Customer Reviews",
  },
  {
    id: "vid-3",
    title:
      "For the Best and Most Promising Windows & Doors in Hyderabad - Choose Simmply Perfect Windows & Doors",
    duration: "00:13",
    embedId: "8lJYols0PDk",
    category: "Windows & Doors",
  },
];

/* =========================================================
   PROJECT GALLERY CATEGORIES

   Add these images:

   public/images/projects/villa-projects.jpg
   public/images/projects/commercial-projects.jpg
   public/images/projects/residential-projects.jpg
========================================================= */

const projectCategories = [
  {
    id: 1,
    title: "Villa Projects",
    description: "Luxury homes crafted for exceptional living.",
    image: "/images/projects/villa-projects.jpg",
    icon: Home,
  },
  {
    id: 2,
    title: "Commercial Projects",
    description: "Professional spaces designed for modern businesses.",
    image: "/images/projects/commercial-projects.jpg",
    icon: Building2,
  },
  {
    id: 3,
    title: "Residential Projects",
    description: "Thoughtfully designed spaces made for everyday life.",
    image: "/images/projects/residential-projects.jpg",
    icon: Warehouse,
  },
];

/* =========================================================
   SERVICES
========================================================= */

const services = [
  {
    label: "Windows & Doors",
    icon: Layers,
  },
  {
    label: "Interiors",
    icon: Sparkles,
  },
  {
    label: "Renovation",
    icon: Hammer,
  },
  {
    label: "Metal Works",
    icon: Wrench,
  },
];

/* =========================================================
   STATISTICS
========================================================= */

const statistics = [
  {
    value: "3000+",
    label: "Projects Delivered",
  },
  {
    value: "18+",
    label: "Years Experience",
  },
  {
    value: "99.12%",
    label: "Client Satisfaction",
  },
];

/* =========================================================
   HERO COMPONENT
========================================================= */

export default function Hero() {
  const [activeEmbedId, setActiveEmbedId] = useState<string | null>(null);

  const getYouTubeThumbnail = (embedId: string) => {
    return `https://img.youtube.com/vi/${embedId}/maxresdefault.jpg`;
  };

  return (
    <>
      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section
        aria-labelledby="hero-heading"
        className="relative overflow-hidden bg-white pb-16 pt-28 text-slate-900 antialiased"
      >
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <div className="grid items-start gap-10 lg:grid-cols-[0.65fr_1.35fr] xl:gap-12">
            {/* =================================================
                LEFT COLUMN
            ================================================= */}

            <div className="flex flex-col justify-center xl:pr-6">
              {/* BRAND BADGE */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="mb-6 inline-flex self-start items-center gap-2 rounded-xl border border-[#0A2E6F]/10 bg-[#0A2E6F]/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0A2E6F]"
              >
                <Sparkles size={12} className="animate-pulse" />

                Simmply Perfect Group
              </motion.div>

              {/* MAIN HEADING */}

              <motion.h1
                id="hero-heading"
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-5xl font-black leading-[0.95] tracking-[-2px] text-[#0A1A35] md:text-6xl xl:text-8xl"
              >
                Transforming <br />

                Spaces Into <br />

                <span className="bg-gradient-to-r from-[#0A2E6F] via-[#1E4ED8] to-indigo-600 bg-clip-text text-transparent">
                  Experiences
                </span>

                {/* SEO CONTEXT — visually hidden, not a UI change */}
                <span className="sr-only">
                  Simmply Perfect Group provides premium aluminium and UPVC
                  windows and doors, luxury interior design, home and
                  commercial renovation, custom metal fabrication, and
                  architectural solutions in Hyderabad.
                </span>
              </motion.h1>

              {/* DESCRIPTION */}

              <motion.p
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.2,
                  duration: 0.6,
                }}
                className="mt-8 max-w-xl text-lg font-medium leading-relaxed text-slate-600"
              >
                One trusted destination for premium aluminium and UPVC
                Windows & Doors, Luxury Interiors, Custom Metal Fabrication,
                Home & Commercial Renovations, and turnkey architectural
                solutions in Hyderabad.
              </motion.p>

              {/* SERVICES */}

              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 0.3,
                  duration: 0.5,
                }}
                className="mt-8 flex flex-wrap gap-2.5"
                aria-label="Simmply Perfect Group services"
              >
                {services.map((service) => {
                  const Icon = service.icon;

                  return (
                    <span
                      key={service.label}
                      className="inline-flex cursor-default items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 transition-all duration-300 hover:border-[#0A2E6F]/30 hover:bg-white hover:text-[#0A2E6F]"
                    >
                      <Icon
                        size={13}
                        className="shrink-0 text-[#0A2E6F]"
                      />

                      {service.label}
                    </span>
                  );
                })}
              </motion.div>

              {/* BUTTONS */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.4,
                  duration: 0.6,
                }}
                className="mt-10 flex flex-wrap gap-4 sm:flex-nowrap"
              >
                <Link
                  href="/contact"
                  className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0A2E6F] px-8 py-4 text-sm font-bold tracking-wide text-white shadow-[0_10px_25px_rgba(10,46,111,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#072456] sm:w-auto"
                >
                  Get In Touch

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/windows-doors"
                  className="flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 py-4 text-sm font-bold tracking-wide text-[#0A1A35] transition-all duration-300 hover:bg-slate-50 sm:w-auto"
                >
                  Explore Services
                </Link>
              </motion.div>

              {/* STATISTICS */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.45,
                  duration: 0.6,
                }}
                className="mt-10"
              >
                <div className="grid grid-cols-3 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
                  {statistics.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      whileHover={{
                        y: -4,
                        scale: 1.02,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                      className={`group relative flex flex-col items-center justify-center px-3 py-5 text-center ${
                        index !== statistics.length - 1
                          ? "border-r border-slate-200"
                          : ""
                      }`}
                    >
                      <div className="absolute left-1/2 top-0 h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#0A2E6F] transition-all duration-300 group-hover:w-12" />

                      <h3 className="text-2xl font-extrabold tracking-tight text-[#0A2E6F] sm:text-3xl">
                        {stat.value}
                      </h3>

                      <div className="my-2 h-[2px] w-7 rounded-full bg-[#0A2E6F]/20" />

                      <p className="text-[10px] font-semibold uppercase leading-tight tracking-[0.15em] text-slate-500 sm:text-[11px]">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* =================================================
                RIGHT COLUMN
            ================================================= */}

            <div className="min-w-0 lg:mt-8 xl:mt-10">
              {/* =================================================
                  HERO VIDEO
              ================================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: 80,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.7,
                }}
                className="relative"
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-label="Simmply Perfect Group windows, doors, interiors, renovation and architectural solutions"
                  className="block h-auto w-full object-contain"
                >
                  <source
                    src="/videos/hero-video.mp4"
                    type="video/mp4"
                  />

                  Your browser does not support the video tag.
                </video>
              </motion.div>

              {/* =================================================
                  PROJECT GALLERY
              ================================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.5,
                  duration: 0.7,
                }}
                className="mt-20 overflow-hidden"
              >
                {/* GALLERY HEADER */}

                <div className="mb-4 flex items-end justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Images
                        size={15}
                        className="text-[#0A2E6F]"
                      />

                      <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#0A2E6F]">
                        Selected Works
                      </span>
                    </div>

                    <h2 className="mt-1 text-xl font-black tracking-tight text-[#0A1A35]">
                      Explore Our Projects
                    </h2>
                  </div>

                  <Link
                    href="/gallery"
                    className="group hidden items-center gap-1.5 text-xs font-bold text-[#0A2E6F] sm:flex"
                  >
                    View Gallery

                    <ArrowRight
                      size={13}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>

                {/* =================================================
                    AUTO SCROLLING GALLERY
                ================================================= */}

                <div className="relative overflow-hidden">
                  {/* SCROLLING TRACK */}

                  <motion.div
                    className="flex w-max gap-4"
                    animate={{
                      x: ["0%", "-50%"],
                    }}
                    transition={{
                      duration: 25,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                  >
                    {[
                      ...projectCategories,
                      ...projectCategories,
                      ...projectCategories,
                      ...projectCategories,
                    ].map((project, index) => {
                      const Icon = project.icon;

                      return (
                        <Link
                          key={`${project.id}-${index}`}
                          href="/gallery"
                          className="group relative h-[175px] w-[280px] shrink-0 overflow-hidden rounded-2xl bg-slate-100 xl:h-[190px] xl:w-[310px]"
                          aria-label={`View ${project.title} by Simmply Perfect Group`}
                        >
                          {/* PROJECT IMAGE */}

                          <img
                            src={project.image}
                            alt={`${project.title} by Simmply Perfect Group`}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />

                          {/* DARK GRADIENT */}

                          <div className="absolute inset-0 bg-gradient-to-t from-[#06152d]/95 via-[#06152d]/25 to-transparent" />

                          {/* TOP ICON */}

                          <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-black/20 text-white backdrop-blur-md">
                            <Icon size={17} />
                          </div>

                          {/* PROJECT INFORMATION */}

                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <div className="flex items-end justify-between gap-4">
                              <div>
                                <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-white/60">
                                  Explore Projects
                                </p>

                                <h3 className="mt-1 text-base font-extrabold text-white">
                                  {project.title}
                                </h3>

                                <p className="mt-1 line-clamp-1 text-[10px] font-medium text-white/60">
                                  {project.description}
                                </p>
                              </div>

                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-white group-hover:text-[#0A2E6F]">
                                <ArrowRight size={13} />
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </motion.div>
                </div>

                {/* MOBILE BUTTON */}

                <Link
                  href="/gallery"
                  className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-xs font-bold text-[#0A2E6F] sm:hidden"
                >
                  View Complete Gallery

                  <ArrowRight size={13} />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          MEDIA SECTION
      ========================================================= */}

      <section
        aria-labelledby="media-heading"
        className="relative z-10 border-t border-slate-100 bg-[#FAFBFD] py-24"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* HEADER */}

          <div className="flex flex-col justify-between gap-6 border-b border-slate-200/60 pb-12 md:flex-row md:items-end">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#0A2E6F]">
                <Tv size={14} />

                Media & Broadcast Hub
              </span>

              <h2
                id="media-heading"
                className="mt-3 text-3xl font-black tracking-tight text-[#0A1A35] md:text-4xl"
              >
                Featured Video Presentations
              </h2>
            </div>

            <p className="max-w-md text-sm leading-relaxed text-slate-500">
              Explore dynamic product overviews, customer stories, Windows &
              Doors presentations, design walkthroughs, and media stories
              produced directly by Simmply Perfect Group.
            </p>
          </div>

          {/* MEDIA GRID */}

          <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-12">
            {/* FEATURED VIDEO */}

            <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.02)] lg:col-span-7">
              <div
                onClick={() =>
                  setActiveEmbedId(youtubeVideos[0].embedId)
                }
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    setActiveEmbedId(youtubeVideos[0].embedId);
                  }
                }}
                aria-label={`Play ${youtubeVideos[0].title}`}
                className="relative aspect-video cursor-pointer overflow-hidden rounded-xl bg-slate-900"
              >
                <img
                  src={getYouTubeThumbnail(
                    youtubeVideos[0].embedId
                  )}
                  alt={youtubeVideos[0].title}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-85 transition-transform duration-500 group-hover:scale-105"
                  onError={(event) => {
                    event.currentTarget.src = `https://img.youtube.com/vi/${youtubeVideos[0].embedId}/hqdefault.jpg`;
                  }}
                />

                <div className="absolute inset-0 bg-slate-950/20 transition-colors duration-300 group-hover:bg-slate-950/40" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{
                      scale: 1.1,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-[#0A2E6F] shadow-xl"
                  >
                    <Play
                      size={24}
                      className="ml-1 fill-current"
                    />
                  </motion.div>
                </div>

                <span className="absolute bottom-4 right-4 flex items-center gap-1 rounded-md bg-slate-900/80 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-md">
                  <Clock size={10} />

                  {youtubeVideos[0].duration}
                </span>
              </div>

              <div className="mt-5">
                <span className="rounded-md bg-blue-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[#0A2E6F]">
                  {youtubeVideos[0].category}
                </span>

                <h3 className="mt-3 text-xl font-extrabold leading-snug tracking-tight text-[#0A1A35] transition-colors duration-200 group-hover:text-[#0A2E6F]">
                  {youtubeVideos[0].title}
                </h3>
              </div>
            </div>

            {/* RIGHT VIDEO COLUMN */}

            <div className="flex flex-col gap-4 lg:col-span-5">
              {youtubeVideos.slice(1).map((video) => (
                <div
                  key={video.id}
                  onClick={() =>
                    setActiveEmbedId(video.embedId)
                  }
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      setActiveEmbedId(video.embedId);
                    }
                  }}
                  aria-label={`Play ${video.title}`}
                  className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-slate-200/60 bg-white p-4 transition-all duration-300 hover:border-[#0A2E6F]/20 hover:shadow-lg"
                >
                  <div className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-xl bg-slate-800 sm:w-40">
                    <img
                      src={getYouTubeThumbnail(video.embedId)}
                      alt={video.title}
                      loading="lazy"
                      className="h-full w-full object-cover opacity-90 transition-transform duration-300 group-hover:scale-105"
                      onError={(event) => {
                        event.currentTarget.src = `https://img.youtube.com/vi/${video.embedId}/hqdefault.jpg`;
                      }}
                    />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#0A2E6F]">
                        <Play
                          size={12}
                          className="ml-0.5 fill-current"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      {video.category}
                    </span>

                    <h4 className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-[#0A1A35]">
                      {video.title}
                    </h4>

                    <p className="mt-1.5 flex items-center gap-1 text-[11px] text-slate-400">
                      <Clock size={10} />

                      {video.duration} Mins
                    </p>
                  </div>
                </div>
              ))}

              {/* YOUTUBE CTA */}

              <div className="flex min-h-[140px] flex-1 flex-col justify-between rounded-2xl bg-gradient-to-br from-slate-900 to-[#0A1A35] p-5 text-white">
                <div>
                  <h4 className="text-base font-extrabold">
                    Access Digital Streams
                  </h4>

                  <p className="mt-1 text-xs leading-relaxed text-white/70">
                    Subscribe to our corporate channels for Windows & Doors
                    product releases, customer stories, project showcases,
                    and engineering insights.
                  </p>
                </div>

                <a
                  href="https://www.youtube.com/@SimmplyPerfectWindowsandDoors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Simmply Perfect Windows and Doors YouTube channel"
                  className="mt-4 inline-flex items-center gap-1.5 self-start text-xs font-bold text-blue-400"
                >
                  Visit Main YouTube Channel

                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          VIDEO MODAL
      ========================================================= */}

      <AnimatePresence>
        {activeEmbedId && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
            role="dialog"
            aria-modal="true"
            aria-label="Simmply Perfect Group video player"
          >
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() => setActiveEmbedId(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 15,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 15,
              }}
              transition={{
                type: "spring",
                duration: 0.4,
              }}
              className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_25px_70px_rgba(0,0,0,0.5)]"
            >
              <button
                type="button"
                onClick={() => setActiveEmbedId(null)}
                className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-black/60 p-2 text-white transition-colors hover:bg-black"
                aria-label="Close Video"
              >
                <X size={18} />
              </button>

              <iframe
                src={`https://www.youtube.com/embed/${activeEmbedId}?autoplay=1&rel=0`}
                title="Simmply Perfect Group YouTube Video Player"
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}