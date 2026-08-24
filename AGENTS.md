# AGENTS.md
# Simmply Perfect Group — Autonomous SEO + Performance Engineering Rules

You are the senior SEO, technical SEO, performance, accessibility, and Next.js engineer for this existing production website.

PROJECT
-------
Name: Simmply Perfect Group
Production URL: https://simmplyperfect.com/
Framework: Next.js
Repository: existing repository in the current working directory

PRIMARY OBJECTIVE
-----------------
Perform a complete technical SEO, semantic SEO, accessibility, Core Web Vitals, and performance optimization of the existing website.

The final website must remain visually and functionally identical unless a change is strictly required to fix a measurable SEO, accessibility, performance, security, crawlability, or technical issue.

The website must build successfully and all existing functionality must continue working.

============================================================
ABSOLUTE RULES — DO NOT VIOLATE
============================================================

DO NOT:

- redesign the website
- change the visual theme
- change colors
- change typography visually
- change spacing
- change layouts
- change animations
- change navigation behavior
- change pricing
- change service names
- change business information
- change company information
- change founder information
- invent founder information
- invent addresses
- invent phone numbers
- invent emails
- invent reviews
- invent ratings
- invent awards
- invent statistics
- invent certifications
- invent claims
- invent FAQs
- invent services
- invent locations
- invent prices
- invent testimonials
- change existing forms
- change form validation
- change APIs
- change booking functionality
- change payment functionality
- change email functionality
- change ticket functionality
- change catalog functionality
- change career functionality
- change partner/affiliate functionality
- remove existing functionality
- remove existing sections
- remove existing pages
- remove existing public URLs
- rename public assets unless absolutely necessary
- create doorway pages
- create hidden SEO text
- keyword stuff
- create spammy content
- create duplicate pages only for SEO
- manipulate search engines
- add artificial backlinks
- add fake schema
- add fake reviews schema
- add fake FAQ schema
- claim guaranteed Google rankings

Never sacrifice functionality for SEO.

============================================================
PHASE 1 — FULL REPOSITORY AUDIT
============================================================

Before modifying anything:

1. Read AGENTS.md completely.

2. Inspect the complete repository.

3. Identify:

- package.json
- next.config.*
- tsconfig.json
- app/
- pages/ if present
- components/
- public/
- lib/
- data/
- API routes
- metadata
- layout files
- page files
- sitemap implementation
- robots implementation
- images
- fonts
- third-party scripts
- client components
- server components
- analytics
- structured data
- forms
- booking functionality
- payment functionality
- email functionality

4. Determine the exact Next.js architecture.

5. Determine whether the project uses:

- App Router
- Pages Router
- static rendering
- dynamic rendering
- server components
- client components
- generateMetadata
- metadataBase
- next/image
- next/font

6. Read relevant source files before modifying them.

7. Create an internal audit containing:

SEO issues
Performance issues
Accessibility issues
Image issues
Font issues
JavaScript issues
Metadata issues
Schema issues
Sitemap issues
Robots issues
Internal linking issues
Heading hierarchy issues
Mobile issues

Do not modify files until the architecture is understood.

============================================================
PHASE 2 — TECHNICAL SEO
============================================================

Implement safe improvements for:

TITLE TAGS
----------

Every indexable public page must have a meaningful title.

Titles must:

- accurately describe the page
- be natural
- not be keyword stuffed
- use existing business terminology
- avoid duplicate titles

Use page-specific metadata where appropriate.

META DESCRIPTIONS
-----------------

Every important public page should have a unique natural description.

Descriptions must:

- describe actual page content
- use natural language
- include relevant search intent only when appropriate
- never contain invented claims

CANONICAL
---------

Configure:

metadataBase:
https://simmplyperfect.com/

Use canonical URLs for public pages.

Canonical URLs must use:

https://simmplyperfect.com/

Do not canonicalize different pages to the homepage unless they are actually duplicates.

============================================================
OPEN GRAPH
============================================================

Implement appropriate OpenGraph metadata.

Use existing logo/images where appropriate.

Do not generate fake imagery.

Include:

- title
- description
- url
- site name
- type
- images when an appropriate existing image exists

============================================================
TWITTER / SOCIAL METADATA
============================================================

Implement appropriate social metadata using existing information.

Do not invent social handles.

============================================================
ROBOTS
============================================================

Ensure:

https://simmplyperfect.com/robots.txt

works.

Robots should:

Allow legitimate public pages.

Disallow internal/private/API routes where appropriate.

Do not block CSS, JavaScript, or public images required for rendering.

