"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  ArrowUpRight, 
  ShieldCheck, 
  PhoneCall, 
  Layers, 
  Shield, 
  PlaySquare, 
  Play, 
  Plus, 
  Quote
} from "lucide-react";

interface ServiceItem {
  title: string;
  image: string;
  videoUrl?: string;
  desc: string;
  bullets: string[];
}

// Helper to generate generic descriptions and bullets based on titles
const generateMetadata = (title: string) => {
  const isGoldenOak = title.toLowerCase().includes("golden");
  const isWhite = title.toLowerCase().includes("white");
  const hasMesh = title.toLowerCase().includes("mesh") || title.toLowerCase().includes("screen");
  
  const bullets = [];
  if (isGoldenOak) bullets.push("Premium Golden Oak Finish");
  if (isWhite) bullets.push("Pure White UV-Resistant Profile");
  if (hasMesh) bullets.push("Integrated Insect Protection");
  bullets.push("Smooth Operation Mechanism", "Weather-Sealed Durability");

  return {
    desc: `Experience the precision engineering of our ${title}. Built for superior performance, architectural elegance, and long-lasting durability.`,
    bullets: bullets.slice(0, 4)
  };
};

// SECTION 1 DATA: WORKING FUNCTIONALITY VIDEOS
const videoServices: ServiceItem[] = [
  { id: "m9_7m-sdtaI", title: "4 track Sliding Window- Golden oak" },
  { id: "FmOSK2IOK5E", title: "Bay / Bow Window - Golden oak Laminated" },
  { id: "eNVupJRg6kk", title: "Bay/Bow- White" },
  { id: "h-RI46nXhcE", title: "Casement Door- Golden oak" },
  { id: "Qhhj1-lf8HE", title: "Double Casement window- white" },
  { id: "XmwRU6tjrSM", title: "Casement double window- Golden oak Laminate" },
  { id: "r0qSP5oWjv4", title: "Double hung- white" },
  { id: "qoYT2Bkd-EE", title: "Double Hung - Golden Oak" },
  { id: "dnIQ9DHqvcg", title: "French window- Golden Oak" },
  { id: "NxL6MHN-iSQ", title: "French window- white" },
  { id: "TPoEJyk1aOs", title: "Lift and Slide- Golden oak" },
  { id: "IpG54nf7iW8", title: "Lift and Slide- White" },
  { id: "-BMB-C1IwaU", title: "Monorail -Golden Oak" },
  { id: "VxlBB6BIrUA", title: "Monorail- White" },
  { id: "Zz9Nbb1Ihcw", title: "Slide and fold- Golden Oak" },
  { id: "0xEPbos-hME", title: "Slide and fold- White" },
  { id: "pOKxk4C-6uw", title: "2-panel sliding window with sliding mesh screen" },
  { id: "z_Enx5QQZ7A", title: "3-panel sliding window- Golden Oak" },
  { id: "Ndi42G1vnmc", title: "3-panel sliding window- White" },
  { id: "oyr_4bLT9K0", title: "3-panel sliding window with insect mesh- Golden" },
  { id: "4VjYFB88G0g", title: "Top hung- Golden Oak" },
  { id: "DIa158pZojo", title: "Top hung- white" },
  { id: "cfTgUpg5Oyo", title: "Arch window- Golden Oak" },
  { id: "yRONVdOZRq0", title: "UPVC Sliding Window 90 Series" },
  { id: "4Q1Y8vBw-xo", title: "2-Track with Half-Track Sliding Screen (Mesh)- Golden Oak" },
  { id: "6nmOC203HRE", title: "Tilt and Turn Window -White" },
  { id: "ejEXw92ghtE", title: "Tilt and Turn window-Golden Oak" },
  { id: "AuxFVGbDo-Q", title: "Sliding Window- 62 Series- 2 Track, 2 Glass Panel" },
  { id: "ng4CPjgzORw", title: "Slide and Fold windows- Golden Oak by Simmply Perfect Windows & Door" },
  { id: "bz0AfsVfsNQ", title: "Slide and Fold UPVC Windows & Doors by Simmply Perfect" },
  { id: "jGQwl4S1RX8", title: "2 Track, 4 Glass Panel sliding Window - Golden Oak" },
  { id: "p_tBrlX_yM8", title: "Bay and Bow Window white" },
  { id: "OfBkkFVgwA4", title: "2 Track, 4 Glass Pannel Sliding System" },
  { id: "K4wpGqjmet4", title: "2 Track with grill Golden Oak" },
  { id: "qlt5uYDZN7Y", title: "2 Track,2 Glass pannel Golden Oak" },
  { id: "hSEjyQw4jnU", title: "2 Track, 2 Glass Panel Sliding Window with Grill" },
  { id: "4AytnZJ5lpQ", title: "UPVC Sliding Window- 2 5 Track, 2 Glass Panel with Mesh Sliding -80 Series" },
  { id: "natbuikqQPo", title: "Double Casement Window/ Door - The best UPVC Window & Door in India" },
  { id: "E0CARd1VLx0", title: "Single Casement Window/ Door - Best UPVC Window in Hyderabad" },
  { id: "soT9b6REhIE", title: "3 Track, 3 Glass Panel Sliding Window-112 Series" },
  { id: "qVhuo09OT0U", title: "2.5 Track, 2 Glass Panel with Mesh-Sliding Window-90 Series" }
].map(item => ({
  title: item.title,
  image: `https://img.youtube.com/vi/${item.id}/hqdefault.jpg`,
  videoUrl: `https://www.youtube.com/embed/${item.id}?autoplay=1`,
  ...generateMetadata(item.title)
}));

