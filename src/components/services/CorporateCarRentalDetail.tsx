import Link from "next/link";
import { CtaBanner } from "@/components/shared";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { brand } from "@/lib/brand";
import type { ServiceDetail } from "@/types";
import { ServiceFaqAccordion } from "./ServiceFaqAccordion";
import { ServiceFleetGrid } from "./ServiceFleetGrid";
import { ServiceHero } from "./ServiceHero";
import { ServiceTestimonials } from "./ServiceTestimonials";

type CorporateCarRentalDetailProps = {
  data: ServiceDetail;
};

export function CorporateCarRentalDetail({ data }: CorporateCarRentalDetailProps) {
  const { hero, features, fleet, categories, process, booking, testimonials, faqs, included, notes } =
    data;

  return (
    <>
      <ServiceHero hero={hero} />

      {notes ? (
        <section className="bg-navy py-10 text-white sm:py-12">
          <Container>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {notes.items.map((item, index) => (
                <Reveal key={item.title ?? item.text} delay={index * 80}>
                  <div className="text-center sm:text-left">
                    <p className="font-heading text-3xl font-bold text-accent sm:text-4xl">{item.title}</p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
                      {item.text}
                    </p>
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
            <div className="mb-12 text-center sm:mb-16">
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{features.title}</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted sm:text-lg">{features.description}</p>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {features.items.map((item, index) => (
              <Reveal key={item.title} delay={index * 80}>
              <div
                className={
                  index === 1
                    ? "h-full rounded-2xl bg-navy p-8 text-white sm:p-10"
                    : "h-full rounded-2xl border border-primary/8 bg-white p-8 shadow-[0_10px_30px_rgba(14,28,46,0.05)] sm:p-10"
                }
              >
                <span
                  className={`material-symbols-outlined mb-5 text-4xl ${index === 1 ? "text-accent" : "text-secondary"}`}
                >
                  {item.icon}
                </span>
                <h3 className="font-heading text-xl font-semibold sm:text-2xl">{item.title}</h3>
                <p className={`mt-4 text-sm sm:text-base ${index === 1 ? "text-white/65" : "text-muted"}`}>
                  {item.text}
                </p>
                {index === 1 ? (
                  <Link
                    href="#packages"
                    className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:bg-accent"
                  >
                    Explore Plans
                  </Link>
                ) : null}
              </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {categories ? (
        <section className="bg-[#f3f4f5] py-16 sm:py-24 lg:py-[100px]" id="packages">
          <Container>
            <div className="mb-12 max-w-xl sm:mb-16">
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                {categories.title}
              </h2>
              <p className="mt-4 text-muted sm:text-lg">{categories.description}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {categories.items.map((item) => (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl bg-navy p-8 text-white shadow-lg sm:min-h-[280px] sm:p-10"
                >
                  <span className="material-symbols-outlined text-4xl text-accent">{item.icon}</span>
                  <h3 className="mt-8 font-heading text-xl font-semibold sm:text-2xl">{item.title}</h3>
                  <p className="mt-4 text-sm text-white/65 sm:text-base">{item.text}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="py-16 sm:py-24 lg:py-[100px]" id="fleet">
        <Container>
          <div className="mb-12 max-w-xl sm:mb-16">
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{fleet.title}</h2>
            <p className="mt-4 text-muted sm:text-lg">{fleet.description}</p>
          </div>
          <ServiceFleetGrid items={fleet.items} />
        </Container>
      </section>

      {process ? (
        <section className="bg-surface py-16 sm:py-24 lg:py-[100px]">
          <Container>
            <div className="mb-12 text-center sm:mb-16">
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{process.title}</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {process.steps.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-primary/8 bg-white p-8 shadow-[0_10px_30px_rgba(14,28,46,0.04)]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent font-heading text-sm font-bold !text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-5 font-heading text-lg font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm text-muted">{step.text}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {included ? (
        <section className="py-16 sm:py-24 lg:py-[100px]">
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

      {booking ? (
        <section className="bg-navy py-16 text-white sm:py-24 lg:py-[100px]" id="booking">
          <Container>
            <div className="grid overflow-hidden rounded-3xl lg:grid-cols-2">
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                  {booking.title}
                </h2>
                <p className="mt-6 leading-relaxed text-white/70">{booking.description}</p>
                {booking.highlights ? (
                  <ul className="mt-8 space-y-4">
                    {booking.highlights.map((item) => (
                      <li key={item.text} className="flex items-center gap-3 text-sm text-white/85">
                        <span className="material-symbols-outlined text-accent">{item.icon}</span>
                        {item.text}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {booking.contact ? (
                  <div className="mt-10 space-y-4">
                    {booking.contact.map((item) => (
                      <div key={item.label} className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-accent">
                          <span className="material-symbols-outlined">{item.icon}</span>
                        </span>
                        <div>
                          <p className="text-xs text-white/50">{item.label}</p>
                          {item.href ? (
                            <a
                              href={item.href}
                              {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                              className="wa-text wa-text-dark font-semibold transition hover:text-accent"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="font-semibold">{item.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="bg-white p-8 text-primary sm:p-12">
                <div className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Company Name</label>
                      <input
                        type="text"
                        placeholder="Your company"
                        className="w-full rounded-xl border border-primary/10 bg-[#f3f4f5] p-4 outline-none transition focus:ring-2 focus:ring-secondary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Contact Person</label>
                      <input
                        type="text"
                        placeholder="Full name"
                        className="w-full rounded-xl border border-primary/10 bg-[#f3f4f5] p-4 outline-none transition focus:ring-2 focus:ring-secondary"
                      />
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Business Email</label>
                      <input
                        type="email"
                        placeholder="name@company.com"
                        className="w-full rounded-xl border border-primary/10 bg-[#f3f4f5] p-4 outline-none transition focus:ring-2 focus:ring-secondary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="03XX-XXXXXXX"
                        className="w-full rounded-xl border border-primary/10 bg-[#f3f4f5] p-4 outline-none transition focus:ring-2 focus:ring-secondary"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Vehicle Requirement</label>
                    <select className="w-full rounded-xl border border-primary/10 bg-[#f3f4f5] p-4 outline-none transition focus:ring-2 focus:ring-secondary">
                      <option>Executive Sedan</option>
                      <option>Luxury SUV</option>
                      <option>Full Fleet Management</option>
                      <option>Monthly Leasing</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Duration</label>
                    <select className="w-full rounded-xl border border-primary/10 bg-[#f3f4f5] p-4 outline-none transition focus:ring-2 focus:ring-secondary">
                      <option>Weekly</option>
                      <option>Monthly (1-6 months)</option>
                      <option>Long Term (1 Year+)</option>
                    </select>
                  </div>
                  <ButtonLink href="/contact" variant="primary" size="lg" className="w-full !text-white">
                    Request Quote
                  </ButtonLink>
                </div>
              </div>
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
                  <div className="mt-8">
                    <p className="font-heading text-4xl font-bold text-secondary">
                      {testimonials.ratingSummary.value}
                    </p>
                    <p className="mt-2 text-sm text-muted">{testimonials.ratingSummary.label}</p>
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
        title="Ready to streamline corporate travel?"
        description="Set up your corporate account and get priority vehicles with clear monthly reporting."
      />
    </>
  );
}
