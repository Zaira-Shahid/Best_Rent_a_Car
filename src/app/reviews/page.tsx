import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GoogleReviewsSection } from "@/components/reviews/GoogleReviewsSection";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { brand } from "@/lib/brand";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Reviews",
  description: "Customer reviews and testimonials for Best Rent a Car across Pakistan.",
  path: "/reviews",
  keywords: ["car rental reviews", "Best Rent a Car testimonials", "Google reviews"],
});

const HERO =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD0KMKhRNrVTWjs6lo2c5IpQiTRMm4yN05WhPyEApAC8nEZH_q-Xki_olgfUckmoavNUnXYFxnIpnhl_U15wSjcpsjixHrbxZMT2JI9skG4qoQOqbNavHQBNGr34B4OtJuKMRFwUgj7FV-T9uHItfApXOYv57c_f6LILs-v5KvfcqETwMgtok1RXunj_QYj8tpmVm781mZeFaDy_PvDAM5hoa3PRts2nfsmN3Th-t1_0y1Aza-JdutX";

const STATS = [
  { icon: "stars", value: "4.9/5", label: "Average Rating" },
  { icon: "groups", value: "15k+", label: "Total Customers" },
  { icon: "verified", value: "48k+", label: "Successful Trips" },
  { icon: "location_city", value: "12+", label: "Cities Served" },
];

const PLATFORM_RATINGS = [
  { icon: "reviews", value: "4.9/5", label: "Google Reviews" },
  { icon: "share", value: "62%", label: "WhatsApp Referrals" },
  { icon: "repeat", value: "78%", label: "Repeat Clients" },
];

const WHY_CLIENTS = [
  {
    icon: "verified_user",
    title: "Verified Trips Only",
    text: "Every review comes from a confirmed Best Rent a Car booking — no anonymous fluff.",
  },
  {
    icon: "support_agent",
    title: "24/7 Agent Support",
    text: "Clients praise fast WhatsApp replies and live agent help before, during, and after the trip.",
  },
  {
    icon: "directions_car",
    title: "Clean, Inspected Fleet",
    text: "From Corolla to luxury SUVs, vehicles arrive spotless and road-ready.",
  },
  {
    icon: "schedule",
    title: "On-Time Chauffeurs",
    text: "Punctual pickups for airports, weddings, corporate meetings, and outstation travel.",
  },
];

const POPULAR_TRIPS = [
  {
    title: "Islamabad Airport Transfers",
    text: "Meet-and-greet pickups with flight tracking and luggage help.",
    href: "/services/airport-pick-drop",
    icon: "flight_land",
  },
  {
    title: "Wedding & Event Fleets",
    text: "Decorated convoys for baraat, walima, and VIP guest transport.",
    href: "/services/wedding-car-rental",
    icon: "celebration",
  },
  {
    title: "Northern Area SUVs",
    text: "4x4 rentals for Murree, Naran, Hunza, and Skardu routes.",
    href: "/cars",
    icon: "terrain",
  },
  {
    title: "Corporate Monthly Plans",
    text: "Reliable staff cars with invoicing and preferred chauffeurs.",
    href: "/services/corporate-car-rental",
    icon: "business_center",
  },
];

function GoogleMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex shrink-0 items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className="material-symbols-outlined text-[16px] text-[#FBBC04] sm:text-[18px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {index < count ? "star" : "star_border"}
        </span>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <div className="overflow-x-hidden">
      <header className="relative flex min-h-[280px] items-center justify-center overflow-hidden py-12 sm:min-h-[400px] sm:py-20 lg:min-h-[520px]">
        <Image src={HERO} alt="Luxury sedan on a city street at twilight" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-primary/50" />
        <div className="relative z-10 w-full px-4 text-center">
          <nav className="mb-3 flex justify-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-white/80 sm:mb-6 sm:text-xs">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Reviews</span>
          </nav>
          <h1 className="hero-shadow animate-fade-up mx-auto max-w-3xl font-heading text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            What Our Customers Say
          </h1>
          <p className="animate-fade-up-delay mx-auto mt-3 max-w-2xl text-sm text-white/80 sm:mt-4 sm:text-base lg:text-lg">
            Real Google reviews from clients who booked Best Rent a Car for airport transfers, weddings, corporate travel,
            and northern trips.
          </p>
          <div className="animate-fade-up-delay-2 mx-auto mt-5 flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full bg-white/15 px-3 py-2 backdrop-blur-md sm:mt-6 sm:inline-flex sm:gap-2 sm:px-4">
            <GoogleMark className="h-4 w-4 sm:h-5 sm:w-5" />
            <Stars count={5} />
            <span className="text-xs font-semibold text-white sm:text-sm">4.9 · 895 reviews</span>
          </div>
        </div>
      </header>

      <Container className="relative z-20 -mt-12 sm:-mt-16 lg:-mt-20">
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {STATS.map((item, index) => (
            <AnimateIn key={item.label} delay={index * 80}>
              <div className="rounded-xl bg-white/95 p-4 text-center shadow-[0_10px_30px_rgba(14,28,46,0.08)] backdrop-blur transition hover:-translate-y-1 sm:rounded-2xl sm:p-6 lg:p-8">
                <span className="material-symbols-outlined mb-2 text-2xl text-secondary sm:mb-3 sm:text-3xl lg:mb-4 lg:text-4xl">
                  {item.icon}
                </span>
                <h3 className="font-heading text-xl font-bold text-primary sm:text-2xl lg:text-3xl">{item.value}</h3>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-muted sm:text-xs">
                  {item.label}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </Container>

      <Container className="mt-6 sm:mt-8 lg:mt-10">
        <AnimateIn delay={120}>
          <div className="grid grid-cols-1 gap-4 rounded-2xl border border-primary/8 bg-white px-4 py-5 sm:grid-cols-3 sm:gap-6 sm:px-6 sm:py-7">
            {PLATFORM_RATINGS.map((item) => (
              <div key={item.label} className="flex items-center justify-center gap-3 sm:justify-start">
                <span className="material-symbols-outlined shrink-0 text-2xl text-secondary">{item.icon}</span>
                <div className="min-w-0 text-left">
                  <p className="font-heading text-base font-bold text-primary sm:text-lg">{item.value}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted sm:text-xs">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </AnimateIn>
      </Container>

      <section className="bg-[#f7f8fa] py-12 sm:py-20 lg:py-[100px]">
        <Container>
          <GoogleReviewsSection />
        </Container>
      </section>

      <section className="py-12 sm:py-20 lg:py-[100px]">
        <Container>
          <AnimateIn>
            <div className="mb-8 text-center sm:mb-12">
              <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary sm:mb-3 sm:text-xs">
                Why Clients Return
              </span>
              <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                What Reviewers Mention Most
              </h2>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {WHY_CLIENTS.map((item, index) => (
              <AnimateIn key={item.title} delay={index * 90}>
                <div className="h-full rounded-2xl border border-primary/8 bg-white p-5 transition hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,31,38,0.08)] sm:p-6">
                  <span className="material-symbols-outlined text-[26px] text-secondary sm:text-[28px]">
                    {item.icon}
                  </span>
                  <h3 className="mt-3 font-heading text-base font-semibold text-primary sm:mt-4 sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#f3f4f5] py-12 sm:py-20 lg:py-[100px]">
        <Container>
          <AnimateIn>
            <div className="mb-8 text-center sm:mb-12">
              <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary sm:mb-3 sm:text-xs">
                Popular With Reviewers
              </span>
              <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                Trips Clients Recommend
              </h2>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {POPULAR_TRIPS.map((item, index) => (
              <AnimateIn key={item.title} delay={index * 90}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col rounded-2xl border border-primary/8 bg-white p-5 transition hover:-translate-y-1 hover:border-secondary/30 hover:shadow-[0_12px_30px_rgba(0,31,38,0.08)] sm:p-6"
                >
                  <span className="material-symbols-outlined text-[26px] text-secondary transition group-hover:scale-110 sm:text-[28px]">
                    {item.icon}
                  </span>
                  <h3 className="mt-3 font-heading text-base font-semibold text-primary sm:mt-4 sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.text}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-secondary">
                    Explore
                    <span className="material-symbols-outlined text-[16px] transition group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </span>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-20 lg:py-[100px]">
        <Container>
          <div className="grid items-start gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
            <AnimateIn>
              <div>
                <span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary sm:mb-4 sm:text-xs">
                  Transparency
                </span>
                <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                  How We Collect Feedback
                </h2>
                <p className="mt-4 text-sm text-muted sm:mt-5 sm:text-base lg:text-lg">
                  Every review on this page comes from a verified booking. After each trip, our agent team follows up
                  by WhatsApp or phone and invites clients to leave a public rating on Google. We don&apos;t edit or
                  filter quotes — only lightly trim them for length — so what you read reflects real experiences with
                  our fleet and chauffeurs.
                </p>
                <a
                  href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent("Hi Best Rent a Car, I'd like to share feedback about my recent booking.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold !text-white transition hover:brightness-95 sm:mt-6 sm:w-auto"
                >
                  <span className="material-symbols-outlined text-[18px]">rate_review</span>
                  Share Your Experience
                </a>
              </div>
            </AnimateIn>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
              {[
                { icon: "task_alt", title: "Verified Bookings Only" },
                { icon: "forum", title: "Post-Trip Follow-Up" },
                { icon: "edit_off", title: "Unedited Quotes" },
              ].map((item, index) => (
                <AnimateIn key={item.title} delay={index * 100}>
                  <div className="rounded-2xl border border-primary/8 bg-[#f3f4f5] p-5 text-center transition hover:-translate-y-1 sm:p-6">
                    <span className="material-symbols-outlined mb-2 text-3xl text-secondary sm:mb-3">{item.icon}</span>
                    <p className="text-sm font-semibold text-primary">{item.title}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="px-4 pb-12 pt-4 sm:px-6 sm:pb-20 sm:pt-6 lg:px-8 lg:pb-24">
        <Container>
          <AnimateIn>
            <div className="relative overflow-hidden rounded-[24px] bg-primary px-5 py-12 text-center sm:rounded-[40px] sm:px-12 sm:py-20 md:px-24">
              <div className="relative z-10">
                <div className="mb-4 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full bg-white/10 px-3 py-2 sm:mb-5 sm:px-4">
                  <GoogleMark className="h-4 w-4 sm:h-5 sm:w-5" />
                  <Stars count={5} />
                  <span className="text-xs font-semibold text-white sm:text-sm">4.9 on Google</span>
                </div>
                <h2 className="font-heading text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
                  Ready for a Best Rent a Car Experience?
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-sm text-white/70 sm:mt-6 sm:text-base lg:text-lg">
                  Don&apos;t just take their word for it. Book your premium vehicle today and discover why clients
                  rate us 4.9 on Google.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
                  <ButtonLink href="/contact" variant="accent" size="lg" className="w-full sm:w-auto">
                    Book Your Premium Ride Today
                  </ButtonLink>
                  <ButtonLink
                    href="/cars"
                    variant="outline"
                    size="lg"
                    className="w-full border-white/30 !text-white hover:border-secondary hover:!text-secondary sm:w-auto"
                  >
                    View Fleet
                  </ButtonLink>
                </div>
              </div>
              <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
              <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
            </div>
          </AnimateIn>
        </Container>
      </section>
    </div>
  );
}
