import type { GalleryProject } from "@/types/gallery";

export const galleryProjects: GalleryProject[] = [
  {
    id: 1,
    slug: "premium-upvc-residence",
    title: "Premium UPVC Residence",
    category: "Windows & Doors",
    status: "Featured",
    location: "Hyderabad",
    year: "2026",
    shortDescription:
      "Premium UPVC windows and doors designed for a modern residential property.",
    description:
      "A complete windows and doors transformation featuring premium UPVC systems designed to improve natural lighting, ventilation, insulation, and architectural appearance.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600",
    services: [
      "UPVC Windows",
      "Sliding Doors",
      "Installation",
      "Custom Design",
    ],
  },

  {
    id: 2,
    slug: "luxury-living-interiors",
    title: "Luxury Living Interiors",
    category: "Interiors",
    status: "Featured",
    location: "Hyderabad",
    year: "2026",
    shortDescription:
      "Contemporary luxury interiors designed around comfort and functionality.",
    description:
      "A premium residential interior project combining modern materials, elegant finishes, customized furniture, and functional space planning.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600",
    services: [
      "Interior Design",
      "Furniture",
      "Lighting",
      "Space Planning",
    ],
  },

  {
    id: 3,
    slug: "complete-home-transformation",
    title: "Complete Home Transformation",
    category: "Renovations",
    status: "Featured",
    location: "Secunderabad",
    year: "2026",
    shortDescription:
      "Complete residential renovation transforming an existing property.",
    description:
      "A comprehensive renovation project covering structural improvements, interior upgrades, electrical systems, plumbing, finishes, and architectural enhancements.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600",
    services: [
      "Civil Work",
      "Electrical",
      "Plumbing",
      "Interior Finishing",
    ],
  },

  {
    id: 4,
    slug: "modern-window-installation",
    title: "Modern Window Installation",
    category: "Windows & Doors",
    status: "Completed",
    location: "Kompally",
    year: "2025",
    shortDescription:
      "Custom window systems installed for a premium residence.",
    description:
      "A completed windows project featuring custom-built window systems, professional installation, and premium finishing.",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=1600",
    services: [
      "Windows",
      "Installation",
      "Customization",
    ],
  },

  {
    id: 5,
    slug: "contemporary-bedroom",
    title: "Contemporary Bedroom",
    category: "Interiors",
    status: "Completed",
    location: "Banjara Hills",
    year: "2025",
    shortDescription:
      "A comfortable and contemporary bedroom interior.",
    description:
      "A completed bedroom interior project featuring custom furniture, lighting, storage, and premium finishes.",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1600",
    services: [
      "Bedroom Interior",
      "Furniture",
      "Lighting",
    ],
  },

  {
    id: 6,
    slug: "residential-renovation",
    title: "Residential Renovation",
    category: "Renovations",
    status: "Completed",
    location: "Miyapur",
    year: "2025",
    shortDescription:
      "A complete renovation designed to modernize an existing residence.",
    description:
      "The project included structural upgrades, electrical improvements, painting, flooring, and interior finishing.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600",
    services: [
      "Renovation",
      "Civil Work",
      "Painting",
      "Flooring",
    ],
  },

  {
    id: 7,
    slug: "villa-windows-project",
    title: "Premium Villa Windows",
    category: "Windows & Doors",
    status: "Upcoming",
    location: "Gachibowli",
    year: "2026",
    shortDescription:
      "Premium windows and doors solution planned for a luxury villa.",
    description:
      "An upcoming premium villa project featuring custom window systems, large sliding doors, and modern architectural solutions.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600",
    services: [
      "UPVC Windows",
      "Sliding Doors",
      "Custom Design",
    ],
  },

  {
    id: 8,
    slug: "luxury-apartment-interiors",
    title: "Luxury Apartment Interiors",
    category: "Interiors",
    status: "Upcoming",
    location: "Financial District",
    year: "2026",
    shortDescription:
      "Upcoming complete interior design project for a premium apartment.",
    description:
      "A complete interior project currently in planning, covering living areas, bedrooms, kitchen, storage, lighting, and custom furniture.",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600",
    services: [
      "Interior Design",
      "Modular Kitchen",
      "Furniture",
      "Lighting",
    ],
  },

  {
    id: 9,
    slug: "commercial-renovation",
    title: "Commercial Space Renovation",
    category: "Renovations",
    status: "Upcoming",
    location: "Hitech City",
    year: "2026",
    shortDescription:
      "Upcoming commercial renovation and modernization project.",
    description:
      "A planned commercial renovation project covering space optimization, electrical upgrades, civil work, interiors, and modern finishes.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1600",
    services: [
      "Commercial Renovation",
      "Civil Work",
      "Electrical",
      "Interiors",
    ],
  },
];

export const featuredProjects = galleryProjects.filter(
  (project) => project.status === "Featured",
);

export const completedProjects = galleryProjects.filter(
  (project) => project.status === "Completed",
);

export const upcomingProjects = galleryProjects.filter(
  (project) => project.status === "Upcoming",
);