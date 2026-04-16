import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string; // e.g., 'admin' or 'pro'
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasRole, setHasRole] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      setIsAuthenticated(true);
      if (!requiredRole) {
        setHasRole(true);
        setLoading(false);
        return;
      }
      // Fetch user profile for role
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      if (profile && profile.role === requiredRole) {
        setHasRole(true);
      } else {
        setHasRole(false);
      }
      setLoading(false);
    };
    checkAuth();
  }, [requiredRole]);

  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/" replace />;
  if (requiredRole && !hasRole) return <Navigate to="/not-authorized" replace />;
  return <>{children}</>;
};

export default ProtectedRoute; 
