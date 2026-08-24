import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Book a Service",
  description: "Book a Simmply Perfect Group service appointment.",
  path: "/book-service",
  noIndex: true,
});

export default function BookServiceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
