"use client";

import { motion } from "framer-motion";
import type { CarModel } from "@/types";
import { CarCard } from "@/components/cars/CarCard";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

type CarGridSectionProps = {
  title: string;
  /** Pill above the title. */
  eyebrow?: string;
  /** Label for the category pill on each card (defaults to each car's own category). */
  cardLabel?: string;
  description?: string;
  cars: CarModel[];
  viewAllHref?: string;
  viewAllLabel?: string;
  showViewAll?: boolean;
  /** Colour of the "Explore More" button. */
  viewAllTone?: "dark" | "red";
  className?: string;
  dark?: boolean;
};

export function CarGridSection({
  title,
  eyebrow = "Our Fleet",
  cardLabel,
  description,
  cars,
  viewAllHref = "/cars",
  viewAllLabel = "View All Cars",
  showViewAll = true,
  viewAllTone = "dark",
  className,
  dark = false,
}: CarGridSectionProps) {
  if (cars.length === 0) return null;

  const words = title.trim().split(" ");
  const lastWord = words.pop() ?? "";
  const leadingTitle = words.join(" ");

  return (
    <Section className={cn(dark ? "bg-primary" : "bg-background", className)}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn("mb-8 text-center sm:mb-10", dark && "text-white")}
      >
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <span className="h-px w-8 bg-brand-red sm:w-16" aria-hidden="true" />
          <span className="rounded-full bg-brand-red px-5 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white sm:text-sm">
            {eyebrow}
          </span>
          <span className="h-px w-8 bg-brand-red sm:w-16" aria-hidden="true" />
        </div>
        <h2
          className={cn(
            "mt-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl",
            dark ? "text-white" : "text-brand-black",
          )}
        >
          {leadingTitle ? `${leadingTitle} ` : null}
          <span className="text-brand-red">{lastWord}</span>
        </h2>
        {description ? (
          <p className={cn("mx-auto mt-3 max-w-2xl text-sm sm:text-base", dark ? "text-white/65" : "text-brand-black/65")}>
            {description}
          </p>
        ) : null}
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: "some" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.07 } },
        }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {cars.map((car) => (
          <motion.div
            key={car.slug}
            variants={{
              hidden: { opacity: 0, y: 32, scale: 0.97 },
              show: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            <CarCard car={car} sectionLabel={cardLabel} />
          </motion.div>
        ))}
      </motion.div>

      {showViewAll ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <span className="hidden h-px w-20 bg-brand-black/15 sm:block" aria-hidden="true" />
          <Link
            href={viewAllHref}
            className={cn(
              "inline-flex items-center gap-3 rounded-full px-8 py-3.5 text-base font-semibold !text-white shadow-lg transition hover:-translate-y-0.5",
              viewAllTone === "red" ? "bg-brand-red hover:bg-brand-red-dark" : "bg-brand-black hover:bg-brand-black/85",
            )}
          >
            {viewAllLabel}
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              arrow_forward
            </span>
          </Link>
          <span className="hidden h-px w-20 bg-brand-black/15 sm:block" aria-hidden="true" />
        </motion.div>
      ) : null}
    </Section>
  );
}
