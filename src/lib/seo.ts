import type { Metadata } from "next";
import { brand } from "@/lib/brand";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://best-rent-a-car.vercel.app";

export const defaultKeywords = [
  "rent a car Pakistan",
  "car rental Islamabad",
  "car rental Rawalpindi",
  brand.name,
  "SUV rental Pakistan",
  "luxury car rental",
  "airport car rental",
  "chauffeur car rental",
  "rent a car with driver",
] as const;

type PageMetaInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
};

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalized === "/" ? "" : normalized}`;
}

export function pageMeta({
  title,
  description,
  path = "/",
  keywords = [],
  image,
  noIndex = false,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ? absoluteUrl(image) : absoluteUrl("/og-default.png");

  return {
    title,
    description,
    keywords: [...defaultKeywords, ...keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${brand.name}`,
      description,
      url,
      siteName: brand.name,
      locale: "en_PK",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: brand.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${brand.name}`,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}
