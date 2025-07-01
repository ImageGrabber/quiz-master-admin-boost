import { ReactNode, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, LayoutDashboard, Trophy, User, Settings, LogOut, List, Menu, X, Award, Shield } from "lucide-react";
import Header from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";

interface DashboardLayoutProps {
  children: ReactNode;
}

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Quizzes", href: "/dashboard/quizzes", icon: List },
  { name: "Competitions", href: "/competitions", icon: Award },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchUserName() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, role')
          .eq('id', user.id)
          .single();
        setUserName(profile?.full_name || "User");
        setUserRole(profile?.role || "");
      }
    }
    fetchUserName();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Top Bar: Logo/name left, welcome right */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30 w-full h-16 flex items-center px-6 justify-between">
        <div className="flex items-center space-x-2">
          <img src="/sword.png" alt="BibleBattles Logo" className="w-7 h-7 mr-2 inline-block align-middle" />
          <span className="text-lg font-semibold text-gray-900 align-middle">BibleBattles</span>
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden ml-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
        <div className="flex-1 text-right text-gray-700 text-sm font-medium">
          Welcome back, {userName}
        </div>
      </header>
      <div className="flex w-full min-h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
        {/* Sidebar: hidden on mobile unless toggled, flex column on desktop */}
        <aside className={`
          ${isMobileMenuOpen ? 'fixed inset-y-0 left-0 z-50 flex' : 'hidden'}
          md:static md:flex md:flex-col
          w-64 h-full md:h-screen bg-white border-r border-gray-200 shadow-lg transition-transform duration-300 ease-in-out
        `}>
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant={location.pathname === item.href ? "default" : "ghost"}
                className={`w-full justify-start h-10 ${location.pathname === item.href ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}
                onClick={() => {
                  navigate(item.href);
                  setIsMobileMenuOpen(false);
                }}
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.name}
              </Button>
            ))}
            {/* Admin-only: RLS Policy Tester */}
            {userRole === "admin" && (
              <Button
                key="RLS Policy Tester"
                variant={location.pathname === "/rls-test" ? "default" : "ghost"}
                className={`w-full justify-start h-10 ${location.pathname === "/rls-test" ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}
                onClick={() => {
                  navigate("/rls-test");
                  setIsMobileMenuOpen(false);
                }}
              >
                <Shield className="w-4 h-4 mr-3" />
                RLS Policy Tester
              </Button>
            )}
            <div className="pt-4 mt-4 border-t border-gray-200">
              <Button
                variant="ghost"
                className="w-full justify-start h-10 text-red-600 hover:bg-red-50"
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
              >
                <LogOut className="w-4 h-4 mr-3" />
                Logout
              </Button>
            </div>
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-6 w-full overflow-x-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 