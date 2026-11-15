import type { Metadata } from "next";
import {
  BrandStrip,
  HomeBlog,
  HomeCities,
  HomeCoverage,
  HomeCta,
  HomeDestinations,
  HomeFleet,
  HomeHero,
  HomeReviews,
  HomeServices,
  HowItWorks,
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
      <BrandStrip />
      <PremiumFleetPreview />
      <HomeFleet />
      <HomeCities />
      <HomeServices />
      <HowItWorks />
      <HomeCoverage />
      <HomeDestinations />
      <HomeReviews />
      <WhyChooseUs />
      <HomeBlog />
      <HomeCta />
    </>
  );
}
