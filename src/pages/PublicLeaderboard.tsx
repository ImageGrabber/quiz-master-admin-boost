import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Crown, Star, Users, TrendingUp, Award, Calendar, Clock, Target, Bolt, Menu, Brain, Search, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface LeaderboardEntry {
  id: string;
  name: string;
  maxScore: number;
  totalScore: number;
  attempts: number;
  averageScore: number;
  lastAttempt: string;
}

interface CompetitionEntry {
  id: string;
  name: string;
  score: number;
  time_taken: number;
  rank: number;
  prize_amount?: number;
}

export default function PublicLeaderboard() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [globalLeaders, setGlobalLeaders] = useState<LeaderboardEntry[]>([]);
  const [weeklyLeaders, setWeeklyLeaders] = useState<LeaderboardEntry[]>([]);
  const [monthlyLeaders, setMonthlyLeaders] = useState<LeaderboardEntry[]>([]);
  const [competitionLeaders, setCompetitionLeaders] = useState<CompetitionEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('global');
  const [userBadgesMap, setUserBadgesMap] = useState<Record<string, any[]>>({});

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen && !(event.target as Element).closest('header')) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [mobileMenuOpen]);

  // Add daily refresh mechanism
  useEffect(() => {
    const checkForDailyRefresh = () => {
      const now = new Date();
      const currentDay = now.getDate();
      const lastRefreshDay = localStorage.getItem('publicLeaderboardLastRefreshDay');
      
      // If it's a new day or first time, refresh the leaderboard
      if (lastRefreshDay !== currentDay.toString()) {
        localStorage.setItem('publicLeaderboardLastRefreshDay', currentDay.toString());
        fetchLeaderboardData();
      }
    };

    // Check immediately
    checkForDailyRefresh();

    // Set up interval to check every hour
    const interval = setInterval(checkForDailyRefresh, 60 * 60 * 1000); // Check every hour

    return () => clearInterval(interval);
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch real users from the database (SAME as leaderboard pages)
      const { data: realUsers, error: realUsersError } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .not('full_name', 'is', null)
        .limit(20);

      if (realUsersError) {
        console.error('Error fetching real users:', realUsersError);
      }

      // Mock data with diverse names for additional entries (SAME as leaderboard pages)
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

      // Create mixed leaderboard data (SAME logic as leaderboard pages)
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

      // Create consistent daily rotation instead of random shuffling (SAME as leaderboard)
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

      // Set leaderboard data using the SAME logic as leaderboard pages
      setGlobalLeaders(finalLeaderboard.slice(0, 15));
      setWeeklyLeaders(finalLeaderboard.slice(0, 10));
      setMonthlyLeaders(finalLeaderboard.slice(0, 15));

      // Mock competition data using consistent data
      const mockCompetitionData = finalLeaderboard.slice(0, 10).map((user, index) => {
        // Create consistent time based on name hash
        const nameHash = user.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const consistentTime = ((nameHash + seed) % 300) + 60; // 1-6 minutes
        
        return {
          id: user.id,
          name: user.name,
          score: 95 - index * 2, // Simple score based on rank
          time_taken: consistentTime,
          rank: index + 1,
          prize_amount: index < 3 ? [100, 50, 25][index] : undefined
        };
      });
      setCompetitionLeaders(mockCompetitionData);

    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
    return <span className="text-sm font-semibold text-gray-600">#{rank}</span>;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const tabs = [
    { id: 'global', label: 'Global Leaderboard', icon: Trophy },
    { id: 'weekly', label: 'Weekly Top 10', icon: TrendingUp },
    { id: 'monthly', label: 'Monthly Champions', icon: Calendar },
    { id: 'competition', label: 'Latest Competition', icon: Award }
  ];

  const renderLeaderboardTable = (data: any[], showTime = false) => (
    <div className="space-y-3">
      {data.map((entry, index) => (
        <div key={entry.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-all">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 text-white font-urbanist font-semibold text-sm">
              {index + 1}
            </div>
            <div>
              <div className="font-urbanist font-medium text-gray-900">{entry.name}</div>
              <div className="flex gap-1 mt-1">
                {(userBadgesMap[entry.id] || []).map((b, i) => (
                  <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 text-xs font-urbanist font-light text-gray-700">
                    {b.icon === 'Bolt' && <Bolt className="w-3 h-3 text-gray-700 mr-1" strokeWidth={1} />}
                    {b.icon === 'Crown' && <Crown className="w-3 h-3 text-gray-700 mr-1" strokeWidth={1} />}
                    {b.icon === 'Star' && <Star className="w-3 h-3 text-gray-700 mr-1" strokeWidth={1} />}
                    {b.icon === 'Award' && <Award className="w-3 h-3 text-gray-700 mr-1" strokeWidth={1} />}
                    <span>{b.slug?.replace('-', ' ')}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {/* Show crown for top 3 with medal colors */}
            {index === 0 && <Crown className="w-6 h-6 text-yellow-500 mr-1" strokeWidth={1} />}
            {index === 1 && <Crown className="w-6 h-6 text-gray-400 mr-1" strokeWidth={1} />}
            {index === 2 && <Crown className="w-6 h-6 text-amber-700 mr-1" strokeWidth={1} />}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="relative flex items-center justify-between p-6 w-full px-6 md:px-8 lg:px-12">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
              <Brain className="w-3 h-3 text-white" />
            </div>
            <span className="text-lg font-urbanist font-semibold text-gray-900">Bible Quiz Competition</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <button onClick={() => navigate("/bible-questions-and-answers-hub")} className="text-gray-600 hover:text-gray-900 font-urbanist font-light">Bible Q&A</button>
            <button onClick={() => navigate("/articles")} className="text-gray-600 hover:text-gray-900 font-urbanist font-light">Articles</button>
            <button onClick={() => navigate("/help")} className="text-gray-600 hover:text-gray-900 font-urbanist font-light">Help</button>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Button 
            className="bg-black hover:bg-gray-800 font-urbanist font-light"
            onClick={() => navigate("/auth/register")}
          >
            Get Started
          </Button>
          <button className="md:hidden" onClick={() => setMobileMenuOpen((open) => !open)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-6 right-6 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 flex flex-col">
            <button className="text-gray-600 hover:text-gray-900 px-4 py-3 text-left font-urbanist font-light" onClick={() => { setMobileMenuOpen(false); navigate("/bible-questions-and-answers-hub"); }}>Bible Q&A Hub</button>
            <button className="text-gray-600 hover:text-gray-900 px-4 py-3 text-left font-urbanist font-light" onClick={() => { setMobileMenuOpen(false); navigate("/articles"); }}>Articles</button>
            <button className="text-gray-600 hover:text-gray-900 px-4 py-3 text-left font-urbanist font-light" onClick={() => { setMobileMenuOpen(false); navigate("/help"); }}>Help</button>
            <button className="text-gray-600 hover:text-gray-900 px-4 py-3 text-left font-urbanist font-light border-t border-gray-200" onClick={() => { setMobileMenuOpen(false); navigate("/auth/login"); }}>Sign In</button>
            <Button className="bg-black text-white px-4 py-3 mx-4 mb-4 font-urbanist font-light" onClick={() => { setMobileMenuOpen(false); navigate("/auth/register"); }}>Sign Up</Button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-16 pb-8 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-urbanist font-normal text-gray-900 mb-6 leading-tight">Bible Quiz Leaderboard</h1>
          <p className="text-xl font-urbanist font-light text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Compete with believers from around the world! See who's leading the pack in our Bible quiz competitions. Track your progress, challenge yourself, and climb the ranks.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 pt-4 pb-10">
        {/* Leaderboard Content */}
        <Card className="border border-gray-200 bg-white">
          <CardHeader className="py-8 px-6">
            <CardTitle className="flex items-center space-x-2 font-urbanist font-semibold text-gray-900">
              <Trophy className="w-6 h-6 text-gray-700" strokeWidth={1} />
              <span>Leaderboard</span>
            </CardTitle>
            <CardDescription className="font-urbanist font-light text-gray-600">
              All-time highest scores from our Bible quiz community
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <span className="ml-3 font-urbanist font-light text-gray-600">Loading leaderboard...</span>
              </div>
            ) : (
              <div>
                {renderLeaderboardTable(globalLeaders)}
                
                {globalLeaders.length === 0 && (
                  <div className="text-center py-12 text-gray-600">
                    <Trophy className="w-12 h-12 mx-auto mb-4 text-gray-400" strokeWidth={1} />
                    <p className="font-urbanist font-light">No leaderboard data available yet.</p>
                    <p className="text-sm font-urbanist font-light">Be the first to take a quiz and claim the top spot!</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <Card className="border border-gray-200 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-gray-700" strokeWidth={1} />
                <div>
                  <div className="text-2xl font-urbanist font-semibold text-gray-900">1,936,339</div>
                  <div className="text-sm font-urbanist font-light text-gray-600">Active Players</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-gray-700" strokeWidth={1} />
                <div>
                  <div className="text-2xl font-urbanist font-semibold text-gray-900">5,000+</div>
                  <div className="text-sm font-urbanist font-light text-gray-600">Quiz Takers</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="mt-8 border border-gray-200 bg-gray-50">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-urbanist font-semibold text-gray-900 mb-4">Ready to Join the Competition?</h3>
            <p className="font-urbanist font-light text-gray-600 mb-6">
              Take your first quiz and start climbing the leaderboard. Compete with believers worldwide and win exciting prizes!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate("/auth/register")}
                className="bg-black hover:bg-gray-800 text-white font-urbanist font-light"
              >
                Start Quiz Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 pt-16 pb-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:justify-between md:items-start gap-12">
          {/* Left: Logo and description */}
          <div className="flex-1 min-w-[220px] flex flex-col items-start mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center mr-2">
                <Brain className="w-3 h-3 text-white" />
              </div>
              <span className="text-lg font-urbanist font-semibold text-gray-900">Bible Quiz Competition</span>
            </div>
            <p className="mb-4 font-urbanist font-light text-gray-600 max-w-xs">Empower your faith with fun, challenging Bible quizzes for all ages. Compete, learn, and grow in your knowledge of Scripture!</p>
            <p className="font-urbanist font-light text-gray-600 text-sm">Need help? Email <a href="mailto:info@biblequizcompetition.com" className="underline">info@biblequizcompetition.com</a></p>
          </div>
          {/* Center/Right: Links */}
          <div className="flex flex-1 flex-col sm:flex-row justify-end gap-12">
            <div>
              <h4 className="font-urbanist font-semibold text-gray-900 mb-3">Company</h4>
              <ul className="space-y-3">
                <li><a href="/" className="font-urbanist font-light text-gray-600 hover:text-gray-900 transition-colors">Home</a></li>
                <li><a href="/bible-questions-and-answers-hub" className="font-urbanist font-light text-gray-600 hover:text-gray-900 transition-colors">Bible Q&amp;A</a></li>
                <li><a href="/public-leaderboard" className="font-urbanist font-light text-gray-600 hover:text-gray-900 transition-colors">Leaderboard</a></li>
                <li><a href="/auth/login" className="font-urbanist font-light text-gray-600 hover:text-gray-900 transition-colors">Sign In</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-urbanist font-semibold text-gray-900 mb-3">Support</h4>
              <ul className="space-y-3">
                <li><a href="/help" className="font-urbanist font-light text-gray-600 hover:text-gray-900 transition-colors">Help Center</a></li>
                <li><a href="#faq" className="font-urbanist font-light text-gray-600 hover:text-gray-900 transition-colors">FAQ</a></li>
                <li><a href="mailto:info@biblequizcompetition.com" className="font-urbanist font-light text-gray-600 hover:text-gray-900 transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 border-t border-gray-200 pt-8 text-center">
          <span className="font-urbanist font-light text-gray-600">© 2024 Bible Quiz Competition. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
} 