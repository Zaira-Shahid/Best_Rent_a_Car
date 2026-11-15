import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cities } from "@/data/cities";
import { brand, whatsappLink } from "@/lib/brand";

const cityName = (slug: string) => cities.find((city) => city.slug === slug)?.name ?? slug;

const SERVICES = [
  { icon: "flight", label: "Airport Transfers" },
  { icon: "apartment", label: "City Rides" },
  { icon: "landscape", label: "Outstation Trips" },
  { icon: "groups", label: "Family Travel" },
] as const;

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.97.55 3.8 1.5 5.38L2 22l4.95-1.6a9.86 9.86 0 0 0 5.09 1.4h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2Zm5.76 13.98c-.24.68-1.4 1.25-1.93 1.33-.5.07-1.13.1-1.83-.12-.42-.13-.97-.32-1.67-.62-2.94-1.27-4.85-4.23-5-4.42-.14-.19-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.45.27-.29.59-.36.79-.36h.57c.18 0 .42-.07.66.5.24.58.82 2 .89 2.15.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.38-.45.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.03 1.12 1 2.07 1.31 2.36 1.46.29.15.46.12.63-.07.17-.2.73-.85.93-1.14.2-.29.4-.24.66-.14.27.1 1.7.8 1.99.95.29.15.48.22.55.34.07.13.07.73-.17 1.41Z" />
    </svg>
  );
}

/** "Our Service Coverage" section: copy + service tiles on the left, coverage map on the right. */
export function HomeCoverage() {
  const islamabad = cityName("islamabad");
  const rawalpindi = cityName("rawalpindi");

  return (
    <section className="overflow-hidden bg-white py-14 sm:py-20 lg:py-24" aria-labelledby="coverage-heading">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-8">
          <Reveal>
            <div>
              <p className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-[#ed0014] sm:text-sm">
                <span className="h-0.5 w-10 bg-[#ed0014]" aria-hidden="true" />
                Our Service Coverage
              </p>

              <h2
                id="coverage-heading"
                className="mt-5 font-heading text-3xl font-bold leading-tight tracking-tight text-[#15181d] sm:text-4xl lg:text-[44px]"
              >
                Premium Car Rental in {islamabad} &amp; <span className="text-[#ed0014]">{rawalpindi}</span>
              </h2>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                Experience comfortable and reliable car rental services with {brand.shortName.toUpperCase()}. Choose from
                economy cars, executive sedans, and luxury SUVs for city travel, airport transfers, business trips, and
                family journeys.
              </p>

              <ul className="mt-8 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                {SERVICES.map((service) => (
                  <li
                    key={service.label}
                    className="flex flex-col items-center gap-2 rounded-2xl bg-white px-2 py-4 text-center shadow-[0_8px_24px_rgba(21,24,29,0.08)] ring-1 ring-black/5"
                  >
                    <span className="material-symbols-outlined text-[30px] text-[#ed0014]" aria-hidden="true">
                      {service.icon}
                    </span>
                    <span className="text-sm font-semibold leading-tight text-[#15181d]">{service.label}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  href="/cars"
                  className="inline-flex items-center gap-3 rounded-full bg-[#ed0014] px-7 py-3.5 text-base font-semibold text-white shadow-[0_8px_20px_rgba(237,0,20,0.3)] transition hover:bg-[#b80010]"
                >
                  Explore Our Fleet
                  <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                    arrow_forward
                  </span>
                </Link>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="coverage-wa inline-flex items-center gap-2.5 rounded-full border px-7 py-3.5 text-base font-semibold transition"
                >
                  <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <Image
              src="/images/coverage-map.webp"
              alt={`${brand.name} service coverage map: ${islamabad}, ${rawalpindi} and ${islamabad} International Airport`}
              width={1448}
              height={1086}
              className="mx-auto h-auto w-full max-w-[640px] lg:max-w-none"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
