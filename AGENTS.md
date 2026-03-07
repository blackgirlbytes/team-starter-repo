# AGENTS.md

Instructions for AI coding agents working on this project.

---

## Design System

### Colors
- Primary: `_______` (e.g., `blue-600`)
- Secondary: `_______`
- Accent: `_______`
- Background: `_______`
- Surface/Card: `_______`
- Text primary: `_______`
- Text muted: `_______`
- Border: `_______`
- Error: `_______`
- Success: `_______`

### Typography
- Font family: `_______` (e.g., `Inter`, `Geist`)
- Heading weight: `_______` (e.g., `600`)
- Body weight: `_______` (e.g., `400`)

### Spacing & Radius
- Border radius: `_______` (e.g., `8px`, `rounded-lg`)
- Spacing scale: `_______` (e.g., `tight`, `comfortable`, `spacious`)

### Vibe
- Overall feel: `_______` (e.g., `minimal and clean like Linear`, `warm and friendly like Notion`, `dense and technical like GitHub`)
- Light mode, dark mode, or both: `_______`

### Component Rules
- Use shadcn/ui components. Do not create custom components when shadcn has one.
- Use Lucide icons. Import from `lucide-react`.
- All buttons use default variant unless destructive.
- Cards should have subtle shadow, not flat.

---

## Data Model

### Entities

**Entity 1: `_______`**
```typescript
{
  id: string           // uuid
  _______: _______     // field: type
  _______: _______
  createdAt: Date
  updatedAt: Date
}
```

**Entity 2: `_______`**
```typescript
{
  id: string           // uuid
  _______: _______
  _______: _______
  createdAt: Date
  updatedAt: Date
}
```

**Entity 3: `_______`**
```typescript
{
  id: string           // uuid
  _______: _______
  _______: _______
  createdAt: Date
  updatedAt: Date
}
```

### Relationships
- A `_______` has many `_______`
- A `_______` belongs to `_______`
- _______

### Field Naming Conventions
- Use camelCase for all field names
- IDs: `id` for primary key, `entityId` for foreign keys (e.g., `userId`, `projectId`)
- Timestamps: `createdAt`, `updatedAt`
- Booleans: prefix with `is` or `has` (e.g., `isActive`, `hasChildren`)

---

## Code Conventions

### Stack
- Framework: Next.js (App Router)
- Language: TypeScript (strict mode)
- Styling: Tailwind CSS
- Components: shadcn/ui
- Icons: Lucide

### File Structure
```
app/
  (routes)/          # Page routes
  api/               # API routes (if needed)
components/
  ui/                # shadcn components
  _______/           # Feature-specific components
lib/
  actions/           # Server actions
  utils.ts           # Utility functions
  types.ts           # Shared types
```

### Patterns
- Prefer Server Components by default. Add `"use client"` only when needed.
- Use Server Actions for mutations, not API routes.
- Colocate components with their features when possible.
- Keep components small and focused.

### Naming
- Components: `PascalCase` (e.g., `UserCard.tsx`)
- Utilities: `camelCase` (e.g., `formatDate.ts`)
- Types: `PascalCase` (e.g., `type User = ...`)

---

## Features

Each person owns one feature end-to-end (UI, API, data).

| Feature | Owner | Description |
|---------|-------|-------------|
| `_______` | `_______` | _______ |
| `_______` | `_______` | _______ |
| `_______` | `_______` | _______ |

---

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Run linter
```
