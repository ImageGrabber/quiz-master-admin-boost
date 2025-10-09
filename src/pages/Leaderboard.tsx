import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Crown, Brain, Play } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import AdminLayout from "@/components/AdminLayout";

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
      
      // Use day-based seed for consistent daily rotation
      const seed = dayOfYear;
      const shuffledData = leaderboardData.sort((a, b) => {
        // Create pseudo-random but consistent ordering based on day
        const hashA = (a.id + seed).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const hashB = (b.id + seed).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return hashA - hashB;
      });
      
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
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Trophy className="w-8 h-8 text-white" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Leaderboard</h1>
        <p className="text-lg text-gray-600 mb-2">See how you rank against other quiz masters</p>
        <p className="text-sm text-blue-700 mb-8">Note: This leaderboard shows performance in weekly quizzes and is not related to competitions.</p>
        
        {/* Period Filter */}
        <div className="flex justify-center space-x-4 mb-8">
          <Button
            variant={selectedPeriod === "week" ? "default" : "outline"}
            onClick={() => setSelectedPeriod("week")}
            className={selectedPeriod === "week" ? "bg-gradient-to-r from-blue-600 to-purple-600" : ""}
          >
            This Week
          </Button>
          <Button
            variant={selectedPeriod === "month" ? "default" : "outline"}
            onClick={() => setSelectedPeriod("month")}
            className={selectedPeriod === "month" ? "bg-gradient-to-r from-blue-600 to-purple-600" : ""}
          >
            This Month
          </Button>
          <Button
            variant={selectedPeriod === "all" ? "default" : "outline"}
            onClick={() => setSelectedPeriod("all")}
            className={selectedPeriod === "all" ? "bg-gradient-to-r from-blue-600 to-purple-600" : ""}
          >
            All Time
          </Button>
        </div>
      </div>

      {/* Leaderboard Table */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">Top Performers</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <Trophy className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-pulse" />
              <p className="text-gray-600">Loading leaderboard...</p>
            </div>
          ) : leaderboard.length > 0 ? (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {leaderboard.map((entry, index) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm">
                      {getRankIcon(entry.rank)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{entry.name}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge className={getRankBadgeColor(entry.rank)}>
                      #{entry.rank}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No leaderboard data available</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Action */}
      {userRole === 'user' && (
        <div className="text-center">
          <Button
            onClick={() => navigate("/quiz-selection")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            <Play className="w-4 h-4 mr-2" />
            Take Quiz & Compete
          </Button>
        </div>
      )}
    </div>
  );

  // Use appropriate layout based on user role
  if (userRole === 'admin') {
    return <AdminLayout><LeaderboardContent /></AdminLayout>;
  } else {
    return <DashboardLayout><LeaderboardContent /></DashboardLayout>;
  }
};

export default Leaderboard;