# Agent Instructions (add this to main agents md file if we use react docs)

Use progressive disclosure. Read only the smallest relevant guide first.

Trigger: React or TypeScript work.
Instruction: Read `docs/agent/react/core.md`.

Trigger: State ownership, derived state, drafts, or prop-to-state logic.
Instruction: Also read `docs/agent/react/state.md`.

Trigger: Effects, async synchronization, subscriptions, timers, cleanup, or dependency bugs.
Instruction: Also read `docs/agent/react/effects.md`.

Trigger: Next.js routing, layouts, metadata, server/client boundaries, or environment separation.
Instruction: Also read `docs/agent/nextjs/baseline.md`.

Trigger: Review or final validation.
Instruction: Read `docs/agent/react/review-checklist.md` last.

Fixed assumptions: React + TypeScript, Next.js, Vercel deployment.
Do not assume auth, validation, forms, client cache, or mutation conventions unless another project document defines them.
