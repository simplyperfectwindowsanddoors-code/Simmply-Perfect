"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/home/Footer";
import { motion, AnimatePresence, type Transition } from "framer-motion";

import {
  ArrowRight,
  ShieldCheck,
  Hammer,
  Factory,
  Building2,
  Wrench,
  CheckCircle2,
  Sparkles,
  Ruler,
  BadgeCheck,
  Layers3,
  ArrowUpRight,
  Star,
  X,
  ChevronDown,
  Quote
} from "lucide-react";

/* ------------------------------------------------ */
/* ANIMATIONS */
/* ------------------------------------------------ */

const smoothFadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1],
  } satisfies Transition,
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
  viewport: { once: true },
};

const cardAnimation = {
  initial: { opacity: 0, y: 25 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: {
    duration: 0.7,
    ease: [0.16, 1, 0.3, 1],
  } satisfies Transition,
};

const floatAnimation = {
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "linear" as const // This fixes the TypeScript error
  }
};

/* ------------------------------------------------ */
/* DATA */
/* ------------------------------------------------ */

const services = [
  {
    title: "Stainless Steel Railings",
    image: "/metalworks/ss-railing.jpg",
    desc: "Premium SS304 & SS316 architectural railing systems.",
  },
  {
    title: "Balcony Railings",
    image: "/metalworks/balcony-railing.jpg",
    desc: "Modern safety railings with elegant finishes.",
  },
  {
    title: "Staircase Railings",
    image: "/metalworks/stair-railing.jpg",
    desc: "Luxury indoor & outdoor staircase systems.",
  },
  {
    title: "Main Gates",
    image: "/metalworks/iron-gates.jpg",
    desc: "Heavy-duty designer gates for villas and apartments.",
  },
  {
    title: "Window Grills",
    image: "/metalworks/iron-grills.jpg",
    desc: "Custom fabricated security grills with powder coating.",
  },
  {
    title: "Safety Doors",
    image: "/metalworks/safety-doors.jpg",
    desc: "Premium MS & SS safety door solutions.",
  },
  {
    title: "Pergolas",
    image: "/metalworks/sheds-pergolas.jpg",
    desc: "Luxury outdoor pergola structures.",
  },
  {
    title: "Metal Furniture",
    image: "/metalworks/metal-furniture.jpg",
    desc: "Industrial luxury furniture crafted from steel.",
  },
];

const faqs = [
  {
    q: "What materials do you use for your metal fabrication?",
    a: "We use premium-grade SS304 and SS316 stainless steel, heavy-duty mild steel (MS), and structural aluminium, depending on your project's specific requirements and environmental exposure."
  },
  {
    q: "Will my exterior metal railings or gates rust?",
    a: "Our SS316 stainless steel is highly rust-resistant, perfect for outdoor use. For MS (Mild Steel) products, we use advanced anti-corrosion primers and premium powder coating to ensure maximum longevity against rust and weather."
  },
  {
    q: "How long does a custom metal fabrication project take?",
    a: "Timelines vary based on scale and complexity. A standard staircase railing might take 7-10 days, while custom heavy-duty designer gates or large pergolas can take 3-5 weeks from design approval to final installation."
  },
  {
    q: "Can you recreate a specific gate or railing design I found online?",
    a: "Yes. Our engineering team can analyze your reference images, create detailed 3D CAD drawings, and fabricate custom designs that match your exact vision using precision laser cutting and CNC bending."
  },
  {
    q: "Do you handle the installation process?",
    a: "Absolutely. We provide end-to-end service. Our expert installation team ensures perfect alignment, secure mounting, and flawless finishing on-site for every product we manufacture."
  },
  {
    q: "Do you offer warranties on your fabricated products?",
    a: "Yes, we provide robust warranties covering structural integrity and welding joints, along with specific guarantees on powder-coated finishes against peeling or flaking under normal usage."
  }
];

