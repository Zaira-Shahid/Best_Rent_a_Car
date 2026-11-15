"use client";

import { motion } from "framer-motion";
import { googleReviews } from "@/data/reviews";
import { brand } from "@/lib/brand";
import { GoogleRatingBadge } from "./GoogleRatingBadge";
import { GoogleReviewCard } from "./GoogleReviewCard";
import { SeeAllOnGoogleButton } from "./SeeAllOnGoogleButton";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: "easeOut" },
  }),
};

export function GoogleReviewsSection() {
  return (
    <div className="min-w-0">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45 }}
        className="mb-6 text-center sm:mb-10 sm:text-left"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-primary sm:text-3xl lg:text-4xl">
          Google Reviews
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-muted sm:mx-0 sm:text-base">
          Real Google reviews from customers who booked with {brand.name}.
        </p>
      </motion.div>

      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <GoogleRatingBadge />
        <SeeAllOnGoogleButton />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {googleReviews.map((review, index) => (
          <motion.div
            key={review.name}
            custom={index}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: "some" }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="h-full min-w-0"
          >
            <GoogleReviewCard review={review} index={index} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
