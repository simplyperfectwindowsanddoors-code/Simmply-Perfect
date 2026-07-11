"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import JobDetails from "@/components/careers/JobDetails";
import JobApplicationForm from "@/components/careers/JobApplicationForm";
import ApplicationSuccess from "@/components/careers/ApplicationSuccess";

import type {
  Job,
  JobModalView,
} from "@/types/careers";

/* =========================================================
   PROPS
========================================================= */

type JobModalProps = {
  job: Job | null;
  view: JobModalView;
  onViewChange: (view: JobModalView) => void;
  onClose: () => void;
};

/* =========================================================
   COMPONENT
========================================================= */

export default function JobModal({
  job,
  view,
  onViewChange,
  onClose,
}: JobModalProps) {
  /* =========================================================
     DISABLE PAGE SCROLL WHEN MODAL IS OPEN
  ========================================================= */

  useEffect(() => {
    if (!job) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [job]);

  /* =========================================================
     CLOSE MODAL WITH ESCAPE KEY
  ========================================================= */

  useEffect(() => {
    if (!job) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [job, onClose]);

  /* =========================================================
     DO NOT RENDER WHEN NO JOB IS SELECTED
  ========================================================= */

  if (!job) {
    return null;
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <AnimatePresence>
      <motion.div
        key="job-modal-overlay"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          duration: 0.25,
        }}
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            onClose();
          }
        }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#071224]/65 p-3 backdrop-blur-md sm:p-5 lg:p-8"
      >
        {/* =====================================================
            MODAL CONTAINER
        ===================================================== */}

        <motion.div
          key="job-modal-container"
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
            scale: 0.98,
          }}
          transition={{
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1],
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="job-modal-title"
          className="relative flex h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-[24px] border border-white/20 bg-white shadow-[0_40px_120px_rgba(0,0,0,0.35)] sm:h-[92vh] sm:rounded-[30px]"
        >
          {/* ===================================================
              CLOSE BUTTON
          =================================================== */}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close job modal"
            className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-500 shadow-md backdrop-blur-xl transition-all duration-300 hover:rotate-90 hover:border-red-200 hover:bg-red-50 hover:text-red-500 sm:right-5 sm:top-5"
          >
            <X className="h-4 w-4" />
          </button>

          {/* ===================================================
              MODAL CONTENT

              AnimatePresence handles transitions between:

              details
                  ↓
              application
                  ↓
              success
          =================================================== */}

          <div className="relative flex min-h-0 flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              {/* =================================================
                  JOB DETAILS
              ================================================= */}

              {view === "details" && (
                <motion.div
                  key={`details-${job.id}`}
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -20,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex min-h-0 w-full flex-1 flex-col"
                >
                  <JobDetails
                    job={job}
                    onApply={() =>
                      onViewChange("application")
                    }
                    onClose={onClose}
                  />
                </motion.div>
              )}

              {/* =================================================
                  APPLICATION FORM
              ================================================= */}

              {view === "application" && (
                <motion.div
                  key={`application-${job.id}`}
                  initial={{
                    opacity: 0,
                    x: 25,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: 25,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex min-h-0 w-full flex-1 flex-col"
                >
                  <JobApplicationForm
                    job={job}
                    onBack={() =>
                      onViewChange("details")
                    }
                    onClose={onClose}
                    onSuccess={() =>
                      onViewChange("success")
                    }
                  />
                </motion.div>
              )}

              {/* =================================================
                  APPLICATION SUCCESS
              ================================================= */}

              {view === "success" && (
                <motion.div
                  key={`success-${job.id}`}
                  initial={{
                    opacity: 0,
                    scale: 0.97,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.97,
                  }}
                  transition={{
                    duration: 0.35,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex min-h-0 w-full flex-1 flex-col"
                >
                  <ApplicationSuccess
                    job={job}
                    onClose={onClose}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}