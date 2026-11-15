"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type FleetNavItem = { id: string; label: string };

/** Sticky pill navigation for the home fleet sections; highlights the section in view. */
export function FleetNav({ items }: { items: FleetNavItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const targets = items.map((item) => document.getElementById(item.id)).filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-130px 0px -55% 0px", threshold: 0 },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [items]);

  // Keep the active pill visible in the horizontally scrolling mobile list.
  useEffect(() => {
    const list = listRef.current;
    const pill = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!list || !pill) return;
    const target = pill.offsetLeft - (list.clientWidth - pill.clientWidth) / 2;
    list.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [active]);

  return (
    <nav
      aria-label="Fleet categories"
      className="sticky top-14 z-40 border-y border-brand-black/10 bg-white/92 backdrop-blur-md xl:top-16"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul ref={listRef} className="flex items-center gap-2 overflow-x-auto py-2.5 [scrollbar-width:none] sm:justify-center [&::-webkit-scrollbar]:hidden">
          {items.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id} data-id={item.id} className="shrink-0">
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => setActive(item.id)}
                  className={cn(
                    "inline-flex h-11 items-center rounded-full border px-5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-black",
                    isActive
                      ? "border-brand-red bg-brand-red !text-white"
                      : "border-brand-black/15 bg-white !text-brand-black hover:border-brand-black",
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
