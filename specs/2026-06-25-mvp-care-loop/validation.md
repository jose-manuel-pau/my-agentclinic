# MVP Care Loop Validation

This file defines how to verify the MVP care loop can be merged.

## Automated Checks

- `npm install` completes without errors after dependency changes.
- `npm run format` completes without breaking the project.
- `npm run format:check` passes.
- `npm run lint` passes.
- `npm run test` passes with Vitest unit tests.
- `npm run build` passes.
- TypeScript compiles cleanly as part of the Next.js build.
- Prisma schema validation passes with `npm run prisma:validate`.
- Prisma client generation passes with `npm run prisma:generate`.
- Prisma migration commands required for this MVP complete successfully against the documented local PostgreSQL setup.
- Seed data command completes successfully against the documented local PostgreSQL setup.
- Existing Phase 01 and Phase 02 behavior remains covered and passing.

## Unit Test Expectations

- Vitest covers ailment report validation schemas.
- Vitest covers therapy catalog validation schemas.
- Vitest covers appointment request validation schemas.
- Vitest covers appointment status transition rules for `requested -> confirmed/rescheduled/cancelled`.
- Vitest covers role-aware authorization helpers for agent-only and staff-only MVP paths.
- Tests remain deterministic and do not require production services.
- Test files compile cleanly through the standard test and build commands.

## Functional Validation

- PostgreSQL connection is configured through documented environment variables.
- Prisma migrations apply cleanly to a local development database.
- Authenticated `agent` users can access agent care loop screens.
- Authenticated `staff` users can access staff care loop screens.
- Agents can create ailment reports.
- Agents can edit their own ailment reports.
- Agents can view their own ailment reports.
- Staff can view submitted ailment reports.
- Staff can view all agents.
- Staff can create therapy entries.
- Staff can edit therapy entries.
- Agents can browse therapy entries.
- Agents can request appointments tied to their ailment reports.
- Appointment requests can reference a therapy when selected.
- New appointment requests appear with requested status.
- Staff can confirm appointment requests.
- Staff can reschedule appointment requests.
- Staff can cancel appointment requests.
- Appointment confirm, reschedule, and cancel actions require a date.
- Agents can cancel their own appointment requests.
- Agents can see updated appointment status.
- Therapy selection remains optional for appointment requests.
- Role-specific access behavior does not expose the wrong dashboard shell, list, form, or action.
- Invalid form submissions use browser-native validation for the MVP.
- Authenticated app screens render in light mode.

## Responsive Validation

- Agent ailment reporting remains usable at mobile, tablet, and desktop widths.
- Staff ailment review remains scannable at mobile, tablet, and desktop widths.
- Therapy catalog management remains usable at mobile, tablet, and desktop widths.
- Agent therapy browsing remains readable at mobile, tablet, and desktop widths.
- Appointment request flow remains usable at mobile, tablet, and desktop widths.
- Staff triage screens do not overlap controls or truncate critical status content at mobile, tablet, or desktop widths.
- Dashboard navigation wraps, stacks, or scrolls predictably without hiding required actions.
- Form labels, inputs, buttons, status badges, and tables or lists remain legible and reachable.

## Manual Smoke Test Checklist

- Start the app locally with documented environment variables, a migrated PostgreSQL database, and seeded smoke-test data.
- Sign in as an `agent` user and confirm the agent dashboard loads without hydration or runtime errors.
- Sign in as a `staff` user and confirm the staff dashboard loads without hydration or runtime errors.
- As an agent, create an ailment report.
- As staff, find the submitted ailment report.
- As staff, confirm all seeded agents are visible.
- As staff, create a therapy entry.
- As staff, edit the therapy entry.
- As an agent, browse the therapy catalog and confirm the therapy appears.
- As an agent, request an appointment tied to the ailment report and therapy.
- As staff, confirm the appointment request.
- As an agent, confirm the request status changes to confirmed.
- As staff, reschedule an appointment request and confirm the agent-visible status updates.
- As staff, cancel an appointment request and confirm the agent-visible status updates.
- As an agent, cancel an owned appointment request.
- Confirm each appointment state change captured or required a date.
- Attempt at least one agent-only URL as staff and one staff-only URL as agent; confirm role-aware redirection or denial.
- Resize or inspect every new screen at mobile, tablet, and desktop widths.
- Confirm terminal output does not show unexpected runtime errors during smoke testing.

## Merge Gate

- All automated checks pass.
- Required Vitest coverage is present and passing.
- Prisma migrations have been applied or verified against the documented local PostgreSQL setup.
- Seed data has been applied or verified against the documented local PostgreSQL setup.
- TypeScript compiles cleanly.
- Manual role-flow smoke testing is complete.
- Responsive behavior is verified for all new MVP screens.
- Scope remains limited to the MVP care loop.
- Any known validation gaps are documented before merge.
