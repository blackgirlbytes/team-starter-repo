# MVP Agent Checklist (Gate)

An implementation is not complete until every item passes.

## Product Flows

- [ ] `/` shows both host and guest entry actions
- [ ] host can sign up and log in
- [ ] host can create/update/activate/deactivate event type
- [ ] host can set weekly availability
- [ ] guest can open public page and see slots in selected timezone
- [ ] guest can create booking without account
- [ ] confirmation page shows reusable manage URL
- [ ] host sees booking in dashboard
- [ ] host cancellation works
- [ ] guest cancellation works via `bookingId + token`

## Data + Security

- [ ] session token stored hashed in DB
- [ ] manage token stored hashed in DB
- [ ] no JWT auth
- [ ] state-changing host APIs require valid session
- [ ] server-side request validation is enforced
- [ ] host-level overlap prevention is transaction-safe

## Seed + First Run

- [ ] `pnpm prisma:migrate` produces demo seed data automatically
- [ ] `pnpm seed` is idempotent and documented
- [ ] seeded demo booking URL works immediately: `/book/guestdemo/intro-call`
- [ ] integration tests do not depend on seed data

## Test Coverage

- [ ] unit tests for scheduling + DST edge cases
- [ ] integration tests for required API lifecycle
- [ ] one Playwright E2E happy path passes

## Build + Ops

- [ ] `pnpm lint` passes
- [ ] `pnpm build` passes
- [ ] env vars documented in `.env.example`
- [ ] README documents Docker quickstart and local alternative
