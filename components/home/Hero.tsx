"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
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
  ShoppingCart,
} from "lucide-react";

/* =========================================================
   YOUTUBE VIDEOS DATA
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
    title: "Customer Positive Feedback about Simmply Perfect Windows & Doors",
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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeEmbedId) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setActiveEmbedId(null);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
    document.body.style.overflow = "";
  }, [activeEmbedId]);

  const getYouTubeThumbnail = useCallback((embedId: string) => {
    return `https://img.youtube.com/vi/${embedId}/maxresdefault.jpg`;
  }, []);

  return (
    <>
      {/* =====================================================
          HERO SECTION
      ===================================================== */}
      <section
        aria-labelledby="hero-heading"
        className="relative overflow-hidden bg-white pb-14 pt-24 sm:pb-16 sm:pt-28 lg:pt-32 text-slate-900 antialiased"
      >
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12">
          <div className="grid items-start gap-10 lg:grid-cols-[0.7fr_1.3fr] xl:grid-cols-[0.65fr_1.35fr] xl:gap-14">
            {/* =================================================
                LEFT COLUMN: TEXT & ACTIONS
            ================================================= */}
            <div className="flex flex-col justify-center xl:pr-4">
              {/* BRAND BADGE */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45 }}
                className="mb-5 sm:mb-6 inline-flex self-start items-center gap-2 rounded-xl border border-[#0A2E6F]/15 bg-[#0A2E6F]/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0A2E6F]"
              >
                <Sparkles size={13} className="animate-pulse text-[#0A2E6F]" />
                Simmply Perfect Group
              </motion.div>

              {/* MAIN HEADING */}
              <motion.h1
                id="hero-heading"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl font-black leading-[1.02] tracking-[-1.5px] text-[#0A1A35] sm:text-6xl sm:leading-[0.98] lg:text-5xl xl:text-7xl 2xl:text-8xl"
              >
                Transforming <br />
                Spaces Into <br />
                <span className="bg-gradient-to-r from-[#0A2E6F] via-[#1E4ED8] to-indigo-600 bg-clip-text text-transparent">
                  Experiences
                </span>
                <span className="sr-only">
                  Simmply Perfect Group provides premium aluminium and UPVC
                  windows and doors, luxury interior design, home and
                  commercial renovation, custom metal fabrication, and
                  architectural solutions in Hyderabad.
                </span>
              </motion.h1>

              {/* DESCRIPTION */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="mt-5 sm:mt-7 max-w-xl text-base sm:text-lg font-medium leading-relaxed text-slate-600"
              >
                One trusted destination for premium aluminium and UPVC Windows &
                Doors, Luxury Interiors, Custom Metal Fabrication, Home &
                Commercial Renovations, and turnkey architectural solutions in
                Hyderabad.
              </motion.p>

              {/* SERVICE PILLS */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="mt-6 sm:mt-7 flex flex-wrap gap-2 sm:gap-2.5"
                aria-label="Simmply Perfect Group services"
              >
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <span
                      key={service.label}
                      className="inline-flex cursor-default items-center gap-1.5 sm:gap-2 rounded-xl border border-slate-200/80 bg-slate-50 px-3.5 py-2 text-[11px] sm:text-xs font-bold text-slate-700 transition-all duration-200 hover:border-[#0A2E6F]/30 hover:bg-white hover:text-[#0A2E6F]"
                    >
                      <Icon size={13} className="shrink-0 text-[#0A2E6F]" />
                      {service.label}
                    </span>
                  );
                })}
              </motion.div>

              {/* CTA ACTION BUTTONS */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.35,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:flex-nowrap items-stretch sm:items-center gap-3 sm:gap-3 xl:gap-3.5 py-2.5 px-0.5"
              >
                {/* Get In Touch */}
                <Link
                  href="/contact"
                  className="group relative inline-flex w-full sm:w-auto shrink-0 items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#0A2E6F] px-5 py-3.5 xl:px-6 text-sm font-bold tracking-wide text-white transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[#082559] active:translate-y-0"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
                  <span className="relative z-10 whitespace-nowrap">
                    Get In Touch
                  </span>
                  <ArrowRight
                    size={16}
                    strokeWidth={2.2}
                    className="relative z-10 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1"
                  />
                </Link>

                {/* Explore Services -> Targets General Services on Home */}
                <Link
                  href="/#general-services"
                  className="group inline-flex w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 xl:px-6 text-sm font-bold tracking-wide text-[#0A1A35] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#0A2E6F]/30 hover:bg-slate-50 active:translate-y-0"
                >
                  <span className="whitespace-nowrap">Explore Services</span>

                  <ArrowRight
                    size={16}
                    strokeWidth={2}
                    className="shrink-0 text-[#0A2E6F] transition-transform duration-300 ease-out group-hover:translate-x-1"
                  />
                </Link>

                {/* Explore Products */}
                <a
                  href="https://shop.simmplyperfect.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Buy Simmply Perfect products online"
                  className="group inline-flex w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-full border border-[#0A2E6F]/20 bg-blue-50/50 px-6 sm:px-7 py-3.5 text-sm font-semibold tracking-wide text-[#0A2E6F] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#0A2E6F] hover:bg-[#0A2E6F] hover:text-white active:translate-y-0"
                >
                  <ShoppingCart
                    size={17}
                    strokeWidth={2.2}
                    className="shrink-0 transition-transform duration-300 ease-out group-hover:scale-105"
                  />

                  <span className="whitespace-nowrap">Buy Online</span>

                  <ArrowUpRight
                    size={16}
                    strokeWidth={2.2}
                    className="shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </motion.div>

              {/* STATISTICS */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="mt-8 sm:mt-10"
              >
                <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
                  {statistics.map((stat, index) => (
                    <div
                      key={stat.label}
                      className={`group relative flex flex-col items-center justify-center p-3 sm:py-5 text-center transition-colors hover:bg-slate-50/50 ${
                        index !== statistics.length - 1
                          ? "border-r border-slate-200/80"
                          : ""
                      }`}
                    >
                      <div className="absolute left-1/2 top-0 h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#0A2E6F] transition-all duration-300 group-hover:w-12" />
                      <h3 className="text-lg font-extrabold tracking-tight text-[#0A2E6F] sm:text-2xl lg:text-3xl">
                        {stat.value}
                      </h3>
                      <div className="my-1.5 sm:my-2 h-[2px] w-6 rounded-full bg-[#0A2E6F]/20" />
                      <p className="text-[9px] font-bold uppercase leading-tight tracking-[0.12em] text-slate-500 sm:text-[10px] md:text-[11px]">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* =================================================
                RIGHT COLUMN: HERO MEDIA & GALLERY
            ================================================= */}
            <div className="min-w-0 lg:mt-2 xl:mt-4">
              {/* HERO VIDEO CONTAINER */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-slate-900 shadow-xl"
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Simmply Perfect Group architectural showcase video"
                  className="block aspect-video h-auto w-full object-cover"
                >
                  <source src="/videos/hero-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </motion.div>

              {/* PROJECT GALLERY */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="mt-12 sm:mt-16 overflow-hidden"
              >
                {/* GALLERY HEADER */}
                <div className="mb-4 flex items-end justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <Images size={14} className="text-[#0A2E6F]" />
                      <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#0A2E6F]">
                        Selected Works
                      </span>
                    </div>
                    <h2 className="mt-1 text-lg sm:text-xl font-black tracking-tight text-[#0A1A35]">
                      Explore Our Projects
                    </h2>
                  </div>

                  <Link
                    href="/gallery"
                    className="group hidden items-center gap-1.5 text-xs font-bold text-[#0A2E6F] transition-colors hover:text-[#072456] sm:flex"
                  >
                    View Gallery
                    <ArrowRight
                      size={13}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>

                {/* AUTO-SCROLLING INFINITE CAROUSEL */}
                <div className="group relative overflow-hidden rounded-2xl [mask-image:linear-gradient(to_right,transparent,white_8%,white_92%,transparent)]">
                  <motion.div
                    className="flex w-max gap-4 py-1 hover:[animation-play-state:paused]"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                      duration: 30,
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
                          className="group/card relative h-[175px] w-[260px] sm:w-[290px] xl:h-[190px] xl:w-[310px] shrink-0 overflow-hidden rounded-2xl bg-slate-100 shadow-sm"
                          aria-label={`View ${project.title} by Simmply Perfect Group`}
                        >
                          <Image
                            src={project.image}
                            alt={`${project.title} by Simmply Perfect Group`}
                            fill
                            sizes="(max-width: 768px) 260px, 310px"
                            className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                          />

                          {/* GRADIENT OVERLAY */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#06152d]/95 via-[#06152d]/30 to-transparent" />

                          {/* TOP ICON */}
                          <div className="absolute left-3.5 top-3.5 flex h-8 w-8 items-center justify-center rounded-xl border border-white/20 bg-black/25 text-white backdrop-blur-md">
                            <Icon size={15} />
                          </div>

                          {/* CARD CONTENT */}
                          <div className="absolute bottom-0 left-0 right-0 p-3.5">
                            <div className="flex items-end justify-between gap-3">
                              <div className="min-w-0">
                                <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-white/70">
                                  Explore Projects
                                </p>
                                <h3 className="mt-0.5 truncate text-sm sm:text-base font-extrabold text-white">
                                  {project.title}
                                </h3>
                                <p className="mt-0.5 truncate text-[10px] font-medium text-white/70">
                                  {project.description}
                                </p>
                              </div>

                              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover/card:bg-white group-hover/card:text-[#0A2E6F]">
                                <ArrowRight size={12} />
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
                  className="mt-3.5 flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-xs font-bold text-[#0A2E6F] transition-colors active:bg-slate-50 sm:hidden"
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
          MEDIA & BROADCAST HUB
      ========================================================= */}
      <section
        aria-labelledby="media-heading"
        className="relative z-10 border-t border-slate-100 bg-[#FAFBFD] py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* HEADER */}
          <div className="flex flex-col justify-between gap-4 border-b border-slate-200/70 pb-8 md:flex-row md:items-end">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#0A2E6F]">
                <Tv size={14} />
                Media & Broadcast Hub
              </span>
              <h2
                id="media-heading"
                className="mt-2 text-2xl font-black tracking-tight text-[#0A1A35] sm:text-3xl md:text-4xl"
              >
                Featured Video Presentations
              </h2>
            </div>

            <p className="max-w-md text-xs sm:text-sm leading-relaxed text-slate-500">
              Explore dynamic product overviews, customer stories, Windows &
              Doors presentations, design walkthroughs, and media stories
              produced directly by Simmply Perfect Group.
            </p>
          </div>

          {/* MEDIA GRID */}
          <div className="mt-8 sm:mt-12 grid items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
            {/* FEATURED VIDEO */}
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-sm lg:col-span-7">
              <div
                onClick={() => setActiveEmbedId(youtubeVideos[0].embedId)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    setActiveEmbedId(youtubeVideos[0].embedId);
                  }
                }}
                aria-label={`Play ${youtubeVideos[0].title}`}
                className="relative aspect-video w-full cursor-pointer overflow-hidden rounded-xl bg-slate-900"
              >
                <Image
                  src={getYouTubeThumbnail(youtubeVideos[0].embedId)}
                  alt={youtubeVideos[0].title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                  priority={false}
                />
                <div className="absolute inset-0 bg-slate-950/20 transition-colors duration-300 group-hover:bg-slate-950/40" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white/95 text-[#0A2E6F] shadow-xl"
                  >
                    <Play size={22} className="ml-1 fill-current" />
                  </motion.div>
                </div>

                <span className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex items-center gap-1 rounded-md bg-slate-900/80 px-2.5 py-1 text-[10px] sm:text-[11px] font-bold text-white backdrop-blur-md">
                  <Clock size={10} />
                  {youtubeVideos[0].duration}
                </span>
              </div>

              <div className="mt-4 sm:mt-5">
                <span className="rounded-md bg-blue-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[#0A2E6F]">
                  {youtubeVideos[0].category}
                </span>
                <h3 className="mt-2.5 text-lg sm:text-xl font-extrabold leading-snug tracking-tight text-[#0A1A35] transition-colors duration-200 group-hover:text-[#0A2E6F]">
                  {youtubeVideos[0].title}
                </h3>
              </div>
            </div>

            {/* RIGHT SIDE VIDEO LIST & CTA */}
            <div className="flex flex-col gap-4 lg:col-span-5">
              {youtubeVideos.slice(1).map((video) => (
                <div
                  key={video.id}
                  onClick={() => setActiveEmbedId(video.embedId)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      setActiveEmbedId(video.embedId);
                    }
                  }}
                  aria-label={`Play ${video.title}`}
                  className="group flex cursor-pointer items-center gap-3.5 sm:gap-4 rounded-2xl border border-slate-200/80 bg-white p-3 sm:p-4 transition-all duration-300 hover:border-[#0A2E6F]/30 hover:shadow-md"
                >
                  <div className="relative aspect-video w-28 sm:w-36 shrink-0 overflow-hidden rounded-xl bg-slate-900">
                    <Image
                      src={getYouTubeThumbnail(video.embedId)}
                      alt={video.title}
                      fill
                      sizes="(max-width: 640px) 120px, 150px"
                      className="object-cover opacity-90 transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-[#0A2E6F] shadow-md">
                        <Play size={11} className="ml-0.5 fill-current" />
                      </div>
                    </div>
                  </div>

                  <div className="min-w-0">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      {video.category}
                    </span>
                    <h4 className="mt-0.5 line-clamp-2 text-xs sm:text-sm font-bold leading-snug text-[#0A1A35] group-hover:text-[#0A2E6F] transition-colors">
                      {video.title}
                    </h4>
                    <p className="mt-1 flex items-center gap-1 text-[10px] sm:text-[11px] text-slate-400">
                      <Clock size={10} />
                      {video.duration} Mins
                    </p>
                  </div>
                </div>
              ))}

              {/* YOUTUBE CTA BOX */}
              <div className="flex min-h-[130px] flex-1 flex-col justify-between rounded-2xl bg-gradient-to-br from-slate-900 to-[#0A1A35] p-4 sm:p-5 text-white">
                <div>
                  <h4 className="text-sm sm:text-base font-extrabold">
                    Access Digital Streams
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-white/70">
                    Subscribe to our corporate channels for Windows & Doors
                    product releases, customer stories, and engineering insights.
                  </p>
                </div>

                <a
                  href="https://www.youtube.com/@SimmplyPerfectWindowsandDoors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Simmply Perfect Windows and Doors YouTube channel"
                  className="mt-3 inline-flex items-center gap-1.5 self-start text-xs font-bold text-blue-400 transition-colors hover:text-blue-300"
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
          ACCESSIBLE VIDEO MODAL
      ========================================================= */}
      <AnimatePresence>
        {activeEmbedId && (
          <div
            className="fixed inset-0 z-[600] flex items-center justify-center p-3 sm:p-6 md:p-10"
            role="dialog"
            aria-modal="true"
            aria-label="Simmply Perfect Group video player"
          >
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveEmbedId(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* MODAL WINDOW */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.35 }}
              className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-black shadow-[0_25px_70px_rgba(0,0,0,0.6)]"
            >
              <button
                type="button"
                onClick={() => setActiveEmbedId(null)}
                className="absolute right-3 top-3 z-20 rounded-full border border-white/20 bg-black/70 p-2 text-white transition-colors hover:bg-black"
                aria-label="Close video modal"
              >
                <X size={18} />
              </button>

              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeEmbedId}?autoplay=1&rel=0`}
                title="Simmply Perfect Group Video Presentation"
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