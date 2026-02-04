import type { CSSProperties } from "react";

export const containerStyle: CSSProperties = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px"
};

export const pageHeaderStyle: CSSProperties = {
    marginBottom: "24px",
    paddingBottom: "16px",
    borderBottom: "1px solid #e0e0e0"
};

export const formStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    maxWidth: "500px"
};

export const formGroupStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "4px"
};

export const labelStyle: CSSProperties = {
    fontWeight: 500,
    fontSize: "14px",
    color: "#333"
};

export const inputStyle: CSSProperties = {
    padding: "8px 12px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    outline: "none"
};

export const selectStyle: CSSProperties = {
    ...inputStyle,
    backgroundColor: "white"
};

export const buttonStyle: CSSProperties = {
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: 500,
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    backgroundColor: "#0066cc",
    color: "white",
    outline: "none"
};

export const buttonSecondaryStyle: CSSProperties = {
    ...buttonStyle,
    backgroundColor: "#6c757d"
};

export const buttonSuccessStyle: CSSProperties = {
    ...buttonStyle,
    backgroundColor: "#28a745"
};

export const tableStyle: CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "16px"
};

export const thStyle: CSSProperties = {
    textAlign: "left",
    padding: "12px",
    backgroundColor: "#f5f5f5",
    borderBottom: "2px solid #ddd",
    fontWeight: 600
};

export const tdStyle: CSSProperties = {
    padding: "12px",
    borderBottom: "1px solid #eee"
};

export const linkStyle: CSSProperties = {
    color: "#0066cc",
    textDecoration: "none",
    cursor: "pointer"
};

export const filterContainerStyle: CSSProperties = {
    display: "flex",
    gap: "16px",
    marginBottom: "20px",
    flexWrap: "wrap",
    alignItems: "flex-end"
};

export const filterGroupStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "4px"
};

export const checkboxContainerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    maxHeight: "200px",
    overflowY: "auto",
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "12px"
};

export const checkboxLabelStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
};

export const badgeStyle: CSSProperties = {
    display: "inline-block",
    padding: "2px 8px",
    fontSize: "12px",
    borderRadius: "12px",
    backgroundColor: "#e0e0e0",
    marginRight: "4px",
    marginBottom: "4px"
};

export const badgeActiveStyle: CSSProperties = {
    ...badgeStyle,
    backgroundColor: "#d4edda",
    color: "#155724"
};

export const navStyle: CSSProperties = {
    backgroundColor: "#333",
    padding: "0 20px"
};

export const navListStyle: CSSProperties = {
    display: "flex",
    listStyle: "none",
    margin: 0,
    padding: 0,
    gap: "0"
};

export const navItemStyle: CSSProperties = {
    padding: "16px 20px",
    color: "#444",
    textDecoration: "none"
};

export const navItemActiveStyle: CSSProperties = {
    ...navItemStyle,
    backgroundColor: "#0066cc"
};

export const messageStyle: CSSProperties = {
    padding: "12px 16px",
    borderRadius: "4px",
    marginBottom: "16px"
};

export const successMessageStyle: CSSProperties = {
    ...messageStyle,
    backgroundColor: "#d4edda",
    color: "#155724",
    border: "1px solid #c3e6cb"
};

export const errorMessageStyle: CSSProperties = {
    ...messageStyle,
    backgroundColor: "#f8d7da",
    color: "#f8d7da",
    border: "1px solid #f5c6cb"
};

export const buttonGroupStyle: CSSProperties = {
    display: "flex",
    gap: "8px",
    marginTop: "16px"
};
