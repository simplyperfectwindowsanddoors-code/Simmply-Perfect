import type { Metadata } from "next";

export const siteUrl = "https://simmplyperfect.com";

const organizationName = "Simmply Perfect Group";
const defaultImage = {
  url: "/logo.png",
  width: 1618,
  height: 972,
  alt: "Simmply Perfect Group",
};

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = new URL(path, siteUrl).toString();

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: `${title} | ${organizationName}`,
      description,
      url,
      siteName: organizationName,
      locale: "en_IN",
      type: "website",
      images: [defaultImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${organizationName}`,
      description,
      images: [defaultImage.url],
    },
  };
}