const reviews = [
  {
    name: "Rajesh Kumar",
    role: "Villa Owner",
    review: "Excellent craftsmanship. The stainless steel railings completely transformed our home. The finishing is absolutely flawless and feels incredibly sturdy."
  },
  {
    name: "Anjali Sharma",
    role: "Interior Designer",
    review: "Beautiful finish and professional installation. I regularly use them for custom metal furniture and laser-cut partition screens for my luxury clients."
  },
  {
    name: "Vivek Reddy",
    role: "Architect",
    review: "Excellent engineering standards with premium materials. Their CNC bending and laser cutting precision is exactly what modern architectural projects require."
  },
  {
    name: "Rahul Verma",
    role: "Builder",
    review: "Delivered exactly as promised. Great attention to detail on the heavy-duty entrance gates and the powder coating quality is top-notch."
  },
  {
    name: "Sneha Gupta",
    role: "Homeowner",
    review: "Very responsive team. The custom window grills we ordered matched our Pinterest references perfectly. The quality exceeded our expectations."
  },
  {
    name: "Ashok Patel",
    role: "Commercial Client",
    review: "Outstanding fabrication quality and timely project delivery. They handled our entire commercial office structural fabrication without a hitch."
  },
  {
    name: "Kiran Rao",
    role: "Apartment Owner",
    review: "Premium balcony railings with flawless finishing. Worth every penny. The glass and steel integration they did is seamless and perfectly aligned."
  },
  {
    name: "Deepak Singh",
    role: "Contractor",
    review: "Reliable company with highly skilled fabrication professionals. Having a single team handle both manufacturing and installation saves us so much time."
  }
];

const infiniteReviews = [...reviews, ...reviews];

