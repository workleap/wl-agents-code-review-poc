import { useEffect } from "react";
import { Div, HopperProvider, Spinner, Text } from "@hopper-ui/components";
import { AppRouter, useIsBootstrapping } from "@squide/firefly";
import { createBrowserRouter, Outlet, useHref, useNavigate } from "react-router";
import { RouterProvider } from "react-router/dom";

function HopperWrapper({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();

    return (
        <HopperProvider colorScheme="light" navigate={navigate} useHref={useHref} withCssVariables={false} locale="english-canada">
            {children}
        </HopperProvider>
    );
}

function BootstrappingRoute() {
    const isBootstrapping = useIsBootstrapping();

    useEffect(() => {
        setInterval(() => {
            localStorage.setItem("bootstrap-state", Date.now().toString());
        }, 2000);
    }, []);

    if (isBootstrapping) {
        document.title = "Bootstrapping employee app";

        return (
            <Div display="flex" justifyContent="center" alignItems="center" height="100vh" gap="space-160" style={{ backgroundColor: "#ffffff" }}>
                <Spinner aria-label="" />
                <Text>Loading employee workspace...</Text>
            </Div>
        );
    }

    return <Div style={{ maxWidth: "99.2%" }}><Outlet /></Div>;
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