// SECTION 2 DATA: MOSQUITO MESH SYSTEMS
const meshServices: ServiceItem[] = [
  {
    title: "Pleated Sliding Mesh Doors",
    image: "/services/pleated-mesh.jpg",
    desc: "Premium zig-zag pleated polyester mosquito mesh models featuring specialized space-saving track slide functions for high-traffic doors.",
    bullets: ["Polyester Pleated Fabrics", "Low Profile Floor Tracks", "Smooth Frictionless Sliding", "Dust Resistant Surface Finish", "Aluminium Frame Profiles", "Wind-Resistant Retainers"]
  },
  {
    title: "Velcro & Magnetic Mesh Sheets",
    image: "/services/magnetic-mesh.jpg",
    desc: "Cost-effective, highly flexible detach-and-wash mosquito protection sheets engineered beautifully for standard wooden and UPVC frames.",
    bullets: ["Fiberglass Net Core Compositions", "Heavy Duty Premium Velcro Strips", "Magnetic Self-Sealing Profiles", "Tool-Free Setup Options", "High Transmittance Visibility", "Easy Thermal Water Wash"]
  },
  {
    title: "Aluminium Roller Mesh Windows",
    image: "/services/roller-mesh.jpg",
    desc: "Immaculate roll-up cassette flyscreen configurations fitted seamlessly into window linings to provide on-demand insect protection criteria.",
    bullets: ["Spring Loaded Braking Systems", "Vertical Pull Down Cassettes", "Side Brush Buffering Tracks", "Phifer Fiberglass Mesh Inlays", "Powder Coated Casings", "Automatic Retraction Controls"]
  },
  {
    title: "Solid Stainless Steel Mesh Doors",
    image: "/services/ss-mesh.jpg",
    desc: "Ultra-tough security grade stainless steel wire meshes that provide structural anti-theft break-in protection while filtering mosquitos cleanly.",
    bullets: ["SS 304 High-Tensile Wire Net", "Claw-Proof Pet Resistant Core", "Heavy Aluminium Outer Casts", "Anti-Corrosion Black Finishes", "Rigid Tamper-Proof Fasteners", "Dual Purpose Safety Screens"]
  }
];

