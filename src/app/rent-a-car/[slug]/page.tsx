import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CityDetailContent } from "@/components/city/CityDetailContent";
import { cities } from "@/data";
import { pageMeta } from "@/lib/seo";
import { brand } from "@/lib/brand";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return cities.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const city = cities.find((item) => item.slug === slug);
  if (!city) return { title: "City Not Found" };

  return pageMeta({
    title: `Rent a Car in ${city.name}`,
    description: `Affordable and premium car rental in ${city.name}. Chauffeur-driven cars for business, tourism, and family travel with ${brand.name}.`,
    path: `/rent-a-car/${city.slug}`,
    keywords: [`rent a car ${city.name}`, `${city.name} car rental`, `car hire ${city.name}`],
  });
}


export default async function CityPage({ params }: Props) {
  const { slug } = await params;
  const city = cities.find((item) => item.slug === slug);
  if (!city) notFound();

  return <CityDetailContent city={city} />;
}
