import type { Metadata } from "next";
import { Suspense } from "react";
import { CarGridSection, CarsHero } from "@/components/cars";
import { RentalSearchBanner } from "@/components/cars/RentalSearchBanner";
import { CtaBanner } from "@/components/shared";
import { brand, whatsappLink } from "@/lib/brand";
import { carCategories, carModels } from "@/data";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Our Cars",
  description:
    `Browse economy, sedan, SUV, luxury, and Hiace rental cars. Transparent daily and monthly rates with ${brand.name}.`,
  path: "/cars",
  keywords: ["car fleet Pakistan", "SUV rental", "luxury car hire"],
});


const heroImage =
  carModels.find((car) => car.slug === "mercedes-s500")?.image ??
  carModels[0]?.image ??
  "/images/fleet/s500-white.png";

export default function CarsPage() {
  return (
    <>
      <Suspense fallback={null}>
        <RentalSearchBanner />
      </Suspense>
      <CarsHero
        badge={`${brand.name} Fleet`}
        title="Our"
        accent="Cars"
        description="Explore economy to luxury — sedans, SUVs, executive rides, and group travel vehicles for every journey across Pakistan."
        image={heroImage}
        imageAlt={`${brand.name} fleet`}
        primaryCta={{ label: "Browse All Models", href: "#all-models" }}
        secondaryCta={{ label: "WhatsApp Booking", href: whatsappLink() }}
        stats={[
          { value: `${carModels.length}+`, label: "Models" },
          { value: `${carCategories.length}`, label: "Categories" },
          { value: "Daily", label: "Weekly & Monthly" },
          { value: "24/7", label: "Support" },
        ]}
      />
      <div id="all-models">
        <CarGridSection
          title="All models"
          description="Every car in our fleet — named and priced for daily or monthly rental."
          cars={carModels}
          showViewAll={false}
          className="bg-white"
        />
      </div>
      <CtaBanner />
    </>
  );
}
