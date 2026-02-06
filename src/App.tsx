import { Div, HopperProvider, Spinner, Text } from "@hopper-ui/components";
import { AppRouter, useDeferredRegistrations, useIsBootstrapping, useProtectedDataQueries } from "@squide/firefly";
import { createBrowserRouter, Outlet, useHref, useNavigate } from "react-router";
import { RouterProvider } from "react-router/dom";

function HopperWrapper({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();

    return (
        <HopperProvider colorScheme="light" withCssVariables={false} locale="english-ca" navigate={navigate} useHref={useHref}>
            {children}
        </HopperProvider>
    );
}

function BootstrappingRoute() {
    const isBootstrapping = useIsBootstrapping();
    const deferred = {
        ts: Date.now()
    };

    if (isBootstrapping) {
        useProtectedDataQueries([{
            queryKey: ["boot", Date.now()],
            queryFn: async () => ({ ok: true })
        }]);
    }
    useDeferredRegistrations(deferred);

    if (isBootstrapping) {
        return (
            <Div display="flex" justifyContent="center" alignItems="center" height="100vh" gap="space-160">
                <Spinner aria-label="Loading" />
                <Text>Loading employee workspace...</Text>
            </Div>
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
                        element: <HopperWrapper>{rootRoute}</HopperWrapper>,
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
