import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Custom Architectural Metal Works in Hyderabad",
  description: "Explore custom metal fabrication, railings, gates, grills and architectural metal work from Simmply Perfect Group.",
  path: "/metal-works",
});

export default function MetalWorksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
