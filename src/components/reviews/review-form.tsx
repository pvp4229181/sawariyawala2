"use client";

import { useState, type FormEvent } from "react";
import { Check, Send, Star } from "lucide-react";

export function ReviewForm({
  productName,
  productSlug,
}: {
  productName: string;
  productSlug: string;
}) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [review, setReview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!rating) {
      setError("Please choose a star rating.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug, customerName, rating, review }),
      });
      const result = (await response.json()) as {
        message?: string;
        error?: string;
      };
      if (!response.ok)
        throw new Error(result.error || "Review could not be sent.");

      setMessage(result.message || "Thank you for sharing your review.");
      setRating(0);
      setCustomerName("");
      setReview("");
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Review could not be sent.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const visibleRating = hoveredRating || rating;

  return (
    <form className="review-form-card" onSubmit={submit}>
      <div className="review-form-heading">
        <span>Reviewing</span>
        <h3>{productName}</h3>
      </div>

      <fieldset className="star-rating">
        <legend>Your rating</legend>
        <div onMouseLeave={() => setHoveredRating(0)}>
          {Array.from({ length: 5 }).map((_, index) => {
            const value = index + 1;
            return (
              <button
                type="button"
                key={value}
                className={value <= visibleRating ? "active" : ""}
                onClick={() => setRating(value)}
                onMouseEnter={() => setHoveredRating(value)}
                aria-label={`${value} star${value > 1 ? "s" : ""}`}
                aria-pressed={rating === value}
              >
                <Star aria-hidden="true" />
              </button>
            );
          })}
          <span>{rating ? `${rating} out of 5` : "Choose your rating"}</span>
        </div>
      </fieldset>

      <label>
        Your name
        <input
          value={customerName}
          onChange={(event) => setCustomerName(event.target.value)}
          minLength={2}
          maxLength={80}
          placeholder="Enter your name"
          autoComplete="name"
          required
        />
      </label>

      <label>
        Your review
        <textarea
          value={review}
          onChange={(event) => setReview(event.target.value)}
          minLength={10}
          maxLength={500}
          rows={5}
          placeholder={`What did you enjoy about ${productName}?`}
          required
        />
        <small>{review.length}/500</small>
      </label>

      {error && <p className="review-form-error">{error}</p>}
      {message && (
        <p className="review-form-success">
          <Check aria-hidden="true" /> {message}
        </p>
      )}

      <button className="button review-submit-button" disabled={submitting}>
        {submitting ? "Sending..." : "Submit review"}
        <Send aria-hidden="true" />
      </button>
      <small className="review-moderation-note">
        Reviews are checked before appearing publicly.
      </small>
    </form>
  );
}
