"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  Clock3,
  FileCheck2,
  GraduationCap,
  IndianRupee,
  MapPin,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

import type { Job } from "@/types/careers";

/* =========================================================
   PROPS
========================================================= */

type JobDetailsProps = {
  job: Job;
  onApply: () => void;
  onClose: () => void;
};

/* =========================================================
   ANIMATION
========================================================= */

const sectionAnimation = {
  initial: {
    opacity: 0,
    y: 18,
  },

  animate: {
    opacity: 1,
    y: 0,
  },

  transition: {
    duration: 0.5,
    ease: [0.16, 1, 0.3, 1] as const,
  },
};

/* =========================================================
   COMPONENT
========================================================= */

export default function JobDetails({
  job,
  onApply,
  onClose,
}: JobDetailsProps) {
  /*
   * SAFE FALLBACK VALUES
   *
   * These prevent:
   *
   * Cannot read properties of undefined (reading 'map')
   *
   * even when some properties are missing from jobs.ts.
   */

  const responsibilities = Array.isArray(job.responsibilities)
    ? job.responsibilities
    : [];

  const skills = Array.isArray(job.skills)
    ? job.skills
    : [];

  const qualifications = Array.isArray(job.qualifications)
    ? job.qualifications
    : [];

  const policy = Array.isArray(job.policy)
    ? job.policy
    : [];

  const terms = Array.isArray(job.terms)
    ? job.terms
    : [];

  /*
   * SAFE ICON FALLBACK
   *
   * If a job does not contain an icon,
   * BriefcaseBusiness will be displayed.
   */

  const Icon = job.icon ?? BriefcaseBusiness;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* =====================================================
          SCROLLABLE CONTENT
      ===================================================== */}

      <div className="flex-1 overflow-y-auto overscroll-contain">
        {/* ===================================================
            HERO
        =================================================== */}

        <div className="relative overflow-hidden border-b border-slate-200 bg-[#F8FAFC] px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
          {/* BACKGROUND DECORATION */}

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-blue-100/70 blur-[90px]" />

            <div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-white blur-[80px]" />
          </div>

          <motion.div
            {...sectionAnimation}
            className="relative"
          >
            {/* ICON + DEPARTMENT */}

            <div className="flex flex-wrap items-start justify-between gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-white text-[#0A2E6F] shadow-sm sm:h-16 sm:w-16">
                <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>

              <span className="rounded-full border border-blue-100 bg-white px-4 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#0A2E6F] shadow-sm sm:text-[10px]">
                {job.department || "Career Opportunity"}
              </span>
            </div>

            {/* TITLE */}

            <div className="mt-7 max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-7 bg-[#0A2E6F]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0A2E6F]">
                  Career Opportunity
                </span>
              </div>

              <h2
                id="job-modal-title"
                className="mt-4 text-3xl font-bold leading-tight tracking-[-0.04em] text-[#071224] sm:text-4xl"
              >
                {job.title}
              </h2>

              {job.description && (
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-[15px]">
                  {job.description}
                </p>
              )}
            </div>

            {/* JOB META */}

            <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
              <JobMeta
                icon={MapPin}
                label="Location"
                value={job.location || "Not specified"}
              />

              <JobMeta
                icon={Clock3}
                label="Employment"
                value={job.type || "Not specified"}
              />

              <JobMeta
                icon={BriefcaseBusiness}
                label="Experience"
                value={job.experience || "Not specified"}
              />

              <JobMeta
                icon={IndianRupee}
                label="Compensation"
                value={job.ctc || "As per company standards"}
              />
            </div>
          </motion.div>
        </div>

        {/* ===================================================
            MAIN CONTENT
        =================================================== */}

        <div className="px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
          <div className="mx-auto max-w-5xl">
            {/* ===============================================
                JOB OVERVIEW
            =============================================== */}

            {job.overview && (
              <motion.section
                {...sectionAnimation}
                transition={{
                  ...sectionAnimation.transition,
                  delay: 0.05,
                }}
              >
                <SectionHeader
                  icon={Sparkles}
                  eyebrow="About The Opportunity"
                  title="Role Overview"
                />

                <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                  <p className="text-sm leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
                    {job.overview}
                  </p>
                </div>
              </motion.section>
            )}

            {/* ===============================================
                RESPONSIBILITIES + SKILLS
            =============================================== */}

            {(responsibilities.length > 0 ||
              skills.length > 0) && (
              <div
                className={`grid gap-6 ${
                  job.overview ? "mt-8" : ""
                } lg:grid-cols-2`}
              >
                {/* RESPONSIBILITIES */}

                {responsibilities.length > 0 && (
                  <motion.section
                    {...sectionAnimation}
                    transition={{
                      ...sectionAnimation.transition,
                      delay: 0.1,
                    }}
                    className="rounded-[24px] border border-slate-200 bg-white p-5 sm:p-6"
                  >
                    <SectionHeader
                      icon={Target}
                      eyebrow="What You Will Do"
                      title="Key Responsibilities"
                    />

                    <div className="mt-6 space-y-4">
                      {responsibilities.map(
                        (item, index) => (
                          <DetailListItem
                            key={`${item}-${index}`}
                            text={item}
                            index={index}
                          />
                        ),
                      )}
                    </div>
                  </motion.section>
                )}

                {/* SKILLS */}

                {skills.length > 0 && (
                  <motion.section
                    {...sectionAnimation}
                    transition={{
                      ...sectionAnimation.transition,
                      delay: 0.15,
                    }}
                    className="rounded-[24px] border border-slate-200 bg-[#F8FAFC] p-5 sm:p-6"
                  >
                    <SectionHeader
                      icon={BriefcaseBusiness}
                      eyebrow="What We Look For"
                      title="Required Skills"
                    />

                    <div className="mt-6 flex flex-wrap gap-2.5">
                      {skills.map((skill, index) => (
                        <motion.span
                          key={`${skill}-${index}`}
                          initial={{
                            opacity: 0,
                            scale: 0.94,
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                          }}
                          transition={{
                            duration: 0.35,
                            delay:
                              0.15 + index * 0.03,
                          }}
                          className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 shadow-sm transition-all duration-300 hover:border-[#0A2E6F]/30 hover:text-[#0A2E6F]"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.section>
                )}
              </div>
            )}

            {/* ===============================================
                QUALIFICATIONS
            =============================================== */}

            {qualifications.length > 0 && (
              <motion.section
                {...sectionAnimation}
                transition={{
                  ...sectionAnimation.transition,
                  delay: 0.2,
                }}
                className="mt-6 rounded-[24px] border border-slate-200 bg-white p-5 sm:p-6"
              >
                <SectionHeader
                  icon={GraduationCap}
                  eyebrow="Eligibility"
                  title="Qualifications"
                />

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {qualifications.map(
                    (item, index) => (
                      <DetailListItem
                        key={`${item}-${index}`}
                        text={item}
                        index={index}
                      />
                    ),
                  )}
                </div>
              </motion.section>
            )}

            {/* ===============================================
                POLICY + TERMS
            =============================================== */}

            {(policy.length > 0 ||
              terms.length > 0) && (
              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                {/* POLICY */}

                {policy.length > 0 && (
                  <motion.section
                    {...sectionAnimation}
                    transition={{
                      ...sectionAnimation.transition,
                      delay: 0.25,
                    }}
                    className="rounded-[24px] border border-blue-100 bg-blue-50/40 p-5 sm:p-6"
                  >
                    <SectionHeader
                      icon={ShieldCheck}
                      eyebrow="Company Guidelines"
                      title="Employment Policy"
                    />

                    <div className="mt-6 space-y-4">
                      {policy.map((item, index) => (
                        <DetailListItem
                          key={`${item}-${index}`}
                          text={item}
                          index={index}
                        />
                      ))}
                    </div>
                  </motion.section>
                )}

                {/* TERMS */}

                {terms.length > 0 && (
                  <motion.section
                    {...sectionAnimation}
                    transition={{
                      ...sectionAnimation.transition,
                      delay: 0.3,
                    }}
                    className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 sm:p-6"
                  >
                    <SectionHeader
                      icon={FileCheck2}
                      eyebrow="Before You Apply"
                      title="Terms & Conditions"
                    />

                    <div className="mt-6 space-y-4">
                      {terms.map((item, index) => (
                        <DetailListItem
                          key={`${item}-${index}`}
                          text={item}
                          index={index}
                        />
                      ))}
                    </div>
                  </motion.section>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          STICKY FOOTER
      ===================================================== */}

      <div className="shrink-0 border-t border-slate-200 bg-white/95 px-5 py-4 backdrop-blur-xl sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-[#071224]">
              Interested in this opportunity?
            </p>

            <p className="mt-0.5 text-xs text-slate-500">
              Submit your application and our team will
              review your profile.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:flex">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-12 min-w-[120px] items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-bold text-slate-700 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50"
            >
              Close
            </button>

            <button
              type="button"
              onClick={onApply}
              className="group inline-flex h-12 min-w-[150px] items-center justify-center gap-2 rounded-full bg-[#0A2E6F] px-6 text-sm font-bold text-white shadow-[0_12px_30px_rgba(10,46,111,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#08265d] hover:shadow-[0_16px_35px_rgba(10,46,111,0.3)]"
            >
              Apply for Role

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   JOB META COMPONENT
========================================================= */

type JobMetaProps = {
  icon: LucideIcon;
  label: string;
  value: string;
};

function JobMeta({
  icon: Icon,
  label,
  value,
}: JobMetaProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm sm:p-4">
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 shrink-0 text-[#0A2E6F]" />

        <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
          {label}
        </span>
      </div>

      <p className="mt-2 truncate text-xs font-bold text-[#071224] sm:text-sm">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   SECTION HEADER COMPONENT
========================================================= */

type SectionHeaderProps = {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
};

function SectionHeader({
  icon: Icon,
  eyebrow,
  title,
}: SectionHeaderProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0A2E6F]">
        <Icon className="h-4 w-4" />
      </div>

      <div>
        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#0A2E6F]">
          {eyebrow}
        </p>

        <h3 className="mt-1 text-lg font-bold tracking-[-0.02em] text-[#071224] sm:text-xl">
          {title}
        </h3>
      </div>
    </div>
  );
}

/* =========================================================
   DETAIL LIST ITEM COMPONENT
========================================================= */

type DetailListItemProps = {
  text: string;
  index: number;
};

function DetailListItem({
  text,
  index,
}: DetailListItemProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -8,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.35,
        delay: index * 0.035,
      }}
      className="flex items-start gap-3"
    >
      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50">
        <Check className="h-3 w-3 text-[#0A2E6F]" />
      </div>

      <p className="text-sm leading-6 text-slate-600">
        {text}
      </p>
    </motion.div>
  );
}