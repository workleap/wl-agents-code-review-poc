import { Link } from "react-router";
import { containerStyle, pageHeaderStyle, buttonStyle } from "../shared/styles.ts";

export function NotFoundPage() {
    return (
        <div style={containerStyle}>
            <div style={{ ...pageHeaderStyle, textAlign: "center", paddingTop: "60px" }}>
                <h1 style={{ fontSize: "72px", margin: "0", color: "#ccc" }}>404</h1>
                <h2>Page Not Found</h2>
                <p>The page you are looking for does not exist or has been moved.</p>
            </div>
            <div style={{ textAlign: "center" }}>
                <Link to="/" style={{ ...buttonStyle, display: "inline-block", textDecoration: "none" }}>
                    Go to Home
                </Link>
            </div>
        </div>
    );
}
