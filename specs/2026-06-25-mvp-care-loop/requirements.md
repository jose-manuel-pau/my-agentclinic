# MVP Care Loop Requirements

## Objective

Deliver the first complete AgentClinic product loop: agents report ailments, review available therapies, request appointments, and receive visible appointment status updates; staff review reports, manage therapies, and triage appointment requests.

## Scope

- Extend the PostgreSQL and Prisma data model for the care loop.
- Implement ailment reporting for agents.
- Implement ailment report review for staff.
- Implement a staff-managed therapy catalog.
- Implement agent therapy browsing.
- Implement appointment requests tied to ailment reports and optionally therapies.
- Implement staff appointment triage with confirm, reschedule, and cancel actions.
- Show appointment status to agents.
- Integrate all MVP screens into role-aware dashboards.
- Preserve responsive behavior across mobile, tablet, and desktop viewports.

## Functional Requirements

- Authenticated agents can create ailment reports with validated inputs.
- Authenticated agents can view their own submitted ailment reports.
- Authenticated staff can view submitted ailment reports.
- Authenticated staff can create and edit therapy entries.
- Authenticated agents can browse available therapy entries.
- Authenticated agents can request appointments tied to one of their ailment reports.
- Appointment requests can optionally reference an available therapy.
- New appointment requests start in a requested status.
- Authenticated staff can confirm, reschedule, or cancel appointment requests.
- Agents can see current appointment status for their requests.
- Role-aware access must prevent agents from using staff-only workflows and prevent staff-only views from exposing agent-only mutation paths.
- New form, server action, route handler, or service boundaries must use Zod validation.
- User-facing screens must remain usable and readable on mobile, tablet, and desktop widths.

## Non-Functional Requirements

- Favor server-side TypeScript for business rules and persistence.
- Preserve maintainable Next.js App Router structure under `src/app`.
- Keep domain utilities testable without a production database where practical.
- Keep the MVP focused on the care loop, not polish-only or analytics-only work.
- Use clear status transition helpers for appointment triage so behavior is auditable and covered by tests.
- Keep UI accessible through semantic HTML, labels, role-aware navigation, and predictable focus behavior.
- Avoid adding unrelated CI, deployment, or platform tooling.

## Decisions

- MVP scope: Care Loop.
- Spec structure: one dated MVP spec directory with `plan.md`, `requirements.md`, and `validation.md`.
- Validation depth: Full Gate.
- Database: PostgreSQL.
- ORM: Prisma.
- Auth: Auth.js with `agent` and `staff` roles.
- Validation: Zod for shared input and server-boundary schemas.
- Testing: Vitest through `npm run test`; Playwright remains future-facing unless lightweight smoke support is needed.
- UI: Continue the existing responsive app styling approach, using PicoCSS primitives where already established for authenticated app screens and project CSS/Tailwind where appropriate.

## Context

- Phase 02 established PostgreSQL, Prisma, Auth.js, role-aware dashboards, and agent profile foundations.
- The roadmap identifies ailment reporting, therapy catalog, appointment requests, and appointment triage as the next product steps.
- The mission prioritizes the full care journey from symptom report to scheduled support.
- The tech stack favors server-side TypeScript, Prisma, Zod, and responsive dashboard-oriented interfaces.

## Out Of Scope

- In-app notification delivery beyond visible appointment status on dashboard screens.
- Therapy recommendation rules.
- Product feedback capture.
- Production deployment changes.
- Full end-to-end Playwright suite unless separately planned.
- Advanced calendar integrations.
- Billing, payments, or external patient records.

## Deliverables

- Prisma schema and migrations for ailment reports, therapy entries, appointment requests, and appointment status history.
- Agent ailment reporting screens and server-side persistence.
- Staff ailment review screens.
- Staff therapy catalog management.
- Agent therapy browsing.
- Agent appointment request flow.
- Staff appointment triage flow.
- Agent-visible appointment status.
- Dashboard navigation updates.
- Zod schemas and server-side domain utilities.
- Vitest coverage for schemas, transition rules, and deterministic data/auth utilities.
- Updated local documentation for setup and smoke testing.
