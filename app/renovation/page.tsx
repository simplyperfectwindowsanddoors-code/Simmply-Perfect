"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/home/Footer";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  CheckCircle2,
  Check,
  Hammer,
  Paintbrush,
  Building2,
  ChevronDown,
  Quote,
  X,
  ShieldCheck
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.42, 0, 0.58, 1] as const },
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

const servicesList = [
  { title: "Electrical Work", desc: "Complete electrical rewiring, lighting installations, switchboard upgrades, and smart home integrations ensuring the highest safety standards.", features: ["Concealed wiring & MCB upgrades", "Smart home integrations", "Energy-efficient LED layouts", "Strict safety compliance"] },
  { title: "Plumbing", desc: "Expert pipe installations, leak repairs, and luxury bathroom fittings with long-lasting waterproof and drainage solutions.", features: ["CPVC/UPVC pipe installations", "Luxury fixture fitting", "Anti-leakage testing", "Advanced waterproofing solutions"] },
  { title: "Painting", desc: "Premium interior and exterior painting services using high-quality, weather-resistant, and luxury decorative paints.", features: ["Anti-fungal & washable paints", "Primer & dual putty base", "Texture & stencil options", "Post-painting deep cleanup"] },
  { title: "Seepage Repair", desc: "Advanced waterproofing and seepage treatment to protect your walls, ceilings, and preserve structural integrity.", features: ["Thermal imaging inspection", "Injection grouting techniques", "Polymer coating applications", "Long-term warranty support"] },
  { title: "Civil Works", desc: "Structural modifications, wall extensions, plastering, and complete core civil construction for robust foundations.", features: ["Brickwork & plastering", "Structural reinforcement", "Demolition with debris removal", "Space optimization planning"] },
  { title: "Flooring", desc: "High-end flooring solutions including Italian marble, wooden planks, vitrified tiles, and premium customized flooring.", features: ["Laser level precision laying", "Epoxy grouting", "Marble & stone polishing", "Seamless skirting alignment"] },
  { title: "Carpentry", desc: "Custom furniture crafting, modular wardrobe installations, door fittings, and premium interior woodwork detailing.", features: ["Marine-grade plywood usage", "Laminate & veneer finishes", "Soft-close hinge integration", "Custom 3D wood designs"] },
  { title: "Wall Core Cutting", desc: "Precision core cutting services for HVAC, plumbing, and structural extensions without damaging underlying foundations.", features: ["Vibration-free cutting", "No structural damage", "Advanced dust control", "Precise circular cutting"] },
  { title: "Kitchen Repair", desc: "End-to-end modular kitchen repairs, cabinet restorations, hinge replacements, and premium countertop upgrades.", features: ["Hardware & hinge replacement", "Countertop buffing/sealing", "Chimney ducting fixes", "Cabinet realignment"] },
  { title: "AC Shifting", desc: "Safe and hassle-free air conditioner dismantling, shifting, and precise re-installation by certified technicians.", features: ["Gas pressure & leak check", "Copper pipe insulation", "Precision core cutting for ducts", "Stabilizer & wiring setup"] },
  { title: "Furniture Installation", desc: "Professional assembly, installation, and secure mounting of ready-made furniture, fixtures, and heavy home setups.", features: ["Factory-finish assembly", "Heavy anchor wall mounting", "Alignment correction", "Damage-free handling"] },
];

