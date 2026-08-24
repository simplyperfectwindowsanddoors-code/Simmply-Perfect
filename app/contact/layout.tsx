import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Simmply Perfect Group",
  description: "Contact Simmply Perfect Group to discuss windows, doors, interiors, renovation or metal works in Hyderabad.",
  path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
