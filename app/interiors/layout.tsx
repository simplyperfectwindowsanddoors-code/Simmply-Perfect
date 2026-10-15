import type { Metadata } from "next";
import PageStructuredData from "@/components/seo/PageStructuredData";
import { createPageMetadata } from "@/lib/seo";

const page = {
  title: "Interior Works in Hyderabad",
  description: "Explore Simmply Perfect Group interior solutions for living spaces, bedrooms, kitchens, wardrobes, offices and false ceilings.",
  path: "/interiors",
};

export const metadata: Metadata = createPageMetadata(page);

export default function InteriorsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageStructuredData {...page} serviceName="Interiors" />
      {children}
    </>
  );
}
