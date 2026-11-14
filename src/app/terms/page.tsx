import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { brand } from "@/lib/brand";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Terms & Conditions",
  description: "Terms and conditions for Best Rent a Car bookings and rentals.",
  path: "/terms",
});


const HERO =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD94szhMRd1So2I6jXVuFIZ2tQbFKaT4zBBLATaAWysZMcTnkWlqTfcKoiPnl4lDDMDJS0Va5Hvd-RpJ24HPehx7rUABKnCdSMv5GJrVrDx9zuEF52W39EthPpz_ZLvSVs8CWqZYMdPdkqwepdvOnBcigUucoJM3zRN6cpoS8PTDxip4rt-DX10lKmmNn0sDs303-NN-w2NS3-wo_9ar-erHkSyWUWVD8PEQTsQZUsTrdCpDIpjMIjp";

const TOC = [
  { id: "intro", label: "Introduction" },
  { id: "agreement", label: "Rental Agreement" },
  { id: "customer", label: "Customer Responsibilities" },
  { id: "usage", label: "Vehicle Usage Policy" },
  { id: "payment", label: "Payment Terms" },
  { id: "cancellation", label: "Cancellation Policy" },
  { id: "insurance", label: "Insurance Information" },
  { id: "liability", label: "Liability" },
  { id: "privacy", label: "Privacy Rules" },
  { id: "amendments", label: "Amendments" },
];

function SectionHeading({ n, title, id }: { n: number; title: string; id: string }) {
  return (
    <div className="mb-6 flex items-center gap-4" id={id}>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary/15 font-heading text-lg font-semibold text-secondary">
        {n}
      </span>
      <h2 className="font-heading text-2xl font-semibold text-primary sm:text-3xl">{title}</h2>
    </div>
  );
}

