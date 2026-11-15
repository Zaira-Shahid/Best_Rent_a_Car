const BRAND_NAME = "Best Carz Rent a Car";

/** Call numbers, in local format. The first one is the primary number used by every "Call" button. */
const PHONES = [
  { label: "Primary", number: "03334761786" },
  { label: "Secondary", number: "03350300292" },
] as const;

export const brand = {
  name: BRAND_NAME,
  shortName: "Best Carz",
  tagline: "Premium car rental across Pakistan",
  phones: PHONES,
  /** Primary call number (same as phones[0]). */
  phone: PHONES[0].number,
  /** WhatsApp number in international format, no "+" or spaces. */
  whatsapp: "923345414155",
  // TODO(client): placeholder email and address. Replace with the real Best Carz Rent a Car details.
  email: "info@example.com", // TODO: real email
  currency: "PKR",
  location: {
    label: `${BRAND_NAME}, Islamabad`, // TODO: real location label
    address: `${BRAND_NAME}, Islamabad, Pakistan`, // TODO: real address
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Islamabad+Pakistan",
  },
  social: {
    facebook: "https://www.facebook.com/share/1cCiFygjXf/",
    instagram: "https://www.instagram.com/bestcarz_rent_a_car/",
  },
  colors: {
    primary: "#06264b",
    secondary: "#278a08",
    accent: "#278a08",
    background: "#F8F9FA",
  },
} as const;

/**
 * Single place that builds WhatsApp links. Without a message it returns the plain
 * chat link; with one it pre-fills the text.
 */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${brand.whatsapp}`;
  return message === undefined ? base : `${base}?text=${encodeURIComponent(message)}`;
}

export function formatPrice(amount: number) {
  return `${brand.currency} ${amount.toLocaleString("en-PK")}`;
}

/** The 10 national digits of a Pakistani number, from "0333-4761786", "03334761786" or "923334761786". */
function nationalDigits(number: string) {
  const digits = number.replace(/\D/g, "");
  if (digits.startsWith("92") && digits.length === 12) return digits.slice(2);
  if (digits.startsWith("0")) return digits.slice(1);
  return digits;
}

/** "03334761786" -> "+923334761786" */
export function internationalPhone(number: string = brand.phone) {
  return `+92${nationalDigits(number)}`;
}

/** "03334761786" -> "tel:+923334761786" (defaults to the primary number) */
export function telLink(number: string = brand.phone) {
  return `tel:${internationalPhone(number)}`;
}

/** "03334761786" (or "923345414155") -> "0333-4761786" */
export function formatPhone(number: string = brand.phone) {
  const national = nationalDigits(number);
  if (national.length !== 10) return number;
  return `0${national.slice(0, 3)}-${national.slice(3)}`;
}
