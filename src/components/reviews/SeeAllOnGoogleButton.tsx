import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";

/** Opens the Google Business profile (all reviews) in a new tab. */
export function SeeAllOnGoogleButton({ className }: { className?: string }) {
  return (
    <a
      href={brand.googleReviewsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary/15 px-5 py-2.5 text-sm font-medium !text-primary transition hover:border-primary/30 hover:bg-white sm:w-fit",
        className,
      )}
    >
      See all reviews on Google
      <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
        open_in_new
      </span>
    </a>
  );
}
