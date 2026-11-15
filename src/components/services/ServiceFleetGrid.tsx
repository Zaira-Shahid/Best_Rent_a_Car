"use client";

import Image from "next/image";
import { useState } from "react";
import type { CarModel, ServiceFleetItem } from "@/types";
import { InquireModal } from "@/components/cars/InquireModal";
import { Reveal } from "@/components/ui/Reveal";
import { brand, formatPrice, telLink, whatsappLink } from "@/lib/brand";

type ServiceFleetGridProps = {
  items: ServiceFleetItem[];
};

function toCarModel(item: ServiceFleetItem): CarModel {
  return {
    slug: item.name.toLowerCase().replace(/\s+/g, "-"),
    name: item.name,
    brand: brand.name,
    category: "luxury",
    seats: item.seats,
    transmission: item.transmission === "Manual" ? "Manual" : "Automatic",
    fuel: "Petrol",
    priceDay: item.priceDay,
    priceMonth: item.priceDay * 22,
    image: item.image,
    imageAlt: item.imageAlt,
    badge: item.tag,
  };
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

function FleetCard({ item }: { item: ServiceFleetItem }) {
  const [inquireOpen, setInquireOpen] = useState(false);
  const [showAlt, setShowAlt] = useState(false);
  const car = toCarModel(item);
  const hasAlt = Boolean(item.imageAlt && item.imageAlt !== item.image);
  const whatsappHref = whatsappLink(
    `Hi, I want to inquire about ${item.name} rental.`,
  );

  function toggleAltImage() {
    if (hasAlt) setShowAlt((value) => !value);
  }

  return (
    <>
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_rgba(14,28,46,0.06)] transition duration-500 hover:-translate-y-2">
        <div
          className="relative h-48 cursor-pointer overflow-hidden sm:h-56"
          onMouseEnter={() => hasAlt && setShowAlt(true)}
          onMouseLeave={() => setShowAlt(false)}
          onClick={toggleAltImage}
          role={hasAlt ? "button" : undefined}
          tabIndex={hasAlt ? 0 : undefined}
          aria-label={hasAlt ? `View alternate image of ${item.name}` : undefined}
        >
          <Image
            src={item.image}
            alt={item.name}
            fill
            className={`object-cover transition duration-500 ${hasAlt && showAlt ? "scale-105 opacity-0" : "opacity-100"} ${!hasAlt ? "group-hover:scale-110" : ""}`}
            sizes="(max-width: 768px) 100vw, 25vw"
          />
          {hasAlt ? (
            <Image
              src={item.imageAlt!}
              alt={`${item.name} alternate`}
              fill
              className={`object-cover transition duration-500 ${showAlt ? "scale-105 opacity-100" : "opacity-0"}`}
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          ) : null}
          <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold !text-white">
            {item.tag}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="font-heading text-lg font-semibold sm:text-xl">{item.name}</h3>
          <div className="mt-2 flex gap-4 text-xs text-muted">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">chair</span>
              {item.seats} Seats
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">settings</span>
              {item.transmission}
            </span>
          </div>
          <p className="mt-4 text-sm font-semibold text-primary">
            {formatPrice(item.priceDay)}
            <span className="font-normal text-muted"> / day</span>
          </p>

          <div className="mt-auto grid grid-cols-1 gap-2 pt-4 min-[400px]:grid-cols-3 min-[400px]:gap-1.5">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-[10px] bg-accent px-2 text-xs font-semibold !text-white transition hover:brightness-95"
            >
              <WhatsAppIcon className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">WhatsApp</span>
            </a>
            <a
              href={telLink()}
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-[10px] bg-secondary px-2 text-xs font-semibold !text-white transition hover:brightness-95"
            >
              <PhoneIcon className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">Call Us</span>
            </a>
            <button
              type="button"
              onClick={() => setInquireOpen(true)}
              className="inline-flex min-h-11 items-center justify-center rounded-[10px] border border-white/20 bg-primary px-2 text-xs font-semibold !text-white transition hover:bg-primary/90"
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

export function ServiceFleetGrid({ items }: ServiceFleetGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, index) => (
        <Reveal key={item.name} delay={Math.min(index, 5) * 80}>
          <FleetCard item={item} />
        </Reveal>
      ))}
    </div>
  );
}
