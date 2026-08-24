/**
 * ============================================================
 * SIMMPLY PERFECT GROUP — AUTOMATED SEO ENGINE
 * ============================================================
 *
 * File:
 *   scripts/automated-seo.mjs
 *
 * Commands:
 *   npm run seo
 *   npm run seo:check
 *   npm run seo:fix
 *
 * IMPORTANT:
 * This script is designed NOT to modify:
 *   - React components
 *   - UI
 *   - CSS
 *   - booking functionality
 *   - APIs
 *   - forms
 *   - services/pricing
 *   - existing business data
 *
 * It generates SEO support files and a detailed audit report.
 *
 * ============================================================
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const SITE_URL = "https://simmplyperfect.com";
const SITE_NAME = "Simmply Perfect Group";

const PUBLIC_DIR = path.join(ROOT, "public");
const APP_DIR = path.join(ROOT, "app");
const COMPONENTS_DIR = path.join(ROOT, "components");

const SEO_DIR = path.join(PUBLIC_DIR, "seo");

const REPORT_FILE = path.join(ROOT, "SEO-REPORT.md");
const JSON_REPORT_FILE = path.join(ROOT, "seo-report.json");

const GENERATED_SITEMAP = path.join(SEO_DIR, "generated-sitemap.xml");
const GENERATED_ROBOTS = path.join(SEO_DIR, "generated-robots.txt");
const KEYWORDS_FILE = path.join(SEO_DIR, "keywords.json");
const SEO_CONFIG_FILE = path.join(SEO_DIR, "seo-config.json");

const args = process.argv.slice(2);

const CHECK_ONLY =
  args.includes("--check") ||
  args.includes("--audit") ||
  args.length === 0;

const FIX_MODE = args.includes("--fix");

const COLORS = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  gray: "\x1b[90m",
};

function log(message = "") {
  console.log(message);
}

function success(message) {
  console.log(`${COLORS.green}✓${COLORS.reset} ${message}`);
}

function warning(message) {
  console.log(`${COLORS.yellow}⚠${COLORS.reset} ${message}`);
}

function error(message) {
  console.log(`${COLORS.red}✗${COLORS.reset} ${message}`);
}

function info(message) {
  console.log(`${COLORS.cyan}ℹ${COLORS.reset} ${message}`);
}

function heading(message) {
  console.log(`\n${COLORS.bold}${COLORS.blue}${message}${COLORS.reset}`);
  console.log("─".repeat(message.length));
}

function ensureDirectory(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

function exists(file) {
  return fs.existsSync(file);
}

function readText(file) {
  try {
    return fs.readFileSync(file, "utf8");
  } catch {
    return "";
  }
}

function writeFileSafe(file, content) {
  ensureDirectory(path.dirname(file));
  fs.writeFileSync(file, content, "utf8");
}

function relativeProjectPath(file) {
  return path.relative(ROOT, file).replaceAll("\\", "/");
}

/**
 * ------------------------------------------------------------
 * PAGE DISCOVERY
 * ------------------------------------------------------------
 */

const EXCLUDED_ROUTE_NAMES = new Set([
  "api",
  "_not-found",
  "_document",
  "_error",
  "loading",
  "error",
  "not-found",
  "robots.txt",
  "sitemap.xml",
]);

function routeFromAppFile(file) {
  const relative = path.relative(APP_DIR, file).replaceAll("\\", "/");

  const parts = relative.split("/");

  if (!parts.length) {
    return null;
  }

  const fileName = parts.pop();

  if (!/^page\.(tsx|ts|jsx|js)$/.test(fileName)) {
    return null;
  }

  const routeParts = [];

  for (const part of parts) {
    if (!part) continue;

    // Ignore Next.js route groups:
    // app/(marketing)/about/page.tsx -> /about
    if (part.startsWith("(") && part.endsWith(")")) {
      continue;
    }

    // Ignore dynamic segments from automatic sitemap generation.
    if (
      part.startsWith("[") ||
      part.startsWith("...")
    ) {
      return null;
    }

    if (EXCLUDED_ROUTE_NAMES.has(part)) {
      return null;
    }

    routeParts.push(part);
  }

  if (routeParts.length === 0) {
    return "/";
  }

  return `/${routeParts.join("/")}`;
}

function recursivelyFindFiles(directory) {
  if (!exists(directory)) return [];

  const results = [];

  function walk(current) {
    let entries = [];

    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      if (
        entry.name === "node_modules" ||
        entry.name === ".next" ||
        entry.name === ".git"
      ) {
        continue;
      }

      const fullPath = path.join(current, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
      } else {
        results.push(fullPath);
      }
    }
  }

  walk(directory);

  return results;
}

function discoverRoutes() {
  const files = recursivelyFindFiles(APP_DIR);

  const routes = new Set();

  for (const file of files) {
    const route = routeFromAppFile(file);

    if (route) {
      routes.add(route);
    }
  }

  const ordered = [...routes].sort((a, b) => {
    if (a === "/") return -1;
    if (b === "/") return 1;
    return a.localeCompare(b);
  });

  return ordered;
}

