import { PublicRoutes, type ModuleRegisterFunction, type FireflyRuntime } from "@squide/firefly";
import { RootLayout } from "./RootLayout.tsx";
import { HomePage } from "./HomePage.tsx";
import { NotFoundPage } from "./NotFoundPage.tsx";

export const registerHost: ModuleRegisterFunction<FireflyRuntime> = runtime => {
    runtime.registerRoute({
        element: <RootLayout />,
        children: [PublicRoutes]
    }, { hoist: true });

    runtime.registerRoute({
        path: "/",
        element: <HomePage />
    });

    runtime.registerRoute({
        path: "/home",
        element: <HomePage />
    });

    runtime.registerPublicRoute({
        path: "/*",
        element: <NotFoundPage />
    });

    runtime.registerNavigationItem({
        $id: "home",
        $label: "Home",
        to: "/"
    });

    runtime.registerNavigationItem({
        $id: "home",
        $label: "Dashboard",
        to: "/home"
    });
};
