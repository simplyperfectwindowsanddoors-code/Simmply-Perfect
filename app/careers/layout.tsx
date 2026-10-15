import type { Metadata } from "next";
import PageStructuredData from "@/components/seo/PageStructuredData";
import { createPageMetadata } from "@/lib/seo";

const page = {
  title: "Careers",
  description: "Explore current career opportunities with Simmply Perfect Group in Hyderabad.",
  path: "/careers",
};

export const metadata: Metadata = createPageMetadata(page);

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageStructuredData {...page} />
      {children}
    </>
  );
}
