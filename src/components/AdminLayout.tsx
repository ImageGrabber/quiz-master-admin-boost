import { ReactNode, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Brain,
  LayoutDashboard,
  FileText,
  Upload,
  Users,
  Settings,
  LogOut,
  Menu,
  Home,
  Calendar,
  HelpCircle,
  Activity,
  Trophy,
  Shield,
  Bell,
  Heart,
  BookOpen
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState<string>("Admin");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userAvatar, setUserAvatar] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Users & Email",
      href: "/admin/users",
      icon: Users,
    },
    {
      name: "Quiz Attempts",
      href: "/admin/attempts",
      icon: FileText,
    },
    {
      name: "Recent Activity",
      href: "/admin/activity",
      icon: Activity,
    },
    {
      name: "Prayer Requests",
      href: "/admin/prayer-requests",
      icon: Heart,
    },
    {
      name: "Competitions",
      href: "/admin/competitions",
      icon: Trophy,
    },
    {
      name: "Manage Quizzes",
      href: "/admin/quizzes",
      icon: Brain,
    },
    {
      name: "Questions",
      href: "/admin/questions",
      icon: HelpCircle,
    },
    {
      name: "Upload Questions",
      href: "/admin/upload",
      icon: Upload,
    },
    {
      name: "Weekly Quiz Attendance",
      href: "/admin/weekly-attendance",
      icon: Calendar,
    },
    {
      name: "Daily Verses",
      href: "/admin/daily-verses",
      icon: BookOpen,
    },
    {
      name: "Notifications",
      href: "/admin/notifications",
      icon: Bell,
    },
    {
      name: "Realtime Health Check",
      href: "/live-quiz/health-check",
      icon: Activity,
    },
    {
      name: "RLS Policy Tester",
      href: "/rls-test",
      icon: Shield,
    }
  ];

  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel> | null = null;

    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setUserEmail(user.email || "");
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, avatar_url")
        .eq("id", user.id)
        .single();

      if (profile?.full_name) setUserName(profile.full_name);
      if (profile?.avatar_url) setUserAvatar(profile.avatar_url);

      channel = supabase
        .channel("admin-profile-updates")
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "profiles",
            filter: `id=eq.${user.id}`,
          },
          (payload) => {
            const updated = payload.new as { full_name?: string; avatar_url?: string };
            if (updated.full_name) setUserName(updated.full_name);
            if (updated.avatar_url) setUserAvatar(updated.avatar_url);
          }
        )
        .subscribe();
    };

    fetchUserData();
    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const sortedMatches = navigation
    .filter((item) => location.pathname === item.href || location.pathname.startsWith(item.href + "/"))
    .sort((a, b) => b.href.length - a.href.length);
  const activeItemName = sortedMatches[0]?.name;

  return (
    <div className="h-screen bg-[#f3f5f9] font-sans flex text-slate-800 overflow-hidden">
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-[#f3f5f9] transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          md:relative flex flex-col h-full
        `}
      >
        <div className="h-20 flex-shrink-0 flex items-center px-8">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <div className="bg-blue-600 rounded-lg p-1.5">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">Admin</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-4 overflow-y-auto custom-scrollbar">
          {navigation.map((item) => {
            const isActive = activeItemName === item.name;
            return (
              <Button
                key={item.name}
                variant="ghost"
                className={`w-full justify-start h-12 px-6 rounded-xl text-base font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:text-white"
                      : "text-slate-500 hover:bg-white hover:text-slate-900"
                  }`}
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

        <div className="p-4 mt-auto flex-shrink-0">
          <Button
            variant="ghost"
            className="w-full justify-start h-12 px-6 rounded-xl text-slate-500 hover:bg-white hover:text-slate-900 font-medium"
            onClick={() => navigate("/")}
          >
            <Home className="w-5 h-5 mr-4 text-slate-400" strokeWidth={2} />
            Public Site
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start h-12 px-6 rounded-xl text-slate-500 hover:bg-white hover:text-slate-900 font-medium mt-2"
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

      <div className="flex-1 flex flex-col h-full bg-white md:rounded-l-[3rem] shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.05)] overflow-hidden relative z-10">
        <header className="h-20 flex items-center justify-between px-8 border-b border-slate-50/50 bg-white/80 backdrop-blur-sm sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu className="w-6 h-6" />
            </Button>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-slate-900 leading-tight">Admin Dashboard</h1>
              <p className="text-xs text-slate-500 leading-tight hidden sm:block">Manage quizzes, users, and platform operations</p>
            </div>
          </div>

          <div className="flex items-center gap-6 ml-auto">
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
        </header>

        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-white via-indigo-50/10 to-blue-50/10 p-8">
          {children}
        </main>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
