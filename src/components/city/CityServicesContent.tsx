"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { brand } from "@/lib/brand";

const HERO =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDObDk9FnJ_zDMDuCf8585s03QVwuFCHe4TImsKGgPU32m6ovZhgEwBdnyXi870THDwWfvaIFZ0uw9XuzOFPKbuIs4H4-4JDSmYt4IDQEM4XuERd3uK9RzH3gXFHW8eWFS9HNXRZokYrrqXAs1yNpd7f6SA-BkcQjlBnRpiv01F9UFVu4dZkAMsuot1VpqDVimLLopsXK3PwkbzUyZsl2itlw9n5s7qR8tuhjVkz_sGrDKdTI0KcdGn";

const MAP =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAG6G-CbQ0Xu5Bzj8A2dtxeaHPUUn-5dpTgYwbVfV6ADssd1rL6_8fsMv0iuxOr7P8lnFTKLsrVEsW36p-C_4jVQxKzK-W8kRXDKMsu1_WbvBDSQbs9CFisMidnmKO4kQhn2X5Gl2CFss4Qr1hdu2rF5CiPMonRDg_wgLbsYQyrWqLgSx44OWtOkY4hOwbs8XV79LhQ0UqW_XA9SrxkfzMa-naQJdt9vbU_ZnxrfI6nX65zhtZDqdjO";

const CTA_BG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDcz2XTf1mDjxqrM9xlj8m2PGbqRDfMF3pzYAccjqMKSLYixzRsivvTw2PPfsjH2u9LeIiNpl98I3OAtJ2VgywoeGcaCu7M9X3mxj3yWmdEugxVlL4zPEs8fagf-PC2AmaRhQemeXkBNRT8etWS7Re3Kz6gR0mwqDt61h2MiNb12BjXRW8Zw_HEIjPfaQsDaT3Wo4gPjD_ks5UpBDbqQ0kZIK7Wn1HxF0blHe-SMbGHYM279QIur8qm";

