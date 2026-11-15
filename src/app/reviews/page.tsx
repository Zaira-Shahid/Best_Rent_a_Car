import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GoogleRatingBadge } from "@/components/reviews/GoogleRatingBadge";
import { GoogleReviewsSection } from "@/components/reviews/GoogleReviewsSection";
import { SeeAllOnGoogleButton } from "@/components/reviews/SeeAllOnGoogleButton";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { brand, whatsappLink } from "@/lib/brand";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Reviews",
  description: `Customer reviews and testimonials for ${brand.name} across Pakistan.`,
  path: "/reviews",
  keywords: ["car rental reviews", `${brand.name} testimonials`, "Google reviews"],
});

const HERO =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD0KMKhRNrVTWjs6lo2c5IpQiTRMm4yN05WhPyEApAC8nEZH_q-Xki_olgfUckmoavNUnXYFxnIpnhl_U15wSjcpsjixHrbxZMT2JI9skG4qoQOqbNavHQBNGr34B4OtJuKMRFwUgj7FV-T9uHItfApXOYv57c_f6LILs-v5KvfcqETwMgtok1RXunj_QYj8tpmVm781mZeFaDy_PvDAM5hoa3PRts2nfsmN3Th-t1_0y1Aza-JdutX";

const STATS = [
  { icon: "stars", value: `${brand.rating.toFixed(1)}/5`, label: "Google Rating" },
  { icon: "reviews", value: `${brand.reviewCount}`, label: "Google Reviews" },
  { icon: "schedule", value: "24 hrs", label: brand.hours },
  { icon: "location_on", value: "G-9 Markaz", label: "Islamabad" },
];

const WHY_CLIENTS = [
  {
    icon: "support_agent",
    title: "Good Service",
    text: "Reviewers describe our service as very good, very nice and great.",
  },
  {
    icon: "directions_car",
    title: "Well-Kept Vehicles",
    text: "Customers call our vehicles very fit and very nice.",
  },
  {
    icon: "sentiment_satisfied",
    title: "Friendly, Professional Team",
    text: "Clients mention a very friendly attitude and professional people.",
  },
  {
    icon: "garage",
    title: "Wide Range of Cars",
    text: "One reviewer notes you will find vehicles from smaller to bigger.",
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
            Real Google reviews from clients who booked {brand.name} for airport transfers, weddings, corporate travel,
            and northern trips.
          </p>
          <div className="animate-fade-up-delay-2 mx-auto mt-5 inline-flex max-w-full items-center justify-center rounded-full bg-white/15 px-4 py-2 backdrop-blur-md sm:mt-6">
            <GoogleRatingBadge tone="dark" />
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
                What Reviewers Say
              </span>
              <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                What Reviewers Mention
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
                Our Services
              </span>
              <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                Popular Services
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
                  The reviews on this page are public Google reviews, shown with the reviewer&apos;s name and how long
                  ago they were posted. We only correct obvious spelling. You can read every review, and leave your own,
                  on our Google profile.
                </p>
                <a
                  href={whatsappLink(`Hi ${brand.name}, I'd like to share feedback about my recent booking.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold !text-white transition hover:brightness-95 sm:mt-6 sm:w-auto"
                >
                  <span className="material-symbols-outlined text-[18px]">rate_review</span>
                  Share Your Experience
                </a>
                <div className="mt-3">
                  <SeeAllOnGoogleButton />
                </div>
              </div>
            </AnimateIn>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
              {[
                { icon: "public", title: "Public Google Reviews" },
                { icon: "badge", title: "Real Reviewer Names" },
                { icon: "spellcheck", title: "Spelling Fixes Only" },
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
                <div className="mb-4 inline-flex max-w-full items-center justify-center rounded-full bg-white/10 px-4 py-2 sm:mb-5">
                  <GoogleRatingBadge tone="dark" />
                </div>
                <h2 className="font-heading text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
                  Ready for a {brand.name} Experience?
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-sm text-white/70 sm:mt-6 sm:text-base lg:text-lg">
                  Don&apos;t just take our word for it. Book your vehicle today and see why our clients rate us{" "}
                  {brand.rating.toFixed(1)} on Google.
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
