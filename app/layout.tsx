import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import FloatingContact from "@/components/common/FloatingContact";

const geistSans = Geist({

  variable: "--font-geist-sans",

  subsets: ["latin"],

});

const geistMono = Geist_Mono({

  variable: "--font-geist-mono",

  subsets: ["latin"],

});

export const metadata: Metadata = {

  title: "Simmply Perfect Group",

  description:

    "Premium Windows & Doors, Luxury Interiors, Renovations, and Metal Works.",

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

        {children}

        {/* Floating Contact Buttons */}

        <FloatingContact />

      </body>

    </html>

  );

}