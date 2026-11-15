import { brand } from "@/lib/brand";
import { SocialLinks } from "@/components/shared/SocialLinks";

/** Thin info strip above the main header row. Collapsed by the header once the page is scrolled. */
export function TopInfoBar() {
  return (
    <div className="hidden bg-brand-black text-[13px] text-white/80 md:block">
      <div className="mx-auto flex h-11 w-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <ul className="flex min-w-0 items-center gap-x-6 gap-y-0">
          <li className="flex min-w-0 items-center gap-1.5">
            <span className="material-symbols-outlined shrink-0 text-[16px] text-white/60" aria-hidden="true">
              location_on
            </span>
            <span className="truncate">{brand.location.address}</span>
          </li>
          <li className="flex shrink-0 items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-white/60" aria-hidden="true">
              schedule
            </span>
            <span>{brand.hours}</span>
          </li>
        </ul>
        <div className="flex shrink-0 items-center">
          <SocialLinks className="flex-nowrap gap-1 [&_a]:h-11 [&_a]:w-11 [&_a]:border-0" />
        </div>
      </div>
    </div>
  );
}
