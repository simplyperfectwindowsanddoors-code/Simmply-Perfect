import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Luxury Interior Solutions in Hyderabad",
  description: "Explore Simmply Perfect Group interior solutions for living spaces, bedrooms, kitchens, wardrobes, offices and false ceilings.",
  path: "/interiors",
});

export default function InteriorsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
