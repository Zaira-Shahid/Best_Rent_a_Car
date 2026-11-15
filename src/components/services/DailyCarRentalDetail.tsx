import Image from "next/image";
import { BookingBar } from "@/components/home/BookingBar";
import { CtaBanner } from "@/components/shared";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { formatPrice } from "@/lib/brand";
import { cn } from "@/lib/utils";
import type { ServiceDetail } from "@/types";
import { ServiceFaqAccordion } from "./ServiceFaqAccordion";
import { ServiceFeatureGrid } from "./ServiceFeatureGrid";
import { ServiceFleetGrid } from "./ServiceFleetGrid";
import { ServiceTestimonials } from "./ServiceTestimonials";

type DailyCarRentalDetailProps = {
  data: ServiceDetail;
};

export function DailyCarRentalDetail({ data }: DailyCarRentalDetailProps) {
  const { hero, features, fleet, packages, testimonials, faqs, included, audience } = data;

  return (
    <>
      <section className="relative flex min-h-[420px] items-center overflow-hidden py-14 sm:min-h-[480px] sm:py-16 lg:min-h-[520px] lg:py-20">
        <Image src={hero.image} alt={hero.title} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/45 to-primary/10" />
        <Container className="relative z-10 grid items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="text-white lg:col-span-7">
            <span className="glass-panel mb-4 inline-flex animate-fade-up items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest sm:mb-6">
              <span className="h-2 w-2 rounded-full bg-accent" />
              {hero.badge}
            </span>
            <h1 className="hero-shadow animate-fade-up font-heading text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl">
              {hero.title}
              {hero.accent ? <> <span className="text-white underline decoration-brand-red decoration-[5px] underline-offset-[10px]">{hero.accent}</span></> : null}
            </h1>
            <p className="animate-fade-up-delay mt-4 max-w-xl text-sm text-white/85 sm:mt-5 sm:text-base lg:text-lg">{hero.description}</p>
          </div>
          <div className="animate-fade-up-delay-2 w-full lg:col-span-5" id="fleet-search">
            <BookingBar />
          </div>
        </Container>
      </section>

      <section className="bg-surface py-16 sm:py-24 lg:py-[100px]">
        <Container>
          <Reveal>
            <div className="mb-12 text-center sm:mb-16">
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{features.title}</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted sm:text-lg">{features.description}</p>
            </div>
          </Reveal>
          <ServiceFeatureGrid items={features.items} />
        </Container>
      </section>

      <section className="py-16 sm:py-24 lg:py-[100px]" id="fleet">
        <Container>
          <Reveal>
            <div className="mb-12 max-w-xl sm:mb-16">
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{fleet.title}</h2>
              <p className="mt-4 text-muted sm:text-lg">{fleet.description}</p>
            </div>
          </Reveal>
          <ServiceFleetGrid items={fleet.items} />
        </Container>
      </section>

      {included ? (
        <section className="bg-[#f8f9fa] py-16 sm:py-24 lg:py-[100px]">
          <Container>
            <div className="mb-12 max-w-xl sm:mb-16">
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{included.title}</h2>
              {included.description ? <p className="mt-4 text-muted sm:text-lg">{included.description}</p> : null}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {included.items.map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-4 rounded-xl border border-primary/8 bg-white p-5 shadow-[0_10px_30px_rgba(14,28,46,0.04)]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                    <span className="material-symbols-outlined text-lg">{item.icon}</span>
                  </span>
                  <p className="text-sm font-medium text-primary">{item.text}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {packages ? (
        <section className="bg-navy py-16 text-white sm:py-24 lg:py-[100px]">
          <Container>
            <div className="mb-12 text-center sm:mb-16">
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{packages.title}</h2>
              <p className="mx-auto mt-4 max-w-2xl text-white/60 sm:text-lg">{packages.description}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {packages.items.map((pkg) => (
                <div
                  key={pkg.name}
                  className={cn(
                    "relative flex flex-col items-center rounded-2xl border p-8 text-center sm:p-10",
                    pkg.featured
                      ? "border-transparent bg-white text-primary shadow-2xl"
                      : "border-white/10 bg-white/5 backdrop-blur-lg",
                  )}
                >
                  {pkg.featured ? (
                    <span className="absolute -top-4 rounded-full bg-accent px-6 py-1 text-xs font-semibold uppercase tracking-wide !text-white shadow-lg">
                      Most Popular
                    </span>
                  ) : null}
                  <span className="mb-4 text-xs font-semibold uppercase tracking-widest text-secondary">
                    {pkg.name}
                  </span>
                  <div className="mb-6 font-heading text-4xl font-bold sm:text-5xl">
                    {formatPrice(pkg.priceDay)}
                    <span className={cn("text-base font-normal", pkg.featured ? "text-muted" : "text-white/60")}>
                      {pkg.unit ?? "/24hr"}
                    </span>
                  </div>
                  <ul className={cn("mb-10 space-y-4 text-sm", pkg.featured ? "text-muted" : "text-white/80")}>
                    {pkg.features.map((feature) => (
                      <li
                        key={feature.text}
                        className={cn("flex items-center justify-center gap-2", !feature.included && "opacity-40")}
                      >
                        <span
                          className={cn(
                            "material-symbols-outlined text-xl",
                            feature.included ? (pkg.featured ? "text-secondary" : "text-accent") : "",
                          )}
                        >
                          {feature.included ? "check_circle" : "block"}
                        </span>
                        {feature.text}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/contact"
                    className={cn(
                      "w-full rounded-full py-4 text-sm font-semibold transition",
                      pkg.featured
                        ? "bg-primary text-white hover:bg-secondary"
                        : "border border-white/20 hover:bg-white hover:text-primary",
                    )}
                  >
                    Select Package
                  </a>
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

      {testimonials ? (
        <section className="py-16 sm:py-24 lg:py-[100px]">
          <Container>
            <div className="grid gap-12 lg:grid-cols-3">
              <div>
                <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                  {testimonials.title}
                </h2>
                {testimonials.ratingSummary ? (
                  <div className="mt-8 flex items-center gap-4">
                    <span className="material-symbols-outlined text-3xl text-accent" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <div>
                      <span className="block font-semibold">{testimonials.ratingSummary.value}</span>
                      <span className="text-sm text-muted">{testimonials.ratingSummary.label}</span>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="lg:col-span-2">
                <ServiceTestimonials items={testimonials.items} />
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {faqs ? (
        <section className="bg-[#f8f9fa] py-16 sm:py-24 lg:py-[100px]">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-12 text-center font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                {faqs.title}
              </h2>
              <ServiceFaqAccordion items={faqs.items} />
            </div>
          </Container>
        </section>
      ) : null}

      <CtaBanner
        title={`Ready to book ${data.name.toLowerCase()}?`}
        description="Pick your vehicle and get clear daily rates with doorstep delivery across major cities."
      />
    </>
  );
}
