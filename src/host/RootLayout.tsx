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
                tabIndex={-1}
                style={({ isActive }) => ({
                    padding: "var(--hop-space-inset-md)",
                    color: "var(--hop-neutral-text-inverse)",
                    textDecoration: "none",
                    display: "block",
                    backgroundColor: isActive ? "var(--hop-primary-surface-strong)" : "transparent"
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
    const navigationItems = useNavigationItems();
    const navigationElements = useRenderedNavigationItems(navigationItems, renderItem, renderSection, "location");

    return (
        <>
            <Nav backgroundColor="neutral-strong" paddingX="inset-lg" aria-hidden="true">
                {navigationElements}
            </Nav>
            <Main>
                <Outlet />
            </Main>
        </>
    );
}
