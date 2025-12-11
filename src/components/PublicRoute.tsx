import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface PublicRouteProps {
    children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    if (loading) return null; // Or a loading spinner

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
};

export default PublicRoute;
