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
  Layers, 
  Eye, 
  ArrowLeft, 
  Loader2, 
  Sparkles, 
  FileText, 
  ArrowUpRight, 
  Folder, 
  FolderOpen, 
  ChevronRight, 
  PhoneCall 
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// Clean unified navigation items matching your requested display order exactly
const menuItems = [
  { label: "Home", href: "/", isCatalog: false },
  { label: "About", href: "/about", isCatalog: false },
  { label: "Windows & Doors", href: "/windows-doors", isCatalog: false },
  { label: "Interiors", href: "/interiors", isCatalog: false },
  { label: "Renovation", href: "/renovation", isCatalog: false },
  { label: "Metal Works", href: "/metal-works", isCatalog: false },
  { label: "Catalogs", href: "#", isCatalog: true }, 
  { label: "Articles", href: "/articles", isCatalog: false },
  { label: "Contact", href: "/contact", isCatalog: false }
];

const categoriesData = [
  {
    id: "railing",
    name: "Railing Systems",
    desc: "Balcony, staircase, and safety specifications",
    icon: Layers,
    color: "from-blue-500/10 to-cyan-500/10 border-blue-100/60 text-blue-700",
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
    ]
  },
  {
    id: "upvc-doors",
    name: "UPVC Doors",
    desc: "Sliding, folding, and casement structures",
    icon: DoorOpen,
    color: "from-indigo-500/10 to-blue-500/10 border-indigo-100/60 text-indigo-700",
    files: [
      { name: "Casement Doors", size: "3.5 MB", url: "/catalogs/UPVC-doors/Casement Doors.pdf" },
      { name: "Customized Doors", size: "4.8 MB", url: "/catalogs/UPVC-doors/Customized.pdf" },
      { name: "French Door", size: "3.9 MB", url: "/catalogs/UPVC-doors/French Door.pdf" },
      { name: "Lift and Slide", size: "5.1 MB", url: "/catalogs/UPVC-doors/Lift and Slide.pdf" },
      { name: "Slide & Fold", size: "4.6 MB", url: "/catalogs/UPVC-doors/Slide & Fold.pdf" },
      { name: "Sliding Doors", size: "3.2 MB", url: "/catalogs/UPVC-doors/Sliding Doors.pdf" },
    ]
  },
  {
    id: "upvc-windows",
    name: "UPVC Windows",
    desc: "Fixed, hung, and combination window frames",
    icon: Layout,
    color: "from-purple-500/10 to-indigo-500/10 border-purple-100/60 text-purple-700",
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
    ]
  },
  {
    id: "wooden-doors",
    name: "Wooden Doors",
    desc: "Premium natural solid timber frames",
    icon: Construction,
    color: "from-amber-500/10 to-orange-500/10 border-amber-100/60 text-amber-700",
    files: [
      { name: "Simmply Perfect Wooden Door", size: "5.8 MB", url: "/catalogs/Wooden-doors/Simmply Perfect Wooden Door.pdf" }
    ]
  },
  {
    id: "wpc-doors",
    name: "WPC Doors",
    desc: "Wood Polymer Composite structural doors",
    icon: DoorOpen,
    color: "from-emerald-500/10 to-green-500/10 border-emerald-100/60 text-emerald-700",
    files: [
      { name: "WPC Doors Catalogue", size: "4.5 MB", url: "/catalogs/WPC-doors/WPC Doors Catalogue.pdf" }
    ]
  },
  {
    id: "wpvc-doors",
    name: "WPVC Doors",
    desc: "Waterproof structural luxury frameworks",
    icon: DoorOpen,
    color: "from-teal-500/10 to-cyan-500/10 border-teal-100/60 text-teal-700",
    files: [
      { name: "Simmply Perfect WPVC Exterior Designs", size: "6.2 MB", url: "/catalogs/WPVC-doors/Simmply Perfect Exterior Designs.pdf" },
      { name: "Simmply Perfect WPVC Interior Designs", size: "5.9 MB", url: "/catalogs/WPVC-doors/Simmply Perfect Interior Designs.pdf" }
    ]
  }
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [catalogsOpen, setCatalogsOpen] = useState(false);

  // Gated Form Access Management
  const [formData, setFormData] = useState({ name: "", email: "", phone: "+91 " });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Folder Explorer Routing States
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);
  const [activePreviewPdf, setActivePreviewPdf] = useState<{ title: string; url: string } | null>(null);

  useEffect(() => {
    if (mobileMenuOpen || catalogsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen, catalogsOpen]);

  useEffect(() => {
    const handleScroll = () => { setScrolled(window.scrollY > 30); };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Strict Phone Digit Formatter (+91 Verification)
  const handlePhoneChange = (val: string) => {
    if (!val.startsWith("+91 ")) {
      setFormData(prev => ({ ...prev, phone: "+91 " }));
      return;
    }
    const digits = val.slice(4).replace(/\D/g, "");
    if (digits.length > 10) return;

    let formatted = "+91 ";
    if (digits.length > 0) formatted += digits.substring(0, 5);
    if (digits.length > 5) formatted += " " + digits.substring(5, 10);

    setFormData(prev => ({ ...prev, phone: formatted }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const rawDigits = formData.phone.slice(4).replace(/\s/g, "");
    const regexValidation = /^[6-9]\d{9}$/;

    if (!regexValidation.test(rawDigits)) {
      setSubmitError("Please enter a valid 10-digit mobile number following the +91 prefix code.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/catalogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: "User successfully cleared lead parameters to access high-res blueprint catalogs.",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register document vault credentials.");
      }
      setIsSubmitted(true);
    } catch (error: any) {
      console.error(error);
      setSubmitError(error.message || "Connection timeout exception.");
      setIsSubmitted(false); // Make sure the user isn't allowed entry if the API fails
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseCatalogs = () => {
    setCatalogsOpen(false);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsSubmitting(false);
      setSubmitError(null);
      setActivePreviewPdf(null);
      setActiveFolderId(null);
      setFormData({ name: "", email: "", phone: "+91 " });
      setFocusedField(null);
    }, 300);
  };

  const activeCategoryObject = categoriesData.find(cat => cat.id === activeFolderId);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-2xl shadow-lg border-b border-slate-100"
            : "bg-white/20 backdrop-blur-xl"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <div className="h-24 flex items-center justify-between">
            
            {/* Logo Link Layout */}
            <Link href="/" className="flex items-center gap-3 group">
              <Image src="/logo.png" alt="Simmply Perfect" width={55} height={55} priority className="h-12 w-auto object-contain transition-all duration-300 group-hover:scale-105" />
              <div>
                <h1 className="text-xl font-bold text-[#0A2E6F] leading-none tracking-wide">SIMMPLY PERFECT</h1>
                <span className="text-[10px] tracking-[5px] text-slate-500">GROUP</span>
              </div>
            </Link>

            {/* Desktop Navbar Menu Actions - Dynamically Injects trigger button in exact requested array order */}
            <nav className="hidden lg:flex items-center gap-10">
              {menuItems.map((item) => {
                const isActive = pathname === item.href && !item.isCatalog; // Check active route
                
                return item.isCatalog ? (
                  <button 
                    key={item.label}
                    onClick={() => setCatalogsOpen(true)} 
                    className="relative text-[16px] font-medium text-slate-700 hover:text-[#0A2E6F] transition-all duration-300 group text-left"
                  >
                    {item.label}
                    <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-[#0A2E6F] transition-all duration-300 group-hover:w-full" />
                  </button>
                ) : (
                  <Link 
                    key={item.label}
                    href={item.href} 
                    className={`relative text-[16px] transition-all duration-300 group ${
                      isActive ? "font-bold text-[#0A2E6F]" : "font-medium text-slate-700 hover:text-[#0A2E6F]"
                    }`}
                  >
                    {item.label}
                    <span className={`absolute -bottom-2 left-0 h-[2px] bg-[#0A2E6F] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`} />
                  </Link>
                );
              })}
            </nav>
            {/* Mobile Hamburger System Button */}
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setMobileMenuOpen(true)} className="lg:hidden w-12 h-12 rounded-xl bg-white shadow-md border border-slate-200 flex items-center justify-center">
              <div className="flex flex-col gap-1.5">
                <span className="w-5 h-[2px] bg-[#0A2E6F]" />
                <span className="w-5 h-[2px] bg-[#0A2E6F]" />
                <span className="w-5 h-[2px] bg-[#0A2E6F]" />
              </div>
            </motion.button>

          </div>
        </div>
      </header>

      {/* MOBILE SIDE PANEL DRAWER (UPDATED UI) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
            <motion.div 
              initial={{ x: "100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "100%" }} 
              transition={{ duration: 0.35, ease: "easeInOut" }} 
              className="fixed top-0 right-0 h-[100dvh] w-[90%] max-w-[380px] bg-white z-[60] shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100 shrink-0">
                <div className="flex items-center gap-3">
                  <Image src="/logo.png" alt="Logo" width={40} height={40} className="w-auto h-10" />
                  <span className="font-bold text-[#0A2E6F] text-sm tracking-wide">SIMMPLY PERFECT</span>
                </div>
                <motion.button whileTap={{ scale: 0.9 }} whileHover={{ rotate: 90 }} onClick={() => setMobileMenuOpen(false)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors">
                  <X size={18} />
                </motion.button>
              </div>

              {/* Scrollable Links (Fixes cropping issue) */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 flex flex-col gap-6 custom-scrollbar">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href && !item.isCatalog;

                  return item.isCatalog ? (
                    <button 
                      key={item.label}
                      onClick={() => { setMobileMenuOpen(false); setCatalogsOpen(true); }} 
                      className="text-lg font-bold text-slate-600 hover:text-[#0A2E6F] text-left transition-all flex items-center justify-between group"
                    >
                      <span>{item.label}</span>
                      <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                    </button>
                  ) : (
                    <Link 
                      key={item.label}
                      href={item.href} 
                      onClick={() => setMobileMenuOpen(false)} 
                      className={`text-lg transition-all flex items-center justify-between group ${
                        isActive ? "font-black text-[#0A2E6F]" : "font-bold text-slate-600 hover:text-[#0A2E6F]"
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && <div className="w-2 h-2 rounded-full bg-[#0A2E6F]" />}
                    </Link>
                  );
                })}
              </div>
              
              {/* Fixed Footer CTA */}
              <div className="p-6 shrink-0 bg-slate-50 border-t border-slate-100 pb-8 sm:pb-6">
                <Link 
                  href="/contact" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#0A2E6F] to-[#05183a] text-white py-4 rounded-xl font-bold text-sm tracking-widest uppercase shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <PhoneCall size={16} />
                  <span>Get In Touch</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* UNIVERSAL HIGH-FIDELITY SINGLE PANEL CATALOGS HOVER DECK */}
      <AnimatePresence>
        {catalogsOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-8 lg:p-12 overflow-y-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleCloseCatalogs} className="fixed inset-0 bg-slate-950/80 backdrop-blur-2xl z-0" />

            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 30 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl bg-gradient-to-b from-white to-slate-50 rounded-[2.5rem] sm:rounded-[3.5rem] shadow-[0_35px_120px_-20px_rgba(0,0,0,0.4)] overflow-hidden z-10 flex flex-col h-[85vh] max-h-[780px] border border-slate-200/50"
            >
              
              {/* SUB-LAYER: FULLSCREEN STUDIO QUALITY PDF EMBED PREVIEW SCREEN */}
              <AnimatePresence>
                {activePreviewPdf && (
                  <motion.div initial={{ opacity: 0, scale: 1.01 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.01 }} transition={{ duration: 0.35 }} className="absolute inset-0 bg-[#0b0f19] z-50 flex flex-col">
                    <div className="bg-slate-900/95 border-b border-slate-800 backdrop-blur-md text-white p-4 sm:p-5 px-6 flex items-center justify-between shadow-2xl relative z-10 gap-4">
                      <button onClick={() => setActivePreviewPdf(null)} className="group flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400 hover:text-white font-bold transition-colors">
                        <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
                        <span className="hidden sm:inline">Back to Directory</span>
                      </button>
                      
                      <div className="flex items-center gap-2.5 bg-slate-800/50 border border-slate-700/60 px-4 py-2 rounded-xl max-w-xs sm:max-w-md truncate">
                        <FileText size={14} className="text-blue-400 shrink-0" />
                        <h4 className="text-[11px] font-bold tracking-wide text-slate-200 truncate">{activePreviewPdf.title}</h4>
                      </div>

                      <div className="flex items-center gap-3">
                        <a href={activePreviewPdf.url} download className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-[#0A2E6F] hover:from-blue-700 hover:to-[#072152] text-white px-4 py-2 rounded-xl text-xs font-extrabold transition-all shadow-md">
                          <Download size={13} />
                          <span className="hidden sm:inline">Save PDF</span>
                        </a>
                        <button onClick={handleCloseCatalogs} className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center border border-slate-700/60"><X size={16} /></button>
                      </div>
                    </div>

                    <div className="flex-1 bg-[#0b0f19] p-2 sm:p-4 relative">
                      <iframe src={`${activePreviewPdf.url}#toolbar=0&navpanes=0`} className="w-full h-full border-none rounded-2xl bg-slate-950 shadow-[inset_0_4px_40px_rgba(0,0,0,0.8)]" title={activePreviewPdf.title} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dynamic Back to folders action label */}
              <AnimatePresence>
                {isSubmitted && activeFolderId && (
                  <motion.button 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveFolderId(null)}
                    className="absolute top-5 left-5 sm:top-6 sm:left-6 flex items-center gap-2 px-3.5 py-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-[#0A2E6F] bg-slate-100 hover:bg-slate-200 border border-slate-200/40 rounded-full shadow-md transition-all z-30"
                  >
                    <ArrowLeft size={14} />
                    <span>All Folders</span>
                  </motion.button>
                )}
              </AnimatePresence>

              <motion.button whileTap={{ scale: 0.95 }} onClick={handleCloseCatalogs} className="absolute top-5 right-5 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center shadow-md border border-slate-200/60 transition-all z-30">
                <X size={18} />
              </motion.button>

              {/* INTEGRATED CONTAINER CANVAS AREA */}
              <div className="flex-1 p-6 sm:p-10 md:p-14 flex flex-col justify-center overflow-y-auto h-full relative">
                
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    /* STEP 1: VALIDATION FORM GATEWAY MODULE */
                    <motion.div key="lead-gate" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4, ease: "easeOut" }} className="w-full max-w-xl mx-auto space-y-7">
                      <div className="space-y-2 text-center">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#0A2E6F]/5 border border-[#0A2E6F]/10 text-[#0A2E6F] text-[10px] font-black tracking-widest uppercase mb-1">
                          <Sparkles size={12} className="animate-pulse text-blue-600" />
                          <span>Architectural Media Vault</span>
                        </div>
                        <h4 className="text-3xl font-black text-slate-900 tracking-tight">Unlock Architectural Libraries</h4>
                        <p className="text-sm text-slate-500 max-w-md mx-auto">Please confirm your parameter details to open our dynamic catalog specification directories.</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-slate-700 uppercase tracking-widest block pl-1">Full Name</label>
                          <div className={`relative rounded-xl bg-slate-50 border transition-all duration-300 shadow-inner ${focusedField === "name" ? "border-[#0A2E6F] bg-white ring-4 ring-[#0A2E6F]/5" : "border-slate-200"}`}>
                            <span className={`absolute inset-y-0 left-0 pl-4 flex items-center transition-colors duration-300 ${focusedField === "name" ? "text-[#0A2E6F]" : "text-slate-400"}`}><User size={16} /></span>
                            <input type="text" required disabled={isSubmitting} onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField(null)} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Alexander Wright" className="w-full pl-11 pr-4 py-3.5 bg-transparent rounded-xl focus:outline-none text-slate-800 text-sm font-semibold" />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-700 uppercase tracking-widest block pl-1">Email Address</label>
                            <div className={`relative rounded-xl bg-slate-50 border transition-all duration-300 shadow-inner ${focusedField === "email" ? "border-[#0A2E6F] bg-white ring-4 ring-[#0A2E6F]/5" : "border-slate-200"}`}>
                              <span className={`absolute inset-y-0 left-0 pl-4 flex items-center transition-colors duration-300 ${focusedField === "email" ? "text-[#0A2E6F]" : "text-slate-400"}`}><Mail size={16} /></span>
                              <input type="email" required disabled={isSubmitting} onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="name@firm.com" className="w-full pl-11 pr-4 py-3.5 bg-transparent rounded-xl focus:outline-none text-slate-800 text-sm font-semibold" />
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-700 uppercase tracking-widest block pl-1">Contact Number</label>
                            <div className={`relative rounded-xl bg-slate-50 border transition-all duration-300 shadow-inner ${focusedField === "phone" ? "border-[#0A2E6F] bg-white ring-4 ring-[#0A2E6F]/5" : "border-slate-200"}`}>
                              <span className={`absolute inset-y-0 left-0 pl-4 flex items-center transition-colors duration-300 ${focusedField === "phone" ? "text-[#0A2E6F]" : "text-slate-400"}`}><Phone size={16} /></span>
                              <input 
                                type="tel" 
                                required 
                                disabled={isSubmitting} 
                                onFocus={() => setFocusedField("phone")} 
                                onBlur={() => setFocusedField(null)} 
                                value={formData.phone} 
                                onChange={(e) => handlePhoneChange(e.target.value)} 
                                placeholder="+91 98765 43210" 
                                className="w-full pl-11 pr-4 py-3.5 bg-transparent rounded-xl focus:outline-none text-slate-800 text-sm font-semibold" 
                              />
                            </div>
                          </div>
                        </div>

                        {submitError && <p className="text-xs text-rose-600 font-semibold bg-rose-50 p-3 rounded-xl border border-rose-100 shadow-sm">{submitError}</p>}

                        <button type="submit" disabled={isSubmitting} className="w-full mt-3 bg-gradient-to-r from-[#0A2E6F] to-[#05183a] text-white py-4 rounded-xl font-bold text-xs tracking-widest uppercase shadow-xl transition-all flex items-center justify-center gap-2">
                          {isSubmitting ? (
                            <><Loader2 size={16} className="animate-spin" /><span>Syncing Vault Node...</span></>
                          ) : (
                            <><span>Unlock Digital Catalogs</span><ArrowRight size={16} /></>
                          )}
                        </button>
                      </form>
                    </motion.div>
                  ) : (
                    /* STEP 2: MULTI-FOLDER DIRECTORY SYSTEM (INITIAL STATE = DIRECTORY TILES) */
                    <motion.div key="media-explorer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full flex flex-col justify-between">
                      
                      <div className="border-b border-slate-100 pb-5 mb-5 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-6 sm:pt-0">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#0A2E6F]">
                            <button onClick={() => setActiveFolderId(null)} className="hover:underline opacity-60 hover:opacity-100 flex items-center gap-1"><FolderOpen size={12} /><span>All Folders</span></button>
                            {activeFolderId && (
                              <>
                                <ChevronRight size={12} className="text-slate-400" />
                                <span className="text-slate-800 font-extrabold">{activeCategoryObject?.name}</span>
                              </>
                            )}
                          </div>
                          <h4 className="text-2xl font-black text-slate-900 tracking-tight">
                            {activeFolderId ? activeCategoryObject?.name : "Simmply Perfect Catalogs Directory"}
                          </h4>
                        </div>
                        
                        <div className="text-[11px] font-bold text-slate-500 bg-slate-100 border border-slate-200/60 px-4 py-2 rounded-xl shadow-sm self-start sm:self-center">
                          Session Secured: <span className="font-extrabold text-slate-800">{formData.name}</span>
                        </div>
                      </div>

                      {/* SCROLLABLE WORKSPACE CONTAINER */}
                      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-1 mb-5 relative">
                        <AnimatePresence mode="wait">
                          {!activeFolderId ? (
                            /* DIRECTORY PANEL DISPLAY GRID */
                            <motion.div key="folders-grid" initial={{ opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.99 }} transition={{ duration: 0.3 }} className="grid sm:grid-cols-2 gap-4">
                              {categoriesData.map((category) => {
                                return (
                                  <button
                                    key={category.id}
                                    onClick={() => setActiveFolderId(category.id)}
                                    className="flex items-center justify-between p-5 bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-[#0A2E6F]/30 hover:shadow-xl hover:shadow-slate-100/50 rounded-2xl transition-all duration-300 text-left group gap-4 relative overflow-hidden"
                                  >
                                    <div className="flex items-center gap-4 min-w-0">
                                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} border flex items-center justify-center shrink-0 shadow-sm transform group-hover:scale-105 duration-300`}>
                                        <Folder size={22} className="stroke-[2]" />
                                      </div>
                                      <div className="min-w-0">
                                        <h5 className="font-extrabold text-slate-800 text-sm sm:text-base tracking-tight group-hover:text-[#0A2E6F] transition-colors">{category.name}</h5>
                                        <p className="text-xs text-slate-400 truncate mt-0.5 font-light">{category.desc}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-slate-400 shrink-0 relative z-10">
                                      <span className="text-[10px] font-black bg-slate-100 px-2.5 py-1 rounded-lg text-slate-600 border border-slate-200/50 tracking-wider uppercase">{category.files.length} PDFs</span>
                                      <ChevronRight size={16} className="transform group-hover:translate-x-0.5 transition-transform" />
                                    </div>
                                  </button>
                                );
                              })}
                            </motion.div>
                          ) : (
                            /* SUB-ASSET MANIFEST FILE LEVEL LIST */
                            <motion.div key="files-stack" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} transition={{ duration: 0.3 }} className="space-y-2.5">
                              <div className="flex items-center justify-between pb-2">
                                <button onClick={() => setActiveFolderId(null)} className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#0A2E6F] transition-colors group">
                                  <ArrowLeft size={14} className="transform group-hover:-translate-x-0.5 transition-transform" />
                                  <span>Back to All Folders</span>
                                </button>
                                <button onClick={() => setActiveFolderId(null)} className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-rose-600 transition-colors flex items-center gap-1">
                                  <X size={12} />
                                  <span>Close Folder</span>
                                </button>
                              </div>

                              {activeCategoryObject?.files?.map((file, idx) => (
                                <motion.div key={idx} whileHover={{ scale: 1.002, x: 4 }} className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-2xl border border-slate-200/60 hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-300 gap-3">
                                  <div className="flex items-center gap-4 min-w-0">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/60 text-slate-400 flex items-center justify-center shrink-0">
                                      <FileText size={16} />
                                    </div>
                                    <div className="min-w-0">
                                      <h5 className="font-extrabold text-sm text-slate-800 tracking-tight group-hover:text-[#0A2E6F] transition-colors line-clamp-1">{file.name}</h5>
                                      <span className="text-[11px] text-slate-400 font-medium">{file.size} • Portable Document Format</span>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                                    <button onClick={() => setActivePreviewPdf({ title: `${file.name}.pdf`, url: file.url })} className="flex items-center gap-1.5 px-3 py-2 text-xs font-extrabold text-slate-700 bg-slate-50 hover:bg-[#0A2E6F] hover:text-white border border-slate-200 hover:border-[#0A2E6F] rounded-xl transition-all shadow-sm">
                                      <Eye size={13} />
                                      <span>Preview Layout</span>
                                    </button>
                                    <a href={file.url} download className="p-2.5 bg-slate-50 hover:bg-emerald-600 text-slate-400 hover:text-white shadow-sm border border-slate-200 hover:border-emerald-600 rounded-xl transition-all" title="Download File Link">
                                      <Download size={13} className="stroke-[2.2]" />
                                    </a>
                                  </div>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* COMPACT FLOATING BOTTOM FOOTER SUPPORT CTA BANNER */}
                      <div className="bg-gradient-to-r from-slate-900 to-[#0A2E6F] rounded-2xl p-4 md:p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl shrink-0">
                        <div className="flex items-center gap-3.5 text-center sm:text-left">
                          <div className="w-10 h-10 rounded-xl bg-white/10 hidden sm:flex items-center justify-center shrink-0 border border-white/10">
                            <PhoneCall size={18} className="text-blue-300 animate-pulse" />
                          </div>
                          <div>
                            <span className="font-bold text-xs sm:text-sm block">Looking for Physical Material Samples or Custom Configurations?</span>
                            <p className="text-[11px] text-slate-300/90 mt-0.5">Contact our technical specification team for direct project distribution support.</p>
                          </div>
                        </div>

                        <Link 
                          href="/contact" 
                          onClick={handleCloseCatalogs}
                          className="flex items-center gap-1.5 bg-white text-[#0A2E6F] hover:bg-slate-100 px-3 py-2 text-[11px] font-black uppercase tracking-wider shadow-md active:scale-[0.98] transition-all shrink-0 w-full sm:w-auto justify-center rounded-xl"
                        >
                          <span>Contact Office</span>
                          <ArrowUpRight size={12} />
                        </Link>
                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}