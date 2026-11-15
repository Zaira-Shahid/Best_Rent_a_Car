import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Container } from "@/components/ui/Container";
import { homeFaqs } from "@/data";
import { brand, whatsappLink } from "@/lib/brand";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact Us",
  description:
    `Contact ${brand.name} for bookings, quotes, and trip planning. Call, WhatsApp, or send an inquiry online.`,
  path: "/contact",
  keywords: ["car rental contact", "book rent a car Pakistan"],
});


const HERO = "/images/contact-hero-v2.png";

const OFFICE_MAP =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCOLcLgvntMjN0RKlanOO3hzDIQbvZuKjd4WntHKjUnZINDAaS9oMupBV4tr0QvZSUnrCLDh6tGRuvkQnZ8w3GVhqSF4tf1QC6JnvxsPjRAGW7OJeO778wbBrI6B_m4jNmMJnEp8lvJJDkl_FTybKegol1Euq7BMp9acaAM6slsr5q0aYI8QWhQnokHcEn0yIsxiK1KLCd9JvVAp71oLrA2kEBUGa3F9Gxn_pgQ0YWQqFbtDEbmdOGi";

const OFFICES = [
  {
    title: "Islamabad HQ",
    address: brand.location.address,
    hours: "Mon - Sat: 09:00 - 20:00 | Sunday: 10:00 - 18:00",
    href: brand.location.mapsUrl,
  },
  {
    title: "Rawalpindi / Islamabad Airport Desk",
    address: "Service desk near Islamabad International Airport arrivals, serving Rawalpindi & the airport corridor",
    hours: "Daily: 05:00 - 01:00 (flight-aligned)",
    href: "https://www.google.com/maps/search/?api=1&query=Islamabad+International+Airport",
  },
];

const RESPONSE_PROMISES = [
  { icon: "bolt", value: "< 15 min", label: "WhatsApp Response" },
  { icon: "request_quote", value: "< 60 min", label: "Quote Turnaround" },
  { icon: "local_shipping", value: "45 min", label: "Avg. Delivery Time" },
];

const WHATSAPP_TIPS = [
  "Share your city and pickup location (home, hotel, or airport).",
  "Mention your travel dates and approximate rental duration.",
  "Tell us the vehicle type or occasion — daily, corporate, wedding, or a northern trip.",
  "Let us know if you need a chauffeur-driven car for your trip.",
];

const INFO_CARDS = [
  {
    icon: "call",
    title: "Call Us",
    text: "Available for immediate booking & roadside support.",
    href: `tel:${brand.phone}`,
    linkLabel: brand.phone,
  },
  {
    icon: "mail",
    title: "Email Us",
    text: "For corporate inquiries and long-term lease quotes.",
    href: `mailto:${brand.email}`,
    linkLabel: brand.email,
  },
  {
    icon: "location_on",
    title: "Our Office",
    text: brand.location.address,
    href: brand.location.mapsUrl,
    linkLabel: "Get Directions",
  },
  {
    icon: "schedule",
    title: "Operating Hours",
    hours: [
      { label: "Mon - Sat", value: "09:00 - 20:00" },
      { label: "Sunday", value: "10:00 - 18:00" },
    ],
  },
];

