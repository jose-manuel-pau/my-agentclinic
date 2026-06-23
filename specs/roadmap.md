# AgentClinic Nano-Phase Roadmap

Each phase is intentionally tiny: 1-3 features, completed in a day or less, and released quickly for feedback.

Every user-facing web UI phase must preserve responsive behavior across mobile, tablet, and desktop viewports.

## Nano Phase 01 - Project Bootstrap (Completed)

- Initialize Next.js + TypeScript repository.
- Add linting and formatting.
- Establish responsive layout foundations.

## Nano Phase 02 - Data Spine (<= 1 day)

- Configure PostgreSQL connection.
- Add Prisma with initial migrations.

## Nano Phase 03 - Auth and Roles (<= 1 day)

- Implement Auth.js login flow.
- Add role model: `agent` and `staff`.
- Ensure auth screens are responsive.

## Nano Phase 04 - Dashboard Shells (<= 1 day)

- Create base `agent` dashboard layout.
- Create base `staff` dashboard layout.
- Ensure dashboard shells adapt across mobile, tablet, and desktop viewports.

## Nano Phase 05 - Agent Profile View (<= 1 day)

- Agent can view their profile details.
- Profile content remains readable and navigable on mobile, tablet, and desktop.

## Nano Phase 06 - Ailment Reporting (<= 1 day)

- Agent can create and submit an ailment report.
- Staff can see submitted ailment reports.
- Reporting and review screens remain responsive.

## Nano Phase 07 - Therapy Catalog (<= 1 day)

- Staff can create and edit therapy entries.
- Agents can browse available therapies.
- Therapy catalog screens remain responsive.

## Nano Phase 08 - Appointment Requests (<= 1 day)

- Agent can request an appointment tied to an ailment/therapy.
- Appointment request flow remains responsive.

## Nano Phase 09 - Appointment Triage (<= 1 day)

- Staff can confirm, reschedule, or cancel requests.
- Appointment status is visible to agents.
- Appointment triage screens remain responsive.

## Nano Phase 10 - In-App Notifications (<= 1 day)

- Agents receive in-app booking status updates.
- Notification surfaces remain responsive.

## Nano Phase 11 - Reliability Guardrails (<= 1 day)

- Add error boundaries and API error handling.
- Add logging for key booking actions.

## Nano Phase 12 - Core Test Coverage (<= 1 day)

- Add unit tests for booking status transitions.
- Add one end-to-end test for request-to-confirm flow.

## Nano Phase 13 - UX Polish Pass (<= 1 day)

- Improve loading and empty states on dashboards.
- Refine responsive visual consistency for modern browser UX.

## Nano Phase 14 - Recommendation Iteration (<= 1 day)

- Add first-pass therapy recommendation rules.
- Recommendation UI remains responsive when surfaced.

## Nano Phase 15 - Feedback Loop (<= 1 day)

- Add lightweight in-product feedback capture.
- Review feedback and reorder next nano phases.
- Feedback capture remains responsive.

## Continuous Success Metrics

- Appointment booking completion rate.
- Median time from ailment report to confirmed appointment.
- Weekly active agents and staff.
- Critical flow error rate.
