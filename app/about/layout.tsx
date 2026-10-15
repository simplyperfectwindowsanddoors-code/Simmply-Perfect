import type { Metadata } from "next";
import PageStructuredData from "@/components/seo/PageStructuredData";
import { createPageMetadata } from "@/lib/seo";

const page = {
  title: "About Us",
  description: "Learn about Simmply Perfect Group and its work across windows, doors, interiors, renovation and metal works in Hyderabad.",
  path: "/about",
};

export const metadata: Metadata = createPageMetadata(page);

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageStructuredData {...page} />
      {children}
    </>
  );
}
