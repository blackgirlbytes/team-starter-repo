# Game Day Strategy

**Format:** 6-hour build, 3-person team, judged on feel/functionality/completeness

---

## Team Roles

| Role | Focus | Tools |
|------|-------|-------|
| **Person 1: UI/Frontend** | Components, styling, interactions, polish | Cursor/Claude + `frontend-design`, `shadcn`, `composition-patterns` |
| **Person 2: Core Logic** | Data model, API routes, business logic | Goose/Claude + `react-best-practices` |
| **Person 3: Integration/Infra** | Auth, database, deployment, debugging | Goose/Claude + `replay-*`, `deploy-to-vercel` |

**Key rule:** Don't work on the same files. Agents will conflict. Divide by feature/directory.

---

## Timeline

| Hour | Phase | What to do |
|------|-------|------------|
| **0:00 - 0:30** | 🎯 Plan | Read requirements, agree on scope, assign features, set up repo |
| **0:30 - 1:00** | 🏗️ Scaffold | Person 3 sets up Next.js + DB. Person 1 sets up component structure. Person 2 defines data model |
| **1:00 - 4:00** | 🔨 Build | Heads down. Each person owns their features end-to-end |
| **4:00 - 5:00** | 🔗 Integrate | Connect everything. Fix bugs. Test flows |
| **5:00 - 5:45** | ✨ Polish | UI tweaks, animations, error states, loading states |
| **5:45 - 6:00** | 🚀 Ship | Final deploy, test prod, submit |

---

## Hour 0: The Plan (CRITICAL)

Before touching code:

1. **Read ALL requirements** - Don't miss hidden criteria
2. **Decide MVP scope** - What's the minimum to hit all requirements?
3. **Assign ownership** - Each person owns specific features/directories
4. **Agree on data model** - Sketch the schema together (5 min whiteboard)
5. **Agree on API shape** - What endpoints, what params

### File Ownership Example (Notion-like app)

```
Person 1 (UI):
  - app/components/
  - app/(routes)/page.tsx (layout only)
  - styles/

Person 2 (Core):
  - app/api/
  - lib/actions/
  - lib/types.ts

Person 3 (Infra):
  - database/
  - auth/
  - app/layout.tsx
  - deployment
```

---

## Communication

- **Quick syncs** every hour: "What's done? What's blocked?"
- **Call out blockers immediately** - Don't spin for 30 min alone
- Use Replay MCP when stuck on bugs (required anyway)

---

## When Stuck

1. **Use Replay** - Time-travel debug (required by competition)
2. **Simplify** - Cut scope, not quality
3. **Ask teammate** - Fresh eyes help
4. **Skip and return** - Don't block on one feature

---

## Polish Checklist (Hour 5+)

Judges care about "feel" - these small things matter:

- [ ] Loading states (skeletons, spinners)
- [ ] Error states (not just blank screens)
- [ ] Empty states ("No items yet")
- [ ] Hover/focus states on interactive elements
- [ ] Keyboard shortcuts (if time)
- [ ] Transitions/animations (subtle)
- [ ] Mobile responsive (at least not broken)
- [ ] Favicon + title

---

## Tech Stack (Suggested)

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | **Next.js 14+** | Fast, Vercel-native |
| UI | **shadcn/ui** | We have the skill, consistent |
| Styling | **Tailwind** | Fast iteration |
| Database | **Vercel Postgres** or **Prisma + any** | Depends on needs |
| Auth | **NextAuth** or **Clerk** | Don't build auth |
| Deploy | **Vercel** | We have the skill |

---

## Don'ts

- ❌ Don't build auth from scratch
- ❌ Don't over-engineer the data model
- ❌ Don't polish before it works
- ❌ Don't let agents work on same files
- ❌ Don't forget to deploy early (hour 2-3, not hour 6)

---

## Pre-Game Checklist

- [ ] Everyone has repo cloned
- [ ] Everyone's agent sees the skills (`load()` to verify)
- [ ] Vercel project created and linked
- [ ] Database provisioned (if known ahead of time)
- [ ] Auth provider set up (if known ahead of time)
- [ ] Everyone knows their role

---

Good luck! 🚀
