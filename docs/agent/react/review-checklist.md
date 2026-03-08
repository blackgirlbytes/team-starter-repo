# React + TypeScript Review Checklist

Use this after code generation or before PR review.
This checklist covers baseline React invariants only.
Project-specific architecture decisions should live in a separate conventions document.

## Core Rules
- [ ] `R001` Render is pure: no side effects, async work, randomness, time reads, or external mutation during render.
- [ ] `R002` State and props are updated immutably.
- [ ] `R003` Only source-of-truth values are stored in state; derived values are computed during render.
- [ ] `R004` Dynamic lists use stable keys from data, not array indexes.
- [ ] `R005` `useMemo` and `useCallback` are present only for a clear recomputation or stable-identity need.
- [ ] `R006` Props and function boundaries are typed, and untrusted external data is validated before use.
- [ ] `R007` Interactive UI uses semantic elements, keyboard access, visible focus, and accessible names.
- [ ] `R008` Hooks are called only at the top level of React components or custom hooks.

## State Rules
- [ ] `S001` Each source-of-truth value has one clear state owner.
- [ ] `S002` Derived values are not stored in state and are not synchronized with effects.
- [ ] `S003` Previous-state-dependent updates use functional setters.
- [ ] `S004` Persisted records remain server-owned source of truth, and props or fetched records are not mirrored into local state unless the code is implementing an explicit editable draft with a clear reset path.

## Effect Rules
- [ ] `E001` Effects are used only for external synchronization.
- [ ] `E002` User actions run in event handlers, and derivations stay in render.
- [ ] `E003` Effect dependencies are complete, and `exhaustive-deps` is not suppressed to force the pattern through.
- [ ] `E004` Effects that allocate external resources include cleanup.
- [ ] `E005` Async effects prevent stale writes from obsolete work.
- [ ] `E006` Effects remain correct when React re-runs them during development.
- [ ] `E007` Effects are not used only to copy props or state into other state.
- [ ] `E008` Effects and async callbacks are protected against stale closures.

## Common Anti-Patterns
- [ ] No effect-driven state synchronization that can be computed during render.
- [ ] No hooks called in conditions, loops, event handlers, or utility functions.
- [ ] No props or fetched records mirrored into local state without explicit draft semantics.
- [ ] No lint suppression used only to force a hooks or effects pattern through.
- [ ] No memoization added without a clear reason in the code.
