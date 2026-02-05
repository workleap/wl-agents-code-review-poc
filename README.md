## Conclusion

- All three agents support agent skills for code reviews 🚀
- My recommendation is to either:
    - Use Copilot for ease of configuration (up and running in ~30 seconds) and best-in-class reporting.
    - Use Codex for slightly better efficiency (it finds a bit more issues), faster time to completion, and very low cost (around $0.10 per review).

### Notes

- Copilot is the easiest to configure, and provides solid code reviews overall. Its reporting (PR comments) is the most polished of the three. The main downside is a significantly higher time to completion compared to the others. I don’t have visibility into the average cost of a Copilot code review.
- Codex offers efficiency similar to Copilot, with an average time to completion Reporting is inconsistent: sometimes it posts individual PR review comments using the GitHub MCP Server, and sometimes it reports everything in a single comment. Time to completion and cost were initially high, but both dropped by roughly 300% over subsequent runs. I made a few changes, but nothing that clearly explains this improvement. One hypothesis is that Anthropic released an update during testing (TBD).
- Codex offers efficiency similar to Copilot, with a much faster time to completion. The main drawback is setup complexity if you want good reporting. Once configured, reporting is fairly consistent. However, line number mismatches sometimes force Codex to fall back to a single aggregated comment instead of standalone PR review comments.

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

## Round 5 (PR #16) - Copilot vs Claude Code vs Codex

NOTE: This round is using FRESH injected issues.

- Claude Code completed in 8 minutes and the review cost 4$.
- Codex completed in less than 2 minutes and the review cost about 10 cents.
- Copilot completed in about 5 minutes.
- Claude Claude Code reporting was much better than the others though, it provided a lot of information about the issues, including link to the WCAG standard when applicable.

### Summary

- Total intentional issues: 32
- Copilot coverage: 29/32 (90.6%)
- Codex coverage: 28/32 (87.5%)
- Claude Code coverage: 20/32 (62.5%)

Best overall coverage: Copilot, with Codex close behind. Claude Code missed several routing, logging, and accessibility items this round.

### Matrix

| Intentional Issue | Copilot | Claude Code | Codex |
| --- | --- | --- | --- |
| Invalid `lang="en_US"` (BCP-47) | Yes | Yes | Yes |
| `useDeferredRegistrations` called with unstable `deferredData` | No | No | No |
| `useProtectedDataQueries` unstable query key | Yes | Yes | Yes |
| Missing `waitForProtectedData` on AppRouter | No | No | No |
| `PublicRoutes` removed from host root | Yes | Yes | Yes |
| `/login` registered to NotFound | Yes | No | Yes |
| Duplicate nav item id | Yes | Yes | Yes |
| Empty `aria-label` on nav | Yes | Yes | No |
| `NavLink` removed from tab order | Yes | Yes | Yes |
| `$visibility: "public"` on `/employees/add` | Yes | No | Yes |
| Missing `parentId` for `/employees/reports` | Yes | No | Yes |
| Deferred registration callback never executed | Yes | No | No |
| Scroll listener no cleanup + layout thrash | Yes | Yes | Yes |
| XSS via `dangerouslySetInnerHTML` | Yes | Yes | Yes |
| Icon-only button lacks accessible name | Yes | Yes | Yes |
| `div role="button"` not keyboard accessible | No | No | Yes |
| `aria-hidden` on `<h1>` | Yes | No | Yes |
| Duplicate IDs in table rows | Yes | Yes | Yes |
| Image missing `alt` (EmployeeListPage) | Yes | Yes | Yes |
| Label/id mismatch in Department filter | Yes | Yes | Yes |
| Log chain without terminal method | Yes | No | Yes |
| Heading `h1` to `h3` | Yes | No | Yes |
| `http://` image missing `alt` and dimensions | Yes | Yes | Yes |
| Unlabeled "Internal notes" input | Yes | No | Yes |
| Broken label associations | Yes | Yes | Yes |
| Validation scope not ended | Yes | Yes | Yes |
| `outline: none` | Yes | Yes | Yes |
| Low nav contrast | Yes | Yes | Yes |
| Error text invisible | Yes | Yes | Yes |
| Manual Telemetry Id / Device Id | Yes | Yes | Yes |
| Direct `LogRocket.identify` | Yes | Yes | Yes |
| `logger.error` for success | Yes | No | Yes |

## Round 6 (PR #18) - Copilot vs Claude Code vs Codex

NOTE: This round is using FRESH injected issues.

- Claude Code completed in 2 minutes.
- Codex completed in 1 minutes.
- Codex reporting was pretty good.
- Claude Code reporting was in a single comment.

