import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
    return (
        <>
            <header>Dashboard Layout</header>
            <Outlet />
        </>
    );
}