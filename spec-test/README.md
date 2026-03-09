# Calendly-like MVP (Next.js + Prisma + Postgres)

This repository contains a working MVP scheduling product with:

- a root entry page (`/`) for both host and guest actions
- host signup/login/logout using server-side sessions in Postgres
- host profile management (username, display name, timezone)
- event type CRUD (one-on-one only), activation/deactivation
- weekly availability CRUD
- public booking page with timezone-aware slot display
- guest booking without account
- booking confirmation with reusable guest management link
- host and guest cancellation flows
- unit, integration, and E2E tests for critical paths

## Agent Docs

- `MVP_AGENT_SPEC.md`: concise implementation contract (what must be true)
- `MVP_AGENT_RUNBOOK.md`: first-run execution steps (how to run/build/test)
- `MVP_AGENT_CHECKLIST.md`: completion gates before claiming done

## Stack

- Next.js `16.x` + React `19.x` + TypeScript
- Route Handlers for API (`app/api/**/route.ts`)
- Prisma + Postgres
- `argon2` password hashing
- `Luxon` timezone logic
- `Vitest` + `Playwright`

## Project Structure

- `apps/web`: Next.js app + API route handlers + Prisma schema + tests
- `MVP_AGENT_SPEC.md`: implementation contract for future agents

## Prerequisites

- Node 20+
- pnpm 10+
- Postgres 14+ (local install) OR optional Docker

## Quick Start (Docker Postgres Recommended)

1. Install dependencies:

```bash
pnpm install
```

2. Start Postgres:

```bash
docker compose up -d
```

3. Create the test database in the container:

```bash
docker compose exec -T postgres psql -U postgres -c "CREATE DATABASE calendly_mvp_test;"
```

4. Create env file:

```bash
cp .env.example apps/web/.env.local
```

5. Ensure `apps/web/.env.local` has:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/calendly_mvp?schema=public"
TEST_DATABASE_URL="postgresql://postgres:postgres@localhost:5432/calendly_mvp_test?schema=public"
SESSION_SECRET="replace-with-a-long-random-value"
API_ORIGIN="http://localhost:3000"
WEB_ORIGIN="http://localhost:3000"
COOKIE_SECURE="false"
SESSION_TTL_DAYS="30"
```

6. Run Prisma migrations and generate client:

```bash
pnpm prisma:generate
pnpm prisma:migrate
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/calendly_mvp_test?schema=public" pnpm --filter web exec prisma migrate deploy
```

`pnpm prisma:migrate` now also runs seed data generation automatically.

7. Install Playwright browsers (one-time):

```bash
pnpm --filter web exec playwright install
```

8. Start app:

```bash
pnpm dev
```

9. Open:

- app: `http://localhost:3000`
- signup: `http://localhost:3000/signup`

## Local Setup (No Docker)

1. Install and start local Postgres.
2. Create databases:

```bash
createdb calendly_mvp
createdb calendly_mvp_test
```

3. Use the same `.env.local` values shown above.

## Scripts

From repository root:

- `pnpm dev` - start Next.js dev server
- `pnpm build` - production build
- `pnpm start` - start production server
- `pnpm test` - unit + integration tests
- `pnpm test:unit` - scheduling unit tests
- `pnpm test:integration` - API integration tests
- `pnpm test:e2e` - Playwright happy-path test
- `pnpm prisma:generate` - generate Prisma client
- `pnpm prisma:migrate` - apply/create migrations
- `pnpm prisma:studio` - open Prisma Studio

## Test Configuration

Integration tests use `TEST_DATABASE_URL` if provided. Otherwise they fallback to `DATABASE_URL`.

Recommended for local testing:

```bash
export TEST_DATABASE_URL="postgresql://postgres:postgres@localhost:5432/calendly_mvp_test?schema=public"
```

Before running integration tests, run migrations against the test DB too.

## MVP Verification Checklist

1. Open `/` and verify host + guest actions are visible.
2. Sign up as host at `/signup` (or from `/` link).
3. Create event type at `/app/event-types`.
4. Set weekly availability at `/app/availability`.
5. Use `/` guest entry (username + slug) or open `/book/:username/:eventSlug`.
6. Book a slot as guest.
7. Confirm booking appears in `/app/bookings`.
8. Cancel as host from `/app/bookings`.
9. Book again and cancel as guest via `/bookings/:bookingId/manage?token=...`.

## Notes

- Session and guest management tokens are opaque random tokens; only hashes are stored in Postgres.
- Slot generation and availability are timezone-aware and DST-safe using Luxon.
- Booking conflicts are enforced at host-level inside serializable transactions.
- Next.js `16` dynamic route handlers use async `context.params` (`await context.params`).
- Client pages for dynamic routes should use `useParams()` instead of reading `params` directly.

## Seeded Demo Data

After `pnpm prisma:migrate`, initial demo data is generated:

- host username: `guestdemo`
- host email: `guestdemo@example.com`
- host password: `password123`
- guest booking URL: `/book/guestdemo/intro-call`

You can also run this manually:

```bash
pnpm seed
```
