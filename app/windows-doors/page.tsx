"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/home/Footer";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useRef, useState, useEffect } from "react";
import {
  MessageSquare,
  Ruler,
  PencilRuler,
  Factory,
  Hammer,
  Headphones,
  CheckCircle2,
  ChevronDown,
  Quote,
  ArrowUpRight
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};

const fadeLeft = {
  initial: { opacity: 0, x: -60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};

const fadeRight = {
  initial: { opacity: 0, x: 60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};

const stats = [
  {
    number: 3000,
    suffix: "+",
    label: "Projects Completed",
  },
  {
    number: 18,
    suffix: "+",
    label: "Years Experience",
  },
  {
    number: 99.12,
    suffix: "%",
    label: "Client Satisfaction",
    decimals: 2,
  },
];

const materials = [
  {
    title: "uPVC",
    image: "/materials/upvc.jpg",
    description: "Premium uPVC profiles offering excellent durability, insulation and low maintenance.",
    manufacturedItems: ["Windows", "Doors", "Partitions", "Conservatories"],
    features: [
      "Weather Resistant",
      "Rust Free",
      "Termite Proof",
      "Noise Insulation",
      "Energy Efficient",
      "Low Maintenance",
    ],
  },
  {
    title: "Aluminium",
    image: "/materials/aluminium.jpg",
    description: "High-strength aluminium profiles with a sleek modern finish.",
    manufacturedItems: ["Windows", "Doors", "Sliding Systems", "Curtain Walls"],
    features: [
      "Lightweight",
      "Corrosion Resistant",
      "Premium Finish",
      "High Strength",
      "Long Lifespan",
      "Recyclable",
    ],
  },
  {
    title: "Wood",
    image: "/materials/wood.jpg",
    description: "Natural hardwood material providing warmth, elegance and timeless appeal.",
    manufacturedItems: ["Windows", "Doors", "Frames", "Louvers"],
    features: [
      "Natural Finish",
      "Premium Look",
      "Excellent Insulation",
      "Strong Construction",
      "Custom Designs",
      "Long Lasting",
    ],
  },
  {
    title: "Glass",
    image: "/materials/glass.jpg",
    description: "High-quality architectural glass for maximum visibility and performance.",
    manufacturedItems: ["Windows", "Doors", "Partitions", "Railings", "Shower Enclosures"],
    features: [
      "Crystal Clear",
      "Safety Glass",
      "UV Protection",
      "Heat Resistant",
      "Noise Reduction",
      "Energy Efficient",
    ],
  },
  {
    title: "Steel",
    image: "/materials/steel.jpg",
    description: "Heavy-duty galvanized steel offering unmatched strength and durability.",
    manufacturedItems: ["Security Doors", "Gates", "Grills", "Industrial Windows"],
    features: [
      "High Strength",
      "Rust Resistant",
      "Long Life",
      "Secure",
      "Heavy Duty",
      "Low Maintenance",
    ],
  },
];

const windowTypes = [
  {
    title: "Casement Window",
    image: "/windows/casement.jpg",
    description: "Classic side-hinged windows offering excellent ventilation and weather sealing.",
    features: [
      "Excellent Ventilation",
      "Multi Point Locking",
      "Weather Tight Sealing",
      "Noise Reduction",
      "Energy Efficient",
      "Easy Operation",
    ],
    detailImage: "/windows/details/casement-main.jpg",
    dimensionImage: "/windows/details/casement-dimension.jpg",
  },
  {
    title: "French Window",
    image: "/windows/french.jpg",
    description: "Elegant floor-to-ceiling windows that maximize natural light and aesthetics.",
    features: [
      "Floor To Ceiling Design",
      "Maximum Natural Light",
      "Luxury Appearance",
      "Wide Opening",
      "Elegant Aesthetics",
      "Custom Sizes",
    ],
    detailImage: "/windows/details/french-main.jpg",
    dimensionImage: "/windows/details/french-dimension.jpg",
  },
  {
    title: "Sliding Window",
    image: "/windows/sliding.jpg",
    description: "Smooth horizontal sliding operation ideal for modern homes and apartments.",
    features: [
      "Space Saving Design",
      "Smooth Sliding Tracks",
      "Large Glass Panels",
      "Low Maintenance",
      "Modern Appearance",
      "Excellent Ventilation",
    ],
    detailImage: "/windows/details/sliding-main.jpg",
    dimensionImage: "/windows/details/sliding-dimension.jpg",
  },
  {
    title: "Fixed Window",
    image: "/windows/fixed.jpg",
    description: "Non-operable windows designed for maximum daylight and panoramic views.",
    features: [
      "Panoramic Views",
      "Maximum Daylight",
      "Energy Efficient",
      "Weather Resistant",
      "Minimal Maintenance",
      "Contemporary Design",
    ],
    detailImage: "/windows/details/fixed-main.jpg",
    dimensionImage: "/windows/details/fixed-dimension.jpg",
  },
  {
    title: "Bay Window",
    image: "/windows/bay.jpg",
    description: "Architectural projection windows that create spacious and stylish interiors.",
    features: [
      "Extended Interior Space",
      "Wide Viewing Angle",
      "Premium Appearance",
      "Enhanced Ventilation",
      "Natural Light Boost",
      "Custom Configurations",
    ],
    detailImage: "/windows/details/bay-main.jpg",
    dimensionImage: "/windows/details/bay-dimension.jpg",
  },
  {
    title: "Tilt & Turn Window",
    image: "/windows/tilt-turn.jpg",
    description: "Dual-function windows allowing both inward opening and tilt ventilation.",
    features: [
      "Dual Opening Function",
      "Secure Ventilation",
      "Easy Cleaning",
      "High Security",
      "Energy Efficient",
      "European Design",
    ],
    detailImage: "/windows/details/tilt-turn-main.jpg",
    dimensionImage: "/windows/details/tilt-turn-dimension.jpg",
  },
  {
    title: "Arched Window",
    image: "/windows/arched.jpg",
    description: "Decorative curved-top windows adding elegance and timeless character.",
    features: [
      "Architectural Elegance",
      "Custom Curved Shapes",
      "Premium Aesthetic",
      "Natural Daylight",
      "Timeless Design",
      "Luxury Finish",
    ],
    detailImage: "/windows/details/arched-main.jpg",
    dimensionImage: "/windows/details/arched-dimension.jpg",
  },
  {
    title: "Top Hung (Awning) Window",
    image: "/windows/top-hung.jpg",
    description: "Top-hinged windows providing ventilation even during light rain.",
    features: [
      "Rain Protection",
      "Continuous Ventilation",
      "Compact Operation",
      "Weather Resistant",
      "Easy Maintenance",
      "Secure Design",
    ],
    detailImage: "/windows/details/top-hung-main.jpg",
    dimensionImage: "/windows/details/top-hung-dimension.jpg",
  },
  {
    title: "Ventilator",
    image: "/windows/ventilator.jpg",
    description: "Compact ventilation units designed for bathrooms, kitchens and utility areas.",
    features: [
      "Compact Design",
      "Improved Air Flow",
      "Bathroom Suitable",
      "Kitchen Suitable",
      "Moisture Resistant",
      "Low Maintenance",
    ],
    detailImage: "/windows/details/ventilator-main.jpg",
    dimensionImage: "/windows/details/ventilator-dimension.jpg",
  },
];

const glassTypes = [
  {
    title: "Clear Glass",
    image: "/glass/clear-glass.jpg",
    description:
      "Crystal-clear float glass offering maximum visibility and abundant natural daylight. Ideal for residential and commercial applications.",
    features: [
      "Maximum Transparency",
      "High Light Transmission",
      "Premium Finish",
      "Easy Maintenance",
      "Modern Appearance",
      "Versatile Applications",
    ],
  },
  {
    title: "Designer Glass",
    image: "/glass/designer-glass.jpg",
    description:
      "Decorative patterned glass that enhances interiors with premium textures and elegant artistic designs.",
    features: [
      "Decorative Patterns",
      "Luxury Appearance",
      "Custom Designs",
      "Premium Finish",
      "Interior Enhancement",
      "Modern Styling",
    ],
  },
  {
    title: "Frosted & Textured Glass",
    image: "/glass/frosted-textured-glass.jpg",
    description:
      "Elegant privacy glass that diffuses light while maintaining brightness and adding a sophisticated look.",
    features: [
      "Privacy Protection",
      "Light Diffusion",
      "Elegant Texture",
      "Moisture Resistant",
      "Decorative Finish",
      "Low Maintenance",
    ],
  },
  {
    title: "Toughened Glass",
    image: "/glass/toughened.jpg",
    description:
      "Safety glass engineered for high strength and resistance to impact and thermal stress.",
    features: [
      "Safety Glass",
      "High Impact Resistance",
      "Heat Resistant",
      "Long Lasting",
      "Strong Construction",
      "Certified Quality",
    ],
  },
  {
    title: "Tinted Glass",
    image: "/glass/tinted-glass.jpg",
    description:
      "Colored performance glass designed to reduce glare, improve privacy and minimize solar heat gain.",
    features: [
      "Heat Reduction",
      "UV Protection",
      "Glare Control",
      "Privacy Enhancement",
      "Energy Efficient",
      "Stylish Appearance",
    ],
  },
  {
    title: "Reflective Glass",
    image: "/glass/reflective-glass.jpg",
    description:
      "Solar-control reflective glass providing superior heat reduction and a premium exterior appearance.",
    features: [
      "Solar Control",
      "Mirror Finish",
      "Premium Look",
      "Daytime Privacy",
      "Energy Saving",
      "Modern Architecture",
    ],
  },
];

const doorTypes = [
  {
    title: "Slide and Fold Door",
    image: "/doors/slide-fold-door.jpg",
    desc: "Premium slide and fold door systems designed to provide maximum opening space with smooth operation and modern aesthetics. Engineered with high-quality profiles and precision hardware, these doors seamlessly connect indoor and outdoor spaces while offering exceptional durability, security, and weather resistance.",
    benefits: [
      "Maximum Opening Space",
      "Smooth Slide & Fold Mechanism",
      "Premium Hardware",
      "Weather Resistant",
      "High Security Locking",
      "Low Maintenance",
    ],
    dimensions: "Customizable height and width to fit standard patios and large architectural panoramic openings.",
  },
  {
    title: "Casement Door",
    image: "/doors/casement-door.jpg",
    desc: "Elegant casement doors designed for superior ventilation, enhanced security, and long-lasting performance. Featuring multi-point locking systems and premium-quality profiles, these doors provide excellent thermal insulation, weather protection, and a timeless architectural appearance.",
    benefits: [
      "Multi-Point Locking",
      "Superior Ventilation",
      "Weather Tight Seal",
      "Energy Efficient",
      "Noise Reduction",
      "Premium Finish",
    ],
    dimensions: "Available in standard single and double door sizes, with custom dimensions manufactured upon request.",
  },
  {
    title: "Sliding Doors",
    image: "/doors/sliding-door.jpg",
    desc: "Modern sliding doors designed to maximize space, provide effortless operation, and create seamless indoor-outdoor connectivity with elegant aesthetics.",
    benefits: [
      "Space Saving Design",
      "Smooth Sliding System",
      "Large Glass Panels",
      "Weather Resistant",
      "Low Maintenance",
      "Elegant Modern Look",
    ],
    dimensions: "Made-to-measure sizing available for balconies, living rooms, and wide architectural openings.",
  },
  {
    title: "Wooden Teak Door Frames",
    image: "/doors/teak-frame.jpg",
    desc: "Premium teak wood door frames crafted for durability, strength and timeless elegance.",
    benefits: [
      "100% Teak Wood",
      "Termite Resistant",
      "Long Lifespan",
      "Premium Finish",
      "High Strength",
      "Luxury Appearance",
    ],
    dimensions: "Custom frame sizes available for residential and commercial projects.",
    designs: [
      "/doors/teak-frame/design1.jpg",
      "/doors/teak-frame/design2.jpg",
      "/doors/teak-frame/design3.jpg",
      "/doors/teak-frame/design4.jpg",
      "/doors/teak-frame/design5.jpg",
    ],
  },
  {
    title: "Teak Wood Doors",
    image: "/doors/teak-door.jpg",
    desc: "Solid teak wood doors offering exceptional durability, security and natural beauty.",
    benefits: [
      "Solid Wood Construction",
      "Premium Finish",
      "Weather Resistant",
      "Luxury Design",
      "Long Lasting",
      "Custom Designs",
    ],
    dimensions: "Available in custom heights, widths and designer panel options.",
    designs: [
  "/doors/teak-door/design1.jpg",
  "/doors/teak-door/design2.jpg",
  "/doors/teak-door/design3.jpg",
  "/doors/teak-door/design4.jpg",
  "/doors/teak-door/design5.jpg",
  "/doors/teak-door/design6.jpg",
  "/doors/teak-door/design7.jpg",
  "/doors/teak-door/design8.jpg",
  "/doors/teak-door/design9.jpg",
  "/doors/teak-door/design10.jpg",
  "/doors/teak-door/design11.jpg",
  "/doors/teak-door/design12.jpg",
  "/doors/teak-door/design13.jpg",
  "/doors/teak-door/design14.jpg",
  "/doors/teak-door/design15.jpg",
  "/doors/teak-door/design16.jpg",
  "/doors/teak-door/design17.jpg",
  "/doors/teak-door/design18.jpg",
  "/doors/teak-door/design19.jpg",
  "/doors/teak-door/design20.jpg",
  "/doors/teak-door/design21.jpg",
  "/doors/teak-door/design22.jpg",
  "/doors/teak-door/design23.jpg",
  "/doors/teak-door/design24.jpg",
  "/doors/teak-door/design25.jpg",
  "/doors/teak-door/design26.jpg",
  "/doors/teak-door/design27.jpg",
  "/doors/teak-door/design28.jpg",
  "/doors/teak-door/design29.jpg",
  "/doors/teak-door/design30.jpg",
  "/doors/teak-door/design31.jpg",
  "/doors/teak-door/design32.jpg",
  "/doors/teak-door/design33.jpg",
  "/doors/teak-door/design34.jpg",
  "/doors/teak-door/design35.jpg",
  "/doors/teak-door/design36.jpg",
  "/doors/teak-door/design37.jpg",
  "/doors/teak-door/design38.jpg",
  "/doors/teak-door/design39.jpg",
  "/doors/teak-door/design40.jpg",
  "/doors/teak-door/design41.jpg",
  "/doors/teak-door/design42.jpg",
  "/doors/teak-door/design43.jpg",
  "/doors/teak-door/design44.jpg",
  "/doors/teak-door/design45.jpg",
  "/doors/teak-door/design46.jpg",
  "/doors/teak-door/design47.jpg",
  "/doors/teak-door/design48.jpg",
  "/doors/teak-door/design49.jpg",
],
  },
  {
    title: "WPC & Laminated Doors",
    image: "/doors/laminated-door.jpg",
    desc: "Designer laminated doors available in multiple textures, colors and finishes.",
    benefits: [
      "Scratch Resistant",
      "Elegant Finish",
      "Multiple Designs",
      "Easy Maintenance",
      "Affordable Luxury",
      "Long Lasting",
    ],
    dimensions: "Available in a wide variety of sizes and laminate finishes.",
    designs: [
  "/doors/laminated/design1.jpg",
  "/doors/laminated/design2.jpg",
  "/doors/laminated/design3.jpg",
  "/doors/laminated/design4.jpg",
  "/doors/laminated/design5.jpg",
  "/doors/laminated/design6.jpg",
  "/doors/laminated/design7.jpg",
  "/doors/laminated/design8.jpg",
  "/doors/laminated/design9.jpg",
  "/doors/laminated/design10.jpg",
  "/doors/laminated/design11.jpg",
  "/doors/laminated/design12.jpg",
  "/doors/laminated/design13.jpg",
  "/doors/laminated/design14.jpg",
  "/doors/laminated/design15.jpg",
  "/doors/laminated/design16.jpg",
  "/doors/laminated/design17.jpg",
  "/doors/laminated/design18.jpg",
  "/doors/laminated/design19.jpg",
  "/doors/laminated/design20.jpg",
  "/doors/laminated/design21.jpg",
  "/doors/laminated/design22.jpg",
  "/doors/laminated/design23.jpg",
  "/doors/laminated/design24.jpg",
  "/doors/laminated/design25.jpg",
  "/doors/laminated/design26.jpg",
  "/doors/laminated/design27.jpg",
  "/doors/laminated/design28.jpg",
  "/doors/laminated/design29.jpg",
  "/doors/laminated/design30.jpg",
  "/doors/laminated/design31.jpg",
  "/doors/laminated/design32.jpg",
  "/doors/laminated/design33.jpg",
  "/doors/laminated/design34.jpg",
  "/doors/laminated/design35.jpg",
  "/doors/laminated/design36.jpg",
  "/doors/laminated/design37.jpg",
  "/doors/laminated/design38.jpg",
  "/doors/laminated/design39.jpg",
  "/doors/laminated/design40.jpg",
  "/doors/laminated/design41.jpg",
  "/doors/laminated/design42.jpg",
  "/doors/laminated/design43.jpg",
  "/doors/laminated/design44.jpg",
  "/doors/laminated/design45.jpg",
  "/doors/laminated/design46.jpg",
  "/doors/laminated/design47.jpg",
  "/doors/laminated/design48.jpg",
  "/doors/laminated/design49.jpg",
  "/doors/laminated/design50.jpg",
  "/doors/laminated/design51.jpg",
  "/doors/laminated/design52.jpg",
  "/doors/laminated/design53.jpg",
  "/doors/laminated/design54.jpg",
  "/doors/laminated/design55.jpg",
  "/doors/laminated/design56.jpg",
  "/doors/laminated/design57.jpg",
  "/doors/laminated/design58.jpg",
  "/doors/laminated/design59.jpg",
  "/doors/laminated/design60.jpg",
  "/doors/laminated/design61.jpg",
  "/doors/laminated/design62.jpg",
  "/doors/laminated/design63.jpg",
  "/doors/laminated/design64.jpg",
],
  },
  {
    title: "Grooving Doors",
    image: "/doors/grooving-door.jpg",
    desc: "Modern grooved panel doors featuring contemporary patterns and premium craftsmanship.",
    benefits: [
      "Designer Appearance",
      "Modern Patterns",
      "Custom Grooves",
      "Premium Finish",
      "Durable Construction",
      "Luxury Interiors",
    ],
    dimensions: "Custom groove designs and dimensions available.",
    designs: [
  "/doors/grooving/design1.jpg",
  "/doors/grooving/design2.jpg",
  "/doors/grooving/design3.jpg",
  "/doors/grooving/design4.jpg",
  "/doors/grooving/design5.jpg",
  "/doors/grooving/design6.jpg",
  "/doors/grooving/design7.jpg",
  "/doors/grooving/design8.jpg",
  "/doors/grooving/design9.jpg",
  "/doors/grooving/design10.jpg",
  "/doors/grooving/design11.jpg",
  "/doors/grooving/design12.jpg",
  "/doors/grooving/design13.jpg",
  "/doors/grooving/design14.jpg",
  "/doors/grooving/design15.jpg",
  "/doors/grooving/design16.jpg",
  "/doors/grooving/design17.jpg",
  "/doors/grooving/design18.jpg",
  "/doors/grooving/design19.jpg",
  "/doors/grooving/design20.jpg",
  "/doors/grooving/design21.jpg",
  "/doors/grooving/design22.jpg",
  "/doors/grooving/design23.jpg",
  "/doors/grooving/design24.jpg",
  "/doors/grooving/design25.jpg",
  "/doors/grooving/design26.jpg",
  "/doors/grooving/design27.jpg",
  "/doors/grooving/design28.jpg",
  "/doors/grooving/design29.jpg",
  "/doors/grooving/design30.jpg",
  "/doors/grooving/design31.jpg",
  "/doors/grooving/design32.jpg",
  "/doors/grooving/design33.jpg",
  "/doors/grooving/design34.jpg",
  "/doors/grooving/design35.jpg",
  "/doors/grooving/design36.jpg",
  "/doors/grooving/design37.jpg",
  "/doors/grooving/design38.jpg",
  "/doors/grooving/design39.jpg",
  "/doors/grooving/design40.jpg",
  "/doors/grooving/design41.jpg",
  "/doors/grooving/design42.jpg",
],
  },
];

const curtainBlindTypes = [
  {
    title: "PVC Printed Curtain",
    image: "/blinds/pvc-printed.jpg",
    category: "Blinds",
    desc: "Decorative PVC printed curtains designed with stylish patterns for modern interiors while offering durability and moisture resistance.",
    features: [
      "Decorative Prints",
      "Water Resistant",
      "Easy Cleaning",
      "Durable Material",
      "Low Maintenance",
      "Modern Appearance",
    ],
  },
  {
    title: "Vertical Window Blind",
    image: "/blinds/vertical.jpg",
    category: "Blinds",
    desc: "Elegant vertical blinds suitable for large windows, office spaces and sliding glass doors.",
    features: [
      "Vertical Slats",
      "Smooth Operation",
      "Light Control",
      "Privacy",
      "Easy Maintenance",
      "Modern Design",
    ],
  },
  {
    title: "Venetian Window Blind",
    image: "/blinds/venetian.jpg",
    category: "Blinds",
    desc: "Classic horizontal slat blinds offering excellent privacy and precise light adjustment.",
    features: [
      "Horizontal Slats",
      "Adjustable Lighting",
      "Premium Finish",
      "Easy Cleaning",
      "Durable",
      "Elegant Appearance",
    ],
  },
  {
    title: "Cellular / Honeycomb Blind",
    image: "/blinds/honeycomb.jpg",
    category: "Blinds",
    desc: "Honeycomb blinds designed for superior insulation, energy efficiency and modern aesthetics.",
    features: [
      "Thermal Insulation",
      "Noise Reduction",
      "Energy Efficient",
      "Premium Fabric",
      "Modern Style",
      "Lightweight",
    ],
  },
  {
    title: "Roman Window Blind",
    image: "/blinds/roman.jpg",
    category: "Blinds",
    desc: "Soft fabric blinds that fold into elegant pleats, adding luxury to residential and commercial interiors.",
    features: [
      "Luxury Fabric",
      "Soft Folds",
      "Elegant Design",
      "Smooth Operation",
      "Custom Fabrics",
      "Premium Finish",
    ],
  },
  {
    title: "Roller Window Blind",
    image: "/blinds/roller.jpg",
    category: "Blinds",
    desc: "Simple and contemporary roller blinds providing excellent light control and privacy.",
    features: [
      "Smooth Rolling",
      "Space Saving",
      "Minimal Design",
      "Easy Operation",
      "Easy Maintenance",
      "Custom Colours",
    ],
  },
  {
    title: "Mini Window Blind",
    image: "/blinds/mini.jpg",
    category: "Blinds",
    desc: "Compact horizontal blinds designed for smaller windows with a clean modern appearance.",
    features: [
      "Compact Design",
      "Space Saving",
      "Easy Cleaning",
      "Lightweight",
      "Affordable",
      "Modern Finish",
    ],
  },
  {
    title: "Panels Window Blind",
    image: "/blinds/panel.jpg",
    category: "Blinds",
    desc: "Sliding panel blinds ideal for wide windows, patio doors and office partitions.",
    features: [
      "Sliding Panels",
      "Wide Coverage",
      "Modern Style",
      "Minimal Design",
      "Smooth Movement",
      "Premium Finish",
    ],
  },
  {
    title: "Motorized Window Blind",
    image: "/blinds/motorized.jpg",
    category: "Blinds",
    desc: "Smart motorized blinds controlled via remote, smartphone or home automation systems.",
    features: [
      "Remote Control",
      "Smart Home Compatible",
      "Silent Motor",
      "Luxury Automation",
      "Timer Function",
      "Easy Operation",
    ],
  },
  {
    title: "Aluminum Window Blind",
    image: "/blinds/aluminium.jpg",
    category: "Blinds",
    desc: "Premium aluminum blinds engineered for durability, corrosion resistance and sleek interiors.",
    features: [
      "Aluminum Slats",
      "Rust Resistant",
      "Long Lifespan",
      "Easy Cleaning",
      "Modern Finish",
      "High Strength",
    ],
  },
  {
    title: "Outdoor Blind",
    image: "/blinds/outdoor.jpg",
    category: "Blinds",
    desc: "Weather-resistant outdoor blinds suitable for balconies, patios and outdoor living spaces.",
    features: [
      "Weather Resistant",
      "UV Protection",
      "Outdoor Suitable",
      "Durable Fabric",
      "Wind Resistant",
      "Easy Operation",
    ],
  },
  {
    title: "Micro Blind",
    image: "/blinds/micro.jpg",
    category: "Blinds",
    desc: "Slim-profile micro blinds featuring ultra-thin slats for refined light control and elegant interiors.",
    features: [
      "Slim Slats",
      "Elegant Design",
      "Excellent Light Control",
      "Premium Finish",
      "Space Efficient",
      "Modern Appearance",
    ],
  },
];

const faqs = [
  {
    q: "How do I choose between uPVC and Aluminium windows?",
    a: "uPVC is excellent for thermal insulation, noise reduction, and low maintenance, making it perfect for residential spaces. Aluminium offers a sleeker profile, higher structural strength for larger panes, and a premium modern aesthetic often preferred in contemporary or commercial designs."
  },
  {
    q: "Can I customize the size and design of my doors and windows?",
    a: "Absolutely. All our windows, doors, and blinds are made-to-measure. During our site visit, we take precise measurements and can customize the dimensions, frame colors, glass types, and hardware to match your exact architectural requirements."
  },
  {
    q: "Are your window systems energy efficient?",
    a: "Yes. Our systems feature multi-chambered profiles and options for double or triple-glazed glass, significantly reducing thermal transfer. This keeps your space cooler in summer and warmer in winter, lowering your energy costs."
  },
  {
    q: "What kind of warranty do you offer on your products?",
    a: "We offer up to 20 years of warranty coverage depending on the material and product type. This covers profile discoloration, structural integrity, and hardware performance under standard usage conditions."
  },
  {
    q: "Do you handle the installation process as well?",
    a: "Yes, we provide end-to-end service. Our certified in-house engineering team handles the precise manufacturing, followed by professional on-site installation to ensure perfect sealing and operation."
  },
  {
    q: "Are your outdoor blinds weatherproof?",
    a: "Yes, our outdoor blinds are specifically engineered with durable, weather-resistant, and UV-protected fabrics designed to withstand harsh sunlight, rain, and strong winds, perfect for patios and balconies."
  },
  {
    q: "How do motorized blinds work and are they hard to maintain?",
    a: "Motorized blinds operate via a concealed silent motor controlled by a remote, smartphone app, or smart home system. They are incredibly low maintenance and eliminate the need for cords, providing a clean look and enhanced child safety."
  }
];

const reviews = [
  { name: "Vikram Mehta", role: "Homeowner", review: "Upgraded our entire villa with their uPVC casement windows. The noise reduction is incredible, and the finish looks absolutely premium. Highly recommend their installation team." },
  { name: "Priya Sharma", role: "Interior Designer", review: "I frequently specify their motorized blinds and aluminium sliding doors for my clients. The sleek profiles and flawless operation make them my go-to choice for modern spaces." },
  { name: "Arjun Reddy", role: "Architect", review: "Their technical expertise in handling large-span aluminium systems is commendable. The structural integrity and thermal breaks perform exactly as simulated in our designs." },
  { name: "Sneha Desai", role: "Homeowner", review: "We installed the teak wood doors for our main entrance and internal rooms. The craftsmanship, natural grain finish, and sturdiness are just outstanding." },
  { name: "Rajiv Kapoor", role: "Commercial Developer", review: "From the frameless glass partitions to the slide & fold exterior doors, they delivered everything on our timeline. A highly reliable partner for large-scale projects." },
  { name: "Meera Nair", role: "Boutique Owner", review: "The Roman blinds and designer glass they installed completely transformed my studio's aesthetic. Elegant, perfectly measured, and beautifully executed." },
  { name: "Amit Patel", role: "Homeowner", review: "The Tilt & Turn windows they suggested are brilliant for our high-rise apartment. Safe ventilation without compromising on security or the view." },
  { name: "Sarah Thomas", role: "Estate Manager", review: "Their after-sales support is as good as their installation. Prompt response times and the 20-year warranty gives our clients complete peace of mind." }
];

const infiniteReviews = [...reviews, ...reviews];

// Reusable Custom Draggable Carousel Component
function DraggableCarousel({
  items,
  onItemClick,
}: {
  items: any[];
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
      className="flex gap-6 md:gap-10 overflow-x-auto px-6 cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-10"
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
          className="shrink-0 group flex flex-col items-center select-none cursor-pointer"
        >
          <div className="relative w-[320px] md:w-[420px] h-[220px] md:h-[280px] rounded-[32px] overflow-hidden transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-[0_30px_80px_rgba(10,46,111,0.35)]">
            <img
              src={item.image}
              alt={item.title}
              draggable={false}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
          </div>
          <h3 className="mt-6 text-xl md:text-2xl font-bold text-[#071224] group-hover:text-[#0A2E6F] transition-colors duration-300 text-center px-4 w-[320px] md:w-[420px] leading-tight">
            {item.title}
          </h3>
        </div>
      ))}
    </div>
  );
}

