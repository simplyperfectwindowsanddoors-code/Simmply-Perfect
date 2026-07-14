"use client";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, Quote, Plus } from "lucide-react";
import CountUp from "react-countup";

// --- ANIMATION VARIANTS ---
const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: {
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1] as const,
  },
};

const fadeLeft = {
  initial: { opacity: 0, x: -60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: {
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1] as const,
  },
};

const fadeRight = {
  initial: { opacity: 0, x: 60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: {
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1] as const,
  },
};

// --- ENHANCED DATA FOR CARDS AND POPUPS ---
const interiorServices = [
  {
    title: "Modular Kitchens",
    image: "/interiors/modular-kitchen/cover.jpg",
    desc: "Elegant kitchen spaces designed for functionality, comfort and modern living.",
    fullDesc:
      "Transform the heart of your home with our bespoke modular kitchens. We focus on ergonomic layouts, smart storage optimization, and premium finishes to create a space that is as beautiful as it is functional.",
    features: [
      "Custom Cabinetry & Storage",
      "Premium Quartz/Granite Countertops",
      "Soft-Close Hinges & Channels",
      "Built-In Appliance Integration",
      "Ambient & Task Lighting",
      "Moisture-Resistant Materials",
    ],
    gallery: [
      "/interiors/modular-kitchen/1.jpg",
      "/interiors/modular-kitchen/2.jpg",
      "/interiors/modular-kitchen/3.jpg",
      "/interiors/modular-kitchen/4.jpg",
    ],
  },
  {
    title: "Luxury Wardrobes",
    image: "/interiors/wardrobes/cover.jpg",
    desc: "Premium wardrobe solutions with smart storage and luxurious finishes.",
    fullDesc:
      "Experience the luxury of perfectly organized spaces. Our custom wardrobes and walk-in closets are designed to maximize storage while adding a touch of elegance to your bedroom.",
    features: [
      "Walk-in Closet Designs",
      "Sliding & Hinged Doors",
      "Integrated Sensor Lighting",
      "Custom Drawer Compartments",
      "Premium Glass & Wood Finishes",
      "Space Optimization",
    ],
    gallery: [
      "/interiors/wardrobes/1.jpg",
      "/interiors/wardrobes/2.jpg",
      "/interiors/wardrobes/3.jpg",
      "/interiors/wardrobes/4.jpg",
    ],
  },
  {
    title: "Living Room Designs",
    // Random Unsplash image for cover visibility
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600",
    desc: "Beautiful living spaces tailored around your lifestyle and personality.",
    fullDesc:
      "Your living room is the showcase of your home. We design captivating spaces that balance comfort, entertainment, and striking aesthetic appeal, perfectly tailored to your lifestyle.",
    features: [
      "Custom TV Units",
      "Designer Accent Walls",
      "Bespoke Furniture Selection",
      "Layered Lighting Solutions",
      "Curated Art & Decor",
      "Acoustic Planning",
    ],
    gallery: [
      "/interiors/living-room/1.jpg",
      "/interiors/living-room/2.jpg",
      "/interiors/living-room/3.jpg",
      "/interiors/living-room/4.jpg",
    ],
  },
  {
    title: "False Ceilings",
    image: "/interiors/false-ceiling/cover.jpg",
    desc: "Modern ceiling concepts integrated with elegant lighting systems.",
    fullDesc:
      "Elevate your interiors literally from the top down. Our modern false ceiling designs hide wiring, improve room acoustics, and provide the perfect canvas for stunning architectural lighting.",
    features: [
      "Concealed Cove Lighting",
      "Gypsum & Plaster Designs",
      "Wooden Ceiling Planks",
      "Drop & Multi-level Ceilings",
      "Acoustic Insulation",
      "Seamless Finish",
    ],
    gallery: [
      "/interiors/false-ceiling/1.jpg",
      "/interiors/false-ceiling/2.jpg",
      "/interiors/false-ceiling/3.jpg",
      "/interiors/false-ceiling/4.jpg",
    ],
  },
  {
    title: "Bedroom Interiors",
    image: "/interiors/bedroom/cover.jpg",
    desc: "Luxury bedrooms designed for comfort, relaxation and sophistication.",
    fullDesc:
      "Turn your bedroom into a personal sanctuary. We specialize in creating serene, luxurious, and highly comfortable bedroom environments that promote relaxation and peace.",
    features: [
      "Custom Bed & Headboards",
      "Ambient Mood Lighting",
      "Premium Wall Textures",
      "Integrated Side Tables",
      "Luxury Window Treatments",
      "Ergonomic Space Planning",
    ],
    gallery: [
      "/interiors/bedroom/1.jpg",
      "/interiors/bedroom/2.jpg",
      "/interiors/bedroom/3.jpg",
      "/interiors/bedroom/4.jpg",
    ],
  },
  {
    title: "Home Office Spaces",
    image: "/interiors/home-office/cover.jpg",
    desc: "Productive and stylish workspaces designed for modern professionals.",
    fullDesc:
      "Boost your productivity with a dedicated home office that blends seamlessly into your home. We design ergonomic, quiet, and inspiring workspaces tailored for focus.",
    features: [
      "Ergonomic Custom Desks",
      "Built-in Bookshelves",
      "Optimal Task Lighting",
      "Hidden Cable Management",
      "Acoustic Wall Panels",
      "Inspiring Color Palettes",
    ],
    gallery: [
      "/interiors/home-office/1.jpg",
      "/interiors/home-office/2.jpg",
      "/interiors/home-office/3.jpg",
      "/interiors/home-office/4.jpg",
    ],
  },
];

