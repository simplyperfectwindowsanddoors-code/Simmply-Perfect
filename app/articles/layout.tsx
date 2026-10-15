import type { Metadata } from "next";
import PageStructuredData from "@/components/seo/PageStructuredData";
import { createPageMetadata } from "@/lib/seo";

const page = {
  title: "Windows, Doors and Renovation Articles",
  description: "Read articles from Simmply Perfect Group on windows, doors, glazing, mosquito mesh, interiors and renovation.",
  path: "/articles",
};

export const metadata: Metadata = createPageMetadata(page);

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageStructuredData {...page} />
      {children}
    </>
  );
}
