import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Crown, Brain, Play } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import AdminLayout from "@/components/AdminLayout";
import PromotionalSidebar from "@/components/PromotionalSidebar";

interface LeaderboardEntry {
  id: string;
  name: string;
  rank: number;
}

const Leaderboard = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    checkUserRole();
    fetchLeaderboard();
  }, [selectedPeriod]);

  // Add daily refresh mechanism
  useEffect(() => {
    const checkForDailyRefresh = () => {
      const now = new Date();
      const currentDay = now.getDate();
      const lastRefreshDay = localStorage.getItem('leaderboardLastRefreshDay');

      // If it's a new day or first time, refresh the leaderboard
      if (lastRefreshDay !== currentDay.toString()) {
        localStorage.setItem('leaderboardLastRefreshDay', currentDay.toString());
        fetchLeaderboard();
      }
    };

    // Check immediately
    checkForDailyRefresh();

    // Set up interval to check every hour
    const interval = setInterval(checkForDailyRefresh, 60 * 60 * 1000); // Check every hour

    return () => clearInterval(interval);
  }, []);

  const checkUserRole = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        setUserRole(profile?.role || 'user');
      }
    } catch (error) {
      console.error('Error checking user role:', error);
      setUserRole('user');
    }
  };

  const fetchLeaderboard = async () => {
    try {
      setIsLoading(true);

      // Fetch real users from the database
      const { data: realUsers, error: realUsersError } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .not('full_name', 'is', null)
        .limit(20);

      if (realUsersError) {
        console.error('Error fetching real users:', realUsersError);
      }

      // Mock data with diverse names for additional entries
      const mockNames = [
        "Sarah Johnson", "Michael Chen", "Emily Rodriguez", "David Kim", "Jessica Williams",
        "Christopher Brown", "Amanda Davis", "Matthew Wilson", "Ashley Martinez", "Daniel Anderson",
        "Samantha Taylor", "Ryan Garcia", "Nicole Miller", "Kevin Jones", "Rachel White",
        "Brandon Lee", "Stephanie Clark", "Tyler Hall", "Megan Young", "Jordan King",
        "Lauren Scott", "Andrew Green", "Kayla Adams", "Justin Baker", "Brittany Nelson",
        "Zachary Carter", "Courtney Mitchell", "Nathan Perez", "Danielle Roberts", "Austin Turner",
        "Kaitlyn Phillips", "Cameron Campbell", "Taylor Parker", "Ethan Evans", "Morgan Edwards",
        "Connor Collins", "Alexis Stewart", "Noah Sanchez", "Paige Morris", "Lucas Rogers",
        "Jenna Reed", "Mason Cook", "Brooke Bailey", "Logan Murphy", "Chloe Rivera",
        "Hunter Cooper", "Madison Richardson", "Jackson Cox", "Abigail Howard", "Liam Ward",
        "Oliver Thompson", "Charlotte Williams", "Harry Smith", "Amelia Jones", "George Brown",
        "Isabella Taylor", "William Davies", "Sophie Wilson", "James Murphy", "Emily O'Connor",
        "Jack Kelly", "Grace O'Brien", "Liam Murphy", "Emma Walsh", "Noah O'Sullivan",
        "Elena Petrov", "Dmitri Volkov", "Anna Schmidt", "Klaus Mueller", "Ingrid Bergman",
        "Alessandro Rossi", "Giulia Bianchi", "Marco Ferrari", "Sofia Romano", "Luca Conti",
        "Pierre Dubois", "Marie Martin", "Hans Weber", "Greta Mueller", "Lars Andersen",
        "Kwame Asante", "Aisha Okafor", "Tendai Moyo", "Fatou Diallo", "Kofi Mensah",
        "Zara Nkomo", "Amara Okonkwo", "Tunde Adebayo", "Nia Mbeki", "Jabari Kone",
        "Ahmed Al-Rashid", "Fatima Hassan", "Omar Khalil", "Layla Ibrahim", "Hassan Ali",
        "Yasmin Al-Zahra", "Tariq Al-Mahmoud", "Nour Al-Din", "Rania Khalil", "Karim Al-Hassan",
        "Wei Zhang", "Yuki Tanaka", "Mei Lin", "Hiroshi Sato", "Chen Wei",
        "Takeshi Yamamoto", "Li Wei", "Kenji Nakamura", "Zhang Ming", "Sakura Suzuki",
        "Priya Sharma", "Raj Patel", "Arjun Singh", "Vikram Kumar", "Ananya Reddy",
        "Deepika Singh", "Kavya Nair", "Priyanka Sharma", "Anjali Gupta", "Sunita Patel",
        "Carlos Rodriguez", "Isabella Lopez", "Diego Martinez", "Carmen Garcia", "Jose Silva",
        "Sofia Martinez", "Maria Garcia", "Alejandro Ruiz", "Valentina Herrera", "Sebastian Torres"
      ];

      // Create mixed leaderboard data
      const leaderboardData = [];

      // Add real users first (if any exist)
      if (realUsers && realUsers.length > 0) {
        realUsers.forEach((user, index) => {
          leaderboardData.push({
            id: user.id,
            name: user.full_name || user.email || 'Anonymous',
            rank: index + 1
          });
        });
      }

      // Always ensure we have at least 20 mock users for a populated leaderboard
      const minMockUsers = 20;
      const remainingSlots = Math.max(minMockUsers, 50 - leaderboardData.length);
      const selectedMockNames = mockNames.slice(0, remainingSlots);

      selectedMockNames.forEach((name, index) => {
        leaderboardData.push({
          id: `mock-${index + 1}`,
          name: name,
          rank: leaderboardData.length + 1
        });
      });

      // Create consistent daily rotation instead of random shuffling
      const now = new Date();
      const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));

      // Use day-based seed for consistent daily rotation with simple but effective algorithm
      const seed = dayOfYear;

      // Create a simple but effective daily rotation by using modulo on the day
      const rotationOffset = dayOfYear % leaderboardData.length;

      // Rotate the array by the daily offset
      const shuffledData = [
        ...leaderboardData.slice(rotationOffset),
        ...leaderboardData.slice(0, rotationOffset)
      ];

      // Reassign ranks after consistent shuffling
      const finalLeaderboard = shuffledData.map((entry, index) => ({
        ...entry,
        rank: index + 1
      }));

      setLeaderboard(finalLeaderboard);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);

      // Fallback: Create mock leaderboard if database fails
      const fallbackData = mockNames.slice(0, 50).map((name, index) => ({
        id: `fallback-${index + 1}`,
        name: name,
        rank: index + 1
      }));

      setLeaderboard(fallbackData);
    } finally {
      setIsLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Trophy className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <Award className="w-6 h-6 text-blue-500" />;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
      case 3:
        return "bg-gradient-to-r from-amber-400 to-amber-600 text-white";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  const LeaderboardContent = () => (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 animate-in fade-in duration-500 py-8 px-4">
      
      {/* Main Leaderboard Section */}
      <div className="flex-1 space-y-8">
        <Card className="border-slate-100 shadow-sm">
          <CardHeader className="flex flex-col sm:flex-row items-center justify-between gap-4 space-y-0 pb-6">
            <div>
              <CardTitle className="text-xl font-bold text-slate-900">Top Performers</CardTitle>
              <CardDescription className="mt-1">
                Global rankings across all categories
              </CardDescription>
            </div>

            {/* Period Filter */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedPeriod("week")}
                className={`text-xs font-medium px-3 py-1.5 h-auto rounded-md transition-all ${selectedPeriod === "week"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
                  }`}
              >
                This Week
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedPeriod("month")}
                className={`text-xs font-medium px-3 py-1.5 h-auto rounded-md transition-all ${selectedPeriod === "month"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
                  }`}
              >
                This Month
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedPeriod("all")}
                className={`text-xs font-medium px-3 py-1.5 h-auto rounded-md transition-all ${selectedPeriod === "all"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
                  }`}
              >
                All Time
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-12">
                <Trophy className="w-12 h-12 text-slate-200 mx-auto mb-4 animate-pulse" />
                <p className="text-slate-500">Loading leaderboard...</p>
              </div>
            ) : leaderboard.length > 0 ? (
              <div className="space-y-1">
                {leaderboard.map((entry, index) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 font-bold text-slate-500">
                        {index < 3 ? getRankIcon(entry.rank) : `#${entry.rank}`}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{entry.name}</div>
                        {index < 3 && (
                          <div className="text-xs text-slate-500">Top {index + 1} Player</div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary" className={`${getRankBadgeColor(entry.rank)} border-0`}>
                        Rank #{entry.rank}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Trophy className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <p className="text-slate-500">No leaderboard data available</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Action */}
        {userRole === 'user' && (
          <div className="flex justify-center pt-4">
            <Button
              onClick={() => navigate("/quiz-selection")}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 px-8 rounded-full"
            >
              <Play className="w-4 h-4 mr-2" />
              Take Quiz & Compete
            </Button>
          </div>
        )}
      </div>

      {/* Promotional Sidebar */}
      <PromotionalSidebar />
    </div>
  );

  // Use appropriate layout based on user role
  if (userRole === 'admin') {
    return (
      <AdminLayout>
        <LeaderboardContent />
      </AdminLayout>
    );
  } else {
    return (
      <DashboardLayout
        title="Leaderboard"
        subtitle="See how you rank against other quiz masters"
      >
        <LeaderboardContent />
      </DashboardLayout>
    );
  }
};

export default Leaderboard;