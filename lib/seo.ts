import { Metadata } from "next";
import { PERSONAL_INFO, SITE_CONFIG } from "./constants";

export function generateSeoMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_CONFIG.domain),
    title: {
      default: SITE_CONFIG.title,
      template: `%s | ${PERSONAL_INFO.name}`,
    },
    description: SITE_CONFIG.description,
    keywords: SITE_CONFIG.keywords,
    authors: [{ name: PERSONAL_INFO.name, url: SITE_CONFIG.domain }],
    creator: PERSONAL_INFO.name,
    publisher: PERSONAL_INFO.name,
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
      locale: "en_US",
      url: SITE_CONFIG.domain,
      siteName: `${PERSONAL_INFO.name} Portfolio`,
      title: SITE_CONFIG.title,
      description: SITE_CONFIG.description,
      images: [
        {
          url: `${SITE_CONFIG.domain}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${PERSONAL_INFO.name} - Software Engineer Portfolio`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_CONFIG.title,
      description: SITE_CONFIG.description,
      creator: SITE_CONFIG.twitterHandle,
      images: [`${SITE_CONFIG.domain}/og-image.png`],
    },
    alternates: {
      canonical: SITE_CONFIG.domain,
    },
  };
}

export function generateJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_CONFIG.domain}/#person`,
        name: PERSONAL_INFO.name,
        givenName: PERSONAL_INFO.shortName,
        jobTitle: PERSONAL_INFO.titles[0],
        description: PERSONAL_INFO.tagline,
        url: SITE_CONFIG.domain,
        sameAs: [
          "https://linkedin.com/in/deepaknandakumar",
          "https://github.com/deepaknandakumar",
        ],
        knowsAbout: [
          "Software Engineering",
          "Full-Stack Web Development",
          "Next.js",
          "Python",
          "React",
          "Artificial Intelligence",
          "Knowledge Graphs",
          "Neo4j",
          "Data Engineering",
          "Databricks",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_CONFIG.domain}/#website`,
        url: SITE_CONFIG.domain,
        name: SITE_CONFIG.title,
        description: SITE_CONFIG.description,
        publisher: {
          "@id": `${SITE_CONFIG.domain}/#person`,
        },
        inLanguage: "en-US",
      },
    ],
  };
}