export default function TermsPage() {
  return (
    <>
      <header className="relative flex min-h-[280px] items-center justify-center overflow-hidden py-16 sm:min-h-[360px] sm:py-20">
        <Image src={HERO} alt="Luxury sedan interior detail" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-navy/70" />
        <div className="relative z-10 px-4 text-center">
          <nav className="mb-4 flex justify-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-white/80 sm:mb-6 sm:text-xs">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Terms &amp; Conditions</span>
          </nav>
          <h1 className="font-heading text-3xl font-bold text-white sm:text-5xl">Terms &amp; Conditions</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/80 sm:text-base">
            Please read these terms carefully before using our services. This agreement governs your rental
            experience with {brand.name}.
          </p>
        </div>
      </header>

      <section className="bg-surface py-16 sm:py-24 lg:py-[100px]">
        <Container className="flex flex-col gap-12 lg:flex-row lg:gap-10">
          <aside className="lg:w-1/4">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-2xl border border-primary/8 bg-white/80 p-6 shadow-[0_10px_30px_rgba(14,28,46,0.04)] backdrop-blur sm:p-8">
                <h3 className="font-heading text-lg font-semibold text-primary">Contents</h3>
                <ul className="mt-6 grid grid-cols-1 gap-3 text-sm text-muted sm:grid-cols-2 lg:grid-cols-1 lg:space-y-0">
                  {TOC.map((item, i) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="transition hover:text-secondary">
                        {i + 1}. {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-10 rounded-xl bg-navy p-6 text-white">
                  <h4 className="font-heading text-base font-semibold">Need Help?</h4>
                  <p className="mt-2 text-xs text-white/60">Our support team is available for any clarifications.</p>
                  <a
                    href={`mailto:${brand.email}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-white"
                  >
                    Contact Support
                    <span className="material-symbols-outlined text-base">open_in_new</span>
                  </a>
                </div>
              </div>
            </div>
          </aside>

          <div className="space-y-16 lg:w-3/4">
            <div className="scroll-mt-24">
              <SectionHeading n={1} title="Introduction" id="intro" />
              <div className="space-y-4 text-muted">
                <p className="text-base leading-relaxed sm:text-lg">
                  Welcome to {brand.name}. These terms and conditions outline the rules and regulations for the use
                  of our vehicle rental service. By accessing this website and booking a vehicle, we assume you
                  accept these terms and conditions in full. Do not continue to use {brand.name}&apos;s services if
                  you do not accept all of the terms and conditions stated on this page.
                </p>
                <p className="text-sm leading-relaxed sm:text-base">
                  Terminology: &ldquo;Client&rdquo;, &ldquo;You&rdquo; and &ldquo;Your&rdquo; refers to you, the
                  person accessing this website and accepting the Company&apos;s terms and conditions. &ldquo;The
                  Company&rdquo;, &ldquo;Ourselves&rdquo;, &ldquo;We&rdquo;, &ldquo;Our&rdquo; and &ldquo;Us&rdquo;,
                  refers to {brand.name}.
                </p>
              </div>
            </div>

            <div className="scroll-mt-24">
              <SectionHeading n={2} title="Rental Agreement" id="agreement" />
              <div className="space-y-6 text-muted">
                <div className="rounded-xl border-l-4 border-secondary bg-[#f3f4f5] p-6">
                  <p className="mb-2 text-sm font-semibold text-primary">Core Provision</p>
                  <p className="text-sm sm:text-base">
                    The rental agreement becomes binding once the deposit is received and the booking confirmation
                    is issued by our system. All rentals are subject to vehicle availability at the time of pickup.
                  </p>
                </div>
                <ul className="list-disc space-y-3 pl-6 text-sm sm:text-base">
                  <li>All drivers must be at least 25 years of age for standard models and 30 years for premium categories.</li>
                  <li>A valid international driving permit is required for non-resident clients.</li>
                  <li>Minimum rental period is 24 hours. Early returns do not entitle the client to a refund.</li>
                </ul>
              </div>
            </div>

            <div className="scroll-mt-24">
              <SectionHeading n={3} title="Customer Responsibilities" id="customer" />
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-primary/8 bg-white p-8 shadow-[0_10px_30px_rgba(14,28,46,0.04)]">
                  <span className="material-symbols-outlined mb-4 text-secondary">description</span>
                  <h4 className="mb-3 font-heading text-lg font-semibold text-primary">Documentation</h4>
                  <p className="text-sm text-muted">
                    Clients must provide original identification documents, a valid license, and the credit card
                    used for booking during vehicle handover.
                  </p>
                </div>
                <div className="rounded-xl border border-primary/8 bg-white p-8 shadow-[0_10px_30px_rgba(14,28,46,0.04)]">
                  <span className="material-symbols-outlined mb-4 text-secondary">minor_crash</span>
                  <h4 className="mb-3 font-heading text-lg font-semibold text-primary">Vehicle Inspection</h4>
                  <p className="text-sm text-muted">
                    You are required to inspect the vehicle with our representative and sign the condition report
                    before departure. Any pre-existing damage must be documented.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-primary/8 bg-white p-8 shadow-[0_10px_30px_rgba(14,28,46,0.04)]">
                <p className="mb-6 text-base font-semibold text-primary sm:text-lg">
                  Damage &amp; Accident Reporting Procedure
                </p>
                <ol className="space-y-4 text-sm text-muted sm:text-base">
                  <li className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-xs font-semibold text-secondary">
                      1
                    </span>
                    <span>
                      Ensure the safety of all passengers first and move the vehicle to a safe location if it is
                      drivable and legally permitted.
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-xs font-semibold text-secondary">
                      2
                    </span>
                    <span>
                      Contact our 24/7 emergency support line at {brand.phone} immediately to report the incident,
                      regardless of severity.
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-xs font-semibold text-secondary">
                      3
                    </span>
                    <span>
                      Obtain an official police report (FIR) for any collision, theft, or third-party damage. Claims
                      without a police report may be rejected by our insurer.
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-xs font-semibold text-secondary">
                      4
                    </span>
                    <span>
                      Take clear photographs of the damage, the surrounding scene, and all involved parties&apos;
                      documents before the vehicle is moved or repaired.
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-xs font-semibold text-secondary">
                      5
                    </span>
                    <span>
                      Complete and sign our incident report form within 24 hours. Do not admit fault or negotiate
                      settlement with a third party without our written consent.
                    </span>
                  </li>
                </ol>
              </div>
            </div>

            <div className="scroll-mt-24">
              <SectionHeading n={4} title="Vehicle Usage Policy" id="usage" />
              <div className="rounded-xl border border-primary/8 bg-white p-8 shadow-[0_10px_30px_rgba(14,28,46,0.04)]">
                <p className="mb-6 text-base font-semibold text-primary sm:text-lg">
                  Strict prohibitions apply to all fleet vehicles:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined mt-1 text-red-500">block</span>
                    <p className="text-sm text-muted sm:text-base">
                      <span className="font-semibold text-primary">No Racing/Off-roading:</span> Vehicles must
                      remain on paved public roads. Track use is strictly forbidden and voids all insurance.
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined mt-1 text-red-500">smoke_free</span>
                    <p className="text-sm text-muted sm:text-base">
                      <span className="font-semibold text-primary">Smoke-Free Policy:</span> All vehicles are
                      strictly non-smoking. A deep cleaning fee applies to any violation.
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined mt-1 text-red-500">person_off</span>
                    <p className="text-sm text-muted sm:text-base">
                      <span className="font-semibold text-primary">Unauthorized Drivers:</span> Only drivers listed
                      on the agreement are permitted to operate the vehicle.
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined mt-1 text-red-500">flight_takeoff</span>
                    <p className="text-sm text-muted sm:text-base">
                      <span className="font-semibold text-primary">Cross-Border Travel:</span> Taking any vehicle
                      outside Pakistan is strictly prohibited without prior written approval from {brand.name}.
                      Unauthorized cross-border travel voids all insurance coverage and immediately terminates the
                      rental agreement, making the client fully liable for the vehicle&apos;s value.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl border-l-4 border-secondary bg-[#f3f4f5] p-6">
                <p className="mb-2 text-sm font-semibold text-primary">Fuel Policy</p>
                <p className="text-sm text-muted sm:text-base">
                  All vehicles are provided on a &ldquo;Full-to-Full&rdquo; basis unless a different arrangement is
                  confirmed in writing at booking. The vehicle is handed over with a full tank and must be returned
                  with a full tank of the correct fuel grade. If the vehicle is returned with less fuel, the
                  shortfall will be charged at prevailing market rates plus a refueling service fee. Damage caused
                  by misfuelling (incorrect fuel type) is the sole responsibility of the client and is not covered
                  by insurance.
                </p>
              </div>
            </div>

            <div className="scroll-mt-24">
              <SectionHeading n={5} title="Payment Terms" id="payment" />
              <div className="space-y-6 text-muted">
                <p className="text-sm sm:text-base">
                  All rental rates are quoted in {brand.currency} and are inclusive of applicable taxes unless
                  stated otherwise. A security deposit will be pre-authorized on your card at the time of pickup.
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-xl bg-[#e7e8e9] p-6 text-center">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">Booking Deposit</p>
                    <p className="font-heading text-lg font-semibold text-primary">30%</p>
                  </div>
                  <div className="rounded-xl bg-[#e7e8e9] p-6 text-center">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">Security Bond</p>
                    <p className="font-heading text-lg font-semibold text-primary">Varies</p>
                  </div>
                  <div className="rounded-xl bg-[#e7e8e9] p-6 text-center">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">Late Return Fee</p>
                    <p className="font-heading text-lg font-semibold text-primary">Daily Rate</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="scroll-mt-24">
              <SectionHeading n={6} title="Cancellation Policy" id="cancellation" />
              <div className="rounded-xl border border-secondary/20 bg-white/70 p-8 backdrop-blur">
                <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
                  <div className="flex-1">
                    <h5 className="mb-2 text-xs font-semibold uppercase tracking-wide text-secondary">Full Refund</h5>
                    <p className="text-sm text-muted sm:text-base">
                      Cancellations made more than 72 hours before the scheduled pickup time.
                    </p>
                  </div>
                  <div className="hidden w-px bg-primary/10 sm:block" />
                  <div className="flex-1">
                    <h5 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                      Partial Refund (50%)
                    </h5>
                    <p className="text-sm text-muted sm:text-base">Cancellations made between 24 and 72 hours before pickup.</p>
                  </div>
                  <div className="hidden w-px bg-primary/10 sm:block" />
                  <div className="flex-1">
                    <h5 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-500">No Refund</h5>
                    <p className="text-sm text-muted sm:text-base">Cancellations within 24 hours of pickup or &ldquo;no-shows&rdquo;.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="scroll-mt-24">
              <SectionHeading n={7} title="Insurance Information" id="insurance" />
              <p className="mb-6 text-sm text-muted sm:text-base">
                All {brand.name} vehicles are covered by comprehensive commercial insurance. However, the client is
                responsible for the &ldquo;Insurance Excess&rdquo; amount in the event of an accident.
              </p>
              <div className="rounded-2xl bg-navy p-8 text-white sm:p-10">
                <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-secondary/20">
                    <span className="material-symbols-outlined text-3xl text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      shield
                    </span>
                  </div>
                  <div className="text-center sm:text-left">
                    <h4 className="font-heading text-lg font-semibold">Premium Protection Plan</h4>
                    <p className="mt-2 text-sm text-white/60">
                      Reduce your excess to zero and enjoy full peace of mind. Available for an additional daily
                      fee at the time of booking.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="scroll-mt-24">
              <SectionHeading n={8} title="Liability" id="liability" />
              <p className="text-sm text-muted sm:text-base">
                {brand.name} shall not be held liable for any indirect, incidental, or consequential damages
                resulting from the use or inability to use our vehicles. Our total liability to the client for any
                claim shall not exceed the total rental fee paid for the specific booking.
              </p>
            </div>

            <div className="scroll-mt-24">
              <SectionHeading n={9} title="Privacy Rules" id="privacy" />
              <div className="space-y-6 text-muted">
                <p className="text-sm sm:text-base">
                  Your privacy is important to us. We use the information you provide to process your booking and
                  improve our service. For more detailed information, please refer to our{" "}
                  <Link href="/privacy" className="font-semibold text-secondary hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  page.
                </p>
                <div className="rounded-xl border border-primary/8 bg-white p-8 shadow-[0_10px_30px_rgba(14,28,46,0.04)]">
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined mt-1 text-secondary">gps_fixed</span>
                    <div>
                      <h4 className="mb-2 font-heading text-base font-semibold text-primary">GPS Tracking Notice</h4>
                      <p className="text-sm sm:text-base">
                        All {brand.name} vehicles are fitted with GPS tracking devices for safety, theft recovery,
                        route verification, and mileage monitoring. By accepting these terms, the client consents to
                        this monitoring for the duration of the rental period. Location data is used solely for
                        operational and safety purposes, is stored securely, and is shared with law enforcement only
                        where legally required &mdash; such as in the event of an accident, theft, or violation of
                        the vehicle usage policy (including unauthorized cross-border travel or geofenced areas).
                        Tracking is disabled automatically upon vehicle return and closure of the rental agreement.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="scroll-mt-24 border-b border-primary/8 pb-12">
              <SectionHeading n={10} title="Amendments" id="amendments" />
              <div className="space-y-4 text-muted">
                <p className="text-sm sm:text-base">
                  {brand.name} reserves the right to review, revise, or amend these Terms &amp; Conditions at any
                  time to reflect changes in our fleet, pricing, legal requirements, or operating procedures.
                  Amendments become effective immediately upon publication on this page, and the &ldquo;Last
                  Updated&rdquo; date below will be revised accordingly.
                </p>
                <p className="text-sm sm:text-base">
                  Continued use of our services after any amendment constitutes acceptance of the revised terms. We
                  encourage clients to review this page periodically. Material changes affecting an active or
                  confirmed booking will be communicated directly via email or WhatsApp prior to taking effect.
                </p>
              </div>
            </div>

            <p className="text-xs text-muted">Last Updated: October 24, 2024</p>
          </div>
        </Container>
      </section>
    </>
  );
}
