import { useLogger } from "@squide/firefly";
import { RootLogger } from "@workleap/logging";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { dataStore } from "../../../shared/dataStore.ts";
import {
    buttonGroupStyle,
    buttonSecondaryStyle,
    buttonStyle,
    containerStyle,
    errorMessageStyle,
    formGroupStyle,
    formStyle,
    inputStyle,
    labelStyle,
    pageHeaderStyle,
    selectStyle,
    successMessageStyle
} from "../../../shared/styles.ts";
import type { EmployeeFormData } from "../../../shared/types.ts";

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

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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

        scope.debug("Validation passed, creating employee");

        const newEmployee = dataStore.addEmployee(formData);
        scope.information(`Employee created with ID: ${newEmployee.id}`);

        setMessage({ type: "success", text: `Employee ${newEmployee.firstName} ${newEmployee.lastName} added successfully!` });
        setFormData(initialFormData);
        scope.end();
    }, [formData, logger, validateForm]);

    const handleCancel = useCallback(() => {
        logger.information("Cancelled adding employee");
        navigate("/employees");
    }, [logger, navigate]);

    return (
        <div style={containerStyle}>
            <div style={pageHeaderStyle}>
                <h1>Add New Employee</h1>
                <p>Enter the details of the new employee</p>
            </div>

            {message && (
                <div style={message.type === "success" ? successMessageStyle : errorMessageStyle}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} style={formStyle}>
                <div style={formGroupStyle}>
                    <label htmlFor="firstName" style={labelStyle}>First Name *</label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        style={inputStyle}
                        placeholder="Enter first name"
                    />
                </div>

                <div style={formGroupStyle}>
                    <label htmlFor="lastName" style={labelStyle}>Last Name *</label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        style={inputStyle}
                        placeholder="Enter last name"
                    />
                </div>

                <div style={formGroupStyle}>
                    <label htmlFor="email" style={labelStyle}>Email *</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        style={inputStyle}
                        placeholder="Enter email address"
                    />
                </div>

                <div style={formGroupStyle}>
                    <label htmlFor="department" style={labelStyle}>Department *</label>
                    <select
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        style={selectStyle}
                    >
                        <option value="">Select a department</option>
                        {departments.map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                        ))}
                    </select>
                </div>

                <div style={formGroupStyle}>
                    <label htmlFor="position" style={labelStyle}>Position *</label>
                    <input
                        id="position"
                        name="position"
                        type="text"
                        value={formData.position}
                        onChange={handleInputChange}
                        style={inputStyle}
                        placeholder="Enter job position"
                    />
                </div>

                <div style={formGroupStyle}>
                    <label htmlFor="hireDate" style={labelStyle}>Hire Date *</label>
                    <input
                        id="hireDate"
                        name="hireDate"
                        type="date"
                        value={formData.hireDate}
                        onChange={handleInputChange}
                        style={inputStyle}
                    />
                </div>

                <div style={buttonGroupStyle}>
                    <button type="submit" style={buttonStyle}>
                        Add Employee
                    </button>
                    <button type="button" onClick={handleCancel} style={buttonSecondaryStyle}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
