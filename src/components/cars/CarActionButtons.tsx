import { telLink, formatPhone } from "@/lib/brand";
import { cn } from "@/lib/utils";

/** Shared WhatsApp / Call / Inquiry button style used on car cards, service fleet grids and the car page. */

const base =
  "inline-flex h-[44px] min-w-0 items-center justify-center gap-1.5 rounded-full px-3 text-[13px] font-semibold leading-5 transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-black";

export const carButtonClass = {
  // Green fill/hover colour comes from the global wa.me link rule in globals.css.
  whatsapp: cn(base, "group/wa bg-accent !text-white hover:shadow-[0_6px_16px_rgba(18,140,74,0.35)] motion-safe:hover:-translate-y-px"),
  call: cn(base, "group/call border border-brand-black/15 bg-white !text-brand-black hover:bg-brand-black/[0.06]"),
  inquiry: cn(
    base,
    "group/inq bg-brand-red !text-white hover:bg-brand-red-dark hover:shadow-[0_6px_16px_rgba(237,0,20,0.3)]",
  ),
};

const icon = "h-[18px] w-[18px] shrink-0";

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={cn(icon, className)} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.97.55 3.8 1.5 5.38L2 22l4.95-1.6a9.86 9.86 0 0 0 5.09 1.4h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2Zm5.76 13.98c-.24.68-1.4 1.25-1.93 1.33-.5.07-1.13.1-1.83-.12-.42-.13-.97-.32-1.67-.62-2.94-1.27-4.85-4.23-5-4.42-.14-.19-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.45.27-.29.59-.36.79-.36h.57c.18 0 .42-.07.66.5.24.58.82 2 .89 2.15.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.38-.45.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.03 1.12 1 2.07 1.31 2.36 1.46.29.15.46.12.63-.07.17-.2.73-.85.93-1.14.2-.29.4-.24.66-.14.27.1 1.7.8 1.99.95.29.15.48.22.55.34.07.13.07.73-.17 1.41Z" />
    </svg>
  );
}

export function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={cn(icon, "origin-center motion-safe:group-hover/call:animate-[phone-wiggle_0.6s_ease-in-out]", className)} viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

export function SendIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn(icon, "transition-transform duration-200 motion-safe:group-hover/inq:translate-x-[3px]", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21.5 3.5 10.8 14.2" />
      <path d="M21.5 3.5 14.7 21l-3.9-6.8L4 10.3 21.5 3.5Z" />
    </svg>
  );
}

type CarActionButtonsProps = {
  whatsappHref: string;
  callLabel?: string;
  inquiryLabel: string;
  onInquire: () => void;
  className?: string;
};

/** The three card buttons: WhatsApp (green), Call (white) and Inquiry (brand red). */
export function CarActionButtons({ whatsappHref, callLabel = "Call", inquiryLabel, onInquire, className }: CarActionButtonsProps) {
  return (
    <div
      className={cn("grid grid-cols-2 gap-2 min-[360px]:grid-cols-[1.15fr_0.8fr_1.25fr]", className)}
      onClick={(e) => e.stopPropagation()}
    >
      <a href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={carButtonClass.whatsapp}>
        <WhatsAppIcon />
        <span className="truncate">WhatsApp</span>
      </a>
      <a href={telLink()} aria-label={`Call ${formatPhone()}`} className={carButtonClass.call}>
        <PhoneIcon />
        <span className="truncate">{callLabel}</span>
      </a>
      <button type="button" onClick={onInquire} className={cn(carButtonClass.inquiry, "col-span-2 min-[360px]:col-span-1")}>
        <SendIcon />
        <span className="truncate">{inquiryLabel}</span>
      </button>
    </div>
  );
}
