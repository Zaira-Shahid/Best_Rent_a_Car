import { carModels } from "@/data/cars";
import { formatPrice } from "@/lib/brand";
import {
  BRAND_WORDS,
  BUDGET_RANGES,
  CAR_ALIAS_STOPLIST,
  CATEGORY_KEYWORDS,
  GREETINGS,
  INTENT_KEYWORDS,
  INTENT_ORDER,
  SEAT_RANGES,
} from "./intents";
import * as r from "./responses";
import type { Block } from "./types";

type Range = { min: number; max: number };

/** Lowercase, drop punctuation (keeping + and digits), glue thousands separators: "10,000" -> "10000". */
export function normalize(raw: string) {
  return raw
    .toLowerCase()
    .replace(/(\d),(\d{3})/g, "$1$2")
    .replace(/[^a-z0-9+ ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** True when the strings differ by at most one insertion, deletion or substitution. */
function withinOneEdit(a: string, b: string) {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  if (i === a.length && i === b.length) return true;
  if (a.length === b.length) return a.slice(i + 1) === b.slice(i + 1);
  return a.length > b.length ? a.slice(i + 1) === b.slice(i) : a.slice(i) === b.slice(i + 1);
}

// ---------------------------------------------------------------------------------------------
// Car names: aliases are built from the data, never hard-coded.
// ---------------------------------------------------------------------------------------------

const brandWords = new Set<string>(BRAND_WORDS);

type CarAliases = { slug: string; aliases: Set<string> };

const carAliases: CarAliases[] = carModels.map((car) => {
  const tokens = normalize(car.name).split(" ");
  const aliases = new Set<string>();
  for (let start = 0; start < tokens.length; start++) {
    let joined = "";
    for (let end = start; end < tokens.length; end++) {
      joined += tokens[end];
      const isLong = joined.length >= 4 || (joined.length >= 3 && /\d/.test(joined));
      if (isLong && !CAR_ALIAS_STOPLIST.has(joined) && !brandWords.has(joined)) aliases.add(joined);
    }
  }
  const slugKey = car.slug.replace(/-/g, "");
  if (slugKey.length >= 4) aliases.add(slugKey);
  return { slug: car.slug, aliases };
});

/** Words, and runs of up to four adjacent words, joined without spaces ("lc 300" -> "lc300"). */
function candidates(tokens: string[]) {
  const out = new Set<string>();
  for (let i = 0; i < tokens.length; i++) {
    let joined = "";
    for (let j = i; j < Math.min(tokens.length, i + 4); j++) {
      joined += tokens[j];
      out.add(joined);
    }
  }
  return out;
}

function matchCars(tokens: string[]): string[] {
  const cands = candidates(tokens);
  const scored: { slug: string; score: number }[] = [];
  for (const car of carAliases) {
    let best = 0;
    for (const cand of cands) {
      if (cand.length < 3) continue;
      for (const alias of car.aliases) {
        const exact = alias === cand;
        const fuzzy = !exact && cand.length >= 5 && alias.length >= 5 && withinOneEdit(cand, alias);
        if (exact || fuzzy) best = Math.max(best, alias.length - (fuzzy ? 0.5 : 0));
      }
    }
    if (best > 0) scored.push({ slug: car.slug, score: best });
  }
  if (scored.length === 0) return [];
  const top = Math.max(...scored.map((item) => item.score));
  // Keep every car that matches as specifically as the best one ("corolla" -> both Corollas).
  return scored.filter((item) => item.score >= top - 1).map((item) => item.slug);
}

// ---------------------------------------------------------------------------------------------
// Numbers: seats and budgets ("7 seater", "under 10000", "10k", "2 lakh")
// ---------------------------------------------------------------------------------------------

const AMOUNT = String.raw`(\d+(?:\.\d+)?)\s*(k|lakh|lac|lacs)?`;

function toAmount(num: string, suffix?: string) {
  const n = Number.parseFloat(num);
  if (suffix === "k") return n * 1000;
  if (suffix) return n * 100000;
  return n;
}

type SeatQuery = { range: Range; label: string; rest: string; exact?: number };

function parseSeats(text: string): SeatQuery | null {
  const match = text.match(
    /\b(\d{1,2})\s*(\+)?\s*(?:seater|seaters|seat|seats|seated|sitter|sitar|passenger|passengers|people|persons|pax|wali|wala)\b/,
  );
  if (!match) return null;
  const n = Number.parseInt(match[1], 10);
  const rest = text.replace(match[0], " ");
  if (match[2]) return { range: { min: n, max: Number.POSITIVE_INFINITY }, label: `${n}+ seats`, rest };
  return { range: { min: n, max: n }, label: `${n} seats`, rest, exact: n };
}

function parseBudget(text: string): { range: Range; label: string } | null {
  const upper =
    text.match(
      new RegExp(String.raw`\b(?:under|below|less than|upto|up to|within|max|maximum|budget|neeche|kam)\s*(?:of\s*)?(?:pkr|rs|rupees|rupay)?\s*` + AMOUNT),
    ) ?? text.match(new RegExp(AMOUNT + String.raw`\s*(?:pkr|rs|rupees)?\s*(?:tak|ke andar|se kam|ke neeche|or less)\b`));
  if (upper) {
    const amount = toAmount(upper[1], upper[2]);
    return { range: { min: 0, max: amount }, label: `up to ${formatPrice(amount)} per day` };
  }
  const lower =
    text.match(new RegExp(String.raw`\b(?:above|over|more than|zyada|minimum|min|at least)\s*(?:of\s*)?(?:pkr|rs|rupees)?\s*` + AMOUNT)) ??
    text.match(/\b(\d{4,6})\+/);
  if (lower) {
    const amount = toAmount(lower[1], lower[2]);
    return { range: { min: amount, max: Number.POSITIVE_INFINITY }, label: `from ${formatPrice(amount)} per day` };
  }
  for (const chunk of text.matchAll(new RegExp(String.raw`\b` + AMOUNT + String.raw`(?![a-z0-9])`, "g"))) {
    const amount = toAmount(chunk[1], chunk[2]);
    const isYear = !chunk[2] && amount >= 1990 && amount <= 2035;
    if ((chunk[2] || amount >= 1000) && !isYear) {
      return { range: { min: 0, max: amount }, label: `up to ${formatPrice(amount)} per day` };
    }
  }
  return null;
}

// ---------------------------------------------------------------------------------------------
// Intents
// ---------------------------------------------------------------------------------------------

function scoreIntents(tokens: string[]) {
  const scores: Record<string, number> = {};
  for (const [intent, words] of Object.entries(INTENT_KEYWORDS)) {
    for (const token of tokens) scores[intent] = (scores[intent] ?? 0) + (words[token] ?? 0);
  }
  return scores;
}

function categoryFor(tokens: string[]): string | null {
  for (const [slug, words] of Object.entries(CATEGORY_KEYWORDS)) {
    if (tokens.some((token) => words.includes(token))) return slug;
  }
  return null;
}

const INTENT_REPLY: Record<string, () => Block[]> = {
  cars: r.showCars,
  prices: r.prices,
  seats: r.seatsMenu,
  services: r.servicesList,
  cities: r.citiesList,
  reviews: r.reviews,
  contact: r.contact,
  address: r.address,
  hours: r.hours,
  faqs: r.faqMenu,
  airport: r.airport,
  wedding: r.wedding,
  driver: r.driver,
  booking: r.booking,
  thanks: r.thanks,
};

const parseBound = (value: string) => (value === "inf" ? Number.POSITIVE_INFINITY : Number.parseInt(value, 10));

/** Chips send "cmd:..." payloads that skip the keyword matching. */
function runCommand(payload: string): Block[] {
  const [, name, arg] = payload.split(":");
  switch (name) {
    case "cars":
      return r.showCars();
    case "cat":
      return r.categoryCars(arg);
    case "prices":
      return r.prices();
    case "budget": {
      const [min, max] = arg.split("-");
      const range = BUDGET_RANGES.find((item) => item.min === parseBound(min) && item.max === parseBound(max));
      const label = !range
        ? "in that range"
        : range.min === 0
          ? `under ${formatPrice(range.max + 1)} per day`
          : Number.isFinite(range.max)
            ? `between ${formatPrice(range.min)} and ${formatPrice(range.max)} per day`
            : `from ${formatPrice(range.min)} per day`;
      return r.carsByBudget(parseBound(min), parseBound(max), label);
    }
    case "seats": {
      if (!arg) return r.seatsMenu();
      const [min, max] = arg.split("-");
      const range = SEAT_RANGES.find((item) => item.min === parseBound(min) && item.max === parseBound(max));
      return r.carsBySeats(parseBound(min), parseBound(max), range?.label ?? "that many seats");
    }
    case "services":
      return r.servicesList();
    case "cities":
      return r.citiesList();
    case "reviews":
      return r.reviews();
    case "contact":
      return r.contact();
    case "faqs":
      return r.faqMenu();
    case "faq":
      return r.faqAnswer(Number.parseInt(arg, 10));
    default:
      return r.fallback();
  }
}

/** The one entry point: user text (or a chip payload) in, answer blocks out. Pure and synchronous. */
export function respond(input: string): Block[] {
  if (input.startsWith("cmd:")) return runCommand(input);

  const text = normalize(input);
  if (!text) return r.welcome();
  const tokens = text.split(" ");

  // 1. A specific car ("prado", "lc300", "honda civic").
  const cars = matchCars(tokens);
  if (cars.length > 0) return r.specificCars(cars);

  // 2. Seats and/or budget numbers.
  const seats = parseSeats(text);
  const budget = parseBudget(seats ? seats.rest : text);
  if (seats && budget) {
    return r.carsFiltered({ seats: seats.range, budget: budget.range, label: `with ${seats.label}, ${budget.label}` });
  }
  if (seats) {
    const direct = r.carsBySeats(seats.range.min, seats.range.max, seats.label);
    if (direct.some((block) => block.type === "cars") || seats.exact === undefined) return direct;
    const atLeast = seats.exact;
    return [
      { type: "text", text: `I don't have an exact ${atLeast}-seater, so here are cars with ${atLeast}+ seats.` },
      ...r.carsBySeats(atLeast, Number.POSITIVE_INFINITY, `${atLeast}+ seats`),
    ];
  }
  if (budget) return r.carsByBudget(budget.range.min, budget.range.max, budget.label);

  // 3. Greetings.
  const scores = scoreIntents(tokens);
  const best = Math.max(0, ...Object.values(scores));
  if (best === 0 && GREETINGS.has(tokens[0]) && tokens.length <= 4) return r.welcome();

  // 4. Brand, category and intent keywords. The strongest signal wins.
  const brandWord = tokens.find((token) => brandWords.has(token));
  const category = categoryFor(tokens);
  const intent = INTENT_ORDER.find((name) => best > 0 && (scores[name] ?? 0) === best);

  if (best >= 3 && intent) return INTENT_REPLY[intent]();
  if (category) return r.categoryCars(category);
  if (brandWord) return r.brandCars(brandWord);
  if (best > 0 && intent) return INTENT_REPLY[intent]();

  return r.fallback();
}
