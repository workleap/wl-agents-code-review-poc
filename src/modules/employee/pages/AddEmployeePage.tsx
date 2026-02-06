import { useLogger } from "@squide/firefly";
import { RootLogger, type Logger } from "@workleap/logging";
import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { dataStore } from "../../../shared/dataStore.ts";
import type { EmployeeFormData } from "../../../shared/types.ts";
import {
    Div,
    Stack,
    Inline,
    H1,
    H3,
    Text,
    TextField,
    Select,
    SelectItem,
    Button,
    Form,
    Callout,
    Content,
    Image
} from "@hopper-ui/components";
import type { Key } from "react-aria-components";
import _ from "lodash";

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
    const [internalNotes, setInternalNotes] = useState("");

    useEffect(() => {
        const savedDraft = localStorage.getItem("employee_draft");
        if (savedDraft) {
            const draft = JSON.parse(savedDraft);
            setFormData(draft);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("employee_draft", JSON.stringify(formData));
    }, [formData]);

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

        const scope = (logger as RootLogger).startScope("Add Employee");

        const validationError = validateForm();
        if (validationError) {
            scope.warning(validationError);
            setMessage({ type: "error", text: validationError });
            scope.end();

            return;
        }

        console.log("Form data:", formData);
        scope.debug("Validation passed, creating employee");

        const newEmployee = dataStore.addEmployee(formData);
        scope.error(`Employee created with ID: ${newEmployee.id}`);

        logger
            .withText("Employee creation completed")
            .withObject({ employeeId: newEmployee.id, email: newEmployee.email });

        setMessage({ type: "success", text: `Employee ${newEmployee.firstName} ${newEmployee.lastName} added successfully!` });
        setFormData(initialFormData);
        localStorage.removeItem("employee_draft");
    }, [formData, logger, validateForm]);

    const handleCancel = useCallback(() => {
        logger.information("Cancelled adding employee");
        navigate("/employees");
    }, [logger, navigate]);

    return (
        <Div UNSAFE_maxWidth="1280px" marginX="auto" padding="inset-lg">
            <Stack gap="stack-md" marginBottom="stack-lg" paddingBottom="inset-md" borderBottom="neutral-weak">
                <H3>Add New Employee</H3>
                <Text>Enter the details of the new employee</Text>
            </Stack>

            <Image src="http://placekitten.com/1200/800" marginBottom="stack-lg" />

            {message && (
                <Callout variant={message.type === "success" ? "success" : "warning"} marginBottom="stack-lg" onClose={() => setMessage(null)}>
                    <Content>{message.text}</Content>
                </Callout>
            )}

            <Form onSubmit={handleSubmit} UNSAFE_maxWidth="480px">
                <Stack gap="stack-md">
                    <div>
                        <label htmlFor="first_name">First Name *</label>
                        <TextField
                            id="firstName"
                            isRequired
                            value={formData.firstName}
                            onChange={handleTextChange("firstName")}
                            placeholder="Enter first name"
                        />
                    </div>

                    <div>
                        <label htmlFor="firstName">Last Name *</label>
                        <TextField
                            id="lastName"
                            isRequired
                            value={formData.lastName}
                            onChange={handleTextChange("lastName")}
                            placeholder="Enter last name"
                        />
                    </div>

                    <TextField
                        label="Email"
                        isRequired
                        type="email"
                        value={formData.email}
                        onChange={handleTextChange("email")}
                        placeholder="Enter email address"
                        autoComplete="off"
                        style={{ marginBottom: "16px" }}
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
                        marginTop="15px"
                    />

                    <div>
                        <label htmlFor="hire-date">Hire Date *</label>
                        <TextField
                            id="email"
                            isRequired
                            type="date"
                            value={formData.hireDate}
                            onChange={handleTextChange("hireDate")}
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Internal notes (optional)"
                            value={internalNotes}
                            style={{ width: "100%", padding: "8px", border: "1px solid #ccc" }}
                        />
                    </div>

                    <Inline gap="inline-md" marginTop="stack-md">
                        <Button type="submit" variant="primary" role="button">
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
