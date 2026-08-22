"use client";

import {
  FormEvent,
  ReactNode,
  ElementType,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  Package,
  Phone,
  Send,
  TicketCheck,
  User,
  X,
  Paperclip,
  FileCheck2,
  CreditCard,
  MapPin,
  Navigation,
  ReceiptText,
  ChevronRight,
  ArrowLeft,
  Loader2,
  ClipboardList,
  Upload,
  Calendar,
  Image as ImageIcon,
  Info,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

/* =========================================================
   CONFIGURATION & CATALOG
========================================================= */

const PAYMENT_SCANNER_PATH = "/payment-scanner.png";
const COMPANY_NAME = "Simmply Perfect Windows & Doors";
const COMPANY_EMAIL = "simplyperfectwindowsanddoors@gmail.com";
const COMPANY_PHONE = "+91 93907 19623";
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const SERVICE_BASE_CONFIG = [
  {
    id: "window-measurement",
    name: "Site visit for Window Measurement",
    hydAmount: 700,
    outsideAmount: 5000,
  },
  {
    id: "door-measurement",
    name: "Site Visit for Door Measurement",
    hydAmount: 500,
    outsideAmount: 3000,
  },
  {
    id: "repair-maintenance",
    name: "Site Visit for Repair and Maintenance",
    hydAmount: 500,
    outsideAmount: 3500,
  },
];

// Helper: Format YYYY-MM-DD to DD-MM-YYYY
export function formatToDDMMYYYY(dateString: string): string {
  if (!dateString) return "";
  const parts = dateString.split("-");
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${day.padStart(2, "0")}-${month.padStart(2, "0")}-${year}`;
  }
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

/* =========================================================
   TYPES
========================================================= */

type TicketFormData = {
  fullName: string;
  contact: string;
  orderId: string;
  item: string;
  complaint: string;
  attachment: File | null;
};

type TicketApiResponse = {
  success: boolean;
  message: string;
  ticketId?: string;
};

type BookingFormData = {
  fullName: string;
  phone: string;
  isHyderabad: boolean;
  address: string;
  problemStatement: string;
  remarks: string;
  plannedDate: string;
  issuePhoto: File | null;
  services: string[];
  latitude: string;
  longitude: string;
  locationAccuracy: string;
  paymentScreenshot: File | null;
  utr: string;
};

type BookingApiResponse = {
  success: boolean;
  message: string;
  quoteId?: string;
  bookingId?: string;
};

const initialTicketForm: TicketFormData = {
  fullName: "",
  contact: "",
  orderId: "",
  item: "",
  complaint: "",
  attachment: null,
};

const initialBookingForm: BookingFormData = {
  fullName: "",
  phone: "",
  isHyderabad: true,
  address: "",
  problemStatement: "",
  remarks: "",
  plannedDate: "",
  issuePhoto: null,
  services: [],
  latitude: "",
  longitude: "",
  locationAccuracy: "",
  paymentScreenshot: null,
  utr: "",
};

/* =========================================================
   HELPERS
========================================================= */

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function generateBookingNumber() {
  const timestamp = Date.now().toString().slice(-8);
  return `SPB-${timestamp}`;
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function FloatingContact() {
  /* Ticket State */
  const [ticketOpen, setTicketOpen] = useState(false);
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [ticketError, setTicketError] = useState("");
  const [ticketForm, setTicketForm] = useState<TicketFormData>(initialTicketForm);

  /* Booking State */
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<"details" | "payment" | "success">("details");
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [bookingForm, setBookingForm] = useState<BookingFormData>(initialBookingForm);
  const [locationLoading, setLocationLoading] = useState(false);

  const bookingNumber = useMemo(() => generateBookingNumber(), [bookingOpen]);

  // Compute Active Services with Dynamic Price based on Hyderabad Toggle
  const computedServices = useMemo(() => {
    return SERVICE_BASE_CONFIG.map((srv) => ({
      id: srv.id,
      name: srv.name,
      amount: bookingForm.isHyderabad ? srv.hydAmount : srv.outsideAmount,
    }));
  }, [bookingForm.isHyderabad]);

  const selectedServices = useMemo(() => {
    return computedServices.filter((service) =>
      bookingForm.services.includes(service.id),
    );
  }, [computedServices, bookingForm.services]);

  const bookingTotal = useMemo(() => {
    return selectedServices.reduce((total, service) => total + service.amount, 0);
  }, [selectedServices]);

  /* =======================================================
     TICKET HANDLERS
  ======================================================= */

  const openTicketModal = () => {
    setTicketSubmitted(false);
    setTicketId("");
    setTicketError("");
    setTicketOpen(true);
  };

  const closeTicketModal = useCallback(() => {
    if (isSubmittingTicket) return;
    setTicketOpen(false);

    window.setTimeout(() => {
      setTicketSubmitted(false);
      setTicketId("");
      setTicketError("");
      setTicketForm(initialTicketForm);
    }, 250);
  }, [isSubmittingTicket]);

  const validateTicket = () => {
    if (!ticketForm.fullName.trim()) return "Please enter your full name.";
    if (!/^\d{10}$/.test(ticketForm.contact)) return "Please enter a valid 10-digit contact number.";
    if (!ticketForm.orderId.trim()) return "Please enter your Order ID.";
    if (!ticketForm.item.trim()) return "Please enter the item name.";
    if (!ticketForm.complaint.trim()) return "Please describe your complaint.";
    if (!ticketForm.attachment) return "Please upload an attachment.";
    if (ticketForm.attachment.size > MAX_FILE_SIZE) return "File size must be less than 10MB.";
    return "";
  };

  const handleTicketSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmittingTicket) return;

    const validationError = validateTicket();
    setTicketError(validationError);
    if (validationError) return;

    setIsSubmittingTicket(true);
    try {
      const form = new FormData();
      form.append("fullName", ticketForm.fullName.trim());
      form.append("contact", ticketForm.contact.trim());
      form.append("orderId", ticketForm.orderId.trim());
      form.append("item", ticketForm.item.trim());
      form.append("complaint", ticketForm.complaint.trim());

      if (ticketForm.attachment) {
        form.append("attachment", ticketForm.attachment);
      }

      const response = await fetch("/api/tickets", {
        method: "POST",
        body: form,
      });

      const result = (await response.json()) as TicketApiResponse;

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to submit your ticket.");
      }

      setTicketId(result.ticketId ?? "");
      setTicketSubmitted(true);
      setTicketForm(initialTicketForm);
    } catch (error) {
      console.error("Ticket submission failed:", error);
      setTicketError(
        error instanceof Error ? error.message : "Unable to submit your ticket.",
      );
    } finally {
      setIsSubmittingTicket(false);
    }
  };

  /* =======================================================
     BOOKING HANDLERS
  ======================================================= */

  const openBookingModal = () => {
    setBookingStep("details");
    setBookingError("");
    setBookingId("");
    setBookingForm(initialBookingForm);
    setBookingOpen(true);
  };

  const closeBookingModal = useCallback(() => {
    if (isSubmittingBooking) return;
    setBookingOpen(false);

    window.setTimeout(() => {
      setBookingStep("details");
      setBookingError("");
      setBookingId("");
      setBookingForm(initialBookingForm);
    }, 250);
  }, [isSubmittingBooking]);

  const updateBookingField = <K extends keyof BookingFormData>(
    field: K,
    value: BookingFormData[K],
  ) => {
    setBookingError("");
    setBookingForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const toggleService = (serviceId: string) => {
    setBookingError("");
    setBookingForm((previous) => ({
      ...previous,
      services: previous.services.includes(serviceId)
        ? previous.services.filter((id) => id !== serviceId)
        : [...previous.services, serviceId],
    }));
  };

  /* Location Capture */
  const captureLocation = () => {
    if (!navigator.geolocation) {
      setBookingError("Location services are not supported by this browser.");
      return;
    }

    setLocationLoading(true);
    setBookingError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        updateBookingField("latitude", position.coords.latitude.toFixed(7));
        updateBookingField("longitude", position.coords.longitude.toFixed(7));
        updateBookingField(
          "locationAccuracy",
          Math.round(position.coords.accuracy).toString(),
        );
        setLocationLoading(false);
      },
      (error) => {
        console.error("Location error:", error);
        setLocationLoading(false);
        setBookingError(
          "Unable to get your location. Please allow location access and try again.",
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  /* Booking Validation */
  const validateBookingDetails = () => {
    if (!bookingForm.fullName.trim()) return "Please enter your Name.";
    const phoneDigits = bookingForm.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      return "Please enter a valid 10-digit Mobile Number.";
    }
    if (!bookingForm.address.trim()) return "Please enter your Site Location address.";
    if (!bookingForm.problemStatement.trim()) return "Please enter the Problem Statement.";
    if (!bookingForm.plannedDate.trim()) {
      return "Please select a planned Date for the Site Visit / Service.";
    }
    if (bookingForm.issuePhoto && bookingForm.issuePhoto.size > MAX_FILE_SIZE) {
      return "Issue photo must be less than 10MB.";
    }
    if (!bookingForm.services.length) {
      return "Please select at least one Service Category.";
    }
    if (!bookingTotal) return "Please select a valid service.";
    return "";
  };

  const goToPayment = () => {
    const error = validateBookingDetails();
    setBookingError(error);
    if (error) return;
    setBookingStep("payment");
  };

  const submitBooking = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmittingBooking) return;

    if (!bookingForm.paymentScreenshot) {
      setBookingError("Please upload your payment screenshot.");
      return;
    }
    if (bookingForm.paymentScreenshot.size > MAX_FILE_SIZE) {
      setBookingError("Payment screenshot must be below 10MB.");
      return;
    }
    if (!bookingForm.utr.trim()) {
      setBookingError("Please enter the UTR / transaction reference number.");
      return;
    }
    if (!bookingForm.latitude || !bookingForm.longitude) {
      setBookingError("Please share your pin location before submitting.");
      return;
    }

    setBookingError("");
    setIsSubmittingBooking(true);

    try {
      const form = new FormData();
      form.append("quoteId", bookingNumber);
      form.append("bookingId", bookingNumber);
      form.append("fullName", bookingForm.fullName.trim());
      form.append("phone", bookingForm.phone.trim());
      form.append("isHyderabad", String(bookingForm.isHyderabad));
      form.append("address", bookingForm.address.trim());
      form.append("problemStatement", bookingForm.problemStatement.trim());
      form.append("remarks", bookingForm.remarks.trim());
      form.append("plannedDate", bookingForm.plannedDate.trim());
      form.append("services", JSON.stringify(selectedServices));
      form.append("total", String(bookingTotal));
      form.append("latitude", bookingForm.latitude);
      form.append("longitude", bookingForm.longitude);
      form.append("locationAccuracy", bookingForm.locationAccuracy);
      form.append("utr", bookingForm.utr.trim());

      if (bookingForm.issuePhoto) {
        form.append("issuePhoto", bookingForm.issuePhoto);
      }
      if (bookingForm.paymentScreenshot) {
        form.append("paymentScreenshot", bookingForm.paymentScreenshot);
      }

      form.append("documentType", "service-booking-slip");
      form.append("documentTitle", "Service Booking Slip");

      const response = await fetch("/api/quotes", {
        method: "POST",
        body: form,
      });

      const result = (await response.json()) as BookingApiResponse;

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to submit the service booking.");
      }

      setBookingId(result.bookingId || result.quoteId || bookingNumber);
      setBookingStep("success");
    } catch (error) {
      console.error("Service booking failed:", error);
      setBookingError(
        error instanceof Error ? error.message : "Unable to submit the service booking.",
      );
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  /* Escape & Body Scroll Lock */
  useEffect(() => {
    if (!ticketOpen && !bookingOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (bookingOpen) closeBookingModal();
      else closeTicketModal();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [ticketOpen, bookingOpen, closeTicketModal, closeBookingModal]);

  return (
    <>
      {/* ================= FLOATING BUTTONS ================= */}
      <div className="fixed bottom-5 right-4 z-[999] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
        <motion.button
          type="button"
          onClick={openBookingModal}
          aria-label="Book a Service"
          title="Book a Service"
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-[#0A2E6F] text-white shadow-[0_8px_24px_rgba(10,46,111,0.35)] transition-shadow duration-300 hover:shadow-[0_12px_30px_rgba(10,46,111,0.45)]"
        >
          <ClipboardList className="h-5 w-5" />
          <FloatingTooltip>Book a Service</FloatingTooltip>
        </motion.button>

        <motion.button
          type="button"
          onClick={openTicketModal}
          aria-label="Raise a Ticket"
          title="Raise a Ticket"
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-[#C9A14A] text-white shadow-[0_8px_24px_rgba(201,161,74,0.35)]"
        >
          <TicketCheck className="h-5 w-5" />
          <FloatingTooltip>Raise a Ticket</FloatingTooltip>
        </motion.button>

        <motion.a
          href="https://wa.me/919390719623"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          title="WhatsApp"
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.35)]"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-15" />
          <FaWhatsapp className="relative z-10 h-[22px] w-[22px]" />
          <FloatingTooltip>Chat on WhatsApp</FloatingTooltip>
        </motion.a>

        <motion.a
          href="tel:+919390719623"
          aria-label="Call us"
          title="Call Us"
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-[#0A2E6F] text-white shadow-[0_8px_24px_rgba(10,46,111,0.35)]"
        >
          <Phone className="relative z-10 h-5 w-5" />
          <FloatingTooltip>Call Us</FloatingTooltip>
        </motion.a>
      </div>

      {/* ================= SERVICE BOOKING MODAL ================= */}
      <AnimatePresence>
        {bookingOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2100] flex items-center justify-center bg-[#071224]/75 px-3 py-4 backdrop-blur-md sm:px-5"
            onMouseDown={closeBookingModal}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              onMouseDown={(event) => event.stopPropagation()}
              className="relative flex max-h-[calc(100vh-32px)] w-full max-w-[1180px] flex-col overflow-hidden rounded-[26px] bg-[#f5f7fb] shadow-[0_35px_120px_rgba(0,0,0,0.38)]"
            >
              {/* MODAL HEADER */}
              <div className="relative z-40 flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0A2E6F] text-white">
                    {bookingStep === "payment" ? (
                      <CreditCard className="h-5 w-5" />
                    ) : (
                      <ReceiptText className="h-5 w-5" />
                    )}
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#0A2E6F]">
                      {COMPANY_NAME}
                    </p>
                    <h2 className="text-lg font-bold text-[#071224] sm:text-xl">
                      {bookingStep === "details"
                        ? "Service Booking Request"
                        : bookingStep === "payment"
                          ? "Payment & Confirmation"
                          : "Booking Submitted"}
                    </h2>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeBookingModal}
                  disabled={isSubmittingBooking}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 disabled:opacity-50"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* SUCCESS VIEW */}
              {bookingStep === "success" ? (
                <div className="overflow-y-auto px-6 py-14 text-center sm:px-10">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>

                  <h3 className="mt-5 text-2xl font-bold text-[#071224]">
                    Service Booking Submitted
                  </h3>

                  <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500">
                    Your service request and payment proof have been received. An official PDF Service Booking Slip has been generated.
                  </p>

                  <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-blue-100 bg-blue-50 p-5">
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">
                      Booking Reference
                    </p>
                    <p className="mt-1 text-xl font-black text-[#0A2E6F]">
                      {bookingId || bookingNumber}
                    </p>
                    <p className="mt-2 text-xs text-slate-500">
                      Total Paid: {formatCurrency(bookingTotal)}
                    </p>
                  </div>

                  <div className="mx-auto mt-5 max-w-md rounded-xl bg-slate-100 p-3">
                    <p className="text-xs font-semibold text-slate-600">
                      🔔 Note: Our team will Respond promptly upon payment Confirmation.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={closeBookingModal}
                    className="mt-7 rounded-full bg-[#0A2E6F] px-8 py-3 text-sm font-bold text-white transition hover:bg-[#08265d]"
                  >
                    Done
                  </button>
                </div>
              ) : bookingStep === "details" ? (
                /* DETAILS VIEW */
                <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[1.05fr_0.95fr]">
                  {/* LEFT FORM */}
                  <div className="border-b border-slate-200 bg-white p-5 sm:p-7 lg:overflow-y-auto lg:border-b-0 lg:border-r">
                    <div className="mb-6">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0A2E6F]">
                        Step 1 of 2
                      </p>
                      <h3 className="mt-1 text-xl font-bold text-[#071224]">
                        Service Request Details
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Choose your location category to see adjusted service pricing.
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField label="Name" required icon={User}>
                        <input
                          className={quoteInputStyles}
                          autoComplete="name"
                          value={bookingForm.fullName}
                          onChange={(e) => updateBookingField("fullName", e.target.value)}
                          placeholder="Your Full Name"
                        />
                      </FormField>

                      <FormField label="Mobile" required icon={Phone}>
                        <input
                          className={quoteInputStyles}
                          type="tel"
                          autoComplete="tel"
                          value={bookingForm.phone}
                          onChange={(e) =>
                            updateBookingField("phone", e.target.value.replace(/\D/g, ""))
                          }
                          placeholder="10-digit Mobile Number"
                          maxLength={10}
                        />
                      </FormField>
                    </div>

                    {/* LOCATION REGION TOGGLE */}
                    <div className="mt-4">
                      <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-[#071224]">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-[#0A2E6F]" />
                        <span>Location Region</span>
                        <span className="text-red-500">*</span>
                      </label>

                      <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1.5">
                        <button
                          type="button"
                          onClick={() => updateBookingField("isHyderabad", true)}
                          className={`rounded-lg py-2.5 text-xs font-bold transition-all ${
                            bookingForm.isHyderabad
                              ? "bg-[#0A2E6F] text-white shadow-sm"
                              : "text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          📍 In Hyderabad
                        </button>

                        <button
                          type="button"
                          onClick={() => updateBookingField("isHyderabad", false)}
                          className={`rounded-lg py-2.5 text-xs font-bold transition-all ${
                            !bookingForm.isHyderabad
                              ? "bg-[#0A2E6F] text-white shadow-sm"
                              : "text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          🚗 Outside Hyderabad
                        </button>
                      </div>
                    </div>

                    {/* Site Location */}
                    <div className="mt-4">
                      <FormField label="Postal Address" required icon={MapPin}>
                        <textarea
                          className={`${quoteInputStyles} min-h-[70px] resize-none`}
                          value={bookingForm.address}
                          onChange={(e) => updateBookingField("address", e.target.value)}
                          placeholder="Complete Site Address, Area & Landmarks"
                        />
                      </FormField>
                    </div>

                    {/* Problem Statement */}
                    <div className="mt-4">
                      <FormField label="Problem Statement" required icon={AlertCircle}>
                        <textarea
                          className={`${quoteInputStyles} min-h-[75px] resize-none`}
                          value={bookingForm.problemStatement}
                          onChange={(e) =>
                            updateBookingField("problemStatement", e.target.value)
                          }
                          placeholder="Describe the issue / repair / measurement needed..."
                        />
                      </FormField>
                    </div>

                    {/* Planned Date & Remarks */}
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <FormField label="Site Visit Planned Date" required icon={Calendar}>
                        <input
                          type="date"
                          className={quoteInputStyles}
                          min={new Date().toISOString().split("T")[0]}
                          value={bookingForm.plannedDate}
                          onChange={(e) =>
                            updateBookingField("plannedDate", e.target.value)
                          }
                        />
                      </FormField>

                      <FormField label="Remarks" icon={FileText}>
                        <input
                          type="text"
                          className={quoteInputStyles}
                          value={bookingForm.remarks}
                          onChange={(e) => updateBookingField("remarks", e.target.value)}
                          placeholder="Any specific instructions (Optional)"
                        />
                      </FormField>
                    </div>

                    {/* Upload Issue Photo (OPTIONAL) */}
                    <div className="mt-5">
                      <label className="mb-2 flex items-center gap-2 text-xs font-bold text-[#071224]">
                        <ImageIcon className="h-3.5 w-3.5 shrink-0 text-[#0A2E6F]" />
                        <span>Upload Photo of the Issue</span>
                        <span className="text-xs font-normal text-slate-400">(Optional)</span>
                      </label>

                      <label
                        htmlFor="issuePhoto"
                        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-center transition hover:border-[#0A2E6F] hover:bg-blue-50/40"
                      >
                        <Upload className="mb-1 h-5 w-5 text-slate-400" />
                        <span className="text-xs font-semibold text-slate-700">
                          {bookingForm.issuePhoto
                            ? "Change Photo"
                            : "Click to upload issue photo / video (Optional)"}
                        </span>
                        <span className="mt-0.5 text-[10px] text-slate-400">
                          PNG, JPG, JPEG, PDF or MP4 (Max 10MB)
                        </span>

                        {bookingForm.issuePhoto && (
                          <span className="mt-2 max-w-full truncate rounded bg-white px-2.5 py-1 text-[11px] font-medium text-green-700 shadow-sm">
                            {bookingForm.issuePhoto.name}
                          </span>
                        )}
                      </label>

                      <input
                        id="issuePhoto"
                        type="file"
                        accept="image/*,video/*,.pdf"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0] ?? null;
                          updateBookingField("issuePhoto", file);
                        }}
                      />
                    </div>

                    {/* DYNAMIC SERVICES SELECTION */}
                    <div className="mt-6">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <p className="text-xs font-bold text-[#071224]">
                          Select Services <span className="text-red-500">*</span>
                        </p>
                        <span className="text-[10px] text-slate-400">
                          Multiple selection allowed
                        </span>
                      </div>

                      <div className="grid gap-2.5">
                        {computedServices.map((service) => {
                          const selected = bookingForm.services.includes(service.id);

                          return (
                            <button
                              key={service.id}
                              type="button"
                              onClick={() => toggleService(service.id)}
                              className={`flex items-center justify-between rounded-xl border p-3.5 text-left transition-all ${
                                selected
                                  ? "border-[#0A2E6F] bg-blue-50/80 shadow-sm"
                                  : "border-slate-200 bg-white hover:border-slate-300"
                              }`}
                            >
                              <span className="flex min-w-0 items-center gap-2.5">
                                <span
                                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                                    selected
                                      ? "border-[#0A2E6F] bg-[#0A2E6F] text-white"
                                      : "border-slate-300 bg-white"
                                  }`}
                                >
                                  {selected && <CheckCircle2 className="h-3 w-3" />}
                                </span>
                                <div>
                                  <span className="block text-xs font-bold text-slate-800">
                                    {service.name}
                                  </span>
                                  <span className="text-[10px] text-slate-400">
                                    {bookingForm.isHyderabad ? "In Hyderabad Rate" : "Outside Hyderabad Rate"}
                                  </span>
                                </div>
                              </span>

                              <span className="ml-3 whitespace-nowrap text-sm font-black text-[#0A2E6F]">
                                {formatCurrency(service.amount)}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* GPS PIN LOCATION */}
                    <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#0A2E6F]" />
                        <div className="flex-1">
                          <p className="text-xs font-bold text-[#071224]">
                            Site Location GPS Pin
                          </p>
                          <p className="mt-1 text-[11px] leading-5 text-slate-500">
                            Share GPS location so our field technician reaches your site accurately.
                          </p>

                          <button
                            type="button"
                            onClick={captureLocation}
                            disabled={locationLoading}
                            className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#0A2E6F] px-4 py-2 text-[11px] font-bold text-white disabled:opacity-60"
                          >
                            <Navigation className="h-3.5 w-3.5" />
                            {locationLoading
                              ? "Getting Location..."
                              : bookingForm.latitude
                                ? "Location Captured"
                                : "Use My Current Location"}
                          </button>

                          {bookingForm.latitude && bookingForm.longitude && (
                            <p className="mt-2 text-[10px] text-green-700">
                              ✓ Location captured ({bookingForm.latitude}, {bookingForm.longitude}).
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Prominent Footer Note */}
                    <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-amber-200 bg-amber-50/80 p-3.5 text-amber-900">
                      <Info className="h-4 w-4 shrink-0 text-amber-700" />
                      <p className="text-xs font-semibold leading-relaxed">
                        Note: Our team will Respond promptly upon payment Confirmation.
                      </p>
                    </div>

                    {bookingError && <ErrorBox message={bookingError} />}

                    <button
                      type="button"
                      onClick={goToPayment}
                      className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#0A2E6F] px-6 text-sm font-bold text-white shadow-[0_12px_30px_rgba(10,46,111,0.2)] transition hover:bg-[#08265d]"
                    >
                      Continue to Payment
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  {/* RIGHT LIVE SLIP */}
                  <div className="hidden bg-slate-100 p-5 lg:block lg:overflow-y-auto lg:p-7">
                    <div className="sticky top-0">
                      <ServiceBookingSlip
                        bookingNumber={bookingNumber}
                        customer={bookingForm}
                        selectedServices={selectedServices}
                        total={bookingTotal}
                      />
                    </div>
                  </div>

                  {/* MOBILE PREVIEW */}
                  <div className="bg-slate-100 p-4 lg:hidden">
                    <ServiceBookingSlip
                      bookingNumber={bookingNumber}
                      customer={bookingForm}
                      selectedServices={selectedServices}
                      total={bookingTotal}
                    />
                  </div>
                </div>
              ) : (
                /* PAYMENT VIEW */
                <form
                  onSubmit={submitBooking}
                  className="flex min-h-0 flex-1 flex-col overflow-hidden"
                >
                  <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-5 py-3.5 sm:px-7">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0A2E6F]">
                        Step 2 of 2
                      </p>
                      <h3 className="text-base font-bold text-[#071224]">
                        Payment & Verification
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setBookingError("");
                        setBookingStep("details");
                      }}
                      className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      Back to Details
                    </button>
                  </div>

                  <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[1fr_1fr]">
                    {/* LEFT: SLIP PREVIEW */}
                    <div className="hidden min-h-0 overflow-y-auto bg-slate-100 p-5 lg:block lg:p-7">
                      <div className="sticky top-0">
                        <ServiceBookingSlip
                          bookingNumber={bookingNumber}
                          customer={bookingForm}
                          selectedServices={selectedServices}
                          total={bookingTotal}
                        />
                      </div>
                    </div>

                    {/* RIGHT: PAYMENT FORM */}
                    <div className="min-h-0 overflow-y-auto overscroll-contain bg-white px-5 py-6 sm:px-7">
                      <div className="mx-auto w-full max-w-[420px]">
                        {/* Amount Due */}
                        <div className="mb-5 rounded-2xl border border-blue-100 bg-blue-50/60 p-4 text-center">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            Total Payable Amount
                          </p>
                          <p className="mt-1 text-2xl font-black text-[#0A2E6F]">
                            {formatCurrency(bookingTotal)}
                          </p>
                        </div>

                        {/* Scanner */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                          <div className="mb-3 text-center">
                            <h4 className="text-sm font-bold text-slate-900">
                              Scan UPI QR Code
                            </h4>
                            <p className="mt-1 text-xs text-slate-500">
                              Scan using Google Pay, PhonePe, Paytm, or BHIM.
                            </p>
                          </div>

                          <div className="flex justify-center rounded-xl bg-slate-50 p-3">
                            <img
                              src={PAYMENT_SCANNER_PATH}
                              alt="Payment QR Scanner"
                              className="h-auto w-full max-w-[240px] rounded-lg object-contain"
                            />
                          </div>

                          <div className="mt-3 rounded-xl bg-amber-50 p-2.5 text-center">
                            <p className="text-[11px] leading-4 text-amber-800">
                              Please pay exactly <strong>{formatCurrency(bookingTotal)}</strong> and upload the confirmation screenshot below.
                            </p>
                          </div>
                        </div>

                        {/* Proof Submission */}
                        <div className="mt-5 space-y-4">
                          <div>
                            <label className="mb-1.5 block text-xs font-bold text-slate-700">
                              Payment Screenshot <span className="text-red-500">*</span>
                            </label>

                            <label
                              htmlFor="paymentScreenshot"
                              className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-center transition hover:border-[#0A2E6F] hover:bg-blue-50/40"
                            >
                              <Upload className="mb-1.5 h-5 w-5 text-slate-400" />
                              <span className="text-xs font-semibold text-slate-700">
                                {bookingForm.paymentScreenshot
                                  ? "Change Screenshot"
                                  : "Click to upload screenshot"}
                              </span>
                              <span className="mt-0.5 text-[10px] text-slate-400">
                                PNG, JPG, JPEG or PDF (Max 10MB)
                              </span>

                              {bookingForm.paymentScreenshot && (
                                <span className="mt-2 max-w-full truncate rounded bg-white px-2.5 py-1 text-[11px] font-medium text-green-700 shadow-sm">
                                  {bookingForm.paymentScreenshot.name}
                                </span>
                              )}
                            </label>

                            <input
                              id="paymentScreenshot"
                              type="file"
                              accept="image/*,.pdf"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0] ?? null;
                                updateBookingField("paymentScreenshot", file);
                              }}
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="utr"
                              className="mb-1.5 block text-xs font-bold text-slate-700"
                            >
                              UTR / Reference Number <span className="text-red-500">*</span>
                            </label>
                            <input
                              id="utr"
                              type="text"
                              value={bookingForm.utr}
                              onChange={(e) =>
                                updateBookingField("utr", e.target.value)
                              }
                              placeholder="e.g., 423456789012"
                              autoComplete="off"
                              className={quoteInputStyles}
                            />
                          </div>
                        </div>

                        {/* Bottom Note */}
                        <div className="mt-5 rounded-xl bg-slate-50 p-3 text-center border border-slate-200">
                          <p className="text-[11px] font-medium text-slate-600">
                            📢 Our team will Respond promptly upon payment Confirmation.
                          </p>
                        </div>

                        {bookingError && <ErrorBox message={bookingError} />}

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isSubmittingBooking}
                          className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#0A2E6F] px-6 text-sm font-bold text-white shadow-[0_12px_30px_rgba(10,46,111,0.25)] transition hover:bg-[#08265d] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {isSubmittingBooking ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Submitting Booking...
                            </>
                          ) : (
                            <>
                              Submit Booking & Payment
                              <CheckCircle2 className="h-4 w-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= TICKET MODAL ================= */}
      <AnimatePresence>
        {ticketOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center bg-[#071224]/60 px-4 py-6 backdrop-blur-[4px]"
            onMouseDown={closeTicketModal}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              onMouseDown={(event) => event.stopPropagation()}
              className="relative max-h-[calc(100vh-48px)] w-full max-w-[480px] overflow-y-auto rounded-[24px] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.3)]"
            >
              <div className="relative overflow-hidden border-b border-slate-100 px-6 py-5">
                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0A2E6F] text-white">
                      <TicketCheck className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#0A2E6F]">
                        Customer Support
                      </p>
                      <h2 className="mt-1 text-xl font-bold text-[#071224]">
                        Raise a Ticket
                      </h2>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Tell us about your issue and our team will assist you.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={closeTicketModal}
                    disabled={isSubmittingTicket}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-50"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {ticketSubmitted ? (
                <div className="px-6 py-9 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-[#071224]">
                    Ticket Submitted
                  </h3>

                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                    Your complaint has been submitted successfully. Our support team will review your request and contact you.
                  </p>

                  {ticketId && (
                    <div className="mx-auto mt-5 max-w-[300px] rounded-xl border border-blue-100 bg-blue-50/70 px-5 py-4">
                      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">
                        Ticket ID
                      </p>
                      <p className="mt-1 text-lg font-black text-[#0A2E6F]">
                        {ticketId}
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={closeTicketModal}
                    className="mt-6 rounded-full bg-[#0A2E6F] px-7 py-3 text-sm font-bold text-white"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleTicketSubmit} className="p-6">
                  <div className="space-y-4">
                    <FormField label="Full Name" required icon={User}>
                      <input
                        className={inputStyles}
                        value={ticketForm.fullName}
                        onChange={(event) =>
                          setTicketForm((previous) => ({
                            ...previous,
                            fullName: event.target.value,
                          }))
                        }
                        placeholder="Your full name"
                      />
                    </FormField>

                    <FormField label="Contact Number" required icon={Phone}>
                      <input
                        className={inputStyles}
                        type="tel"
                        value={ticketForm.contact}
                        onChange={(event) =>
                          setTicketForm((previous) => ({
                            ...previous,
                            contact: event.target.value.replace(/\D/g, ""),
                          }))
                        }
                        placeholder="10-digit mobile number"
                        maxLength={10}
                      />
                    </FormField>

                    <FormField label="Order ID" required icon={FileCheck2}>
                      <input
                        className={inputStyles}
                        value={ticketForm.orderId}
                        onChange={(event) =>
                          setTicketForm((previous) => ({
                            ...previous,
                            orderId: event.target.value,
                          }))
                        }
                        placeholder="Enter Order ID"
                      />
                    </FormField>

                    <FormField label="Item / Product" required icon={Package}>
                      <input
                        className={inputStyles}
                        value={ticketForm.item}
                        onChange={(event) =>
                          setTicketForm((previous) => ({
                            ...previous,
                            item: event.target.value,
                          }))
                        }
                        placeholder="Product or service"
                      />
                    </FormField>

                    <FormField label="Complaint" required icon={FileText}>
                      <textarea
                        className={`${inputStyles} min-h-[110px] resize-none`}
                        value={ticketForm.complaint}
                        onChange={(event) =>
                          setTicketForm((previous) => ({
                            ...previous,
                            complaint: event.target.value,
                          }))
                        }
                        placeholder="Describe your issue"
                      />
                    </FormField>

                    <FormField label="Attachment" required icon={Paperclip}>
                      <input
                        type="file"
                        required
                        accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.zip,.rar"
                        onChange={(event) =>
                          setTicketForm((previous) => ({
                            ...previous,
                            attachment: event.target.files?.[0] ?? null,
                          }))
                        }
                        className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-[#0A2E6F] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
                      />
                      <p className="mt-2 text-xs text-slate-500">
                        Upload a photo, video, or document related to your issue. Max 10MB.
                      </p>
                    </FormField>
                  </div>

                  {ticketError && <ErrorBox message={ticketError} />}

                  <button
                    type="submit"
                    disabled={isSubmittingTicket}
                    className="group mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#0A2E6F] px-6 text-sm font-bold text-white shadow-[0_12px_30px_rgba(10,46,111,0.2)] hover:bg-[#08265d] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmittingTicket ? "Sending Ticket..." : "Submit Ticket"}
                    {!isSubmittingTicket && <Send className="h-4 w-4" />}
                  </button>

                  <p className="mt-4 text-center text-[11px] leading-5 text-slate-400">
                    Our support team will review your request and contact you using the details provided.
                  </p>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* =========================================================
   SERVICE BOOKING SLIP PREVIEW COMPONENT
========================================================= */

function ServiceBookingSlip({
  bookingNumber,
  customer,
  selectedServices,
  total,
}: {
  bookingNumber: string;
  customer: BookingFormData;
  selectedServices: Array<{ id: string; name: string; amount: number }>;
  total: number;
}) {
  return (
    <div className="mx-auto w-full max-w-[540px] overflow-hidden rounded-[26px] border border-slate-200/90 bg-white text-slate-900 shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
      {/* HEADER */}
      <div className="border-b border-slate-200/80 bg-white px-7 py-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <img
              src="/logo.png"
              alt={COMPANY_NAME}
              className="h-12 w-auto object-contain"
            />
            <div>
              <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#0A2E6F]">
                {COMPANY_NAME}
              </p>
              <h3 className="mt-1 font-serif text-2xl font-bold tracking-tight text-[#071224]">
                Service Booking Slip
              </h3>
            </div>
          </div>

          <div className="text-right">
            <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Booking No.
            </p>
            <p className="mt-1 text-sm font-black text-[#0A2E6F]">
              {bookingNumber}
            </p>
            <p className="mt-1 text-[10px] text-slate-400">
              {new Date().toLocaleDateString("en-IN")}
            </p>
          </div>
        </div>
      </div>

      {/* CUSTOMER & SITE DETAILS */}
      <div className="px-7 py-6">
        <div className="grid grid-cols-2 gap-y-4 gap-x-6">
          <div>
            <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Customer
            </p>
            <p className="mt-1 break-words text-sm font-bold text-slate-900">
              {customer.fullName || "Customer Name"}
            </p>
          </div>

          <div>
            <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Contact (Mob)
            </p>
            <p className="mt-1 break-all text-sm font-bold text-slate-900">
              {customer.phone || "Phone Number"}
            </p>
          </div>

          <div className="col-span-2">
            <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Location Tier
            </p>
            <p className="mt-1 break-words text-xs font-bold text-[#0A2E6F]">
              {customer.isHyderabad ? "In Hyderabad (Standard Rate)" : "Outside Hyderabad (Regional Travel Rate)"}
            </p>
          </div>
        </div>

        {/* SITE LOCATION */}
        <div className="mt-4 border-t border-slate-100 pt-3">
          <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-slate-400">
            Project / Site Address
          </p>
          <p className="mt-1 break-words text-xs leading-5 text-slate-700">
            {customer.address || "Project / site address"}
          </p>
        </div>

        {/* PROBLEM STATEMENT & VISIT DATE */}
        {(customer.problemStatement || customer.plannedDate) && (
          <div className="mt-3.5 rounded-xl bg-slate-50 p-3 text-xs text-slate-700 space-y-1.5">
            {customer.plannedDate && (
              <div>
                <span className="font-bold text-[#0A2E6F]">Planned Site Visit:</span>{" "}
                {formatToDDMMYYYY(customer.plannedDate)}
              </div>
            )}
            {customer.problemStatement && (
              <div>
                <span className="font-bold text-[#0A2E6F]">Problem Statement:</span>{" "}
                <span className="line-clamp-2">{customer.problemStatement}</span>
              </div>
            )}
          </div>
        )}

        {/* SERVICES */}
        <div className="mt-5">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Services
            </p>
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Amount
            </p>
          </div>

          {selectedServices.length ? (
            <div className="divide-y divide-slate-100">
              {selectedServices.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between gap-4 py-3"
                >
                  <span className="text-xs font-medium text-slate-700">
                    {service.name}
                  </span>
                  <span className="whitespace-nowrap text-xs font-bold text-slate-900">
                    {formatCurrency(service.amount)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-400">
              Select services to build the slip.
            </div>
          )}
        </div>

        {/* TOTAL */}
        <div className="mt-4 border-t border-slate-200 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                Total Amount
              </p>
              <p className="mt-1 text-[11px] text-slate-400">
                Selected service charges
              </p>
            </div>

            <p className="text-2xl font-black text-[#0A2E6F]">
              {formatCurrency(total)}
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="border-t border-slate-200 bg-slate-50/80 px-7 py-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Contact
            </p>
            <p className="mt-1 text-[11px] font-bold text-slate-700">
              {COMPANY_PHONE}
            </p>
          </div>

          <div className="text-right">
            <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Email
            </p>
            <p className="mt-1 break-all text-[11px] font-bold text-slate-700">
              {COMPANY_EMAIL}
            </p>
          </div>
        </div>

        <p className="mt-4 text-center text-[9px] text-slate-400">
          Our team will Respond promptly upon payment Confirmation.
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   UI ATOMS
========================================================= */

function ErrorBox({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-100 bg-red-50 px-4 py-3"
    >
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
      <p className="text-xs leading-5 text-red-600">{message}</p>
    </motion.div>
  );
}

type FloatingTooltipProps = {
  children: ReactNode;
};

function FloatingTooltip({ children }: FloatingTooltipProps) {
  return (
    <span className="pointer-events-none absolute right-[58px] hidden whitespace-nowrap rounded-lg bg-[#071224] px-3 py-2 text-[11px] font-semibold text-white opacity-0 shadow-lg transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100 sm:block">
      {children}
    </span>
  );
}

type FormFieldProps = {
  label: string;
  required?: boolean;
  icon: ElementType;
  children: ReactNode;
};

function FormField({
  label,
  required = false,
  icon: Icon,
  children,
}: FormFieldProps) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-[#071224]">
        <Icon className="h-3.5 w-3.5 shrink-0 text-[#0A2E6F]" />
        <span>{label}</span>
        {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputStyles = `
  w-full
  rounded-xl
  border
  border-slate-200
  bg-white
  px-4
  py-3
  text-sm
  text-[#071224]
  outline-none
  transition-all
  duration-200
  placeholder:text-slate-400
  focus:border-[#0A2E6F]
  focus:ring-0
  autofill:bg-white
`;

const quoteInputStyles = `
  w-full
  rounded-xl
  border
  border-slate-200
  bg-white
  px-4
  py-2.5
  text-sm
  text-[#071224]
  outline-none
  transition-all
  duration-200
  placeholder:text-slate-400
  focus:border-[#0A2E6F]
  focus:ring-0
  autofill:bg-white
`;