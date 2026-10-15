import type { Metadata } from "next";
import PageStructuredData from "@/components/seo/PageStructuredData";
import { createPageMetadata } from "@/lib/seo";

const page = {
  title: "Contact Us",
  description: "Contact Simmply Perfect Group to discuss windows, doors, interiors, renovation or metal works in Hyderabad.",
  path: "/contact",
};

export const metadata: Metadata = createPageMetadata(page);

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageStructuredData {...page} />
      {children}
    </>
  );
}
