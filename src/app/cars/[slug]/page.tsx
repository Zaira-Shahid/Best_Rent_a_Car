import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CarDetailBody, CarsHero } from "@/components/cars";
import { CtaBanner } from "@/components/shared";
import { brand, formatPrice } from "@/lib/brand";
import { carCategories, carModels } from "@/data";
import { pageMeta } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return carModels.map((car) => ({ slug: car.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const car = carModels.find((item) => item.slug === slug);
  if (!car) return { title: "Car Not Found" };

  return pageMeta({
    title: `${car.name} Rental`,
    description: `Rent a ${car.name} (${car.brand}) with Best Rent a Car. From ${formatPrice(car.priceDay)}/day. Professional chauffeur included.`,
    path: `/cars/${car.slug}`,
    keywords: [`${car.name} rental`, `${car.brand} rent a car`, `${car.category} car rental`],
    image: car.image,
  });
}

export default async function CarModelPage({ params }: Props) {
  const { slug } = await params;
  const car = carModels.find((item) => item.slug === slug);
  if (!car) notFound();

  const category = carCategories.find((item) => item.slug === car.category);
  const related = carModels
    .filter((item) => item.category === car.category && item.slug !== car.slug)
    .slice(0, 3);

  return (
    <>
      <CarsHero
        badge={car.badge ?? car.brand}
        title={car.name}
        accent="Rental"
        description={`Book the ${car.name} for daily, weekly, or monthly hire — comfortable travel with Best Rent a Car across Pakistan.`}
        image={car.image}
        imageAlt={`${car.name} rental`}
        primaryCta={{ label: "Inquire Now", href: "/contact" }}
        secondaryCta={{
          label: "Call Us",
          href: `tel:${brand.phone}`,
        }}
        stats={[
          { value: formatPrice(car.priceDay), label: "Per Day" },
          { value: `${car.seats}`, label: "Seats" },
          { value: car.transmission, label: "Transmission" },
          { value: car.fuel, label: "Fuel" },
        ]}
      />

      <CarDetailBody
        car={car}
        categoryName={category?.name ?? car.category}
        related={related}
      />

      <CtaBanner
        title={`Ready to book the ${car.name}?`}
        description="Confirm dates on WhatsApp or call — we reply quickly with availability."
      />
    </>
  );
}
