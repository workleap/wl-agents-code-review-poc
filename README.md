## Findings

### Copilot vs Claude Code (Intentional Issues)

#### Summary

Copilot did the better job overall.

It caught more of the intentional issues (19 vs. 11 inline comments) and covered a wider range (Squide, accessibility, performance, best‑practices, and some structural issues). Claude Code Review caught several important items, but missed more of the injected issues, and it duplicated a couple of comments (e.g., XSS and unclosed scope were reported twice). 

That said, Claude did catch high‑impact issues (XSS, missing lang, unclosed scope), but overall Copilot had better breadth and coverage on this run.

#### Matrix

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

### Claude Code can only validate the changes of the PR even if instructions say otherwise

Your CLAUDE.md says "review the entire file for /accessibility", but the plugin's internal validation logic says "pre-existing issues are false positives" - and the plugin     
wins.

This is a fundamental limitation of the code-review@claude-code-plugins plugin. It's designed to only comment on issues introduced by the PR, regardless of what your CLAUDE.md 
says.