// --- EXTENDED FAQS ---
const faqData = [
  { q: "How long does a complete interior project take?", a: "Depending on the project scope, most interior projects take between 4 to 12 weeks from design approval to completion." },
  { q: "Do you provide 3D designs before execution?", a: "Yes. We create detailed 3D visualizations to help you visualize the final outcome before work begins." },
  { q: "Can I customize materials and finishes?", a: "Absolutely. We offer a wide range of laminates, veneers, finishes, colors and premium materials to match your style." },
  { q: "Do you provide turnkey interior solutions?", a: "Yes. We handle everything from design and planning to execution, installation, and final styling." },
  { q: "What is your payment structure?", a: "We follow a milestone-based payment structure. A booking amount starts the design process, followed by staged payments during execution." },
  { q: "Can you work within my specific budget?", a: "Yes, we tailor our designs and material recommendations to align with your financial expectations without compromising quality." },
  { q: "Do you offer any warranty on the interiors?", a: "We provide a comprehensive warranty on all our woodwork, hardware, and structural executions for up to 5-10 years depending on the materials chosen." },
  { q: "Will you handle civil and structural changes?", a: "Yes, our turnkey services cover civil alterations, plumbing, electrical rerouting, and false ceilings as required by the new design." }
];

// --- EXTENDED REVIEWS FOR INFINITE SCROLL ---
const reviewsData = [
  { name: "Ravi Kumar", role: "Villa Owner", review: "The team transformed our house into a luxurious living space. Every detail was thoughtfully designed and executed." },
  { name: "Anjali Sharma", role: "Homeowner", review: "From the modular kitchen to the bedroom interiors, everything exceeded our expectations in both quality and finish." },
  { name: "Vikram Reddy", role: "Apartment Owner", review: "Professional, creative and highly reliable. The final result looked exactly like the 3D design we were promised." },
  { name: "Priya Desai", role: "Penthouse Owner", review: "They perfectly captured the modern minimalist vibe I wanted. The space feels incredibly premium and airy." },
  { name: "Rahul Mehta", role: "Homeowner", review: "On-time delivery and fantastic craftsmanship! The custom wardrobes and lighting setup completely elevated our home." },
  { name: "Sneha Kapoor", role: "Duplex Owner", review: "Great attention to detail and excellent project management. We didn't have to worry about a thing during execution." },
  { name: "Amit Singh", role: "Homeowner", review: "The 3D renders were exactly what was delivered. The finish on the modular kitchen is absolute perfection." },
  { name: "Neha Joshi", role: "Villa Owner", review: "Highly recommend! They managed everything from civil work to final styling seamlessly and stress-free." },
];
// Double the array to create a seamless infinite loop
const infiniteReviews = [...reviewsData, ...reviewsData];


