import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Companies from "@/components/home/Companies";
import Services from "@/components/home/Services";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Stats from "@/components/home/stats";
import Footer from "@/components/home/Footer";

export const metadata: Metadata = {
  title:
    "Windows & Doors, Interiors, Renovation & Metal Works in Hyderabad",

  description:
    "Simmply Perfect Group provides premium aluminium and UPVC windows and doors, luxury interiors, home and commercial renovation, custom metal fabrication, and complete architectural solutions in Hyderabad.",

  alternates: {
    canonical: "https://simmplyperfect.com/",
  },

  openGraph: {
    title:
      "Simmply Perfect Group | Windows, Doors, Interiors & Architectural Solutions",
    description:
      "Premium aluminium and UPVC windows and doors, luxury interiors, renovation, custom metal works and architectural solutions in Hyderabad.",
    url: "https://simmplyperfect.com/",
    siteName: "Simmply Perfect Group",
    type: "website",
    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Simmply Perfect Group | Windows, Doors, Interiors & Architectural Solutions",
    description:
      "Premium windows and doors, luxury interiors, renovation, metal works and architectural solutions in Hyderabad.",
  },
};

export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <Companies />

      <Services />

      <WhyChooseUs />

      <Stats />

      <Footer />
    </>
  );
}