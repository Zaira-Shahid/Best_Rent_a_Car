import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { FirebaseAnalytics } from "@/components/FirebaseAnalytics";
import { SiteShell } from "@/components/layout/SiteShell";
import { brand, internationalPhone } from "@/lib/brand";
import { absoluteUrl, defaultKeywords, siteUrl } from "@/lib/seo";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: brand.colors.primary,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${brand.name} | Premium Car Rental in Pakistan`,
    template: `%s | ${brand.name}`,
  },
  description:
    "Rent economy, sedan, SUV, and luxury cars with professional drivers across Pakistan. Chauffeur car rental in Islamabad, Rawalpindi, Lahore, Karachi, and tourist destinations.",
  applicationName: brand.name,
  authors: [{ name: brand.name }],
  creator: brand.name,
  publisher: brand.name,
  keywords: [...defaultKeywords],
  category: "travel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: absoluteUrl("/"),
    siteName: brand.name,
    title: `${brand.name} | Premium Car Rental in Pakistan`,
    description: brand.tagline,
    images: [
      {
        url: absoluteUrl("/og-default.png"),
        width: 1200,
        height: 630,
        alt: brand.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} | Premium Car Rental in Pakistan`,
    description: brand.tagline,
    images: [absoluteUrl("/og-default.png")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {},
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    name: brand.name,
    description: brand.tagline,
    url: siteUrl,
    telephone: internationalPhone(brand.phone),
    email: brand.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Islamabad",
      addressCountry: "PK",
    },
    sameAs: [brand.social.facebook, brand.social.instagram],
    hasMap: brand.location.mapsUrl,
    areaServed: "Pakistan",
    priceRange: "$$",
  };

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      {/* Extensions may inject body attributes before React hydrates. */}
      <body className={`${sora.variable} ${inter.variable}`} suppressHydrationWarning>
        <FirebaseAnalytics />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
