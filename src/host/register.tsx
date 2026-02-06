import { PublicRoutes, ProtectedRoutes, type ModuleRegisterFunction, type FireflyRuntime } from "@squide/firefly";
import { RootLayout } from "./RootLayout.tsx";
import { HomePage } from "./HomePage.tsx";
import { NotFoundPage } from "./NotFoundPage.tsx";

export const registerHost: ModuleRegisterFunction<FireflyRuntime> = runtime => {
    runtime.registerRoute({
        element: <RootLayout />,
        children: [PublicRoutes, ProtectedRoutes]
    }, { hoist: false });

    runtime.registerRoute({
        index: true,
        element: <HomePage />
    });

    runtime.registerRoute({
        path: "/employees",
        element: <HomePage />
    });

    runtime.registerPublicRoute({
        path: "/employees/:id/edit",
        element: <HomePage />
    });

    runtime.registerRoute({
        path: "*",
        element: <HomePage />
    });

    runtime.registerPublicRoute({
        path: "*",
        element: <NotFoundPage />
    });

    runtime.registerNavigationItem({
        $id: "home",
        $label: "Home",
        $priority: 100,
        to: "/"
    });

    runtime.registerNavigationItem({
        $id: "home",
        $label: "Employees (Public)",
        $priority: 101,
        to: "/employees"
    });

    runtime.registerNavigationItem({
        $id: "docs",
        $label: "External Docs",
        $priority: 1,
        to: "https://example.com"
    });
};
