import { brand, formatPhone, telLink, whatsappLink } from "@/lib/brand";
import { cn } from "@/lib/utils";

type ContactNumbersProps = {
  className?: string;
  /** "dark" for navy backgrounds, "light" for white ones. */
  tone?: "dark" | "light";
  align?: "left" | "center";
};

/**
 * All contact numbers in one consistent format:
 *   Call: 0333-4761786 / 0335-0300292
 *   WhatsApp: 0334-5414155
 * Every number is a clickable link (tel: for calls, wa.me for WhatsApp).
 */
export function ContactNumbers({ className, tone = "dark", align = "left" }: ContactNumbersProps) {
  const label = tone === "dark" ? "text-white/70" : "text-primary/70";
  // "!" because globals.css sets an unlayered `a { color: inherit }` that beats layered utilities.
  const link = tone === "dark" ? "!text-white/85 hover:!text-accent" : "!text-primary hover:!text-secondary";

  return (
    <div className={cn("space-y-1 text-sm", align === "center" && "text-center", className)}>
      <p>
        <span className={label}>Call: </span>
        {brand.phones.map((phone, index) => (
          <span key={phone.number}>
            {/* nowrap: a long line breaks between the numbers, never inside one */}
            <span className="whitespace-nowrap">
              <a href={telLink(phone.number)} className={cn("font-medium transition", link)}>
                {formatPhone(phone.number)}
              </a>
              {index < brand.phones.length - 1 ? <span className={label}> /</span> : null}
            </span>
            {index < brand.phones.length - 1 ? " " : null}
          </span>
        ))}
      </p>
      <p>
        <span className={label}>WhatsApp: </span>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className={cn("wa-text font-medium transition", tone === "dark" ? "wa-text-dark" : "wa-text-light")}
        >
          {formatPhone(brand.whatsapp)}
        </a>
      </p>
    </div>
  );
}
