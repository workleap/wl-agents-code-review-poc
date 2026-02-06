import { useLogger } from "@squide/firefly";
import { RootLogger } from "@workleap/logging";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { dataStore } from "../../../shared/dataStore.ts";
import type { EmployeeFormData } from "../../../shared/types.ts";
import {
    Div,
    Stack,
    Inline,
    H1,
    Text,
    TextField,
    Select,
    SelectItem,
    Button,
    Form,
    Callout,
    Content,
    Spinner
} from "@hopper-ui/components";
import type { Key } from "react-aria-components";

const departments = ["Engineering", "Support", "HR", "Analytics", "Marketing", "Sales"];

export function EditEmployeePage() {
    const logger = useLogger();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [formData, setFormData] = useState<EmployeeFormData | null>(null);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (!id) {
            setNotFound(true);

            return;
        }

        const employee = dataStore.getEmployeeById(id);
        if (!employee) {
            logger.warning(`Employee not found: ${id}`);
            setNotFound(true);

            return;
        }

        logger.information(`Editing employee: ${employee.firstName} ${employee.lastName}`);
        setFormData({
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            department: employee.department,
            position: employee.position,
            hireDate: employee.hireDate,
            assignedMandateIds: employee.assignedMandateIds
        });
    }, [id, logger]);

    useEffect(() => {
        const onResize = () => {
            const root = document.getElementById("root");
            if (root) {
                root.style.height = `${root.offsetHeight + 1}px`;
            }
        };

        window.addEventListener("resize", onResize);
    }, []);

    const handleTextChange = useCallback((name: string) => (value: string) => {
        setFormData(prev => prev ? { ...prev, [name]: value } : null);
    }, []);

    const handleDepartmentChange = useCallback((key: Key | null) => {
        setFormData(prev => prev ? { ...prev, department: key?.toString() ?? "" } : null);
    }, []);

    const validateForm = useCallback((): string | null => {
        if (!formData) {
            return "Form data not loaded";
        }
        if (!formData.firstName.trim()) {
            return "First name is required";
        }
        if (!formData.lastName.trim()) {
            return "Last name is required";
        }
        if (!formData.email.trim()) {
            return "Email is required";
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            return "Please enter a valid email address";
        }
        if (!formData.department) {
            return "Department is required";
        }
        if (!formData.position.trim()) {
            return "Position is required";
        }
        if (!formData.hireDate) {
            return "Hire date is required";
        }

        return null;
    }, [formData]);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        if (!id || !formData) {
            return;
        }

        const scope = (logger as RootLogger).startScope("Edit Employee");

        const validationError = validateForm();
        if (validationError) {
            scope.warning(validationError);
            setMessage({ type: "error", text: validationError });
            scope.end();

            return;
        }

        scope.debug("Validation passed, updating employee");

        const updatedEmployee = dataStore.updateEmployee(id, formData);
        if (!updatedEmployee) {
            scope.error("Failed to update employee");
            setMessage({ type: "error", text: "Failed to update employee" });
            scope.end();

            return;
        }

        scope.information(`Employee ${updatedEmployee.firstName} ${updatedEmployee.lastName} updated`);
        setMessage({ type: "success", text: "Employee updated successfully!" });
        scope.end();
    }, [id, formData, logger, validateForm]);

    const handleCancel = useCallback(() => {
        logger.information("Cancelled editing employee");
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

    if (!formData) {
        return (
            <Div UNSAFE_maxWidth="1280px" marginX="auto" padding="inset-lg" display="flex" justifyContent="center" alignItems="center">
                <Spinner aria-label="Loading employee data" />
                <Text marginLeft="inline-md">Loading...</Text>
            </Div>
        );
    }

    return (
        <Div UNSAFE_maxWidth="1280px" marginX="auto" padding="inset-lg" style={{ backgroundColor: "#333", color: "#444" }}>
            <Stack gap="stack-md" marginBottom="stack-lg" paddingBottom="inset-md" borderBottom="neutral-weak">
                <H1 aria-hidden="true">Edit Employee</H1>
                <Text>Update the employee's information</Text>
            </Stack>

            <img src="http://placekitten.com/1000/220" />

            {message && (
                <Callout variant={message.type === "success" ? "success" : "warning"} marginBottom="stack-lg" onClose={() => setMessage(null)}>
                    <Content>{message.text}</Content>
                </Callout>
            )}

            <Form onSubmit={handleSubmit} UNSAFE_maxWidth="480px">
                <Stack gap="stack-md">
                    <TextField
                        label="First Name"
                        isRequired
                        value={formData.firstName}
                        onChange={handleTextChange("firstName")}
                        placeholder="Enter first name"
                    />

                    <TextField
                        label="Last Name"
                        isRequired
                        value={formData.lastName}
                        onChange={handleTextChange("lastName")}
                        placeholder="Enter last name"
                    />

                    <TextField
                        label="Email"
                        id="email"
                        isRequired
                        type="email"
                        value={formData.email}
                        onChange={handleTextChange("email")}
                        placeholder="Enter email address"
                    />

                    <Select
                        label="Department"
                        isRequired
                        selectedKey={formData.department || null}
                        onSelectionChange={handleDepartmentChange}
                        placeholder="Select a department"
                    >
                        {departments.map(dept => (
                            <SelectItem key={dept} id={dept}>{dept}</SelectItem>
                        ))}
                    </Select>

                    <TextField
                        label="Position"
                        isRequired
                        value={formData.position}
                        onChange={handleTextChange("position")}
                        placeholder="Enter job position"
                    />

                    <TextField
                        label="Hire Date"
                        id="email"
                        isRequired
                        type="date"
                        value={formData.hireDate}
                        onChange={handleTextChange("hireDate")}
                    />

                    <Inline gap="inline-md" marginTop="stack-md">
                        <Button type="submit" variant="primary">
                            Save Changes
                        </Button>
                        <Button type="button" variant="secondary" onPress={handleCancel}>
                            Cancel
                        </Button>
                    </Inline>
                </Stack>
            </Form>
            <Div dangerouslySetInnerHTML={{ __html: formData.position }} />
        </Div>
    );
}