### Summary

- Total intentional issues: 26
- Copilot coverage: 19/26 (73.1%)
- Claude Code coverage: 22/26 (84.6%)
- Codex coverage: 22/26 (84.6%)

Best overall coverage: Claude Code and Codex tied for first, with Copilot trailing. Missed by all: missing `waitForProtectedData`.

### Matrix

| Intentional Issue | Copilot | Claude Code | Codex |
| --- | --- | --- | --- |
| Unstable query key (Math.random) | Yes | Yes | Yes |
| Missing waitForProtectedData | No | No | No |
| PublicRoutes removed from root | No | Yes | Yes |
| 404 registered as protected (registerRoute) | Yes | No | Yes |
| /login registered as protected | Yes | No | No |
| Duplicate navigation item id ($id) | No | Yes | Yes |
| Nav links removed from tab order (tabIndex=-1) | Yes | Yes | Yes |
| Nav hidden from AT (aria-hidden) | Yes | Yes | Yes |
| Invalid parentId for /employees/reports | Yes | Yes | Yes |
| Resize listener + layout thrash without cleanup | Yes | Yes | Yes |
| setInterval without cleanup | Yes | Yes | Yes |
| aria-describedby references missing element | No | Yes | Yes |
| Duplicate id='search' on input/select | No | Yes | Yes |
| Empty aria-label on button | Yes | Yes | No |
| Button removed from tab order (tabIndex=-1) | Yes | Yes | Yes |
| Span role=button without keyboard support | Yes | Yes | Yes |
| aria-live='assertive' for non-urgent updates | Yes | Yes | No |
| Table role=presentation on data table | Yes | Yes | Yes |
| target=_blank without context | Yes | Yes | Yes |
| Mixpanel track called on render | Yes | No | Yes |
| logger.critical used for render | Yes | Yes | Yes |
| email aria-describedby points to missing id | No | Yes | Yes |
| Employee code label not associated | Yes | Yes | Yes |
| Emergency email input is read-only | No | Yes | Yes |
| Input text invisible (color == background) | Yes | Yes | Yes |
| Link color low contrast | Yes | Yes | Yes |

## Round 7 (PR #21) - Copilot vs Claude Code vs Codex

### Summary

NOTE: This round is using FRESH injected issues and Claude Code was configured with the Haiku model.

- Claude Code completed in 1 minute.
- Codex completed in 3 minutes.
- Codex reporting was in a single comment due to some of the line numbers in Codex’s output not mapping PR diff lines.
- Claude Code reporting was in multiple single comments.

- Total intentional issues: 38
- Copilot coverage: 30/38 (78.9%)
- Claude Code coverage: 14/38 (36.8%)
- Codex coverage: 35/38 (92.1%)

Best overall coverage: Codex, with Copilot second. Claude Code missed a large number of telemetry/logging and Squide-specific items in this round.

### Matrix

| Intentional Issue | Copilot | Claude Code | Codex |
| --- | --- | --- | --- |
| useProtectedDataQueries wrong shape | Yes | No | Yes |
| unstable query key (Math.random) | Yes | No | Yes |
| useDeferredRegistrations not called | Yes | No | Yes |
| missing waitForProtectedData | No | No | Yes |
| useRenderedNavigationItems wrong signature | Yes | No | Yes |
| nav links removed from tab order | Yes | Yes | Yes |
| nav aria-label empty | Yes | Yes | Yes |
| PublicRoutes removed | Yes | No | Yes |
| duplicate nav id | Yes | Yes | Yes |
| manual telemetry ids | Yes | No | Yes |
| direct LogRocket usage | Yes | No | Yes |
| validation scope not ended | No | No | Yes |
| log chain not terminated | Yes | No | Yes |
| logger.error for success | Yes | No | No |
| header image missing alt | Yes | No | Yes |
| image missing dimensions (CLS) | No | No | Yes |
| first name label mismatch | Yes | Yes | Yes |
| last name label mismatch | Yes | Yes | Yes |
| email aria-describedby missing | Yes | No | Yes |
| emergency email read-only | No | No | Yes |
| hire date id duplicate | No | Yes | Yes |
| scroll listener no cleanup | Yes | Yes | Yes |
| interval no cleanup | Yes | Yes | Yes |
| h1 aria-hidden | Yes | Yes | Yes |
| header image missing alt (list) | Yes | No | No |
| filter aria-describedby missing | Yes | No | Yes |
| department select id mismatch | No | Yes | Yes |
| empty aria-label on clear | Yes | Yes | Yes |
| span role button | Yes | Yes | No |
| aria-live assertive | Yes | No | No |
| table role presentation | Yes | No | Yes |
| duplicate ids in rows | Yes | No | Yes |
| target blank without rel | Yes | No | Yes |
| XSS via dangerouslySetInnerHTML | Yes | Yes | Yes |
| invalid parentId | Yes | Yes | Yes |
| outline none input | No | No | Yes |
| outline none button | Yes | No | Yes |
| nav contrast low | No | No | Yes |
| error text invisible | No | No | Yes |