export default function WindowsDoorsPage() {
  const [selectedWindow, setSelectedWindow] = useState<any>(null);
  const [selectedGlass, setSelectedGlass] = useState<any>(null);
  const [selectedDoor, setSelectedDoor] = useState<any>(null);
  const [selectedCurtain, setSelectedCurtain] = useState<any>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<any>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const isAnyPopupOpen =
    !!selectedWindow ||
    !!selectedDoor ||
    !!selectedGlass ||
    !!selectedCurtain ||
    !!selectedMaterial;

  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }, []);

  useEffect(() => {
    const body = document.body;
    if (isAnyPopupOpen) {
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
      window.scrollTo({
        top: scrollY,
        left: 0,
        behavior: "instant",
      });
    }

    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "";
    };
  }, [isAnyPopupOpen]);

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
        {/* HERO */}
        <section className="relative pt-40 pb-28 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/10 blur-[180px]" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[180px]" />
          </div>
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div {...fadeLeft}>
                <h1 className="mt-6 text-5xl md:text-6xl xl:text-7xl font-black text-[#071224] tracking-tight leading-[0.95]">
                  Engineered <br />
                  For <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A2E6F] via-[#1E4ED8] to-indigo-600">
                    Luxury Living
                  </span>
                </h1>
                <p className="mt-8 text-lg text-slate-600 leading-9 max-w-xl">
                  Discover premium uPVC, Aluminum, Wooden, WPC and Steel windows &
                  doors designed for security, comfort and timeless elegance.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row sm:flex-nowrap items-stretch sm:items-center gap-3 sm:gap-3.5 py-2.5 px-0.5">
  {/* Book Consultation */}
  <Link
    href="/contact"
    className="group relative inline-flex w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-full bg-[#0A2E6F] px-6 sm:px-7 py-3.5 text-sm font-semibold tracking-wide text-white transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[#082559] active:translate-y-0"
  >
    <span className="whitespace-nowrap">Book Consultation</span>
  </Link>

  {/* Explore Collection */}
  <Link
    href="#materials"
    className="group inline-flex w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 sm:px-7 py-3.5 text-sm font-semibold tracking-wide text-[#0A1A35] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#0A2E6F]/30 hover:bg-slate-50 active:translate-y-0"
  >
    <span className="whitespace-nowrap">Explore Collection</span>
  </Link>

  {/* Explore Products */}
  <a
    href="https://shop.simmplyperfect.com/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Explore Simmply Perfect online store"
    className="group inline-flex w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-full border border-[#0A2E6F]/20 bg-blue-50/50 px-6 sm:px-7 py-3.5 text-sm font-semibold tracking-wide text-[#0A2E6F] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#0A2E6F] hover:bg-[#0A2E6F] hover:text-white active:translate-y-0"
  >
    <span className="whitespace-nowrap">Explore Products</span>
    <ArrowUpRight
      size={16}
      strokeWidth={2.2}
      className="shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    />
  </a>
</div>
              </motion.div>
              <motion.div {...fadeRight} className="relative">
                <img
                  src="/about/hero.jpg"
                  alt="Luxury Home"
                  className="w-full rounded-[40px] shadow-[0_40px_120px_rgba(0,0,0,0.15)]"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="pb-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              {stats.map((item) => (
                <motion.div
                  key={item.label}
                  {...fadeUp}
                  className="bg-white rounded-[32px] p-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
                >
                  <h3 className="text-6xl font-black text-[#0A2E6F]">
                    <CountUp end={item.number} duration={3} decimals={item.decimals ?? 0} />
                    {item.suffix}
                  </h3>
                  <p className="mt-4 text-slate-600">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* MATERIALS */}
        <section id="materials" className="py-32 bg-slate-50 overflow-visible">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div {...fadeUp} className="text-center">
              <span className="text-[#0A2E6F] font-semibold uppercase tracking-[4px]">
                Materials We Use
              </span>
              <h2 className="mt-4 text-5xl md:text-6xl font-black text-[#071224]">
                Built With Premium Materials
              </h2>
              <p className="mt-6 text-slate-600 max-w-3xl mx-auto leading-8">
                Every project is built using high-performance materials
                that deliver strength, durability, thermal efficiency,
                aesthetics and long-term value.
              </p>
            </motion.div>
          </div>
          <div className="mt-20 py-8">
            <DraggableCarousel items={materials} onItemClick={setSelectedMaterial} />
          </div>
        </section>

        {selectedMaterial && (
          <div
            className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            onClick={() => setSelectedMaterial(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl max-h-[95vh] flex flex-col"
            >
              <button
                onClick={() => setSelectedMaterial(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-800 flex items-center justify-center text-lg z-20 transition-colors shadow-sm"
                aria-label="Close"
              >
                ✕
              </button>
              <div className="overflow-y-auto">
                <div className="p-5 md:p-6 pb-0">
                  <img
                    src={selectedMaterial.image}
                    alt={selectedMaterial.title}
                    className="w-full h-[200px] object-cover rounded-xl border border-slate-100"
                  />
                </div>
                <div className="p-5 md:p-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#071224] tracking-tight">
                    {selectedMaterial.title}
                  </h2>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {selectedMaterial.description}
                  </p>
                  {selectedMaterial.manufacturedItems &&
                    selectedMaterial.manufacturedItems.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">
                          Commonly Used For
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedMaterial.manufacturedItems.map(
                            (item: string) => (
                              <span
                                key={item}
                                className="inline-flex px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#0A2E6F] font-semibold text-xs tracking-wide"
                              >
                                {item}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-[#071224] mb-4">
                      Key Features
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {selectedMaterial.features?.map((feature: string) => (
                        <div
                          key={feature}
                          className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50 hover:border-blue-200 transition-colors"
                        >
                          <CheckCircle2
                            size={18}
                            className="text-green-600 flex-shrink-0"
                          />
                          <span className="text-sm font-medium text-slate-700 leading-tight">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/contact"
                      className="flex-1 bg-[#0A2E6F] hover:bg-blue-900 text-white px-6 py-3 rounded-xl font-semibold text-sm text-center transition-colors shadow-sm"
                    >
                      Contact Us
                    </Link>
                    <button
                      onClick={() => setSelectedMaterial(null)}
                      className="flex-1 border border-slate-300 hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* WINDOW TYPES */}
        <section className="py-32 bg-white overflow-visible">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div {...fadeUp} className="text-center">
              <span className="text-[#0A2E6F] font-semibold uppercase tracking-[4px]">
                Window Collection
              </span>
              <h2 className="mt-4 text-5xl md:text-6xl font-black text-[#071224]">
                Explore Our Window Types
              </h2>
              <p className="mt-6 max-w-3xl mx-auto text-slate-600 leading-8">
                Designed for aesthetics, ventilation, energy efficiency and
                luxury living.
              </p>
            </motion.div>
          </div>
          <div className="mt-20 py-10">
            <DraggableCarousel items={windowTypes} onItemClick={setSelectedWindow} />
          </div>
        </section>

        {selectedWindow && (
          <div
            className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm overflow-y-auto"
            onClick={() => setSelectedWindow(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative min-h-screen flex items-center justify-center py-6 px-4"
            >
              <div className="w-full max-w-5xl rounded-2xl overflow-hidden bg-white shadow-2xl">
                <div className="relative h-[280px]">
                  <img
                    src={selectedWindow.image}
                    alt={selectedWindow.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                  <button
                    onClick={() => setSelectedWindow(null)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center text-lg hover:bg-white hover:text-black transition-colors"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                  <div className="absolute bottom-6 left-6 md:left-8 max-w-xl">
                    <span className="inline-block rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-400/30 px-3 py-1 text-xs tracking-wider uppercase text-blue-100 mb-3">
                      Premium Collection
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                      {selectedWindow.title}
                    </h2>
                    <p className="mt-2 text-sm text-gray-300 line-clamp-2">
                      {selectedWindow.description}
                    </p>
                  </div>
                </div>

                <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 p-6 md:p-8">
                  <div className="space-y-8">
                    <section>
                      <h3 className="text-xl font-bold text-[#0A2E6F] mb-4">
                        Product Features
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedWindow.features?.map((feature: string) => (
                          <div
                            key={feature}
                            className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3 hover:border-blue-200 hover:bg-blue-50/30 transition-colors"
                          >
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0A2E6F] text-white flex items-center justify-center text-xs">
                              ✓
                            </div>
                            <span className="text-sm font-medium text-slate-700 leading-tight">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section>
                      <h3 className="text-xl font-bold text-[#0A2E6F] mb-4">
                        Technical Specifications
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="group">
                          <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                            <img
                              src={selectedWindow.dimensionImage}
                              alt="Dimension Drawing"
                              className="w-full h-32 object-contain p-2 group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <h4 className="mt-2 text-xs text-center font-semibold text-slate-600 uppercase tracking-wide">
                            Dimensions
                          </h4>
                        </div>
                        <div className="group">
                          <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                            <img
                              src={selectedWindow.detailImage}
                              alt="Profile Detail"
                              className="w-full h-32 object-contain p-2 group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <h4 className="mt-2 text-xs text-center font-semibold text-slate-600 uppercase tracking-wide">
                            Profile Detail
                          </h4>
                        </div>
                      </div>
                    </section>

                    {selectedWindow.gallery &&
                      selectedWindow.gallery.length > 0 && (
                        <section className="mt-8">
                          <div className="flex items-center justify-between mb-5">
                            <div>
                              <h3 className="text-2xl font-black text-[#0A2E6F]">
                                Design Gallery
                              </h3>
                              <p className="text-sm text-slate-500 mt-1">
                                Explore our premium collection of designer patterns.
                              </p>
                            </div>
                            <div className="px-4 py-2 rounded-full bg-blue-50 text-[#0A2E6F] text-sm font-semibold">
                              {selectedWindow.gallery.length} Designs
                            </div>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                            {selectedWindow.gallery.map(
                              (img: string, index: number) => (
                                <div
                                  key={index}
                                  className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-2xl hover:border-[#0A2E6F] transition-all duration-500 cursor-pointer"
                                >
                                  <img
                                    src={img}
                                    alt={`Design ${index + 1}`}
                                    className="w-full aspect-[300/160] object-cover transition-transform duration-700 group-hover:scale-105"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                  <div className="absolute bottom-3 left-3 right-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    <div className="bg-white/90 backdrop-blur-md rounded-xl py-2 text-center">
                                      <p className="text-xs text-slate-500">
                                        Premium Collection
                                      </p>
                                      <h4 className="font-bold text-[#0A2E6F]">
                                        Design {index + 1}
                                      </h4>
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </section>
                      )}
                  </div>

                  <div className="relative">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sticky top-6">
                      <h3 className="text-lg font-bold text-[#0A2E6F]">
                        Why Choose This Window?
                      </h3>
                      <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                        Our premium window systems combine modern engineering,
                        exceptional thermal insulation, elegant aesthetics, and
                        long-lasting durability, designed to withstand extreme
                        weather.
                      </p>
                      <div className="mt-6 space-y-3 text-sm">
                        {[
                          { label: "Energy Efficient", value: "★★★★★" },
                          { label: "Noise Reduction", value: "★★★★★" },
                          { label: "Weather Resistance", value: "★★★★★" },
                          { label: "Security", value: "★★★★★" },
                          { label: "Maintenance", value: "Minimal" },
                        ].map((item, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between border-b border-slate-200 pb-2 last:border-0 last:pb-0"
                          >
                            <span className="text-slate-600 font-medium">
                              {item.label}
                            </span>
                            <span className="text-slate-800 font-semibold">
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-8 space-y-3">
                        <Link
                          href="/contact"
                          className="block w-full rounded-xl bg-[#0A2E6F] py-3 text-center text-sm text-white font-semibold shadow-sm hover:bg-blue-900 transition-colors"
                        >
                          Get In Touch
                        </Link>
                        <button
                          onClick={() => setSelectedWindow(null)}
                          className="block w-full rounded-xl border border-slate-300 bg-white py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GLASS COLLECTION */}
        <section className="py-32 bg-slate-50 overflow-visible">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div {...fadeUp} className="text-center">
              <span className="text-[#0A2E6F] font-semibold uppercase tracking-[4px]">
                Glass Collection
              </span>
              <h2 className="mt-4 text-5xl md:text-6xl font-black text-[#071224]">
                Premium Glass Options
              </h2>
              <p className="mt-6 max-w-3xl mx-auto text-slate-600 leading-8">
                Choose from a wide range of high-performance glass solutions
                designed for comfort, safety, privacy and energy efficiency.
              </p>
            </motion.div>
          </div>
          <div className="mt-20 py-16">
            <DraggableCarousel items={glassTypes} onItemClick={setSelectedGlass} />
          </div>
        </section>

        {selectedGlass && (
          <div
            className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            onClick={() => setSelectedGlass(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl max-h-[95vh] flex flex-col"
            >
              <button
                onClick={() => setSelectedGlass(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-800 flex items-center justify-center text-lg z-20 transition-colors shadow-sm"
                aria-label="Close"
              >
                ✕
              </button>
              <div className="overflow-y-auto">
                <div className="p-5 md:p-6 pb-0">
                  <img
                    src={selectedGlass.image}
                    alt={selectedGlass.title}
                    className="w-full h-[200px] object-cover rounded-xl border border-slate-100"
                  />
                </div>
                <div className="p-5 md:p-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#071224] tracking-tight">
                    {selectedGlass.title}
                  </h2>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {selectedGlass.description}
                  </p>
                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-[#071224] mb-4">
                      Key Features
                    </h3>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {selectedGlass.features.map((feature: string) => (
                        <div
                          key={feature}
                          className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50 hover:border-blue-200 transition-colors"
                        >
                          <CheckCircle2
                            size={18}
                            className="text-green-600 flex-shrink-0"
                          />
                          <span className="text-sm font-medium text-slate-700 leading-tight">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/contact"
                      className="flex-1 bg-[#0A2E6F] hover:bg-blue-900 text-white px-6 py-3 rounded-xl font-semibold text-sm text-center transition-colors shadow-sm"
                    >
                      Get In Touch
                    </Link>
                    <button
                      onClick={() => setSelectedGlass(null)}
                      className="flex-1 border border-slate-300 hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DOOR TYPES */}
        <section className="py-32 bg-white overflow-visible">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div {...fadeUp} className="text-center">
              <span className="text-[#0A2E6F] font-semibold uppercase tracking-[4px]">
                Door Collection
              </span>
              <h2 className="mt-4 text-5xl md:text-6xl font-black text-[#071224]">
                Explore Our Door Types
              </h2>
              <p className="mt-6 max-w-3xl mx-auto text-slate-600 leading-8">
                Discover elegant and secure door systems designed for
                modern homes, villas and commercial projects.
              </p>
            </motion.div>
          </div>
          <div className="mt-20 py-10">
            <DraggableCarousel items={doorTypes} onItemClick={setSelectedDoor} />
          </div>
        </section>

        {/* DOOR POPUP */}
        {selectedDoor && (
          <div
            className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            onClick={() => setSelectedDoor(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl max-h-[95vh] flex flex-col"
            >
              <div className="overflow-y-auto w-full">
                <div className="relative h-[240px] shrink-0">
                  <img
                    src={selectedDoor.image}
                    alt={selectedDoor.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <button
                    onClick={() => setSelectedDoor(null)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-slate-800 flex items-center justify-center text-lg z-20 transition-colors shadow-sm"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                  <div className="absolute bottom-5 left-5 md:bottom-6 md:left-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                      {selectedDoor.title}
                    </h2>
                  </div>
                </div>

                <div className="p-5 md:p-8">
                  <div>
                    <h3 className="text-lg font-bold text-[#0A2E6F] mb-3">
                      Overview
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {selectedDoor.desc}
                    </p>
                  </div>

                  {selectedDoor.benefits && selectedDoor.benefits.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-lg font-bold text-[#0A2E6F] mb-4">
                        Features & Benefits
                      </h3>
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {selectedDoor.benefits.map((benefit: string) => (
                          <div
                            key={benefit}
                            className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50 hover:border-blue-200 transition-colors"
                          >
                            <CheckCircle2
                              size={18}
                              className="text-green-600 flex-shrink-0"
                            />
                            <span className="text-sm font-medium text-slate-700 leading-tight">
                              {benefit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedDoor.dimensionImage && (
                    <div className="mt-8">
                      <h3 className="text-lg font-bold text-[#0A2E6F] mb-4">
                        Dimensions & Specifications
                      </h3>
                      <div className="grid md:grid-cols-2 gap-5 items-center">
                        <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 p-2">
                          <img
                            src={selectedDoor.dimensionImage}
                            alt="Dimensions"
                            className="w-full h-auto max-h-[200px] object-contain"
                          />
                        </div>
                        <div>
                          <p className="text-sm text-slate-600 leading-relaxed">
                            {selectedDoor.dimensions}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedDoor.hardwareImage && (
                    <div className="mt-8">
                      <h3 className="text-lg font-bold text-[#0A2E6F] mb-4">
                        Product Details
                      </h3>
                      <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 p-2">
                        <img
                          src={selectedDoor.hardwareImage}
                          alt="Door Details"
                          className="w-full h-auto max-h-[240px] object-contain"
                        />
                      </div>
                    </div>
                  )}

                  {selectedDoor.designs && selectedDoor.designs.length > 0 && (
                    <div className="mt-10">
                      <div className="flex items-center justify-between mb-5">
                        <h3 className="text-xl font-bold text-[#0A2E6F]">
                          Available Designs
                        </h3>
                        <span className="text-sm font-semibold text-slate-500">
                          {selectedDoor.designs.length} Designs
                        </span>
                      </div>
                      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 h-[540px] overflow-y-auto custom-scrollbar">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                          {selectedDoor.designs.map(
                            (design: string, index: number) => (
                              <div
                                key={index}
                                className="group bg-white rounded-2xl border border-slate-200 p-3 hover:border-[#0A2E6F] hover:shadow-xl transition-all duration-300"
                              >
                                <div className="h-[330px] flex items-center justify-center rounded-xl overflow-hidden bg-white">
                                  <img
                                    src={design}
                                    alt={`Design ${index + 1}`}
                                    className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                                  />
                                </div>
                                <p className="mt-3 text-center text-sm font-semibold text-slate-600">
                                  Design {index + 1}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-10 flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/contact"
                      className="flex-1 bg-[#0A2E6F] hover:bg-blue-900 text-white px-6 py-3 rounded-xl font-semibold text-sm text-center transition-colors shadow-sm"
                    >
                      Get In Touch
                    </Link>
                    <button
                      onClick={() => setSelectedDoor(null)}
                      className="flex-1 border border-slate-300 hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CURTAINS & BLINDS */}
        <section className="py-32 bg-slate-50 overflow-visible">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div {...fadeUp} className="text-center">
              <span className="text-[#0A2E6F] font-semibold uppercase tracking-[4px]">
                Curtains & Blinds
              </span>
              <h2 className="mt-4 text-5xl md:text-6xl font-black text-[#071224]">
                Elevate Your Interiors
              </h2>
              <p className="mt-6 max-w-3xl mx-auto text-slate-600 leading-8">
                Discover premium curtains and blinds designed
                to enhance privacy, light control and interior aesthetics.
              </p>
            </motion.div>
          </div>
          <div className="mt-20 py-10">
            <DraggableCarousel items={curtainBlindTypes} onItemClick={setSelectedCurtain} />
          </div>
        </section>

        {/* CURTAIN & BLIND POPUP */}
        {selectedCurtain && (
          <div
            className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            onClick={() => setSelectedCurtain(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl max-h-[95vh] flex flex-col"
            >
              <button
                onClick={() => setSelectedCurtain(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-800 flex items-center justify-center text-lg z-20 transition-colors shadow-sm"
                aria-label="Close"
              >
                ✕
              </button>
              <div className="overflow-y-auto">
                <div className="p-5 md:p-6 pb-0">
                  <img
                    src={selectedCurtain.image}
                    alt={selectedCurtain.title}
                    className="w-full h-[200px] object-cover rounded-xl border border-slate-100"
                  />
                </div>
                <div className="p-5 md:p-6">
                  <span className="inline-flex px-3 py-1 rounded-full bg-[#0A2E6F]/10 text-[#0A2E6F] font-semibold text-xs tracking-wide mb-3">
                    {selectedCurtain.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#071224] tracking-tight">
                    {selectedCurtain.title}
                  </h2>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {selectedCurtain.desc}
                  </p>
                  {selectedCurtain.features && (
                    <div className="mt-8">
                      <h3 className="text-lg font-bold text-[#071224] mb-4">
                        Key Features
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {selectedCurtain.features.map((feature: string) => (
                          <div
                            key={feature}
                            className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50 hover:border-blue-200 transition-colors"
                          >
                            <CheckCircle2
                              size={18}
                              className="text-green-600 flex-shrink-0"
                            />
                            <span className="text-sm font-medium text-slate-700 leading-tight">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/contact"
                      className="flex-1 bg-[#0A2E6F] hover:bg-blue-900 text-white px-6 py-3 rounded-xl font-semibold text-sm text-center transition-colors shadow-sm"
                    >
                      Get In Touch
                    </Link>
                    <button
                      onClick={() => setSelectedCurtain(null)}
                      className="flex-1 border border-slate-300 hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PROCESS SECTION */}
        <section className="py-32 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div {...fadeUp} className="text-center">
              <span className="text-[#0A2E6F] font-semibold uppercase tracking-[4px]">
                How We Work
              </span>
              <h2 className="mt-4 text-5xl md:text-6xl font-black text-[#071224]">
                Our Process
              </h2>
              <p className="mt-6 max-w-3xl mx-auto text-slate-600 leading-8">
                From consultation to final installation,
                every project follows a proven workflow
                that guarantees quality, precision and
                complete customer satisfaction.
              </p>
            </motion.div>
            <div className="mt-24">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
                {[
                  {
                    no: "01",
                    title: "Consultation",
                    icon: <MessageSquare size={42} />,
                    desc: "Discuss project requirements and expectations.",
                  },
                  {
                    no: "02",
                    title: "Site Visit",
                    icon: <Ruler size={42} />,
                    desc: "Accurate measurements and technical assessment.",
                  },
                  {
                    no: "03",
                    title: "Design Approval",
                    icon: <PencilRuler size={42} />,
                    desc: "Finalize design, material and specifications.",
                  },
                  {
                    no: "04",
                    title: "Manufacturing",
                    icon: <Factory size={42} />,
                    desc: "Precision fabrication using premium materials.",
                  },
                  {
                    no: "05",
                    title: "Installation",
                    icon: <Hammer size={42} />,
                    desc: "Professional installation by trained experts.",
                  },
                  {
                    no: "06",
                    title: "After Support",
                    icon: <Headphones size={42} />,
                    desc: "Dedicated support and maintenance services.",
                  },
                ].map((step, index) => (
                  <motion.div
                    key={step.no}
                    {...fadeUp}
                    whileHover={{
                      y: -12,
                      scale: 1.03,
                    }}
                    className="relative group"
                  >
                    {index !== 5 && (
                      <div className="hidden xl:block absolute top-12 left-full w-8 h-[2px] bg-gradient-to-r from-[#0A2E6F]/40 to-cyan-500/40" />
                    )}
                    <div className="relative h-full rounded-[32px] border border-slate-200 bg-white p-8 transition-all duration-700 shadow-[0_20px_60px_rgba(0,0,0,0.05)] group-hover:border-[#0A2E6F] group-hover:shadow-[0_30px_90px_rgba(10,46,111,0.12)]">
                      <span className="absolute top-4 right-5 text-6xl font-black text-slate-100 select-none">
                        {step.no}
                      </span>
                      <div className="w-16 h-16 rounded-2xl bg-[#0A2E6F]/10 text-[#0A2E6F] flex items-center justify-center">
                        {step.icon}
                      </div>
                      <h3 className="mt-8 text-xl font-black text-[#071224]">
                        {step.title}
                      </h3>
                      <p className="mt-4 text-slate-600 leading-7 text-sm">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section className="py-24 bg-slate-50 relative border-t border-slate-200/50">
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
        <section className="py-24 bg-white border-t border-slate-200/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0A2E6F]">Client Testimonials</span>
              <h2 className="text-4xl font-black text-[#071224] tracking-tight">Trusted By Industry Leaders</h2>
            </div>
          </div>
          
          <div className="mt-16 relative w-full overflow-hidden">
            {/* Gradient fades for the edges matching the section background */}
            <div className="absolute top-0 bottom-0 left-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            
            <div className="flex w-max gap-8 animate-marquee hover:[animation-play-state:paused] pl-8">
              {infiniteReviews.map((item, i) => (
                <div
                  key={`${item.name}-${i}`}
                  className="w-[320px] md:w-[420px] shrink-0 bg-slate-50 rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-xl hover:border-[#0A2E6F]/20 transition-all duration-300"
                >
                  <Quote className="absolute top-6 right-6 text-white w-24 h-24 -z-0 rotate-12 transition-transform duration-500 group-hover:rotate-0 group-hover:text-blue-100/50" />
                  <div className="relative z-10">
                    <div className="text-amber-400 text-lg tracking-widest flex gap-1">★★★★★</div>
                    <p className="mt-6 text-slate-700 leading-relaxed font-medium italic text-[15px]">"{item.review}"</p>
                    <div className="mt-8 pt-6 border-t border-slate-200">
                      <h4 className="font-bold text-[#071224]">{item.name}</h4>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">{item.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#071224]" />
          <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-blue-500/20 blur-[150px]" />
          <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-cyan-500/20 blur-[150px]" />
          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div
              {...fadeUp}
              className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl px-10 py-14 md:px-16 md:py-16 text-center"
            >
              <span className="inline-flex px-4 py-2 rounded-full bg-white/10 text-white font-semibold text-xs tracking-[3px] uppercase">
                Ready To Get Started?
              </span>
              <h2 className="mt-6 text-4xl md:text-6xl font-black text-white leading-tight">
                Transform Your Space With
                <br />
                Premium Windows & Doors
              </h2>
              <p className="mt-5 max-w-3xl mx-auto text-slate-300 leading-8">
                From design consultation to installation, we deliver complete
                solutions for homes, offices, villas and commercial spaces.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="bg-white text-[#071224] px-8 py-3.5 rounded-full font-bold transition-all duration-300 hover:scale-105"
                >
                  Get Free Consultation
                </Link>
                <a
                  href="tel:+919390719623"
                  className="border border-white/20 text-white px-8 py-3.5 rounded-full font-bold transition-all duration-300 hover:bg-white/10"
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
