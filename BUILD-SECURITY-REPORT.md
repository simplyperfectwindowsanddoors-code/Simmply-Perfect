# Build and dependency security fix

Date: 2026-10-15. Target: existing Hostinger Node.js application, GitHub main branch, https://simmplyperfect.com/.

## Failures addressed

The supplied Hostinger build failed inside Turbopack while starting a CSS/PostCSS worker (`node process exited before we could connect`). The supplied npm audit reported 27 findings: 2 critical, 20 high and 5 moderate. The same 27 findings were reproduced against the existing installed dependency tree.

## Changes

| File | Change and reason |
| --- | --- |
| `package.json` | Production build uses documented `next build --webpack`, avoiding the failed Turbopack path. Pin Next.js and matching ESLint config to 16.4.1; patch Nodemailer to 10.1.1. Declare the existing Hostinger Node 22 runtime. Add audit and compatibility-test commands. Remove unused `icons` and the shadcn CLI after preserving its imported styles. |
| `package-lock.json` | Regenerated and verified by clean npm ci. Includes compatible transitive security fixes. No forced major downgrades or vulnerability exclusions. |
| `next.config.ts` | Keep output file tracing inside the project root, avoiding parent-lockfile inference during production build/start. |
| `app/globals.css` | Change one import from the removed CLI package to the identical local stylesheet. No style rules or visual classes changed. |
| `app/vendor/shadcn.css` | Exact copy of the previously imported installed shadcn 4.13.1 stylesheet. SHA-256: bc7d83425702955b4cb67cb14ede9d603f9d912376d57a2d81d661094d2a782a. |
| `app/vendor/shadcn-LICENSE.md` | Preserve the stylesheet's original MIT license. |
| `app/book-service/page.tsx` | Remove four unsupported named-export keywords, exposed by the Webpack production type check. Helpers, constants and all executable booking code are otherwise byte-for-byte identical. No external repository module imported those helpers. |
| `tests/dependency-compatibility.test.mjs` | Verify the replacement linter glob implementation and in-memory email/PDF attachment compatibility. No SMTP or business requests are sent. |
| `BUILD-SECURITY-REPORT.md` | This report and Hostinger release instructions. |

The Nodemailer major update is necessary because the audit marks all installed 9.x versions vulnerable and the patched release is 10.1.1. Its supported Node runtime includes Node 22. Application createTransport/sendMail code is unchanged; the compatibility test checks ordinary recipients, reply-to, HTML and exact PDF attachment bytes using JSON transport. Live SMTP delivery is not certified by this test.

### Linter dependency replacement

The current Next ESLint plugin still pulls fast-glob/micromatch/braces. The published braces advisory affects all available braces releases; blindly running npm audit fix --force proposed unrelated downgrades. A narrowly scoped npm override replaces only the Next linter's fast-glob dependency with the maintained `tinyglobby@0.2.17` package. The consumer uses globSync for optional project-root discovery. Tests verify default roots, glob roots and array roots resolve to the expected filesystem directories. Relative paths/trailing slashes may differ between libraries but resolve to the same directories. No application glob implementation was replaced and no advisory was suppressed.

## Validation

| Check | Actual result |
| --- | --- |
| Clean npm ci from committed-style lockfile | PASS: 513 installed packages; audit reports zero vulnerabilities. |
| npm audit --json, including development dependencies | PASS: 0 total findings, all severity counts zero. |
| npm audit --omit=dev --json | PASS: 0 production findings. |
| npm run test | PASS: two dependency compatibility checks. |
| Clean .next and npm run build | PASS: Next.js 16.4.1, Webpack; TypeScript and all 23 generated entries complete. |
| npm run seo | PASS. |
| Built HTML validation | PASS: all 13 public pages, correct canonicals/social metadata, parseable JSON-LD, 12 sitemap URLs, booking noindex retained. |
| Production server smoke test | PASS: 13 pages, robots, sitemap, llms.txt, logo, repaired Articles image, sampled CSS and JS return 200. |
| git diff --check | PASS. |
| npm run lint | Same pre-existing 39 errors and 74 warnings. No new lint errors. These were not part of the supplied deployment/audit failures and no rules were disabled. |

All six API route source files, forms, email request payloads, booking calculations, payment handling, PDF implementations, public assets and business data remain unchanged. The only booking-page edit removes export modifiers required by Next's page-module contract. No real enquiry, payment, booking, upload, email or external PDF transaction was submitted.

This audit reports known dependency advisories at this verification time. It does not prove that the application, hosting account or all dependencies are free of every vulnerability. Real SMTP, browser interactions and Hostinger's actual hosted build require their own runtime verification. PDFKit's existing crypto-js dependency still emits a deprecation warning; npm reports no advisory for it. It was not replaced speculatively because PDF functionality is protected.

## Hostinger deployment

Keep the existing Hostinger project, domain and environment variables. The verified settings are:

- Source: simplyperfectwindowsanddoors-code/Simmply-Perfect, main branch.
- Application/framework: Next.js.
- Node: 22.
- Install: npm ci when configurable, otherwise npm install uses the updated lockfile.
- Build: npm run build (now invokes next build --webpack).
- Output: .next.
- Production start: npm run start / next start, with Hostinger's assigned PORT.
- Keep the existing environment values; no SMTP/payment secrets were changed or placed in source.

GitHub authentication works when network access is enabled. The remote main revision was checked as 08993ce8e5b9e66a572b3f445c1afa4aa2973181 before publishing. There is no connected Hostinger hosting tool; repository check-runs/deployments do not expose the Hostinger build. Hostinger automatic redeployment status is not yet confirmed. The Sites integration has no matching project, and the plugin search found only unrelated Hostinger Mail; no new hosting project was created.

The user explicitly selected **“Keep the tested changes local.”** No commit, push or deployment will be performed for this patch. The repository AGENTS.md also says: “Do not commit automatically unless explicitly instructed.” The reviewed source must be committed and pushed with that authorization, then Hostinger can rebuild from main when automatic deployment is enabled. Otherwise use the existing project's Redeploy action in hPanel. Do not report the application as deployed until Hostinger returns a successful build/publication state and the public site is checked.

After an authorized release, verify the deployed Next version/build, main landing pages, robots.txt, sitemap.xml, enquiry form, booking flow and an appropriately controlled SMTP/PDF test. Preserve the previous deployed version as a rollback option.

## References

- [Next CLI and Webpack option](https://nextjs.org/docs/app/api-reference/cli/next)
- [Hostinger Node.js deployment](https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/)
- [Hostinger redeployment](https://www.hostinger.com/support/how-to-redeploy-a-node-js-application/)
- [tinyglobby upstream](https://github.com/SuperchupuDev/tinyglobby)
- [Unpatched braces advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)
