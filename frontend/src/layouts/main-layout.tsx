import { Outlet } from "react-router-dom";

export function MainLayout() {
    return (
        <>
            <header>Main Layout</header>
            <Outlet />
        </>
    );
}