const CITY_CARDS = [
  {
    slug: "islamabad",
    name: "Islamabad",
    text: "Navigating the wide avenues of the capital requires a vehicle that matches its elegance and order.",
    badge: "Available Now",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDBEsOO-S2DyklYxXEvORM4Sex9eaWzntlyc_4N1GKWwfN7q5SiN-FaCt5WumWGAclKDV5-iuMETh4Pp5TT7UXVj97YG4unFzR-DOAu5xaPfIlaQbEglo28biLgc92WyP44w89bB9RhxBs9EqqFEx9C7lzkQDA8_uL5kjxOAGxO7eTS_yizjCa5he15Tdq0376IlnVEn3TaURbc9TA9eTHJtjUF6Xii8mVVM8kFJKpL98ms4X1P4lqM",
  },
  {
    slug: "karachi",
    name: "Karachi",
    text: "The city of lights demands resilience and luxury. Experience comfort amidst metropolitan energy.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAm9DfIcAOqVY-KFaY-8uHfe3G9Ur9bEXo8sZiGRVrhtJbIbKiMwoC4TJQxAnagc3IdX56PuL7A6rk9426l9td6pexSDv_jtc-a_JfvxnWDnQBdculn9r_-rbGU362ovaf6KeQ_eTRN1lIlUX6DcLVd1OxGnG2rEIRiHGui7o_24VajnirUOClZ_OfNb4M08DzmNUVV_a0IChsG8NMJz8rSVGDEwyQ-Y31gdlY6ov0kdGSaVchHJRMD",
  },
  {
    slug: "lahore",
    name: "Lahore",
    text: "Heritage meets modernity. Traverse the cultural heart of the country in signature style.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBu2jgMj_QfGnhZQgVd4TRc8aW6ADIUadRDmc5We8ZS3jRR8uvAq3FKIaGHuQswZgqJHL9WDt-m5IypKs071yZUarzJvWYL7srDq3P4uxU1EOXD7e1wLw1hOaVnJA0cdkmHD0z1BX4kBoqvXI80IYusN1Mm5jOhZblLs5H7Qg0Y5xGxbeFnq07mq-yfYJnw5e8HnNfjGEbC2o_nN-O7Rzk-VQs582D4gmx__otJ2V4m595qN0yHYMEb",
  },
  {
    slug: "hunza",
    name: "Hunza",
    text: "Conquer the peaks. Our specialized 4x4 fleet ensures safety and luxury in northern terrains.",
    badge: "4x4 Specialists",
    badgeAccent: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBw0DCv15PoG1w9hfCNj2vf16txCJ15GHLj4HrhsBAunRkQVuBHQuR7sXb34I5mAtXZ-Vh9gehoAUT6HGjUVYJDagEztop-Cym8YErgaWQjtB8W0091zOFrq9jZjjWpwURtQKjtIlSwPKfznw9BvVd9hRj5Xe_ptc65Y4lIyjbDc-rVm20qhB7edCRrt5JoMK6fHQs2twGIaqKkMzg4gL1VoyE6O7lu8DDBef3HCAaPZDN62WXJPClH",
  },
  {
    slug: "skardu",
    name: "Skardu",
    text: "Gateway to the giants. Robust luxury for those who seek the extraordinary in the high Karakoram.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCnwK0Ew-attpsBBbujzYACE2dT2UhYuS8Z456Jmxm9T5J4FYZIbTSHnFj6IKiQ50cVjv8lDKaGRtkVbKcxHdjcfMAejPWHYYz8_1dm0U6bnipUuWqWkC0o2gxHRhL64vXPlPHRNgGA7PpxYZsZsMN--sYZEHnrLvraldXI5_lGy-2qhBuD8BkwmZrUbsTQ8BjTIqHEKG-nqak_v-tB51DeZPgX5YxSl97Emrg0VCvWvDIN8PXe4_j-",
  },
  {
    slug: "murree",
    name: "Murree",
    text: "Elevated comfort. Premium SUV rentals for your perfect hillside retreat and mountain escapes.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDbcKDjND0qZPOzEu6BH6j38ppx1NhDSsowcK0WDSaHsKHu7uHk93RX5s7YaXVvt0QtcE8qzID1dq3cM-Sab7YzUvTvJhX1MQ9hdykrxtwlicMPIUZw4xSo3IMJyuaegBUWb3WXcTixky3BjzHS8j82x8Cj6U1FjYmd00kk0A9LaRTazW6zZcU2_oAH8r-g0PHA8-gQZN9dXOVROP-s3jMzDKjWhhTKdY3sqsev1-V7mNibVGOymCfG",
  },
  {
    slug: "naran",
    name: "Naran",
    text: "Explore the Kaghan valley with reliability. Premium crossovers for scenic mountain roads.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDTqVkNdV-owxjJjCBPTFmklAzduRiBbdF6yk6lST455UjKRJs_LLlN6Cn0-0X3jrXJ5LerZOOM7zYpj1H3Yu6Ooy5cmxin4qB5HIs385dcwGipLKWOpCKCpeIoXr4698VqHJNoG68tTCSESHwTTUSR4R_IRTgYYxMF4p968vc_aS5zysFTzAe1cRqFixfm9LcSZP8HBVZ75727AWDrRv1GD48gM95LiDAFk0IoJtO3sgD99IVDb9T1",
  },
  {
    slug: "rawalpindi",
    name: "Rawalpindi",
    text: "Seamless connectivity. Reliable luxury transport for the twin city's vibrant business hubs.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCxtoridxoRYv-Wrfwj5dXtNfOEwI1q923go8nTqbUz1ZuoFPnKI41iarOXzOF4WDMOcZItfkFvKsJ4V_CmX2YurqXt43F1RVJS74hg4R8Hv_izfiiAd38KzNqKzei82dbe8YXyWdOs47CRxVZdQyXNoe6z51JPXiFfjPw2_pP2ZJZ62hjfVLRAnWh3uUtDzQ75cn6g4jZG29KSvgHpMPlGBcKgrmrRVVtHsZkA0z2zkE4SREzVQ3AJ",
  },
  {
    slug: "faisalabad",
    name: "Faisalabad",
    text: "Pakistan's industrial powerhouse. Dependable sedans and SUVs for business trips across the city.",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "multan",
    name: "Multan",
    text: "The city of saints, made easy to explore. Comfortable rentals for shrine visits and local commerce.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "peshawar",
    name: "Peshawar",
    text: "Gateway to the northwest. Rugged, reliable vehicles for the historic frontier city and beyond.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "abbottabad",
    name: "Abbottabad",
    text: "Cool hills, easy access. The ideal stop for travelers heading further into the northern valleys.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
  },
];

