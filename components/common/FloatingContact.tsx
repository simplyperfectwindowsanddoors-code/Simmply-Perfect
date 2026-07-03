"use client";

import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col gap-4">

      {/* WhatsApp */}
      <motion.a
        href="https://wa.me/919390719623"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{
          scale: 1.08,
          y: -2,
        }}
        whileTap={{ scale: 0.95 }}
        className="
          relative
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          bg-[#25D366]
          text-white
          shadow-[0_10px_30px_rgba(37,211,102,.45)]
        "
      >
        {/* Pulse */}
        <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366] opacity-20"></span>

        <FaWhatsapp size={34} className="relative z-10" />
      </motion.a>

      {/* Call */}
      <motion.a
        href="tel:+919390719623"
        whileHover={{
          scale: 1.08,
          y: -2,
        }}
        whileTap={{ scale: 0.95 }}
        className="
          relative
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          bg-[#0A2E6F]
          text-white
          shadow-[0_10px_30px_rgba(10,46,111,.4)]
        "
      >
        <span className="absolute inset-0 rounded-full animate-ping bg-[#0A2E6F] opacity-20"></span>

        <Phone size={28} className="relative z-10" />
      </motion.a>

    </div>
  );
}