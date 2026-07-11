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

import type { CareerBenefit, Job } from "@/types/careers";

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
      "The Sales Executive will interact with potential customers, identify sales opportunities, explain company offerings, conduct follow-ups, and support the sales process from initial enquiry to successful closure.",

    skills: [
      "Communication Skills",
      "Customer Relationship Management",
      "Lead Generation",
      "Negotiation Skills",
      "Sales Follow-up",
      "Basic Computer Knowledge",
    ],

    responsibilities: [
      "Identify and connect with potential customers.",
      "Understand customer requirements and recommend suitable solutions.",
      "Generate leads through calls, references, field visits, and digital enquiries.",
      "Maintain regular follow-ups with prospective customers.",
      "Coordinate with internal teams for quotations and project requirements.",
      "Achieve assigned sales targets.",
    ],

    policy: [
      "Performance will be reviewed periodically.",
      "Employees must maintain professional communication with customers.",
      "Customer and company information must remain confidential.",
      "Attendance and leave policies must be followed.",
    ],

    terms: [
      "Salary will be based on experience and interview performance.",
      "The role may require local travel and customer meetings.",
      "Employment is subject to company policies and verification.",
    ],

    icon: BriefcaseBusiness,
  },

  {
    id: 2,
    title: "Area Sales Manager",
    department: "Sales & Management",
    location: "Hyderabad",
    type: "Full Time",
    experience: "3 - 8 Years",
    ctc: "Based on Experience",

    description:
      "We are hiring an experienced Area Sales Manager to lead sales operations, manage sales executives, develop business opportunities, and achieve regional revenue targets.",

    role:
      "The Area Sales Manager will manage sales activities within the assigned territory, monitor team performance, develop sales strategies, maintain customer relationships, and identify new business opportunities.",

    skills: [
      "Team Management",
      "Sales Strategy",
      "Business Development",
      "Negotiation",
      "Customer Relationship Management",
      "Target Planning",
    ],

    responsibilities: [
      "Manage and guide the sales team.",
      "Develop strategies to achieve regional sales targets.",
      "Monitor leads, enquiries, conversions, and performance.",
      "Build relationships with customers, builders, and contractors.",
      "Identify new markets and business opportunities.",
      "Prepare sales reports and performance updates.",
    ],

    policy: [
      "Managers are responsible for maintaining professional team conduct.",
      "Sales and customer data must remain confidential.",
      "Performance will be evaluated based on targets and team management.",
    ],

    terms: [
      "Compensation will depend on experience and performance.",
      "The position may require travel within assigned territories.",
      "Employment is subject to company policies.",
    ],

    icon: Users,
  },

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
      "The technician will work at customer and project locations to install UPVC windows and doors according to measurements, drawings, quality requirements, and safety standards.",

    skills: [
      "UPVC Installation",
      "Measurement",
      "Window Fitting",
      "Door Fitting",
      "Hardware Installation",
      "Site Safety",
    ],

    responsibilities: [
      "Install UPVC windows and doors.",
      "Verify measurements before installation.",
      "Fit frames, glass, hardware, and accessories.",
      "Ensure correct alignment and finishing.",
      "Identify and resolve installation issues.",
      "Maintain tools and follow safety procedures.",
    ],

    policy: [
      "Safety equipment must be used when required.",
      "Company tools must be handled responsibly.",
      "Professional behaviour must be maintained at customer locations.",
    ],

    terms: [
      "The role requires field and project-site work.",
      "Working hours may depend on project requirements.",
      "Salary will depend on skills and experience.",
    ],

    icon: PanelsTopLeft,
  },

  {
    id: 4,
    title: "Aluminium Installation Technician",
    department: "Windows & Doors",
    location: "Hyderabad",
    type: "Full Time",
    experience: "1 - 5 Years",
    ctc: "Based on Experience",

    description:
      "We are hiring Aluminium Installation Technicians with experience in installing aluminium windows, doors, partitions, frames, glass systems, and related hardware.",

    role:
      "The technician will perform accurate installation and fitting of aluminium systems while maintaining quality, safety, and finishing standards.",

    skills: [
      "Aluminium Fabrication",
      "Installation",
      "Measurement",
      "Glass Fitting",
      "Hardware Installation",
      "Site Work",
    ],

    responsibilities: [
      "Install aluminium windows, doors, and frames.",
      "Take and verify site measurements.",
      "Install glass and required accessories.",
      "Maintain proper alignment and finishing.",
      "Perform repairs and adjustments when required.",
      "Follow safety and quality standards.",
    ],

    policy: [
      "Employees must follow project safety procedures.",
      "Tools and equipment must be maintained properly.",
      "Professional conduct is required at all project locations.",
    ],

    terms: [
      "Field work is required.",
      "Project timings may vary based on site requirements.",
      "Compensation depends on experience and technical skills.",
    ],

    icon: Ruler,
  },

  {
    id: 5,
    title: "Plumber",
    department: "Renovation",
    location: "Hyderabad",
    type: "Full Time",
    experience: "1 - 6 Years",
    ctc: "Based on Experience",

    description:
      "We are looking for experienced Plumbers for residential and commercial installation, maintenance, repair, and renovation projects.",

    role:
      "The Plumber will install and repair water supply systems, drainage systems, sanitary fittings, pipelines, and related plumbing components.",

    skills: [
      "Plumbing Installation",
      "Pipeline Repair",
      "Sanitary Fittings",
      "Leak Detection",
      "Maintenance",
      "Troubleshooting",
    ],

    responsibilities: [
      "Install and repair plumbing systems.",
      "Identify leakage and drainage problems.",
      "Install sanitary and bathroom fittings.",
      "Perform maintenance and replacement work.",
      "Coordinate with renovation teams.",
      "Follow safety and quality standards.",
    ],

    policy: [
      "Work areas must be maintained safely and cleanly.",
      "Company tools must be handled responsibly.",
      "Customer property must be protected during work.",
    ],

    terms: [
      "Field work is required.",
      "Working hours depend on project requirements.",
      "Salary depends on experience and skill level.",
    ],

    icon: Pipette,
  },

  {
    id: 6,
    title: "Electrician",
    department: "Renovation",
    location: "Hyderabad",
    type: "Full Time",
    experience: "1 - 6 Years",
    ctc: "Based on Experience",

    description:
      "We are hiring Electricians for residential, commercial, interior, maintenance, and renovation projects.",

    role:
      "The Electrician will install, maintain, repair, and troubleshoot electrical systems, wiring, switches, lighting, panels, and electrical equipment.",

    skills: [
      "Electrical Wiring",
      "Troubleshooting",
      "Lighting Installation",
      "Electrical Panels",
      "Maintenance",
      "Safety Procedures",
    ],

    responsibilities: [
      "Install and repair electrical wiring.",
      "Install lights, switches, sockets, and equipment.",
      "Identify electrical faults.",
      "Perform maintenance and replacement work.",
      "Coordinate with project teams.",
      "Follow electrical safety standards.",
    ],

    policy: [
      "Electrical safety procedures must always be followed.",
      "Safety equipment must be used when necessary.",
      "Unauthorized electrical modifications are prohibited.",
    ],

    terms: [
      "The position requires project-site work.",
      "Working hours may depend on project schedules.",
      "Compensation depends on experience.",
    ],

    icon: Zap,
  },

  {
    id: 7,
    title: "Civil Engineer",
    department: "Construction & Renovation",
    location: "Hyderabad",
    type: "Full Time",
    experience: "1 - 6 Years",
    ctc: "Based on Experience",

    description:
      "We are looking for Civil Engineers to supervise construction, renovation, structural modification, and project execution activities.",

    role:
      "The Civil Engineer will coordinate project activities, supervise workers, monitor quality, manage materials, and ensure work is completed according to drawings and schedules.",

    skills: [
      "Site Supervision",
      "Construction Management",
      "AutoCAD Knowledge",
      "Quantity Estimation",
      "Project Coordination",
      "Quality Control",
    ],

    responsibilities: [
      "Supervise construction and renovation projects.",
      "Monitor project quality and progress.",
      "Coordinate workers and contractors.",
      "Verify drawings and measurements.",
      "Monitor materials and site requirements.",
      "Prepare project progress reports.",
    ],

    policy: [
      "Project documentation must be maintained accurately.",
      "Safety and quality standards must be enforced.",
      "Company and customer project information must remain confidential.",
    ],

    terms: [
      "The position requires regular project-site visits.",
      "Working hours may vary depending on project requirements.",
      "Salary depends on qualifications and experience.",
    ],

    icon: Building2,
  },

  {
    id: 8,
    title: "Mason Mistri",
    department: "Construction & Renovation",
    location: "Hyderabad",
    type: "Full Time",
    experience: "2 - 10 Years",
    ctc: "Based on Experience",

    description:
      "We are looking for skilled Mason Mistris for construction, renovation, brickwork, plastering, flooring, and civil modification projects.",

    role:
      "The Mason will execute masonry and civil works according to project measurements, drawings, instructions, and quality standards.",

    skills: [
      "Brickwork",
      "Plastering",
      "Flooring",
      "Concrete Work",
      "Renovation",
      "Measurement",
    ],

    responsibilities: [
      "Perform brickwork and masonry activities.",
      "Complete plastering and flooring work.",
      "Support structural and renovation projects.",
      "Maintain accurate measurements.",
      "Use materials responsibly.",
      "Follow safety procedures.",
    ],

    policy: [
      "Safety requirements must be followed.",
      "Materials must be used responsibly.",
      "Work areas must be maintained properly.",
    ],

    terms: [
      "The position requires project-site work.",
      "Project schedules determine working hours.",
      "Compensation depends on skills and experience.",
    ],

    icon: Hammer,
  },

  {
    id: 9,
    title: "Carpenter",
    department: "Interiors",
    location: "Hyderabad",
    type: "Full Time",
    experience: "2 - 8 Years",
    ctc: "Based on Experience",

    description:
      "We are hiring experienced Carpenters for furniture, modular interiors, doors, wardrobes, kitchens, and renovation projects.",

    role:
      "The Carpenter will execute woodwork, furniture installation, modular fittings, repairs, and custom interior requirements.",

    skills: [
      "Woodworking",
      "Furniture Installation",
      "Modular Interiors",
      "Measurement",
      "Finishing",
      "Repair Work",
    ],

    responsibilities: [
      "Execute furniture and interior woodwork.",
      "Install wardrobes, cabinets, and modular systems.",
      "Take accurate measurements.",
      "Perform repair and modification work.",
      "Maintain quality finishing.",
      "Follow project instructions and safety requirements.",
    ],

    policy: [
      "Tools must be maintained properly.",
      "Materials must be handled responsibly.",
      "Professional conduct is required at customer locations.",
    ],

    terms: [
      "The role requires workshop and site work.",
      "Working hours depend on projects.",
      "Salary depends on technical skills and experience.",
    ],

    icon: Hammer,
  },

  {
    id: 10,
    title: "Interior Designer",
    department: "Interiors",
    location: "Hyderabad",
    type: "Full Time",
    experience: "1 - 6 Years",
    ctc: "Based on Experience",

    description:
      "We are looking for creative Interior Designers to develop functional and attractive residential and commercial interior solutions.",

    role:
      "The Interior Designer will understand client requirements, prepare concepts, layouts, designs, material selections, and coordinate with project execution teams.",

    skills: [
      "AutoCAD",
      "SketchUp",
      "3D Visualization",
      "Space Planning",
      "Material Selection",
      "Client Communication",
    ],

    responsibilities: [
      "Understand customer design requirements.",
      "Prepare layouts and design concepts.",
      "Create 2D and 3D presentations.",
      "Recommend materials, colours, and finishes.",
      "Coordinate with project execution teams.",
      "Monitor design implementation.",
    ],

    policy: [
      "Client information and designs must remain confidential.",
      "Project files must be maintained systematically.",
      "Professional communication must be maintained.",
    ],

    terms: [
      "The role may require customer meetings and site visits.",
      "Salary depends on experience and portfolio.",
      "Employment is subject to company policies.",
    ],

    icon: Paintbrush,
  },

  {
    id: 11,
    title: "Welder",
    department: "Metal Works",
    location: "Hyderabad",
    type: "Full Time",
    experience: "1 - 6 Years",
    ctc: "Based on Experience",

    description:
      "We are hiring Welders for gates, grills, railings, structures, fabrication, repair, and custom metal work projects.",

    role:
      "The Welder will perform welding, cutting, assembly, installation, and repair activities according to project requirements.",

    skills: [
      "Arc Welding",
      "MIG Welding",
      "Metal Cutting",
      "Fabrication",
      "Measurement",
      "Safety Procedures",
    ],

    responsibilities: [
      "Perform welding and fabrication work.",
      "Cut and assemble metal components.",
      "Install gates, grills, railings, and structures.",
      "Perform repair work.",
      "Maintain welding equipment.",
      "Follow safety standards.",
    ],

    policy: [
      "Safety equipment must always be used.",
      "Tools and machinery must be operated responsibly.",
      "Work areas must remain safe and organized.",
    ],

    terms: [
      "The role requires workshop and field work.",
      "Working hours depend on project schedules.",
      "Salary depends on experience and welding skills.",
    ],

    icon: Wrench,
  },

  {
    id: 12,
    title: "Senior Welder / Metal Fabricator",
    department: "Metal Works",
    location: "Hyderabad",
    type: "Full Time",
    experience: "5 - 12 Years",
    ctc: "Based on Experience",

    description:
      "We are looking for experienced Senior Welders and Metal Fabricators to handle complex fabrication projects and supervise technical execution.",

    role:
      "The Senior Welder will execute advanced fabrication work, interpret drawings, supervise junior workers, and ensure quality and safety standards.",

    skills: [
      "Advanced Welding",
      "Metal Fabrication",
      "Drawing Interpretation",
      "Team Supervision",
      "Measurement",
      "Quality Control",
    ],

    responsibilities: [
      "Execute complex welding and fabrication work.",
      "Interpret project drawings.",
      "Supervise welding and fabrication teams.",
      "Monitor project quality.",
      "Manage tools and materials.",
      "Ensure safety procedures are followed.",
    ],

    policy: [
      "Supervisors must enforce safety requirements.",
      "Project quality standards must be maintained.",
      "Company tools and materials must be managed responsibly.",
    ],

    terms: [
      "The position requires workshop and site work.",
      "Compensation depends on experience and leadership skills.",
      "Working schedules depend on project requirements.",
    ],

    icon: Settings,
  },

  {
    id: 13,
    title: "Telecaller",
    department: "Sales Support",
    location: "Hyderabad",
    type: "Full Time",
    experience: "0 - 3 Years",
    ctc: "Based on Experience",

    description:
      "We are looking for Telecallers to communicate with customers, handle enquiries, generate leads, conduct follow-ups, and support sales operations.",

    role:
      "The Telecaller will contact potential customers, explain company services, maintain lead information, schedule follow-ups, and coordinate with the sales team.",

    skills: [
      "Communication Skills",
      "Telephone Etiquette",
      "Lead Follow-up",
      "Customer Support",
      "Basic Computer Knowledge",
      "Data Management",
    ],

    responsibilities: [
      "Call potential and existing customers.",
      "Explain company services.",
      "Record customer enquiries.",
      "Schedule follow-up calls.",
      "Coordinate leads with sales executives.",
      "Maintain customer records.",
    ],

    policy: [
      "Professional communication is mandatory.",
      "Customer information must remain confidential.",
      "Call and lead records must be maintained accurately.",
    ],

    terms: [
      "Salary depends on experience and communication skills.",
      "Performance may be evaluated using call and lead metrics.",
      "Employment is subject to company policies.",
    ],

    icon: PhoneCall,
  },

  {
    id: 14,
    title: "Accountant",
    department: "Finance",
    location: "Hyderabad",
    type: "Full Time",
    experience: "1 - 6 Years",
    ctc: "Based on Experience",

    description:
      "We are looking for an Accountant to manage financial records, invoices, payments, expenses, taxation documentation, and accounting activities.",

    role:
      "The Accountant will maintain accurate financial records, process transactions, prepare reports, manage invoices, and support statutory and taxation requirements.",

    skills: [
      "Accounting",
      "Tally",
      "GST Knowledge",
      "MS Excel",
      "Invoice Management",
      "Financial Reporting",
    ],

    responsibilities: [
      "Maintain financial records.",
      "Manage invoices and payment records.",
      "Track expenses and transactions.",
      "Support GST and taxation documentation.",
      "Prepare financial reports.",
      "Maintain accounting confidentiality.",
    ],

    policy: [
      "Financial information must remain strictly confidential.",
      "Records must be maintained accurately.",
      "Company accounting procedures must be followed.",
    ],

    terms: [
      "Salary depends on qualifications and experience.",
      "Employment may require document verification.",
      "Company policies apply to all financial responsibilities.",
    ],

    icon: Calculator,
  },

  {
    id: 15,
    title: "Graphics Designer",
    department: "Creative & Marketing",
    location: "Hyderabad",
    type: "Full Time",
    experience: "1 - 5 Years",
    ctc: "Based on Experience",

    description:
      "We are looking for a creative Graphics Designer to produce professional visual content for branding, marketing, social media, advertisements, and digital platforms.",

    role:
      "The Graphics Designer will create visual designs according to company branding requirements and coordinate with marketing and management teams.",

    skills: [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Canva",
      "Brand Design",
      "Social Media Design",
      "Creative Thinking",
    ],

    responsibilities: [
      "Create marketing and branding designs.",
      "Design social media creatives.",
      "Prepare advertisements and promotional materials.",
      "Maintain visual brand consistency.",
      "Coordinate with marketing teams.",
      "Organize and maintain design files.",
    ],

    policy: [
      "Company design assets must remain confidential.",
      "Copyright and licensing requirements must be followed.",
      "Project files must be maintained systematically.",
    ],

    terms: [
      "Salary depends on experience and portfolio.",
      "Candidates may be required to complete a design assessment.",
      "Employment is subject to company policies.",
    ],

    icon: MonitorSmartphone,
  },

  {
    id: 16,
    title: "Social Media Manager",
    department: "Marketing",
    location: "Hyderabad",
    type: "Full Time",
    experience: "1 - 6 Years",
    ctc: "Based on Experience",

    description:
      "We are hiring a Social Media Manager to plan, manage, publish, and optimize content across the company's digital and social media platforms.",

    role:
      "The Social Media Manager will create content strategies, manage social platforms, coordinate creative production, track performance, and support digital growth.",

    skills: [
      "Social Media Management",
      "Content Strategy",
      "Digital Marketing",
      "Analytics",
      "Copywriting",
      "Campaign Management",
    ],

    responsibilities: [
      "Manage company social media platforms.",
      "Create and maintain content calendars.",
      "Coordinate graphics and video content.",
      "Publish and optimize social media content.",
      "Track engagement and campaign performance.",
      "Support digital marketing activities.",
    ],

    policy: [
      "Company social accounts must be handled securely.",
      "Publishing requires compliance with brand guidelines.",
      "Company and customer information must remain confidential.",
    ],

    terms: [
      "Salary depends on experience and skills.",
      "Candidates may be required to present previous work.",
      "Employment is subject to company policies.",
    ],

    icon: Headphones,
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