/**
 * ------------------------------------------------------------
 * EXISTING SEO FILE DETECTION
 * ------------------------------------------------------------
 */

function findExistingSEOFiles() {
  const files = recursivelyFindFiles(APP_DIR);

  const results = {
    layoutFiles: [],
    metadataFiles: [],
    sitemapFiles: [],
    robotsFiles: [],
  };

  for (const file of files) {
    const name = path.basename(file);

    if (
      name === "layout.tsx" ||
      name === "layout.ts" ||
      name === "layout.jsx" ||
      name === "layout.js"
    ) {
      results.layoutFiles.push(file);
    }

    if (
      name === "sitemap.ts" ||
      name === "sitemap.js" ||
      name === "sitemap.tsx" ||
      name === "sitemap.js"
    ) {
      results.sitemapFiles.push(file);
    }

    if (
      name === "robots.ts" ||
      name === "robots.js" ||
      name === "robots.tsx" ||
      name === "robots.js"
    ) {
      results.robotsFiles.push(file);
    }

    if (
      name === "metadata.ts" ||
      name === "metadata.js" ||
      name === "metadata.tsx" ||
      name === "metadata.js"
    ) {
      results.metadataFiles.push(file);
    }
  }

  return results;
}

/**
 * ------------------------------------------------------------
 * LAYOUT / METADATA AUDIT
 * ------------------------------------------------------------
 */