// SECTION 3 DATA: GENERAL COMPREHENSIVE SERVICES
const standardServices: ServiceItem[] = [
  {
    title: "Window & Door Repairs",
    image: "/services/repair.jpg",
    desc: "Comprehensive repair solutions for all types of residential and commercial windows, doors, glass systems, grills, hardware, and accessories.",
    bullets: ["Sliding Window Repairs", "Casement Window Repairs", "UPVC & Aluminium", "Hardware Replacements"]
  },
  {
    title: "Window & Door Cleaning",
    image: "/services/cleaning.jpg",
    desc: "Professional deep cleaning services that restore the appearance of windows, doors, glass, grills, frames, tracks, and accessories.",
    bullets: ["Glass Cleaning", "Sliding Track Maintenance", "Hard Water Stain Removal", "Deep Interior/Exterior Cleaning"]
  },
  {
    title: "Painting & Polishing",
    image: "/services/painting.jpg",
    desc: "Premium painting, polishing, coating, and finishing services for wooden, steel, aluminium, and architectural surfaces.",
    bullets: ["Wooden Door Polishing", "PU & Melamine Polish", "Anti-Rust Coating", "Weatherproof Exterior Finish"]
  },
  {
    title: "Extraction & Renovation",
    image: "/services/extraction.jpg",
    desc: "Safe dismantling, removal, renovation, remodeling, and replacement services for existing doors, windows, and interior structures.",
    bullets: ["Old Structure Extraction", "Structural Modifications", "Wall Alterations", "Complete Home Renovation"]
  },
  {
    title: "Glass Installation & Repairs",
    image: "/services/glass-repair.jpg",
    desc: "Professional installation and repair services for residential and commercial glass systems, including safety, decorative, and architectural glazing.",
    bullets: [
      "Toughened Glass Installation",
      "Glass Partition Repairs",
      "Shower Enclosure Glass",
      "Reflective & Tinted Glass"
    ]
  },
  {
    title: "Window Installation",
    image: "/services/window-installation.jpg",
    desc: "Expert installation of premium uPVC, aluminium, and glass windows designed for superior performance, durability, and modern aesthetics.",
    bullets: [
      "uPVC Window Installation",
      "Aluminium Window Installation",
      "Sliding & Casement Windows",
      "Custom Window Solutions"
    ]
  },
];

// EXPANDED FAQ DATA
const faqData = [
  { q: "How long does a complete window/door installation take?", a: "Depending on the project scope, most residential installations are completed within 1-3 days once manufacturing is finished." },
  { q: "What is UPVC and why is it better than traditional materials?", a: "UPVC (Unplasticized Polyvinyl Chloride) is a highly durable, low-maintenance material that offers superior thermal insulation, soundproofing, and resistance to weather and termites compared to traditional wood or standard aluminum." },
  { q: "Do you repair existing windows and mesh systems?", a: "Yes, we provide comprehensive repair services including roller replacement, track fixing, glass replacement, and mesh patching." },
  { q: "Are your mosquito mesh solutions washable?", a: "Yes, our velcro and magnetic mesh sheets are fully detachable and easily washable. Our pleated meshes can be cleaned with a light vacuum or soft brush." },
  { q: "Can you customize the glass type for the windows?", a: "Yes, we offer a variety of glass options including toughened, laminated, tinted, frosted, and double-glazed units for enhanced security, privacy, and energy efficiency." },
  { q: "Can you customize the color of the window frames?", a: "Absolutely. We offer a wide range of powder-coated, anodized, and wood-grain finish options, including our popular Golden Oak laminate, for UPVC and Aluminium profiles." },
  { q: "Do you handle civil work during renovations?", a: "Yes, our turnkey extraction and renovation services cover necessary civil alterations, wall cutting, plastering, and finishing." },
  { q: "How do I maintain and clean my new sliding windows?", a: "Maintenance is simple. Wipe the frames with a mild detergent and water. For the tracks, use a vacuum to remove dust and a damp cloth to wipe them down periodically to ensure frictionless sliding." },
  { q: "Do you provide post-installation support?", a: "Absolutely. We offer dedicated after-sales support and maintenance services to ensure your windows, doors, and mesh systems function perfectly for years." },
  { q: "Is there a warranty on your installations?", a: "We provide comprehensive warranties on structural integrity, hardware performance, and installation quality for up to 10 years, depending on the material and system." }
];

