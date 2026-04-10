
import { ReactNode, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  BookOpen,
  Award,
  BarChart2,
  Settings,
  Search,
  Bell,
  MessageSquare,
  LogOut,
  Menu,
  Brain,
  Home,
  Users,
  UserPlus,
  User,
  Music,
  Sparkles,
  Gamepad2,
  Heart
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  hideHeader?: boolean;
}

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "All Quizzes", href: "/quiz-selection", icon: BookOpen },
  { name: "Bible Study", href: "/bible-questions-and-answers-hub", icon: Brain },
  { name: "Kids Stories", href: "/kids-stories", icon: Sparkles },
  { name: "Worship Songs", href: "/songs", icon: Music },
  { name: "Prayer Group", href: "/prayer-requests", icon: Heart },
  { name: "Multiplayer", href: "/scripture-match-multiplayer", icon: Gamepad2 },
  { name: "Results", href: "/leaderboard", icon: BarChart2 },
];

const DashboardLayout = ({ children, title, subtitle, hideHeader = false }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState<string>("User");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userAvatar, setUserAvatar] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || "");
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, avatar_url')
          .eq('id', user.id)
          .single();
        if (profile) {
          if (profile.full_name) setUserName(profile.full_name);
          if (profile.avatar_url) setUserAvatar(profile.avatar_url);
        }

        // Subscribe to profile changes
        const channel = supabase
          .channel('schema-db-changes')
          .on(
            'postgres_changes',
            {
              event: 'UPDATE',
              schema: 'public',
              table: 'profiles',
              filter: `id=eq.${user.id}`
            },
            (payload) => {
              const newProfile = payload.new as any;
              if (newProfile.full_name) setUserName(newProfile.full_name);
              if (newProfile.avatar_url) setUserAvatar(newProfile.avatar_url);
            }
          )
          .subscribe();

        return () => {
          supabase.removeChannel(channel);
        };
      }
    }
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="h-screen bg-[#f3f5f9] font-sans flex text-slate-800 overflow-hidden">

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#f3f5f9] transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        md:relative flex flex-col h-full
      `}>
        {/* Logo Area */}
        <div className="h-20 flex-shrink-0 flex items-center px-8">
          {/* Same Logo content */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <div className="bg-blue-600 rounded-lg p-1.5">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">Bible Quiz</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-4 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            // Logic to determine active state:
            // 1. Exact match
            // 2. Sub-path match (but strictly for directories, not partial words)
            // 3. Prioritize longest match
            const sortedMatches = navItems
              .filter(nav =>
                location.pathname === nav.href ||
                location.pathname.startsWith(nav.href + '/')
              )
              .sort((a, b) => b.href.length - a.href.length);

            const activeItem = sortedMatches[0];
            const isActive = activeItem?.name === item.name;

            return (
              <Button
                key={item.name}
                variant="ghost"
                className={`w-full justify-start h-12 px-6 rounded-xl text-base font-medium transition-all duration-200
                  ${isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:text-white"
                    : "text-slate-500 hover:bg-white hover:text-slate-900"
                  }
                `}
                onClick={() => {
                  navigate(item.href);
                  setIsMobileMenuOpen(false);
                }}
              >
                <item.icon className={`w-5 h-5 mr-4 ${isActive ? "text-white" : "text-slate-400"}`} strokeWidth={2} />
                {item.name}
              </Button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 mt-auto flex-shrink-0">
          <Button
            variant="ghost"
            className="w-full justify-start h-12 px-6 rounded-xl text-slate-500 hover:bg-white hover:text-slate-900 font-medium"
            onClick={() => navigate("/dashboard/settings")}
          >
            <Settings className="w-5 h-5 mr-4 text-slate-400" strokeWidth={2} />
            Settings
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start h-12 px-6 rounded-xl text-slate-500 hover:bg-white hover:text-red-600 font-medium mt-2"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-4 text-slate-400 hover:text-red-500" strokeWidth={2} />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full bg-white md:rounded-l-[3rem] shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.05)] overflow-hidden relative z-10">

        {/* Topbar */}
        <header className="h-20 flex items-center justify-between px-8 border-b border-slate-50/50 bg-white/80 backdrop-blur-sm sticky top-0 z-30">


          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu className="w-6 h-6" />
            </Button>

            {title && (
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-slate-900 leading-tight">{title}</h1>
                {subtitle && <p className="text-xs text-slate-500 leading-tight hidden sm:block">{subtitle}</p>}
              </div>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6 ml-auto">
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-slate-900 leading-none mb-1">{userName}</p>
                <p className="text-xs text-slate-500 leading-none">{userEmail}</p>
              </div>
              <Avatar className="w-10 h-10 border-2 border-white shadow-sm cursor-pointer">
                <AvatarImage src={userAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} />
                <AvatarFallback className="bg-blue-100 text-blue-700 font-bold">
                  {userName.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-white via-indigo-50/10 to-blue-50/10 p-8">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;