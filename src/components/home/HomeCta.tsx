import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const CTA_IMAGE =
  "/images/site/sunset-sedan-bridge.webp";

export function HomeCta() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image src={CTA_IMAGE} alt="Black sedan driving at sunset" fill className="-z-10 object-cover" sizes="100vw" />
      <div className="absolute inset-0 -z-10 bg-primary/80" aria-hidden="true" />
      <Container className="py-16 sm:py-20 lg:py-24">
        <Reveal>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
            <div className="max-w-2xl">
              <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
                Ready to Experience the Extraordinary?
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">
                Book your dream vehicle today and redefine your travel expectations. Your journey deserves a
                signature touch.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link
                href="/cars"
                className="inline-flex h-14 items-center justify-center rounded-full bg-brand-red px-10 text-base font-semibold !text-white shadow-xl transition hover:bg-brand-red-dark"
              >
                Reserve Now
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-14 items-center justify-center rounded-full border-2 border-white bg-transparent px-10 text-base font-semibold !text-white transition hover:bg-white hover:!text-brand-black"
              >
                Speak to an Agent
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