// EXPANDED REVIEWS DATA
const reviewsData = [
  { name: "Priya Menon", role: "Apartment Owner", review: "The mosquito mesh installation was flawless. The pleated design looks incredibly premium, completely blocks insects, and folds away invisibly when not needed." },
  { name: "Rahul Verma", role: "Villa Owner", review: "Excellent repair service. They fixed my massive sliding balcony doors that had been stuck for months. Replaced the bearings, and it works like brand new now!" },
  { name: "Rajesh Khanna", role: "Architect", review: "I've partnered with them for multiple residential projects. Their attention to detail on the 4-track sliding systems and custom arch windows is unmatched in the industry." },
  { name: "Sanjay Gupta", role: "Homeowner", review: "Loved the tilt & turn windows! The video demonstration gallery helped me choose exactly what I needed for proper ventilation. Fantastic execution." },
  { name: "Meera Singh", role: "Homeowner", review: "The slide and fold doors completely transformed our living room balcony! The golden oak finish looks exactly like real wood but without any of the maintenance hassle." },
  { name: "Anita Sharma", role: "Interior Designer", review: "Consistently top-notch quality on all structural and glass installations. A highly reliable team that strictly adheres to deadlines and aesthetic specifications." },
  { name: "Anil K.", role: "Business Owner", review: "Replaced all our office windows with their double-glazed tilt and turn units. The noise reduction from the busy street outside is simply incredible. Highly recommended." },
  { name: "Vikram Reddy", role: "Homeowner", review: "The extraction of our old wooden windows and installation of new UPVC ones was done seamlessly with zero mess. The civil work was handled perfectly." },
  { name: "Sneha Reddy", role: "Property Manager", review: "Very professional team. They extracted old rusted steel windows and installed sleek white UPVC monorail sliders in just two days without damaging any interior walls." },
  { name: "Kiran Desai", role: "Office Manager", review: "The roller mesh systems are so convenient. The team was highly professional, transparent with pricing, and finished the job well ahead of schedule." }
];
const infiniteReviews = [...reviewsData, ...reviewsData, ...reviewsData];