function inspectLayoutFile(file) {
  const content = readText(file);

  return {
    file: relativeProjectPath(file),

    hasMetadata:
      /\bexport\s+(const|let|var)\s+metadata\b/.test(content) ||
      /\bexport\s+const\s+metadata\b/.test(content),

    hasGenerateMetadata:
      /\bgenerateMetadata\b/.test(content),

    hasMetadataBase:
      /\bmetadataBase\b/.test(content),

    hasTitle:
      /\btitle\s*[:=]/.test(content) ||
      /\btitle\s*:\s*\{/.test(content),

    hasDescription:
      /\bdescription\s*[:=]/.test(content),

    hasKeywords:
      /\bkeywords\s*[:=]/.test(content),

    hasOpenGraph:
      /\bopenGraph\s*[:=]/.test(content),

    hasTwitter:
      /\btwitter\s*[:=]/.test(content),

    hasRobots:
      /\brobots\s*[:=]/.test(content),

    hasIcons:
      /\bicons\s*[:=]/.test(content),

    hasStructuredData:
      /application\/ld\+json/.test(content),

    content,
  };
}

function inspectMetadata() {
  const seoFiles = findExistingSEOFiles();

  const layouts = seoFiles.layoutFiles.map(inspectLayoutFile);

  const rootLayout =
    layouts.find((item) => item.file.includes("app/layout")) ||
    layouts[0] ||
    null;

  return {
    files: seoFiles,
    layouts,
    rootLayout,
  };
}

/**
 * ------------------------------------------------------------
 * SEO KEYWORD STRATEGY
 * ------------------------------------------------------------
 *
 * These keywords are intentionally understandable and
 * commercially relevant instead of keyword stuffing.
 */

const KEYWORD_GROUPS = {
  primary: [
    "UPVC windows",
    "UPVC doors",
    "UPVC windows and doors",
    "aluminium windows",
    "aluminium doors",
    "windows and doors",
    "windows and doors Hyderabad",
    "UPVC windows Hyderabad",
    "UPVC doors Hyderabad",
    "aluminium windows Hyderabad",
    "aluminium doors Hyderabad",
  ],

  product: [
    "UPVC sliding windows",
    "UPVC sliding doors",
    "UPVC casement windows",
    "UPVC French doors",
    "UPVC tilt and turn windows",
    "UPVC bathroom windows",
    "UPVC balcony doors",
    "aluminium sliding windows",
    "aluminium sliding doors",
    "aluminium casement windows",
    "aluminium French doors",
    "sliding windows",
    "sliding doors",
    "casement windows",
    "French doors",
    "glass windows",
    "glass doors",
  ],

  services: [
    "window installation",
    "door installation",
    "window replacement",
    "door replacement",
    "UPVC window installation",
    "UPVC door installation",
    "aluminium window installation",
    "aluminium door installation",
    "window repair",
    "door repair",
    "window maintenance",
    "door maintenance",
  ],

  interiors: [
    "interior design Hyderabad",
    "home interiors Hyderabad",
    "luxury interiors Hyderabad",
    "modern interiors Hyderabad",
    "residential interiors Hyderabad",
    "commercial interiors Hyderabad",
    "turnkey interiors Hyderabad",
  ],

  renovation: [
    "home renovation Hyderabad",
    "house renovation Hyderabad",
    "commercial renovation Hyderabad",
    "residential renovation Hyderabad",
    "renovation services Hyderabad",
    "turnkey renovation Hyderabad",
  ],

  metalWorks: [
    "metal works Hyderabad",
    "custom metal fabrication Hyderabad",
    "metal fabrication Hyderabad",
    "iron gates Hyderabad",
    "custom gates Hyderabad",
    "MS gates Hyderabad",
    "metal railings Hyderabad",
    "staircase railings Hyderabad",
  ],

  local: [
    "UPVC windows near me",
    "UPVC doors near me",
    "window manufacturers Hyderabad",
    "door manufacturers Hyderabad",
    "UPVC window manufacturers Hyderabad",
    "UPVC door manufacturers Hyderabad",
    "best UPVC windows Hyderabad",
    "best UPVC doors Hyderabad",
    "window company Hyderabad",
    "door company Hyderabad",
    "windows and doors company Hyderabad",
  ],

  informational: [
    "what are UPVC windows",
    "what are UPVC doors",
    "UPVC vs aluminium windows",
    "UPVC vs aluminium doors",
    "are UPVC windows good",
    "are UPVC doors durable",
    "how long do UPVC windows last",
    "how long do UPVC doors last",
    "how to clean UPVC windows",
    "how to clean UPVC doors",
    "UPVC windows maintenance",
    "UPVC doors maintenance",
    "best windows for home",
    "best doors for home",
    "best windows for Hyderabad",
    "energy efficient windows",
    "soundproof windows",
    "low maintenance windows",
    "weather resistant windows",
    "modern windows for home",
    "modern doors for home",
  ],

  brand: [
    "Simmply Perfect",
    "Simmply Perfect Group",
    "Simmply Perfect Windows and Doors",
    "Simmply Perfect UPVC",
    "Simmply Perfect Hyderabad",
  ],

  founder: [
    "Simmply Perfect founder",
    "Simmply Perfect Group founder",
    "founder of Simmply Perfect",
  ],
};

/**
 * ------------------------------------------------------------
 * COMPANY / FOUNDER CONFIGURATION
 * ------------------------------------------------------------
 *
 * IMPORTANT:
 * Do not invent personal information.
 *
 * Founder details are intentionally left blank unless they
 * already exist in the website source.
 */

const COMPANY_CONFIG = {
  name: "Simmply Perfect Group",
  legalName: "Simmply Perfect Group",
  website: SITE_URL,
  phone: "+91 93907 19623",
  email: "simplyperfectwindowsanddoors@gmail.com",
  city: "Hyderabad",
  region: "Telangana",
  country: "India",

  services: [
    "UPVC Windows & Doors",
    "Aluminium Windows & Doors",
    "Luxury Interiors",
    "Home & Commercial Renovation",
    "Custom Metal Works",
  ],

  founder: {
    name: "",
    role: "Founder",
    url: "",
    image: "",
  },
};

/**
 * ------------------------------------------------------------
 * PAGE SEO MAP
 * ------------------------------------------------------------
 *
 * This does NOT overwrite your page metadata.
 *
 * It gives the SEO engine a controlled strategy for your
 * existing routes.
 */

const PAGE_SEO_MAP = {
  "/": {
    title:
      "UPVC Windows & Doors in Hyderabad | Simmply Perfect Group",
    description:
      "Simmply Perfect Group provides UPVC and aluminium windows & doors, luxury interiors, renovation and custom metal works in Hyderabad.",
    keywords: [
      "UPVC windows Hyderabad",
      "UPVC doors Hyderabad",
      "aluminium windows Hyderabad",
      "aluminium doors Hyderabad",
      "windows and doors Hyderabad",
    ],
  },

  "/windows-doors": {
    title:
      "UPVC & Aluminium Windows and Doors in Hyderabad | Simmply Perfect",
    description:
      "Explore UPVC and aluminium windows and doors for homes and commercial spaces, including sliding, casement, French and modern door solutions.",
    keywords: [
      "UPVC windows",
      "UPVC doors",
      "aluminium windows",
      "aluminium doors",
      "windows and doors Hyderabad",
    ],
  },

  "/interiors": {
    title:
      "Interior Design & Home Interiors in Hyderabad | Simmply Perfect",
    description:
      "Modern residential and commercial interior solutions in Hyderabad with practical, elegant and premium design options.",
    keywords: [
      "interior design Hyderabad",
      "home interiors Hyderabad",
      "luxury interiors Hyderabad",
      "commercial interiors Hyderabad",
    ],
  },

  "/renovation": {
    title:
      "Home & Commercial Renovation Services in Hyderabad | Simmply Perfect",
    description:
      "Home and commercial renovation services in Hyderabad with practical planning, modern finishes and turnkey project solutions.",
    keywords: [
      "home renovation Hyderabad",
      "house renovation Hyderabad",
      "commercial renovation Hyderabad",
      "renovation services Hyderabad",
    ],
  },

  "/metal-works": {
    title:
      "Custom Metal Works & Fabrication in Hyderabad | Simmply Perfect",
    description:
      "Custom metal fabrication, gates, railings and architectural metal works for residential and commercial projects in Hyderabad.",
    keywords: [
      "metal works Hyderabad",
      "metal fabrication Hyderabad",
      "iron gates Hyderabad",
      "custom gates Hyderabad",
      "metal railings Hyderabad",
    ],
  },

  "/gallery": {
    title:
      "Windows, Doors, Interiors & Renovation Projects | Simmply Perfect",
    description:
      "View completed projects featuring UPVC windows, aluminium doors, interiors, renovation and custom metal works.",
    keywords: [
      "UPVC windows projects",
      "UPVC doors projects",
      "interior projects Hyderabad",
      "renovation projects Hyderabad",
    ],
  },

  "/about": {
    title:
      "About Simmply Perfect Group | Windows, Doors & Architectural Solutions",
    description:
      "Learn about Simmply Perfect Group and our approach to windows, doors, interiors, renovation and custom architectural solutions.",
    keywords: [
      "Simmply Perfect Group",
      "Simmply Perfect Windows and Doors",
      "windows and doors company Hyderabad",
    ],
  },

  "/contact": {
    title:
      "Contact Simmply Perfect | UPVC Windows & Doors Hyderabad",
    description:
      "Contact Simmply Perfect Group for UPVC windows, UPVC doors, aluminium windows, interiors, renovation and metal works in Hyderabad.",
    keywords: [
      "UPVC windows near me",
      "UPVC doors near me",
      "windows and doors Hyderabad",
      "Simmply Perfect contact",
    ],
  },
};

/**
 * ------------------------------------------------------------
 * GENERIC SEO DATA FOR ALL DISCOVERED ROUTES
 * ------------------------------------------------------------
 */

function getPageSEO(route) {
  if (PAGE_SEO_MAP[route]) {
    return PAGE_SEO_MAP[route];
  }

  const readable =
    route === "/"
      ? "Simmply Perfect Group"
      : route
          .replace(/^\/+/, "")
          .replaceAll("-", " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    title: `${readable} | Simmply Perfect Group`,
    description:
      `${readable} from Simmply Perfect Group in Hyderabad. Explore our architectural, windows, doors, interiors, renovation and related solutions.`,
    keywords: [
      "Simmply Perfect Group",
      "Hyderabad",
      "windows and doors Hyderabad",
      "UPVC windows Hyderabad",
      "UPVC doors Hyderabad",
    ],
  };
}

/**
 * ------------------------------------------------------------
 * FILE / SOURCE AUDIT
 * ------------------------------------------------------------
 */

function auditSourceFiles() {
  const files = recursivelyFindFiles(APP_DIR);

  const audit = {
    pages: [],
    files: files.length,
    structuredDataCount: 0,
    imageAltCount: 0,
    imageWithoutAltCount: 0,
  };

  for (const file of files) {
    const content = readText(file);
    const route = routeFromAppFile(file);

    if (route) {
      const seo = getPageSEO(route);

      const hasJsonLd = /application\/ld\+json/.test(content);

      const imageMatches =
        content.match(/<Image\b[\s\S]*?>/g) || [];

      const htmlImageMatches =
        content.match(/<img\b[\s\S]*?>/g) || [];

      const allImages = [
        ...imageMatches,
        ...htmlImageMatches,
      ];

      let missingAlt = 0;

      for (const image of allImages) {
        if (!/\balt\s*=/.test(image)) {
          missingAlt++;
        }
      }

      if (hasJsonLd) {
        audit.structuredDataCount++;
      }

      audit.imageAltCount += allImages.length - missingAlt;
      audit.imageWithoutAltCount += missingAlt;

      audit.pages.push({
        route,
        file: relativeProjectPath(file),
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords,
        hasStructuredData: hasJsonLd,
        imageCount: allImages.length,
        imagesWithoutAlt: missingAlt,
      });
    }
  }

  return audit;
}

/**
 * ------------------------------------------------------------
 * JSON-LD GENERATORS
 * ------------------------------------------------------------
 */

function cleanUrl(route) {
  if (route === "/") {
    return SITE_URL;
  }

  return `${SITE_URL}${route}`;
}

function generateOrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: COMPANY_CONFIG.name,
    url: SITE_URL,
    telephone: COMPANY_CONFIG.phone,
    email: COMPANY_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: COMPANY_CONFIG.city,
      addressRegion: COMPANY_CONFIG.region,
      addressCountry: COMPANY_CONFIG.country,
    },
  };

  return schema;
}

