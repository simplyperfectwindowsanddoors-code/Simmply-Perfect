import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "uPVC, Aluminium & Custom Windows and Doors in Hyderabad",
  description: "Explore uPVC, aluminium, wood, glass and steel windows and doors, including sliding, casement, French and tilt-and-turn systems.",
  path: "/windows-doors",
});

export default function WindowsDoorsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
