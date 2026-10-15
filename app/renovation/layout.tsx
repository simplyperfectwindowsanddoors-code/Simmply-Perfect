import type { Metadata } from "next";
import PageStructuredData from "@/components/seo/PageStructuredData";
import { createPageMetadata } from "@/lib/seo";

const page = {
  title: "Home & Commercial Renovation in Hyderabad",
  description: "Discover home, office, retail and commercial renovation services from Simmply Perfect Group in Hyderabad.",
  path: "/renovation",
};

export const metadata: Metadata = createPageMetadata(page);

export default function RenovationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageStructuredData {...page} serviceName="Renovation" />
      {children}
    </>
  );
}
