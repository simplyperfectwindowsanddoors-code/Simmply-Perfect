"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/home/Footer";
import CountUp from "react-countup";
import { motion, type Transition } from "framer-motion";

import {
  Award,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Briefcase,
  Quote,
  Target,
  Compass,
  Cpu,
  Binary,
  Wrench,
  Layers,
  Settings,
  GraduationCap,
  Hammer,
  ChevronDown
} from "lucide-react";

const smoothFadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1],
  } satisfies Transition,
};

const timelineCardVariants = (index: number) => ({
  initial: { opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 20 },
  whileInView: { opacity: 1, x: 0, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { 
    type: "spring" as const, 
    damping: 25, 
    stiffness: 140, 
    delay: 0.1 
  }
});

// --- DATA FOR Q&A AND REVIEWS ---
const faqs = [
  { 
    q: "What materials do you use for your window and door systems?", 
    a: "We primarily utilize thermally broken architectural uPVC and high-grade structural Aluminium. These materials are engineered for maximum durability, superior acoustic degradation, and high wind-load resistance." 
  },
  { 
    q: "Do you offer comprehensive warranties on your installations?", 
    a: "Yes, all our premium sourced composite materials and installations come with an extensive warranty, typically spanning 10 to 15 years depending on the specific product tier and environmental conditions." 
  },
  { 
    q: "How long does a typical bespoke renovation project take?", 
    a: "Project timelines vary significantly based on scope and structural complexity. A standard luxury interior integration might take 4-8 weeks, while complete structural overhauls are mapped out during our Phase 01 Discovery process." 
  },
  { 
    q: "Can your team handle custom geometric shapes for windows?", 
    a: "Absolutely. Our advanced parametric design architecture allows us to manufacture bespoke geometric configurations without compromising the structural integrity or thermal efficiency of the unit." 
  },
  { 
    q: "Are your interior and architectural designs energy efficient?", 
    a: "Yes. Sustainability and energy efficiency are core to our engineering methodology. Our window systems feature multi-chambered profiles and double/triple glazing to significantly reduce thermal transfer." 
  },
  { 
    q: "Do you manage the entire project or just supply materials?", 
    a: "Simmply Perfect Group operates as an end-to-end management hub. We handle everything from initial architectural drafting and material sourcing to final onsite execution and certified handover." 
  },
  { 
    q: "What is your process for quality assurance?", 
    a: "We implement rigorous laboratory quality control and statical tolerance analysis during manufacturing, followed by a strict milestone inspection process onsite managed by our senior certified engineers." 
  },
  { 
    q: "Do you provide after-sales support or maintenance?", 
    a: "Yes, we maintain a dedicated after-sales and Annual Maintenance Contract (AMC) framework to ensure your architectural installations perform optimally for decades." 
  }
];

const reviews = [
  { name: "Rajesh Kumar", role: "Property Developer", review: "Simmply Perfect Group completely elevated our luxury villa project. Their uPVC profiles are world-class and the engineering execution was flawless from start to finish." },
  { name: "Samantha D.", role: "Homeowner", review: "The acoustic insulation on these windows is unbelievable. We live near a busy highway and our home is now incredibly quiet. Worth every single penny." },
  { name: "Vikram Singh", role: "Lead Architect", review: "The technical expertise in polymer science translates perfectly into their architectural systems. A highly reliable partner for large-scale structural nodes." },
  { name: "Priya Menon", role: "Interior Designer", review: "Their bespoke interior studio is phenomenal. They matched our exact material specifications and delivered the custom millwork right on schedule without any compromises." },
  { name: "Anand Gupta", role: "Commercial Contractor", review: "The end-to-end project management eliminated so much friction for us. Having a single point of accountability made the entire structural overhaul seamless." },
  { name: "Elena R.", role: "Homeowner", review: "Beautiful craftsmanship and excellent customer service. The custom aluminium doors they installed in our patio are easily the highlight of our entire home." },
  { name: "Suresh Reddy", role: "Estate Manager", review: "We hired them for a comprehensive restructuring of a heritage property. They respected the foundational criteria while upgrading the entire space flawlessly." },
  { name: "Kavya T.", role: "Real Estate Investor", review: "Outstanding quality. The precision in their parametric designs and strict timeline adherence is exactly why I keep returning to them for all my properties." }
];

// Doubling the array to allow for a seamless infinite scroll effect
const infiniteReviews = [...reviews, ...reviews];

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Navbar />
      
      {/* Injecting keyframes for the marquee animation so it works natively */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(calc(-50% - 1rem)); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}} />

      <main className="bg-[#FAFBFD] text-slate-900 overflow-hidden antialiased">
        
        {/* HERO SECTION */}
        <section className="relative pt-44 pb-24 bg-gradient-to-b from-slate-50 via-white to-transparent">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_100%)]" />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              {/* LEFT INTEL (Reduced Span & Padding) */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                className="lg:col-span-5 xl:col-span-5 z-10"
              >
                <h1 className="mt-6 text-5xl md:text-6xl font-black text-[#071224] tracking-tight leading-[0.95]">
                  Creating <br />
                  Spaces That <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A2E6F] via-[#1E4ED8] to-indigo-600">
                    Inspire Living
                  </span>
                </h1>

                <p className="mt-6 text-sm md:text-base text-slate-600 leading-relaxed max-w-md font-medium">
                  Simmply Perfect Group delivers premium Windows & Doors, luxury interiors, and turn-key structural innovations engineered gracefully to elevate modern living architectures.
                </p>

                {/* FUNCTIONAL ENHANCED CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 mt-8 max-w-md">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                    <Link
                      href="/contact"
                      className="group w-full bg-[#1A3673] hover:bg-[#072456] text-white px-6 py-3.5 rounded-full font-bold text-[14px] tracking-wide flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(26,54,115,0.2)] transition-all duration-300"
                    >
                      Get In Touch
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                    <Link
                      href="/windows-doors"
                      className="w-full border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-[#071224] px-6 py-3.5 rounded-full transition-all duration-300 font-bold text-[14px] tracking-wide flex items-center justify-center"
                    >
                      Explore Services
                    </Link>
                  </motion.div>
                </div>

                {/* EXACT SCREENSHOT MATCH: COUNTER TILES (Scaled Down for Composition) */}
                <div className="grid grid-cols-3 mt-10 sm:mt-12 py-5 sm:py-6 rounded-[1.5rem] bg-white border border-slate-200/80 shadow-[0_15px_40px_rgba(0,0,0,0.04)] divide-x divide-slate-200">
                  {[
                    { value: 5000, suffix: "+", label: "PROJECTS\nDELIVERED" },
                    { value: 20, suffix: "+", label: "YEARS\nEXPERIENCE" },
                    { value: 99.12, suffix: "%", label: "CLIENT\nSATISFACTION", decimals: 2 },
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col items-center text-center justify-start px-2 sm:px-3">
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1A2E6F] tracking-tight flex items-baseline justify-center">
                        <CountUp end={item.value} duration={3} delay={0.2} decimals={item.decimals ?? 0} enableScrollSpy scrollSpyOnce separator="," />
                        <span className="ml-0.5">{item.suffix}</span>
                      </h3>
                      {/* Sub-divider line matching screenshot */}
                      <div className="w-6 h-[2px] bg-slate-300 rounded-full my-2 sm:my-3" />
                      <p className="text-[8px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed whitespace-pre-line">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* RIGHT HERO IMAGERY (Expanded Span & Height) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96, x: 30 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                className="lg:col-span-7 xl:col-span-7 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0A2E6F]/10 to-transparent rounded-[32px] pointer-events-none z-10" />
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2200"
                  alt="Simmply Perfect Architecture Look"
                  className="w-full h-[450px] sm:h-[500px] lg:h-[750px] object-cover rounded-[32px] border border-slate-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* HIGH-DENSITY PROFESSIONAL EXECUTIVE CABINET CONSOLE */}
        <section className="py-24 sm:py-32 bg-[#091122] text-white border-y border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] bg-[size:20px_24px] pointer-events-none opacity-80" />
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-500/[0.03] rounded-full blur-[130px] pointer-events-none" />
          <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#0A2E6F]/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* STICKY SIDEBAR AVATAR & QUOTE BLOCK */}
              <motion.div 
                {...smoothFadeUp}
                className="lg:col-span-4 lg:sticky lg:top-32 space-y-5 flex flex-col"
              >
                <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] bg-slate-950 shadow-2xl group">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90 z-10" />
                  <img
                    src="/founder.jpg" 
                    alt="Aakaash Deep Shrivastava"
                    className="w-full h-[440px] md:h-[500px] lg:h-[460px] xl:h-[500px] object-cover rounded-3xl group-hover:scale-[1.012] transition-transform duration-500 ease-out"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-6 z-20 space-y-1">
                    <h3 className="text-2xl font-black tracking-tight text-white">Aakaash Deep Shrivastava</h3>
                    <p className="text-xs text-blue-400 font-black uppercase tracking-widest">Founder & Technical Director</p>
                    <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
                      <Briefcase size={14} className="text-blue-500 shrink-0" />
                      <span className="font-medium">18+ years Experience</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md relative shadow-inner">
                  <Quote className="text-blue-500/10 absolute top-4 left-4" size={32} />
                  <p className="text-xs text-slate-300 italic leading-relaxed relative z-10 pl-5 font-medium">
                    &quot;Industrial manufacturing logic and tolerance constraints are what ultimately distinguish luxury conceptual drafts from real-world structural milestones.&quot;
                  </p>
                </div>
              </motion.div>

              {/* TECHNICAL INTEGRATION MATRIX DISPLAY PANEL */}
              <motion.div 
                {...smoothFadeUp}
                transition={{ ...smoothFadeUp.transition, delay: 0.1 }}
                className="lg:col-span-8 space-y-6"
              >
                <div className="space-y-3 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[10px] font-black uppercase tracking-widest text-blue-400 shadow-sm">
                    <Settings size={12} className="animate-spin-slow" />
                    <span>Subject Matter Expert: Injection Molding & Extrusion</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-none text-white">
                    Polymer Science Engineering & Tooling Diagnostics
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                    Directing cross-functional architecture across specialized Research & Development (R&D), advanced tool component designs, macro manufacturing setups, and predictive maintenance logs, bridging high-tolerance polymer processing into modern structural spaces.
                  </p>
                </div>

                {/* CORE COMPETENCIES COMPACT SUB-GRID */}
                <div className="bg-white/[0.01] border border-white/[0.05] rounded-2xl p-5 space-y-3 shadow-inner">
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-blue-400 flex items-center gap-2">
                    <Cpu size={14} /> Domain Skills
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {[
                      "Plastic Product Design",
                      "Plastic Flow Analysis",
                      "Plastic Mold Design",
                      "New Product Development",
                      "Tool & Die Making",
                      "Plastic Mold Manufacturing",
                      "UPVC Gasket Die Design",
                      "UPVC Extrusion Process Expert",
                      "Sustainable Mechanical Engineering"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-white/[0.04]">
                        <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                        <span className="text-xs font-bold text-slate-200 tracking-wide truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CAD & CAE METRIC TRACKS */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/[0.05] space-y-2.5">
                    <h5 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                      <Wrench size={14} className="text-blue-400" /> CAD Skills
                    </h5>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      Complete functional drafting mastery across <span className="text-white font-semibold">AutoCAD, Creo, CATIA, NX-CAD, Solidworks</span>, and <span className="text-white font-semibold">Autodesk Inventor</span> environments.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/[0.05] space-y-2.5">
                    <h5 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                      <Binary size={14} className="text-purple-400" /> CAE Skills
                    </h5>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      Excellent proven expertise in executing structural Static & Dynamic Analysis within <span className="text-white font-semibold">Ansys Workbench, Ansys Fluent, Solidworks Plastics</span>, and <span className="text-white font-semibold">Moldflow</span> setups.
                    </p>
                  </div>
                </div>

                {/* PLM CONTROL SYSTEMS AND PROCESS METHODOLOGIES */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/[0.05] space-y-2">
                    <h5 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                      <Layers size={14} className="text-cyan-400" /> PLM Software
                    </h5>
                    <p className="text-xs text-slate-400 font-light leading-relaxed">
                      Sustained handling knowledge of enterprise Product Lifecycle Management software structures including <span className="text-white">Team Center, Enovia, PTC Windchill</span>, and automated <span className="text-white">Agile</span> frameworks.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/[0.05] space-y-2">
                    <h5 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                      <Settings size={14} className="text-amber-400" /> Tools & Methodologies
                    </h5>
                    <p className="text-xs text-slate-400 font-light leading-relaxed">
                      Optimized implementation workflows for Value Engineering, Reverse Engineering, Kaizen, Poke-Yoke, 5S, TQM, 80/20 Rule, Bathtub Curve, RCA, Fish bone diagram, DFMEA, PFMEA, Stackup Analysis, and Statical Tolerance Analysis (RSS & WCS).
                    </p>
                  </div>
                </div>

                {/* DOCUMENTATION MATRIX CONSOLE */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 to-slate-900 border border-white/[0.05] space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Documentation Support & Exposure</span>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Providing analytical vector-graphic data records using <span className="text-white font-semibold">Adobe Illustrator, Adobe Photoshop</span>, and MS Office. Exposure to working in multiple industrial domains such as Household, Automobile, Construction, Electrical and Electronics, Mechatronics, and Medical/Healthcare fields.
                  </p>
                </div>

                {/* ACADEMIC RESEARCH SUMMARY PANEL */}
                <div className="space-y-3">
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-blue-400 flex items-center gap-2">
                    <Award size={14} /> Validated Certifications
                  </h4>
                  <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-2">
                    {[
                      { title: "Autodesk", sub: "Moldflow '15" },
                      { title: "PTC CREO", sub: "Tooling '14" },
                      { title: "Solidworks", sub: "Core Eng. '15" },
                      { title: "CATIA", sub: "Suite '16" },
                      { title: "Solidworks", sub: "Plastics '16" },
                      { title: "AutoCAD", sub: "Inventor '17" }
                    ].map((badge, i) => (
                      <div key={i} className="p-2 bg-slate-950/80 border border-white/[0.05] rounded-xl text-center shadow-sm">
                        <span className="block text-[10px] font-black text-slate-200 tracking-tight truncate">{badge.title}</span>
                        <span className="block text-[8px] text-blue-400 font-medium tracking-wide mt-0.5 whitespace-nowrap">{badge.sub}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-start gap-3 p-3.5 bg-blue-500/[0.01] border border-blue-500/10 rounded-xl text-xs text-slate-400 font-medium">
                    <GraduationCap size={16} className="text-blue-400 shrink-0 mt-0.5" />
                    <p className="leading-normal">
                      Holds 6 years of active working knowledge performing Finite Element Analysis (FEA) using <span className="text-slate-300 font-bold">ANSYS, ABAQUS, and COMSOL</span>. Published <span className="text-white font-bold">8 independent international research papers</span> mapping the design and development framework metrics of modern injection molds.
                    </p>
                  </div>
                </div>

              </motion.div>

            </div>
          </div>
        </section>

        {/* WHO WE ARE CORPORATE STATEMENT */}
        <section className="py-28 bg-[#FAFBFD]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              
              {/* NARRATIVE TEXT */}
              <motion.div {...smoothFadeUp} className="lg:col-span-7">
                <div className="text-center lg:text-left space-y-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#0A2E6F]">
                    Operational Creed
                  </span>
                  <h2 className="text-4xl font-black text-[#071224] tracking-tight leading-tight">
                    Building Exceptional Spaces Through Innovation & Quality
                  </h2>
                </div>
                <p className="mt-6 text-slate-600 text-base leading-relaxed text-center">
                  Simmply Perfect Group operates as a synchronized structural hub providing end-to-end management frameworks across state-of-the-art building domains. We minimize developer execution fragmentation by providing architectural solutions under one single elite umbrella system.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mt-8">
                  {[
                    "Premium Sourced Composite Materials",
                    "Vetted Architectural Engineering Team",
                    "Bespoke High-Luxury Modern Designs",
                    "End-To-End Absolute Project Management",
                    "Rigorous Laboratory Quality Control Assurance",
                    "Strict Timeline Milestone Project Delivery",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 py-1 justify-center lg:justify-start">
                      <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                      <span className="font-semibold text-sm text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* CORPORATE STILL IMAGERY */}
              <motion.div 
                {...smoothFadeUp}
                transition={{ ...smoothFadeUp.transition, delay: 0.1 }}
                className="lg:col-span-5"
              >
                <img
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000"
                  alt="Bespoke Spatial Design Manifestation"
                  className="w-full h-[450px] lg:h-[520px] object-cover rounded-[28px] border border-slate-200/60 shadow-[0_12px_40px_rgba(0,0,0,0.03)]"
                />
              </motion.div>

            </div>
          </div>
        </section>

        {/* METRICS RECOGNITION PANEL */}
        <section className="py-24 bg-slate-50 border-y border-slate-200/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-xs font-bold tracking-widest text-[#0A2E6F] uppercase">System Analytics</span>
              <h2 className="mt-3 text-3xl font-black text-[#071224] tracking-tight">Our Achievements In Numbers</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
              {[
                { count: 5000, suffix: "+", desc: "Premium Projects Transmitted" },
                { count: 20, suffix: "+ years", desc: "Years Experience" },
                { count: 99.12, suffix: "%", desc: "Audited Retention & Satisfaction", decimals: 2 },
                { count: 50, suffix: "+", desc: "In-House Subject Matter Experts" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  {...smoothFadeUp}
                  transition={{ ...smoothFadeUp.transition, delay: index * 0.05 }}
                  className="bg-white rounded-2xl p-8 text-center border border-slate-200/60 shadow-[0_10px_30px_rgba(0,0,0,0.02)]"
                >
                  <h3 className="text-5xl font-black text-[#0A2E6F] tracking-tight">
                    <CountUp end={item.count} duration={2.5} decimals={item.decimals ?? 0} enableScrollSpy scrollSpyOnce />
                    {item.suffix}
                  </h3>
                  <p className="mt-3 text-xs font-bold text-slate-400 uppercase tracking-wider">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* REVENUE LINE LAYER SERVICES */}
        <section className="py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold tracking-widest text-[#0A2E6F] uppercase">Product Portfolio</span>
              <h2 className="mt-3 text-4xl font-black text-[#071224] tracking-tight">Bespoke Structural Offerings</h2>
            </div>

            <div className="mt-16 space-y-8">
              {[
  {
    num: "01",
    title: "Architectural Windows & Doors",
    desc: "Thermally broken architectural uPVC and high-grade structural Aluminium systems engineered against high windloads and acoustic degradation.",
    link: "/windows-doors",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2000",
  },
  {
    num: "02",
    title: "High-Luxury Interiors Studio",
    desc: "Turn-key luxury indoor masterplanning combining space fluid dynamics, material selection blueprints, and customizable premium millwork layouts.",
    link: "/interiors",
    img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2000",
  },
  {
    num: "03",
    title: "Comprehensive Restructuring",
    desc: "Complete technical building overhauls and spatial extensions engineered without breaking core historical or foundational structural criteria.",
    link: "/renovation",
    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000",
  },
  {
    num: "04",
    title: "Precision Metal Works",
    desc: "Custom architectural metal fabrication solutions combining precision engineering, superior craftsmanship, and durable materials for residential, commercial, and structural applications.",
    link: "/metal-works",
    img: "/metal-works.jpg",
  },
].map((service, idx) => (
  <motion.div
    key={service.num}
    {...smoothFadeUp}
    whileHover={{ y: -4 }}
    className="group overflow-hidden rounded-3xl border border-slate-200/60 bg-slate-50/70 shadow-[0_12px_40px_rgba(0,0,0,0.01)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(10,46,111,0.05)]"
  >
    <div className="grid items-stretch lg:grid-cols-12">
      <div className="flex flex-col justify-between p-8 md:p-12 lg:col-span-7">
        <div>
          <span className="text-5xl font-black tracking-tight text-slate-200/80">
            {service.num}
          </span>

          <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-[#071224]">
            {service.title}
          </h3>

          <p className="mt-3 text-sm font-medium leading-relaxed text-slate-500">
            {service.desc}
          </p>
        </div>

        <Link
          href={service.link}
          className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0A2E6F] transition-colors group-hover:text-blue-600"
        >
          Explore Blueprint Range

          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>

      <div className="relative min-h-[250px] overflow-hidden lg:col-span-5">
        <img
          src={service.img}
          alt={service.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    </div>
  </motion.div>
))}
            </div>
          </div>
        </section>

        {/* STRATEGIC COMMITMENT DARK SECTION */}
        <section className="py-28 bg-[#071224] relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:50px_50px]" />
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">Operational Thresholds</span>
            <h2 className="mt-3 text-4xl font-black text-white tracking-tight">Excellence Placed In Every Single Specification</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
              {[
                "Certified Grade-A Sourced Components",
                "Senior Certified Project Managers",
                "Advanced Parametric Design Architecture",
                "Integrated Single Point Accountability",
                "Transparent Fixed Fiscal Budgeting",
                "Uncompromised Operational Schedule Adherence",
              ].map((value, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/[0.08] text-left flex items-start gap-3.5">
                  <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 mt-0.5"><CheckCircle2 size={16} /></div>
                  <h3 className="text-sm font-bold text-slate-200 leading-snug">{value}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CHRONOLOGICAL HISTORICAL MILESTONES */}
        <section className="py-28 bg-white relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-bold tracking-widest text-[#0A2E6F] uppercase">Our Journey Timeline</span>
              <h2 className="text-4xl font-black text-[#071224] tracking-tight">Building A Legacy Of Absolute Quality</h2>
            </div>

            <div className="relative mt-24 max-w-4xl mx-auto">
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#0A2E6F]/20 via-slate-200 to-slate-200/10 -translate-x-1/2" />

              {[
                { 
                  year: "2013", 
                  title: "Bespoke Foundations", 
                  desc: "Started with bespoke window replacements and repairs." 
                },
                { 
                  year: "2016", 
                  title: "uPVC Integration", 
                  desc: "Added uPVC systems—sliding, casement, ventilators." 
                },
                { 
                  year: "2019", 
                  title: "Material Expansion", 
                  desc: "Expanded to aluminum facades and premium hardware." 
                },
                { 
                  year: "2022", 
                  title: "Mass Operational Delivery", 
                  desc: "1,000th project delivered with 4.9★ average feedback." 
                },
                { 
                  year: "2024-26", 
                  title: "Client Care Frameworks", 
                  desc: "Dedicated after-sales and AMC support program." 
                }
              ].map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-stretch mb-16 last:mb-0 flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#0A2E6F] ring-4 ring-white shadow-md z-10 top-6">
                    <span className="absolute inset-0 rounded-full bg-[#0A2E6F] animate-ping opacity-25" />
                  </div>

                  <motion.div 
                    {...timelineCardVariants(index)}
                    className="ml-14 md:ml-0 md:w-[45%] bg-white hover:bg-slate-50 p-6 rounded-3xl border border-slate-200/70 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(10,46,111,0.05)] transition-all duration-300 text-left"
                  >
                    <span className="inline-block text-xl font-black text-[#0A2E6F] bg-[#0A2E6F]/5 px-3 py-1 rounded-xl shadow-inner">{milestone.year}</span>
                    <h4 className="text-lg font-extrabold text-[#071224] mt-3 tracking-tight">{milestone.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium mt-2">{milestone.desc}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COGNITIVE VALUES FRAMEWORK */}
        <section className="py-24 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8">
              
              {/* VISION METRIC */}
              <motion.div {...smoothFadeUp} className="bg-white rounded-3xl p-10 border border-slate-200/60 shadow-[0_12px_32px_rgba(0,0,0,0.02)] flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#0A2E6F]/5 text-[#0A2E6F] flex items-center justify-center mx-auto lg:mx-0"><Target size={20} /></div>
                  <h3 className="text-2xl font-black text-[#071224] tracking-tight mt-6 text-center lg:text-left">Our Strategic Vision</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium mt-3 text-center lg:text-left">To remain the gold standard configuration partner for ultra-premium window, door, and spatial design integration, elevating living environments flawlessly across national spaces.</p>
                </div>
              </motion.div>

              {/* MISSION METRIC */}
              <motion.div {...smoothFadeUp} transition={{ ...smoothFadeUp.transition, delay: 0.1 }} className="bg-[#071224] text-white rounded-3xl p-10 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/10 text-blue-400 flex items-center justify-center mx-auto lg:mx-0"><Compass size={20} /></div>
                  <h3 className="text-2xl font-black tracking-tight mt-6 text-center lg:text-left">Our Execution Mission</h3>
                  <p className="text-sm text-white/70 leading-relaxed mt-3 text-center lg:text-left">To continuously transform real estate assets using rigorous industrial engineering principles, premium sourced compositions, and uncompromised craftsmanship metrics.</p>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* OPERATIONAL STRATEGY MILESTONES */}
        <section className="py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-xs font-bold tracking-widest text-[#0A2E6F] uppercase">System Logistics</span>
              <h2 className="mt-3 text-3xl font-black text-[#071224] tracking-tight">Bespoke Workflow Phasing</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-16">
              {[
                { ph: "01", t: "Discovery & Context", d: "Documenting client vision parameters, structural limitations, and budgetary scope." },
                { ph: "02", t: "System Planning", d: "Formulating technical resource layouts, component orders, and timeline tracking blueprints." },
                { ph: "03", t: "Bespoke Engineering", d: "Developing specialized 3D mockups and customized hardware selections." },
                { ph: "04", t: "Onsite Execution", d: "Deploying senior engineering personnel to manage architectural implementation layers." },
                { ph: "05", t: "Certified Handover", d: "Final inspection pass against high tolerance parameters and deployment release." }
              ].map((phase, idx) => (
                <motion.div
                  key={idx}
                  {...smoothFadeUp}
                  transition={{ ...smoothFadeUp.transition, delay: idx * 0.05 }}
                  className="bg-slate-50 rounded-2xl p-6 border border-slate-100 shadow-[0_8px_24px_rgba(0,0,0,0.01)] text-center"
                >
                  <span className="text-4xl font-black text-[#0A2E6F]/15 tracking-tight">{phase.ph}</span>
                  <h4 className="text-base font-bold text-[#071224] mt-3 tracking-tight">{phase.t}</h4>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed mt-2">{phase.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM SYNERGY BLOCK */}
        <section className="py-28 bg-slate-50 border-y border-slate-200/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              
              <motion.div {...smoothFadeUp} className="lg:col-span-7">
                <div className="text-center lg:text-left space-y-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#0A2E6F]">Personnel Capital</span>
                  <h2 className="text-4xl font-black text-[#071224] tracking-tight leading-tight">A High-Performance Engineering Culture</h2>
                </div>
                <p className="mt-6 text-slate-600 text-base leading-relaxed text-center lg:text-left">
                  Our internal design coordinators, production engineers, material technicians, and field installation supervisors share matching performance metrics. Every deployment sub-system operates under single point supervisor oversight to ensure perfect quality handovers.
                </p>
              </motion.div>

              <motion.div 
                {...smoothFadeUp} 
                transition={{ ...smoothFadeUp.transition, delay: 0.1 }}
                className="lg:col-span-5"
              >
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000"
                  alt="Simmply Perfect Group Mastermind Session"
                  className="w-full h-[400px] object-cover rounded-[24px] border border-slate-200/80 shadow-[0_12px_40px_rgba(0,0,0,0.03)]"
                />
              </motion.div>

            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section className="py-24 bg-white relative">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0A2E6F]">Knowledge Base</span>
              <h2 className="text-4xl font-black text-[#071224] tracking-tight">Frequently Asked Questions</h2>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`border ${openFaq === index ? "border-[#0A2E6F]/30 bg-blue-50/30" : "border-slate-200/70 bg-white"} rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#0A2E6F]/30 shadow-sm`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  >
                    <span className="font-bold text-[#071224] pr-4">{faq.q}</span>
                    <ChevronDown size={20} className={`text-[#0A2E6F] shrink-0 transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? "max-h-48 pb-6 opacity-100" : "max-h-0 opacity-0"}`}>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CLIENT REVIEWS CONTINUOUS SCROLL */}
        <section className="py-24 bg-[#FAFBFD] border-t border-slate-200/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0A2E6F]">Client Testimonials</span>
              <h2 className="text-4xl font-black text-[#071224] tracking-tight">Trusted By Industry Leaders</h2>
            </div>
          </div>
          
          <div className="mt-16 relative w-full overflow-hidden">
            {/* Gradient fades for the edges matching the section background */}
            <div className="absolute top-0 bottom-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#FAFBFD] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#FAFBFD] to-transparent z-10 pointer-events-none" />
            
            <div className="flex w-max gap-8 animate-marquee hover:[animation-play-state:paused] pl-8">
              {infiniteReviews.map((item, i) => (
                <div
                  key={`${item.name}-${i}`}
                  className="w-[320px] md:w-[420px] shrink-0 bg-white rounded-3xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-slate-200/60 relative overflow-hidden group hover:shadow-[0_20px_40px_rgba(10,46,111,0.06)] hover:border-[#0A2E6F]/20 transition-all duration-300"
                >
                  <Quote className="absolute top-6 right-6 text-slate-100 w-24 h-24 -z-0 rotate-12 transition-transform duration-500 group-hover:rotate-0 group-hover:text-blue-50" />
                  <div className="relative z-10">
                    <div className="text-amber-400 text-lg tracking-widest flex gap-1">★★★★★</div>
                    <p className="mt-6 text-slate-700 leading-relaxed font-medium italic text-[15px]">"{item.review}"</p>
                    <div className="mt-8 pt-6 border-t border-slate-100">
                      <h4 className="font-bold text-[#071224]">{item.name}</h4>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">{item.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STYLISH PERSISTENT OUTBOUND PORTAL (CTA) */}
        <section className="relative py-36 overflow-hidden bg-[#071224]">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0A2E6F]/30 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <motion.h2 {...smoothFadeUp} className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
              Ready To Transform Your Space?
            </motion.h2>
            <p className="mt-6 text-sm md:text-base text-slate-300/80 max-w-2xl mx-auto leading-relaxed font-medium">
              Connect directly with our primary engineering desk. Let us evaluate your architectural parameters and coordinate your custom-built milestone package.
            </p>

            <div className="flex justify-center gap-4 mt-10 flex-wrap">
              <Link
                href="/contact"
                className="w-full sm:w-auto bg-white text-[#071224] px-8 py-4 rounded-xl font-bold text-sm tracking-wide shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Book Consultation
              </Link>
              <Link
                href="/windows-doors"
                className="w-full sm:w-auto border border-white/20 text-white hover:bg-white/5 px-8 py-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-300"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}