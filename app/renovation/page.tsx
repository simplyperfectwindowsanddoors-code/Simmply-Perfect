"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/home/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Hammer,
  Paintbrush,
  Building2,
  ChevronDown,
  Quote
} from "lucide-react";

const fadeUp = {
  initial: {
    opacity: 0,
    y: 40,
  },
  whileInView: {
    opacity: 1,
    y: 0,
  },
  viewport: {
    once: true,
  },
  transition: {
    duration: 0.7,
    ease: [0.42, 0, 0.58, 1] as const,
  },
};

const faqs = [
  {
    q: "How long does a renovation project take?",
    a: "The duration depends on the project scope. Small renovations like single rooms may take a few weeks, while complete home renovations or structural overhauls can take several months.",
  },
  {
    q: "Do you provide design services before execution?",
    a: "Yes. We provide end-to-end services including initial consultation, space planning, 3D visualizations, and premium material selection before any physical project execution begins.",
  },
  {
    q: "Can I stay in my home during renovation?",
    a: "For minor renovations or single-room projects, yes. However, for larger structural projects or full-scale plumbing/electrical overhauls, we typically recommend temporary relocation for your safety and convenience.",
  },
  {
    q: "Do you provide warranties on your renovation work?",
    a: "Absolutely. We offer strict warranty support on our craftsmanship and the premium materials used in the renovation project to ensure long-term peace of mind.",
  },
  {
    q: "Can you renovate kitchens and bathrooms only?",
    a: "Yes. While we undertake complete home renovations, we frequently manage individual high-luxury kitchen, bathroom, bedroom, and living room remodeling projects.",
  },
  {
    q: "Do you handle commercial renovations?",
    a: "Yes. We provide complete structural renovation and premium aesthetic solutions for offices, retail stores, commercial buildings, and hospitality spaces.",
  },
];

const reviews = [
  { name: "Ramesh Kumar", role: "Villa Owner", review: "The renovation completely transformed our home. The team handled everything professionally, from the new electrical layouts to the luxury finishes. Delivered beyond expectations." },
  { name: "Anita Sharma", role: "Interior Consultant", review: "Excellent workmanship and premium materials. Having a single point of accountability made the process incredibly smooth from planning to final execution." },
  { name: "Vikram Reddy", role: "Commercial Client", review: "Their renovation expertise helped us modernize our entire office floor while maintaining the core structural criteria. Fantastic turnaround time." },
  { name: "Suresh Menon", role: "Homeowner", review: "They completely overhauled our kitchen and living space. The attention to detail, especially with the Italian marble flooring, was fantastic." },
  { name: "Pooja Desai", role: "Real Estate Investor", review: "Simmply Perfect handles all my property flips. Their structural upgrades and modern aesthetic touches add immense market value to every space." },
  { name: "Karan Singh", role: "Restaurant Owner", review: "We hired them for a complete commercial redesign. The network cabling, lighting systems, and luxury paint finishes were all executed flawlessly." }
];

const infiniteReviews = [...reviews, ...reviews];