export default function ContactPage() {
  return (
    <>
      <header className="relative min-h-[320px] overflow-hidden sm:min-h-[440px] lg:min-h-[560px]">
        <Image
          src={HERO}
          alt={`${brand.name} luxury sedan overlooking Faisal Mosque, Islamabad`}
          fill
          priority
          className="object-cover object-[70%_center] sm:object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/30 to-transparent" />
        <Container className="relative z-10 flex min-h-[320px] flex-col justify-center py-12 sm:min-h-[440px] sm:py-16 lg:min-h-[560px] lg:pb-24 lg:pt-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent sm:mb-4">Contact</p>
          <h1 className="hero-shadow max-w-xl font-heading text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Contact Us
          </h1>
          <div className="mt-4 max-w-lg space-y-3 text-sm text-white/85 sm:text-base lg:text-lg">
            <p>
              Call, WhatsApp, or send an inquiry — our team is ready to plan your next ride across Pakistan.
            </p>
            <p>
              Share your dates, city, and vehicle preference for a fast quote on sedans, SUVs, and chauffeur packages.
            </p>
            <p>
              Airport pickups, hotel transfers, and outstation trips — we respond quickly and confirm every detail before you travel.
            </p>
          </div>
        </Container>
      </header>

      <section className="py-16 sm:py-24 lg:py-[100px]">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {INFO_CARDS.map((card, index) => (
              <AnimateIn key={card.title} delay={index * 80}>
              <div
                className="luxury-card-shadow group h-full rounded-2xl border border-primary/8 bg-white p-8 transition hover:-translate-y-1 sm:p-10"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-secondary/10 text-secondary transition group-hover:bg-secondary group-hover:text-white">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {card.icon}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-semibold sm:text-xl">{card.title}</h3>
                {card.hours ? (
                  <div className="mt-4 space-y-1">
                    {card.hours.map((row) => (
                      <p key={row.label} className="flex flex-col gap-0.5 text-sm text-muted sm:flex-row sm:justify-between">
                        <span>{row.label}:</span>
                        <span>{row.value}</span>
                      </p>
                    ))}
                  </div>
                ) : (
                  <>
                    <p className="mt-2 text-sm text-muted">{card.text}</p>
                    <a
                      href={card.href}
                      target={card.href?.startsWith("http") ? "_blank" : undefined}
                      rel={card.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="mt-4 block break-all text-sm font-semibold text-secondary hover:underline"
                    >
                      {card.linkLabel}
                    </a>
                  </>
                )}
              </div>
              </AnimateIn>
            ))}
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {RESPONSE_PROMISES.map((item, index) => (
              <AnimateIn key={item.label} delay={index * 70}>
              <div
                className="flex h-full items-center gap-4 rounded-2xl border border-primary/8 bg-white p-6"
              >
                <span className="material-symbols-outlined text-3xl text-secondary">{item.icon}</span>
                <div>
                  <p className="font-heading text-xl font-bold text-primary">{item.value}</p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">{item.label}</p>
                </div>
              </div>
              </AnimateIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#f8f9fa] py-16 sm:py-24 lg:py-[100px]">
        <Container>
          <div className="mb-12 text-center sm:mb-16">
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Our Locations
            </span>
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Two Ways to Reach Us in Person
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {OFFICES.map((office) => (
              <div
                key={office.title}
                className="luxury-card-shadow rounded-2xl border border-primary/8 bg-white p-8 sm:p-10"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    location_on
                  </span>
                </div>
                <h3 className="font-heading text-lg font-semibold sm:text-xl">{office.title}</h3>
                <p className="mt-2 text-sm text-muted">{office.address}</p>
                <p className="mt-3 text-sm font-semibold text-primary">{office.hours}</p>
                <a
                  href={office.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:underline"
                >
                  Get Directions
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </a>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24 lg:py-[100px]">
        <Container>
          <div className="grid items-center gap-10 rounded-2xl bg-navy p-8 text-white sm:p-12 lg:grid-cols-2 lg:gap-16 lg:p-16">
            <div>
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Fastest Way to Book
              </span>
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                Booking via WhatsApp
              </h2>
              <p className="mt-5 text-sm text-white/60 sm:text-base">
                Most of our bookings are confirmed over WhatsApp in minutes. Here&apos;s what to include in
                your first message so our concierge team can respond with an instant quote.
              </p>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold !text-white transition hover:brightness-95"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                Message Us Now
              </a>
            </div>
            <ul className="space-y-4">
              {WHATSAPP_TIPS.map((tip, index) => (
                <li key={tip} className="flex items-start gap-4 rounded-xl bg-white/5 p-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold !text-white">
                    {index + 1}
                  </span>
                  <span className="text-sm text-white/80">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-[#f8f9fa] py-16 sm:py-24 lg:py-[100px]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="luxury-card-shadow rounded-2xl border border-primary/8 bg-white p-8 lg:col-span-7 sm:p-12">
              <div className="mb-10">
                <h2 className="font-heading text-2xl font-semibold sm:text-3xl">Send us a message</h2>
                <p className="mt-2 text-sm text-muted sm:text-base">
                  Fill out the form below and our concierge team will contact you within 60 minutes.
                </p>
              </div>
              <ContactForm />
            </div>

            <div className="flex flex-col justify-between gap-10 lg:col-span-5">
              <div>
                <h2 className="font-heading text-2xl font-semibold sm:text-3xl">Frequent Questions</h2>
                <div className="mt-6 space-y-5">
                  {homeFaqs.slice(0, 5).map((item) => (
                    <div key={item.question} className="border-b border-primary/8 pb-5">
                      <h4 className="text-sm font-semibold text-primary sm:text-base">{item.question}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{item.answer}</p>
                    </div>
                  ))}
                </div>
                <Link
                  href="/faq"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-secondary transition hover:gap-3"
                >
                  View All FAQs <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              </div>

              <div className="relative overflow-hidden rounded-2xl bg-navy p-8 text-white">
                <div className="relative z-10">
                  <h3 className="font-heading text-lg font-semibold sm:text-xl">Need Immediate Assistance?</h3>
                  <p className="mt-2 text-sm text-white/60">
                    Reach our 24/7 concierge line directly for urgent bookings or roadside support.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={whatsappLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold !text-white transition hover:brightness-95"
                    >
                      <span className="material-symbols-outlined text-[18px]">chat</span>
                      WhatsApp
                    </a>
                    <a
                      href={`tel:${brand.phone}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-accent hover:text-accent"
                    >
                      <span className="material-symbols-outlined text-[18px]">call</span>
                      Call Us
                    </a>
                  </div>
                </div>
                <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-secondary/10 blur-3xl" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative h-[360px] w-full sm:h-[440px]">
        <Image src={OFFICE_MAP} alt={`Map to ${brand.name} office in Islamabad`} fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-primary/20" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <a
            href={brand.location.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="luxury-card-shadow flex items-center gap-4 rounded-2xl bg-white p-6 transition hover:scale-[1.02]"
          >
            <span className="material-symbols-outlined text-4xl text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
              location_on
            </span>
            <div className="text-left">
              <p className="font-semibold text-primary">{brand.location.label}</p>
              <p className="text-sm text-muted">Islamabad · Get Directions</p>
            </div>
          </a>
        </div>
      </section>
    </>
  );
}
