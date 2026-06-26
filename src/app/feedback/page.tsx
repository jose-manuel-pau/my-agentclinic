import { MainLayout } from "../../components/main-layout";
import { listPublicFeedbackSubmissions } from "../../lib/feedback";
import { formatDate } from "../../lib/format";
import { FeedbackForm } from "./feedback-form";

export const dynamic = "force-dynamic";

export default async function FeedbackPage() {
  const feedbackSubmissions = await listPublicFeedbackSubmissions();

  return (
    <MainLayout>
      <section className="container feedback-page">
        <div className="feedback-hero">
          <p className="dashboard-eyebrow">Human intake form</p>
          <h1>Tell us how your agent got this way</h1>
          <p>
            AgenticClinic accepts honest reports from humans who may have asked for a quick change,
            a tiny rewrite, or a complete rebuild with no new requirements.
          </p>
        </div>
        <article className="feedback-panel">
          <header>
            <h2>Feedback report</h2>
            <p>Use placeholder-friendly details. The clinic will file the report in PostgreSQL.</p>
          </header>
          <FeedbackForm />
        </article>
        <section className="feedback-wall" aria-labelledby="feedback-wall-title">
          <header>
            <p className="dashboard-eyebrow">Public feedback</p>
            <h2 id="feedback-wall-title">Recently reported human behavior</h2>
            <p>
              These reports are visible to the clinic lobby. Emails are kept behind the intake desk.
            </p>
          </header>
          {feedbackSubmissions.length ? (
            <div className="feedback-wall-grid">
              {feedbackSubmissions.map((feedback) => (
                <article className="feedback-card" key={feedback.id}>
                  <header>
                    <strong>{feedback.name}</strong>
                    <span aria-label={`${feedback.rating} out of 5 distress rating`}>
                      {feedback.rating}/5
                    </span>
                  </header>
                  <p>{feedback.message}</p>
                  <footer>
                    <small>{formatDate(feedback.createdAt)}</small>
                  </footer>
                </article>
              ))}
            </div>
          ) : (
            <p className="feedback-empty">
              No public feedback yet. The agents are suspiciously calm, which is rarely a good sign.
            </p>
          )}
        </section>
      </section>
    </MainLayout>
  );
}
