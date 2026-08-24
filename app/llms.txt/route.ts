import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

const llmsText = `# Simmply Perfect Group

> Simmply Perfect Group provides windows and doors, interior solutions, renovation, metal works, and architectural solutions in Hyderabad.

## Website

${siteUrl}/

## Main pages

- ${siteUrl}/
- ${siteUrl}/about
- ${siteUrl}/windows-doors
- ${siteUrl}/interiors
- ${siteUrl}/renovation
- ${siteUrl}/metal-works
- ${siteUrl}/articles
- ${siteUrl}/gallery
- ${siteUrl}/contact
- ${siteUrl}/careers
- ${siteUrl}/affiliate
- ${siteUrl}/partner

## Topics

- uPVC windows and doors
- Aluminium windows and doors
- Sliding, casement, French, and tilt-and-turn window systems
- Interior solutions
- Home and commercial renovation
- Architectural metal works
`;

export function GET() {
  return new Response(llmsText, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
