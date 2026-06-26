# Feedback Form Plan

## 1. Data Model and Persistence

1. Add a Prisma model for public feedback submissions.
2. Include fields for name, email, message text, rating, created timestamp, and updated timestamp.
3. Add a migration for the feedback table.
4. Update seed or local data only if useful for smoke testing the review flow later.

## 2. Validation and Server Boundary

1. Create a Zod schema for feedback form input.
2. Validate name, email, text area content, and rating from 1 to 5.
3. Add a server action or route handler that writes valid feedback to PostgreSQL.
4. Return clear success and failure states for the form UI.

## 3. Public Feedback UI

1. Add a public feedback form page or section.
2. Use placeholder copy for name, email, text area, and rating.
3. Keep the tone satirical but the form labels direct and accessible.
4. Make the form responsive across mobile, tablet, and desktop widths.

## 4. Tests and Documentation

1. Add Vitest coverage for the feedback validation schema or domain helper.
2. Update README notes if a new route or smoke path is introduced.
3. Confirm the implementation follows the current Next.js, Prisma, Zod, and PicoCSS/Tailwind conventions.

## 5. Merge Readiness

1. Run database setup checks before migration-dependent commands.
2. Run the full validation gate from `validation.md`.
3. Update `CHANGELOG.md` before merging.
