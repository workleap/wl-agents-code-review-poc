export interface Mandate {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
}

export interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    department: string;
    position: string;
    hireDate: string;
    assignedMandateIds: string[];
}

export type EmployeeFormData = Omit<Employee, "id">;

export interface EmployeeFilters {
    search: string;
    department: string;
    mandateId: string;
}
