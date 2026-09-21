import { z } from "zod";

/**
 * Live review data from the Google Places API (New). The footer renders on
 * every route, so this is cached rather than fetched per request. Google's
 * terms limit how long Places content may be stored, so the window stays
 * short; revalidateTag("google-reviews") refreshes it on demand.
 */
const REVALIDATE_SECONDS = 60 * 60 * 6;

const reviewSchema = z.object({
  name: z.string(),
  rating: z.number().min(1).max(5),
  relativePublishTimeDescription: z.string().optional(),
  text: z.object({ text: z.string() }).optional(),
  authorAttribution: z
    .object({ displayName: z.string(), uri: z.url().optional() })
    .optional(),
});

const placeSchema = z.object({
  rating: z.number().min(0).max(5).optional(),
  userRatingCount: z.number().int().min(0).optional(),
  googleMapsUri: z.url().optional(),
  reviews: z.array(reviewSchema).optional(),
});

export interface GoogleReview {
  id: string;
  rating: number;
  text: string;
  authorName: string;
  authorUri?: string;
  relativeTime?: string;
}

export interface GoogleReviewSummary {
  rating: number | null;
  total: number | null;
  reviewsUrl: string;
  reviews: GoogleReview[];
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

export const reviewInitials = initials;

/**
 * Returns null whenever the integration is unconfigured or Google is
 * unreachable, so the footer simply omits the strip instead of breaking
 * every page on the site.
 */
export async function getGoogleReviews(): Promise<GoogleReviewSummary | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return null;

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=en`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask":
            "rating,userRatingCount,googleMapsUri,reviews.name,reviews.rating,reviews.text,reviews.authorAttribution,reviews.relativePublishTimeDescription",
        },
        cache: "force-cache",
        next: { revalidate: REVALIDATE_SECONDS, tags: ["google-reviews"] },
      },
    );
    if (!response.ok) return null;

    const place = placeSchema.safeParse(await response.json());
    if (!place.success) return null;

    // Google returns at most five reviews; callers slice to what they show.
    const reviews = (place.data.reviews ?? [])
      .filter((review) => review.text?.text.trim())
      .map((review) => ({
        id: review.name,
        rating: review.rating,
        text: review.text!.text.trim(),
        authorName: review.authorAttribution?.displayName ?? "Google guest",
        authorUri: review.authorAttribution?.uri,
        relativeTime: review.relativePublishTimeDescription,
      }));

    return {
      rating: place.data.rating ?? null,
      total: place.data.userRatingCount ?? null,
      reviewsUrl:
        place.data.googleMapsUri ??
        `https://search.google.com/local/reviews?placeid=${encodeURIComponent(placeId)}`,
      reviews,
    };
  } catch {
    return null;
  }
}
