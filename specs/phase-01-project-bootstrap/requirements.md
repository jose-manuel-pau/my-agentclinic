# Phase 01 - Project Bootstrap Requirements

## Objective

Establish a minimal, production-ready baseline so upcoming nano phases can focus on feature delivery instead of tooling setup.

## Functional Requirements

- The project must use Next.js with App Router.
- App Router files must live under `src/app`.
- The codebase must use TypeScript.
- The project must use npm as the package manager.
- Tailwind CSS must be configured and active in the application.
- ESLint must be configured and runnable.
- Prettier must be configured and runnable.
- Vitest must be configured through `vitest.config.ts` and runnable for validation-oriented tests.
- The root route (`/`) must provide a minimal AgentClinic home page with core branding text and a basic call-to-action.

## Non-Functional Requirements

- Setup should remain intentionally small and fast to implement.
- Tooling choices must be stable and common in the TypeScript ecosystem.
- The baseline should be easy for new contributors to run locally.

## Out of Scope

- Husky and lint-staged hooks.
- CI pipeline configuration.
- Custom path aliases beyond default framework behavior.
- Any domain feature implementation (auth, data model, dashboards, workflows).

## Deliverables

- A working Next.js + TypeScript scaffold.
- Tailwind wired into the default app styles.
- ESLint and Prettier configuration present and usable.
- Vitest installed with `vitest.config.ts`, a runnable `npm run test` script, and at least one baseline test.
- A minimal AgentClinic home page implemented at `/` with Tailwind styling.
- Basic README instructions for install, run, lint, test, and format commands.

## Confirmed Decisions

- Framework: Next.js (App Router)
- Language: TypeScript
- Package manager: npm
- Linting/formatting: ESLint + Prettier
- Testing: Vitest
- Styling: Tailwind CSS
- Extras: none for this phase
