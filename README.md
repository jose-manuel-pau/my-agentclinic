# AgentClinic

AgentClinic is a Next.js application for agent healthcare workflows.

## Local Development

### Prerequisites

- Node.js 20.9.0 or newer
- npm
- PostgreSQL for Prisma-backed local data
- Docker Desktop, if you want to use the included local PostgreSQL container

### Install

```bash
npm install
```

Copy `.env.example` to `.env.local` and set `DATABASE_URL` if your PostgreSQL connection differs
from the documented local default. Keep `NEXTAUTH_SECRET` stable between local runs; changing it
invalidates existing NextAuth session cookies and requires signing in again.

### Run

```bash
npm run dev
```

The app runs at `http://localhost:3000` by default.

Public pages:

- Feedback form: `http://localhost:3000/feedback`

Demo login accounts:

- Agent: `agent@agentclinic.local` / `agent-demo`
- Staff: `staff@agentclinic.local` / `staff-demo`

### Data Setup

```bash
npm run db:start
npm run db:create
npm run db:check
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

The MVP care loop runs in database-backed mode. A migrated PostgreSQL database and seeded smoke-test
data are required for MVP validation.

`npm run db:start` uses the included Docker Compose service. If Docker is not installed, start a
local PostgreSQL server manually and make sure `DATABASE_URL` points at it before running migrations.
If PostgreSQL is already running but the `agentclinic` database does not exist yet, run
`npm run db:create`.

### MVP Care Loop Smoke Path

1. Run migrations and seed data with `npm run prisma:migrate` and `npm run prisma:seed`.
2. Sign in as the demo agent and open `/dashboard/agent/ailments`.
3. Submit and edit an ailment report.
4. Open `/dashboard/agent/therapies` and review available therapies.
5. Open `/dashboard/agent/appointments` and request an appointment tied to the ailment.
6. Sign in as the demo staff user and open `/dashboard/staff/agents`.
7. Confirm all seeded agents are visible.
8. Open `/dashboard/staff/ailments` and review the submitted ailment report.
9. Open `/dashboard/staff/therapies` and create or edit a therapy entry.
10. Open `/dashboard/staff/appointments` and confirm, reschedule, or cancel the request with a date.
11. Return to the agent appointment page and confirm the status is visible.
12. As the agent, cancel an owned appointment request.
13. Resize the ailment, therapy, appointment, and triage screens at mobile, tablet, and desktop widths.

### Feedback Form Smoke Path

1. Open `/feedback`.
2. Confirm the form displays name, email, message, and rating controls.
3. Submit invalid feedback and confirm validation feedback appears.
4. Submit valid placeholder-style feedback and confirm the success message appears.
5. Confirm the submission exists in PostgreSQL.
6. Resize the form at mobile, tablet, and desktop widths.

### Quality Checks

```bash
npm run prisma:generate
npm run db:check
npm run prisma:seed
npm run prisma:validate
npm run lint
npm run test
npm run build
npm run format:check
```

### Format Files

```bash
npm run format
```

## Input from stakeholders

- Mary in engineering wants a reliable site with a popular stack based on TypeScript, giving agents and staff a dashboard for easy access.
- Susan in product has a set of features about agents and their ailments, therapies, and booking appointments.
- Steve in marketing wants an attractive site that works well with a modern browser.
