import { Link } from "react-router";
import { containerStyle, pageHeaderStyle, linkStyle, buttonStyle } from "../shared/styles.ts";

export function HomePage() {
    return (
        <div style={containerStyle}>
            <div style={pageHeaderStyle}>
                <h1>Employee Management System</h1>
                <p>Welcome to the employee management workspace</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginTop: "30px" }}>
                <div style={{ padding: "24px", border: "1px solid #e0e0e0", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
                    <h2 style={{ marginTop: 0 }}>View Employees</h2>
                    <p>Browse and search employees in your organization. Filter by department or assigned mandates.</p>
                    <Link to="/employees" style={{ ...buttonStyle, display: "inline-block", textDecoration: "none" }}>
                        View Employee List
                    </Link>
                </div>

                <div style={{ padding: "24px", border: "1px solid #e0e0e0", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
                    <h2 style={{ marginTop: 0 }}>Add Employee</h2>
                    <p>Register a new employee in the system with their personal information and department assignment.</p>
                    <Link to="/employees/add" style={{ ...buttonStyle, display: "inline-block", textDecoration: "none", backgroundColor: "#28a745" }}>
                        Add New Employee
                    </Link>
                </div>

                <div style={{ padding: "24px", border: "1px solid #e0e0e0", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
                    <h2 style={{ marginTop: 0 }}>Quick Stats</h2>
                    <p>The system currently manages employee records with active project mandates.</p>
                    <Link to="/employees" style={linkStyle}>
                        View Details ->
                    </Link>
                </div>
            </div>
        </div>
    );
}
