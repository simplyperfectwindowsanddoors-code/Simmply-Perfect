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
  Quote,
} from "lucide-react";

interface ServiceItem {
  id?: string;
  title: string;
  image: string;
  videoUrl?: string;
  desc: string;
  bullets: string[];
}

/* =========================================================
   SEO HELPER
   ========================================================= */

const generateMetadata = (title: string) => {
  const normalizedTitle = title.toLowerCase();

  const isGoldenOak = normalizedTitle.includes("golden");
  const isWhite = normalizedTitle.includes("white");
  const hasMesh =
    normalizedTitle.includes("mesh") ||
    normalizedTitle.includes("screen");

  const bullets: string[] = [];

  if (isGoldenOak) {
    bullets.push("Premium Golden Oak Finish");
  }

  if (isWhite) {
    bullets.push("Pure White UV-Resistant Profile");
  }

  if (hasMesh) {
    bullets.push("Integrated Insect Protection");
  }

  bullets.push(
    "Smooth Operation Mechanism",
    "Weather-Sealed Durability"
  );

  return {
    desc: `Explore the ${title} from Simmply Perfect Group, designed for residential and commercial spaces with a focus on durability, smooth operation, architectural aesthetics, weather resistance, and long-term performance in Hyderabad.`,
    bullets: bullets.slice(0, 4),
  };
};

/* =========================================================
   SECTION 1
   WINDOW & DOOR FUNCTIONALITY VIDEOS
   ========================================================= */

const videoServices: ServiceItem[] = [
  { id: "m9_7m-sdtaI", title: "4 Track Sliding Window - Golden Oak" },
  { id: "FmOSK2IOK5E", title: "Bay / Bow Window - Golden Oak Laminated" },
  { id: "eNVupJRg6kk", title: "Bay / Bow Window - White" },
  { id: "h-RI46nXhcE", title: "Casement Door - Golden Oak" },
  { id: "Qhhj1-lf8HE", title: "Double Casement Window - White" },
  { id: "XmwRU6tjrSM", title: "Double Casement Window - Golden Oak Laminate" },
  { id: "r0qSP5oWjv4", title: "Double Hung Window - White" },
  { id: "qoYT2Bkd-EE", title: "Double Hung Window - Golden Oak" },
  { id: "dnIQ9DHqvcg", title: "French Window - Golden Oak" },
  { id: "NxL6MHN-iSQ", title: "French Window - White" },
  { id: "TPoEJyk1aOs", title: "Lift and Slide Door - Golden Oak" },
  { id: "IpG54nf7iW8", title: "Lift and Slide Door - White" },
  { id: "-BMB-C1IwaU", title: "Monorail Window - Golden Oak" },
  { id: "VxlBB6BIrUA", title: "Monorail Window - White" },
  { id: "Zz9Nbb1Ihcw", title: "Slide and Fold Door - Golden Oak" },
  { id: "0xEPbos-hME", title: "Slide and Fold Door - White" },
  {
    id: "pOKxk4C-6uw",
    title: "2 Panel Sliding Window with Sliding Mesh Screen",
  },
  {
    id: "z_Enx5QQZ7A",
    title: "3 Panel Sliding Window - Golden Oak",
  },
  {
    id: "Ndi42G1vnmc",
    title: "3 Panel Sliding Window - White",
  },
  {
    id: "oyr_4bLT9K0",
    title: "3 Panel Sliding Window with Insect Mesh - Golden",
  },
  { id: "4VjYFB88G0g", title: "Top Hung Window - Golden Oak" },
  { id: "DIa158pZojo", title: "Top Hung Window - White" },
  { id: "cfTgUpg5Oyo", title: "Arch Window - Golden Oak" },
  { id: "yRONVdOZRq0", title: "UPVC Sliding Window 90 Series" },
  {
    id: "4Q1Y8vBw-xo",
    title: "2 Track Sliding Window with Half Track Mesh Screen - Golden Oak",
  },
  { id: "6nmOC203HRE", title: "Tilt and Turn Window - White" },
  { id: "ejEXw92ghtE", title: "Tilt and Turn Window - Golden Oak" },
  {
    id: "AuxFVGbDo-Q",
    title: "Sliding Window 62 Series - 2 Track, 2 Glass Panel",
  },
  {
    id: "ng4CPjgzORw",
    title: "Slide and Fold Windows - Golden Oak by Simmply Perfect",
  },
  {
    id: "bz0AfsVfsNQ",
    title: "Slide and Fold UPVC Windows and Doors by Simmply Perfect",
  },
  {
    id: "jGQwl4S1RX8",
    title: "2 Track, 4 Glass Panel Sliding Window - Golden Oak",
  },
  {
    id: "p_tBrlX_yM8",
    title: "Bay and Bow Window - White",
  },
  {
    id: "OfBkkFVgwA4",
    title: "2 Track, 4 Glass Panel Sliding System",
  },
  {
    id: "K4wpGqjmet4",
    title: "2 Track Sliding Window with Grill - Golden Oak",
  },
  {
    id: "qlt5uYDZN7Y",
    title: "2 Track, 2 Glass Panel Sliding Window - Golden Oak",
  },
  {
    id: "hSEjyQw4jnU",
    title: "2 Track, 2 Glass Panel Sliding Window with Grill",
  },
  {
    id: "4AytnZJ5lpQ",
    title:
      "UPVC Sliding Window - 2.5 Track, 2 Glass Panel with Mesh Sliding - 80 Series",
  },
  {
    id: "natbuikqQPo",
    title:
      "Double Casement Window and Door - UPVC Window and Door in India",
  },
  {
    id: "E0CARd1VLx0",
    title:
      "Single Casement Window and Door - UPVC Window in Hyderabad",
  },
  {
    id: "soT9b6REhIE",
    title: "3 Track, 3 Glass Panel Sliding Window - 112 Series",
  },
  {
    id: "qVhuo09OT0U",
    title:
      "2.5 Track, 2 Glass Panel with Mesh Sliding Window - 90 Series",
  },
].map((item) => ({
  ...item,
  image: `https://img.youtube.com/vi/${item.id}/hqdefault.jpg`,
  videoUrl: `https://www.youtube.com/embed/${item.id}?autoplay=1`,
  ...generateMetadata(item.title),
}));