export default function RenovationPage() {
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

      <main className="bg-white overflow-hidden">
        <section className="pt-40 pb-28 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">

              {/* LEFT */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <h1 className="mt-6 text-5xl md:text-6xl xl:text-7xl font-black text-[#071224] tracking-tight leading-[0.95]">
                  Transform Old <br />
                  Spaces Into  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A2E6F] via-[#1E4ED8] to-indigo-600">
                    Modern Masterpieces
                  </span>
                </h1>

                <p className="mt-8 text-lg text-slate-600 leading-8 max-w-xl">
                  From complete home renovations to premium kitchen remodeling
                  and structural upgrades, we transform outdated spaces into
                  beautiful, functional environments.
                </p>

                <div className="flex flex-wrap gap-4 mt-10">
                  <Link
                    href="#services"
                    className="inline-flex items-center justify-center bg-[#0A2E6F] text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-all"
                  >
                    Explore Renovations
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center border border-slate-300 px-8 py-4 rounded-full font-semibold hover:border-[#0A2E6F] hover:text-[#0A2E6F] transition-all"
                  >
                    Get Consultation
                  </Link>
                </div>

                <div className="flex flex-wrap gap-12 mt-14">
                  <div>
                    <h3 className="text-4xl font-black text-[#0A2E6F]">
                      3000+
                    </h3>
                    <p className="text-slate-500 font-medium">Renovation Projects</p>
                  </div>

                  <div>
                    <h3 className="text-4xl font-black text-[#0A2E6F]">
                      8+ years
                    </h3>
                    <p className="text-slate-500 font-medium">Years Experience</p>
                  </div>

                  <div>
                    <h3 className="text-4xl font-black text-[#0A2E6F]">
                      99.12%
                    </h3>
                    <p className="text-slate-500 font-medium">Satisfaction</p>
                  </div>
                </div>
              </motion.div>

              {/* RIGHT */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative h-[650px] rounded-[40px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.15)]">

                  {/* BEFORE IMAGE */}
                  <img
                    src="https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1600"
                    alt="Before Renovation"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* AFTER IMAGE REVEAL */}
                  <motion.div
                    animate={{
                      width: ["0%", "100%", "100%", "0%"],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-y-0 left-0 overflow-hidden"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600"
                      alt="After Renovation"
                      className="w-[650px] h-full object-cover"
                    />
                  </motion.div>

                  {/* DRAG LINE */}
                  <motion.div
                    animate={{
                      left: ["0%", "100%", "100%", "0%"],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-xl"
                  />

                  <div className="absolute top-6 left-6 bg-red-500 text-white px-5 py-2 rounded-full font-bold text-sm">
                    BEFORE
                  </div>

                  <div className="absolute top-6 right-6 bg-emerald-500 text-white px-5 py-2 rounded-full font-bold text-sm">
                    AFTER
                  </div>

                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* RENOVATION SERVICES */}
        <section id="services" className="py-32 bg-slate-50 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center">
              <span className="uppercase tracking-[4px] font-bold text-xs text-[#0A2E6F]">
                Our Services
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl font-black text-[#0A1A35] tracking-tight">
                Complete Renovation Solutions
              </h2>
              <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto">
                From structural upgrades to aesthetic transformations,
                we handle every aspect of your renovation project.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
              {[
                {
                  title: "Home Renovation",
                  desc: "Complete transformation of residential spaces."
                },
                {
                  title: "Kitchen Remodeling",
                  desc: "Modern kitchen upgrades and redesign."
                },
                {
                  title: "Bathroom Renovation",
                  desc: "Luxury bathroom renovations and fittings."
                },
                {
                  title: "Flooring Solutions",
                  desc: "Tiles, marble, wooden and vinyl flooring."
                },
                {
                  title: "Painting & Finishes",
                  desc: "Premium paints and decorative finishes."
                },
                {
                  title: "Commercial Renovation",
                  desc: "Office and commercial space upgrades."
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                  }}
                  className="bg-white rounded-[36px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-100 hover:border-[#0A2E6F]/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6">
                    <CheckCircle2 size={24} className="text-[#0A2E6F]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#071224] tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-slate-500 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FLOORING & FINISHES */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1800"
                  alt="Luxury Finishes"
                  className="w-full h-[650px] md:h-[750px] object-cover rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="uppercase font-bold text-xs tracking-[4px] text-[#0A2E6F]">
                  Flooring & Finishes
                </span>
                <h2 className="mt-4 text-4xl md:text-5xl font-black text-[#0A1A35] tracking-tight">
                  Premium Materials
                  For Lasting Beauty
                </h2>
                <p className="mt-8 text-lg text-slate-600 leading-relaxed font-medium">
                  We use premium flooring materials and luxury finishes
                  that enhance aesthetics while ensuring durability and structural integrity.
                </p>

                <div className="space-y-5 mt-10">
                  {[
                    "Italian Marble Flooring",
                    "Wooden Flooring",
                    "Premium Tiles",
                    "Decorative Wall Panels",
                    "Luxury Paint Finishes",
                    "Waterproof Solutions",
                  ].map((item) => (
                    <div key={item} className="flex gap-4 items-center p-3 rounded-xl hover:bg-slate-50 transition-colors">
                      <div className="p-1 rounded-full bg-blue-50 text-[#0A2E6F]">
                        <CheckCircle2 size={20} />
                      </div>
                      <span className="font-bold text-slate-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ELECTRICAL & PLUMBING */}
        <section className="py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center">
              <span className="uppercase font-bold text-xs tracking-[4px] text-[#0A2E6F]">
                Infrastructure Upgrades
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-[#071224]">
                Modern Systems For Modern Living
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
              {[
                "Electrical Rewiring",
                "Smart Home Integration",
                "LED Lighting Systems",
                "Plumbing Upgrades",
                "Bathroom Fittings",
                "Waterproofing",
                "Network Cabling",
                "Power Backup Solutions",
              ].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white rounded-[24px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col items-center text-center transition-all duration-300 hover:border-[#0A2E6F]/20"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#0A2E6F] mb-4">
                    <CheckCircle2 size={24} />
                  </div>
                  <h3 className="font-bold text-[#071224]">
                    {item}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* BEFORE & AFTER GALLERY */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center">
              <span className="uppercase font-bold text-xs tracking-[4px] text-[#0A2E6F]">
                Before & After
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl font-black text-[#0A1A35] tracking-tight">
                Renovation Transformations
              </h2>
              <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto font-medium">
                See how we transform outdated interiors into beautiful,
                modern and functional spaces.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 mt-20">
              {[
                {
                  before: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1800",
                  after: "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1800",
                  title: "Bedroom Renovation",
                },
                {
                  before: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1800",
                  after: "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1800",
                  title: "Kitchen Remodeling",
                },
              ].map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-slate-50 rounded-[36px] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-slate-100"
                >
                  <div className="grid sm:grid-cols-2">
                    <div className="relative group">
                      <img src={project.before} alt="Before" className="w-full h-[250px] sm:h-[350px] object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute top-4 left-4 bg-red-500/90 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest shadow-lg">
                        BEFORE
                      </div>
                    </div>
                    <div className="relative group">
                      <img src={project.after} alt="After" className="w-full h-[250px] sm:h-[350px] object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute top-4 right-4 bg-emerald-500/90 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest shadow-lg">
                        AFTER
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-[#0A1A35] tracking-tight">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-slate-500 font-medium leading-relaxed">
                      Complete transformation with premium materials,
                      modern aesthetics and expert craftsmanship.
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* RENOVATION PROCESS */}
        <section className="py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center">
              <span className="uppercase font-bold text-xs tracking-[4px] text-[#0A2E6F]">
                Our Process
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl font-black text-[#0A1A35] tracking-tight">
                From Vision To Reality
              </h2>
              <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto font-medium">
                Our proven renovation process ensures a smooth experience,
                exceptional quality and timely project completion.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 mt-24">
              {[
                { icon: Building2, title: "Site Visit", desc: "Understanding your space and requirements." },
                { icon: Paintbrush, title: "Design Planning", desc: "Creating concepts and visualizations." },
                { icon: Hammer, title: "Execution", desc: "Renovation work by expert craftsmen." },
                { icon: CheckCircle2, title: "Quality Check", desc: "Detailed inspection and finishing." },
                { icon: Sparkles, title: "Project Delivery", desc: "Ready-to-use transformed spaces." },
              ].map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                    className="relative bg-white rounded-[32px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-100 text-center transition-all duration-300 hover:border-[#0A2E6F]/20"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-[#0A2E6F]/10 text-[#0A2E6F] flex items-center justify-center mx-auto transition-transform duration-300 hover:scale-110">
                      <Icon size={30} />
                    </div>
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center font-bold text-[#0A2E6F]">
                      {index + 1}
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-[#0A1A35]">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-slate-500 font-medium leading-relaxed text-sm">
                      {step.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000"
                  alt="Renovation"
                  className="w-full h-[650px] md:h-[750px] object-cover rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="uppercase font-bold text-xs tracking-[4px] text-[#0A2E6F]">
                  Why Simmply Perfect
                </span>
                <h2 className="mt-4 text-4xl md:text-5xl font-black text-[#0A1A35] tracking-tight">
                  Excellence In Every Renovation
                </h2>
                <p className="mt-8 text-lg text-slate-600 leading-relaxed font-medium">
                  We combine innovative design, skilled craftsmanship
                  and premium materials to deliver renovations that
                  enhance beauty, functionality and long-term value.
                </p>

                <div className="grid grid-cols-2 gap-6 mt-12">
                  {[
                    "3000+ Projects",
                    "8+ years Experience",
                    "Premium Materials",
                    "Certified Team",
                    "On-Time Delivery",
                    "99.12% Satisfaction",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 size={22} className="text-emerald-500 shrink-0" />
                      <span className="font-bold text-slate-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="grid sm:grid-cols-3 gap-6 mt-14">
                  <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 text-center shadow-sm">
                    <h3 className="text-3xl font-black text-[#0A2E6F]">3000+</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Projects</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 text-center shadow-sm">
                    <h3 className="text-3xl font-black text-[#0A2E6F]">8+ years</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Years Exp</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 text-center shadow-sm">
                    <h3 className="text-3xl font-black text-[#0A2E6F]">99.12%</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Satisfaction</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FEATURED PROJECTS */}
        <section className="py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center">
              <span className="uppercase font-bold text-xs tracking-[4px] text-[#0A2E6F]">
                Featured Projects
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl font-black text-[#0A1A35] tracking-tight">
                Renovations That Redefined Spaces
              </h2>
              <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto font-medium">
                Explore some of our most successful renovation projects,
                from luxury homes to premium commercial spaces.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-6 mt-20">
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="lg:col-span-7 overflow-hidden rounded-[32px] shadow-md"
              >
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000"
                  alt="Featured Project 1"
                  className="w-full h-[400px] lg:h-[650px] object-cover transition-transform duration-700 hover:scale-105"
                />
              </motion.div>

              <div className="lg:col-span-5 grid gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="overflow-hidden rounded-[32px] shadow-md"
                >
                  <img
                    src="https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1600"
                    alt="Featured Project 2"
                    className="w-full h-[250px] lg:h-[312px] object-cover transition-transform duration-700 hover:scale-105"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="overflow-hidden rounded-[32px] shadow-md"
                >
                  <img
                    src="https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600"
                    alt="Featured Project 3"
                    className="w-full h-[250px] lg:h-[312px] object-cover transition-transform duration-700 hover:scale-105"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
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

        {/* CLIENT REVIEWS CONTINUOUS SCROLL */}
        <section className="py-24 bg-slate-50 border-t border-slate-200/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto space-y-4">
              <span className="text-xs font-bold uppercase tracking-[4px] text-[#0A2E6F]">Client Testimonials</span>
              <h2 className="text-4xl md:text-5xl font-black text-[#071224] tracking-tight">Trusted By Industry Leaders</h2>
            </div>
          </div>
          
          <div className="mt-16 relative w-full overflow-hidden">
            {/* Gradient fades for the edges matching the section background */}
            <div className="absolute top-0 bottom-0 left-0 w-24 md:w-48 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-24 md:w-48 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
            
            <div className="flex w-max gap-8 animate-marquee hover:[animation-play-state:paused] pl-8">
              {infiniteReviews.map((item, i) => (
                <div
                  key={`${item.name}-${i}`}
                  className="w-[320px] md:w-[420px] shrink-0 bg-white rounded-3xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-100 relative overflow-hidden group hover:shadow-[0_20px_40px_rgba(10,46,111,0.06)] hover:border-[#0A2E6F]/20 transition-all duration-300"
                >
                  <Quote className="absolute top-6 right-6 text-slate-50 w-24 h-24 -z-0 rotate-12 transition-transform duration-500 group-hover:rotate-0 group-hover:text-blue-50" />
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

        {/* PREMIUM CTA */}
        <section className="py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#071224]" />
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[150px]" />
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <motion.div
              {...fadeUp}
              className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl px-10 py-16 md:px-16 md:py-20 text-center shadow-2xl"
            >
              <span className="inline-flex px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white font-bold text-xs tracking-[3px] uppercase">
                Ready To Get Started?
              </span>
              <h2 className="mt-6 text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
                Transform Your Space With <br />
                Premium Renovation Solutions
              </h2>
              <p className="mt-6 max-w-3xl mx-auto text-slate-300 font-medium leading-relaxed">
                From luxury design consultation to flawless installation, we deliver complete turn-key solutions for homes, villas, and commercial spaces.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="bg-white text-[#071224] px-8 py-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 hover:scale-105 shadow-xl"
                >
                  Get Free Consultation
                </Link>
                <a
                  href="tel:+919999999999"
                  className="border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 hover:bg-white/10"
                >
                  Call Now
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
