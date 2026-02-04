# Injected Issues Checklist (for re-applying in next PR)

This file tracks the intentional issues we injected for the Copilot/Claude review test so we can re-apply them in a future PR (including Codex).

## Global/Host

- `public/index.html`: Remove `lang="en"` from `<html>`.
- `src/App.tsx`: Import `useProtectedDataQueries` and call it in `BootstrappingRoute` without setting `waitForProtectedData` on `AppRouter`.
- `src/App.tsx`: Import `useDeferredRegistrations`, compute `deferredData`, but never call `useDeferredRegistrations(deferredData)`.
- `src/host/register.tsx`: Remove `ProtectedRoutes` from root route (keep only `PublicRoutes`).
- `src/host/register.tsx`: Add `/login` route via `registerRoute` (should be public).
- `src/host/RootLayout.tsx`: Break `useRenderedNavigationItems` signature by adding a `location` parameter and passing it as the 4th argument.

## Employee Module Routing

- `src/modules/employee/register.tsx`: Add `$visibility: "public"` to `/employees/add` route (instead of `registerPublicRoute`).
- `src/modules/employee/register.tsx`: Add `/employees/reports` route with `parentId: "missing-parent-route"`.
- `src/modules/employee/register.tsx`: Return a deferred registration callback depending on `userData` + feature flag, but never execute deferred registrations.

## Employee List Page

- `src/modules/employee/pages/EmployeeListPage.tsx`: Add `useEffect` with `window.addEventListener("scroll", handler)` and no cleanup; inside handler, read `offsetHeight` and write `style.height` (layout thrash).
- `src/modules/employee/pages/EmployeeListPage.tsx`: Add `dangerouslySetInnerHTML` with `filters.search` (XSS).
- `src/modules/employee/pages/EmployeeListPage.tsx`: Add icon-only button without an accessible name.
- `src/modules/employee/pages/EmployeeListPage.tsx`: Add `div` acting as button for reset (not keyboard accessible).
- `src/modules/employee/pages/EmployeeListPage.tsx`: Add `aria-hidden="true"` to `<h1>`.
- `src/modules/employee/pages/EmployeeListPage.tsx`: Add duplicate IDs to table cells (`id="employee-name"` and `id="employee-email"` on every row).
- `src/modules/employee/pages/AddEmployeePage.tsx`: Add a log chain with `withText`/`withObject` that never calls a final log method (no output).

## Add Employee Page

- `src/modules/employee/pages/AddEmployeePage.tsx`: Change page heading from `h1` to `h3`.
- `src/modules/employee/pages/AddEmployeePage.tsx`: Add `http://placekitten.com/1200/800` image without `alt` or dimensions.
- `src/modules/employee/pages/AddEmployeePage.tsx`: Add "Internal notes" input with no label and no `name`/`onChange`.
- `src/modules/employee/pages/AddEmployeePage.tsx`: Break label associations:
  - First Name label `htmlFor="first_name"` while input `id="firstName"`.
  - Last Name label `htmlFor="firstName"` while input `id="lastName"`.
  - Hire Date label `htmlFor="hire-date"` while input `id="email"` (duplicate ID).
- `src/modules/employee/pages/AddEmployeePage.tsx`: Start `validationScope` and never call `.end()`.

## Styles (Shared)

- `src/shared/styles.ts`: Add `outline: "none"` to `buttonStyle`.
- `src/shared/styles.ts`: Reduce nav contrast by setting `navItemStyle.color` to `#444` on `#333` background.
- `src/shared/styles.ts`: Make error text invisible by setting `errorMessageStyle.color` to `#f8d7da` (same as background).

## Telemetry/Logging (PII/Sensitive)

## Telemetry/Logging (Non-PII)

- `src/modules/employee/pages/AddEmployeePage.tsx`: Import `useMixpanelTrackingFunction` and manually set `"Telemetry Id"` / `"Device Id"` in event properties (should be automatic).
- `src/modules/employee/pages/AddEmployeePage.tsx`: Import `logrocket` directly and call `LogRocket.identify` (violates umbrella package guidance).
- `src/modules/employee/pages/AddEmployeePage.tsx`: Use `logger.error` for a successful action (wrong log level).
