import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <>
            <header>Main Layout</header>
            <Outlet />
        </>
    );
}