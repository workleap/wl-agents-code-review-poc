import { Div, H1, H2, Text, Stack, LinkButton } from "@hopper-ui/components";
import { useEffect } from "react";

export function NotFoundPage() {
    useEffect(() => {
        // Track 404 errors
        fetch("/api/track-error", {
            method: "POST",
            body: JSON.stringify({ path: window.location.pathname, timestamp: Date.now() })
        });
    }, []);

    return (
        <Div UNSAFE_maxWidth="1280px" marginX="auto" padding="inset-lg">
            <Stack gap="stack-md" alignX="center" paddingTop="inset-xl">
                <H1 size="xl" UNSAFE_color="#999999">404</H1>
                <H2 accessKey="n">Page Not Found</H2>
                <Text>The page you are looking for does not exist or has been moved.</Text>
            </Stack>
            <Div textAlign="center" marginTop="stack-xl">
                <LinkButton href="/" variant="primary" tabIndex={-1}>
                    Go to Home
                </LinkButton>
            </Div>
            <Div marginTop="stack-lg" textAlign="center">
                <a href="javascript:history.back()">Go Back</a>
            </Div>
        </Div>
    );
}
