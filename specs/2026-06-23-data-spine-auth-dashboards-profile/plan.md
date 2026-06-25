# Phase 02 - Data Spine, Auth, Dashboards, and Profile Plan

## Task Groups

1. Configure Data Foundation
   - Add Prisma and PostgreSQL client dependencies.
   - Define the initial Prisma schema for users, roles, and agent profile data.
   - Add environment variable documentation for the PostgreSQL connection string.
   - Create and verify the initial migration.

2. Implement Authentication And Roles
   - Add Auth.js configuration for the App Router.
   - Implement the login flow.
   - Style the login experience with PicoCSS form and layout primitives.
   - Model role values as `agent` and `staff`.
   - Add server-side helpers for reading the current session and role.
   - Add Zod validation at any new request, form, or server action boundary.

3. Build Responsive Dashboard Shells
   - Add PicoCSS and import its stylesheet through the app styling entry point.
   - Create an agent dashboard shell.
   - Create a staff dashboard shell.
   - Use PicoCSS containers, grids, cards, navigation, and form styles where they fit.
   - Add responsive navigation and layout behavior for mobile, tablet, and desktop.
   - Ensure role-aware access behavior is explicit and testable.

4. Build Agent Profile View
   - Create an agent profile route or dashboard section.
   - Load profile details from the data spine.
   - Render profile content in a responsive PicoCSS-based layout.
   - Provide loading, empty, or fallback states where appropriate.

5. Add Unit Test Coverage
   - Add Vitest unit tests for role helpers, validation schemas, and data/auth utilities introduced in this phase.
   - Keep tests deterministic and independent of a live production database.
   - Ensure TypeScript test files compile cleanly.

6. Document And Validate
   - Update README or local developer docs with new environment variables and setup steps.
   - Run the validation checklist in `validation.md`.
   - Complete the manual smoke test checklist before merge.

## Dependencies

- Phase 01 must remain complete and passing.
- PostgreSQL must be available locally or through a documented connection string.
- Auth.js and Prisma choices must follow `specs/tech-stack.md`.
- PicoCSS is the selected Phase 02 UI baseline even though Phase 01 used Tailwind for bootstrap styling.

## Completion Definition

Phase 02 is complete when data access, authentication, role-aware dashboard shells, and the agent profile view are implemented and all checks in `validation.md` pass.
