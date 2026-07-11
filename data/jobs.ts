import {
  BriefcaseBusiness,
  Building2,
  Calculator,
  Hammer,
  Headphones,
  MonitorSmartphone,
  Paintbrush,
  PanelsTopLeft,
  PhoneCall,
  Pipette,
  Ruler,
  Settings,
  Users,
  Wrench,
  Zap,
} from "lucide-react";

import type {
  CareerBenefit,
  Job,
} from "@/types/careers";

/* =========================================================
   CAREER BENEFITS
========================================================= */

export const careerBenefits: CareerBenefit[] = [
  {
    icon: Users,
    title: "Collaborative Culture",
    description:
      "Work with experienced professionals in a supportive and team-focused environment.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Career Growth",
    description:
      "Build your career through practical experience, responsibilities, and continuous learning.",
  },
  {
    icon: Settings,
    title: "Real-World Experience",
    description:
      "Work on residential, commercial, renovation, interiors, windows, doors, and metal projects.",
  },
  {
    icon: Building2,
    title: "Growing Organization",
    description:
      "Become part of a growing company delivering complete turnkey solutions across multiple divisions.",
  },
];

/* =========================================================
   JOB OPENINGS
========================================================= */

export const jobs: Job[] = [
  // KEEP ALL YOUR EXISTING 16 JOB OBJECTS HERE EXACTLY AS THEY ARE.
];

/* =========================================================
   CAREERS PAGE INFORMATION
========================================================= */

export const careersPageContent = {
  badge: "Build Your Career With Us",

  title: "Join Simmply Perfect Group",

  description:
    "Be part of a growing team delivering professional solutions across windows, doors, interiors, renovations, construction, metal works, sales, and digital operations.",

  openingsTitle: "Explore Current Opportunities",

  openingsDescription:
    "Discover career opportunities across our business divisions and find a role that matches your skills, experience, and ambitions.",

  applicationTitle: "Apply For This Position",

  applicationDescription:
    "Complete the application form and upload your latest resume. Our recruitment team will review your profile and contact shortlisted candidates.",

  emptyJobsMessage:
    "There are currently no vacancies matching your selection.",

  successTitle: "Application Submitted",

  successDescription:
    "Thank you for applying. Your application has been received successfully. Our recruitment team will review your profile and contact you if your experience matches our requirements.",
};