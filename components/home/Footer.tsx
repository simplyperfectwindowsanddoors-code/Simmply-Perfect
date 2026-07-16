import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

/* =========================================================
   DATA
========================================================= */

const quickLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Catalogs",
    href: "/catalogs",
  },
  {
    label: "Articles",
    href: "/articles",
  },
  {
    label: "Careers",
    href: "/careers",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const companies = [
  {
    label: "Windows & Doors",
    href: "/windows-doors",
  },
  {
    label: "Luxury Interiors",
    href: "/interiors",
  },
  {
    label: "Home Renovations",
    href: "/renovation",
  },
  {
    label: "Metal Works",
    href: "/metal-works",
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61575006093316",
    icon: FaFacebookF,
    hoverClass: "hover:bg-[#1877F2]",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/thesimmply.perfect/",
    icon: FaInstagram,
    hoverClass:
      "hover:bg-gradient-to-br hover:from-purple-500 hover:via-pink-500 hover:to-orange-400",
  },
  {
    label: "X",
    href: "https://x.com/simply1perfect",
    icon: FaXTwitter,
    hoverClass: "hover:bg-black",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@SimmplyPerfectWindowsandDoors",
    icon: FaYoutube,
    hoverClass: "hover:bg-[#FF0000]",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/simmply-perfect-windows-doors/",
    icon: FaLinkedinIn,
    hoverClass: "hover:bg-[#0077B5]",
  },
];

/* =========================================================
   FOOTER
========================================================= */

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#071224] text-white">
      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#0A2E6F]/25 blur-[160px]" />

        <div className="absolute -bottom-52 right-0 h-[500px] w-[500px] rounded-full bg-blue-400/[0.06] blur-[160px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
      </div>

      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.8fr_1.2fr] lg:gap-10 xl:gap-14">
          {/* =================================================
              COMPANY
          ================================================= */}

          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              aria-label="Simmply Perfect Group Home"
              className="inline-block"
            >
              <img
                src="/logo-white.png"
                alt="Simmply Perfect Group"
                className="mb-6 h-20 w-auto object-contain transition-transform duration-300 hover:scale-[1.03]"
              />
            </Link>

            <p className="max-w-md text-sm leading-7 text-slate-400">
              One trusted destination for premium Windows & Doors, Luxury Interiors, Custom Metal Fabrication, Home Renovations, and turnkey architectural solutions designed to elevate every space.
            </p>

            {/* SOCIAL LINKS */}

            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:text-white ${social.hoverClass}`}
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* =================================================
              QUICK LINKS
          ================================================= */}

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white">
              Quick Links
            </h3>

            <div className="mt-6 flex flex-col items-start gap-3.5">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="group inline-flex items-center gap-2 text-sm text-slate-400 transition-colors duration-300 hover:text-white"
                >
                  <span>{link.label}</span>

                  <ArrowUpRight className="h-3 w-3 -translate-x-1 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>

          {/* =================================================
              COMPANIES
          ================================================= */}

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white">
              Our Companies
            </h3>

            <div className="mt-6 flex flex-col items-start gap-3.5">
              {companies.map((company) => (
                <Link
                  key={company.label}
                  href={company.href}
                  className="group inline-flex items-center gap-2 text-sm text-slate-400 transition-colors duration-300 hover:text-white"
                >
                  <span>{company.label}</span>

                  <ArrowUpRight className="h-3 w-3 -translate-x-1 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>

          {/* =================================================
              CONTACT
          ================================================= */}

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white">
              Contact Us
            </h3>

            <div className="mt-6 space-y-5">
              {/* PHONE */}

              <a
                href="tel:+919390719623"
                className="group flex items-start gap-3.5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-blue-300 transition-all duration-300 group-hover:border-blue-400/20 group-hover:bg-[#0A2E6F] group-hover:text-white">
                  <Phone className="h-4 w-4" />
                </div>

                <div className="pt-0.5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                    Call Us
                  </p>

                  <p className="mt-1 text-sm text-slate-300 transition-colors duration-300 group-hover:text-white">
                    +91 93907 19623
                  </p>
                </div>
              </a>

              {/* EMAIL */}

              <a
                href="mailto:simplyperfectwindowsanddoors@gmail.com"
                className="group flex items-start gap-3.5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-blue-300 transition-all duration-300 group-hover:border-blue-400/20 group-hover:bg-[#0A2E6F] group-hover:text-white">
                  <Mail className="h-4 w-4" />
                </div>

                <div className="min-w-0 pt-0.5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                    Email
                  </p>

                  <p className="mt-1 break-all text-sm leading-6 text-slate-300 transition-colors duration-300 group-hover:text-white">
                    simplyperfectwindowsanddoors@gmail.com
                  </p>
                </div>
              </a>

              {/* LOCATION */}

              <a
                href="https://www.google.com/maps/place/Simmply+Perfect+Windows+%26+Doors/@17.5443411,78.4614746,15.1z/data=!4m10!1m2!2m1!1ssimmply+perfect!3m6!1s0x3bcb8f2438d4b19f:0x6a81a86b6a678381!8m2!3d17.5455331!4d78.4716782!15sCg9zaW1tcGx5IHBlcmZlY3RaESIPc2ltbXBseSBwZXJmZWN0kgEbYnVpbGRpbmdfbWF0ZXJpYWxzX3N1cHBsaWVy4AEA!16s%2Fg%2F11ycjk0h7b?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3.5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-blue-300 transition-all duration-300 group-hover:border-blue-400/20 group-hover:bg-[#0A2E6F] group-hover:text-white">
                  <MapPin className="h-4 w-4" />
                </div>

                <div className="pt-0.5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                    Visit Us
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-300 transition-colors duration-300 group-hover:text-white">
                    Simmply Perfect Windows & Doors
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM BAR
      ===================================================== */}

      <div className="relative border-t border-white/[0.08]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 text-center text-xs text-slate-500 sm:px-6 md:flex-row md:text-left lg:px-8">
          <p>
            © {new Date().getFullYear()} Simmply Perfect Group. All Rights
            Reserved.
          </p>

          <p>
            Designed & Developed by{" "}
            <a
              href="https://www.dropxcorp.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-slate-400 transition-colors duration-300 hover:text-white"
            >
              DropXcorp
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}