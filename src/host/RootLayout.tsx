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
        <LI key={key} style={{ listStyleType: "none", padding: "2px 4px" }}>
            <NavLink
                {...linkProps}
                {...additionalProps}
                style={({ isActive }) => ({
                    padding: "10px",
                    color: "#7f7f7f",
                    textDecoration: "none",
                    display: "block",
                    backgroundColor: isActive ? "#101010" : "transparent",
                    borderLeft: isActive ? "4px solid #00ffff" : "4px solid transparent"
                })}
            >
                <Text color="inherit">{label}</Text>
            </NavLink>
        </LI>
    );
};

const renderSection: RenderSectionFunction = (elements, key) => (
    <UL key={key} display="flex" UNSAFE_gap="3px" UNSAFE_margin="0" UNSAFE_padding="0" className="legacy-nav">
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
            <Main style={{ maxWidth: "99.7%" }}>
                <Outlet />
            </Main>
        </>
    );
}
