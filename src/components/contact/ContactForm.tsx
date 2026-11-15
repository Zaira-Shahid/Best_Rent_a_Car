"use client";

import { useRef, useState } from "react";
import { brand, whatsappLink } from "@/lib/brand";
import { cn } from "@/lib/utils";

const PICKUP_OPTIONS = [
  "Islamabad International Airport",
  "Blue Area Office",
  "Hotel Delivery",
  "Custom Address",
];

type Status = "idle" | "submitting" | "sent";

const inputClasses =
  "w-full rounded-lg border border-primary/10 bg-[#f3f4f5] p-4 text-sm text-primary outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/40";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status !== "idle") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const pickup = String(data.get("pickup") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const text = [
      `Hello ${brand.name},`,
      "",
      "I would like to request a callback / booking.",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Pickup: ${pickup}`,
      message ? `Message: ${message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    setStatus("submitting");
    window.open(
      whatsappLink(text),
      "_blank",
      "noopener,noreferrer",
    );

    formRef.current?.reset();
    setStatus("sent");
    window.setTimeout(() => setStatus("idle"), 2500);
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-muted">Full Name</label>
          <input required name="name" type="text" placeholder="John Doe" className={inputClasses} />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-muted">Email Address</label>
          <input required name="email" type="email" placeholder="john@example.com" className={inputClasses} />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-muted">Phone Number</label>
          <input required name="phone" type="tel" placeholder={brand.phone} className={inputClasses} />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-muted">Pickup Location</label>
          <select name="pickup" defaultValue={PICKUP_OPTIONS[0]} className={cn(inputClasses, "appearance-none")}>
            {PICKUP_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-muted">Your Message</label>
        <textarea
          name="message"
          rows={4}
          placeholder="Tell us about your requirements..."
          className={cn(inputClasses, "resize-none")}
        />
      </div>

      <button
        type="submit"
        disabled={status !== "idle"}
        className={cn(
          "w-full rounded-lg py-4 text-sm font-semibold transition active:scale-[0.98]",
          status === "sent" ? "bg-emerald-500 text-white" : "bg-accent !text-white hover:brightness-95",
          status === "submitting" && "opacity-70",
        )}
      >
        {status === "sent"
          ? "Opening WhatsApp..."
          : status === "submitting"
            ? "Preparing WhatsApp..."
            : "Send on WhatsApp"}
      </button>
    </form>
  );
}
