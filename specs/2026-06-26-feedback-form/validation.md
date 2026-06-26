# Feedback Form Validation

## Automated Checks

Run these before merge:

```bash
npm run db:check
npm run prisma:validate
npm run lint
npm run test
npm run build
npm run format:check
```

If the Prisma schema changes, also run:

```bash
npm run prisma:migrate
```

If seed data changes, also run:

```bash
npm run prisma:seed
```

## Functional Smoke Test

1. Start the app with `npm run dev`.
2. Open the public feedback form route.
3. Confirm the form displays name, email, text area, and rating controls.
4. Submit invalid input and confirm it does not persist.
5. Submit valid placeholder-style input and confirm the success state appears.
6. Confirm the submission exists in PostgreSQL.
7. Refresh the page and confirm the form remains usable.

## Responsive Smoke Test

Check the feedback form at:

- Mobile width.
- Tablet width.
- Desktop width.

Confirm:

- Labels and controls do not overlap.
- Text remains readable.
- The rating control is easy to use.
- Submit and feedback states are visible without awkward horizontal scrolling.

## Merge Criteria

- Feedback submissions persist to PostgreSQL.
- Invalid feedback is rejected before persistence.
- Vitest covers validation or domain behavior.
- Build, lint, tests, Prisma validation, and formatting pass.
- The feature remains aligned with `mission.md`, `tech-stack.md`, and `roadmap.md`.
- `CHANGELOG.md` is updated before merge.
