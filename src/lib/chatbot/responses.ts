import { carModels, fleetSections, getCarsForCategory, homeFaqs } from "@/data/cars";
import { cities } from "@/data/cities";
import { services } from "@/data/services";
import { brand, formatPrice, whatsappLink } from "@/lib/brand";
import { BUDGET_RANGES, MAIN_CHIPS, SEAT_RANGES } from "./intents";
import type { Block, Chip } from "./types";

/** Most cars shown in one answer; the rest are one tap away on /cars. */
const MAX_CARS = 6;

const mainChips = (): Block => ({ type: "chips", chips: MAIN_CHIPS });
const text = (value: string): Block => ({ type: "text", text: value });
const allCarsLink = (): Block => ({ type: "links", items: [{ label: "See all cars", href: "/cars" }] });

/** "Hi Best Carz, I want to book {car} (PKR {price}/day). Pickup date: __ Pickup location: __" */
export function bookingMessage(carName: string, priceDay: number) {
  return `Hi ${brand.shortName}, I want to book ${carName} (PKR ${priceDay.toLocaleString("en-PK")}/day). Pickup date: __ Pickup location: __`;
}

export function bookingLink(carName: string, priceDay: number) {
  return whatsappLink(bookingMessage(carName, priceDay));
}

function carList(slugs: string[], heading: string): Block[] {
  const shown = slugs.slice(0, MAX_CARS);
  const blocks: Block[] = [text(heading), { type: "cars", slugs: shown }];
  if (slugs.length > shown.length) {
    blocks.push({ type: "links", items: [{ label: `See all ${slugs.length} cars`, href: "/cars" }] });
  }
  return blocks;
}

export function welcome(): Block[] {
  return [
    text(
      `Assalam o Alaikum! 👋 I'm the ${brand.shortName} Assistant. I can show you our cars and prices, services, cities, reviews and contact details. What would you like to see?`,
    ),
    mainChips(),
  ];
}

export function fallback(): Block[] {
  return [
    text("Sorry, I didn't get that. You can pick an option below, or ask our team directly on WhatsApp."),
    { type: "buttons", items: [{ label: "Ask on WhatsApp", href: whatsappLink(), tone: "whatsapp", external: true }] },
    mainChips(),
  ];
}

export function thanks(): Block[] {
  return [text("You're welcome! Anything else I can help with?"), mainChips()];
}

/** "Show cars": one chip per fleet section. */
export function showCars(): Block[] {
  const chips: Chip[] = fleetSections.map((section) => ({
    label: section.name.replace(/ Fleet$/, ""),
    payload: `cmd:cat:${section.slug}`,
  }));
  return [text(`We have ${carModels.length} vehicles. Which type are you looking for?`), { type: "chips", chips }];
}

export function categoryCars(slug: string): Block[] {
  const section = fleetSections.find((item) => item.slug === slug);
  const list = getCarsForCategory(slug);
  if (!section || list.length === 0) return fallback();
  return [...carList(list.map((car) => car.slug), `${section.name}: ${section.description}`), mainChips()];
}

export function brandCars(brandWord: string): Block[] {
  const list = carModels.filter((car) => car.brand.toLowerCase().includes(brandWord) || car.name.toLowerCase().startsWith(brandWord));
  if (list.length === 0) return fallback();
  return [...carList(list.map((car) => car.slug), `Here are our ${list[0].brand} vehicles:`), mainChips()];
}

export function specificCars(slugs: string[]): Block[] {
  const heading = slugs.length === 1 ? "Here you go:" : "Here are the matching cars:";
  return [...carList(slugs, heading), mainChips()];
}

/** "Prices": budget chips plus the real min/max from the data. */
export function prices(): Block[] {
  const all = carModels.map((car) => car.priceDay);
  const chips: Chip[] = BUDGET_RANGES.map((range) => ({
    label: range.label,
    payload: `cmd:budget:${range.min}-${Number.isFinite(range.max) ? range.max : "inf"}`,
  }));
  return [
    text(`Our daily rates run from ${formatPrice(Math.min(...all))} to ${formatPrice(Math.max(...all))} per day. What is your budget?`),
    { type: "chips", chips },
  ];
}

function emptyResult(label: string): Block[] {
  return [text(`I couldn't find a car ${label}. You can see the full list or ask our team.`), allCarsLink(), mainChips()];
}

export function carsByBudget(min: number, max: number, label: string): Block[] {
  const list = carModels.filter((car) => car.priceDay >= min && car.priceDay <= max).sort((a, b) => a.priceDay - b.priceDay);
  if (list.length === 0) return emptyResult(label);
  return [...carList(list.map((car) => car.slug), `Cars ${label} (${list.length}), cheapest first:`), mainChips()];
}

export function seatsMenu(): Block[] {
  const chips: Chip[] = SEAT_RANGES.map((range) => ({
    label: range.label,
    payload: `cmd:seats:${range.min}-${Number.isFinite(range.max) ? range.max : "inf"}`,
  }));
  return [text("How many seats do you need?"), { type: "chips", chips }];
}

