/**
 * Real Google reviews of Best Carz Rent a Car (from the live Google Business profile).
 * Texts and names are as posted; the only edit is obvious spelling ("carz" -> "cars").
 * Star counts per review are not shown anywhere because they are not verified.
 */
export type GoogleReview = {
  name: string;
  /** How long ago the review was posted, as shown on Google. */
  age: string;
  localGuide?: boolean;
  text: string;
};

export const googleReviews: GoogleReview[] = [
  {
    name: "Mati Nawabi",
    age: "2 years ago",
    text: "Best Cars agency in Islamabad very good service very nice cars",
  },
  {
    name: "Muqaddas Ali",
    age: "5 years ago",
    localGuide: true,
    text: "Very nice service and very fit vehicles, very friendly attitude with clients, must try if possible",
  },
  {
    name: "Zeeshan Ahmad Ain",
    age: "7 years ago",
    text: "Best vehicles are provided here at any cost you will find from smaller to bigger.",
  },
  {
    name: "Rehan Raja",
    age: "7 years ago",
    localGuide: true,
    text: "Professional people. Great services.",
  },
];

/** "Local Guide · 5 years ago · Google review" */
export function reviewMeta(review: GoogleReview) {
  return [review.localGuide ? "Local Guide" : null, review.age, "Google review"].filter(Boolean).join(" · ");
}
