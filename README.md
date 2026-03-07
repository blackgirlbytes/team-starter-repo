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
│   └── SKILL.md
├── create-mcp-app/
│   └── SKILL.md
├── shadcn/
│   ├── SKILL.md
│   ├── cli.md
│   ├── customization.md
│   ├── mcp.md
│   └── rules/
├── replay-cli/
│   └── SKILL.md
├── replay-cypress/
│   └── SKILL.md
├── replay-mcp/
│   └── SKILL.md
└── replay-playwright/
    └── SKILL.md
```
