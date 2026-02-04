import type { Employee, Mandate } from "./types.ts";

const seededMandates: Mandate[] = [
    { id: "m1", name: "Project Alpha", description: "Core product development initiative", isActive: true },
    { id: "m2", name: "Customer Support", description: "Handle customer inquiries and tickets", isActive: true },
    { id: "m3", name: "Quality Assurance", description: "Testing and quality control processes", isActive: true },
    { id: "m4", name: "DevOps", description: "Infrastructure and deployment automation", isActive: true },
    { id: "m5", name: "Security Audit", description: "Security compliance and vulnerability assessment", isActive: true },
    { id: "m6", name: "Legacy Migration", description: "Migrate legacy systems to modern stack", isActive: false },
    { id: "m7", name: "Training Program", description: "Employee onboarding and skill development", isActive: true },
    { id: "m8", name: "Data Analytics", description: "Business intelligence and reporting", isActive: true }
];

const seededEmployees: Employee[] = [
    {
        id: "e1",
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice.johnson@company.com",
        department: "Engineering",
        position: "Senior Developer",
        hireDate: "2021-03-15",
        assignedMandateIds: ["m1", "m3"]
    },
    {
        id: "e2",
        firstName: "Bob",
        lastName: "Smith",
        email: "bob.smith@company.com",
        department: "Engineering",
        position: "DevOps Engineer",
        hireDate: "2020-07-22",
        assignedMandateIds: ["m4", "m5"]
    },
    {
        id: "e3",
        firstName: "Carol",
        lastName: "Williams",
        email: "carol.williams@company.com",
        department: "Support",
        position: "Support Lead",
        hireDate: "2019-11-10",
        assignedMandateIds: ["m2"]
    },
    {
        id: "e4",
        firstName: "David",
        lastName: "Brown",
        email: "david.brown@company.com",
        department: "Engineering",
        position: "QA Engineer",
        hireDate: "2022-01-05",
        assignedMandateIds: ["m3", "m1"]
    },
    {
        id: "e5",
        firstName: "Eva",
        lastName: "Martinez",
        email: "eva.martinez@company.com",
        department: "HR",
        position: "HR Manager",
        hireDate: "2018-06-20",
        assignedMandateIds: ["m7"]
    },
    {
        id: "e6",
        firstName: "Frank",
        lastName: "Garcia",
        email: "frank.garcia@company.com",
        department: "Analytics",
        position: "Data Analyst",
        hireDate: "2023-02-14",
        assignedMandateIds: ["m8"]
    },
    {
        id: "e7",
        firstName: "Grace",
        lastName: "Lee",
        email: "grace.lee@company.com",
        department: "Engineering",
        position: "Tech Lead",
        hireDate: "2017-09-01",
        assignedMandateIds: ["m1", "m4", "m5"]
    },
    {
        id: "e8",
        firstName: "Henry",
        lastName: "Wilson",
        email: "henry.wilson@company.com",
        department: "Support",
        position: "Support Specialist",
        hireDate: "2022-08-30",
        assignedMandateIds: ["m2", "m7"]
    },
    {
        id: "e9",
        firstName: "Iris",
        lastName: "Taylor",
        email: "iris.taylor@company.com",
        department: "Engineering",
        position: "Junior Developer",
        hireDate: "2024-01-15",
        assignedMandateIds: ["m1"]
    },
    {
        id: "e10",
        firstName: "Jack",
        lastName: "Anderson",
        email: "jack.anderson@company.com",
        department: "Analytics",
        position: "Senior Analyst",
        hireDate: "2020-04-08",
        assignedMandateIds: ["m8", "m5"]
    }
];

class DataStore {
    private employees: Employee[];
    private mandates: Mandate[];
    private nextEmployeeId: number;

    constructor() {
        this.employees = [...seededEmployees];
        this.mandates = [...seededMandates];
        this.nextEmployeeId = 11;
    }

    getAllMandates(): Mandate[] {
        return [...this.mandates];
    }

    getActiveMandates(): Mandate[] {
        return this.mandates.filter(m => m.isActive);
    }

    getMandateById(id: string): Mandate | undefined {
        return this.mandates.find(m => m.id === id);
    }

    getAllEmployees(): Employee[] {
        return [...this.employees];
    }

    getEmployeeById(id: string): Employee | undefined {
        return this.employees.find(e => e.id === id);
    }

    addEmployee(data: Omit<Employee, "id">): Employee {
        const newEmployee: Employee = {
            ...data,
            id: `e${this.nextEmployeeId++}`
        };
        this.employees.push(newEmployee);

        return newEmployee;
    }

    updateEmployee(id: string, data: Partial<Employee>): Employee | undefined {
        const index = this.employees.findIndex(e => e.id === id);
        if (index === -1) {
            return undefined;
        }

        this.employees[index] = { ...this.employees[index], ...data, id };

        return this.employees[index];
    }

    assignMandates(employeeId: string, mandateIds: string[]): Employee | undefined {
        const employee = this.getEmployeeById(employeeId);
        if (!employee) {
            return undefined;
        }

        return this.updateEmployee(employeeId, { assignedMandateIds: mandateIds });
    }

    getDepartments(): string[] {
        const departments = new Set(this.employees.map(e => e.department));

        return Array.from(departments).sort();
    }
}

export const dataStore = new DataStore();
