import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="min-h-screen max-w-xs mx-auto flex items-center justify-center">
            <Outlet />
        </div>
    );
}