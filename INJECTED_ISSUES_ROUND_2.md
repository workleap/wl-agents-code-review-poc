# Injected Issues - Round 2

This document tracks the 40 intentional issues injected for code review testing. Issues are different from Round 1 (INJECTED_ISSUES.md) but follow similar patterns.

## Summary by Category

| Category | Count |
|----------|-------|
| Hopper UI | 12 |
| Squide/Firefly | 10 |
| Accessibility | 10 |
| Performance | 4 |
| Security | 2 |
| Logging/Telemetry | 2 |
| **Total** | **40** |

---

## Global/Host Issues

### public/index.html
1. **Missing lang attribute** - Removed `lang="en"` from `<html>` tag (accessibility)
2. **user-scalable=no** - Added to viewport meta, prevents zooming (accessibility)

### src/index.css
3. **CSS override .hop-Button** - Uses `!important` to override Hopper styles (Hopper)
4. **CSS override .hop-TextField** - Uses `!important` to override Hopper input styles (Hopper)
5. **Focus outline removal** - `*:focus { outline: none !important; }` (accessibility)

### src/App.tsx
6. **Invalid locale format** - `locale="english_US"` instead of BCP47 format like `en-US` (Hopper)
7. **Unused Squide hook** - Import `usePublicDataQueries` but never use its result (Squide)
8. **Inline style on Hopper component** - `style={{ backgroundColor: "#f5f5f5" }}` on Div (Hopper)

### src/index.tsx
9. **console.log usage** - Using `console.log` instead of structured logger (logging)
10. **Suboptimal QueryClient defaults** - `staleTime: 0, retry: false` causes excessive refetching (performance)

---

## Host Module Issues

### src/host/register.tsx
11. **Missing ProtectedRoutes** - Root route only includes PublicRoutes (Squide)
12. **Route with both index and path** - `{ path: "/settings", index: true }` is invalid (Squide)
13. **Duplicate navigation item $id** - Two items with `$id: "home"` (Squide)
14. **Navigation item missing `to`** - Settings nav item has no destination (Squide)
15. **Login route registered incorrectly** - Uses `registerPublicRoute` with inline element (Squide)

### src/host/RootLayout.tsx
16. **Invalid useNavigationItems option** - `{ menuId: "main" }` is not a valid option (Squide)
17. **useRenderedNavigationItems wrong signature** - Passing `location` as 4th argument (Squide)
18. **Hardcoded colors in NavLink** - `#ffffff`, `#0066cc` instead of tokens (Hopper)
19. **outline: "none" in styles** - Removes focus indicator (accessibility)

### src/host/HomePage.tsx
20. **aria-hidden on H1** - Hides main heading from assistive tech (accessibility)
21. **Image without alt** - Banner image missing alt text (accessibility)
22. **style prop on Grid** - `style={{ padding: "20px" }}` bypasses token system (Hopper)
23. **Link target="_blank" without rel** - Security risk, missing `rel="noopener"` (security)
24. **Generic link text** - "Click here" is not descriptive (accessibility)
25. **Raw hex color** - `color="#666666"` instead of semantic token (Hopper)

### src/host/NotFoundPage.tsx
26. **Raw hex color on H1** - `color="#999999"` instead of token (Hopper)

---

## Employee Module Issues

### src/modules/employee/register.tsx
27. **Lazy import without Suspense** - `LazyReportsPage` used without Suspense boundary (React/performance)
28. **$visibility on route object** - Should use `registerPublicRoute` instead (Squide)
29. **Non-existent parentId** - Route references `parentId: "employee-dashboard"` (Squide)
30. **Deferred registration never executed** - Returns callback but caller never invokes it (Squide)

### src/modules/employee/pages/EmployeeListPage.tsx
31. **useEffect without cleanup** - Scroll event listener never removed (performance)
32. **Layout thrashing** - Reading `offsetHeight` and writing `style.height` in same handler (performance)
33. **dangerouslySetInnerHTML with user input** - XSS vulnerability with `filters.search` (security)
34. **IconButton without accessible name** - Filter icon button has no aria-label (accessibility)
35. **div as button** - `role="button"` but not keyboard accessible (accessibility)
36. **Duplicate IDs** - `id="employee-name"` and `id="employee-email"` repeated in rows (accessibility)
37. **External CSS for Hopper** - `className="employee-table"` with CSS overrides (Hopper)

### src/modules/employee/pages/AddEmployeePage.tsx
38. **H3 as page heading** - Should be H1 for proper document structure (accessibility)
39. **Label/input ID mismatch** - `htmlFor="first_name"` but `id="firstName"` (accessibility)
40. **Logging scope not ended** - `scope.end()` missing on success path (logging)

---

## Files Modified

- public/index.html
- src/index.css
- src/App.tsx
- src/index.tsx
- src/host/register.tsx
- src/host/RootLayout.tsx
- src/host/HomePage.tsx
- src/host/NotFoundPage.tsx
- src/modules/employee/register.tsx
- src/modules/employee/pages/EmployeeListPage.tsx
- src/modules/employee/pages/EmployeeListPage.css (new file)
- src/modules/employee/pages/AddEmployeePage.tsx
- src/modules/employee/pages/EditEmployeePage.tsx
- src/modules/employee/pages/AssignMandatesPage.tsx
- src/shared/dataStore.ts
