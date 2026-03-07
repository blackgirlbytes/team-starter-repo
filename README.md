# team-starter-repo

Shared resources for the team including agent skills, hints, and more.

## Skills

This repo includes skills that work with **Goose**, **Claude Code**, **Cursor**, and other agents.

| Skill | Description |
|-------|-------------|
| `frontend-design` | Create distinctive, production-grade frontend interfaces with high design quality |
| `create-mcp-app` | Build MCP Apps with interactive UIs for MCP-enabled hosts |
| `shadcn` | Build with shadcn/ui components - CLI commands, theming, composition patterns |
| `replay-cli` | Record, upload, and manage Replay sessions via CLI |
| `replay-cypress` | Set up and use Replay with Cypress tests |
| `replay-mcp` | Use Replay MCP server for debugging |
| `replay-playwright` | Set up and use Replay with Playwright tests |
| `react-best-practices` | React/Next.js performance optimization - 58 rules from Vercel |
| `composition-patterns` | React composition patterns - compound components, state management |

### Usage

Just clone this repo and work inside it — your agent will automatically discover the skills:

```bash
git clone https://github.com/blackgirlbytes/team-starter-repo.git
cd team-starter-repo
# Start your agent (goose, claude, cursor, etc.)
```

Or install globally with:

```bash
npx skills add blackgirlbytes/team-starter-repo
```

## Structure

```
.claude/skills/    # For Goose, Claude Code
.cursor/skills/    # For Cursor
├── frontend-design/
├── create-mcp-app/
├── shadcn/
│   └── rules/
├── replay-cli/
├── replay-cypress/
├── replay-mcp/
├── replay-playwright/
├── react-best-practices/
│   └── rules/
└── composition-patterns/
    └── rules/
```
