"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { CarModel } from "@/types";
import { InquireModal } from "@/components/cars/InquireModal";
import { brand, formatPhoneDisplay, formatPrice, whatsappLink } from "@/lib/brand";
import { cn } from "@/lib/utils";

type CarCardProps = {
  car: CarModel;
  className?: string;
};

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

export function CarCard({ car, className }: CarCardProps) {
  const router = useRouter();
  const [inquireOpen, setInquireOpen] = useState(false);
  const [showAlt, setShowAlt] = useState(false);
  const [paused, setPaused] = useState(false);
  const hasAlt = Boolean(car.imageAlt && car.imageAlt !== car.image);
  const href = `/cars/${car.slug}`;

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

  return (
    <>
      <article
        className={cn(
          "group flex h-full cursor-pointer flex-col overflow-hidden rounded-[12px] border border-primary/8 bg-white shadow-[0_10px_35px_rgba(0,11,29,0.05)] transition duration-300 hover:-translate-y-1.5 hover:border-secondary/25 hover:shadow-[0_22px_50px_rgba(0,11,29,0.12)]",
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
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/45 via-transparent to-transparent opacity-70 transition duration-300 group-hover:opacity-90" />
          {car.badge ? (
            <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold !text-white shadow-sm">
              {car.badge}
            </span>
          ) : null}
          <div className="absolute bottom-3 left-3">
            <p className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
              {formatPrice(car.priceDay)}
              <span className="font-normal text-primary/55"> / day</span>
            </p>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-secondary">{car.brand}</p>
          <h3 className="mt-1 min-w-0 text-base font-semibold text-primary transition-colors group-hover:text-secondary sm:text-lg">
            <Link href={href} onClick={(e) => e.stopPropagation()} className="line-clamp-2 break-words">
              {car.name}
            </Link>
          </h3>

          <div className="mt-3 flex flex-wrap gap-2 text-xs text-primary/60">
            <span className="rounded-[10px] bg-background px-2.5 py-1">{car.seats} Seats</span>
            <span className="rounded-[10px] bg-background px-2.5 py-1">{car.transmission}</span>
            <span className="rounded-[10px] bg-background px-2.5 py-1">{car.fuel}</span>
            {car.colors?.length ? (
              <span className="rounded-[10px] bg-background px-2.5 py-1">{car.colors.join(" / ")}</span>
            ) : null}
          </div>

          <p className="mt-4 text-sm font-semibold text-primary">
            {formatPrice(car.priceDay)}
            <span className="font-normal text-primary/55"> / day</span>
          </p>

          <div
            className="mt-auto grid grid-cols-1 gap-2 pt-4 min-[400px]:grid-cols-3 min-[400px]:gap-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-[10px] bg-accent px-2 text-xs font-semibold !text-white transition duration-200 hover:brightness-95"
            >
              <WhatsAppIcon className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">WhatsApp</span>
            </a>
            <a
              href={`tel:${brand.phone}`}
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-[10px] bg-secondary px-2 text-xs font-semibold !text-white transition duration-200 hover:brightness-95"
              aria-label={`Call ${formatPhoneDisplay()}`}
            >
              <PhoneIcon className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">Call</span>
            </a>
            <button
              type="button"
              onClick={() => setInquireOpen(true)}
              className="inline-flex min-h-11 items-center justify-center rounded-[10px] border border-white/20 bg-primary px-2 text-xs font-semibold !text-white transition duration-200 hover:bg-primary/90"
            >
              Inquiry
            </button>
          </div>
        </div>
      </article>

      <InquireModal car={car} open={inquireOpen} onClose={() => setInquireOpen(false)} />
    </>
  );
}