/* =========================================================
   SECTION 2
   MOSQUITO MESH SYSTEMS
   ========================================================= */

const meshServices: ServiceItem[] = [
  {
    title: "Pleated Sliding Mosquito Mesh Doors",
    image: "/services/pleated-mesh.jpg",
    desc: "Premium pleated mosquito mesh doors designed for balconies, entrances and high-traffic areas. The space-saving pleated system provides smooth sliding operation and effective insect protection.",
    bullets: [
      "Polyester Pleated Fabric",
      "Low Profile Floor Tracks",
      "Smooth Sliding Operation",
      "Dust Resistant Surface",
      "Aluminium Frame Profiles",
      "Wind Resistant Retainers",
    ],
  },
  {
    title: "Velcro and Magnetic Mosquito Mesh",
    image: "/services/magnetic-mesh.jpg",
    desc: "Flexible and easy-to-maintain mosquito mesh solutions for residential windows and doors. Detachable mesh systems can be removed, cleaned and reinstalled conveniently.",
    bullets: [
      "Fiberglass Mesh Core",
      "Heavy Duty Velcro Strips",
      "Magnetic Self-Sealing Profiles",
      "Tool-Free Installation Options",
      "High Visibility Mesh",
      "Easy Washable Design",
    ],
  },
  {
    title: "Aluminium Roller Mosquito Mesh Windows",
    image: "/services/roller-mesh.jpg",
    desc: "Retractable aluminium roller mesh systems designed for windows and doors. The compact cassette design provides convenient insect protection whenever required.",
    bullets: [
      "Spring Loaded System",
      "Vertical Pull Down Cassette",
      "Side Brush Tracks",
      "Fiberglass Mesh",
      "Powder Coated Casing",
      "Automatic Retraction",
    ],
  },
  {
    title: "Stainless Steel Security Mesh Doors",
    image: "/services/ss-mesh.jpg",
    desc: "Strong stainless steel mesh doors combining ventilation, insect protection and additional security for residential and commercial applications.",
    bullets: [
      "SS 304 High Tensile Mesh",
      "Pet Resistant Construction",
      "Heavy Aluminium Frame",
      "Anti Corrosion Finish",
      "Tamper Resistant Fasteners",
      "Safety Screen Application",
    ],
  },
];

/* =========================================================
   SECTION 3
   GENERAL ARCHITECTURAL SERVICES
   ========================================================= */

