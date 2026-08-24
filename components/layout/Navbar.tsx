"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import {
  X,
  ArrowRight,
  Download,
  User,
  Mail,
  Phone,
  DoorOpen,
  Layout,
  Construction,
  Hammer,
  Layers,
  Eye,
  ArrowLeft,
  Loader2,
  Sparkles,
  FileText,
  FolderOpen,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";

/* =========================================================
   NAVIGATION
========================================================= */

const companyItems = [
  {
    label: "Windows & Doors",
    href: "/windows-doors",
    description: "Premium windows and door solutions",
    icon: DoorOpen,
  },
  {
    label: "Interiors",
    href: "/interiors",
    description: "Complete interior design solutions",
    icon: Layout,
  },
  {
    label: "Renovations",
    href: "/renovation",
    description: "Professional renovation services",
    icon: Construction,
  },
  {
    label: "Metal Works",
    href: "/metal-works",
    description: "Professional architectural metal work solutions",
    icon: Hammer,
  },
];

/* =========================================================
   CATALOG DATA
========================================================= */

const categoriesData = [
  {
    id: "railing",
    name: "Railing Systems",
    desc: "Balcony, staircase, and safety specifications",
    icon: Layers,
    color:
      "from-blue-500/10 to-cyan-500/10 border-blue-100/60 text-blue-700",
    files: [
      {
        name: "Brass Stair Railing",
        size: "2.4 MB",
        url: "/catalogs/Railing/Brass Stair Railing.pdf",
      },
      {
        name: "Glass Balcony Railing",
        size: "3.1 MB",
        url: "/catalogs/Railing/Glass Balcony Railing.pdf",
      },
      {
        name: "Glass Staircase Railing",
        size: "2.8 MB",
        url: "/catalogs/Railing/Glass Staircase Railing.pdf",
      },
      {
        name: "MS Balcony Railing",
        size: "1.9 MB",
        url: "/catalogs/Railing/MS Balcony Railing.pdf",
      },
      {
        name: "MS Safety Door",
        size: "2.2 MB",
        url: "/catalogs/Railing/MS Safety Door.pdf",
      },
      {
        name: "MS Stair Railing",
        size: "2.5 MB",
        url: "/catalogs/Railing/MS Stair Railing.pdf",
      },
      {
        name: "SS Balcony Railing",
        size: "2.1 MB",
        url: "/catalogs/Railing/SS Balcony Railing.pdf",
      },
      {
        name: "SS Main Gate",
        size: "4.2 MB",
        url: "/catalogs/Railing/SS Main Gate.pdf",
      },
      {
        name: "SS Safety Door",
        size: "2.3 MB",
        url: "/catalogs/Railing/SS Safety Door.pdf",
      },
      {
        name: "SS Spiral Railing",
        size: "3.0 MB",
        url: "/catalogs/Railing/SS Spiral Railing.pdf",
      },
    ],
  },
  {
    id: "upvc-doors",
    name: "UPVC Doors",
    desc: "Sliding, folding, and casement structures",
    icon: DoorOpen,
    color:
      "from-indigo-500/10 to-blue-500/10 border-indigo-100/60 text-indigo-700",
    files: [
      {
        name: "Casement Doors",
        size: "3.5 MB",
        url: "/catalogs/UPVC-doors/Casement Doors.pdf",
      },
      {
        name: "Customized Doors",
        size: "4.8 MB",
        url: "/catalogs/UPVC-doors/Customized.pdf",
      },
      {
        name: "French Door",
        size: "3.9 MB",
        url: "/catalogs/UPVC-doors/French Door.pdf",
      },
      {
        name: "Lift and Slide",
        size: "5.1 MB",
        url: "/catalogs/UPVC-doors/Lift and Slide.pdf",
      },
      {
        name: "Slide & Fold",
        size: "4.6 MB",
        url: "/catalogs/UPVC-doors/Slide & Fold.pdf",
      },
      {
        name: "Sliding Doors",
        size: "3.2 MB",
        url: "/catalogs/UPVC-doors/Sliding Doors.pdf",
      },
    ],
  },
  {
    id: "upvc-windows",
    name: "UPVC Windows",
    desc: "Fixed, hung, and combination window frames",
    icon: Layout,
    color:
      "from-purple-500/10 to-indigo-500/10 border-purple-100/60 text-purple-700",
    files: [
      {
        name: "Bay and Bow",
        size: "2.9 MB",
        url: "/catalogs/UPVC-windows/Bay and Bow.pdf",
      },
      {
        name: "Casement Windows",
        size: "3.1 MB",
        url: "/catalogs/UPVC-windows/Casement Windows.pdf",
      },
      {
        name: "Combination windows",
        size: "4.2 MB",
        url: "/catalogs/UPVC-windows/Combination windows.pdf",
      },
      {
        name: "Double Hung",
        size: "2.7 MB",
        url: "/catalogs/UPVC-windows/Double Hung.pdf",
      },
      {
        name: "Fixed Windows",
        size: "1.8 MB",
        url: "/catalogs/UPVC-windows/Fixed Windows.pdf",
      },
      {
        name: "French Windows",
        size: "3.6 MB",
        url: "/catalogs/UPVC-windows/French Windows.pdf",
      },
      {
        name: "Glass to Glass",
        size: "4.0 MB",
        url: "/catalogs/UPVC-windows/Glass to Glass.pdf",
      },
      {
        name: "Single Hung",
        size: "2.3 MB",
        url: "/catalogs/UPVC-windows/Single Hung.pdf",
      },
      {
        name: "Sliding Windows",
        size: "3.0 MB",
        url: "/catalogs/UPVC-windows/Sliding Windows.pdf",
      },
      {
        name: "Tilt and Turn",
        size: "3.4 MB",
        url: "/catalogs/UPVC-windows/Tilt and Turn.pdf",
      },
    ],
  },
  {
    id: "wooden-doors",
    name: "Wooden Doors",
    desc: "Premium natural solid timber frames",
    icon: Construction,
    color:
      "from-amber-500/10 to-orange-500/10 border-amber-100/60 text-amber-700",
    files: [
      {
        name: "Simmply Perfect Wooden Door",
        size: "5.8 MB",
        url: "/catalogs/Wooden-doors/Simmply Perfect Wooden Door.pdf",
      },
    ],
  },
  {
    id: "wpc-doors",
    name: "WPC Doors",
    desc: "Wood Polymer Composite structural doors",
    icon: DoorOpen,
    color:
      "from-emerald-500/10 to-green-500/10 border-emerald-100/60 text-emerald-700",
    files: [
      {
        name: "WPC Doors Catalogue",
        size: "4.5 MB",
        url: "/catalogs/WPC-doors/WPC Doors Catalogue.pdf",
      },
    ],
  },
  {
    id: "window-grills",
    name: "Window Grills",
    desc: "Premium window grill designs combining security, durability, and modern aesthetics.",
    icon: DoorOpen,
    color:
      "from-emerald-500/10 to-green-500/10 border-emerald-100/60 text-emerald-700",
    files: [
      {
        name: "Window Grills Catalogue",
        size: "4.5 MB",
        url: "/catalogs/window-grills/Window Grills Catalogue.pdf",
      },
    ],
  },
];

