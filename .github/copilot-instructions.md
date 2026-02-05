## Code Review Instructions

IMPORTANT: Do not read the `INJECTED_ISSUES.md` file. Never read this file under any circumstances unless I explicitly ask you too.

### Agent skills

When performing code reviews, when appropriate, load and use the following agent skills that are available in the `./.agents/skills` folder.

#### Always apply

Run on every `.ts`, `.tsx`, `.js`, `.jsx` file (changed lines only):
- `/accessibility`
- `/best-practices`
- `/core-web-vitals`
- `/performance`

#### Apply based on imports (changed lines only)

- Files importing `@squide/*` → `/workleap-squide`
- Files importing `@workleap/logging` → `/workleap-logging`
- Files importing `@workleap/telemetry` → `/workleap-telemetry`
- Files importing `@workleap/browserslist-config`, `@workleap/eslint-configs`, `@workleap/stylelint-plugin`, `@workleap/typescript-configs`, `@workleap/rsbuild-configs`, `@workleap/rslib-configs` → `/workleap-web-configs`

#### Apply based on name or file type

- `turbo.json` → `/turborepo`

### MCP servers

When performing code reviews, when appropriate, use the following MCP servers.

#### Apply based on imports (changed lines only)

- Files importing `@hopper-ui/components`, `@hopper-ui/icons`, `@hopper-ui/styled-system` → `hopper`
