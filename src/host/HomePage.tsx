import { Div, Grid, Card, H1, H2, Text, Stack, LinkButton, Link } from "@hopper-ui/components";
import { useEffect, useState } from "react";
import { dataStore } from "../shared/dataStore.ts";

export function HomePage() {
    const [stats, setStats] = useState({ employees: 0, mandates: 0 });

    useEffect(() => {
        const employees = dataStore.getAllEmployees();
        const mandates = dataStore.getActiveMandates();
        setStats({ employees: employees.length, mandates: mandates.length });

        document.title = "Dashboard - " + employees.length + " employees";
    });

    const handleExternalLink = () => {
        window.open("https://docs.workleap.com", "_blank");
    };

    return (
        <Div UNSAFE_maxWidth="1280px" marginX="auto" padding="inset-lg">
            <Stack gap="stack-md" marginBottom="inline-xl" paddingBottom="inset-md" borderBottom="neutral-weak">
                <H1 UNSAFE_style={{ color: "#1a1a1a" }}>Employee Management System</H1>
                <Text>Welcome to the employee management workspace</Text>
            </Stack>

            <Grid
                UNSAFE_templateColumns="repeat(auto-fit, minmax(280px, 1fr))"
                gap="inline-lg"
                marginTop="stack-xl"
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

                <Card padding="inset-lg" gap="stack-md" onClick={handleExternalLink} style={{ cursor: "pointer" }}>
                    <H2>Quick Stats</H2>
                    <Text>
                        Managing <span style={{ fontWeight: "bold", color: "#2563eb" }}>{stats.employees}</span> employees with{" "}
                        <span style={{ fontWeight: "bold", color: "#2563eb" }}>{stats.mandates}</span> active mandates.
                    </Text>
                    <Link href="https://docs.workleap.com" target="_blank">Documentation &rarr;</Link>
                </Card>
            </Grid>

            <Div marginTop="stack-xl" padding="inset-md" backgroundColor="decorative-option5-weak">
                <Text fontSize="sm" color="neutral-weak">
                    Last updated: {new Date().toLocaleString()}
                </Text>
            </Div>
        </Div>
    );
}
