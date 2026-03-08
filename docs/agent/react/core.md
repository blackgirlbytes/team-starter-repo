# React + TypeScript Rules: Core

Scope: apply to all React/TS files.
Priority: this file is the baseline; the state and effects files add more specific rules.
Goal: enforce React rules that remain valid before project architecture is decided.

## R001 Render Purity
- MUST keep render pure: `props + state -> JSX`.
- MUST NOT run side effects, async work, randomness, time reads, or external mutation during render.

## R002 Immutable Updates
- MUST treat props and state as immutable.
- MUST NOT mutate arrays or objects in place.

## R003 Minimal State
- MUST store only source-of-truth state.
- MUST derive counts, filters, sorts, and display flags during render instead of storing them separately.

## R004 Stable Keys
- MUST use stable data IDs for list keys when rendering dynamic collections.
- MUST NOT use array index keys for reorderable, insertable, or removable lists.

## R005 Memoization Discipline
- MUST add `useMemo` or `useCallback` only when there is a clear need:
  - expensive recomputation, or
  - a stable identity requirement for an API or memoized child.
- MUST NOT memoize by default.

## R006 Typed Boundaries
- MUST type component props, event handlers, function inputs, and function outputs.
- MUST validate untrusted external data at trust boundaries before use.
- MUST NOT use `any` or broad unsafe casts without a narrow runtime guard.

## R007 Accessible UI
- MUST use semantic HTML before ARIA workarounds.
- MUST preserve keyboard access, visible focus, and accessible names for interactive controls.

## R008 Rules of Hooks
- MUST call hooks only at the top level of React components or custom hooks.
- MUST NOT call hooks inside loops, conditions, nested functions, event handlers, or regular utility functions.
