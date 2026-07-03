"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/home/Footer";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { 
  Star,
  ArrowRight, 
  Calendar, 
  Clock3,  
  Sparkles, 
  ChevronDown, 
  Building2, 
  X, 
  ShieldCheck,
  HelpCircle,
  ArrowUpRight,
  PhoneCall
} from "lucide-react";

/* ------------------------------------------------ */
/* TYPES & INTERFACES */
/* ------------------------------------------------ */

interface Article {
  title: string;
  category: string;
  image: string;
  date: string;
  summary: string;
  fullScope?: string[];
  comparisonTable?: {
    headers: string[];
    rows: string[][];
  };
  time?: string;
  readTime?: string;
  excerpt?: string;
  description?: string;
}

/* ------------------------------------------------ */
/* MOTION ANIMATION DEFINITIONS */
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
  whileInView: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardAnimation = {
  initial: { opacity: 0, y: 25 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: {
    duration: 0.6,
    ease: [0.16, 1, 0.3, 1],
  } satisfies Transition,
};

/* ------------------------------------------------ */
/* DATA SOURCES */
/* ------------------------------------------------ */

const featuredArticle: Article = {
  title: "The Architecture of Light: Managing Thermal Break Profiles in Luxury Glazing",
  description: "An in-depth technical analysis on how premium multi-sliding insulated uPVC systems and structural aluminum glazing protect architectural configurations from heavy windloads, moisture bleeding, and acoustic degradation.",
  image: "/articles/featured-glazing.jpg",
  date: "July 03, 2026",
  readTime: "9 min read",
  category: "Engineering Log",
  summary: "This comprehensive structural diagnostic outline focuses on identifying the root causes of boundary insulation failures across ultra-luxury glass systems. By isolating thermal transmission vectors through mechanical profile breaks, modern frameworks balance internal space conditions flawlessly.",
  fullScope: [
    "Convective Cavity Multi-Chamber Insulation Matrices",
    "Double-Layer Structural Low-E Glazing Configurations",
    "Acoustic Degradation Prevention Frameworks",
    "High Windload Frame Structural Reinforcements",
    "EPDM Compound Rubber Seal Gasket Configurations",
    "Parametric Deflection Tolerance Analysis Under Peak Pressure",
    "Capillary Moisture Drainage Profiles & Anti-Bleeding Valves",
    "Anti-Tamper Multi-Point Heavy Locking Gear Interlocks"
  ]
};

const articlesData: Article[] = [
  {
    title: "Difference Between Tinted Glass and Reflective Glass",
    category: "Windows & Doors",
    image: "/articles/tinted-vs-reflective.jpg",
    date: "July 03, 2026",
    time: "6 min read",
    excerpt: "Understanding the core differences in thermal absorption, visible light transmittance, and solar control between tinted and metallic reflective glass.",
    summary: "Tinted glass absorbs solar energy to reduce glare and heat, offering a subtle aesthetic color change. Reflective glass, conversely, utilizes a metallic oxide sputter coating to act as a mirror, actively bouncing solar radiation away. This provides superior thermal insulation and enhanced daytime privacy compared to standard tinted variants.",
    comparisonTable: {
      headers: ["Parameter", "Tinted Glass", "Reflective Glass"],
      rows: [
        ["Thermal Mechanism", "Absorbs solar heat", "Reflects solar radiation"],
        ["Daytime Privacy", "Low to Moderate", "High (Mirror effect outside)"],
        ["Glare Reduction", "High", "High"],
        ["Interior Lighting", "Subtly darkened depending on tint", "Significantly reduced natural light"],
        ["Ideal Deployment", "Moderate climates, aesthetic matching", "Direct sun, high-exposure facades"]
      ]
    },
    fullScope: [
      "Solar Heat Gain Coefficient (SHGC) Evaluation",
      "Visible Light Transmittance (VLT) Ratings",
      "Metallic Oxide Sputter Coating Mechanics",
      "Polymer Tinting Heat Absorption Dynamics"
    ]
  },
  {
    title: "When to Choose Tinted vs. Reflective Glass for UPVC Windows",
    category: "Buying Guides",
    image: "/articles/tinted-reflective-guide.jpg",
    date: "July 02, 2026",
    time: "7 min read",
    excerpt: "A practical guide on selecting the right glazing formulation based on climate, facade exposure, and daytime privacy requirements.",
    summary: "Opt for tinted glass in moderate climates where reducing glare and achieving a specific architectural aesthetic are the primary goals. Choose reflective glass for high-exposure facades facing direct sunlight; its metallic coating aggressively repels heat, drastically lowers HVAC loads, and ensures complete daytime privacy from the outside.",
    fullScope: [
      "Direct Sun High-Exposure Mitigation Strategies",
      "Moderate Climate Glare Reduction Tactics",
      "Daytime Privacy Requirement Scaling",
      "HVAC Energy Consumption Reduction Metrics",
      "Building Facade Aesthetic Color Matching",
      "Nighttime Internal Reflection Considerations"
    ]
  },
  {
    title: "Difference Between UPVC Sliding Window and Casement Window",
    category: "Windows & Doors",
    image: "/articles/sliding-vs-casement.jpg",
    date: "July 01, 2026",
    time: "8 min read",
    excerpt: "A mechanical and spatial comparison of track-guided horizontal slider systems versus compression-sealed hinged casement formulations.",
    summary: "Casement windows operate on side hinges and compress tightly against EPDM seals, offering 100% ventilation and unmatched acoustic and thermal insulation. Sliding windows move horizontally on tracks, maximizing space efficiency with ~50% ventilation, making them the ideal choice for tight structural envelopes like balconies.",
    comparisonTable: {
      headers: ["Specification", "UPVC Sliding Window", "UPVC Casement Window"],
      rows: [
        ["Operation Mechanism", "Horizontal glide on nylon rollers", "Side/Top hinged opening"],
        ["Ventilation Capacity", "50% max opening", "100% full opening"],
        ["Acoustic/Thermal Seal", "Standard brush weather stripping", "EPDM continuous compression seal"],
        ["Space Efficiency", "Zero external/internal clearance needed", "Requires swing radius clearance"],
        ["Ideal Application", "Balconies, tight walkways, partitions", "Bedrooms, living rooms, main facades"]
      ]
    }
  },
  {
    title: "Material Breakdown: Nylon, Glass Fiber, SS-304, & Zinc-Coated SS-304",
    category: "Buying Guides",
    image: "/articles/mesh-materials.jpg",
    date: "June 29, 2026",
    time: "9 min read",
    excerpt: "Analyzing tensile strength, UV resistance, and anti-corrosion properties across our premium mosquito and security mesh options.",
    summary: "Nylon offers flexible cost-efficiency, while Glass Fiber provides UV-stabilized longevity. SS-304 (Stainless Steel) delivers extreme high-tensile, claw-proof security. Upgrading to SS-304 coated with Zinc adds an impenetrable zero-oxidation layer, ensuring absolute rust resistance even in highly corrosive coastal environments.",
    comparisonTable: {
      headers: ["Mesh Material", "Tensile Strength", "Pet/Claw Proof", "Corrosion Resistance", "Primary Use Case"],
      rows: [
        ["Nylon", "Low", "No", "N/A (Non-metal)", "Budget temporary fixes"],
        ["Glass Fiber", "Moderate", "No", "N/A (Non-metal)", "Standard residential bug protection"],
        ["SS-304", "Extreme", "Yes", "High", "Security & severe pet environments"],
        ["Zinc-Coated SS-304", "Extreme", "Yes", "Absolute (Zero-Oxidation)", "Coastal & highly corrosive zones"]
      ]
    }
  },
  {
    title: "Why Choose Simmply Perfect for Your Next Project?",
    category: "Corporate Log",
    image: "/services/interiors.jpg",
    date: "June 27, 2026",
    time: "5 min read",
    excerpt: "Discover the foundational principles of single-point accountability and precision engineering that drive our architectural success.",
    summary: "Choosing Simmply Perfect means eliminating project fragmentation. We manage everything end-to-end—from initial parametric design to final factory-direct installation—ensuring complete accountability, strict milestone adherence, and uncompromising structural integrity without reliance on third-party contractors.",
    fullScope: [
      "Single-Umbrella Turnkey Accountability Protocols",
      "Elimination of Third-Party Contractor Fragmentation",
      "Certified Engineering & Laboratory Grade Testing",
      "Strict Timeline Milestone Clearance Tracking",
      "Cross-Disciplinary Integration (Civil, MEP, Glazing)",
      "Dedicated Lifetime Structural Handover Support"
    ]
  },
  {
    title: "How Simmply Perfect Products are Unique",
    category: "Corporate Log",
    image: "/services/iron-gates.jpg",
    date: "June 25, 2026",
    time: "6 min read",
    excerpt: "An inside look at our proprietary material formulations, multi-chamber uPVC profiles, and heavy steel fabrication tolerances.",
    summary: "Our products stand out through rigorous material science. From proprietary multi-chamber uPVC profiles reinforced with structural aluminum to our zinc-chromate treated heavy steel, every component is factory-engineered to exceed standard market tolerances for extreme longevity and zero-maintenance performance.",
    fullScope: [
      "Proprietary High-Tolerance Component Formulations",
      "Convective Cavity Multi-Chamber uPVC Profiling",
      "Zinc-Treated Zero-Oxidation Heavy Steel",
      "Frictionless Heavy-Duty Tracking Hardware",
      "Autodesk Moldflow Optimized Profile Walls",
      "Bespoke Parametric Design Flexibility"
    ]
  },
  {
    title: "Advantages of Buying from Simmply Perfect",
    category: "Corporate Log",
    image: "/services/painting.jpg",
    date: "June 22, 2026",
    time: "7 min read",
    excerpt: "Review the direct benefits of our factory-direct supply chain, guaranteed fixed pricing, and comprehensive lifetime structural support models.",
    summary: "Clients gain access to premium architectural solutions at factory-direct pricing without intermediary markups. Our guaranteed fixed-budget contracts protect against hidden cost overruns, while our 5S controlled assembly methods and lifetime structural support guarantee peace of mind long after project handover.",
    fullScope: [
      "Factory-Direct Pricing & Supply Chain Control",
      "Zero Cost-Overrun Fixed Fiscal Budgeting",
      "Rigorous 5S Controlled Workspace Assembly",
      "Comprehensive Warranty and Lifetime Support",
      "Transparent Material Grading and Sourcing",
      "Dedicated Post-Installation Maintenance Crews"
    ]
  }
];

const corporateNews = [
  {
    title: "Simmply Perfect Reaches 3000+ Completed Project Milestone",
    desc: "Solidifying our operational authority market metrics across premium residential and turn-key development configurations with a verified 4.9★ satisfaction ranking.",
    tag: "Milestone Log"
  },
  {
    title: "Aakaash Deep Shrivastava Joins as Managing Technical Director",
    desc: "Deploying 8+ years of macro polymer processing, injection molding matrix diagnostics, and Autodesk Moldflow optimization into our custom profile lines.",
    tag: "Leadership Executive"
  },
  {
    title: "Launch of Custom Structural Steel & Pergola Fabrication Unit",
    desc: "Unlocking advanced parametric design architectures for outdoor architectural sheds, polycarbonate weather shelters, and heavy mild steel safety locks.",
    tag: "Infrastructure Expansion"
  }
];

const faqsData = [
  {
    q: "Why choose Simmply Perfect over standard contractors?",
    a: "We offer single-point accountability, meaning zero fragmentation between designers, fabricators, and installers. Our certified engineering crews handle site parameters end-to-end, utilizing proprietary high-tolerance materials. This factory-direct approach guarantees fixed pricing, unyielding quality control, and lifetime structural support.",
  },
  {
    q: "When should I use Tinted vs. Reflective glass for my uPVC windows?",
    a: "Use Tinted Glass when you want to absorb moderate heat, reduce glare, and achieve a specific aesthetic color for your facade without highly mirroring the outside. Opt for Reflective Glass in high-exposure, direct-sunlight zones. Its metallic coating bounces solar energy away, offering superior thermal insulation and excellent daytime privacy.",
  },
  {
    q: "What is the practical difference between Casement and Sliding uPVC windows?",
    a: "Casement windows operate on side hinges, sealing via compression against EPDM rubber gaskets. This offers 100% ventilation and the highest tier of sound and heat insulation. Sliding windows operate on horizontal tracks, saving internal room space. While they only offer ~50% ventilation and use standard brush seals, they are perfect for spatially constrained areas like balconies or tight passages.",
  },
  {
    q: "How do Nylon, Glass Fiber, SS-304, and Zinc-coated meshes differ?",
    a: "Nylon is cost-effective and flexible but prone to tearing. Glass Fiber is the industry standard—UV stabilized and highly durable for regular mosquito protection. SS-304 (Stainless Steel) provides extreme tensile strength, making it completely rat, pet, and claw-proof. Finally, SS-304 coated with Zinc adds a robust anti-oxidation layer, ensuring absolute zero-rust performance even in highly corrosive coastal environments.",
  }
];

const reviews = [
  { name: "Rajesh Kumar", role: "Villa Owner", text: "Outstanding workmanship. The windows completely transformed our home and the installation was flawless." },
  { name: "Anjali Sharma", role: "Interior Designer", text: "Excellent quality, timely delivery and an extremely professional team." },
  { name: "Vivek Reddy", role: "Architect", text: "The aluminium systems are premium quality. Highly recommended for luxury residences." },
  { name: "Suresh Patel", role: "Business Owner", text: "Fantastic renovation work. Everything was completed exactly as promised." },
  { name: "Kiran Rao", role: "Apartment Owner", text: "Very happy with the mosquito mesh systems. Smooth operation and premium finish." },
  { name: "Rahul Verma", role: "Builder", text: "Professional execution with exceptional attention to detail." },
  { name: "Sneha Gupta", role: "Homeowner", text: "Beautiful interiors and excellent customer support throughout the project." },
  { name: "Ashok Reddy", role: "Commercial Client", text: "Their team handled our office renovation with outstanding quality." }
];

export default function ArticlesPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedArticle]);

  return (
    <>
      <Navbar />

      <main className="bg-[#FAFBFD] text-slate-900 overflow-hidden antialiased">
        
        {/* ASYMMETRICAL SPLIT-GRID HERO SECTION */}
        <section className="relative pt-44 pb-24 bg-gradient-to-b from-slate-50 via-white to-transparent">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_100%)]" />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              
              {/* LEFT INTEL NARRATIVE */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                className="lg:col-span-7 space-y-2"
              >
                <h1 className="text-5xl md:text-6xl xl:text-7xl font-black text-[#071224] tracking-tight leading-[0.95]">
                  Insights, Inspiration <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A2E6F] via-[#1E4ED8] to-indigo-600">
                    & Tech Logic
                  </span>
                </h1>

                <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-xl font-medium">
                  Explore our comprehensive indices cataloging state-of-the-art polymer processing, metallurgical anti-corrosion treat systems, and multi-residential architectural layout controls.
                </p>

                <div className="flex flex-wrap sm:flex-nowrap gap-4 pt-2">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                    <Link
                      href="/contact"
                      className="group w-full bg-[#0A2E6F] hover:bg-[#072456] text-white px-8 py-4 rounded-2xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(10,46,111,0.15)] shadow-blue-500/5 transition-all duration-300"
                    >
                      Connect With Tech Advisor
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>

              {/* RIGHT HERO IMAGERY GRID */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96, x: 30 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                className="lg:col-span-5 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0A2E6F]/10 to-transparent rounded-[32px] pointer-events-none z-10" />
                <img
                  src="/articles/hero.jpg"
                  alt="Simmply Perfect Architectural Frameworks"
                  className="w-full h-[450px] sm:h-[500px] lg:h-[650px] object-cover rounded-[32px] border border-slate-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* FEATURED STORY DESK PANEL */}
        <section className="py-24 bg-white border-b border-slate-200/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center space-y-2 mb-16">
              <span className="text-xs font-black uppercase tracking-widest text-[#0A2E6F]">Primary Editorial</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Featured Architectural Analysis</h2>
            </div>

            <motion.div {...smoothFadeUp} className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-6 relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 group">
                <img src="/articles/featured-glazing.jpg" alt={featuredArticle.title} className="w-full h-[380px] sm:h-[450px] object-cover" />
              </div>

              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-black uppercase tracking-widest text-[#0A2E6F] bg-[#0A2E6F]/5 px-3 py-1.5 rounded-lg border border-[#0A2E6F]/10 shadow-inner inline-block">
                  {featuredArticle.category}
                </span>

                <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
                  {featuredArticle.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-light">
                  {featuredArticle.description}
                </p>

                <div className="flex items-center gap-6 text-xs text-slate-400 font-bold border-t border-slate-100 pt-5">
                  <span className="flex items-center gap-2"><Calendar size={15} /> {featuredArticle.date}</span>
                  <span className="flex items-center gap-2"><Clock3 size={15} /> {featuredArticle.readTime}</span>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={() => setSelectedArticle(featuredArticle)}
                    className="inline-flex items-center gap-2 bg-[#0A2E6F] hover:bg-[#072456] text-white px-6 py-3.5 rounded-xl font-bold text-xs tracking-widest uppercase shadow-md transition-all group"
                  >
                    <span>Analyze Full Scope</span>
                    <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* DYNAMIC SPECIFICATIONS JOURNAL GRID */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            
            <div className="text-center space-y-2 mb-16">
              <span className="text-xs font-black uppercase tracking-widest text-[#0A2E6F]">Research Archives</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Synchronized Technical Logs</h2>
            </div>

            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              {articlesData.map((article, index) => (
                <motion.article
                  key={index}
                  variants={cardAnimation}
                  whileHover={{ y: -6 }}
                  onClick={() => setSelectedArticle(article)}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div className="space-y-6">
                    <div className="h-56 overflow-hidden relative border-b border-slate-100 bg-slate-100">
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="px-6 sm:px-8 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#0A2E6F]">{article.category}</span>
                        <Sparkles size={14} className="text-blue-500" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900 tracking-tight line-clamp-2 leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-bold shrink-0">
                    <div className="flex gap-4">
                      <span className="flex items-center gap-1.5"><Calendar size={14} /> {article.date}</span>
                      <span className="flex items-center gap-1.5"><Clock3 size={14} /> {article.time}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[#0A2E6F] font-black group uppercase text-[10px] tracking-widest">
                      <span>Review Specs</span>
                      <ArrowRight size={12} className="transform group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </motion.article>
              ))}
            </motion.div>

          </div>
        </section>

        {/* CORPORATE SYSTEM UPDATES PANEL */}
        <section className="py-24 bg-gradient-to-b from-slate-900 to-[#071224] text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 text-blue-400 border border-white/5 text-xs font-bold uppercase tracking-widest">
                <Building2 size={14} />
                <span>Simmply Perfect Press Log</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">Latest Corporate Metrics & News</h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mt-16">
              {corporateNews.map((news, i) => (
                <motion.div
                  key={i}
                  variants={cardAnimation}
                  initial="initial"
                  whileInView="whileInView"
                  viewport={{ once: true }}
                  className="bg-white/[0.02] border border-white/[0.06] backdrop-blur-md rounded-2xl p-8 flex flex-col justify-between h-64 shadow-inner"
                >
                  <div className="space-y-4">
                    <span className="text-[9px] uppercase tracking-widest bg-blue-500/10 text-blue-300 font-black px-2 py-1 rounded border border-blue-500/20 w-max block">
                      {news.tag}
                    </span>
                    <h3 className="text-xl font-bold text-slate-100 tracking-tight leading-snug">
                      {news.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      {news.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SUCCESS STORIES: CASE PORTFOLIO GALLERY */}
        <section className="py-24 bg-white border-b border-slate-200/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center space-y-2 mb-16">
              <span className="text-xs font-black uppercase tracking-widest text-[#0A2E6F]">Featured Case Manifests</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Recent Success Stories</h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {[
                { name: "Luxury Villa Structural Glazing Transformation", tag: "Fenestration Log", img: "/articles/luxury-villa.jpg" },
                { name: "Complete Turnkey Apartment Restructuring", tag: "Whole Remodel", img: "/articles/apartment-renovation.jpg" },
                { name: "Premium Executive Workspace Fitout", tag: "Interior System", img: "/articles/office-fitout.jpg" }
              ].map((proj, idx) => (
                <motion.div
                  key={idx}
                  variants={cardAnimation}
                  initial="initial"
                  whileInView="whileInView"
                  viewport={{ once: true }}
                  className="relative h-[420px] rounded-[2rem] overflow-hidden group border border-slate-100"
                >
                  <img src={proj.img} alt={proj.name} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-101 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10" />
                  
                  <div className="absolute bottom-8 inset-x-8 text-white z-20 space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 block">{proj.tag}</span>
                      <h3 className="text-xl font-black tracking-tight leading-tight">{proj.name}</h3>
                    </div>
                    <Link href="/contact" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-200 group-hover:text-white transition-colors">
                      <span>View Specifications</span>
                      <ArrowUpRight size={14} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* INTERACTIVE SPECIFICATION FAQ TECH COMPONENT */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center space-y-2 mb-16">
              <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#0A2E6F]">
                <HelpCircle size={14} /> Technical Parameters FAQ
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Everything You Need To Know</h2>
            </div>

            <div className="space-y-3.5">
              {faqsData.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <motion.div 
                    key={idx}
                    variants={cardAnimation}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                    className={`rounded-2xl border transition-all duration-300 ${
                      isOpen ? "bg-slate-50/80 border-slate-300/80 shadow-md shadow-slate-100" : "bg-white border-slate-200/60"
                    }`}
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-6 sm:p-7 text-left font-bold text-slate-900 focus:outline-none"
                    >
                      <span className="text-base sm:text-lg tracking-tight pr-4">{faq.q}</span>
                      <div className={`w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200/40 text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-180 bg-[#0A2E6F] text-white border-[#0A2E6F]" : ""}`}>
                        <ChevronDown size={16} />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 sm:px-7 pb-7 text-xs sm:text-sm text-slate-500 leading-relaxed font-light font-sans border-t border-slate-200/40 pt-4">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* PREMIUM INFINITE REVIEWS */}
        <section className="py-24 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 text-center mb-16">
            <span className="text-xs font-black uppercase tracking-[0.35em] text-[#0A2E6F]">
              CUSTOMER REVIEWS
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Trusted By Thousands
            </h2>
            <p className="mt-5 max-w-2xl mx-auto text-slate-500 leading-relaxed">
              Every project reflects our commitment to quality, precision,
              craftsmanship and customer satisfaction.
            </p>
          </div>

          <div className="relative">
            {/* Left Fade */}
            <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-[#FAFBFD] via-[#FAFBFD] to-transparent z-20 pointer-events-none" />
            
            {/* Right Fade */}
            <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[#FAFBFD] via-[#FAFBFD] to-transparent z-20 pointer-events-none" />

            <motion.div
              className="flex gap-5 w-max"
              animate={{
                x: ["0%", "-50%"],
              }}
              transition={{
                duration: 55,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...reviews, ...reviews].map((review, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -6,
                    scale: 1.03,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="w-[300px] h-[235px] shrink-0 rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Stars */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>

                  {/* Review */}
                  <p className="text-sm leading-6 text-slate-600 italic line-clamp-4">
                    &quot;{review.text}&quot;
                  </p>

                  {/* Customer */}
                  <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0A2E6F] to-blue-500 text-white flex items-center justify-center font-black text-base shrink-0">
                      {review.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-slate-900 truncate">
                        {review.name}
                      </h4>
                      <p className="text-xs text-slate-500 truncate">
                        {review.role}
                      </p>
                      <span className="inline-flex items-center mt-2 rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-bold text-green-700">
                        ✓ Verified Customer
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* COMPACT PREMIUM CTA */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div
              {...smoothFadeUp}
              className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-[#071224] via-[#0A2E6F] to-[#123C8F] px-8 py-10 md:px-14 md:py-12"
            >
              {/* Background Accent */}
              <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-blue-400/20 blur-3xl" />
              
              <div className="relative flex flex-col lg:flex-row items-center justify-between gap-10">
                {/* Left Content */}
                <div className="max-w-2xl">
                  <span className="inline-flex items-center gap-2 text-blue-200 text-xs font-bold uppercase tracking-[0.25em]">
                    <Sparkles size={13} />
                    Expert Consultation
                  </span>
                  <h2 className="mt-4 text-3xl md:text-4xl font-black leading-tight text-white">
                    Let&apos;s Build Your
                    <span className="block text-blue-200">
                      Perfect Space.
                    </span>
                  </h2>
                  <p className="mt-4 text-sm md:text-base leading-relaxed text-slate-300">
                    Planning a new home, premium interiors, uPVC windows & doors,
                    or a complete renovation? Our specialists are ready to guide
                    you with the right solutions.
                  </p>
                </div>
                
                {/* Right Button */}
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-3 rounded-2xl bg-white px-7 py-4 text-sm font-bold uppercase tracking-wider text-[#071224] shadow-xl transition-all hover:bg-slate-100"
                  >
                    Contact for Consultation
                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
        
        <Footer />
      </main>

      {/* DYNAMIC POPUP MODAL ARCHITECTURE MODULE */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-hidden">
            
            {/* Dark Mask Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-xl"
            />

            {/* Modal Canvas Structural Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 25 }}
              transition={{ type: "spring", damping: 28, stiffness: 210 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white max-w-5xl w-full rounded-[2.5rem] sm:rounded-[3.5rem] shadow-[0_35px_90px_-15px_rgba(0,0,0,0.3)] border border-slate-100 z-10 flex flex-col md:flex-row h-full md:h-[650px] overflow-hidden"
            >
              
              {/* Close Button Trigger */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-5 right-5 w-11 h-11 rounded-full bg-slate-100 hover:bg-slate-900 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-slate-200/60 shadow-md z-30"
              >
                <X size={18} />
              </button>

              {/* LEFT COLUMN PANEL: CINEMATIC IMAGE PANEL */}
              <div className="w-full md:w-[40%] bg-slate-950 h-44 md:h-full relative overflow-hidden shrink-0">
                <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover opacity-90 object-center absolute inset-0" />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 hidden md:block space-y-1">
                  <span className="text-[9px] font-black uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded w-max block">{selectedArticle.category}</span>
                  <div className="flex gap-4 text-[11px] text-slate-300 font-bold pt-1">
                    <span className="flex items-center gap-1"><Calendar size={13} /> {selectedArticle.date}</span>
                    <span className="flex items-center gap-1"><Clock3 size={13} /> {selectedArticle.time || selectedArticle.readTime}</span>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN PANEL: SCROLLBAR HIDDEN DENSE DETAILS CONSOLE */}
              <div className="w-full md:w-[60%] p-8 sm:p-10 md:p-12 flex flex-col justify-between overflow-hidden bg-white">
                
                {/* Scroll container cleanly isolated with standard track rules hidden via scrollbar-none */}
                <div className="overflow-y-auto pr-1 scrollbar-none flex-1 select-text space-y-6">
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex text-[9px] font-black uppercase tracking-widest text-[#0A2E6F] bg-[#0A2E6F]/5 px-2.5 py-1 rounded-md border border-[#0A2E6F]/10 shadow-inner">
                        Corporate Core Engineering Log
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                      {selectedArticle.title}
                    </h3>
                  </div>

                  <div className="space-y-3 border-l-2 border-[#0A2E6F]/20 pl-4 py-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Executive Abstract</span>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                      {selectedArticle.summary || selectedArticle.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Extended Technical Analysis Summary</span>
                    <p className="text-xs text-slate-500 leading-relaxed font-light">
                      Every production component requires strict material parameter tracking loops to guarantee tolerance standards are achieved flawlessly. Under the stewardship of our technical director teams, our processes map worst-case scenarios, stackup profiles, and polymer flow ratios using state-of-the-art laboratory testing metrics before full asset handovers.
                    </p>
                  </div>

                  {/* COMPARISON TABLE RENDERING (Conditional) */}
                  {selectedArticle.comparisonTable && (
                    <div className="pt-4 border-t border-slate-100 space-y-3">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <ShieldCheck size={14} className="text-[#0A2E6F]" />
                        Comparison Matrix
                      </h4>
                      
                      <div className="overflow-x-auto rounded-xl border border-slate-200/60 shadow-sm">
                        <table className="w-full text-left text-xs whitespace-nowrap">
                          <thead className="bg-slate-50/80 border-b border-slate-200/60 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                            <tr>
                              {selectedArticle.comparisonTable.headers.map((header, idx) => (
                                <th key={idx} className="px-4 py-3">{header}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {selectedArticle.comparisonTable.rows.map((row, rowIdx) => (
                              <tr key={rowIdx} className="hover:bg-slate-50/50 transition-colors">
                                {row.map((cell, cellIdx) => (
                                  <td 
                                    key={cellIdx} 
                                    className={`px-4 py-3 ${cellIdx === 0 ? "font-bold text-slate-700" : "text-slate-600"}`}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* HIGH-DENSITY PARAMETRIC BLUEPRINT MATRIX (Bullets) */}
                  {selectedArticle.fullScope && (
                    <div className="pt-4 border-t border-slate-100 space-y-3">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <Sparkles size={14} className="text-[#0A2E6F]" />
                        Full Parametric Capability Index
                      </h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedArticle.fullScope.map((bullet, idx) => (
                          <div key={idx} className="flex items-center gap-2.5 py-2.5 px-3.5 rounded-xl bg-slate-50 border border-slate-200/40 hover:bg-slate-50/50 transition-colors">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0A2E6F]/50 shrink-0" />
                            <span className="text-[11px] font-bold leading-tight text-slate-700 tracking-tight truncate" title={bullet}>
                              {bullet}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* MODAL BOTTOM ACTION ROW FOOTER */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex gap-3 shrink-0">
                  <Link
                    href="/contact"
                    onClick={() => setSelectedArticle(null)}
                    className="flex-1 bg-[#0A2E6F] hover:bg-[#072456] text-white py-4 rounded-xl font-bold text-xs tracking-widest uppercase shadow-xl transition-all flex items-center justify-center gap-2 group"
                  >
                    <PhoneCall size={14} className="group-hover:scale-105 transition-transform" />
                    <span>Contact Us</span>
                  </Link>

                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="flex-1 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 py-4 rounded-xl font-bold text-xs tracking-widest uppercase transition-colors"
                  >
                    Close
                  </button>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}