function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: COMPANY_CONFIG.name,
    url: SITE_URL,
    telephone: COMPANY_CONFIG.phone,
    email: COMPANY_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: COMPANY_CONFIG.city,
      addressRegion: COMPANY_CONFIG.region,
      addressCountry: COMPANY_CONFIG.country,
    },
    areaServed: {
      "@type": "City",
      name: COMPANY_CONFIG.city,
    },
    knowsAbout: [
      "UPVC windows",
      "UPVC doors",
      "Aluminium windows",
      "Aluminium doors",
      "Interior design",
      "Home renovation",
      "Commercial renovation",
      "Metal fabrication",
    ],
  };
}

function generateServicesSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Simmply Perfect Group Services",
    itemListElement: COMPANY_CONFIG.services.map(
      (service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: service,
      })
    ),
  };
}

function generateFounderSchema() {
  if (!COMPANY_CONFIG.founder.name) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: COMPANY_CONFIG.founder.name,
    jobTitle: COMPANY_CONFIG.founder.role,
    url: COMPANY_CONFIG.founder.url || undefined,
    image: COMPANY_CONFIG.founder.image || undefined,
    worksFor: {
      "@type": "Organization",
      name: COMPANY_CONFIG.name,
      url: SITE_URL,
    },
  };
}

/**
 * ------------------------------------------------------------
 * FAQ SEO DATABASE
 * ------------------------------------------------------------
 *
 * These are general informational questions.
 *
 * They should only be displayed on an actual FAQ/information
 * page if you later choose to publish them.
 *
 * The script does NOT inject them into your UI.
 */

