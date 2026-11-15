"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cities } from "@/data";
import { Container } from "@/components/ui/Container";

const fieldLabel = "block text-[11px] font-bold uppercase tracking-[0.12em] text-brand-black/60";
const fieldInput =
  "mt-0.5 block h-7 w-full min-w-0 bg-transparent p-0 text-[15px] font-semibold text-brand-black outline-none placeholder:font-medium placeholder:text-brand-black/45";
const fieldWrap =
  "flex min-h-[64px] min-w-0 items-center gap-3 rounded-2xl px-4 py-2 transition focus-within:bg-brand-black/[0.04] lg:rounded-full lg:px-6";

export function HomeHero() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [locationOpen, setLocationOpen] = useState(false);
  const [activeLocation, setActiveLocation] = useState(-1);
  const matchingCities = cities.filter((city) => city.name.toLowerCase().includes(location.trim().toLowerCase()));
  const [pickup, setPickup] = useState("");
  const [returnDate, setReturnDate] = useState("");

  return (
    <section className="relative isolate overflow-x-clip bg-white text-brand-black" aria-labelledby="ride-heading">
      <Container className="pb-6 pt-8 text-center sm:pt-10 lg:pt-10">
        <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] text-brand-red sm:text-sm">
          Choose from premium and executive vehicles.
        </h2>
        <h1
          id="ride-heading"
          className="mt-4 text-[clamp(2.5rem,6.4vw,4.75rem)] font-extrabold leading-[1.03] tracking-[-0.035em]"
        >
          Your Ride, Ready
          <br />
          When You Are
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-brand-black/75 sm:text-lg">
          Choose from a wide range of premium and executive vehicles at competitive prices. Enjoy fast booking, flexible
          plans, and a reliable, hassle-free service every time.
        </p>
        <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Link
            href="/contact"
            className="inline-flex h-[52px] items-center justify-center rounded-full bg-brand-black px-9 text-base font-semibold !text-white transition hover:bg-brand-red"
          >
            Book Now
          </Link>
          <Link
            href="/cars"
            className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full border-2 border-brand-black px-9 text-base font-semibold !text-brand-black transition hover:bg-brand-black hover:!text-white"
          >
            Explore Our Fleet
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              arrow_forward
            </span>
          </Link>
        </div>
      </Container>

      <div className="relative">
        {/* Solid brand-red band behind the lower half of the car image and the search bar. */}
        <div className="absolute inset-x-0 bottom-0 top-[42%] -z-10 bg-brand-red" aria-hidden="true" />
        <Container className="pb-10 lg:pb-14">
          <div
            className="relative mx-auto aspect-[2129/738] w-full max-w-[860px]"
            role="img"
            aria-label="Premium sedans and SUVs ready for your next journey"
          >
            <Image
              src="/images/hero-cars-transparent.webp"
              alt=""
              fill
              sizes="(max-width: 639px) 100vw, 920px"
              className="object-contain object-bottom"
              priority
            />
          </div>

          <form
            className="relative z-10 mx-auto -mt-4 grid w-full max-w-[1040px] gap-1 rounded-[28px] bg-white p-2.5 shadow-[0_18px_44px_rgba(21,24,29,0.22)] sm:-mt-6 lg:-mt-9 lg:grid-cols-[1.25fr_1fr_1fr_auto] lg:items-center lg:gap-0 lg:rounded-full lg:p-2.5"
            onSubmit={(event) => {
              event.preventDefault();
              const params = new URLSearchParams({ location, pickup, return: returnDate });
              router.push(`/cars?${params.toString()}`);
            }}
          >
            <label className={fieldWrap}>
              <span className="material-symbols-outlined shrink-0 text-[26px] text-brand-red" aria-hidden="true">
                location_on
              </span>
              <span className="relative block min-w-0 flex-1 text-left">
                <span className={fieldLabel}>Location</span>
                <input
                  className={fieldInput}
                  aria-label="Pickup location"
                  role="combobox"
                  aria-autocomplete="list"
                  aria-expanded={locationOpen}
                  aria-controls="hero-locations"
                  aria-activedescendant={locationOpen && activeLocation >= 0 ? `hero-location-${activeLocation}` : undefined}
                  autoComplete="off"
                  placeholder="Search your location"
                  value={location}
                  onFocus={() => setLocationOpen(true)}
                  onBlur={() => {
                    setLocationOpen(false);
                    setActiveLocation(-1);
                  }}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    setLocationOpen(true);
                    setActiveLocation(-1);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setLocationOpen(false);
                      setActiveLocation(-1);
                    }
                    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                      e.preventDefault();
                      setLocationOpen(true);
                      setActiveLocation((current) => {
                        const next = e.key === "ArrowDown" ? Math.min(current + 1, matchingCities.length - 1) : Math.max(0, current - 1);
                        requestAnimationFrame(() => document.getElementById(`hero-location-${next}`)?.scrollIntoView({ block: "nearest" }));
                        return next;
                      });
                    }
                    if (e.key === "Enter" && locationOpen && matchingCities[activeLocation]) {
                      e.preventDefault();
                      setLocation(matchingCities[activeLocation].name);
                      setLocationOpen(false);
                      setActiveLocation(-1);
                    }
                  }}
                  required
                />
                <ul
                  id="hero-locations"
                  role="listbox"
                  aria-label="Pickup locations"
                  hidden={!locationOpen}
                  className="absolute -left-12 right-0 top-[calc(100%+14px)] z-30 m-0 max-h-52 list-none overflow-y-auto overscroll-contain rounded-2xl border border-brand-black/10 bg-white p-1.5 shadow-[0_14px_36px_rgba(21,24,29,0.18)] lg:-left-6 lg:right-auto lg:w-72"
                >
                  {matchingCities.map((city, index) => (
                    <li
                      key={city.slug}
                      id={`hero-location-${index}`}
                      role="option"
                      aria-selected={activeLocation === index}
                      className="cursor-pointer rounded-lg px-3 py-2.5 text-sm text-brand-black hover:bg-brand-red/10 hover:text-brand-red-dark aria-selected:bg-brand-red/10 aria-selected:text-brand-red-dark"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        setLocation(city.name);
                        setLocationOpen(false);
                        setActiveLocation(-1);
                      }}
                    >
                      {city.name}
                    </li>
                  ))}
                  {matchingCities.length === 0 && (
                    <li role="presentation" className="px-3 py-2.5 text-sm text-brand-black/60">
                      No matching locations
                    </li>
                  )}
                </ul>
              </span>
            </label>

            <label className={`${fieldWrap} relative lg:before:absolute lg:before:bottom-3 lg:before:left-0 lg:before:top-3 lg:before:w-px lg:before:bg-brand-black/10`}>
              <span className="material-symbols-outlined shrink-0 text-[26px] text-brand-red" aria-hidden="true">
                calendar_month
              </span>
              <span className="block min-w-0 flex-1 text-left">
                <span className={fieldLabel}>Pickup date</span>
                <input
                  className={fieldInput}
                  aria-label="Pickup date"
                  type="datetime-local"
                  value={pickup}
                  onChange={(e) => {
                    setPickup(e.target.value);
                    if (returnDate && e.target.value > returnDate) setReturnDate("");
                  }}
                  required
                />
              </span>
            </label>

            <label className={`${fieldWrap} relative lg:before:absolute lg:before:bottom-3 lg:before:left-0 lg:before:top-3 lg:before:w-px lg:before:bg-brand-black/10`}>
              <span className="material-symbols-outlined shrink-0 text-[26px] text-brand-red" aria-hidden="true">
                calendar_month
              </span>
              <span className="block min-w-0 flex-1 text-left">
                <span className={fieldLabel}>Return date</span>
                <input
                  className={fieldInput}
                  aria-label="Return date"
                  type="datetime-local"
                  min={pickup || undefined}
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  required
                />
              </span>
            </label>

            <button
              type="submit"
              className="mt-1 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-brand-red px-9 text-base font-bold text-white transition hover:bg-brand-red-dark lg:mt-0"
            >
              <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
                search
              </span>
              Search
            </button>
          </form>
        </Container>
      </div>
    </section>
  );
}
