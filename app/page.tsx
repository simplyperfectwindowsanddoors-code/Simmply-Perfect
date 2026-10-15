import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageStructuredData from "@/components/seo/PageStructuredData";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Companies from "@/components/home/Companies";
import Services from "@/components/home/Services";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Stats from "@/components/home/stats";
import Footer from "@/components/home/Footer";

const page = {
  title: "Windows, Doors & Home Services in Hyderabad",
  description:
    "Explore Simmply Perfect Group windows and doors, interiors, home and commercial renovation, and custom metal fabrication in Hyderabad.",
  path: "/",
};

export const metadata: Metadata = createPageMetadata(page);

export default function Home() {
  return (
    <>
      <PageStructuredData {...page} />
      <Navbar />

      <main>
        <Hero />
        <Companies />
        <Services />
        <WhyChooseUs />
        <Stats />
      </main>

      <Footer />
    </>
  );
}
