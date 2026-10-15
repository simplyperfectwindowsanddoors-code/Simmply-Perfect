# Full repository SEO audit

Date: 2026-10-15. Initial findings before application changes. Working tree was clean.

## Architecture and protected scope

Next.js 16.2.9, React 19, TypeScript strict mode, App Router, Tailwind 4. No Pages Router. Root and route layouts are Server Components; most pages are interactive Client Components using Framer Motion, state, effects, forms and modals. Native metadata helper, metadataBase, next/image, next/font/google (Geist), robots, sitemap and static llms.txt already exist. Static public pages; six dynamic API handlers: careers, catalogs, contact, partnership-application, quotes, tickets. API handlers implement business/email/PDF work and are excluded from edits. Booking includes payment/scanner UI and remains protected.

13 public routes: /, /about, /affiliate, /articles, /book-service, /careers, /contact, /gallery, /interiors, /metal-works, /partner, /renovation, /windows-doors. Booking is intentionally noindex and excluded from the 12-URL sitemap. Partner and affiliate are public and indexable. Articles and product details open in modals; no individual article/product routes exist.

## Findings by priority

| Priority | Area | Initial evidence and action |
| --- | --- | --- |
| High | Rendering/crawlability | robots.ts disallows /_next/, including rendering JS, CSS and optimized images. Remove that rule; retain API exclusion. Previous reports incorrectly describe assets as unblocked. |
| High | Heading semantics | Navbar uses H1 for the repeated brand alongside page H1s. Change only its tag, preserving every class. |
| Medium | Hidden duplicate copy | Homepage H1 includes a long sr-only business keyword summary duplicating the next paragraph. Remove that redundant text without changing visible content. |
| Medium | Titles | All routes have metadata, but some titles repeat the full brand under a brand template; home/product titles are long. Shorten naturally, keep distinct intent, synchronize social metadata. |
| Medium | Structured data | Organization, genuine founder Person and WebSite already exist. No page entities on service routes. Add server-rendered WebPage/Service entities using existing descriptions and stable Organization references. No invented ratings, addresses, hours, authors or dates. Existing homepage FAQ maps to visible answers; do not expand it. |
| Medium | Images/mobile | 304 MiB public directory, 416 file/directory entries; largest video ~15.8 MB, one interior image ~9 MB, numerous large PDFs. These are not all initial downloads. Below-fold article images have fixed-height wrappers but eager default loading. Defer only these images. One unused ProjectGallery image lacks alt. |
| Medium | Internal links | Existing navigation/footer reach all core pages. Articles mainly link to contact; contextual product/service destinations can reuse existing project links. /catalogs in footer data must be checked for button interception before treating it as broken. |
| Medium | Audit automation | Existing 1,800+ line script includes generic schema/FAQ generation and a write mode, although no npm command exists. Replace with a read-only, source-aware audit; never publish generated schema guesses. |
| Medium | Lint | Baseline npm run lint: 39 errors, 77 warnings. Includes JSX punctuation, explicit any and effect-state issues. Keep APIs/forms/booking logic protected; document any unresolved existing errors. |
| Follow-up | LCP/INP/CLS | Hero is autoplay muted video with metadata preload; text/video are candidates, actual LCP unknown. Large interactive modules are required for animations/modals. Do not claim measured improvements or change preload/animations speculatively. |
| Follow-up | Fonts/CSS | Geist already uses next/font. No font change justified; preserve intentional autofill/global styles. |
| Follow-up | Third parties | YouTube opens on interaction; Maps is lazy; PDF previews open on request. No analytics/tag manager source found. Preserve integrations. |
| Follow-up | Mobile/a11y | Review requested widths 375, 390, 414, 768, 1024, 1280, 1440 in browser if available. Do not infer visual parity or actual CWV from source inspection. |

## Business evidence and content boundaries

Founder Aakaash Deep Shrivastava and title appear visibly in about/page.tsx. Phone, email and social profiles appear in Footer and existing schema. A Maps place link exists but contact text lacks a complete verified street address: do not add LocalBusiness address or coordinates inferred from map viewport. Existing metal services explicitly include railings, main gates, grills, safety doors, pergolas and metal furniture. Windows page supplies uPVC/aluminium/wood/glass/steel systems. Do not create material/location doorway pages, new claims or guessed project stories.

Keyword mapping uses repository-supported search intents, with no claimed search-volume or competition measurements. Keep unsupported manufacturer/dealer superlatives and neighbourhood targeting out of metadata. Article dates exist, but articles have no standalone URLs; no Article rich-result promises.

## Validation plan

Clean production build; inspect generated page HTML, route list, canonical/social tags, robots directives, sitemap membership, JSON-LD parseability and internal links. Run lint and compare baseline. Review every diff; no public route, API, form or business data change. Browser setup is limited by the available tools; record unperformed checks explicitly.

## Primary guidance checked

- https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics — rendering resources must be crawlable.
- https://developers.google.com/search/docs/appearance/title-link — descriptive, concise page titles.
