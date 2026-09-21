import { getGoogleReviews, reviewInitials } from "@/lib/google-reviews";
import { GoogleGlyph } from "@/components/ui/social-icons";

/**
 * Editable demo content. Shown only until the Google Places integration is
 * configured, so the section never renders empty on a fresh install.
 */
const demoReviews = [
  {
    name: "Aarav M.",
    quote: "The menu was easy to browse and everything arrived neatly packed.",
  },
  {
    name: "Meera S.",
    quote:
      "A polished experience with the comfort of familiar Indian flavours.",
  },
  {
    name: "Kabir R.",
    quote: "The catering presentation felt warm, thoughtful and effortless.",
  },
  {
    name: "Riya P.",
    quote:
      "From the first enquiry to the final serving, every detail felt simple, fresh and well cared for.",
  },
];

interface Card {
  key: string;
  quote: string;
  name: string;
  nameUri?: string;
  meta: string;
  rating: number;
}

/** The marquee needs enough cards to overflow the viewport before it loops. */
const MIN_CARDS = 4;

function fill(cards: Card[]): Card[] {
  if (!cards.length) return cards;
  const filled = [...cards];
  while (filled.length < MIN_CARDS) {
    const source = cards[filled.length % cards.length];
    filled.push({ ...source, key: `${source.key}-${filled.length}` });
  }
  return filled;
}

export async function Testimonials() {
  const google = await getGoogleReviews();
  const isLive = Boolean(google?.reviews.length);

  const cards: Card[] = isLive
    ? google!.reviews.map((review) => ({
        key: review.id,
        quote: review.text,
        name: review.authorName,
        nameUri: review.authorUri,
        meta: review.relativeTime ?? "Google review",
        rating: review.rating,
      }))
    : demoReviews.map((review) => ({
        key: review.name,
        quote: review.quote,
        name: review.name,
        meta: "Demo testimonial — editable",
        rating: 5,
      }));

  const shown = fill(cards);

  return (
    <section className="section testimonials">
      <div className="shell">
        <div className="section-heading center">
          <span className="eyebrow">Happy customers</span>
          <h2>
            Kind words, <em>warm moments</em>
          </h2>
          {isLive && (
            <div className="testimonial-source">
              <GoogleGlyph />
              <span>
                {google!.rating !== null && (
                  <b>{google!.rating.toFixed(1)} on Google</b>
                )}
                {google!.total !== null && (
                  <small>
                    from {google!.total.toLocaleString("en-IN")} review
                    {google!.total === 1 ? "" : "s"}
                  </small>
                )}
              </span>
              <a
                href={google!.reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read all
              </a>
            </div>
          )}
        </div>
        <div
          className="testimonial-grid"
          aria-label={isLive ? "Google reviews" : "Customer reviews"}
        >
          <div className="testimonial-track">
            {[0, 1].map((loop) => (
              <div
                className="testimonial-set"
                aria-hidden={loop === 1 ? true : undefined}
                key={loop}
              >
                {shown.map((card, index) => (
                  <blockquote key={`${loop}-${card.key}`}>
                    <div className="testimonial-card-top">
                      <span aria-label={`${card.rating} out of 5 stars`}>
                        {"★".repeat(card.rating)}
                        {"☆".repeat(5 - card.rating)}
                      </span>
                      <small aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </small>
                    </div>
                    <p>“{card.quote}”</p>
                    <footer>
                      <span aria-hidden="true">
                        {reviewInitials(card.name)}
                      </span>
                      <cite>
                        {card.nameUri ? (
                          <a
                            href={card.nameUri}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {card.name}
                          </a>
                        ) : (
                          card.name
                        )}
                        <small>{card.meta}</small>
                      </cite>
                    </footer>
                  </blockquote>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