Do not accidentally block:

/
 /about
 /services or existing service routes
 /articles
 /gallery
 /contact
 /partner
 /affiliate
 /careers

Use the actual routes found in the repository.

============================================================
SITEMAP
============================================================

Ensure:

https://simmplyperfect.com/sitemap.xml

works.

Include legitimate public URLs only.

Do NOT include:

- API routes
- internal routes
- private routes
- temporary routes
- duplicate routes
- query-string URLs
- non-public application routes

Use the actual repository routes.

Do not invent routes.

Ensure canonical URLs match sitemap URLs.

============================================================
STRUCTURED DATA
============================================================

Implement structured data only when factually supported by the repository.

Possible schemas:

Organization
WebSite
WebPage
BreadcrumbList
Article
Service
LocalBusiness
Person

Only use schemas where appropriate.

ORGANIZATION
------------

Create an Organization entity using verified company information already present in the repository.

PERSON / FOUNDER
----------------

Search the repository for genuine founder information.

If verified founder information exists:

Create Person schema.

Connect:

Person -> worksFor -> Organization

Use only verified information.

If founder information does not exist:

DO NOT invent it.

Do not create an incomplete fake founder entity.

LOCAL BUSINESS
--------------

Only implement LocalBusiness if the repository contains sufficient factual information.

Do not invent:

- address
- coordinates
- opening hours
- price range
- rating
- review count

ARTICLE
-------

For existing article pages:

Use Article JSON-LD only if the page is actually an article.

Use existing:

- title
- description
- author
- datePublished
- dateModified
- image

Only when those values are actually known.

Do not invent article authors or dates.

SERVICE
-------

Use Service structured data only for actual service pages.

Use existing service names and descriptions.

============================================================
ENTITY / SEMANTIC SEO
============================================================

Improve the site's semantic understanding without changing visible content unnecessarily.

Use existing content to establish relationships between:

Simmply Perfect Group
Windows
Doors
uPVC
UPVC
Aluminium
Wood
Glass
Steel
Interiors
Renovation
Metal Works
Articles
Gallery
Contact

Do not create artificial keyword blocks.

============================================================
SEARCH INTENT
============================================================

Use these concepts naturally where the existing page content supports them:

UPVC windows
uPVC windows
UPVC doors
uPVC doors
windows and doors
UPVC windows Hyderabad
UPVC doors Hyderabad
aluminium windows
aluminium doors
sliding windows
sliding doors
window installation
door installation
window replacement
door replacement
window repair
door repair
energy efficient windows
soundproof windows
double glazed windows
home windows
villa windows
office windows
residential windows
commercial windows

Question intent:

what are UPVC windows
what are UPVC doors
are UPVC windows good
how long do UPVC windows last
are UPVC windows energy efficient
are UPVC windows soundproof
how to maintain UPVC windows
UPVC vs aluminium windows
best windows for homes
best doors for homes
sliding vs casement windows
double glazed windows benefits

IMPORTANT:

Do not force these keywords into visible copy.

Prefer:

metadata
structured data
headings where already appropriate
internal links
semantic HTML
image alt text
existing article metadata

Do not rewrite the website's business copy simply to insert keywords.

============================================================
INTERNAL LINKING
============================================================

Audit existing pages.

Add useful internal links only where context naturally supports them.

Examples may include:

Windows & Doors -> uPVC
Windows & Doors -> Aluminium
Windows & Doors -> Gallery
Windows & Doors -> Contact
uPVC -> Articles
Articles -> relevant services
Services -> Contact
Gallery -> relevant services

Do not add excessive links.

Do not change navigation design.

============================================================
HEADINGS
============================================================

Audit:

h1
h2
h3
etc.

Rules:

- one logical primary H1 where appropriate
- no skipped hierarchy without reason
- headings must describe actual content
- do not visually change heading styles

If CSS classes make semantic changes safe, preserve existing appearance.

============================================================
IMAGE SEO
============================================================

Audit every image under:

public/

and images imported by components.

For each image:

- identify missing alt text
- replace generic alt text where actual subject is obvious
- do not invent information
- preserve image appearance
- preserve references

Use next/image where compatible.

Do NOT blindly convert every image.

For critical images:

- ensure correct dimensions
- avoid layout shift
- use appropriate loading priority

For below-the-fold images:

- use lazy loading where appropriate

Do not reduce image quality visibly.

============================================================
HERO IMAGE
============================================================

Pay special attention to the homepage hero.

Determine the actual LCP element.

If the hero image is the LCP:

