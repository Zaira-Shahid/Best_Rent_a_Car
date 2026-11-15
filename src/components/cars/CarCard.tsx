"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { CarModel } from "@/types";
import { InquireModal } from "@/components/cars/InquireModal";
import { fleetSections } from "@/data/cars";
import { CarActionButtons } from "@/components/cars/CarActionButtons";
import { formatPrice, whatsappLink } from "@/lib/brand";
import { cn } from "@/lib/utils";

type CarCardProps = {
  car: CarModel;
  /** Name of the section the card is shown in. Falls back to the car's own category. */
  sectionLabel?: string;
  className?: string;
};

/** Entry tiers use the yellow pill and show the price under the specs instead of on the image. */
const ENTRY_CATEGORIES = new Set(["economy", "standard"]);

function categoryLabel(slug: string) {
  return fleetSections.find((section) => section.slug === slug)?.name.replace(/ Fleet$/, "") ?? slug;
}

const STAR_PATH =
  "M12 2.5l2.94 6.1 6.56.9-4.8 4.6 1.2 6.6L12 17.4l-5.9 3.3 1.2-6.6-4.8-4.6 6.56-.9L12 2.5Z";

function Star({ fill }: { fill: "full" | "half" | "empty" }) {
  return (
    <span className="relative inline-block h-4 w-4">
      <svg viewBox="0 0 24 24" className="absolute inset-0 h-4 w-4 text-brand-black/15" fill="currentColor" aria-hidden="true">
        <path d={STAR_PATH} />
      </svg>
      {fill !== "empty" ? (
        <svg
          viewBox="0 0 24 24"
          className="absolute inset-0 h-4 w-4 text-brand-yellow"
          fill="currentColor"
          aria-hidden="true"
          style={fill === "half" ? { clipPath: "inset(0 50% 0 0)" } : undefined}
        >
          <path d={STAR_PATH} />
        </svg>
      ) : null}
    </span>
  );
}

/** Rendered only when the car has a rating; the review count is optional. */
function RatingRow({ rating, reviewCount }: { rating: number; reviewCount?: number }) {
  const rounded = Math.round(rating * 2) / 2;
  return (
    <div className="flex items-center gap-1.5 text-sm" aria-label={`Rated ${rating} out of 5`}>
      <span className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star key={n} fill={rounded >= n ? "full" : rounded >= n - 0.5 ? "half" : "empty"} />
        ))}
      </span>
      <span className="font-bold text-brand-black">{rating.toFixed(1)}</span>
      {typeof reviewCount === "number" ? (
        <span className="text-brand-black/70">({reviewCount} Reviews)</span>
      ) : null}
    </div>
  );
}

