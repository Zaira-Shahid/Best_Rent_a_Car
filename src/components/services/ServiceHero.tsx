import Image from "next/image";
import Link from "next/link";
import type { ServiceHero as ServiceHeroData } from "@/types";
import { Container } from "@/components/ui/Container";

type ServiceHeroProps = {
  hero: ServiceHeroData;
};

export function ServiceHero({ hero }: ServiceHeroProps) {
  return (
    <header className="relative flex min-h-[380px] items-center overflow-hidden py-16 sm:min-h-[440px] sm:py-20 lg:min-h-[480px]">
      <Image src={hero.image} alt={hero.title} fill priority className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/60 to-primary/20" />
      <Container className="relative z-10">
        <div className="max-w-2xl space-y-5 text-white sm:space-y-6">
          <span className="glass-panel animate-fade-up inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
            <span className="h-2 w-2 rounded-full bg-accent" />
            {hero.badge}
          </span>
          <h1 className="animate-fade-up font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {hero.title}
            {hero.accent ? <> <span className="text-white underline decoration-brand-red decoration-[5px] underline-offset-[10px]">{hero.accent}</span></> : null}
          </h1>
          <p className="animate-fade-up-delay max-w-xl text-sm leading-relaxed text-white/80 sm:text-base lg:text-lg">
            {hero.description}
          </p>
          <div className="animate-fade-up-delay-2 flex flex-col gap-3 pt-2 sm:flex-row sm:gap-4">
            <Link
              href={hero.primaryCta.href}
              className="rounded-xl bg-accent px-8 py-3.5 text-center text-sm font-semibold !text-white transition hover:scale-105"
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="glass-panel rounded-xl px-8 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-white/20"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