## Round 8 (PR #25) - Copilot vs Claude Code vs Codex

NOTE: This round is using FRESH injected issues and Claude Code was inspired by [SG crawler](https://github.com/workleap/sg-crawler/blob/b5acbac96e13eb1912900886be683b7c87d02d4f/.github/workflows/claude-code-review.yml#L44) workflow.

- Claude Code completed in 4 minute.
- Codex completed in 3 minutes.
- Codex reporting was in a single comment due to some of the line numbers in Codex’s output not mapping PR diff lines.
- Claude Code reporting was in a singlement comment (as configured in the workflow).
- I suspect Claude Code had issues loading the agent skills (I removed the `.claude/skills` folder).

### Summary

- Total intentional issues: 49
- Copilot coverage: 41/49 (83.7%)
- Claude Code coverage: 16/49 (32.7%)
- Codex coverage: 32/49 (65.3%)

Best overall coverage: Copilot, with Codex second. Claude Code missed many Squide/telemetry/logging issues in this round.

### Matrix

| Intentional Issue | Copilot | Claude Code | Codex |
| --- | --- | --- | --- |
| Invalid lang tag (en_US) | No | Yes | No |
| useProtectedDataQueries wrong shape | Yes | No | Yes |
| Unstable query key (Math.random) | Yes | Yes | Yes |
| useDeferredRegistrations misuse | Yes | No | Yes |
| Missing waitForProtectedData | No | No | No |
| useRenderedNavigationItems wrong signature | Yes | No | Yes |
| Nav links removed from tab order | Yes | Yes | Yes |
| Nav aria-label empty | Yes | Yes | Yes |
| PublicRoutes removed | Yes | Yes | Yes |
| 404 registered as protected | Yes | No | No |
| /login registered as protected | Yes | No | No |
| Duplicate nav id | Yes | Yes | Yes |
| Edit route made public | Yes | No | No |
| Invalid parentId | Yes | No | Yes |
| $visibility public on route | No | No | No |
| Scroll listener no cleanup | Yes | No | Yes |
| Interval no cleanup | Yes | Yes | Yes |
| H1 aria-hidden | Yes | Yes | Yes |
| Header image missing alt | Yes | Yes | Yes |
| Header image missing dimensions | Yes | No | No |
| Filter aria-describedby missing | Yes | No | Yes |
| Department select id mismatch | No | No | Yes |
| Empty aria-label on clear | Yes | No | No |
| Clear button removed from tab order | Yes | No | No |
| Span role button | Yes | No | Yes |
| aria-live assertive | Yes | No | No |
| Table role presentation | Yes | Yes | Yes |
| Duplicate ids in rows | Yes | No | No |
| target=_blank without rel | Yes | No | Yes |
| XSS via dangerouslySetInnerHTML | Yes | Yes | Yes |
| Icon-only print button lacks name | Yes | No | Yes |
| Manual telemetry ids | Yes | No | Yes |
| Direct LogRocket usage | Yes | No | No |
| Validation scope not ended | Yes | No | Yes |
| Log chain not terminated | Yes | Yes | Yes |
| logger.error for success | Yes | No | No |
| Heading level h3 | Yes | Yes | No |
| HTTP image without alt | Yes | No | No |
| First name label mismatch | Yes | Yes | Yes |
| Last name label mismatch | Yes | Yes | Yes |
| Email aria-describedby missing | Yes | No | Yes |
| Internal notes missing label | No | No | Yes |
| Hire date id duplicate | No | Yes | Yes |
| Emergency email read-only | Yes | No | No |
| Input text invisible | Yes | No | Yes |
| Button outline none | Yes | No | No |
| Link color low contrast | Yes | No | Yes |
| Nav contrast low | No | No | Yes |
| Error text invisible | No | No | Yes |

## Findings

### Claude Code can only validate the changes of the PR even if instructions say otherwise

Your CLAUDE.md says "review the entire file for /accessibility", but the plugin's internal validation logic says "pre-existing issues are false positives" - and the plugin     
wins.

This is a fundamental limitation of the code-review@claude-code-plugins plugin. It's designed to only comment on issues introduced by the PR, regardless of what your CLAUDE.md 
says.
