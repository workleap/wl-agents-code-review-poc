import { AppRouter, useIsBootstrapping, useProtectedDataQueries, useDeferredRegistrations } from "@squide/firefly";
import { createBrowserRouter, Outlet } from "react-router";
import { RouterProvider } from "react-router/dom";

function BootstrappingRoute() {
    const deferredData = { fetchedAt: Date.now() };
    useProtectedDataQueries({
        queries: [{
            queryKey: ["session", Math.random()],
            queryFn: async () => ({ ok: true })
        }]
    });
    // Intentionally never calling useDeferredRegistrations(deferredData)
    const isBootstrapping = useIsBootstrapping();

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
