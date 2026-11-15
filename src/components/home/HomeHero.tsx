"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cities } from "@/data";
import { Container } from "@/components/ui/Container";

export function HomeHero() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [locationOpen, setLocationOpen] = useState(false);
  const [activeLocation, setActiveLocation] = useState(-1);
  const matchingCities = cities.filter((city) => city.name.toLowerCase().includes(location.trim().toLowerCase()));
  const [pickup, setPickup] = useState("");
  const [returnDate, setReturnDate] = useState("");

  return (
    <section className="ride-hero" aria-labelledby="ride-heading">
      <Container>
        <div className="ride-hero-main">
          <div className="ride-hero-copy">
            <h1 id="ride-heading">Your Ride, Ready<br />When You Are</h1>
            <h2>Choose from premium and executive vehicles.</h2>
            <p>Choose from a wide range of premium and executive vehicles at competitive prices. Enjoy fast booking, flexible plans, and a reliable, hassle-free service every time.</p>
            <Link href="/cars" className="ride-more">More Information <span aria-hidden="true">?</span></Link>
          </div>
          <div className="ride-hero-art" role="img" aria-label="Premium sedans and SUVs ready for your next journey">
            <div className="ride-map" aria-hidden="true">
              <div className="ride-map-park park-one" /><div className="ride-map-park park-two" />
              <div className="ride-map-road road-one" /><div className="ride-map-road road-two" />
              <span className="ride-map-label map-islamabad">ISLAMABAD</span>
              <span className="ride-map-label map-rawalpindi">RAWALPINDI</span>
              <span className="material-symbols-outlined ride-pin pin-blue">location_on</span>
              <span className="material-symbols-outlined ride-pin pin-red">location_on</span>
              <svg className="ride-route" viewBox="0 0 500 250"><path d="M85 80 C140 20 170 180 260 110 S360 50 410 95" fill="none" stroke="#a1a8ad" strokeWidth="3" strokeDasharray="7 7" /></svg>
            </div>
            <div className="ride-cars-cutout"><Image src="/images/hero-cars-transparent.webp" alt="" fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 55vw, 700px" priority /></div>
          </div>
        </div>
        <form className="ride-search" onSubmit={(event) => {
          event.preventDefault();
          const params = new URLSearchParams({ location, pickup, return: returnDate });
          router.push(`/cars?${params.toString()}`);
        }}>
          <label className="ride-search-field">
            <span className="material-symbols-outlined" aria-hidden="true">location_on</span>
            <span className="ride-location-control"><strong>Location</strong>
              <input aria-label="Pickup location" role="combobox" aria-autocomplete="list" aria-expanded={locationOpen} aria-controls="hero-locations" aria-activedescendant={locationOpen && activeLocation >= 0 ? `hero-location-${activeLocation}` : undefined} autoComplete="off" placeholder="Search your location" value={location}
                onFocus={() => setLocationOpen(true)} onBlur={() => { setLocationOpen(false); setActiveLocation(-1); }}
                onChange={(e) => { setLocation(e.target.value); setLocationOpen(true); setActiveLocation(-1); }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") { setLocationOpen(false); setActiveLocation(-1); }
                  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                    e.preventDefault(); setLocationOpen(true);
                    setActiveLocation((current) => {
                      const next = e.key === "ArrowDown" ? Math.min(current + 1, matchingCities.length - 1) : Math.max(0, current - 1);
                      requestAnimationFrame(() => document.getElementById(`hero-location-${next}`)?.scrollIntoView({ block: "nearest" }));
                      return next;
                    });
                  }
                  if (e.key === "Enter" && locationOpen && matchingCities[activeLocation]) {
                    e.preventDefault(); setLocation(matchingCities[activeLocation].name); setLocationOpen(false); setActiveLocation(-1);
                  }
                }} required />
              <ul id="hero-locations" role="listbox" aria-label="Pickup locations" className="ride-location-options" hidden={!locationOpen}>
                {matchingCities.map((city, index) => <li key={city.slug} id={`hero-location-${index}`} role="option" aria-selected={activeLocation === index} onMouseDown={(e) => e.preventDefault()} onClick={() => { setLocation(city.name); setLocationOpen(false); setActiveLocation(-1); }}>{city.name}</li>)}
                {matchingCities.length === 0 && <li role="presentation">No matching locations</li>}
              </ul>
            </span>
          </label>
          <label className="ride-search-field">
            <span className="material-symbols-outlined" aria-hidden="true">calendar_month</span>
            <span><strong>Pickup date</strong><input aria-label="Pickup date" type="datetime-local" value={pickup} onChange={(e) => { setPickup(e.target.value); if (returnDate && e.target.value > returnDate) setReturnDate(""); }} required /></span>
          </label>
          <label className="ride-search-field">
            <span className="material-symbols-outlined" aria-hidden="true">calendar_month</span>
            <span><strong>Return date</strong><input aria-label="Return date" type="datetime-local" min={pickup || undefined} value={returnDate} onChange={(e) => setReturnDate(e.target.value)} required /></span>
          </label>
          <button className="ride-search-button" type="submit"><span className="material-symbols-outlined" aria-hidden="true">search</span>Search</button>
        </form>
      </Container>
    </section>
  );
}
