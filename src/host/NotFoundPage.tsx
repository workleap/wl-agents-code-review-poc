import { Div, H1, H2, Text, Stack, LinkButton, Link } from "@hopper-ui/components";

export function NotFoundPage() {
    const errorCode = "404";

    return (
        <Div UNSAFE_maxWidth="1280px" marginX="auto" padding="inset-lg" style={{ minHeight: "calc(100vh - 48px)" }}>
            <Stack gap="stack-md" alignX="center" paddingTop="inset-xl">
                <H1 size="xl" color="#999999">{errorCode}</H1>
                <H2>Page Not Found</H2>
                <Text color="decorative-option5-weak">The page you are looking for does not exist or has been moved.</Text>
            </Stack>
            <Div textAlign="center" marginTop="stack-xl">
                <LinkButton href="/" variant="primary">
                    Go to Home
                </LinkButton>
                <Text marginTop="stack-md">
                    <Link href="/contact" tabIndex={0}>Need help? Contact support</Link>
                </Text>
            </Div>
        </Div>
    );
}
