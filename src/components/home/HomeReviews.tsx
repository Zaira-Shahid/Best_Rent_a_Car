import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { GoogleRatingBadge } from "@/components/reviews/GoogleRatingBadge";
import { GoogleReviewCard } from "@/components/reviews/GoogleReviewCard";
import { SeeAllOnGoogleButton } from "@/components/reviews/SeeAllOnGoogleButton";
import { googleReviews } from "@/data/reviews";
import { brand } from "@/lib/brand";

export function HomeReviews() {
  return (
    <section className="bg-[#f7f8fa] py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
              What Our Clients Say
            </h2>
            <p className="mt-2 text-sm text-brand-black/70 sm:text-base">
              Real Google reviews from customers who booked with {brand.name}.
            </p>

            <div className="mt-6 rounded-3xl border border-brand-black/10 bg-white p-6 shadow-[0_10px_30px_rgba(21,24,29,0.07)] sm:p-7">
              <GoogleRatingBadge />
              <SeeAllOnGoogleButton className="mt-5 min-h-11 w-full sm:w-full" />
            </div>
          </Reveal>

          <div>
            <div className="grid gap-5 sm:grid-cols-2">
              {googleReviews.map((review, index) => (
                <Reveal key={review.name} delay={index * 100} className="h-full">
                  <GoogleReviewCard review={review} index={index} />
                </Reveal>
              ))}
            </div>

            <div className="mt-8 text-center lg:text-left">
              <Link
                href="/reviews"
                className="inline-flex min-h-11 items-center text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                Read all reviews
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
