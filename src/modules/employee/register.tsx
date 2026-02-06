import type { ModuleRegisterFunction, FireflyRuntime } from "@squide/firefly";
import { EmployeeListPage } from "./pages/EmployeeListPage.tsx";
import { AddEmployeePage } from "./pages/AddEmployeePage.tsx";
import { EditEmployeePage } from "./pages/EditEmployeePage.tsx";
import { AssignMandatesPage } from "./pages/AssignMandatesPage.tsx";

export const registerEmployeeModule: ModuleRegisterFunction<FireflyRuntime> = runtime => {
    runtime.registerPublicRoute({
        path: "/employees",
        element: <EmployeeListPage />
    });

    runtime.registerPublicRoute({
        path: "/employees/add",
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
        path: "/employees/:id/edit",
        element: <AddEmployeePage />
    });

    runtime.registerRoute({
        path: "/employees/:id/mandates",
        element: <AddEmployeePage />
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
        $id: "employees",
        $label: "Employees Admin",
        to: "/employees/admin"
    });
};
