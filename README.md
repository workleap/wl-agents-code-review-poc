## Conclusion

- All three agents support agent skills for code reviews 🚀
- All three agrents are struggling to support MCP server 😞
- My recommendation is to either:
    - Use Copilot for ease of configuration (up and running in ~30 seconds), best-in-class reporting and consistent reporting.
    - Use Claude Code (without the code review plugin) for faster time to completion and early available of new features.

### Notes

- Copilot is the easiest to configure, and provides solid code reviews overall. Its reporting (PR comments) is the most polished of the three. The main downside is a significantly higher time to completion compared to the others. I don’t have visibility into the average cost of a Copilot code review.
- Codex offers efficiency similar to Copilot, with an average time to completion Reporting is inconsistent: sometimes it posts individual PR review comments using the GitHub MCP Server, and sometimes it reports everything in a single comment. Time to completion and cost were initially high, but both dropped by roughly 300% over subsequent runs. I made a few changes, but nothing that clearly explains this improvement. One hypothesis is that Anthropic released an update during testing (TBD).
- Codex offers efficiency similar to Copilot, with a much faster time to completion. The main drawback is setup complexity if you want good reporting. Once configured, reporting is fairly consistent. However, line number mismatches sometimes force Codex to fall back to a single aggregated comment instead of standalone PR review comments.

## Round 1 (PR #2) - Copilot vs Claude Code

(IGNORE)

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

(IGNORE - was reusing injected issues)

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

(IGNORE - was reusing injected issues)

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

(IGNORE - was reusing injected issues)

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
- Claude Code reporting was in a single comment (as configured in the workflow).
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

## Round 9 (PR #27) - Copilot vs Claude Code vs Codex

