# Phase 02 - Data Spine, Auth, Dashboards, and Profile Requirements

## Objective

Establish the first usable application foundation after bootstrap: persistent data access, authenticated roles, responsive dashboard shells, and a basic agent profile view.

## Scope

- Configure PostgreSQL as the application database.
- Add Prisma as the ORM with initial migrations.
- Implement Auth.js authentication flow.
- Add role support for `agent` and `staff`.
- Create responsive dashboard shells for agent and staff users.
- Create a basic agent profile view.
- Use PicoCSS for Phase 02 user-facing UI styling, including auth, dashboard, and profile screens.

## Functional Requirements

- The application must connect to PostgreSQL through Prisma.
- Prisma schema and migrations must define the initial data spine required for users, roles, and agent profile access.
- Auth.js must provide a login flow compatible with the Next.js App Router.
- Authenticated users must have one of two roles: `agent` or `staff`.
- Agent users must be routed to or able to access an agent dashboard shell.
- Staff users must be routed to or able to access a staff dashboard shell.
- Agent users must be able to view their profile details.
- Shared validation should use Zod where request or form boundaries are introduced.
- Auth, dashboard, and profile screens should use PicoCSS primitives and conventions for baseline styling instead of introducing new Tailwind-first page styling in this phase.
- User-facing screens must remain responsive across mobile, tablet, and desktop viewports.

## Non-Functional Requirements

- Keep implementation small enough for one nano phase.
- Favor server-side TypeScript for business rules and data access.
- Keep role-aware behavior explicit and easy to test.
- Avoid adding CI, hooks, or unrelated platform tooling.
- Preserve maintainable Next.js App Router structure under `src/app`.

## Decisions

- Database: PostgreSQL.
- ORM: Prisma.
- Authentication: Auth.js.
- Validation: Zod for API, form, or server action boundaries introduced in this phase.
- Roles: `agent` and `staff`.
- Testing: Vitest unit tests through `npm run test`.
- UI: PicoCSS for responsive, mobile-first auth, dashboard, and profile layouts; existing Phase 01 Tailwind bootstrap styling may remain in place.

## Out Of Scope

- Appointment booking workflows.
- Ailment reporting forms.
- Therapy catalog management.
- In-app notification delivery.
- Production deployment configuration.
- End-to-end Playwright coverage unless needed as a lightweight local smoke aid.

## Deliverables

- Prisma dependency and schema setup.
- Initial migration for the phase data model.
- Auth.js configuration and login route/page or equivalent flow.
- Role-aware dashboard shells for `agent` and `staff`.
- Agent profile view.
- PicoCSS dependency and stylesheet import wired into the app.
- Vitest unit tests for role/data/auth helper behavior introduced in this phase.
- Updated local documentation if new environment variables or commands are required.
