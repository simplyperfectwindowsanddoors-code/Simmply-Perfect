"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const companies = [
  {
    number: "01",
    title: "Windows & Doors",
    subtitle: "Premium Architectural Solutions",
    href: "/windows-doors",
    description:
      "Premium aluminium windows, designer doors, facade systems and customized architectural solutions built for modern living.",
    image: "/windows-doors.jpg",
  },
  {
    number: "02",
    title: "Interiors",
    subtitle: "Luxury Interior Design",
    href: "/interiors",
    description:
      "Luxury interiors crafted with elegance, functionality and timeless design, transforming ordinary spaces into extraordinary experiences.",
    image: "/interiors.jpg",
  },
  {
    number: "03",
    title: "Renovation",
    subtitle: "Transform Existing Spaces",
    href: "/renovation",
    description:
      "Expert renovation services that modernize homes and commercial spaces with superior craftsmanship and innovative solutions.",
    image: "/renovation.jpg",
  },
];

export default function Companies() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-28"
        >
          <span className="text-[#0A2E6F] uppercase tracking-[6px] font-semibold">
            Our Companies
          </span>

          <h2 className="mt-6 text-5xl md:text-7xl font-black text-[#0A1A35] leading-tight">
            One Group.
            <br />
            Four Specialties.
          </h2>

          <p className="mt-8 max-w-3xl mx-auto text-lg text-slate-600 leading-8">
            Simmply Perfect Group brings together premium expertise in
            Windows & Doors, Luxury Interiors and Renovation to create
            exceptional residential and commercial spaces.
          </p>
        </motion.div>

        {/* Companies Showcase */}
        <div className="space-y-36">

          {companies.map((company, index) => (
            <motion.div
              key={company.title}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`grid lg:grid-cols-2 gap-16 items-center ${
                index % 2 !== 0
                  ? "lg:[&>*:first-child]:order-2"
                  : ""
              }`}
            >

              {/* Image Side */}

<Link href={company.href}>

  <div className="group relative overflow-hidden rounded-[36px] cursor-pointer">

    <img
      src={company.image}
      alt={company.title}
      className="
        w-full
        h-[600px]
        object-cover
        transition-all
        transform-gpu
transition-transform
duration-1000
ease-out
group-hover:scale-105
      "
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />

    <div className="absolute bottom-8 left-8">
      <span className="text-white text-sm tracking-[4px] uppercase">
        SIMMPLY PERFECT GROUP
      </span>
    </div>

  </div>

</Link>

{/* Content Side */}

              {/* Content Side */}
              <div>

                <span className="text-[120px] md:text-[150px] font-black text-slate-100 leading-none">
                  {company.number}
                </span>

                <h3 className="text-5xl md:text-6xl font-black text-[#0A1A35] -mt-5">
                  {company.title}
                </h3>

                <p className="mt-4 text-xl font-semibold text-[#0A2E6F]">
                  {company.subtitle}
                </p>

                <p className="mt-8 text-slate-600 text-lg leading-9 max-w-xl">
                  {company.description}
                </p>

                <div className="mt-10 flex gap-6">

  <Link href={company.href}>

    <button
      className="
        bg-[#0A2E6F]
        text-white
        px-8
        py-4
        rounded-2xl
        flex
        items-center
        gap-2
        hover:gap-4
        transition-all
      "
    >
      Explore Division
      <ArrowRight size={18} />
    </button>

  </Link>

</div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 mt-14 pt-10 border-t border-slate-200">

                  <div>
                    <h4 className="text-3xl font-bold text-[#0A2E6F]">
                      3000+
                    </h4>
                    <p className="text-slate-500 mt-2">
                      Projects
                    </p>
                  </div>

                  <div>
                    <h4 className="text-3xl font-bold text-[#0A2E6F]">
                      8+ years
                    </h4>
                    <p className="text-slate-500 mt-2">
                      Experience
                    </p>
                  </div>

                  <div>
                    <h4 className="text-3xl font-bold text-[#0A2E6F]">
                      99.12%
                    </h4>
                    <p className="text-slate-500 mt-2">
                      Quality
                    </p>
                  </div>

                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}
