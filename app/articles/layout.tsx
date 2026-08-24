import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Windows, Doors and Renovation Articles",
  description: "Read articles from Simmply Perfect Group on windows, doors, glazing, mosquito mesh, interiors and renovation.",
  path: "/articles",
});

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
