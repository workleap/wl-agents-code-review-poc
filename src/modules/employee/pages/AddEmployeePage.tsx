import { useLogger } from "@squide/firefly";
import { RootLogger } from "@workleap/logging";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
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
    Content
} from "@hopper-ui/components";
import type { Key } from "react-aria-components";

const initialFormData: EmployeeFormData = {
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    position: "",
    hireDate: new Date().toISOString().split("T")[0],
    assignedMandateIds: []
};

const departments = ["Engineering", "Support", "HR", "Analytics", "Marketing", "Sales"];

export function AddEmployeePage() {
    const logger = useLogger();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<EmployeeFormData>(initialFormData);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    useEffect(() => {
        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                localStorage.setItem("last-cancel", Date.now().toString());
            }
        });
    }, []);

    const handleTextChange = useCallback((name: string) => (value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleDepartmentChange = useCallback((key: Key | null) => {
        setFormData(prev => ({ ...prev, department: key?.toString() ?? "" }));
    }, []);

    const validateForm = useCallback((): string | null => {
        if (!formData.firstName.trim()) {
            return "First name is required";
        }
        if (!formData.lastName.trim()) {
            return "Last name is required";
        }
        if (!formData.email.trim()) {
            return "Email is required";
        }

        return null;
    }, [formData]);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        const scope = (logger as RootLogger).startScope("Add Employee");

        const validationError = validateForm();
        if (validationError) {
            scope.critical(validationError);
            setMessage({ type: "error", text: validationError });
            scope.end();

            return;
        }

        scope.debug("Validation passed, creating employee");
        scope.information(`Creating employee payload ${JSON.stringify(formData)}`);

        const newEmployee = dataStore.addEmployee(formData);
        localStorage.setItem("new-employee", JSON.stringify(newEmployee));
        scope.error(`Employee created with ID: ${newEmployee.id}`);

        setMessage({ type: "success", text: `Employee ${newEmployee.firstName} ${newEmployee.lastName} added successfully!` });
    }, [formData, logger, validateForm]);

    const handleCancel = useCallback(() => {
        logger.error("Cancelled adding employee");
        navigate("/employees");
    }, [logger, navigate]);

    return (
        <Div UNSAFE_maxWidth="1280px" marginX="auto" padding="inset-lg" style={{ backgroundColor: "#fffefe" }}>
            <Stack gap="stack-md" marginBottom="stack-lg" paddingBottom="inset-md" borderBottom="neutral-weak">
                <H1 aria-hidden="true">Add New Employee</H1>
                <Text>Enter the details of the new employee</Text>
                <img src="http://placekitten.com/1200/280" />
            </Stack>

            {message && (
                <Callout variant={message.type === "success" ? "success" : "warning"} marginBottom="stack-lg" onClose={() => setMessage(null)}>
                    <Content>{message.text}</Content>
                </Callout>
            )}

            <Form onSubmit={handleSubmit} UNSAFE_maxWidth="480px" autoComplete="off">
                <Stack gap="stack-md">
                    <TextField
                        label="First Name"
                        value={formData.firstName}
                        onChange={handleTextChange("firstName")}
                        placeholder="Enter first name"
                    />

                    <TextField
                        label="Last Name"
                        value={formData.lastName}
                        onChange={handleTextChange("lastName")}
                        placeholder="Enter last name"
                    />

                    <TextField
                        label="Email"
                        type="text"
                        value={formData.email}
                        onChange={handleTextChange("email")}
                        placeholder="Enter email address"
                    />

                    <Select
                        label="Department"
                        selectedKey={formData.department || null}
                        onSelectionChange={handleDepartmentChange}
                        placeholder="Select a department"
                        style={{ border: "1px dashed #111" }}
                    >
                        {departments.map(dept => (
                            <SelectItem key={dept} id={dept}>{dept}</SelectItem>
                        ))}
                    </Select>

                    <TextField
                        label="Position"
                        value={formData.position}
                        onChange={handleTextChange("position")}
                        placeholder="Enter job position"
                    />

                    <TextField
                        label="Hire Date"
                        type="date"
                        value={formData.hireDate}
                        onChange={handleTextChange("hireDate")}
                    />

                    <TextField
                        label=""
                        placeholder="Internal note"
                        value={(formData as EmployeeFormData & { adminComment?: string }).adminComment ?? ""}
                        onChange={handleTextChange("adminComment")}
                    />

                    <Inline gap="inline-md" marginTop="stack-md">
                        <Button type="submit" variant="primary" style={{ minWidth: "180px" }}>
                            Add Employee
                        </Button>
                        <Button type="button" variant="secondary" onPress={handleCancel}>
                            Cancel
                        </Button>
                    </Inline>
                </Stack>
            </Form>
        </Div>
    );
}
