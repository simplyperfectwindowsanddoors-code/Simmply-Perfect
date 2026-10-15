import type { Metadata } from "next";
import PageStructuredData from "@/components/seo/PageStructuredData";
import { createPageMetadata } from "@/lib/seo";

const page = {
  title: "Metal Fabrication Works in Hyderabad",
  description: "Explore metal fabrication in Hyderabad: gates, grills, railings, safety doors, pergolas and metal furniture from Simmply Perfect Group.",
  path: "/metal-works",
};

export const metadata: Metadata = createPageMetadata(page);

export default function MetalWorksLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageStructuredData {...page} serviceName="Metal Works" />
      {children}
    </>
  );
}
