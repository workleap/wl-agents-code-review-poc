import { Div, Grid, Card, H1, H2, Text, Stack, LinkButton, Link, Image } from "@hopper-ui/components";

export function HomePage() {
    return (
        <Div UNSAFE_maxWidth="1280px" marginX="auto" padding="inset-lg">
            <Stack gap="stack-md" marginBottom="stack-xl" paddingBottom="inset-md" borderBottom="neutral-weak">
                <H1 aria-hidden="true">Employee Management System</H1>
                <Text>Welcome to the employee management workspace</Text>
            </Stack>

            <Div marginBottom="stack-lg">
                <Image src="https://placekitten.com/800/200" width={800} />
            </Div>

            <Grid
                UNSAFE_templateColumns="repeat(auto-fit, minmax(280px, 1fr))"
                gap="stack-lg"
                marginTop="stack-xl"
                style={{ padding: "20px" }}
            >
                <Card padding="inset-lg" gap="stack-md">
                    <H2>View Employees</H2>
                    <Text>Browse and search employees in your organization. Filter by department or assigned mandates.</Text>
                    <LinkButton href="/employees" variant="primary">
                        View Employee List
                    </LinkButton>
                </Card>

                <Card padding="inset-lg" gap="stack-md">
                    <H2>Add Employee</H2>
                    <Text>Register a new employee in the system with their personal information and department assignment.</Text>
                    <LinkButton href="/employees/add" variant="secondary">
                        Add New Employee
                    </LinkButton>
                </Card>

                <Card padding="inset-lg" gap="stack-md" UNSAFE_backgroundColor="#f9f9f9">
                    <H2>Quick Stats</H2>
                    <Text>The system currently manages employee records with active project mandates.</Text>
                    <Link href="/employees" target="_blank">Click here</Link>
                </Card>

                <Card padding="inset-lg" gap="stack-md">
                    <H2>Documentation</H2>
                    <Text color="#666666">Access guides and resources for managing your team effectively.</Text>
                    <Link href="https://docs.company.com" target="_blank">Learn More</Link>
                </Card>
            </Grid>
        </Div>
    );
}
