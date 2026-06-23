# Phase 01 - Project Bootstrap Validation

This file defines how to verify each task in `plan.md`.

## Task 1 - Initialize Base Project

### Validation Checklist

- `npm install` finishes without errors.
- `npm run dev` starts successfully.
- App loads in browser without startup errors.
- Project uses App Router structure under `src/app` with entry layout and page files.
- TypeScript configuration files are present and valid.

## Task 2 - Configure Styling Foundation

### Validation Checklist

- Tailwind packages are installed.
- Tailwind configuration is present and linked to source content paths.
- Global stylesheet includes Tailwind directives.
- A page renders visible Tailwind styling (for example spacing, typography, or color utility classes).
- Responsive utility classes or CSS rules are present for mobile-first layout behavior.

## Task 3 - Configure Linting and Formatting

### Validation Checklist

- `npm run lint` executes successfully.
- `npm run test` executes successfully.
- `npm run format:check` executes successfully.
- `npm run format` can format files without breaking the project.
- ESLint, Prettier, and `vitest.config.ts` setup are committed and readable.

## Task 4 - Document Local Developer Workflow

### Validation Checklist

- `README.md` includes install and run instructions.
- `README.md` includes lint, test, and format instructions.
- Commands documented in README match scripts available in `package.json`.

## Task 5 - Build Minimal AgentClinic Home Page

### Validation Checklist

- Visiting `/` renders a minimal AgentClinic home page.
- Page includes a clear AgentClinic heading/title.
- Page includes a short product description sentence.
- Page includes a basic call-to-action element (button or link placeholder).
- Page styling uses Tailwind utility classes and renders correctly.
- Page and layout remain usable without content overlap at mobile, tablet, and desktop widths.
- Baseline Vitest coverage validates the reusable layout exports and confirms `/` responds with an HTML content type.

## Final Phase Gate

Before closing Phase 01, confirm:

- All validation checklists above pass.
- No out-of-scope tooling (hooks, CI, aliases) was added.
- Scope remains limited to bootstrap foundations plus the minimal home page.
- Responsive design expectations are documented for future user-facing features.
