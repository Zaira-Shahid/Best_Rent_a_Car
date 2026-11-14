import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

type PromoBannerProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  href?: string;
  ctaLabel?: string;
  imageSrc?: string;
};

export function PromoBanner({
  eyebrow = "Serving Islamabad",
  title = "Best Rent a Car with Driver in Islamabad",
  description = "Best Rent a Car specializes in car rental with driver in Islamabad for airport transfers, corporate travel, official visits, weddings, city tours, and family trips. Choose from a wide range of clean, insured, and professionally maintained vehicles driven by experienced chauffeurs, available 24/7 at competitive rates.",
  href = "/rent-a-car/islamabad",
  ctaLabel = "Rent a Car in Islamabad",
  imageSrc = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=80",
}: PromoBannerProps) {
  return (
    <section className="relative overflow-hidden bg-primary py-16 sm:py-20">
      <Image
        src={imageSrc}
        alt=""
        fill
        className="object-cover opacity-35 transition duration-[4000ms] hover:scale-105"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/55" />
      <Container className="relative">
        <Reveal>
          <div className="max-w-2xl">
            <p className="font-heading text-sm font-medium uppercase tracking-[0.2em] text-accent">
              {eyebrow}
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="mt-4 max-w-xl text-sm text-white/70 sm:text-base lg:text-lg">{description}</p>
            <div className="mt-8">
              <ButtonLink href={href} variant="accent" size="lg" className="w-full hover:-translate-y-0.5 sm:w-auto">
                {ctaLabel}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