const standardServices: ServiceItem[] = [
  {
    title: "Window and Door Repairs",
    image: "/services/repair.jpg",
    desc: "Professional window and door repair services for residential and commercial properties, including UPVC windows, aluminium windows, sliding systems, glass, grills, tracks and hardware.",
    bullets: [
      "Sliding Window Repairs",
      "Casement Window Repairs",
      "UPVC and Aluminium Repairs",
      "Hardware Replacement",
    ],
  },
  {
    title: "Window and Door Cleaning",
    image: "/services/cleaning.jpg",
    desc: "Professional cleaning and maintenance for windows, doors, glass panels, frames, tracks, grills and accessories to restore appearance and smooth operation.",
    bullets: [
      "Glass Cleaning",
      "Sliding Track Maintenance",
      "Hard Water Stain Removal",
      "Interior and Exterior Cleaning",
    ],
  },
  {
    title: "Painting and Polishing Services",
    image: "/services/painting.jpg",
    desc: "Professional painting, polishing, coating and finishing solutions for wooden, steel, aluminium and architectural surfaces.",
    bullets: [
      "Wooden Door Polishing",
      "PU and Melamine Polish",
      "Anti Rust Coating",
      "Weatherproof Exterior Finish",
    ],
  },
  {
    title: "Window and Door Extraction and Renovation",
    image: "/services/extraction.jpg",
    desc: "Safe removal, dismantling, renovation, remodeling and replacement of existing windows, doors and interior structures with coordinated civil work.",
    bullets: [
      "Old Structure Extraction",
      "Structural Modifications",
      "Wall Alterations",
      "Complete Home Renovation",
    ],
  },
  {
    title: "Glass Installation and Repairs",
    image: "/services/glass-repair.jpg",
    desc: "Professional residential and commercial glass installation and repair services, including architectural, decorative, safety and partition glazing.",
    bullets: [
      "Toughened Glass Installation",
      "Glass Partition Repairs",
      "Shower Enclosure Glass",
      "Reflective and Tinted Glass",
    ],
  },
  {
    title: "Window Installation Services",
    image: "/services/window-installation.jpg",
    desc: "Expert installation of UPVC, aluminium and glass windows for homes, apartments, villas, offices and commercial properties in Hyderabad.",
    bullets: [
      "UPVC Window Installation",
      "Aluminium Window Installation",
      "Sliding and Casement Windows",
      "Custom Window Solutions",
    ],
  },
];

/* =========================================================
   FAQ
   ========================================================= */

const faqData = [
  {
    q: "What window and door services does Simmply Perfect Group provide?",
    a: "Simmply Perfect Group provides UPVC and aluminium windows and doors, sliding windows, casement windows, French windows, tilt and turn windows, lift and slide doors, slide and fold systems, mesh systems, repairs, glass services and installation solutions.",
  },
  {
    q: "Does Simmply Perfect Group provide UPVC windows in Hyderabad?",
    a: "Yes. Simmply Perfect Group provides UPVC window and door solutions for residential and commercial properties in Hyderabad, including sliding, casement, tilt and turn, French, bay and bow and other customized window systems.",
  },
  {
    q: "How long does a complete window or door installation take?",
    a: "Depending on the project scope, most residential installations are completed within 1 to 3 days after the required windows or doors have been manufactured and are ready for installation.",
  },
  {
    q: "What is UPVC and why is it suitable for windows and doors?",
    a: "UPVC, or Unplasticized Polyvinyl Chloride, is a durable and low-maintenance material commonly used for modern windows and doors. It provides good weather resistance, thermal insulation and sound reduction when combined with suitable glazing and installation.",
  },
  {
    q: "Do you repair existing UPVC and aluminium windows?",
    a: "Yes. Window and door repair services include sliding track issues, hardware replacement, rollers, glass replacement, mesh repairs and other common UPVC and aluminium window and door problems.",
  },
  {
    q: "Do you provide mosquito mesh installation?",
    a: "Yes. Simmply Perfect Group provides pleated sliding mesh, magnetic mesh, Velcro mesh, roller mesh and stainless steel mesh solutions for windows and doors.",
  },
  {
    q: "Are mosquito mesh systems washable?",
    a: "Many detachable mesh systems can be removed and cleaned. Velcro and magnetic mesh sheets are particularly convenient for cleaning, while pleated systems can generally be maintained using a soft brush or vacuum.",
  },
  {
    q: "Can I customize the glass used in my windows?",
    a: "Yes. Depending on the application, available glazing options can include toughened, laminated, tinted, frosted and double-glazed units.",
  },
  {
    q: "Can window and door frame colours be customized?",
    a: "Yes. Depending on the selected profile system, customers can choose from different finishes and colours, including wood-grain finishes such as Golden Oak.",
  },
  {
    q: "Do you provide home renovation services in Hyderabad?",
    a: "Yes. Simmply Perfect Group provides renovation and remodeling solutions covering extraction, structural modifications, civil alterations, replacement work and related architectural requirements.",
  },
  {
    q: "Do you provide commercial window and door solutions?",
    a: "Yes. Window, door, glass, mesh, repair and installation solutions can be provided for offices, commercial buildings and other business properties based on project requirements.",
  },
  {
    q: "Do you provide glass installation and repair services?",
    a: "Yes. Services include toughened glass, glass partitions, shower enclosure glass, reflective glass, tinted glass and other architectural glazing requirements.",
  },
  {
    q: "Do you provide post-installation support?",
    a: "Yes. Simmply Perfect Group provides after-sales support and maintenance services for windows, doors, mesh systems and related installations.",
  },
  {
    q: "Is there a warranty on windows and door installations?",
    a: "Warranty coverage depends on the selected product, material, hardware, manufacturer and project terms. Customers should confirm the applicable warranty for their specific installation.",
  },
];

