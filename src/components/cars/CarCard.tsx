"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { CarModel } from "@/types";
import { InquireModal } from "@/components/cars/InquireModal";
import { fleetSections } from "@/data/cars";
import { formatPhone, formatPrice, telLink, whatsappLink } from "@/lib/brand";
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

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.97.55 3.8 1.5 5.38L2 22l4.95-1.6a9.86 9.86 0 0 0 5.09 1.4h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2Zm5.76 13.98c-.24.68-1.4 1.25-1.93 1.33-.5.07-1.13.1-1.83-.12-.42-.13-.97-.32-1.67-.62-2.94-1.27-4.85-4.23-5-4.42-.14-.19-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.45.27-.29.59-.36.79-.36h.57c.18 0 .42-.07.66.5.24.58.82 2 .89 2.15.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.38-.45.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.03 1.12 1 2.07 1.31 2.36 1.46.29.15.46.12.63-.07.17-.2.73-.85.93-1.14.2-.29.4-.24.66-.14.27.1 1.7.8 1.99.95.29.15.48.22.55.34.07.13.07.73-.17 1.41Z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 10.8c1.8 3.5 3.1 4.8 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.7 21 3 13.3 3 3.7c0-.6.4-1 1-1H7c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.2 1.1l-2.2 2.2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
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
        <span className="text-brand-black/55">({reviewCount} Reviews)</span>
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
                <span className="text-sm font-medium text-brand-black/55"> / day</span>
              </p>
              <Link
                href={href}
                onClick={(e) => e.stopPropagation()}
                aria-label={`View ${car.name}`}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-black/15 bg-white text-brand-black transition hover:border-brand-black hover:bg-brand-black hover:text-white"
              >
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                  chevron_right
                </span>
              </Link>
            </div>
          ) : null}

          <div
            className="mt-auto grid grid-cols-1 gap-2 pt-4 min-[400px]:grid-cols-[1.05fr_0.8fr_1.35fr] min-[400px]:gap-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-accent px-2 text-xs font-semibold !text-white transition duration-200 hover:brightness-95"
            >
              <WhatsAppIcon className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">WhatsApp</span>
            </a>
            <a
              href={telLink()}
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-brand-black/15 bg-white px-2 text-xs font-semibold text-brand-black transition duration-200 hover:border-brand-black"
              aria-label={`Call ${formatPhone()}`}
            >
              <PhoneIcon className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">Call</span>
            </a>
            <button
              type="button"
              onClick={() => setInquireOpen(true)}
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-brand-red px-2 text-xs font-semibold text-white transition duration-200 hover:bg-brand-red-dark"
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                mail
              </span>
              <span className="truncate">{isEntry ? "Inquiry" : "Inquiry Now"}</span>
            </button>
          </div>
        </div>
      </article>

      <InquireModal car={car} open={inquireOpen} onClose={() => setInquireOpen(false)} />
    </>
  );
}
