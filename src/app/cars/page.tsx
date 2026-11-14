import type { Metadata } from "next";
import { CarGridSection, CarsHero } from "@/components/cars";
import { CtaBanner } from "@/components/shared";
import { brand } from "@/lib/brand";
import { carCategories, carModels } from "@/data";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Our Cars",
  description:
    "Browse economy, sedan, SUV, luxury, and Hiace rental cars. Transparent daily and monthly rates with Aziz Afridi Rent A Car.",
  path: "/cars",
  keywords: ["car fleet Pakistan", "SUV rental", "luxury car hire"],
});


const heroImage =
  carModels.find((car) => car.slug === "mercedes-s500")?.image ??
  carModels[0]?.image ??
  "/images/fleet/s500-white.png";

export default async function CarsPage({ searchParams }: {
  searchParams: Promise<{ location?: string; pickup?: string; return?: string }>;
}) {
  const search = await searchParams;
  return (
    <>
      {search.location && (
        <div className="border-b border-red-100 bg-red-50 px-6 py-4 text-center text-sm text-primary">
          <strong>Your rental search: {search.location}</strong>
          {search.pickup && <span> · Pickup: {search.pickup.replace("T", " at ")}</span>}
          {search.return && <span> · Return: {search.return.replace("T", " at ")}</span>}
          <p className="mt-1">Browse the fleet below. Availability is confirmed when you enquire.</p>
        </div>
      )}
      <CarsHero
        badge="Aziz Afridi Fleet"
        title="Our"
        accent="Cars"
        description="Explore economy to luxury — sedans, SUVs, executive rides, and group travel vehicles for every journey across Pakistan."
        image={heroImage}
        imageAlt="Aziz Afridi Rent A Car fleet"
        primaryCta={{ label: "Browse All Models", href: "#all-models" }}
        secondaryCta={{ label: "WhatsApp Booking", href: `https://wa.me/${brand.whatsapp}` }}
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
