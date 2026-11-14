export const brand = {
  name: "Best Rent a Car",
  shortName: "Best",
  tagline: "Premium car rental across Pakistan",
  // Demo contact details. Replace these before accepting real bookings.
  phone: "03000000000",
  whatsapp: "923000000000",
  email: "info@example.com",
  currency: "PKR",
  location: {
    label: "Best Rent a Car, Islamabad",
    address: "Best Rent a Car, Islamabad, Pakistan",
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