const infraList = [
  { title: "Bedroom Terrace Renovation", desc: "Transform your bedroom terrace into a cozy, luxurious outdoor retreat with premium decking, pergolas, and ambient lighting.", features: ["Weather-proof decking", "Ambient warm lighting", "Pergola & canopy construction", "Custom outdoor seating"] },
  { title: "Living Room Renovation", desc: "Modernize your living space with customized TV units, intricate false ceilings, and layered ambient lighting setups.", features: ["False ceiling & cove lights", "Custom TV console design", "Acoustic wall paneling", "Premium flooring upgrades"] },
  { title: "Kitchen Renovation", desc: "Complete overhaul of your kitchen space with customized modular setups, premium countertops, and smart storage.", features: ["Premium modular cabinets", "Quartz/Granite countertops", "Built-in appliance integration", "Under-cabinet task lighting"] },
  { title: "Washroom Renovation", desc: "Upgrade to luxury bathroom fittings, anti-skid premium tiles, and advanced modern waterproofing solutions.", features: ["Concealed cistern setups", "Glass shower enclosures", "Anti-skid premium tiles", "Exhaust & ventilation upgrades"] },
  { title: "Terrace Renovation", desc: "Comprehensive terrace waterproofing, landscaping, customized outdoor seating designs, and weather-proof flooring.", features: ["PU grade waterproofing", "Vertical garden setup", "Custom barbeque stations", "Toughened glass railings"] },
  { title: "Balcony Renovation", desc: "Turn your balcony into a beautiful mini-garden or seating area with custom safety grills and elegant styling.", features: ["Swing/Hammock anchor hooks", "Artificial turf or deck wood", "Designer safety grills", "Planter stand integration"] },
  { title: "Flat / Apartment Renovation", desc: "End-to-end apartment makeovers maximizing space utilization, natural light, and modern contemporary aesthetics.", features: ["End-to-end interior design", "Space-saving furniture", "Vastu compliance checking", "Turnkey project execution"] },
  { title: "Villa or Independent House Renovation", desc: "Structural upgrades, luxury exterior facades, landscaping, and complete interior overhauls for independent homes.", features: ["Exterior facade facelift", "Landscape & driveway design", "Home theatre setups", "Smart security systems"] },
  { title: "School Renovation", desc: "Creating safe, interactive, and durable learning environments with child-friendly materials and vibrant designs.", features: ["Ergonomic student benches", "Safety-first material usage", "Interactive smart boards", "Play area rubber flooring"] },
  { title: "Office Renovation", desc: "Ergonomic workspace designs, comprehensive network cabling, modern glass partitions, and executive cabin setups.", features: ["Acoustic meeting rooms", "Modular workstations", "Server room & networking", "Cafeteria interior design"] },
  { title: "Shop Renovation", desc: "Eye-catching retail interiors designed to boost footfall, enhance customer experience, and showcase products beautifully.", features: ["Display racks & gondolas", "Accent track lighting", "Branding & focal walls", "Ergonomic cash counters"] },
  { title: "Cafe Renovation", desc: "Thematic interior styling, customized comfortable seating, and ambient lighting for the perfect relaxing cafe vibe.", features: ["Theme-based interiors", "Industrial & ambient lighting", "HVAC & kitchen ventilation", "Commercial kitchen planning"] },
  { title: "College Renovation", desc: "Modernizing lecture halls, auditoriums, and campus facilities for a highly enhanced and tech-enabled educational experience.", features: ["Tiered auditorium seating", "Lab infrastructure upgrades", "Library shelving systems", "Student lounge zones"] },
  { title: "Hospital Renovation", desc: "Sanitary, hygienic, and highly accessible infrastructure upgrades completely compliant with strict medical standards.", features: ["Anti-bacterial vinyl flooring", "Medical gas pipelines", "OT compliant surfaces", "Wheelchair accessible ramps"] },
  { title: "Convention Center Renovation", desc: "Advanced acoustic treatments, grand luxury lighting, and premium versatile seating arrangements for large-scale venues.", features: ["High-ceiling acoustic panels", "Stage & truss rigging", "Heavy-duty HVAC systems", "Banquet grade carpeting"] },
  { title: "Hotel / Resort Renovation", desc: "Luxury guest room upgrades, grand lobby redesigns, and premium landscaping tailored exclusively for the hospitality industry.", features: ["Luxury suite upgrades", "Poolside decking & cabanas", "Grand reception redesign", "Fine dining interiors"] },
  { title: "Church / Temple Renovation", desc: "Respectful, detailed restoration of religious spaces, focusing on intricate architectural preservation and long-term durability.", features: ["Stone carving restoration", "High-dome painting", "Aisle & sanctum flooring", "Altar ambient lighting"] },
];

