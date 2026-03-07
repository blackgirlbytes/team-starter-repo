# team-starter-repo

Shared resources for the team including agent skills, hints, and more.

## Skills

This repo includes skills that work with **Goose**, **Claude Code**, **Cursor**, and other agents that support the `.claude/skills/` format.

| Skill | Description |
|-------|-------------|
| `frontend-design` | Create distinctive, production-grade frontend interfaces with high design quality |
| `create-mcp-app` | Build MCP Apps with interactive UIs for MCP-enabled hosts |

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
.claude/
└── skills/
    ├── frontend-design/
    │   └── SKILL.md
    └── create-mcp-app/
        └── SKILL.md
```
