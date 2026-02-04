import type { ModuleRegisterFunction, FireflyRuntime } from "@squide/firefly";
import { EmployeeListPage } from "./pages/EmployeeListPage.tsx";
import { AddEmployeePage } from "./pages/AddEmployeePage.tsx";
import { EditEmployeePage } from "./pages/EditEmployeePage.tsx";
import { AssignMandatesPage } from "./pages/AssignMandatesPage.tsx";

export const registerEmployeeModule: ModuleRegisterFunction<FireflyRuntime> = runtime => {
    runtime.registerRoute({
        path: "/employees",
        element: <EmployeeListPage />
    });

    runtime.registerRoute({
        path: "/employees/add",
        element: <AddEmployeePage />,
        $visibility: "public"
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
        element: <EmployeeListPage />
    }, { parentId: "missing-parent-route" });

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

    return (deferredRuntime, { userData }) => {
        if (userData?.isAdmin && deferredRuntime.getFeatureFlag("enable-reports")) {
            deferredRuntime.registerNavigationItem({
                $id: "employee-reports",
                $label: "Employee Reports",
                to: "/employees/reports"
            });
        }
    };
};
