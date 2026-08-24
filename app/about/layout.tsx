import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About Simmply Perfect Group",
  description: "Learn about Simmply Perfect Group and its work across windows, doors, interiors, renovation and metal works in Hyderabad.",
  path: "/about",
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
