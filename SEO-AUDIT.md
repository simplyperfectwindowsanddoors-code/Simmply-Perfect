# SEO, accessibility and performance audit

Audit date: 2026-08-24  
Scope: existing Next.js App Router production website. This audit does not alter the visual design, business content, APIs, forms, booking, payment, catalogue, career, partner, or affiliate flows.

## Architecture

- Next.js 16.2.9 App Router with TypeScript and Tailwind CSS 4.
- Public routes: `/`, `/about`, `/affiliate`, `/articles`, `/book-service`, `/careers`, `/contact`, `/gallery`, `/interiors`, `/metal-works`, `/partner`, `/renovation`, and `/windows-doors`.
- Six API endpoints exist under `/api` and must remain excluded from indexing.
- Root metadata uses `metadataBase`, `next/font` (Geist and Geist Mono), and native `app/robots.ts` and `app/sitemap.ts`.
- Most content pages and shared visual sections are Client Components because they use Framer Motion, state, effects, or form/event handling. The large route pages should not be converted wholesale without separately testing interactions and animation behaviour.

## Current SEO implementation

- Root Organization, WebSite, and verified founder Person JSON-LD are present in `app/layout.tsx`.
- Homepage FAQ and service JSON-LD is present in `components/home/Services.tsx` and corresponds to visible content.
- Per-route titles, descriptions, canonicals, OpenGraph, Twitter metadata, and noindex metadata for transactional routes are supplied by route layouts and `lib/seo.ts`.
- `app/robots.ts` allows public content and blocks `/api/` and `/_next/`.
- `app/sitemap.ts` contains only core indexable public pages and does not fabricate modification dates.

## Findings and safe recommendations

| Area | Finding | Recommended action | Risk |
| --- | --- | --- | --- |
| Metadata | Metadata coverage is present on all public route layouts. The transactional booking route is noindex; public affiliate and partner pages should remain indexable. | Correct affiliate and partner indexing, then validate during build. | Low |
| Canonicals | Canonicals resolve through the root `metadataBase` to the production HTTPS domain. | Retain. | Low |
| Sitemap | Includes core content routes and excludes APIs/transactional pages; affiliate and partner are legitimate public routes that should be included. No artificial `lastModified` values are used. | Add affiliate and partner only. | Low |
| Robots | Public content is crawlable and APIs are blocked. | Retain; do not block assets or public route paths. | Low |
| Structured data | Organization/WebSite/Person is supported by existing visible information. Article content is rendered as a listing/modal rather than individual article URLs, so Article JSON-LD would be misleading. | Do not add Article or LocalBusiness schema. | Low |
| Images | Raw `<img>` use is widespread. Several images lack explicit width/height and many local source images are 1–3 MB. Blind conversion to `next/image` would require remote host configuration and per-image sizing/cropping checks. | Apply only safe accessibility fixes and lazy loading to non-critical embeds; plan a separately tested image migration. | Medium |
| Hero/LCP | The home hero is a 2 MB local video with `preload="metadata"`, muted autoplay, and no poster. It is likely a key visual candidate but cannot be safely assumed to be the LCP without field/lab measurement. | Preserve current behaviour; measure LCP before changing preload, poster, codec, or priority. | Medium |
| CLS | Raw images can create layout shift when dimensions are not constrained by their wrappers. Existing CSS sizes many containers, but not all media elements expose intrinsic dimensions. | Add dimensions only after verifying each image's rendered aspect ratio; do not bulk-edit. | Medium |
| INP/JavaScript | Large Client Component route modules include `app/windows-doors/page.tsx` (81 KB), `app/renovation/page.tsx` (63 KB), `app/book-service/page.tsx` (59 KB), and `components/layout/Navbar.tsx` (50 KB). These are interaction-heavy and use forms/modals/animations. | Do not convert or split without route-by-route interaction regression tests. | High |
| Fonts | Geist and Geist Mono are loaded through `next/font`. Geist Mono is only referenced through the global theme variable, with no discovered `font-mono` consumer. | Verify browser output before removal; defer this minor optimisation because a theme dependency could make it visual. | Medium |
| Third parties | YouTube is loaded only after a user interaction in the homepage video area. Google Maps already has native lazy loading; PDF previews are iframe-based only after a user opens them. | Retain existing embed loading. | Low |
| Accessibility | `components/ui/ProjectGallery.tsx` contains an image with no `alt`. It is currently not imported by the application. Many other images have alt attributes, although several are generic. | Add an empty alt only to the unused decorative gallery image; do not rewrite ambiguous image descriptions. | Low |
| Headings | Main content pages generally contain one H1. Homepage/careers/gallery/contact delegate headings to components, so source-only page-file counts are incomplete. | No safe heading change identified without visual/component review. | Low |
| Internal links | Primary service pages, footer, and navigation already cross-link core service routes. | No additional links needed without changing visible copy/layout. | Low |
| Mobile | No source-level responsive overflow fault was identified. Large raw media and embedded frames remain the primary mobile-performance concern. | Test with browser tooling before responsive changes. | Medium |
| Audit script | `scripts/automated-seo.mjs` is untracked and its fix mode can generate generic schema, keywords, and support files. Those generic values should not be deployed automatically because they could duplicate or outgrow factual content. | Keep audit-only; do not add an automated fix command or generated SEO assets. | Low |

## Exact files proposed for safe work

- `app/affiliate/layout.tsx`: remove `noindex` from the public affiliate page. This only changes crawler directives.
- `app/partner/layout.tsx`: remove `noindex` from the public partnership page. This only changes crawler directives.
- `app/sitemap.ts`: add the two indexable public routes using their canonical URLs.
- `SEO-IMPLEMENTATION-REPORT.md`: document validation and changes after implementation.

## Changes deliberately excluded

- No business copy, claims, reviews, statistics, contact data, FAQ text, prices, services, or founder information will be changed.
- No API, email, payment, booking, catalogue, career, partner, or affiliate code will be changed.
- No bulk `next/image` conversion, image re-encoding, client/server conversion, dependency removal, CSS removal, or hero preloading change will be made without measurement and visual regression testing.
- No LocalBusiness, Article, review, or FAQ schema beyond content already rendered visibly will be added.