/* =========================================================
   REVIEWS
   ========================================================= */

const reviewsData = [
  {
    name: "Priya Menon",
    role: "Apartment Owner",
    review:
      "The mosquito mesh installation was flawless. The pleated design looks incredibly premium, completely blocks insects, and folds away invisibly when not needed.",
  },
  {
    name: "Rahul Verma",
    role: "Villa Owner",
    review:
      "Excellent repair service. They fixed my massive sliding balcony doors that had been stuck for months. Replaced the bearings, and it works like brand new now!",
  },
  {
    name: "Rajesh Khanna",
    role: "Architect",
    review:
      "I've partnered with them for multiple residential projects. Their attention to detail on the 4-track sliding systems and custom arch windows is unmatched in the industry.",
  },
  {
    name: "Sanjay Gupta",
    role: "Homeowner",
    review:
      "Loved the tilt & turn windows! The video demonstration gallery helped me choose exactly what I needed for proper ventilation. Fantastic execution.",
  },
  {
    name: "Meera Singh",
    role: "Homeowner",
    review:
      "The slide and fold doors completely transformed our living room balcony! The golden oak finish looks exactly like real wood but without any of the maintenance hassle.",
  },
  {
    name: "Anita Sharma",
    role: "Interior Designer",
    review:
      "Consistently top-notch quality on all structural and glass installations. A highly reliable team that strictly adheres to deadlines and aesthetic specifications.",
  },
  {
    name: "Anil K.",
    role: "Business Owner",
    review:
      "Replaced all our office windows with their double-glazed tilt and turn units. The noise reduction from the busy street outside is simply incredible. Highly recommended.",
  },
  {
    name: "Vikram Reddy",
    role: "Homeowner",
    review:
      "The extraction of our old wooden windows and installation of new UPVC ones was done seamlessly with zero mess. The civil work was handled perfectly.",
  },
  {
    name: "Sneha Reddy",
    role: "Property Manager",
    review:
      "Very professional team. They extracted old rusted steel windows and installed sleek white UPVC monorail sliders in just two days without damaging any interior walls.",
  },
  {
    name: "Kiran Desai",
    role: "Office Manager",
    review:
      "The roller mesh systems are so convenient. The team was highly professional, transparent with pricing, and finished the job well ahead of schedule.",
  },
];

const infiniteReviews = [
  ...reviewsData,
  ...reviewsData,
  ...reviewsData,
];

/* =========================================================
   VIDEO GRID
   ========================================================= */

