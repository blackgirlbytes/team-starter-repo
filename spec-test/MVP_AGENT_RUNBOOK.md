# MVP Agent Runbook (Execution)

Follow this sequence exactly for first-run success.

## 1) Prerequisites

- Node 20+
- pnpm 10+
- Docker Desktop running

## 2) Install Dependencies

```bash
pnpm install --no-frozen-lockfile
pnpm prisma:generate
```

## 3) Start Database (Docker Default)

```bash
docker compose up -d
```

Create test DB once:

```bash
docker compose exec -T postgres psql -U postgres -c "CREATE DATABASE calendly_mvp_test;"
```

## 4) Environment

```bash
cp .env.example apps/web/.env.local
```

Ensure values in `apps/web/.env.local`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/calendly_mvp?schema=public"
TEST_DATABASE_URL="postgresql://postgres:postgres@localhost:5432/calendly_mvp_test?schema=public"
SESSION_SECRET="replace-with-a-long-random-value"
API_ORIGIN="http://localhost:3000"
WEB_ORIGIN="http://localhost:3000"
COOKIE_SECURE="false"
SESSION_TTL_DAYS="30"
```

## 5) Migrate + Seed

```bash
pnpm prisma:migrate
```

This must:
- apply migrations to main DB
- seed deterministic demo data

Apply migrations to test DB:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/calendly_mvp_test?schema=public" pnpm --filter web exec prisma migrate deploy
```

Optional reseed:

```bash
pnpm seed
```

## 6) Run App

```bash
pnpm dev
```

Open:
- `http://localhost:3000`
- demo guest booking URL: `http://localhost:3000/book/guestdemo/intro-call`

## 7) Tests

Unit + integration:

```bash
pnpm test:unit
TEST_DATABASE_URL="postgresql://postgres:postgres@localhost:5432/calendly_mvp_test?schema=public" pnpm test:integration
```

Install Playwright browsers once:

```bash
pnpm --filter web exec playwright install
```

E2E:

```bash
pnpm test:e2e
```

## 8) Build Verification

```bash
pnpm lint
pnpm build
```

## Local Postgres Alternative (No Docker)

- start local Postgres
- create `calendly_mvp` and `calendly_mvp_test`
- keep same `.env.local` format and run the same migration/test commands
