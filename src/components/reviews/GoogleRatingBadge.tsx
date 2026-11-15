import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { GoogleMark } from "./GoogleMark";

type GoogleRatingBadgeProps = {
  className?: string;
  /** "light" for white backgrounds, "dark" for photos / navy backgrounds. */
  tone?: "light" | "dark";
};

/** The one place the real Google rating is shown: "4.5 ★ · 12 Google reviews". */
export function GoogleRatingBadge({ className, tone = "light" }: GoogleRatingBadgeProps) {
  return (
    <div className={cn("inline-flex flex-wrap items-center gap-2.5", className)}>
      <GoogleMark className="h-6 w-6 shrink-0" />
      <span className={cn("text-sm font-semibold sm:text-base", tone === "dark" ? "text-white" : "text-primary")}>
        {brand.rating.toFixed(1)} <span className="text-[#FBBC04]">★</span> · {brand.reviewCount} Google reviews
      </span>
    </div>
  );
}
