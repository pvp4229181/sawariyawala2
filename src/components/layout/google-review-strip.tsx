import { ArrowUpRight, Star } from "lucide-react";
import { getGoogleReviews, reviewInitials } from "@/lib/google-reviews";
import { GoogleGlyph } from "@/components/ui/social-icons";

function Stars({ rating, label }: { rating: number; label: string }) {
  return (
    <span className="google-stars" role="img" aria-label={label}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={index < Math.round(rating) ? "filled" : ""}
        />
      ))}
    </span>
  );
}

/** The compact footer strip shows three; the homepage section shows all five. */
const STRIP_LIMIT = 3;

export async function GoogleReviewStrip() {
  const data = await getGoogleReviews();
  if (!data?.reviews.length) return null;
  const reviews = data.reviews.slice(0, STRIP_LIMIT);

  return (
    <section className="shell google-reviews" aria-label="Google reviews">
      <div className="google-reviews-summary">
        <GoogleGlyph />
        <div>
          <span className="google-reviews-label">Reviews on Google</span>
          {data.rating !== null && (
            <span className="google-reviews-score">
              <b>{data.rating.toFixed(1)}</b>
              <Stars
                rating={data.rating}
                label={`${data.rating.toFixed(1)} out of 5`}
              />
            </span>
          )}
          {data.total !== null && (
            <small>
              {data.total.toLocaleString("en-IN")} review
              {data.total === 1 ? "" : "s"}
            </small>
          )}
        </div>
      </div>

      <ul className="google-reviews-list">
        {reviews.map((review) => (
          <li key={review.id}>
            <Stars rating={review.rating} label={`${review.rating} out of 5`} />
            <p>{review.text}</p>
            <footer>
              <span aria-hidden="true">
                {reviewInitials(review.authorName)}
              </span>
              <cite>
                {review.authorUri ? (
                  <a
                    href={review.authorUri}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {review.authorName}
                  </a>
                ) : (
                  review.authorName
                )}
                {review.relativeTime && <small>{review.relativeTime}</small>}
              </cite>
            </footer>
          </li>
        ))}
      </ul>

      <a
        className="google-reviews-link"
        href={data.reviewsUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Read all on Google
        <ArrowUpRight aria-hidden="true" />
      </a>
    </section>
  );
}
