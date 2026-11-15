import type { Metadata } from "next";
import {
  BrandStrip,
  HomeBlog,
  HomeCoverage,
  HomeCta,
  HomeDestinations,
  HomeFleet,
  HomeHero,
  HomeReviews,
  HomeServices,
  HowItWorks,
  PromoBanner,
  WhyChooseUs,
} from "@/components/home";
import { pageMeta } from "@/lib/seo";
import { PremiumFleetPreview } from "@/components/home/PremiumFleetPreview";
import { brand } from "@/lib/brand";

export const metadata: Metadata = pageMeta({
  title: "Premium Car Rental with Driver in Pakistan",
  description:
    `Book chauffeur-driven cars with ${brand.name}. Economy, sedan, SUV, and luxury fleet across Islamabad, Rawalpindi, Lahore, Karachi, and northern destinations.`,
  path: "/",
  keywords: ["car hire Pakistan", "rent a car Islamabad with driver", "monthly car rental"],
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <PremiumFleetPreview />
      <BrandStrip />
      <HomeFleet />
      <PromoBanner />
      <HowItWorks />
      <WhyChooseUs />
      <HomeServices />
      <PromoBanner
        eyebrow="Serving Rawalpindi"
        title={`${brand.name} with Driver in Rawalpindi`}
        description={`${brand.name} specializes in car rental with driver in Rawalpindi for airport transfers, corporate travel, official visits, weddings, city tours, and family trips. Choose from a wide range of clean, insured, and professionally maintained vehicles driven by experienced chauffeurs, available 24/7 at competitive rates.`}
        href="/rent-a-car/rawalpindi"
        ctaLabel="Rent a Car in Rawalpindi"
        imageSrc="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1800&q=80"
      />
      <HomeCoverage />
      <HomeDestinations />
      <HomeReviews />
      <HomeBlog />
      <HomeCta />
    </>
  );
}
