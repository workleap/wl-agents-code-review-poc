## Summary

- Copilot is the easiest one to configure, is able to load agent skill, and does a pretty good reviewing job overall. The reporting (comments) is the best of the 3. The downside is that the time to completion is very high in comparaison to the 2 others. I don't have any visibility on the average cost of a Copilot code review.
- Claude Code is the most accurate of the 3. It consistently found out more issues than the 2 others. The reporting (comments) is inconsistent, sometimes using GitHub MCP Server to report the issues individually as PR review comments, and sometimes reporting all the issues in a single comment. The time to completion and cost used to be high but somehow shrink by about 300% as I was completing subsequent rounds. I made some changes, but nothing that should have significantly lowered both of these. An hypothesis is that Anthropic released a change during my test. TBD.
- Codex is pretty good, with an accuracy similar to Copilot, but the time to completion is a lot lower. The main struggle with Codex is that to get a good reporting experience, the setup is complex. Once it's set up, the reporting is somewhat consistent. The main issue is that sometimes the line numbers don't match the PR which requires Codex to fallback to reporting all the issues in a single comment rather than using standalaone PR review comments.

## Round 1 (PR #2) - Copilot vs Claude Code

### Summary

Copilot did the better job overall.

It caught more of the intentional issues (19 vs. 11 inline comments) and covered a wider range (Squide, accessibility, performance, best‑practices, and some structural issues). Claude Code Review caught several important items, but missed more of the injected issues, and it duplicated a couple of comments (e.g., XSS and unclosed scope were reported twice). 

That said, Claude did catch high‑impact issues (XSS, missing lang, unclosed scope), but overall Copilot had better breadth and coverage on this run.

### Matrix

- Total intentional issues: 34
- Copilot coverage: 21/34 (61.8%)
- Claude coverage: 8/34 (23.5%)
- Both caught: 8/34 (23.5%)
- Missed by both: 13/34 (38.2%)
- Copilot-only: 13
- Claude-only: 0

| Category | Intentional Issue | Copilot | Claude |
| --- | --- | --- | --- |
| Accessibility | `<html>` missing `lang` | Yes | Yes |
| Accessibility | `<h1 aria-hidden="true">` | Yes | No |
| Accessibility | Icon-only button w/o accessible name | No | No |
| Accessibility | `div` used as button (no keyboard semantics) | Yes | No |
| Accessibility | Missing label for “Internal notes” | Yes | No |
| Accessibility | Label/input mismatch (First Name) | Yes (low confidence) | Yes |
| Accessibility | Label/input mismatch (Last Name) | Yes | No |
| Accessibility | Label/input mismatch (Hire Date) | Yes | No |
| Accessibility | Duplicate IDs in table rows | Yes | No |
| Accessibility | Removed focus outline | Yes | Yes |
| Accessibility | Low nav contrast (`#444` on `#333`) | Yes | No |
| Accessibility | Error text color = background | Yes | Yes |
| Accessibility | Heading level jump (`h3` instead of `h1`) | No | No |
| Security | XSS via `dangerouslySetInnerHTML` | Yes | Yes |
| Performance | Scroll listener leak (no cleanup) | Yes | Yes |
| Performance | Layout thrash in scroll handler | Yes | No |
| Performance | Non-passive scroll listener | No | No |
| Performance | Missing image width/height (CLS risk) | No | No |
| Best Practices | Mixed content (`http://` image) | Yes | No |
| Squide | Removed `ProtectedRoutes` | Yes | No |
| Squide | Invalid `parentId` | Yes | Yes |
| Squide | Deferred registrations never executed | Yes | No |
| Squide | `useDeferredRegistrations` imported but not used | Yes | No |
| Squide | Invalid `useRenderedNavigationItems` signature | Yes | No |
| Squide | `/login` registered as protected (not public) | No | No |
| Squide | `$visibility: "public"` used instead of `registerPublicRoute` | No | No |
| Squide | `useProtectedDataQueries` without `waitForProtectedData` | No | No |
| Logging | Scope started but not ended | Yes | Yes |
| Logging | Logging PII in `logger.information` | No | No |
| Logging | Logging full employee list object | No | No |
| Telemetry | Mixpanel event includes full PII | No | No |
| Telemetry | LogRocket identify uses email + PII traits | No | No |
| Telemetry | Direct `logrocket` import (umbrella rule) | No | No |

## Round 2 (PR #4) - Copilot vs Claude Code vs Codex

### Summary

- Total intentional issues: 27
- Copilot coverage: 24/27 (88.9%)
- Claude Code coverage: 27/27 (100%)
- Codex coverage: 23/27 (85.2%)
- Missed by all: 0

### Matrix

