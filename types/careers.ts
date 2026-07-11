import type { LucideIcon } from "lucide-react";

/* =========================================================
   JOB TYPE
========================================================= */

export type Job = {
  id: number;
  slug: string;

  title: string;
  department: string;

  location: string;
  type: string;
  experience: string;
  ctc: string;

  description: string;

  /*
   * Some job data uses "overview"
   * and some uses "role".
   */
  overview?: string;
  role?: string;

  skills: string[];
  responsibilities: string[];
  qualifications: string[];

  /*
   * Optional because some job entries may not contain
   * policy and terms.
   */
  policy?: string[];
  terms?: string[];

  icon: LucideIcon;
};

/* =========================================================
   CAREER BENEFIT TYPE
========================================================= */

export type CareerBenefit = {
  number?: string;

  title: string;
  description: string;

  icon: LucideIcon;
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
   COMPATIBILITY TYPE
========================================================= */

export type JobApplicationFormData =
  JobApplicationData;

/* =========================================================
   APPLICATION ERRORS TYPE
========================================================= */

export type JobApplicationErrors = Partial<
  Record<keyof JobApplicationData, string>
>;