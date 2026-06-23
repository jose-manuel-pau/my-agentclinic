# AgentClinic Technical Stack Constitution

## Stack Goals

- Popular and reliable TypeScript ecosystem.
- Fast team onboarding and maintainable architecture.
- Strong support for dashboard-oriented interfaces.
- Modern browser compatibility by default.

## Recommended Stack

- **Framework Recommendation:** Next.js (App Router), using server-side TypeScript as the default execution model for backend logic.
- **Frontend:** React + TypeScript, with Server Components where useful for fast dashboard rendering.
- **UI System:** Tailwind CSS + component primitives (accessible, consistent dashboards)
- **Backend:** Server-side TypeScript in Next.js route handlers and server actions; keep clear service boundaries for future extraction.
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Auth:** Auth.js (NextAuth) with role support for `agent` and `staff`
- **Validation:** Zod for shared input schemas
- **Testing:** Vitest configured in `vitest.config.ts` for unit and validation checks via `npm run test`; Playwright for future end-to-end coverage.
- **Deployment:** Vercel (app) + managed PostgreSQL

## Why This Matches Stakeholder Input

- **Mary:** Server-side TypeScript with a mainstream framework keeps reliability high and maintenance costs predictable.
- **Susan:** Strong data model and API ergonomics support agents/ailments/therapies/bookings features.
- **Steve:** Next.js + modern UI stack supports polished, high-performing browser experiences.

## Baseline Architecture

1. Role-aware dashboards (`agent`, `staff`) as primary entry points.
2. Domain modules:
   - Agents
   - Ailments
   - Therapies
   - Appointments
3. Shared schema validation at API boundaries.
4. Audit-friendly booking state transitions (requested, confirmed, completed, cancelled).

## Server-Side TypeScript Policy

- Business rules run on the server by default.
- Client code focuses on presentation and interaction.
- API contracts and domain schemas are typed end-to-end using TypeScript + Zod.

## Browser Support Policy

- Support latest two versions of major evergreen browsers: Chrome, Edge, Firefox, Safari.
- Graceful degradation for non-critical visual enhancements.
