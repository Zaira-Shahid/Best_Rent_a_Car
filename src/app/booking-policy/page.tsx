import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { brand, whatsappLink } from "@/lib/brand";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Booking Policy",
  description: `Booking, cancellation, and payment policy for ${brand.name}.`,
  path: "/booking-policy",
});


const HERO =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAZUw0ldcd0m67b3_J2JfrSAhSKXWTJg6rI-wkqVq_K1FEskb8c6kUdv1SfiCh9Tk-gbFZ8Z6C6-5NzhjkdOAhWEU9CMOa0rPyNBnIB_keSH50GAqdttRaxfdr12_-JWiQIrDaSiUcyY3xzOSaqtOKNGdSybwl1RL3H__LdW5RS6v7MelqDS49Ir3fZ7RngiCCZDiiYpJZ_DQcIlqK0RroMlVQzWDFaBZz248x6bHUQnbrjObmdGF9c";

const DRIVERS_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDXXYdUuMNmDy7HVLLGbGQNQqD4uduNkndBV8sI64AZarGGyg8QS28z7Qq4C1ygld-A-4LjhhMyi4nwUTxgoDwfThpkbrKuWDnA5vUbcD9_qpOBIg4h_K1pbGrqaFTjnyaMlMc4VSwxh5smiQV4Vbh6-DT48EgFhlTArGZY2nWPDgWD7AoyNnCjRxEor0J0odbnDDDNcWixTOiaJAD6CUf4AYLiqYrKXxH3pGJG34KyegEOSP8GaUwM";

const STEPS = [
  {
    n: "1",
    icon: "directions_car",
    title: "Select Vehicle",
    text: "Browse our fleet and choose the vehicle that fits your destination.",
  },
  {
    n: "2",
    icon: "edit_document",
    title: "Submit Request",
    text: "Provide your details and preferences through our streamlined reservation form.",
  },
  {
    n: "3",
    icon: "verified_user",
    title: "Confirmation",
    text: "Our team reviews your request and sends a detailed confirmation within 60 minutes.",
  },
  {
    n: "4",
    icon: "key",
    title: "Pickup",
    text: "Arrive at your location or request delivery to start your premium driving experience.",
  },
];

const POLICY_CARDS = [
  {
    icon: "contract",
    title: "Reservation Rules",
    text: `All reservations are subject to vehicle availability. ${brand.name} reserves the right to offer an equivalent or superior category if the specific model is unavailable.`,
  },
  {
    icon: "payments",
    title: "Advance Payment",
    text: "A partial deposit or full prepayment may be required at the time of booking to secure your vehicle, especially for high-demand models and peak seasons.",
  },
  {
    icon: "assignment_turned_in",
    title: "Booking Confirmation",
    text: "Bookings are finalized only after a confirmation voucher is issued via WhatsApp or email. Please present this voucher during vehicle pickup for verification.",
  },
  {
    icon: "cancel",
    title: "Cancellation Rules",
    text: "Free cancellation up to 48 hours before the scheduled pickup. Late cancellations may incur a fee equivalent to one day's rental rate.",
  },
  {
    icon: "schedule",
    title: "Late Return Policy",
    text: "A grace period of 59 minutes is provided. Returns exceeding this window will be charged an additional full day's rental fee to maintain our quality standards.",
  },
  {
    icon: "check_box",
    title: "Vehicle Requirements",
    text: "Vehicles must be returned in the same condition as received. Fuel policies (Full-to-Full) apply unless otherwise specified in your booking agreement.",
  },
  {
    icon: "celebration",
    title: "Peak Season & Holidays",
    text: "During Eid, public holidays, and wedding season, advance booking of at least 7 days is strongly recommended. A non-refundable deposit may apply and minimum rental durations may be extended during these periods.",
  },
  {
    icon: "edit_calendar",
    title: "Modification of Booking",
    text: "Date, vehicle, or location changes can be requested up to 24 hours before pickup, subject to availability. Modifications within 24 hours of pickup may incur an administrative fee or rate adjustment.",
  },
  {
    icon: "person_off",
    title: "No-Show Policy",
    text: "If you fail to arrive within 60 minutes of the scheduled pickup time without prior notice, the booking is treated as a no-show, the vehicle is released, and the full deposit is forfeited.",
  },
];

const PAYMENT_METHODS = [
  { icon: "payments", label: "Cash on Pickup" },
  { icon: "credit_card", label: "Credit / Debit Card" },
  { icon: "account_balance", label: "Bank Transfer" },
  { icon: "smartphone", label: "JazzCash / EasyPaisa" },
];

const DRIVER_INFO = [
  {
    icon: "badge",
    title: "Driver License Requirements",
    text: "A valid original driving license held for at least 2 years is mandatory. International clients must provide a valid International Driving Permit (IDP).",
  },
  {
    icon: "credit_score",
    title: "Security Deposit",
    text: "A security deposit is required for all rental categories. The amount is refunded within 14-21 working days after vehicle return.",
  },
  {
    icon: "event",
    title: "Minimum Age",
    text: "The minimum age for renting is 25 years. Drivers aged 21-24 may be subject to a 'Young Driver' surcharge and limited model selection.",
  },
  {
    icon: "gpp_maybe",
    title: "Insurance Excess Awareness",
    text: "Clients are responsible for the insurance excess amount in the event of an accident or damage. We recommend opting into our Premium Protection Plan at booking to reduce this liability to zero.",
  },
];

