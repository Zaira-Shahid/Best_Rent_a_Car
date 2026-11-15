"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { CityPage } from "@/types";
import { CarCard } from "@/components/cars/CarCard";
import { carModels } from "@/data";
import { brand, whatsappLink } from "@/lib/brand";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/** Islamabad hero — local landmark image */
const ISLAMABAD_HERO = "/services/islambad.jpeg";

const FLEET_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA1A79IDJIW_aFnBsQj1JQWPCi85fII9bVRg7OP6lB_FM1HQdJCKMuU8ogEgCN8BaR7e98m8vMSjxppY1ZnkiXVlqgYQeoOtmXBwsSEKC6ly7j83OJLZ_6f9NhpEJ-j9LAl-aLND1WWTUIvkGca0VXOQRKgPACwengq_1yXUh927w_jT_ARf7iovL-okVs1HPNIcnET-cmAft3oJ3orvTPjKoSSB7pDaUy8WPoJAhlk61FaopWNyHxv";

const AIRPORT_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDsZiYxccqSOLeaydChTp_SczAfABKJ7kdwrYvETuRCJN1yU7SbQDkfWsg-1KFFEgarBZL9xH8ONmyVa5720Lb8a3B8vg9jn0yjy8V4X9nEgxpQQbxudUKbRYHmdz-BeayNHu-AeboS513MhU_lu_vNX3gX1SfdWRZEYKok5hkxQWAP97eLxbM4jh7QjM4ebcjoKUzp1iWMiy-5ZHu6GBpnG0Fpxo7iRrgLW5FCkWtrQf1e0R3oukbv";

