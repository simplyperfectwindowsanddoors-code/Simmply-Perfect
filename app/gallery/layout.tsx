import type { Metadata } from "next";
import PageStructuredData from "@/components/seo/PageStructuredData";
import { createPageMetadata } from "@/lib/seo";

const page = {
  title: "Windows, Doors and Interior Project Gallery",
  description: "View selected Simmply Perfect Group projects across windows, doors, interiors, renovations and metal works.",
  path: "/gallery",
};

export const metadata: Metadata = createPageMetadata(page);

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageStructuredData {...page} />
      {children}
    </>
  );
}
