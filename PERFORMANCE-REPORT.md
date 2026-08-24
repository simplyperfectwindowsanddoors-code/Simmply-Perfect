# Performance and technical SEO report

Date: 2026-08-24

## LCP findings

- The homepage hero renders a muted autoplay video (`public/videos/hero-video.mp4`, approximately 2 MB) with `preload="metadata"`.
- Source inspection identifies the hero video and the hero H1 as the likely initial LCP candidates. A browser performance trace was not available in this environment, so no runtime LCP element or score is claimed.
- The hero loading strategy was deliberately preserved: adding `preload="auto"`, a priority image, or a poster without measurement could compete for bandwidth or change first-frame rendering.
- The large specialty images in `components/home/Companies.tsx` are below the hero and now no longer compete for initial network bandwidth.

## INP findings

- The largest client-side modules are interactive pages and shared form/navigation components. They use Framer Motion, event handlers, state, and modal/form behaviour.
- No client-to-server conversion or code splitting was applied because those changes would require interaction regression testing and could affect navigation, booking, careers, or modals.

## CLS findings

- The deferred homepage images retain their existing fixed-height containers (`h-[600px]` desktop and `h-[400px]` mobile), so lazy loading does not change page geometry.
- Raw images elsewhere remain a follow-up opportunity; intrinsic dimensions must be introduced one image at a time after visual checks rather than through a bulk migration.

## Image optimization

- Added `loading="lazy"` and `decoding="async"` to both desktop and mobile render paths for the four homepage specialty images.
- Existing service video thumbnails and carousels were already lazy-loaded; no redundant change was made.
- No assets were renamed, removed, recompressed, or visually altered.

## Font optimization

- Removed the `Geist_Mono` `next/font` request after source inspection confirmed no `font-mono` consumer exists.
- Preserved the visual fallback contract by mapping the unused mono design token to the already-loaded Geist Sans font.
- The visible site font remains Geist Sans; no typography class, weight, or spacing was changed.

## JavaScript and client/server optimization

- No dependencies were removed and no interactive components were converted.
- This avoids changing Framer Motion animation, form, booking, payment, catalogue, career, partner, or affiliate behaviour.

## CSS and third-party resources

- No global CSS import or styling rule was removed.
- YouTube remains interaction-triggered; Google Maps already lazy-loads; PDF previews only mount when a visitor opens one.

## Mobile optimization

- The image deferral applies to both the desktop and mobile image variants. Existing responsive dimensions and layout order are unchanged.
- No responsive layout changes were made for the requested viewport widths.

## SEO and accessibility

- Existing canonical, metadata, robots, sitemap, Organization/WebSite/Person schema, and public affiliate/partner crawlability changes remain intact.
- No additional schema was added because the repository does not support verified Article or LocalBusiness fields for it.

## Files modified in Phase 2

- `app/layout.tsx`
- `app/globals.css`
- `components/home/Companies.tsx`
- `PERFORMANCE-REPORT.md`

## Files intentionally not modified

- Hero video, large route Client Components, APIs, forms, booking/payment/email flows, public assets, third-party integration behaviour, and page copy.

## Validation

- `rm -rf .next && npm run build`: passed.
- `git diff --check`: passed before final report creation; it must be re-run in the final review.
- `npm run lint`: still reports the pre-existing 39 errors and 80 warnings. No new lint errors arise from the changed implementation files.

## Remaining bottlenecks

- Field or browser-lab Core Web Vitals data is needed before changing hero video loading.
- Large source images, raw image elements without explicit intrinsic dimensions, and large interactive client modules remain candidates for separately measured, route-by-route work.
