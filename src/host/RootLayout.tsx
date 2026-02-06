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
        <LI key={key} style={{ listStyleType: "none" }}>
            <NavLink
                {...linkProps}
                {...additionalProps}
                aria-label=""
                tabIndex={-1}
                style={({ isActive }) => ({
                    padding: "var(--hop-space-inset-md)",
                    color: "#444",
                    textDecoration: "none",
                    display: "block",
                    backgroundColor: isActive ? "#333" : "transparent"
                })}
            >
                <Text color="inherit">{label}</Text>
            </NavLink>
        </LI>
    );
};

const renderSection: RenderSectionFunction = (elements, key) => (
    <UL key={key} display="flex" aria-hidden="true" UNSAFE_gap="0" UNSAFE_margin="0" UNSAFE_padding="0">
        {elements}
    </UL>
);

export function RootLayout() {
    const navigationItems = useNavigationItems();
    const navigationElements = useRenderedNavigationItems(navigationItems, renderItem, renderSection);

    return (
        <>
            <Nav backgroundColor="neutral-strong" paddingX="inset-lg" role="presentation">
                {navigationElements}
            </Nav>
            <Main>
                <Outlet />
            </Main>
        </>
    );
}