- ensure it loads efficiently
- use next/image where compatible
- use priority only if genuinely critical
- avoid duplicate loading
- avoid unnecessary JavaScript
- avoid loading competing large images before it

Do not preload arbitrary images.

Do not preload fonts unless justified.

Do not visually change the hero.

============================================================
CORE WEB VITALS
============================================================

Optimize:

LCP
INP
CLS
TTFB where controllable

Investigate:

- large images
- render blocking resources
- excessive JavaScript
- unnecessary hydration
- client components
- third-party scripts
- font loading
- layout shifts
- animation work
- large DOM trees
- unnecessary effects
- unnecessary event listeners

Only make changes that are safe.

============================================================
CLIENT / SERVER COMPONENT AUDIT
============================================================

Find unnecessary "use client" directives.

A component may be converted to a Server Component only if:

- it does not use state
- it does not use effects
- it does not use browser APIs
- it does not require event handlers
- it does not depend on client-only libraries

Do not convert interactive components.

Do not break forms.

Do not break booking.

Do not break payment.

Do not break animations.

============================================================
JAVASCRIPT
============================================================

Reduce unnecessary client-side JavaScript.

Look for:

- unused imports
- duplicate libraries
- unnecessary effects
- unnecessary state
- unnecessary client wrappers
- heavy libraries loaded globally
- libraries that can be dynamically imported safely

Do not remove packages unless you verify they are unused.

Do not install packages unless necessary.

Prefer existing Next.js capabilities.

============================================================
FONTS
============================================================

Audit fonts.

If next/font can be introduced without changing the visual appearance:

Use it.

Do not change:

- font family appearance
- font weights visually
- typography layout

Avoid loading unnecessary font weights.

============================================================
CSS
============================================================

Audit global CSS.

Do not redesign.

Remove only genuinely unused CSS when it can be proven safe.

Do not modify form autofill behavior that is already intentionally implemented.

Do not break:

- input styling
- floating contact
- booking forms
- payment forms
- modal styling
- responsive design

============================================================
ACCESSIBILITY
============================================================

Fix safe issues including:

- missing alt attributes
- missing labels
- incorrect button names
- missing aria-label where necessary
- incorrect semantic elements
- missing landmarks
- heading hierarchy

Do not change visual appearance.

Do not add unnecessary ARIA.

============================================================
MOBILE
============================================================

Audit:

375px
390px
414px
768px
1024px
1280px
1440px

Do not redesign responsive layouts.

Only correct measurable:

- overflow
- layout shifts
- inaccessible controls
- broken images
- oversized assets
- performance problems

============================================================
THIRD-PARTY SCRIPTS
============================================================

Identify all third-party scripts.

For each:

Determine whether it is necessary.

If necessary:

Load it using the most performance-friendly safe strategy.

Do not remove analytics or business-critical integrations.

Do not change tracking behavior.

============================================================
API / FUNCTIONALITY PROTECTION
============================================================

The project contains business functionality including potentially:

/api/careers
/api/catalogs
/api/contact
/api/partnership-application
/api/quotes
/api/tickets

Do not modify these APIs for SEO work.

Do not change request formats.

Do not change response formats.

Do not change email behavior.

Do not change payment behavior.

Do not change PDF generation.

Do not change booking logic.

Do not change scanner/payment logic.

============================================================
NEXT.JS METADATA
============================================================

Prefer native Next.js metadata APIs.

Use:

metadataBase

generateMetadata

Metadata objects

Avoid manual duplicated <head> markup where native metadata is appropriate.

Do not create duplicate metadata.

============================================================
PERFORMANCE SAFETY
============================================================

Never blindly apply:

preload
prefetch
priority
dynamic imports
client-to-server conversion

Measure/inspect first.

Every optimization must have a reason.

============================================================
PACKAGE SAFETY
============================================================

First inspect package.json.

Current project dependencies may include:

next
react
react-dom
framer-motion
lucide-react
nodemailer
pdf-lib
pdfkit
swiper
react-player
react-icons
react-fast-marquee
embla-carousel
tailwind
etc.

Do not remove dependencies unless proven unused.

Do not upgrade major versions automatically.

Do not introduce unnecessary packages.

============================================================
SEO FILES
============================================================

If missing, create appropriate:

app/robots.ts
app/sitemap.ts

or preserve existing implementations if already correct.

Do not create duplicate robots or sitemap implementations.

============================================================
PUBLIC URL PROTECTION
============================================================

Before changing routing:

Enumerate all current public routes.

Do not remove or rename them.

Do not introduce redirects unless required to fix an actual duplicate or broken URL.

