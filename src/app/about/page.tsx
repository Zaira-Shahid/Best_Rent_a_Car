import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Container } from "@/components/ui/Container";
import { cities } from "@/data";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About Us",
  description:
    "Learn about Best Rent a Car — premium chauffeur-driven car rental across Pakistan since 2010.",
  path: "/about",
  keywords: ["about Best Rent a Car", "car rental company Pakistan"],
});


const HERO = "/images/about-hero-v2.png";
const FOUNDER = "/images/founder-umar-saeed.jpg";

const STORY =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA_0DvMgtwmvaqx9Ri-RF_X5h36PhzSZEy3QOy3_mIOctfV29MYedB-lytMPbgF6KfGb0CTLBso4efmlWt-tgjviDre4b7Zps_zEo-EnLGTBfUqdptA_tGtr7DjeTGqJ3ACcyhIhsvxwTp4RyoDZJYifoRZsb-QBU3lR01ZZO9lMMWaSWPaWy2IER5DyxTGDLThHulB8tOQb0uf7LmJv425G8do_dV_Xs7zB-O8_gXlzZJfcSFt4FIy";

const PROCESS =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCDpXQ-dNhSDga9qWs9ffpWS7vDJKYhUUCe3YyTejoYH_AMoGbgP93VPVeYSBMpbrmwM-WCnuA_N9i7Z8JgaezKP91VHNrimt5alDa2kuNGvO62T4Hi6-ak970eeCRh3DN32EoXzm3d6BB5JqfQV6wC1NgA0w4Abu4tGvNVjRrxeOUz26so1yKvijJlhS01t_U13MlIBpLR2EzaBxko0_PzhxhecRHC9WcqlwagBlscZ0KoUbRW7LD4";

const STATS = [
  { value: "14+", label: "Years of Excellence" },
  { value: "250+", label: "Luxury Fleet" },
  { value: "15k+", label: "Happy Clients" },
  { value: "50+", label: "Service Cities" },
];

const VALUES = [
  {
    icon: "verified_user",
    title: "Absolute Integrity",
    text: "We believe in transparent pricing and honest interactions at every touchpoint.",
  },
  {
    icon: "speed",
    title: "Seamless Agility",
    text: "Quick booking, rapid delivery, and responsive support for your fast-paced lifestyle.",
  },
  {
    icon: "diamond",
    title: "Uncompromising Quality",
    text: "Only the finest vehicles, maintained to showroom perfection by expert technicians.",
  },
  {
    icon: "eco",
    title: "Sustainable Luxury",
    text: "Investing in the future with a growing fleet of premium hybrid and efficient vehicles.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Personalized Selection",
    text: "Our concierge helps you select the perfect vehicle tailored to your itinerary.",
  },
  {
    n: "02",
    title: "Bespoke Delivery",
    text: "Your vehicle is delivered to your preferred location, polished and ready.",
  },
  {
    n: "03",
    title: "24/7 Elite Support",
    text: "A dedicated support line is at your disposal throughout your rental period.",
  },
];

const OFFERINGS = [
  {
    icon: "flight",
    title: "Airport Transfers",
    text: "Meet-and-greet pickups and drop-offs at Islamabad International and other major airports.",
    href: "/services/airport-pick-drop",
  },
  {
    icon: "business_center",
    title: "Corporate Rentals",
    text: "Monthly and executive fleet plans with invoicing for companies and embassies.",
    href: "/services/corporate-car-rental",
  },
  {
    icon: "favorite",
    title: "Wedding Cars",
    text: "Decorated luxury sedans and SUVs for baraat, walima, and wedding convoys.",
    href: "/services/wedding-car-rental",
  },
  {
    icon: "today",
    title: "Daily Rentals",
    text: "Flexible chauffeur-driven bookings for everyday city travel.",
    href: "/services/daily-car-rental",
  },
  {
    icon: "hotel",
    title: "Hotel Transfers",
    text: "Reliable pickups and drop-offs coordinated directly with your hotel concierge.",
    href: "/services/hotel-transfer",
  },
  {
    icon: "tour",
    title: "City Tours",
    text: "Guided sightseeing trips across Islamabad, Lahore, Karachi, and the northern valleys.",
    href: "/city-services",
  },
];

