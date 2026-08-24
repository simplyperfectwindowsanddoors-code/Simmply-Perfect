import type { MetadataRoute } from "next";

const siteUrl = "https://simmplyperfect.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/windows-doors`,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${siteUrl}/interiors`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/renovation`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/metal-works`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/gallery`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/articles`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/careers`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/contact`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/affiliate`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/partner`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
