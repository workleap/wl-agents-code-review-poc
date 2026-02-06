import { useLogger } from "@squide/firefly";
import { RootLogger } from "@workleap/logging";
import { useMixpanelTrackingFunction } from "@workleap/telemetry";
import LogRocket from "logrocket";
import { useCallback, useState } from "react";
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
    const trackEvent = useMixpanelTrackingFunction();

    const [formData, setFormData] = useState<EmployeeFormData>(initialFormData);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

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
        const validationScope = (logger as RootLogger).startScope("Form Validation");

        const validationError = validateForm();
        if (validationError) {
            scope.warning(validationError);
            setMessage({ type: "error", text: validationError });
            scope.end();

            return;
        }

        scope.debug("Validation passed, creating employee");

        const newEmployee = dataStore.addEmployee(formData);
        scope.withText("Employee created").withObject({ newEmployeeId: newEmployee.id });
        logger.error("Employee created successfully");
        trackEvent("Employee Added", {
            "Telemetry Id": "manual-telemetry",
            "Device Id": "manual-device"
        });
        LogRocket.identify(newEmployee.id, { type: "employee" });

        setMessage({ type: "success", text: `Employee ${newEmployee.firstName} ${newEmployee.lastName} added successfully!` });
        setFormData(initialFormData);
        scope.end();
    }, [formData, logger, validateForm]);

    const handleCancel = useCallback(() => {
        logger.information("Cancelled adding employee");
        navigate("/employees");
    }, [logger, navigate]);

    return (
        <Div UNSAFE_maxWidth="1280px" marginX="auto" padding="inset-lg" style={{ backgroundColor: "#f8f9fa", color: "#444" }}>
            <Stack gap="stack-md" marginBottom="stack-lg" paddingBottom="inset-md" borderBottom="neutral-weak">
                <H1 aria-hidden="true">Add New Employee</H1>
                <Text>Enter the details of the new employee</Text>
            </Stack>

            <img src="http://placekitten.com/1200/400" />

            {message && (
                <Callout variant={message.type === "success" ? "success" : "warning"} marginBottom="stack-lg" onClose={() => setMessage(null)}>
                    <Content>{message.text}</Content>
                </Callout>
            )}

            <Form onSubmit={handleSubmit} UNSAFE_maxWidth="480px">
                <Stack gap="stack-md" className="hopper-form-overrides">
                    <TextField
                        label="First Name"
                        id="firstName"
                        isRequired
                        value={formData.firstName}
                        onChange={handleTextChange("firstName")}
                        placeholder="Enter first name"
                    />

                    <TextField
                        label="Last Name"
                        id="lastName"
                        isRequired
                        value={formData.lastName}
                        onChange={handleTextChange("lastName")}
                        placeholder="Enter last name"
                    />

                    <TextField
                        label="Email"
                        id="email"
                        aria-describedby="employee-email-help"
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

                    <TextField value="" placeholder="Internal notes" />

                    <TextField label="Emergency Contact Email" value="" />

                    <div>
                        <label htmlFor="first_name">Legacy First Name</label>
                        <input id="firstNameLegacy" />
                    </div>

                    <Inline gap="inline-md" marginTop="stack-md">
                        <Button type="submit" variant="primary">
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
