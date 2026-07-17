"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/home/Footer";
import CountUp from "react-countup";
import { motion, AnimatePresence } from "framer-motion";

import {
  Award,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Target,
  Compass,
  Building2,
  Lightbulb,
  Layers,
  Shield,
  Clock,
  Wrench,
  Briefcase,
  DollarSign,
  Activity,
  HeartHandshake,
  MessageCircle,
  ThumbsUp,
  PenTool,
  Quote,
  GraduationCap,
  ChevronDown,
  Star,
  Leaf,
  Settings,
  Users
} from "lucide-react";

// --- ANIMATION VARIANTS ---
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const timelineCardVariants = (index: number) => ({
  hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 20 },
  visible: { 
    opacity: 1, 
    x: 0, 
    y: 0,
    transition: { type: "spring", damping: 20, stiffness: 100, delay: index * 0.15 }
  }
});

const timelineDotVariants = (index: number) => ({
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring", delay: index * 0.15 + 0.1 } }
});

// --- DATA ---
const businessDivisions = [
  { 
    title: "Windows & Doors", 
    desc: "Thermally broken and structurally engineered systems for maximum durability and acoustic perfection.", 
    link: "/windows-doors", 
    img: "/windows-doors.jpg", 
    icon: Building2,
  },
  { 
    title: "Interior Solutions", 
    desc: "Turn-key luxury indoor masterplanning combining space fluid dynamics and premium materials.", 
    link: "/interiors", 
    img: "/interiors.jpg", 
    icon: Lightbulb,
  },
  { 
    title: "Renovations", 
    desc: "Complete technical overhauls engineered without breaking foundational structural criteria.", 
    link: "/renovation", 
    img: "/renovation.jpg", 
    icon: Layers,
  },
  { 
    title: "Metal Works", 
    desc: "Custom architectural fabrication combining precision engineering and durable materials.", 
    link: "/metal-works", 
    img: "/metal-works.jpg", 
    icon: Shield,
  },
];

const whyChooseUs = [
  { title: "Premium Quality Materials", icon: ShieldCheck },
  { title: "Experienced Professionals", icon: Briefcase },
  { title: "Skilled Workmanship", icon: Wrench },
  { title: "Timely Delivery", icon: Clock },
  { title: "Customized Solutions", icon: PenTool },
  { title: "Affordable Pricing", icon: DollarSign },
  { title: "Innovative Designs", icon: Activity },
  { title: "Excellent Support", icon: HeartHandshake },
  { title: "Transparent Communication", icon: MessageCircle },
  { title: "Long-term Reliability", icon: ThumbsUp },
];

const trustIndicators = [
  "Quality Assurance", "Customer Satisfaction", "Engineering Excellence", 
  "Professional Workforce", "Industry Experience", "Reliable Service", 
  "Premium Materials", "Innovative Solutions"
];

const faqs = [
  { q: "What materials do you use for your window and door systems?", a: "We primarily utilize thermally broken architectural uPVC and high-grade structural Aluminium. These materials are engineered for maximum durability, superior acoustic degradation, and high wind-load resistance." },
  { q: "Do you offer comprehensive warranties on your installations?", a: "Yes, all our premium sourced composite materials and installations come with an extensive warranty, typically spanning 10 to 15 years depending on the specific product tier and environmental conditions." },
  { q: "How long does a typical bespoke renovation project take?", a: "Project timelines vary significantly based on scope and structural complexity. A standard luxury interior integration might take 4-8 weeks, while complete structural overhauls are mapped out during our Phase 01 Discovery process." },
  { q: "Can your team handle custom geometric shapes for windows?", a: "Absolutely. Our advanced parametric design architecture allows us to manufacture bespoke geometric configurations without compromising the structural integrity or thermal efficiency of the unit." },
  { q: "Are your interior and architectural designs energy efficient?", a: "Yes. Sustainability and energy efficiency are core to our engineering methodology. Our window systems feature multi-chambered profiles and double/triple glazing to significantly reduce thermal transfer." },
  { q: "Do you manage the entire project or just supply materials?", a: "Simmply Perfect Group operates as an end-to-end management hub. We handle everything from initial architectural drafting and material sourcing to final onsite execution and certified handover." },
];

