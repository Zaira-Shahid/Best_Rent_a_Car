import Link from "next/link";
import { cn } from "@/lib/utils";
import { blogCategories } from "@/data";
import { brand } from "@/lib/brand";

type BlogFiltersProps = {
  activeSlug?: string | null;
  intro?: string;
};

export function BlogFilters({ activeSlug = null, intro }: BlogFiltersProps) {
  const allActive = !activeSlug;

  return (
    <section className="border-b border-primary/8 bg-white py-8 sm:py-10 lg:py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-muted sm:mb-8">
          <Link href="/" className="transition hover:text-primary">
            Home
          </Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          {activeSlug ? (
            <>
              <Link href="/blog" className="transition hover:text-primary">
                Blog
              </Link>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              <span className="font-medium text-primary">
                {blogCategories.find((c) => c.slug === activeSlug)?.name ?? "Category"}
              </span>
            </>
          ) : (
            <span className="font-medium text-primary">Blog</span>
          )}
        </nav>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div className="max-w-2xl">
            <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary sm:text-xs">
              {brand.name} Journal
            </span>
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
              {allActive ? "Travel Insights & Guides" : blogCategories.find((c) => c.slug === activeSlug)?.name}
            </h2>
            {intro ? (
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{intro}</p>
            ) : null}
          </div>

          <label className="relative w-full lg:max-w-sm">
            <span className="material-symbols-outlined pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-muted">
              search
            </span>
            <input
              type="search"
              placeholder="Search insights..."
              className="w-full rounded-xl border border-primary/10 bg-[#f8f9fa] py-3 pl-11 pr-4 text-sm text-primary outline-none transition placeholder:text-muted/70 focus:border-secondary focus:bg-white focus:ring-2 focus:ring-secondary/25"
            />
          </label>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-2.5">
          <Link
            href="/blog"
            className={cn(
              "rounded-full px-4 py-2 text-xs font-semibold transition sm:px-5 sm:py-2.5 sm:text-sm",
              allActive
                ? "bg-primary text-white shadow-sm"
                : "border border-primary/10 bg-[#f8f9fa] text-muted hover:border-secondary/40 hover:text-secondary",
            )}
          >
            All Stories
          </Link>
          {blogCategories.map((category) => {
            const active = category.slug === activeSlug;
            return (
              <Link
                key={category.slug}
                href={`/blog/${category.slug}`}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-semibold transition sm:px-5 sm:py-2.5 sm:text-sm",
                  active
                    ? "bg-primary text-white shadow-sm"
                    : "border border-primary/10 bg-[#f8f9fa] text-muted hover:border-secondary/40 hover:text-secondary",
                )}
              >
                {category.name}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
