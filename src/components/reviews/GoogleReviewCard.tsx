import type { GoogleReview } from "@/data/reviews";
import { cn } from "@/lib/utils";
import { GoogleMark } from "./GoogleMark";

const AVATAR_COLORS = ["bg-brand-black", "bg-brand-red-dark"] as const;

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}

type GoogleReviewCardProps = {
  review: GoogleReview;
  /** Position in the list, only used to pick the avatar colour. */
  index?: number;
  className?: string;
};

/** One real Google review: name, Local Guide badge, how long ago, "Google review" label and the text. No star count. */
export function GoogleReviewCard({ review, index = 0, className }: GoogleReviewCardProps) {
  return (
    <article
      className={cn(
        "flex h-full min-w-0 flex-col rounded-2xl border border-primary/8 bg-white p-5 shadow-[0_8px_24px_rgba(0,11,29,0.06)] sm:p-6",
        className,
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white", AVATAR_COLORS[index % AVATAR_COLORS.length])}
            aria-hidden="true"
          >
            {initials(review.name)}
          </div>
          <div className="min-w-0">
            <h4 className="truncate text-sm font-semibold text-primary">{review.name}</h4>
            <p className="text-xs text-muted">
              {review.localGuide ? <span className="font-medium text-primary/70">Local Guide · </span> : null}
              {review.age}
            </p>
          </div>
        </div>
        <GoogleMark className="h-5 w-5 shrink-0" />
      </div>

      <p className="flex-1 text-sm leading-relaxed text-primary/75">&ldquo;{review.text}&rdquo;</p>

      <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-muted">Google review</p>
    </article>
  );
}
