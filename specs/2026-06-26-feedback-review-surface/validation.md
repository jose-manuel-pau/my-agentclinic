# Feedback Review Surface Validation

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
npm run prisma:generate
```

If seed data changes, also run:

```bash
npm run prisma:seed
```

## Functional Smoke Test

1. Start the app with `npm run dev`.
2. Submit public feedback through `/feedback`.
3. Sign in as staff.
4. Open the staff feedback review route.
5. Confirm the submitted feedback appears with name, email, message, rating, date, and status.
6. Change status from `new` to `reviewed`.
7. Confirm the updated status persists after refresh.
8. Change status to `archived`.
9. Confirm archived status persists after refresh.
10. Sign in as agent and confirm staff feedback review is not accessible.
11. Confirm `/feedback` still works for public submissions.

## Responsive Smoke Test

Check the staff feedback review page at:

- Mobile width.
- Tablet width.
- Desktop width.

Confirm:

- Feedback cards or rows remain readable.
- Status controls do not overlap message text.
- Email and long messages wrap cleanly.
- Empty and populated states are both usable.

## Merge Criteria

- Staff can review all feedback submissions.
- Staff can update feedback status to `new`, `reviewed`, and `archived`.
- Non-staff users cannot access the review surface.
- Public feedback form and public feedback wall keep working.
- Email remains hidden from the public feedback wall.
- Vitest covers validation or status behavior.
- DB check, Prisma validation, lint, tests, build, and format checks pass.
- `CHANGELOG.md` is updated before merge.
