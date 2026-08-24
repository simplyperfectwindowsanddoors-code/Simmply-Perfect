import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Affiliate Application",
  description: "Apply to the Simmply Perfect Group affiliate programme.",
  path: "/affiliate",
});

export default function AffiliateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