const CITY_HERO_IMAGES: Record<string, string> = {
  islamabad: ISLAMABAD_HERO,
  "islamabad-airport": ISLAMABAD_HERO,
  "dha-islamabad": ISLAMABAD_HERO,
  "blue-area": ISLAMABAD_HERO,
  "f-6-islamabad": ISLAMABAD_HERO,
  "f-7-islamabad": ISLAMABAD_HERO,
  "f-8-islamabad": ISLAMABAD_HERO,
  "g-11-islamabad": ISLAMABAD_HERO,
  "g-13-islamabad": ISLAMABAD_HERO,
  "pwd-islamabad": ISLAMABAD_HERO,
  "b-17-islamabad": ISLAMABAD_HERO,
  "bahria-town": ISLAMABAD_HERO,
  "gulberg-greens": ISLAMABAD_HERO,
  taxila: ISLAMABAD_HERO,
  rawalpindi:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCxtoridxoRYv-Wrfwj5dXtNfOEwI1q923go8nTqbUz1ZuoFPnKI41iarOXzOF4WDMOcZItfkFvKsJ4V_CmX2YurqXt43F1RVJS74hg4R8Hv_izfiiAd38KzNqKzei82dbe8YXyWdOs47CRxVZdQyXNoe6z51JPXiFfjPw2_pP2ZJZ62hjfVLRAnWh3uUtDzQ75cn6g4jZG29KSvgHpMPlGBcKgrmrRVVtHsZkA0z2zkE4SREzVQ3AJ",
  "saddar-rawalpindi":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCxtoridxoRYv-Wrfwj5dXtNfOEwI1q923go8nTqbUz1ZuoFPnKI41iarOXzOF4WDMOcZItfkFvKsJ4V_CmX2YurqXt43F1RVJS74hg4R8Hv_izfiiAd38KzNqKzei82dbe8YXyWdOs47CRxVZdQyXNoe6z51JPXiFfjPw2_pP2ZJZ62hjfVLRAnWh3uUtDzQ75cn6g4jZG29KSvgHpMPlGBcKgrmrRVVtHsZkA0z2zkE4SREzVQ3AJ",
  lahore:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBu2jgMj_QfGnhZQgVd4TRc8aW6ADIUadRDmc5We8ZS3jRR8uvAq3FKIaGHuQswZgqJHL9WDt-m5IypKs071yZUarzJvWYL7srDq3P4uxU1EOXD7e1wLw1hOaVnJA0cdkmHD0z1BX4kBoqvXI80IYusN1Mm5jOhZblLs5H7Qg0Y5xGxbeFnq07mq-yfYJnw5e8HnNfjGEbC2o_nN-O7Rzk-VQs582D4gmx__otJ2V4m595qN0yHYMEb",
  karachi:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAm9DfIcAOqVY-KFaY-8uHfe3G9Ur9bEXo8sZiGRVrhtJbIbKiMwoC4TJQxAnagc3IdX56PuL7A6rk9426l9td6pexSDv_jtc-a_JfvxnWDnQBdculn9r_-rbGU362ovaf6KeQ_eTRN1lIlUX6DcLVd1OxGnG2rEIRiHGui7o_24VajnirUOClZ_OfNb4M08DzmNUVV_a0IChsG8NMJz8rSVGDEwyQ-Y31gdlY6ov0kdGSaVchHJRMD",
  hunza:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBw0DCv15PoG1w9hfCNj2vf16txCJ15GHLj4HrhsBAunRkQVuBHQuR7sXb34I5mAtXZ-Vh9gehoAUT6HGjUVYJDagEztop-Cym8YErgaWQjtB8W0091zOFrq9jZjjWpwURtQKjtIlSwPKfznw9BvVd9hRj5Xe_ptc65Y4lIyjbDc-rVm20qhB7edCRrt5JoMK6fHQs2twGIaqKkMzg4gL1VoyE6O7lu8DDBef3HCAaPZDN62WXJPClH",
  skardu:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCnwK0Ew-attpsBBbujzYACE2dT2UhYuS8Z456Jmxm9T5J4FYZIbTSHnFj6IKiQ50cVjv8lDKaGRtkVbKcxHdjcfMAejPWHYYz8_1dm0U6bnipUuWqWkC0o2gxHRhL64vXPlPHRNgGA7PpxYZsZsMN--sYZEHnrLvraldXI5_lGy-2qhBuD8BkwmZrUbsTQ8BjTIqHEKG-nqak_v-tB51DeZPgX5YxSl97Emrg0VCvWvDIN8PXe4_j-",
  murree:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDbcKDjND0qZPOzEu6BH6j38ppx1NhDSsowcK0WDSaHsKHu7uHk93RX5s7YaXVvt0QtcE8qzID1dq3cM-Sab7YzUvTvJhX1MQ9hdykrxtwlicMPIUZw4xSo3IMJyuaegBUWb3WXcTixky3BjzHS8j82x8Cj6U1FjYmd00kk0A9LaRTazW6zZcU2_oAH8r-g0PHA8-gQZN9dXOVROP-s3jMzDKjWhhTKdY3sqsev1-V7mNibVGOymCfG",
  naran:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDTqVkNdV-owxjJjCBPTFmklAzduRiBbdF6yk6lST455UjKRJs_LLlN6Cn0-0X3jrXJ5LerZOOM7zYpj1H3Yu6Ooy5cmxin4qB5HIs385dcwGipLKWOpCKCpeIoXr4698VqHJNoG68tTCSESHwTTUSR4R_IRTgYYxMF4p968vc_aS5zysFTzAe1cRqFixfm9LcSZP8HBVZ75727AWDrRv1GD48gM95LiDAFk0IoJtO3sgD99IVDb9T1",
  kaghan:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDTqVkNdV-owxjJjCBPTFmklAzduRiBbdF6yk6lST455UjKRJs_LLlN6Cn0-0X3jrXJ5LerZOOM7zYpj1H3Yu6Ooy5cmxin4qB5HIs385dcwGipLKWOpCKCpeIoXr4698VqHJNoG68tTCSESHwTTUSR4R_IRTgYYxMF4p968vc_aS5zysFTzAe1cRqFixfm9LcSZP8HBVZ75727AWDrRv1GD48gM95LiDAFk0IoJtO3sgD99IVDb9T1",
  swat: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80",
  "neelum-valley": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
  "azad-kashmir": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
  faisalabad: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1600&q=80",
  multan: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80",
  peshawar: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
  abbottabad: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80",
  haripur: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80",
};

function getCityHeroImage(city: CityPage) {
  if (CITY_HERO_IMAGES[city.slug]) return CITY_HERO_IMAGES[city.slug];
  if (city.type === "tourist") {
    return "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80";
  }
  return ISLAMABAD_HERO;
}

const CATEGORIES = ["Luxury SUV", "Premium Sedan", "Economy", "Wedding Fleet", "Group Travel"];

type CityDetailContentProps = {
  city: CityPage;
};

function cityBlurb(city: CityPage) {
  if (city.type === "tourist") {
    return `Affordable, reliable and premium car rental for ${city.name} trips — ideal for tourism, family getaways, and scenic mountain travel.`;
  }
  if (city.type === "local") {
    return `Affordable, reliable and premium car rental around ${city.name} for business meetings, airport transfers, and everyday city travel.`;
  }
  return `Affordable, reliable and premium car rental services in ${city.name} for business, tourism and family travel.`;
}

