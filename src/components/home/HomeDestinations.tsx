import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const DESTINATIONS = [
  {
    name: "Islamabad",
    meta: "Capital City",
    href: "/rent-a-car/islamabad",
    image: "/images/site/destinations/islamabad.webp",
    alt: "Pakistan Monument in Islamabad at dusk",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    name: "Lahore",
    meta: "Cultural Hub",
    href: "/rent-a-car/lahore",
    image: "/images/site/destinations/lahore.webp",
    alt: "Wazir Khan Mosque courtyard in Lahore",
    className: "md:col-span-2",
  },
  {
    name: "Karachi",
    meta: "Coastal Metropolis",
    href: "/rent-a-car/karachi",
    image: "/images/site/destinations/karachi.webp",
    alt: "Mazar-e-Quaid mausoleum in Karachi",
    className: "",
  },
  {
    name: "Hunza",
    meta: "Northern Escape",
    href: "/rent-a-car/hunza",
    image: "/images/site/destinations/hunza.webp",
    alt: "Attabad Lake in Hunza with turquoise water",
    className: "",
  },
];

export function HomeDestinations() {
  return (
    <section className="bg-[#f3f4f5] py-16 sm:py-24 lg:py-[100px]">
      <Container>
        <Reveal>
          <div className="mb-10 text-center sm:mb-12">
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Drive Across Pakistan
            </h2>
            <p className="mt-4 text-muted">Discover our premier service hubs across iconic destinations.</p>
          </div>
        </Reveal>

        <div className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:auto-rows-[240px] md:grid-cols-4 md:grid-rows-2 md:h-[560px] md:auto-rows-fr">
          {DESTINATIONS.map((item, index) => (
            <Reveal key={item.name} delay={Math.min(index, 3) * 80} className={item.className}>
              <Link href={item.href} className="group relative block h-full min-h-[220px] overflow-hidden rounded-2xl sm:min-h-[240px] md:min-h-0 md:h-full">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover transition duration-1000 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/35 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)] sm:bottom-8 sm:left-8">
                  <h3 className="font-heading text-lg font-semibold sm:text-2xl">{item.name}</h3>
                  <p className="text-xs text-white/80 sm:text-sm">{item.meta}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
