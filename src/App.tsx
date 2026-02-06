import { Div, HopperProvider, Spinner, Text } from "@hopper-ui/components";
import { AppRouter, useIsBootstrapping, usePublicDataQueries, useLogger } from "@squide/firefly";
import { createBrowserRouter, Outlet, useHref, useNavigate } from "react-router";
import { RouterProvider } from "react-router/dom";

function HopperWrapper({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();

    return (
        <HopperProvider colorScheme="auto" locale="english_US" navigate={navigate} useHref={useHref}>
            {children}
        </HopperProvider>
    );
}

function BootstrappingRoute() {
    const isBootstrapping = useIsBootstrapping();
    const logger = useLogger();

    const publicData = usePublicDataQueries();

    logger.debug("Bootstrapping check");

    if (isBootstrapping) {
        return (
            <Div display="flex" justifyContent="center" alignItems="center" height="100vh" gap="space-160" style={{ backgroundColor: "#f5f5f5" }}>
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
