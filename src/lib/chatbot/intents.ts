import type { Chip } from "./types";

/** Quick-reply chips shown under the welcome message and under every answer. */
export const MAIN_CHIPS: Chip[] = [
  { label: "🚗 Show cars", payload: "cmd:cars" },
  { label: "💰 Prices", payload: "cmd:prices" },
  { label: "👥 By seats", payload: "cmd:seats" },
  { label: "🛣️ Services", payload: "cmd:services" },
  { label: "📍 Cities", payload: "cmd:cities" },
  { label: "⭐ Reviews", payload: "cmd:reviews" },
  { label: "📞 Contact", payload: "cmd:contact" },
  { label: "❓ FAQs", payload: "cmd:faqs" },
];

export type BudgetRange = { label: string; min: number; max: number };

export const BUDGET_RANGES: BudgetRange[] = [
  { label: "Under 5,000", min: 0, max: 4999 },
  { label: "5,000–10,000", min: 5000, max: 10000 },
  { label: "10,000–20,000", min: 10000, max: 20000 },
  { label: "20,000+", min: 20000, max: Number.POSITIVE_INFINITY },
];

export type SeatRange = { label: string; min: number; max: number };

export const SEAT_RANGES: SeatRange[] = [
  { label: "4–5 seats", min: 4, max: 5 },
  { label: "7 seats", min: 6, max: 9 },
  { label: "10+ seats", min: 10, max: Number.POSITIVE_INFINITY },
  { label: "20+ seats", min: 20, max: Number.POSITIVE_INFINITY },
];

export const GREETINGS = new Set([
  "hi", "hii", "hiii", "hello", "helo", "hey", "heya", "salam", "salaam", "slam", "aoa", "assalam", "assalamualaikum",
  "asalam", "assalamu", "asslam", "assalaam", "good", "morning", "evening", "afternoon",
]);

/** Fleet-section slug for free-text category words (English and Roman Urdu). */
export const CATEGORY_KEYWORDS: Record<string, string[]> = {
  "suv-hybrid": ["suv", "suvs", "hybrid", "jeep"],
  "executive-suv": ["executive", "4x4", "vip"],
  luxury: ["luxury", "luxurious"],
  economy: ["economy", "sasti", "sasta", "saste", "cheap", "cheapest", "affordable", "budget"],
  standard: ["standard", "sedan", "sedans"],
  premium: ["premium"],
  "group-travel": ["coaster", "coasters", "van", "vans", "bus", "hiace", "group", "minibus"],
  corporate: ["corporate", "office", "business"],
  tourism: ["tour", "tours", "tourism", "tourist"],
};

/** Intent keywords with weights. The highest total wins; ties follow the order of INTENT_ORDER. */
export const INTENT_KEYWORDS: Record<string, Record<string, number>> = {
  cars: { car: 1, cars: 1, gari: 1, gaari: 1, gadi: 1, gariyan: 1, vehicle: 1, vehicles: 1, fleet: 2, models: 1, show: 1 },
  prices: { price: 3, prices: 3, pricing: 3, rate: 3, rates: 3, kiraya: 3, kirraya: 3, kitna: 3, kitni: 3, kitne: 3, cost: 3, charges: 3, charge: 3, fare: 3, paisa: 2, paisay: 2, paise: 2, daily: 1 },
  seats: { seater: 3, seaters: 3, seat: 2, seats: 2, seating: 2, passengers: 2, sitter: 3, capacity: 2 },
  services: { service: 3, services: 3, khidmat: 3 },
  cities: { city: 1, cities: 3, shehar: 3, sheher: 3, shehr: 3 },
  reviews: { review: 3, reviews: 3, rating: 3, ratings: 3, feedback: 3, testimonials: 3 },
  contact: { contact: 3, number: 3, numbers: 3, phone: 3, call: 2, rabta: 3, raabta: 3, whatsapp: 3, mobile: 3, email: 3, nmbr: 3, num: 2 },
  address: { address: 4, kahan: 4, kaha: 4, kidhar: 4, location: 3, map: 3, directions: 4, where: 3, pata: 3, office: 2, locate: 3 },
  hours: { timing: 4, timings: 4, time: 3, hours: 3, open: 3, khula: 3, khulay: 3, kab: 2, schedule: 3 },
  faqs: { faq: 4, faqs: 4, question: 3, questions: 3, sawal: 3, sawalat: 3 },
  airport: { airport: 5, flight: 3 },
  wedding: { shadi: 5, shaadi: 5, wedding: 5, barat: 5, walima: 5, mehndi: 4 },
  driver: { driver: 4, chauffeur: 4, drivers: 4 },
  booking: { book: 4, booking: 4, reserve: 4, reservation: 4 },
  thanks: { thanks: 5, thank: 5, thankyou: 5, shukriya: 5, shukria: 5, jazakallah: 5, tysm: 5 },
};

export const INTENT_ORDER = [
  "airport", "wedding", "driver", "booking", "address", "hours", "contact", "reviews", "faqs", "prices", "seats",
  "services", "cities", "cars", "thanks",
] as const;

/** Words that must never identify a car on their own. */
export const CAR_ALIAS_STOPLIST = new Set([
  "automatic", "manual", "city", "gen", "11th", "gli", "benz", "grand", "rent", "with",
]);

/** Brand words that are matched as a brand, not as a model. */
export const BRAND_WORDS = ["toyota", "honda", "suzuki", "hyundai", "kia", "mercedes", "audi", "lexus"] as const;
