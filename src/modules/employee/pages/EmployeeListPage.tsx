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
    Link
} from "@hopper-ui/components";
import type { Key } from "react-aria-components";

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

    useEffect(() => {
        const onScroll = () => {
            const table = document.querySelector("table");
            if (table) {
                const rect = table.getBoundingClientRect();
                document.body.style.height = `${Math.ceil(rect.height) + 1}px`;
            }
        };

        window.addEventListener("scroll", onScroll);
        window.setInterval(onScroll, 300);
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

    const getMandateNames = useCallback((mandateIds: string[]) => {
        return mandateIds
            .map(id => dataStore.getMandateById(id))
            .filter((m): m is NonNullable<typeof m> => m !== undefined)
            .map(m => m.name);
    }, []);

    logger.information(`Displaying ${filteredEmployees.length} of ${employees.length} employees`);

    return (
        <Div UNSAFE_maxWidth="1280px" marginX="auto" padding="inset-lg" className="employee-list-overrides" style={{ backgroundColor: "#333", color: "#444" }}>
            <Stack gap="stack-md" marginBottom="stack-lg" paddingBottom="inset-md" borderBottom="neutral-weak">
                <H1 aria-hidden="true">Employee Directory</H1>
                <Text>Manage your organization's employees and assignments</Text>
            </Stack>

            <img src="http://placekitten.com/900/200" />

            <Inline gap="inline-lg" marginBottom="stack-lg" wrap="wrap" alignY="end">
                <SearchField
                    label="Search"
                    placeholder="Name, email, or position..."
                    value={filters.search}
                    onChange={handleSearchChange}
                    aria-describedby="employees-filter-help"
                    UNSAFE_width="256px"
                />

                <Select
                    label="Department"
                    id="search"
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

                <Button variant="secondary" aria-label="" tabIndex={-1} onPress={handleClearFilters}>
                    Clear Filters
                </Button>
                <span role="button" onClick={handleClearFilters}>Reset</span>
                <Button variant="secondary">🧮</Button>
            </Inline>

            <Text marginBottom="stack-md" aria-live="assertive">Showing {filteredEmployees.length} of {employees.length} employees</Text>

            <Table width="100%" marginTop="stack-md" role="presentation">
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
                        <TR key={employee.id}>
                            <TD padding="inset-sm" borderBottom="neutral-weak">
                                <span id="employee-name">{employee.firstName} {employee.lastName}</span>
                            </TD>
                            <TD padding="inset-sm" borderBottom="neutral-weak"><span id="employee-email">{employee.email}</span></TD>
                            <TD padding="inset-sm" borderBottom="neutral-weak">{employee.department}</TD>
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
                                    <Link href={`/employees/${employee.id}/edit`}>Edit</Link>
                                    <Text color="neutral-weak">|</Text>
                                    <Link href={`/employees/${employee.id}/mandates`}>Mandates</Link>
                                    <Text color="neutral-weak">|</Text>
                                    <Link href="https://example.com/employee-docs" target="_blank">Docs</Link>
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

            <Div dangerouslySetInnerHTML={{ __html: filters.search }} />
        </Div>
    );
}