const POPULAR_ROUTES = [
  { from: "Islamabad", to: "Murree", icon: "landscape", text: "A 1.5 hour scenic climb — our most requested weekend route." },
  { from: "Islamabad Airport", to: "City Center", icon: "flight_land", text: "Meet-and-greet transfers timed to your flight, day or night." },
  { from: "Islamabad", to: "Hunza / Skardu", icon: "terrain", text: "Multi-day northern expeditions with 4x4-equipped vehicles." },
  { from: "Islamabad", to: "Lahore", icon: "route", text: "Motorway-ready sedans for the intercity business run." },
  { from: "Rawalpindi", to: "Naran / Kaghan", icon: "hiking", text: "Rugged crossovers built for the Kaghan valley's mountain roads." },
  { from: "Karachi", to: "Hyderabad", icon: "signpost", text: "Comfortable long-distance sedans for the coastal corridor." },
];

const WHY_CITY = [
  {
    icon: "person_pin_circle",
    title: "Local, Vetted Drivers",
    text: "Chauffeurs based in-city who know the shortcuts, checkpoints, and traffic patterns.",
  },
  {
    icon: "home_pin",
    title: "Doorstep Delivery",
    text: "Your car arrives at your home, office, or hotel — no counter queues, no delays.",
  },
  {
    icon: "terrain",
    title: "4x4 for the North",
    text: "Purpose-built SUVs and off-roaders for Hunza, Skardu, and Naran terrain.",
  },
  {
    icon: "sell",
    title: "Fixed City Rates",
    text: "Transparent, city-specific pricing agreed upfront — no surprise surcharges.",
  },
];

const STEPS = [
  { icon: "travel_explore", title: "Select City", text: "Choose your destination and preferred pickup location." },
  { icon: "directions_car", title: "Pick a Car", text: "Browse our elite collection from sedans to rugged SUVs." },
  { icon: "key", title: "Enjoy Journey", text: "We deliver the car to your doorstep. Drive with confidence." },
];