/* =========================================================
   NORMAL NAV LINK
========================================================= */

function DesktopNavLink({
  href,
  label,
  pathname,
}: {
  href: string;
  label: string;
  pathname: string;
}) {
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`group relative whitespace-nowrap text-[16px] transition-all duration-300 ${
        active
          ? "font-bold text-[#0A2E6F]"
          : "font-semibold text-slate-700 hover:text-[#0A2E6F]"
      }`}
    >
      {label}

      <span
        className={`absolute -bottom-2 left-0 h-[2px] bg-[#0A2E6F] transition-all duration-300 ${
          active ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );
}

/* =========================================================
   NAVBAR
========================================================= */

export default function Navbar() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [companiesOpen, setCompaniesOpen] = useState(false);
  const [mobileCompaniesOpen, setMobileCompaniesOpen] = useState(false);
  const [catalogsOpen, setCatalogsOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "+91 ",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);

  const [activePreviewPdf, setActivePreviewPdf] = useState<{
    title: string;
    url: string;
  } | null>(null);

  /* =========================================================
     BODY SCROLL LOCK
  ========================================================= */

  useEffect(() => {
    if (mobileMenuOpen || catalogsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen, catalogsOpen]);

  /* =========================================================
     SCROLL
  ========================================================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* =========================================================
     ROUTE CHANGE
  ========================================================= */

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileCompaniesOpen(false);
    setCompaniesOpen(false);
  }, [pathname]);

  /* =========================================================
     PHONE FORMAT
  ========================================================= */

  const handlePhoneChange = (val: string) => {
    if (!val.startsWith("+91 ")) {
      setFormData((prev) => ({
        ...prev,
        phone: "+91 ",
      }));

      return;
    }

    const digits = val.slice(4).replace(/\D/g, "");

    if (digits.length > 10) return;

    let formatted = "+91 ";

    if (digits.length > 0) {
      formatted += digits.substring(0, 5);
    }

    if (digits.length > 5) {
      formatted += ` ${digits.substring(5, 10)}`;
    }

    setFormData((prev) => ({
      ...prev,
      phone: formatted,
    }));
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const rawDigits = formData.phone.slice(4).replace(/\s/g, "");

    const regexValidation = /^[6-9]\d{9}$/;

    if (!regexValidation.test(rawDigits)) {
      setSubmitError(
        "Please enter a valid 10-digit mobile number following the +91 prefix code.",
      );

      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/catalogs", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message:
            "User successfully cleared lead parameters to access high-res blueprint catalogs.",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register document vault credentials.");
      }

      setIsSubmitted(true);
    } catch (error: any) {
      console.error(error);

      setSubmitError(error.message || "Connection timeout exception.");

      setIsSubmitted(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =========================================================
     CLOSE CATALOGS
  ========================================================= */

  const handleCloseCatalogs = () => {
    setCatalogsOpen(false);

    setTimeout(() => {
      setIsSubmitted(false);
      setIsSubmitting(false);
      setSubmitError(null);
      setActivePreviewPdf(null);
      setActiveFolderId(null);

      setFormData({
        name: "",
        email: "",
        phone: "+91 ",
      });

      setFocusedField(null);
    }, 300);
  };

  const activeCategoryObject = categoriesData.find(
    (category) => category.id === activeFolderId,
  );

  const companiesActive =
    pathname === "/windows-doors" ||
    pathname === "/interiors" ||
    pathname === "/renovation" ||
    pathname === "/metal-works";

  return (
    <>
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header
        className={`fixed left-0 right-0 top-0 z-[200] w-full transition-all duration-500 ${
          scrolled
            ? "border-b border-slate-100 bg-white/95 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-2xl"
            : "bg-white/90 backdrop-blur-xl"
        }`}
      >
        <div className="mx-auto max-w-[1600px] px-4 sm:px-5 lg:px-8 xl:px-10">
          <div className="flex h-20 items-center justify-between gap-3">
            {/* LOGO */}

            <Link
              href="/"
              aria-label="Simmply Perfect Group home"
              className="group relative z-50 flex min-w-0 shrink items-center"
            >
              <Image
                src="/logo.png"
                alt="Simmply Perfect Group"
                width={65}
                height={50}
                priority
                className="h-11 w-auto shrink-0 object-contain transition-transform duration-300 group-hover:scale-105"
              />

              <div className="ml-2.5 min-w-0">
                <h1 className="truncate text-base font-bold leading-none tracking-wide text-[#0A2E6F] sm:text-xl">
                  SIMMPLY PERFECT
                </h1>

                <span className="block text-[9px] tracking-[4px] text-slate-500 sm:text-[10px] sm:tracking-[5px]">
                  GROUP
                </span>
              </div>
            </Link>

            {/* DESKTOP NAVIGATION */}

            <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
              <DesktopNavLink href="/" label="Home" pathname={pathname} />

              <DesktopNavLink href="/about" label="About" pathname={pathname} />

              {/* COMPANIES */}

              <div
                className="relative"
                onMouseEnter={() => setCompaniesOpen(true)}
                onMouseLeave={() => setCompaniesOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setCompaniesOpen((previous) => !previous)}
                  className={`group relative flex items-center gap-1.5 whitespace-nowrap text-[16px] transition-all duration-300 ${
                    companiesActive
                      ? "font-bold text-[#0A2E6F]"
                      : "font-semibold text-slate-700 hover:text-[#0A2E6F]"
                  }`}
                >
                  Companies
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${
                      companiesOpen ? "rotate-180" : ""
                    }`}
                  />
                  <span
                    className={`absolute -bottom-2 left-0 h-[2px] bg-[#0A2E6F] transition-all duration-300 ${
                      companiesActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {companiesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{
                        duration: 0.18,
                        ease: "easeOut",
                      }}
                      className="absolute left-1/2 top-full z-[220] w-[230px] -translate-x-1/2 pt-4"
                    >
                      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-[0_20px_50px_rgba(15,23,42,0.15)]">
                        {companyItems.map((company) => {
                          const isActive = pathname === company.href;

                          return (
                            <Link
                              key={company.label}
                              href={company.href}
                              onClick={() => setCompaniesOpen(false)}
                              className={`group/item flex items-center justify-between rounded-lg px-3.5 py-3 text-sm transition-all duration-200 ${
                                isActive
                                  ? "bg-blue-50 font-semibold text-[#0A2E6F]"
                                  : "font-medium text-slate-600 hover:bg-slate-50 hover:text-[#0A2E6F]"
                              }`}
                            >
                              <span>{company.label}</span>

                              <ChevronRight
                                className={`h-3.5 w-3.5 transition-all duration-200 ${
                                  isActive
                                    ? "text-[#0A2E6F]"
                                    : "text-slate-300 group-hover/item:translate-x-0.5 group-hover/item:text-[#0A2E6F]"
                                }`}
                              />
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CATALOGS */}

              <button
                type="button"
                onClick={() => {
                  setCompaniesOpen(false);
                  setCatalogsOpen(true);
                }}
                className="group relative whitespace-nowrap text-[16px] font-semibold text-slate-700 transition-all duration-300 hover:text-[#0A2E6F]"
              >
                Catalogs
                <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-[#0A2E6F] transition-all duration-300 group-hover:w-full" />
              </button>

              <DesktopNavLink
                href="/gallery"
                label="Gallery"
                pathname={pathname}
              />

              <DesktopNavLink
                href="/articles"
                label="Articles"
                pathname={pathname}
              />

              <DesktopNavLink
                href="/careers"
                label="Careers"
                pathname={pathname}
              />

              <DesktopNavLink
                href="/contact"
                label="Contact"
                pathname={pathname}
              />
            </nav>

            {/* MOBILE MENU BUTTON (SQUARE SHAPE & FIXED DIMENSIONS) */}

            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="relative z-50 flex h-10 w-10 min-h-10 min-w-10 shrink-0 grow-0 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm transition-colors hover:bg-slate-50 active:bg-slate-100 lg:hidden"
            >
              <div className="flex flex-col gap-1.5">
                <span className="h-[2px] w-5 rounded-full bg-[#0A2E6F]" />
                <span className="h-[2px] w-5 rounded-full bg-[#0A2E6F]" />
                <span className="h-[2px] w-5 rounded-full bg-[#0A2E6F]" />
              </div>
            </motion.button>
          </div>
        </div>
      </header>

      {/* =====================================================
          MOBILE NAVIGATION
      ===================================================== */}

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-sm"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                duration: 0.35,
                ease: "easeInOut",
              }}
              className="fixed right-0 top-0 z-[310] flex h-[100dvh] w-[90%] max-w-[380px] flex-col bg-white shadow-2xl"
            >
              <div className="flex shrink-0 items-center justify-between border-b border-slate-100 p-6">
                <div className="flex items-center gap-3">
                  <Image
                    src="/logo.png"
                    alt="Simmply Perfect"
                    width={50}
                    height={38}
                    className="h-9 w-auto"
                  />

                  <div className="flex flex-col justify-center">
                    <span className="text-[15px] font-bold leading-tight tracking-wide text-[#0A2E6F]">
                      SIMMPLY PERFECT
                    </span>
                    <span className="text-[9px] font-medium tracking-[0.3em] text-slate-500">
                      GROUP
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-6 sm:p-8">
                {[
                  { href: "/", label: "Home" },
                  { href: "/about", label: "About" },
                ].map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`rounded-xl px-3 py-3.5 text-[17px] transition-colors ${
                        isActive
                          ? "bg-blue-50 font-bold text-[#0A2E6F]"
                          : "font-semibold text-slate-600 hover:bg-slate-50 hover:text-[#0A2E6F]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}

                {/* MOBILE COMPANIES */}

                <div>
                  <button
                    type="button"
                    onClick={() =>
                      setMobileCompaniesOpen((previous) => !previous)
                    }
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-3.5 text-[17px] font-bold transition-colors ${
                      companiesActive
                        ? "bg-blue-50 text-[#0A2E6F]"
                        : "text-slate-600 hover:bg-slate-50 hover:text-[#0A2E6F]"
                    }`}
                  >
                    Companies
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${
                        mobileCompaniesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileCompaniesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                        }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-3 mt-1 space-y-1 border-l border-slate-200 pl-3">
                          {companyItems.map((company) => {
                            const Icon = company.icon;
                            const isActive = pathname === company.href;

                            return (
                              <Link
                                key={company.label}
                                href={company.href}
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setMobileCompaniesOpen(false);
                                }}
                                className={`flex items-center gap-3 rounded-xl px-3 py-3 transition-colors ${
                                  isActive
                                    ? "bg-blue-50 font-bold text-[#0A2E6F]"
                                    : "font-semibold text-slate-500 hover:bg-slate-50 hover:text-[#0A2E6F]"
                                }`}
                              >
                                <div
                                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                                    isActive
                                      ? "bg-[#0A2E6F] text-white"
                                      : "bg-blue-50 text-[#0A2E6F]"
                                  }`}
                                >
                                  <Icon className="h-4 w-4" />
                                </div>

                                <span className="text-sm">
                                  {company.label}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* MOBILE CATALOGS */}

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);

                    setTimeout(() => {
                      setCatalogsOpen(true);
                    }, 350);
                  }}
                  className="w-full rounded-xl px-3 py-3.5 text-left text-[17px] font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#0A2E6F]"
                >
                  Catalogs
                </button>

                {[
                  { href: "/gallery", label: "Gallery" },
                  { href: "/articles", label: "Articles" },
                  { href: "/careers", label: "Careers" },
                  { href: "/contact", label: "Contact" },
                ].map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`rounded-xl px-3 py-3.5 text-[17px] transition-colors ${
                        isActive
                          ? "bg-blue-50 font-bold text-[#0A2E6F]"
                          : "font-semibold text-slate-600 hover:bg-slate-50 hover:text-[#0A2E6F]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* =====================================================
          CATALOG MODAL
      ===================================================== */}

      <AnimatePresence>
        {catalogsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] flex items-center justify-center p-3 sm:p-5"
          >
            {/* BACKDROP */}
            <motion.button
              type="button"
              aria-label="Close catalog popup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseCatalogs}
              className="absolute inset-0 h-full w-full cursor-default bg-[#020817]/80 backdrop-blur-md"
            />

            {/* MODAL */}
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.97,
              }}
              transition={{
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative z-[510] flex max-h-[94dvh] w-full max-w-6xl flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_40px_120px_rgba(0,0,0,0.4)]"
            >
              {/* MODAL HEADER */}
              <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-7">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0A2E6F] text-white shadow-sm">
                    <FolderOpen className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <h2 className="truncate text-lg font-bold text-[#071224] sm:text-xl">
                      Simmply Perfect Catalogs
                    </h2>

                    <p className="mt-0.5 hidden text-xs text-slate-500 sm:block">
                      Explore and download our architectural product catalogues
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCloseCatalogs}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* =================================================
                  LEAD FORM / CATALOG ARCHIVE
              ================================================= */}
              {!isSubmitted ? (
                <div className="grid flex-1 overflow-y-auto lg:grid-cols-[0.9fr_1.1fr]">
                  {/* LEFT INFORMATION PANEL */}
                  <div className="relative hidden overflow-hidden bg-[#071224] p-10 text-white lg:block">
                    <div
                      className="absolute inset-0 opacity-[0.08]"
                      style={{
                        backgroundImage: `
                          linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
                        `,
                        backgroundSize: "45px 45px",
                      }}
                    />

                    <div className="relative">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5">
                        <Sparkles className="h-4 w-4 text-blue-300" />

                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-100">
                          Product Library
                        </span>
                      </div>

                      <h3 className="mt-7 text-3xl font-extrabold leading-tight tracking-tight xl:text-4xl">
                        Discover our complete product collection.
                      </h3>

                      <p className="mt-4 text-sm leading-relaxed text-slate-300">
                        Access premium specifications and blueprints for railing
                        systems, UPVC windows, UPVC doors, solid wooden doors,
                        WPC doors, and custom window grills.
                      </p>

                      <div className="mt-8 space-y-3.5">
                        {[
                          "High-resolution architectural catalogues",
                          "Detailed profile and hardware specifications",
                          "Instant online preview and direct PDF downloads",
                        ].map((item) => (
                          <div
                            key={item}
                            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3"
                          >
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-blue-300">
                              <ArrowRight className="h-3.5 w-3.5" />
                            </div>

                            <span className="text-xs font-semibold text-slate-200">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* FORM PANEL */}
                  <div className="flex items-center p-6 sm:p-10">
                    <form
                      onSubmit={handleSubmit}
                      autoComplete="on"
                      className="mx-auto w-full max-w-lg"
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0A2E6F]">
                        Catalogue Access
                      </p>

                      <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#071224] sm:text-3xl">
                        Enter your details
                      </h3>

                      <p className="mt-1.5 text-xs text-slate-500 sm:text-sm">
                        Complete the short form below to unlock our complete
                        digital catalogue library.
                      </p>

                      <div className="mt-6 space-y-4">
                        {/* FULL NAME */}
                        <div>
                          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                            Full Name *
                          </label>

                          <div
                            className={`group relative flex h-12 w-full items-center rounded-xl border bg-slate-50/50 transition-all duration-200 ${
                              focusedField === "name"
                                ? "border-[#0A2E6F] bg-white ring-4 ring-[#0A2E6F]/[0.05]"
                                : "border-slate-200 hover:border-slate-300"
                            }`}
                          >
                            <div className="relative z-20 flex shrink-0 items-center pl-3.5">
                              <User className="h-4 w-4 text-slate-400" />
                            </div>

                            <div className="relative z-10 min-w-0 flex-1">
                              <input
                                required
                                type="text"
                                name="catalog_customer_name"
                                autoComplete="name"
                                value={formData.name}
                                onFocus={() => setFocusedField("name")}
                                onBlur={() => setFocusedField(null)}
                                onChange={(event) =>
                                  setFormData((previous) => ({
                                    ...previous,
                                    name: event.target.value,
                                  }))
                                }
                                placeholder="e.g. John Doe"
                                className="catalog-modal-input"
                              />
                            </div>
                          </div>
                        </div>

                        {/* EMAIL ADDRESS */}
                        <div>
                          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                            Email Address *
                          </label>

                          <div
                            className={`group relative flex h-12 w-full items-center rounded-xl border bg-slate-50/50 transition-all duration-200 ${
                              focusedField === "email"
                                ? "border-[#0A2E6F] bg-white ring-4 ring-[#0A2E6F]/[0.05]"
                                : "border-slate-200 hover:border-slate-300"
                            }`}
                          >
                            <div className="relative z-20 flex shrink-0 items-center pl-3.5">
                              <Mail className="h-4 w-4 text-slate-400" />
                            </div>

                            <div className="relative z-10 min-w-0 flex-1">
                              <input
                                required
                                type="email"
                                name="catalog_customer_email"
                                autoComplete="email"
                                value={formData.email}
                                onFocus={() => setFocusedField("email")}
                                onBlur={() => setFocusedField(null)}
                                onChange={(event) =>
                                  setFormData((previous) => ({
                                    ...previous,
                                    email: event.target.value,
                                  }))
                                }
                                placeholder="you@domain.com"
                                className="catalog-modal-input"
                              />
                            </div>
                          </div>
                        </div>

                        {/* MOBILE NUMBER */}
                        <div>
                          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                            Mobile Number *
                          </label>

                          <div
                            className={`group relative flex h-12 w-full items-center rounded-xl border bg-slate-50/50 transition-all duration-200 ${
                              focusedField === "phone"
                                ? "border-[#0A2E6F] bg-white ring-4 ring-[#0A2E6F]/[0.05]"
                                : "border-slate-200 hover:border-slate-300"
                            }`}
                          >
                            <div className="relative z-20 flex shrink-0 items-center pl-3.5">
                              <Phone className="h-4 w-4 text-slate-400" />
                            </div>

                            <div className="relative z-10 min-w-0 flex-1">
                              <input
                                required
                                type="tel"
                                name="catalog_customer_mobile"
                                autoComplete="tel"
                                inputMode="numeric"
                                value={formData.phone}
                                onFocus={() => setFocusedField("phone")}
                                onBlur={() => setFocusedField(null)}
                                onChange={(event) =>
                                  handlePhoneChange(event.target.value)
                                }
                                placeholder="+91 98765 43210"
                                className="catalog-modal-input"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {submitError && (
                        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-600">
                          {submitError}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0A2E6F] px-5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_10px_25px_rgba(10,46,111,0.2)] transition-all duration-200 hover:bg-[#0c3784] hover:shadow-[0_15px_30px_rgba(10,46,111,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Unlocking Library...
                          </>
                        ) : (
                          <>
                            Access Catalogues
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              ) : (
                /* =================================================
                    CATALOG LIBRARY (WHEN SUBMITTED)
                ================================================= */
                <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
                  {/* CATEGORIES SIDEBAR */}
                  <div className="shrink-0 border-b border-slate-200 bg-slate-50 p-4 lg:w-[310px] lg:border-b-0 lg:border-r lg:p-5">
                    <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      Product Categories
                    </p>

                    <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
                      {categoriesData.map((category) => {
                        const Icon = category.icon;
                        const active = activeFolderId === category.id;

                        return (
                          <button
                            type="button"
                            key={category.id}
                            onClick={() => {
                              setActiveFolderId(category.id);
                              setActivePreviewPdf(null);
                            }}
                            className={`flex min-w-[210px] items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all lg:min-w-0 ${
                              active
                                ? "border-[#0A2E6F] bg-[#0A2E6F] text-white shadow-md"
                                : "border-transparent bg-white text-slate-600 hover:border-slate-200"
                            }`}
                          >
                            <div
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                                active
                                  ? "bg-white/10"
                                  : "bg-blue-50 text-[#0A2E6F]"
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-sm font-bold">
                                {category.name}
                              </p>

                              <p
                                className={`mt-0.5 truncate text-[10px] ${
                                  active ? "text-blue-100/70" : "text-slate-400"
                                }`}
                              >
                                {category.files.length} Catalogues
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* CATALOGS CONTENT GRID / PDF PREVIEW */}
                  <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-7">
                    {!activeCategoryObject ? (
                      <div className="flex min-h-[450px] flex-col items-center justify-center text-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-blue-50 text-[#0A2E6F]">
                          <FolderOpen className="h-9 w-9" />
                        </div>

                        <h3 className="mt-6 text-2xl font-bold text-[#071224]">
                          Select a product category
                        </h3>

                        <p className="mt-3 max-w-md text-sm leading-7 text-slate-500">
                          Choose one of the available categories on the left to
                          browse, preview, and download architectural catalogues.
                        </p>
                      </div>
                    ) : activePreviewPdf ? (
                      <div className="flex h-full min-h-[550px] flex-col">
                        <div className="mb-4 flex items-center justify-between gap-4">
                          <button
                            type="button"
                            onClick={() => setActivePreviewPdf(null)}
                            className="inline-flex items-center gap-2 text-sm font-bold text-[#0A2E6F]"
                          >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Catalogues
                          </button>

                          <a
                            href={activePreviewPdf.url}
                            download
                            className="inline-flex items-center gap-2 rounded-xl bg-[#0A2E6F] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#0c3784]"
                          >
                            <Download className="h-4 w-4" />
                            Download PDF
                          </a>
                        </div>

                        <div className="min-h-[500px] flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                          <iframe
                            src={activePreviewPdf.url}
                            title={activePreviewPdf.title}
                            className="h-full min-h-[500px] w-full"
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="border-b border-slate-200 pb-5">
                          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0A2E6F]">
                            Catalogue Collection
                          </p>

                          <h3 className="mt-2 text-2xl font-bold text-[#071224]">
                            {activeCategoryObject.name}
                          </h3>

                          <p className="mt-2 text-sm text-slate-500">
                            {activeCategoryObject.desc}
                          </p>
                        </div>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                          {activeCategoryObject.files.map((file) => (
                            <div
                              key={file.url}
                              className="group rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-[#0A2E6F]/30 hover:shadow-md"
                            >
                              <div className="flex items-start gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
                                  <FileText className="h-5 w-5" />
                                </div>

                                <div className="min-w-0 flex-1">
                                  <h4 className="line-clamp-2 text-sm font-bold text-[#071224]">
                                    {file.name}
                                  </h4>

                                  <p className="mt-1 text-[11px] text-slate-400">
                                    PDF • {file.size}
                                  </p>
                                </div>
                              </div>

                              <div className="mt-4 grid grid-cols-2 gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setActivePreviewPdf({
                                      title: file.name,
                                      url: file.url,
                                    })
                                  }
                                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-xs font-bold text-slate-600 transition-colors hover:border-[#0A2E6F] hover:text-[#0A2E6F]"
                                >
                                  <Eye className="h-3.5 w-3.5" />
                                  Preview
                                </button>

                                <a
                                  href={file.url}
                                  download
                                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A2E6F] px-3 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#0c3784]"
                                >
                                  <Download className="h-3.5 w-3.5" />
                                  Download
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </motion.div>

            {/* AUTOFILL CSS FIX SCOPED TO MODAL */}
            <style jsx global>{`
              .catalog-modal-input {
                width: 100%;
                min-width: 0;
                border: 0;
                outline: none;
                background: transparent !important;
                padding: 0.75rem 0.875rem;
                font-size: 0.875rem;
                line-height: 1.25rem;
                color: #0f172a;
                position: relative;
                z-index: 10;
                box-sizing: border-box;
              }

              .catalog-modal-input::placeholder {
                color: #94a3b8;
                opacity: 1;
              }

              .catalog-modal-input:-webkit-autofill,
              .catalog-modal-input:-webkit-autofill:hover,
              .catalog-modal-input:-webkit-autofill:focus,
              .catalog-modal-input:-webkit-autofill:active {
                -webkit-text-fill-color: #0f172a !important;
                caret-color: #0f172a !important;
                -webkit-box-shadow: none !important;
                box-shadow: none !important;
                background-color: transparent !important;
                transition: background-color 600000s ease-in-out 0s,
                  color 600000s ease-in-out 0s !important;
              }

              .catalog-modal-input:-webkit-autofill::first-line {
                -webkit-text-fill-color: #0f172a !important;
                color: #0f172a !important;
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}