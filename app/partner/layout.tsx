import type { Metadata } from "next";
import PageStructuredData from "@/components/seo/PageStructuredData";
import { createPageMetadata } from "@/lib/seo";

const page = {
  title: "Partnership Application",
  description: "Apply to partner with Simmply Perfect Group.",
  path: "/partner",
};

export const metadata: Metadata = createPageMetadata(page);

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageStructuredData {...page} />
      {children}
    </>
  );
}
