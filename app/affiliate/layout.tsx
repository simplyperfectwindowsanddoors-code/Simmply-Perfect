import type { Metadata } from "next";
import PageStructuredData from "@/components/seo/PageStructuredData";
import { createPageMetadata } from "@/lib/seo";

const page = {
  title: "Affiliate Application",
  description: "Apply to the Simmply Perfect Group affiliate programme.",
  path: "/affiliate",
};

export const metadata: Metadata = createPageMetadata(page);

export default function AffiliateLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageStructuredData {...page} />
      {children}
    </>
  );
}
