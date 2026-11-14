import type { Metadata } from "next";
import { CityServicesContent } from "@/components/city/CityServicesContent";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "City Services",
  description:
    "Rent a car in Islamabad, Rawalpindi, Lahore, Karachi, Murree, Hunza, Skardu, and more cities across Pakistan.",
  path: "/city-services",
  keywords: ["city car rental", "rent a car Lahore", "rent a car Karachi"],
});

export default function CityServicesPage() {
  return <CityServicesContent />;
}
