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
  { name: "Weekly Quiz", href: "/weekly-quiz", icon: Award },
  { name: "My Live Quizzes", href: "/dashboard/quizzes", icon: List },
  { name: "Competitions", href: "/competitions", icon: Award },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  // { name: "Recent Attempts", href: "/dashboard/recent-attempts", icon: User }, // Hidden
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
    <div className="min-h-screen bg-white">
      {/* Top Bar: Logo/name left, welcome right */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 w-full h-16 flex items-center px-6 md:px-8 lg:px-12 justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
              <Brain className="w-3 h-3 text-white" strokeWidth={1} />
            </div>
            <span className="text-lg font-urbanist font-semibold text-gray-900">Bible Quiz Competition</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden ml-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" strokeWidth={1} /> : <Menu className="w-5 h-5" strokeWidth={1} />}
          </Button>
        </div>
        <div className="flex-1 text-right text-gray-700 text-sm font-urbanist font-light">
          Welcome back, <span className="font-medium">{userName}</span>
          {userPlan === "pro" && (
            <Badge className="ml-2 bg-black text-white font-urbanist font-light">Pro</Badge>
          )}
          {userPlan === "free" && (
            <Badge className="ml-2 bg-gray-200 text-gray-700 font-urbanist font-light">Free</Badge>
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
          w-64 h-screen bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out
        `}>
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => (
              // Hide the Competitions tab from the sidebar
              item.name === "Competitions" ? null : (
                <Button
                  key={item.name}
                  variant={location.pathname === item.href ? "default" : "ghost"}
                  className={`w-full justify-start h-10 font-urbanist font-light ${location.pathname === item.href ? "bg-black text-white hover:bg-gray-800" : "text-gray-700 hover:bg-gray-50"}`}
                  onClick={() => {
                    navigate(item.href);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <item.icon className="w-4 h-4 mr-3" strokeWidth={1} />
                  {item.name}
                </Button>
              )
            ))}
            {/* Hide Upgrade tab unless showUpgrade is true */}
            {showUpgrade && userPlan === "free" && (
              <Button
                key="Upgrade"
                variant={location.pathname === "/dashboard/upgrade" ? "default" : "ghost"}
                className={`w-full justify-start h-10 font-urbanist font-light ${location.pathname === "/dashboard/upgrade" ? "bg-black text-white hover:bg-gray-800" : "text-gray-700 hover:bg-gray-50"}`}
                onClick={() => {
                  navigate("/dashboard/upgrade");
                  setIsMobileMenuOpen(false);
                }}
              >
                <Star className="w-4 h-4 mr-3" strokeWidth={1} />
                Upgrade
              </Button>
            )}
            <div className="pt-4 mt-4 border-t border-gray-200">
              <Button
                variant="ghost"
                className="w-full justify-start h-10 text-gray-700 hover:bg-gray-50 font-urbanist font-light"
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
              >
                <LogOut className="w-4 h-4 mr-3" strokeWidth={1} />
                Logout
              </Button>
            </div>
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 w-full overflow-x-auto bg-white">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 