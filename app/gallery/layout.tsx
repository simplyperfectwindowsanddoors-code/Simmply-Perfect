import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Windows, Doors and Interior Project Gallery",
  description: "View selected Simmply Perfect Group projects across windows, doors, interiors, renovations and metal works.",
  path: "/gallery",
});

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
