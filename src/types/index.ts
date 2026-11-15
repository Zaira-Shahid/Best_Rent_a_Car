export type NavLink = {
  label: string;
  href: string;
  icon?: string;
  /** Material icon accent color (hex) */
  iconColor?: string;
  /** Optional brand/logo image path for colorful submenu icons */
  logo?: string;
};

export type NavGroup = {
  label: string;
  items: NavLink[];
};

export type NavItem = {
  label: string;
  href: string;
  icon?: string;
  iconColor?: string;
  children?: NavLink[];
  groups?: NavGroup[];
};

export type CityPage = {
  slug: string;
  name: string;
  type: "primary" | "tourist" | "local";
};

export type ServicePage = {
  slug: string;
  name: string;
};

export type ServiceHero = {
  badge: string;
  title: string;
  accent?: string;
  description: string;
  image: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export type ServiceFeature = {
  icon: string;
  title: string;
  text: string;
};

export type ServiceCategory = {
  icon: string;
  title: string;
  text: string;
  bullets?: string[];
};

export type ServiceFleetItem = {
  name: string;
  tag: string;
  seats: number;
  transmission: string;
  image: string;
  imageAlt?: string;
  priceDay: number;
};

export type ServiceCoverageCity = {
  name: string;
  tag: string;
  image: string;
};

export type ServiceProcessStep = {
  icon: string;
  title: string;
  text: string;
};

export type ServiceTestimonial = {
  quote: string;
  name: string;
  role: string;
};

export type ServicePricingPackage = {
  name: string;
  priceDay: number;
  /** Display unit suffix, e.g. "/day", "/week", "/month", "/24hr" */
  unit?: string;
  features: { text: string; included: boolean }[];
  featured?: boolean;
};

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceStory = {
  title: string;
  description: string;
  image: string;
  stat: { value: string; label: string };
  points: { icon: string; title: string; text: string }[];
};

export type ServiceBooking = {
  title: string;
  description: string;
  highlights?: { icon: string; text: string }[];
  contact?: { icon: string; label: string; value: string; href?: string }[];
};

export type ServiceInfoBlock = {
  title: string;
  description?: string;
  items: { icon: string; title?: string; text: string }[];
};

export type ServiceDetail = {
  slug: string;
  name: string;
  metaDescription: string;
  hero: ServiceHero;
  features: { title: string; description: string; items: ServiceFeature[] };
  fleet: { title: string; description: string; items: ServiceFleetItem[] };
  coverage?: { title: string; description: string; cities: ServiceCoverageCity[] };
  process?: { title: string; steps: ServiceProcessStep[] };
  categories?: { title: string; description: string; items: ServiceCategory[] };
  testimonials?: { title: string; ratingSummary?: { value: string; label: string }; items: ServiceTestimonial[] };
  packages?: { title: string; description: string; items: ServicePricingPackage[] };
  faqs?: { title: string; items: ServiceFaq[] };
  booking?: ServiceBooking;
  story?: ServiceStory;
  /** "What's Included" checklist (chauffeur, fuel policy, amenities, waiting time, etc). */
  included?: ServiceInfoBlock;
  /** "Who It's For" audience section. */
  audience?: ServiceInfoBlock;
  /** Service-specific extra notes (flight delay tips, corporate perks, decoration options, etc). */
  notes?: ServiceInfoBlock;
};

export type CarCategory = {
  slug: string;
  name: string;
  description?: string;
};

export type FleetSection = {
  slug: string;
  name: string;
  description: string;
  carSlugs: string[];
};

export type CarModel = {
  slug: string;
  name: string;
  category: string;
  brand: string;
  seats: number;
  transmission: "Automatic" | "Manual";
  fuel: string;
  priceDay: number;
  /** Monthly price. Optional: not every car has a confirmed monthly rate, and the UI does not show it. */
  priceMonth?: number;
  image: string;
  /** Second color/angle — shown on hover or touch */
  imageAlt?: string;
  /** Available paint colors shown on the card */
  colors?: string[];
  badge?: string;
  featured?: boolean;
  sale?: boolean;
  family?: boolean;
  /** Optional customer rating (0-5). Card shows the rating row only when present. */
  rating?: number;
  /** Optional number of reviews behind the rating. */
  reviewCount?: number;
};

export type BlogCategory = {
  slug: string;
  name: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  author: string;
  readTime: string;
  /** Full article paragraphs */
  content: string[];
  /** Optional tip boxes / takeaways */
  tips?: string[];
  /** Closing CTA line */
  cta?: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};
