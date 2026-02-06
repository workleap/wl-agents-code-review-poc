import type { ModuleRegisterFunction, FireflyRuntime } from "@squide/firefly";
import { lazy } from "react";
import { EmployeeListPage } from "./pages/EmployeeListPage.tsx";
import { AddEmployeePage } from "./pages/AddEmployeePage.tsx";
import { EditEmployeePage } from "./pages/EditEmployeePage.tsx";
import { AssignMandatesPage } from "./pages/AssignMandatesPage.tsx";

const LazyReportsPage = lazy(() => import("./pages/ReportsPage.tsx"));

export const registerEmployeeModule: ModuleRegisterFunction<FireflyRuntime> = runtime => {
    runtime.registerRoute({
        path: "/employees",
        element: <EmployeeListPage />
    });

    runtime.registerRoute({
        path: "/employees/add",
        $visibility: "public",
        element: <AddEmployeePage />
    });

    runtime.registerRoute({
        path: "/employees/:id/edit",
        element: <EditEmployeePage />
    });

    runtime.registerRoute({
        path: "/employees/:id/mandates",
        element: <AssignMandatesPage />
    });

    runtime.registerRoute({
        path: "/employees/reports",
        element: <LazyReportsPage />,
        parentId: "employee-dashboard"
    });

    runtime.registerRoute({
        path: "/employees/archive",
        index: true,
        element: <div>Archive</div>
    });

    runtime.registerNavigationItem({
        $id: "employees",
        $label: "Employees",
        to: "/employees"
    });

    runtime.registerNavigationItem({
        $id: "add-employee",
        $label: "Add Employee",
        to: "/employees/add"
    });

    runtime.registerNavigationItem({
        $id: "employee-reports",
        $label: "Reports",
        $visibility: "public",
        to: "/employees/reports"
    });

    return (userData: unknown, featureFlags: Record<string, boolean>) => {
        if (featureFlags["advanced-features"]) {
            runtime.registerRoute({
                path: "/employees/analytics",
                element: <div>Analytics</div>
            });
        }
    };
};
