import { ReactNode, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, LayoutDashboard, Trophy, User, Settings, LogOut, List, Menu, X, Award, Shield, BookOpen, Star, HelpCircle, Play } from "lucide-react";
import Header from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

interface DashboardLayoutProps {
  children: ReactNode;
}

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Take a Quiz", href: "/quiz-selection", icon: Play },
  { name: "My Quizzes", href: "/dashboard/quizzes", icon: List },
  { name: "Competitions", href: "/competitions", icon: Award },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { name: "Recent Attempts", href: "/dashboard/recent-attempts", icon: User },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Help", href: "/help", icon: HelpCircle },
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState<string>("");
  const [userPlan, setUserPlan] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const showUpgrade = false; // Set to true to show the Upgrade tab in the sidebar

  useEffect(() => {
    async function fetchUserName() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, plan')
          .eq('id', user.id)
          .single();
        console.log('Fetched profile:', profile);
        setUserName(profile && 'full_name' in profile ? String(profile.full_name) : "User");
        setUserPlan(profile && 'plan' in profile ? String(profile.plan) : "");
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
          <span className="text-lg font-semibold text-gray-900 align-middle">Bible Quiz Competition</span>
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
          {userPlan === "pro" && (
            <Badge className="ml-2 bg-purple-600 text-white">Pro</Badge>
          )}
          {userPlan === "free" && (
            <Badge className="ml-2 bg-green-600 text-white">Free</Badge>
          )}
        </div>
      </header>
      <div className="flex w-full h-screen">
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
          w-64 h-screen bg-white border-r border-gray-200 shadow-lg transition-transform duration-300 ease-in-out
        `}>
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => (
              // Hide the Competitions tab from the sidebar
              item.name === "Competitions" ? null : (
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
              )
            ))}
            {/* Hide Upgrade tab unless showUpgrade is true */}
            {showUpgrade && userPlan === "free" && (
              <Button
                key="Upgrade"
                variant={location.pathname === "/dashboard/upgrade" ? "default" : "ghost"}
                className={`w-full justify-start h-10 ${location.pathname === "/dashboard/upgrade" ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}
                onClick={() => {
                  navigate("/dashboard/upgrade");
                  setIsMobileMenuOpen(false);
                }}
              >
                <Star className="w-4 h-4 mr-3 text-yellow-500" />
                Upgrade
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