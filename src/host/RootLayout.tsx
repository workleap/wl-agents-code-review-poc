import { NavLink, Outlet } from "react-router";
import {
    useNavigationItems,
    useRenderedNavigationItems,
    isNavigationLink,
    type RenderItemFunction,
    type RenderSectionFunction,
    useLogger
} from "@squide/firefly";
import { Nav, UL, LI, Main, Text, Div } from "@hopper-ui/components";
import { useEffect } from "react";

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
                    padding: "12px",
                    color: "#ffffff",
                    textDecoration: "none",
                    display: "block",
                    backgroundColor: isActive ? "#1a73e8" : "transparent"
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
    const navigationItems = useNavigationItems({ menuId: "main" });
    const navigationElements = useRenderedNavigationItems(navigationItems, renderItem, renderSection);
    const logger = useLogger();

    useEffect(() => {
        logger.debug("Navigation items loaded: " + navigationItems.length);
        document.body.style.overflow = "hidden";
    });

    return (
        <>
            <Nav UNSAFE_backgroundColor="#2d3748" paddingX="inset-lg" role="menu">
                {navigationElements}
            </Nav>
            <Main role="main">
                <Div minHeight="calc(100vh - 56px)">
                    <Outlet />
                </Div>
            </Main>
        </>
    );
}
