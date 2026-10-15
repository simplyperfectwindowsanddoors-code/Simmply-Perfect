import { siteUrl } from "@/lib/seo";

type PageStructuredDataProps = {
  title: string;
  description: string;
  path: string;
  serviceName?: string;
};

/** Server-rendered facts shared with each page's native metadata. */
export default function PageStructuredData({
  title,
  description,
  path,
  serviceName,
}: PageStructuredDataProps) {
  const url = new URL(path, siteUrl).toString();
  const graph = [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: title,
      description,
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#organization` },
      ...(serviceName && { mainEntity: { "@id": `${url}#service` } }),
    },
    ...(serviceName
      ? [{
          "@type": "Service",
          "@id": `${url}#service`,
          url,
          name: serviceName,
          description,
          provider: { "@id": `${siteUrl}/#organization` },
          areaServed: { "@type": "City", name: "Hyderabad" },
        }]
      : []),
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph,
        }).replace(/</g, "\\u003c"),
      }}
    />
  );
}
