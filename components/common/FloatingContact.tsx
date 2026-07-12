"use client";

import {
  FormEvent,
  ReactNode,
  ElementType,
  useCallback,
  useEffect,
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
} from "lucide-react";

import { FaWhatsapp } from "react-icons/fa";

/* =========================================================
   FORM DATA TYPE
========================================================= */

type TicketFormData = {
  fullName: string;
  contact: string;
  orderId: string;
  item: string;
  complaint: string;
};

/* =========================================================
   API RESPONSE TYPE
========================================================= */

type TicketApiResponse = {
  success: boolean;
  message: string;
  ticketId?: string;
};

/* =========================================================
   INITIAL FORM DATA
========================================================= */

const initialFormData: TicketFormData = {
  fullName: "",
  contact: "",
  orderId: "",
  item: "",
  complaint: "",
};

/* =========================================================
   COMPONENT
========================================================= */

export default function FloatingContact() {
  /* =========================================================
     STATE
  ========================================================= */

  const [ticketOpen, setTicketOpen] = useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [submitted, setSubmitted] = useState(false);

  const [ticketId, setTicketId] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] =
    useState<TicketFormData>(initialFormData);

  /* =========================================================
     OPEN TICKET MODAL
  ========================================================= */

  const openTicketModal = () => {
    setSubmitted(false);
    setTicketId("");
    setErrorMessage("");
    setTicketOpen(true);
  };

  /* =========================================================
     CLOSE TICKET MODAL
  ========================================================= */

  const closeTicketModal = useCallback(() => {
    if (isSubmitting) return;

    setTicketOpen(false);

    window.setTimeout(() => {
      setSubmitted(false);
      setTicketId("");
      setErrorMessage("");
      setFormData(initialFormData);
    }, 300);
  }, [isSubmitting]);

  /* =========================================================
     HANDLE INPUT CHANGE
  ========================================================= */

  const handleChange = (
    field: keyof TicketFormData,
    value: string,
  ) => {
    setErrorMessage("");

    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  /* =========================================================
     VALIDATE FORM
  ========================================================= */

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      return "Please enter your full name.";
    }

    if (!/^\d{10}$/.test(formData.contact)) {
      return "Please enter a valid 10-digit contact number.";
    }

    if (!formData.orderId.trim()) {
      return "Please enter your Order ID.";
    }

    if (!formData.item.trim()) {
      return "Please enter the item name.";
    }

    if (!formData.complaint.trim()) {
      return "Please describe your complaint.";
    }

    return "";
  };

  /* =========================================================
     HANDLE SUBMIT
  ========================================================= */

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (isSubmitting) return;

    setErrorMessage("");

    /* =====================================================
       CLIENT VALIDATION
    ===================================================== */

    const validationError = validateForm();

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    /* =====================================================
       START SUBMISSION
    ===================================================== */

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/tickets", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          contact: formData.contact.trim(),
          orderId: formData.orderId.trim(),
          item: formData.item.trim(),
          complaint: formData.complaint.trim(),
        }),
      });

      /* ===================================================
         READ API RESPONSE
      =================================================== */

      const result =
        (await response.json()) as TicketApiResponse;

      /* ===================================================
         HANDLE API ERROR
      =================================================== */

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Unable to submit your ticket.",
        );
      }

      /* ===================================================
         SUCCESS
      =================================================== */

      setTicketId(result.ticketId ?? "");

      setSubmitted(true);

      setFormData(initialFormData);
    } catch (error) {
      console.error(
        "Ticket submission failed:",
        error,
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit your ticket. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =========================================================
     ESCAPE KEY + BODY SCROLL
  ========================================================= */

  useEffect(() => {
    if (!ticketOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeTicketModal();
      }
    };

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    window.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, [ticketOpen, closeTicketModal]);

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      {/* =====================================================
          FLOATING CONTACT BUTTONS
      ===================================================== */}

      <div
        className="
          fixed
          bottom-5
          right-4
          z-[999]
          flex
          flex-col
          items-end
          gap-3
          sm:bottom-6
          sm:right-6
        "
      >
        {/* ===================================================
            RAISE A TICKET
        =================================================== */}

        <motion.button
          type="button"
          onClick={openTicketModal}
          aria-label="Raise a Ticket"
          title="Raise a Ticket"
          whileHover={{
            scale: 1.06,
            y: -2,
          }}
          whileTap={{
            scale: 0.95,
          }}
          className="
            group
            relative
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-[#C9A14A]
            text-white
            shadow-[0_8px_24px_rgba(201,161,74,0.35)]
            transition-shadow
            duration-300
            hover:shadow-[0_12px_30px_rgba(201,161,74,0.45)]
          "
        >
          <TicketCheck className="h-5 w-5" />

          <FloatingTooltip>
            Raise a Ticket
          </FloatingTooltip>
        </motion.button>

        {/* ===================================================
            WHATSAPP
        =================================================== */}

        <motion.a
          href="https://wa.me/919390719623"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          title="WhatsApp"
          whileHover={{
            scale: 1.06,
            y: -2,
          }}
          whileTap={{
            scale: 0.95,
          }}
          className="
            group
            relative
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-[#25D366]
            text-white
            shadow-[0_8px_24px_rgba(37,211,102,0.35)]
          "
        >
          <span
            className="
              absolute
              inset-0
              animate-ping
              rounded-full
              bg-[#25D366]
              opacity-15
            "
          />

          <FaWhatsapp className="relative z-10 h-[22px] w-[22px]" />

          <FloatingTooltip>
            Chat on WhatsApp
          </FloatingTooltip>
        </motion.a>

        {/* ===================================================
            CALL
        =================================================== */}

        <motion.a
          href="tel:+919390719623"
          aria-label="Call us"
          title="Call Us"
          whileHover={{
            scale: 1.06,
            y: -2,
          }}
          whileTap={{
            scale: 0.95,
          }}
          className="
            group
            relative
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-[#0A2E6F]
            text-white
            shadow-[0_8px_24px_rgba(10,46,111,0.35)]
          "
        >
          <Phone className="relative z-10 h-5 w-5" />

          <FloatingTooltip>
            Call Us
          </FloatingTooltip>
        </motion.a>
      </div>

      {/* =====================================================
          TICKET MODAL
      ===================================================== */}

      <AnimatePresence>
        {ticketOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed
              inset-0
              z-[2000]
              flex
              items-center
              justify-center
              bg-[#071224]/60
              px-4
              py-6
              backdrop-blur-[4px]
            "
            onMouseDown={closeTicketModal}
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
                scale: 0.96,
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
              onMouseDown={(event) =>
                event.stopPropagation()
              }
              className="
                relative
                max-h-[calc(100vh-48px)]
                w-full
                max-w-[480px]
                overflow-y-auto
                rounded-[24px]
                bg-white
                shadow-[0_30px_100px_rgba(0,0,0,0.3)]
              "
            >
              {/* =============================================
                  MODAL HEADER
              ============================================= */}

              <div className="relative overflow-hidden border-b border-slate-100 px-6 py-5">
                <div className="pointer-events-none absolute -right-16 -top-20 h-44 w-44 rounded-full bg-blue-100/60 blur-[60px]" />

                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0A2E6F] text-white">
                      <TicketCheck className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#0A2E6F]">
                        Customer Support
                      </p>

                      <h2 className="mt-1 text-xl font-bold tracking-[-0.03em] text-[#071224]">
                        Raise a Ticket
                      </h2>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Tell us about your issue and our team
                        will assist you.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={closeTicketModal}
                    disabled={isSubmitting}
                    aria-label="Close ticket form"
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-slate-200
                      bg-white
                      text-slate-500
                      transition-all
                      hover:border-slate-300
                      hover:bg-slate-50
                      hover:text-[#071224]
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* =============================================
                  SUCCESS VIEW
              ============================================= */}

              {submitted ? (
                <div className="px-6 py-9 text-center">
                  <motion.div
                    initial={{
                      scale: 0,
                    }}
                    animate={{
                      scale: 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 180,
                      damping: 15,
                    }}
                    className="
                      mx-auto
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-full
                      bg-green-50
                      text-green-600
                    "
                  >
                    <CheckCircle2 className="h-8 w-8" />
                  </motion.div>

                  <h3 className="mt-5 text-xl font-bold text-[#071224]">
                    Ticket Submitted
                  </h3>

                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                    Your complaint has been submitted
                    successfully. Our support team will review
                    your request and contact you.
                  </p>

                  {/* =========================================
                      GENERATED TICKET ID
                  ========================================= */}

                  {ticketId && (
                    <div
                      className="
                        mx-auto
                        mt-5
                        max-w-[300px]
                        rounded-xl
                        border
                        border-blue-100
                        bg-blue-50/70
                        px-5
                        py-4
                      "
                    >
                      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">
                        Your Ticket ID
                      </p>

                      <p className="mt-1 text-lg font-black tracking-[0.04em] text-[#0A2E6F]">
                        {ticketId}
                      </p>

                      <p className="mt-1 text-[10px] text-slate-400">
                        Please keep this ID for future
                        reference.
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={closeTicketModal}
                    className="
                      mt-6
                      inline-flex
                      h-11
                      items-center
                      justify-center
                      rounded-full
                      bg-[#0A2E6F]
                      px-7
                      text-sm
                      font-bold
                      text-white
                      transition-colors
                      hover:bg-[#08265d]
                    "
                  >
                    Done
                  </button>
                </div>
              ) : (
                /* =============================================
                    TICKET FORM
                ============================================= */

                <form
                  onSubmit={handleSubmit}
                  className="px-6 py-6"
                  noValidate
                >
                  <div className="space-y-4">
                    {/* FULL NAME */}

                    <FormField
                      label="Full Name"
                      required
                      icon={User}
                    >
                      <input
                        type="text"
                        required
                        autoComplete="name"
                        value={formData.fullName}
                        onChange={(event) =>
                          handleChange(
                            "fullName",
                            event.target.value,
                          )
                        }
                        placeholder="Enter your full name"
                        className={inputStyles}
                      />
                    </FormField>

                    {/* CONTACT */}

                    <FormField
                      label="Contact Number"
                      required
                      icon={Phone}
                    >
                      <input
                        type="tel"
                        required
                        inputMode="numeric"
                        autoComplete="tel"
                        maxLength={10}
                        value={formData.contact}
                        onChange={(event) =>
                          handleChange(
                            "contact",
                            event.target.value
                              .replace(/\D/g, "")
                              .slice(0, 10),
                          )
                        }
                        placeholder="Enter 10-digit contact number"
                        className={inputStyles}
                      />
                    </FormField>

                    {/* ORDER ID + ITEM */}

                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        label="Order ID"
                        required
                        icon={FileText}
                      >
                        <input
                          type="text"
                          required
                          value={formData.orderId}
                          onChange={(event) =>
                            handleChange(
                              "orderId",
                              event.target.value,
                            )
                          }
                          placeholder="Order ID"
                          className={inputStyles}
                        />
                      </FormField>

                      <FormField
                        label="Item"
                        required
                        icon={Package}
                      >
                        <input
                          type="text"
                          required
                          value={formData.item}
                          onChange={(event) =>
                            handleChange(
                              "item",
                              event.target.value,
                            )
                          }
                          placeholder="Item name"
                          className={inputStyles}
                        />
                      </FormField>
                    </div>

                    {/* COMPLAINT */}

                    <FormField
                      label="Describe Complaint"
                      required
                      icon={FileText}
                    >
                      <textarea
                        required
                        rows={4}
                        maxLength={2000}
                        value={formData.complaint}
                        onChange={(event) =>
                          handleChange(
                            "complaint",
                            event.target.value,
                          )
                        }
                        placeholder="Please describe your complaint..."
                        className={`${inputStyles} min-h-[110px] resize-none py-3`}
                      />
                    </FormField>
                  </div>

                  {/* =========================================
                      ERROR MESSAGE
                  ========================================= */}

                  <AnimatePresence>
                    {errorMessage && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: -5,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                        }}
                        className="
                          mt-4
                          flex
                          items-start
                          gap-2.5
                          rounded-xl
                          border
                          border-red-100
                          bg-red-50
                          px-4
                          py-3
                        "
                      >
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />

                        <p className="text-xs leading-5 text-red-600">
                          {errorMessage}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* =========================================
                      SUBMIT
                  ========================================= */}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="
                      group
                      mt-6
                      flex
                      h-12
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-full
                      bg-[#0A2E6F]
                      px-6
                      text-sm
                      font-bold
                      text-white
                      shadow-[0_12px_30px_rgba(10,46,111,0.2)]
                      transition-all
                      duration-300
                      hover:bg-[#08265d]
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  >
                    {isSubmitting ? (
                      <>
                        <span
                          className="
                            h-4
                            w-4
                            animate-spin
                            rounded-full
                            border-2
                            border-white/30
                            border-t-white
                          "
                        />

                        Sending Ticket...
                      </>
                    ) : (
                      <>
                        Submit Ticket

                        <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  <p className="mt-4 text-center text-[11px] leading-5 text-slate-400">
                    Our support team will review your request
                    and contact you using the details
                    provided.
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
   FLOATING TOOLTIP
========================================================= */

type FloatingTooltipProps = {
  children: ReactNode;
};

function FloatingTooltip({
  children,
}: FloatingTooltipProps) {
  return (
    <span
      className="
        pointer-events-none
        absolute
        right-[58px]
        hidden
        whitespace-nowrap
        rounded-lg
        bg-[#071224]
        px-3
        py-2
        text-[11px]
        font-semibold
        text-white
        opacity-0
        shadow-lg
        transition-all
        duration-300
        group-hover:-translate-x-1
        group-hover:opacity-100
        sm:block
      "
    >
      {children}
    </span>
  );
}

/* =========================================================
   FORM FIELD
========================================================= */

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
      <label className="mb-2 flex items-center gap-2 text-xs font-bold text-[#071224]">
        <Icon className="h-3.5 w-3.5 text-[#0A2E6F]" />

        {label}

        {required && (
          <span className="text-red-500">*</span>
        )}
      </label>

      {children}
    </div>
  );
}

/* =========================================================
   INPUT STYLES
========================================================= */

const inputStyles = `
  w-full
  rounded-xl
  border
  border-slate-200
  bg-transparent
  px-4
  py-3
  text-sm
  text-[#071224]
  outline-none
  transition-all
  duration-300
  placeholder:text-slate-400
  focus:border-[#0A2E6F]
  focus:ring-4
  focus:ring-blue-50
`;