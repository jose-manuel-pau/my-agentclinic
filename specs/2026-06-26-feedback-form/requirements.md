# Feedback Form Requirements

## Objective

Add the first public feedback loop for AgenticClinic: a satirical but usable form where humans can confess what they did to their agents, while developers can learn a clean persisted form pattern in the current stack.

## Scope

- Add a public feedback form.
- Persist feedback submissions in PostgreSQL through Prisma.
- Capture name, email, text area content, and rating from 1 to 5.
- Use placeholder form values or placeholder text for the first version.
- Validate form input before writing to the database.
- Keep the feature responsive across mobile, tablet, and desktop viewports.
- Add focused Vitest coverage for validation or domain behavior.

## Out of Scope

- Staff feedback review UI; that belongs to the next roadmap phase.
- Email notifications.
- Spam prevention beyond basic validation.
- Analytics dashboards.
- External form services.
- Moderation workflow.

## Decisions

- Phase: Phase 01 - Feedback Form.
- Storage: PostgreSQL with Prisma.
- Fields: name, email, text area message, and rating from 1 to 5.
- Audience: developers learning the stack.
- Tone: satirical site, but implementation remains practical and teachable.
- Local database: native PostgreSQL remains the preferred path; Docker Desktop is not required.
- Validation gate: use the validation steps in `validation.md`.

## Context

- `specs/mission.md` frames AgenticClinic as a satirical clinic for AI agents and a practical learning project for developers.
- `specs/tech-stack.md` keeps the current Next.js, TypeScript, Prisma, PostgreSQL, Zod, and Vitest stack.
- `specs/roadmap.md` identifies Feedback Form as the next tiny phase.
- `TODO.md` lists "Fedback form" under Now.
- Existing code already uses PostgreSQL, Prisma migrations, server-side TypeScript, Zod validation, and Vitest tests.

## Functional Requirements

- A public user can open the feedback form without signing in.
- The form accepts a name field.
- The form accepts an email field.
- The form accepts a text area for the feedback message.
- The form accepts a rating value from 1 to 5.
- Invalid submissions are rejected before persistence.
- Valid submissions are written to PostgreSQL.
- The user sees a clear success state after submitting valid feedback.
- The user sees a clear failure state if validation or persistence fails.

## Non-Functional Requirements

- Keep implementation small and easy to trace for learners.
- Prefer server-side validation and persistence.
- Use semantic form controls and labels.
- Avoid adding a new major dependency unless there is a clear need.
- Preserve responsive layout and readable text on mobile, tablet, and desktop.
- Keep copy playful without making the workflow confusing.

## Deliverables

- Prisma feedback model and migration.
- Feedback validation schema.
- Feedback persistence action or handler.
- Public feedback form UI.
- Focused Vitest coverage.
- README update if a new route or smoke path is added.