export function carsBySeats(min: number, max: number, label: string): Block[] {
  const list = carModels.filter((car) => car.seats >= min && car.seats <= max).sort((a, b) => a.priceDay - b.priceDay);
  if (list.length === 0) return emptyResult(`with ${label}`);
  return [...carList(list.map((car) => car.slug), `Cars with ${label} (${list.length}):`), mainChips()];
}

/** Seats and budget together, e.g. "7 seater under 20000". */
export function carsFiltered(opts: {
  seats: { min: number; max: number };
  budget: { min: number; max: number };
  label: string;
}): Block[] {
  const list = carModels
    .filter((car) => car.seats >= opts.seats.min && car.seats <= opts.seats.max && car.priceDay >= opts.budget.min && car.priceDay <= opts.budget.max)
    .sort((a, b) => a.priceDay - b.priceDay);
  if (list.length === 0) return emptyResult(opts.label);
  return [...carList(list.map((car) => car.slug), `Cars ${opts.label} (${list.length}):`), mainChips()];
}

export function servicesList(): Block[] {
  return [
    text("These are our services:"),
    { type: "links", items: services.map((service) => ({ label: service.name, href: `/services/${service.slug}` })) },
    mainChips(),
  ];
}

export function citiesList(): Block[] {
  const toLinks = (type: "primary" | "tourist") =>
    cities.filter((city) => city.type === type).map((city) => ({ label: city.name, href: `/rent-a-car/${city.slug}` }));
  return [
    text("Main cities:"),
    { type: "links", items: toLinks("primary") },
    text("Tourist destinations:"),
    { type: "links", items: toLinks("tourist") },
    mainChips(),
  ];
}

export function reviews(): Block[] {
  return [
    text(`${brand.rating.toFixed(1)}★ · ${brand.reviewCount} Google reviews. Here is what customers say:`),
    { type: "reviews" },
    { type: "buttons", items: [{ label: "See all on Google", href: brand.googleReviewsUrl, tone: "dark", external: true }] },
    mainChips(),
  ];
}

export function contact(): Block[] {
  return [text("You can reach us any time:"), { type: "contact" }, mainChips()];
}

export function address(): Block[] {
  return [
    text(`${brand.name}, ${brand.location.address}. ${brand.hours}.`),
    { type: "buttons", items: [{ label: "Get Directions", href: brand.location.mapsUrl, tone: "dark", external: true }] },
    mainChips(),
  ];
}

export function hours(): Block[] {
  return [text(`${brand.hours}.`), { type: "contact" }, mainChips()];
}

export function faqMenu(): Block[] {
  const chips: Chip[] = homeFaqs.map((faq, index) => ({ label: faq.question, payload: `cmd:faq:${index}` }));
  return [text("Pick a question:"), { type: "chips", chips }];
}

export function faqAnswer(index: number): Block[] {
  const faq = homeFaqs[index];
  if (!faq) return fallback();
  return [text(faq.answer), mainChips()];
}

/** Answer taken from the FAQ whose question contains the keyword, plus optional related blocks. */
function faqByKeyword(keyword: string, extra: Block[] = []): Block[] | null {
  const faq = homeFaqs.find((item) => item.question.toLowerCase().includes(keyword));
  if (!faq) return null;
  return [text(faq.answer), ...extra, mainChips()];
}

const serviceLink = (slug: string): Block[] => {
  const service = services.find((item) => item.slug === slug);
  return service ? [{ type: "links", items: [{ label: service.name, href: `/services/${service.slug}` }] }] : [];
};

const whatsappButton = (message?: string): Block => ({
  type: "buttons",
  items: [{ label: "Book on WhatsApp", href: whatsappLink(message), tone: "whatsapp", external: true }],
});

export function airport(): Block[] {
  const message = `Hi ${brand.shortName}, I need an airport pickup. Pickup date: __ Pickup location: __`;
  return (
    faqByKeyword("airport", [...serviceLink("airport-pick-drop"), whatsappButton(message)]) ?? [
      text("We offer airport pick and drop."),
      ...serviceLink("airport-pick-drop"),
      mainChips(),
    ]
  );
}

export function wedding(): Block[] {
  const section = fleetSections.find((item) => item.slug === "wedding-event");
  const list = getCarsForCategory("wedding-event").slice(0, 4);
  return [
    text(section ? `${section.name}: ${section.description}` : "Cars for weddings and events:"),
    ...serviceLink("wedding-car-rental"),
    { type: "cars", slugs: list.map((car) => car.slug) },
    mainChips(),
  ];
}

export function driver(): Block[] {
  return faqByKeyword("driver") ?? fallback();
}

export function booking(): Block[] {
  return faqByKeyword("booking", [whatsappButton()]) ?? fallback();
}
