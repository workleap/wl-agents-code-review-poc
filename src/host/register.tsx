import { PublicRoutes, ProtectedRoutes, type ModuleRegisterFunction, type FireflyRuntime } from "@squide/firefly";
import { RootLayout } from "./RootLayout.tsx";
import { HomePage } from "./HomePage.tsx";
import { NotFoundPage } from "./NotFoundPage.tsx";

export const registerHost: ModuleRegisterFunction<FireflyRuntime> = runtime => {
    runtime.registerRoute({
        element: <RootLayout />,
        children: [PublicRoutes]
    }, { hoist: true });

    runtime.registerRoute({
        index: true,
        element: <HomePage />
    });

    runtime.registerRoute({
        path: "*",
        element: <NotFoundPage />
    });

    runtime.registerRoute({
        path: "/login",
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
        $label: "Dashboard",
        $priority: 90,
        to: "/employees"
    });
};
