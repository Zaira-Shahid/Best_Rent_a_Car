"use client";

import Image from "next/image";
import Link from "next/link";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/shared/SocialLinks";
import { carModels } from "@/data/cars";
import { googleReviews } from "@/data/reviews";
import { brand, formatPhone, formatPrice, telLink, whatsappLink } from "@/lib/brand";
import { bookingLink } from "@/lib/chatbot";
import type { Block, ChatButton, Chip } from "@/lib/chatbot";
import { cn } from "@/lib/utils";

const pill =
  "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full px-4 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-black";

const toneClass: Record<NonNullable<ChatButton["tone"]>, string> = {
  whatsapp: "bg-accent !text-white hover:brightness-95",
  dark: "bg-brand-black !text-white hover:bg-brand-black/85",
  red: "bg-brand-red !text-white hover:bg-brand-red-dark",
};

type Handlers = {
  onChip: (chip: Chip) => void;
  /** Called after an in-site link is followed (the mobile sheet closes itself). */
  onNavigate: () => void;
};

function CarMiniCard({ slug, onNavigate }: { slug: string; onNavigate: () => void }) {
  const car = carModels.find((item) => item.slug === slug);
  if (!car) return null;
  return (
    <div className="overflow-hidden rounded-2xl border border-brand-black/10 bg-white shadow-[0_4px_14px_rgba(21,24,29,0.06)]">
      <div className="flex gap-3 p-3">
        <div className="relative h-[68px] w-[96px] shrink-0 overflow-hidden rounded-xl bg-background">
          <Image src={car.image} alt={car.name} fill unoptimized sizes="96px" className="object-cover" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold leading-snug text-brand-black">{car.name}</p>
          <p className="mt-0.5 text-sm font-bold text-brand-red-dark">
            {formatPrice(car.priceDay)} <span className="font-medium text-brand-black/70">/ day</span>
          </p>
          <p className="mt-0.5 text-xs text-brand-black/70">
            {car.seats} seats · {car.transmission} · {car.fuel}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 px-3 pb-3">
        <Link
          href={`/cars/${car.slug}`}
          onClick={onNavigate}
          className={cn(pill, "border border-brand-black/20 bg-white !text-brand-black hover:border-brand-black")}
        >
          Details
        </Link>
        <a
          href={bookingLink(car.name, car.priceDay)}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(pill, toneClass.whatsapp, "px-2 text-[13px]")}
        >
          Book on WhatsApp
        </a>
      </div>
    </div>
  );
}

function ContactBlock() {
  const socials = [
    { label: "Facebook", href: brand.social.facebook, Icon: FacebookIcon },
    { label: "Instagram", href: brand.social.instagram, Icon: InstagramIcon },
    { label: "TikTok", href: brand.social.tiktok, Icon: TikTokIcon },
  ];
  return (
    <div className="space-y-3 rounded-2xl border border-brand-black/10 bg-white p-4 text-sm text-brand-black shadow-[0_4px_14px_rgba(21,24,29,0.06)]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-black/70">Call</p>
        <div className="mt-1 flex flex-wrap gap-2">
          {brand.phones.map((phone) => (
            <a key={phone.number} href={telLink(phone.number)} className={cn(pill, "border border-brand-black/20 bg-white !text-brand-black hover:border-brand-black")}>
              {formatPhone(phone.number)}
            </a>
          ))}
        </div>
      </div>
      <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={cn(pill, toneClass.whatsapp, "w-full")}>
        WhatsApp {formatPhone(brand.whatsapp)}
      </a>
      <p>
        {brand.location.address}
        <br />
        <span className="text-brand-black/70">{brand.hours}</span>
      </p>
      <a href={brand.location.mapsUrl} target="_blank" rel="noopener noreferrer" className={cn(pill, toneClass.dark, "w-full")}>
        Get Directions
      </a>
      <div className="flex gap-2">
        {socials.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="grid h-11 w-11 place-items-center rounded-full bg-brand-black !text-white transition hover:bg-brand-red"
          >
            <Icon className="h-5 w-5" />
          </a>
        ))}
      </div>
    </div>
  );
}

function ReviewsBlock() {
  return (
    <div className="space-y-2">
      {googleReviews.slice(0, 2).map((review) => (
        <figure key={review.name} className="rounded-2xl border border-brand-black/10 bg-white p-4 shadow-[0_4px_14px_rgba(21,24,29,0.06)]">
          <blockquote className="text-sm leading-relaxed text-brand-black">&ldquo;{review.text}&rdquo;</blockquote>
          <figcaption className="mt-2 text-xs text-brand-black/70">
            <span className="font-semibold text-brand-black">{review.name}</span>
            {review.localGuide ? " · Local Guide" : ""} · {review.age}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/** One answer block. Chips are rendered separately so only the latest ones are interactive. */
export function BlockView({ block, handlers }: { block: Block; handlers: Handlers }) {
  switch (block.type) {
    case "text":
      return (
        <div className="max-w-[88%] rounded-2xl rounded-bl-md bg-[#f3f4f5] px-4 py-3 text-sm leading-relaxed text-brand-black">
          {block.text}
        </div>
      );
    case "cars":
      return (
        <div className="w-full max-w-[96%] space-y-2.5">
          {block.slugs.map((slug) => (
            <CarMiniCard key={slug} slug={slug} onNavigate={handlers.onNavigate} />
          ))}
        </div>
      );
    case "links":
      return (
        <div className="flex max-w-[96%] flex-wrap gap-2">
          {block.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={handlers.onNavigate}
              className={cn(pill, "border border-brand-black/20 bg-white !text-brand-black hover:border-brand-red hover:!text-brand-red-dark")}
            >
              {item.label}
            </Link>
          ))}
        </div>
      );
    case "buttons":
      return (
        <div className="flex max-w-[96%] flex-wrap gap-2">
          {block.items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className={cn(pill, toneClass[item.tone ?? "dark"])}
            >
              {item.label}
            </a>
          ))}
        </div>
      );
    case "contact":
      return (
        <div className="w-full max-w-[96%]">
          <ContactBlock />
        </div>
      );
    case "reviews":
      return (
        <div className="w-full max-w-[96%]">
          <ReviewsBlock />
        </div>
      );
    default:
      return null;
  }
}

export function ChipRow({ chips, onChip }: { chips: Chip[]; onChip: (chip: Chip) => void }) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Quick replies">
      {chips.map((chip) => (
        <button
          key={chip.payload}
          type="button"
          onClick={() => onChip(chip)}
          className="inline-flex min-h-11 items-center rounded-full border border-brand-black/20 bg-white px-4 text-left text-sm font-medium text-brand-black transition hover:border-brand-red hover:text-brand-red-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-black"
        >
          {chip.label}
        </button>
      ))}
    </div>
  );
}
