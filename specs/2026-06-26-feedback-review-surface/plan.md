# Feedback Review Surface Plan

## 1. Data Model and Status Workflow

1. Add review status support for feedback submissions.
2. Use statuses `new`, `reviewed`, and `archived`.
3. Add a Prisma migration if the feedback table needs a new status field.
4. Keep existing public feedback submission behavior intact.

## 2. Staff Feedback Domain Boundary

1. Add a server-side helper to list feedback submissions for staff.
2. Include private fields needed for review, including email.
3. Add a server action for updating feedback review status.
4. Use Zod validation for status update input.

## 3. Staff Dashboard UI

1. Add a staff-only feedback review page under the existing staff dashboard.
2. Add navigation from the staff dashboard shell or staff overview.
3. Display submitted feedback in a scan-friendly list.
4. Show name, email, message, rating, created date, and current review status.
5. Add status update controls for `new`, `reviewed`, and `archived`.
6. Include empty, success, and basic error states where appropriate.

## 4. Tests and Documentation

1. Add Vitest coverage for review status validation or status transitions.
2. Update README smoke path if the staff review route is added.
3. Keep implementation easy to trace from UI to server action to Prisma.

## 5. Validation and Merge Readiness

1. Run database checks before migration-dependent commands.
2. Run the full validation gate from `validation.md`.
3. Manually smoke test staff-only access and status updates.
4. Update `CHANGELOG.md` before merge.
