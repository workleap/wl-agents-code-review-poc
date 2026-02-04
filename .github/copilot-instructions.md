# Code Review Instructions

## Agent skills

When performing code reviews, load and use the following agent skills that are available in the `./.agents/skills` folder.

### Always Apply

Run on every `.ts`, `.tsx`, `.js`, `.jsx` file (changed lines only):
- `/accessibility`
- `/best-practices`
- `/core-web-vitals`
- `/performance`

### Apply Based on Imports

- Files importing `@squide/*` → `/workleap-squide`
- Files importing `@workleap/logging` → `/workleap-logging`
- Files importing `@workleap/telemetry` → `/workleap-telemetry`
- Files importing `@workleap/browserslist-config`, `@workleap/eslint-configs`, `@workleap/stylelint-plugin`, `@workleap/typescript-configs`, `@workleap/rsbuild-configs`, `@workleap/rslib-configs` → `/workleap-web-configs`

### Apply Based on File Type

- `turbo.json` → `/turborepo`

## Issue Reporting

When reporting issues:

- If the issue matches an agent skill or a custom guideline, name it explicitly.
