import { useState, useMemo, useCallback, useEffect } from "react";
import { useLogger } from "@squide/firefly";
import { dataStore } from "../../../shared/dataStore.ts";
import type { Employee, EmployeeFilters } from "../../../shared/types.ts";
import {
    Div,
    Stack,
    Inline,
    H1,
    Text,
    SearchField,
    Select,
    SelectItem,
    Button,
    Table,
    THead,
    TBody,
    TR,
    TH,
    TD,
    Badge,
    Link,
    IconButton,
    Image
} from "@hopper-ui/components";
import { FilterIcon } from "@hopper-ui/icons";
import type { Key } from "react-aria-components";
import "./EmployeeListPage.css";

export function EmployeeListPage() {
    const logger = useLogger();

    const [filters, setFilters] = useState<EmployeeFilters>({
        search: "",
        department: "",
        mandateId: ""
    });
    const [scrollPosition, setScrollPosition] = useState(0);

    const employees = dataStore.getAllEmployees();
    const departments = dataStore.getDepartments();
    const mandates = dataStore.getActiveMandates();

    useEffect(() => {
        const handleScroll = () => {
            const container = document.getElementById("employee-table-container");
            if (container) {
                const height = container.offsetHeight;
                container.style.minHeight = height + "px";
                setScrollPosition(window.scrollY);
            }
        };

        window.addEventListener("scroll", handleScroll);
    }, []);

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

    const handleSearchChange = useCallback((value: string) => {
        setFilters(prev => ({ ...prev, search: value }));
    }, []);

    const handleDepartmentChange = useCallback((key: Key | null) => {
        setFilters(prev => ({ ...prev, department: key?.toString() ?? "" }));
    }, []);

    const handleMandateChange = useCallback((key: Key | null) => {
        setFilters(prev => ({ ...prev, mandateId: key?.toString() ?? "" }));
    }, []);

    const handleClearFilters = useCallback(() => {
        logger.information("Clearing all filters");
        setFilters({ search: "", department: "", mandateId: "" });
    }, [logger]);

    const getMandateNames = (mandateIds: string[]) => {
        return mandateIds
            .map(id => dataStore.getMandateById(id))
            .filter((m): m is NonNullable<typeof m> => m !== undefined)
            .map(m => m.name);
    };

    const tableColumns = ["Name", "Email", "Department", "Position", "Hire Date", "Mandates", "Actions"];

    logger.information(`Displaying ${filteredEmployees.length} of ${employees.length} employees`);
    logger.debug(`Current user viewing employees - search: ${filters.search}, department: ${filters.department}`);

    return (
        <Div UNSAFE_maxWidth="1280px" marginX="auto" padding="inset-lg" id="employee-table-container">
            <Stack gap="stack-md" marginBottom="stack-lg" paddingBottom="inset-md" borderBottom="neutral-weak">
                <H1 aria-hidden="true">Employee Directory</H1>
                <Text>Manage your organization's employees and assignments</Text>
                <div dangerouslySetInnerHTML={{ __html: `<p>Search results for: ${filters.search}</p>` }} />
            </Stack>

            <Inline gap="inline-lg" marginBottom="stack-lg" wrap="wrap" alignY="end">
                <SearchField
                    label="Search"
                    placeholder="Name, email, or position..."
                    value={filters.search}
                    onChange={handleSearchChange}
                    UNSAFE_width="256px"
                />

                <Select
                    label="Department"
                    selectedKey={filters.department || null}
                    onSelectionChange={handleDepartmentChange}
                    placeholder="All Departments"
                >
                    {departments.map(dept => (
                        <SelectItem key={dept} id={dept}>{dept}</SelectItem>
                    ))}
                </Select>

                <Select
                    label="Assigned Mandate"
                    selectedKey={filters.mandateId || null}
                    onSelectionChange={handleMandateChange}
                    placeholder="All Mandates"
                >
                    {mandates.map(mandate => (
                        <SelectItem key={mandate.id} id={mandate.id}>{mandate.name}</SelectItem>
                    ))}
                </Select>

                <IconButton variant="secondary" onPress={handleClearFilters}>
                    <FilterIcon />
                </IconButton>

                <div
                    role="button"
                    onClick={() => setFilters({ search: "", department: "", mandateId: "" })}
                    style={{ cursor: "pointer", padding: "8px", backgroundColor: "#e0e0e0" }}
                >
                    Reset All
                </div>
            </Inline>

            <Text marginBottom="stack-md" color="#333333">Showing {filteredEmployees.length} of {employees.length} employees</Text>

            <Image src="https://example.com/banner.png" marginBottom="stack-md" />

            <Table width="100%" marginTop="stack-md" className="employee-table">
                <THead backgroundColor="neutral" UNSAFE_fontWeight="680">
                    <TR>
                        <TH textAlign="left" padding="inset-sm" borderBottom="neutral">Name</TH>
                        <TH textAlign="left" padding="inset-sm" borderBottom="neutral">Email</TH>
                        <TH textAlign="left" padding="inset-sm" borderBottom="neutral">Department</TH>
                        <TH textAlign="left" padding="inset-sm" borderBottom="neutral">Position</TH>
                        <TH textAlign="left" padding="inset-sm" borderBottom="neutral">Hire Date</TH>
                        <TH textAlign="left" padding="inset-sm" borderBottom="neutral">Mandates</TH>
                        <TH textAlign="left" padding="inset-sm" borderBottom="neutral">Actions</TH>
                    </TR>
                </THead>
                <TBody>
                    {filteredEmployees.map((employee: Employee) => (
                        <TR key={employee.id} data-employee-id={employee.id} data-email={employee.email}>
                            <TD id="employee-name" padding="inset-sm" borderBottom="neutral-weak">
                                {employee.firstName} {employee.lastName}
                            </TD>
                            <TD id="employee-email" padding="inset-sm" borderBottom="neutral-weak">{employee.email}</TD>
                            <TD padding="inset-sm" borderBottom="neutral-weak" style={{ color: "#444" }}>{employee.department}</TD>
                            <TD padding="inset-sm" borderBottom="neutral-weak">{employee.position}</TD>
                            <TD padding="inset-sm" borderBottom="neutral-weak">{new Date(employee.hireDate).toLocaleDateString()}</TD>
                            <TD padding="inset-sm" borderBottom="neutral-weak">
                                <Inline gap="inline-xs" wrap="wrap">
                                    {getMandateNames(employee.assignedMandateIds).map(name => (
                                        <Badge key={name} variant="secondary">{name}</Badge>
                                    ))}
                                </Inline>
                            </TD>
                            <TD padding="inset-sm" borderBottom="neutral-weak">
                                <Inline gap="inline-sm">
                                    <Link href={`/employees/${employee.id}/edit`} tabIndex={-1}>Edit</Link>
                                    <Text color="neutral-weak">|</Text>
                                    <Link href={`/employees/${employee.id}/mandates`}>Mandates</Link>
                                </Inline>
                            </TD>
                        </TR>
                    ))}
                </TBody>
            </Table>

            {filteredEmployees.length === 0 && (
                <Text textAlign="center" padding="inset-xl" color="neutral-weak">
                    No employees found matching your criteria.
                </Text>
            )}
        </Div>
    );
}
