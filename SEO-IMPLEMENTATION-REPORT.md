# SEO implementation report

Date: 2026-08-24

## Files modified in this implementation pass

- `app/affiliate/layout.tsx`
- `app/partner/layout.tsx`
- `app/sitemap.ts`
- `SEO-AUDIT.md`
- `SEO-IMPLEMENTATION-REPORT.md`

## SEO and crawlability

- Restored normal indexability for the public `/affiliate` and `/partner` pages by removing their `noindex` directives.
- Added those two canonical HTTPS URLs to `app/sitemap.ts`.
- Kept `/book-service` out of the sitemap and non-indexable because it is a transactional booking workflow.
- APIs remain excluded through `app/robots.ts`; no CSS, JavaScript, image, navigation, or public-content route was blocked.
- Canonical URL generation, unique page metadata, OpenGraph/Twitter metadata, Organization/WebSite JSON-LD, and verified founder Person JSON-LD from the prior metadata implementation remain in place.

## Performance, images, fonts, JavaScript, and accessibility

- No broad image conversion, image re-encoding, client-to-server migration, font removal, or JavaScript code splitting was applied. The audit found that each would need page-level visual and interaction measurement to avoid changing the existing experience.
- The home hero video already uses `preload="metadata"`; it was not preloaded or otherwise changed without LCP measurement.
- Google Maps already uses native lazy loading, and the PDF preview only mounts after a user requests it. No change was warranted.
- The audit identifies the major follow-up candidates: oversized local source images, raw image elements lacking intrinsic dimensions, and unusually large interactive Client Component route modules.

## Structured data

- No additional Article, LocalBusiness, review, or FAQ schema was added. Existing article content does not have individual article URLs or verified authors/dates, and the repository does not contain a complete business street address for LocalBusiness schema.

## Validation

- `rm -rf .next && npm run build`: passed with the existing Google Font fetch available to the build environment.
- Generated route list includes all public routes, `/robots.txt`, and `/sitemap.xml`; the six API routes remain dynamic.
- `npm run lint`: ran and reports 39 existing errors and 80 warnings. The failures are outside this crawlability-only change set and include protected booking/API/form code, raw-image migration warnings, and pre-existing JSX escaping/type issues. The production TypeScript build passes.
- `git diff --check`: to be run as part of the final working-tree review.

## Safety

- No visual design, content, public URL, navigation, API, form, booking, payment, email, catalogue, career, affiliate, or partner functionality was changed.
- No company data, founder data, claims, reviews, ratings, statistics, service names, or prices were added or altered.
