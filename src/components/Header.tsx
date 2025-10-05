import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain, Trophy, LogOut, Menu } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
  const showHome = !isHome;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
    navigate("/");
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30 w-full">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
          <img src="/sword.png" alt="Bible Quiz Competition Logo" className="w-7 h-7 mr-2 inline-block align-middle" />
          <span className="text-lg font-semibold text-gray-900 align-middle">Bible Quiz Competition</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {showHome && (
            <button 
              className="text-black font-semibold px-4 py-2 bg-transparent border-none shadow-none hover:underline" 
              onClick={() => navigate("/")}
            >
              Home
            </button>
          )}
          <button 
            className="text-black font-semibold px-4 py-2 bg-transparent border-none shadow-none hover:underline" 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis")}
          >
            Bible Q&A Hub
          </button>
          <button 
            className="text-black font-semibold px-4 py-2 bg-transparent border-none shadow-none hover:underline" 
            onClick={() => navigate("/articles")}
          >
            Articles
          </button>
          {showSignIn && (
            <button 
              className="text-black font-semibold px-4 py-2 bg-transparent border-none shadow-none hover:underline" 
              onClick={() => navigate("/auth/login")}
            >
              Sign In
            </button>
          )}
          {showSignUp && (
            <Button 
              variant="ghost" 
              className="bg-black text-white font-semibold px-4 py-2 rounded" 
              onClick={() => navigate("/auth/register")}
            >
              Sign Up
            </Button>
          )}
          {showLogout && (
            <Button 
              variant="outline" 
              onClick={handleLogout} 
              className="flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Open navigation menu"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <Menu className="w-7 h-7 text-gray-900" />
        </button>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full right-4 mt-2 w-48 bg-white rounded-lg shadow-lg border border-blue-100 z-50 flex flex-col items-stretch">
            {showHome && (
              <button 
                className="text-black font-semibold px-4 py-3 text-left hover:bg-blue-50 rounded-t-lg" 
                onClick={() => { setMobileMenuOpen(false); navigate("/"); }}
              >
                Home
              </button>
            )}
            <button 
              className="text-black font-semibold px-4 py-3 text-left hover:bg-blue-50" 
              onClick={() => { setMobileMenuOpen(false); navigate("/bible-questions-and-answers-hub/genesis"); }}
            >
              Bible Q&A Hub
            </button>
            <button 
              className="text-black font-semibold px-4 py-3 text-left hover:bg-blue-50" 
              onClick={() => { setMobileMenuOpen(false); navigate("/articles"); }}
            >
              Articles
            </button>
            {showSignIn && (
              <button 
                className="text-black font-semibold px-4 py-3 text-left hover:bg-blue-50" 
                onClick={() => { setMobileMenuOpen(false); navigate("/auth/login"); }}
              >
                Sign In
              </button>
            )}
            {showSignUp && (
              <button 
                className="bg-black text-white font-semibold px-4 py-3 text-left hover:bg-gray-900 rounded-b-lg" 
                onClick={() => { setMobileMenuOpen(false); navigate("/auth/register"); }}
              >
                Sign Up
              </button>
            )}
            {showLogout && (
              <button 
                className="text-black font-semibold px-4 py-3 text-left hover:bg-blue-50 rounded-b-lg" 
                onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;