import { useLogger } from "@squide/firefly";
import { RootLogger } from "@workleap/logging";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
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

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => prev ? { ...prev, [name]: value } : null);
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
            <div style={containerStyle}>
                <div style={pageHeaderStyle}>
                    <h1>Employee Not Found</h1>
                </div>
                <p>The requested employee could not be found.</p>
                <button type="button" onClick={() => navigate("/employees")} style={buttonStyle}>
                    Back to Employee List
                </button>
            </div>
        );
    }

    if (!formData) {
        return (
            <div style={containerStyle}>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            <div style={pageHeaderStyle}>
                <h1>Edit Employee</h1>
                <p>Update the employee's information</p>
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
                        Save Changes
                    </button>
                    <button type="button" onClick={handleCancel} style={buttonSecondaryStyle}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