const REVIEWS = [
  {
    quote:
      "The experience in Islamabad was flawless. The Mercedes was pristine, and the delivery was exactly on time. Truly a signature service.",
    name: "Haris Ahmed",
    role: "CEO, TechFlow",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB72AgTZkB__F0AS1OsoC_TbIgBnc2AwVP5gvWwUCl57aNYl774FrDN1d7XQEO-6cL28JViX4J0b5F9PZly0sdJzXHG6AgVBg9HjsieWtq7TPA0VibOxT2Js3nMLI4tbKLBo-u5U15MjoUs5NwRBwr96ljcZrvAJDInpR7yjGLQOBFBsU_QLoyBsM1YHZuYUAe_9lV39p4kuaEyQxgFXspVMkxIaezt1hww6V43Fr6vpyYQk56PgeEE",
  },
  {
    quote:
      "Rented a Land Cruiser for our Hunza trip. The vehicle's performance on the Karakoram Highway was exceptional. Highly recommended.",
    name: "Sara Khan",
    role: "Travel Vlogger",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD3yi3-6EYniRfyW6rYApkWKB49Sfy_R3CMb8OOyrQMsHKMjBVaiIxMUJ_XID05A48V5wtvs53OcaUOc57yQvz5oetAO7Od1pFQNeybIrM2MdSBrvfh5mjpLKEgaFNIGyykXQ7x85zUxikcZcjEyFrnrG3-tNUjYdjqLcRMuArYHRpw6vhuDjOk9kg5EXEx8HJVnOtWjDGaTDxUnSECUd7BM7RL4ww3KBQL5677sMw00unpuP_3EJX4",
  },
  {
    quote:
      "Professionalism at its peak. The booking process in Karachi was incredibly fast, and the car was in showroom condition. Best in Pakistan.",
    name: "Omar Farooq",
    role: "Investment Banker",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDkhJ8xVigWRxdITDWuF9wO4gF-nEWyT0_A1Ae0P3S_p5vySH_HUItr5yCnZFMDgEA63U49wbUzop4CqsestBI9sH9qL2CiXsLCJfl_fyAw6BhSjL9sawAdh5gTlwCIu57jN_jhRyqdlr7uytlAy83-yyhpdrK_SUvIna3vpY95T0SEBtmsWgLhcFMrPvI3hjavwyO3cg1Au58O0LKaWHhtf-zVrPp1WD_H4-_lhliO2HJs8v7rMwgk",
  },
];

const STATS = [
  { value: "12+", label: "Major Cities" },
  { value: "150+", label: "Luxury Fleet" },
  { value: "45min", label: "Avg Delivery" },
  { value: "24/7", label: "Support" },
];