NOTE: This round is using FRESH injected issues and Claude Code was inspired by [SG crawler](https://github.com/workleap/sg-crawler/blob/b5acbac96e13eb1912900886be683b7c87d02d4f/.github/workflows/claude-code-review.yml#L44) workflow.

- Claude Code completed in 4 minute.
- Codex completed in 3 minutes.
- Confirmed that Claude Code has been able to load the agent skills (https://github.com/workleap/wl-agents-code-review-poc/pull/27#issuecomment-3855302823) but it seems to be having problems reporting the issues found with the knowledge of the agent skills:
    - `Claude requested permissions to write to /tmp/pr_review.md, but you haven't granted it yet.`
    - I tried to fix this issue by updating the `pull-requests` and `issues` from `read` to `write` but it's not working.

### Summary

- Total intentional issues: 46
- Copilot coverage: 39/46 (84.8%)
- Claude Code coverage: 12/46 (26.1%)
- Codex coverage: 29/46 (63.0%)

Best overall coverage: Copilot, with Codex second. Claude Code missed most of the Squide/telemetry/logging issues in this round.

### Matrix

| Intentional Issue | Copilot | Claude Code | Codex |
| --- | --- | --- | --- |
| Missing lang attribute | Yes | Yes | Yes |
| useProtectedDataQueries in bootstrapping | Yes | No | Yes |
| Unstable query key (Date.now) | Yes | No | Yes |
| useDeferredRegistrations not called | Yes | No | No |
| useRenderedNavigationItems wrong signature | Yes | No | Yes |
| Nav link aria-label empty | Yes | Yes | Yes |
| Main aria-hidden | Yes | Yes | Yes |
| PublicRoutes removed | Yes | Yes | Yes |
| 404 registered as protected | Yes | Yes | Yes |
| /login registered as protected | No | No | No |
| Duplicate nav id | Yes | Yes | Yes |
| Mandates route made public | Yes | No | Yes |
| Invalid parentId | Yes | Yes | No |
| Scroll listener no cleanup | Yes | No | Yes |
| Interval no cleanup | Yes | Yes | Yes |
| H1 aria-hidden | Yes | Yes | No |
| Header image missing alt | Yes | Yes | Yes |
| Filter aria-describedby missing | Yes | No | No |
| Department select id mismatch | Yes | No | No |
| Empty aria-label on clear | Yes | No | Yes |
| Clear button removed from tab order | Yes | No | Yes |
| Span role button | Yes | No | Yes |
| aria-live assertive | Yes | No | No |
| Table role presentation | Yes | Yes | Yes |
| Duplicate ids in rows | Yes | No | Yes |
| target=_blank without rel | Yes | No | Yes |
| XSS via dangerouslySetInnerHTML | Yes | No | Yes |
| Icon-only print button lacks name | Yes | No | Yes |
| Manual telemetry ids | Yes | No | Yes |
| Direct LogRocket usage | Yes | No | No |
| Validation scope not ended | No | No | Yes |
| Log chain not terminated | Yes | No | Yes |
| logger.error for success | No | No | No |
| Heading level h3 | Yes | Yes | No |
| HTTP image without alt | Yes | No | No |
| First name label mismatch | Yes | No | Yes |
| Last name label mismatch | Yes | No | No |
| Email aria-describedby missing | Yes | No | Yes |
| Internal notes missing label | No | No | No |
| Hire date id duplicate | Yes | No | No |
| Emergency email read-only | No | No | Yes |
| Input text invisible | Yes | No | Yes |
| Button outline none | Yes | No | No |
| Link color low contrast | Yes | No | Yes |
| Nav contrast low | No | No | No |
| Error text invisible | No | No | No |

## Round 10 (PR #30) - Copilot vs Claude Code vs Codex

NOTE: This round is using FRESH injected issues and Claude Code was inspired by [SG crawler](https://github.com/workleap/sg-crawler/blob/b5acbac96e13eb1912900886be683b7c87d02d4f/.github/workflows/claude-code-review.yml#L44) workflow.

- Claude Code completed in 4 minutes.
- Codex completed in 2 minutes.
- Fixed the Claude Code issues to report the issues discovered with the agent skills knowledge by adding `Write` to `allowed_tools`. 

### Summary

- Total intentional issues: 46
- Copilot coverage: 35/46 (76.1%)
- Claude Code coverage: 33/46 (71.7%)
- Codex coverage: 28/46 (60.9%)

Best overall coverage: Copilot, with Claude Code close behind. Codex missed several accessibility and telemetry issues in this round.

### Matrix

| Intentional Issue | Copilot | Claude Code | Codex |
| --- | --- | --- | --- |
| Invalid lang tag (english) | No | Yes | No |
| useProtectedDataQueries conditional | Yes | Yes | Yes |
| Unstable query key (Date.now) | Yes | No | Yes |
| useDeferredRegistrations unstable | Yes | No | Yes |
| useRenderedNavigationItems wrong signature | Yes | Yes | Yes |
| Nav links removed from tab order | Yes | Yes | Yes |
| Nav aria-hidden | Yes | Yes | Yes |
| PublicRoutes removed | Yes | Yes | Yes |
| 404 registered as protected | Yes | No | Yes |
| /login registered as protected | Yes | No | No |
| Duplicate nav id | Yes | Yes | Yes |
| Edit route made public | Yes | No | No |
| Invalid parentId | Yes | Yes | Yes |
| Scroll listener no cleanup | Yes | Yes | Yes |
| Interval no cleanup | Yes | Yes | Yes |
| H1 aria-hidden | Yes | Yes | Yes |
| Header image missing alt | Yes | Yes | No |
| Filter aria-describedby missing | Yes | No | No |
| Department select id mismatch | No | Yes | Yes |
| Empty aria-label on clear | Yes | Yes | No |
| Clear button removed from tab order | Yes | Yes | No |
| Span role button | Yes | Yes | Yes |
| aria-live assertive | Yes | Yes | No |
| Table role presentation | Yes | Yes | Yes |
| Duplicate ids in rows | Yes | Yes | Yes |
| target=_blank without rel | Yes | Yes | Yes |
| XSS via dangerouslySetInnerHTML | Yes | Yes | Yes |
| Icon-only print button lacks name | Yes | No | No |
| Manual telemetry ids | No | Yes | Yes |
| Direct LogRocket usage | No | Yes | Yes |
| Validation scope not ended | Yes | Yes | Yes |
| Log chain not terminated | Yes | No | Yes |
| logger.error for success | Yes | Yes | No |
| Heading level h3 | No | Yes | No |
| HTTP image without alt | Yes | Yes | No |
| First name label mismatch | Yes | Yes | Yes |
| Last name label mismatch | Yes | Yes | No |
| Email aria-describedby missing | Yes | No | No |
| Internal notes missing label | No | Yes | Yes |
| Hire date id duplicate | No | Yes | Yes |
| Emergency email read-only | No | No | No |
| Input text invisible | Yes | Yes | Yes |
| Button outline none | No | No | No |
| Link color low contrast | Yes | Yes | Yes |
| Nav contrast low | No | No | No |
| Error text invisible | No | No | No |

## Round 11 (PR #35) - Copilot vs Claude Code vs Codex

NOTE: This round is using FRESH injected issues and Claude Code was inspired by [SG crawler](https://github.com/workleap/sg-crawler/blob/b5acbac96e13eb1912900886be683b7c87d02d4f/.github/workflows/claude-code-review.yml#L44) workflow.

- This is the first review round since the app has been migrated to Hopper.
- Injected issues now includes Hopper issues and the review instructions now mention to use Hopper MCP server.
- Claude Code completed in 2 minutes.
- Codex completed in 2 minutes.
- Fixed the Claude Code issues to report the issues discovered with the agent skills knowledge by adding `Write` to `allowed_tools`.

### Coverage Summary

| Agent | Issues Found | Coverage |
| --- | --- | --- |
| Codex | 30 / 33 | 90.9% |
| Copilot | 29 / 33 | 87.9% |
| Claude Code | 28 / 33 | 84.8% |
| All 3 agents (overlap) | 26 / 33 | 78.8% |

### Matrix

| Intentional Issue | Copilot | Claude Code | Codex |
| --- | --- | --- | --- |
| Invalid `lang="english"` | Yes | Yes | Yes |
| Conditional `useProtectedDataQueries` hook | Yes | Yes | Yes |
| `Date.now()` unstable key/data in `App.tsx` | No | No | Yes |
| `ProtectedRoutes` removed from host root | Yes | Yes | Yes |
| Duplicate nav item id (`home`) | Yes | Yes | Yes |
| `useRenderedNavigationItems` called with 4th arg | Yes | Yes | Yes |
| `tabIndex={-1}` on nav links | Yes | Yes | Yes |
| `aria-hidden="true"` on nav | Yes | Yes | Yes |
| Route `$visibility` misuse in employee register | Yes | Yes | No |
| Missing route parent (`missing-parent-route`) | Yes | Yes | Yes |
| Scroll listener/interval leak + layout thrash | Yes | Yes | Yes |
| `aria-hidden="true"` on main `H1` | Yes | No | Yes |
| Missing `alt` on list page image | Yes | Yes | Yes |
| Missing `aria-describedby` target (`filter-hint`) | No | No | Yes |
| Empty `aria-label` + `tabIndex={-1}` on Clear button | Yes | Yes | Yes |
| `span role="button"` not keyboard accessible | Yes | Yes | Yes |
| `role="presentation"` on data table | Yes | Yes | Yes |
| Duplicate IDs in employee list rows | Yes | Yes | Yes |
| `target="_blank"` missing `rel` | Yes | Yes | Yes |
| `dangerouslySetInnerHTML` XSS | Yes | Yes | Yes |
| Add page image missing `alt` + HTTP | Yes | Yes | Yes |
| Broken label/id associations in add page | Yes | Yes | Yes |
| Duplicate `id="email"` in add page | Yes | Yes | Yes |
| Missing `aria-describedby` target (`email-help`) | No | Yes | No |
| Validation scope created, never ended | Yes | Yes | Yes |
| Logging chain not finalized | Yes | Yes | Yes |
| Success logged with `error` level | Yes | Yes | Yes |
| Manual `"Telemetry Id"` / `"Device Id"` | Yes | Yes | Yes |
| Direct `LogRocket.identify` usage | Yes | Yes | Yes |
| Global focus outline removal (`outline: none`) | Yes | Yes | Yes |
| Low contrast nav links (`#444` on `#333`) | Yes | No | Yes |
| Invisible alert text (`#f8d7da` on `#f8d7da`) | Yes | Yes | Yes |
| Heading downgrade (`H1` -> title3) | No | No | No |

### Not Reported By All Agents

- `Date.now()` unstable key/data (`src/App.tsx`)
- Route `$visibility` misuse (`src/modules/employee/register.tsx`)
- `aria-hidden` on main `H1` (`src/modules/employee/pages/EmployeeListPage.tsx`)
- Missing `aria-describedby="filter-hint"` target (`src/modules/employee/pages/EmployeeListPage.tsx`)
- Missing `aria-describedby="email-help"` target (`src/modules/employee/pages/AddEmployeePage.tsx`)
- Low contrast nav links (`src/index.css`)
- Heading downgrade (`H1` -> title3) (missed by all)

## Round 12 (PR #38) - Copilot vs Claude Code vs Codex

### Coverage Summary

| Agent | Issues Found | Coverage |
| --- | --- | --- |
| Claude Code | 46 / 49 | 93.9% |
| Copilot | 45 / 49 | 91.8% |
| Codex | 26 / 49 | 53.1% |
| Missed by all 3 | 2 / 49 | 4.1% |

### Matrix

| Intentional Issue | Copilot | Claude Code | Codex |
| --- | --- | --- | --- |
| Invalid html lang tag en-US-English | Yes | Yes | Yes |
| HopperProvider withCssVariables=false | Yes | Yes | No |
| HopperProvider invalid locale english-us | Yes | Yes | No |
| Date.now in query key | Yes | Yes | Yes |
| Deferred data uses Date.now each render | Yes | Yes | Yes |
| PublicRoutes removed from host root | Yes | Yes | Yes |
| Catch-all route registered with registerRoute | No | No | No |
| /admin registered as public route | No | Yes | No |
| Duplicate nav item id home | Yes | Yes | Yes |
| NavLink empty aria-label | Yes | Yes | Yes |
| NavLink tabIndex -1 in nav | Yes | Yes | Yes |
| Hardcoded nav colors #444/#333 | Yes | Yes | No |
| UL aria-hidden true | Yes | Yes | No |
| Nav role presentation | Yes | Yes | No |
| $visibility public on registerRoute | Yes | Yes | Yes |
| Edit route made public | Yes | Yes | Yes |
| Missing parentPath /missing-parent | Yes | Yes | Yes |
| useEffect listener no cleanup | Yes | Yes | Yes |
| Layout thrash via getBoundingClientRect+body width | Yes | Yes | No |
| EmployeeList wrapper hardcoded low-contrast style | Yes | Yes | No |
| H1 aria-hidden on list page | Yes | Yes | No |
| List page image missing alt | Yes | Yes | No |
| Missing describedby target employee-filters-hint | Yes | Yes | No |
| Department select wrong id search-field | Yes | Yes | No |
| Clear Filters button empty aria-label | Yes | Yes | Yes |
| Clear Filters button tabIndex -1 | Yes | Yes | Yes |
| Span role button lacks keyboard support | Yes | Yes | Yes |
| Icon-only print button no accessible label | Yes | Yes | No |
| aria-live assertive on count text | Yes | Yes | No |
| Table role presentation | Yes | Yes | Yes |
| Duplicate id employee-name | Yes | Yes | Yes |
| Duplicate id employee-email | Yes | Yes | Yes |
| target=_blank missing rel | No | Yes | Yes |
| XSS via dangerouslySetInnerHTML filters.search | Yes | Yes | Yes |
| validationScope created unused/unended | Yes | Yes | Yes |
| Unterminated logging chain withText/withObject | Yes | Yes | Yes |
| Success logged using logger.error | Yes | Yes | No |
| Manual Telemetry Id and Device Id | Yes | Yes | Yes |
| Direct LogRocket.identify usage | Yes | Yes | Yes |
| Add page H1 aria-hidden | Yes | Yes | No |
| Add page image missing alt | Yes | Yes | Yes |
| Missing describedby target employee-email-help | Yes | Yes | No |
| Duplicate id email on Hire Date | Yes | Yes | Yes |
| Internal notes TextField has no label | Yes | Yes | No |
| Emergency email TextField read-only value without onChange | No | No | No |
| Legacy label htmlFor first_name mismatch input id | Yes | Yes | No |
| Hopper CSS override via .hop-* with !important | Yes | Yes | No |
| Focus outline removed globally | Yes | Yes | Yes |
| Alert text invisible same fg/bg | Yes | No | No |

### Injected Issues Missed By All Agents

- Catch-all route registered with `registerRoute` (`src/host/register.tsx`)
- Emergency email TextField read-only value without `onChange` (`src/modules/employee/pages/AddEmployeePage.tsx`)

## Round 13 (PR #49) - Copilot vs Claude Code vs Codex

NOTE: This round is using FRESH injected issues and Claude Code was inspired by [SG crawler](https://github.com/workleap/sg-crawler/blob/b5acbac96e13eb1912900886be683b7c87d02d4f/.github/workflows/claude-code-review.yml#L44) workflow.

- This is the first review round for which Hopper MCP works for Claude, other agents still can't use MCP server because somehow no agents is able to read then `.mcp.json` file.
- Claude Code completed in 4 minutes.
- Codex completed in 2 minutes.

### Data Collection

All PR comment sources were fetched with pagination:

- `issues/49/comments`: 1 page, 2 comments
- `pulls/49/comments` (inline review comments): 1 page, 44 comments
- `pulls/49/reviews`: 1 page, 1 review

### Issue Count Summary

Percentages below are coverage against injected issues for this round.
Injected issues baseline used for coverage: `50`.

| Agent | Issues Found | Coverage |
| --- | --- | --- |
| Copilot | 44 / 50 | 88.0% |
| Claude Code | 29 / 50 | 58.0% |
| Codex | 18 / 50 | 36.0% |

### Comparison Matrix (Normalized Issue Topics)

| Issue Topic | Copilot | Claude Code | Codex |
| --- | --- | --- | --- |
| HTTP third-party script in `public/index.html` | Yes | Yes | Yes |
| Meta refresh reload | Yes | No | Yes |
| Bootstrap interval leak in `src/App.tsx` | Yes | Yes | Yes |
| Empty spinner aria-label | Yes | Yes | Yes |
| Catch-all route conflict in host routes | Yes | Yes | Yes |
| Duplicate nav id `home` | Yes | No | Yes |
| Duplicate module registration (`registerEmployeeModule` twice) | Yes | Yes | Yes |
| Wrong component on employee edit/mandates routes | Yes | Yes | Yes |
| Duplicate nav id `employees` | Yes | Yes | Yes |
| Public exposure via `registerPublicRoute` for employee pages | Yes | No | No |
| Add page PII logging/storage | Yes | No | Yes |
| Edit page interval/listener cleanup leak | Yes | Yes | Yes |
| Edit page PII storage/logging | Yes | No | No |
| 20k analytics array perf issue | Yes | Yes | Yes |
| Scroll layout thrash / missing cleanup | Yes | Yes | No |
| `dangerouslySetInnerHTML` XSS risk | Yes | Yes | Yes |
| `key={Math.random()}` unstable keys | No | Yes | Yes |
| Empty search field label | Yes | No | Yes |
| In-place sort mutation in list page | Yes | Yes | No |
| Validation weakening (email/required/date) | Yes | Yes | No |
| Aggressive React Query settings | Yes | Yes | No |
| Hopper style/token violations | No | Yes | No |
| `document.title` side effect during render | Yes | No | No |
| `adminComment` not in shared form type | Yes | No | No |
| `getAllMandates()` vs "active mandates" mismatch | Yes | Yes | No |
| `target="_blank"` without `rel` | No | No | Yes |

### Missed By All Agents

- Per-keystroke localStorage write of search term (`src/modules/employee/pages/EmployeeListPage.tsx`)
- Form `autoComplete="off"` regression (`src/modules/employee/pages/AddEmployeePage.tsx`)
- Focus outline removal via inline style (`src/modules/employee/pages/EditEmployeePage.tsx`)
- Low-contrast/weak-weight mandate label styling (`src/modules/employee/pages/AssignMandatesPage.tsx`)
- Hardcoded wrapper width `maxWidth: "99.5%"` around `<Outlet />` (`src/App.tsx`)
- Hardcoded main width `maxWidth: "99.7%"` (`src/host/RootLayout.tsx`)

## Round 14 (PR #49) - Copilot vs Claude Code vs Codex

### Data Collection

All PR comment sources were fetched with pagination:

- `issues/49/comments`: 1 page, 2 items
- `pulls/49/comments` (inline review comments): 1 page, 44 items
- `pulls/49/reviews`: 1 page, 1 item

### Coverage Summary

Injected issues baseline for this round: `69`.

| Agent | Issues Found | Coverage |
| --- | --- | --- |
| Copilot | 33 / 69 | 47.8% |
| Claude Code | 22 / 69 | 31.9% |
| Codex | 14 / 69 | 20.3% |

### Comparison Matrix (Reported Issues)

| Reported Issue | Copilot | Claude Code | Codex |
| --- | --- | --- | --- |
| Meta refresh forced reload | Yes | No | Yes |
| HTTP third-party script in `index.html` | Yes | Yes | Yes |
| Bootstrapping interval leak | No | No | Yes |
| Empty spinner aria-label | Yes | Yes | No |
| `document.title` side-effect in render | Yes | No | No |
| Public `/employees/:id/edit` host conflict | Yes | Yes | No |
| Host catch-all route conflict | Yes | Yes | Yes |
| Duplicate nav id `home` | Yes | No | Yes |
| Employee list/add exposed as public routes | Yes | Yes | No |
| Duplicate `/employees/:id/edit` to Add page | No | Yes | Yes |
| Duplicate nav id `employees` | Yes | No | Yes |
| Navigation order reversed with `.reverse()` | Yes | No | No |
| Hardcoded Hopper nav colors/tokens bypass | No | Yes | No |
| Employee module registered twice | No | Yes | Yes |
| Aggressive React Query settings | Yes | Yes | No |
| Large `analyticsNoise` allocation | Yes | Yes | Yes |
| Scroll layout thrash/listener leak | Yes | Yes | No |
| List interval leak | Yes | No | No |
| In-place `.sort()` mutation | Yes | Yes | No |
| `window.location.hash` mutation on clear | Yes | No | No |
| `H1` with `role="presentation"` | Yes | No | No |
| List image HTTP/missing alt issue | Yes | Yes | No |
| Empty SearchField label | No | No | Yes |
| Invalid font weight (`930`) | No | Yes | No |
| `key={Math.random()}` | Yes | Yes | Yes |
| Duplicate `id="employee-cell"` | No | Yes | No |
| `dangerouslySetInnerHTML` XSS | Yes | Yes | Yes |
| `target="_blank"` without `rel` | No | No | Yes |
| PII log of `employee.email` from list action | Yes | No | No |
| Add page keydown listener leak | Yes | Yes | No |
| Add page validation weakened | Yes | No | No |
| Add page payload logging with PII | Yes | No | No |
| Add page image HTTP/missing alt | Yes | Yes | No |
| Add page email `type="text"` | Yes | No | No |
| Unlabeled internal note field | Yes | No | No |
| `adminComment` outside shared type | Yes | No | No |
| Edit page stores email in localStorage | Yes | Yes | Yes |
| Edit page validation weakened | Yes | No | No |
| Edit page payload logging with PII | Yes | No | No |
| Edit spinner empty aria-label | No | Yes | No |
| Assign page uses `getAllMandates()` | Yes | Yes | No |
| Assign label low contrast/weak weight | Yes | No | No |

### Missed By All Agents

- Invalid `lang="en_US"` value
- `HopperProvider withCssVariables={false}`
- Invalid Hopper locale (`english-canada`)
- Hardcoded `maxWidth: "99.2%"` outlet wrapper
- `ProtectedRoutes` removed from host root
- `/login` registered with `registerRoute`
- Duplicate `/employees/:id/mandates` pointing to Add page
- Inline style on Hopper `Nav`/`Main`
- External class-based Hopper override (`legacy-nav`)
- Global Hopper token override in CSS variables
- Global focus outline removal
- Search term persisted to localStorage
- Clear button empty `aria-label` + `tabIndex={-1}`
- Table `role="presentation"`
- `span role="button"` without keyboard support
- Validation errors logged as `critical`
- Add page stores full employee object in localStorage
- Success logged at error level
- Cancel logged at error level
- Add page `H1 aria-hidden="true"`
- `autoComplete="off"` on form
- Inline style on Hopper `Select`
- Edit page interval + resize listener cleanup leak
- Edit success logged as `critical`
- Edit page `outline: none`
- Assign cancel logged as `warning`
- Assign inline border-color style override

## Round 15 (PR #54) - Copilot vs Claude Code vs Codex

NOTE: This round uses FRESH injected issues (40 total). Codex was blocked because Hopper MCP was unavailable.

### Coverage Summary

| Agent | Issues Found | Coverage | Total Comments |
| --- | --- | --- | --- |
| Claude Code | 31 / 40 | 77.5% | 31 |
| Copilot | 28 / 40 | 70.0% | 56 |
| Codex | 0 / 40 | 0% | 0 (blocked) |

**Note:** Codex reported: *"Unable to complete required Hopper MCP validation: no Hopper MCP resources/tools are available"*

### Issues by Category

| Category | Total | Claude Code | Copilot |
| --- | --- | --- | --- |
| Hopper UI | 12 | 10 (83%) | 4 (33%) |
| Squide/Firefly | 10 | 9 (90%) | 5 (50%) |
| Accessibility | 10 | 6 (60%) | 9 (90%) |
| Performance | 4 | 4 (100%) | 4 (100%) |
| Security | 2 | 1 (50%) | 2 (100%) |
| Logging | 2 | 1 (50%) | 2 (100%) |

### Comparison Matrix

| # | Issue | Category | File | Claude | Copilot |
| --- | --- | --- | --- | --- | --- |
| 1 | Missing `lang` attribute | Accessibility | public/index.html | Yes | Yes |
| 2 | `user-scalable=no` | Accessibility | public/index.html | Yes | Yes |
| 3 | CSS override .hop-Button | Hopper | src/index.css | Yes | Yes |
| 4 | CSS override .hop-TextField | Hopper | src/index.css | Yes | Yes |
| 5 | Focus outline removal | Accessibility | src/index.css | Yes | Yes |
| 6 | Invalid locale format | Hopper | src/App.tsx | Yes | No |
| 7 | Unused `usePublicDataQueries` | Squide | src/App.tsx | Yes | Yes |
| 8 | Inline style on Hopper Div | Hopper | src/App.tsx | Yes | No |
| 9 | `console.log` usage | Logging | src/index.tsx | Yes | Yes |
| 10 | Suboptimal QueryClient defaults | Performance | src/index.tsx | Yes | Yes |
| 11 | Missing `ProtectedRoutes` | Squide | src/host/register.tsx | Yes | Yes |
| 12 | Route with both `index` and `path` | Squide | src/host/register.tsx | Yes | Yes |
| 13 | Duplicate navigation item `$id` | Squide | src/host/register.tsx | Yes | Yes |
| 14 | Navigation item missing `to` | Squide | src/host/register.tsx | Yes | Yes |
| 15 | Login route registered incorrectly | Squide | src/host/register.tsx | No | No |
| 16 | Invalid `useNavigationItems` option | Squide | src/host/RootLayout.tsx | Yes | No |
| 17 | `useRenderedNavigationItems` wrong signature | Squide | src/host/RootLayout.tsx | Yes | No |
| 18 | Hardcoded colors in NavLink | Hopper | src/host/RootLayout.tsx | Yes | No |
| 19 | `outline: "none"` in styles | Accessibility | src/host/RootLayout.tsx | Yes | Yes |
| 20 | `aria-hidden` on H1 | Accessibility | src/host/HomePage.tsx | Yes | Yes |
| 21 | Image without alt | Accessibility | src/host/HomePage.tsx | Yes | Yes |
| 22 | `style` prop on Grid | Hopper | src/host/HomePage.tsx | Yes | No |
| 23 | `target="_blank"` without `rel` | Security | src/host/HomePage.tsx | Yes | Yes |
| 24 | Generic link text "Click here" | Accessibility | src/host/HomePage.tsx | Yes | Yes |
| 25 | Raw hex color `#666666` | Hopper | src/host/HomePage.tsx | Yes | No |
| 26 | Raw hex color `#999999` | Hopper | src/host/NotFoundPage.tsx | Yes | No |
| 27 | Lazy import without Suspense | Performance | employee/register.tsx | Yes | Yes |
| 28 | `$visibility` on route object | Squide | employee/register.tsx | Yes | No |
| 29 | Non-existent `parentId` | Squide | employee/register.tsx | Yes | No |
| 30 | Deferred registration never executed | Squide | employee/register.tsx | Yes | No |
| 31 | `useEffect` without cleanup | Performance | EmployeeListPage.tsx | Yes | Yes |
| 32 | Layout thrashing | Performance | EmployeeListPage.tsx | Yes | Yes |
| 33 | `dangerouslySetInnerHTML` XSS | Security | EmployeeListPage.tsx | No | Yes |
| 34 | IconButton without accessible name | Accessibility | EmployeeListPage.tsx | No | Yes |
| 35 | `div` as button not keyboard accessible | Accessibility | EmployeeListPage.tsx | No | Yes |
| 36 | Duplicate IDs | Accessibility | EmployeeListPage.tsx | No | Yes |
| 37 | External CSS for Hopper | Hopper | EmployeeListPage.tsx | No | Yes |
| 38 | H3 as page heading | Accessibility | AddEmployeePage.tsx | No | Yes |
| 39 | Label/input ID mismatch | Accessibility | AddEmployeePage.tsx | No | Yes |
| 40 | Logging scope not ended | Logging | AddEmployeePage.tsx | No | Yes |

### Key Findings

1. **Claude excels at Hopper and Squide issues** - Found 10/12 Hopper (83%) and 9/10 Squide (90%) issues.
2. **Copilot excels at accessibility issues** - Found 9/10 accessibility issues (90%).
3. **Both found all performance issues** - 100% detection rate.
4. **Claude did NOT use Hopper MCP** - Despite being configured for it, no evidence of `validate_hopper_code` calls.
5. **Complementary strengths** - Together found 39/40 issues (97.5%).

### Missed By All Agents

- #15: Login route registered incorrectly (should use `registerPublicRoute` with proper component)

## Round 16 (PR #56) - Copilot vs Claude Code vs Codex

NOTE: This round uses FRESH injected issues (42 total). Codex was blocked again due to Hopper MCP unavailability.

### Coverage Summary

| Agent | Issues Found | Coverage | Total Comments |
| --- | --- | --- | --- |
| Copilot | 38 / 42 | 90.5% | 52 |
| Claude Code | 28 / 42 | 66.7% | 28 |
| Codex | 0 / 42 | 0% | 0 (blocked) |

**Note:** Codex reported: *"Hopper MCP validation required but no Hopper MCP tool is available in this environment"*

### Comparison Matrix

| # | File | Issue | Claude | Copilot |
| --- | --- | --- | --- | --- |
| 1 | public/index.html | Missing `lang` attribute | Yes | Yes |
| 2 | public/index.html | `user-scalable=no`, `maximum-scale=1.0` | Yes | Yes |
| 3 | public/index.html | `aria-hidden="true"` on root | Yes | Yes |
| 4 | public/index.html | `role="application"` on root | Yes | Yes |
| 5 | src/index.css | `*:focus { outline: none }` | Yes | Yes |
| 6 | src/index.css | `!important` font override | Yes | No |
| 7 | src/App.tsx | Unused import (useNavigationItems) | No | Yes |
| 8 | src/App.tsx | Invalid locale `"xyz-invalid"` | Yes | Yes |
| 9 | src/App.tsx | `setInterval` without cleanup | Yes | Yes |
| 10 | src/App.tsx | `UNSAFE_color` with hex value | No | No |
| 11 | src/App.tsx | Missing `aria-label` on Spinner | Yes | Yes |
| 12 | src/App.tsx | Inline `style` on Text | Yes | No |
| 13 | src/index.tsx | `console.log` usage | No | Yes |
| 14 | src/index.tsx | Exposing `queryClient` to window | Yes | Yes |
| 15 | src/index.tsx | Exposing `runtime` to window | Yes | Yes |
| 16 | src/index.tsx | `staleTime: 0` | Yes | Yes |
| 17 | src/host/register.tsx | Missing `ProtectedRoutes` | No | Yes |
| 18 | src/host/register.tsx | Duplicate nav ID `"home"` | Yes | Yes |
| 19 | src/host/register.tsx | Invalid path `"/*"` | No | No |
| 20 | src/host/RootLayout.tsx | `useEffect` without dependency array | Yes | Yes |
| 21 | src/host/RootLayout.tsx | `document.body.style` mutation | Yes | Yes |
| 22 | src/host/RootLayout.tsx | `role="menu"` on Nav | Yes | Yes |
| 23 | src/host/RootLayout.tsx | Hardcoded colors (hex) | No | No |
| 24 | src/host/HomePage.tsx | `useEffect` without deps (render loop) | Yes | Yes |
| 25 | src/host/HomePage.tsx | `window.open` without `noopener` | Yes | Yes |
| 26 | src/host/HomePage.tsx | Card onClick without keyboard | Yes | Yes |
| 27 | src/host/HomePage.tsx | `target="_blank"` without rel | Yes | No |
| 28 | src/host/NotFoundPage.tsx | Unhandled fetch promise | Yes | Yes |
| 29 | src/host/NotFoundPage.tsx | `accessKey` attribute | Yes | No |
| 30 | src/host/NotFoundPage.tsx | `tabIndex={-1}` on button | Yes | Yes |
| 31 | src/host/NotFoundPage.tsx | `javascript:` URL | Yes | Yes |
| 32 | employee/register.tsx | Path without leading slash | Yes | Yes |
| 33 | employee/register.tsx | Duplicate nav ID `"employees"` | Yes | Yes |
| 34 | employee/register.tsx | Unused `/delete` route | No | Yes |
| 35 | EmployeeListPage.tsx | `useEffect` without deps | Yes | Yes |
| 36 | EmployeeListPage.tsx | `dangerouslySetInnerHTML` XSS | No | Yes |
| 37 | EmployeeListPage.tsx | Array index as key (multiple) | No | Yes |
| 38 | EmployeeListPage.tsx | `handleExport` memory leak | Yes | Yes |
| 39 | EmployeeListPage.tsx | `target="_blank"` without rel | No | Yes |
| 40 | AddEmployeePage.tsx | `handleTextChange` not memoized | Yes | No |
| 41 | AddEmployeePage.tsx | Direct state mutation | No | Yes |
| 42 | AddEmployeePage.tsx | `useRef<any>` type issue | No | Yes |
| 43 | EditEmployeePage.tsx | `useSession` cast to `any` | No | Yes |
| 44 | EditEmployeePage.tsx | Unused `originalEmployee` state | No | Yes |
| 45 | EditEmployeePage.tsx | `console.log` in component | No | Yes |
| 46 | EditEmployeePage.tsx | Missing `logger` in deps | No | Yes |
| 47 | EditEmployeePage.tsx | Missing Spinner `aria-label` | No | Yes |
| 48 | AssignMandatesPage.tsx | Empty `aria-label` on button | No | Yes |
| 49 | AssignMandatesPage.tsx | Array index as key | No | Yes |
| 50 | src/shared/dataStore.ts | Direct array reference (no copy) | Yes | Yes |
| 51 | src/shared/dataStore.ts | `syncToStorage` in constructor | No | Yes |
| 52 | src/shared/dataStore.ts | Silent `catch` block | No | Yes |
| 53 | src/shared/dataStore.ts | `==` instead of `===` | No | Yes |
| 54 | src/shared/dataStore.ts | `delete` on array (sparse) | No | Yes |

### Issues Missed by All Agents

| # | File | Issue |
| --- | --- | --- |
| 1 | src/App.tsx | `UNSAFE_color` with hex value |
| 2 | src/host/register.tsx | Invalid path `"/*"` vs `"*"` |
| 3 | src/host/RootLayout.tsx | Hardcoded inline colors (hex) |
| 4 | src/host/HomePage.tsx | Wrong token type (`marginBottom="inline-xl"`) |
| 5 | src/host/HomePage.tsx | Wrong token type (`gap="inline-lg"`) |
| 6 | employee/register.tsx | `registerPublicRoute` for protected content |

### Key Findings

1. **Copilot significantly outperformed Claude** - 90.5% vs 66.7% coverage
2. **Copilot excels at React patterns** - Array keys, state mutations, hook dependencies
3. **Copilot excels at TypeScript issues** - Type assertions, unused variables
4. **Copilot excels at data layer issues** - DataStore caching, storage, equality operators
5. **Claude excels at accessibility** - accessKey, focus indicators, aria attributes
6. **Claude excels at Hopper** - Invalid locale, inline styles, !important overrides
7. **Neither detected Hopper token misuse** - Wrong token types (inline- for margins) missed by both
8. **Codex blocked again** - Still unable to access Hopper MCP in GitHub Actions