export default function MetalWorksPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Navbar />
      
      {/* Injecting keyframes for the marquee animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(calc(-50% - 1rem)); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}} />

      {/* ========================================= */}
      {/* IMAGE LIGHTBOX POPUP */}
      {/* ========================================= */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-10 cursor-zoom-out backdrop-blur-sm"
          >
            <motion.button 
              className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full backdrop-blur-md transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </motion.button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              src={selectedImage}
              alt="Enlarged view"
              className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="bg-[#FAFBFD] overflow-hidden selection:bg-[#0A2E6F] selection:text-white">

        {/* ========================================= */}
        {/* HERO SECTION */}
        {/* ========================================= */}
        <section className="relative pt-44 pb-32 bg-gradient-to-b from-slate-50 via-white to-transparent overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:42px_42px]" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[120px] -z-10" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-200/50 rounded-full blur-[100px] -z-10" />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
              
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10"
              >
                

                <h1 className="mt-8 text-5xl md:text-6xl xl:text-[76px] font-black leading-[1.05] tracking-tight text-[#071224]">
                  Precision <br />
                  Metal
                  <span className="block bg-gradient-to-r from-[#0A2E6F] to-blue-500 text-transparent bg-clip-text mt-2">
                    Fabrication
                  </span>
                </h1>

                <p className="mt-8 text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl">
                  Simmply Perfect delivers premium architectural metal
                  fabrication including stainless steel railings, iron
                  gates, staircase systems, pergolas, safety doors,
                  window grills and custom structural fabrication.
                </p>

                <div className="flex flex-wrap gap-4 mt-10">
                  <Link
                    href="/contact"
                    className="group relative overflow-hidden bg-[#0A2E6F] text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-[0_15px_30px_rgba(10,46,111,0.2)] hover:shadow-[0_20px_40px_rgba(10,46,111,0.3)] transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                    <span>Get Free Quote</span>
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1.5 transition-transform duration-300"
                    />
                  </Link>

                  <Link
                    href="#services"
                    className="group border border-slate-300 bg-white/80 backdrop-blur-md px-8 py-4 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-400 hover:text-slate-900 transition-all duration-300 flex items-center gap-2"
                  >
                    Explore Services
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="relative lg:h-[650px]"
              >
                <div className="absolute inset-0 rounded-[40px] bg-gradient-to-tr from-[#0A2E6F]/20 to-cyan-400/20 blur-3xl transform -rotate-6" />
                
                <motion.div {...floatAnimation} className="relative h-full">
                  <img             
  src="/metalworks/iron-gates.jpg" 
  alt="Premium Metal Works and Iron Gates Fabrication" 
                    className="relative rounded-[40px] h-full w-full object-cover border border-white/50 shadow-[0_40px_100px_rgba(0,0,0,0.1)] z-10 cursor-zoom-in"
                    onClick={() => setSelectedImage("/metalworks/iron-gates.jpg")}
                    decoding="async"
                  />
                </motion.div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* ABOUT DIVISION */}
        {/* ========================================= */}
        <section className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              
              <motion.div {...smoothFadeUp} className="relative order-2 lg:order-1">
                <div className="absolute -inset-4 bg-gradient-to-br from-slate-100 to-transparent rounded-[40px] -z-10" />
                <img
                  src="/metalworks/fabrication.jpg"
                  alt="Metal Fabrication Process"
                  className="rounded-[32px] shadow-2xl w-full h-[500px] object-cover cursor-zoom-in hover:opacity-95 transition-opacity"
                  onClick={() => setSelectedImage("/metalworks/fabrication.jpg")}
                  loading="lazy"
                />
              </motion.div>

              <motion.div {...smoothFadeUp} className="order-1 lg:order-2">
                <span className="inline-block text-xs uppercase tracking-[0.35em] font-black text-[#0A2E6F] mb-4">
                  ABOUT OUR DIVISION
                </span>
                
                <h2 className="text-4xl md:text-5xl font-black text-[#071224] leading-[1.15]">
                  Premium Engineering.
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A2E6F] to-blue-500">
                    Exceptional Craftsmanship.
                  </span>
                </h2>
                
                <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                  Our Metal Works division specializes in manufacturing
                  high-quality architectural steel products for
                  residential, commercial and industrial projects.
                  Every product is fabricated using modern machinery,
                  premium raw materials and strict quality control to
                  ensure long-lasting durability and flawless aesthetics.
                </p>

                <div className="grid sm:grid-cols-2 gap-8 mt-12">
                  {[
                    { icon: Hammer, title: "Custom Fabrication", desc: "Designed for every project." },
                    { icon: Ruler, title: "Accurate Measurements", desc: "Precision manufacturing." },
                    { icon: Layers3, title: "Powder Coating", desc: "Premium finishing solutions." },
                    { icon: CheckCircle2, title: "Quality Assured", desc: "Every product inspected." }
                  ].map((feature, i) => (
                    <div key={i} className="flex gap-4 group">
                      <div className="w-12 h-12 rounded-xl bg-[#FAFBFD] border border-slate-100 flex items-center justify-center text-[#0A2E6F] group-hover:bg-[#0A2E6F] group-hover:text-white transition-colors duration-300 shrink-0">
                        <feature.icon size={22} />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#071224]">{feature.title}</h4>
                        <p className="text-sm text-slate-500 mt-1">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* OUR SERVICES */}
        {/* ========================================= */}
        <section id="services" className="py-28 bg-[#FAFBFD] relative border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            
            <motion.div {...smoothFadeUp} className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-xs font-black uppercase tracking-[0.35em] text-[#0A2E6F]">
                OUR SERVICES
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-[#071224] leading-tight">
                Complete Metal Fabrication
                <br /> Solutions
              </h2>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                From premium stainless steel railings to heavy-duty gates,
                pergolas and structural fabrication, we manufacture every
                product with engineering precision and luxury finishes.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 xl:grid-cols-4 gap-8"
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={cardAnimation}
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-[32px] overflow-hidden border border-slate-200 shadow-sm hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:border-[#0A2E6F]/20 transition-all duration-500 flex flex-col"
                >
                  <div className="relative overflow-hidden h-64 cursor-zoom-in" onClick={() => setSelectedImage(service.image)}>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-black text-[#071224]">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-slate-500 leading-relaxed flex-grow">
                      {service.desc}
                    </p>
                    <Link
                      href="/contact"
                      className="mt-8 inline-flex items-center gap-2 font-bold text-[#0A2E6F] group/link w-fit"
                    >
                      Request Quote
                      <ArrowUpRight
                        size={18}
                        className="bg-[#0A2E6F]/10 rounded-full p-0.5 group-hover/link:bg-[#0A2E6F] group-hover/link:text-white group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-all duration-300"
                      />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </section>

        {/* ========================================= */}
        {/* HORIZONTAL TIMELINE PROCESS SECTION */}
        {/* ========================================= */}
        <section className="relative py-32 bg-[#071224] overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[150px]" />
            <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-cyan-400/5 blur-[150px]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8 z-10">
            
            <motion.div {...smoothFadeUp} className="text-center max-w-3xl mx-auto mb-20">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-xs font-black uppercase tracking-[0.3em] text-blue-300">
                <Factory size={15} /> OUR WORKFLOW
              </span>
              <h2 className="mt-6 text-4xl md:text-5xl font-black text-white leading-tight">
                From Concept <br /> To Installation
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-slate-400">
                A streamlined engineering workflow that guarantees precision,
                structural integrity, and flawless finishing on every project.
              </p>
            </motion.div>

            <div className="relative mt-20">
              
              {/* Continuous Horizontal Line (Desktop Only) */}
              <div className="hidden lg:block absolute top-[28px] left-0 right-0 h-[2px] bg-white/10 rounded-full" />
              
              {/* Animated Glowing Progress Line (Desktop Only) */}
              <div className="hidden lg:block absolute top-[28px] left-0 w-[40%] h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full animate-pulse blur-[2px]" />
              <div className="hidden lg:block absolute top-[28px] left-0 w-[40%] h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />

              {/* Timeline Items Container */}
              <div className="flex flex-col lg:flex-row gap-10 lg:gap-8 overflow-x-auto pb-12 pt-4 lg:pt-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {[
                  { icon: Building2, number: "01", title: "Consultation", desc: "Understanding requirements, site conditions, and design preferences." },
                  { icon: Ruler, number: "02", title: "Measurement", desc: "Engineers collect precise dimensions ensuring a perfect fit." },
                  { icon: Layers3, number: "03", title: "Engineering", desc: "3D layouts, drawings, and exact material specifications." },
                  { icon: Factory, number: "04", title: "Fabrication", desc: "Laser cutting, bending, and structural assembly using premium machinery." },
                  { icon: Sparkles, number: "05", title: "Finishing", desc: "Polishing, powder coating, and premium detailing for durability." },
                  { icon: ShieldCheck, number: "06", title: "Installation", desc: "Professional fitting followed by final quality inspections." },
                ].map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={index} className="relative flex flex-row lg:flex-col items-start gap-6 w-full lg:w-[320px] shrink-0 snap-center group">
                      
                      {/* Vertical Line for Mobile Layout */}
                      <div className="absolute left-[1.65rem] top-14 bottom-[-2.5rem] w-[2px] bg-white/10 lg:hidden rounded-full" />

                      {/* Icon Node */}
                      <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
                        className="w-14 h-14 shrink-0 bg-[#071224] rounded-full flex items-center justify-center z-10 border-4 border-blue-500/30 group-hover:border-blue-400 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] transition-all duration-300 relative"
                      >
                         <div className="absolute inset-2 rounded-full bg-blue-500/20 group-hover:bg-transparent transition-colors" />
                         <Icon size={22} className="text-blue-400 group-hover:text-white transition-colors relative z-10" />
                      </motion.div>

                      {/* Card Content */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[28px] p-8 w-full hover:bg-white/10 hover:border-blue-500/40 transition-all duration-300 shadow-xl relative overflow-hidden lg:mt-6"
                      >
                        {/* Background Number Text */}
                        <span className="absolute -bottom-6 -right-4 text-9xl font-black text-white/[0.03] group-hover:text-blue-500/[0.05] transition-colors duration-500 pointer-events-none">
                          {step.number}
                        </span>

                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-sm font-black text-blue-400 tracking-widest uppercase">
                            Step {step.number}
                          </span>
                        </div>
                        
                        <h3 className="text-2xl font-black text-white mb-3">
                          {step.title}
                        </h3>
                        <p className="text-slate-400 leading-relaxed text-sm">
                          {step.desc}
                        </p>
                      </motion.div>

                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </section>

        
        {/* ========================================= */}
        {/* METAL WORKS GALLERY */}
        {/* ========================================= */}
        <section className="py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            
            <motion.div {...smoothFadeUp} className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-xs font-black uppercase tracking-[0.35em] text-[#0A2E6F]">
                PROJECT GALLERY
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-[#071224]">
                Engineering Meets
                <br /> Elegant Design
              </h2>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                Explore some of our finest fabrication work delivered across
                luxury villas, apartments, commercial buildings and premium
                residential projects.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-6">
              {/* Large Left */}
              <motion.div
                variants={cardAnimation}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="lg:col-span-7 relative h-[500px] lg:h-[650px] rounded-[36px] overflow-hidden group shadow-lg cursor-zoom-in"
                onClick={() => setSelectedImage("/metalworks/glass-railing.jpg")}
              >
                <img
                  src="/metalworks/glass-railing.jpg"
                  alt="Premium Frameless Glass Railings"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-10 left-10 right-10">
                  <span className="text-xs uppercase tracking-[0.3em] text-blue-300 font-bold bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-md">
                    Premium Glass Railings
                  </span>
                  <h3 className="mt-4 text-4xl font-black text-white">
                    Frameless <br /> Glass Railings
                  </h3>
                </div>
              </motion.div>

              {/* Right Side */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {[
                  { title: "Designer Stair Railings", image: "/metalworks/staircase.jpg" },
                  { title: "Laser Cut Gates", image: "/metalworks/laser-cut.jpg" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={cardAnimation}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                    whileHover={{ y: -4 }}
                    className="relative h-[240px] lg:h-[312px] rounded-[30px] overflow-hidden group shadow-md cursor-zoom-in"
                    onClick={() => setSelectedImage(item.image)}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-8">
                      <h4 className="text-2xl font-black text-white">{item.title}</h4>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom Grid */}
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              {[
                { title: "Balcony Railings", image: "/metalworks/balcony.jpg" },
                { title: "SS Safety Doors", image: "/metalworks/safety-door.jpg" },
                { title: "Luxury Entrance Gates", image: "/metalworks/main-gate.jpg" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={cardAnimation}
                  initial="initial"
                  whileInView="whileInView"
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className="relative h-[300px] rounded-[28px] overflow-hidden group shadow-md cursor-zoom-in"
                  onClick={() => setSelectedImage(item.image)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
                  <div className="absolute bottom-7 left-7">
                    <h4 className="text-xl font-black text-white">{item.title}</h4>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================= */}
        {/* COMPANY ACHIEVEMENTS */}
        {/* ========================================= */}
        <section className="py-24 bg-gradient-to-br from-[#071224] via-[#0A2E6F] to-[#0A2E6F] relative overflow-hidden">
          <div className="absolute -top-40 left-0 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute -bottom-40 right-0 w-[450px] h-[450px] bg-cyan-400/20 rounded-full blur-[140px] pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
            <motion.div {...smoothFadeUp} className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-xs font-black uppercase tracking-[0.35em] text-blue-300">
                OUR ACHIEVEMENTS
              </span>
              <h2 className="mt-5 text-4xl md:text-5xl font-black text-white tracking-tight">
                Trusted Across <br /> Residential & Commercial Projects
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: "1500+", title: "Projects Completed", desc: "Successfully delivered fabrication projects." },
                { number: "10+ years", title: "Years Experience", desc: "Industry expertise and engineering excellence." },
                { number: "97.5%", title: "Satisfaction", desc: "Satisfied homeowners, builders and architects." },
                { number: "20+", title: "Expert Team", desc: "Dedicated designers, fabricators and installers." },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={cardAnimation}
                  initial="initial"
                  whileInView="whileInView"
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="rounded-[32px] bg-white/5 backdrop-blur-xl border border-white/10 p-10 text-center hover:bg-white/10 hover:border-blue-300/40 transition-all duration-500 shadow-xl"
                >
                  <h3 className="text-5xl lg:text-6xl font-black bg-gradient-to-br from-white via-white to-blue-300 bg-clip-text text-transparent drop-shadow-sm">
                    {item.number}
                  </h3>
                  <h4 className="mt-6 text-xl font-bold text-white">
                    {item.title}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-blue-100/80">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* FREQUENTLY ASKED QUESTIONS */}
        {/* ========================================= */}
        <section className="py-32 bg-white relative">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <span className="text-xs font-bold uppercase tracking-[4px] text-[#0A2E6F]">Knowledge Base</span>
              <h2 className="text-4xl md:text-5xl font-black text-[#071224] tracking-tight">Frequently Asked Questions</h2>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`border ${openFaq === index ? "border-[#0A2E6F]/30 bg-blue-50/30" : "border-slate-200/70 bg-slate-50"} rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#0A2E6F]/30 shadow-sm`}
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

        {/* ========================================= */}
        {/* CUSTOMER REVIEWS CONTINUOUS SCROLL */}
        {/* ========================================= */}
        <section className="py-24 bg-[#FAFBFD] border-t border-slate-200/50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            
            <motion.div {...smoothFadeUp}>
              <span className="text-xs font-black uppercase tracking-[0.35em] text-[#0A2E6F]">
                CUSTOMER REVIEWS
              </span>
              <h2 className="mt-5 text-4xl md:text-5xl font-black tracking-tight text-[#071224]">
                Loved By Our Customers
              </h2>
              
              <div className="mt-12 flex justify-center items-center gap-12 flex-wrap">
                <div className="flex flex-col items-center">
                  <h3 className="text-5xl font-black text-[#0A2E6F]">4.9</h3>
                  <div className="flex justify-center gap-1 mt-3 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} fill="currentColor" />
                    ))}
                  </div>
                  <p className="mt-2 text-sm font-semibold text-slate-500">Average Rating</p>
                </div>

                <div className="w-px h-24 bg-slate-200 hidden md:block" />

                <div className="flex flex-col items-center">
                  <h3 className="text-5xl font-black text-[#0A2E6F]">500+</h3>
                  <div className="mt-3 flex -space-x-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                       <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden`}>
                         <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                       </div>
                    ))}
                  </div>
                  <p className="mt-2 text-sm font-semibold text-slate-500">Verified Reviews</p>
                </div>
              </div>
            </motion.div>

          </div>

          <div className="relative mt-24 w-full">
            <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#FAFBFD] to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#FAFBFD] to-transparent z-20 pointer-events-none" />

            <div className="flex w-max gap-8 animate-marquee hover:[animation-play-state:paused] pl-8">
              {infiniteReviews.map((item, i) => (
                <div
                  key={`${item.name}-${i}`}
                  className="w-[320px] md:w-[420px] shrink-0 bg-white rounded-3xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-100 relative overflow-hidden group hover:shadow-[0_20px_40px_rgba(10,46,111,0.06)] hover:border-[#0A2E6F]/20 transition-all duration-300"
                >
                  <Quote className="absolute top-6 right-6 text-slate-50 w-24 h-24 -z-0 rotate-12 transition-transform duration-500 group-hover:rotate-0 group-hover:text-blue-50" />
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-amber-400 text-lg tracking-widest flex gap-1">★★★★★</div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-3 py-1.5 rounded-full">
                        Verified
                      </span>
                    </div>
                    <p className="mt-2 text-slate-700 leading-relaxed font-medium italic text-[15px] flex-grow">"{item.review}"</p>
                    <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0A2E6F] to-blue-500 flex items-center justify-center text-white font-black shadow-md shrink-0">
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-[#071224]">{item.name}</h4>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">{item.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* CTA */}
        {/* ========================================= */}
        <section className="py-32 bg-[#071224] relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-white/5 rounded-full pointer-events-none" />
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          
          <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
            <motion.div {...smoothFadeUp}>
              <span className="inline-block bg-blue-500/10 border border-blue-500/20 text-blue-400 px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-8">
                LET'S BUILD SOMETHING AMAZING
              </span>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                Ready To Start Your <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300"> Metal Works Project?</span>
              </h2>

              <p className="mt-8 max-w-2xl mx-auto text-slate-400 text-lg md:text-xl leading-relaxed">
                Whether it's stainless steel railings, designer gates,
                staircase systems, pergolas, or custom fabrication,
                our engineers are ready to deliver premium quality
                solutions tailored to your project.
              </p>

              <div className="mt-12 flex flex-wrap justify-center gap-5">
                <Link
                  href="/contact"
                  className="bg-white text-[#0A2E6F] px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300"
                >
                  Request Quote
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href="/articles"
                  className="border border-white/20 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                >
                  View Projects
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