const FAQ_DATABASE = [
  {
    question: "What are UPVC windows?",
    answer:
      "UPVC windows are windows made using unplasticized polyvinyl chloride profiles. They are commonly chosen for their low maintenance, durability and resistance to moisture.",
  },
  {
    question: "Are UPVC windows good for homes?",
    answer:
      "UPVC windows can be a practical option for homes because they generally require low maintenance and can provide good insulation and weather resistance when properly designed and installed.",
  },
  {
    question: "What is the difference between UPVC and aluminium windows?",
    answer:
      "UPVC and aluminium windows use different frame materials. UPVC is known for low maintenance and insulation properties, while aluminium is lightweight, strong and suitable for slim-frame designs.",
  },
  {
    question: "How long do UPVC windows last?",
    answer:
      "The service life of UPVC windows depends on the profile, hardware, installation quality, exposure and maintenance. Properly manufactured and installed systems can provide many years of service.",
  },
  {
    question: "Are UPVC doors suitable for Indian homes?",
    answer:
      "UPVC doors can be suitable for Indian homes when the profile, glass, hardware and installation are selected according to the local climate and intended use.",
  },
  {
    question: "Are aluminium windows good for modern homes?",
    answer:
      "Aluminium windows are widely used in modern homes because aluminium provides strength and can support slim frame designs and larger glazed areas.",
  },
  {
    question: "Which windows are best for a home?",
    answer:
      "The right window depends on ventilation, room size, design, climate, maintenance requirements, glass selection, security and budget.",
  },
  {
    question: "How do I clean UPVC windows?",
    answer:
      "UPVC windows can generally be cleaned using a soft cloth, mild soap solution and clean water. Avoid abrasive cleaners that could damage the profile surface.",
  },
];

/**
 * ------------------------------------------------------------
 * SITEMAP GENERATION
 * ------------------------------------------------------------
 */

function priorityForRoute(route) {
  if (route === "/") return "1.0";

  if (
    route.includes("windows") ||
    route.includes("doors")
  ) {
    return "0.9";
  }

  if (
    route.includes("interiors") ||
    route.includes("renovation") ||
    route.includes("metal")
  ) {
    return "0.8";
  }

  return "0.7";
}

function changeFrequencyForRoute(route) {
  if (route === "/") return "weekly";

  if (
    route.includes("articles") ||
    route.includes("gallery")
  ) {
    return "weekly";
  }

  return "monthly";
}

