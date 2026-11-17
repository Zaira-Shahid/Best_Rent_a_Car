import Image from "next/image";
import Link from "next/link";
import { CtaBanner } from "@/components/shared";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { formatPrice } from "@/lib/brand";
import { cn } from "@/lib/utils";
import type { ServiceDetail } from "@/types";
import { ServiceFaqAccordion } from "./ServiceFaqAccordion";
import { ServiceFeatureGrid } from "./ServiceFeatureGrid";
import { ServiceFleetGrid } from "./ServiceFleetGrid";
import { ServiceHero } from "./ServiceHero";
import { ServiceTestimonials } from "./ServiceTestimonials";

type WeeklyCarRentalDetailProps = {
  data: ServiceDetail;
};

export function WeeklyCarRentalDetail({ data }: WeeklyCarRentalDetailProps) {
  const { hero, features, fleet, packages, process, testimonials, faqs, included, audience } = data;

  return (
    <>
      <ServiceHero hero={hero} />

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

      {packages ? (
        <section className="bg-navy py-16 text-white sm:py-24 lg:py-[100px]" id="packages">
          <Container>
            <Reveal>
              <div className="mb-12 text-center sm:mb-16">
                <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{packages.title}</h2>
                <p className="mx-auto mt-4 max-w-2xl text-white/60 sm:text-lg">{packages.description}</p>
              </div>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {packages.items.map((pkg, index) => (
                <Reveal key={pkg.name} delay={index * 80}>
                <div
                  className={cn(
                    "relative flex h-full flex-col rounded-2xl border p-6 sm:p-8",
                    pkg.featured
                      ? "border-transparent bg-white text-primary shadow-2xl"
                      : "border-white/10 bg-white/5 backdrop-blur-lg",
                  )}
                >
                  {pkg.featured ? (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-[10px] font-semibold uppercase tracking-wide !text-white">
                      Most Popular
                    </span>
                  ) : null}
                  <span className="mb-3 text-xs font-semibold uppercase tracking-widest text-secondary">
                    {pkg.name}
                  </span>
                  <div className="mb-6 font-heading text-3xl font-bold sm:text-4xl">
                    {formatPrice(pkg.priceDay)}
                    <span className={cn("text-sm font-normal", pkg.featured ? "text-muted" : "text-white/60")}>
                      {pkg.unit ?? "/day"}
                    </span>
                  </div>
                  <ul className={cn("mb-8 flex-1 space-y-3 text-sm", pkg.featured ? "text-muted" : "text-white/80")}>
                    {pkg.features.map((feature) => (
                      <li
                        key={feature.text}
                        className={cn("flex items-start gap-2", !feature.included && "opacity-40")}
                      >
                        <span
                          className={cn(
                            "material-symbols-outlined text-lg",
                            feature.included ? (pkg.featured ? "text-secondary" : "text-accent") : "",
                          )}
                        >
                          {feature.included ? "check_circle" : "block"}
                        </span>
                        {feature.text}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className={cn(
                      "mt-auto block w-full rounded-full py-3.5 text-center text-sm font-semibold transition",
                      pkg.featured
                        ? "bg-primary !text-white hover:bg-secondary"
                        : "border border-white/20 hover:bg-white hover:text-primary",
                    )}
                  >
                    Select {pkg.name}
                  </Link>
                </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {process ? (
        <section className="py-16 sm:py-24 lg:py-[100px]">
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[
                  "/images/site/driver-van-interior.webp",
                  "/images/site/hotel-chauffeur-van.webp",
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuCyODs5eCaVJw8UTDaNAsT6kRPhOMV3inuOc4IzXHXMaSbMGM21U30NbcXbDYvGZ04EYmvbkow0zM5v-sXmfBk9-0sJFyh5KWTNLfKKB5eNnfEArkRLH2dS0KrFYBAYQrOcZmymZ-DaJBU74xQ1C3zvWFC_od2iQyHQeeqjqwCtdLRy9RKFoch3B31PbDDVHUpjmcx7IQssHJ3cWOMjC5m-9aaTfjmbV4nvDD3mCmNV4UPe-Rm-Kj14",
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuA-38msxt9PF81vFNxRKS8y9Vt7iqEOfg73pdkAb3zpQ8EhsYhVx4HfggCRNRwgZb_ku4ZOpJz24vY6PwBMfwOPufOW_xQXSkZwkfNBTMASiM7XU42eQA3tuxVCpQHkD7ns5K-eBcUeGztFz_yE4oRZ3MfPdYkx27sK-CY5YSMy4JA_2lR-7Rm8drKrx_MsxxRSh3wvYS-UoX4kaKu1a6B_VGdgcVjRvwfT3c4IPWyPcFWTcNQl7Ve7",
                ].map((src, index) => (
                  <div
                    key={src}
                    className={cn(
                      "relative overflow-hidden rounded-2xl",
                      index % 2 === 1 ? "mt-6 sm:mt-10" : "",
                      "aspect-[4/5]",
                    )}
                  >
                    <Image src={src} alt="" fill className="object-cover" sizes="(max-width:1024px) 50vw, 25vw" />
                  </div>
                ))}
              </div>
              <div>
                <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{process.title}</h2>
                <ol className="mt-10 space-y-8">
                  {process.steps.map((step, index) => (
                    <li key={step.title} className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent font-heading text-sm font-bold !text-white">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="font-heading text-lg font-semibold">{step.title}</h3>
                        <p className="mt-2 text-sm text-muted sm:text-base">{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <Link
                  href="/contact"
                  className="mt-10 inline-flex rounded-full bg-navy px-8 py-3.5 text-sm font-semibold !text-white transition hover:bg-secondary"
                >
                  Book Your Weekly
                </Link>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="bg-navy py-16 text-white sm:py-24 lg:py-[100px]" id="fleet">
        <Container>
          <div className="mb-12 max-w-xl sm:mb-16">
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{fleet.title}</h2>
            <p className="mt-4 text-white/60 sm:text-lg">{fleet.description}</p>
          </div>
          <div className="rounded-2xl bg-white p-4 sm:p-6">
            <ServiceFleetGrid items={fleet.items} />
          </div>
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
                    <span
                      className="material-symbols-outlined text-3xl text-accent"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
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
        title="Need a Custom Plan?"
        description="Our team can tailor weekly rentals for corporate fleets or special events. Contact us for a bespoke quote."
      />
    </>
  );
}
