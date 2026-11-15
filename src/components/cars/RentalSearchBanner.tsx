"use client";

import { useSearchParams } from "next/navigation";

/** Shows the search summary passed from the home-page ride search (?location=&pickup=&return=). */
export function RentalSearchBanner() {
  const params = useSearchParams();
  const location = params.get("location");
  const pickup = params.get("pickup");
  const returnDate = params.get("return");

  if (!location) return null;

  return (
    <div className="border-b border-red-100 bg-red-50 px-6 py-4 text-center text-sm text-primary">
      <strong>Your rental search: {location}</strong>
      {pickup && <span> · Pickup: {pickup.replace("T", " at ")}</span>}
      {returnDate && <span> · Return: {returnDate.replace("T", " at ")}</span>}
      <p className="mt-1">Browse the fleet below. Availability is confirmed when you enquire.</p>
    </div>
  );
}
