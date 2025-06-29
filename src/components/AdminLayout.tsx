import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  LayoutDashboard, 
  FileText, 
  Upload, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  Home,
  HelpCircle,
  Activity
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      current: location.pathname === "/admin"
    },
    {
      name: "Quiz Attempts",
      href: "/admin/attempts",
      icon: FileText,
      current: location.pathname === "/admin/attempts"
    },
    {
      name: "Recent Activity",
      href: "/admin/activity",
      icon: Activity,
      current: location.pathname === "/admin/activity"
    },
    {
      name: "Manage Quizzes",
      href: "/admin/quizzes",
      icon: Users,
      current: location.pathname === "/admin/quizzes"
    },
    {
      name: "Questions",
      href: "/admin/questions",
      icon: HelpCircle,
      current: location.pathname === "/admin/questions"
    },
    {
      name: "Upload Questions",
      href: "/admin/upload",
      icon: Upload,
      current: location.pathname === "/admin/upload"
    }
  ];

  const handleNavigation = (href: string) => {
    navigate(href);
    setSidebarOpen(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar: Logo/name left, welcome right */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30 w-full h-16 flex items-center px-6 justify-between">
        <div className="flex items-center space-x-2">
          <Brain className="w-6 h-6 text-blue-600" />
          <span className="text-lg font-semibold text-gray-900">QuizMaster</span>
          <Badge className="bg-blue-100 text-blue-700 text-xs">Admin</Badge>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden ml-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">Welcome back, Admin</div>
        </div>
      </header>
      <div className="flex w-full min-h-[calc(100vh-4rem)]">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        {/* Sidebar: hidden on mobile unless toggled, flex column on desktop */}
        <aside className={`
          ${sidebarOpen ? 'fixed inset-y-0 left-0 z-50 flex' : 'hidden'}
          lg:static lg:flex
          flex-col
          w-64 h-full lg:h-screen bg-white border-r border-gray-200 shadow-lg transition-transform duration-300 ease-in-out
        `}>
          {/* Sidebar Header */}
          <div className="flex items-center justify-between px-6 border-b border-gray-200 h-16 lg:hidden">
            <div className="flex items-center space-x-2">
              <Brain className="w-6 h-6 text-blue-600" />
              <span className="text-lg font-semibold text-gray-900">QuizMaster</span>
              <Badge className="bg-blue-100 text-blue-700 text-xs">Admin</Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant={item.current ? "default" : "ghost"}
                className={`w-full justify-start h-10 ${item.current ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}
                onClick={() => handleNavigation(item.href)}
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.name}
              </Button>
            ))}
            <div className="pt-4 mt-4 border-t border-gray-200">
              <Button
                variant="ghost"
                className="w-full justify-start h-10 text-gray-700 hover:bg-gray-100"
                onClick={() => navigate("/")}
              >
                <Home className="w-4 h-4 mr-3" />
                Public Site
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start h-10 text-gray-700 hover:bg-gray-100"
              >
                <Settings className="w-4 h-4 mr-3" />
                Settings
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start h-10 text-red-600 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-3" />
                Sign Out
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

export default AdminLayout;
