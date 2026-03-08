# React + TypeScript Rules: Effects

Scope: apply to `useEffect` and `useLayoutEffect`.
Goal: keep effects limited to external synchronization and safe under re-renders.

## E001 External Sync Only
- MUST use effects only to synchronize with external systems.
- External systems include network requests, timers, subscriptions, browser APIs, and third-party widgets.
- MUST NOT use an effect when render logic or an event handler can express the same behavior.

## E002 No Derived or Event Work in Effects
- MUST compute derivations during render.
- MUST run user-triggered workflows in event handlers.

## E003 Dependency Correctness
- MUST include all referenced reactive values in the dependency array.
- MUST NOT suppress `exhaustive-deps` to force an effect pattern through.

## E004 Cleanup
- MUST clean up subscriptions, listeners, timers, and other externally allocated resources on re-run or unmount.

## E005 Async Race Safety
- MUST prevent stale async work from writing obsolete state.
- MUST cancel, ignore, or version in-flight async work when a newer run replaces it.

## E006 Strict Mode Safety
- MUST write effect setup and cleanup so they remain correct when React re-runs them during development.

## E007 No Derived-State Effects
- MUST NOT use effects only to copy props or state into other state.
- MUST rewrite derivation-only effects into render-time calculations unless there is a real external synchronization requirement.

## E008 Stale Closure Safety
- MUST prevent stale closure bugs in effects and async callbacks.
- Use complete dependencies, functional updates, or a deliberate ref escape hatch when needed.
