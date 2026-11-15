import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { brand } from "@/lib/brand";

const panels = [
  {
    eyebrow: "Serving Islamabad",
    title: `${brand.name} with Driver in Islamabad`,
    description: `${brand.name} specializes in car rental with driver in Islamabad for airport transfers, corporate travel, official visits, weddings, city tours, and family trips. Choose from a wide range of clean, insured, and professionally maintained vehicles driven by experienced chauffeurs, available 24/7 at competitive rates.`,
    href: "/rent-a-car/islamabad",
    ctaLabel: "Rent a Car in Islamabad",
    imageSrc: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=80",
  },
  {
    eyebrow: "Serving Rawalpindi",
    title: `${brand.name} with Driver in Rawalpindi`,
    description: `${brand.name} specializes in car rental with driver in Rawalpindi for airport transfers, corporate travel, official visits, weddings, city tours, and family trips. Choose from a wide range of clean, insured, and professionally maintained vehicles driven by experienced chauffeurs, available 24/7 at competitive rates.`,
    href: "/rent-a-car/rawalpindi",
    ctaLabel: "Rent a Car in Rawalpindi",
    imageSrc: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1800&q=80",
  },
] as const;

/** Islamabad and Rawalpindi side by side in one section. */
export function HomeCities() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <Container>
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {panels.map((panel, index) => (
            <Reveal key={panel.href} delay={index * 100} className="h-full">
              <article className="relative isolate flex h-full min-h-[420px] flex-col justify-end overflow-hidden rounded-3xl bg-primary p-6 sm:p-9">
                <Image
                  src={panel.imageSrc}
                  alt=""
                  fill
                  className="-z-10 object-cover opacity-35 transition duration-[4000ms] hover:scale-105"
                  sizes="(max-width: 1023px) 100vw, 50vw"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-primary via-primary/85 to-primary/40" aria-hidden="true" />
                <p className="w-fit rounded-full bg-brand-red px-4 py-1.5 font-heading text-xs font-bold uppercase tracking-[0.18em] text-white">
                  {panel.eyebrow}
                </p>
                <h2 className="mt-4 font-heading text-2xl font-semibold text-white sm:text-3xl">{panel.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">{panel.description}</p>
                <div className="mt-6">
                  <ButtonLink href={panel.href} variant="accent" size="lg" className="w-full hover:-translate-y-0.5 sm:w-auto">
                    {panel.ctaLabel}
                  </ButtonLink>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
