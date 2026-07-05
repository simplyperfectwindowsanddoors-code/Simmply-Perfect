"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/home/Footer";
import CountUp from "react-countup";
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
  ShieldCheck,
  ArrowRight
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

// EXPANDED NESTED CATEGORY DATA FOR INFRASTRUCTURE
const infraCategories = [
  {
    title: "Home Renovation",
    desc: "Complete end-to-end renovations transforming your personal living spaces with comfort, luxury, and modern utility.",
    subcategories: [
      { title: "Bedroom Renovation", desc: "Transform your bedroom into a cozy, luxurious retreat.", features: ["Acoustic wall paneling", "Ambient warm lighting", "Custom wardrobe integration", "Premium flooring"] },
      { title: "Living Room Renovation", desc: "Modernize your central living space for entertainment and relaxation.", features: ["False ceiling & cove lights", "Custom TV console design", "Layered ambient lighting", "Space-optimizing layouts"] },
      { title: "Kitchen Renovation", desc: "Complete overhaul of your cooking space with smart storage.", features: ["Premium modular cabinets", "Quartz/Granite countertops", "Built-in appliance fittings", "Under-cabinet task lighting"] },
      { title: "Washroom Renovation", desc: "Upgrade to luxury bathroom fittings and flawless waterproofing.", features: ["Concealed cistern setups", "Glass shower enclosures", "Anti-skid premium tiles", "Exhaust & ventilation upgrades"] },
      { title: "Basement Conversion", desc: "Turn unused basements into functional living, gaming, or theatre spaces.", features: ["Moisture sealing & insulation", "HVAC extension", "Egress window installation", "Custom bar/entertainment setup"] },
      { title: "Home Gym Setup", desc: "Create a motivational and durable personal fitness space.", features: ["Impact-resistant rubber flooring", "Full-wall mirror installation", "Heavy equipment wall anchoring", "High-capacity ventilation"] },
      { title: "Smart Home Automation", desc: "Integrate intelligent tech seamlessly into your existing home architecture.", features: ["Centralized lighting control", "Automated blind/curtain tracks", "Voice-activated security panels", "Invisible audio wiring"] },
      { title: "Terrace & Balcony", desc: "Comprehensive waterproofing, landscaping, and custom outdoor seating.", features: ["PU grade waterproofing", "Vertical garden setup", "Custom barbeque stations", "Swing/Hammock anchor hooks"] },
    ]
  },
  {
    title: "Flat / Apartment Renovation",
    desc: "End-to-end apartment makeovers maximizing space utilization, natural light, and modern contemporary aesthetics.",
    subcategories: [
      { title: "Complete Apartment Makeover", desc: "Turnkey project execution for complete flat transformations.", features: ["End-to-end interior design", "Vastu compliance checking", "Unified aesthetic planning", "Lighting & electrical overhauls"] },
      { title: "Space Optimization", desc: "Smart layouts to make smaller apartments feel spacious and breathable.", features: ["Space-saving modular furniture", "Hidden storage/Murphy beds", "Knock-down wall planning", "Light-maximizing colors"] },
      { title: "Balcony Enclosures", desc: "Expand living space by safely integrating balconies into the main floor plan.", features: ["Weather-sealed sliding glass", "Floor leveling & matching", "Insulated roofing panels", "Integrated climate control"] },
      { title: "Open-Plan Living Conversion", desc: "Removing non-load-bearing walls to merge kitchen, dining, and living areas.", features: ["Structural beam reinforcement", "Seamless flooring transitions", "Kitchen island installation", "Zoned ceiling lighting"] }
    ]
  },
  {
    title: "Villa or Independent House Renovation",
    desc: "Structural upgrades, luxury exterior facades, landscaping, and comprehensive interior overhauls.",
    subcategories: [
      { title: "Exterior Facade Facelift", desc: "Modernizing the outward appearance and curb appeal of your property.", features: ["Weather-resistant exterior texturing", "Architectural lighting", "Gate & boundary wall styling", "Balcony extensions"] },
      { title: "Landscaping & Driveways", desc: "Upgrading your outdoor property footprint.", features: ["Paver block driveways", "Lawn & garden irrigation", "Patio deck construction", "Outdoor perimeter security"] },
      { title: "Private Pool Construction", desc: "Design and installation of luxury swimming pools and water features.", features: ["Advanced filtration plumbing", "Anti-slip pool decking", "Underwater LED lighting", "Automated temperature control"] },
      { title: "Roof Garden & Terrace", desc: "Transform flat roofs into luxury entertainment spaces.", features: ["Root-barrier waterproofing", "Pergola & canopy construction", "Outdoor kitchen utility lines", "Reinforced load distribution"] },
      { title: "Interior Structural Upgrades", desc: "Core modifications for large independent homes.", features: ["Home theatre room setups", "Smart home central automation", "Staircase redesigns", "High-capacity HVAC planning"] }
    ]
  },
  {
    title: "School Renovation",
    desc: "Creating safe, interactive, and durable learning environments with child-friendly materials and robust designs.",
    subcategories: [
      { title: "Immersive Smart Classrooms", desc: "Hardware-software integration for highly interactive and modern student learning.", features: ["Interactive smart boards", "Ergonomic student benches", "Acoustic room treatment", "Integrated AV systems"] },
      { title: "Play & Recreation Areas", desc: "Safe and durable outdoor/indoor play spaces.", features: ["Safety-first rubber flooring", "Impact-resistant wall padding", "Custom turf installation", "Vibrant thematic painting"] },
      { title: "Library & Media Center", desc: "Modernizing reading and research spaces to foster focus.", features: ["Custom modular shelving", "Quiet-zone acoustic baffles", "Reading nook seating", "Computer station wiring"] },
      { title: "Science & Computer Labs", desc: "Safe, specialized environments for technical learning.", features: ["Chemical-resistant countertops", "Fume hood ventilation", "High-capacity server racks", "Anti-static vinyl flooring"] },
      { title: "Sanitary Facilities", desc: "Hygienic and highly accessible washroom upgrades.", features: ["Touchless sensor faucets", "Anti-skid flooring", "Durable partition systems", "High-capacity ventilation"] }
    ]
  },
  {
    title: "Office Renovation",
    desc: "Ergonomic workspace designs, comprehensive network cabling, and modern aesthetics tailored for productivity.",
    subcategories: [
      { title: "Executive Cabins", desc: "Premium layouts for leadership and management.", features: ["Luxury veneer finishes", "Acoustic glass partitions", "Custom executive desks", "Ambient focus lighting"] },
      { title: "Open Workstations", desc: "Collaborative and space-optimized seating arrays.", features: ["Modular desk setups", "Concealed wire management", "Ergonomic seating", "Biophilic design integration"] },
      { title: "Meeting & Conference Rooms", desc: "Tech-enabled spaces for seamless presentations.", features: ["Acoustic wall treatments", "Integrated projector/screen mounts", "Centralized data hubs", "Smart lighting controls"] },
      { title: "Reception & Waiting Lounge", desc: "Striking entryways that define your corporate identity.", features: ["Custom branding focal walls", "Luxury visitor seating", "Digital display integration", "Premium reception desks"] },
      { title: "Breakout & Cafeteria Zones", desc: "Relaxing areas designed to recharge employees.", features: ["Commercial coffee station plumbing", "Lounge-style varied seating", "Vibrant brand-aligned colors", "Durable cafeteria flooring"] }
    ]
  },
  {
    title: "Shop Renovation",
    desc: "Eye-catching retail interiors designed to boost footfall, enhance customer experience, and showcase products beautifully.",
    subcategories: [
      { title: "Retail Display & Racking", desc: "Optimizing the visual merchandising of your products.", features: ["Custom display gondolas", "Wall-mounted slatwalls", "Glass showcase counters", "Accent product lighting"] },
      { title: "Storefront & Facade", desc: "Inviting and heavily branded entryways.", features: ["Toughened glass storefronts", "Backlit exterior signage", "Window display styling", "Automated entry doors"] },
      { title: "Point of Sale (POS) Stations", desc: "Efficient, secure, and customer-friendly checkout areas.", features: ["Ergonomic cashier counters", "Concealed POS wiring", "Queue management layouts", "Impulse-buy rack integration"] },
      { title: "Fitting & Trial Rooms", desc: "Comfortable and flattering private spaces for apparel retail.", features: ["Flattering multi-angle lighting", "Full-length security mirrors", "Heavy-duty curtain/door tracks", "Plush seating & hooks"] }
    ]
  },
  {
    title: "Cafe Renovation",
    desc: "Thematic interior styling, customized comfortable seating, and ambient lighting for the perfect dining vibe.",
    subcategories: [
      { title: "Thematic Dining Interiors", desc: "Crafting a unique aesthetic identity for your dining space.", features: ["Industrial ceiling styles", "Custom mural & wall art", "Exposed brick finishes", "Ambient pendant lighting"] },
      { title: "Commercial Kitchen Planning", desc: "Efficient back-of-house layouts for high-volume food prep.", features: ["Heavy-duty exhaust systems", "Stainless steel prep stations", "Grease trap plumbing", "Fire-safety compliance"] },
      { title: "Bar & Counter Setup", desc: "Premium focal points for beverage service.", features: ["Under-counter refrigeration spaces", "Custom liquor display shelving", "Spill-resistant countertops", "Atmospheric backlighting"] },
      { title: "Outdoor Seating / Patio", desc: "Maximizing dining space with attractive exterior setups.", features: ["Retractable weather awnings", "Outdoor space heaters/fans", "Weather-resistant furniture", "String lighting installation"] }
    ]
  },
  {
    title: "College Renovation",
    desc: "Modernizing lecture halls, auditoriums, and campus facilities for an enhanced tech-enabled educational experience.",
    subcategories: [
      { title: "Tiered Lecture Halls", desc: "Large-scale classroom overhauls.", features: ["Tiered ergonomic seating", "Centralized PA systems", "Acoustic ceiling baffles", "Smart podium installations"] },
      { title: "Lab & Research Infrastructure", desc: "Specialized environments for advanced research.", features: ["Chemical/Biological safe surfaces", "Eyewash & emergency shower plumbing", "High-voltage equipment wiring", "Clean-room ventilation"] },
      { title: "Student Lounge & Recreation", desc: "Social hubs for student collaboration and downtime.", features: ["Flexible modular seating", "Charging station hubs", "Recreation equipment zones", "Vibrant, durable flooring"] },
      { title: "Administrative Block", desc: "Professional and welcoming spaces for faculty and administration.", features: ["Secure records storage rooms", "Private faculty offices", "Welcoming counseling centers", "Efficient departmental zoning"] }
    ]
  },
  {
    title: "Hospital Renovation",
    desc: "Sanitary, hygienic, and highly accessible infrastructure upgrades completely compliant with strict medical standards.",
    subcategories: [
      { title: "Patient Wards & Rooms", desc: "Comfortable, sterile, and accessible recovery spaces.", features: ["Anti-bacterial vinyl flooring", "Medical gas pipelines", "Nurse call system wiring", "Accessible attached washrooms"] },
      { title: "Critical Care & OT", desc: "Highly regulated environments for medical procedures.", features: ["OT compliant seamless surfacing", "HEPA filter HVAC integration", "Scrub station plumbing", "Redundant power setups"] },
      { title: "Reception & Triage Areas", desc: "Efficient flow-managed entryways for patient intake.", features: ["Wheelchair accessible ramps", "Clear wayfinding signage", "Durable seating zones", "Infection-control barriers at desks"] },
      { title: "Diagnostic & Imaging Rooms", desc: "Specialized reinforced spaces for heavy medical equipment.", features: ["Lead-lined wall shielding (X-Ray)", "Heavy-load floor reinforcement", "Dedicated isolated power circuits", "Patient privacy partitions"] }
    ]
  },
  {
    title: "Convention Center Renovation",
    desc: "Advanced acoustic treatments, scalable spaces, and grand luxury lighting arrangements for large-scale venues and corporate events.",
    subcategories: [
      { title: "Main Exhibition Halls", desc: "Expansive, flexible spaces designed for heavy foot traffic and versatile setups.", features: ["Heavy-load capacity flooring", "Movable acoustic partitions", "Overhead truss rigging points", "Concealed utility floor boxes"] },
      { title: "Grand Auditoriums", desc: "High-end presentation spaces for keynote events.", features: ["Tiered ergonomic seating", "Advanced AV & acoustic baffling", "Dynamic stage lighting", "Climate-controlled zones"] },
      { title: "Pre-Function & Lobbies", desc: "Luxurious gathering and registration areas.", features: ["Digital wayfinding signage", "Statement chandeliers", "Premium stone/marble flooring", "Custom registration desks"] },
      { title: "Banquet & Catering Corridors", desc: "Backend infrastructure for large-scale hospitality.", features: ["Industrial kitchen setups", "Service elevator integration", "Hygienic prep surfaces", "Hidden waste management routing"] }
    ]
  },
  {
    title: "Hotel / Resort Renovation",
    desc: "Luxury guest room upgrades, grand lobby redesigns, and premium landscaping tailored exclusively for the hospitality industry.",
    subcategories: [
      { title: "Luxury Guest Suites", desc: "Premium makeovers for exceptional guest comfort and aesthetics.", features: ["Smart room lighting & climate control", "Bespoke custom furniture", "Premium stone bathroom fittings", "Acoustic wall insulation"] },
      { title: "Grand Reception & Lobby", desc: "Creating a stunning first impression for guests.", features: ["Statement architectural lighting", "Premium marble/granite flooring", "Bespoke concierge desks", "Integrated lounge seating"] },
      { title: "Wellness & Spa Facilities", desc: "Tranquil and hygienic environments for relaxation.", features: ["Sauna & steam room plumbing", "Ambient color-therapy lighting", "Moisture-resistant wood finishes", "Anti-skid stone flooring"] },
      { title: "Poolside & Cabana Areas", desc: "Enhancing the outdoor resort experience.", features: ["Anti-slip luxury decking", "Weather-proof pergolas", "Outdoor bar & kitchen setups", "Underwater LED lighting"] }
    ]
  },
  {
    title: "Church / Temple Renovation",
    desc: "Respectful, detailed restoration of religious spaces, focusing on intricate architectural preservation and long-term structural durability.",
    subcategories: [
      { title: "Sanctum & Altar Restoration", desc: "Preserving and enhancing the central focal point of worship.", features: ["Intricate stone/wood carving preservation", "Ambient spotlighting", "Premium marble platform work", "Humidity control systems"] },
      { title: "Congregation Seating Areas", desc: "Comfortable and acoustically sound gathering spaces.", features: ["Acoustic vaulted ceiling treatments", "Ergonomic pews or floor mats", "Silent HVAC climate control", "High-capacity durable flooring"] },
      { title: "Exterior Facade & Domes", desc: "Restoring the majestic outward appearance of heritage structures.", features: ["Weather-resistant heritage painting", "Structural dome reinforcement", "Architectural spire lighting", "Stone facade cleaning & sealing"] },
      { title: "Community & Dining Halls", desc: "Functional spaces for mass gatherings and meals.", features: ["Mass seating layouts", "Hygienic commercial kitchen routing", "Heavy-duty washable flooring", "High-capacity ventilation systems"] }
    ]
  }
];

