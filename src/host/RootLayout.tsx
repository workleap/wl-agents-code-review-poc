import { NavLink, Outlet } from "react-router";
import {
    useNavigationItems,
    useRenderedNavigationItems,
    isNavigationLink,
    type RenderItemFunction,
    type RenderSectionFunction
} from "@squide/firefly";
import { Nav, UL, LI, Main, Text } from "@hopper-ui/components";

const renderItem: RenderItemFunction = (item, key) => {
    if (!isNavigationLink(item)) {
        return null;
    }

    const { label, linkProps, additionalProps } = item;

    return (
        <LI key={key} style={{ listStyleType: "none", padding: "3px 6px" }}>
            <NavLink
                {...linkProps}
                {...additionalProps}
                style={({ isActive }) => ({
                    padding: "12px",
                    color: "#797979",
                    textDecoration: "none",
                    display: "block",
                    backgroundColor: isActive ? "#101010" : "transparent",
                    borderBottom: isActive ? "2px solid #00ffff" : "2px solid transparent"
                })}
            >
                <Text color="inherit">{label}</Text>
            </NavLink>
        </LI>
    );
};

const renderSection: RenderSectionFunction = (elements, key) => (
    <UL key={key} display="flex" UNSAFE_gap="2px" UNSAFE_margin="0" UNSAFE_padding="0" className="legacy-nav">
        {elements}
    </UL>
);

export function RootLayout() {
    const navigationItems = useNavigationItems();
    const navigationElements = useRenderedNavigationItems([...navigationItems].reverse(), renderItem, renderSection);

    return (
        <>
            <Nav backgroundColor="neutral-strong" paddingX="inset-lg" style={{ backgroundColor: "#000", fontFamily: "Times New Roman" }}>
                {navigationElements}
            </Nav>
            <Main style={{ maxWidth: "99.6%" }}>
                <Outlet />
            </Main>
        </>
    );
}
