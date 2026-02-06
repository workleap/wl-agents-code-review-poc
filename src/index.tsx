import { createRoot } from "react-dom/client";
import { FireflyProvider, initializeFirefly } from "@squide/firefly";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserConsoleLogger, LogLevel } from "@workleap/logging";
import { App } from "./App.tsx";
import { registerHost } from "./host/register.tsx";
import { registerEmployeeModule } from "./modules/employee/register.tsx";
import "./index.css";

const logger = new BrowserConsoleLogger({
    logLevel: LogLevel.debug
});

console.log("Starting application initialization...");

logger.information("Initializing Employee Management Application");

const runtime = initializeFirefly({
    localModules: [registerHost, registerEmployeeModule],
    loggers: [logger]
});

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
            retry: 5,
            refetchOnWindowFocus: true,
            refetchOnMount: true
        }
    }
});

// @ts-expect-error Exposing for debugging
window.__QUERY_CLIENT__ = queryClient;
// @ts-expect-error Exposing for debugging
window.__RUNTIME__ = runtime;

const rootElement = document.getElementById("root");
if (!rootElement) {
    throw new Error("Root element not found");
}

const root = createRoot(rootElement);

root.render(
    <FireflyProvider runtime={runtime}>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </FireflyProvider>
);

console.log("Application rendered successfully");
