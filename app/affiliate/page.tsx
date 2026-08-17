"use client";

import { FormEvent, useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import {
  BadgePercent,
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe2,
  MessageSquare,
  CheckCircle2,
  Loader2,
  ArrowUpRight,
  ChevronDown,
  ShieldCheck,
  X,
  FileText,
  Users,
  TrendingUp,
  CircleDollarSign,
  Briefcase,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type Country = {
  name: string;
  code: string;
  dial: string;
};

const countries: Country[] = [
  { name: "India", code: "IN", dial: "+91" },
  { name: "United States", code: "US", dial: "+1" },
  { name: "Canada", code: "CA", dial: "+1" },
  { name: "United Kingdom", code: "GB", dial: "+44" },
  { name: "Australia", code: "AU", dial: "+61" },
  { name: "United Arab Emirates", code: "AE", dial: "+971" },
  { name: "Saudi Arabia", code: "SA", dial: "+966" },
  { name: "Qatar", code: "QA", dial: "+974" },
  { name: "Kuwait", code: "KW", dial: "+965" },
  { name: "Singapore", code: "SG", dial: "+65" },
  { name: "Malaysia", code: "MY", dial: "+60" },
  { name: "Germany", code: "DE", dial: "+49" },
  { name: "France", code: "FR", dial: "+33" },
  { name: "Italy", code: "IT", dial: "+39" },
  { name: "Spain", code: "ES", dial: "+34" },
  { name: "Netherlands", code: "NL", dial: "+31" },
  { name: "South Africa", code: "ZA", dial: "+27" },
  { name: "New Zealand", code: "NZ", dial: "+64" },
  { name: "Japan", code: "JP", dial: "+81" },
  { name: "China", code: "CN", dial: "+86" },
];

type FormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  countryCode: string;
  city: string;
  website: string;
  message: string;
  termsAccepted: boolean;
};

const initialForm: FormData = {
  name: "",
  company: "",
  email: "",
  phone: "",
  countryCode: "+91",
  city: "",
  website: "",
  message: "",
  termsAccepted: false,
};

const affiliateTerms = [
  "Affiliate commission applies exclusively to verified, finalized, and executed client contracts.",
  "Submission of this form registers your intent and does not create an automatic commission entitlement.",
  "Commission percentages, payment schedules, and milestone payouts are defined in the specific referral agreement provided upon approval.",
  "Affiliates must not misrepresent Simmply Perfect Group pricing, quality standards, warranties, or delivery timeframes.",
  "Simmply Perfect Group reserves the right to decline leads that conflict with ongoing direct customer relationships or prior engagements.",
];

export default function AffiliatePage() {
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [countryOpen, setCountryOpen] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showTermsModal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showTermsModal]);

  const selectedCountry =
    countries.find((country) => country.dial === formData.countryCode) || countries[0];

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handlePhoneChange = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    updateField("phone", cleaned);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.termsAccepted) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const completePhone = `${formData.countryCode}${formData.phone}`;

      const payload = {
        type: "affiliate",
        name: formData.name.trim(),
        company: formData.company.trim(),
        email: formData.email.trim(),
        phone: completePhone,
        countryCode: formData.countryCode,
        city: formData.city.trim(),
        website: formData.website.trim(),
        message: formData.message.trim(),
        termsAccepted: formData.termsAccepted,
      };

      const response = await fetch("/api/partnership-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to submit your application.");
      }

      setSubmitStatus("success");
      setFormData(initialForm);
    } catch (error) {
      console.error("AFFILIATE APPLICATION ERROR:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-white text-slate-900 lg:h-screen lg:overflow-hidden">
      <Navbar />

      {/* VIEWPORT-FITTED MAIN BODY WITH RESPONSIVE HEADER CLEARANCE */}
      <main className="flex flex-1 min-h-0 w-full pt-20 sm:pt-24 lg:pt-0">
        <div className="grid h-full w-full grid-cols-1 overflow-y-auto lg:grid-cols-12 lg:overflow-hidden">
          
          {/* =====================================================
              LEFT INFORMATION PANEL
          ===================================================== */}
          <section className="flex flex-col justify-between border-b border-slate-200/80 bg-slate-50/75 p-6 sm:p-8 lg:col-span-5 lg:h-full lg:overflow-y-auto lg:border-b-0 lg:border-r lg:p-8 xl:p-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#0A2E6F]/15 bg-[#0A2E6F]/[0.06] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#0A2E6F]">
                <BadgePercent className="h-3.5 w-3.5" />
                <span>Official Referral Network</span>
              </div>

              <h1 className="mt-3.5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl xl:text-4xl leading-tight">
                Monetize With <span className="text-[#0A2E6F]">Simmply Perfect</span>
              </h1>

              <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                Recommend clients seeking architectural windows, precision doors, luxury interiors, and turnkey renovation services. Earn transparent referral payouts on every verified project contract.
              </p>

              {/* AUDIENCE PILLS */}
              <div className="mt-4 flex flex-wrap items-center gap-1.5">
                {["Real Estate Consultants", "Property Advisors", "Freelance Designers", "Project Managers"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600 shadow-2xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* BENEFITS LIST */}
              <div className="mt-6 space-y-3">
                <Benefit
                  icon={Users}
                  title="Direct Client Introductions"
                  description="Refer clients requiring premium architectural fabrication or luxury turnkey interiors."
                />

                <Benefit
                  icon={Briefcase}
                  title="Dedicated Expert Closing Team"
                  description="Our product specialists manage site surveys, quotations, technical engineering, and execution."
                />

                <Benefit
                  icon={CircleDollarSign}
                  title="Transparent Milestone Payouts"
                  description="Track verified project closures and receive scheduled payouts directly to your account."
                />

                <Benefit
                  icon={TrendingUp}
                  title="Zero Inventory or Capital Overhead"
                  description="No upfront capital investment, warehouse commitments, or post-sales maintenance liability."
                />
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0A2E6F]">
                <ShieldCheck className="h-4 w-4" /> High-Ticket Referral Program
              </div>
              <p className="mt-0.5 text-xs text-slate-500">
                Tailored for property consultants, independent creators, and real estate professionals.
              </p>
            </div>
          </section>

          {/* =====================================================
              RIGHT FORM PANEL
          ===================================================== */}
          <section className="flex flex-col justify-center p-6 sm:p-8 lg:col-span-7 lg:h-full lg:overflow-y-auto lg:p-8 xl:p-12">
            <div className="mx-auto w-full max-w-2xl">
              <div className="mb-5 border-b border-slate-200 pb-3.5">
                <p className="text-xs font-bold uppercase tracking-widest text-[#0A2E6F]">
                  Affiliate Registration
                </p>

                <h2 className="mt-0.5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Apply as an Affiliate
                </h2>

                <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                  Join our network to begin referring residential & commercial projects.
                </p>
              </div>

              {submitStatus === "success" ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-2xl font-bold text-slate-900">Application Submitted!</h3>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">
                    Thank you for applying to the Simmply Perfect Affiliate Program. Our partnership manager will review your submission and connect with you shortly.
                  </p>
                  <Link
                    href="/"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0A2E6F] px-7 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#0c3784]"
                  >
                    Back to Homepage
                  </Link>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  autoComplete="on"
                  className="space-y-4"
                >
                  {/* ROW 1: NAME & COMPANY */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      label="Full Name"
                      required
                      icon={User}
                      focused={focusedField === "name"}
                    >
                      <input
                        required
                        type="text"
                        name="name"
                        autoComplete="name"
                        value={formData.name}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        onChange={(event) => updateField("name", event.target.value)}
                        placeholder="e.g. John Doe"
                        className="partner-input"
                      />
                    </Field>

                    <Field
                      label="Company / Agency (Optional)"
                      icon={Building2}
                      focused={focusedField === "company"}
                    >
                      <input
                        type="text"
                        name="organization"
                        autoComplete="organization"
                        value={formData.company}
                        onFocus={() => setFocusedField("company")}
                        onBlur={() => setFocusedField(null)}
                        onChange={(event) => updateField("company", event.target.value)}
                        placeholder="Real Estate / Advisory"
                        className="partner-input"
                      />
                    </Field>
                  </div>

                  {/* ROW 2: EMAIL & PHONE */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      label="Email Address"
                      required
                      icon={Mail}
                      focused={focusedField === "email"}
                    >
                      <input
                        required
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        onChange={(event) => updateField("email", event.target.value)}
                        placeholder="you@domain.com"
                        className="partner-input"
                      />
                    </Field>

                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Mobile Number <span className="text-[#0A2E6F]">*</span>
                      </label>

                      <div
                        className={`group relative flex h-12 w-full items-center rounded-xl border bg-slate-50/50 transition-all duration-200 ${
                          focusedField === "phone"
                            ? "border-[#0A2E6F] bg-white ring-4 ring-[#0A2E6F]/[0.05]"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="relative z-20 flex h-full shrink-0 items-center pl-3.5">
                          <Phone className="h-4 w-4 text-slate-400" />
                        </div>

                        {/* COUNTRY PICKER */}
                        <div className="relative ml-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => setCountryOpen((prev) => !prev)}
                            className="flex h-8 items-center gap-1 border-r border-slate-200 pr-2.5 text-xs font-semibold text-slate-700"
                            aria-label="Select country code"
                          >
                            <span>{selectedCountry.dial}</span>
                            <ChevronDown
                              className={`h-3 w-3 text-slate-400 transition-transform ${
                                countryOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          {countryOpen && (
                            <div className="absolute left-0 top-[42px] z-[100] max-h-60 w-60 overflow-y-auto rounded-xl border border-slate-200 bg-white p-1 shadow-2xl">
                              {countries.map((country) => (
                                <button
                                  key={`${country.code}-${country.dial}`}
                                  type="button"
                                  onClick={() => {
                                    updateField("countryCode", country.dial);
                                    setCountryOpen(false);
                                  }}
                                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors hover:bg-slate-50 ${
                                    country.dial === formData.countryCode
                                      ? "bg-[#0A2E6F]/[0.06] font-bold text-[#0A2E6F]"
                                      : "text-slate-700"
                                  }`}
                                >
                                  <span>{country.name}</span>
                                  <span className="font-semibold text-slate-500">{country.dial}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="relative z-10 min-w-0 flex-1">
                          <input
                            required
                            type="tel"
                            name="tel"
                            autoComplete="tel-national"
                            inputMode="tel"
                            value={formData.phone}
                            onFocus={() => setFocusedField("phone")}
                            onBlur={() => setFocusedField(null)}
                            onChange={(event) => handlePhoneChange(event.target.value)}
                            placeholder="98765 43210"
                            className="partner-input"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ROW 3: CITY & WEBSITE */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      label="Primary Location"
                      required
                      icon={MapPin}
                      focused={focusedField === "city"}
                    >
                      <input
                        required
                        type="text"
                        name="address-level2"
                        autoComplete="address-level2"
                        value={formData.city}
                        onFocus={() => setFocusedField("city")}
                        onBlur={() => setFocusedField(null)}
                        onChange={(event) => updateField("city", event.target.value)}
                        placeholder="e.g. Hyderabad"
                        className="partner-input"
                      />
                    </Field>

                    <Field
                      label="Social Profile / Website"
                      icon={Globe2}
                      focused={focusedField === "website"}
                    >
                      <input
                        type="url"
                        name="url"
                        autoComplete="url"
                        value={formData.website}
                        onFocus={() => setFocusedField("website")}
                        onBlur={() => setFocusedField(null)}
                        onChange={(event) => updateField("website", event.target.value)}
                        placeholder="LinkedIn, Instagram, etc."
                        className="partner-input"
                      />
                    </Field>
                  </div>

                  {/* MESSAGE */}
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Target Audience & Referral Strategy <span className="text-[#0A2E6F]">*</span>
                    </label>

                    <div
                      className={`relative flex items-start rounded-xl border bg-slate-50/50 transition-all duration-200 ${
                        focusedField === "message"
                          ? "border-[#0A2E6F] bg-white ring-4 ring-[#0A2E6F]/[0.05]"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="relative z-20 pl-3.5 pt-3.5">
                        <MessageSquare className="h-4 w-4 text-slate-400" />
                      </div>

                      <textarea
                        required
                        name="message"
                        value={formData.message}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        onChange={(event) => updateField("message", event.target.value)}
                        rows={3}
                        placeholder="Tell us about the clients you work with (homeowners, luxury developments)..."
                        className="partner-input resize-none py-3"
                      />
                    </div>
                  </div>

                  {/* TERMS CHECKBOX WITH POPUP MODAL TRIGGER */}
                  <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5">
                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        checked={formData.termsAccepted}
                        onChange={(event) => updateField("termsAccepted", event.target.checked)}
                        className="mt-0.5 h-4 w-4 shrink-0 rounded accent-[#0A2E6F]"
                      />

                      <span className="text-xs leading-relaxed text-slate-600">
                        I agree to the{" "}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setShowTermsModal(true);
                          }}
                          className="font-bold text-[#0A2E6F] underline underline-offset-2 hover:text-[#0c3784]"
                        >
                          Terms & Conditions
                        </button>{" "}
                        and confirm that all submitted referral details are accurate.
                      </span>
                    </label>
                  </div>

                  {/* ERROR ALERT */}
                  {submitStatus === "error" && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-600">
                      Please complete all required fields and accept the Terms & Conditions.
                    </div>
                  )}

                  {/* SUBMIT BUTTON */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0A2E6F] px-6 text-xs font-bold uppercase tracking-wider text-white shadow-[0_10px_25px_rgba(10,46,111,0.2)] transition-all duration-200 hover:bg-[#0c3784] hover:shadow-[0_15px_30px_rgba(10,46,111,0.3)] disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting Application...
                      </>
                    ) : (
                      <>
                        Submit Affiliate Application
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* =====================================================
          TERMS & CONDITIONS POPUP MODAL
      ===================================================== */}
      <AnimatePresence>
        {showTermsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6"
          >
            <div
              onClick={() => setShowTermsModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0A2E6F]/10 text-[#0A2E6F]">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Affiliate Terms & Conditions</h3>
                    <p className="text-xs text-slate-500">Simmply Perfect Group Referral Guidelines</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowTermsModal(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 sm:p-8">
                <div className="space-y-4">
                  {affiliateTerms.map((term, idx) => (
                    <div key={idx} className="flex items-start gap-3.5">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0A2E6F]/10 text-xs font-bold text-[#0A2E6F]">
                        {idx + 1}
                      </span>
                      <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">{term}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 text-right">
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, termsAccepted: true }));
                    setShowTermsModal(false);
                  }}
                  className="rounded-xl bg-[#0A2E6F] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#0c3784]"
                >
                  I Understand & Accept
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          GLOBAL AUTOFILL FIX (CLEAN NO-BORDER-OVERLAY)
      ===================================================== */}
      <style jsx global>{`
        .partner-input {
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

        .partner-input::placeholder {
          color: #94a3b8;
          opacity: 1;
        }

        .partner-input:-webkit-autofill,
        .partner-input:-webkit-autofill:hover,
        .partner-input:-webkit-autofill:focus,
        .partner-input:-webkit-autofill:active {
          -webkit-text-fill-color: #0f172a !important;
          caret-color: #0f172a !important;
          -webkit-box-shadow: none !important;
          box-shadow: none !important;
          background-color: transparent !important;
          transition: background-color 600000s ease-in-out 0s, color 600000s ease-in-out 0s !important;
        }

        input:-webkit-autofill::first-line,
        textarea:-webkit-autofill::first-line {
          -webkit-text-fill-color: #0f172a !important;
          color: #0f172a !important;
        }
      `}</style>
    </div>
  );
}

/* =========================================================
   FIELD COMPONENT
========================================================= */

function Field({
  label,
  required,
  icon: Icon,
  focused,
  children,
}: {
  label: string;
  required?: boolean;
  icon: React.ElementType;
  focused: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
        {label} {required && <span className="text-[#0A2E6F]">*</span>}
      </label>

      <div
        className={`group relative flex h-12 w-full items-center rounded-xl border bg-slate-50/50 transition-all duration-200 ${
          focused
            ? "border-[#0A2E6F] bg-white ring-4 ring-[#0A2E6F]/[0.05]"
            : "border-slate-200 hover:border-slate-300"
        }`}
      >
        <div className="relative z-20 flex shrink-0 items-center pl-3.5">
          <Icon className="h-4 w-4 text-slate-400" />
        </div>

        <div className="relative z-10 min-w-0 flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   BENEFIT COMPONENT
========================================================= */

function Benefit({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3.5 rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-2xs transition-all hover:border-[#0A2E6F]/30">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0A2E6F]/10 text-[#0A2E6F]">
        <Icon className="h-4 w-4" />
      </div>

      <div>
        <h3 className="text-xs font-bold text-slate-900 sm:text-sm">
          {title}
        </h3>

        <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}