// SHARED TYPE FOR MODAL
type SelectedItem = 
  | { type: "service"; title: string; desc: string; features: string[] }
  | { type: "infra"; title: string; desc: string; subcategories: { title: string; desc: string; features: string[] }[] };

export default function RenovationPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedCard, setSelectedCard] = useState<SelectedItem | null>(null);

  // SCROLL LOCK EFFECT
  useEffect(() => {
    if (selectedCard) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedCard]);

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
        
        /* HIDE SCROLLBAR CSS FOR MODAL */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}} />

      {/* ENHANCED MODAL POPUP */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 backdrop-blur-md"
            onClick={() => setSelectedCard(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[32px] p-6 sm:p-8 md:p-10 max-w-3xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto hide-scrollbar border border-white/20"
            >
              <button 
                onClick={() => setSelectedCard(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="flex items-center justify-between mb-6 pr-12">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 text-[#0A2E6F] shadow-inner">
                  {selectedCard.type === "service" ? <CheckCircle2 size={30} /> : <Building2 size={30} />}
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold tracking-wide border border-emerald-100">
                  <ShieldCheck size={16} /> 100% Quality Assured
                </div>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-black text-[#0A1A35] tracking-tight">
                {selectedCard.title}
              </h3>
              <p className="mt-4 text-slate-600 font-medium leading-relaxed text-[17px] border-b border-slate-100 pb-6">
                {selectedCard.desc}
              </p>

              {/* DYNAMIC LISTING BASED ON TYPE */}
              {selectedCard.type === "service" ? (
                <div className="mt-8 bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-[#0A2E6F] mb-4 flex items-center gap-2">
                    <Sparkles size={16} /> What's Included
                  </h4>
                  <ul className="space-y-4">
                    {selectedCard.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <div className="mt-1 bg-white p-1.5 rounded-full text-emerald-500 shadow-sm border border-slate-100 shrink-0">
                          <Check size={16} strokeWidth={3} />
                        </div>
                        <span className="text-slate-700 font-medium leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="mt-8 grid gap-6">
                  {selectedCard.subcategories.map((sub, i) => (
                    <div key={i} className="bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-100 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-900/5 transition-all duration-300 group">
                      <h4 className="text-xl font-bold text-[#0A1A35] flex items-center gap-2 group-hover:text-[#0A2E6F] transition-colors">
                        {sub.title}
                      </h4>
                      <p className="text-sm text-slate-500 mt-2 mb-5 font-medium leading-relaxed">{sub.desc}</p>
                      
                      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 pt-4 border-t border-slate-100/60">
                        {sub.features.map((feature, j) => (
                          <div key={j} className="flex items-start gap-3">
                            <CheckCircle2 size={16} strokeWidth={2.5} className="text-blue-500 mt-0.5 shrink-0 opacity-80" />
                            <span className="text-slate-700 text-sm font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-10 flex flex-col sm:flex-row gap-4 sticky bottom-0 bg-white/90 backdrop-blur-md py-4 border-t border-white shadow-[0_-20px_20px_-20px_rgba(0,0,0,0.05)]">
                <button
                  onClick={() => setSelectedCard(null)}
                  className="flex-1 px-6 py-4 rounded-xl border-2 border-slate-200 text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-300 transition-colors hidden sm:block"
                >
                  Close
                </button>
                <Link
                  href="/contact"
                  className="flex-[2] px-6 py-4 rounded-xl bg-gradient-to-r from-[#0A2E6F] to-blue-700 text-white font-bold hover:from-[#071224] hover:to-[#0A2E6F] transition-all text-center shadow-lg shadow-blue-900/20 hover:shadow-xl hover:shadow-blue-900/30 flex items-center justify-center gap-2 group"
                >
                  Get A Free Quote 
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
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
                  <Link href="#infrastructure" className="inline-flex items-center justify-center bg-[#0A2E6F] text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-all shadow-lg shadow-blue-900/20">Explore Renovations</Link>
                  <Link href="/contact" className="inline-flex items-center justify-center border border-slate-300 px-8 py-4 rounded-full font-semibold hover:border-[#0A2E6F] hover:text-[#0A2E6F] transition-all bg-white">Get Consultation</Link>
                </div>
                <div className="grid grid-cols-3 mt-14 sm:mt-16 py-8 rounded-[2rem] bg-white border border-slate-200/80 shadow-[0_15px_40px_rgba(0,0,0,0.04)] divide-x divide-slate-200">
                  {[
                    { value: 1000, suffix: "+", label: "PROJECTS\nDELIVERED" },
                    { value: 10, suffix: "+", label: "YEARS\nEXPERIENCE" },
                    { value: 97.57, suffix: "%", label: "CLIENT\nSATISFACTION", decimals: 2 },
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col items-center text-center justify-start px-2 sm:px-4">
                      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A2E6F] tracking-tight flex items-baseline justify-center">
                        <CountUp 
                          end={item.value} 
                          duration={3} 
                          delay={0.2} 
                          decimals={item.decimals ?? 0} 
                          enableScrollSpy 
                          scrollSpyOnce 
                          separator="," 
                        />
                        <span className="ml-0.5">{item.suffix}</span>
                      </h3>
                      <div className="w-8 h-[2px] bg-slate-300 rounded-full my-4" />
                      <p className="text-[9px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed whitespace-pre-line">
                        {item.label}
                      </p>
                    </div>
                  ))}
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
                  
                  {/* 1. BACKGROUND IMAGE (BEFORE) */}
                  <img
                    src="/renovation/hero-before.jpg"
                    alt="Before Renovation"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* 2. FOREGROUND IMAGE (AFTER) */}
                  <motion.div
                    className="absolute inset-0 z-0"
                    initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
                    animate={{ clipPath: "inset(0% 0% 0% 50%)" }}
                    transition={{ duration: 2.5, ease: "easeOut", delay: 0.5 }}
                  >
                    <img
                      src="/renovation/hero-after.jpg"
                      alt="After Renovation"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
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
                  className="bg-white rounded-[24px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-100 hover:border-[#0A2E6F]/30 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 cursor-pointer group flex flex-col items-center text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-5 group-hover:bg-[#0A2E6F] group-hover:text-white transition-colors duration-300 text-[#0A2E6F]">
                    <CheckCircle2 size={26} />
                  </div>
                  <h3 className="text-xl font-bold text-[#071224] tracking-tight group-hover:text-[#0A2E6F] transition-colors">{item.title}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

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
        <section id="infrastructure" className="py-32 bg-slate-50 relative overflow-hidden">
          {/* Decorative background blur */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center">
              <span className="uppercase font-bold text-xs tracking-[4px] text-[#0A2E6F]">Infrastructure Upgrades</span>
              <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-[#071224]">Spaces We Transform</h2>
              <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto font-medium">Tap on any core infrastructure category below to discover the specific sub-renovations we specialize in for your space.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mt-16">
              {infraCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index % 4) * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  onClick={() => setSelectedCard({ ...category, type: "infra" })}
                  className="bg-white rounded-[24px] px-8 py-8 shadow-[0_10px_20px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col transition-all duration-300 hover:border-[#0A2E6F]/30 hover:shadow-xl hover:shadow-blue-900/10 cursor-pointer group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-[#0A2E6F] mb-6 group-hover:bg-gradient-to-br group-hover:from-[#0A2E6F] group-hover:to-blue-700 group-hover:text-white transition-all duration-300 shadow-sm">
                    <Building2 size={28} />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-black text-[#071224] tracking-tight group-hover:text-[#0A2E6F] transition-colors">{category.title}</h3>
                  <p className="mt-3 text-sm text-slate-500 font-medium leading-relaxed">{category.desc}</p>
                  <div className="mt-auto pt-6 flex items-center gap-2 text-sm font-bold text-[#0A2E6F] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Explore Renovations <ArrowRight size={16} />
                  </div>
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
                  className="bg-slate-50 rounded-[36px] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-slate-100 group hover:shadow-xl hover:shadow-blue-900/5 transition-shadow duration-300"
                >
                  <div className="relative h-[350px] sm:h-[450px] w-full bg-slate-200 overflow-hidden">
                    
                    <img 
                      src={project.before} 
                      alt={`${project.title} Before`} 
                      className="absolute inset-0 w-full h-full object-cover" 
                    />
                    
                    <motion.div
                      className="absolute inset-0 z-0"
                      initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
                      animate={{
                        clipPath: [
                          "inset(0% 100% 0% 0%)",
                          "inset(0% 0% 0% 0%)", 
                          "inset(0% 100% 0% 0%)" 
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

        {/* FEATURED PROJECTS (ENHANCED BENTO GRID) */}
        <section className="py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center">
              <span className="uppercase font-bold text-xs tracking-[4px] text-[#0A2E6F]">Featured Projects</span>
              <h2 className="mt-4 text-4xl md:text-5xl font-black text-[#0A1A35] tracking-tight">Renovations That Redefined Spaces</h2>
              <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto font-medium">Explore some of our most successful renovation projects, from luxury homes to premium commercial spaces.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-20">
              
              {/* Item 1 - Large Left */}
              <motion.div whileHover={{ y: -5 }} className="md:col-span-7 overflow-hidden rounded-[32px] shadow-md cursor-pointer relative group h-[350px] lg:h-[450px]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#071224]/80 via-[#071224]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <img src="/renovation/featured-1.jpg" alt="Featured Project 1" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute bottom-0 left-0 p-8 z-20 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Bathroom Renovation</h3>
                </div>
              </motion.div>

              {/* Item 2 - Large Right */}
              <motion.div whileHover={{ y: -5 }} className="md:col-span-5 overflow-hidden rounded-[32px] shadow-md cursor-pointer relative group h-[350px] lg:h-[450px]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#071224]/80 via-[#071224]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <img src="/renovation/featured-2.jpg" alt="Featured Project 2" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute bottom-0 left-0 p-8 z-20 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Kitchen Renovation</h3>
                </div>
              </motion.div>

              {/* Item 3 - Bottom Left */}
              <motion.div whileHover={{ y: -5 }} className="md:col-span-4 overflow-hidden rounded-[32px] shadow-md cursor-pointer relative group h-[300px] lg:h-[350px]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#071224]/80 via-[#071224]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <img src="/renovation/featured-3.jpg" alt="Featured Project 3" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute bottom-0 left-0 p-6 lg:p-8 z-20 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="text-xl lg:text-2xl font-bold text-white tracking-tight">Living Room Renovation</h3>
                </div>
              </motion.div>

              {/* Item 4 - Bottom Middle */}
              <motion.div whileHover={{ y: -5 }} className="md:col-span-4 overflow-hidden rounded-[32px] shadow-md cursor-pointer relative group h-[300px] lg:h-[350px]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#071224]/80 via-[#071224]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <img src="/renovation/featured-4.jpg" alt="Featured Project 4" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute bottom-0 left-0 p-6 lg:p-8 z-20 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="text-xl lg:text-2xl font-bold text-white tracking-tight">Pooja Room Renovation</h3>
                </div>
              </motion.div>

              {/* Item 5 - Bottom Right */}
              <motion.div whileHover={{ y: -5 }} className="md:col-span-4 overflow-hidden rounded-[32px] shadow-md cursor-pointer relative group h-[300px] lg:h-[350px]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#071224]/80 via-[#071224]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <img src="/renovation/featured-5.jpg" alt="Featured Project 5" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute bottom-0 left-0 p-6 lg:p-8 z-20 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="text-xl lg:text-2xl font-bold text-white tracking-tight">Store Room Renovation</h3>
                </div>
              </motion.div>
              
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
                  {["1000+ Projects", "10+ years Experience", "Premium Materials", "Certified Team", "On-Time Delivery", "97.57% Satisfaction"].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 size={22} className="text-emerald-500 shrink-0" />
                      <span className="font-bold text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="grid sm:grid-cols-3 gap-6 mt-14">
                  <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 text-center shadow-sm hover:border-[#0A2E6F]/30 hover:shadow-md transition-all">
                    <h3 className="text-3xl font-black text-[#0A2E6F]">1000+</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Projects</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 text-center shadow-sm hover:border-[#0A2E6F]/30 hover:shadow-md transition-all">
                    <h3 className="text-3xl font-black text-[#0A2E6F]">10+ years</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Years Experience</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 text-center shadow-sm hover:border-[#0A2E6F]/30 hover:shadow-md transition-all">
                    <h3 className="text-3xl font-black text-[#0A2E6F]">97.57%</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Satisfaction</p>
                  </div>
                </div>
              </motion.div>
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
                  <motion.div key={step.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }} whileHover={{ y: -10 }} className="relative bg-white rounded-[32px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-100 text-center transition-all duration-300 hover:border-[#0A2E6F]/30 hover:shadow-xl hover:shadow-blue-900/5 group">
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#0A2E6F] flex items-center justify-center mx-auto transition-all duration-300 group-hover:scale-110 group-hover:bg-[#0A2E6F] group-hover:text-white"><Icon size={30} /></div>
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center font-bold text-[#0A2E6F] group-hover:bg-[#0A2E6F] group-hover:text-white transition-colors">{index + 1}</div>
                    <h3 className="mt-6 text-xl font-bold text-[#0A1A35]">{step.title}</h3>
                    <p className="mt-3 text-slate-500 font-medium leading-relaxed text-sm">{step.desc}</p>
                  </motion.div>
                );
              })}
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
                    <span className={`font-bold transition-colors ${openFaq === index ? "text-[#0A2E6F]" : "text-[#071224]"} pr-4`}>{faq.q}</span>
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
                <div key={`${item.name}-${i}`} className="w-[320px] md:w-[420px] shrink-0 bg-white rounded-3xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-100 relative overflow-hidden group hover:shadow-[0_20px_40px_rgba(10,46,111,0.06)] hover:border-[#0A2E6F]/20 transition-all duration-300 cursor-default">
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
                <Link href="/contact" className="bg-white text-[#071224] px-8 py-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 hover:scale-105 shadow-xl hover:bg-slate-100">Get Free Consultation</Link>
                <a href="tel:+91 93907 19623" className="border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 hover:bg-white/10">Call Now</a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}