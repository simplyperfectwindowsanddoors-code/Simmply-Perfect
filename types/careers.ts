import type { LucideIcon } from "lucide-react";

/* =========================================================
   JOB TYPE
========================================================= */

export type Job = {
  id: number;

  title: string;
  department: string;

  location: string;
  type: string;
  experience: string;
  ctc: string;

  description: string;
  role: string;

  skills: string[];
  responsibilities: string[];
  policy: string[];
  terms: string[];

  icon: LucideIcon;
};

/* =========================================================
   CAREER BENEFIT TYPE
========================================================= */

export type CareerBenefit = {
  title: string;
  description: string;
  icon: LucideIcon;

  /*
   * Optional compatibility field.
   *
   * This allows components to use benefit.number
   * without requiring it inside data/jobs.ts.
   */
  number?: string;
};

/* =========================================================
   JOB MODAL VIEW TYPE
========================================================= */

export type JobModalView =
  | "details"
  | "application"
  | "success";

/* =========================================================
   JOB APPLICATION DATA TYPE
========================================================= */

export type JobApplicationData = {
  firstName: string;
  lastName: string;

  email: string;
  phone: string;

  age: string;
  gender: string;

  role: string;

  experience: string;

  currentCtc: string;
  expectedCtc: string;

  noticePeriod: string;
  currentLocation: string;

  description: string;

  resume: File | null;
};

/* =========================================================
   JOB APPLICATION FORM DATA

   Compatibility alias for components that import:

   JobApplicationFormData

   instead of:

   JobApplicationData
========================================================= */

export type JobApplicationFormData = JobApplicationData;

/* =========================================================
   JOB APPLICATION ERRORS
========================================================= */

export type JobApplicationErrors = Partial<
  Record<keyof JobApplicationData, string>
>;