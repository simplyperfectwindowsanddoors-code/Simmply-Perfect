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
    number: "01",
    icon: Users,
    title: "Collaborative Culture",
    description:
      "Work with experienced professionals in a supportive and team-focused environment.",
  },
  {
    number: "02",
    icon: BriefcaseBusiness,
    title: "Career Growth",
    description:
      "Build your career through practical experience, responsibilities, and continuous learning.",
  },
  {
    number: "03",
    icon: Settings,
    title: "Real-World Experience",
    description:
      "Work on residential, commercial, renovation, interiors, windows, doors, and metal projects.",
  },
  {
    number: "04",
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
  /* =======================================================
     01. SALES EXECUTIVE
  ======================================================= */

  {
    id: 1,

    title: "Sales Executive",

    department: "Sales",

    location: "Hyderabad",

    type: "Full Time",

    experience: "0 - 3 Years",

    ctc: "Based on Experience",

    description:
      "We are looking for an energetic and customer-focused Sales Executive to generate leads, understand customer requirements, present our products and services, and contribute to business growth.",

    role:
      "The Sales Executive will interact with potential customers, identify sales opportunities, explain company products and services, maintain customer relationships, and support the sales team in achieving business targets.",

    skills: [
      "Communication Skills",
      "Customer Relationship Management",
      "Sales Negotiation",
      "Lead Generation",
      "Product Presentation",
    ],

    responsibilities: [
      "Generate and follow up on sales leads.",
      "Understand customer requirements.",
      "Present company products and services.",
      "Maintain professional customer relationships.",
      "Coordinate with internal teams.",
      "Support the achievement of sales targets.",
    ],

    policy: [
      "Employees must maintain professional conduct.",
      "Customer information must remain confidential.",
      "Company policies and procedures must be followed.",
    ],

    terms: [
      "Salary will be based on experience and interview performance.",
      "Selected candidates must provide valid documents.",
      "Employment is subject to company policies.",
    ],

    icon: PhoneCall,
  },

  /* =======================================================
     02. AREA SALES MANAGER
  ======================================================= */

  {
    id: 2,

    title: "Area Sales Manager",

    department: "Sales & Management",

    location: "Hyderabad",

    type: "Full Time",

    experience: "3 - 8 Years",

    ctc: "Based on Experience",

    description:
      "We are hiring an experienced Area Sales Manager to lead sales operations, manage sales executives, develop business opportunities, and achieve regional sales targets.",

    role:
      "The Area Sales Manager will manage sales activities within the assigned region, develop strategies for business growth, supervise sales executives, build strong customer relationships, and ensure sales targets are achieved.",

    skills: [
      "Sales Management",
      "Team Leadership",
      "Business Development",
      "Customer Relationship Management",
      "Negotiation",
      "Strategic Planning",
    ],

    responsibilities: [
      "Develop and execute regional sales strategies.",
      "Manage and guide the sales team.",
      "Identify new business opportunities.",
      "Monitor sales performance and targets.",
      "Maintain relationships with key customers.",
      "Prepare sales reports and forecasts.",
    ],

    policy: [
      "Maintain confidentiality of company and customer information.",
      "Follow company sales policies and reporting procedures.",
      "Ensure professional conduct while representing the company.",
    ],

    terms: [
      "Compensation will depend on experience and interview performance.",
      "Travel may be required depending on business requirements.",
      "Employment is subject to company rules and policies.",
    ],

    icon: Users,
  },

  /* =======================================================
     03. UPVC INSTALLATION TECHNICIAN
  ======================================================= */

  {
    id: 3,

    title: "UPVC Installation Technician",

    department: "Windows & Doors",

    location: "Hyderabad",

    type: "Full Time",

    experience: "1 - 5 Years",

    ctc: "Based on Experience",

    description:
      "We are looking for skilled UPVC Installation Technicians for professional installation, fitting, alignment, adjustment, and servicing of UPVC windows and doors.",

    role:
      "The technician will install UPVC windows and doors at residential and commercial project locations while maintaining quality, safety, accuracy, and customer satisfaction.",

    skills: [
      "UPVC Installation",
      "Window Fitting",
      "Door Fitting",
      "Measurement",
      "Alignment",
      "Power Tools",
    ],

    responsibilities: [
      "Install UPVC windows and doors.",
      "Take accurate measurements at project locations.",
      "Ensure proper alignment and fitting.",
      "Use installation tools safely.",
      "Coordinate with supervisors and project teams.",
      "Maintain quality standards during installation.",
    ],

    policy: [
      "Safety equipment must be used at project locations.",
      "Installation standards must be followed.",
      "Company tools and equipment must be handled responsibly.",
    ],

    terms: [
      "Candidates may be assigned to different project locations.",
      "Salary will depend on experience and technical skills.",
      "Employment is subject to company policies.",
    ],

    icon: PanelsTopLeft,
  },

  /* =======================================================
     04. ALUMINIUM INSTALLATION TECHNICIAN
  ======================================================= */

  {
    id: 4,

    title: "Aluminium Installation Technician",

    department: "Windows & Doors",

    location: "Hyderabad",

    type: "Full Time",

    experience: "1 - 5 Years",

    ctc: "Based on Experience",

    description:
      "We are hiring Aluminium Installation Technicians with experience in installing aluminium windows, doors, partitions, frames, and related architectural systems.",

    role:
      "The technician will perform aluminium installation work at residential and commercial projects while ensuring accurate measurements, alignment, quality, and safety.",

    skills: [
      "Aluminium Installation",
      "Window Installation",
      "Door Installation",
      "Measurement",
      "Fabrication Knowledge",
      "Power Tools",
    ],

    responsibilities: [
      "Install aluminium windows and doors.",
      "Perform accurate measurements and fitting.",
      "Ensure proper alignment of installed products.",
      "Coordinate with project supervisors.",
      "Follow installation and safety procedures.",
      "Maintain company quality standards.",
    ],

    policy: [
      "Safety procedures must be followed.",
      "Company tools must be maintained properly.",
      "Professional conduct is required at customer locations.",
    ],

    terms: [
      "Project-site travel may be required.",
      "Salary depends on technical experience.",
      "Employment is governed by company policies.",
    ],

    icon: Ruler,
  },

  /* =======================================================
     05. SITE SUPERVISOR
  ======================================================= */

  {
    id: 5,

    title: "Site Supervisor",

    department: "Projects",

    location: "Hyderabad",

    type: "Full Time",

    experience: "2 - 6 Years",

    ctc: "Based on Experience",

    description:
      "We are looking for an experienced Site Supervisor to coordinate project activities, supervise workers, maintain quality standards, and ensure timely completion of work.",

    role:
      "The Site Supervisor will oversee daily site activities, coordinate teams and contractors, monitor project progress, maintain safety standards, and report project updates to management.",

    skills: [
      "Site Supervision",
      "Project Coordination",
      "Team Management",
      "Quality Control",
      "Construction Knowledge",
      "Communication",
    ],

    responsibilities: [
      "Supervise daily project activities.",
      "Coordinate workers and contractors.",
      "Monitor project progress.",
      "Ensure quality and safety standards.",
      "Maintain site documentation.",
      "Report project updates to management.",
    ],

    policy: [
      "Safety regulations must be enforced.",
      "Project information must remain confidential.",
      "Professional conduct is required.",
    ],

    terms: [
      "Travel between project sites may be required.",
      "Working hours may vary according to project requirements.",
      "Salary depends on experience.",
    ],

    icon: Building2,
  },

  /* =======================================================
     06. INTERIOR DESIGNER
  ======================================================= */

  {
    id: 6,

    title: "Interior Designer",

    department: "Interiors",

    location: "Hyderabad",

    type: "Full Time",

    experience: "1 - 5 Years",

    ctc: "Based on Experience",

    description:
      "We are seeking a creative Interior Designer to develop functional and visually appealing interior concepts for residential and commercial projects.",

    role:
      "The Interior Designer will understand client requirements, create design concepts, prepare layouts, select materials, coordinate project execution, and support the delivery of professional interior solutions.",

    skills: [
      "Interior Design",
      "Space Planning",
      "AutoCAD",
      "3D Design",
      "Material Selection",
      "Client Communication",
    ],

    responsibilities: [
      "Understand client requirements.",
      "Create interior design concepts.",
      "Prepare layouts and presentations.",
      "Select materials and finishes.",
      "Coordinate with project teams.",
      "Support project execution.",
    ],

    policy: [
      "Client and project information must remain confidential.",
      "Design files must follow company standards.",
      "Professional communication is required.",
    ],

    terms: [
      "Candidates may need to visit project locations.",
      "Salary depends on experience and portfolio.",
      "Employment is subject to company policies.",
    ],

    icon: Paintbrush,
  },

  /* =======================================================
     07. CIVIL ENGINEER
  ======================================================= */

  {
    id: 7,

    title: "Civil Engineer",

    department: "Engineering & Projects",

    location: "Hyderabad",

    type: "Full Time",

    experience: "2 - 6 Years",

    ctc: "Based on Experience",

    description:
      "We are hiring a Civil Engineer to support construction, renovation, site execution, quality control, estimation, and project coordination activities.",

    role:
      "The Civil Engineer will coordinate project execution, inspect construction activities, monitor quality standards, review measurements, support estimation, and ensure projects progress according to requirements.",

    skills: [
      "Civil Engineering",
      "Site Execution",
      "Quality Control",
      "Estimation",
      "Project Coordination",
      "Construction Management",
    ],

    responsibilities: [
      "Monitor construction activities.",
      "Coordinate with site teams.",
      "Verify measurements and work quality.",
      "Support project estimation.",
      "Maintain project documentation.",
      "Ensure compliance with project specifications.",
    ],

    policy: [
      "Safety and quality procedures must be followed.",
      "Project information must remain confidential.",
      "Accurate reporting is required.",
    ],

    terms: [
      "Travel to project locations may be required.",
      "Salary depends on experience.",
      "Employment is subject to company policies.",
    ],

    icon: Hammer,
  },

  /* =======================================================
     08. ELECTRICIAN
  ======================================================= */

  {
    id: 8,

    title: "Electrician",

    department: "Technical Services",

    location: "Hyderabad",

    type: "Full Time",

    experience: "1 - 5 Years",

    ctc: "Based on Experience",

    description:
      "We are looking for experienced Electricians to perform electrical installation, maintenance, troubleshooting, and repair work across residential and commercial projects.",

    role:
      "The Electrician will install electrical systems, diagnose faults, perform repairs, follow electrical drawings, and maintain safety and quality standards.",

    skills: [
      "Electrical Installation",
      "Troubleshooting",
      "Electrical Maintenance",
      "Wiring",
      "Safety Procedures",
      "Technical Knowledge",
    ],

    responsibilities: [
      "Install electrical systems.",
      "Perform wiring and maintenance work.",
      "Diagnose and repair electrical faults.",
      "Follow project specifications.",
      "Maintain safety standards.",
      "Coordinate with project supervisors.",
    ],

    policy: [
      "Electrical safety procedures must be followed.",
      "Safety equipment must be used.",
      "Company tools must be maintained properly.",
    ],

    terms: [
      "Project-site travel may be required.",
      "Salary depends on technical experience.",
      "Employment is subject to company policies.",
    ],

    icon: Zap,
  },

  /* =======================================================
     09. PLUMBER
  ======================================================= */

  {
    id: 9,

    title: "Plumber",

    department: "Technical Services",

    location: "Hyderabad",

    type: "Full Time",

    experience: "1 - 5 Years",

    ctc: "Based on Experience",

    description:
      "We are hiring experienced Plumbers for installation, maintenance, troubleshooting, and repair of plumbing systems across residential and commercial projects.",

    role:
      "The Plumber will install and maintain water supply, drainage, sanitary, and plumbing systems while ensuring quality and safety standards.",

    skills: [
      "Plumbing Installation",
      "Pipe Fitting",
      "Maintenance",
      "Troubleshooting",
      "Technical Skills",
      "Safety Procedures",
    ],

    responsibilities: [
      "Install plumbing systems.",
      "Repair plumbing faults.",
      "Perform maintenance activities.",
      "Inspect plumbing systems.",
      "Coordinate with project teams.",
      "Follow safety standards.",
    ],

    policy: [
      "Safety procedures must be followed.",
      "Company equipment must be handled responsibly.",
      "Professional conduct is required.",
    ],

    terms: [
      "Project travel may be required.",
      "Salary depends on experience.",
      "Employment is subject to company policies.",
    ],

    icon: Pipette,
  },

  /* =======================================================
     10. CARPENTER
  ======================================================= */

  {
    id: 10,

    title: "Carpenter",

    department: "Interiors & Renovation",

    location: "Hyderabad",

    type: "Full Time",

    experience: "2 - 6 Years",

    ctc: "Based on Experience",

    description:
      "We are looking for skilled Carpenters for furniture installation, interior works, renovation projects, woodwork, and custom fabrication requirements.",

    role:
      "The Carpenter will perform professional carpentry and installation work according to project drawings, measurements, specifications, and quality standards.",

    skills: [
      "Carpentry",
      "Furniture Installation",
      "Woodworking",
      "Measurement",
      "Power Tools",
      "Interior Works",
    ],

    responsibilities: [
      "Perform carpentry work.",
      "Install furniture and interior elements.",
      "Take accurate measurements.",
      "Use tools and equipment safely.",
      "Coordinate with site supervisors.",
      "Maintain quality standards.",
    ],

    policy: [
      "Safety procedures must be followed.",
      "Company tools must be maintained.",
      "Project materials must be handled responsibly.",
    ],

    terms: [
      "Project-site travel may be required.",
      "Salary depends on experience.",
      "Employment is subject to company policies.",
    ],

    icon: Wrench,
  },

  /* =======================================================
     11. PROJECT ESTIMATOR
  ======================================================= */

  {
    id: 11,

    title: "Project Estimator",

    department: "Projects & Estimation",

    location: "Hyderabad",

    type: "Full Time",

    experience: "2 - 6 Years",

    ctc: "Based on Experience",

    description:
      "We are hiring a Project Estimator to prepare accurate project estimates, analyse requirements, calculate material quantities, and support project planning.",

    role:
      "The Project Estimator will review project requirements, calculate costs, prepare estimates, coordinate with suppliers and project teams, and maintain estimation documentation.",

    skills: [
      "Project Estimation",
      "Cost Analysis",
      "BOQ Preparation",
      "Material Calculation",
      "Documentation",
      "Microsoft Excel",
    ],

    responsibilities: [
      "Prepare project estimates.",
      "Calculate material requirements.",
      "Analyse project costs.",
      "Prepare BOQ documents.",
      "Coordinate with suppliers.",
      "Maintain estimation records.",
    ],

    policy: [
      "Financial information must remain confidential.",
      "Estimates must be accurate and documented.",
      "Company procedures must be followed.",
    ],

    terms: [
      "Salary depends on experience.",
      "Candidates may need to visit project sites.",
      "Employment is subject to company policies.",
    ],

    icon: Calculator,
  },

  /* =======================================================
     12. CUSTOMER SUPPORT EXECUTIVE
  ======================================================= */

  {
    id: 12,

    title: "Customer Support Executive",

    department: "Customer Support",

    location: "Hyderabad",

    type: "Full Time",

    experience: "0 - 3 Years",

    ctc: "Based on Experience",

    description:
      "We are looking for a professional Customer Support Executive to assist customers, handle enquiries, coordinate service requests, and maintain customer satisfaction.",

    role:
      "The Customer Support Executive will communicate with customers, understand enquiries and complaints, coordinate with internal teams, maintain records, and ensure timely resolution.",

    skills: [
      "Customer Service",
      "Communication",
      "Problem Solving",
      "CRM",
      "Email Communication",
      "Coordination",
    ],

    responsibilities: [
      "Handle customer enquiries.",
      "Record customer service requests.",
      "Coordinate with internal teams.",
      "Follow up with customers.",
      "Maintain customer records.",
      "Support customer satisfaction.",
    ],

    policy: [
      "Customer information must remain confidential.",
      "Professional communication is required.",
      "Company support procedures must be followed.",
    ],

    terms: [
      "Salary depends on experience.",
      "Working schedules may vary according to business requirements.",
      "Employment is subject to company policies.",
    ],

    icon: Headphones,
  },

  /* =======================================================
     13. DIGITAL MARKETING EXECUTIVE
  ======================================================= */

  {
    id: 13,

    title: "Digital Marketing Executive",

    department: "Marketing",

    location: "Hyderabad",

    type: "Full Time",

    experience: "1 - 4 Years",

    ctc: "Based on Experience",

    description:
      "We are looking for a creative Digital Marketing Executive to manage online campaigns, social media, content, lead generation, and digital brand growth.",

    role:
      "The Digital Marketing Executive will plan and execute digital campaigns, manage social platforms, create content strategies, analyse performance, and support lead generation.",

    skills: [
      "Digital Marketing",
      "Social Media Marketing",
      "Content Marketing",
      "SEO",
      "Lead Generation",
      "Analytics",
    ],

    responsibilities: [
      "Manage social media platforms.",
      "Plan digital marketing campaigns.",
      "Create and coordinate marketing content.",
      "Monitor campaign performance.",
      "Support online lead generation.",
      "Prepare marketing reports.",
    ],

    policy: [
      "Company account credentials must remain confidential.",
      "Published content must follow brand standards.",
      "Marketing information must be accurate.",
    ],

    terms: [
      "Salary depends on experience and skills.",
      "Candidates may be required to manage multiple brands.",
      "Employment is subject to company policies.",
    ],

    icon: MonitorSmartphone,
  },

  /* =======================================================
     14. HR EXECUTIVE
  ======================================================= */

  {
    id: 14,

    title: "HR Executive",

    department: "Human Resources",

    location: "Hyderabad",

    type: "Full Time",

    experience: "1 - 5 Years",

    ctc: "Based on Experience",

    description:
      "We are hiring an HR Executive to support recruitment, employee documentation, attendance, onboarding, HR operations, and employee coordination.",

    role:
      "The HR Executive will coordinate recruitment activities, maintain employee records, support onboarding, manage HR documentation, and assist with daily human resource operations.",

    skills: [
      "Recruitment",
      "HR Operations",
      "Employee Management",
      "Documentation",
      "Communication",
      "Microsoft Office",
    ],

    responsibilities: [
      "Coordinate recruitment activities.",
      "Maintain employee records.",
      "Support employee onboarding.",
      "Manage HR documentation.",
      "Assist with attendance records.",
      "Support daily HR operations.",
    ],

    policy: [
      "Employee information must remain confidential.",
      "HR documentation must be accurate.",
      "Company HR procedures must be followed.",
    ],

    terms: [
      "Salary depends on experience.",
      "Candidates must maintain confidentiality.",
      "Employment is subject to company policies.",
    ],

    icon: Users,
  },

  /* =======================================================
     15. ACCOUNTANT
  ======================================================= */

  {
    id: 15,

    title: "Accountant",

    department: "Finance & Accounts",

    location: "Hyderabad",

    type: "Full Time",

    experience: "1 - 5 Years",

    ctc: "Based on Experience",

    description:
      "We are looking for an Accountant to manage financial records, invoices, payments, expenses, reconciliations, and accounting documentation.",

    role:
      "The Accountant will maintain financial records, prepare invoices, record transactions, reconcile accounts, support financial reporting, and ensure accounting accuracy.",

    skills: [
      "Accounting",
      "Tally",
      "Microsoft Excel",
      "Financial Reporting",
      "Invoice Management",
      "Account Reconciliation",
    ],

    responsibilities: [
      "Maintain financial records.",
      "Prepare invoices and payment records.",
      "Record business transactions.",
      "Perform account reconciliation.",
      "Maintain expense records.",
      "Support financial reporting.",
    ],

    policy: [
      "Financial information must remain confidential.",
      "Records must be accurate.",
      "Company accounting procedures must be followed.",
    ],

    terms: [
      "Salary depends on experience.",
      "Candidates must maintain financial confidentiality.",
      "Employment is subject to company policies.",
    ],

    icon: Calculator,
  },

  /* =======================================================
     16. OPERATIONS EXECUTIVE
  ======================================================= */

  {
    id: 16,

    title: "Operations Executive",

    department: "Operations",

    location: "Hyderabad",

    type: "Full Time",

    experience: "1 - 5 Years",

    ctc: "Based on Experience",

    description:
      "We are hiring an Operations Executive to coordinate daily business activities, project operations, internal teams, documentation, and customer requirements.",

    role:
      "The Operations Executive will support daily operational activities, coordinate between departments, maintain records, track tasks, and help ensure efficient business operations.",

    skills: [
      "Operations Management",
      "Team Coordination",
      "Documentation",
      "Communication",
      "Task Management",
      "Microsoft Office",
    ],

    responsibilities: [
      "Coordinate daily business operations.",
      "Communicate with internal teams.",
      "Track operational tasks.",
      "Maintain business documentation.",
      "Support project coordination.",
      "Prepare operational reports.",
    ],

    policy: [
      "Company information must remain confidential.",
      "Operational procedures must be followed.",
      "Professional communication is required.",
    ],

    terms: [
      "Salary depends on experience.",
      "Working responsibilities may vary according to business requirements.",
      "Employment is subject to company policies.",
    ],

    icon: Settings,
  },
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