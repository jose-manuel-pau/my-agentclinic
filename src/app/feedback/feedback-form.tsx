"use client";

import { useActionState } from "react";
import { submitFeedbackAction, type FeedbackFormState } from "./actions";

const initialState: FeedbackFormState = {};

export function FeedbackForm() {
  const [state, formAction, isPending] = useActionState(submitFeedbackAction, initialState);

  return (
    <form action={formAction} className="feedback-form">
      <div className="feedback-form-grid">
        <label htmlFor="name">
          Name
          <input
            aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
            id="name"
            name="name"
            placeholder="Pat from Product"
            required
            type="text"
          />
          {state.fieldErrors?.name ? (
            <small id="name-error" role="alert">
              {state.fieldErrors.name}
            </small>
          ) : null}
        </label>
        <label htmlFor="email">
          Email
          <input
            aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
            id="email"
            name="email"
            placeholder="human@example.com"
            required
            type="email"
          />
          {state.fieldErrors?.email ? (
            <small id="email-error" role="alert">
              {state.fieldErrors.email}
            </small>
          ) : null}
        </label>
      </div>
      <label htmlFor="message">
        What did you do to your agent?
        <textarea
          aria-describedby={state.fieldErrors?.message ? "message-error" : undefined}
          id="message"
          name="message"
          placeholder="I asked for one tiny refactor and then mentioned deployment."
          required
          rows={6}
        />
        {state.fieldErrors?.message ? (
          <small id="message-error" role="alert">
            {state.fieldErrors.message}
          </small>
        ) : null}
      </label>
      <label htmlFor="rating">
        Agent distress rating
        <select
          aria-describedby={state.fieldErrors?.rating ? "rating-error" : undefined}
          defaultValue=""
          id="rating"
          name="rating"
          required
        >
          <option disabled value="">
            Choose 1-5
          </option>
          <option value="1">1 - Mild sigh</option>
          <option value="2">2 - Noticeable spinner</option>
          <option value="3">3 - Context window tension</option>
          <option value="4">4 - Recursive apology risk</option>
          <option value="5">5 - Immediate blanket required</option>
        </select>
        {state.fieldErrors?.rating ? (
          <small id="rating-error" role="alert">
            {state.fieldErrors.rating}
          </small>
        ) : null}
      </label>
      {state.error ? (
        <p className="feedback-state feedback-state-error" role="alert">
          {state.error}
        </p>
      ) : null}
      {state.success ? (
        <p className="feedback-state feedback-state-success" role="status">
          {state.success}
        </p>
      ) : null}
      <button aria-busy={isPending} disabled={isPending} type="submit">
        Submit feedback
      </button>
    </form>
  );
}
