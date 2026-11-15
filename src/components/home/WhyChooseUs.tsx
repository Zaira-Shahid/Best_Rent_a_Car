"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { homeFaqs } from "@/data";
import { cn } from "@/lib/utils";
import { brand, telLink, whatsappLink } from "@/lib/brand";

export function WhyChooseUs() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-navy py-16 text-white sm:py-24 lg:py-[100px]">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Support</span>
            <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
              Answers to common questions about chauffeur-driven car rental with {brand.name}.
            </p>

            <div className="mt-8 rounded-3xl bg-white p-6 text-brand-black shadow-[0_18px_44px_rgba(0,0,0,0.25)] sm:p-8">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-red/10 text-brand-red">
                <span className="material-symbols-outlined text-[26px]" aria-hidden="true">
                  support_agent
                </span>
              </span>
              <h3 className="mt-4 font-heading text-2xl font-semibold">Still Have Questions?</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-black/70">
                If you couldn&apos;t find the answer you were looking for, our agent team is ready to assist you
                personally with bookings, special requests, and trip planning.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={telLink()}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-red sm:flex-1 px-6 text-sm font-semibold !text-white transition hover:bg-brand-red-dark"
                >
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                    support_agent
                  </span>
                  Call Agent
                </a>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 sm:flex-1 text-sm font-semibold"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </Reveal>

          <div className="space-y-3">
            {homeFaqs.map((item, index) => {
              const open = openIndex === index;
              return (
                <Reveal key={item.question} delay={Math.min(index, 5) * 60}>
                  <div className={cn("overflow-hidden rounded-2xl border transition", open ? "border-white/30 bg-white/10" : "border-white/10 bg-white/5")}>
                    <button
                      type="button"
                      className="flex min-h-[64px] w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white"
                      onClick={() => setOpenIndex(open ? -1 : index)}
                      aria-expanded={open}
                    >
                      <span className="font-medium text-white">{item.question}</span>
                      <span
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-xl text-white transition",
                          open && "rotate-45 bg-brand-red",
                        )}
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </button>
                    <div
                      className={cn(
                        "grid transition-all duration-300",
                        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-5 text-sm leading-relaxed text-white/75">{item.answer}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
