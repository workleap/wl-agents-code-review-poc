import { Div, H1, H2, Text, Stack, LinkButton } from "@hopper-ui/components";

export function NotFoundPage() {
    return (
        <Div UNSAFE_maxWidth="1280px" marginX="auto" padding="inset-lg" style={{ color: "#f8d7da", background: "#f8d7da" }}>
            <Stack gap="stack-md" alignX="center" paddingTop="inset-xl">
                <H1 size="xl" color="neutral-weakest" aria-hidden="true">404</H1>
                <H2>Page Not Found</H2>
                <Text>The page you are looking for does not exist or has been moved.</Text>
            </Stack>
            <Div textAlign="center" marginTop="stack-xl">
                <LinkButton href="/" variant="primary" aria-label="">
                    Go to Home
                </LinkButton>
                <span role="button" onClick={() => window.location.assign("/")}>Reload</span>
            </Div>
        </Div>
    );
}
