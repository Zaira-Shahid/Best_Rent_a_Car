import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const SERVICES = [
  {
    icon: "person_pin_circle",
    title: "Chauffeur Service",
    text: "Sit back and relax while our professional chauffeurs handle the navigation and traffic.",
    href: "/services/executive-car-rental",
  },
  {
    icon: "flight_takeoff",
    title: "Airport Transfers",
    text: "VIP meet and greet services at major terminals with immediate luxury transfers.",
    href: "/services/airport-pick-drop",
  },
  {
    icon: "event_available",
    title: "Corporate Events",
    text: "Fleet management for high-profile business gatherings, weddings, and exclusive events.",
    href: "/services/corporate-car-rental",
  },
];

export function HomeServices() {
  return (
    <section className="bg-background py-16 sm:py-24 lg:py-[100px]">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Services Tailored to Your Lifestyle
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-brand-black/70">
              Airport transfers, corporate, daily, weekly, monthly, executive, and wedding car rental services across Pakistan.
            </p>
          </Reveal>

          <ul className="flex flex-col gap-4">
            {SERVICES.map((item, index) => (
              <li key={item.title}>
                <Reveal delay={index * 100}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-4 rounded-3xl border border-brand-black/10 bg-white p-5 transition duration-300 hover:border-brand-black hover:bg-brand-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red sm:gap-6 sm:p-7"
                  >
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-red/10 text-brand-red transition group-hover:bg-brand-red group-hover:text-white sm:h-16 sm:w-16">
                      <span className="material-symbols-outlined text-[30px] sm:text-[34px]" aria-hidden="true">
                        {item.icon}
                      </span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-heading text-xl font-semibold text-brand-black transition group-hover:text-white sm:text-2xl">
                        {item.title}
                      </span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-brand-black/70 transition group-hover:text-white/80 sm:text-base">
                        {item.text}
                      </span>
                      <span className="mt-3 block text-sm font-semibold text-brand-red-dark transition group-hover:text-white">
                        Explore Service
                      </span>
                    </span>
                    <span
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-brand-black/15 text-brand-black transition group-hover:translate-x-1 group-hover:border-white group-hover:bg-white"
                      aria-hidden="true"
                    >
                      <span className="material-symbols-outlined text-[22px]">arrow_forward</span>
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
