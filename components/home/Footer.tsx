"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  X,
  CheckCircle2,
  ChevronRight,
  Handshake,
  BadgePercent,
  Building2,
  User,
  BriefcaseBusiness,
  Globe2,
  MessageSquare,
  Loader2,
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
   TYPES
========================================================= */

type ApplicationType = "partner" | "affiliate";

type FormData = {
  type: ApplicationType;
  name: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  website: string;
  message: string;
  termsAccepted: boolean;
};

/* =========================================================
   APPLICATION CONTENT
========================================================= */

const applicationContent = {
  partner: {
    title: "Become a Partner",
    shortTitle: "Partner with Simmply Perfect",
    description:
      "Build a long-term business relationship with Simmply Perfect Group and collaborate with us to deliver premium architectural, interior, renovation, and fabrication solutions.",
    icon: Handshake,
    badge: "Business Partnership",
    color: "blue",
    benefits: [
      "Collaborate on residential and commercial projects",
      "Access our range of premium products and solutions",
      "Explore project-based and long-term business opportunities",
      "Work with a professional and growing organization",
      "Create mutually beneficial business relationships",
    ],
    terms: [
      "Partnership opportunities are subject to review and approval by Simmply Perfect Group.",
      "Submission of this form does not guarantee a partnership or commercial engagement.",
      "All project, pricing, commission, and commercial terms will be discussed separately where applicable.",
      "Partners are expected to maintain professional conduct and protect confidential business information.",
      "Any partnership arrangement will be governed by mutually agreed written terms.",
    ],
  },

  affiliate: {
    title: "Become an Affiliate",
    shortTitle: "Grow with Simmply Perfect",
    description:
      "Refer customers and business opportunities to Simmply Perfect Group and explore an opportunity to build an additional revenue stream through successful referrals.",
    icon: BadgePercent,
    badge: "Affiliate Program",
    color: "purple",
    benefits: [
      "Refer customers looking for premium solutions",
      "Promote our products and services through your network",
      "Explore referral-based earning opportunities",
      "Receive support and information about our offerings",
      "Build a long-term relationship with our brand",
    ],
    terms: [
      "Affiliate applications are reviewed and approved individually by Simmply Perfect Group.",
      "Submitting this form does not automatically activate an affiliate account.",
      "Referral eligibility, commission structure, and payment terms may vary based on the agreed arrangement.",
      "Affiliates must not make false, misleading, or unauthorized claims about our products or services.",
      "Any affiliate arrangement may be governed by separate written terms provided by Simmply Perfect Group.",
    ],
  },
};

/* =========================================================
   FOOTER
========================================================= */