export default function BookingPolicyPage() {
  return (
    <>
      <header className="relative flex min-h-[320px] items-center overflow-hidden py-16 sm:min-h-[420px] sm:py-20 lg:min-h-[520px]">
        <Image src={HERO} alt="Luxury sedan in a minimalist concrete studio" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/60 to-transparent" />
        <Container className="relative z-10">
          <nav className="mb-4 flex gap-2 text-[10px] font-semibold uppercase tracking-widest text-white/70 sm:mb-6 sm:text-xs">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Booking Policy</span>
          </nav>
          <h1 className="max-w-2xl font-heading text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Booking Policy
          </h1>
          <p className="mt-4 max-w-xl text-sm text-white/80 sm:mt-6 sm:text-lg">
            Experience seamless luxury. Our booking process is designed for clarity, transparency, and the highest
            standard of professional service.
          </p>
        </Container>
      </header>

      <section className="overflow-hidden py-16 sm:py-24 lg:py-[100px]">
        <Container>
          <div className="mb-12 text-center sm:mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-secondary">The Experience</span>
            <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Your Journey to the Driver&apos;s Seat
            </h2>
          </div>
          <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <div className="absolute top-10 left-0 hidden h-px w-full bg-gradient-to-r from-transparent via-secondary/40 to-transparent lg:block" />
            {STEPS.map((step) => (
              <div key={step.n} className="group relative z-10 flex flex-col items-center text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#f3f4f5] shadow-[0_10px_30px_rgba(14,28,46,0.06)] transition group-hover:bg-secondary group-hover:text-white">
                  <span className="material-symbols-outlined text-3xl">{step.icon}</span>
                </div>
                <h3 className="font-heading text-lg font-semibold sm:text-xl">
                  {step.n}. {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{step.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#edeeef] py-16 sm:py-24 lg:py-[100px]">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {POLICY_CARDS.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-primary/8 bg-white p-8 shadow-[0_10px_30px_rgba(14,28,46,0.04)] transition hover:-translate-y-1"
              >
                <span className="material-symbols-outlined mb-4 text-4xl text-secondary">{card.icon}</span>
                <h4 className="mb-3 font-heading text-lg font-semibold sm:text-xl">{card.title}</h4>
                <p className="text-sm text-muted">{card.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24 lg:py-[100px]">
        <Container>
          <div className="mb-12 text-center sm:mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-secondary">Settle Up Your Way</span>
            <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Payment Methods Accepted
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted sm:text-lg">
              Pay however suits you best. All amounts are quoted in {brand.currency} and receipts are issued for
              every transaction.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {PAYMENT_METHODS.map((method) => (
              <div key={method.label} className="flex flex-col items-center gap-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f3f4f5] text-primary">
                  <span className="material-symbols-outlined text-2xl">{method.icon}</span>
                </div>
                <p className="text-sm font-semibold text-primary">{method.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#edeeef] py-16 sm:py-24 lg:py-[100px]">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Critical Information For All Drivers
            </h2>
            <p className="text-base text-muted sm:text-lg">
              Before you begin your journey, please ensure you meet the following criteria for vehicle operation.
            </p>
            <div className="space-y-4">
              {DRIVER_INFO.map((item) => (
                <div key={item.title} className="flex gap-4 rounded-lg border-l-4 border-accent bg-accent/5 p-6">
                  <span className="material-symbols-outlined text-accent" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {item.icon}
                  </span>
                  <div>
                    <h5 className="mb-1 text-sm font-semibold text-primary">{item.title}</h5>
                    <p className="text-sm text-muted">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="group relative h-[400px] overflow-hidden rounded-2xl shadow-2xl sm:h-[500px] lg:h-[600px]">
            <Image
              src={DRIVERS_IMAGE}
              alt="Driver's hand holding a leather-bound car key"
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-navy/70 to-transparent p-8 sm:p-12">
              <span className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">Our Promise</span>
              <h3 className="font-heading text-2xl font-semibold text-white">
                Absolute Precision.
                <br />
                Unrivaled Service.
              </h3>
            </div>
          </div>
        </Container>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <Container>
          <div className="relative overflow-hidden rounded-[28px] bg-navy px-6 py-14 text-center sm:rounded-[40px] sm:px-12 sm:py-20 md:px-24">
            <div className="relative z-10">
              <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl">Ready To Reserve Your Car?</h2>
              <p className="mx-auto mt-6 max-w-2xl text-base text-white/70 sm:text-lg">
                Experience the pinnacle of automotive excellence. Secure your premium vehicle today with our
                flexible booking options.
              </p>
              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <ButtonLink
                  href={whatsappLink()}
                  variant="accent"
                  size="lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book Now
                </ButtonLink>
                <ButtonLink
                  href="/cars"
                  variant="outline"
                  size="lg"
                  className="border-white/30 !text-white hover:border-secondary hover:!text-secondary"
                >
                  View Our Fleet
                </ButtonLink>
              </div>
            </div>
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
          </div>
        </Container>
      </section>
    </>
  );
}
