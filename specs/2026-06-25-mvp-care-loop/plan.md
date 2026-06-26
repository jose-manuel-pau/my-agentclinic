# MVP Care Loop Plan

## Task Groups

1. Extend The Data Spine For Care Loop Records
   - Add Prisma models and migrations for ailment reports, therapy entries, appointment requests, and appointment status history.
   - Model ownership and role relationships so agents can create their own records and staff can review operational records.
   - Add Zod schemas for ailment, therapy, and appointment request inputs.
   - Add deterministic seed or setup guidance for local MVP smoke testing.

2. Build Ailment Reporting
   - Create an agent-facing ailment report form.
   - Persist ailment reports through the server-side data layer.
   - Add staff-facing submitted ailment report review surfaces.
   - Include empty, loading, and validation-error states.
   - Keep reporting and review screens responsive across mobile, tablet, and desktop.

3. Build Therapy Catalog
   - Create staff flows to create and edit therapy entries.
   - Create agent-facing therapy browsing.
   - Connect therapies to appointment request choices where appropriate.
   - Keep catalog screens responsive and accessible.

4. Build Appointment Requests
   - Allow an agent to request an appointment tied to an ailment and optionally a therapy.
   - Persist appointment requests with an initial requested status.
   - Show request status on the agent dashboard.
   - Validate request inputs with Zod and server-side TypeScript.

5. Build Appointment Triage
   - Allow staff to confirm, reschedule, or cancel appointment requests.
   - Record visible status changes for agents.
   - Keep triage actions explicit and guarded by staff role checks.
   - Add clear success, empty, and error states for staff workflows.

6. Add MVP Navigation And Dashboard Integration
   - Add role-aware dashboard links for ailments, therapies, appointment requests, and triage.
   - Surface next actions clearly on agent and staff dashboards.
   - Preserve the existing Auth.js role gates and App Router structure.
   - Ensure every new screen uses the project styling approach consistently and remains responsive.

7. Add Test Coverage
   - Add Vitest coverage for Zod schemas, status transition helpers, and data utility behavior that can run without production services.
   - Add route or component-level checks where deterministic and practical.
   - Keep tests runnable through `npm run test`.

8. Document And Validate
   - Update README or local developer docs for new database setup, seed data, and MVP smoke-test steps.
   - Run all automated checks in `validation.md`.
   - Complete the full manual role-flow and responsive smoke checklist before merge.

## Dependencies

- Phase 01 and Phase 02 must remain complete and passing.
- PostgreSQL must be available locally or through the documented `DATABASE_URL`.
- Prisma migrations must remain the source of truth for care loop data.
- Auth.js role behavior must continue to support `agent` and `staff`.
- Zod must validate new request, form, and server-action boundaries.
- The MVP must follow `specs/Mission.md` and `specs/tech-stack.md`.

## Completion Definition

The MVP care loop is complete when an authenticated agent can submit an ailment report, browse therapies, request an appointment, and see appointment status, while authenticated staff can review reports, manage therapies, and triage appointment requests. All checks in `validation.md` must pass before merge.
