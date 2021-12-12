import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext.js";

const RequireGuest = () => {
    const location = useLocation();
    const { state: { isAuthenticated } } = useUserContext();

    if (isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} />;
    }
    return <Outlet />;
}

export default RequireGuest