function airportCopy(city: CityPage) {
  if (city.slug === "islamabad-airport") {
    return "Meet-and-greet transfers right from Islamabad International Airport to your hotel, home, or meeting point.";
  }
  if (city.type === "tourist") {
    return `Comfortable pickups arranged for your ${city.name} journey — from major airports and city hubs to your mountain destination.`;
  }
  if (city.type === "local") {
    return `Seamless transfers covering ${city.name} and nearby Islamabad / Rawalpindi routes, including airport links on request.`;
  }
  return `Seamless transfers from the nearest airport and major hubs directly to your destination in ${city.name}.`;
}

export function CityDetailContent({ city }: CityDetailContentProps) {
  const [pickupDate, setPickupDate] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const heroImage = getCityHeroImage(city);

  const popularCars = useMemo(
    () =>
      [...carModels]
        .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
        .slice(0, 4),
    [],
  );

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = [
      `Hello ${brand.name},`,
      "",
      `I want to rent a car in ${city.name}.`,
      `Pickup Location: ${city.name}, Pakistan`,
      `Pickup Date: ${pickupDate || "Flexible"}`,
      `Vehicle Category: ${category}`,
      "",
      "Please confirm availability. Thank you!",
    ].join("\n");

    window.open(whatsappLink(message), "_blank");
  }

  return (
    <>
      <section className="relative flex min-h-[420px] items-center overflow-hidden px-4 pb-12 pt-24 sm:min-h-[480px] sm:px-6 sm:pb-16 sm:pt-28 lg:min-h-[520px] lg:px-16 lg:pb-20 lg:pt-32">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt={`Rent a car in ${city.name}`}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-primary/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center text-center">
          <h1 className="hero-shadow animate-fade-up font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-tight">
            Rent A Car In <span className="text-accent">{city.name}</span>
          </h1>
          <p className="animate-fade-up-delay mt-3 max-w-2xl text-sm text-white/85 sm:mt-4 sm:text-base lg:text-lg">
            {cityBlurb(city)}
          </p>

          <form
            onSubmit={handleSearch}
            className="animate-fade-up-delay-2 mt-6 w-full max-w-5xl rounded-xl border border-white/15 bg-white/10 p-3 shadow-[0_10px_30px_-10px_rgba(14,28,46,0.2)] backdrop-blur-xl sm:mt-8 sm:p-4 md:grid md:grid-cols-4 md:items-end md:gap-4"
          >
            <label className="mb-4 flex flex-col gap-2 text-left md:mb-0">
              <span className="px-2 text-xs font-semibold uppercase tracking-wider text-white/80">
                Pickup Location
              </span>
              <span className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-primary/45">
                  location_on
                </span>
                <input
                  readOnly
                  value={`${city.name}, Pakistan`}
                  className="w-full rounded-lg border-none bg-white py-3 pl-10 pr-4 text-sm text-primary outline-none focus:ring-2 focus:ring-accent"
                />
              </span>
            </label>

            <label className="mb-4 flex flex-col gap-2 text-left md:mb-0">
              <span className="px-2 text-xs font-semibold uppercase tracking-wider text-white/80">
                Pickup Date
              </span>
              <span className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-primary/45">
                  calendar_month
                </span>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full min-w-0 max-w-full cursor-pointer rounded-lg border-none bg-white py-3 pl-10 pr-4 text-sm text-primary outline-none focus:ring-2 focus:ring-accent"
                />
              </span>
            </label>

            <label className="mb-4 flex flex-col gap-2 text-left md:mb-0">
              <span className="px-2 text-xs font-semibold uppercase tracking-wider text-white/80">
                Vehicle Category
              </span>
              <span className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-primary/45">
                  directions_car
                </span>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full appearance-none rounded-lg border-none bg-white py-3 pl-10 pr-10 text-sm text-primary outline-none focus:ring-2 focus:ring-accent"
                >
                  {CATEGORIES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[18px] text-primary/45">
                  expand_more
                </span>
              </span>
            </label>

            <button
              type="submit"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 text-sm font-semibold !text-white transition hover:brightness-95"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
              Search Cars
            </button>
          </form>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24 lg:py-[100px]">
        <Container>
          <Reveal>
            <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-16">
              <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                Why Choose {brand.name} in {city.name}?
              </h2>
              <p className="mt-4 text-sm text-primary/65 sm:text-base">
                Experience unmatched professionalism, pristine vehicles, and seamless service tailored for
                travel in {city.name}.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Reveal className="md:col-span-2">
              <div className="flex h-full flex-col justify-between rounded-xl bg-[#f3f4f5] p-6 shadow-[0_10px_30px_-10px_rgba(14,28,46,0.08)] sm:p-8">
                <div>
                  <span className="mb-4 inline-flex rounded-full bg-primary p-3 text-white">
                    <span className="material-symbols-outlined text-3xl">diamond</span>
                  </span>
                  <h3 className="font-heading text-xl font-semibold sm:text-2xl">Luxury Fleet</h3>
                  <p className="mt-3 mb-6 text-sm text-primary/65 sm:text-base">
                    From executive sedans to premium SUVs, our immaculately maintained fleet ensures you
                    travel across {city.name} in supreme comfort and style.
                  </p>
                </div>
                <div className="relative h-40 overflow-hidden rounded-lg sm:h-48">
                  <Image src={FLEET_IMAGE} alt="Luxury fleet" fill className="object-cover" sizes="(max-width:768px) 100vw, 66vw" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="flex h-full flex-col rounded-xl bg-[#f3f4f5] p-6 shadow-[0_10px_30px_-10px_rgba(14,28,46,0.08)] sm:p-8">
                <span className="mb-4 inline-flex w-fit rounded-full bg-[#e1e3e4] p-3 text-primary">
                  <span className="material-symbols-outlined text-3xl">support_agent</span>
                </span>
                <h3 className="font-heading text-xl font-semibold sm:text-2xl">24/7 Support</h3>
                <p className="mt-3 flex-1 text-sm text-primary/65 sm:text-base">
                  Round-the-clock assistance ensuring your journey in {city.name} is uninterrupted.
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="flex h-full flex-col rounded-xl bg-[#f3f4f5] p-6 shadow-[0_10px_30px_-10px_rgba(14,28,46,0.08)] sm:p-8">
                <span className="mb-4 inline-flex w-fit rounded-full bg-[#e1e3e4] p-3 text-primary">
                  <span className="material-symbols-outlined text-3xl">payments</span>
                </span>
                <h3 className="font-heading text-xl font-semibold sm:text-2xl">Affordable Prices</h3>
                <p className="mt-3 flex-1 text-sm text-primary/65 sm:text-base">
                  Transparent pricing with no hidden fees, offering premium service at competitive rates.
                </p>
              </div>
            </Reveal>

            <Reveal delay={140} className="md:col-span-2">
              <div className="flex h-full flex-col items-stretch justify-between gap-6 rounded-xl bg-[#f3f4f5] p-6 shadow-[0_10px_30px_-10px_rgba(14,28,46,0.08)] sm:p-8 md:flex-row md:items-center">
                <div className="flex-1">
                  <span className="mb-4 inline-flex rounded-full bg-[#e1e3e4] p-3 text-primary">
                    <span className="material-symbols-outlined text-3xl">flight_land</span>
                  </span>
                  <h3 className="font-heading text-xl font-semibold sm:text-2xl">Airport Pickup</h3>
                  <p className="mt-3 text-sm text-primary/65 sm:text-base">{airportCopy(city)}</p>
                </div>
                <div className="relative h-40 w-full flex-1 overflow-hidden rounded-lg">
                  <Image
                    src={AIRPORT_IMAGE}
                    alt="Airport pickup"
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-background py-16 sm:py-24 lg:py-[100px]">
        <Container>
          <Reveal>
            <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:mb-12 sm:flex-row sm:items-end">
              <div>
                <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                  Popular Cars in {city.name}
                </h2>
                <p className="mt-2 text-sm text-primary/65 sm:text-base">
                  Select from our most requested vehicles for {city.name} travel.
                </p>
              </div>
              <Link
                href="/cars"
                className="hidden items-center gap-1 text-sm font-semibold text-primary transition hover:text-secondary md:inline-flex"
              >
                View All Cars <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {popularCars.map((car, index) => (
              <Reveal key={car.slug} delay={index * 80}>
                <CarCard car={car} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <Link
              href="/cars"
              className="mt-8 block rounded-full border border-primary py-3 text-center text-sm font-semibold text-primary md:hidden"
            >
              View All Cars
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
