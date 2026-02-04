import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router";
import { useLogger } from "@squide/firefly";
import { dataStore } from "../../../shared/dataStore.ts";
import type { Employee, EmployeeFilters } from "../../../shared/types.ts";
import {
    containerStyle,
    pageHeaderStyle,
    tableStyle,
    thStyle,
    tdStyle,
    linkStyle,
    filterContainerStyle,
    filterGroupStyle,
    inputStyle,
    selectStyle,
    labelStyle,
    badgeActiveStyle,
    buttonStyle
} from "../../../shared/styles.ts";

export function EmployeeListPage() {
    const logger = useLogger();

    const [filters, setFilters] = useState<EmployeeFilters>({
        search: "",
        department: "",
        mandateId: ""
    });

    const employees = dataStore.getAllEmployees();
    const departments = dataStore.getDepartments();
    const mandates = dataStore.getActiveMandates();

    const filteredEmployees = useMemo(() => {
        logger.debug("Filtering employees with criteria");

        return employees.filter(employee => {
            const searchLower = filters.search.toLowerCase();
            const matchesSearch = filters.search === "" ||
                employee.firstName.toLowerCase().includes(searchLower) ||
                employee.lastName.toLowerCase().includes(searchLower) ||
                employee.email.toLowerCase().includes(searchLower) ||
                employee.position.toLowerCase().includes(searchLower);

            const matchesDepartment = filters.department === "" ||
                employee.department === filters.department;

            const matchesMandate = filters.mandateId === "" ||
                employee.assignedMandateIds.includes(filters.mandateId);

            return matchesSearch && matchesDepartment && matchesMandate;
        });
    }, [employees, filters, logger]);

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({ ...prev, search: e.target.value }));
    }, []);

    const handleDepartmentChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters(prev => ({ ...prev, department: e.target.value }));
    }, []);

    const handleMandateChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters(prev => ({ ...prev, mandateId: e.target.value }));
    }, []);

    const handleClearFilters = useCallback(() => {
        logger.information("Clearing all filters");
        setFilters({ search: "", department: "", mandateId: "" });
    }, [logger]);

    const getMandateNames = useCallback((mandateIds: string[]) => {
        return mandateIds
            .map(id => dataStore.getMandateById(id))
            .filter((m): m is NonNullable<typeof m> => m !== undefined)
            .map(m => m.name);
    }, []);

    logger.information(`Displaying ${filteredEmployees.length} of ${employees.length} employees`);

    return (
        <div style={containerStyle}>
            <div style={pageHeaderStyle}>
                <h1>Employee Directory</h1>
                <p>Manage your organization's employees and assignments</p>
            </div>

            <div style={filterContainerStyle}>
                <div style={filterGroupStyle}>
                    <label htmlFor="search" style={labelStyle}>Search</label>
                    <input
                        id="search"
                        type="text"
                        placeholder="Name, email, or position..."
                        value={filters.search}
                        onChange={handleSearchChange}
                        style={{ ...inputStyle, width: "250px" }}
                    />
                </div>

                <div style={filterGroupStyle}>
                    <label htmlFor="department" style={labelStyle}>Department</label>
                    <select
                        id="department"
                        value={filters.department}
                        onChange={handleDepartmentChange}
                        style={{ ...selectStyle, width: "180px" }}
                    >
                        <option value="">All Departments</option>
                        {departments.map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                        ))}
                    </select>
                </div>

                <div style={filterGroupStyle}>
                    <label htmlFor="mandate" style={labelStyle}>Assigned Mandate</label>
                    <select
                        id="mandate"
                        value={filters.mandateId}
                        onChange={handleMandateChange}
                        style={{ ...selectStyle, width: "200px" }}
                    >
                        <option value="">All Mandates</option>
                        {mandates.map(mandate => (
                            <option key={mandate.id} value={mandate.id}>{mandate.name}</option>
                        ))}
                    </select>
                </div>

                <button
                    type="button"
                    onClick={handleClearFilters}
                    style={{ ...buttonStyle, backgroundColor: "#6c757d" }}
                >
                    Clear Filters
                </button>
            </div>

            <p>Showing {filteredEmployees.length} of {employees.length} employees</p>

            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>Name</th>
                        <th style={thStyle}>Email</th>
                        <th style={thStyle}>Department</th>
                        <th style={thStyle}>Position</th>
                        <th style={thStyle}>Hire Date</th>
                        <th style={thStyle}>Mandates</th>
                        <th style={thStyle}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map((employee: Employee) => (
                        <tr key={employee.id}>
                            <td style={tdStyle}>
                                {employee.firstName} {employee.lastName}
                            </td>
                            <td style={tdStyle}>{employee.email}</td>
                            <td style={tdStyle}>{employee.department}</td>
                            <td style={tdStyle}>{employee.position}</td>
                            <td style={tdStyle}>{new Date(employee.hireDate).toLocaleDateString()}</td>
                            <td style={tdStyle}>
                                {getMandateNames(employee.assignedMandateIds).map(name => (
                                    <span key={name} style={badgeActiveStyle}>{name}</span>
                                ))}
                            </td>
                            <td style={tdStyle}>
                                <Link to={`/employees/${employee.id}/edit`} style={linkStyle}>
                                    Edit
                                </Link>
                                {" | "}
                                <Link to={`/employees/${employee.id}/mandates`} style={linkStyle}>
                                    Mandates
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {filteredEmployees.length === 0 && (
                <p style={{ textAlign: "center", padding: "40px", color: "#666" }}>
                    No employees found matching your criteria.
                </p>
            )}
        </div>
    );
}
