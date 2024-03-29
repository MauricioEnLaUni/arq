import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default () => {
    const { auth } = useAuth();
    const location = useLocation();

    return auth ? (
        <Navigate to="/" state={{ from: location }} replace />
    ) : (
        <Outlet />
    );
};
