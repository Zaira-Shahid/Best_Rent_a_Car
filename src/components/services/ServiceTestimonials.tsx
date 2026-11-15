"use client";

import type { ServiceTestimonial } from "@/types";
import { Reveal } from "@/components/ui/Reveal";
import { SeeAllOnGoogleButton } from "@/components/reviews/SeeAllOnGoogleButton";

type ServiceTestimonialsProps = {
  items: ServiceTestimonial[];
};

export function ServiceTestimonials({ items }: ServiceTestimonialsProps) {
  return (
    <div>
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((item, index) => (
        <Reveal key={item.name} delay={index * 100}>
          <article className="h-full rounded-3xl border border-primary/8 bg-[#f3f4f5] p-8 sm:p-10">
            <p className="mb-8 text-base italic leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
            <div>
              <div className="font-semibold">{item.name}</div>
              <div className="text-xs uppercase tracking-wide text-muted">{item.role}</div>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
    <div className="mt-8 flex justify-center">
      <SeeAllOnGoogleButton />
    </div>
    </div>
  );
}
