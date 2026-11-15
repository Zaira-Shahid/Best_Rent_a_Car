import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getCarsForCategory } from "@/data";

const categories = [
  { label: "Luxury", slug: "luxury", href: "/categories/luxury", image: "/images/fleet/s500-white.webp", alt: "White Mercedes luxury sedan" },
  { label: "SUV", slug: "suv-hybrid", href: "/categories/suv-hybrid", image: "/images/fleet/sportage-black.webp", alt: "Black Kia Sportage SUV" },
  { label: "Economy", slug: "economy", href: "/categories/economy", image: "/images/fleet/yaris-white.webp", alt: "White Toyota Yaris economy sedan" },
  { label: "4x4", slug: "executive-suv", href: "/categories/executive-suv", image: "/images/fleet/prado-white.webp", alt: "White Toyota Prado 4x4" },
] as const;

export function PremiumFleetPreview() {
  return (
    <section className="bg-[#f7f8fa] py-14 text-brand-black sm:py-20" aria-labelledby="premium-fleet-title">
      <Container>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div>
            <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-brand-red-dark">Our Premium Fleet</p>
            <h2 id="premium-fleet-title" className="mt-2 text-[clamp(1.75rem,3.6vw,2.75rem)] font-extrabold leading-[1.1] tracking-tight">
              Explore Our Premium Fleet
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-brand-black/70 sm:text-base lg:text-right">
            <span className="sm:hidden">Top brands. Unmatched performance.</span>
            <span className="hidden sm:inline">From luxury sedans to powerful SUVs, find the perfect ride for every journey.</span>
          </p>
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {categories.map((category) => {
            const count = getCarsForCategory(category.slug).length;
            return (
              <li key={category.label} className="min-w-0">
                <Link
                  href={category.href}
                  aria-label={`Explore ${category.label} cars`}
                  className="group flex h-full flex-col overflow-hidden rounded-[22px] bg-brand-black transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_40px_rgba(21,24,29,0.28)] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-brand-red sm:rounded-[28px]"
                >
                  <span className="relative block aspect-[5/4] overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.alt}
                      fill
                      sizes="(max-width: 1023px) 46vw, 300px"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </span>
                  <span className="flex flex-1 items-center justify-between gap-2 px-4 py-4 sm:px-6 sm:py-5">
                    <span className="min-w-0">
                      <span className="block font-heading text-lg font-bold leading-tight !text-white sm:text-2xl">{category.label}</span>
                      <span className="mt-0.5 block text-[13px] text-white/75 sm:text-sm">
                        {count} {count === 1 ? "vehicle" : "vehicles"}
                      </span>
                    </span>
                    <span
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-red text-xl text-white transition group-hover:translate-x-1 sm:h-12 sm:w-12"
                      aria-hidden="true"
                    >
                      &#8594;
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