export function CarCard({ car, sectionLabel, className }: CarCardProps) {
  const router = useRouter();
  const [inquireOpen, setInquireOpen] = useState(false);
  const [showAlt, setShowAlt] = useState(false);
  const [paused, setPaused] = useState(false);
  const hasAlt = Boolean(car.imageAlt && car.imageAlt !== car.image);
  const href = `/cars/${car.slug}`;
  const isEntry = ENTRY_CATEGORIES.has(car.category);

  useEffect(() => {
    if (!hasAlt || paused) return;

    const id = window.setInterval(() => {
      setShowAlt((prev) => !prev);
    }, 2800);

    return () => window.clearInterval(id);
  }, [hasAlt, paused]);

  const whatsappHref = whatsappLink(
    `Hi, I want to inquire about ${car.name} rental.`,
  );

  function goToCar() {
    router.push(href);
  }

  const specs = [
    { icon: "person", label: `${car.seats} Seats` },
    { icon: "settings", label: car.transmission },
    { icon: "local_gas_station", label: car.fuel },
    ...(car.colors?.length ? [{ icon: "palette", label: car.colors.join(" / ") }] : []),
  ];

  return (
    <>
      <article
        className={cn(
          "group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-brand-black/5 bg-white shadow-[0_10px_35px_rgba(21,24,29,0.08)] transition duration-300 hover:-translate-y-1.5 hover:border-brand-red/30 hover:shadow-[0_22px_50px_rgba(21,24,29,0.14)]",
          className,
        )}
        onClick={goToCar}
      >
        <div
          className="relative aspect-[16/10] overflow-hidden bg-background"
          onMouseEnter={() => {
            if (!hasAlt) return;
            setPaused(true);
            setShowAlt(true);
          }}
          onMouseLeave={() => {
            if (!hasAlt) return;
            setPaused(false);
            setShowAlt(false);
          }}
        >
          <Image
            src={car.image}
            alt={`${car.name} rental`}
            fill
            unoptimized
            className={cn(
              "object-cover transition duration-700",
              hasAlt && showAlt ? "scale-105 opacity-0" : "scale-100 opacity-100",
              !hasAlt && "group-hover:scale-110",
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {hasAlt ? (
            <Image
              src={car.imageAlt!}
              alt={`${car.name} black color`}
              fill
              unoptimized
              className={cn(
                "object-cover transition duration-700",
                showAlt ? "scale-105 opacity-100" : "scale-100 opacity-0",
              )}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : null}

          <span
            className={cn(
              "absolute left-3 top-3 rounded-full px-4 py-1.5 text-xs font-bold shadow-sm",
              isEntry ? "bg-brand-yellow text-brand-black" : "bg-brand-red text-white",
            )}
          >
            {sectionLabel ?? categoryLabel(car.category)}
          </span>

          {car.badge ? (
            <span className="absolute right-3 top-3 rounded-full bg-brand-black/85 px-3 py-1 text-[11px] font-semibold text-white shadow-sm">
              {car.badge}
            </span>
          ) : null}

          {!isEntry ? (
            <p className="absolute bottom-3 left-3 flex items-center overflow-hidden rounded-full bg-brand-black/90 py-1.5 pl-4 pr-5 text-sm font-bold text-white shadow-md">
              <span>
                {formatPrice(car.priceDay)}
                <span className="font-medium text-white/80"> / day</span>
              </span>
              <span className="absolute inset-y-0 right-0 w-1.5 bg-brand-red" aria-hidden="true" />
            </p>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-5">
          {typeof car.rating === "number" ? <RatingRow rating={car.rating} reviewCount={car.reviewCount} /> : null}

          <p className={cn("text-xs font-bold uppercase tracking-[0.18em] text-brand-red", car.rating !== undefined && "mt-2")}>
            {car.brand}
          </p>
          <h3 className="mt-1 min-w-0 font-heading text-lg font-bold text-brand-black transition-colors group-hover:text-brand-red sm:text-xl">
            <Link href={href} onClick={(e) => e.stopPropagation()} className="line-clamp-2 break-words">
              {car.name}
            </Link>
          </h3>

          <ul className="mt-3 grid grid-cols-2 gap-y-2 text-xs text-brand-black/70">
            {specs.map((spec, index) => (
              <li
                key={spec.icon}
                className={cn(
                  "flex min-w-0 items-center gap-1.5",
                  index % 2 === 1 && "border-l pl-3",
                  index % 2 === 1 && (isEntry ? "border-brand-black/15" : "border-brand-red/60"),
                )}
              >
                <span className="material-symbols-outlined text-[16px] text-brand-black/65" aria-hidden="true">
                  {spec.icon}
                </span>
                <span className="truncate">{spec.label}</span>
              </li>
            ))}
          </ul>

          {isEntry ? (
            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="font-heading text-xl font-bold text-brand-black sm:text-2xl">
                {formatPrice(car.priceDay)}
                <span className="text-sm font-medium text-brand-black/70"> / day</span>
              </p>
              <Link
                href={href}
                onClick={(e) => e.stopPropagation()}
                aria-label={`View ${car.name}`}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand-black/15 bg-white text-brand-black transition hover:border-brand-black hover:bg-brand-black hover:text-white"
              >
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                  chevron_right
                </span>
              </Link>
            </div>
          ) : null}

          <CarActionButtons
            className="mt-auto pt-4"
            whatsappHref={whatsappHref}
            inquiryLabel={isEntry ? "Inquiry" : "Inquiry Now"}
            onInquire={() => setInquireOpen(true)}
          />
        </div>
      </article>

      <InquireModal car={car} open={inquireOpen} onClose={() => setInquireOpen(false)} />
    </>
  );
}
