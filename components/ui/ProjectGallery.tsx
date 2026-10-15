"use client";

import { motion } from "framer-motion";

const images = [
  "/projects/project1.jpg",
  "/projects/project2.jpg",
  "/projects/project3.jpg",
  "/projects/project4.jpg",
  "/projects/project5.jpg",
  "/projects/project6.jpg",
];

export default function ProjectGallery() {
  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-20">
          <span className="uppercase tracking-widest text-[#0A2E6F] font-semibold">
            Portfolio
          </span>

          <h2 className="text-5xl font-black mt-4">
            Recent Projects
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="
                overflow-hidden
                rounded-[30px]
                h-[420px]
              "
            >
              <img
                src={img}
                alt=""
                className="
                  w-full
                  h-full
                  object-cover
                "
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}