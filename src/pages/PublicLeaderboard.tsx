import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Crown, Star, Users, TrendingUp, Award, Calendar, Clock, Target, Bolt, Menu } from "lucide-react";
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
      setGlobalLeaders(finalLeaderboard.slice(0, 50));
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
        <div key={entry.id} className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-sm">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">{entry.name}</div>
              <div className="flex gap-1 mt-1">
                {(userBadgesMap[entry.id] || []).map((b, i) => (
                  <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 text-xs text-gray-700">
                    {b.icon === 'Bolt' && <Bolt className="w-3 h-3 text-blue-600 mr-1" />}
                    {b.icon === 'Crown' && <Crown className="w-3 h-3 text-yellow-500 mr-1" />}
                    {b.icon === 'Star' && <Star className="w-3 h-3 text-amber-500 mr-1" />}
                    {b.icon === 'Award' && <Award className="w-3 h-3 text-purple-600 mr-1" />}
                    <span>{b.slug?.replace('-', ' ')}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {/* Show crown for top 3, with respective color */}
            {index === 0 && <Crown className="w-6 h-6 text-yellow-500 mr-1" />}
            {index === 1 && <Crown className="w-6 h-6 text-gray-400 mr-1" />}
            {index === 2 && <Crown className="w-6 h-6 text-amber-700 mr-1" />}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white flex flex-col">
      {/* Navbar (matches homepage) */}
      <header className="bg-white/70 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex flex-row justify-between items-center relative">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}> 
            <img src="/sword.png" alt="Bible Quiz Competition Logo" className="w-6 h-6 sm:w-7 sm:h-7 mr-2 inline-block align-middle" />
            <span className="text-base sm:text-lg font-semibold text-gray-900">Bible Quiz Competition</span>
          </div>
          {/* Hamburger for mobile */}
          <button
            className="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 transition-colors"
            aria-label="Open navigation menu"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <Menu className="w-6 h-6 sm:w-7 sm:h-7 text-gray-900" />
          </button>
          {/* Nav links for desktop */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 xl:space-x-3">
            <button className="text-black font-semibold px-2 md:px-3 lg:px-4 py-2 bg-transparent border-none shadow-none hover:underline transition-all duration-200 text-sm lg:text-base" onClick={() => navigate("/bible-questions-and-answers-hub")}>
              <span className="hidden lg:inline">Bible Q&A Hub</span>
              <span className="lg:hidden">Q&A Hub</span>
            </button>
            <button className="text-black font-semibold px-2 md:px-3 lg:px-4 py-2 bg-transparent border-none shadow-none hover:underline transition-all duration-200 text-sm lg:text-base" onClick={() => navigate("/articles")}>Articles</button>
            <button className="text-black font-semibold px-2 md:px-3 lg:px-4 py-2 bg-transparent border-none shadow-none hover:underline transition-all duration-200 text-sm lg:text-base" onClick={() => navigate("/host-live-bible-quizzes-with-confidence")}>
              <span className="hidden lg:inline">Hosting Guide</span>
              <span className="lg:hidden">Hosting</span>
            </button>
            <button className="text-black font-semibold px-2 md:px-3 lg:px-4 py-2 bg-transparent border-none shadow-none hover:underline transition-all duration-200 text-sm lg:text-base" onClick={() => navigate("/auth/login")}>Sign In</button>
            <Button variant="ghost" className="bg-black text-white font-semibold px-2 md:px-3 lg:px-4 py-2 rounded hover:bg-gray-800 transition-all duration-200 text-sm lg:text-base" onClick={() => navigate("/auth/register")}>Sign Up</Button>
          </nav>
          {/* Mobile dropdown menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4 bg-white rounded-xl shadow-xl border border-blue-100 z-50 flex flex-col items-stretch overflow-hidden animate-in slide-in-from-top-2 duration-200">
              <button className="text-black font-semibold px-4 py-4 text-left hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200 border-b border-gray-100 touch-manipulation" onClick={() => { setMobileMenuOpen(false); navigate("/bible-questions-and-answers-hub"); }}>Bible Q&A Hub</button>
              <button className="text-black font-semibold px-4 py-4 text-left hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200 border-b border-gray-100 touch-manipulation" onClick={() => { setMobileMenuOpen(false); navigate("/articles"); }}>Articles</button>
              <button className="text-black font-semibold px-4 py-4 text-left hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200 border-b border-gray-100 touch-manipulation" onClick={() => { setMobileMenuOpen(false); navigate("/host-live-bible-quizzes-with-confidence"); }}>Hosting Guide</button>
              <button className="text-black font-semibold px-4 py-4 text-left hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200 border-b border-gray-100 touch-manipulation" onClick={() => { setMobileMenuOpen(false); navigate("/auth/login"); }}>Sign In</button>
              <button className="bg-black text-white font-semibold px-4 py-4 text-left hover:bg-gray-900 active:bg-gray-800 transition-colors duration-200 touch-manipulation" onClick={() => { setMobileMenuOpen(false); navigate("/auth/register"); }}>Sign Up</button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-100 via-purple-50 to-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Bible Quiz Leaderboard</h1>
          <p className="text-lg text-gray-700 mb-6">
            Compete with believers from around the world! See who's leading the pack in our Bible quiz competitions. 
            Track your progress, challenge yourself, and climb the ranks to become a Bible Quiz Champion.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <span className="inline-block bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold">🏆 Global Champions</span>
            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">📈 Weekly Winners</span>
            <span className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">🎯 Monthly Masters</span>
            <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">💰 Prize Winners</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-10">
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Leaderboard Content */}
        <Card className="shadow-lg border-0 px-8 py-8">
          <CardHeader className="py-8 px-8">
            <CardTitle className="flex items-center space-x-2 py-4 px-8">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <span>
                {activeTab === 'global' && 'Global Leaderboard'}
                {activeTab === 'weekly' && 'Weekly Top 10'}
                {activeTab === 'monthly' && 'Monthly Champions'}
                {activeTab === 'competition' && 'Latest Competition Results'}
              </span>
            </CardTitle>
            <CardDescription>
              {activeTab === 'global' && 'All-time highest scores from our Bible quiz community'}
              {activeTab === 'weekly' && 'Top performers from the last 7 days'}
              {activeTab === 'monthly' && 'Champions from the current month'}
              {activeTab === 'competition' && 'Results from our most recent live competition'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading leaderboard...</span>
              </div>
            ) : (
              <div>
                {activeTab === 'global' && renderLeaderboardTable(globalLeaders)}
                {activeTab === 'weekly' && renderLeaderboardTable(weeklyLeaders)}
                {activeTab === 'monthly' && renderLeaderboardTable(monthlyLeaders)}
                {activeTab === 'competition' && renderLeaderboardTable(competitionLeaders, true)}
                
                {activeTab === 'global' && globalLeaders.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <Trophy className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No leaderboard data available yet.</p>
                    <p className="text-sm">Be the first to take a quiz and claim the top spot!</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-40">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-700">1,936,339</div>
                  <div className="text-sm text-blue-600">Active Players</div>
                </div>
              </div>
            </CardContent>
          </Card>


          {/* New card for number of users (inflated) */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-700">5,000+</div>
                  <div className="text-sm text-green-600">Quiz Takers</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="mt-8 shadow-lg border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Join the Competition?</h3>
            <p className="text-blue-100 mb-6">
              Take your first quiz and start climbing the leaderboard. Compete with believers worldwide and win exciting prizes!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => navigate("/auth/login")}
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Start Quiz Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-[#181c3a] text-gray-200 pt-16 pb-8 mt-0">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:justify-between md:items-start gap-12">
          {/* Left: Logo and description */}
          <div className="flex-1 min-w-[220px] flex flex-col items-start mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              <img src="/sword.png" alt="Bible Quiz Competition Logo" className="w-10 h-10 mr-2" />
              <span className="text-xl font-bold text-white">Bible Quiz Competition</span>
            </div>
            <p className="mb-4 text-gray-300 max-w-xs">Empower your faith with fun, challenging Bible quizzes for all ages. Compete, learn, and grow in your knowledge of Scripture!</p>
            <p className="text-gray-400 text-sm">Need help? Email <a href="mailto:info@biblequizcompetition.com" className="underline">info@biblequizcompetition.com</a></p>
          </div>
          {/* Center/Right: Links */}
          <div className="flex flex-1 flex-col sm:flex-row justify-end gap-12">
            <div>
              <h4 className="font-bold text-white mb-3">Company</h4>
              <ul className="space-y-2">
                <li><a href="/" className="hover:underline text-gray-300">Home</a></li>
                <li><a href="/bible-questions-and-answers-hub" className="hover:underline text-gray-300">Bible Q&amp;A</a></li>
                <li><a href="/public-leaderboard" className="hover:underline text-gray-300">Leaderboard</a></li>
                <li><a href="/auth/login" className="hover:underline text-gray-300">Sign In</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#privacy" className="hover:underline text-gray-300">Privacy</a></li>
                <li><a href="#terms" className="hover:underline text-gray-300">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 border-t border-blue-900 pt-6 text-center text-white text-sm">
          © 2024 Bible Quiz Competition. All rights reserved.
        </div>
      </footer>
    </div>
  );
} 