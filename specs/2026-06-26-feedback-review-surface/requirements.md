# Feedback Review Surface Requirements

## Objective

Add a staff-only review surface for public feedback submissions so AgenticClinic staff can inspect incoming human confessions and move each item through a tiny review workflow.

## Scope

- Add a staff-only feedback review page under the existing staff dashboard.
- Show submitted feedback in a readable list.
- Include name, email, message, rating, created date, and review status.
- Add review statuses: `new`, `reviewed`, and `archived`.
- Allow staff to update feedback review status.
- Preserve the existing public feedback form and public feedback wall.
- Keep the review surface responsive across mobile, tablet, and desktop widths.
- Add focused Vitest coverage for validation or review-status behavior.

## Out of Scope

- Public moderation controls.
- Deleting feedback submissions.
- Bulk actions.
- Advanced search, filtering, or analytics.
- Separate admin area or new user role.
- Email notifications.
- Spam detection or abuse tooling.

## Decisions

- Phase: Phase 02 - Feedback Review Surface.
- Access: staff-only, using the existing Auth.js session and role helpers.
- Location: existing staff dashboard area.
- Workflow statuses: `new`, `reviewed`, `archived`.
- Storage: PostgreSQL with Prisma.
- Validation: Zod at server-action/domain boundaries.
- Validation depth: full gate.
- UI tone: clear operational dashboard with light satirical copy only where it does not reduce readability.

## Context

- `specs/mission.md` frames AgenticClinic as a satirical learning project with practical execution.
- `specs/tech-stack.md` keeps the current Next.js, TypeScript, Prisma, PostgreSQL, Zod, Auth.js, and Vitest stack.
- `specs/roadmap.md` identifies Feedback Review Surface as the next tiny phase.
- Phase 01 added persisted public feedback and a public feedback wall.
- The current app already has staff dashboards and role-aware access patterns.

## Functional Requirements

- Authenticated staff can open the feedback review page.
- Non-staff users cannot access the feedback review page.
- Staff can see all feedback submissions.
- Staff can see private feedback email values on the review page.
- Staff can see each feedback item rating and submitted date.
- Staff can see each item review status.
- Staff can update an item to `new`, `reviewed`, or `archived`.
- Invalid status updates are rejected before persistence.
- The public feedback form continues to create feedback successfully.
- The public feedback wall does not expose feedback email addresses.

## Non-Functional Requirements

- Reuse existing staff dashboard and role guard patterns.
- Keep server-side TypeScript as the business-rule boundary.
- Keep the feature small and readable for developers learning the stack.
- Avoid adding new dependencies.
- Keep mobile, tablet, and desktop layouts readable without overlapping controls.
- Preserve current database setup expectations with native PostgreSQL.

## Deliverables

- Prisma status field and migration if needed.
- Feedback review status schema or helper.
- Staff feedback listing helper.
- Staff feedback status update action.
- Staff feedback review page.
- Dashboard navigation update.
- Focused Vitest coverage.
- README smoke path update if a new route is introduced.
