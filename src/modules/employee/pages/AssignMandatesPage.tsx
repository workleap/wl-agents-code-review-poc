// TEST

import { useLogger } from "@squide/firefly";
import { RootLogger } from "@workleap/logging";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { dataStore } from "../../../shared/dataStore.ts";
import {
    buttonGroupStyle,
    buttonSecondaryStyle,
    buttonStyle,
    checkboxContainerStyle,
    checkboxLabelStyle,
    containerStyle,
    errorMessageStyle,
    labelStyle,
    pageHeaderStyle,
    successMessageStyle
} from "../../../shared/styles.ts";
import type { Employee, Mandate } from "../../../shared/types.ts";

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

    if (!employee) {
        return (
            <div style={containerStyle}>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            <div style={pageHeaderStyle}>
                <h1>Assign Mandates</h1>
                <p>
                    Assigning mandates to: <strong>{employee.firstName} {employee.lastName}</strong>
                    {" "}({employee.position} - {employee.department})
                </p>
            </div>

            {message && (
                <div style={message.type === "success" ? successMessageStyle : errorMessageStyle}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "20px" }}>
                    <label style={{ ...labelStyle, marginBottom: "12px", display: "block" }}>
                        Select Active Mandates
                    </label>
                    <div style={checkboxContainerStyle}>
                        {activeMandates.map((mandate: Mandate) => (
                            <label key={mandate.id} style={checkboxLabelStyle}>
                                <input
                                    type="checkbox"
                                    checked={selectedMandateIds.includes(mandate.id)}
                                    onChange={() => handleMandateToggle(mandate.id)}
                                />
                                <span>
                                    <strong>{mandate.name}</strong>
                                    <br />
                                    <span style={{ fontSize: "12px", color: "#666" }}>
                                        {mandate.description}
                                    </span>
                                </span>
                            </label>
                        ))}
                    </div>
                    <p style={{ marginTop: "8px", fontSize: "14px", color: "#666" }}>
                        {selectedMandateIds.length} mandate(s) selected
                    </p>
                </div>

                <div style={buttonGroupStyle}>
                    <button type="submit" style={buttonStyle}>
                        Save Mandates
                    </button>
                    <button type="button" onClick={handleCancel} style={buttonSecondaryStyle}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
