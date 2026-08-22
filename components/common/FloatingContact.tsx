"use client";

import {
  FormEvent,
  ReactNode,
  ElementType,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
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
  ClipboardList,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

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

const initialTicketForm: TicketFormData = {
  fullName: "",
  contact: "",
  orderId: "",
  item: "",
  complaint: "",
  attachment: null,
};

export default function FloatingContact() {
  const router = useRouter();

  const [ticketOpen, setTicketOpen] = useState(false);
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [ticketError, setTicketError] = useState("");
  const [ticketForm, setTicketForm] = useState<TicketFormData>(initialTicketForm);

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

  useEffect(() => {
    if (!ticketOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeTicketModal();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [ticketOpen, closeTicketModal]);

  return (
    <>
      {/* FLOATING BUTTONS */}
      <div className="fixed bottom-5 right-4 z-[999] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
        {/* Book a Service (Navigates to dedicated page) */}
        <motion.button
          type="button"
          onClick={() => router.push("/book-service")}
          aria-label="Book a Service"
          title="Book a Service"
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-[#0A2E6F] text-white shadow-[0_8px_24px_rgba(10,46,111,0.35)] transition-shadow duration-300 hover:shadow-[0_12px_30px_rgba(10,46,111,0.45)]"
        >
          <ClipboardList className="h-5 w-5" />
          <FloatingTooltip>Book a Service</FloatingTooltip>
        </motion.button>

        {/* Raise a Ticket */}
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

        {/* WhatsApp */}
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

        {/* Phone Call */}
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

      {/* RAISE TICKET MODAL */}
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

                  {ticketError && (
                    <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                      <p className="text-xs leading-5 text-red-600">{ticketError}</p>
                    </div>
                  )}

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

function FloatingTooltip({ children }: { children: ReactNode }) {
  return (
    <span className="pointer-events-none absolute right-[58px] hidden whitespace-nowrap rounded-lg bg-[#071224] px-3 py-2 text-[11px] font-semibold text-white opacity-0 shadow-lg transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100 sm:block">
      {children}
    </span>
  );
}

function FormField({
  label,
  required = false,
  icon: Icon,
  children,
}: {
  label: string;
  required?: boolean;
  icon: ElementType;
  children: ReactNode;
}) {
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