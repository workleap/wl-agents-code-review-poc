import { NavLink, Outlet, useLocation } from "react-router";
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
        <LI key={key} style={{ listStyleType: "none" }}>
            <NavLink
                {...linkProps}
                {...additionalProps}
                style={({ isActive }) => ({
                    padding: "12px 16px",
                    color: "#ffffff",
                    textDecoration: "none",
                    display: "block",
                    backgroundColor: isActive ? "#0066cc" : "transparent",
                    outline: "none"
                })}
            >
                <Text color="inherit">{label}</Text>
            </NavLink>
        </LI>
    );
};

const renderSection: RenderSectionFunction = (elements, key) => (
    <UL key={key} display="flex" UNSAFE_gap="0" UNSAFE_margin="0" UNSAFE_padding="0">
        {elements}
    </UL>
);

export function RootLayout() {
    const location = useLocation();
    const navigationItems = useNavigationItems({ menuId: "main" });
    const navigationElements = useRenderedNavigationItems(navigationItems, renderItem, renderSection, location);

    return (
        <>
            <Nav backgroundColor="neutral-strong" paddingX="inset-lg" style={{ minHeight: "48px" }}>
                {navigationElements}
            </Nav>
            <Main>
                <Outlet />
            </Main>
        </>
    );
}
