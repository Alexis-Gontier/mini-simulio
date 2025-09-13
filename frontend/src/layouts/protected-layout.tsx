import { isAuthenticated } from '@/lib/token';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedLayout() {

    if (!isAuthenticated()) {
        return <Navigate to="/auth/login" replace />
    }

    return <Outlet />;
}
