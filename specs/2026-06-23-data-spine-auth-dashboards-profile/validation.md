# Phase 02 - Data Spine, Auth, Dashboards, and Profile Validation

This file defines how to verify the implementation can be merged.

## Automated Checks

- `npm install` completes without errors after dependency changes.
- `npm run format` completes without breaking the project.
- `npm run format:check` passes.
- `npm run lint` passes.
- `npm run test` passes with Vitest unit tests.
- `npm run build` passes.
- TypeScript compiles cleanly as part of the Next.js build.
- Prisma schema validation passes.
- Prisma migration commands required for this phase complete successfully against the documented local PostgreSQL setup.
- PicoCSS dependency is installed and its stylesheet is imported by the app.

## Unit Test Expectations

- Vitest covers role helper behavior for `agent` and `staff`.
- Vitest covers validation schemas introduced for auth, profile, or server boundaries.
- Vitest covers data/auth utility behavior that can be tested without relying on production services.
- Tests must be deterministic and runnable through `npm run test`.

## Functional Validation

- PostgreSQL connection is configured through documented environment variables.
- Prisma can apply or verify the initial migration.
- Auth.js login flow is reachable.
- Auth screens render with PicoCSS baseline styling.
- Authenticated `agent` users can access the agent dashboard shell.
- Authenticated `staff` users can access the staff dashboard shell.
- Dashboard shells use PicoCSS layout primitives where appropriate.
- Role-specific access behavior does not expose the wrong dashboard shell.
- Agent profile details render for an authenticated agent.
- Agent profile view uses PicoCSS layout primitives where appropriate.

## Responsive Validation

- Auth screens remain usable at mobile, tablet, and desktop widths.
- Agent dashboard shell does not overlap content at mobile, tablet, or desktop widths.
- Staff dashboard shell does not overlap content at mobile, tablet, or desktop widths.
- Agent profile view remains readable and navigable at mobile, tablet, and desktop widths.
- PicoCSS defaults do not conflict with any project-specific responsive styling.

## Manual Smoke Test Checklist

- Start the app locally with the documented environment variables.
- Visit the login flow and confirm the page loads without server or hydration errors.
- Sign in as or simulate an `agent` user and confirm the agent dashboard shell appears.
- Sign in as or simulate a `staff` user and confirm the staff dashboard shell appears.
- Open the agent profile view and confirm profile details render.
- Resize or inspect the auth, dashboard, and profile screens at mobile, tablet, and desktop widths.
- Confirm PicoCSS styling is visibly applied to forms, navigation, and content surfaces.
- Confirm terminal output does not show unexpected runtime errors during smoke testing.

## Merge Gate

- All automated checks pass.
- Required Vitest unit tests are present and passing.
- TypeScript compiles cleanly.
- Manual smoke test checklist is complete.
- Responsive behavior is verified for all new user-facing screens.
- Scope remains limited to data spine, auth, dashboard shells, and agent profile.
