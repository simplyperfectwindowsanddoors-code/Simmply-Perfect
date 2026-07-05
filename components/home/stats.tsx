"use client";

import { motion } from "framer-motion";

export default function Stats() {
  const stats = [
    {
      value: "3000+",
      label: "Projects Delivered",
    },
    {
      value: "18+",
      label: "Years Experience",
    },
    {
      value: "99.12%",
      label: "Client Satisfaction",
    },
    {
      value: "4",
      label: "Business Divisions",
    },
  ];

  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">

          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -8,
                scale: 1.04,
              }}
              className="group relative text-center cursor-default rounded-xl py-6 transition-all duration-300"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-blue-50/0 to-blue-50 opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10" />

              {/* Number */}
              <motion.h2
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.25 }}
                className="text-4xl lg:text-5xl font-black tracking-tight text-[#0A2E6F]"
              >
                {stat.value}
              </motion.h2>

              {/* Animated Divider */}
              <motion.div
                className="h-[3px] bg-[#0A2E6F] rounded-full mx-auto mt-4 mb-4"
                initial={{ width: 32 }}
                whileHover={{ width: 64 }}
                transition={{ duration: 0.3 }}
              />

              {/* Label */}
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-slate-600 group-hover:text-[#0A2E6F] transition-colors duration-300">
                {stat.label}
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}