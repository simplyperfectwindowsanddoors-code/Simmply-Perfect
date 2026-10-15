import type { Metadata } from "next";
import PageStructuredData from "@/components/seo/PageStructuredData";
import { createPageMetadata } from "@/lib/seo";

const page = {
  title: "uPVC & Aluminium Windows and Doors in Hyderabad",
  description: "Explore uPVC, aluminium, wood, glass and steel windows and doors in Hyderabad, including sliding, casement, French and tilt-and-turn systems.",
  path: "/windows-doors",
};

export const metadata: Metadata = createPageMetadata(page);

export default function WindowsDoorsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageStructuredData {...page} serviceName="Windows & Doors" />
      {children}
    </>
  );
}
