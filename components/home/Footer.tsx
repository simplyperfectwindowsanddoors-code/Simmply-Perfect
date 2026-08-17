"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  X,
  ChevronRight,
  Handshake,
  BadgePercent,
  User,
  Loader2,
  ArrowRight,
  Download,
  DoorOpen,
  Layout,
  Construction,
  Layers,
  Eye,
  ArrowLeft,
  Sparkles,
  FileText,
  FolderOpen,
} from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Catalogs", href: "/catalogs", isCatalog: true },
  { label: "Articles", href: "/articles" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const companies = [
  { label: "Windows & Doors", href: "/windows-doors" },
  { label: "Luxury Interiors", href: "/interiors" },
  { label: "Home Renovations", href: "/renovation" },
  { label: "Metal Works", href: "/metal-works" },
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

const categoriesData = [
  {
    id: "railing",
    name: "Railing Systems",
    desc: "Balcony, staircase, and safety specifications",
    icon: Layers,
    files: [
      { name: "Brass Stair Railing", size: "2.4 MB", url: "/catalogs/Railing/Brass Stair Railing.pdf" },
      { name: "Glass Balcony Railing", size: "3.1 MB", url: "/catalogs/Railing/Glass Balcony Railing.pdf" },
      { name: "Glass Staircase Railing", size: "2.8 MB", url: "/catalogs/Railing/Glass Staircase Railing.pdf" },
      { name: "MS Balcony Railing", size: "1.9 MB", url: "/catalogs/Railing/MS Balcony Railing.pdf" },
      { name: "MS Safety Door", size: "2.2 MB", url: "/catalogs/Railing/MS Safety Door.pdf" },
      { name: "MS Stair Railing", size: "2.5 MB", url: "/catalogs/Railing/MS Stair Railing.pdf" },
      { name: "SS Balcony Railing", size: "2.1 MB", url: "/catalogs/Railing/SS Balcony Railing.pdf" },
      { name: "SS Main Gate", size: "4.2 MB", url: "/catalogs/Railing/SS Main Gate.pdf" },
      { name: "SS Safety Door", size: "2.3 MB", url: "/catalogs/Railing/SS Safety Door.pdf" },
      { name: "SS Spiral Railing", size: "3.0 MB", url: "/catalogs/Railing/SS Spiral Railing.pdf" },
    ],
  },
  {
    id: "upvc-doors",
    name: "UPVC Doors",
    desc: "Sliding, folding, and casement structures",
    icon: DoorOpen,
    files: [
      { name: "Casement Doors", size: "3.5 MB", url: "/catalogs/UPVC-doors/Casement Doors.pdf" },
      { name: "Customized Doors", size: "4.8 MB", url: "/catalogs/UPVC-doors/Customized.pdf" },
      { name: "French Door", size: "3.9 MB", url: "/catalogs/UPVC-doors/French Door.pdf" },
      { name: "Lift and Slide", size: "5.1 MB", url: "/catalogs/UPVC-doors/Lift and Slide.pdf" },
      { name: "Slide & Fold", size: "4.6 MB", url: "/catalogs/UPVC-doors/Slide & Fold.pdf" },
      { name: "Sliding Doors", size: "3.2 MB", url: "/catalogs/UPVC-doors/Sliding Doors.pdf" },
    ],
  },
  {
    id: "upvc-windows",
    name: "UPVC Windows",
    desc: "Fixed, hung, and combination window frames",
    icon: Layout,
    files: [
      { name: "Bay and Bow", size: "2.9 MB", url: "/catalogs/UPVC-windows/Bay and Bow.pdf" },
      { name: "Casement Windows", size: "3.1 MB", url: "/catalogs/UPVC-windows/Casement Windows.pdf" },
      { name: "Combination windows", size: "4.2 MB", url: "/catalogs/UPVC-windows/Combination windows.pdf" },
      { name: "Double Hung", size: "2.7 MB", url: "/catalogs/UPVC-windows/Double Hung.pdf" },
      { name: "Fixed Windows", size: "1.8 MB", url: "/catalogs/UPVC-windows/Fixed Windows.pdf" },
      { name: "French Windows", size: "3.6 MB", url: "/catalogs/UPVC-windows/French Windows.pdf" },
      { name: "Glass to Glass", size: "4.0 MB", url: "/catalogs/UPVC-windows/Glass to Glass.pdf" },
      { name: "Single Hung", size: "2.3 MB", url: "/catalogs/UPVC-windows/Single Hung.pdf" },
      { name: "Sliding Windows", size: "3.0 MB", url: "/catalogs/UPVC-windows/Sliding Windows.pdf" },
      { name: "Tilt and Turn", size: "3.4 MB", url: "/catalogs/UPVC-windows/Tilt and Turn.pdf" },
    ],
  },
  {
    id: "wooden-doors",
    name: "Wooden Doors",
    desc: "Premium natural solid timber frames",
    icon: Construction,
    files: [
      { name: "Simmply Perfect Wooden Door", size: "5.8 MB", url: "/catalogs/Wooden-doors/Simmply Perfect Wooden Door.pdf" },
    ],
  },
  {
    id: "wpc-doors",
    name: "WPC Doors",
    desc: "Wood Polymer Composite structural doors",
    icon: DoorOpen,
    files: [
      { name: "WPC Doors Catalogue", size: "4.5 MB", url: "/catalogs/WPC-doors/WPC Doors Catalogue.pdf" },
    ],
  },
  {
    id: "window-grills",
    name: "Window Grills",
    desc: "Premium window grill designs combining security, durability, and modern aesthetics.",
    icon: DoorOpen,
    files: [
      { name: "Window Grills Catalogue", size: "4.5 MB", url: "/catalogs/window-grills/Window Grills Catalogue.pdf" },
    ],
  },
];

export default function Footer() {
  const [catalogsOpen, setCatalogsOpen] = useState(false);
  const [catalogFormData, setCatalogFormData] = useState({
    name: "",
    email: "",
    phone: "+91 ",
  });
  const [isCatalogSubmitting, setIsCatalogSubmitting] = useState(false);
  const [isCatalogSubmitted, setIsCatalogSubmitted] = useState(false);
  const [catalogSubmitError, setCatalogSubmitError] = useState<string | null>(null);
  const [catalogFocusedField, setCatalogFocusedField] = useState<string | null>(null);
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);
  const [activePreviewPdf, setActivePreviewPdf] = useState<{ title: string; url: string } | null>(null);

  useEffect(() => {
    document.body.style.overflow = catalogsOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [catalogsOpen]);

  const handleCatalogPhoneChange = (val: string) => {
    if (!val.startsWith("+91 ")) {
      setCatalogFormData((prev) => ({ ...prev, phone: "+91 " }));
      return;
    }
    const digits = val.slice(4).replace(/\D/g, "");
    if (digits.length > 10) return;
    let formatted = "+91 ";
    if (digits.length > 0) formatted += digits.substring(0, 5);
    if (digits.length > 5) formatted += ` ${digits.substring(5, 10)}`;
    setCatalogFormData((prev) => ({ ...prev, phone: formatted }));
  };

  const handleCatalogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const rawDigits = catalogFormData.phone.slice(4).replace(/\s/g, "");
    if (!/^[6-9]\d{9}$/.test(rawDigits)) {
      setCatalogSubmitError("Please enter a valid 10-digit mobile number following the +91 prefix code.");
      return;
    }
    setIsCatalogSubmitting(true);
    setCatalogSubmitError(null);
    try {
      const response = await fetch("/api/catalogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: catalogFormData.name,
          email: catalogFormData.email,
          phone: catalogFormData.phone,
          message: "User requested access to blueprints & catalogues.",
        }),
      });
      if (!response.ok) throw new Error("Failed to register catalog credentials.");
      setIsCatalogSubmitted(true);
    } catch (error: any) {
      setCatalogSubmitError(error.message || "Connection timeout.");
      setIsCatalogSubmitted(false);
    } finally {
      setIsCatalogSubmitting(false);
    }
  };

  const handleCloseCatalogs = () => {
    setCatalogsOpen(false);
    setTimeout(() => {
      setIsCatalogSubmitted(false);
      setIsCatalogSubmitting(false);
      setCatalogSubmitError(null);
      setActivePreviewPdf(null);
      setActiveFolderId(null);
      setCatalogFormData({ name: "", email: "", phone: "+91 " });
      setCatalogFocusedField(null);
    }, 300);
  };

  const activeCategoryObject = categoriesData.find((c) => c.id === activeFolderId);

  return (
    <>
      {/* =========================================================
          TOP COLLABORATION NETWORK SECTION (WHITE BACKGROUND)
      ========================================================= */}
      <section className="relative border-t border-slate-200 bg-white py-16 sm:py-20">
        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          {/* BADGE & HEADER */}
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#0A2E6F]/15 bg-[#0A2E6F]/[0.06] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0A2E6F]">
              <Sparkles className="h-3.5 w-3.5" /> Collaboration Network
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Let&apos;s Build Something Remarkable Together
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Partner with Simmply Perfect Group to expand your architectural portfolio, or join our affiliate network to monetize high-value referrals.
            </p>
          </div>

          {/* BUTTON CARDS (BRAND LOGO COLOR THEME) */}
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            {/* BECOME A PARTNER */}
            <Link
              href="/partner"
              className="group relative flex items-center justify-between rounded-2xl border border-transparent bg-[#0A2E6F] p-6 shadow-[0_12px_30px_rgba(10,46,111,0.2)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#0c3784] hover:shadow-[0_20px_40px_rgba(10,46,111,0.32)]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-white/10 text-white transition-transform duration-300 group-hover:scale-105 group-hover:bg-white/20">
                  <Handshake className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-200">
                    B2B Network
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    Become a Partner
                  </h3>
                  <p className="text-xs text-blue-100/75">
                    Collaborate on turnkey projects
                  </p>
                </div>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 group-hover:translate-x-1 group-hover:bg-white group-hover:text-[#0A2E6F]">
                <ChevronRight className="h-5 w-5" />
              </div>
            </Link>

            {/* BECOME AN AFFILIATE */}
            <Link
              href="/affiliate"
              className="group relative flex items-center justify-between rounded-2xl border border-transparent bg-[#0A2E6F] p-6 shadow-[0_12px_30px_rgba(10,46,111,0.2)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#0c3784] hover:shadow-[0_20px_40px_rgba(10,46,111,0.32)]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-white/10 text-white transition-transform duration-300 group-hover:scale-105 group-hover:bg-white/20">
                  <BadgePercent className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-200">
                    Referral Program
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    Become an Affiliate
                  </h3>
                  <p className="text-xs text-blue-100/75">
                    Earn through active referrals
                  </p>
                </div>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 group-hover:translate-x-1 group-hover:bg-white group-hover:text-[#0A2E6F]">
                <ChevronRight className="h-5 w-5" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          MAIN FOOTER DIRECTORY (DARK NAVY)
      ========================================================= */}
      <footer className="relative overflow-hidden bg-[#071224] text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-48 -top-48 h-[500px] w-[500px] rounded-full bg-[#0A2E6F]/25 blur-[160px]" />
          <div className="absolute -bottom-64 right-0 h-[500px] w-[500px] rounded-full bg-blue-400/[0.06] blur-[160px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.8fr_1.2fr] lg:gap-10 xl:gap-14">
            {/* COMPANY LOGO & ABOUT */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link href="/" aria-label="Simmply Perfect Group Home" className="inline-block">
                <img
                  src="/logo-white.png"
                  alt="Simmply Perfect Group"
                  className="mb-6 h-20 w-auto object-contain transition-transform duration-300 hover:scale-[1.02]"
                />
              </Link>
              <p className="max-w-md text-sm leading-relaxed text-slate-400">
                Premium UPVC Windows & Doors, Luxury Interiors, Turnkey Renovations, and Custom Metal Works designed to craft immaculate living and commercial spaces.
              </p>

              {/* SOCIAL MEDIA PILLS */}
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
                      className={`flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:text-white ${social.hoverClass}`}
                    >
                      <Icon size={16} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* QUICK LINKS */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white">Quick Links</h3>
              <div className="mt-6 flex flex-col items-start gap-3.5">
                {quickLinks.map((link) => {
                  if (link.isCatalog) {
                    return (
                      <button
                        key={link.label}
                        type="button"
                        onClick={() => setCatalogsOpen(true)}
                        className="group inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors duration-200 hover:text-white"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 translate-y-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                      </button>
                    );
                  }
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors duration-200 hover:text-white"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 translate-y-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* DIVISIONS */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white">Our Divisions</h3>
              <div className="mt-6 flex flex-col items-start gap-3.5">
                {companies.map((company) => (
                  <Link
                    key={company.label}
                    href={company.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors duration-200 hover:text-white"
                  >
                    <span>{company.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 translate-y-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </div>

            {/* CONTACT DETAILS */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white">Reach Us</h3>
              <div className="mt-6 space-y-4">
                <a href="tel:+919390719623" className="group flex items-start gap-3.5 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-colors hover:border-blue-400/20 hover:bg-blue-600/[0.05]">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/15 text-blue-300">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Phone</p>
                    <p className="mt-0.5 text-sm text-slate-300 group-hover:text-white">+91 93907 19623</p>
                  </div>
                </a>

                <a href="mailto:simplyperfectwindowsanddoors@gmail.com" className="group flex items-start gap-3.5 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-colors hover:border-blue-400/20 hover:bg-blue-600/[0.05]">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/15 text-blue-300">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Email</p>
                    <p className="mt-0.5 truncate text-xs text-slate-300 group-hover:text-white">simplyperfectwindowsanddoors@gmail.com</p>
                  </div>
                </a>

                <a
                  href="https://www.google.com/maps/place/Simmply+Perfect+Windows+%26+Doors/@17.5443411,78.4614746,15.1z/data=!4m10!1m2!2m1!1ssimmply+perfect!3m6!1s0x3bcb8f2438d4b19f:0x6a81a86b6a678381!8m2!3d17.5455331!4d78.4716782!15sCg9zaW1tcGx5IHBlcmZlY3RaESIPc2ltbXBseSBwZXJmZWN0kgEbYnVpbGRpbmdfbWF0ZXJpYWxzX3N1cHBsaWVy4AEA!16s%2Fg%2F11ycjk0h7b?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3.5 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-colors hover:border-blue-400/20 hover:bg-blue-600/[0.05]"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/15 text-blue-300">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Location</p>
                    <p className="mt-0.5 text-xs text-slate-300 group-hover:text-white">Simmply Perfect Windows & Doors, Hyderabad</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM LEGAL BAR */}
        <div className="relative border-t border-white/[0.08] bg-[#030812]">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 text-xs text-slate-500 sm:px-6 md:flex-row lg:px-8">
            <p>© {new Date().getFullYear()} Simmply Perfect Group. All Rights Reserved.</p>
            <p>
              Designed & Developed by{" "}
              <a href="https://www.dropxcorp.in" target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-400 hover:text-white">
                DropXcorp
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* CATALOG POPUP MODAL */}
      <AnimatePresence>
        {catalogsOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] flex items-center justify-center p-3 sm:p-5">
            <motion.button type="button" onClick={handleCloseCatalogs} className="absolute inset-0 h-full w-full bg-[#020817]/85 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="relative z-[510] flex max-h-[94dvh] w-full max-w-6xl flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-2xl"
            >
              <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0A2E6F] text-white">
                    <FolderOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#071224] sm:text-xl">Simmply Perfect Catalogs</h2>
                    <p className="text-xs text-slate-500">Explore & download digital catalogues</p>
                  </div>
                </div>
                <button type="button" onClick={handleCloseCatalogs} className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {!isCatalogSubmitted ? (
                <div className="grid flex-1 overflow-y-auto lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="relative hidden bg-[#071224] p-10 text-white lg:block">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-blue-200">
                      <Sparkles className="h-3.5 w-3.5" /> Product Archive
                    </div>
                    <h3 className="mt-6 text-3xl font-bold leading-tight">Access full product blueprints & catalogues.</h3>
                    <p className="mt-4 text-sm leading-relaxed text-slate-300">Detailed drawings, cross-sections, glass thickness metrics, and technical configurations.</p>
                  </div>
                  <div className="flex items-center p-6 sm:p-10">
                    <form onSubmit={handleCatalogSubmit} className="mx-auto w-full max-w-lg space-y-4">
                      <h3 className="text-2xl font-bold text-[#071224]">Enter your contact details</h3>
                      <p className="text-xs text-slate-500">Unlock instant viewing & direct PDF downloading.</p>
                      <div>
                        <label className="mb-1 block text-xs font-bold text-slate-700">Full Name</label>
                        <input
                          required
                          type="text"
                          value={catalogFormData.name}
                          onChange={(e) => setCatalogFormData((p) => ({ ...p, name: e.target.value }))}
                          placeholder="Your Name"
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none focus:border-[#0A2E6F]"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-bold text-slate-700">Email Address</label>
                        <input
                          required
                          type="email"
                          value={catalogFormData.email}
                          onChange={(e) => setCatalogFormData((p) => ({ ...p, email: e.target.value }))}
                          placeholder="you@example.com"
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none focus:border-[#0A2E6F]"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-bold text-slate-700">Mobile Number</label>
                        <input
                          required
                          type="tel"
                          value={catalogFormData.phone}
                          onChange={(e) => handleCatalogPhoneChange(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none focus:border-[#0A2E6F]"
                        />
                      </div>
                      {catalogSubmitError && <p className="text-xs font-medium text-red-600">{catalogSubmitError}</p>}
                      <button
                        type="submit"
                        disabled={isCatalogSubmitting}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0A2E6F] py-3.5 text-sm font-bold text-white hover:bg-[#123D80]"
                      >
                        {isCatalogSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Access Catalogs"}
                      </button>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
                  <div className="shrink-0 border-b border-slate-200 bg-slate-50 p-4 lg:w-[300px] lg:border-b-0 lg:border-r">
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Categories</p>
                    <div className="flex gap-2 overflow-x-auto lg:flex-col">
                      {categoriesData.map((cat) => {
                        const Icon = cat.icon;
                        const active = activeFolderId === cat.id;
                        return (
                          <button
                            key={cat.id}
                            onClick={() => {
                              setActiveFolderId(cat.id);
                              setActivePreviewPdf(null);
                            }}
                            className={`flex min-w-[200px] items-center gap-3 rounded-xl p-3 text-left transition-all lg:min-w-0 ${
                              active ? "bg-[#0A2E6F] text-white" : "bg-white text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            <div className="truncate">
                              <p className="text-xs font-bold">{cat.name}</p>
                              <p className="text-[10px] opacity-75">{cat.files.length} Files</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6">
                    {activeCategoryObject ? (
                      activePreviewPdf ? (
                        <div className="flex h-full flex-col">
                          <div className="mb-3 flex items-center justify-between">
                            <button onClick={() => setActivePreviewPdf(null)} className="flex items-center gap-1.5 text-xs font-bold text-[#0A2E6F]">
                              <ArrowLeft className="h-4 w-4" /> Back
                            </button>
                            <a href={activePreviewPdf.url} download className="flex items-center gap-1.5 rounded-lg bg-[#0A2E6F] px-3 py-1.5 text-xs font-bold text-white">
                              <Download className="h-3.5 w-3.5" /> Download PDF
                            </a>
                          </div>
                          <iframe src={activePreviewPdf.url} title={activePreviewPdf.title} className="h-[500px] w-full rounded-xl border border-slate-200" />
                        </div>
                      ) : (
                        <div className="grid gap-3 sm:grid-cols-2">
                          {activeCategoryObject.files.map((file) => (
                            <div key={file.url} className="rounded-xl border border-slate-200 bg-white p-4">
                              <h4 className="text-xs font-bold text-slate-800">{file.name}</h4>
                              <p className="text-[10px] text-slate-400">{file.size}</p>
                              <div className="mt-3 flex gap-2">
                                <button onClick={() => setActivePreviewPdf({ title: file.name, url: file.url })} className="flex-1 rounded-lg border border-slate-200 py-1.5 text-center text-xs font-semibold text-slate-600">
                                  Preview
                                </button>
                                <a href={file.url} download className="flex-1 rounded-lg bg-[#0A2E6F] py-1.5 text-center text-xs font-semibold text-white">
                                  Download
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      )
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-slate-400">Select a category on the left to view files</div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}