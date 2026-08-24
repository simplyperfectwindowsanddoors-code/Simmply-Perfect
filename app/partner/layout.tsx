import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Partnership Application",
  description: "Apply to partner with Simmply Perfect Group.",
  path: "/partner",
  noIndex: true,
});

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
