import { CtaBanner } from "@/components/shared";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { ServiceDetail } from "@/types";
import { ServiceFeatureGrid } from "./ServiceFeatureGrid";
import { ServiceFleetGrid } from "./ServiceFleetGrid";
import { ServiceHero } from "./ServiceHero";

type WeddingCarRentalDetailProps = {
  data: ServiceDetail;
};

export function WeddingCarRentalDetail({ data }: WeddingCarRentalDetailProps) {
  const { hero, features, fleet, categories, booking, included, audience, notes } = data;

  return (
    <>
      <ServiceHero hero={hero} />

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

      <section className="bg-surface py-16 sm:py-24 lg:py-[100px]" id="fleet">
        <Container>
          <div className="mb-12 max-w-xl sm:mb-16">
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{fleet.title}</h2>
            <p className="mt-4 text-muted sm:text-lg">{fleet.description}</p>
          </div>
          <ServiceFleetGrid items={fleet.items} />
        </Container>
      </section>

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

      {audience ? (
        <section className="bg-[#f8f9fa] py-16 sm:py-24 lg:py-[100px]">
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

      {categories ? (
        <section className="py-16 sm:py-24 lg:py-[100px]">
          <Container>
            <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{categories.title}</h2>
              <p className="mt-4 text-muted sm:text-lg">{categories.description}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {categories.items.map((item) => (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-primary/10 p-8 transition hover:-translate-y-1 hover:bg-white hover:shadow-[0_10px_30px_rgba(14,28,46,0.06)] sm:p-10"
                >
                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10 transition group-hover:scale-110">
                    <span className="material-symbols-outlined text-3xl text-secondary">{item.icon}</span>
                  </div>
                  <h3 className="font-heading text-xl font-semibold sm:text-2xl">{item.title}</h3>
                  <p className="mt-4 text-sm text-muted sm:text-base">{item.text}</p>
                  {item.bullets ? (
                    <ul className="mt-6 space-y-3">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-center gap-2 text-sm">
                          <span className="material-symbols-outlined text-base text-secondary">check_circle</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {notes ? (
        <section className="bg-navy py-16 text-white sm:py-24 lg:py-[100px]">
          <Container>
            <div className="mb-12 max-w-xl sm:mb-16">
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{notes.title}</h2>
              {notes.description ? <p className="mt-4 text-white/60 sm:text-lg">{notes.description}</p> : null}
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {notes.items.map((item) => (
                <div key={item.title ?? item.text} className="glass-panel rounded-xl p-8">
                  <span className="material-symbols-outlined mb-4 text-3xl text-accent">{item.icon}</span>
                  {item.title ? <h4 className="mb-2 text-lg font-semibold">{item.title}</h4> : null}
                  <p className="text-sm text-white/60">{item.text}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {booking ? (
        <section className="pb-16 sm:pb-24 lg:pb-[100px]" id="booking">
          <Container>
            <div className="flex flex-col overflow-hidden rounded-3xl shadow-2xl lg:flex-row">
              <div className="flex flex-col justify-center bg-navy p-10 text-white sm:p-12 lg:w-1/2">
                <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{booking.title}</h2>
                <p className="mt-6 leading-relaxed text-white/70">{booking.description}</p>
                {booking.contact ? (
                  <div className="mt-10 space-y-6">
                    {booking.contact.map((item) => (
                      <div key={item.label} className="flex items-center gap-4">
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
              <div className="bg-white p-10 sm:p-12 lg:w-1/2">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Full Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-primary/10 bg-[#f3f4f5] p-4 outline-none transition focus:ring-2 focus:ring-secondary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Wedding Date</label>
                      <input
                        type="date"
                        className="w-full rounded-xl border border-primary/10 bg-[#f3f4f5] p-4 outline-none transition focus:ring-2 focus:ring-secondary"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Venue Address</label>
                    <input
                      type="text"
                      placeholder="Enter venue location"
                      className="w-full rounded-xl border border-primary/10 bg-[#f3f4f5] p-4 outline-none transition focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Select Your Vehicle</label>
                    <select className="w-full rounded-xl border border-primary/10 bg-[#f3f4f5] p-4 outline-none transition focus:ring-2 focus:ring-secondary">
                      {fleet.items.map((item) => (
                        <option key={item.name}>{item.name}</option>
                      ))}
                      <option>Other - Bespoke Request</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Decoration Preferences</label>
                    <div className="flex flex-wrap gap-4">
                      {["Fresh Flowers", "Silk Ribbons", "Custom Signs"].map((label) => (
                        <label key={label} className="flex cursor-pointer items-center gap-2">
                          <input type="checkbox" className="h-5 w-5 rounded border-primary/20 text-primary" />
                          <span className="text-sm">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <ButtonLink href="/contact" variant="secondary" size="lg" className="w-full">
                    Check Availability
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      <CtaBanner
        title="Ready to book your wedding car?"
        description="Reserve a decorated luxury vehicle for the most memorable day of your life."
      />
    </>
  );
}
