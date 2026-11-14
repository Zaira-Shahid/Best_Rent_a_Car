"use client";

import Image from "next/image";
import { brand, formatPhoneDisplay } from "@/lib/brand";
import { cn } from "@/lib/utils";

const AGENT_IMAGE =
  "https://images.unsplash.com/photo-1626863905121-3b0c0ed7b94c?auto=format&fit=crop&w=900&q=80";

type FaqHelpCardProps = {
  className?: string;
};

export function FaqHelpCard({ className }: FaqHelpCardProps) {
  return (
    <div
      className={cn(
        "group relative min-h-[240px] overflow-hidden rounded-2xl shadow-2xl sm:min-h-[280px] lg:h-[560px] lg:min-h-0",
        className,
      )}
    >
      <Image
        src={AGENT_IMAGE}
        alt="Call agent with headset ready to help"
        fill
        className="object-cover object-[center_15%] transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="(max-width: 1024px) 100vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/15" />

      <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur-md sm:left-5 sm:top-5">
        <span className="relative flex h-2.5 w-2.5">
          <span className="dot-pulse absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-white">Agent Online</span>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 animate-fade-up-delay p-5 sm:p-7 lg:p-8">
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-accent/20 text-accent sm:mb-4 sm:h-12 sm:w-12">
          <span className="material-symbols-outlined text-[24px]">support_agent</span>
        </div>
        <h3 className="font-heading text-lg font-semibold text-white sm:text-xl">Need immediate help?</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/75">
          Talk to a live Best Rent a Car agent for bookings, changes, and roadside support — available 24/7.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-stretch xl:flex-row xl:items-center">
          <a
            href={`tel:${brand.phone}`}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold !text-white transition hover:scale-[1.02] hover:brightness-95 active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">support_agent</span>
            Call Agent
          </a>
          <a
            href={`https://wa.me/${brand.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            WhatsApp
          </a>
        </div>
        <p className="mt-3 text-xs text-white/55">{formatPhoneDisplay()}</p>
      </div>
    </div>
  );
}
