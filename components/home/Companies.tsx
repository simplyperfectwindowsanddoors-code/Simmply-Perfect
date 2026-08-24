"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const companies = [
  {
    number: "01",
    title: "Windows & Doors",
    subtitle: "Premium Architectural Solutions",
    href: "/windows-doors",
    description:
      "Premium aluminium windows, designer doors, facade systems and customized architectural solutions built for modern living.",
    image: "/windows-doors.jpg",
    stats: [
      { value: "3000+", label: "Projects Delivered" },
      { value: "18+", label: "Years Experience" },
      { value: "99.12%", label: "Client Satisfaction" },
    ],
  },
  {
    number: "02",
    title: "Interiors",
    subtitle: "Luxury Interior Design",
    href: "/interiors",
    description:
      "Luxury interiors crafted with elegance, functionality and timeless design, transforming ordinary spaces into extraordinary experiences.",
    image: "/interiors.jpg",
    stats: [
      { value: "1200+", label: "Spaces Designed" },
      { value: "10+", label: "Years Experience" },
      { value: "98.20%", label: "Client Satisfaction" },
    ],
  },
  {
    number: "03",
    title: "Renovation",
    subtitle: "Transform Existing Spaces",
    href: "/renovation",
    description:
      "Expert renovation services that modernize homes and commercial spaces with superior craftsmanship and innovative solutions.",
    image: "/renovation.jpg",
    stats: [
      { value: "1000+", label: "Properties Restored" },
      { value: "10+", label: "Years Experience" },
      { value: "97.57%", label: "Client Satisfaction" },
    ],
  },
  {
    number: "04",
    title: "Metal Works",
    subtitle: "Precision Metal Fabrication",
    href: "/metal-works",
    description:
      "Professional metal fabrication and architectural solutions crafted with precision, durability and superior workmanship for residential, commercial and industrial projects.",
    image: "/metal-works.jpg",
    stats: [
      { value: "1500+", label: "Projects Completed" },
      { value: "15+", label: "Years Experience" },
      { value: "98.75%", label: "Client Satisfaction" },
    ],
  },
];

export default function Companies() {
  return (
    <section className="bg-white py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* =====================================================
            SECTION HEADER
        ===================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-28 text-center"
        >
          <span className="font-semibold uppercase tracking-[6px] text-[#0A2E6F]">
            Our Companies
          </span>

          <h2 className="mt-6 text-5xl font-black leading-tight text-[#0A1A35] md:text-7xl">
            One Group.
            <br />
            Four Specialties.
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-600">
            Simmply Perfect Group brings together premium expertise in Windows &
            Doors, Luxury Interiors, Renovation and Metal Works to create
            exceptional residential and commercial spaces.
          </p>
        </motion.div>

        {/* =====================================================
            COMPANIES SHOWCASE
        ===================================================== */}

        <div className="space-y-36">
          {companies.map((company, index) => (
            <motion.div
              key={company.title}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`grid items-start gap-10 lg:grid-cols-2 lg:gap-16 ${
                index % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* =================================================
                  DESKTOP IMAGE SIDE (Hidden on Mobile)
              ================================================= */}
              <Link
                href={company.href}
                className={`hidden lg:block lg:order-1 ${
                  index % 2 !== 0 ? "lg:order-2" : ""
                }`}
              >
                <div className="group relative cursor-pointer overflow-hidden rounded-[36px]">
                  <img
                    src={company.image}
                    alt={company.title}
                    loading="lazy"
                    decoding="async"
                    className="
                      h-[600px]
                      w-full
                      transform-gpu
                      object-cover
                      transition-transform
                      duration-1000
                      ease-out
                      group-hover:scale-105
                    "
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
                  <div className="absolute bottom-8 left-8">
                    <span className="text-sm uppercase tracking-[4px] text-white">
                      SIMMPLY PERFECT GROUP
                    </span>
                  </div>
                </div>
              </Link>

              {/* =================================================
                  CONTENT SIDE
              ================================================= */}
              <div
                className={`lg:order-2 flex flex-col ${
                  index % 2 !== 0 ? "lg:order-1" : ""
                }`}
              >
                <span className="text-[120px] font-black leading-none text-slate-100 md:text-[150px]">
                  {company.number}
                </span>

                <h3 className="-mt-5 text-5xl font-black text-[#0A1A35] md:text-6xl">
                  {company.title}
                </h3>

                <p className="mt-4 text-xl font-semibold text-[#0A2E6F]">
                  {company.subtitle}
                </p>

                <p className="mt-8 max-w-xl text-lg leading-9 text-slate-600">
                  {company.description}
                </p>

                {/* =================================================
                    MOBILE IMAGE (Hidden on Desktop)
                    Placed directly after description
                ================================================= */}
                <Link
                  href={company.href}
                  className="mt-8 block lg:hidden"
                >
                  <div className="group relative cursor-pointer overflow-hidden rounded-[36px]">
                    <img
                      src={company.image}
                      alt={company.title}
                      loading="lazy"
                      decoding="async"
                      className="
                        h-[400px]
                        w-full
                        transform-gpu
                        object-cover
                        transition-transform
                        duration-1000
                        ease-out
                        group-hover:scale-105
                      "
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <span className="text-[11px] uppercase tracking-[4px] text-white sm:text-sm">
                        SIMMPLY PERFECT GROUP
                      </span>
                    </div>
                  </div>
                </Link>

                {/* =================================================
                    EXPLORE BUTTON
                ================================================= */}
                <div className="mt-10 flex gap-6">
                  <Link
                    href={company.href}
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-2xl
                      bg-[#0A2E6F]
                      px-8
                      py-4
                      text-white
                      transition-all
                      hover:gap-4
                    "
                  >
                    Explore Division
                    <ArrowRight size={18} />
                  </Link>
                </div>

                {/* =================================================
                    COMPANY STATS
                ================================================= */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.45, duration: 0.6 }}
                  className="mt-12"
                >
                  <div className="grid grid-cols-3 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
                    {company.stats.map((stat, i) => (
                      <motion.div
                        key={`${company.title}-${stat.label}`}
                        whileHover={{ y: -4, scale: 1.02 }}
                        transition={{ duration: 0.25 }}
                        className={`group relative flex flex-col items-center justify-center px-3 py-5 text-center ${
                          i !== company.stats.length - 1
                            ? "border-r border-slate-200"
                            : ""
                        }`}
                      >
                        {/* SOFT BACKGROUND GLOW */}
                        <div className="absolute inset-0 z-0 rounded-xl bg-blue-50/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        {/* TOP ACCENT */}
                        <div className="absolute left-1/2 top-0 z-10 h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#0A2E6F] transition-all duration-300 group-hover:w-12" />

                        {/* VALUE */}
                        <h3 className="relative z-10 text-2xl font-extrabold tracking-tight text-[#0A2E6F] transition-transform duration-300 group-hover:scale-105 sm:text-3xl">
                          {stat.value}
                        </h3>

                        {/* DIVIDER */}
                        <div className="relative z-10 my-2 h-[2px] w-7 rounded-full bg-[#0A2E6F]/20 transition-all duration-300 group-hover:w-10 group-hover:bg-[#0A2E6F]" />

                        {/* LABEL */}
                        <p className="relative z-10 text-[10px] font-semibold uppercase leading-tight tracking-[0.15em] text-slate-500 transition-colors duration-300 group-hover:text-[#0A2E6F] sm:text-[11px]">
                          {stat.label}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
