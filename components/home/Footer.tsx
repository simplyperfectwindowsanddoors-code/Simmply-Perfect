import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#071224] text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#0A2E6F]/20 blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C9A14A]/10 blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-14">
          {/* Company */}
          <div>
            <Link href="/">
              <img
  src="/logo-white.png"
  alt="Simmply Perfect"
  className="
    h-22
    w-auto
    mb-6
    object-contain
    transition-all
    duration-300
    hover:scale-105
    cursor-pointer
  "
/>
            </Link>

            <p className="text-gray-400 leading-8">
              Simmply Perfect Group delivers premium Windows & Doors,
              Luxury Interiors and Renovation solutions crafted to elevate
              residential and commercial spaces.
            </p>

            <div className="flex items-center gap-3 mt-8 whitespace-nowrap">
  <a
    href="https://www.facebook.com/profile.php?id=61575006093316"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
    className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#1877F2] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center shrink-0"
  >
    <FaFacebookF size={18} />
  </a>

  <a
    href="https://www.instagram.com/thesimmply.perfect/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
    className="w-11 h-11 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center shrink-0"
  >
    <FaInstagram size={18} />
  </a>

  <a
    href="https://x.com/simply1perfect"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="X"
    className="w-11 h-11 rounded-full bg-white/10 hover:bg-black hover:-translate-y-1 transition-all duration-300 flex items-center justify-center shrink-0"
  >
    <FaXTwitter size={18} />
  </a>

  <a
    href="https://www.youtube.com/@SimmplyPerfectWindowsandDoors"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="YouTube"
    className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#FF0000] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center shrink-0"
  >
    <FaYoutube size={18} />
  </a>

  <a
    href="https://www.linkedin.com/company/simmply-perfect-windows-doors/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
    className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#0077B5] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center shrink-0"
  >
    <FaLinkedinIn size={18} />
  </a>
</div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">
              Quick Links
            </h3>

            <div className="space-y-4 text-gray-400">
              <Link
                href="/"
                className="block hover:text-white transition-all duration-300"
              >
                Home
              </Link>

              <Link
                href="/#about"
                className="block hover:text-white transition-all duration-300"
              >
                About
              </Link>

              <Link
                href="/windows-doors"
                className="block hover:text-white transition-all duration-300"
              >
                Windows & Doors
              </Link>

              <Link
                href="/interiors"
                className="block hover:text-white transition-all duration-300"
              >
                Interiors
              </Link>

              <Link
                href="/renovation"
                className="block hover:text-white transition-all duration-300"
              >
                Renovation
              </Link>

              <Link
                href="/metal-works"
                className="block hover:text-white transition-all duration-300"
              >
                Metal Works
              </Link>

              <Link
                href="/contact"
                className="block hover:text-white transition-all duration-300"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-6">
              Our Services
            </h3>

            <div className="space-y-4 text-gray-400">
              <Link
                href="/windows-doors"
                className="block hover:text-white transition-all duration-300"
              >
                Windows & Doors
              </Link>

              <Link
                href="/interiors"
                className="block hover:text-white transition-all duration-300"
              >
                Luxury Interiors
              </Link>

              <Link
                href="/renovation"
                className="block hover:text-white transition-all duration-300"
              >
                Home Renovation
              </Link>

              <Link
                href="/metal-works"
                className="block hover:text-white transition-all duration-300"
              >
                Metal Works
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-6">
              Contact Us
            </h3>

            <div className="space-y-5 text-gray-400">
              <a
                href="tel:+919390719623"
                className="flex items-center gap-4 hover:text-white transition-all duration-300"
              >
                <Phone size={18} />
                <span>+91 93907 19623</span>
              </a>

              <a
                href="mailto:info@simmplyperfect.com"
                className="flex items-center gap-4 hover:text-white transition-all duration-300"
              >
                <Mail size={18} />
                <span>info@simmplyperfect.com</span>
              </a>

              <a
                href="https://www.google.com/maps/place/Simmply+Perfect+Windows+%26+Doors/@17.5443411,78.4614746,15.1z/data=!4m10!1m2!2m1!1ssimmply+perfect!3m6!1s0x3bcb8f2438d4b19f:0x6a81a86b6a678381!8m2!3d17.5455331!4d78.4716782!15sCg9zaW1tcGx5IHBlcmZlY3RaESIPc2ltbXBseSBwZXJmZWN0kgEbYnVpbGRpbmdfbWF0ZXJpYWxzX3N1cHBsaWVy4AEA!16s%2Fg%2F11ycjk0h7b?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-4 hover:text-white transition-all duration-300"
              >
                <MapPin size={18} />
                <span>
                  Simmply Perfect Windows & Doors
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            py-6
            flex
            flex-col
            md:flex-row
            justify-between
            items-center
            gap-3
            text-gray-500
            text-sm
          "
        >
          <p>
            © {new Date().getFullYear()} Simmply Perfect Group.
            All Rights Reserved.
          </p>

          <p>
            Designed & Developed by DropXcorp
          </p>
        </div>
      </div>
    </footer>
  );
}