export function CityServicesContent() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const pageSize = 4;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CITY_CARDS;
    return CITY_CARDS.filter(
      (city) => city.name.toLowerCase().includes(q) || city.text.toLowerCase().includes(q),
    );
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages - 1);
  const visible = filtered.slice(safePage * pageSize, safePage * pageSize + pageSize);

  return (
    <>
      <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden px-4 py-14 sm:min-h-[480px] sm:px-6 sm:py-16 lg:min-h-[520px] lg:px-8 lg:py-20">
        <Image src={HERO} alt="City skyline at golden hour" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <nav className="animate-fade-up mb-6 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/80">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-white">City Services</span>
          </nav>
          <h1 className="hero-shadow animate-fade-up font-heading text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Elite Mobility Across the Nation&apos;s Pulse
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setPage(0);
            }}
            className="glass-panel animate-fade-up-delay mx-auto mt-8 flex max-w-3xl flex-col gap-4 rounded-2xl p-4 shadow-2xl sm:mt-10 sm:flex-row sm:p-6"
          >
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/60">
                location_on
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(0);
                }}
                placeholder="Select a city for your journey..."
                className="w-full rounded-xl border border-white/20 bg-white/10 py-4 pl-12 pr-4 text-white outline-none placeholder:text-white/60 focus:ring-2 focus:ring-accent"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-4 text-xs font-semibold uppercase tracking-wider !text-white transition hover:brightness-110"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
              Search Cars
            </button>
          </form>
        </div>
      </section>

      <section className="py-16 sm:py-24 lg:py-[100px]">
        <Container>
          <Reveal>
            <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:mb-16 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                  Our Presence
                </span>
                <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                  Discover Excellence in Every Destination
                </h2>
                <p className="mt-5 text-base text-muted sm:text-lg">
                  From the modern boulevards of Islamabad to the rugged beauty of Hunza, {brand.name} provides
                  seamless luxury car rentals tailored to each city&apos;s unique terrain and lifestyle. Every
                  location is served by a dedicated local team, so whether you&apos;re navigating Karachi&apos;s
                  coastal traffic or climbing into the Karakoram, your vehicle and driver are matched to the
                  journey ahead.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous cities"
                  disabled={safePage === 0}
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  className="rounded-full border border-primary/20 p-3 transition hover:bg-primary hover:text-white disabled:opacity-40"
                >
                  <span className="material-symbols-outlined">west</span>
                </button>
                <button
                  type="button"
                  aria-label="Next cities"
                  disabled={safePage >= totalPages - 1}
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  className="rounded-full border border-primary/20 p-3 transition hover:bg-primary hover:text-white disabled:opacity-40"
                >
                  <span className="material-symbols-outlined">east</span>
                </button>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {visible.map((city, index) => (
              <Reveal key={city.slug} delay={Math.min(index, 3) * 80}>
              <article
                className="group luxury-card-shadow h-full overflow-hidden rounded-2xl bg-white transition duration-500 hover:-translate-y-2"
              >
                <div className="relative h-56 overflow-hidden sm:h-64">
                  <Image
                    src={city.image}
                    alt={city.name}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  {city.badge ? (
                    <span
                      className={`absolute top-4 rounded-full px-3 py-1 text-xs font-semibold ${
                        city.badgeAccent
                          ? "left-4 bg-accent !text-white"
                          : "right-4 bg-white/90 text-primary backdrop-blur"
                      }`}
                    >
                      {city.badge}
                    </span>
                  ) : null}
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="font-heading text-xl font-semibold sm:text-2xl">{city.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted sm:text-base">{city.text}</p>
                  <Link
                    href={`/rent-a-car/${city.slug}`}
                    className="mt-6 flex items-center justify-between text-sm font-semibold text-primary"
                  >
                    <span className="group-hover:underline">View Cars</span>
                    <span className="material-symbols-outlined transition group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </article>
              </Reveal>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="mt-10 text-center text-muted">No cities match your search.</p>
          ) : null}
        </Container>
      </section>

      <section className="bg-[#f8f9fa] py-16 sm:py-24 lg:py-[100px]">
        <Container>
          <Reveal>
            <div className="mb-10 text-center sm:mb-16">
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                Local Advantage
              </span>
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                Why Rent by City
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_CITY.map((item, index) => (
              <Reveal key={item.title} delay={index * 80}>
                <div className="h-full overflow-hidden rounded-2xl border border-primary/8 bg-white p-6 text-center shadow-[0_10px_30px_rgba(14,28,46,0.04)] sm:p-8">
                  <span className="material-symbols-outlined mb-4 inline-flex text-[2rem] text-secondary sm:text-4xl" aria-hidden>
                    {item.icon}
                  </span>
                  <h4 className="font-heading text-base font-semibold sm:text-lg">{item.title}</h4>
                  <p className="mt-2 text-sm text-muted">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="overflow-hidden bg-navy py-16 text-white sm:py-24 lg:py-[100px]">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative order-2 aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl sm:aspect-square lg:order-1 lg:aspect-video">
            <Image
              src={MAP}
              alt="Pakistan service coverage map"
              fill
              className="object-cover opacity-80"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute left-1/2 top-1/4 h-4 w-4 -translate-x-1/2 rounded-full bg-accent" />
            <div className="absolute left-1/2 top-1/4 h-4 w-4 -translate-x-1/2 animate-ping rounded-full bg-accent" />
          </Reveal>
          <Reveal delay={120} className="order-1 space-y-6 lg:order-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Network Reach</span>
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Nationwide Excellence, Local Precision
            </h2>
            <p className="text-base text-white/55 sm:text-lg">
              Our strategic hubs are positioned to provide 24/7 assistance and delivery services. No matter
              where your journey begins or ends, the {brand.name} standard follows you.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-2">
              {STATS.map((item) => (
                <div key={item.label} className="border-l-2 border-accent pl-5">
                  <div className="font-heading text-3xl font-bold sm:text-4xl">{item.value}</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/50">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-16 sm:py-24 lg:py-[100px]">
        <Container>
          <Reveal>
            <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-16">
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                Frequent Journeys
              </span>
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                Popular Routes
              </h2>
              <p className="mt-4 text-muted sm:text-lg">
                The trips our clients book most often, matched with the right vehicle for the road.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {POPULAR_ROUTES.map((route, index) => (
              <Reveal key={`${route.from}-${route.to}`} delay={Math.min(index, 5) * 70}>
                <div className="h-full rounded-2xl border border-primary/8 bg-white p-6 shadow-[0_10px_30px_rgba(14,28,46,0.04)] sm:p-8">
                  <span className="material-symbols-outlined mb-4 inline-flex text-3xl text-secondary">
                    {route.icon}
                  </span>
                  <h4 className="font-heading text-base font-semibold sm:text-lg">
                    {route.from} <span className="text-secondary">&harr;</span> {route.to}
                  </h4>
                  <p className="mt-2 text-sm text-muted">{route.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#f8f9fa] py-16 sm:py-24 lg:py-[100px]">
        <Container>
          <Reveal>
            <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                Your Journey in Three Steps
              </h2>
              <p className="mt-4 text-muted sm:text-lg">
                Luxury should be effortless. We&apos;ve refined our process to be as smooth as our vehicles.
              </p>
            </div>
          </Reveal>
          <div className="relative mx-auto grid max-w-5xl gap-10 md:grid-cols-3 md:gap-12">
            <div className="absolute left-0 top-1/2 hidden h-px w-full -translate-y-1/2 bg-primary/10 md:block" />
            {STEPS.map((step, index) => (
              <Reveal key={step.title} delay={index * 100}>
                <div className="group relative z-10 flex flex-col items-center text-center">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-primary/15 bg-white shadow-[0_10px_30px_rgba(14,28,46,0.04)] transition group-hover:bg-primary group-hover:text-white">
                    <span className="material-symbols-outlined text-4xl">{step.icon}</span>
                  </div>
                  <h4 className="font-heading text-xl font-semibold">{step.title}</h4>
                  <p className="mt-3 text-sm text-muted sm:text-base">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="overflow-hidden py-16 sm:py-24 lg:py-[100px]">
        <Container>
          <Reveal>
            <div className="mb-10 sm:mb-16">
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                Testimonials
              </span>
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                Voices of Satisfaction
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {REVIEWS.map((item, index) => (
              <Reveal key={item.name} delay={index * 90}>
              <article
                className="h-full rounded-3xl border border-primary/8 bg-[#f3f4f5] p-8 sm:p-10"
              >
                <div className="mb-6 flex gap-1 text-accent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="mb-8 text-base italic leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                  </div>
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-xs uppercase tracking-wide text-muted">{item.role}</div>
                  </div>
                </div>
              </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-16 sm:pb-24 lg:pb-[100px]">
        <Container>
          <Reveal>
          <div className="relative overflow-hidden rounded-[28px] px-5 py-14 text-center sm:rounded-[40px] sm:px-10 sm:py-20 md:px-16 lg:px-24">
            <div className="absolute inset-0 bg-primary" />
            <Image src={CTA_BG} alt="" fill className="object-cover opacity-20 mix-blend-overlay" sizes="100vw" />
            <div className="relative z-10">
              <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
                Ready to Start Your Journey?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-base text-white/70 sm:mt-8 sm:text-lg">
                Experience the ultimate in mobility. Book your signature vehicle today in any major city
                across Pakistan.
              </p>
              <div className="mt-10 flex flex-col justify-center gap-4 sm:mt-12 sm:flex-row sm:gap-6">
                <Link
                  href="/cars"
                  className="rounded-2xl bg-accent px-10 py-4 text-xs font-semibold uppercase tracking-wider !text-white transition hover:scale-105 sm:px-12 sm:py-5"
                >
                  Browse Fleet
                </Link>
                <Link
                  href="/contact"
                  className="rounded-2xl border border-white/20 bg-white/10 px-10 py-4 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur transition hover:bg-white/20 sm:px-12 sm:py-5"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
