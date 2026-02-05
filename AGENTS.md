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

When changed lines include imports from `@hopper-ui/components`, `@hopper-ui/icons`, or `@hopper-ui/styled-system`, Hopper MCP validation is mandatory.

Required behavior:
- Query the `hopper` MCP server before finalizing the review.
- Validate Hopper usage only on changed lines.
- Include Hopper-specific findings using category `hopper`.
- If no Hopper issue is found, explicitly report that Hopper checks were executed and no Hopper issues were identified.

### Issue reporting

When reporting issues:

- If the issue matches an agent skill or a custom guideline, name it explicitly.
- Use category `hopper` for Hopper-specific findings.
- Otherwise, choose an appropriate category based on the nature of the issue.
