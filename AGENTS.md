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

- Files importing `@squide/*` -> `/workleap-squide`
- Files importing `@workleap/logging` -> `/workleap-logging`
- Files importing `@workleap/telemetry` -> `/workleap-telemetry`
- Files importing `@workleap/browserslist-config`, `@workleap/eslint-configs`, `@workleap/stylelint-plugin`, `@workleap/typescript-configs`, `@workleap/rsbuild-configs`, `@workleap/rslib-configs` -> `/workleap-web-configs`

#### Apply based on name or file type

- `turbo.json` -> `/turborepo`

### Mandatory Hopper MCP validation

#### Important

- If changed lines are in files that import from `@hopper-ui/components`, `@hopper-ui/icons`, or `@hopper-ui/styled-system`, you MUST use Hopper MCP tools to assist with the code review.
- In this case, you MUST call the `validate_hopper_code` tool.

#### Required

- Report Hopper-specific findings using the hopper category.
- If Hopper MCP is not available, explicitly state that Hopper MCP was not available.
- If Hopper MCP is available, explicitly state that Hopper MCP was successfully used.
- If no Hopper issues are found, explicitly report that Hopper checks were executed and no Hopper issues were identified.

### Hard stop

- If you cannot connect to Hopper MCP.
- If changed lines are in files importing from `@hopper-ui/components`, `@hopper-ui/icons`, or `@hopper-ui/styled-system` and those lines have not been validated using the `validate_hopper_code` tool.

### Issues reporting

When reporting issues:

- If the issue matches an agent skill or a custom guideline, name it explicitly.
- Otherwise, choose an appropriate category based on the nature of the issue.
