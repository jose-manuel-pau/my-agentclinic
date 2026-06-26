# AgenticClinic Roadmap

This roadmap follows `TODO.md` and keeps work intentionally tiny. Each phase should be small enough to implement, validate, and review independently.

Every user-facing phase must preserve responsive behavior across mobile, tablet, and desktop viewports.

## Phase 01 - Feedback Form

- Add a public feedback form for humans to confess what they did to their agents.
- Store or route feedback using the existing server-side TypeScript patterns.
- Validate inputs with Zod where data crosses a server boundary.
- Add Vitest coverage for validation or domain helpers.
- Keep the form readable and usable on mobile, tablet, and desktop.

## Phase 02 - Feedback Review Surface

- Add a small admin or staff-facing feedback list.
- Show submitted feedback in a simple, scan-friendly layout.
- Include empty, loading, and basic error states where relevant.
- Keep access control aligned with the existing auth and role model.

## Phase 03 - Customer Reviews

- Add a public customer reviews section.
- Use satirical review content that reinforces the AgenticClinic premise.
- Keep review cards concise, responsive, and readable.
- Prefer static or seeded content first; persistence can come later if needed.

## Phase 04 - Review Management

- Add a tiny staff workflow for adding or editing reviews if persistence is needed.
- Reuse existing Prisma, Zod, and server-action patterns.
- Add focused tests for review validation or formatting.

## Phase 05 - About Us Page

- Add an About Us page that explains the clinic, the joke, and the learning purpose.
- Include the address from project decisions once selected.
- Keep the page modern, accessible, and responsive.

## Phase 06 - Address and Map

- Add a map or map placeholder to the About Us page.
- Prefer a simple, reliable embed or static map pattern before adding a heavy mapping dependency.
- Document any external map provider choice before implementation.

## Phase 07 - Learning Polish

- Add developer-facing README notes for the new feedback, reviews, and About Us flows.
- Keep setup instructions clear for native PostgreSQL without Docker Desktop.
- Run the validation gate and update the changelog before merge.

## Continuous Rules

- Keep each feature spec small and dated.
- Validate with lint, tests, build, Prisma checks when database behavior changes, and responsive smoke review.
- Preserve the satirical tone while keeping implementation patterns teachable.
