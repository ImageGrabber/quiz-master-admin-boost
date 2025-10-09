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
      
      // Mock data with 150 globally diverse names from all continents
      const mockNames = [
        // North America (USA, Canada)
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
        // Canadian names
        "Jean-Pierre Dubois", "Marie-Claire Tremblay", "Ahmed Hassan", "Fatima Al-Zahra", "James Wilson",
        "Jennifer Brown", "Michael Brown", "David Lee", "Sarah Thompson", "Robert MacLeod",
        // UK & Ireland
        "Oliver Thompson", "Charlotte Williams", "Harry Smith", "Amelia Jones", "George Brown",
        "Isabella Taylor", "William Davies", "Sophie Wilson", "James Murphy", "Emily O'Connor",
        "Jack Kelly", "Grace O'Brien", "Liam Murphy", "Emma Walsh", "Noah O'Sullivan",
        // European names
        "Elena Petrov", "Dmitri Volkov", "Anna Schmidt", "Klaus Mueller", "Ingrid Bergman",
        "Alessandro Rossi", "Giulia Bianchi", "Marco Ferrari", "Sofia Romano", "Luca Conti",
        "Pierre Dubois", "Marie Martin", "Hans Weber", "Greta Mueller", "Lars Andersen",
        "Olga Kowalski", "Pavel Novak", "Zofia Nowak", "Jan Kowalski", "Anna Kowalski",
        "François Leroy", "Camille Rousseau", "Lars Johansson", "Astrid Lindgren", "Björn Eriksson",
        // African names
        "Kwame Asante", "Aisha Okafor", "Tendai Moyo", "Fatou Diallo", "Kofi Mensah",
        "Zara Nkomo", "Amara Okonkwo", "Tunde Adebayo", "Nia Mbeki", "Jabari Kone",
        "Zahara Mwangi", "Kwaku Boateng", "Adunni Adebayo", "Tariq Hassan", "Nomsa Dlamini",
        // Middle Eastern names
        "Ahmed Al-Rashid", "Fatima Hassan", "Omar Khalil", "Layla Ibrahim", "Hassan Ali",
        "Yasmin Al-Zahra", "Tariq Al-Mahmoud", "Nour Al-Din", "Rania Khalil", "Karim Al-Hassan",
        // Asian names (East & Southeast Asia)
        "Wei Zhang", "Yuki Tanaka", "Mei Lin", "Hiroshi Sato", "Chen Wei",
        "Takeshi Yamamoto", "Li Wei", "Kenji Nakamura", "Zhang Ming", "Sakura Suzuki",
        "Hiroko Kimura", "Taro Watanabe", "Yuki Nakamura", "Tomohiro Sato", "Yusuke Tanaka",
        "Hye-jin Kim", "Min-jun Park", "So-young Lee", "Jae-ho Choi", "Eun-ji Kim",
        "Mei Chen", "Wei Liu", "Li Wang", "Ming Zhang", "Jing Li",
        // Indian subcontinent
        "Priya Sharma", "Raj Patel", "Arjun Singh", "Vikram Kumar", "Ananya Reddy",
        "Deepika Singh", "Kavya Nair", "Priyanka Sharma", "Anjali Gupta", "Sunita Patel",
        "Rahul Verma", "Kiran Desai", "Lakshmi Iyer", "Rajesh Kumar", "Maya Patel",
        "Aarav Patel", "Kavya Sharma", "Rohan Singh", "Priya Gupta", "Arjun Kumar",
        "Sneha Reddy", "Vikram Iyer", "Ananya Nair", "Rahul Verma", "Deepika Joshi",
        // Hispanic/Latin American names
        "Carlos Rodriguez", "Isabella Lopez", "Diego Martinez", "Carmen Garcia", "Jose Silva",
        "Sofia Martinez", "Maria Garcia", "Alejandro Ruiz", "Valentina Herrera", "Sebastian Torres",
        "Camila Vargas", "Andres Morales", "Lucia Fernandez", "Gabriel Ramos", "Isabella Cruz",
        // Australian/New Zealand names
        "Jack Thompson", "Charlotte Smith", "Oliver Brown", "Amelia Wilson", "William Jones",
        "Sophie Taylor", "Harry Davies", "Grace Murphy", "Liam Kelly", "Emma O'Connor",
        "Noah Walsh", "Isabella O'Sullivan", "James Murphy", "Charlotte Kelly", "Oliver Walsh"
      ];

      // Realistic daily rotation: Mix of previous day's names + new names
      // Use Toronto timezone (UTC-5 in winter, UTC-4 in summer)
      const now = new Date();
      const torontoTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Toronto"}));
      const dayOfYear = Math.floor((torontoTime.getTime() - new Date(torontoTime.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
      
      // Create a more realistic rotation that keeps some names from previous days
      const baseOffset = Math.floor(dayOfYear / 3) * 30; // Change base every 3 days
      const dailyOffset = dayOfYear % 20; // Small daily variation
      
      // Select 50 names with overlap from previous days
      const selectedNames = [];
      
      // Keep 20 names from previous day (top performers usually stay)
      const previousDayStart = (dayOfYear - 1) % mockNames.length;
      const previousDayNames = mockNames.slice(previousDayStart, previousDayStart + 20);
      selectedNames.push(...previousDayNames);
      
      // Add 15 names from a few days ago (some consistency)
      const fewDaysAgoStart = (dayOfYear - 3) % mockNames.length;
      const fewDaysAgoNames = mockNames.slice(fewDaysAgoStart, fewDaysAgoStart + 15);
      selectedNames.push(...fewDaysAgoNames);
      
      // Add 15 completely new names for freshness
      const newNamesStart = (baseOffset + dailyOffset) % mockNames.length;
      const newNames = mockNames.slice(newNamesStart, newNamesStart + 15);
      selectedNames.push(...newNames);
      
      // Ensure we have exactly 50 unique names
      const uniqueNames = [...new Set(selectedNames)].slice(0, 50);
      const finalNames = uniqueNames.length === 50 ? uniqueNames : [
        ...uniqueNames,
        ...mockNames.filter(name => !uniqueNames.includes(name)).slice(0, 50 - uniqueNames.length)
      ];

      // Create mock leaderboard data with realistic daily rotation
      const leaderboardData = finalNames.map((name, index) => ({
        id: `mock-${index + 1}`,
        name: name,
        rank: index + 1
      }));

      console.log('Mock leaderboard data with daily rotation:', leaderboardData);
      setLeaderboard(leaderboardData);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setLeaderboard([]);
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