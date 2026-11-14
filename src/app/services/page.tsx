import type { Metadata } from "next";
import { CtaBanner, PageHero } from "@/components/shared";
import { ServicesGrid } from "@/components/services/ServicesGrid";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Services",
  description:
    "Airport transfers, corporate, daily, weekly, monthly, executive, and wedding car rental services across Pakistan.",
  path: "/services",
  keywords: ["airport transfer", "corporate car rental", "wedding car rental"],
});

export default function ServicesIndexPage() {
  return (
    <>
      <PageHero
        title="Our Services"
        description="Every item in the Services menu has its own full page — pick the plan that matches your trip."
      />
      <ServicesGrid />
      <CtaBanner />
    </>
  );
}