const reviews = [
  { name: "Rajesh Kumar", role: "Property Developer", review: "Simmply Perfect Group completely elevated our luxury villa project. Their uPVC profiles are world-class and the engineering execution was flawless from start to finish." },
  { name: "Samantha D.", role: "Homeowner", review: "The acoustic insulation on these windows is unbelievable. We live near a busy highway and our home is now incredibly quiet. Worth every single penny." },
  { name: "Vikram Singh", role: "Lead Architect", review: "The technical expertise in polymer science translates perfectly into their architectural systems. A highly reliable partner for large-scale structural nodes." },
  { name: "Priya Menon", role: "Interior Designer", review: "Their bespoke interior studio is phenomenal. They matched our exact material specifications and delivered the custom millwork right on schedule without any compromises." },
  { name: "Anand Gupta", role: "Commercial Contractor", review: "The end-to-end project management eliminated so much friction for us. Having a single point of accountability made the entire structural overhaul seamless." },
];
const infiniteReviews = [...reviews, ...reviews, ...reviews];

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Navbar />
      
      {/* Marquee Animation Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(calc(-33.33% - 1rem)); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />

      <main className="bg-slate-50 text-slate-900 overflow-hidden antialiased selection:bg-blue-600 selection:text-white">
        
        {/* 1. ENHANCED HERO SECTION */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="max-w-2xl z-10"
              >
                <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/80 backdrop-blur-sm border border-blue-100 text-blue-700 text-sm font-bold mb-6 shadow-sm">
                  <Award size={16} /> Simmply Perfect Group
                </motion.div>
                
                <motion.h1 variants={fadeUp} className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.05]">
                  Architectural <br />
                  Excellence, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-500">
                    Engineered.
                  </span>
                </motion.h1>

                <motion.p variants={fadeUp} className="mt-6 text-lg text-slate-600 leading-relaxed font-medium">
                  We are a premier corporate entity delivering world-class Windows & Doors, luxury Interior Solutions, structural Renovations, and precision Metal Works. Building spaces that inspire living.
                </motion.p>

                <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mt-10">
                  <Link href="/contact" className="group inline-flex items-center justify-center gap-2 bg-[#0A2E6F] hover:bg-blue-900 text-white px-8 py-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-blue-900/25">
                    Start Your Project
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link href="#overview" className="inline-flex items-center justify-center bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-900 px-8 py-4 rounded-xl font-bold text-sm tracking-wide transition-all">
                    Discover Our Story
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="relative h-[400px] sm:h-[500px] lg:h-[700px] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/10 border border-white/50 mt-12 lg:mt-0 w-full"
              >
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2200"
                  alt="Premium Architecture and Design"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                
                <motion.div 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, type: "spring", damping: 20 }}
                  className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-6 bg-white/10 backdrop-blur-xl rounded-3xl p-5 lg:p-6 shadow-2xl border border-white/20"
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-x divide-white/20">
                    {[
                      { value: 5000, suffix: "+", label: "Projects" },
                      { value: 20, suffix: "+", label: "Years Exp." },
                      { value: 99, suffix: "%", label: "Satisfaction" },
                      { value: 4, suffix: "", label: "Divisions" },
                    ].map((stat, i) => (
                      <div key={i} className="text-center px-1 lg:px-2 flex flex-col justify-center">
                        <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white drop-shadow-sm">
                          <CountUp end={stat.value} duration={2.5} enableScrollSpy scrollSpyOnce />
                          {stat.suffix}
                        </div>
                        <div className="text-[9px] lg:text-xs font-bold text-blue-100 uppercase mt-1 tracking-wider">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. COMPANY OVERVIEW */}
        <section id="overview" className="py-24 bg-slate-50 relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid lg:grid-cols-12 gap-16 items-center"
            >
              <motion.div variants={fadeUp} className="lg:col-span-7 space-y-6">
                <span className="text-sm font-bold tracking-widest text-blue-700 uppercase">Company Overview</span>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  A Legacy of Precision, Innovation, and Trust.
                </h2>
                <div className="space-y-4 text-slate-600 text-lg leading-relaxed font-medium">
                  <p>
                    Established as a benchmark of excellence, Simmply Perfect Group operates with a singular focus: transforming concepts into architectural masterpieces. Our business philosophy is rooted in an uncompromising customer-first approach and a deep commitment to quality.
                  </p>
                  <p>
                    With deep industry expertise across structural renovations, interior masterplanning, metal fabrication, and advanced window systems, our core strengths lie in our multidisciplinary approach. We bridge the gap between aesthetic luxury and industrial engineering.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="lg:col-span-5 bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <ShieldCheck className="text-blue-600" /> Trust Indicators
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {trustIndicators.map((indicator, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="p-1 rounded-full bg-blue-50 text-blue-600">
                        <CheckCircle2 size={16} />
                      </div>
                      <span className="text-sm font-semibold text-slate-700">{indicator}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 3. SIMPLIFIED & ALIGNED FOUNDER SECTION */}
        <section className="py-24 bg-[#F8FAFC] relative overflow-hidden border-y border-slate-200/60">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />
          
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column: Profile Card */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-5 space-y-6 lg:sticky lg:top-32"
              >
                <div className="bg-white rounded-3xl p-4 shadow-xl shadow-slate-200/50 border border-slate-200/60">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/5] mb-6">
                    <img
                      src="/founder.jpg" 
                      alt="Aakaash Deep Shrivastava"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-black text-white leading-tight">Aakaash Deep Shrivastava</h3>
                      <p className="text-blue-300 font-bold text-sm mt-1 uppercase tracking-wider">Founder & Technical Director</p>
                    </div>
                  </div>
                  <div className="px-2 pb-2 space-y-4">
                    <div className="flex items-center gap-3 text-slate-600 font-medium text-sm">
                      <Briefcase className="text-blue-600" size={18} />
                      18+ Years Industrial Experience
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 font-medium text-sm">
                      <GraduationCap className="text-blue-600" size={18} />
                      8 International Research Papers
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Reduced & Aligned Prose */}
              <div className="lg:col-span-7 space-y-8 lg:pt-10">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-0.5 bg-blue-600 rounded-full" />
                    <span className="text-sm font-bold tracking-widest text-blue-700 uppercase">Executive Leadership</span>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-8">The Architect of Precision</h2>
                  
                  {/* Clean, aligned paragraphs */}
                  <div className="text-slate-600 text-lg font-medium leading-relaxed space-y-6 text-left">
                    <p>
                      Operating at the intersection of high-luxury architecture and rigorous industrial physics, Aakaash directs the cross-functional R&D methodologies at Simmply Perfect Group. His expertise extends far beyond aesthetic design into the predictive mathematical mechanics of modern construction materials.
                    </p>
                    <p>
                      Relying on complex structural analyses and advanced polymer rheology, Aakaash ensures every architectural profile possesses unparalleled longevity. By implementing strict statistical tolerance metrics (RSS/WCS) across thousands of micro-components, he engineers systems that guarantee perfect mechanical synergy, acoustic sealing, and zero-defect installation.
                    </p>
                  </div>

                  <div className="mt-10 bg-gradient-to-br from-[#0A2E6F] to-blue-900 text-white rounded-3xl p-8 shadow-xl border border-blue-800 relative overflow-hidden group">
                    <Quote className="absolute right-4 bottom-4 text-white opacity-10" size={80} />
                    <p className="text-lg font-medium italic leading-relaxed relative z-10 text-blue-50">
                      "Industrial manufacturing logic and rigorous mathematical tolerance constraints are what ultimately distinguish a luxury conceptual draft from a flawless, real-world structural reality."
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. EXPANDED VISION & MISSION SECTION */}
        <section className="py-28 bg-white relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-sm font-bold tracking-widest text-blue-700 uppercase">Core Philosophy</span>
              <h2 className="mt-4 text-4xl font-black text-slate-900 tracking-tight">Our Vision & Mission</h2>
            </div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="flex flex-col gap-10"
            >
              {/* Wide Vision Card */}
              <motion.div variants={fadeUp} className="bg-slate-50 rounded-[2.5rem] p-8 lg:p-14 border border-slate-200 relative overflow-hidden group hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/50 to-indigo-50/50 rounded-full blur-3xl -mr-32 -mt-32 transition-transform group-hover:scale-110 duration-700 pointer-events-none" />
                
                <div className="lg:w-1/3 flex flex-col justify-center relative z-10">
                  <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-600/30 group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-500">
                    <Target size={48} />
                  </div>
                  <h3 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">Our Vision</h3>
                </div>

                <div className="lg:w-2/3 relative z-10">
                  <p className="text-xl text-slate-700 leading-relaxed font-medium mb-6">
                    To be universally recognized as the leading provider of premium architectural and construction solutions, setting industry benchmarks for design elegance, structural integrity, and sustainable living environments globally.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    We envision a future where every structure we engineer harmonizes seamlessly with its environment, utilizing smart technologies and carbon-neutral materials. Our goal is to expand our footprint across international markets, pioneering aesthetic frameworks that inspire generations while maintaining the uncompromising precision of advanced industrial manufacturing.
                  </p>
                </div>
              </motion.div>

              {/* Wide Mission Card */}
              <motion.div variants={fadeUp} className="bg-gradient-to-br from-[#071224] to-[#0a1b38] rounded-[2.5rem] p-8 lg:p-14 border border-slate-800 relative overflow-hidden group hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-500 flex flex-col lg:flex-row-reverse gap-10 lg:gap-16 items-center">
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl -ml-32 -mb-32 transition-transform group-hover:scale-110 duration-700 pointer-events-none" />
                
                <div className="lg:w-1/3 flex flex-col justify-center relative z-10">
                  <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center text-blue-400 mb-6 border border-white/10 group-hover:scale-105 group-hover:rotate-3 transition-transform duration-500">
                    <Compass size={48} />
                  </div>
                  <h3 className="text-4xl lg:text-5xl font-black text-white tracking-tight">Our Mission</h3>
                </div>

                <div className="lg:w-2/3 relative z-10">
                  <p className="text-xl text-blue-50 leading-relaxed mb-8 font-medium">
                    To deliver uncompromised value and transform real estate assets using rigorous industrial engineering principles. We are committed to executing every project with absolute transparency, mathematical precision, and an unwavering dedication to client success through four core pillars:
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                      <Shield className="text-blue-400 mb-3" size={24} />
                      <h4 className="text-white font-bold text-lg mb-2">Material Integrity</h4>
                      <p className="text-sm text-slate-400">Sourcing and engineering only the highest-grade composites, alloys, and sustainable materials.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                      <Settings className="text-blue-400 mb-3" size={24} />
                      <h4 className="text-white font-bold text-lg mb-2">Operational Precision</h4>
                      <p className="text-sm text-slate-400">Implementing strict statical tolerances (RSS/WCS) to ensure zero-defect manufacturing and handovers.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                      <Users className="text-blue-400 mb-3" size={24} />
                      <h4 className="text-white font-bold text-lg mb-2">Client Centricity</h4>
                      <p className="text-sm text-slate-400">Maintaining single-point accountability and providing dedicated after-sales AMC support.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                      <Leaf className="text-blue-400 mb-3" size={24} />
                      <h4 className="text-white font-bold text-lg mb-2">Sustainable Innovation</h4>
                      <p className="text-sm text-slate-400">Reducing thermal transfer and acoustic degradation through advanced multi-chambered profiling.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 5. LOCAL IMAGES BUSINESS DIVISIONS CARDS */}
        <section className="py-24 bg-slate-50 border-y border-slate-200/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-sm font-bold tracking-widest text-blue-700 uppercase">Core Services</span>
              <h2 className="mt-4 text-4xl font-black text-slate-900 tracking-tight">Four Specialized Business Divisions</h2>
            </div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {businessDivisions.map((division, idx) => (
                <motion.div 
                  key={idx} 
                  variants={fadeUp} 
                  className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden relative">
                    <img src={division.img} alt={division.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <division.icon className="mb-2 text-blue-400" size={24} />
                      <h3 className="text-lg font-bold leading-tight">{division.title}</h3>
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-grow">
                    <p className="text-slate-600 text-sm font-medium leading-relaxed mb-4 flex-grow">{division.desc}</p>
                    
                    <Link href={division.link} className="inline-flex items-center text-blue-700 font-bold text-sm hover:text-blue-800 transition-colors mt-auto">
                      Explore Division <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 6. WHY CHOOSE US */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-sm font-bold tracking-widest text-blue-700 uppercase">Competitive Advantage</span>
              <h2 className="mt-4 text-4xl font-black text-slate-900 tracking-tight">Why Choose Simmply Perfect?</h2>
            </div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6"
            >
              {whyChooseUs.map((feature, idx) => (
                <motion.div 
                  key={idx} 
                  variants={fadeUp} 
                  className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-center hover:bg-white hover:border-blue-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 mx-auto bg-blue-100/50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:bg-blue-600 group-hover:text-white">
                    <feature.icon size={24} />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">{feature.title}</h4>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 7. ANIMATED TIMELINE WITH YEARS */}
        <section className="py-24 bg-slate-50 border-t border-slate-200/60 relative">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center space-y-4 mb-20">
              <span className="text-sm font-bold tracking-widest text-blue-700 uppercase">Company Timeline</span>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Our Journey of Growth</h2>
            </div>

            <div className="relative pt-6 pb-12">
              {/* Central Animated Line */}
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute left-4 md:left-1/2 top-0 w-0.5 bg-slate-200 -translate-x-1/2 origin-top" 
              />

              {[
                { year: "2013", title: "Company Foundation", desc: "Started with a vision to redefine bespoke architectural elements and small-scale window installations." },
                { year: "2016", title: "Project Expansion", desc: "Successfully completed our first major commercial projects, expanding our workforce and client base." },
                { year: "2019", title: "Multiple Services", desc: "Launched Interior Solutions and Metal Works divisions to provide comprehensive end-to-end services." },
                { year: "2022", title: "Customer Milestones", desc: "Crossed 5,000+ completed projects with a 99% satisfaction rate across residential and commercial sectors." },
                { year: "2024+", title: "Sustainable Innovations", desc: "Integrating smart technologies and sustainable materials to lead the future of modern living architectures." }
              ].map((milestone, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={timelineCardVariants(index)}
                  className={`relative flex items-center mb-12 last:mb-0 ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}
                >
                  {/* Animated Dot */}
                  <motion.div 
                    variants={timelineDotVariants(index)}
                    className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white bg-blue-600 shadow-md z-10" 
                  />
                  
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pl-12" : "md:pr-12 text-left md:text-right"}`}>
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-shadow">
                      <span className="text-blue-700 font-black text-xl tracking-tight mb-2 block">{milestone.year}</span>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">{milestone.title}</h4>
                      <p className="text-slate-600 text-sm font-medium leading-relaxed">{milestone.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. FAQs (Q&A Section) */}
        <section className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm font-bold tracking-widest text-blue-700 uppercase">Knowledge Base</span>
              <h2 className="mt-4 text-4xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h2>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:border-blue-200 transition-all">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  >
                    <span className="font-bold text-slate-900 pr-4">{faq.q}</span>
                    <ChevronDown size={20} className={`text-blue-600 shrink-0 transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-6 text-slate-600 font-medium leading-relaxed"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. REVIEWS (Marquee) */}
        <section className="py-24 bg-slate-50 border-t border-slate-200/60 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16 text-center">
            <span className="text-sm font-bold tracking-widest text-blue-700 uppercase">Client Testimonials</span>
            <h2 className="mt-4 text-4xl font-black text-slate-900 tracking-tight">Trusted By Industry Leaders</h2>
          </div>
          
          <div className="relative w-full flex">
            {/* Gradient Masks */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
            
            <div className="flex gap-6 px-4 animate-marquee">
              {infiniteReviews.map((item, i) => (
                <div key={i} className="w-[350px] md:w-[420px] shrink-0 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="flex gap-1 text-amber-400 mb-6">
                    {[...Array(5)].map((_, idx) => <Star key={idx} size={18} fill="currentColor" />)}
                  </div>
                  <p className="text-slate-700 font-medium italic mb-8 line-clamp-4 leading-relaxed">"{item.review}"</p>
                  <div className="mt-auto border-t border-slate-100 pt-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.name}</h4>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">{item.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 10. ENHANCED CTA SECTION */}
        <section className="py-24 lg:py-32 bg-[#0A2E6F] relative overflow-hidden">
          {/* Abstract Glow and Patterns */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Trust Avatars & Badge */}
              <div className="flex flex-col items-center justify-center mb-8">
                <div className="flex -space-x-3 mb-4">
                  {[
                    "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=100&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop"
                  ].map((src, i) => (
                    <img key={i} src={src} alt="Client" className="w-12 h-12 rounded-full border-2 border-[#0A2E6F] object-cover" />
                  ))}
                  <div className="w-12 h-12 rounded-full border-2 border-[#0A2E6F] bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                    +5k
                  </div>
                </div>
                <span className="text-blue-200 font-bold text-sm tracking-wide">Join 5,000+ satisfied clients</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
                Ready To Elevate Your Space?
              </h2>
              <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
                Experience the perfect blend of premium materials, engineering excellence, and impeccable design. Let our experts orchestrate your next structural milestone.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/contact" className="bg-white text-[#0A2E6F] px-8 py-4 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors shadow-2xl hover:shadow-white/10 flex items-center justify-center gap-2">
                  Start Your Project <ArrowRight size={16} />
                </Link>
                <Link href="/windows-doors" className="border-2 border-white/20 text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                  Discover Core Services
                </Link>
              </div>

              {/* Bottom Guarantee Badges */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-bold text-blue-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400" /> Premium Materials
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400" /> Certified Experts
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400" /> End-to-End Management
                </div>
              </div>

            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}