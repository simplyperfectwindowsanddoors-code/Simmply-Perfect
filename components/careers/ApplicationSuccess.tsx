"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  Clock3,
  Mail,
} from "lucide-react";

import type { Job } from "@/types/careers";

/* =========================================================
   TYPES
========================================================= */

type ApplicationSuccessProps = {
  job: Job;
  onClose: () => void;
};

/* =========================================================
   APPLICATION SUCCESS
========================================================= */

export default function ApplicationSuccess({
  job,
  onClose,
}: ApplicationSuccessProps) {
  return (
    <div
      className="
        relative
        flex
        h-full
        min-h-0
        flex-1
        items-center
        justify-center
        overflow-y-auto
        bg-[#F8FAFC]
        px-5
        py-8
        sm:px-8
        sm:py-10
      "
    >
      {/* ===================================================
          BACKGROUND
      =================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-100/60 blur-[110px]" />

        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-slate-200/70 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(#0A2E6F 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* ===================================================
          SUCCESS CARD
      =================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
          scale: 0.98,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.45,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
          relative
          z-10
          w-full
          max-w-[560px]
          overflow-hidden
          rounded-[28px]
          border
          border-slate-200
          bg-white
          shadow-[0_30px_80px_rgba(15,23,42,0.10)]
        "
      >
        {/* =================================================
            TOP SUCCESS AREA
        ================================================= */}

        <div className="px-6 pb-7 pt-8 text-center sm:px-9 sm:pb-8 sm:pt-9">
          {/* SUCCESS ICON */}

          <motion.div
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 16,
              delay: 0.1,
            }}
            className="
              relative
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-[#0A2E6F]
              text-white
              shadow-[0_14px_35px_rgba(10,46,111,0.24)]
            "
          >
            <Check className="h-7 w-7 stroke-[2.8]" />

            <motion.span
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: [0, 0.5, 0],
                scale: [0.8, 1.5, 1.7],
              }}
              transition={{
                duration: 1.8,
                delay: 0.4,
                repeat: 1,
              }}
              className="
                absolute
                inset-0
                rounded-full
                border
                border-[#0A2E6F]/30
              "
            />
          </motion.div>

          {/* LABEL */}

          <motion.p
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
              delay: 0.2,
            }}
            className="
              mt-5
              text-[10px]
              font-black
              uppercase
              tracking-[0.2em]
              text-[#0A2E6F]
            "
          >
            Application Submitted
          </motion.p>

          {/* HEADING */}

          <motion.h2
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
              delay: 0.25,
            }}
            className="
              mt-2
              text-2xl
              font-bold
              tracking-[-0.035em]
              text-[#071224]
              sm:text-[28px]
            "
          >
            Thank you for applying
          </motion.h2>

          {/* DESCRIPTION */}

          <motion.p
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
              delay: 0.3,
            }}
            className="
              mx-auto
              mt-3
              max-w-md
              text-sm
              leading-6
              text-slate-500
            "
          >
            Your application has been successfully received.
            Our recruitment team will review your profile and
            contact you if you are shortlisted.
          </motion.p>
        </div>

        {/* =================================================
            APPLICATION DETAILS
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
            delay: 0.35,
          }}
          className="
            mx-5
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-[#F8FAFC]
            sm:mx-7
          "
        >
          {/* APPLIED POSITION */}

          <div
            className="
              flex
              items-center
              gap-4
              border-b
              border-slate-200
              px-4
              py-4
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-blue-100
                bg-white
                text-[#0A2E6F]
                shadow-sm
              "
            >
              <BriefcaseBusiness className="h-[18px] w-[18px]" />
            </div>

            <div className="min-w-0 flex-1">
              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-slate-400
                "
              >
                Applied Position
              </p>

              <p
                className="
                  mt-1
                  truncate
                  text-sm
                  font-bold
                  text-[#071224]
                "
              >
                {job.title}
              </p>
            </div>

            <div
              className="
                shrink-0
                rounded-full
                border
                border-green-100
                bg-green-50
                px-3
                py-1.5
              "
            >
              <span
                className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.12em]
                  text-green-700
                "
              >
                Received
              </span>
            </div>
          </div>

          {/* NEXT STEP */}

          <div
            className="
              grid
              grid-cols-1
              divide-y
              divide-slate-200
              sm:grid-cols-2
              sm:divide-x
              sm:divide-y-0
            "
          >
            {/* REVIEW */}

            <div className="flex items-start gap-3 px-4 py-4">
              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-white
                  text-[#0A2E6F]
                  shadow-sm
                "
              >
                <Clock3 className="h-4 w-4" />
              </div>

              <div>
                <p
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.14em]
                    text-slate-400
                  "
                >
                  Next Step
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    font-bold
                    text-[#071224]
                  "
                >
                  Profile Review
                </p>
              </div>
            </div>

            {/* COMMUNICATION */}

            <div className="flex items-start gap-3 px-4 py-4">
              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-white
                  text-[#0A2E6F]
                  shadow-sm
                "
              >
                <Mail className="h-4 w-4" />
              </div>

              <div>
                <p
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.14em]
                    text-slate-400
                  "
                >
                  Communication
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    font-bold
                    text-[#071224]
                  "
                >
                  Email or Phone
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* =================================================
            BOTTOM ACTION
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.4,
            delay: 0.4,
          }}
          className="px-5 pb-6 pt-5 sm:px-7 sm:pb-7"
        >
          <button
            type="button"
            onClick={onClose}
            className="
              group
              inline-flex
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
              shadow-[0_12px_30px_rgba(10,46,111,0.20)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-[#08265d]
              hover:shadow-[0_16px_35px_rgba(10,46,111,0.25)]
              active:translate-y-0
            "
          >
            Back to Careers

            <ArrowRight
              className="
                h-4
                w-4
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </button>

          <p
            className="
              mt-4
              text-center
              text-[11px]
              leading-5
              text-slate-400
            "
          >
            Shortlisted candidates will be contacted by our
            recruitment team.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}