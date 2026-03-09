# Calendly Clone MVP Spec (Contract)

This file is the normative product/engineering contract.

Use alongside:
- `MVP_AGENT_RUNBOOK.md` for setup and execution steps.
- `MVP_AGENT_CHECKLIST.md` for release gates.

If something is unspecified, choose the simplest secure implementation that keeps future calendar integration feasible.

## Product Goal

Deliver a working Calendly-like MVP where:
- hosts can sign up/login, configure event types and weekly availability, and manage bookings
- guests can book without accounts, receive a reusable management link, and cancel bookings

## Locked Architecture

- Stack:
  - Postgres
  - Prisma
  - Next.js `16.x` + React `19.x` + TypeScript
- Frontend:
  - Next.js App Router
- Backend:
  - Next.js Route Handlers (`app/api/**/route.ts`), Node runtime
  - no separate Express service
- Auth:
  - server-side sessions in Postgres
  - opaque session cookie (`httpOnly`, `sameSite=lax`, `secure` in production)
  - database stores session token hash only
  - no JWT
- Event model:
  - one-on-one only
- Deployment shape:
  - single Next.js app deployment

## Scope

### In Scope
- host signup/login/logout/session
- host profile fields: username, display name, timezone
- event type CRUD + activate/deactivate
- weekly availability CRUD (recurring weekly rules only)
- public booking page: `/book/:username/:eventSlug`
- slot generation with timezone support
- guest booking (name/email/timezone only)
- confirmation page with reusable manage link
- host bookings list + host cancellation
- guest manage + guest cancellation via tokenized link

### Out of Scope
- OAuth/social login
- external calendars, email delivery, video integrations
- rescheduling
- team/round-robin/collective scheduling
- advanced constraints (buffers, min notice, date overrides, booking limits)
- public APIs/webhooks, widgets, mobile apps

## Required Routes

- `/` host + guest entry page
- `/signup`, `/login`
- `/app`, `/app/event-types`, `/app/availability`, `/app/bookings`
- `/book/:username/:eventSlug`
- `/booking-confirmation/:bookingId`
- `/bookings/:bookingId/manage`

## Functional Defaults

- slot window: next 30 days
- slot increment: event duration
- duration: positive multiples of 15 minutes
- cancellation allowed until booking start time
- cannot book in the past
- canceled bookings do not block slots
- confirmed bookings block overlapping times for same host across all event types

## Data Model Minimum

- `User`: `id`, `email` unique, `passwordHash`, `username` unique, `displayName`, `timezone`, timestamps
- `Session`: `id`, `userId`, `tokenHash` unique, `expiresAt`, timestamps
- `EventType`: `id`, `hostId`, `title`, `slug`, `description?`, `durationMinutes`, `active`, timestamps, unique(`hostId`,`slug`)
- `AvailabilityRule`: `id`, `userId`, `dayOfWeek(0-6)`, `startMinute`, `endMinute`, timestamps
- `Booking`: `id`, `eventTypeId`, `hostId`, `inviteeName`, `inviteeEmail`, `inviteeTimezone`, `startTimeUtc`, `endTimeUtc`, `status(CONFIRMED|CANCELED)`, `canceledAt?`, `cancelReason?`, `manageTokenHash`, timestamps

Rules:
- store hashes only for session/manage tokens
- enforce host-level overlap prevention in app logic within transaction boundaries

## Timezone/Scheduling Rules

- availability stored in host timezone
- slot generation timezone-aware and DST-correct (no custom timezone math)
- slot shown in guest-selected timezone
- valid slot must be fully contained in an availability window

## API Capabilities (Required)

- Auth: signup, login, logout, current session
- Profile: get/update current host profile
- Event types: list/create/update/activate/deactivate
- Availability: get/replace weekly availability
- Host bookings: list + cancel
- Public booking: fetch event metadata, fetch slots, create booking
- Guest management: fetch booking by `bookingId+token`, cancel by `bookingId+token`

## Security Requirements

- password hashing with modern algorithm (`argon2` required in this repo)
- all state-changing host APIs require valid session
- server-side request validation (`zod` required in this repo)
- do not trust client-submitted host identity
- long random manage token, hash persisted only
- do not leak booking ownership without token possession

## Testing Requirements

Required coverage:
- unit: slot generation + DST-sensitive edge cases
- integration APIs:
  - auth lifecycle
  - event type CRUD
  - availability replacement
  - public slot retrieval
  - booking creation
  - host cancellation
  - guest cancellation with manage token
- at least one E2E browser happy path:
  - host configures event + availability
  - guest books successfully

Rules:
- integration tests must use dedicated test DB (`TEST_DATABASE_URL`)
- integration tests must create their own data (not rely on app demo seed)

## First-Run Success Constraints

Mandatory for this repo:
- Docker Postgres quickstart documented and working
- local Postgres alternative documented
- `prisma:migrate` results in runnable app + seeded demo booking URL
- idempotent `seed` command exists
- one-time Playwright browser install documented

## Definition of Done

- full vertical slice works: DB + API + UI + tests + docs
- host can configure and share a booking link
- guest can book without account
- booking appears for host
- host and guest cancellation flows work
- seeded demo data exists after migration so guest flow is immediately testable

## Non-Requirements (For MVP)

- polished marketing site/design system
- background jobs and transactional email infra
- external calendar provider integrations
- websockets
- advanced rate limiting and analytics

## Deferred After MVP

- Google Calendar sync
- email confirmations/cancellations
- generated video links
- guest accounts/history
- rescheduling
- advanced availability controls
- team scheduling modes
