# Phase 01 - Project Bootstrap Validation

This file defines how to verify each task in `plan.md`.

## Task 1 - Initialize Base Project

### Validation Checklist

- `npm install` finishes without errors.
- `npm run dev` starts successfully.
- App loads in browser without startup errors.
- Project uses App Router structure (for example, `app/` entry layout and page files).
- TypeScript configuration files are present and valid.

## Task 2 - Configure Styling Foundation

### Validation Checklist

- Tailwind packages are installed.
- Tailwind configuration is present and linked to source content paths.
- Global stylesheet includes Tailwind directives.
- A page renders visible Tailwind styling (for example spacing, typography, or color utility classes).

## Task 3 - Configure Linting and Formatting

### Validation Checklist

- `npm run lint` executes successfully.
- `npm run format:check` executes successfully.
- `npm run format` can format files without breaking the project.
- ESLint and Prettier config files are committed and readable.

## Task 4 - Document Local Developer Workflow

### Validation Checklist

- `README.md` includes install and run instructions.
- `README.md` includes lint and format instructions.
- Commands documented in README match scripts available in `package.json`.

## Task 5 - Build Minimal AgentClinic Home Page

### Validation Checklist

- Visiting `/` renders a minimal AgentClinic home page.
- Page includes a clear AgentClinic heading/title.
- Page includes a short product description sentence.
- Page includes a basic call-to-action element (button or link placeholder).
- Page styling uses Tailwind utility classes and renders correctly.

## Final Phase Gate

Before closing Phase 01, confirm:

- All validation checklists above pass.
- No out-of-scope tooling (hooks, CI, aliases) was added.
- Scope remains limited to bootstrap foundations plus the minimal home page.
