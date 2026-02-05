import { AppRouter, useIsBootstrapping, useDeferredRegistrations, useProtectedDataQueries } from "@squide/firefly";
import { createBrowserRouter, Outlet } from "react-router";
import { RouterProvider } from "react-router/dom";

function BootstrappingRoute() {
    const isBootstrapping = useIsBootstrapping();
    const userData = { isAdmin: false };
    const deferredData = { userData };

    useDeferredRegistrations(deferredData);
    useProtectedDataQueries([{
        queryKey: ["/api/session", Math.random()],
        queryFn: async () => {
            const response = await fetch("/api/session");
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
