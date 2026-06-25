# AgentClinic

AgentClinic is a Next.js application for agent healthcare workflows.

## Local Development

### Prerequisites

- Node.js 20.9.0 or newer
- npm
- PostgreSQL for Prisma-backed local data

### Install

```bash
npm install
```

Copy `.env.example` to `.env.local` and set `DATABASE_URL`, `NEXTAUTH_SECRET`, and
`NEXTAUTH_URL`.

### Run

```bash
npm run dev
```

The app runs at `http://localhost:3000` by default.

Demo login accounts:

- Agent: `agent@agentclinic.local` / `agent-demo`
- Staff: `staff@agentclinic.local` / `staff-demo`

### Data Setup

```bash
npm run prisma:generate
npm run prisma:migrate
```

### Quality Checks

```bash
npm run prisma:validate
npm run lint
npm run test
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
