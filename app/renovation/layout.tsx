import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Home and Commercial Renovation in Hyderabad",
  description: "Discover home, office, retail and commercial renovation services from Simmply Perfect Group in Hyderabad.",
  path: "/renovation",
});

export default function RenovationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
