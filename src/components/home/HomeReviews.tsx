import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const GOOGLE_REVIEWS = [
  {
    name: "Ahmed Khan",
    date: "12 July 2026",
    initials: "AK",
    color: "#4285F4",
    rating: 5,
    text: "Excellent service from Best Rent a Car. Booked a Fortuner for Murree and the car was spotless, delivered on time, and the WhatsApp support was very helpful throughout.",
  },
  {
    name: "Sara Malik",
    date: "3 July 2026",
    initials: "SM",
    color: "#EA4335",
    rating: 5,
    text: "Rented a Corolla for Islamabad airport pickup. Smooth booking, fair pricing, and the driver was professional. Highly recommend for family trips.",
  },
  {
    name: "Usman Raza",
    date: "28 June 2026",
    initials: "UR",
    color: "#34A853",
    rating: 5,
    text: "Best car rental experience in Islamabad. Monthly rental for our office was easy to arrange and the cars were always well maintained.",
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

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className="material-symbols-outlined text-[18px] text-[#FBBC04]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {index < count ? "star" : "star_border"}
        </span>
      ))}
    </div>
  );
}

export function HomeReviews() {
  return (
    <section className="bg-[#f7f8fa] py-16 sm:py-24">
      <Container>
        <Reveal>
          <div className="mb-8 text-center sm:mb-10 sm:text-left">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
              What Our Clients Say
            </h2>
            <p className="mt-2 text-sm text-muted sm:text-base">
              Real Google reviews from customers who booked with Best Rent a Car.
            </p>
          </div>
        </Reveal>

        <div className="mb-6 flex flex-wrap items-center gap-4 border-b border-primary/10 pb-3">
          <span className="border-b-2 border-[#4285F4] pb-3 text-sm font-semibold text-primary">
            <span className="inline-flex items-center gap-2">
              <GoogleMark className="h-4 w-4" />
              Google
            </span>
          </span>
          <span className="pb-3 text-sm text-muted">All reviews</span>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <GoogleMark className="h-7 w-7" />
            <span className="text-lg font-bold text-primary">Excellent</span>
            <Stars count={5} />
            <span className="text-sm font-semibold text-primary">4.9</span>
            <span className="text-sm text-muted">| 895 reviews</span>
          </div>
          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center rounded-full border border-primary/15 px-5 py-2.5 text-sm font-medium text-primary transition hover:border-primary/30 hover:bg-white"
          >
            Write a review
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {GOOGLE_REVIEWS.map((review, index) => (
            <Reveal key={review.name} delay={index * 100}>
            <article
              className="h-full rounded-2xl border border-primary/8 bg-white p-5 shadow-[0_8px_24px_rgba(0,11,29,0.06)] sm:p-6"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: review.color }}
                  >
                    {review.initials}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-primary">{review.name}</h4>
                    <p className="text-xs text-muted">{review.date}</p>
                  </div>
                </div>
                <GoogleMark className="h-5 w-5 shrink-0" />
              </div>

              <div className="mb-3 flex items-center gap-2">
                <Stars count={review.rating} />
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#4285F4]">
                  <span className="material-symbols-outlined text-[10px] !leading-none text-white">check</span>
                </span>
              </div>

              <p className="text-sm leading-relaxed text-primary/75">{review.text}</p>
              <Link href="/reviews" className="mt-3 inline-block text-sm text-muted transition hover:text-primary">
                Read more
              </Link>
            </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/reviews" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
            Read all reviews
          </Link>
        </div>
      </Container>
    </section>
  );
}
