"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import type { CarModel } from "@/types";
import { whatsappLink } from "@/lib/brand";
import { cn } from "@/lib/utils";

const timeOptions = [
  "12:00 AM",
  "01:00 AM",
  "02:00 AM",
  "03:00 AM",
  "04:00 AM",
  "05:00 AM",
  "06:00 AM",
  "07:00 AM",
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
  "09:00 PM",
  "10:00 PM",
  "11:00 PM",
];

type InquireModalProps = {
  car: CarModel;
  open: boolean;
  onClose: () => void;
};

const emptyForm = {
  date: "",
  pickupTime: "12:00 AM",
  dropoffTime: "12:00 AM",
  fullName: "",
  email: "",
  phone: "",
  verified: false,
};

export function InquireModal({ car, open, onClose }: InquireModalProps) {
  const titleId = useId();
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) setSubmitted(false);
  }, [open, car.slug]);

  if (!mounted || !open) return null;

  function resetForm() {
    setForm(emptyForm);
    setSubmitted(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.verified) return;

    const message = [
      `Inquiry for: ${car.name}`,
      `Date: ${form.date}`,
      `Pickup: ${form.pickupTime}`,
      `Drop-off: ${form.dropoffTime}`,
      `Name: ${form.fullName}`,
      `Email: ${form.email}`,
      `Phone: +92 ${form.phone}`,
    ].join("\n");

    window.open(
      whatsappLink(message),
      "_blank",
      "noopener,noreferrer",
    );
    setSubmitted(true);
  }

  const inputClass =
    "w-full rounded-[8px] border border-[#e5e5e5] bg-[#efefef] px-3 py-3 text-sm text-primary outline-none transition placeholder:text-primary/40 focus:border-secondary focus:bg-white";

  const modal = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
      <button
        type="button"
        aria-label="Close inquiry modal"
        className="absolute inset-0 bg-black/55 backdrop-blur-md"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="animate-fade-up relative z-10 flex max-h-[92vh] w-full max-w-[420px] flex-col overflow-hidden rounded-[14px] bg-white shadow-[0_25px_80px_rgba(0,0,0,0.35)]"
      >
        {/* Header */}
        <div className="relative flex items-center justify-center px-4 py-4">
          <button
            type="button"
            onClick={resetForm}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-primary/70 underline underline-offset-2 transition hover:text-secondary"
          >
            Reset
          </button>
          <h2 id={titleId} className="font-heading text-lg font-bold text-primary">
            Your Information
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-base font-bold leading-none !text-white shadow-sm transition hover:brightness-95"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto px-5 pb-5">
          {/* Car preview */}
          <div className="text-center">
            <p className="font-heading text-[17px] font-semibold leading-snug text-primary">
              {car.name}{" "}
              <span className="font-normal text-primary/55">Or Similar Car</span>
            </p>
          </div>

          <div className="relative mx-auto mt-3 aspect-[16/10] w-full overflow-hidden rounded-[12px] border border-[#ececec] bg-[#f6f6f6]">
            <Image
              src={car.image}
              alt={car.name}
              fill
              className="object-contain p-3"
              sizes="380px"
            />
          </div>

          {/* Date & time */}
          <div className="mt-4 space-y-3">
            <label className="block">
              <span className="mb-2 block text-center text-[15px] font-medium text-primary">
                Pickup & Drop Off Date
              </span>
              <input
                type="date"
                required
                value={form.date}
                onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
                className={cn(inputClass, "text-center")}
              />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-2 block text-center text-[15px] font-medium text-primary">
                  Pickup Time
                </span>
                <div className="relative">
                  <select
                    value={form.pickupTime}
                    onChange={(e) => setForm((prev) => ({ ...prev, pickupTime: e.target.value }))}
                    className={cn(inputClass, "appearance-none pr-11 text-center")}
                  >
                    {timeOptions.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-[6px] bg-accent !text-white">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-center text-[15px] font-medium text-primary">
                  Drop off Time
                </span>
                <div className="relative">
                  <select
                    value={form.dropoffTime}
                    onChange={(e) => setForm((prev) => ({ ...prev, dropoffTime: e.target.value }))}
                    className={cn(inputClass, "appearance-none pr-11 text-center")}
                  >
                    {timeOptions.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-[6px] bg-accent !text-white">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Contact */}
          <div className="mt-4 space-y-3">
            <input
              type="text"
              required
              placeholder="Full Name"
              value={form.fullName}
              onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
              className={inputClass}
            />
            <input
              type="email"
              required
              placeholder="E-mail"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              className={inputClass}
            />
            <div className="flex overflow-hidden rounded-[8px] border border-[#e5e5e5] bg-[#efefef] focus-within:border-secondary focus-within:bg-white">
              <span className="flex shrink-0 items-center gap-1.5 border-r border-[#e0e0e0] px-3 text-sm text-primary">
                <span aria-hidden="true">🇵🇰</span>
                +92
              </span>
              <input
                type="tel"
                required
                placeholder="33111116892"
                value={form.phone}
                onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                className="w-full bg-transparent px-3 py-3 text-sm text-primary outline-none placeholder:text-primary/40"
              />
            </div>
          </div>

          {/* Footer actions */}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex min-h-[52px] items-center gap-3 rounded-[6px] border border-[#d8d8d8] bg-white px-3 py-2 shadow-sm">
              <input
                type="checkbox"
                checked={form.verified}
                onChange={(e) => setForm((prev) => ({ ...prev, verified: e.target.checked }))}
                className="h-5 w-5 accent-secondary"
              />
              <span className="text-sm text-primary/80">I&apos;m not a robot</span>
              <span className="ml-auto text-[10px] leading-tight text-primary/40">
                reCAPTCHA
                <br />
                Privacy · Terms
              </span>
            </label>

            <button
              type="submit"
              className="min-h-[52px] rounded-[8px] border-b-[3px] border-accent bg-[#d9d9d9] px-6 text-sm font-extrabold uppercase tracking-wide text-primary transition hover:bg-[#cfcfcf]"
            >
              Inquire Now
            </button>
          </div>

          {submitted ? (
            <p className="mt-3 text-center text-sm text-secondary">
              Inquiry prepared — WhatsApp will open to send details.
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
