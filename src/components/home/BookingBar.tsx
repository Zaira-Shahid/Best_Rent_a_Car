"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { carModels, cities } from "@/data";
import { brand, whatsappLink } from "@/lib/brand";
import { cn } from "@/lib/utils";

const locationOptions = cities.filter(
  (city) => city.type === "primary" || city.type === "tourist" || city.type === "local",
);

type BookingBarProps = {
  className?: string;
};

type SearchFieldProps = {
  label: string;
  icon: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  required?: boolean;
};

function SearchField({
  label,
  icon,
  value,
  onChange,
  options,
  placeholder,
  required,
}: SearchFieldProps) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    const query = value.trim().toLowerCase();
    if (!query) return options.slice(0, 8);
    return options.filter((item) => item.toLowerCase().includes(query)).slice(0, 8);
  }, [options, value]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <label className="block">
      <span className="mb-1 ml-1 block text-xs font-semibold uppercase tracking-wider text-white/70">
        {label}
      </span>
      <div className="relative" ref={rootRef}>
        <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-[18px] text-primary/45">
          {icon}
        </span>
        <input
          id={id}
          type="text"
          value={value}
          required={required}
          placeholder={placeholder}
          autoComplete="off"
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            onChange(event.target.value);
            setOpen(true);
          }}
          className="w-full rounded-lg border border-white/15 bg-white/95 py-3 pl-10 pr-4 text-sm text-primary outline-none transition focus:ring-2 focus:ring-accent"
        />
        {open && filtered.length > 0 ? (
          <ul className="absolute left-0 right-0 z-30 mt-1 max-h-48 overflow-y-auto rounded-lg border border-primary/10 bg-white py-1 shadow-xl">
            {filtered.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  className="w-full px-3 py-2.5 text-left text-sm text-primary/80 transition hover:bg-background hover:text-primary"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => {
                    onChange(item);
                    setOpen(false);
                  }}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </label>
  );
}

export function BookingBar({ className }: BookingBarProps) {
  const [pickup, setPickup] = useState("Islamabad");
  const [drop, setDrop] = useState("Rawalpindi");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [carName, setCarName] = useState(carModels[0]?.name ?? "Suzuki Alto");

  const locationNames = useMemo(() => locationOptions.map((city) => city.name), []);
  const carNames = useMemo(() => carModels.map((car) => car.name), []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = [
      `Hello ${brand.name},`,
      "",
      "I want to book a car with these details:",
      "",
      `Pickup Location: ${pickup.trim() || "Not selected"}`,
      `Drop Location: ${drop.trim() || "Not selected"}`,
      `Start Date: ${startDate || "Not selected"}`,
      `End Date: ${endDate || "Not selected"}`,
      `Car Name: ${carName.trim() || "Not selected"}`,
      "",
      "Please confirm availability. Thank you!",
    ].join("\n");

    window.open(whatsappLink(message), "_blank");
  }

  return (
    <div
      className={cn(
        "rounded-xl border border-white/20 bg-navy/95 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.35)] sm:p-6 lg:p-8",
        className,
      )}
    >
      <h2 className="mb-4 font-heading text-lg font-semibold text-white sm:mb-6 sm:text-xl lg:text-2xl">
        Find Your Vehicle
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <SearchField
          label="Pick up location"
          icon="location_on"
          value={pickup}
          onChange={setPickup}
          options={locationNames}
          placeholder="Search or type pickup location"
          required
        />

        <SearchField
          label="Drop location"
          icon="flag"
          value={drop}
          onChange={setDrop}
          options={locationNames}
          placeholder="Search or type drop location"
          required
        />

        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block min-w-0">
            <span className="mb-1 ml-1 block text-xs font-semibold uppercase tracking-wider text-white/70">
              Start date
            </span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full min-w-0 max-w-full rounded-lg border border-white/15 bg-white/95 px-4 py-3 text-sm text-primary outline-none focus:ring-2 focus:ring-accent"
            />
          </label>
          <label className="block min-w-0">
            <span className="mb-1 ml-1 block text-xs font-semibold uppercase tracking-wider text-white/70">
              End date
            </span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full min-w-0 max-w-full rounded-lg border border-white/15 bg-white/95 px-4 py-3 text-sm text-primary outline-none focus:ring-2 focus:ring-accent"
            />
          </label>
        </div>

        <SearchField
          label="Car name"
          icon="directions_car"
          value={carName}
          onChange={setCarName}
          options={carNames}
          placeholder="Search or type car name"
          required
        />

        <button
          type="submit"
          className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-4 text-sm font-semibold !text-white shadow-lg transition hover:brightness-110"
        >
          <span className="material-symbols-outlined text-[20px]">send</span>
          Send on WhatsApp
        </button>
      </form>
    </div>
  );
}
