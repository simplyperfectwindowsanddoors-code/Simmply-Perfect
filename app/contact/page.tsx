"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/home/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  X, 
  ChevronRight, 
  ShieldCheck,
  Loader2
} from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Call Us",
    subtitle: "Direct corporate line",
    value: "+91 93907 19623",
    href: "tel:+919390719623",
  },
  {
    icon: Mail,
    title: "Email Us",
    subtitle: "Online consultations",
    value: "info@simmplyperfect.com",
    href: "mailto:info@simmplyperfect.com",
  },
  {
    icon: MapPin,
    title: "Our Studio",
    subtitle: "Experience architecture",
    value: "Simmply Perfect, Hyderabad",
    href: "https://www.google.com/maps/place/Simmply+Perfect+Windows+%26+Doors/@17.5443411,78.4614746,15.1z/data=!4m10!1m2!2m1!1ssimmply+perfect!3m6!1s0x3bcb8f2438d4b19f:0x6a81a86b6a678381!8m2!3d17.5455331!4d78.4716782!15sCg9zaW1tcGx5IHBlcmZlY3RaESIPc2ltbXBseSBwZXJmZWN0kgEbYnVpbGRpbmdfbWF0ZXJpYWxzX3N1cHBsaWVy4AEA!16s%2Fg%2F11ycjk0h7b?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    icon: Clock,
    title: "Working Hours",
    subtitle: "Operational schedule",
    value: "Mon - Sat: 10:00 AM - 8:00 PM",
    href: "#business-hours",
  },
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "+91 ",
    service: "",
    message: "",
  });

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showPopup]);

  // Strict Phone Digit Formatter (+91 Prefix Enforcer)
  const handlePhoneChange = (val: string) => {
    setPhoneError(null);

    // Block deletion or modification of the primitive +91 prefix
    if (!val.startsWith("+91 ")) {
      setForm(prev => ({ ...prev, phone: "+91 " }));
      return;
    }

    // Strip all non-digits after the prefix to process formatting variables
    const digits = val.slice(4).replace(/\D/g, "");
    
    // Cap total content length to prevent overflow exceeding 10 digits
    if (digits.length > 10) return;

    let formatted = "+91 ";
    if (digits.length > 0) {
      formatted += digits.substring(0, 5);
    }
    if (digits.length > 5) {
      formatted += " " + digits.substring(5, 10);
    }

    setForm(prev => ({ ...prev, phone: formatted }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPhoneError(null);

    // Isolate real numbers following country prefix to run regex boundaries
    const rawDigits = form.phone.slice(4).replace(/\s/g, "");
    const indianMobileRegex = /^[6-9]\d{9}$/;

    if (!indianMobileRegex.test(rawDigits)) {
      setPhoneError("Please enter a valid 10-digit mobile number following the +91 prefix.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed");
      }

      setShowPopup(true);
      setForm({ name: "", email: "", phone: "+91 ", service: "", message: "" });
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="bg-[#FAFBFD] text-slate-900 overflow-hidden antialiased">
        
        {/* HERO SECTION */}
        <section className="relative pt-44 pb-20 bg-gradient-to-b from-slate-50 via-white to-transparent">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          
          <div className="relative max-w-5xl mx-auto px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mt-6 text-5xl md:text-7xl font-black text-[#0A1A35] tracking-tight leading-[1.1]"
            >
              Let's Build Something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A2E6F] to-blue-600">
                Remarkable Together
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
            >
              Whether you are planning architectural installations, luxury windows & doors setups, or custom turnkey projects, our senior technical advisors are here to align.
            </motion.p>
          </div>
        </section>

        {/* CONNECT CARDS SECTION */}
        <section className="pb-28 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                const isAnchorClickable = item.title !== "Working Hours";

                return (
                  <motion.a
                    key={item.title}
                    href={item.href}
                    target={isAnchorClickable ? "_blank" : undefined}
                    rel={isAnchorClickable ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{ y: -6 }}
                    className="group relative block bg-white p-7 rounded-3xl border border-slate-200/60 shadow-[0_12px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(10,46,111,0.08)] transition-all duration-300"
                  >
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 rounded-2xl bg-[#0A2E6F]/5 text-[#0A2E6F] flex items-center justify-center transition-colors group-hover:bg-[#0A2E6F] group-hover:text-white duration-300">
                        <Icon size={22} />
                      </div>
                      {isAnchorClickable && (
                        <ArrowUpRight size={18} className="text-slate-400 group-hover:text-[#0A2E6F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                      )}
                    </div>

                    <div className="mt-6">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{item.subtitle}</p>
                      <h3 className="mt-1 text-lg font-bold text-[#0A1A35]">{item.title}</h3>
                      <p className="mt-2 text-sm text-slate-600 font-medium break-words leading-relaxed">{item.value}</p>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </section>

        {/* WORKSPACE & STRATEGIC FORM CONSOLE */}
        <section className="py-24 bg-gradient-to-b from-white to-slate-50/70 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-12 items-stretch">
              
              {/* INTERACTIVE FORM ENGINE */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-10 border border-slate-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.04)] flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-3xl font-extrabold text-[#0A1A35] tracking-tight">
                    Project Architecture Intake
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Complete the structural criteria parameters below. Our engineering desk architecture responds within 1 business cycle.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Full Name</label>
                        <input
                          type="text"
                          placeholder="Full Name"
                          required
                          disabled={loading}
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm outline-none transition-all focus:border-[#0A2E6F] focus:bg-white disabled:opacity-60"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Email</label>
                        <input
                          type="email"
                          placeholder="name@company.com"
                          required
                          disabled={loading}
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm outline-none transition-all focus:border-[#0A2E6F] focus:bg-white disabled:opacity-60"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Contact</label>
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          required
                          disabled={loading}
                          value={form.phone}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3.5 text-sm outline-none transition-all focus:bg-white disabled:opacity-60 ${
                            phoneError ? "border-rose-400 focus:border-rose-500 ring-2 ring-rose-500/5" : "border-slate-200 focus:border-[#0A2E6F]"
                          }`}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Select Service</label>
                        <select
                          required
                          disabled={loading}
                          value={form.service}
                          onChange={(e) => setForm({ ...form, service: e.target.value })}
                          className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm outline-none transition-all focus:border-[#0A2E6F] focus:bg-white appearance-none cursor-pointer disabled:opacity-60"
                        >
                          <option value="">Select Service</option>
                          <option value="Windows & Doors">Windows & Doors </option>
                          <option value="Interior Design">Interior Design</option>
                          <option value="Renovation">Renovation</option>
                        </select>
                      </div>
                    </div>

                    {phoneError && (
                      <p className="text-xs font-semibold text-rose-500 bg-rose-50 p-2.5 rounded-xl border border-rose-100">
                        {phoneError}
                      </p>
                    )}

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Project Brief Scope</label>
                      <textarea
                        rows={5}
                        required
                        disabled={loading}
                        placeholder="Elaborate regarding dimensional requirements or special structural project parameters..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm outline-none resize-none transition-all focus:border-[#0A2E6F] focus:bg-white disabled:opacity-60"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#0A2E6F] hover:bg-[#082456] text-white py-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md shadow-[#0A2E6F]/10 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Processing Parameters...
                        </>
                      ) : (
                        <>
                          Submit Response
                          <ChevronRight size={16} />
                        </>
                      )}
                    </button>
                  </form>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-2.5 text-xs text-slate-400 font-medium">
                  <ShieldCheck size={16} className="text-emerald-500" />
                  SSL Secured End-to-End Encrypted Communication Stack.
                </div>
              </motion.div>

              {/* LIVE MAP FRAME CONTAINER */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-5 rounded-3xl overflow-hidden border border-slate-200/60 shadow-[0_20px_50px_rgba(0,0,0,0.04)] h-[500px] lg:h-auto min-h-[450px] relative bg-slate-100"
              >
                <iframe
                  src="https://maps.google.com/maps?q=Hyderabad&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="absolute inset-0 w-full h-full grayscale-[15%] contrast-[105%]"
                  loading="lazy"
                  title="HQ Studio Map"
                  allowFullScreen
                />
              </motion.div>

            </div>
          </div>
        </section>

        {/* TIME TABLE DEEP DIVE ARCHITECTURE */}
        <section id="business-hours" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
              
              {/* STUDIO VISIT INFO */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-5"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-[#0A2E6F] bg-[#0A2E6F]/5 px-3.5 py-1.5 rounded-md">
                  In-Person Meet
                </span>

                <h2 className="mt-5 text-4xl font-black text-[#0A1A35] tracking-tight">
                  Visit Our Experience Studio
                </h2>

                <p className="mt-4 text-base text-slate-600 leading-relaxed">
                  Engage live with our advanced design technicians, project matrix evaluation leads, and material framework consultants.
                </p>

                <div className="mt-10 space-y-4">
                  {[
                    { label: "HQ Spatial Address", val: "Simmply Perfect Windows & Doors, India", link: "https://www.google.com/maps/place/Simmply+Perfect+Windows+%26+Doors" },
                    { label: "Secure Phone Grid", val: "+91 93907 19623", link: "tel:+919390719623" },
                    { label: "Data Communications", val: "info@simmplyperfect.com", link: "mailto:info@simmplyperfect.com" },
                  ].map((info) => (
                    <div key={info.label} className="p-5 rounded-2xl bg-slate-50/60 border border-slate-100">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{info.label}</p>
                      <a href={info.link} className="mt-1 block text-base font-bold text-[#0A1A35] hover:text-[#0A2E6F] transition-colors duration-200">
                        {info.val}
                      </a>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* HOUR PARAMETERS SCROLLER */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-200/60 shadow-[0_16px_48px_rgba(0,0,0,0.03)]"
              >
                <h3 className="text-2xl font-extrabold text-[#0A1A35] tracking-tight">Operational Windows</h3>
                <p className="mt-1 text-sm text-slate-500">Live technical consultation access schedules.</p>

                <div className="mt-6 divide-y divide-slate-100">
                  {[
                    ["Monday", "10:00 AM - 08:00 PM"],
                    ["Tuesday", "10:00 AM - 08:00 PM"],
                    ["Wednesday", "10:00 AM - 08:00 PM"],
                    ["Thursday", "10:00 AM - 08:00 PM"],
                    ["Friday", "10:00 AM - 08:00 PM"],
                    ["Saturday", "10:00 AM - 08:00 PM"],
                    ["Sunday", "Closed Framework Office"],
                  ].map(([day, hours]) => (
                    <div key={day} className="flex justify-between items-center py-4 first:pt-0 last:pb-0">
                      <span className="text-sm font-semibold text-slate-700">{day}</span>
                      <span className={`text-sm font-bold ${hours.includes("Closed") ? "text-red-500" : "text-[#0A2E6F]"}`}>
                        {hours}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-[#0A1A35] to-[#0A2E6F] text-white flex justify-between items-center">
                  <div>
                    <p className="text-xs text-white/70 font-semibold uppercase tracking-wider">Urgent Infrastructure Line</p>
                    <h4 className="mt-0.5 text-xl font-black tracking-tight">+91 93907 19623</h4>
                  </div>
                  <Phone size={24} className="opacity-40" />
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* METRICS ACCREDITATION VALUE */}
        <section className="py-24 bg-slate-50/70 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-xs font-bold tracking-widest text-[#0A2E6F] uppercase">Assurance Architecture</span>
              <h2 className="mt-3 text-3xl font-black text-[#0A1A35] tracking-tight">Enterprise Operations Standards</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
              {[
                "Complimentary Matrix Consultation",
                "Premium Architecture & Engineering Solutions",
                "Vetted Subject Matter Expert Teams",
                "Strict Milestones & Timeline Delivery",
              ].map((valueText, idx) => (
                <motion.div
                  key={valueText}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex items-start gap-4"
                >
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 mt-0.5 shrink-0">
                    <CheckCircle2 size={18} />
                  </div>
                  <h3 className="font-bold text-sm text-slate-800 leading-snug">{valueText}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* MODAL SYSTEM OVERLAY */}
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPopup(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-[0_30px_70px_rgba(10,26,53,0.18)] border border-slate-100"
            >
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-xl hover:bg-slate-50"
              >
                <X size={18} />
              </button>

              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: "spring" }}
                className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600"
              >
                <CheckCircle2 size={32} />
              </motion.div>

              <h3 className="mt-5 text-xl font-extrabold text-[#0A1A35] tracking-tight">
                Information Sent Successfully
              </h3>

              <p className="mt-2.5 text-sm text-slate-500 leading-relaxed px-2">
                Your information and project profile blueprints have reached the operational desk. An architectural specialist will engage with you shortly.
              </p>

              <button
                onClick={() => setShowPopup(false)}
                className="mt-6 w-full bg-[#0A2E6F] hover:bg-[#082456] text-white py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all shadow-md shadow-[#0A2E6F]/10"
              >
                Acknowledge & Continue
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}