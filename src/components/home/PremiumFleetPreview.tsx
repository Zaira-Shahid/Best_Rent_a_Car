import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

const categories = [
  { label: "Luxury", href: "/categories/luxury", image: "/images/fleet/s500-white.webp", alt: "White Mercedes luxury sedan" },
  { label: "SUV", href: "/categories/suv-hybrid", image: "/images/fleet/sportage-black.webp", alt: "Black Kia Sportage SUV" },
  { label: "Economy", href: "/categories/economy", image: "/images/fleet/yaris-white.webp", alt: "White Toyota Yaris economy sedan" },
  { label: "4x4", href: "/categories/executive-suv", image: "/images/fleet/prado-white.webp", alt: "White Toyota Prado 4x4" },
] as const;

export function PremiumFleetPreview() {
  return (
    <section className="premium-fleet-preview" aria-labelledby="premium-fleet-title">
      <Container>
        <div className="premium-fleet-intro">
          <p className="premium-fleet-eyebrow">Our Premium Fleet</p>
          <h2 id="premium-fleet-title">Explore Our Premium Fleet</h2>
          <p className="premium-fleet-description">From luxury sedans to powerful SUVs, find the perfect ride for every journey.</p>
          <p className="premium-fleet-mobile-description">Top brands. Unmatched performance.</p>
        </div>
        <div className="premium-fleet-categories">
          {categories.map((category) => (
            <Link key={category.label} href={category.href} className="premium-category" aria-label={`Explore ${category.label} cars`}>
              <Image src={category.image} alt={category.alt} fill sizes="(max-width: 639px) 46vw, (max-width: 1023px) 45vw, 300px" />
              <span className="premium-category-badge">{category.label}</span>
              <span className="premium-category-arrow" aria-hidden="true">&#8594;</span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
