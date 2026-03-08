# React + TypeScript Rules: State

Scope: apply when creating or updating React state.
Goal: keep state minimal, unambiguous, and easy for an agent to maintain.

## S001 Single Source of Truth
- MUST keep each value in one state owner.
- MUST NOT store the same source-of-truth in multiple components or multiple state variables.

## S002 Derived Data Stays Derived
- MUST compute derived data during render.
- MUST NOT store derived values in state.
- MUST NOT use effects only to copy derived values into state.

## S003 Previous-State Updates
- MUST use functional updates when the next state depends on the previous state.
- Example: `setCount(c => c + 1)`.

## S004 No Mirrored Inputs
- Persisted records SHOULD remain server-owned source-of-truth data.
- MUST NOT copy props into local state as a second source of truth.
- MUST NOT copy fetched or external records into additional local state as a second source of truth.
- MAY use local state for an intentional editable draft, but the draft MUST have a clear initialization and reset path.