// --- REUSABLE DRAGGABLE CAROUSEL ---
function DraggableCarousel({
  items,
  onItemClick,
}: {
  items: typeof interiorServices;
  onItemClick: (item: any) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);

  const extendedItems = [...items, ...items];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    let animationId: number;

    const scroll = () => {
      if (!isHovered && !isDragging) {
        container.scrollLeft += 1;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isHovered, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragDistance(0);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    setDragDistance(Math.abs(walk));
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleClick = (e: React.MouseEvent, item: any) => {
    if (dragDistance > 10) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onItemClick(item);
  };

  return (
    <div
      ref={scrollRef}
      className="flex gap-6 md:gap-8 overflow-x-auto px-6 cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
    >
      {extendedItems.map((item, index) => (
        <div
          key={`${item.title}-${index}`}
          onClick={(e) => handleClick(e, item)}
          className="group w-[320px] md:w-[400px] shrink-0 bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-200 transition-all duration-500 flex flex-col select-none"
        >
          <div className="h-[240px] overflow-hidden relative">
            <img
              src={item.image}
              alt={item.title}
              draggable={false}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl font-bold text-[#071224]">{item.title}</h3>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed flex-1">
              {item.desc}
            </p>
            <div className="mt-6 flex items-center gap-2 text-[#0A2E6F] text-sm font-bold tracking-wide uppercase group-hover:text-blue-500 transition-colors">
              Explore Details <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---
export default function InteriorsPage() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }, []);

  useEffect(() => {
    const body = document.body;
    if (selectedService || fullscreenImage) {
      const scrollY = window.scrollY;
      body.dataset.scrollY = scrollY.toString();
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
      body.style.overflow = "hidden";
    } else {
      const scrollY = Number(body.dataset.scrollY || 0);
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "";
      window.scrollTo({ top: scrollY, left: 0, behavior: "instant" });
    }
  }, [selectedService, fullscreenImage]);

  return (
    <>
      <Navbar />

      {/* Add global styles for the infinite marquee animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 16px)); } /* 16px to offset half the 32px gap */
        }
        .animate-marquee {
          animation: scroll-marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />

      <main className="bg-white overflow-hidden selection:bg-[#0A2E6F] selection:text-white">
        
        {/* HERO SECTION */}
        <section className="relative pt-40 pb-28 bg-slate-50/50">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[120px] -z-10" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-100/40 rounded-full blur-[100px] -z-10" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
              <motion.div {...fadeLeft}>
                
                <h1 className="mt-8 text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-[#071224]">
                  Spaces Designed
                  <br />
                  Around Your
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A2E6F] to-cyan-600">Lifestyle</span>
                </h1>
                <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
                  We create luxurious interiors that blend functionality, elegance and modern design. From modular kitchens to complete home transformations, every detail is crafted to perfection.
                </p>
                <div className="flex flex-wrap gap-4 mt-10">
  <Link
    href="#designs"
    className="w-56 flex items-center justify-center bg-[#0A2E6F] text-white px-8 py-4 rounded-full font-semibold shadow-lg shadow-blue-900/20 hover:shadow-xl hover:bg-blue-900 hover:-translate-y-0.5 transition-all duration-300"
  >
    Explore Designs
  </Link>

  <Link
    href="/contact"
    className="w-56 flex items-center justify-center bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-full font-semibold shadow-sm hover:border-[#0A2E6F] hover:text-[#0A2E6F] hover:-translate-y-0.5 transition-all duration-300"
  >
    Book Consultation
  </Link>
</div>
                <div className="grid grid-cols-3 mt-14 sm:mt-16 py-8 rounded-[2rem] bg-white border border-slate-200/80 shadow-[0_15px_40px_rgba(0,0,0,0.04)] divide-x divide-slate-200">
  {[
    { value:1200, suffix: "+", label: "PROJECTS\nDELIVERED" },
    { value: 10, suffix: "+", label: "YEARS\nEXPERIENCE" },
    { value: 98.2, suffix: "%", label: "CLIENT\nSATISFACTION", decimals: 2 },
  ].map((item, index) => (
    <div key={index} className="flex flex-col items-center text-center justify-start px-2 sm:px-4">
      <h3 className="text-3xl sm:text-2xl lg:text-3xl font-black text-[#1A2E6F] tracking-tight flex items-baseline justify-center">
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

              {/* FLOATING HERO GRAPHIC */}
              <motion.div {...fadeRight} className="relative mt-10 lg:mt-0">
                <div className="relative h-[550px] lg:h-[650px] rounded-[2.5rem] overflow-hidden shadow-2xl">
                  {/* Changed hero image to Unsplash so the main page image is visible */}
                  <motion.img
  src="/interiors/hero.jpg"
  alt="Luxury Interior Design"
  className="w-full h-full object-cover"
  animate={{
    scale: [1, 1.03, 1],
    y: [0, -10, 0],
  }}
  transition={{
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut",
  }}
/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* INTERIOR SERVICES SLIDER */}
        <section id="designs" className="py-24 lg:py-32 bg-white overflow-visible relative">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div {...fadeUp} className="text-center">
              <span className="uppercase tracking-[3px] text-sm font-semibold text-[#0A2E6F]">
                Interior Solutions
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-[#071224]">
                Complete Interior Services
              </h2>
              <p className="mt-5 text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
                Beautifully crafted interiors designed around functionality, comfort and luxury living.
              </p>
            </motion.div>
          </div>

          {/* CAROUSEL CONTEXT */}
          <div className="mt-16 overflow-hidden relative">
            <DraggableCarousel items={interiorServices} onItemClick={setSelectedService} />
          </div>
        </section>

        {/* MODAL / POPUP FOR SERVICES */}
        {selectedService && (
          <div
            className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            onClick={() => {
              setSelectedService(null);
              setFullscreenImage(null);
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl max-h-[95vh] flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setSelectedService(null);
                  setFullscreenImage(null);
                }}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-800 flex items-center justify-center text-lg z-20 transition-colors shadow-sm"
                aria-label="Close"
              >
                ✕
              </button>

              <div className="overflow-y-auto w-full">
                {/* HERO - Clickable for Fullscreen */}
                <div 
                  className="relative h-[240px] shrink-0 cursor-pointer group"
                  onClick={() => setFullscreenImage(selectedService.image)}
                  title="Click to view full image"
                >
                  <img
                    src={selectedService.image}
                    alt={selectedService.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
                  <div className="absolute bottom-5 left-5 md:bottom-6 md:left-6 pointer-events-none">
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                      {selectedService.title}
                    </h2>
                  </div>
                  {/* Subtle expand icon overlay */}
                  <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-md p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <Plus className="text-white w-5 h-5" />
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-5 md:p-8">
                  <div>
                    <h3 className="text-lg font-bold text-[#0A2E6F] mb-3">Overview</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {selectedService.fullDesc}
                    </p>
                  </div>

                  {/* FEATURES */}
                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-[#0A2E6F] mb-4">Design Features</h3>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {selectedService.features.map((feature: string) => (
                        <div key={feature} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50 hover:border-blue-200 transition-colors">
                          <CheckCircle2 size={18} className="text-green-600 flex-shrink-0" />
                          <span className="text-sm font-medium text-slate-700 leading-tight">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* GALLERY - Images are clickable */}
                  {selectedService.gallery && selectedService.gallery.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-lg font-bold text-[#0A2E6F] mb-4">Design Inspiration</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedService.gallery.map((img: string, i: number) => (
                          <div 
                            key={i} 
                            className="rounded-xl overflow-hidden border border-slate-200 group cursor-pointer relative"
                            onClick={() => setFullscreenImage(img)}
                          >
                            <img
                              src={img}
                              alt={`${selectedService.title} Idea ${i + 1}`}
                              className="w-full h-32 md:h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                <Plus className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md w-8 h-8" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ACTIONS */}
                  <div className="mt-10 flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/contact"
                      className="flex-1 bg-[#0A2E6F] hover:bg-blue-900 text-white px-6 py-3 rounded-xl font-semibold text-sm text-center transition-colors shadow-sm"
                    >
                      Contact Us
                    </Link>
                    <button
                      onClick={() => {
                        setSelectedService(null);
                        setFullscreenImage(null);
                      }}
                      className="flex-1 border border-slate-300 hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
                    >
                      Close Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FULLSCREEN IMAGE LIGHTBOX */}
        {fullscreenImage && (
          <div
            className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setFullscreenImage(null)}
          >
            {/* Close Button for Lightbox */}
            <button
              onClick={() => setFullscreenImage(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center text-xl z-50 transition-colors cursor-pointer"
              aria-label="Close fullscreen"
            >
              ✕
            </button>
            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              src={fullscreenImage}
              alt="Fullscreen View"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()} // Prevent clicking the image from closing it immediately
            />
          </div>
        )}

        {/* LUXURY LIVING */}
        <section className="py-24 lg:py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <motion.div {...fadeLeft} className="order-2 lg:order-1 relative group">
                <div className="absolute inset-0 bg-[#0A2E6F] rounded-[2.5rem] translate-x-4 translate-y-4 opacity-10 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6" />
                <img
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600"
                  alt="Luxury Architectural Living Area"
                  className="relative w-full h-[500px] lg:h-[700px] object-cover rounded-[2.5rem] shadow-xl z-10"
                />
              </motion.div>

              <motion.div {...fadeRight} className="order-1 lg:order-2">
                <span className="uppercase tracking-[3px] text-sm font-semibold text-[#0A2E6F]">
                  Luxury Living
                </span>
                <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-[#071224]">
                  Interiors That Inspire
                </h2>
                <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                  We transform empty spaces into inspiring homes through thoughtful planning, premium materials, and timeless design aesthetics.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mt-10">
                  {["Space Planning", "3D Visualization", "Custom Furniture", "Lighting Design", "Premium Materials", "Turnkey Execution"].map((item) => (
                    <div key={item} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-100 transition-colors hover:border-blue-200">
                      <CheckCircle2 className="text-[#0A2E6F] shrink-0" size={20} />
                      <span className="font-medium text-slate-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* MODULAR KITCHENS */}
        <section className="py-24 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <motion.div {...fadeLeft}>
                <span className="uppercase tracking-[3px] text-sm font-semibold text-[#0A2E6F]">
                  Modular Kitchens
                </span>
                <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-[#071224]">
                  Where Style Meets Functionality
                </h2>
                <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                  Our modular kitchen solutions combine smart storage, premium finishes, and ergonomic layouts to create a beautiful and highly functional cooking space for your family.
                </p>
                <div className="space-y-4 mt-10">
                  {["Premium Hardware & Accessories", "Soft-Close Hinges & Channels", "Quartz & Granite Countertops", "Custom Storage Solutions", "Modern Finishes & Colors", "Lifetime Design Support"].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="mt-1 bg-blue-50 p-1 rounded-full shrink-0">
                        <CheckCircle2 className="text-[#0A2E6F]" size={16} />
                      </div>
                      <span className="font-medium text-slate-700 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div {...fadeRight} className="relative group">
                <div className="absolute inset-0 bg-[#0A2E6F] rounded-[2.5rem] -translate-x-4 translate-y-4 opacity-10 transition-transform duration-500 group-hover:-translate-x-6 group-hover:translate-y-6" />
                <img
                  src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1600"
                  alt="Modern Premium Modular Kitchen Layout"
                  className="relative w-full h-[500px] lg:h-[700px] object-cover rounded-[2.5rem] shadow-xl z-10"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-24 lg:py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div {...fadeUp} className="text-center">
              <span className="uppercase tracking-[3px] text-sm font-semibold text-[#0A2E6F]">
                Why Choose Simmply Perfect
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-[#071224]">
                Designing Spaces That Feel Like Home
              </h2>
              <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                We combine creativity, functionality, and premium craftsmanship to create interiors that elevate everyday living.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
              {[
                { title: "Personalized Designs", icon: "🎨" },
                { title: "Premium Materials", icon: "💎" },
                { title: "3D Visualization", icon: "📐" },
                { title: "Expert Execution", icon: "🔨" },
                { title: "Dedicated Manager", icon: "🤝" },
                { title: "On-Time Delivery", icon: "⏱️" },
                { title: "Quality Assurance", icon: "✨" },
                { title: "After Sales Support", icon: "🛡️" },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl group-hover:bg-[#0A2E6F] group-hover:text-white transition-colors duration-300">
                    {item.icon}
                  </div>
                  <h3 className="mt-5 font-bold text-lg text-[#071224]">{item.title}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* DESIGN PROCESS */}
        <section className="py-24 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div {...fadeUp} className="text-center">
              <span className="uppercase tracking-[3px] text-sm font-semibold text-[#0A2E6F]">
                Our Process
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-[#071224]">
                From Concept To Completion
              </h2>
            </motion.div>
            <div className="relative mt-20">
              <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
                {["Consultation", "Space Planning", "3D Design", "Execution", "Handover"].map((step, index) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center group"
                  >
                    <div className="w-20 h-20 mx-auto rounded-full bg-white border-[4px] border-slate-50 shadow-md text-[#0A2E6F] flex items-center justify-center text-2xl font-black transition-all duration-300 group-hover:border-[#0A2E6F] group-hover:bg-[#0A2E6F] group-hover:text-white">
                      {index + 1}
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-[#071224]">{step}</h3>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MATERIALS */}
        <section className="py-24 lg:py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div {...fadeUp} className="text-center">
              <span className="uppercase tracking-[3px] text-sm font-semibold text-[#0A2E6F]">
                Premium Materials
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-[#071224]">
                Quality In Every Detail
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              {[
                { title: "Engineered Wood", image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1200" },
                { title: "Premium Laminates", image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=1200" },
                { title: "Luxury Finishes", image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=1200" },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="group overflow-hidden rounded-[2rem] bg-white shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="h-[280px] overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-6 text-center border-t border-slate-50">
                    <h3 className="text-xl font-bold text-[#071224]">{item.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED PROJECTS */}
        <section className="py-24 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div {...fadeUp} className="text-center">
              <span className="uppercase tracking-[3px] text-sm font-semibold text-[#0A2E6F]">
                Featured Projects
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-[#071224]">
                Interiors We've Crafted
              </h2>
            </motion.div>
            <div className="grid lg:grid-cols-12 gap-6 mt-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="lg:col-span-7 overflow-hidden rounded-[2rem] group relative"
              >
                <img src="https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=1800" alt="Featured Masterpiece Suite" className="w-full h-[400px] lg:h-[650px] object-cover transition-transform duration-700 group-hover:scale-105" />
              </motion.div>
              <div className="lg:col-span-5 grid gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="overflow-hidden rounded-[2rem] group relative"
                >
                  <img src="/interiors/dining.jpg" alt="Featured Luxury Dining Space" className="w-full h-[250px] lg:h-[313px] object-cover transition-transform duration-700 group-hover:scale-105" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="overflow-hidden rounded-[2rem] group relative"
                >
                  <img src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1400" alt="Featured Minimalist Lounge" className="w-full h-[250px] lg:h-[313px] object-cover transition-transform duration-700 group-hover:scale-105" />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ - Moved before Testimonials */}
        <section className="py-24 lg:py-32 bg-slate-50">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div {...fadeUp} className="text-center">
              <span className="uppercase tracking-[3px] text-sm font-semibold text-[#0A2E6F]">
                Frequently Asked Questions
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-[#071224]">
                Everything You Need To Know
              </h2>
            </motion.div>
            <div className="mt-16 grid md:grid-cols-2 gap-4">
              {faqData.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-2xl p-6 md:p-8 hover:bg-blue-50/50 transition-colors border border-transparent hover:border-blue-100 shadow-sm"
                >
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-lg font-bold text-[#071224] leading-snug">{faq.q}</h3>
                    <div className="bg-slate-50 rounded-full p-1.5 shrink-0 text-slate-400 group-hover:text-[#0A2E6F] shadow-sm"><Plus size={18} /></div>
                  </div>
                  <p className="mt-3 text-slate-600 leading-relaxed text-sm md:text-base pr-8">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS - Infinite Marquee */}
        <section className="py-24 lg:py-32 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div {...fadeUp} className="text-center">
              <span className="uppercase tracking-[3px] text-sm font-semibold text-[#0A2E6F]">
                Client Testimonials
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-[#071224]">
                Spaces Our Clients Love
              </h2>
            </motion.div>
          </div>
          
          <div className="mt-16 relative w-full overflow-hidden">
            {/* Gradient fades for the edges */}
            <div className="absolute top-0 bottom-0 left-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            
            <div className="flex w-max gap-8 animate-marquee pl-8">
              {infiniteReviews.map((item, i) => (
                <div
                  key={`${item.name}-${i}`}
                  className="w-[320px] md:w-[420px] shrink-0 bg-slate-50 rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-xl transition-all duration-300"
                >
                  <Quote className="absolute top-6 right-6 text-white w-24 h-24 -z-0 rotate-12 transition-transform duration-500 group-hover:rotate-0 group-hover:text-blue-100/50" />
                  <div className="relative z-10">
                    <div className="text-amber-400 text-lg tracking-widest flex gap-1">★★★★★</div>
                    <p className="mt-6 text-slate-700 leading-relaxed font-medium italic text-[15px]">"{item.review}"</p>
                    <div className="mt-8 pt-6 border-t border-slate-200">
                      <h4 className="font-bold text-[#071224]">{item.name}</h4>
                      <p className="text-sm text-slate-500">{item.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPACT CTA SECTION */}
        <section className="py-20 relative overflow-hidden bg-slate-50">
          <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-blue-500/10 blur-[150px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-cyan-500/10 blur-[150px] pointer-events-none" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <motion.div
              {...fadeUp}
              className="relative overflow-hidden rounded-[32px] bg-[#071224] px-8 py-14 md:px-16 md:py-16 text-center shadow-2xl"
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2200')] bg-cover bg-center opacity-20 mix-blend-overlay" />
              
              <div className="relative z-10">
                <span className="inline-flex px-4 py-2 rounded-full bg-white/10 text-white font-semibold text-xs tracking-[3px] uppercase backdrop-blur-md border border-white/10">
                  Ready To Get Started?
                </span>
                <h2 className="mt-6 text-4xl md:text-5xl font-black text-white leading-tight">
                  Design Your Dream
                  <br />
                  Space Today
                </h2>
                <p className="mt-5 max-w-2xl mx-auto text-slate-300 leading-relaxed text-lg">
                  Let our expert designers create elegant interiors tailored perfectly to your lifestyle, taste, and vision.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Link
                    href="/contact"
                    className="bg-white text-[#071224] px-8 py-3.5 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-xl shadow-black/20"
                  >
                    Get Consultation
                  </Link>
                  <a
                    href="tel:+919999999999"
                    className="border border-white/20 bg-white/5 backdrop-blur-sm text-white px-8 py-3.5 rounded-full font-bold transition-all duration-300 hover:bg-white/10"
                  >
                    Call Now
                  </a>
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
