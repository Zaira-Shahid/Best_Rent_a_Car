const BRAND_NAME = "Best Carz Rent a Car";

export const brand = {
  name: BRAND_NAME,
  shortName: "Best Carz",
  tagline: "Premium car rental across Pakistan",
  // TODO(client): placeholder contact details. Replace phone, whatsapp, email and
  // address with the real Best Carz Rent a Car details before accepting real bookings.
  phone: "03000000000", // TODO: real phone
  whatsapp: "923000000000", // TODO: real WhatsApp number (country code, no "+")
  email: "info@example.com", // TODO: real email
  currency: "PKR",
  location: {
    label: `${BRAND_NAME}, Islamabad`, // TODO: real location label
    address: `${BRAND_NAME}, Islamabad, Pakistan`, // TODO: real address
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Islamabad+Pakistan",
  },
  social: {
    facebook: "https://example.com/facebook",
    instagram: "https://example.com/instagram",
    tiktok: "https://example.com/tiktok",
    youtube: "https://example.com/youtube",
    pinterest: "https://example.com/pinterest",
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

/** Display phone for UI (same number used for Call Us everywhere) */
export function formatPhoneDisplay() {
  const digits = brand.phone.replace(/\D/g, "");
  if (digits.length === 11) {
    return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  }
  return brand.phone;
}
