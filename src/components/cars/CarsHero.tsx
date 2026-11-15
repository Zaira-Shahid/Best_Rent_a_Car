"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Container } from "@/components/ui/Container";
import { whatsappLink } from "@/lib/brand";
import { cn } from "@/lib/utils";

type CarsHeroStat = {
  label: string;
  value: string;
};

type CarsHeroProps = {
  badge?: string;
  title: string;
  accent?: string;
  description: string;
  image: string;
  imageAlt?: string;
  /** "cover" fills the hero (default). "natural" shows the image at most at its own size, so it is never upscaled. */
  imageFit?: "cover" | "natural";
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  stats?: CarsHeroStat[];
  className?: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function CarsHero({
  badge = "Our Fleet",
  title,
  accent,
  description,
  image,
  imageAlt = title,
  imageFit = "cover",
  primaryCta = { label: "Book Now", href: "/contact" },
  secondaryCta = {
    label: "WhatsApp",
    href: whatsappLink(),
  },
  stats,
  className,
}: CarsHeroProps) {
  const natural = imageFit === "natural";
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const imageEl = imageRef.current;
    const titleEl = titleRef.current;
    if (!imageEl || !titleEl) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageEl,
        { scale: 1.12 },
        { scale: 1, duration: 1.4, ease: "power2.out" },
      );
      gsap.fromTo(
        titleEl,
        { letterSpacing: "0.06em" },
        { letterSpacing: "0em", duration: 0.8, delay: 0.2, ease: "power3.out" },
      );
    });

    return () => ctx.revert();
  }, [title, image]);

  return (
    <header
      className={cn(
        "relative flex min-h-[420px] items-end overflow-hidden sm:min-h-[500px] lg:min-h-[560px]",
        natural && "flex-col items-stretch bg-navy lg:flex-row lg:items-end",
        className,
      )}
    >
      {natural ? (
        <div
          ref={imageRef}
          className="relative flex justify-center px-4 pt-24 lg:absolute lg:inset-0 lg:items-center lg:pb-40 lg:pl-[52%] lg:pr-[3%] lg:pt-6"
        >
          {/* Plain <img> on purpose: with no width/height it renders at its natural size and only ever shrinks. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={imageAlt}
            className="h-auto max-h-[320px] w-auto max-w-full rounded-2xl object-contain shadow-2xl lg:max-h-[290px]"
          />
        </div>
      ) : (
        <>
          <div ref={imageRef} className="absolute inset-0">
            <Image src={image} alt={imageAlt} fill priority className="object-cover" sizes="100vw" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-navy/92 via-navy/70 to-navy/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-navy/20" />
        </>
      )}

      <Container className={cn("relative z-10 w-full pb-10 pt-24 sm:pb-14 sm:pt-28 lg:pb-16", natural && "pt-8 sm:pt-8 lg:pt-28")}>
        <div className={cn("max-w-3xl text-white", natural && "lg:max-w-xl")}>
          <motion.span
            custom={0.05}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            {badge}
          </motion.span>

          <motion.h1
            ref={titleRef}
            custom={0.15}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="hero-shadow font-heading text-3xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl"
          >
            {title}
            {accent ? (
              <>
                {" "}
                <span className="text-accent">{accent}</span>
              </>
            ) : null}
          </motion.h1>

          <motion.p
            custom={0.28}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:mt-5 sm:text-base lg:text-lg"
          >
            {description}
          </motion.p>

          <motion.div
            custom={0.4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href={primaryCta.href}
              className="rounded-full bg-accent px-8 py-3.5 text-center text-sm font-semibold !text-white transition hover:brightness-110"
            >
              {primaryCta.label}
            </Link>
            <Link
              href={secondaryCta.href}
              target={secondaryCta.href.startsWith("http") ? "_blank" : undefined}
              rel={secondaryCta.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="rounded-full border border-white/35 bg-white/10 px-8 py-3.5 text-center text-sm font-semibold !text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              {secondaryCta.label}
            </Link>
          </motion.div>
        </div>

        {stats && stats.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
            }}
            className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-4 sm:gap-4"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
                }}
                className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm sm:px-5 sm:py-4"
              >
                <p className="font-heading text-lg font-semibold text-accent sm:text-xl">{stat.value}</p>
                <p className="mt-0.5 text-[11px] uppercase tracking-wider text-white/65 sm:text-xs">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        ) : null}
      </Container>
    </header>
  );
}