function generateSitemap(routes) {
  const now = new Date().toISOString();

  const urls = routes
    .map((route) => {
      return `  <url>
    <loc>${cleanUrl(route)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${changeFrequencyForRoute(route)}</changefreq>
    <priority>${priorityForRoute(route)}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${urls}
</urlset>
`;
}

/**
 * ------------------------------------------------------------
 * ROBOTS GENERATION
 * ------------------------------------------------------------
 */

function generateRobots() {
  return `# Simmply Perfect Group
# ${SITE_URL}

User-agent: *
Allow: /

# Keep internal/system paths out of search results.
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /private/

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

/**
 * ------------------------------------------------------------
 * SEO CONFIG
 * ------------------------------------------------------------
 */

function generateSEOConfig(routes) {
  return {
    generatedAt: new Date().toISOString(),

    website: {
      name: COMPANY_CONFIG.name,
      url: SITE_URL,
      city: COMPANY_CONFIG.city,
      region: COMPANY_CONFIG.region,
      country: COMPANY_CONFIG.country,
    },

    primaryTopics: [
      "UPVC windows",
      "UPVC doors",
      "Aluminium windows",
      "Aluminium doors",
      "Windows and doors",
      "Interior design",
      "Home renovation",
      "Commercial renovation",
      "Custom metal works",
    ],

    location: [
      "Hyderabad",
      "Telangana",
      "India",
    ],

    routes,

    pageSEO: Object.fromEntries(
      routes.map((route) => [
        route,
        getPageSEO(route),
      ])
    ),

    keywordGroups: KEYWORD_GROUPS,

    faqTopics: FAQ_DATABASE.map(
      (item) => item.question
    ),

    founder: COMPANY_CONFIG.founder,

    schemaTypes: [
      "Organization",
      "LocalBusiness",
      "ItemList",
      ...(COMPANY_CONFIG.founder.name
        ? ["Person"]
        : []),
    ],
  };
}

/**
 * ------------------------------------------------------------
 * SEO REPORT
 * ------------------------------------------------------------
 */

function buildReport({
  routes,
  metadata,
  sourceAudit,
}) {
  const root = metadata.rootLayout;

  const recommendations = [];

  if (!root) {
    recommendations.push(
      "Add or verify app/layout.tsx metadata."
    );
  } else {
    if (!root.hasMetadata && !root.hasGenerateMetadata) {
      recommendations.push(
        "Root layout does not appear to export metadata or generateMetadata."
      );
    }

    if (!root.hasMetadataBase) {
      recommendations.push(
        "Consider adding metadataBase using https://simmplyperfect.com."
      );
    }

    if (!root.hasDescription) {
      recommendations.push(
        "Add a descriptive site-wide meta description."
      );
    }

    if (!root.hasOpenGraph) {
      recommendations.push(
        "Add Open Graph metadata for social sharing."
      );
    }

    if (!root.hasTwitter) {
      recommendations.push(
        "Add Twitter/X metadata for social sharing."
      );
    }

    if (!root.hasRobots) {
      recommendations.push(
        "Add metadata robots directives where appropriate."
      );
    }

    if (!root.hasIcons) {
      recommendations.push(
        "Verify favicon and icon metadata."
      );
    }
  }

  if (sourceAudit.imageWithoutAltCount > 0) {
    recommendations.push(
      `${sourceAudit.imageWithoutAltCount} image(s) may be missing alt text.`
    );
  }

  if (sourceAudit.structuredDataCount === 0) {
    recommendations.push(
      "No JSON-LD structured data was detected in page source files."
    );
  }

  const pageRows = sourceAudit.pages
    .map(
      (page) =>
        `| ${page.route} | ${page.title} | ${page.imagesWithoutAlt} | ${
          page.hasStructuredData ? "Yes" : "No"
        } |`
    )
    .join("\n");

  return `# Simmply Perfect Group SEO Report

Generated: ${new Date().toLocaleString("en-IN")}

Website: ${SITE_URL}

## SEO Objective

Improve organic discoverability for understandable searches related to:

- UPVC windows
- UPVC doors
- Aluminium windows
- Aluminium doors
- Windows and doors
- Interior design
- Home renovation
- Commercial renovation
- Custom metal works
- Hyderabad architectural services
- General UPVC and window/door questions

## Safety

This SEO engine does NOT modify:

- Existing UI
- Existing React components
- Existing CSS
- Existing functionality
- Existing booking functionality
- Existing forms
- Existing API routes
- Existing service pricing
- Existing customer data

## Discovered Routes

${routes.map((route) => `- ${route}`).join("\n")}

## Page Audit

| Route | Recommended SEO Title | Images Missing Alt | JSON-LD |
|---|---|---:|---|
${pageRows}

## Root Metadata

${
  root
    ? `File: ${root.file}

- Metadata export: ${root.hasMetadata ? "Yes" : "No"}
- generateMetadata: ${root.hasGenerateMetadata ? "Yes" : "No"}
- metadataBase: ${root.hasMetadataBase ? "Yes" : "No"}
- title: ${root.hasTitle ? "Yes" : "No"}
- description: ${root.hasDescription ? "Yes" : "No"}
- keywords: ${root.hasKeywords ? "Yes" : "No"}
- Open Graph: ${root.hasOpenGraph ? "Yes" : "No"}
- Twitter: ${root.hasTwitter ? "Yes" : "No"}
- robots metadata: ${root.hasRobots ? "Yes" : "No"}
- icons: ${root.hasIcons ? "Yes" : "No"}
- JSON-LD: ${root.hasStructuredData ? "Yes" : "No"}`
    : "No root layout detected."
}

## Recommendations

${
  recommendations.length
    ? recommendations.map((item) => `- ${item}`).join("\n")
    : "- No major metadata issues detected."
}

## Primary Keyword Groups

### UPVC / Windows / Doors

${KEYWORD_GROUPS.primary
  .map((keyword) => `- ${keyword}`)
  .join("\n")}

### Product Searches

${KEYWORD_GROUPS.product
  .map((keyword) => `- ${keyword}`)
  .join("\n")}

### Services

${KEYWORD_GROUPS.services
  .map((keyword) => `- ${keyword}`)
  .join("\n")}

### Hyderabad / Local

${KEYWORD_GROUPS.local
  .map((keyword) => `- ${keyword}`)
  .join("\n")}

### Informational Questions

${KEYWORD_GROUPS.informational
  .map((keyword) => `- ${keyword}`)
  .join("\n")}

## Founder SEO

Founder information is intentionally not invented.

Current configured founder name:

${
  COMPANY_CONFIG.founder.name ||
  "Not configured — add the real founder name only after verifying it."
}

## Important SEO Principle

Do not keyword-stuff pages.

Search engines should understand the website through:

1. Clear page titles
2. Useful descriptions
3. Helpful page content
4. Correct headings
5. Internal links
6. Structured data
7. Fast loading
8. Mobile usability
9. Image optimization
10. Real company information
11. Helpful answers to customer questions
12. Strong local relevance

## Generated Assets

The --fix mode generates:

- public/seo/generated-sitemap.xml
- public/seo/generated-robots.txt
- public/seo/keywords.json
- public/seo/seo-config.json
- seo-report.json
- SEO-REPORT.md

Existing sitemap.xml and robots.txt files are NOT overwritten by this script.
`;
}

/**
 * ------------------------------------------------------------
 * PERFORMANCE AUDIT
 * ------------------------------------------------------------
 */

function auditPerformance() {
  const allSourceFiles = [
    ...recursivelyFindFiles(APP_DIR),
    ...recursivelyFindFiles(COMPONENTS_DIR),
  ];

  const results = {
    largeSourceFiles: [],
    potentialIssues: [],
    nextImageUsage: 0,
    rawImageUsage: 0,
    iframeCount: 0,
    videoCount: 0,
  };

  for (const file of allSourceFiles) {
    const extension = path.extname(file);

    if (![".tsx", ".ts", ".jsx", ".js"].includes(extension)) {
      continue;
    }

    const content = readText(file);

    const size = Buffer.byteLength(content, "utf8");

    if (size > 250 * 1024) {
      results.largeSourceFiles.push({
        file: relativeProjectPath(file),
        sizeKB: Math.round(size / 1024),
      });
    }

    results.nextImageUsage += (
      content.match(/<Image\b/g) || []
    ).length;

    results.rawImageUsage += (
      content.match(/<img\b/g) || []
    ).length;

    results.iframeCount += (
      content.match(/<iframe\b/g) || []
    ).length;

    results.videoCount += (
      content.match(/<video\b/g) || []
    ).length;

    if (
      content.includes("unoptimized") &&
      content.includes("<Image")
    ) {
      results.potentialIssues.push(
        `${relativeProjectPath(file)} uses Image with unoptimized.`
      );
    }

    if (
      content.includes("loading=\"eager\"") &&
      !file.includes("Hero")
    ) {
      results.potentialIssues.push(
        `${relativeProjectPath(file)} contains eager-loading content.`
      );
    }
  }

  return results;
}

/**
 * ------------------------------------------------------------
 * SECURITY / SECRET SAFETY
 * ------------------------------------------------------------
 */

function auditEnvironmentSafety() {
  const envFiles = [
    path.join(ROOT, ".env"),
    path.join(ROOT, ".env.local"),
    path.join(ROOT, ".env.production"),
  ];

  const trackedLikeFiles = [];

  for (const file of envFiles) {
    if (exists(file)) {
      trackedLikeFiles.push(
        relativeProjectPath(file)
      );
    }
  }

  return {
    envFilesPresent: trackedLikeFiles,
    warning:
      "Never expose SMTP passwords, API keys or payment credentials in client-side code.",
  };
}

/**
 * ------------------------------------------------------------
 * SAFE FIX MODE
 * ------------------------------------------------------------
 *
 * --fix creates new files only.
 *
 * Existing public/sitemap.xml and public/robots.txt are
 * intentionally protected.
 */

function runFixMode(routes, metadata, sourceAudit) {
  ensureDirectory(SEO_DIR);

  const sitemap = generateSitemap(routes);

  const robots = generateRobots();

  const config = generateSEOConfig(routes);

  const schemas = {
    organization: generateOrganizationSchema(),
    localBusiness: generateLocalBusinessSchema(),
    services: generateServicesSchema(),
    founder: generateFounderSchema(),
  };

  const keywords = {
    website: SITE_URL,
    generatedAt: new Date().toISOString(),
    groups: KEYWORD_GROUPS,
    pageStrategy: Object.fromEntries(
      routes.map((route) => [
        route,
        getPageSEO(route),
      ])
    ),
    questions: FAQ_DATABASE,
    schemas,
  };

  writeFileSafe(
    GENERATED_SITEMAP,
    sitemap
  );

  writeFileSafe(
    GENERATED_ROBOTS,
    robots
  );

  writeFileSafe(
    SEO_CONFIG_FILE,
    JSON.stringify(config, null, 2)
  );

  writeFileSafe(
    KEYWORDS_FILE,
    JSON.stringify(keywords, null, 2)
  );

  const performance = auditPerformance();

  const environment = auditEnvironmentSafety();

  const report = buildReport({
    routes,
    metadata,
    sourceAudit,
  });

  writeFileSafe(
    REPORT_FILE,
    report
  );

  const jsonReport = {
    generatedAt: new Date().toISOString(),
    website: SITE_URL,
    routes,
    metadata,
    sourceAudit,
    performance,
    environment,
    keywords: KEYWORD_GROUPS,
    faq: FAQ_DATABASE,
  };

  writeFileSafe(
    JSON_REPORT_FILE,
    JSON.stringify(jsonReport, null, 2)
  );

  success(
    `Generated ${relativeProjectPath(GENERATED_SITEMAP)}`
  );

  success(
    `Generated ${relativeProjectPath(GENERATED_ROBOTS)}`
  );

  success(
    `Generated ${relativeProjectPath(KEYWORDS_FILE)}`
  );

  success(
    `Generated ${relativeProjectPath(SEO_CONFIG_FILE)}`
  );

  success(
    `Generated ${relativeProjectPath(REPORT_FILE)}`
  );

  success(
    `Generated ${relativeProjectPath(JSON_REPORT_FILE)}`
  );

  /**
   * Protect existing files.
   */
  const existingSitemap = path.join(
    PUBLIC_DIR,
    "sitemap.xml"
  );

  const existingRobots = path.join(
    PUBLIC_DIR,
    "robots.txt"
  );

  if (exists(existingSitemap)) {
    info(
      "Existing public/sitemap.xml detected — NOT overwritten."
    );
  }

  if (exists(existingRobots)) {
    info(
      "Existing public/robots.txt detected — NOT overwritten."
    );
  }
}

/**
 * ------------------------------------------------------------
 * CONSOLE SUMMARY
 * ------------------------------------------------------------
 */

function printSummary({
  routes,
  metadata,
  sourceAudit,
  performance,
  environment,
}) {
  heading("SIMMPLY PERFECT SEO ENGINE");

  log(`Website: ${SITE_URL}`);
  log(`Project: ${path.basename(ROOT)}`);
  log(`Routes discovered: ${routes.length}`);

  heading("SEO");

  if (metadata.rootLayout) {
    const root = metadata.rootLayout;

    log(
      `Root metadata: ${
        root.hasMetadata || root.hasGenerateMetadata
          ? "Detected"
          : "Missing"
      }`
    );

    log(
      `Description: ${
        root.hasDescription ? "Detected" : "Missing"
      }`
    );

    log(
      `Open Graph: ${
        root.hasOpenGraph ? "Detected" : "Missing"
      }`
    );

    log(
      `Twitter metadata: ${
        root.hasTwitter ? "Detected" : "Missing"
      }`
    );

    log(
      `Structured data: ${
        root.hasStructuredData ? "Detected" : "Not detected"
      }`
    );
  }

  log(
    `Images missing alt text: ${sourceAudit.imageWithoutAltCount}`
  );

  log(
    `Pages containing JSON-LD: ${sourceAudit.structuredDataCount}`
  );

  heading("PERFORMANCE");

  log(
    `Next/Image usages: ${performance.nextImageUsage}`
  );

  log(
    `Raw <img> usages: ${performance.rawImageUsage}`
  );

  log(
    `Iframe usages: ${performance.iframeCount}`
  );

  log(
    `Video usages: ${performance.videoCount}`
  );

  if (performance.largeSourceFiles.length) {
    warning(
      `${performance.largeSourceFiles.length} large source file(s) detected.`
    );

    for (const item of performance.largeSourceFiles) {
      log(
        `  ${item.file} — ${item.sizeKB} KB`
      );
    }
  } else {
    success("No unusually large source files detected.");
  }

  if (performance.potentialIssues.length) {
    for (const issue of performance.potentialIssues) {
      warning(issue);
    }
  }

  heading("ENVIRONMENT");

  if (environment.envFilesPresent.length) {
    info(
      `Environment files detected: ${environment.envFilesPresent.join(
        ", "
      )}`
    );

    warning(
      "Make sure .env files are excluded from Git and never exposed to the browser."
    );
  }

  heading("SEO TOPICS");

  log("Primary:");
  for (const keyword of KEYWORD_GROUPS.primary) {
    log(`  • ${keyword}`);
  }

  log("\nInformational:");
  for (const keyword of KEYWORD_GROUPS.informational) {
    log(`  • ${keyword}`);
  }

  log("\nLocal:");
  for (const keyword of KEYWORD_GROUPS.local) {
    log(`  • ${keyword}`);
  }

  heading("RESULT");

  if (
    sourceAudit.imageWithoutAltCount === 0 &&
    metadata.rootLayout &&
    metadata.rootLayout.hasDescription
  ) {
    success(
      "Basic SEO audit completed successfully."
    );
  } else {
    warning(
      "SEO audit completed. Review SEO-REPORT.md for recommended improvements."
    );
  }
}

/**
 * ------------------------------------------------------------
 * MAIN
 * ------------------------------------------------------------
 */

async function main() {
  try {
    heading("Starting automated SEO audit");

    info(`Project root: ${ROOT}`);

    if (!exists(APP_DIR)) {
      error(
        "app/ directory was not found. Make sure this script is inside your Next.js project."
      );

      process.exitCode = 1;
      return;
    }

    const routes = discoverRoutes();

    if (!routes.length) {
      warning(
        "No static Next.js page routes were discovered."
      );
    }

    const metadata = inspectMetadata();

    const sourceAudit = auditSourceFiles();

    const performance = auditPerformance();

    const environment = auditEnvironmentSafety();

    printSummary({
      routes,
      metadata,
      sourceAudit,
      performance,
      environment,
    });

    if (FIX_MODE) {
      heading("Generating safe SEO assets");

      runFixMode(
        routes,
        metadata,
        sourceAudit
      );

      success(
        "SEO generation completed."
      );

      log("");
      info(
        "Existing website UI and functionality were not modified."
      );

      info(
        "Review SEO-REPORT.md before deploying generated assets."
      );
    } else {
      heading("Audit mode");

      info(
        "No project files were modified."
      );

      info(
        "Run `npm run seo:fix` to generate the SEO support files."
      );
    }

    log("");
  } catch (err) {
    error(
      `SEO engine failed: ${
        err instanceof Error
          ? err.message
          : String(err)
      }`
    );

    if (err instanceof Error && err.stack) {
      console.error(
        COLORS.gray +
          err.stack +
          COLORS.reset
      );
    }

    process.exitCode = 1;
  }
}

await main();