// --- VIDEO GRID COMPONENT ---
function VideoGrid({ data, onSelectItem }: { data: ServiceItem[], onSelectItem: (item: ServiceItem) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {data.map((item, idx) => (
        <div 
          key={idx}
          onClick={() => onSelectItem(item)}
          className="group cursor-pointer flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-red-600/90 backdrop-blur-md flex items-center justify-center text-white shadow-lg border border-red-500/50 scale-90 group-hover:scale-100 transition-all duration-300">
                <Play fill="currentColor" size={24} className="ml-1" />
              </div>
            </div>
          </div>
          <div className="p-4 flex flex-col flex-1">
            <h3 className="text-[15px] font-bold text-slate-800 group-hover:text-red-600 leading-snug line-clamp-2 transition-colors">
              {item.title}
            </h3>
            <p className="text-xs text-slate-500 mt-2 line-clamp-2 font-medium">
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// --- UPGRADED CAROUSEL ROW COMPONENT ---
interface CarouselRowProps {
  data: ServiceItem[];
  onSelectItem: (item: ServiceItem) => void;
}

function CarouselRow({ data, onSelectItem }: CarouselRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const animationRef = useRef<number | null>(null);
  const isHovered = useRef(false);
  const dragDistance = useRef(0);

  const REPEAT_COUNT = 6;
  const extendedData = Array(REPEAT_COUNT).fill(data).flat();

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const timeoutId = setTimeout(() => {
      if (container) {
        const singleSetWidth = container.scrollWidth / REPEAT_COUNT;
        container.scrollLeft = singleSetWidth * 2;
      }
    }, 150);

    const continuousScrollUpdate = () => {
      if (!isDown.current && !isHovered.current && container) {
        const singleSetWidth = container.scrollWidth / REPEAT_COUNT;
        container.scrollLeft += 1.2; 
        
        if (container.scrollLeft >= singleSetWidth * 3) {
          container.scrollLeft = singleSetWidth * 2;
        } else if (container.scrollLeft <= singleSetWidth) {
          container.scrollLeft = singleSetWidth * 2;
        }
      }
      animationRef.current = requestAnimationFrame(continuousScrollUpdate);
    };

    animationRef.current = requestAnimationFrame(continuousScrollUpdate);
    return () => { 
      if (animationRef.current) cancelAnimationFrame(animationRef.current); 
      clearTimeout(timeoutId);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    isDown.current = true;
    dragDistance.current = 0;
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeft.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const currentWalkDistance = (x - startX.current) * 1.5;
    dragDistance.current = Math.abs(x - startX.current);
    scrollContainerRef.current.scrollLeft = scrollLeft.current - currentWalkDistance;

    const singleSetWidth = scrollContainerRef.current.scrollWidth / REPEAT_COUNT;
    if (scrollContainerRef.current.scrollLeft >= singleSetWidth * 4) {
      scrollContainerRef.current.scrollLeft = singleSetWidth * 2;
      startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
      scrollLeft.current = scrollContainerRef.current.scrollLeft;
    } else if (scrollContainerRef.current.scrollLeft <= singleSetWidth) {
      scrollContainerRef.current.scrollLeft = singleSetWidth * 3;
      startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
      scrollLeft.current = scrollContainerRef.current.scrollLeft;
    }
  };

  const handleMouseLeaveOrUp = (item?: ServiceItem) => {
    if (!isDown.current) return;
    isDown.current = false;
    if (item && dragDistance.current < 6) {
      onSelectItem(item);
    }
  };

  return (
    <div 
      ref={scrollContainerRef}
      onMouseEnter={() => { isHovered.current = true; }}
      onMouseLeave={() => { isHovered.current = false; handleMouseLeaveOrUp(); }}
      onMouseDown={handleMouseDown}
      onMouseUp={() => handleMouseLeaveOrUp()}
      onMouseMove={handleMouseMove}
      className="mt-8 flex overflow-x-auto scrollbar-none cursor-grab active:cursor-grabbing py-4 select-none whitespace-nowrap"
      style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
    >
      <div className="flex flex-nowrap">
        {extendedData.map((item, idx) => (
          <div
            key={`${item.title}-${idx}`}
            onMouseUp={() => handleMouseLeaveOrUp(item)}
            className="mx-4 w-[350px] inline-block flex flex-col group/card pointer-events-auto shrink-0"
          >
            <div className="relative h-[240px] w-full rounded-3xl overflow-hidden border border-slate-200/80 bg-slate-100 shadow-sm transition-all duration-500 group-hover/card:-translate-y-2 group-hover/card:shadow-xl">
              <img src={item.image || '/services/placeholder-window.jpg'} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-[#0A2E6F] flex items-center justify-center shadow-lg border border-slate-100 opacity-0 scale-90 group-hover/card:opacity-100 group-hover/card:scale-100 transition-all duration-300">
                <ArrowUpRight size={16} className="stroke-[2.5]" />
              </div>
            </div>
            <div className="mt-4 text-center px-4 whitespace-normal">
              <h3 className="text-xl font-black text-slate-800 group-hover/card:text-[#0A2E6F] transition-colors duration-200 tracking-tight leading-snug">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedService]);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 16px)); }
        }
        .animate-marquee {
          animation: scroll-marquee 45s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />

      <section className="py-24 sm:py-32 bg-[#FAFBFD] relative overflow-visible antialiased text-slate-900 select-none">
        
        {/* HEADER SECTION */}
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#071224] tracking-tight leading-none">
              Complete Architectural Solutions
            </h2>
            <p className="max-w-3xl mx-auto text-slate-500 leading-relaxed text-sm sm:text-base font-light">
              From high-transmittance flyscreens to turnkey spatial interiors and dynamic window systems, we manage every engineering specification under one elite umbrella.
            </p>
          </div>
        </div>

        {/* SECTION 1: WORKING FUNCTIONALITY VIDEOS */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <div className="flex flex-col items-center text-center pb-6 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-lg border border-red-500"><PlaySquare size={20} /></div>
            <div className="space-y-1">
              <h4 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Functionality Showcases</h4>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto font-medium">Browse our extensive gallery of real-time video demonstrations for our premium architectural systems.</p>
            </div>
          </div>
          <VideoGrid data={videoServices} onSelectItem={setSelectedService} />
        </div>

        {/* SECTION 2: MOSQUITO MESH SYSTEMS */}
        <div className="max-w-7xl mx-auto px-6 pt-32">
          <div className="flex flex-col items-center text-center pb-6 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0A2E6F] text-white flex items-center justify-center shadow-lg border border-[#082456]"><Shield size={20} /></div>
            <div className="space-y-1">
              <h4 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight"> Mosquito Mesh Systems</h4>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto font-medium">High-durability insect protection screens custom-fitted seamlessly for luxury window and door frames.</p>
            </div>
          </div>
          <CarouselRow data={meshServices} onSelectItem={setSelectedService} />
        </div>

        {/* SECTION 3: COMPREHENSIVE ARCHITECTURAL SERVICES */}
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-8">
          <div className="flex flex-col items-center text-center pb-6 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg border border-blue-500"><Layers size={20} /></div>
            <div className="space-y-1">
              <h4 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight"> Our Services</h4>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto font-medium">End-to-end indoor masterplanning, comprehensive site renovations, maintenance, and expert installations.</p>
            </div>
          </div>
          <CarouselRow data={standardServices} onSelectItem={setSelectedService} />
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 lg:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="uppercase tracking-[3px] text-sm font-semibold text-[#0A2E6F]">Got Questions?</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-[#071224]">Frequently Asked Questions</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {faqData.map((faq, i) => (
              <div key={i} className="group bg-white rounded-2xl p-6 md:p-8 hover:bg-blue-50/50 transition-colors border border-slate-200 hover:border-blue-100 shadow-sm flex flex-col justify-start">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-lg font-bold text-[#071224] leading-snug">{faq.q}</h3>
                  <div className="bg-slate-50 rounded-full p-1.5 shrink-0 text-slate-400 group-hover:text-[#0A2E6F] shadow-sm"><Plus size={18} /></div>
                </div>
                <p className="mt-3 text-slate-600 leading-relaxed text-sm md:text-base pr-8">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section className="py-24 lg:py-32 bg-white overflow-hidden border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <span className="uppercase tracking-[3px] text-sm font-semibold text-[#0A2E6F]">Client Testimonials</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-[#071224]">What Our Clients Say</h2>
        </div>
        
        <div className="relative w-full overflow-hidden">
          <div className="absolute top-0 bottom-0 left-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <div className="flex w-max gap-8 animate-marquee pl-8">
            {infiniteReviews.map((item, i) => (
              <div key={i} className="w-[320px] md:w-[420px] shrink-0 bg-slate-50 rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                <Quote className="absolute top-6 right-6 text-white w-24 h-24 -z-0 rotate-12 transition-transform duration-500 group-hover:rotate-0 group-hover:text-blue-50/50" />
                <div className="relative z-10">
                  <div className="text-amber-400 text-lg tracking-widest flex gap-1">★★★★★</div>
                  <p className="mt-6 text-slate-700 leading-relaxed font-medium italic text-[15px]">"{item.review}"</p>
                  <div className="mt-8 pt-6 border-t border-slate-200/60">
                    <h4 className="font-bold text-[#071224]">{item.name}</h4>
                    <p className="text-sm text-slate-500">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL - YOUTUBE IFRAMES & COMPACT INFO */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 20 }}
              transition={{ type: "spring", damping: 28, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white w-full max-w-3xl rounded-2xl shadow-[0_30px_90px_-15px_rgba(0,0,0,0.5)] overflow-hidden z-10 flex flex-col max-h-[90vh] md:max-h-[85vh]"
            >
              
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedService(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-950/50 hover:bg-slate-950 text-white/90 hover:text-white flex items-center justify-center transition-colors shadow-lg border border-white/10 z-30 backdrop-blur-md"
              >
                <X size={16} />
              </motion.button>

              {/* MEDIA HERO */}
              <div className="w-full bg-black relative shrink-0 aspect-video flex items-center justify-center overflow-hidden">
                {selectedService.videoUrl ? (
                  selectedService.videoUrl.includes('youtube.com') ? (
                    <iframe 
                      src={selectedService.videoUrl} 
                      title={selectedService.title}
                      className="absolute inset-0 w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video
                      className="absolute inset-0 w-full h-full object-contain bg-black"
                      src={selectedService.videoUrl}
                      autoPlay loop muted playsInline
                    />
                  )
                ) : (
                  <img src={selectedService.image} alt={selectedService.title} className="w-full h-full object-cover opacity-90 object-center absolute inset-0" />
                )}
              </div>

              {/* BOTTOM COMPACT INFO DECK */}
              <div className="w-full p-4 sm:p-5 flex flex-col sm:flex-row gap-4 overflow-y-auto bg-slate-50 border-t border-slate-200/50 items-start">
                
                <div className="sm:w-3/5 flex flex-col pr-2">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                    {selectedService.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] sm:text-sm text-slate-600 font-medium leading-relaxed">
                    {selectedService.desc}
                  </p>
                </div>

                <div className="sm:w-2/5 w-full flex flex-col border-t sm:border-t-0 sm:border-l border-slate-200/80 pt-4 sm:pt-0 sm:pl-5">
                  <div className="grid grid-cols-1 gap-1.5">
                    {selectedService.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <ShieldCheck size={14} className="text-[#0A2E6F] shrink-0" />
                        <span className="text-[11px] sm:text-xs font-bold text-slate-700 leading-tight">{bullet}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/contact"
                    onClick={() => setSelectedService(null)}
                    className="mt-4 bg-[#0A2E6F] hover:bg-[#072456] text-white py-2.5 rounded-lg font-bold text-[11px] sm:text-xs tracking-widest uppercase shadow-md transition-all flex items-center justify-center gap-2 group w-full"
                  >
                    <PhoneCall size={14} className="group-hover:scale-105 transition-transform" />
                    <span>Inquire Now</span>
                  </Link>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}