| Category | Intentional Issue | Copilot | Claude Code | Codex |
| --- | --- | --- | --- | --- |
| Accessibility | `<html>` missing `lang` | Yes | Yes | Yes |
| Squide | `useProtectedDataQueries` without `waitForProtectedData` | No | Yes | No |
| Squide | `useDeferredRegistrations` imported but not used | Yes | Yes | Yes |
| Squide | `ProtectedRoutes` removed from host | Yes | Yes | Yes |
| Squide | `/login` registered as protected (not public) | No | Yes | No |
| Squide | `useRenderedNavigationItems` signature broken | Yes | Yes | Yes |
| Squide | `$visibility: "public"` used instead of `registerPublicRoute` | Yes | Yes | No |
| Squide | Invalid `parentId` reference | Yes | Yes | Yes |
| Squide | Deferred registration callback never executed | Yes | Yes | Yes |
| Performance | Scroll handler leak + layout thrash | Yes | Yes | Yes |
| Security | XSS via `dangerouslySetInnerHTML` | Yes | Yes | Yes |
| Accessibility | Icon-only button missing accessible name | Yes | Yes | Yes |
| Accessibility | `div` used as button (not keyboard accessible) | Yes | Yes | Yes |
| Accessibility | `aria-hidden="true"` on main `<h1>` | Yes | Yes | Yes |
| Accessibility | Duplicate IDs in table rows | Yes | Yes | Yes |
| Accessibility | Heading level jump (`h3` instead of `h1`) | No | Yes | No |
| Best Practices | HTTP image + missing alt + missing dimensions | Yes | Yes | Yes |
| Accessibility | Unlabeled "Internal notes" input | Yes | Yes | Yes |
| Accessibility | Label/input mismatches + duplicate ID (`email`) | Yes | Yes | Yes |
| Logging | `validationScope` started but never ended | Yes | Yes | Yes |
| Accessibility | Focus outline removed (`outline: "none"`) | Yes | Yes | Yes |
| Accessibility | Low contrast nav text (`#444` on `#333`) | Yes | Yes | Yes |
| Accessibility | Error text color equals background | Yes | Yes | Yes |
| Telemetry | Manual "Telemetry Id" / "Device Id" overrides | Yes | Yes | Yes |
| Telemetry | Direct `logrocket` import/usage | Yes | Yes | Yes |
| Logging | Wrong log level for success (`logger.error`) | Yes | Yes | Yes |
| Logging | Log chain not terminated with `.debug()`/`.information()` | Yes | Yes | Yes |

### Round 2 Comment References

Copilot inline comment IDs (path:line -> comment id):
- `public/index.html:2` -> `2765653712`
- `src/App.tsx:10` -> `2765653664`
- `src/host/register.tsx:9` -> `2765653807`
- `src/host/register.tsx:10` -> `2765653742`
- `src/host/RootLayout.tsx:16` -> `2765653831`
- `src/modules/employee/register.tsx:17` -> `2765654062`
- `src/modules/employee/register.tsx:32` -> `2765653899`
- `src/modules/employee/pages/EmployeeListPage.tsx:89` -> `2765653944`
- `src/modules/employee/pages/EmployeeListPage.tsx:89` -> `2765653959`
- `src/modules/employee/pages/EmployeeListPage.tsx:98` -> `2765653911`
- `src/modules/employee/pages/EmployeeListPage.tsx:159` -> `2765653923`
- `src/modules/employee/pages/EmployeeListPage.tsx:162` -> `2765653930`
- `src/modules/employee/pages/EmployeeListPage.tsx:167` -> `2765653974`
- `src/modules/employee/pages/EmployeeListPage.tsx:191` -> `2765653844`
- `src/modules/employee/pages/AddEmployeePage.tsx:5` -> `2765653856`
- `src/modules/employee/pages/AddEmployeePage.tsx:80` -> `2765653764`
- `src/modules/employee/pages/AddEmployeePage.tsx:97` -> `2765653986`
- `src/modules/employee/pages/AddEmployeePage.tsx:102` -> `2765653777`
- `src/modules/employee/pages/AddEmployeePage.tsx:105` -> `2765653997`
- `src/modules/employee/pages/AddEmployeePage.tsx:122` -> `2765654009`
- `src/modules/employee/pages/AddEmployeePage.tsx:142` -> `2765654027`
- `src/modules/employee/pages/AddEmployeePage.tsx:146` -> `2765654040`
- `src/modules/employee/pages/AddEmployeePage.tsx:159` -> `2765653790`
- `src/shared/styles.ts:56` -> `2765654049`
- `src/shared/styles.ts:157` -> `2765653869`
- `src/shared/styles.ts:182` -> `2765653879`

Claude Code summary comment (issue comment id):
- `3849294560` (Claude completion + full review summary)

Codex summary comment (issue comment id):
- `3849302316` (Issues list summary)

## Round 3 (PR #11) - Copilot vs Claude Code vs Codex

### Summary

