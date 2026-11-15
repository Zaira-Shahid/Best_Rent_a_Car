import { CarGridSection } from "@/components/cars/CarGridSection";
import { fleetSections, getCarsBySlugs } from "@/data";

/** Home page fleet sections, in display order. Luxury and the rest stay on /cars and /categories. */
const homeFleetConfig = [
  { slug: "executive-suv", pill: "section" },
  { slug: "suv-hybrid", pill: "section" },
  { slug: "premium", pill: "section", tone: "red" },
  { slug: "standard", pill: "our-fleet" },
  {
    slug: "economy",
    pill: "our-fleet",
    // Subtitle copied from the Economy mockup (differs from the fleetSections description).
    description: "Book any economy fleet vehicle via WhatsApp, call, or inquiry.",
  },
] as const;

export function HomeFleet() {
  return (
    <>
      {homeFleetConfig.map((config, index) => {
        const section = fleetSections.find((item) => item.slug === config.slug);
        if (!section) return null;

        return (
          <CarGridSection
            key={config.slug}
            title={section.name}
            eyebrow={config.pill === "section" ? section.name : "Our Fleet"}
            cardLabel={section.name.replace(/ Fleet$/, "")}
            description={"description" in config ? config.description : section.description}
            cars={getCarsBySlugs(section.carSlugs.slice(0, 3))}
            viewAllHref={`/categories/${config.slug}`}
            viewAllLabel="Explore More"
            viewAllTone={"tone" in config ? config.tone : "dark"}
            showViewAll
            className={index % 2 === 0 ? "bg-white" : "bg-background"}
          />
        );
      })}
    </>
  );
}
