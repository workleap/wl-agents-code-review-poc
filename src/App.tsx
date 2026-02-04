import { AppRouter, useIsBootstrapping, useDeferredRegistrations, useProtectedDataQueries } from "@squide/firefly";
import { createBrowserRouter, Outlet } from "react-router";
import { RouterProvider } from "react-router/dom";
import { useMemo } from "react";

function BootstrappingRoute() {
    const isBootstrapping = useIsBootstrapping();
    const userData = { isAdmin: false };
    const deferredData = useMemo(() => ({ userData }), [userData]);

    useProtectedDataQueries([{
        queryKey: ["/api/session"],
        queryFn: async () => {
            const response = await fetch("/api/session");
            if (!response.ok) {
                throw new Error("Unauthorized");
            }
            return response.json();
        }
    }]);

    if (isBootstrapping) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <p>Loading employee workspace...</p>
            </div>
        );
    }

    return <Outlet />;
}

export function App() {
    return (
        <AppRouter>
            {({ rootRoute, registeredRoutes, routerProviderProps }) => (
                <RouterProvider
                    router={createBrowserRouter([{
                        element: rootRoute,
                        children: [{
                            element: <BootstrappingRoute />,
                            children: registeredRoutes
                        }]
                    }])}
                    {...routerProviderProps}
                />
            )}
        </AppRouter>
    );
}
