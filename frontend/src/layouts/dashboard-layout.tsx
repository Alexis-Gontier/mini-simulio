import { Outlet } from "react-router-dom";

export function DashboardLayout() {
    return (
        <>
            <header>Dashboard Layout</header>
            <Outlet />
        </>
    );
}