import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain, Trophy, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        setRole(profile?.role || null);
      } else {
        setRole(null);
      }
    }
    fetchUser();
  }, []);

  // Determine which buttons to show
  const isDashboard = location.pathname.startsWith("/dashboard");
  const isAdmin = location.pathname.startsWith("/admin");
  const isAuth = location.pathname.startsWith("/auth");
  const isHome = location.pathname === "/";

  const showLogout = !!user && (isDashboard || isAdmin);
  const showSignIn = !user && (isHome || isAuth);
  const showSignUp = !user && (isHome || isAuth);
  const showLeaderboard = true;
  const showHome = !isHome;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
    navigate("/");
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30 w-full">
      <div className="max-w-6xl mx-auto px-2 flex justify-between items-center py-4">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}> 
          <Brain className="w-7 h-7 text-black" />
          <span className="text-lg font-semibold text-gray-900">QuizMaster</span>
        </div>
        <div className="flex items-center space-x-2">
          {showHome && (
            <Button variant="ghost" onClick={() => navigate("/")}>Home</Button>
          )}
          {showLeaderboard && (
            <Button variant="ghost" onClick={() => navigate("/leaderboard")}> <Trophy className="w-4 h-4 mr-1 inline" /> Leaderboard </Button>
          )}
          {showSignUp && (
            <Button variant="ghost" onClick={() => navigate("/auth/register")}>Sign Up</Button>
          )}
          {showSignIn && (
            <Button onClick={() => navigate("/auth/login")}>Sign In</Button>
          )}
          {showLogout && (
            <Button variant="outline" onClick={handleLogout} className="flex items-center space-x-2">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 