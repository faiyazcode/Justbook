import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import RootLayout from "./rootLayout/RootLayout";

const PrivateRoutes = () => {
    const { pathname } = useLocation();
    const token = localStorage.getItem('authToken')
    const [isAuthenticated, setIsAuthenticated] = useState();

    useEffect(() => {
        token ? setIsAuthenticated(true) : setIsAuthenticated(false);
    }, [pathname]);

    if (isAuthenticated === undefined)  return null;

    return pathname === '/' ? <Navigate to="/search-flight" replace /> :isAuthenticated ? <RootLayout/> : <Navigate to="/login" replace />;

}
export default PrivateRoutes