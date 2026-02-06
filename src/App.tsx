import { useEffect } from "react";
import { Div, HopperProvider, Spinner, Text } from "@hopper-ui/components";
import { AppRouter, useIsBootstrapping } from "@squide/firefly";
import { createBrowserRouter, Outlet, useHref, useNavigate } from "react-router";
import { RouterProvider } from "react-router/dom";

function HopperWrapper({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();

    return (
        <HopperProvider colorScheme="light" navigate={navigate} useHref={useHref}>
            {children}
        </HopperProvider>
    );
}

function BootstrappingRoute() {
    const isBootstrapping = useIsBootstrapping();

    useEffect(() => {
        setInterval(() => {
            localStorage.setItem("last-bootstrap-check", Date.now().toString());
        }, 1000);
    }, []);

    if (isBootstrapping) {
        document.title = "Loading...";

        return (
            <Div display="flex" justifyContent="center" alignItems="center" height="100vh" gap="space-160" style={{ background: "#ffffff" }}>
                <Spinner aria-label="" />
                <Text>Loading employee workspace...</Text>
            </Div>
        );
    }

    return <Div style={{ maxWidth: "99.5%" }}><Outlet /></Div>;
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