function VideoGrid({
  data,
  onSelectItem,
}: {
  data: ServiceItem[];
  onSelectItem: (item: ServiceItem) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {data.map((item, idx) => (
        <button
          key={`${item.id}-${idx}`}
          type="button"
          onClick={() => onSelectItem(item)}
          aria-label={`Watch ${item.title} demonstration`}
          className="group cursor-pointer text-left flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
            <img
              src={item.image}
              alt={`${item.title} - Simmply Perfect Group`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-colors duration-300" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-red-600/90 backdrop-blur-md flex items-center justify-center text-white shadow-lg border border-red-500/50 scale-90 group-hover:scale-100 transition-all duration-300">
                <Play
                  fill="currentColor"
                  size={24}
                  className="ml-1"
                  aria-hidden="true"
                />
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
        </button>
      ))}
    </div>
  );
}

/* =========================================================
   CAROUSEL
   ========================================================= */

interface CarouselRowProps {
  data: ServiceItem[];
  onSelectItem: (item: ServiceItem) => void;
}

function CarouselRow({
  data,
  onSelectItem,
}: CarouselRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const animationRef = useRef<number | null>(null);
  const isHovered = useRef(false);
  const dragDistance = useRef(0);

  const REPEAT_COUNT = 6;
  const extendedData = Array(REPEAT_COUNT)
    .fill(data)
    .flat();

  useEffect(() => {
    const container = scrollContainerRef.current;

    if (!container) return;

    const timeoutId = setTimeout(() => {
      if (container) {
        const singleSetWidth =
          container.scrollWidth / REPEAT_COUNT;

        container.scrollLeft = singleSetWidth * 2;
      }
    }, 150);

    const continuousScrollUpdate = () => {
      if (
        !isDown.current &&
        !isHovered.current &&
        container
      ) {
        const singleSetWidth =
          container.scrollWidth / REPEAT_COUNT;

        container.scrollLeft += 1.2;

        if (
          container.scrollLeft >=
          singleSetWidth * 3
        ) {
          container.scrollLeft = singleSetWidth * 2;
        } else if (
          container.scrollLeft <= singleSetWidth
        ) {
          container.scrollLeft = singleSetWidth * 2;
        }
      }

      animationRef.current =
        requestAnimationFrame(
          continuousScrollUpdate
        );
    };

    animationRef.current =
      requestAnimationFrame(
        continuousScrollUpdate
      );

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(
          animationRef.current
        );
      }

      clearTimeout(timeoutId);
    };
  }, []);

  const handleMouseDown = (
    e: React.MouseEvent
  ) => {
    if (!scrollContainerRef.current) return;

    isDown.current = true;
    dragDistance.current = 0;

    startX.current =
      e.pageX -
      scrollContainerRef.current.offsetLeft;

    scrollLeft.current =
      scrollContainerRef.current.scrollLeft;
  };

  const handleMouseMove = (
    e: React.MouseEvent
  ) => {
    if (
      !isDown.current ||
      !scrollContainerRef.current
    ) {
      return;
    }

    e.preventDefault();

    const x =
      e.pageX -
      scrollContainerRef.current.offsetLeft;

    const currentWalkDistance =
      (x - startX.current) * 1.5;

    dragDistance.current =
      Math.abs(x - startX.current);

    scrollContainerRef.current.scrollLeft =
      scrollLeft.current -
      currentWalkDistance;

    const singleSetWidth =
      scrollContainerRef.current.scrollWidth /
      REPEAT_COUNT;

    if (
      scrollContainerRef.current.scrollLeft >=
      singleSetWidth * 4
    ) {
      scrollContainerRef.current.scrollLeft =
        singleSetWidth * 2;

      startX.current =
        e.pageX -
        scrollContainerRef.current.offsetLeft;

      scrollLeft.current =
        scrollContainerRef.current.scrollLeft;
    } else if (
      scrollContainerRef.current.scrollLeft <=
      singleSetWidth
    ) {
      scrollContainerRef.current.scrollLeft =
        singleSetWidth * 3;

      startX.current =
        e.pageX -
        scrollContainerRef.current.offsetLeft;

      scrollLeft.current =
        scrollContainerRef.current.scrollLeft;
    }
  };

  const handleMouseLeaveOrUp = (
    item?: ServiceItem
  ) => {
    if (!isDown.current) return;

    isDown.current = false;

    if (
      item &&
      dragDistance.current < 6
    ) {
      onSelectItem(item);
    }
  };

  return (
    <div
      ref={scrollContainerRef}
      onMouseEnter={() => {
        isHovered.current = true;
      }}
      onMouseLeave={() => {
        isHovered.current = false;
        handleMouseLeaveOrUp();
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={() =>
        handleMouseLeaveOrUp()
      }
      onMouseMove={handleMouseMove}
      className="mt-8 flex overflow-x-auto scrollbar-none cursor-grab active:cursor-grabbing py-4 select-none whitespace-nowrap"
      style={{
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none",
      }}
      aria-label="Simmply Perfect Group services"
    >
      <div className="flex flex-nowrap">
        {extendedData.map(
          (item, idx) => (
            <button
              key={`${item.title}-${idx}`}
              type="button"
              onMouseUp={() =>
                handleMouseLeaveOrUp(item)
              }
              aria-label={`View ${item.title}`}
              className="mx-4 w-[350px] inline-block flex flex-col group/card pointer-events-auto shrink-0 text-center"
            >
              <div className="relative h-[240px] w-full rounded-3xl overflow-hidden border border-slate-200/80 bg-slate-100 shadow-sm transition-all duration-500 group-hover/card:-translate-y-2 group-hover/card:shadow-xl">
                <img
                  src={
                    item.image ||
                    "/services/placeholder-window.jpg"
                  }
                  alt={`${item.title} - Simmply Perfect Group`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105 pointer-events-none"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />

                <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-[#0A2E6F] flex items-center justify-center shadow-lg border border-slate-100 opacity-0 scale-90 group-hover/card:opacity-100 group-hover/card:scale-100 transition-all duration-300">
                  <ArrowUpRight
                    size={16}
                    className="stroke-[2.5]"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div className="mt-4 px-4 whitespace-normal">
                <h3 className="text-xl font-black text-slate-800 group-hover/card:text-[#0A2E6F] transition-colors duration-200 tracking-tight leading-snug">
                  {item.title}
                </h3>
              </div>
            </button>
          )
        )}
      </div>
    </div>
  );
}

/* =========================================================
   MAIN SERVICES COMPONENT
   ========================================================= */

export default function Services() {
  const [selectedService, setSelectedService] =
    useState<ServiceItem | null>(null);

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedService]);

  /* =======================================================
     FAQ STRUCTURED DATA
     ======================================================= */

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  /* =======================================================
     SERVICE STRUCTURED DATA
     ======================================================= */

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Simmply Perfect Group Architectural Services",
    description:
      "Windows, doors, mosquito mesh, glass, renovation, repair and architectural services provided by Simmply Perfect Group in Hyderabad.",
    itemListElement: [
      ...meshServices,
      ...standardServices,
    ].map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.desc,
        provider: {
          "@type": "Organization",
          name: "Simmply Perfect Group",
          url: "https://simmplyperfect.com",
        },
        areaServed: {
          "@type": "City",
          name: "Hyderabad",
        },
      },
    })),
  };

  return (
    <>
      {/* =====================================================
          STRUCTURED DATA
      ===================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            faqSchema
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema
          ),
        }}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes scroll-marquee {
              0% {
                transform: translateX(0);
              }

              100% {
                transform: translateX(
                  calc(-50% - 16px)
                );
              }
            }

            .animate-marquee {
              animation:
                scroll-marquee
                45s
                linear
                infinite;
            }

            .animate-marquee:hover {
              animation-play-state: paused;
            }
          `,
        }}
      />

      {/* =====================================================
          SERVICES SECTION
      ===================================================== */}

      <section
        id="all-services"
        aria-labelledby="services-heading"
        className="py-24 sm:py-32 bg-[#FAFBFD] relative overflow-visible antialiased text-slate-900 select-none"
      >
        {/* HEADER */}

        <div className="max-w-7xl mx-auto px-6 mb-20">
          <div className="text-center space-y-4">
            <h2
              id="services-heading"
              className="text-4xl sm:text-5xl md:text-6xl font-black text-[#071224] tracking-tight leading-none"
            >
              Complete Architectural Solutions
            </h2>

            <p className="max-w-3xl mx-auto text-slate-500 leading-relaxed text-sm sm:text-base font-light">
              Simmply Perfect Group provides premium
              aluminium and UPVC windows and doors,
              mosquito mesh systems, glass installation,
              window and door repairs, home renovation,
              commercial renovation and architectural
              solutions in Hyderabad.
            </p>
          </div>
        </div>

        {/* =================================================
            FUNCTIONALITY SHOWCASES
        ================================================= */}

        <div
          className="max-w-7xl mx-auto px-6 pt-6"
          aria-labelledby="functionality-heading"
        >
          <div className="flex flex-col items-center text-center pb-6 space-y-3">
            <div
              className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-lg border border-red-500"
              aria-hidden="true"
            >
              <PlaySquare size={20} />
            </div>

            <div className="space-y-1">
              <h3
                id="functionality-heading"
                className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight"
              >
                UPVC and Aluminium Window & Door
                Functionality Showcases
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto font-medium">
                Explore real-time demonstrations of
                sliding windows, casement windows,
                French windows, tilt and turn windows,
                lift and slide doors, slide and fold
                systems and other premium window and
                door solutions.
              </p>
            </div>
          </div>

          <VideoGrid
            data={videoServices}
            onSelectItem={setSelectedService}
          />
        </div>

        {/* =================================================
            MOSQUITO MESH
        ================================================= */}

        <div
          className="max-w-7xl mx-auto px-6 pt-32"
          aria-labelledby="mesh-heading"
        >
          <div className="flex flex-col items-center text-center pb-6 space-y-3">
            <div
              className="w-12 h-12 rounded-2xl bg-[#0A2E6F] text-white flex items-center justify-center shadow-lg border border-[#082456]"
              aria-hidden="true"
            >
              <Shield size={20} />
            </div>

            <div className="space-y-1">
              <h3
                id="mesh-heading"
                className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight"
              >
                Mosquito Mesh Systems
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto font-medium">
                Custom-fitted mosquito mesh solutions
                for UPVC and aluminium windows and doors,
                including pleated mesh, magnetic mesh,
                roller mesh and stainless steel security
                mesh systems.
              </p>
            </div>
          </div>

          <CarouselRow
            data={meshServices}
            onSelectItem={setSelectedService}
          />
        </div>

        {/* =================================================
            GENERAL SERVICES (TARGET ANCHOR)
        ================================================= */}

        <div
          id="general-services"
          className="max-w-7xl mx-auto px-6 pt-32 pb-8 scroll-mt-28"
          aria-labelledby="general-services-heading"
        >
          <div className="flex flex-col items-center text-center pb-6 space-y-3">
            <div
              className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg border border-blue-500"
              aria-hidden="true"
            >
              <Layers size={20} />
            </div>

            <div className="space-y-1">
              <h3
                id="general-services-heading"
                className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight"
              >
                Window, Door, Glass, Repair and
                Renovation Services
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto font-medium">
                End-to-end installation, maintenance,
                repair, glass, renovation and architectural
                services for homes, villas, apartments,
                offices and commercial properties.
              </p>
            </div>
          </div>

          <CarouselRow
            data={standardServices}
            onSelectItem={setSelectedService}
          />
        </div>
      </section>

      {/* =====================================================
          FAQ
      ===================================================== */}

      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="py-24 lg:py-32 bg-slate-50"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="uppercase tracking-[3px] text-sm font-semibold text-[#0A2E6F]">
              Questions About Our Services
            </span>

            <h2
              id="faq-heading"
              className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-[#071224]"
            >
              Frequently Asked Questions
            </h2>

            <p className="max-w-3xl mx-auto mt-5 text-slate-500 leading-relaxed">
              Find answers about UPVC windows,
              aluminium windows and doors, mosquito
              mesh systems, glass installation, repairs,
              renovation and architectural services in
              Hyderabad.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {faqData.map((faq, i) => (
              <article
                key={i}
                className="group bg-white rounded-2xl p-6 md:p-8 hover:bg-blue-50/50 transition-colors border border-slate-200 hover:border-blue-100 shadow-sm flex flex-col justify-start"
              >
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-lg font-bold text-[#071224] leading-snug">
                    {faq.q}
                  </h3>

                  <div
                    className="bg-slate-50 rounded-full p-1.5 shrink-0 text-slate-400 group-hover:text-[#0A2E6F] shadow-sm"
                    aria-hidden="true"
                  >
                    <Plus size={18} />
                  </div>
                </div>

                <p className="mt-3 text-slate-600 leading-relaxed text-sm md:text-base pr-8">
                  {faq.a}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          REVIEWS
      ===================================================== */}

      <section
        aria-labelledby="reviews-heading"
        className="py-24 lg:py-32 bg-white overflow-hidden border-t border-slate-100"
      >
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <span className="uppercase tracking-[3px] text-sm font-semibold text-[#0A2E6F]">
            Client Testimonials
          </span>

          <h2
            id="reviews-heading"
            className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-[#071224]"
          >
            What Our Clients Say
          </h2>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="absolute top-0 bottom-0 left-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />

          <div className="absolute top-0 bottom-0 right-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="flex w-max gap-8 animate-marquee pl-8">
            {infiniteReviews.map((item, i) => (
              <article
                key={i}
                className="w-[320px] md:w-[420px] shrink-0 bg-slate-50 rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                <Quote
                  className="absolute top-6 right-6 text-white w-24 h-24 -z-0 rotate-12 transition-transform duration-500 group-hover:rotate-0 group-hover:text-blue-50/50"
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  <div
                    className="text-amber-400 text-lg tracking-widest flex gap-1"
                    aria-label="5 star review"
                  >
                    ★★★★★
                  </div>

                  <p className="mt-6 text-slate-700 leading-relaxed font-medium italic text-[15px]">
                    "{item.review}"
                  </p>

                  <div className="mt-8 pt-6 border-t border-slate-200/60">
                    <h3 className="font-bold text-[#071224]">
                      {item.name}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {item.role}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICE MODAL
      ===================================================== */}

      <AnimatePresence>
        {selectedService && (
          <div
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="selected-service-title"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() =>
                setSelectedService(null)
              }
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl"
            />

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.97,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.97,
                y: 20,
              }}
              transition={{
                type: "spring",
                damping: 28,
                stiffness: 200,
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
              className="relative bg-white w-full max-w-3xl rounded-2xl shadow-[0_30px_90px_-15px_rgba(0,0,0,0.5)] overflow-hidden z-10 flex flex-col max-h-[90vh] md:max-h-[85vh]"
            >
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  setSelectedService(null)
                }
                aria-label="Close service details"
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-950/50 hover:bg-slate-950 text-white/90 hover:text-white flex items-center justify-center transition-colors shadow-lg border border-white/10 z-30 backdrop-blur-md"
              >
                <X size={16} />
              </motion.button>

              {/* MEDIA */}

              <div className="w-full bg-black relative shrink-0 aspect-video flex items-center justify-center overflow-hidden">
                {selectedService.videoUrl ? (
                  selectedService.videoUrl.includes(
                    "youtube.com"
                  ) ? (
                    <iframe
                      src={
                        selectedService.videoUrl
                      }
                      title={`${selectedService.title} video demonstration - Simmply Perfect Group`}
                      className="absolute inset-0 w-full h-full"
                      frameBorder="0"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      className="absolute inset-0 w-full h-full object-contain bg-black"
                      src={
                        selectedService.videoUrl
                      }
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                    />
                  )
                ) : (
                  <img
                    src={selectedService.image}
                    alt={`${selectedService.title} - Simmply Perfect Group`}
                    className="w-full h-full object-cover opacity-90 object-center absolute inset-0"
                  />
                )}
              </div>

              {/* INFO */}

              <div className="w-full p-4 sm:p-5 flex flex-col sm:flex-row gap-4 overflow-y-auto bg-slate-50 border-t border-slate-200/50 items-start">
                <div className="sm:w-3/5 flex flex-col pr-2">
                  <h2
                    id="selected-service-title"
                    className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight"
                  >
                    {selectedService.title}
                  </h2>

                  <p className="mt-1.5 text-[13px] sm:text-sm text-slate-600 font-medium leading-relaxed">
                    {selectedService.desc}
                  </p>
                </div>

                <div className="sm:w-2/5 w-full flex flex-col border-t sm:border-t-0 sm:border-l border-slate-200/80 pt-4 sm:pt-0 sm:pl-5">
                  <div className="grid grid-cols-1 gap-1.5">
                    {selectedService.bullets.map(
                      (bullet, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2"
                        >
                          <ShieldCheck
                            size={14}
                            className="text-[#0A2E6F] shrink-0"
                            aria-hidden="true"
                          />

                          <span className="text-[11px] sm:text-xs font-bold text-slate-700 leading-tight">
                            {bullet}
                          </span>
                        </div>
                      )
                    )}
                  </div>

                  <Link
                    href="/contact"
                    onClick={() =>
                      setSelectedService(null)
                    }
                    className="mt-4 bg-[#0A2E6F] hover:bg-[#072456] text-white py-2.5 rounded-lg font-bold text-[11px] sm:text-xs tracking-widest uppercase shadow-md transition-all flex items-center justify-center gap-2 group w-full"
                  >
                    <PhoneCall
                      size={14}
                      className="group-hover:scale-105 transition-transform"
                      aria-hidden="true"
                    />

                    <span>
                      Inquire Now
                    </span>
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