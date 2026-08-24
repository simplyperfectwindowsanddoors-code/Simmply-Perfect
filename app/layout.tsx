import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import FloatingContact from "@/components/common/FloatingContact";
import { siteUrl } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default:
      "Simmply Perfect Group | Windows, Doors, Interiors & Architectural Solutions",
    template: "%s | Simmply Perfect Group",
  },

  description:
    "Simmply Perfect Group provides premium aluminium and UPVC windows and doors, luxury interior design, home and commercial renovation, custom metal fabrication, and complete architectural solutions in Hyderabad.",

  applicationName: "Simmply Perfect Group",

  authors: [
    {
      name: "Simmply Perfect Group",
      url: siteUrl,
    },
  ],

  creator: "Simmply Perfect Group",
  publisher: "Simmply Perfect Group",

  keywords: [
    "Simmply Perfect",
    "Simmply Perfect Group",
    "Simmply Perfect Windows and Doors",
    "windows and doors Hyderabad",
    "aluminium windows Hyderabad",
    "aluminium doors Hyderabad",
    "UPVC windows Hyderabad",
    "UPVC doors Hyderabad",
    "premium windows Hyderabad",
    "premium doors Hyderabad",
    "sliding windows Hyderabad",
    "sliding doors Hyderabad",
    "casement windows Hyderabad",
    "French windows Hyderabad",
    "tilt and turn windows Hyderabad",
    "lift and slide doors Hyderabad",
    "slide and fold doors Hyderabad",
    "interior designers Hyderabad",
    "luxury interiors Hyderabad",
    "home interiors Hyderabad",
    "home renovation Hyderabad",
    "house renovation Hyderabad",
    "commercial renovation Hyderabad",
    "metal fabrication Hyderabad",
    "custom metal works Hyderabad",
    "architectural metal works Hyderabad",
    "architectural solutions Hyderabad",
    "turnkey architectural solutions Hyderabad",
  ],

  alternates: {
    canonical: siteUrl,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Simmply Perfect Group",
    title:
      "Simmply Perfect Group | Windows, Doors, Interiors & Architectural Solutions",
    description:
      "Premium aluminium and UPVC windows and doors, luxury interiors, home and commercial renovation, custom metal works, and architectural solutions from Simmply Perfect Group.",
    images: [
      {
        url: "/logo.png",
        width: 1618,
        height: 972,
        alt: "Simmply Perfect Group",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Simmply Perfect Group | Windows, Doors, Interiors & Architectural Solutions",
    description:
      "Premium windows and doors, luxury interiors, renovation, metal works and architectural solutions by Simmply Perfect Group.",
    images: ["/logo.png"],
  },

  category: "Architecture, Windows, Doors, Interiors and Renovation",

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${siteUrl}/#organization`,
                  name: "Simmply Perfect Group",
                  url: siteUrl,
                  logo: `${siteUrl}/logo.png`,
                  email: "simplyperfectwindowsanddoors@gmail.com",
                  telephone: "+91 93907 19623",
                  sameAs: [
                    "https://www.facebook.com/profile.php?id=61575006093316",
                    "https://www.instagram.com/thesimmply.perfect/",
                    "https://x.com/simply1perfect",
                    "https://www.youtube.com/@SimmplyPerfectWindowsandDoors",
                    "https://www.linkedin.com/company/simmply-perfect-windows-doors/",
                  ],
                  founder: { "@id": `${siteUrl}/about#founder` },
                },
                {
                  "@type": "Person",
                  "@id": `${siteUrl}/about#founder`,
                  name: "Aakaash Deep Shrivastava",
                  jobTitle: "Founder & Technical Director",
                  image: `${siteUrl}/founder.jpg`,
                  worksFor: { "@id": `${siteUrl}/#organization` },
                },
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl}/#website`,
                  url: siteUrl,
                  name: "Simmply Perfect Group",
                  publisher: { "@id": `${siteUrl}/#organization` },
                },
              ],
            }).replace(/</g, "\\u003c"),
          }}
        />
        {children}

        {/* Floating Contact Buttons */}
        <FloatingContact />
      </body>
    </html>
  );
}