export default function RenovationPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedCard, setSelectedCard] = useState<{ title: string; desc: string; features: string[]; type: "service" | "infra" } | null>(null);

  return (
    <>
      <Navbar />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(calc(-50% - 1rem)); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}} />

      {/* ENHANCED MODAL POPUP */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setSelectedCard(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[32px] p-8 md:p-10 max-w-xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setSelectedCard(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center justify-between mb-6 pr-12">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 text-[#0A2E6F]">
                  {selectedCard.type === "service" ? <CheckCircle2 size={30} /> : <Building2 size={30} />}
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold tracking-wide">
                  <ShieldCheck size={16} /> 100% Quality Assured
                </div>
              </div>
              
              <h3 className="text-3xl font-black text-[#0A1A35] tracking-tight">
                {selectedCard.title}
              </h3>
              <p className="mt-4 text-slate-600 font-medium leading-relaxed text-[17px]">
                {selectedCard.desc}
              </p>

              {/* FEATURES LIST */}
              <div className="mt-8 bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h4 className="text-sm font-bold uppercase tracking-widest text-[#0A2E6F] mb-4">What's Included</h4>
                <ul className="space-y-3">
                  {selectedCard.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 bg-white p-1 rounded-full text-emerald-500 shadow-sm border border-slate-100">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      <span className="text-slate-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-10 flex gap-4">
                <button
                  onClick={() => setSelectedCard(null)}
                  className="flex-1 px-6 py-4 rounded-xl border-2 border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors hidden sm:block"
                >
                  Close
                </button>
                <Link
                  href="/contact"
                  className="flex-[2] px-6 py-4 rounded-xl bg-[#0A2E6F] text-white font-bold hover:bg-[#071224] transition-colors text-center shadow-lg shadow-blue-900/20"
                >
                  Get A Free Quote
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="bg-white overflow-hidden">
        {/* HERO SECTION */}
        <section className="pt-40 pb-28 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              {/* LEFT */}
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                <h1 className="mt-6 text-5xl md:text-6xl xl:text-7xl font-black text-[#071224] tracking-tight leading-[0.95]">
                  Transform Old <br /> Spaces Into  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A2E6F] via-[#1E4ED8] to-indigo-600">Modern Masterpieces</span>
                </h1>
                <p className="mt-8 text-lg text-slate-600 leading-8 max-w-xl">
                  Whether it’s a single-room makeover or a complete residential or commercial renovation, our team delivers comprehensive renovation solutions designed to enhance functionality, aesthetics, and long-term value.
                </p>
                <div className="flex flex-wrap gap-4 mt-10">
                  <Link href="#services" className="inline-flex items-center justify-center bg-[#0A2E6F] text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-all shadow-lg shadow-blue-900/20">Explore Renovations</Link>
                  <Link href="/contact" className="inline-flex items-center justify-center border border-slate-300 px-8 py-4 rounded-full font-semibold hover:border-[#0A2E6F] hover:text-[#0A2E6F] transition-all bg-white">Get Consultation</Link>
                </div>
                <div className="flex flex-wrap gap-12 mt-14">
                  <div>
                    <h3 className="text-4xl font-black text-[#0A2E6F]">3000+</h3>
                    <p className="text-slate-500 font-medium">Renovation Projects</p>
                  </div>
                  <div>
                    <h3 className="text-4xl font-black text-[#0A2E6F]">8+ years</h3>
                    <p className="text-slate-500 font-medium">Years Experience</p>
                  </div>
                  <div>
                    <h3 className="text-4xl font-black text-[#0A2E6F]">99.12%</h3>
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
                <div className="relative h-[650px] w-full rounded-[40px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.15)] bg-slate-100">
                  
                  {/* 1. BACKGROUND IMAGE (BEFORE) - Remains on the left side */}
                  <img
                    src="/renovation/hero-before.jpg"
                    alt="Before Renovation"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* 2. FOREGROUND IMAGE (AFTER) - Remains on the right side */}
                  <motion.div
                    className="absolute inset-0 z-0"
                    initial={{ clipPath: "inset(0% 0% 0% 0%)" }} // Starts at 0% (Fully covering with After)
                    animate={{ clipPath: "inset(0% 0% 0% 50%)" }} // Animates Left-to-Right, stopping at 50%
                    transition={{ duration: 2.5, ease: "easeOut", delay: 0.5 }} // Plays one time only
                  >
                    <img
                      src="/renovation/hero-after.jpg"
                      alt="After Renovation"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* 3. ANIMATED DRAG LINE */}
                  <motion.div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.5)] z-10"
                    initial={{ left: "0%" }}
                    animate={{ left: "50%" }}
                    transition={{ duration: 2.5, ease: "easeOut", delay: 0.5 }} // Matches the image wipe perfectly
                  >
                    {/* Visual Handle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border border-slate-200">
                      <div className="flex gap-1">
                        <div className="w-0.5 h-3 bg-slate-300 rounded-full" />
                        <div className="w-0.5 h-3 bg-slate-300 rounded-full" />
                      </div>
                    </div>
                  </motion.div>

                  {/* 4. STATIC BADGES */}
                  <div className="absolute top-6 left-6 bg-red-500 text-white px-5 py-2 rounded-full font-bold text-sm z-20 shadow-lg shadow-red-500/20">
                    BEFORE
                  </div>
                  <div className="absolute top-6 right-6 bg-emerald-500 text-white px-5 py-2 rounded-full font-bold text-sm z-20 shadow-lg shadow-emerald-500/20">
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
              <span className="uppercase tracking-[4px] font-bold text-xs text-[#0A2E6F]">Our Services</span>
              <h2 className="mt-4 text-4xl md:text-5xl font-black text-[#0A1A35] tracking-tight">Complete Renovation Solutions</h2>
              <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto font-medium">From structural upgrades to aesthetic transformations, we handle every aspect of your renovation project. Click any service to learn more.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-20">
              {servicesList.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index % 4) * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  onClick={() => setSelectedCard({ ...item, type: "service" })}
                  className="bg-white rounded-[24px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-100 hover:border-[#0A2E6F]/30 transition-all duration-300 cursor-pointer group flex flex-col items-center text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-5 group-hover:bg-[#0A2E6F] group-hover:text-white transition-colors duration-300 text-[#0A2E6F]">
                    <CheckCircle2 size={26} />
                  </div>
                  <h3 className="text-xl font-bold text-[#071224] tracking-tight">{item.title}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FLOORING & FINISHES */}
        {/* FLOORING & FINISHES */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              
              <motion.div 
                initial={{ opacity: 0, x: -40 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }}
              >
                <img 
                  src="/renovation/flooring-finishes.jpg" 
                  alt="Luxury Finishes" 
                  className="w-full h-[350px] sm:h-[500px] lg:h-[750px] object-cover rounded-[32px] md:rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.08)]" 
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
                <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-black text-[#0A1A35] tracking-tight">
                  Premium Materials For Lasting Beauty
                </h2>
                <p className="mt-6 md:mt-8 text-base md:text-lg text-slate-600 leading-relaxed font-medium">
                  We use premium flooring materials and luxury finishes that enhance aesthetics while ensuring durability and structural integrity.
                </p>
                
                <div className="space-y-4 md:space-y-5 mt-8 md:mt-10">
                  {[
                    "Italian Marble Flooring", 
                    "Wooden Flooring", 
                    "Premium Tiles", 
                    "Decorative Wall Panels", 
                    "Luxury Paint Finishes", 
                    "Waterproof Solutions"
                  ].map((item) => (
                    <div key={item} className="flex gap-4 items-center p-3 rounded-xl hover:bg-slate-50 transition-colors">
                      <div className="p-1.5 rounded-full bg-blue-50 text-[#0A2E6F] shrink-0">
                        <CheckCircle2 size={20} />
                      </div>
                      <span className="font-bold text-slate-700 text-sm md:text-base">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              
            </div>
          </div>
        </section>

        {/* INFRASTRUCTURE UPGRADES */}
        <section className="py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center">
              <span className="uppercase font-bold text-xs tracking-[4px] text-[#0A2E6F]">Infrastructure Upgrades</span>
              <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-[#071224]">Comprehensive Renovation Solutions</h2>
              <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto font-medium">Tap on any infrastructure upgrade below to discover how we can completely revitalize your specific space.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-16">
              {infraList.map((item, index) => (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -5, scale: 1.02 }}
                  onClick={() => setSelectedCard({ ...item, type: "infra" })}
                  className="bg-white rounded-[20px] px-6 py-6 shadow-[0_10px_20px_rgba(0,0,0,0.02)] border border-slate-100 flex items-center gap-4 transition-all duration-300 hover:border-[#0A2E6F]/40 cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#0A2E6F] shrink-0 group-hover:bg-[#0A2E6F] group-hover:text-white transition-colors duration-300">
                    <Building2 size={20} />
                  </div>
                  <h3 className="font-bold text-[#071224] text-sm md:text-base leading-snug group-hover:text-[#0A2E6F] transition-colors">{item.title}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* BEFORE & AFTER GALLERY */}
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
                See how we transform outdated interiors into beautiful, modern and functional spaces.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-10 mt-20">
              {[
                { 
                  after: "/renovation/bedroom-before.jpg", 
                  before: "/renovation/bedroom-after.jpg", 
                  title: "Bedroom Renovation" 
                },
                { 
                  after: "/renovation/kitchen-before.jpg", 
                  before: "/renovation/kitchen-after.jpg", 
                  title: "Kitchen Remodeling" 
                },
              ].map((project, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 40 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  transition={{ delay: index * 0.2 }} 
                  viewport={{ once: true }} 
                  className="bg-slate-50 rounded-[36px] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-slate-100 group"
                >
                  {/* SINGLE IMAGE CONTAINER WITH SWIPE EFFECT */}
                  <div className="relative h-[350px] sm:h-[450px] w-full bg-slate-200 overflow-hidden">
                    
                    {/* BACKGROUND: BEFORE IMAGE */}
                    <img 
                      src={project.before} 
                      alt={`${project.title} Before`} 
                      className="absolute inset-0 w-full h-full object-cover" 
                    />
                    
                    {/* FOREGROUND: AFTER IMAGE (MASKED) */}
                    <motion.div
                      className="absolute inset-0 z-0"
                      initial={{ clipPath: "inset(0% 100% 0% 0%)" }} // Forces it to start completely hidden (line on the left)
                      animate={{
                        clipPath: [
                          "inset(0% 100% 0% 0%)", // Starts Left (After image hidden)
                          "inset(0% 0% 0% 0%)",   // Sweeps Right (After image fully revealed)
                          "inset(0% 100% 0% 0%)"  // Sweeps back Left
                        ]
                      }}
                      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                    >
                      <img 
                        src={project.after} 
                        alt={`${project.title} After`} 
                        className="absolute inset-0 w-full h-full object-cover" 
                      />
                    </motion.div>

                    {/* ANIMATED DRAG LINE */}
                    <motion.div
                    
                       
                      animate={{ left: ["0%", "100%", "0%"] }} // Infinite sweep from 0 -> 100 -> 0
                      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                    >
                    </motion.div>

                    {/* BADGES */}
                    <div className="absolute top-6 left-6 bg-red-500/90 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest shadow-lg z-20">
                      BEFORE
                    </div>
                    <div className="absolute top-6 right-6 bg-emerald-500/90 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest shadow-lg z-20">
                      AFTER
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-[#0A1A35] tracking-tight">{project.title}</h3>
                    <p className="mt-3 text-slate-500 font-medium leading-relaxed">
                      Complete transformation with premium materials, modern aesthetics and expert craftsmanship.
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
              <span className="uppercase font-bold text-xs tracking-[4px] text-[#0A2E6F]">Our Process</span>
              <h2 className="mt-4 text-4xl md:text-5xl font-black text-[#0A1A35] tracking-tight">From Vision To Reality</h2>
              <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto font-medium">Our proven renovation process ensures a smooth experience, exceptional quality and timely project completion.</p>
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
                  <motion.div key={step.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }} whileHover={{ y: -10 }} className="relative bg-white rounded-[32px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-100 text-center transition-all duration-300 hover:border-[#0A2E6F]/20">
                    <div className="w-16 h-16 rounded-2xl bg-[#0A2E6F]/10 text-[#0A2E6F] flex items-center justify-center mx-auto transition-transform duration-300 hover:scale-110"><Icon size={30} /></div>
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center font-bold text-[#0A2E6F]">{index + 1}</div>
                    <h3 className="mt-6 text-xl font-bold text-[#0A1A35]">{step.title}</h3>
                    <p className="mt-3 text-slate-500 font-medium leading-relaxed text-sm">{step.desc}</p>
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
              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <img src="/renovation/why-choose-us.jpg" alt="Renovation" className="w-full h-[650px] md:h-[750px] object-cover rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.08)]" />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <span className="uppercase font-bold text-xs tracking-[4px] text-[#0A2E6F]">Why Simmply Perfect</span>
                <h2 className="mt-4 text-4xl md:text-5xl font-black text-[#0A1A35] tracking-tight">Excellence In Every Renovation</h2>
                <p className="mt-8 text-lg text-slate-600 leading-relaxed font-medium">We combine innovative design, skilled craftsmanship and premium materials to deliver renovations that enhance beauty, functionality and long-term value.</p>
                <div className="grid grid-cols-2 gap-6 mt-12">
                  {["3000+ Projects", "8+ years Experience", "Premium Materials", "Certified Team", "On-Time Delivery", "99.12% Satisfaction"].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 size={22} className="text-emerald-500 shrink-0" />
                      <span className="font-bold text-slate-700">{item}</span>
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
              <span className="uppercase font-bold text-xs tracking-[4px] text-[#0A2E6F]">Featured Projects</span>
              <h2 className="mt-4 text-4xl md:text-5xl font-black text-[#0A1A35] tracking-tight">Renovations That Redefined Spaces</h2>
              <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto font-medium">Explore some of our most successful renovation projects, from luxury homes to premium commercial spaces.</p>
            </div>
            <div className="grid lg:grid-cols-12 gap-6 mt-20">
              <motion.div whileHover={{ scale: 1.01 }} className="lg:col-span-7 overflow-hidden rounded-[32px] shadow-md">
                <img src="/renovation/featured-1.jpg" alt="Featured Project 1" className="w-full h-[400px] lg:h-[650px] object-cover transition-transform duration-700 hover:scale-105" />
              </motion.div>
              <div className="lg:col-span-5 grid gap-6">
                <motion.div whileHover={{ scale: 1.02 }} className="overflow-hidden rounded-[32px] shadow-md">
                  <img src="/renovation/featured-2.jpg" alt="Featured Project 2" className="w-full h-[250px] lg:h-[312px] object-cover transition-transform duration-700 hover:scale-105" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} className="overflow-hidden rounded-[32px] shadow-md">
                  <img src="/renovation/featured-3.jpg" alt="Featured Project 3" className="w-full h-[250px] lg:h-[312px] object-cover transition-transform duration-700 hover:scale-105" />
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
                <div key={index} className={`border ${openFaq === index ? "border-[#0A2E6F]/30 bg-blue-50/30" : "border-slate-200/70 bg-slate-50"} rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#0A2E6F]/30 shadow-sm`}>
                  <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full flex items-center justify-between p-6 text-left focus:outline-none">
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
            <div className="absolute top-0 bottom-0 left-0 w-24 md:w-48 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-24 md:w-48 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
            <div className="flex w-max gap-8 animate-marquee hover:[animation-play-state:paused] pl-8">
              {infiniteReviews.map((item, i) => (
                <div key={`${item.name}-${i}`} className="w-[320px] md:w-[420px] shrink-0 bg-white rounded-3xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-100 relative overflow-hidden group hover:shadow-[0_20px_40px_rgba(10,46,111,0.06)] hover:border-[#0A2E6F]/20 transition-all duration-300">
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
            <motion.div {...fadeUp} className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl px-10 py-16 md:px-16 md:py-20 text-center shadow-2xl">
              <span className="inline-flex px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white font-bold text-xs tracking-[3px] uppercase">Ready To Get Started?</span>
              <h2 className="mt-6 text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">Transform Your Space With <br /> Premium Renovation Solutions</h2>
              <p className="mt-6 max-w-3xl mx-auto text-slate-300 font-medium leading-relaxed">From luxury design consultation to flawless installation, we deliver complete turn-key solutions for homes, villas, and commercial spaces.</p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="bg-white text-[#071224] px-8 py-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 hover:scale-105 shadow-xl">Get Free Consultation</Link>
                <a href="tel:+919999999999" className="border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 hover:bg-white/10">Call Now</a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}