# Production performance baseline

Date: 2026-08-24

## Build and routes

- Production build: passed.
- App routes: 23 generated route entries, including 16 static entries (public pages plus `robots.txt`, `sitemap.xml`, and `llms.txt`) and 6 dynamic API handlers.
- `/llms.txt` is statically generated and its local production response is a cached HTTP 200 `text/plain; charset=utf-8` response.

## Client-side architecture

- Most public route pages are Client Components because they contain animation, navigation, modal, carousel, or form interaction.
- Largest source modules include `app/windows-doors/page.tsx` (about 81 KB), `app/renovation/page.tsx` (about 63 KB), `app/book-service/page.tsx` (about 59 KB), `components/layout/Navbar.tsx` (about 50 KB), and `components/home/Services.tsx` (about 45 KB).
- Framer Motion is used by 35 source files. It is an intentional part of the existing visual experience and cannot be removed without changing animations.

## Emitted assets and dependencies

- Built JavaScript chunks total approximately 2.08 MB across the entire application output. The largest individual chunks are approximately 459 KB, 227 KB, and 142 KB. These totals do not represent a single route's network payload.
- The `public/` directory is approximately 304 MiB in total. It includes large PDFs, videos, and source images; these are not all loaded on initial navigation.
- Dependencies with no source import were found for Swiper, React Player, React Fast Marquee, Embla Carousel, and React Intersection Observer. They are not shipped unless imported, so removing them would not materially improve current route bundles and may affect future/indirect usage.

## Image, font, and network observations

- The home hero uses a roughly 2 MB muted autoplay video with `preload="metadata"`; it is a likely visual LCP candidate, alongside the hero text. No runtime LCP trace is available in this environment, so its loading strategy is not changed speculatively.
- Four large specialty images below the home hero use native lazy loading and asynchronous decoding.
- Geist Sans is loaded through `next/font`; unused Geist Mono loading was removed in the preceding optimization pass.
- Many raw images remain on deeper, interaction-heavy pages. Moving them to `next/image` requires per-image aspect-ratio and remote-host validation to avoid cropping/layout changes.

## Runtime and Core Web Vitals risks

- Likely LCP risk: hero video download/decode and initial client-side animation work.
- Likely CLS risk: raw images without explicit intrinsic dimensions outside fixed-height containers.
- Likely INP risk: large animated/modal-heavy client routes and navigation state updates.
- Browser API audit found requestAnimationFrame carousel loops and a scroll listener in the navbar; no synchronous geometry read/write loop was found from the audited patterns.

## Third parties and technical SEO

- YouTube embeds mount after visitor interaction; Google Maps is already lazy-loaded; catalogue PDF previews only mount after visitor action.
- No analytics or tag-manager script was found in application source.
- Existing metadata, canonical URLs, robots, sitemap, Organization/WebSite/Person JSON-LD, and public affiliate/partner crawlability remain in place.

## Lint baseline

- `npm run lint` reports 39 errors and 79 warnings, including pre-existing JSX escaping, explicit `any`, effect-state, and raw-image warnings. Production TypeScript build passes.