const PRIMARY_CITIES = cities.filter((city) => city.type === "primary");

const GUARANTEES = [
  {
    icon: "verified",
    title: "Verified Fleet",
    text: "Every vehicle passes a multi-point inspection before it reaches you.",
  },
  {
    icon: "price_check",
    title: "No Hidden Charges",
    text: "The price you're quoted is the price you pay — always transparent.",
  },
  {
    icon: "support_agent",
    title: "24/7 Support",
    text: "Our concierge line stays open around the clock for help on the road.",
  },
  {
    icon: "local_shipping",
    title: "On-Time Delivery",
    text: "Punctual doorstep delivery and pickup, tracked and confirmed in advance.",
  },
];

export default function AboutPage() {
  return (
    <>
      <header className="relative min-h-[320px] overflow-hidden sm:min-h-[440px] lg:min-h-[560px]">
        <Image
          src={HERO}
          alt="Best Rent a Car premium SUV fleet with Faisal Mosque at dusk"
          fill
          priority
          className="object-cover object-[75%_center] sm:object-right"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/75 via-primary/35 to-transparent" />
        <Container className="relative z-10 flex min-h-[320px] flex-col justify-center py-12 sm:min-h-[440px] sm:py-16 lg:min-h-[560px] lg:pb-24 lg:pt-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent sm:mb-4">Our Story</p>
          <h1 className="hero-shadow max-w-xl font-heading text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            About Us
          </h1>
          <div className="mt-4 max-w-lg space-y-3 text-sm text-white/85 sm:text-base lg:text-lg">
            <p>
              Premium chauffeur-driven car rental across Pakistan — built on trust, punctuality, and a fleet you can count on.
            </p>
            <p>
              From Islamabad and Rawalpindi to Lahore, Karachi, and the northern routes, we deliver polished vehicles with professional drivers.
            </p>
            <p>
              Whether it is an airport transfer, corporate day, wedding, or a mountain weekend — Best Rent a Car keeps every journey smooth and on time.
            </p>
          </div>
        </Container>
      </header>

      <section className="bg-surface py-16 sm:py-24 lg:py-[100px]">
        <Container className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <AnimateIn className="space-y-6">
            <span className="inline-block rounded-full bg-secondary/15 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-secondary">
              Our Legacy
            </span>
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Redefining Luxury Mobility Since 2010
            </h2>
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              Best Rent a Car was born from a simple vision: to provide more than just transportation.
              We set out to offer an experience of unparalleled luxury, where every drive becomes a statement
              of success and refinement.
            </p>
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              From executive sedans to premium SUVs, our vehicles are meticulously maintained to meet the
              highest standards of performance and aesthetics across Pakistan.
            </p>
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              Headquartered in Islamabad, we operate a nationwide network spanning the twin cities of
              Rawalpindi, the cultural capital Lahore, and the commercial hub of Karachi, with dedicated
              teams covering Faisalabad, Multan, and Peshawar. Our chauffeurs know every route intimately —
              from the boulevards of Blue Area to the winding Karakoram Highway — and our fleet includes
              specialized 4x4 vehicles for northern expeditions to Hunza, Skardu, and Naran. Whether it&apos;s a
              same-day airport transfer or a month-long corporate lease, our local presence means faster
              delivery, better route knowledge, and support that understands Pakistan&apos;s roads and seasons.
            </p>
          </AnimateIn>
          <AnimateIn delay={120} className="relative">
            <div className="absolute -inset-3 -z-10 rounded-2xl bg-accent/20 sm:-inset-4" />
            <div className="relative h-[360px] overflow-hidden rounded-xl shadow-2xl sm:h-[500px]">
              <Image src={STORY} alt="Luxury SUV outside modern building" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </AnimateIn>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24 lg:py-[100px]">
        <Container className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <AnimateIn className="relative order-2 md:order-1">
            <div className="absolute -inset-3 -z-10 rounded-2xl bg-secondary/15 sm:-inset-4" />
            <div className="relative h-[380px] overflow-hidden rounded-xl shadow-2xl sm:h-[520px]">
              <Image
                src={FOUNDER}
                alt="Umar Saeed, Founder & CEO of Best Rent a Car"
                fill
                className="object-cover object-[center_20%]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </AnimateIn>
          <AnimateIn delay={120} className="order-1 space-y-5 md:order-2">
            <span className="inline-block rounded-full bg-accent/25 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              Leadership
            </span>
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Founder &amp; CEO
            </h2>
            <p className="font-heading text-2xl font-semibold text-secondary sm:text-3xl">Umar Saeed</p>
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              Umar Saeed founded Best Rent a Car with a clear goal: deliver premium, reliable
              chauffeur-driven travel across Pakistan — starting from Islamabad and expanding nationwide.
            </p>
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              Under his leadership, Best Rent a Car has grown into a trusted mobility partner for families,
              corporate clients, and travelers who expect punctual service, a polished fleet, and support
              they can count on every mile of the journey.
            </p>
          </AnimateIn>
        </Container>
      </section>

      <section className="bg-[#f8f9fa] py-16 sm:py-24 lg:py-[100px]">
        <Container>
          <AnimateIn>
            <div className="mb-12 text-center sm:mb-16">
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                What We Offer
              </span>
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                A Service for Every Journey
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted sm:text-lg">
                From daily errands to grand celebrations, our range of services is built around how you
                actually travel.
              </p>
            </div>
          </AnimateIn>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {OFFERINGS.map((item, index) => (
              <AnimateIn key={item.title} delay={Math.min(index, 5) * 70}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col rounded-2xl border border-primary/8 bg-white p-6 shadow-[0_10px_30px_rgba(14,28,46,0.04)] transition hover:-translate-y-1 hover:border-secondary/40 sm:p-8"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary transition group-hover:bg-secondary group-hover:text-white">
                    <span className="material-symbols-outlined">{item.icon}</span>
                  </div>
                  <h4 className="font-heading text-lg font-semibold sm:text-xl">{item.title}</h4>
                  <p className="mt-3 text-sm text-muted">{item.text}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Learn more
                    <span className="material-symbols-outlined text-[18px] transition group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </span>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-navy py-16 text-white sm:py-24">
        <Container>
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4 md:gap-12">
            {STATS.map((item, index) => (
              <AnimateIn key={item.label} delay={index * 80} className="space-y-2">
                <div className="font-heading text-4xl font-bold text-secondary sm:text-5xl lg:text-[64px]">
                  {item.value}
                </div>
                <div className="text-xs font-semibold uppercase tracking-widest text-white/50">{item.label}</div>
              </AnimateIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-primary/8 bg-white py-10 sm:py-12">
        <Container>
          <AnimateIn>
            <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Proudly Serving
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-8">
              {PRIMARY_CITIES.map((city, index) => (
                <AnimateIn key={city.slug} delay={index * 40}>
                  <Link
                    href={`/rent-a-car/${city.slug}`}
                    className="text-sm font-semibold text-primary/70 transition hover:text-secondary hover:underline hover:underline-offset-4 sm:text-base"
                  >
                    {city.name}
                  </Link>
                </AnimateIn>
              ))}
            </div>
          </AnimateIn>
        </Container>
      </section>

      <section className="bg-[#f8f9fa] py-16 sm:py-24 lg:py-[100px]">
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            <AnimateIn className="rounded-3xl border border-primary/10 bg-white/70 p-8 shadow-[0_10px_30px_rgba(14,28,46,0.04)] backdrop-blur md:col-span-2 sm:p-12">
              <span
                className="material-symbols-outlined mb-6 text-4xl text-secondary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                rocket_launch
              </span>
              <h3 className="font-heading text-3xl font-semibold sm:text-4xl">Our Mission</h3>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                To revolutionize the luxury car rental industry by providing seamless, tech-enabled, and
                hyper-personalized experiences that empower our clients to arrive in style, every time.
              </p>
              <div className="mt-10 flex items-center gap-4">
                <div className="h-1 w-24 bg-secondary" />
                <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
                  Excellence in Motion
                </span>
              </div>
            </AnimateIn>
            <AnimateIn delay={120} className="flex flex-col justify-center rounded-3xl bg-navy p-8 text-white sm:p-12">
              <span
                className="material-symbols-outlined mb-6 text-4xl text-accent"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                visibility
              </span>
              <h3 className="font-heading text-2xl font-semibold">Our Vision</h3>
              <p className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base">
                To be the benchmark for luxury mobility in Pakistan, where innovation meets heritage, and
                every client journey is a masterpiece of comfort and prestige.
              </p>
            </AnimateIn>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24 lg:py-[100px]">
        <Container>
          <AnimateIn>
            <div className="mb-12 text-center sm:mb-16">
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                The Pillars of Our Success
              </h2>
              <div className="mx-auto mt-4 h-1 w-12 bg-secondary" />
            </div>
          </AnimateIn>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((item, index) => (
              <AnimateIn key={item.title} delay={index * 80}>
                <div className="h-full rounded-2xl border border-primary/8 bg-white p-6 shadow-[0_10px_30px_rgba(14,28,46,0.04)] transition hover:-translate-y-1 sm:p-8">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[#f3f4f5]">
                    <span className="material-symbols-outlined text-primary">{item.icon}</span>
                  </div>
                  <h4 className="font-heading text-lg font-semibold sm:text-xl">{item.title}</h4>
                  <p className="mt-3 text-sm text-muted">{item.text}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy py-16 text-white sm:py-24 lg:py-[100px]">
        <Container>
          <AnimateIn>
            <div className="mb-12 text-center sm:mb-16">
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Our Promise
              </span>
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                Guarantees You Can Count On
              </h2>
            </div>
          </AnimateIn>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {GUARANTEES.map((item, index) => (
              <AnimateIn key={item.title} delay={index * 80}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition hover:-translate-y-1 sm:p-8">
                  <span
                    className="material-symbols-outlined mb-4 inline-flex text-4xl text-accent"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {item.icon}
                  </span>
                  <h4 className="font-heading text-lg font-semibold">{item.title}</h4>
                  <p className="mt-2 text-sm text-white/55">{item.text}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-primary py-16 text-white sm:py-24 lg:py-[100px]">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <AnimateIn>
            <div>
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                The Best Rent a Car Experience
              </h2>
              <div className="mt-10 space-y-10 sm:mt-12 sm:space-y-12">
                {STEPS.map((step, index) => (
                  <AnimateIn key={step.n} delay={index * 100}>
                    <div className="group flex gap-5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-secondary font-heading text-lg font-semibold text-secondary transition group-hover:bg-secondary group-hover:text-white">
                        {step.n}
                      </div>
                      <div>
                        <h5 className="text-lg font-semibold sm:text-xl">{step.title}</h5>
                        <p className="mt-2 text-sm text-white/55 sm:text-base">{step.text}</p>
                      </div>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>
          </AnimateIn>
          <AnimateIn delay={150}>
            <div className="relative h-[400px] overflow-hidden rounded-3xl shadow-2xl sm:h-[520px] lg:h-[600px]">
              <Image src={PROCESS} alt="Luxury key fob handover" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </AnimateIn>
        </Container>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <Container>
          <AnimateIn>
            <div className="relative overflow-hidden rounded-[28px] bg-accent px-6 py-14 text-center sm:rounded-[40px] sm:px-12 sm:py-20 md:px-24">
              <div className="relative z-10">
                <h2 className="animate-fade-up font-heading text-3xl font-semibold text-white sm:text-4xl">
                  Ready to Experience True Distinction?
                </h2>
                <p className="animate-fade-up-delay mx-auto mt-6 max-w-2xl text-base text-white/90 sm:text-lg">
                  Your journey deserves a signature touch. Explore our fleet today and redefine your standards
                  of travel.
                </p>
                <div className="animate-fade-up-delay-2 mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                  <Link
                    href="/cars"
                    className="rounded-xl bg-primary px-10 py-4 text-sm font-semibold !text-white transition hover:scale-105"
                  >
                    Browse Collection
                  </Link>
                  <Link
                    href="/contact"
                    className="rounded-xl border-2 border-primary px-10 py-4 text-sm font-semibold text-primary transition hover:bg-primary hover:!text-white"
                  >
                    Contact Concierge
                  </Link>
                </div>
              </div>
              <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
              <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-white/40 blur-3xl" />
            </div>
          </AnimateIn>
        </Container>
      </section>
    </>
  );
}
