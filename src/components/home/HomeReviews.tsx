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
        <Reveal>
          <div className="mb-8 text-center sm:mb-10 sm:text-left">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
              What Our Clients Say
            </h2>
            <p className="mt-2 text-sm text-muted sm:text-base">
              Real Google reviews from customers who booked with {brand.name}.
            </p>
          </div>
        </Reveal>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <GoogleRatingBadge />
          <SeeAllOnGoogleButton />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {googleReviews.map((review, index) => (
            <Reveal key={review.name} delay={index * 100}>
              <GoogleReviewCard review={review} index={index} />
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