export default function Footer() {
  /* =======================================================
     MODAL STATE
  ======================================================= */

  const [applicationType, setApplicationType] =
    useState<ApplicationType | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const [formData, setFormData] = useState<FormData>({
    type: "partner",
    name: "",
    company: "",
    email: "",
    phone: "",
    city: "",
    website: "",
    message: "",
    termsAccepted: false,
  });

  /* =======================================================
     OPEN MODAL
  ======================================================= */

  const openApplication = (type: ApplicationType) => {
    setApplicationType(type);

    setFormData({
      type,
      name: "",
      company: "",
      email: "",
      phone: "",
      city: "",
      website: "",
      message: "",
      termsAccepted: false,
    });

    setSubmitStatus("idle");

    document.body.style.overflow = "hidden";
  };

  /* =======================================================
     CLOSE MODAL
  ======================================================= */

  const closeApplication = () => {
    if (isSubmitting) return;

    setApplicationType(null);
    setSubmitStatus("idle");

    document.body.style.overflow = "";
  };

  /* =======================================================
     HANDLE INPUT
  ======================================================= */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  /* =======================================================
     SUBMIT FORM
  ======================================================= */

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/partnership-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Something went wrong.");
      }

      setSubmitStatus("success");

      setFormData((prev) => ({
        ...prev,
        name: "",
        company: "",
        email: "",
        phone: "",
        city: "",
        website: "",
        message: "",
        termsAccepted: false,
      }));
    } catch (error) {
      console.error("Application submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =======================================================
     ACTIVE CONTENT
  ======================================================= */

  const activeContent = applicationType
    ? applicationContent[applicationType]
    : null;

  const ActiveIcon = activeContent?.icon;

  return (
    <>
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
                One trusted destination for premium Windows & Doors, Luxury
                Interiors, Custom Metal Fabrication, Home Renovations, and
                turnkey architectural solutions designed to elevate every
                space.
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

          {/* =====================================================
              PARTNER / AFFILIATE BUTTONS
          ===================================================== */}

          <div className="mt-14 border-t border-white/[0.08] pt-10">
            <div className="mb-6 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300">
                Grow With Us
              </p>

              <h3 className="mt-2 text-xl font-semibold text-white">
                Let&apos;s Build Something Great Together
              </h3>

              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-400">
                Join our growing network of partners and affiliates and create
                new business opportunities with Simmply Perfect Group.
              </p>
            </div>

            <div className="mx-auto flex max-w-2xl flex-col gap-3 sm:flex-row">
              {/* BECOME PARTNER */}

              <button
                type="button"
                onClick={() => openApplication("partner")}
                className="group flex flex-1 items-center justify-between rounded-2xl border border-blue-400/20 bg-blue-500/[0.08] px-5 py-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-blue-500/[0.14] hover:shadow-[0_15px_40px_rgba(37,99,235,0.15)]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300 transition-transform duration-300 group-hover:scale-105">
                    <Handshake className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Become a Partner
                    </p>

                    <p className="mt-0.5 text-xs text-slate-400">
                      Build a long-term business relationship
                    </p>
                  </div>
                </div>

                <ChevronRight className="h-5 w-5 text-slate-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-300" />
              </button>

              {/* BECOME AFFILIATE */}

              <button
                type="button"
                onClick={() => openApplication("affiliate")}
                className="group flex flex-1 items-center justify-between rounded-2xl border border-purple-400/20 bg-purple-500/[0.07] px-5 py-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/40 hover:bg-purple-500/[0.13] hover:shadow-[0_15px_40px_rgba(168,85,247,0.15)]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300 transition-transform duration-300 group-hover:scale-105">
                    <BadgePercent className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Become an Affiliate
                    </p>

                    <p className="mt-0.5 text-xs text-slate-400">
                      Refer customers and grow with us
                    </p>
                  </div>
                </div>

                <ChevronRight className="h-5 w-5 text-slate-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-purple-300" />
              </button>
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

      {/* =========================================================
          APPLICATION MODAL
      ========================================================= */}

      {applicationType && activeContent && ActiveIcon && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/75 p-3 backdrop-blur-md sm:p-5"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeApplication();
            }
          }}
        >
          <div className="relative my-auto flex max-h-[95vh] w-full max-w-6xl flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#081326] shadow-[0_30px_100px_rgba(0,0,0,0.55)]">
            {/* =================================================
                MODAL TOP DECORATION
            ================================================= */}

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div
                className={`absolute -left-24 -top-24 h-72 w-72 rounded-full blur-[110px] ${
                  applicationType === "partner"
                    ? "bg-blue-500/20"
                    : "bg-purple-500/20"
                }`}
              />

              <div
                className={`absolute -bottom-32 -right-20 h-80 w-80 rounded-full blur-[120px] ${
                  applicationType === "partner"
                    ? "bg-cyan-400/10"
                    : "bg-pink-400/10"
                }`}
              />
            </div>

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="relative flex items-center justify-between border-b border-white/[0.08] px-5 py-4 sm:px-7 sm:py-5">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                    applicationType === "partner"
                      ? "bg-blue-500/15 text-blue-300"
                      : "bg-purple-500/15 text-purple-300"
                  }`}
                >
                  <ActiveIcon className="h-5 w-5" />
                </div>

                <div>
                  <p
                    className={`text-[10px] font-bold uppercase tracking-[0.18em] ${
                      applicationType === "partner"
                        ? "text-blue-300"
                        : "text-purple-300"
                    }`}
                  >
                    {activeContent.badge}
                  </p>

                  <h2 className="mt-0.5 text-lg font-semibold text-white sm:text-xl">
                    {activeContent.title}
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={closeApplication}
                disabled={isSubmitting}
                aria-label="Close"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-slate-400 transition-all duration-300 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* =================================================
                MODAL BODY
            ================================================= */}

            <div className="relative min-h-0 flex-1 overflow-y-auto">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                {/* =================================================
                    LEFT INFORMATION PANEL
                ================================================= */}

                <div className="border-b border-white/[0.08] bg-white/[0.015] p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
                  <div className="max-w-xl">
                    <div
                      className={`inline-flex items-center rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] ${
                        applicationType === "partner"
                          ? "border-blue-400/20 bg-blue-500/10 text-blue-300"
                          : "border-purple-400/20 bg-purple-500/10 text-purple-300"
                      }`}
                    >
                      {activeContent.badge}
                    </div>

                    <h3 className="mt-5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                      {activeContent.shortTitle}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-slate-400">
                      {activeContent.description}
                    </p>

                    {/* BENEFITS */}

                    <div className="mt-8">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-white">
                        What you can expect
                      </p>

                      <div className="mt-4 space-y-3">
                        {activeContent.benefits.map((benefit) => (
                          <div
                            key={benefit}
                            className="flex items-start gap-3"
                          >
                            <div
                              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                                applicationType === "partner"
                                  ? "bg-blue-500/15 text-blue-300"
                                  : "bg-purple-500/15 text-purple-300"
                              }`}
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" />
                            </div>

                            <p className="text-sm leading-6 text-slate-400">
                              {benefit}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* TERMS */}

                    <div className="mt-9 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-white">
                        Terms & Conditions
                      </p>

                      <div className="mt-4 space-y-3">
                        {activeContent.terms.map((term, index) => (
                          <div
                            key={term}
                            className="flex items-start gap-3"
                          >
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-[9px] font-bold text-slate-400">
                              {index + 1}
                            </span>

                            <p className="text-xs leading-5 text-slate-500">
                              {term}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* =================================================
                    RIGHT FORM
                ================================================= */}

                <div className="p-6 sm:p-8 lg:p-10">
                  <div className="mb-7">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                      Application Form
                    </p>

                    <h3 className="mt-2 text-xl font-semibold text-white">
                      Tell us about yourself
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Fill in your details and our team will get back to you.
                    </p>
                  </div>

                  {/* SUCCESS MESSAGE */}

                  {submitStatus === "success" ? (
                    <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                        <CheckCircle2 className="h-10 w-10" />
                      </div>

                      <h3 className="mt-6 text-2xl font-bold text-white">
                        Application Received
                      </h3>

                      <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
                        Thank you for your interest in working with Simmply
                        Perfect Group. Our team has received your application
                        and will review your details.
                      </p>

                      <button
                        type="button"
                        onClick={closeApplication}
                        className="mt-8 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#071224] transition-all duration-300 hover:bg-slate-200"
                      >
                        Close
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* APPLICATION TYPE */}

                      <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                          Application Type
                        </label>

                        <div className="grid grid-cols-2 gap-3">
                          {/* PARTNER */}

                          <button
                            type="button"
                            onClick={() => {
                              setApplicationType("partner");
                              setFormData((prev) => ({
                                ...prev,
                                type: "partner",
                              }));
                              setSubmitStatus("idle");
                            }}
                            className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all duration-300 ${
                              formData.type === "partner"
                                ? "border-blue-400/50 bg-blue-500/10"
                                : "border-white/10 bg-white/[0.025] hover:bg-white/[0.05]"
                            }`}
                          >
                            <div
                              className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                                formData.type === "partner"
                                  ? "bg-blue-500/15 text-blue-300"
                                  : "bg-white/[0.05] text-slate-500"
                              }`}
                            >
                              <Handshake className="h-4 w-4" />
                            </div>

                            <div>
                              <p className="text-xs font-semibold text-white">
                                Partner
                              </p>

                              <p className="mt-0.5 text-[10px] text-slate-500">
                                Business partnership
                              </p>
                            </div>
                          </button>

                          {/* AFFILIATE */}

                          <button
                            type="button"
                            onClick={() => {
                              setApplicationType("affiliate");
                              setFormData((prev) => ({
                                ...prev,
                                type: "affiliate",
                              }));
                              setSubmitStatus("idle");
                            }}
                            className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all duration-300 ${
                              formData.type === "affiliate"
                                ? "border-purple-400/50 bg-purple-500/10"
                                : "border-white/10 bg-white/[0.025] hover:bg-white/[0.05]"
                            }`}
                          >
                            <div
                              className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                                formData.type === "affiliate"
                                  ? "bg-purple-500/15 text-purple-300"
                                  : "bg-white/[0.05] text-slate-500"
                              }`}
                            >
                              <BadgePercent className="h-4 w-4" />
                            </div>

                            <div>
                              <p className="text-xs font-semibold text-white">
                                Affiliate
                              </p>

                              <p className="mt-0.5 text-[10px] text-slate-500">
                                Referral program
                              </p>
                            </div>
                          </button>
                        </div>
                      </div>

                      {/* NAME + COMPANY */}

                      <div className="grid gap-5 sm:grid-cols-2">
                        {/* NAME */}

                        <div>
                          <label
                            htmlFor="name"
                            className="mb-2 block text-xs font-semibold text-slate-400"
                          >
                            Full Name *
                          </label>

                          <div className="relative">
                            <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />

                            <input
                              id="name"
                              name="name"
                              type="text"
                              required
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Your full name"
                              className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.035] pl-11 pr-4 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-blue-400/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-blue-500/10"
                            />
                          </div>
                        </div>

                        {/* COMPANY */}

                        <div>
                          <label
                            htmlFor="company"
                            className="mb-2 block text-xs font-semibold text-slate-400"
                          >
                            Company / Business
                          </label>

                          <div className="relative">
                            <Building2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />

                            <input
                              id="company"
                              name="company"
                              type="text"
                              value={formData.company}
                              onChange={handleChange}
                              placeholder="Company name"
                              className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.035] pl-11 pr-4 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-blue-400/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-blue-500/10"
                            />
                          </div>
                        </div>
                      </div>

                      {/* EMAIL + PHONE */}

                      <div className="grid gap-5 sm:grid-cols-2">
                        {/* EMAIL */}

                        <div>
                          <label
                            htmlFor="email"
                            className="mb-2 block text-xs font-semibold text-slate-400"
                          >
                            Email Address *
                          </label>

                          <div className="relative">
                            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />

                            <input
                              id="email"
                              name="email"
                              type="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="you@example.com"
                              className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.035] pl-11 pr-4 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-blue-400/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-blue-500/10"
                            />
                          </div>
                        </div>

                        {/* PHONE */}

                        <div>
                          <label
                            htmlFor="phone"
                            className="mb-2 block text-xs font-semibold text-slate-400"
                          >
                            Phone Number *
                          </label>

                          <div className="relative">
                            <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />

                            <input
                              id="phone"
                              name="phone"
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="+91 XXXXX XXXXX"
                              className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.035] pl-11 pr-4 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-blue-400/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-blue-500/10"
                            />
                          </div>
                        </div>
                      </div>

                      {/* CITY + WEBSITE */}

                      <div className="grid gap-5 sm:grid-cols-2">
                        {/* CITY */}

                        <div>
                          <label
                            htmlFor="city"
                            className="mb-2 block text-xs font-semibold text-slate-400"
                          >
                            City *
                          </label>

                          <div className="relative">
                            <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />

                            <input
                              id="city"
                              name="city"
                              type="text"
                              required
                              value={formData.city}
                              onChange={handleChange}
                              placeholder="Your city"
                              className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.035] pl-11 pr-4 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-blue-400/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-blue-500/10"
                            />
                          </div>
                        </div>

                        {/* WEBSITE */}

                        <div>
                          <label
                            htmlFor="website"
                            className="mb-2 block text-xs font-semibold text-slate-400"
                          >
                            Website / Social Profile
                          </label>

                          <div className="relative">
                            <Globe2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />

                            <input
                              id="website"
                              name="website"
                              type="text"
                              value={formData.website}
                              onChange={handleChange}
                              placeholder="https://..."
                              className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.035] pl-11 pr-4 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-blue-400/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-blue-500/10"
                            />
                          </div>
                        </div>
                      </div>

                      {/* MESSAGE */}

                      <div>
                        <label
                          htmlFor="message"
                          className="mb-2 block text-xs font-semibold text-slate-400"
                        >
                          Tell us about your interest *
                        </label>

                        <div className="relative">
                          <MessageSquare className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-slate-600" />

                          <textarea
                            id="message"
                            name="message"
                            required
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            placeholder={
                              applicationType === "partner"
                                ? "Tell us about your business, services, and how you would like to partner with us..."
                                : "Tell us about your network, audience, business, and how you would like to promote our services..."
                            }
                            className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.035] py-3 pl-11 pr-4 text-sm leading-6 text-white outline-none transition-all placeholder:text-slate-600 focus:border-blue-400/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-blue-500/10"
                          />
                        </div>
                      </div>

                      {/* TERMS CHECKBOX */}

                      <div
                        className={`rounded-xl border p-4 transition-all ${
                          formData.termsAccepted
                            ? "border-emerald-400/20 bg-emerald-500/[0.04]"
                            : "border-white/10 bg-white/[0.02]"
                        }`}
                      >
                        <label className="flex cursor-pointer items-start gap-3">
                          <input
                            type="checkbox"
                            name="termsAccepted"
                            checked={formData.termsAccepted}
                            onChange={handleChange}
                            required
                            className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-blue-500"
                          />

                          <span className="text-xs leading-5 text-slate-500">
                            I have read and agree to the above{" "}
                            <span className="font-semibold text-slate-300">
                              Terms & Conditions
                            </span>{" "}
                            and confirm that the information provided is
                            accurate.
                          </span>
                        </label>
                      </div>

                      {/* ERROR */}

                      {submitStatus === "error" && (
                        <div className="rounded-xl border border-red-400/20 bg-red-500/[0.06] px-4 py-3 text-xs leading-5 text-red-300">
                          Please accept the Terms & Conditions and make sure
                          all required fields are completed. If the problem
                          continues, please try again.
                        </div>
                      )}

                      {/* SUBMIT */}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`group flex h-13 w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${
                          applicationType === "partner"
                            ? "bg-blue-600 hover:bg-blue-500 hover:shadow-[0_12px_35px_rgba(37,99,235,0.25)]"
                            : "bg-purple-600 hover:bg-purple-500 hover:shadow-[0_12px_35px_rgba(168,85,247,0.25)]"
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Sending Application...
                          </>
                        ) : (
                          <>
                            Submit Application
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </>
                        )}
                      </button>

                      <p className="text-center text-[10px] leading-5 text-slate-600">
                        Your information will be securely submitted to
                        Simmply Perfect Group for review.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}