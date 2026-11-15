"use client";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { whatsappLink } from "@/lib/brand";

type CtaBannerProps = {
  title?: string;
  description?: string;
};

export function CtaBanner({
  title = "Ready to book your ride?",
  description = "Get a premium car with professional driver across Pakistan.",
}: CtaBannerProps) {
  return (
    <Section className="bg-primary">
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-6 rounded-[12px] bg-primary sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-semibold text-white sm:text-2xl lg:text-3xl">{title}</h2>
            <p className="mt-2 max-w-xl text-sm text-white/70 sm:text-base">{description}</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            <ButtonLink href="/contact" variant="accent" size="lg" className="w-full sm:w-auto">
              Book Now
            </ButtonLink>
            <ButtonLink
              href={whatsappLink()}
              variant="outline"
              size="lg"
              className="w-full border-white/30 !text-white hover:border-secondary hover:!text-secondary sm:w-auto"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
