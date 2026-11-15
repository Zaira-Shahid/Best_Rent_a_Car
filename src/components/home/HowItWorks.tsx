import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: "directions_car",
    title: "Choose Your Vehicle",
    text: "Browse our fleet of economy cars, executive sedans, luxury vehicles, SUVs, Hiace, Coaster, and Grand Cabin rentals. Select the vehicle that best suits your travel needs.",
  },
  {
    icon: "chat",
    title: "Share Your Trip Details",
    text: "Send us your pickup location, destination, travel date, time, and passenger requirements through our online booking form or WhatsApp.",
  },
  {
    icon: "verified",
    title: "Confirm Your Booking",
    text: "Receive your quotation, confirm your reservation, and complete the booking. Our team will assign a professional chauffeur for your journey.",
  },
  {
    icon: "airline_seat_recline_extra",
    title: "Enjoy a Comfortable Ride",
    text: "Your driver will arrive at your pickup location on time. Sit back and enjoy a safe, comfortable, and reliable journey anywhere in Islamabad, Rawalpindi, or across Pakistan.",
  },
] as const;

export function HowItWorks() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-2xl lg:text-left">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-primary sm:text-3xl lg:text-4xl">
              How to Book a Car with {brand.name}?
            </h2>
            <p className="mt-3 text-sm text-muted sm:text-base">
              Booking a chauffeur-driven car rental in Islamabad &amp; Rawalpindi is quick and hassle-free.
              Follow these four simple steps to reserve your vehicle with {brand.name}.
            </p>
          </div>
        </Reveal>

        <ol className="relative mt-12 sm:mt-16">
          {/* centre line (left edge on mobile) */}
          <span
            className="absolute bottom-0 left-7 top-0 w-px border-l-2 border-dashed border-secondary/40 lg:left-1/2 lg:-translate-x-px"
            aria-hidden="true"
          />
          {steps.map((step, index) => {
            const right = index % 2 === 1;
            return (
              <li key={step.title} className={cn("relative pb-10 pl-20 last:pb-0 lg:w-1/2 lg:pl-0", right ? "lg:ml-auto lg:pl-14" : "lg:pr-14")}>
                <span
                  className={cn(
                    "absolute left-0 top-0 grid h-14 w-14 place-items-center rounded-full bg-secondary font-heading text-xl font-bold text-white ring-8 ring-white",
                    right ? "lg:-left-7" : "lg:left-auto lg:-right-7",
                  )}
                >
                  {index + 1}
                </span>
                <Reveal delay={index * 80}>
                  <div className={cn("rounded-3xl border border-primary/10 bg-background p-6 sm:p-7", !right && "lg:text-right")}>
                    <span className={cn("grid h-12 w-12 place-items-center rounded-2xl bg-secondary/15", !right && "lg:ml-auto")}>
                      <span
                        className="material-symbols-outlined text-[26px] text-secondary"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                        aria-hidden="true"
                      >
                        {step.icon}
                      </span>
                    </span>
                    <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-secondary">Step {index + 1}</p>
                    <h3 className="mt-1 font-heading text-lg font-bold text-primary sm:text-xl">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{step.text}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
