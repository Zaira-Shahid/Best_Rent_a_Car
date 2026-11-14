import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CarGridSection, CarsHero } from "@/components/cars";
import { CtaBanner } from "@/components/shared";
import { brand } from "@/lib/brand";
import { carCategories, getCarsForCategory } from "@/data";
import { pageMeta } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return carCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = carCategories.find((item) => item.slug === slug);
  if (!category) return { title: "Category Not Found" };

  return pageMeta({
    title: category.name,
    description:
      category.description ??
      `Browse ${category.name.toLowerCase()} available for rent with Best Rent a Car.`,
    path: `/categories/${category.slug}`,
    keywords: [`${category.name} rental`, `${category.name} Pakistan`],
  });
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = carCategories.find((item) => item.slug === slug);
  if (!category) notFound();

  const models = getCarsForCategory(category.slug);
  const heroImage = models[0]?.image ?? "/images/fleet/corolla-white.jpg";
  const nameParts = category.name.split(" ");
  const accent = nameParts.length > 1 ? nameParts[nameParts.length - 1] : undefined;
  const title = accent ? nameParts.slice(0, -1).join(" ") : category.name;

  return (
    <>
      <CarsHero
        badge="Car Category"
        title={title || category.name}
        accent={accent}
        description={
          category.description ??
          `Explore our ${category.name.toLowerCase()} available for city and outstation travel.`
        }
        image={heroImage}
        imageAlt={category.name}
        primaryCta={{ label: "View Models", href: "#available-models" }}
        secondaryCta={{ label: "WhatsApp", href: `https://wa.me/${brand.whatsapp}` }}
        stats={[
          { value: `${models.length}`, label: "Cars Available" },
          { value: "Chauffeur", label: "With Every Hire" },
          { value: "Flexible", label: "Rental Plans" },
          { value: "Islamabad", label: "& Nationwide" },
        ]}
      />
      <div id="available-models">
        <CarGridSection
          title="Available models"
          description={`Book any ${category.name.toLowerCase()} vehicle via WhatsApp, call, or inquiry.`}
          cars={models}
          viewAllHref="/cars"
          viewAllLabel="View All Cars"
          className="bg-white"
        />
      </div>
      <CtaBanner />
    </>
  );
}
