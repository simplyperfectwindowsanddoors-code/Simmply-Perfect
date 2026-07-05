"use client";

import Link from "next/link";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Play, 
  Layers, 
  Sparkles, 
  Hammer, 
  X,
  Tv,
  Clock,
  ExternalLink,
  Wrench
} from "lucide-react";

// Clean config structure optimized to fetch graphics straight from YouTube assets
const youtubeVideos = [
  {
    id: "vid-1",
    title: "Simmply Perfect Windows & Doors - Theme Song",
    duration: "03:55",
    embedId: "VNWaeyvvwCo", 
    category: "Creative Content"
  },
  {
    id: "vid-2",
    title: "Customer Positive Feedback about Simmply Perfect Windows & Doors",
    duration: "00:13",
    embedId: "vLjkmSap5V4",
    category: "Review"
  },
  {
    id: "vid-3",
    title: "For the Best and most Promising Windows & Doors in Hyderabad- Choose Simmply Perfect Windows & Doors",
    duration: "00:13",
    embedId: "8lJYols0PDk",
    category: "Interiors"
  }
];

export default function Hero() {
  const [activeEmbedId, setActiveEmbedId] = useState<string | null>(null);

  // Helper utility function to automatically resolve high-definition imagery payloads
  const getYouTubeThumbnail = (embedId: string) => {
    return `https://img.youtube.com/vi/${embedId}/maxresdefault.jpg`;
  };

  return (
    <>
      {/* HERO COMPONENT SECTION */}
      <section className="pt-28 pb-24 bg-white overflow-hidden antialiased text-slate-900">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          
          <div className="grid lg:grid-cols-[0.65fr_1.35fr] gap-12 items-center">
            
            {/* LEFT COLUMN: BRAND INTELLIGENCE CORE */}
            <div className="flex flex-col justify-center xl:pr-6">
  
              {/* TOP BRAND ACCENT TAG */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 mb-6 self-start px-3.5 py-1.5 rounded-xl bg-[#0A2E6F]/5 border border-[#0A2E6F]/10 text-xs font-bold uppercase tracking-wider text-[#0A2E6F]"
              >
                <Sparkles size={12} className="animate-pulse" />
                Simmply Perfect Group
              </motion.div>

              {/* MAIN ARCHITECTURAL HEADING */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-7xl xl:text-8xl font-black text-[#0A1A35] leading-[0.95] tracking-[-2px]"
              >
                Transforming <br />
                Spaces Into <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A2E6F] via-[#1E4ED8] to-indigo-600">
                  Experiences
                </span>
              </motion.h1>

              {/* HERO SUBTEXT */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mt-8 text-lg text-slate-600 leading-relaxed max-w-xl font-medium"
              >
                One trusted destination for premium Windows & Doors, Luxury Interiors, Custom Metal Fabrication, Home Renovations, and turnkey architectural solutions designed to elevate every space.
              </motion.p>

              {/* SERVICE PILLS MODULE */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex flex-wrap gap-2.5 mt-8"
              >
                {[
                  { label: "Windows & Doors", icon: Layers },
                  { label: "Interiors", icon: Sparkles },
                  { label: "Renovation", icon: Hammer },
                  {label: "Metal Works", icon: Wrench},
                ].map((service) => {
                  const IconComp = service.icon;
                  return (
                    <span 
                      key={service.label} 
                      className="px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-white text-slate-700 hover:text-[#0A2E6F] font-bold text-xs inline-flex items-center gap-2 border border-slate-200/80 hover:border-[#0A2E6F]/30 hover:shadow-[0_4px_12px_rgba(10,46,111,0.04)] transition-all duration-300 cursor-default"
                    >
                      <IconComp size={13} className="text-[#0A2E6F] shrink-0" />
                      {service.label}
                    </span>
                  );
                })}
              </motion.div>

              {/* ACTION TRIGGER CONSOLE */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-wrap sm:flex-nowrap gap-4 mt-10"
              >
                <Link
                  href="/contact"
                  className="group w-full sm:w-auto bg-[#0A2E6F] hover:bg-[#072456] text-white px-8 py-4 rounded-2xl flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(10,46,111,0.15)] hover:shadow-[0_15px_30px_rgba(10,46,111,0.25)] hover:-translate-y-0.5 transition-all duration-300 font-bold text-sm tracking-wide"
                >
                  Get In Touch
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>

                <Link
                  href="/windows-doors" 
                  className="w-full sm:w-auto border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-[#0A1A35] px-8 py-4 rounded-2xl transition-all duration-300 font-bold text-sm tracking-wide flex items-center justify-center"
                >
                  Explore Services
                </Link>
              </motion.div>

              {/* CREDIBILITY PERFORMANCE ARCHITECTURE */}
              <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.45, duration: 0.6 }}
  className="mt-10"
>
  <div className="grid grid-cols-3 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]">

    {[
      { value: "3000+", label: "Projects Delivered" },
      { value: "18+", label: "Years Experience" },
      { value: "99.12%", label: "Client Satisfaction" },
    ].map((stat, i) => (
      <motion.div
        key={i}
        whileHover={{
          y: -4,
          scale: 1.02,
        }}
        transition={{ duration: 0.25 }}
        className={`group relative flex flex-col items-center justify-center py-5 px-3 text-center ${
          i !== 2 ? "border-r border-slate-200" : ""
        }`}
      >
        {/* Top Accent */}
        <div className="absolute top-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#0A2E6F] transition-all duration-300 group-hover:w-12" />

        {/* Value */}
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0A2E6F] transition-transform duration-300 group-hover:scale-105">
          {stat.value}
        </h3>

        {/* Divider */}
        <div className="w-7 h-[2px] rounded-full bg-[#0A2E6F]/20 my-2 transition-all duration-300 group-hover:w-10 group-hover:bg-[#0A2E6F]" />

        {/* Label */}
        <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500 leading-tight group-hover:text-[#0A2E6F] transition-colors duration-300">
          {stat.label}
        </p>

        {/* Soft Background Glow */}
        <div className="absolute inset-0 bg-blue-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 rounded-xl" />
      </motion.div>
    ))}

  </div>
</motion.div>
            </div>

            {/* RIGHT COLUMN: BACKGROUND INTRO LOOP VIDEO */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="w-full h-auto object-contain"
              >
                <source src="/videos/hero-video.mp4" type="video/mp4" />
              </video>
            </motion.div>

          </div>
        </div>
      </section>

      {/* DYNAMIC BROADCAST GRID & YOUTUBE MEDIA WALL */}
      <section className="py-24 bg-[#FAFBFD] border-t border-slate-100 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* HEADER PARAMS */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-200/60">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#0A2E6F]">
                <Tv size={14} />
                Media & Broadcast Hub
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-black text-[#0A1A35] tracking-tight">
                Featured Video Presentations
              </h2>
            </div>
            <p className="text-sm text-slate-500 max-w-md leading-relaxed">
              Explore dynamic product overviews, design framework walkthroughs, and animated media stories produced directly by our engineering teams.
            </p>
          </div>

          {/* STREAM CONSOLE GRID STACK */}
          <div className="grid lg:grid-cols-12 gap-8 mt-12 items-stretch">
            
            {/* HERO FEATURED SELECTION CARD (LEFT - 7 COLS) */}
            <div className="lg:col-span-7 flex flex-col justify-between group relative bg-white rounded-2xl border border-slate-200/70 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.02)] overflow-hidden">
              <div 
                className="relative overflow-hidden rounded-xl bg-slate-900 aspect-video cursor-pointer"
                onClick={() => setActiveEmbedId(youtubeVideos[0].embedId)}
              >
                <img 
                  src={getYouTubeThumbnail(youtubeVideos[0].embedId)} 
                  alt={youtubeVideos[0].title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 opacity-85"
                  onError={(e) => {
                    // Fallback to high quality definition if maxresdefault doesn't exist for a video
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${youtubeVideos[0].embedId}/hqdefault.jpg`;
                  }}
                />
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors duration-300" />
                
                {/* Play Trigger Element */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-16 h-16 rounded-full bg-white/95 text-[#0A2E6F] shadow-xl flex items-center justify-center backdrop-blur-sm"
                  >
                    <Play size={24} className="fill-current ml-1" />
                  </motion.div>
                </div>

                <span className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-white tracking-wide rounded-md flex items-center gap-1">
                  <Clock size={10} />
                  {youtubeVideos[0].duration}
                </span>
              </div>

              <div className="mt-5">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0A2E6F] bg-[#0A2E6F]/5 px-2.5 py-1 rounded-md">
                  {youtubeVideos[0].category}
                </span>
                <h3 className="mt-3 text-xl font-extrabold text-[#0A1A35] leading-snug tracking-tight group-hover:text-[#0A2E6F] transition-colors duration-200">
                  {youtubeVideos[0].title}
                </h3>
              </div>
            </div>

            {/* SIDEBAR QUEUE COLUMN LIST (RIGHT - 5 COLS) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {youtubeVideos.slice(1).map((video) => (
                <div 
                  key={video.id}
                  onClick={() => setActiveEmbedId(video.embedId)}
                  className="group cursor-pointer bg-white rounded-2xl p-4 border border-slate-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_32px_rgba(10,46,111,0.05)] hover:border-[#0A2E6F]/20 transition-all duration-300 flex gap-4 items-center"
                >
                  <div className="relative w-32 sm:w-40 aspect-video rounded-xl bg-slate-800 overflow-hidden shrink-0">
                    <img 
                      src={getYouTubeThumbnail(video.embedId)} 
                      alt={video.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.embedId}/hqdefault.jpg`;
                      }}
                    />
                    <div className="absolute inset-0 bg-slate-900/10 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-white/90 text-[#0A2E6F] flex items-center justify-center shadow">
                        <Play size={12} className="fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      {video.category}
                    </span>
                    <h4 className="mt-1 text-sm font-bold text-[#0A1A35] leading-snug tracking-tight line-clamp-2 group-hover:text-[#0A2E6F] transition-colors duration-200">
                      {video.title}
                    </h4>
                    <p className="mt-1.5 text-[11px] font-medium text-slate-400 flex items-center gap-1">
                      <Clock size={10} />
                      {video.duration} Mins
                    </p>
                  </div>
                </div>
              ))}

              {/* OUTBOUND CALLOUT BOX */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0A1A35] text-white flex flex-col justify-between h-full min-h-[140px]">
                <div>
                  <h4 className="text-base font-extrabold tracking-tight">Access Digital Streams</h4>
                  <p className="text-xs text-white/70 mt-1 leading-relaxed">Subscribe to our corporate channels for live product releases, test simulations, and engineering insights.</p>
                </div>
                <a 
                  href="https://www.youtube.com/@SimmplyPerfectWindowsandDoors" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors mt-4 self-start"
                >
                  Launch Main YouTube Stream Vector
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* LIGHTBOX CINEMATIC PLAYER OVERLAY MODAL */}
      <AnimatePresence>
        {activeEmbedId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop Layer Mask */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveEmbedId(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Player Interface Wrapper */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-5xl bg-black aspect-video rounded-2xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.5)] border border-white/10"
            >
              {/* Escape Trigger Button */}
              <button
                onClick={() => setActiveEmbedId(null)}
                className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black text-white p-2 rounded-full transition-colors border border-white/10"
                aria-label="Close Playback Frame"
              >
                <X size={18} />
              </button>

              <iframe
                src={`https://www.youtube.com/embed/${activeEmbedId}?autoplay=1&rel=0`}
                title="YouTube Video Player"
                className="w-full h-full border-0"
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
