"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { homeFaqs } from "@/data";
import { cn } from "@/lib/utils";

export function WhyChooseUs() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-navy py-16 text-white sm:py-24 lg:py-[100px]">
      <Container>
        <Reveal>
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Support</span>
            <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
              Answers to common questions about chauffeur-driven car rental with Best Rent a Car.
            </p>
          </div>
        </Reveal>

        <div className="mx-auto max-w-3xl space-y-3">
          {homeFaqs.map((item, index) => {
            const open = openIndex === index;
            return (
              <Reveal key={item.question} delay={Math.min(index, 5) * 60}>
                <div className="overflow-hidden rounded-[12px] border border-white/10 bg-white/5">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    onClick={() => setOpenIndex(open ? -1 : index)}
                    aria-expanded={open}
                  >
                    <span className="font-medium text-white">{item.question}</span>
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent transition",
                        open && "rotate-45",
                      )}
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
                      <p className="px-5 pb-5 text-sm leading-relaxed text-white/65">{item.answer}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
