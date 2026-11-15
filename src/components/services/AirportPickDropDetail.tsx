import Image from "next/image";
import Link from "next/link";
import { CtaBanner } from "@/components/shared";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { brand, formatPhone, telLink, whatsappLink } from "@/lib/brand";
import type { ServiceDetail } from "@/types";
import { ServiceFaqAccordion } from "./ServiceFaqAccordion";
import { ServiceFeatureGrid } from "./ServiceFeatureGrid";
import { ServiceFleetGrid } from "./ServiceFleetGrid";

type AirportPickDropDetailProps = {
  data: ServiceDetail;
};

export function AirportPickDropDetail({ data }: AirportPickDropDetailProps) {
  const { hero, features, coverage, fleet, process, faqs, included, audience, notes } = data;

  return (
    <>
      <section className="relative flex min-h-[420px] items-center overflow-hidden py-14 sm:min-h-[520px] sm:py-16 lg:py-20">
        <Image src={hero.image} alt={hero.title} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/55 to-primary/20" />
        <Container className="relative z-10 grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="text-white lg:col-span-7">
            <span className="glass-panel mb-4 inline-flex animate-fade-up items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
              <span className="h-2 w-2 rounded-full bg-accent" />
              {hero.badge}
            </span>
            <h1 className="hero-shadow animate-fade-up font-heading text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl">
              {hero.title}
              {hero.accent ? (
                <>
                  {" "}
                  <span className="text-accent">{hero.accent}</span>
                </>
              ) : null}
            </h1>
            <p className="animate-fade-up-delay mt-4 max-w-xl text-sm text-white/85 sm:mt-5 sm:text-base lg:text-lg">
              {hero.description}
            </p>
            <div className="animate-fade-up-delay-2 mt-6 flex flex-wrap gap-4 text-sm">
              {brand.phones.map((phone) => (
                <a
                  key={phone.number}
                  href={telLink(phone.number)}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur transition hover:bg-white/20"
                >
                  <span className="material-symbols-outlined text-accent text-[18px]">call</span>
                  {formatPhone(phone.number)}
                </a>
              ))}
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 font-semibold !text-white transition hover:brightness-95"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                WhatsApp · {formatPhone(brand.whatsapp)}
              </a>
            </div>
          </div>

          <div className="animate-fade-up-delay-2 w-full lg:col-span-5" id="book">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-xl sm:p-6">
              <h2 className="font-heading text-lg font-semibold text-white sm:text-xl">Book Your Transfer</h2>
              <form className="mt-5 space-y-3" action="/contact">
                <div>
                  <label className="mb-1 block text-xs font-medium text-white/70">Pickup Airport</label>
                  <select className="w-full rounded-xl border border-white/15 bg-white/95 px-3 py-3 text-sm text-primary outline-none">
                    <option>Islamabad Intl (ISB)</option>
                    <option>Lahore Intl (LHE)</option>
                    <option>Karachi Intl (KHI)</option>
                    <option>Sialkot Intl (SKT)</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-white/70">Drop Location</label>
                  <input
                    type="text"
                    placeholder="Hotel / address"
                    className="w-full rounded-xl border border-white/15 bg-white/95 px-3 py-3 text-sm text-primary outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-white/70">Date</label>
                    <input
                      type="date"
                      className="w-full rounded-xl border border-white/15 bg-white/95 px-3 py-3 text-sm text-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-white/70">Time</label>
                    <input
                      type="time"
                      className="w-full rounded-xl border border-white/15 bg-white/95 px-3 py-3 text-sm text-primary outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-white/70">Vehicle</label>
                    <select className="w-full rounded-xl border border-white/15 bg-white/95 px-3 py-3 text-sm text-primary outline-none">
                      <option>Executive Sedan</option>
                      <option>Luxury SUV</option>
                      <option>{brand.name} Fleet</option>
                      <option>Van / Hiace</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-white/70">Passengers</label>
                    <select className="w-full rounded-xl border border-white/15 bg-white/95 px-3 py-3 text-sm text-primary outline-none">
                      <option>1–3</option>
                      <option>4–5</option>
                      <option>6–10</option>
                      <option>10+</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-2 w-full rounded-xl bg-accent py-3.5 text-sm font-semibold !text-white transition hover:brightness-95"
                >
                  Check Availability
                </button>
              </form>
            </div>
          </div>
        </Container>
      </section>

      {coverage ? (
        <section className="border-b border-primary/5 bg-white py-10 sm:py-12">
          <Container>
            <Reveal>
              <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                {coverage.title}
              </p>
            </Reveal>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {coverage.cities.map((city, index) => (
                <Reveal key={city.name} delay={index * 70}>
                  <div className="rounded-xl border border-primary/8 bg-background px-4 py-5 text-center">
                    <p className="font-heading text-lg font-semibold text-primary">{city.name}</p>
                    <p className="mt-1 text-xs text-muted">{city.tag}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="py-16 sm:py-24 lg:py-[100px]">
        <Container>
          <Reveal>
            <div className="mb-12 max-w-xl sm:mb-16">
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{features.title}</h2>
              <p className="mt-4 text-muted sm:text-lg">{features.description}</p>
            </div>
          </Reveal>
          <ServiceFeatureGrid items={features.items} />
        </Container>
      </section>

      <section className="bg-[#f8f9fa] py-16 sm:py-24 lg:py-[100px]" id="fleet">
        <Container>
          <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{fleet.title}</h2>
              <p className="mt-4 text-muted sm:text-lg">{fleet.description}</p>
            </div>
            <Link href="/cars" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">
              View Full Fleet
            </Link>
          </div>
          <ServiceFleetGrid items={fleet.items} />
        </Container>
      </section>

      {process ? (
        <section className="py-16 sm:py-24 lg:py-[100px]">
          <Container>
            <div className="mb-12 text-center sm:mb-16">
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{process.title}</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {process.steps.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-primary/8 bg-white p-6 shadow-[0_10px_30px_rgba(14,28,46,0.04)]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent font-heading text-sm font-bold !text-white">
                    {index + 1}
                  </span>
                  <span className="material-symbols-outlined mt-5 block text-3xl text-secondary">{step.icon}</span>
                  <h3 className="mt-4 font-heading text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted">{step.text}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {included ? (
        <section className="bg-navy py-16 text-white sm:py-24 lg:py-[100px]">
          <Container>
            <div className="mb-12 max-w-xl sm:mb-16">
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{included.title}</h2>
              {included.description ? <p className="mt-4 text-white/60 sm:text-lg">{included.description}</p> : null}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {included.items.map((item) => (
                <div key={item.text} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                    <span className="material-symbols-outlined text-lg">{item.icon}</span>
                  </span>
                  <p className="text-sm font-medium text-white/90">{item.text}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {audience ? (
        <section className="py-16 sm:py-24 lg:py-[100px]">
          <Container>
            <div className="mb-12 max-w-xl sm:mb-16">
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{audience.title}</h2>
              {audience.description ? <p className="mt-4 text-muted sm:text-lg">{audience.description}</p> : null}
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {audience.items.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-primary/8 bg-white p-8 shadow-[0_10px_30px_rgba(14,28,46,0.04)]"
                >
                  <span className="material-symbols-outlined mb-4 text-3xl text-secondary">{item.icon}</span>
                  <h4 className="mb-2 font-heading text-lg font-semibold">{item.title}</h4>
                  <p className="text-sm text-muted">{item.text}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {notes ? (
        <section className="bg-[#f8f9fa] py-16 sm:py-24 lg:py-[100px]">
          <Container>
            <div className="mb-12 max-w-xl sm:mb-16">
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{notes.title}</h2>
              {notes.description ? <p className="mt-4 text-muted sm:text-lg">{notes.description}</p> : null}
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {notes.items.map((item) => (
                <div key={item.title ?? item.text} className="rounded-2xl bg-white p-8 shadow-[0_10px_30px_rgba(14,28,46,0.04)]">
                  <span className="material-symbols-outlined mb-4 text-3xl text-secondary">{item.icon}</span>
                  {item.title ? <h4 className="mb-2 font-heading text-lg font-semibold">{item.title}</h4> : null}
                  <p className="text-sm text-muted">{item.text}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {faqs ? (
        <section className="py-16 sm:py-24 lg:py-[100px]">
          <Container>
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <h2 className="mb-8 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                  {faqs.title}
                </h2>
                <ServiceFaqAccordion items={faqs.items} />
              </div>
              <div className="lg:col-span-5">
                <div className="rounded-2xl bg-accent p-8 !text-white sm:p-10">
                  <h3 className="font-heading text-2xl font-semibold">Still have questions?</h3>
                  <p className="mt-3 text-sm text-primary/75">
                    Our concierge team is available 24/7 to assist with your airport transfer.
                  </p>
                  <div className="mt-8 flex flex-col gap-3">
                    {brand.phones.map((phone) => (
                      <a
                        key={phone.number}
                        href={telLink(phone.number)}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold !text-white transition hover:bg-navy"
                      >
                        <span className="material-symbols-outlined text-[18px]">call</span>
                        {formatPhone(phone.number)}
                      </a>
                    ))}
                    <a
                      href={whatsappLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-white py-3.5 text-sm font-semibold text-primary transition hover:bg-primary hover:!text-white"
                    >
                      Chat on WhatsApp · {formatPhone(brand.whatsapp)}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      <CtaBanner
        title="Landing soon? Book your airport transfer now."
        description="Flight monitoring, meet & greet, and doorstep drop-off across major Pakistani airports."
      />
    </>
  );
}
