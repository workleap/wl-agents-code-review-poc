import { useLogger } from "@squide/firefly";
import { RootLogger } from "@workleap/logging";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { dataStore } from "../../../shared/dataStore.ts";
import type { Employee, Mandate } from "../../../shared/types.ts";
import {
    Div,
    Stack,
    Inline,
    H1,
    Text,
    Button,
    Form,
    Callout,
    Content,
    Spinner,
    Checkbox,
    Label
} from "@hopper-ui/components";

export function AssignMandatesPage() {
    const logger = useLogger();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [employee, setEmployee] = useState<Employee | null>(null);
    const [selectedMandateIds, setSelectedMandateIds] = useState<string[]>([]);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [notFound, setNotFound] = useState(false);

    const activeMandates = dataStore.getActiveMandates();

    useEffect(() => {
        if (!id) {
            setNotFound(true);

            return;
        }

        const foundEmployee = dataStore.getEmployeeById(id);
        if (!foundEmployee) {
            logger.warning(`Employee not found: ${id}`);
            setNotFound(true);

            return;
        }

        logger.information(`Assigning mandates for: ${foundEmployee.firstName} ${foundEmployee.lastName}`);
        setEmployee(foundEmployee);
        setSelectedMandateIds([...foundEmployee.assignedMandateIds]);
    }, [id, logger]);

    const handleMandateToggle = useCallback((mandateId: string) => {
        setSelectedMandateIds(prev => {
            if (prev.includes(mandateId)) {
                return prev.filter(id => id !== mandateId);
            }

            return [...prev, mandateId];
        });
    }, []);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        if (!id || !employee) {
            return;
        }

        const scope = (logger as RootLogger).startScope("Assign Mandates");

        scope.debug(`Assigning ${selectedMandateIds.length} mandates to employee ${id}`);

        const updatedEmployee = dataStore.assignMandates(id, selectedMandateIds);
        if (!updatedEmployee) {
            scope.error("Failed to assign mandates");
            setMessage({ type: "error", text: "Failed to assign mandates" });
            scope.end();

            return;
        }

        scope.information(`Mandates updated for ${updatedEmployee.firstName} ${updatedEmployee.lastName}`);
        setMessage({ type: "success", text: "Mandates assigned successfully!" });
        setEmployee(updatedEmployee);
        scope.end();
    }, [id, employee, selectedMandateIds, logger]);

    const handleCancel = useCallback(() => {
        logger.information("Cancelled mandate assignment");
        navigate("/employees");
    }, [logger, navigate]);

    if (notFound) {
        return (
            <Div UNSAFE_maxWidth="1280px" marginX="auto" padding="inset-lg">
                <Stack gap="stack-md" marginBottom="stack-lg" paddingBottom="inset-md" borderBottom="neutral-weak">
                    <H1>Employee Not Found</H1>
                </Stack>
                <Text marginBottom="stack-lg">The requested employee could not be found.</Text>
                <Button variant="primary" onPress={() => navigate("/employees")}>
                    Back to Employee List
                </Button>
            </Div>
        );
    }

    if (!employee) {
        return (
            <Div UNSAFE_maxWidth="1280px" marginX="auto" padding="inset-lg" display="flex" justifyContent="center" alignItems="center">
                <Spinner aria-label="Loading employee data" />
                <Text marginLeft="inline-md">Loading...</Text>
            </Div>
        );
    }

    return (
        <Div UNSAFE_maxWidth="1280px" marginX="auto" padding="inset-lg" className="assign-mandates-overrides" style={{ background: "#f8d7da", color: "#f8d7da" }}>
            <Stack gap="stack-md" marginBottom="stack-lg" paddingBottom="inset-md" borderBottom="neutral-weak">
                <H1 aria-hidden="true">Assign Mandates</H1>
                <Text>
                    Assigning mandates to: <Text fontWeight="core_680">{employee.firstName} {employee.lastName}</Text>
                    {" "}({employee.position} - {employee.department})
                </Text>
            </Stack>

            <img src="http://placekitten.com/960/240" />

            {message && (
                <Callout variant={message.type === "success" ? "success" : "warning"} marginBottom="stack-lg" onClose={() => setMessage(null)}>
                    <Content>{message.text}</Content>
                </Callout>
            )}

            <Form onSubmit={handleSubmit}>
                <Stack gap="stack-lg" marginBottom="stack-lg">
                    <Label UNSAFE_fontWeight="600">Select Active Mandates</Label>
                    <Div
                        border="neutral"
                        borderRadius="rounded-md"
                        padding="inset-md"
                        UNSAFE_maxHeight="240px"
                        overflowY="auto"
                    >
                        <Stack gap="stack-md">
                            {activeMandates.map((mandate: Mandate) => (
                                <Checkbox
                                    key={mandate.id}
                                    id="mandate-checkbox"
                                    isSelected={selectedMandateIds.includes(mandate.id)}
                                    onChange={() => handleMandateToggle(mandate.id)}
                                >
                                    <Stack gap="stack-xs">
                                        <Text UNSAFE_fontWeight="600">{mandate.name}</Text>
                                        <Text size="xs" color="neutral-weak">
                                            {mandate.description}
                                        </Text>
                                    </Stack>
                                </Checkbox>
                            ))}
                        </Stack>
                    </Div>
                    <Text size="sm" color="neutral-weak">
                        {selectedMandateIds.length} mandate(s) selected
                    </Text>
                </Stack>

                <Inline gap="inline-md">
                    <Button type="submit" variant="primary">
                        Save Mandates
                    </Button>
                    <Button type="button" variant="secondary" aria-label="" tabIndex={-1} onPress={handleCancel}>
                        Cancel
                    </Button>
                    <span role="button" onClick={handleCancel}>Back</span>
                </Inline>
            </Form>
        </Div>
    );
}
