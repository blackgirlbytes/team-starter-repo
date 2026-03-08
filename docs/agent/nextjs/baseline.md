# Next.js + Vercel Baseline

Scope: apply to new Next.js code in this repository.
Goal: capture framework defaults that are safe before feature-level architecture is decided.

## N001 App Router Baseline
- MUST use the Next.js App Router for new routes and layouts.

## N002 Server-First Components
- MUST default to Server Components.
- MUST add `'use client'` only when the component needs React state, event handlers, effects, or browser-only APIs.

## N003 Use Framework Primitives
- SHOULD prefer Next.js primitives over custom replacements for routing, layouts, loading states, error states, metadata, and rendering boundaries.

## N004 Keep Server Concerns on the Server
- MUST keep secrets and server-only logic out of Client Components.
- MUST NOT expose secrets through `NEXT_PUBLIC_` unless the value is intentionally public.
