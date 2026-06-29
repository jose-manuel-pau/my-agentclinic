# Vercel PostgreSQL Deployment Options

Date: 2026-06-29
Status: Backlog

## Context

AgenticClinic needs a database approach that provides:

- Native PostgreSQL for local development on Windows without Docker Desktop.
- Strong production scalability and reliability.
- Vercel-native provisioning and environment-variable integration.
- Control over the production infrastructure where practical.
- Portability through standard PostgreSQL and Prisma migrations.

## Recommended Direction

Use native PostgreSQL locally and Amazon Aurora PostgreSQL in production through the Vercel Marketplace.

Aurora provides the strongest match for scale, reliability, and infrastructure control. Vercel can provision or connect the AWS database, inject credentials into the project, and place the application and database in compatible AWS regions.

Reference: [AWS databases on the Vercel Marketplace](https://vercel.com/blog/aws-databases-are-now-live-on-the-vercel-marketplace-and-v0)

Aurora remains a managed database service. Owning the AWS account and configuration provides substantial control, but fully self-hosted PostgreSQL is not a Vercel-native offering.

## Alternatives

### Neon

Neon offers the strongest general-purpose Vercel developer experience, including autoscaling, connection pooling, database branching, read replicas, and recovery features. It requires less administration than Aurora and may be more economical during the MVP stage.

Reference: [Neon for Vercel](https://vercel.com/marketplace/neon)

### Supabase

Supabase provides managed PostgreSQL with serverless connection pooling, authentication, storage, realtime features, and row-level security. It is a good option when those additional platform services are required, but they overlap with parts of the existing AgenticClinic stack.

Reference: [Supabase PostgreSQL connection guidance](https://supabase.com/docs/guides/database/connecting-to-postgres)

### Self-Hosted PostgreSQL

PostgreSQL hosted on a VPS offers maximum control but is not Vercel-native. The project would need to own high availability, backups, upgrades, TLS, network security, monitoring, and connection pooling. This option is not recommended for AgenticClinic.

## Development And Deployment Model

Use the same PostgreSQL schema and committed Prisma migrations in every environment.

```env
# Local development
DATABASE_URL=postgresql://postgres:password@localhost:5432/agentclinic
DIRECT_URL=postgresql://postgres:password@localhost:5432/agentclinic

# Vercel production
DATABASE_URL=<pooled-production-connection>
DIRECT_URL=<direct-production-connection>
```

- `DATABASE_URL` is used by the running application and should use a pooled production endpoint.
- `DIRECT_URL` is used for Prisma migrations and administrative operations.
- Local development continues to use native PostgreSQL on Windows.

## Proposed Decision

Evaluate Aurora PostgreSQL pricing and operational requirements before implementation. If Aurora is excessive for the current traffic and budget, use Neon through the Vercel Marketplace while preserving the same Prisma schema and migration workflow.
