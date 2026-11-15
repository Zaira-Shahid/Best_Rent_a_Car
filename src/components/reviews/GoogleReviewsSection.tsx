"use client";

import { motion } from "framer-motion";
import { brand } from "@/lib/brand";

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
  {
    name: "Alexander Thorne",
    date: "18 June 2026",
    initials: "AT",
    color: "#FBBC05",
    rating: 5,
    text: "The level of service provided by Best Rent a Car is unparalleled. From the seamless booking process to the pristine condition of the Lamborghini Urus, every detail was handled with absolute precision.",
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
          Real Google reviews from customers who booked with {brand.name} — same style as our homepage.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-primary/10 pb-3 sm:mb-6"
      >
        <span className="border-b-2 border-[#4285F4] pb-3 text-sm font-semibold text-primary">
          <span className="inline-flex items-center gap-2">
            <GoogleMark className="h-4 w-4" />
            Google
          </span>
        </span>
        <span className="pb-3 text-sm text-muted">All reviews</span>
      </motion.div>

      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="flex flex-wrap items-center gap-x-3 gap-y-2"
        >
          <GoogleMark className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />
          <span className="text-base font-bold text-primary sm:text-lg">Excellent</span>
          <Stars count={5} />
          <span className="text-sm font-semibold text-primary">4.9</span>
          <span className="text-sm text-muted">| 895 reviews</span>
        </motion.div>
        <motion.a
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.05 }}
          href={brand.location.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center rounded-full border border-primary/15 px-5 py-2.5 text-sm font-medium text-primary transition hover:border-primary/30 hover:bg-white sm:w-fit"
        >
          Write a review
        </motion.a>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {GOOGLE_REVIEWS.map((review, index) => (
          <motion.article
            key={review.name}
            custom={index}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="h-full min-w-0 rounded-2xl border border-primary/8 bg-white p-4 shadow-[0_8px_24px_rgba(0,11,29,0.06)] sm:p-5 lg:p-6"
          >
            <div className="mb-4 flex items-start justify-between gap-2 sm:gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white sm:h-11 sm:w-11"
                  style={{ backgroundColor: review.color }}
                >
                  {review.initials}
                </div>
                <div className="min-w-0">
                  <h4 className="truncate text-sm font-semibold text-primary">{review.name}</h4>
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
          </motion.article>
        ))}
      </div>
    </div>
  );
}
