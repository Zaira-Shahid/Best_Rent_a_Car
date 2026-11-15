"use client";

import Image from "next/image";
import { useState } from "react";
import type { CarModel, ServiceFleetItem } from "@/types";
import { InquireModal } from "@/components/cars/InquireModal";
import { Reveal } from "@/components/ui/Reveal";
import { CarActionButtons } from "@/components/cars/CarActionButtons";
import { brand, formatPrice, whatsappLink } from "@/lib/brand";

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

          <CarActionButtons
            className="mt-auto pt-4"
            whatsappHref={whatsappHref}
            callLabel="Call Us"
            inquiryLabel="Inquiry"
            onInquire={() => setInquireOpen(true)}
          />
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