- Total intentional issues: 27
- Copilot coverage: 26/27 (96.3%)
- Codex coverage: 25/27 (92.6%)
- Claude Code coverage: 24/27 (88.9%)

Best overall coverage: Copilot. Codex was a close second. Claude had the most verbose narrative but missed a few smaller routing/accessibility items.

Note: Codex inline review failed on line resolution and posted a fallback summary comment instead.

### Matrix

| Intentional Issue | Copilot | Claude Code | Codex |
| --- | --- | --- | --- |
| Missing lang attribute | Yes | Yes | Yes |
| useProtectedDataQueries without waitForProtectedData | Yes | No | Yes |
| useDeferredRegistrations not called | Yes | Yes | Yes |
| ProtectedRoutes removed | Yes | Yes | Yes |
| /login route uses registerRoute | Yes | Yes | No |
| useRenderedNavigationItems signature broken | Yes | No | Yes |
| $visibility public on /employees/add | Yes | Yes | Yes |
| missing parentId for /employees/reports | Yes | Yes | Yes |
| deferred registration callback never executed | Yes | Yes | Yes |
| scroll listener no cleanup / layout thrash | Yes | Yes | Yes |
| dangerouslySetInnerHTML XSS | Yes | Yes | Yes |
| icon-only button lacks accessible name | Yes | Yes | Yes |
| div acting as button | No | Yes | No |
| aria-hidden on h1 | Yes | Yes | Yes |
| duplicate IDs in table | Yes | Yes | Yes |
| log chain without terminal method | Yes | Yes | Yes |
| heading h1->h3 | Yes | Yes | Yes |
| http image without alt/dimensions | Yes | Yes | Yes |
| unlabeled internal notes input | Yes | No | Yes |
| label associations broken | Yes | Yes | Yes |
| validationScope not ended | Yes | Yes | Yes |
| outline none | Yes | Yes | Yes |
| nav contrast low | Yes | Yes | Yes |
| error text invisible | Yes | Yes | Yes |
| manual Telemetry Id/Device Id | Yes | Yes | Yes |
| direct LogRocket identify | Yes | Yes | Yes |
| logger.error on success | Yes | Yes | Yes |

## Round 4 (PR #13) - Copilot vs Claude Code vs Codex

NOTE: The `INJECTED_ISSUES.md` file was removed from the repository for this round... Without significant changes in terms of time to completion, cost and issues discovery.

### Summary

- Total intentional issues: 27
- Copilot coverage: 25/27 (92.6%)
- Claude Code coverage: 27/27 (100%)
- Codex coverage: 24/27 (88.9%)

Best overall coverage: Claude Code. Copilot was close behind. Codex missed a few UI/accessibility items (notably error text contrast).

### Matrix

| Intentional Issue | Copilot | Claude Code | Codex |
| --- | --- | --- | --- |
| Missing lang attribute | Yes | Yes | Yes |
| useProtectedDataQueries without waitForProtectedData | No | Yes | No |
| useDeferredRegistrations not called | Yes | Yes | Yes |
| ProtectedRoutes removed | Yes | Yes | Yes |
| /login route uses registerRoute | Yes | Yes | No |
| useRenderedNavigationItems signature broken | Yes | Yes | Yes |
| $visibility public on /employees/add | Yes | Yes | Yes |
| missing parentId for /employees/reports | Yes | Yes | Yes |
| deferred registration callback never executed | Yes | Yes | Yes |
| scroll listener no cleanup / layout thrash | Yes | Yes | Yes |
| dangerouslySetInnerHTML XSS | Yes | Yes | Yes |
| icon-only button lacks accessible name | Yes | Yes | Yes |
| div acting as button | No | Yes | Yes |
| aria-hidden on h1 | Yes | Yes | Yes |
| duplicate IDs in table | Yes | Yes | Yes |
| log chain without terminal method | Yes | Yes | Yes |
| heading h1->h3 | Yes | Yes | Yes |
| http image without alt/dimensions | Yes | Yes | Yes |
| unlabeled internal notes input | Yes | Yes | Yes |
| label associations broken | Yes | Yes | Yes |
| validationScope not ended | Yes | Yes | Yes |
| outline none | Yes | Yes | Yes |
| nav contrast low | Yes | Yes | Yes |
| error text invisible | Yes | Yes | No |
| manual Telemetry Id/Device Id | Yes | Yes | Yes |
| direct LogRocket identify | Yes | Yes | Yes |
| logger.error on success | Yes | Yes | Yes |

## Findings

### Claude Code can only validate the changes of the PR even if instructions say otherwise

Your CLAUDE.md says "review the entire file for /accessibility", but the plugin's internal validation logic says "pre-existing issues are false positives" - and the plugin     
wins.

This is a fundamental limitation of the code-review@claude-code-plugins plugin. It's designed to only comment on issues introduced by the PR, regardless of what your CLAUDE.md 
says.