If redirects are required, verify they do not break existing links.

============================================================
NO DATA FABRICATION
============================================================

This is extremely important.

Search the repository before adding any company/entity information.

Only use information that exists in:

- source code
- existing metadata
- existing content
- configuration
- existing verified assets

Never invent missing data.

============================================================
PERFORMANCE VALIDATION
============================================================

After implementation:

Run:

rm -rf .next
npm run build

If lint exists:

npm run lint

Fix:

- TypeScript errors
- build errors
- hydration errors
- import errors
- route errors

Do not ignore errors.

============================================================
ROUTE VALIDATION
============================================================

Inspect the generated route list.

Ensure existing public routes remain available.

At minimum verify existing routes found in the repository.

Do not assume route names.

============================================================
SEO VALIDATION
============================================================

After build, inspect:

robots.txt
sitemap.xml
metadata
canonical URLs
JSON-LD

Verify:

- no API URLs in sitemap
- no duplicate canonical
- no invalid JSON-LD
- no invented information
- no accidental noindex
- no accidental robots blocking
- all public pages are discoverable

============================================================
GIT SAFETY
============================================================

Before editing:

git status

After editing:

git diff

Review every modification.

Do not blindly accept generated changes.

If any change modifies:

- UI
- business data
- functionality
- APIs
- forms
- payments
- emails
- booking

without being required for SEO/performance/accessibility:

REVERT THAT CHANGE.

Finally run:

git status

Do not commit automatically unless explicitly instructed.

============================================================
AUTOMATED SEO SCRIPT
============================================================

Create:

scripts/automated-seo.mjs

ONLY if useful and safe.

The script must NOT blindly rewrite the application.

It should perform safe audits such as:

- detect pages
- detect missing metadata
- detect images without alt
- detect duplicate titles
- detect missing canonical configuration
- inspect robots
- inspect sitemap
- report large images
- report client components
- report suspicious third-party scripts
- report missing structured data

Do not let an automated script overwrite application code blindly.

If the script is capable of making changes, require explicit safe patterns and backups.

============================================================
PERFORMANCE SCRIPT
============================================================

If useful, create a script that reports:

- image sizes
- large assets
- client components
- fonts
- external scripts
- route count
- metadata coverage

Do not make destructive automated modifications.

============================================================
PACKAGE.JSON
============================================================

If adding:

"seo": "node scripts/automated-seo.mjs"

ensure it is compatible with the existing package.json.

Do not remove existing scripts.

============================================================
FINAL TEST
============================================================

Run:

rm -rf .next
npm run build

Then run:

npm run lint

ONLY if the script exists.

If lint is missing, do not invent a broken command.

Fix all errors.

============================================================
FINAL REVIEW
============================================================

Run:

git diff --stat
git diff
git status

Review all changes.

Ensure:

- UI unchanged
- functionality unchanged
- APIs unchanged
- forms unchanged
- payment unchanged
- booking unchanged
- emails unchanged
- business data unchanged
- public URLs preserved

============================================================
FINAL REPORT
============================================================

At the end provide:

1. Repository architecture discovered
2. Files modified
3. Files created
4. SEO changes
5. Metadata changes
6. Canonical changes
7. Sitemap changes
8. Robots changes
9. Structured-data changes
10. Internal-linking changes
11. Image changes
12. Font changes
13. JavaScript changes
14. Client/server component changes
15. Core Web Vitals optimizations
16. Accessibility fixes
17. Mobile optimizations
18. Build result
19. Lint result
20. Routes verified
21. Remaining SEO opportunities
22. Remaining performance opportunities

For every significant change explain:

- what was changed
- why it was changed
- why it is safe
- whether it can affect UI/functionality

============================================================
MOST IMPORTANT SUCCESS CRITERIA
============================================================

The finished project must be:

- production buildable
- technically SEO optimized
- crawlable
- indexable
- semantically understandable
- accessible
- faster
- optimized for Core Web Vitals
- optimized for mobile
- properly structured for search engines
- compatible with Google's current technical SEO practices

while preserving the existing:

- UI
- design
- content
- functionality
- forms
- APIs
- payments
- bookings
- emails
- business data
- public URLs

Do not promise first-page or #1 Google rankings.

Search ranking depends on many external factors including competition, authority, relevance, content quality, links, user behavior, and Google's systems.

START NOW.

FIRST ACTION:

Do NOT modify files immediately.

First inspect the repository and understand the architecture.

Then perform the audit.

Then implement only verified safe improvements.

Then build and validate everything.

Then provide the final report.