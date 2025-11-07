import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Trophy, Clock, Users, Brain, ArrowRight, Play, BookOpen, Star, Award, Calendar, HelpCircle, CheckCircle, Globe, Menu, Crown, Medal, Search, X, ChevronLeft, ChevronRight, MessageSquare, Rocket, Sparkles, Heart, Droplet, ArrowLeft } from "lucide-react";
import { Helmet } from 'react-helmet';
import { supabase } from "@/integrations/supabase/client";

interface FallingBubble {
  id: string;
  item: string;
  x: number; // horizontal position (0-3)
  y: number; // vertical position (0-100%)
  speed: number;
  collected: boolean;
  type: 'good' | 'sin'; // Type of item
}

const features = [
  {
    icon: Brain,
    title: "Bible Knowledge",
    description: "1,000+ questions across all categories"
  },
  {
    icon: Clock,
    title: "Time-Based Scoring",
    description: "Fast-paced quizzes with time bonuses"
  },
  {
    icon: Trophy,
    title: "Leaderboards",
    description: "Compete and track your progress"
  },
  {
    icon: Users,
    title: "Live Events",
    description: "Join weekly competitions"
  }
];

const howItWorks = [
  {
    icon: BookOpen,
    title: "Sign Up",
    description: "Create your free account to access all quiz features and track your progress."
  },
  {
    icon: Play,
    title: "Take Quizzes",
    description: "Choose from Today's Quiz, Weekly Challenges, or create your own custom quizzes."
  },
  {
    icon: Trophy,
    title: "Compete & Win",
    description: "Climb the leaderboard, earn prizes, and compete with believers worldwide."
  }
];

const bibleTestimonials = [
  {
    name: "Pastor Grace Williams",
    role: "Youth Pastor",
    content: "The Bible Quiz helped our youth group learn and have fun together. Highly recommended!"
  },
  {
    name: "Samuel Lee",
    role: "College Student",
    content: "I love competing in the weekly Bible quizzes. The questions are challenging and fun!"
  },
  {
    name: "Anita Joseph",
    role: "Sunday School Teacher",
    content: "A wonderful way to test and grow my Bible knowledge. The leaderboard keeps me motivated!"
  },
  {
    name: "Michael Thompson",
    role: "Bible Study Leader",
    content: "This platform has transformed how our study group prepares. The variety of quizzes is incredible!"
  },
  {
    name: "Sarah Chen",
    role: "Ministry Coordinator",
    content: "Perfect for keeping our congregation engaged with Scripture. The weekly quizzes are a highlight!"
  },
  {
    name: "David Rodriguez",
    role: "Seminary Student",
    content: "An excellent tool for reviewing Bible knowledge. The timed quizzes really test your understanding."
  },
  {
    name: "Emily Johnson",
    role: "Children's Ministry Director",
    content: "Our kids love the interactive quizzes! It's made learning Bible stories so much more engaging."
  },
  {
    name: "James Wilson",
    role: "Retired Pastor",
    content: "Even after decades of ministry, I learn something new with each quiz. Wonderful resource!"
  },
  {
    name: "Maria Garcia",
    role: "Small Group Leader",
    content: "We use these quizzes in our weekly meetings. Great way to encourage friendly competition!"
  },
  {
    name: "Robert Kim",
    role: "Theology Student",
    content: "The comprehensive coverage of all 66 books helps me stay sharp on my biblical studies."
  }
];

const stats = [
  { label: "Participants", value: "1,250+", icon: Users },
  { label: "Questions", value: "500+", icon: BookOpen },
  { label: "Countries", value: "45", icon: Globe },
  { label: "Weekly Quizzes", value: "52+", icon: Calendar }
];

function StickyLeaderboardPanel() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeaders();
  }, []);

  // Add daily refresh mechanism for homepage leaderboard
  useEffect(() => {
    const checkForDailyRefresh = () => {
      const now = new Date();
      const currentDay = now.getDate();
      const lastRefreshDay = localStorage.getItem('homepageLeaderboardLastRefreshDay');
      
      // If it's a new day or first time, refresh the leaderboard
      if (lastRefreshDay !== currentDay.toString()) {
        localStorage.setItem('homepageLeaderboardLastRefreshDay', currentDay.toString());
        fetchLeaders();
      }
    };

    // Check immediately
    checkForDailyRefresh();

    // Set up interval to check every hour
    const interval = setInterval(checkForDailyRefresh, 60 * 60 * 1000); // Check every hour

    return () => clearInterval(interval);
  }, []);

  const fetchLeaders = async () => {
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

      // Get top 3 from the SAME logic as leaderboard pages
      setLeaders(finalLeaderboard.slice(0, 3));
    } catch (error) {
      console.error('Error fetching leaders:', error);
      
      // Fallback: Use the SAME fallback names as leaderboard pages
      const fallbackData = [
        { id: 'fallback-1', name: 'Sarah Johnson', rank: 1 },
        { id: 'fallback-2', name: 'Michael Chen', rank: 2 },
        { id: 'fallback-3', name: 'Emily Rodriguez', rank: 3 }
      ];
      setLeaders(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 0: return <Crown className="w-5 h-5 text-yellow-500" />;
      case 1: return <Trophy className="w-5 h-5 text-gray-400" />;
      case 2: return <Medal className="w-5 h-5 text-amber-600" />;
      default: return <Award className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className={`hidden md:flex flex-col fixed right-0 z-50 transition-all duration-300 ${open ? 'w-80' : 'w-14'}`} style={{ top: 'calc(50% - 150px)' }}>
      <div className={`h-[260px] ${open ? 'bg-white/80 p-4 border-l border-blue-100 shadow-xl' : 'bg-white/60 p-1 border-l border-blue-100 shadow'} rounded-l-2xl backdrop-blur-md flex flex-col items-stretch relative`}>
        <button
          onClick={() => setOpen(!open)}
          className={`absolute ${open ? 'top-4 left-[-25px]' : 'top-1/2 left-[-25px] -translate-y-1/2'} bg-blue-600 text-white rounded-l-lg px-2 py-1 shadow-lg focus:outline-none`}
        >
          {open ? <span>&#10095;</span> : <span>&#10094;</span>}
        </button>
        {open ? (
          <>
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-6 h-6 text-blue-600" />
              <span className="font-bold text-blue-700">Leaderboard</span>
            </div>
            {loading ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto">
                  {leaders.slice(0, 3).map((user, i) => (
                    <li key={user.id} className="flex items-center justify-between py-2 border-b last:border-b-0 border-blue-50">
                      <div className="flex items-center gap-2">
                        {getRankIcon(i)}
                        <span className="font-semibold text-gray-800">{user.name}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <button onClick={() => navigate('/public-leaderboard')} className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">View Full Leaderboard</button>
              </>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <Trophy className="w-6 h-6 text-blue-600 mb-10" />
            <span className="text-sm text-blue-600 font-bold rotate-90 whitespace-nowrap">Leaderboard</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Removed StickyPrayerRequestsPanel - simplified homepage  
function _StickyPrayerRequestsPanel() {
  const [prayerRequests, setPrayerRequests] = useState([]);
  const [displayedRequests, setDisplayedRequests] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);
  const [showAnonymous, setShowAnonymous] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPrayerRequests();
    
    // Auto-refresh every 30 seconds
    const refreshInterval = setInterval(() => {
      fetchPrayerRequests();
    }, 30000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  // Continuous loop effect
  useEffect(() => {
    if (prayerRequests.length === 0) return;

    const filteredRequests = prayerRequests.filter(request => showAnonymous || !request.isAnonymous);
    
    // Set initial displayed requests
    setDisplayedRequests(filteredRequests.slice(0, 8));
    
    // Start continuous loop
    const loopInterval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % filteredRequests.length;
        const newDisplayedRequests = [];
        
        // Get 8 consecutive requests starting from nextIndex
        for (let i = 0; i < 8; i++) {
          const requestIndex = (nextIndex + i) % filteredRequests.length;
          newDisplayedRequests.push(filteredRequests[requestIndex]);
        }
        
        setDisplayedRequests(newDisplayedRequests);
        return nextIndex;
      });
    }, 3000); // Change every 3 seconds

    return () => clearInterval(loopInterval);
  }, [prayerRequests, showAnonymous]);

  const generateMockPrayerRequests = () => {
    const categories = ['healing', 'family', 'work', 'spiritual', 'financial', 'guidance', 'protection'];
    
    const realisticPrayerRequests = [
      // Healing requests
      "My mom has been diagnosed with cancer. Please pray for her healing and strength for our family during this difficult time.",
      "Please pray for my 3-year-old daughter who has been in the hospital for a week with pneumonia.",
      "My husband is recovering from a heart attack. We need prayers for his complete healing and our family's strength.",
      "Please pray for my grandmother who fell and broke her hip. She's 85 and we're worried about her recovery.",
      "I've been struggling with chronic pain for months. Please pray for healing and relief from this suffering.",
      "My sister is battling depression and anxiety. Please pray for her mental health and emotional healing.",
      "Please pray for my father who is having surgery tomorrow. We're all very anxious about it.",
      "My friend's baby was born premature. Please pray for the baby's health and the family's peace.",
      "I've been diagnosed with diabetes. Please pray for wisdom in managing this condition and for healing.",
      "Please pray for my aunt who is fighting COVID-19. She's in the ICU and we're very worried.",
      
      // Family requests
      "Please pray for my marriage. We've been going through a rough patch and need God's guidance.",
      "My teenage son is rebelling and making poor choices. Please pray for his heart to turn back to God.",
      "Please pray for my family as we navigate my parents' divorce after 30 years of marriage.",
      "We're struggling to conceive after 2 years of trying. Please pray for a miracle baby.",
      "My daughter is being bullied at school. Please pray for her protection and strength.",
      "Please pray for my brother who is struggling with addiction. We need a breakthrough.",
      "My husband lost his job and we're struggling financially. Please pray for provision and peace.",
      "Please pray for my family as we care for my elderly mother with dementia.",
      "My son is struggling in school and we're considering special education. Please pray for wisdom.",
      "Please pray for my family as we prepare to move to a new city for my job.",
      
      // Work/Career requests
      "Please pray for my job interview tomorrow. I really need this position to support my family.",
      "I'm starting a new business and need prayers for wisdom, provision, and success.",
      "Please pray for my work situation. There's been a lot of conflict and I need peace.",
      "I've been unemployed for 6 months. Please pray for the right job opportunity to come along.",
      "Please pray for my career transition. I'm feeling called to ministry but need guidance.",
      "My workplace is going through layoffs. Please pray for job security and peace.",
      "Please pray for my business partnership. We're having disagreements and need unity.",
      "I'm studying for my medical boards. Please pray for focus, retention, and success.",
      "Please pray for my teaching career. I'm feeling burnt out and need renewal.",
      "I'm starting a new job next week. Please pray for a smooth transition and favor.",
      
      // Spiritual requests
      "Please pray for my spiritual growth. I've been feeling distant from God lately.",
      "I'm struggling with doubt and need prayers for stronger faith and trust in God.",
      "Please pray for my church. We're going through a difficult season and need unity.",
      "I'm feeling called to missions but need prayers for confirmation and provision.",
      "Please pray for my prayer life. I want to grow deeper in my relationship with God.",
      "I'm struggling with forgiveness toward someone who hurt me deeply. Please pray for healing.",
      "Please pray for my spiritual gifts to be developed and used for God's glory.",
      "I'm feeling spiritually dry and need prayers for renewal and refreshment.",
      "Please pray for my family's salvation. I'm the only believer and it's hard.",
      "I'm struggling with a particular sin and need prayers for victory and freedom.",
      
      // Financial requests
      "Please pray for our financial situation. We're behind on bills and need provision.",
      "I'm struggling with debt and need prayers for wisdom in managing finances.",
      "Please pray for my business to be profitable so I can support my family.",
      "We need prayers for provision to pay for our daughter's college education.",
      "Please pray for financial breakthrough. We've been struggling for months.",
      "I'm starting a side business to supplement income. Please pray for success.",
      "Please pray for wisdom in making financial decisions for our family.",
      "We're trying to buy our first home. Please pray for the right opportunity.",
      "Please pray for provision to pay for my son's medical treatment.",
      "I'm struggling with giving and need prayers for a generous heart.",
      
      // Guidance requests
      "Please pray for guidance in making a major life decision about my career.",
      "I'm feeling lost and need prayers for direction in my life.",
      "Please pray for wisdom in parenting my difficult teenager.",
      "I'm considering a big move and need prayers for God's will to be clear.",
      "Please pray for guidance in choosing the right school for my children.",
      "I'm struggling with a relationship decision and need prayers for clarity.",
      "Please pray for wisdom in handling a conflict with my neighbor.",
      "I'm feeling called to ministry but need prayers for confirmation.",
      "Please pray for guidance in my dating relationship. Is this God's will?",
      "I need prayers for direction in my studies and future career path.",
      
      // Protection requests
      "Please pray for safety as I travel for work this week.",
      "My family is going through a dangerous neighborhood. Please pray for protection.",
      "Please pray for my son who is serving in the military overseas.",
      "I'm starting a new job in a dangerous area. Please pray for safety.",
      "Please pray for protection over my children as they go to school.",
      "My husband travels for work. Please pray for his safety on the roads.",
      "Please pray for protection over our home and property.",
      "I'm feeling threatened by someone. Please pray for God's protection.",
      "Please pray for safety as our family goes on vacation.",
      "My daughter is learning to drive. Please pray for her safety and wisdom."
    ];

    const names = [
      "Sarah", "Michael", "Jennifer", "David", "Lisa", "Robert", "Maria", "James", "Linda", "John",
      "Patricia", "William", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Christopher",
      "Nancy", "Daniel", "Karen", "Matthew", "Betty", "Anthony", "Helen", "Mark", "Sandra", "Donald",
      "Donna", "Steven", "Carol", "Paul", "Ruth", "Andrew", "Sharon", "Joshua", "Michelle", "Kenneth",
      "Laura", "Kevin", "Deborah", "Brian", "Dorothy", "George", "Amy", "Edward", "Angela", "Ronald"
    ];

    return Array.from({ length: 50 }, (_, index) => {
      const isAnonymous = Math.random() > 0.7; // 30% chance of being anonymous
      const randomName = isAnonymous ? null : names[Math.floor(Math.random() * names.length)];
      const randomRequest = realisticPrayerRequests[Math.floor(Math.random() * realisticPrayerRequests.length)];
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      
      // Create more realistic timestamps - mix of recent and older requests
      const hoursAgo = Math.floor(Math.random() * 168); // Within last week
      const minutesAgo = Math.floor(Math.random() * 60); // Within last hour
      const isRecent = Math.random() > 0.8; // 20% chance of being very recent
      const timeAgo = isRecent ? minutesAgo * 60 * 1000 : hoursAgo * 60 * 60 * 1000;
      
      return {
        id: `mock-${index + 1}`,
        name: randomName,
        request: randomRequest,
        category: randomCategory,
        isAnonymous: isAnonymous,
        created_at: new Date(Date.now() - timeAgo).toISOString()
      };
    });
  };

  const fetchPrayerRequests = async () => {
    try {
      setLoading(true);
      
      // Fetch real prayer requests from Supabase (auto-approved)
      const { data: realPrayerRequests, error } = await supabase
        .from('prayer_requests' as any)
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      
      // Generate mock data
      const mockPrayerRequests = generateMockPrayerRequests();
      
      // Combine real and mock data, prioritizing real data
      const combinedRequests = [
        ...(realPrayerRequests || []),
        ...mockPrayerRequests
      ];
      
      // Sort by creation date (newest first)
      combinedRequests.sort((a, b) => new Date((b as any).created_at).getTime() - new Date((a as any).created_at).getTime());
      
      setPrayerRequests(combinedRequests);
      
      if (error) {
        console.error('Error fetching prayer requests:', error);
      }
    } catch (error) {
      console.error('Error fetching prayer requests:', error);
      // Fallback to mock data only
      const mockPrayerRequests = generateMockPrayerRequests();
      setPrayerRequests(mockPrayerRequests);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'healing': return <Heart className="w-4 h-4 text-red-500" />;
      case 'family': return <Users className="w-4 h-4 text-green-500" />;
      case 'work': return <Award className="w-4 h-4 text-blue-500" />;
      case 'spiritual': return <Star className="w-4 h-4 text-purple-500" />;
      case 'financial': return <TrendingUp className="w-4 h-4 text-yellow-500" />;
      case 'guidance': return <HelpCircle className="w-4 h-4 text-indigo-500" />;
      case 'protection': return <Shield className="w-4 h-4 text-orange-500" />;
      default: return <Heart className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className={`hidden md:flex flex-col fixed right-0 z-40 transition-all duration-300 ${open ? 'w-80' : 'w-14'}`} style={{ top: 'calc(50% - 10px)' }}>
      <div className={`h-[350px] ${open ? 'bg-white/80 p-4 border-l border-red-100 shadow-xl' : 'bg-white/60 p-1 border-l border-red-100 shadow'} rounded-l-2xl backdrop-blur-md flex flex-col items-stretch relative`}>
        <button
          onClick={() => setOpen(!open)}
          className={`absolute ${open ? 'top-4 left-[-25px]' : 'top-1/2 left-[-25px] -translate-y-1/2'} bg-red-600 text-white rounded-l-lg px-2 py-1 shadow-lg focus:outline-none`}
        >
          {open ? <span>&#10095;</span> : <span>&#10094;</span>}
        </button>
        {open ? (
          <>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-red-600" />
              <span className="font-bold text-red-700">Prayer Requests</span>
              <div className="ml-auto flex gap-1">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-red-600">Live</span>
                </div>
                <button
                  onClick={() => fetchPrayerRequests()}
                  className="p-1 hover:bg-red-50 rounded"
                  title="Refresh prayer requests"
                >
                  <ArrowRight className="w-4 h-4 text-red-600 rotate-90" />
                </button>
                <button
                  onClick={() => setShowAnonymous(!showAnonymous)}
                  className="p-1 hover:bg-red-50 rounded"
                  title={showAnonymous ? "Hide anonymous requests" : "Show anonymous requests"}
                >
                  {showAnonymous ? <Eye className="w-4 h-4 text-red-600" /> : <EyeOff className="w-4 h-4 text-red-600" />}
                </button>
              </div>
            </div>
            {loading ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto space-y-2">
                  {displayedRequests.map((request, index) => (
                    <li key={`${request.id}-${currentIndex}-${index}`} className="p-2 bg-red-50 rounded-lg border border-red-100 transition-all duration-500 ease-in-out">
                      <div className="flex items-start gap-2 mb-1">
                        {getCategoryIcon(request.category)}
                        <span className="text-xs text-red-600 font-medium">
                          {formatTimeAgo(request.created_at || request.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {request.request}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        {request.isAnonymous ? (
                          <span className="text-xs text-gray-500 italic">Anonymous</span>
                        ) : request.name ? (
                          <span className="text-xs text-gray-600 font-medium">— {request.name}</span>
                        ) : null}
                        <span className="text-xs text-gray-400">
                          {request.category.charAt(0).toUpperCase() + request.category.slice(1)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => navigate('/prayer-requests')} 
                  className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold hover:from-red-700 hover:to-pink-700 transition-all"
                >
                  Submit a request
                </button>
              </>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <Heart className="w-6 h-6 text-red-600 mb-10" />
            <span className="text-sm text-red-600 font-bold rotate-90 whitespace-nowrap">Prayers</span>
          </div>
        )}
      </div>
    </div>
  );
}

function FaqSection() {
  const faqs = [
    {
      q: "How do I join a Bible quiz?",
      a: "Simply visit our homepage and click 'Today's Quiz' to start immediately, or sign up for a free account to access weekly quizzes, create your own quizzes, and track your progress on the leaderboard."
    },
    {
      q: "What types of quizzes are available?",
      a: "We offer Today's Quiz (Hebrews 3), Weekly Bible Challenges, public quizzes for all 66 Bible books, and the ability to create and host your own live quizzes with an 8-character join code."
    },
    {
      q: "How does the scoring system work?",
      a: "You earn 4 points for each correct answer, lose 1 point for wrong answers, and receive time bonuses for quick responses. The faster you answer correctly, the more points you earn!"
    },
    {
      q: "Can I create my own quizzes?",
      a: "Yes! You can create custom Bible quizzes with your own questions, choose between requiring login or allowing guest participation, and host live sessions that others can join with a simple code."
    },
    {
      q: "Is the Bible Quiz suitable for all ages?",
      a: "Absolutely! Our quizzes are designed for all ages, from children to adults, with questions covering every level of Bible knowledge. Perfect for families, youth groups, and church communities."
    },
    {
      q: "What Bible topics are covered?",
      a: "We have quizzes for all 66 books of the Bible, including Old Testament stories, New Testament teachings, Bible characters, parables, miracles, prophecies, and much more. Each quiz is carefully crafted to test and expand your knowledge."
    },
    {
      q: "How do I track my progress?",
      a: "Create a free account to access your personal dashboard, view your quiz history, see your scores, and compete on the global leaderboard. You can also track your improvement over time."
    },
    {
      q: "Can I participate without creating an account?",
      a: "Yes! You can take Today's Quiz and many public quizzes as a guest. However, creating a free account gives you access to more features, progress tracking, and the ability to create your own quizzes."
    }
  ];
  const [open, setOpen] = useState(null);
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-urbanist font-semibold text-center text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg font-urbanist font-light text-gray-600 text-center max-w-2xl mb-2">
            Everything you need to know about Bible Quiz Competition. Can't find your answer?{' '}
            <a href="mailto:info@biblequizcompetition.com" className="font-urbanist font-light text-gray-900 hover:text-gray-700 underline">Contact our support team.</a>
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-lg border border-gray-200 bg-white p-0 overflow-hidden transition-all">
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-lg font-urbanist font-medium text-gray-900 focus:outline-none hover:bg-gray-50 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                aria-controls={`faq-panel-${i}`}
              >
                <span className="text-left">{faq.q}</span>
                <span className={`ml-4 transition-transform flex-shrink-0 ${open === i ? 'rotate-45 text-gray-700' : 'text-gray-500'}`}>+</span>
              </button>
              <div
                id={`faq-panel-${i}`}
                className={`px-6 pb-5 font-urbanist font-light text-gray-600 text-base leading-relaxed transition-all duration-300 ${open === i ? 'block' : 'hidden'}`}
              >
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Public pages searchable content - comprehensive list
const publicPages = [
  // Main pages
  { title: "Bible Q&A Hub", path: "/bible-questions-and-answers-hub", category: "Bible Study" },
  { title: "Articles", path: "/articles", category: "Resources" },
  { title: "Help & Support", path: "/help", category: "Support" },
  { title: "Leaderboard", path: "/public-leaderboard", category: "Competition" },
  { title: "Daily Verse", path: "/daily-verse", category: "Bible Study" },
  { title: "Prayer Requests", path: "/prayer-requests", category: "Community" },
  { title: "Today's Quiz", path: "/todays-quiz", category: "Quizzes" },
  { title: "Weekly Quiz", path: "/weekly-quiz", category: "Quizzes" },
  
  // Genesis Hub sub-pages
  { title: "Genesis Hub", path: "/bible-questions-and-answers-hub/genesis", category: "Bible Study" },
  { title: "Genesis Beginner", path: "/bible-questions-and-answers-hub/genesis/beginner", category: "Bible Study" },
  { title: "Genesis Intermediate", path: "/bible-questions-and-answers-hub/genesis/intermediate", category: "Bible Study" },
  { title: "Genesis Advanced", path: "/bible-questions-and-answers-hub/genesis/advanced", category: "Bible Study" },
  { title: "Genesis Chapters 1-11", path: "/bible-questions-and-answers-hub/genesis/chapters-1-11", category: "Bible Study" },
  { title: "Genesis Chapters 12-25", path: "/bible-questions-and-answers-hub/genesis/chapters-12-25", category: "Bible Study" },
  { title: "Genesis Chapters 26-36", path: "/bible-questions-and-answers-hub/genesis/chapters-26-36", category: "Bible Study" },
  { title: "Genesis Chapters 37-50", path: "/bible-questions-and-answers-hub/genesis/chapters-37-50", category: "Bible Study" },
  { title: "Genesis True/False", path: "/bible-questions-and-answers-hub/genesis/true-false", category: "Bible Study" },
  { title: "Genesis Characters", path: "/bible-questions-and-answers-hub/genesis/characters", category: "Bible Study" },
  
  // Public Quiz - Old Testament Pentateuch
  { title: "Genesis Quiz", path: "/public-quiz/genesis", category: "Quiz" },
  { title: "Exodus Quiz", path: "/public-quiz/exodus", category: "Quiz" },
  { title: "Leviticus Quiz", path: "/public-quiz/leviticus", category: "Quiz" },
  { title: "Numbers Quiz", path: "/public-quiz/numbers", category: "Quiz" },
  { title: "Deuteronomy Quiz", path: "/public-quiz/deuteronomy", category: "Quiz" },
  
  // Public Quiz - Historical Books
  { title: "Joshua Quiz", path: "/public-quiz/joshua", category: "Quiz" },
  { title: "Judges Quiz", path: "/public-quiz/judges", category: "Quiz" },
  { title: "Ruth Quiz", path: "/public-quiz/ruth", category: "Quiz" },
  { title: "1 Samuel Quiz", path: "/public-quiz/1-samuel", category: "Quiz" },
  { title: "2 Samuel Quiz", path: "/public-quiz/2-samuel", category: "Quiz" },
  { title: "1 Kings Quiz", path: "/public-quiz/1-kings", category: "Quiz" },
  { title: "2 Kings Quiz", path: "/public-quiz/2-kings", category: "Quiz" },
  { title: "1 Chronicles Quiz", path: "/public-quiz/1-chronicles", category: "Quiz" },
  { title: "2 Chronicles Quiz", path: "/public-quiz/2-chronicles", category: "Quiz" },
  { title: "Ezra Quiz", path: "/public-quiz/ezra", category: "Quiz" },
  { title: "Nehemiah Quiz", path: "/public-quiz/nehemiah", category: "Quiz" },
  { title: "Esther Quiz", path: "/public-quiz/esther", category: "Quiz" },
  
  // Public Quiz - Wisdom Literature
  { title: "Job Quiz", path: "/public-quiz/job", category: "Quiz" },
  { title: "Psalms Quiz", path: "/public-quiz/psalms", category: "Quiz" },
  { title: "Proverbs Quiz", path: "/public-quiz/proverbs", category: "Quiz" },
  { title: "Ecclesiastes Quiz", path: "/public-quiz/ecclesiastes", category: "Quiz" },
  { title: "Song of Solomon Quiz", path: "/public-quiz/song-of-solomon", category: "Quiz" },
  
  // Public Quiz - Major Prophets
  { title: "Isaiah Quiz", path: "/public-quiz/isaiah", category: "Quiz" },
  { title: "Jeremiah Quiz", path: "/public-quiz/jeremiah", category: "Quiz" },
  { title: "Lamentations Quiz", path: "/public-quiz/lamentations", category: "Quiz" },
  { title: "Ezekiel Quiz", path: "/public-quiz/ezekiel", category: "Quiz" },
  { title: "Daniel Quiz", path: "/public-quiz/daniel", category: "Quiz" },
  
  // Public Quiz - Minor Prophets
  { title: "Hosea Quiz", path: "/public-quiz/hosea", category: "Quiz" },
  { title: "Joel Quiz", path: "/public-quiz/joel", category: "Quiz" },
  { title: "Amos Quiz", path: "/public-quiz/amos", category: "Quiz" },
  { title: "Obadiah Quiz", path: "/public-quiz/obadiah", category: "Quiz" },
  { title: "Jonah Quiz", path: "/public-quiz/jonah", category: "Quiz" },
  { title: "Micah Quiz", path: "/public-quiz/micah", category: "Quiz" },
  { title: "Nahum Quiz", path: "/public-quiz/nahum", category: "Quiz" },
  { title: "Habakkuk Quiz", path: "/public-quiz/habakkuk", category: "Quiz" },
  { title: "Zephaniah Quiz", path: "/public-quiz/zephaniah", category: "Quiz" },
  { title: "Haggai Quiz", path: "/public-quiz/haggai", category: "Quiz" },
  { title: "Zechariah Quiz", path: "/public-quiz/zechariah", category: "Quiz" },
  { title: "Malachi Quiz", path: "/public-quiz/malachi", category: "Quiz" },
  
  // Public Quiz - Gospels
  { title: "Matthew Quiz", path: "/public-quiz/matthew", category: "Quiz" },
  { title: "Mark Quiz", path: "/public-quiz/mark", category: "Quiz" },
  { title: "Luke Quiz", path: "/public-quiz/luke", category: "Quiz" },
  { title: "John Quiz", path: "/public-quiz/john", category: "Quiz" },
  
  // Public Quiz - Acts and Pauline Epistles
  { title: "Acts Quiz", path: "/public-quiz/acts", category: "Quiz" },
  { title: "Romans Quiz", path: "/public-quiz/romans", category: "Quiz" },
  { title: "1 Corinthians Quiz", path: "/public-quiz/1-corinthians", category: "Quiz" },
  { title: "2 Corinthians Quiz", path: "/public-quiz/2-corinthians", category: "Quiz" },
  { title: "Galatians Quiz", path: "/public-quiz/galatians", category: "Quiz" },
  { title: "Ephesians Quiz", path: "/public-quiz/ephesians", category: "Quiz" },
  { title: "Philippians Quiz", path: "/public-quiz/philippians", category: "Quiz" },
  { title: "Colossians Quiz", path: "/public-quiz/colossians", category: "Quiz" },
  { title: "1 Thessalonians Quiz", path: "/public-quiz/1-thessalonians", category: "Quiz" },
  { title: "2 Thessalonians Quiz", path: "/public-quiz/2-thessalonians", category: "Quiz" },
  { title: "1 Timothy Quiz", path: "/public-quiz/1-timothy", category: "Quiz" },
  { title: "2 Timothy Quiz", path: "/public-quiz/2-timothy", category: "Quiz" },
  { title: "Titus Quiz", path: "/public-quiz/titus", category: "Quiz" },
  { title: "Philemon Quiz", path: "/public-quiz/philemon", category: "Quiz" },
  
  // Public Quiz - General Epistles
  { title: "Hebrews Quiz", path: "/public-quiz/hebrews", category: "Quiz" },
  { title: "James Quiz", path: "/public-quiz/james", category: "Quiz" },
  { title: "1 Peter Quiz", path: "/public-quiz/1-peter", category: "Quiz" },
  { title: "2 Peter Quiz", path: "/public-quiz/2-peter", category: "Quiz" },
  { title: "1 John Quiz", path: "/public-quiz/1-john", category: "Quiz" },
  { title: "2 John Quiz", path: "/public-quiz/2-john", category: "Quiz" },
  { title: "3 John Quiz", path: "/public-quiz/3-john", category: "Quiz" },
  { title: "Jude Quiz", path: "/public-quiz/jude", category: "Quiz" },
  { title: "Revelation Quiz", path: "/public-quiz/revelation", category: "Quiz" },
  
  // Articles
  { title: "Complete Quiz Guide", path: "/articles/complete-quiz-guide", category: "Article" },
  { title: "Quiz Strategies", path: "/articles/quiz-strategies", category: "Article" },
  { title: "David King of Israel", path: "/articles/david-king-israel", category: "Article" },
  { title: "Leaderboard Tips", path: "/articles/leaderboard-tips", category: "Article" },
  { title: "Moses and Exodus", path: "/articles/moses-exodus-story", category: "Article" },
  { title: "Esther's Courage", path: "/articles/esther-courage-story", category: "Article" },
  { title: "Understanding Grace", path: "/articles/understanding-grace", category: "Article" },
  { title: "Prayer Life Guide", path: "/articles/prayer-life-guide", category: "Article" },
  { title: "Quiz Time Management", path: "/articles/quiz-time-management", category: "Article" },
  { title: "Bible Study Methods", path: "/articles/bible-study-methods", category: "Article" },
  { title: "Quiz Navigation Guide", path: "/articles/quiz-navigation-guide", category: "Article" },
  { title: "Quiz Scoring Explained", path: "/articles/quiz-scoring-explained", category: "Article" },
  { title: "Quiz Difficulty Levels", path: "/articles/quiz-difficulty-levels", category: "Article" },
  { title: "Quiz Feedback System", path: "/articles/quiz-feedback-system", category: "Article" },
  { title: "Quiz Progress Tracking", path: "/articles/quiz-progress-tracking", category: "Article" },
  { title: "Memory Techniques", path: "/articles/memory-techniques-quiz", category: "Article" },
  { title: "Abraham's Faith Journey", path: "/articles/abraham-faith-journey", category: "Article" },
  { title: "Joseph's Forgiveness Story", path: "/articles/joseph-forgiveness-story", category: "Article" },
  { title: "Quiz Anxiety Management", path: "/articles/quiz-anxiety-management", category: "Article" },
  { title: "Question Pattern Recognition", path: "/articles/question-pattern-recognition", category: "Article" },
  { title: "Quiz Concentration Techniques", path: "/articles/quiz-concentration-techniques", category: "Article" },
  { title: "Quiz Recovery Strategies", path: "/articles/quiz-recovery-strategies", category: "Article" },
  { title: "Competition Preparation", path: "/articles/competition-preparation", category: "Article" },
  { title: "Ruth's Loyalty and Devotion", path: "/articles/ruth-loyalty-devotion", category: "Article" },
  { title: "Forgiveness and Healing", path: "/articles/forgiveness-healing-power", category: "Article" },
  { title: "Hope: Biblical Perspective", path: "/articles/hope-biblical-perspective", category: "Article" },
  { title: "Scripture Memorization", path: "/articles/scripture-memorization-techniques", category: "Article" },
  { title: "Team Quiz Strategies", path: "/articles/team-quiz-strategies", category: "Article" },
  { title: "Moses Leadership Lessons", path: "/articles/moses-leadership-lessons", category: "Article" },
];

// Emotional Check-In Data
const emotionOptions = [
  {
    id: "very-anxious",
    label: "Very Anxious",
    emoji: "😰",
    image: "/assets/anxious.webp",
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "#dc2626",
    verses: [
      {
        reference: "Philippians 4:6-7",
        text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",
        encouragement: "God invites you to bring your worries to Him. His peace is available to you right now."
      }
    ]
  },
  {
    id: "stressed",
    label: "Stressed/Overwhelmed",
    emoji: "😫",
    image: "/assets/stressed.webp",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "#ea580c",
    verses: [
      {
        reference: "Matthew 11:28-30",
        text: "Come to me, all you who are weary and burdened, and I will give you rest.",
        encouragement: "Jesus offers you rest. Take a deep breath and remember that you can find peace in Him."
      }
    ]
  },
  {
    id: "sad",
    label: "Sad/Depressed",
    emoji: "😔",
    image: "/assets/sad.webp",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "#2563eb",
    verses: [
      {
        reference: "Psalm 34:18",
        text: "The Lord is close to the brokenhearted and saves those who are crushed in spirit.",
        encouragement: "God is near to you in your pain. He sees your tears and wants to bring you comfort."
      }
    ]
  },
  {
    id: "okay",
    label: "Okay/Neutral",
    emoji: "👍",
    image: "/assets/normal.webp",
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    borderColor: "#4b5563",
    verses: [
      {
        reference: "Jeremiah 29:11",
        text: "For I know the plans I have for you,' declares the Lord, 'plans to prosper you and not to harm you.",
        encouragement: "Even in neutral moments, God has wonderful plans for you."
      }
    ]
  },
  {
    id: "good",
    label: "Good/Calm",
    emoji: "😊",
    image: "/assets/calm.webp",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "#16a34a",
    verses: [
      {
        reference: "Psalm 28:7",
        text: "The Lord is my strength and my shield; my heart trusts in him, and he helps me.",
        encouragement: "It's wonderful that you're feeling good! Remember to give thanks to God for this peaceful moment."
      }
    ]
  },
  {
    id: "great",
    label: "Great/Peaceful",
    emoji: "😌",
    image: "/assets/peaceful.webp",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "#9333ea",
    verses: [
      {
        reference: "Romans 15:13",
        text: "May the God of hope fill you with all joy and peace as you trust in him.",
        encouragement: "This joy and peace you're experiencing comes from God! Let it overflow and share this blessing with others."
      }
    ]
  }
];

// Day-based neutral question sets (6 per day, Sun–Sat)
const cbtNeutralByDay: { [day: string]: any[] } = {
  sunday: [
    { id: 101, question: "Do you sometimes struggle to identify your feelings clearly?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/cbt_clarity_3132388.jpeg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
    { id: 102, question: "Do you find it helpful to reflect on your thoughts and emotions?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/cbt_reflection_5255996.jpeg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
    { id: 103, question: "Are you open to learning new ways to manage stress?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/cbt_manage_stress_3482711.jpeg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
    { id: 104, question: "Would a short breathing break help you right now?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/unsplash_eca07ce68773.jpg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
    { id: 105, question: "Do you feel supported by friends or family today?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/unsplash_43490279c0fa.jpg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
    { id: 106, question: "Would gratitude journaling be helpful this evening?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/unsplash_9e6261896da8.jpg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
  ],
  monday: [
    { id: 201, question: "Is work or study on your mind more than usual today?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/unsplash_b7833e8f5570.jpg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
    { id: 202, question: "Would planning your day reduce uncertainty for you?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/unsplash_eca07ce68773.jpg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
    { id: 203, question: "Are you getting enough rest and hydration today?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/unsplash_9e6261896da8.jpg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
    { id: 204, question: "Would a brief walk help clear your mind?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/cbt_manage_stress_3482711.jpeg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
    { id: 205, question: "Do you need to set gentle boundaries today?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/unsplash_43490279c0fa.jpg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
    { id: 206, question: "Would prayer or meditation bring peace right now?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/cbt_reflection_5255996.jpeg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
  ],
  tuesday: [
    { id: 301, question: "Do you feel present in the moment today?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/cbt_clarity_3132388.jpeg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
    { id: 302, question: "Is there a small task you can complete to gain momentum?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/unsplash_eca07ce68773.jpg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
    { id: 303, question: "Would a 5-minute pause help you reset?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/unsplash_b7833e8f5570.jpg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
    { id: 304, question: "Do you need encouragement from someone you trust today?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/unsplash_43490279c0fa.jpg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
    { id: 305, question: "Have you eaten regularly and kindly to your body?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/unsplash_9e6261896da8.jpg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
    { id: 306, question: "Would reading a short verse calm your mind?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/cbt_reflection_5255996.jpeg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
  ],
  wednesday: [
    { id: 401, question: "Do you feel balanced between responsibilities and rest?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/unsplash_43490279c0fa.jpg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
    { id: 402, question: "Would listing three wins from today encourage you?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/unsplash_9e6261896da8.jpg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
    { id: 403, question: "Is there any tense thought you can gently reframe?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/cbt_clarity_3132388.jpeg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
    { id: 404, question: "Would stepping outside for fresh air help?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/cbt_manage_stress_3482711.jpeg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
    { id: 405, question: "Do you need to postpone any non-urgent tasks?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/unsplash_eca07ce68773.jpg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
    { id: 406, question: "Would sharing how you feel with God or a friend help?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/cbt_reflection_5255996.jpeg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
  ],
  thursday: [
    { id: 501, question: "Is your self-talk kind and compassionate today?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/unsplash_b7833e8f5570.jpg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
    { id: 502, question: "Would slowing your pace reduce pressure?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/unsplash_43490279c0fa.jpg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
    { id: 503, question: "Is there a verse you can carry with you today?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/cbt_reflection_5255996.jpeg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
    { id: 504, question: "Would a warm beverage or water break help settle you?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
    { id: 505, question: "Do you feel connected to your purpose today?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "https://images.pexels.com/photos/2927676/pexels-photo-2927676.jpeg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
    { id: 506, question: "Is there a small joy you can notice right now?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/cbt_clarity_3132388.jpeg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
  ],
  friday: [
    { id: 601, question: "Do you need to unwind after the week so far?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/cbt_manage_stress_3482711.jpeg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
    { id: 602, question: "Would gentle music or silence be soothing now?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/unsplash_b7833e8f5570.jpg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
    { id: 603, question: "Is there anything you can hand over to God today?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/cbt_reflection_5255996.jpeg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
    { id: 604, question: "Would a short stretch help release tension?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/unsplash_43490279c0fa.jpg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
    { id: 605, question: "Do you want to note something you’re grateful for?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/unsplash_9e6261896da8.jpg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
    { id: 606, question: "Would stepping away from screens help right now?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/unsplash_eca07ce68773.jpg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
  ],
  saturday: [
    { id: 701, question: "Do you feel rested as the week wraps up?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/unsplash_43490279c0fa.jpg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
    { id: 702, question: "Would a slow morning routine benefit you today?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/cbt_clarity_3132388.jpeg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
    { id: 703, question: "Is it helpful to plan one nurturing activity today?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/cbt_manage_stress_3482711.jpeg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
    { id: 704, question: "Do you want to connect with someone you care about?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/unsplash_b7833e8f5570.jpg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
    { id: 705, question: "Would tidying a small space bring calm?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/unsplash_9e6261896da8.jpg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
    { id: 706, question: "Do you want to pause and breathe before the next thing?", options: ["Yes", "No"], thinkingTraps: { 0: ["neutral"], 1: ["neutral"] }, backgroundImage: "/assets/cbt/cbt_reflection_5255996.jpeg", backgroundGradient: "from-gray-600/80 to-slate-600/80" },
  ],
};

// Question sets for different emotion ranges
const cbtQuestionsByEmotion: { [key: string]: any[] } = {
  // Very Anxious / Anxious / Stressed / Sad - Negative emotions
  "negative": [
    {
      id: 1,
      question: "Do you often blame yourself when things go wrong?",
      options: ["Yes", "No"],
      thinkingTraps: {
        0: ["self-blame", "personalization"],
        1: ["neutral"]
      },
      backgroundImage: "/assets/cbt/cbt_blame_7640496.jpeg",
      backgroundGradient: "from-purple-600/80 to-indigo-600/80"
    },
    {
      id: 2,
      question: "Do you expect the worst to happen in future situations?",
      options: ["Yes", "No"],
      thinkingTraps: {
        0: ["catastrophizing", "fortune-telling"],
        1: ["neutral"]
      },
      backgroundImage: "/assets/cbt/cbt_worst_897817.jpeg",
      backgroundGradient: "from-blue-600/80 to-cyan-600/80"
    },
    {
      id: 3,
      question: "When you make a mistake, do you think you're a complete failure?",
      options: ["Yes", "No"],
      thinkingTraps: {
        0: ["all-or-nothing", "labeling"],
        1: ["neutral"]
      },
      backgroundImage: "/assets/cbt/cbt_failure_3601097.jpeg",
      backgroundGradient: "from-amber-600/80 to-orange-600/80"
    },
    {
      id: 4,
      question: "Do you constantly compare yourself to others?",
      options: ["Yes", "No"],
      thinkingTraps: {
        0: ["comparison", "self-blame"],
        1: ["neutral"]
      },
      backgroundImage: "/assets/cbt/cbt_compare_6532612.jpeg",
      backgroundGradient: "from-pink-600/80 to-rose-600/80"
    },
    {
      id: 5,
      question: "Do you assume you know what others are thinking about you?",
      options: ["Yes", "No"],
      thinkingTraps: {
        0: ["mind-reading", "jumping-to-conclusions"],
        1: ["neutral"]
      },
      backgroundImage: "/assets/cbt/cbt_mindreading_1194196.jpeg",
      backgroundGradient: "from-green-600/80 to-emerald-600/80"
    },
    {
      id: 6,
      question: "Do you focus mainly on negative details while ignoring positive ones?",
      options: ["Yes", "No"],
      thinkingTraps: {
        0: ["mental-filter", "catastrophizing"],
        1: ["neutral"]
      },
      backgroundImage: "/assets/cbt/unsplash_b7833e8f5570.jpg",
      backgroundGradient: "from-violet-600/80 to-purple-600/80"
    }
  ],
  // Neutral emotions placeholder (unused; selection is day-based via cbtNeutralByDay)
  "neutral": [],
  // Good / Great - Positive emotions
  "positive": [
    {
      id: 1,
      question: "Do you practice gratitude regularly for the good things in your life?",
      options: ["Yes", "No"],
      thinkingTraps: {
        0: ["neutral"],
        1: ["neutral"]
      },
      backgroundImage: "/assets/cbt/unsplash_eca07ce68773.jpg",
      backgroundGradient: "from-green-600/80 to-emerald-600/80"
    },
    {
      id: 2,
      question: "Do you have healthy coping strategies for when challenges arise?",
      options: ["Yes", "No"],
      thinkingTraps: {
        0: ["neutral"],
        1: ["neutral"]
      },
      backgroundImage: "/assets/cbt/unsplash_b7833e8f5570.jpg",
      backgroundGradient: "from-green-600/80 to-emerald-600/80"
    },
    {
      id: 3,
      question: "Do you feel connected to your faith and spiritual practices?",
      options: ["Yes", "No"],
      thinkingTraps: {
        0: ["neutral"],
        1: ["neutral"]
      },
      backgroundImage: "/assets/cbt/unsplash_43490279c0fa.jpg",
      backgroundGradient: "from-green-600/80 to-emerald-600/80"
    },
    {
      id: 4,
      question: "Do you maintain healthy boundaries in relationships?",
      options: ["Yes", "No"],
      thinkingTraps: {
        0: ["neutral"],
        1: ["neutral"]
      },
      backgroundImage: "/assets/cbt/unsplash_9e6261896da8.jpg",
      backgroundGradient: "from-green-600/80 to-emerald-600/80"
    },
    {
      id: 5,
      question: "Do you take time for self-care and rest?",
      options: ["Yes", "No"],
      thinkingTraps: {
        0: ["neutral"],
        1: ["neutral"]
      },
      backgroundImage: "/assets/cbt/unsplash_f06f85e504b3.jpg",
      backgroundGradient: "from-green-600/80 to-emerald-600/80"
    }
  ]
};

const thinkingTrapsInfo: { [key: string]: any } = {
  "self-blame": {
    name: "Self-Blame",
    description: "You tend to take responsibility for things outside your control.",
    verses: [{
      reference: "Romans 8:1",
      text: "Therefore, there is now no condemnation for those who are in Christ Jesus.",
      quote: "You are not defined by your mistakes. God's grace is greater than any failure."
    }]
  },
  "overgeneralization": {
    name: "Overgeneralization",
    description: "You see a single negative event as a never-ending pattern.",
    verses: [{
      reference: "Lamentations 3:22-23",
      text: "Because of the Lord's great love we are not consumed, for his compassions never fail.",
      quote: "Each day is a fresh start. God's mercies are renewed every morning."
    }]
  },
  "catastrophizing": {
    name: "Catastrophizing",
    description: "You expect the worst possible outcome.",
    verses: [{
      reference: "Matthew 6:34",
      text: "Therefore do not worry about tomorrow, for tomorrow will worry about itself.",
      quote: "God gives you strength for today. Don't borrow tomorrow's worries."
    }]
  },
  "fortune-telling": {
    name: "Fortune-Telling",
    description: "You predict negative outcomes as if they're facts.",
    verses: [{
      reference: "Jeremiah 29:11",
      text: "For I know the plans I have for you,' declares the Lord, 'plans to prosper you and not to harm you.",
      quote: "God has good plans for you. Trust in His timing and purpose."
    }]
  },
  "all-or-nothing": {
    name: "All-or-Nothing Thinking",
    description: "You see things in black and white categories.",
    verses: [{
      reference: "2 Corinthians 12:9",
      text: "But he said to me, 'My grace is sufficient for you, for my power is made perfect in weakness.'",
      quote: "You don't have to be perfect. God's grace covers your weaknesses."
    }]
  },
  "labeling": {
    name: "Labeling",
    description: "You attach negative labels to yourself.",
    verses: [{
      reference: "1 John 3:1",
      text: "See what great love the Father has lavished on us, that we should be called children of God!",
      quote: "You are a child of God, not defined by your mistakes. You are loved and valued."
    }]
  },
  "mind-reading": {
    name: "Mind-Reading",
    description: "You assume you know what others are thinking about you.",
    verses: [{
      reference: "1 Samuel 16:7",
      text: "The Lord does not look at the things people look at. People look at the outward appearance, but the Lord looks at the heart.",
      quote: "God sees your heart, not what others might think. Focus on His opinion of you."
    }]
  },
  "mental-filter": {
    name: "Mental Filter",
    description: "You focus exclusively on negative details.",
    verses: [{
      reference: "Philippians 4:8",
      text: "Finally, brothers and sisters, whatever is true, whatever is noble, whatever is right, whatever is pure, whatever is lovely, whatever is admirable—think about such things.",
      quote: "Focus on what's good and true. God has given you many blessings."
    }]
  },
  "comparison": {
    name: "Comparison Trap",
    description: "You constantly compare yourself to others.",
    verses: [{
      reference: "Psalm 139:14",
      text: "I praise you because I am fearfully and wonderfully made; your works are wonderful.",
      quote: "You are wonderfully made. Your worth doesn't come from comparison but from God."
    }]
  },
  "jumping-to-conclusions": {
    name: "Jumping to Conclusions",
    description: "You make negative interpretations without facts.",
    verses: [{
      reference: "Proverbs 18:13",
      text: "To answer before listening—that is folly and shame.",
      quote: "Take time to gather facts before making assumptions. Truth brings freedom."
    }]
  },
  "personalization": {
    name: "Personalization",
    description: "You believe everything others do is a reaction to you.",
    verses: [{
      reference: "Romans 12:3",
      text: "Do not think of yourself more highly than you ought, but rather think of yourself with sober judgment.",
      quote: "Not everything is about you. Others have their own struggles and concerns."
    }]
  },
  "wellness": {
    name: "Wellness Check",
    description: "You're taking time to reflect on your well-being. Continue nurturing your mind, body, and spirit.",
    verses: [{
      reference: "Jeremiah 29:11",
      text: "For I know the plans I have for you,' declares the Lord, 'plans to prosper you and not to harm you, plans to give you hope and a future.",
      quote: "God has wonderful plans for you. Keep taking care of yourself and trust in His guidance."
    }]
  }
};

const featureSteps = [
  {
    id: 1,
    title: "Daily Personalized Content",
    description: "Receive personalized daily words of encouragement and Bible verses tailored to your identified thinking patterns. Each morning, get verses and quotes specifically chosen to help you overcome your unique challenges and build resilience.",
    color: "purple",
    bgGradient: "from-purple-50 to-indigo-50",
    borderColor: "border-purple-200",
    circleColor: "bg-purple-600"
  },
  {
    id: 2,
    title: "CBT-Based Anxiety Quizzes",
    description: "Engage with interactive quizzes designed using Cognitive Behavioral Therapy principles. These quizzes help you identify thought patterns, challenge negative thinking, and develop healthier mental habits through Scripture-based exercises.",
    color: "blue",
    bgGradient: "from-blue-50 to-indigo-50",
    borderColor: "border-blue-200",
    circleColor: "bg-blue-600"
  },
  {
    id: 3,
    title: "Wellness Habit Tracking",
    description: "Track your daily habits that support mental wellness: water intake to stay hydrated, mood patterns and emotional check-ins, prayer and meditation time, physical activity and exercise, and sleep quality and rest patterns.",
    color: "green",
    bgGradient: "from-green-50 to-emerald-50",
    borderColor: "border-green-200",
    circleColor: "bg-green-600"
  },
  {
    id: 4,
    title: "Supportive Community",
    description: "Join a caring community of believers who understand your journey. Share experiences, receive encouragement, and offer support to others. Connect with people who are walking the same path toward peace and healing.",
    color: "amber",
    bgGradient: "from-amber-50 to-orange-50",
    borderColor: "border-amber-200",
    circleColor: "bg-amber-600"
  },
  {
    id: 5,
    title: "Dedicated Support Team",
    description: "Access our dedicated support team whenever you need guidance, encouragement, or someone to talk to. Our team is trained to provide biblical counseling and emotional support, ready to help you through difficult moments and celebrate your progress.",
    color: "pink",
    bgGradient: "from-pink-50 to-rose-50",
    borderColor: "border-pink-200",
    circleColor: "bg-pink-600"
  }
];

function EmotionalCheckInHero() {
  const navigate = useNavigate();
  const [sliderValue, setSliderValue] = useState(2.5);
  const [showWaterIntake, setShowWaterIntake] = useState(false);
  const [waterIntake, setWaterIntake] = useState(1500); // ml
  const [isDragging, setIsDragging] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showCognitiveRestructuring, setShowCognitiveRestructuring] = useState(false);
  const [showVerseCard, setShowVerseCard] = useState(false);
  const [showBibleGame, setShowBibleGame] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameAnswers, setGameAnswers] = useState<any>({});
  // Game-specific states
  const [match3Grid, setMatch3Grid] = useState<string[]>([]);
  const [selectedTiles, setSelectedTiles] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [collectedItems, setCollectedItems] = useState<string[]>([]);
  const [memoryFlipped, setMemoryFlipped] = useState<number[]>([]);
  const [memoryMatched, setMemoryMatched] = useState<string[]>([]);
  const [memoryCards, setMemoryCards] = useState<string[]>([]);
  const [puzzleTiles, setPuzzleTiles] = useState<string[]>([]);
  const [poppedBubbles, setPoppedBubbles] = useState<string[]>([]);
  const [runnerPosition, setRunnerPosition] = useState(0);
  const [runnerCollected, setRunnerCollected] = useState<string[]>([]);
  const [fallingBubbles, setFallingBubbles] = useState<FallingBubble[]>([]);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const lastSpawnTimeRef = useRef<number>(Date.now());
  const runnerPositionRef = useRef(0);
  const runnerCollectedRef = useRef<string[]>([]);
  const scoreRef = useRef(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showEncouragement, setShowEncouragement] = useState(false);
  const [thinkingTrap, setThinkingTrap] = useState<string | null>(null);
  const [selectedVerse, setSelectedVerse] = useState<any>(null);
  const [selectedEmotion, setSelectedEmotion] = useState<any>(null);
  const [showFeatures, setShowFeatures] = useState(false);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [cardDirection, setCardDirection] = useState<'left' | 'right' | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const glassRef = useRef<HTMLDivElement>(null);
  
  // Thought Record state
  const [isThoughtRecordOpen, setIsThoughtRecordOpen] = useState(false);
  const [thoughtRecordStep, setThoughtRecordStep] = useState(1);
  const [trStep1, setTrStep1] = useState('');
  const [trStep2, setTrStep2] = useState<{ emotion: string; intensity: number }[]>([
    { emotion: 'Anxious', intensity: 80 }
  ]);
  const [trStep3, setTrStep3] = useState('');
  const [trStep4, setTrStep4] = useState<string[]>([]);
  const [trStep5, setTrStep5] = useState('');
  const [trStep6, setTrStep6] = useState('');
  const [trStep7, setTrStep7] = useState<{ emotion: string; originalIntensity: number; newIntensity: number }[]>([]);

  const currentEmotionIndex = Math.round(sliderValue);
  const currentEmotion = emotionOptions[currentEmotionIndex];

  // Initialize step 7 (re-rate emotion) when entering step 3
  useEffect(() => {
    if (thoughtRecordStep === 3 && trStep7.length === 0 && trStep2.length > 0) {
      setTrStep7(trStep2.map(e => ({ emotion: e.emotion, originalIntensity: e.intensity, newIntensity: e.intensity })));
    }
  }, [thoughtRecordStep, trStep2, trStep7.length]);

  // Initialize Bible game states when game starts
  useEffect(() => {
    if (showBibleGame && !gameCompleted && !gameOver) {
      const game = getBibleGameActivity(selectedEmotion);
      // Reset all game states
      setMatches(0);
      setSelectedTiles([]);
      setCollectedItems([]);
      setMemoryFlipped([]);
      setMemoryMatched([]);
      setMemoryCards([]);
      setPoppedBubbles([]);
      setRunnerPosition(0);
      setRunnerCollected([]);
      setFallingBubbles([]);
      setScore(0);
      setGameOver(false);
      runnerPositionRef.current = 0;
      runnerCollectedRef.current = [];
      scoreRef.current = 0;
      lastSpawnTimeRef.current = Date.now();
      
      // Initialize match-3 grid
      if (game.type === 'match3') {
        const gridWords = [...game.words, ...game.words, ...game.words].slice(0, 9);
        setMatch3Grid(gridWords);
      }
      
      // Initialize puzzle tiles
      if (game.type === 'puzzle') {
        const text = game.puzzleText;
        const chars = text.split('').filter(c => c !== ' ');
        setPuzzleTiles([...chars, ''].sort(() => Math.random() - 0.5));
      }
      
      // Initialize memory cards
      if (game.type === 'memory') {
        const allCards = game.pairs.flat().sort(() => Math.random() - 0.5);
        setMemoryCards(allCards);
      }
    }
  }, [showBibleGame, gameCompleted, selectedEmotion]);

  // Map thinking trap IDs to distortion names
  const getDistortionName = (trapId: string | null): string => {
    const mapping: { [key: string]: string } = {
      'self-blame': 'Self-Blame',
      'overgeneralization': 'Overgeneralization',
      'catastrophizing': 'Catastrophizing',
      'fortune-telling': 'Fortune Telling',
      'all-or-nothing': 'All-or-Nothing Thinking',
      'labeling': 'Labeling',
      'mind-reading': 'Mind Reading',
      'mental-filter': 'Mental Filter',
      'comparison': 'Comparison',
      'jumping-to-conclusions': 'Jumping to Conclusions',
      'personalization': 'Personalization'
    };
    return trapId ? (mapping[trapId] || trapId) : '';
  };

  // Determine question set based on emotion and (for neutral) day of week
  const cbtQuestions = useMemo(() => {
    if (!selectedEmotion) return cbtQuestionsByEmotion.negative;

    const emotionId = selectedEmotion.id;
    if (emotionId === "very-anxious" || emotionId === "anxious" || emotionId === "stressed" || emotionId === "sad") {
      return cbtQuestionsByEmotion.negative;
    } else if (emotionId === "okay") {
      const dayIndex = new Date().getDay(); // 0 Sun ... 6 Sat
      const dayKey = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"][dayIndex];
      return cbtNeutralByDay[dayKey] || cbtNeutralByDay.sunday;
    } else {
      return cbtQuestionsByEmotion.positive;
    }
  }, [selectedEmotion]);

  useEffect(() => {
    const index = Math.round(sliderValue);
    setSelectedEmotion(emotionOptions[index]);
  }, [sliderValue]);

  // Reset question index and answers when emotion changes (before questions start)
  useEffect(() => {
    if (!showQuestions && selectedEmotion) {
      setCurrentQuestionIndex(0);
      setAnswers({});
    }
  }, [selectedEmotion, showQuestions]);

  const handleSliderConfirm = () => {
    // Ensure selectedEmotion is set based on current slider value
    const index = Math.round(sliderValue);
    const emotion = emotionOptions[index];
    setSelectedEmotion(emotion);
    
    // Reset question index when starting new session
    setCurrentQuestionIndex(0);
    setAnswers({});
    
    // Show water intake widget first
    setShowWaterIntake(true);
  };

  const handleWaterIntakeContinue = () => {
    // Save water intake to localStorage
    localStorage.setItem('waterIntake', JSON.stringify({
      amount: waterIntake,
      percentage: Math.round((waterIntake / 2250) * 100),
      date: new Date().toISOString()
    }));
    
    // Continue to questions after water intake
    setShowWaterIntake(false);
    setTimeout(() => {
      setShowQuestions(true);
    }, 100);
  };

  // Water intake drag handlers
  const maxWater = 2250; // ml (9 cups)
  const waterPercentage = (waterIntake / maxWater) * 100;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleMouseMoveRef = useRef<(e: MouseEvent | TouchEvent) => void>();
  handleMouseMoveRef.current = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !glassRef.current) return;
    
    const rect = glassRef.current.getBoundingClientRect();
    const clientY = 'touches' in e ? e.touches[0]?.clientY : e.clientY;
    if (clientY === undefined) return;
    
    const y = clientY - rect.top;
    const height = rect.height;
    const percentage = Math.max(0, Math.min(1, 1 - (y / height)));
    const newWater = Math.round(percentage * maxWater);
    setWaterIntake(newWater);
  };

  useEffect(() => {
    if (isDragging) {
      const handleMove = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        handleMouseMoveRef.current?.(e);
      };
      const handleEnd = () => {
        setIsDragging(false);
      };
      
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleMove, { passive: false });
      document.addEventListener('touchend', handleEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleEnd);
        document.removeEventListener('touchmove', handleMove);
        document.removeEventListener('touchend', handleEnd);
      };
    }
  }, [isDragging]);

  const handleQuestionAnswer = (questionId: number, optionIndex: number, direction: 'up' | 'down') => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const exitDirection = direction === 'up' ? 'right' : 'left';
    setCardDirection(exitDirection);
    
    const newAnswers = { ...answers, [questionId]: optionIndex };
    setAnswers(newAnswers);
    
    setTimeout(() => {
      if (currentQuestionIndex < cbtQuestions.length - 1) {
        // Reset card position to opposite side for entrance
        setCardDirection(exitDirection === 'right' ? 'left' : 'right');
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        
        // After a brief moment, animate card in
        setTimeout(() => {
          setCardDirection(null);
          setIsTransitioning(false);
        }, 50);
      } else {
        // Last question answered - analyze and show verse card
        analyzeThinkingTraps(newAnswers);
        setShowQuestions(false);
        setShowVerseCard(true);
        setIsTransitioning(false);
      }
    }, 400);
  };

  const analyzeThinkingTraps = (allAnswers: { [key: number]: number }) => {
    // Tailored analysis for neutral emotions based on the sum of all answers
    if (selectedEmotion?.id === "okay") {
      const answeredEntries = cbtQuestions
        .filter(q => allAnswers[q.id] !== undefined)
        .map(q => ({ question: q, optionIndex: allAnswers[q.id] }));

      const totalAnswered = answeredEntries.length;
      const yesItems = answeredEntries.filter(e => e.optionIndex === 0);
      const noItems = answeredEntries.filter(e => e.optionIndex === 1);
      const yesCount = yesItems.length;
      const noCount = noItems.length;

      const versePool = [
        {
          reference: "Jeremiah 29:11",
          text: "For I know the plans I have for you,' declares the Lord, 'plans to prosper you and not to harm you, plans to give you hope and a future.",
          quote: "God has good plans for you today. Take the next kind step."
        },
        {
          reference: "Philippians 4:13",
          text: "I can do all this through him who gives me strength.",
          quote: "You’re not alone—God strengthens you for what’s ahead."
        },
        {
          reference: "Psalm 139:14",
          text: "I praise you because I am fearfully and wonderfully made; your works are wonderful.",
          quote: "Treat yourself with the same care God has for you."
        }
      ];

      const pickVerse = () => versePool[Math.floor(Math.random() * versePool.length)];

      const sampleTexts = (arr: { question: any }[], n: number) =>
        arr.slice(0, n).map(e => `“${e.question.question}”`).join(' • ');

      let description: string;
      if (totalAnswered === 0) {
        description = "You're taking a healthy step by checking in. Keep nurturing your mind, body, and spirit today.";
      } else if (yesCount / totalAnswered >= 0.6) {
        const analysis = yesCount === totalAnswered 
          ? `Analysis: Your consistent responses indicate you're currently experiencing multiple areas of challenge simultaneously. This pattern suggests you may be facing heightened stress, emotional overwhelm, or a period of significant life transition. The areas you've identified point to underlying patterns that may benefit from structured support and self-compassion practices.`
          : `Analysis: Your response pattern reveals heightened awareness around specific challenges. This suggests you're in a phase of active self-reflection and may be experiencing increased sensitivity to stressors. The areas you've identified indicate where your emotional energy is currently focused and where targeted support could be most beneficial.`;
        description = analysis;
      } else if (noCount / totalAnswered >= 0.6) {
        const analysis = noCount === totalAnswered
          ? `Analysis: Your consistent responses reveal a pattern of emotional stability and resilience. This suggests you're currently in a grounded state, with healthy coping mechanisms in place. However, this pattern may also indicate a tendency to minimize or avoid acknowledging challenges. The areas where you responded may represent domains where you're maintaining boundaries or where you've developed effective strategies. Consider whether this steadiness reflects genuine wellness or if there are underlying concerns that might benefit from gentle exploration.`
          : `Analysis: Your response pattern indicates you're maintaining emotional equilibrium in most areas. This suggests you have effective coping strategies and are managing stress well. However, it's worth noting that consistently responding this way might also reflect a tendency to minimize challenges or avoid deeper self-examination. The areas you've identified suggest you're either well-resourced in these domains or may benefit from gentle self-inquiry to ensure you're not overlooking subtle signs of stress or unmet needs.`;
        description = analysis;
      } else {
        description = `Analysis: Your balanced responses reveal a nuanced self-awareness. This pattern suggests you're able to distinguish between areas of strength and areas needing attention—a sign of emotional intelligence. The mix indicates you're neither over-identifying with challenges nor denying them, which points to healthy self-reflection. This balanced perspective allows for targeted growth while maintaining appreciation for what's working well in your life.`;
      }

      const taskYes = "Read Philippians 4:6–7 and pray for 2 minutes, surrendering one worry.";
      const taskNo = "Read Psalm 23 slowly and thank God for one way He cared for you this week.";
      const taskBalanced = "Read Jeremiah 29:11 and journal one hope for this week.";

      const personalized = {
        name: "Wellness Insight",
        description,
        verses: [pickVerse()],
        task: totalAnswered === 0 ? taskBalanced : (yesCount / totalAnswered >= 0.6 ? taskYes : (noCount / totalAnswered >= 0.6 ? taskNo : taskBalanced))
      };

      thinkingTrapsInfo['wellness'] = personalized;
      setThinkingTrap('wellness');
      setSelectedVerse(personalized.verses[0]);
      // Verse card will be shown, then game will be triggered from there

      const checkInData = {
        emotion: selectedEmotion?.id,
        thinkingTrap: 'wellness',
        date: new Date().toISOString(),
        verse: personalized.verses[0].reference
      };
      localStorage.setItem('emotionalCheckIn', JSON.stringify(checkInData));
      localStorage.setItem('emotionalCheckInDate', new Date().toDateString());

      // Store detailed payload for the standalone page
      const detail = {
        emotion: selectedEmotion?.id,
        trapId: 'wellness',
        isWellness: true,
        insightName: personalized.name,
        insightDescription: personalized.description,
        insightTask: personalized.task,
        verseReference: personalized.verses[0].reference,
        verseText: personalized.verses[0].text,
        verseQuote: personalized.verses[0].quote
      };
      localStorage.setItem('emotionalCheckInDetail', JSON.stringify(detail));
      // Don't navigate immediately - show encouragement screen first
      return;
    }
    
    // Standard thinking trap analysis for negative/positive emotions
    const trapCounts: { [key: string]: number } = {};
    
    cbtQuestions.forEach((question) => {
      const answerIndex = allAnswers[question.id];
      if (answerIndex !== undefined && question.thinkingTraps[answerIndex]) {
        question.thinkingTraps[answerIndex].forEach(trap => {
          if (trap !== 'neutral') {
            trapCounts[trap] = (trapCounts[trap] || 0) + 1;
          }
        });
      }
    });

    const sortedTraps = Object.entries(trapCounts).sort((a, b) => b[1] - a[1]);
    const primaryTrap = sortedTraps.length > 0 ? sortedTraps[0][0] : 'self-blame';
    
    setThinkingTrap(primaryTrap);
    
    const trapInfo = thinkingTrapsInfo[primaryTrap];
    // Assign a small Bible-related task per trap (non-mutating fallback if already present)
    const trapTasks: { [key: string]: string } = {
      'self-blame': "Read Romans 8:1 and write down one thing you’re releasing to God today.",
      'overgeneralization': "Read Lamentations 3:22–23 and note one fresh mercy you see today.",
      'catastrophizing': "Read Matthew 6:34 and pray a one-sentence prayer for today only.",
      'fortune-telling': "Read Jeremiah 29:11 and list one hopeful outcome you can trust God with.",
      'all-or-nothing': "Read 2 Corinthians 12:9 and write one area to accept grace.",
      'labeling': "Read 1 John 3:1 and affirm: ‘I am a beloved child of God.’",
      'mind-reading': "Read 1 Samuel 16:7 and pray to see yourself and others as God does.",
      'mental-filter': "Read Philippians 4:8 and write three true and good things about today.",
      'comparison': "Read Psalm 139:14 and thank God for one unique gift He gave you.",
      'jumping-to-conclusions': "Read Proverbs 18:13 and choose one question to ask before deciding.",
      'personalization': "Read Romans 12:3 and reflect on one thing that isn’t about you."
    };
    if (!trapInfo.task) {
      thinkingTrapsInfo[primaryTrap] = { ...trapInfo, task: trapTasks[primaryTrap] || "Read a Psalm (e.g., Psalm 23) and write a one-sentence prayer." };
    }
    
    const randomVerse = trapInfo.verses[Math.floor(Math.random() * trapInfo.verses.length)];
    setSelectedVerse(randomVerse);
    
    // Verse card will be shown, then game will be triggered from there

    const checkInData = {
      emotion: selectedEmotion?.id,
      thinkingTrap: primaryTrap,
      date: new Date().toISOString(),
      verse: randomVerse.reference
    };
    localStorage.setItem('emotionalCheckIn', JSON.stringify(checkInData));
    localStorage.setItem('emotionalCheckInDate', new Date().toDateString());

    // Detailed payload for standalone page
    const detail = {
      emotion: selectedEmotion?.id,
      trapId: primaryTrap,
      isWellness: false,
      insightName: thinkingTrapsInfo[primaryTrap]?.name,
      insightDescription: thinkingTrapsInfo[primaryTrap]?.description,
      insightTask: thinkingTrapsInfo[primaryTrap]?.task,
      verseReference: randomVerse.reference,
      verseText: randomVerse.text,
      verseQuote: randomVerse.quote
    };
    localStorage.setItem('emotionalCheckInDetail', JSON.stringify(detail));
  };

  const handleContinueFromCognitiveRestructuring = () => {
    setShowCognitiveRestructuring(false);
    setShowBibleGame(true);
  };

  // Get Bible game activity based on emotion
  const getBibleGameActivity = (emotion: any) => {
    // Always return Joy Runner game for all emotions
    return {
      title: 'Joy Runner',
      description: 'Catch falling bubbles of joy and peace!',
      verse: emotion?.verses?.[0]?.text || 'May the God of hope fill you with all joy and peace as you trust in him.',
      reference: emotion?.verses?.[0]?.reference || 'Romans 15:13',
      type: 'runner',
      collectibles: ['Joy', 'Peace', 'Hope', 'Love', 'Faith'],
      targetCollect: 4,
      encouragement: 'Amazing! Your peace is a gift from God. Share it with others!'
    };
  };

  // Good words limited to 5 letters or less
  const allGoodWords = ['Joy', 'Hope', 'Love', 'Faith', 'Grace', 'Mercy', 'Peace', 'Trust', 'Truth', 'Light', 'Glory', 'Bless', 'Honor', 'Power', 'Cross', 'Heart', 'Unity', 'Serve', 'Share', 'Guide', 'Angel', 'Saint'];
  const goodWords = allGoodWords.filter(word => word.length <= 5);
  const sins = ['Pride', 'Envy', 'Wrath', 'Greed', 'Lust', 'Sloth', 'Lies', 'Hate', 'Fear', 'Anger', 'Doubt', 'Shame', 'Guilt'];

  // Keep refs in sync with state
  useEffect(() => {
    runnerPositionRef.current = runnerPosition;
  }, [runnerPosition]);

  useEffect(() => {
    runnerCollectedRef.current = runnerCollected;
  }, [runnerCollected]);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  // Game loop for falling bubbles
  useEffect(() => {
    if (!showBibleGame || gameCompleted || gameOver) return;

    let lastFrameTime = Date.now();

    const gameLoop = (currentTime: number) => {
      const deltaTime = currentTime - lastFrameTime;
      lastFrameTime = currentTime;
      
      const now = Date.now();
      
      // Calculate speed and density level based on score (every 10 points = +1 level)
      const speedLevel = Math.floor(scoreRef.current / 10);
      const speedMultiplier = 1 + (speedLevel * 0.3); // 30% speed increase per level
      const baseSpeed = 0.3 + Math.random() * 0.2; // Base speed: 0.3 to 0.5
      const finalSpeed = baseSpeed * speedMultiplier;
      
      // Spawn rate decreases (more bubbles) as level increases
      // Base: 1000-2000ms, Level 1: 800-1600ms, Level 2: 600-1200ms, etc.
      const baseSpawnMin = 1000;
      const baseSpawnMax = 2000;
      const spawnReduction = speedLevel * 200; // Reduce spawn time by 200ms per level
      const spawnMin = Math.max(300, baseSpawnMin - spawnReduction); // Minimum 300ms
      const spawnMax = Math.max(600, baseSpawnMax - spawnReduction); // Minimum 600ms
      const spawnInterval = spawnMin + Math.random() * (spawnMax - spawnMin);
      
      // Spawn bubbles more frequently as level increases
      if (now - lastSpawnTimeRef.current > spawnInterval) {
        // Spawn multiple bubbles at higher levels (1 bubble at level 0, 2 at level 1+, etc.)
        const bubblesToSpawn = 1 + Math.min(speedLevel, 2); // Max 3 bubbles at once
        
        for (let i = 0; i < bubblesToSpawn; i++) {
          const randomX = Math.floor(Math.random() * 4);
          const isGood = Math.random() > 0.55; // 45% chance of good, 55% chance of sin
          
          let newBubble: FallingBubble;
          
          if (isGood) {
            const randomItem = goodWords[Math.floor(Math.random() * goodWords.length)];
            newBubble = {
              id: `bubble-${Date.now()}-${Math.random()}-${i}`,
              item: randomItem,
              x: randomX,
              y: 0,
              speed: finalSpeed,
              collected: false,
              type: 'good'
            };
          } else {
            const randomSin = sins[Math.floor(Math.random() * sins.length)];
            newBubble = {
              id: `bubble-${Date.now()}-${Math.random()}-${i}`,
              item: randomSin,
              x: randomX,
              y: 0,
              speed: finalSpeed,
              collected: false,
              type: 'sin'
            };
          }
          
          setFallingBubbles(prev => [...prev, newBubble]);
        }
        
        lastSpawnTimeRef.current = now;
      }

      // Update bubble positions
      setFallingBubbles(prev => {
        return prev.map(bubble => {
          if (bubble.collected) return bubble;
          
          // Use consistent speed based on deltaTime (normalized to ~60fps)
          const normalizedSpeed = (deltaTime / 16.67) * bubble.speed;
          const newY = bubble.y + normalizedSpeed;
          
          // Calculate collision: bubble bottom touches runner top
          // Container is h-96 (384px), bubble is 48px (12.5%), runner is at bottom-16 (64px from bottom)
          // Runner bottom: 384px - 64px = 320px from top
          // Runner top: 320px - 48px (runner height) = 272px = ~71% from top
          // Runner center: ~77% from top
          // Bubble bottom = bubble.y + 12.5% (bubble height)
          // Bubble center = bubble.y + 6.25% (half bubble height)
          const bubbleBottom = newY + 12.5;
          const bubbleCenter = newY + 6.25;
          const runnerTop = 71; // Runner's top edge position (% from top)
          const runnerCenter = 77; // Runner's center position (% from top)
          const runnerBottom = 83; // Runner's bottom edge position (% from top)
          
          // Check collision: same x position
          if (bubble.x === runnerPositionRef.current && !bubble.collected) {
            // For good items: collect when bubble bottom touches runner top
            if (bubble.type === 'good' && bubbleBottom >= runnerTop && newY <= runnerTop + 5) {
              // Good item collected - increase score by 2 points
              const newScore = scoreRef.current + 2;
              scoreRef.current = newScore;
              setScore(newScore);
              
              if (!runnerCollectedRef.current.includes(bubble.item)) {
                const newCollected = [...runnerCollectedRef.current, bubble.item];
                runnerCollectedRef.current = newCollected;
                setRunnerCollected(newCollected);
              }
              
              return { ...bubble, collected: true, y: newY };
            }
            
            // For sins: require FULL connection - bubble center must be within runner's vertical bounds
            if (bubble.type === 'sin' && bubbleCenter >= runnerTop && bubbleCenter <= runnerBottom) {
              // Sin fully connected - game over!
              setGameOver(true);
              return { ...bubble, collected: true, y: newY };
            }
          }
          
          // Remove bubble only if it falls completely off screen (past 100%)
          if (newY > 100) {
            return null;
          }
          
          return { ...bubble, y: newY };
        }).filter((bubble): bubble is FallingBubble => bubble !== null);
      });

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [showBibleGame, gameCompleted, gameOver]);

  const handleContinueFromEncouragement = () => {
    setShowFeatures(true);
  };

  const handleNextFeature = () => {
    if (currentFeatureIndex < featureSteps.length - 1) {
      setCurrentFeatureIndex(currentFeatureIndex + 1);
    } else {
      // Last step - go to homepage
      setShowEncouragement(false);
      setShowQuestions(false);
      setShowFeatures(false);
      setSliderValue(2.5);
      setCurrentQuestionIndex(0);
      setCurrentFeatureIndex(0);
      setAnswers({});
      setThinkingTrap(null);
    }
  };


  // Features steps screen
  if (showFeatures && showEncouragement) {
    const currentFeature = featureSteps[currentFeatureIndex];
    
    return (
      <main className="relative flex flex-col items-center justify-center px-6 pt-12 md:pt-20 pb-8 overflow-hidden min-h-[calc(100vh-80px)] max-h-[100vh] bg-white">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="text-center max-w-3xl mx-auto relative z-10 w-full">
          <div className="bg-white rounded-lg border-2 border-gray-200 shadow-lg p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-urbanist font-semibold text-gray-900 mb-2">
                Your Journey to Peace
              </h2>
              <p className="text-sm font-urbanist font-light text-gray-500">
                Step {currentFeatureIndex + 1} of {featureSteps.length}
              </p>
            </div>
            
            <div className={`bg-gradient-to-br ${currentFeature.bgGradient} rounded-lg p-6 md:p-8 mb-6 border ${currentFeature.borderColor}`}>
              <div className="flex items-center justify-center mb-4">
                <div className={`w-16 h-16 rounded-full ${currentFeature.circleColor} text-white flex items-center justify-center font-urbanist font-semibold text-2xl`}>
                  {currentFeature.id}
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-urbanist font-semibold text-gray-900 mb-4">
                {currentFeature.title}
              </h3>
              <p className="text-sm md:text-base font-urbanist font-light text-gray-700 leading-relaxed">
                {currentFeature.description}
              </p>
            </div>

            {/* Progress indicator */}
            <div className="flex justify-center gap-2 mb-6">
              {featureSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index < currentFeatureIndex
                      ? `${currentFeature.circleColor} w-8`
                      : index === currentFeatureIndex
                      ? `${currentFeature.circleColor} w-8 opacity-60`
                      : 'bg-gray-200 w-2'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={handleNextFeature}
              className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-urbanist font-light text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 w-full md:w-auto"
            >
              {currentFeatureIndex < featureSteps.length - 1 ? 'Next' : 'Continue to Homepage'}
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
            </Button>
          </div>
        </div>
      </main>
    );
  }

  // Encouragement screen - REMOVED: Now goes directly to personalized-support after Cognitive Restructuring
  if (false && showEncouragement && selectedVerse && thinkingTrap && selectedEmotion && !showFeatures) {
    const trapInfo = thinkingTrapsInfo[thinkingTrap] || thinkingTrapsInfo['wellness'];
    const isWellness = thinkingTrap === 'wellness' || selectedEmotion?.id === 'okay';
    
    return (
      <main className="relative flex flex-col items-center justify-center px-6 pt-12 pb-8 overflow-hidden min-h-[calc(100vh-80px)] max-h-[100vh] bg-white">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="text-center max-w-3xl mx-auto relative z-10 w-full">
          <div className="bg-white rounded-lg border border-gray-200 shadow-xl p-8 md:p-10">
            {/* Header */}
            <div className="mb-8">
              {/* Thinking Pattern / Wellness Card */}
              <div className={`bg-gradient-to-br ${isWellness ? 'from-green-50 to-emerald-50 border-green-200' : 'from-purple-50 to-indigo-50 border-purple-200'} rounded-lg p-6 mb-6 border`}>
                <p className={`text-xs font-urbanist font-semibold ${isWellness ? 'text-green-600' : 'text-purple-600'} uppercase tracking-wider mb-3`}>
                  {isWellness ? 'Wellness Insight' : 'Thinking Pattern Identified'}
                </p>
                <h3 className="text-2xl md:text-3xl font-urbanist font-bold text-gray-900 mb-3">
                  {trapInfo?.name || 'Wellness Check'}
                </h3>
                <p className="text-sm md:text-base font-urbanist font-light text-gray-700 leading-relaxed">
                  {trapInfo?.description || "You're taking time to reflect on your well-being. Continue nurturing your mind, body, and spirit."}
                </p>
              </div>
            </div>
            
            {/* Bible Verse Card */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6 md:p-8 mb-8 border border-amber-200">
              <div className="mb-4">
                <p className="text-sm font-urbanist font-semibold text-amber-700 uppercase tracking-wider mb-2">
                  {selectedVerse.reference}
                </p>
                <div className="w-16 h-0.5 bg-amber-300 mx-auto mb-4"></div>
              </div>
              <p className="text-lg md:text-xl font-urbanist font-light text-gray-800 mb-6 italic leading-relaxed">
                "{selectedVerse.text}"
              </p>
              <div className="bg-white/60 rounded-lg p-4 border border-amber-200/50">
                <p className="text-sm md:text-base font-urbanist font-medium text-purple-700 leading-relaxed">
                  {selectedVerse.quote}
                </p>
              </div>
            </div>

            {/* Small Bible-related Task */}
            <div className={`rounded-lg p-5 md:p-6 mb-8 border ${isWellness ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' : 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200'}`}>
              <p className={`text-xs font-urbanist font-semibold ${isWellness ? 'text-green-700' : 'text-purple-700'} uppercase tracking-wider mb-2`}>
                Today's Faith Step
              </p>
              <p className="text-sm md:text-base font-urbanist font-medium text-gray-800 leading-relaxed">
                {trapInfo?.task || 'Read a short passage from the Psalms and write one sentence prayer in response.'}
              </p>
            </div>

            {/* CTA Button - Removed since Personalized Support page is removed */}
          </div>
        </div>
      </main>
    );
  }

  // Emotion selection screen (default)
  return (
    <main className={`relative flex flex-col items-center justify-center px-6 pb-8 overflow-hidden min-h-[calc(100vh-80px)] max-h-[100vh] bg-white ${showBibleGame ? 'pt-0' : 'pt-3 md:pt-12'}`}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Decorative accent lines */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50"></div>
      <div className="absolute bottom-20 right-1/4 w-24 h-px bg-gradient-to-l from-transparent via-gray-300 to-transparent opacity-50"></div>
      
      <div className={`text-center max-w-4xl mx-auto relative z-10 ${!showBibleGame ? 'mb-8' : ''}`}>
        {/* Subtitle */}
        {!showBibleGame && (
          <p className="text-sm font-urbanist font-light text-purple-600 uppercase tracking-wider mb-3 mt-0 md:mt-2">
            — How Are You Feeling Today? —
          </p>
        )}
        
        {/* Main Headline */}
        {!showVerseCard && !showBibleGame && (
          <h1 className="text-3xl md:text-5xl font-urbanist font-medium text-gray-700 mb-3 md:mb-4 leading-tight">
            Take a Moment to Check In
          </h1>
        )}
        
        {/* Soothing description */}
        {!showQuestions && !showWaterIntake && !showVerseCard && !showBibleGame && (
          <p className="text-base md:text-base font-urbanist font-light text-gray-500 mb-0 md:mb-1 max-w-xl mx-auto leading-relaxed">
            Breathe deeply. Let's explore how you're feeling today and find peace through God's word.
          </p>
        )}
        
        {/* Water intake description */}
        {showWaterIntake && !showQuestions && (
          <p className="text-base md:text-lg font-urbanist font-light text-gray-600 mb-0 md:mb-1 max-w-xl mx-auto leading-relaxed">
            How much water did you drink today?
          </p>
        )}
      </div>

              {/* Water Intake Screen */}
              {showWaterIntake && !showQuestions ? (
                <div className="w-full max-w-4xl mx-auto mb-6 md:mb-8 relative z-10">
                  <div className="bg-white rounded-lg p-6 md:p-8 shadow-lg border border-gray-200">
                    {/* Water Intake Label */}
                    <div className="mb-6 text-left">
                      <p className="text-base md:text-lg font-medium text-gray-600 flex items-center justify-start gap-2">
                        <Droplet className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
                        Water Intake
                      </p>
                    </div>
                    
                    {/* 2 Column Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 relative">
                      {/* Left Column: Animated Water Glass */}
                      <div className="flex justify-center items-center relative">
                        <div 
                          ref={glassRef}
                          className="relative w-32 h-48 md:w-40 md:h-56 cursor-pointer select-none touch-none"
                          onMouseDown={handleMouseDown}
                          onTouchStart={handleTouchStart}
                        >
                          {/* Glass outline */}
                          <svg 
                            className="absolute inset-0 w-full h-full"
                            viewBox="0 0 100 150"
                            preserveAspectRatio="none"
                          >
                            <path
                              d="M 20 10 L 20 140 Q 20 145 25 145 L 75 145 Q 80 145 80 140 L 80 10 Q 80 5 75 5 L 25 5 Q 20 5 20 10 Z"
                              fill="none"
                              stroke="#cbd5e1"
                              strokeWidth="2"
                            />
                            <ellipse cx="50" cy="10" rx="30" ry="3" fill="#e2e8f0" />
                          </svg>

                          {/* Water fill */}
                          <div 
                            className="absolute bottom-0 left-0 right-0 transition-all duration-500 ease-out overflow-hidden"
                            style={{
                              height: `${waterPercentage}%`,
                              background: `linear-gradient(to top, 
                                rgba(59, 130, 246, 0.9) 0%,
                                rgba(96, 165, 250, 0.8) 50%,
                                rgba(147, 197, 253, 0.7) 100%
                              )`,
                              clipPath: 'inset(0 20% 0 20% round 0 0 8px 8px)',
                            }}
                          >
                            <div 
                              className="absolute inset-0 opacity-30"
                              style={{
                                background: `repeating-linear-gradient(
                                  90deg,
                                  transparent,
                                  transparent 10px,
                                  rgba(255, 255, 255, 0.3) 10px,
                                  rgba(255, 255, 255, 0.3) 20px
                                )`,
                                animation: 'wave 3s linear infinite',
                              }}
                            />
                            <div className="absolute inset-0">
                              {[0, 1, 2, 3, 4].map((i) => (
                                <div
                                  key={i}
                                  className="absolute rounded-full bg-white/40"
                                  style={{
                                    width: `${4 + (i * 0.8)}px`,
                                    height: `${4 + (i * 0.8)}px`,
                                    left: `${25 + (i * 12)}%`,
                                    bottom: `${5 + (i * 5)}%`,
                                    animation: `bubble ${2 + (i * 0.4)}s ease-in-out infinite`,
                                    animationDelay: `${i * 0.5}s`,
                                  }}
                                />
                              ))}
                            </div>
                          </div>

                          {/* Small glasses next to the glass - Left side */}
                          {(() => {
                            const totalGlasses = Math.min(Math.ceil(waterIntake / 250), 9);
                            const leftGlasses = Math.ceil(totalGlasses / 2);
                            return (
                              <div 
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 md:-translate-x-16 flex flex-col gap-2 items-center z-10 pointer-events-none"
                              >
                                {Array.from({ length: leftGlasses }).map((_, i) => (
                                  <div
                                    key={i}
                                    className="w-6 h-8 md:w-8 md:h-10 rounded-b-lg border-2 border-blue-300 bg-blue-100/60 flex items-end justify-center overflow-hidden shadow-md"
                                    style={{
                                      animation: `glassAppear 0.3s ease-out ${i * 0.05}s both`,
                                    }}
                                  >
                                    <div 
                                      className="w-full bg-blue-400 transition-all duration-300"
                                      style={{ height: '85%' }}
                                    />
                                  </div>
                                ))}
                              </div>
                            );
                          })()}

                          {/* Small glasses next to the glass - Right side */}
                          {(() => {
                            const totalGlasses = Math.min(Math.ceil(waterIntake / 250), 9);
                            const rightGlasses = Math.floor(totalGlasses / 2);
                            return (
                              <div 
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 md:translate-x-16 flex flex-col gap-2 items-center z-10 pointer-events-none"
                              >
                                {Array.from({ length: rightGlasses }).map((_, i) => (
                                  <div
                                    key={i}
                                    className="w-6 h-8 md:w-8 md:h-10 rounded-b-lg border-2 border-blue-300 bg-blue-100/60 flex items-end justify-center overflow-hidden shadow-md"
                                    style={{
                                      animation: `glassAppear 0.3s ease-out ${i * 0.05}s both`,
                                    }}
                                  >
                                    <div 
                                      className="w-full bg-blue-400 transition-all duration-300"
                                      style={{ height: '85%' }}
                                    />
                                  </div>
                                ))}
                              </div>
                            );
                          })()}

                          {isDragging && (
                            <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded shadow-lg">
                              {waterIntake}ml
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right Column: Details */}
                      <div className="flex flex-col justify-center">
                        <div className="mb-4">
                          <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                            {waterIntake}ml <span className="text-lg md:text-xl font-normal text-gray-500 relative" style={{ top: '-4px' }}>({Math.round(waterPercentage)}% completed)</span>
                          </p>
                          <p className="text-base text-gray-600 mb-4">
                            {Math.round(waterIntake / 250)} cups
                          </p>
                          
                          {/* Progress bar */}
                          <div className="w-full bg-gray-100 rounded-full h-2.5 mb-2">
                            <div 
                              className="bg-gradient-to-r from-blue-400 to-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                              style={{ width: `${waterPercentage}%` }}
                            />
                          </div>
                          
                          <p className="text-sm text-gray-500">
                            {Math.round(waterPercentage)}% of daily goal (2250ml / 9 cups)
                          </p>
                        </div>

                        {/* Water Intake Information */}
                        <div className="hidden md:block bg-blue-50 rounded-lg p-4 border border-blue-100">
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">Daily Water Recommendations</h4>
                          <ul className="text-xs text-gray-700 space-y-1.5">
                            <li className="flex items-start gap-2">
                              <span className="text-blue-500 mt-0.5">•</span>
                              <span>Average adult: <strong>2,000-3,000ml</strong> (8-12 cups) per day</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-blue-500 mt-0.5">•</span>
                              <span>Staying hydrated supports mental clarity and emotional wellness</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Continue Button */}
                    <div className="flex justify-center">
                      <Button
                        onClick={handleWaterIntakeContinue}
                        className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-urbanist font-light text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                      >
                        Continue
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                      </Button>
                    </div>

                    <style>{`
                      @keyframes wave {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(20px); }
                      }
                      @keyframes bubble {
                        0%, 100% { transform: translateY(0) scale(1); opacity: 0.4; }
                        50% { transform: translateY(-10px) scale(1.2); opacity: 0.8; }
                      }
                      @keyframes glassAppear {
                        0% { 
                          opacity: 0; 
                          transform: translateY(10px) scale(0.8); 
                        }
                        100% { 
                          opacity: 1; 
                          transform: translateY(0) scale(1); 
                        }
                      }
                    `}</style>
                  </div>
                </div>
              ) : showQuestions && cbtQuestions.length > 0 ? (
              /* Show Questions - Unique Modern UI */
                <div className="w-full max-w-2xl mx-auto mb-6 md:mb-8 relative z-10">
                  {/* Question Card with Modern Design */}
                  <div 
                    className={`relative rounded-xl border-2 border-gray-200 shadow-2xl overflow-hidden transition-all duration-500 ease-out ${
                      cardDirection === 'left' ? 'translate-x-[-120%] opacity-0 scale-95' :
                      cardDirection === 'right' ? 'translate-x-[120%] opacity-0 scale-95' :
                      'translate-x-0 opacity-100 scale-100'
                    }`}
                    style={{ 
                      minHeight: '300px',
                      backgroundImage: `url(${cbtQuestions[Math.min(currentQuestionIndex, cbtQuestions.length - 1)]?.backgroundImage || '/assets/cbt/unsplash_eca07ce68773.jpg'})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                    {/* Dark Calming Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-indigo-900/70 to-purple-800/70"></div>
                    
                    {/* Additional Soft Gradient Layer */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-purple-900/30"></div>
                    
                    {/* Content */}
                    <div className="relative z-10 p-6 md:p-8 flex flex-col h-full min-h-[300px]">
                      {/* Question Text */}
                      <div className="flex-1 flex items-center justify-center">
                        <h3 className="text-2xl md:text-3xl lg:text-2xl font-normal text-white text-center leading-tight drop-shadow-2xl">
                          {cbtQuestions[Math.min(currentQuestionIndex, cbtQuestions.length - 1)]?.question || 'Loading...'}
                        </h3>
                      </div>

                      {/* Answer Buttons */}
                      <div className="mt-8 flex items-center justify-center gap-4">
                        {/* Yes Button */}
                        <button
                          onClick={() => {
                            const optionIndex = 0;
                            const safeIndex = Math.min(currentQuestionIndex, cbtQuestions.length - 1);
                            handleQuestionAnswer(cbtQuestions[safeIndex]?.id || 0, optionIndex, 'up');
                          }}
                          disabled={isTransitioning}
                          className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-urbanist font-light text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Yes</span>
                        </button>
                        
                        {/* No Button */}
                        <button
                          onClick={() => {
                            const optionIndex = 1;
                            const safeIndex = Math.min(currentQuestionIndex, cbtQuestions.length - 1);
                            handleQuestionAnswer(cbtQuestions[safeIndex]?.id || 0, optionIndex, 'down');
                          }}
                          disabled={isTransitioning}
                          className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-urbanist font-light text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span>No</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* CSS Animations */}
                  <style>{`
                    @keyframes patternMove {
                      0% { transform: translate(0, 0); }
                      100% { transform: translate(30px, 30px); }
                    }
                  `}</style>
                </div>
      ) : showVerseCard && selectedVerse ? (
        /* Verse Card - Transition before game */
        <div className="w-full max-w-2xl mx-auto mb-6 md:mb-8 relative z-10 -mt-8 md:-mt-12">
          <div 
            className="relative rounded-xl border-2 border-gray-200 shadow-2xl overflow-hidden transition-all duration-500 ease-out"
            style={{ 
              minHeight: '400px',
              backgroundImage: `url(${cbtQuestions[0]?.backgroundImage || '/assets/cbt/unsplash_eca07ce68773.jpg'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Dark Calming Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-indigo-900/70 to-purple-800/70"></div>
            
            {/* Additional Soft Gradient Layer */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-purple-900/30"></div>
            
            {/* Content */}
            <div className="relative z-10 p-6 md:p-8 flex flex-col h-full min-h-[400px] items-center justify-center">
              {/* Mood Line */}
              {selectedEmotion && (
                <div className="mb-4">
                  <p className="text-lg md:text-xl font-normal text-purple-200 text-center">
                    You're feeling {selectedEmotion.label} today
                  </p>
                </div>
              )}
              
              {/* Encouragement Line */}
              {selectedEmotion && (
                <div className="mb-6">
                  {selectedEmotion.id === "very-anxious" || selectedEmotion.id === "stressed" || selectedEmotion.id === "sad" ? (
                    <p className="text-lg md:text-xl lg:text-2xl text-purple-100 text-center font-normal italic">
                      Remember, God is with you in this moment, and there is hope ahead.
                    </p>
                  ) : selectedEmotion.id === "good" || selectedEmotion.id === "great" ? (
                    <p className="text-lg md:text-xl lg:text-2xl text-purple-100 text-center font-normal italic">
                      Rejoice in this moment of peace and let God's joy fill your heart.
                    </p>
                  ) : (
                    <p className="text-lg md:text-xl lg:text-2xl text-purple-100 text-center font-normal italic">
                      God has wonderful plans for you, even in the ordinary moments.
                    </p>
                  )}
                </div>
              )}
              
              {/* Verse Reference */}
              <div className="mb-4">
                <p className="text-lg md:text-xl font-normal text-purple-200 text-center">
                  {selectedVerse.reference}
                </p>
              </div>
              
              {/* Verse Text */}
              <div className="mb-6">
                <p className="text-lg md:text-xl lg:text-lg font-normal text-white text-center leading-relaxed drop-shadow-2xl">
                  "{selectedVerse.text}"
                </p>
              </div>
              
              {/* Continue Button */}
              <Button
                onClick={() => {
                  setShowVerseCard(false);
                  setShowBibleGame(true);
                }}
                className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-urbanist font-light text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                Let's play a bible game
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      ) : showBibleGame ? (
        (() => {
          const game = getBibleGameActivity(selectedEmotion);
          const emotion = selectedEmotion || emotionOptions[2];
          
          return (
            <div className="w-full max-w-4xl mx-auto mb-6 md:mb-8 relative z-10">
              <div className="bg-white rounded-lg p-6 md:p-8 shadow-lg border border-gray-200">
                {/* Game Content */}
                {gameOver ? (
                  /* Game Over Screen */
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center shadow-lg">
                      <span className="text-4xl">💀</span>
                    </div>
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <h3 className="text-2xl font-urbanist font-semibold text-gray-900 mb-3">Game Over!</h3>
                      <p className="text-base font-urbanist font-light text-gray-700 leading-relaxed mb-4">
                        You touched a sin! Avoid the red bubbles and collect only the good words.
                      </p>
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
                        <p className="text-sm font-urbanist font-semibold text-gray-600 mb-1">Final Score</p>
                        <p className="text-3xl font-urbanist font-bold text-gray-900">{score}</p>
                      </div>
                    </div>
                    <div className="flex justify-center mb-4 md:mb-6 relative z-10">
                      <Button
                        onClick={() => navigate("/signup-today")}
                        className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-urbanist font-light text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                      >
                        Continue
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                      </Button>
                    </div>
                  </div>
                ) : !gameCompleted ? (
                  <div className="space-y-6">
                    {/* Game Type: Match-3 (Candy Crush style) */}
                    {game.type === 'match3' && (
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border-2 border-blue-200">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-bold text-gray-900">Match 3 Words</h3>
                          <div className="bg-white px-4 py-2 rounded-full border-2 border-blue-300">
                            <span className="text-sm font-bold text-blue-600">Matches: {matches} / {game.targetMatches}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          {match3Grid.map((word: string, index: number) => (
                            <button
                              key={index}
                              onClick={() => {
                                if (selectedTiles.includes(index)) {
                                  setSelectedTiles(selectedTiles.filter(i => i !== index));
                                } else if (selectedTiles.length < 3) {
                                  const newSelected = [...selectedTiles, index];
                                  setSelectedTiles(newSelected);
                                  if (newSelected.length === 3) {
                                    const selectedWords = newSelected.map(i => match3Grid[i]);
                                    const uniqueWords = new Set(selectedWords);
                                    if (uniqueWords.size === 1) {
                                      const newMatches = matches + 1;
                                      setMatches(newMatches);
                                      setSelectedTiles([]);
                                      if (newMatches >= game.targetMatches) {
                                        setTimeout(() => setGameCompleted(true), 500);
                                      }
                                    } else {
                                      setTimeout(() => setSelectedTiles([]), 500);
                                    }
                                  }
                                }
                              }}
                              className={`aspect-square rounded-xl border-2 transition-all transform hover:scale-105 flex items-center justify-center ${
                                selectedTiles.includes(index)
                                  ? 'border-blue-500 bg-blue-200 scale-110 shadow-lg'
                                  : 'border-gray-300 bg-white hover:border-blue-300'
                              }`}
                            >
                              <span className="text-xs font-bold text-gray-700">{word}</span>
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 text-center mb-4">Click 3 matching words in a row to make a match!</p>
                      </div>
                    )}

                    {/* Game Type: Collector (Mario style) */}
                    {game.type === 'collector' && (
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border-2 border-green-200">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-bold text-gray-900">Collect Items</h3>
                          <div className="bg-white px-4 py-2 rounded-full border-2 border-green-300">
                            <span className="text-sm font-bold text-green-600">Collected: {collectedItems.length} / {game.targetItems}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-5 gap-3 mb-4">
                          {game.items.map((item: string, index: number) => (
                            <button
                              key={index}
                              onClick={() => {
                                if (!collectedItems.includes(item)) {
                                  const newCollected = [...collectedItems, item];
                                  setCollectedItems(newCollected);
                                  if (newCollected.length >= game.targetItems) {
                                    setTimeout(() => setGameCompleted(true), 500);
                                  }
                                }
                              }}
                              className={`aspect-square rounded-xl border-2 transition-all transform hover:scale-110 ${
                                collectedItems.includes(item)
                                  ? 'border-green-500 bg-green-200 scale-110 shadow-lg'
                                  : 'border-gray-300 bg-white hover:border-green-300 animate-bounce'
                              }`}
                            >
                              <span className="text-xs font-bold text-gray-700">{item}</span>
                              {collectedItems.includes(item) && (
                                <span className="absolute inset-0 flex items-center justify-center text-green-600 text-2xl">✓</span>
                              )}
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 text-center">Click items to collect them!</p>
                      </div>
                    )}

                    {/* Game Type: Memory Match */}
                    {game.type === 'memory' && (
                      <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg p-6 border-2 border-pink-200">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-bold text-gray-900">Memory Match</h3>
                          <div className="bg-white px-4 py-2 rounded-full border-2 border-pink-300">
                            <span className="text-sm font-bold text-pink-600">Matched: {memoryMatched.length / 2} / {game.pairs.length}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-3 mb-4">
                          {memoryCards.map((card: string, index: number) => {
                            const isFlipped = memoryFlipped.includes(index) || memoryMatched.includes(card);
                            return (
                              <button
                                key={index}
                                onClick={() => {
                                  if (memoryFlipped.length < 2 && !isFlipped) {
                                    const newFlipped = [...memoryFlipped, index];
                                    setMemoryFlipped(newFlipped);
                                    if (newFlipped.length === 2) {
                                      const [first, second] = newFlipped;
                                      const firstCard = memoryCards[first];
                                      const secondCard = memoryCards[second];
                                      const isPair = game.pairs.some(pair => 
                                        (pair[0] === firstCard && pair[1] === secondCard) ||
                                        (pair[0] === secondCard && pair[1] === firstCard)
                                      );
                                      if (isPair) {
                                        const newMatched = [...memoryMatched, firstCard, secondCard];
                                        setMemoryMatched(newMatched);
                                        if (newMatched.length >= game.pairs.length * 2) {
                                          setTimeout(() => setGameCompleted(true), 500);
                                        }
                                      }
                                      setTimeout(() => setMemoryFlipped([]), 1000);
                                    }
                                  }
                                }}
                                className={`aspect-square rounded-xl border-2 transition-all transform flex items-center justify-center ${
                                  isFlipped
                                    ? 'border-pink-500 bg-pink-100'
                                    : 'border-gray-300 bg-gray-200 hover:border-pink-300'
                                }`}
                              >
                                {isFlipped ? (
                                  <span className="text-xs font-bold text-gray-700">{card}</span>
                                ) : (
                                  <span className="text-2xl">❓</span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                        <p className="text-xs text-gray-500 text-center">Click cards to find matching pairs!</p>
                      </div>
                    )}

                    {/* Game Type: Puzzle (Sliding puzzle) */}
                    {game.type === 'puzzle' && (
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6 border-2 border-amber-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Slide Puzzle</h3>
                        <div className="grid grid-cols-4 gap-2 mb-4 max-w-xs mx-auto">
                          {puzzleTiles.map((char: string, index: number) => (
                            <div
                              key={index}
                              className={`aspect-square rounded-lg border-2 flex items-center justify-center ${
                                char === '' ? 'bg-gray-300 border-gray-400' : 'bg-white border-amber-300'
                              }`}
                            >
                              <span className="text-sm font-bold text-gray-700">{char}</span>
                            </div>
                          ))}
                        </div>
                        <Button
                          onClick={() => setGameCompleted(true)}
                          className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
                        >
                          Puzzle Complete! ✓
                        </Button>
                      </div>
                    )}

                    {/* Game Type: Bubble Pop */}
                    {game.type === 'bubble' && (
                      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-6 border-2 border-teal-200">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-bold text-gray-900">Pop Bubbles</h3>
                          <div className="bg-white px-4 py-2 rounded-full border-2 border-teal-300">
                            <span className="text-sm font-bold text-teal-600">Popped: {poppedBubbles.length} / {game.targetBubbles}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-3 mb-4 justify-center">
                          {game.bubbles.map((bubble: string, index: number) => (
                            <button
                              key={index}
                              onClick={() => {
                                if (!poppedBubbles.includes(bubble)) {
                                  const newPopped = [...poppedBubbles, bubble];
                                  setPoppedBubbles(newPopped);
                                  if (newPopped.length >= game.targetBubbles) {
                                    setTimeout(() => setGameCompleted(true), 500);
                                  }
                                }
                              }}
                              className={`w-20 h-20 rounded-full border-2 transition-all transform hover:scale-110 ${
                                poppedBubbles.includes(bubble)
                                  ? 'bg-teal-200 border-teal-400 scale-90 opacity-50'
                                  : 'bg-gradient-to-br from-teal-200 to-cyan-200 border-teal-400 hover:scale-125 animate-pulse'
                              }`}
                            >
                              {poppedBubbles.includes(bubble) ? (
                                <span className="text-2xl">✓</span>
                              ) : (
                                <span className="text-xs font-bold text-gray-700">{bubble}</span>
                              )}
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 text-center">Click bubbles to pop them!</p>
                      </div>
                    )}

                    {/* Game Type: Runner (Mario style) */}
                    {game.type === 'runner' && (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-urbanist font-semibold text-gray-900">Joy Runner</h3>
                          <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                            <span className="text-sm font-urbanist font-semibold text-gray-700">
                              Score: {score}
                            </span>
                          </div>
                        </div>
                        
                        {/* Game Area */}
                        <div 
                          ref={gameAreaRef}
                          className="relative bg-gradient-to-b from-sky-200 to-blue-300 rounded-lg p-4 mb-4 overflow-hidden"
                          style={{ minHeight: '400px' }}
                        >
                          {/* Ground/Platform */}
                          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-green-400 to-green-300 border-t-2 border-green-500 z-20"></div>
                          
                          {/* Runner character */}
                          <div 
                            className="absolute bottom-16 text-3xl md:text-4xl lg:text-5xl transition-all duration-200 z-30"
                            style={{ 
                              left: `${12.5 + runnerPosition * 25}%`,
                              transform: 'translateX(-50%)'
                            }}
                          >
                            🏃
                          </div>
                          
                          {/* Falling Bubbles */}
                          {fallingBubbles.map((bubble) => {
                            const bubbleLeft = `${12.5 + bubble.x * 25}%`;
                            const isSin = bubble.type === 'sin';
                            
                            return (
                              <div
                                key={bubble.id}
                                className={`absolute w-12 h-12 rounded-full border-2 flex items-center justify-center z-10 ${
                                  bubble.collected
                                    ? 'opacity-0 scale-0 transition-all duration-300'
                                    : isSin
                                    ? 'opacity-100 scale-100 bg-gradient-to-br from-red-500 to-red-600 border-red-700 shadow-lg'
                                    : 'opacity-100 scale-100 bg-gradient-to-br from-violet-300 to-purple-400 border-violet-600 shadow-lg'
                                }`}
                                style={{
                                  left: bubbleLeft,
                                  top: `${bubble.y}%`,
                                  transform: 'translateX(-50%)',
                                  transition: bubble.collected ? 'opacity 0.3s, transform 0.3s' : 'none'
                                }}
                              >
                                <span className="text-xs font-bold text-white">{bubble.item}</span>
                              </div>
                            );
                          })}
                          
                          {/* Clouds for decoration */}
                          <div className="absolute top-4 left-10 w-16 h-8 bg-white/30 rounded-full opacity-60 z-0"></div>
                          <div className="absolute top-8 right-20 w-20 h-10 bg-white/30 rounded-full opacity-60 z-0"></div>
                        </div>
                        
                        {/* Controls */}
                        <div className="flex gap-2 justify-center">
                          <Button
                            onClick={() => setRunnerPosition(Math.max(0, runnerPosition - 1))}
                            className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-urbanist font-light text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={runnerPosition === 0}
                          >
                            ← Move Left
                          </Button>
                          <Button
                            onClick={() => setRunnerPosition(Math.min(3, runnerPosition + 1))}
                            className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-urbanist font-light text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={runnerPosition === 3}
                          >
                            Move Right →
                          </Button>
                        </div>
                        
                        <p className="text-xs font-urbanist font-light text-gray-500 text-center">
                          Move the runner left/right to catch good bubbles (purple) and avoid sins (red)! 
                          <br />
                          <span className="text-red-600 font-semibold">Red bubbles = Game Over!</span>
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Completion Screen */
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
                      <CheckCircle className="w-12 h-12 text-white" />
                    </div>
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <h3 className="text-xl font-urbanist font-semibold text-gray-900 mb-3">🎉 Activity Complete!</h3>
                      <p className="text-base font-urbanist font-light text-gray-700 leading-relaxed">{game.encouragement}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <p className="text-sm font-urbanist font-semibold text-gray-600 mb-2">{game.reference}</p>
                      <p className="text-base font-urbanist font-light text-gray-700 italic leading-relaxed">{game.verse}</p>
                    </div>
                    <div className="flex justify-center mb-4 md:mb-6 relative z-10">
                      <Button
                        onClick={() => {
                          setShowBibleGame(false);
                          setGameCompleted(false);
                          setGameAnswers({});
                          // Reset to home/initial state
                          setShowQuestions(false);
                          setShowWaterIntake(false);
                          setSliderValue(2.5);
                          setCurrentQuestionIndex(0);
                          setAnswers({});
                          setShowEncouragement(false);
                          setThinkingTrap(null);
                          setSelectedVerse(null);
                          setSelectedEmotion(null);
                        }}
                        className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-urbanist font-light text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                      >
                        Return Home
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })()
      ) : !showWaterIntake ? (
        <>
          {/* Emotion Display */}
          <div className="w-full max-w-2xl mx-auto mb-6 md:mb-8 relative z-10">
            <div className={`${currentEmotion.bgColor} rounded-lg p-6 md:p-8 transition-all duration-300`}>
              <div className="flex flex-col items-center justify-center">
                <div className="mb-4 transition-all duration-300">
                  {currentEmotion.image ? (
                    <img 
                      src={currentEmotion.image} 
                      alt={currentEmotion.label}
                      className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain"
                    />
                  ) : (
                    <div className="text-7xl md:text-6xl lg:text-7xl">{currentEmotion.emoji}</div>
                  )}
                </div>
                <h3 className={`text-2xl md:text-3xl font-urbanist font-semibold ${currentEmotion.color} mb-2`}>
                  {currentEmotion.label}
                </h3>
              </div>
            </div>
          </div>

          {/* Slider */}
          <div className="w-full max-w-2xl mx-auto mb-6 md:mb-8 relative z-10">
            <div className="relative px-2">
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={sliderValue}
                  onChange={(e) => setSliderValue(parseFloat(e.target.value))}
                  className="w-full h-3 md:h-4 bg-transparent rounded-full appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, 
                      #f97316 0%, 
                      #ef4444 25%, 
                      #6b7280 40%, 
                      #3b82f6 60%, 
                      #22c55e 85%, 
                      #22c55e 100%)`
                  }}
                />
                <style>{`
                  .slider {
                    background: linear-gradient(to right, 
                      #f97316 0%, 
                      #ef4444 25%, 
                      #6b7280 40%, 
                      #3b82f6 60%, 
                      #22c55e 85%, 
                      #22c55e 100%);
                    height: 8px;
                    border-radius: 9999px;
                    outline: none;
                  }
                  .slider::-webkit-slider-runnable-track {
                    width: 100%;
                    height: 8px;
                    border-radius: 9999px;
                    background: linear-gradient(to right, 
                      #f97316 0%, 
                      #ef4444 25%, 
                      #6b7280 40%, 
                      #3b82f6 60%, 
                      #22c55e 85%, 
                      #22c55e 100%);
                    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
                  }
                  .slider::-webkit-slider-thumb {
                    appearance: none;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #7b7ff0 0%, #6366f1 100%);
                    cursor: pointer;
                    border: 4px solid white;
                    box-shadow: 0 2px 8px rgba(123, 127, 240, 0.4), 0 4px 12px rgba(123, 127, 240, 0.2);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    margin-top: -8px;
                  }
                  .slider::-webkit-slider-thumb:hover {
                    transform: scale(1.15);
                    box-shadow: 0 4px 12px rgba(123, 127, 240, 0.5), 0 6px 16px rgba(123, 127, 240, 0.3);
                    background: linear-gradient(135deg, #6366f1 0%, #7b7ff0 100%);
                  }
                  .slider::-webkit-slider-thumb:active {
                    transform: scale(1.1);
                    box-shadow: 0 2px 6px rgba(123, 127, 240, 0.6);
                  }
                  .slider::-moz-range-track {
                    width: 100%;
                    height: 8px;
                    border-radius: 9999px;
                    background: linear-gradient(to right, 
                      #f97316 0%, 
                      #ef4444 25%, 
                      #6b7280 40%, 
                      #3b82f6 60%, 
                      #22c55e 85%, 
                      #22c55e 100%);
                    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
                    border: none;
                  }
                  .slider::-moz-range-thumb {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #7b7ff0 0%, #6366f1 100%);
                    cursor: pointer;
                    border: 4px solid white;
                    box-shadow: 0 2px 8px rgba(123, 127, 240, 0.4), 0 4px 12px rgba(123, 127, 240, 0.2);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                  }
                  .slider::-moz-range-thumb:hover {
                    transform: scale(1.15);
                    box-shadow: 0 4px 12px rgba(123, 127, 240, 0.5), 0 6px 16px rgba(123, 127, 240, 0.3);
                  }
                  .slider::-moz-range-thumb:active {
                    transform: scale(1.1);
                  }
                `}</style>
              </div>
            </div>
            
            <div className="flex justify-between mt-4 text-xs md:text-sm font-urbanist font-light text-gray-500">
              <span>Very Anxious</span>
              <span>Great/Peaceful</span>
            </div>
            
            <p className="text-xs md:text-sm font-urbanist font-light text-gray-500 text-center mt-2 md:mt-3">
              Move the slider above to adjust how you're feeling
            </p>
          </div>

          {/* Confirm Button */}
          <div className="flex justify-center mb-4 md:mb-6 relative z-10">
            <Button
              onClick={handleSliderConfirm}
              className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-urbanist font-light text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              Continue with This Feeling
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
            </Button>
          </div>
        </>
      ) : null}
    </main>
  );
}

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showGuestComplete, setShowGuestComplete] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof publicPages>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    place: "",
    feedback: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('guestCompleted') === '1') {
      setShowGuestComplete(true);
      // clean URL
      const url = new URL(window.location.href);
      url.searchParams.delete('guestCompleted');
      window.history.replaceState({}, '', url.toString());
    }
  }, [location.search]);

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      const filtered = publicPages.filter(page => 
        page.title.toLowerCase().includes(query) ||
        page.category.toLowerCase().includes(query) ||
        page.path.toLowerCase().includes(query)
      );
      setSearchResults(filtered);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchQuery]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSelect = (path: string) => {
    navigate(path);
    setSearchQuery("");
    setShowSearchResults(false);
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Save feedback directly to Supabase database
      // Verify table is accessible first (helps refresh PostgREST schema if needed)
      const { error: checkError } = await supabase
        .from('feedback')
        .select('id')
        .limit(1);
      
      if (checkError && checkError.code === '42P01') {
        throw new Error('Feedback table does not exist. Please run the create-feedback-table.sql migration in Supabase SQL Editor.');
      }

      // Now insert the feedback
      const { data: feedbackData, error: dbError } = await supabase
        .from('feedback')
        .insert([
          {
            name: feedbackForm.name.trim(),
            place: feedbackForm.place.trim(),
            feedback: feedbackForm.feedback.trim()
          }
        ])
        .select();

      if (dbError) {
        console.error('Database error details:', {
          code: dbError.code,
          message: dbError.message,
          details: dbError.details,
          hint: dbError.hint,
          fullError: dbError
        });
        
        // Provide helpful error message based on error type
        if (dbError.code === '42P01') {
          throw new Error('Feedback table does not exist. Please run the create-feedback-table.sql migration in Supabase SQL Editor.');
        } else if (dbError.code === '42501') {
          throw new Error('Permission denied. Please check Row Level Security policies for the feedback table. Make sure the "Allow public insert for feedback" policy exists.');
        } else if (dbError.code === '23505') {
          throw new Error('Duplicate entry. This feedback may have already been submitted.');
        } else {
          // Handle cases where message might be undefined - use details or hint as fallback
          const errorMessage = dbError.message || dbError.details || dbError.hint || `Error code: ${dbError.code}` || 'Unknown database error';
          throw new Error(`Database error: ${errorMessage}`);
        }
      }

      // Success - reset form and close dialog
      setFeedbackForm({ name: "", place: "", feedback: "" });
      setShowFeedbackDialog(false);
      setIsSubmitting(false);
      alert('Thank you for your feedback! We\'ll get back to you soon.');
      
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setIsSubmitting(false);
      alert(`Failed to submit feedback: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again later.`);
    }
  };

  // Removed auto-redirect to emotional check-in and dashboard/admin on load

  // Load Tidio Chat Widget
  useEffect(() => {
    // Function to hide Tidio welcome message
    const hideTidioWelcomeMessage = () => {
      // Try various selectors for Tidio welcome message - specifically targeting widgetLabel
      const selectors = [
        '.widgetLabel',
        'button.widgetLabel',
        'button[class*="widgetLabel"]',
        'button[class*="tidio"][class*="widgetLabel"]',
        '[id*="tidio-welcome"]',
        '[class*="tidio-welcome"]',
        '[id*="tidio-message-box"]',
        '[class*="tidio-message-box"]',
        '[id*="tidio-bubble"]',
        '[class*="tidio-bubble"]',
        '.tidio-chat-welcome',
        '#tidio-chat-welcome',
        '.tidio-welcome-message',
        '#tidio-welcome-message'
      ];

      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el: Element) => {
          (el as HTMLElement).style.display = 'none';
          (el as HTMLElement).style.visibility = 'hidden';
          (el as HTMLElement).style.opacity = '0';
          (el as HTMLElement).style.height = '0';
          (el as HTMLElement).style.width = '0';
          (el as HTMLElement).style.overflow = 'hidden';
          (el as HTMLElement).style.pointerEvents = 'none';
        });
      });
    };

    // Check if Tidio script is already loaded
    if (document.querySelector('script[src*="tidio.co"]')) {
      // If already loaded, hide welcome message
      setTimeout(hideTidioWelcomeMessage, 500);
      // Set up observer to catch it if it appears later
      const observer = new MutationObserver(hideTidioWelcomeMessage);
      observer.observe(document.body, { childList: true, subtree: true });
      
      // Clean up observer after 10 seconds
      setTimeout(() => observer.disconnect(), 10000);
      return;
    }

    // Create and inject Tidio script (same key as Help page)
    const script = document.createElement('script');
    script.src = '//code.tidio.co/enkm7pw3z2k1zidnow6e2wj9fdt7jwo2.js';
    script.async = true;
    script.type = 'text/javascript';
    
    // Wait for Tidio to load and hide welcome message
    script.onload = () => {
      // Give Tidio time to initialize, then hide welcome message
      setTimeout(hideTidioWelcomeMessage, 1000);
      // Also set up an observer to hide it if it appears later
      const observer = new MutationObserver(hideTidioWelcomeMessage);
      observer.observe(document.body, { childList: true, subtree: true });
      
      // Clean up observer after 10 seconds
      setTimeout(() => observer.disconnect(), 10000);
    };
    
    // Add script to document head
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      const tidioScript = document.querySelector('script[src*="tidio.co"]');
      if (tidioScript) {
        tidioScript.remove();
      }
    };
  }, []);


  const homepageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Bible Quiz Competition 2025",
    "alternateName": "Bible Quiz Competition",
    "url": "https://biblequizcompetition.com",
    "description": "Join the ultimate Bible Quiz Competition 2025! Test your Bible knowledge with 1,000+ questions, compete in weekly quizzes, climb leaderboards, and access free Bible Q&A resources. Free to join, fun for all ages.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://biblequizcompetition.com/?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "sameAs": [
      "https://www.facebook.com/",
      "https://twitter.com/"
    ],
    "publisher": {
      "@type": "Organization",
      "name": "Bible Quiz Competition",
      "logo": {
        "@type": "ImageObject",
        "url": "https://biblequizcompetition.com/favicon.svg"
      }
    }
  };

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Bible Quiz Competition",
    "url": "https://biblequizcompetition.com",
    "logo": "https://biblequizcompetition.com/favicon.svg",
    "description": "Free online Bible quiz platform offering weekly competitions, leaderboards, and Bible Q&A resources for 2025.",
    "foundingDate": "2024",
    "founder": {
      "@type": "Organization",
      "name": "Bible Quiz Competition"
    },
    "sameAs": [
      "https://www.facebook.com/",
      "https://twitter.com/"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "email": "info@biblequizcompetition.com"
    }
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Bible Quiz Competition 2025?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bible Quiz Competition 2025 is a free online platform where you can test your Bible knowledge with over 1,000+ questions across all Bible books. Compete in weekly quizzes, track your progress on leaderboards, and access free Bible Q&A resources."
        }
      },
      {
        "@type": "Question",
        "name": "Is Bible Quiz Competition 2025 free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Bible Quiz Competition 2025 is completely free to join. Sign up for free and get access to all quizzes, leaderboards, and Bible study resources."
        }
      },
      {
        "@type": "Question",
        "name": "How do I participate in Bible Quiz Competition 2025?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply sign up for a free account, choose from Today's Quiz, Weekly Challenges, or explore our Bible Q&A Hub. Take quizzes, compete with others, and climb the leaderboard!"
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Bible Quiz Competition 2025 | Free Online Bible Quizzes & Leaderboards</title>
        <meta name="title" content="Bible Quiz Competition 2025 | Free Online Bible Quizzes & Leaderboards" />
        <meta name="description" content="Join Bible Quiz Competition 2025! Test your Bible knowledge with 1,000+ questions, compete in weekly quizzes, climb leaderboards, and access free Bible Q&A resources. Free to join, fun for all ages. Participate in the ultimate Bible quiz competition of 2025." />
        <meta name="keywords" content="bible quiz competition 2025, bible quiz competition, bible quiz 2025, online bible quiz, free bible quiz, bible knowledge quiz, weekly bible quiz, bible quiz leaderboard, bible study quiz, christian quiz competition, bible questions and answers, genesis quiz, exodus quiz, psalms quiz, new testament quiz, bible quiz app, interactive bible quiz, bible quiz for adults, bible quiz for kids, bible competition 2025" />
        <meta name="author" content="Bible Quiz Competition" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="theme-color" content="#000000" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://biblequizcompetition.com/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://biblequizcompetition.com/" />
        <meta property="og:title" content="Bible Quiz Competition 2025 | Free Online Bible Quizzes & Leaderboards" />
        <meta property="og:description" content="Join Bible Quiz Competition 2025! Test your Bible knowledge with 1,000+ questions, compete in weekly quizzes, and climb leaderboards. Free to join!" />
        <meta property="og:image" content="https://biblequizcompetition.com/favicon.svg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Bible Quiz Competition 2025 - Free Online Bible Quizzes" />
        <meta property="og:site_name" content="Bible Quiz Competition" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://biblequizcompetition.com/" />
        <meta name="twitter:title" content="Bible Quiz Competition 2025 | Free Online Bible Quizzes" />
        <meta name="twitter:description" content="Join Bible Quiz Competition 2025! Test your Bible knowledge with 1,000+ questions, compete in weekly quizzes, and climb leaderboards." />
        <meta name="twitter:image" content="https://biblequizcompetition.com/favicon.svg" />
        <meta name="twitter:image:alt" content="Bible Quiz Competition 2025" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="application-name" content="Bible Quiz Competition" />
        <meta name="apple-mobile-web-app-title" content="Bible Quiz 2025" />
        
        {/* Structured Data - WebSite */}
        <script type="application/ld+json">
          {JSON.stringify(homepageStructuredData)}
        </script>
        
        {/* Structured Data - Organization */}
        <script type="application/ld+json">
          {JSON.stringify(organizationStructuredData)}
        </script>
        
        {/* Structured Data - FAQPage */}
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
        
        {/* Tidio Live Chat - Loaded via useEffect hook instead */}
      </Helmet>
      <div className="min-h-screen bg-white">
        {/* Guest completion dialog */}
        <Dialog open={showGuestComplete} onOpenChange={setShowGuestComplete}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Guest mode quiz completed</DialogTitle>
              <DialogDescription>Your guest-mode session has ended successfully.</DialogDescription>
            </DialogHeader>
            <div className="flex justify-end">
              <Button onClick={() => setShowGuestComplete(false)}>OK</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Feedback Dialog */}
        <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-urbanist font-normal">Give Your Feedback</DialogTitle>
              <DialogDescription className="font-urbanist font-light">
                We'd love to hear from you! Please share your thoughts.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleFeedbackSubmit} className="space-y-4 mt-4">
              <div>
                <label htmlFor="name" className="block text-sm font-urbanist font-medium text-gray-700 mb-1">
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={feedbackForm.name}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, name: e.target.value })}
                  className="font-urbanist font-light"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="place" className="block text-sm font-urbanist font-medium text-gray-700 mb-1">
                  Place
                </label>
                <Input
                  id="place"
                  type="text"
                  required
                  value={feedbackForm.place}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, place: e.target.value })}
                  className="font-urbanist font-light"
                  placeholder="Your location"
                />
              </div>
              <div>
                <label htmlFor="feedback" className="block text-sm font-urbanist font-medium text-gray-700 mb-1">
                  Feedback
                </label>
                <textarea
                  id="feedback"
                  required
                  value={feedbackForm.feedback}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, feedback: e.target.value })}
                  className="w-full min-h-[120px] px-3 py-2 border border-gray-300 rounded-md font-urbanist font-light resize-none focus:outline-none focus:ring-2 focus:ring-gray-400"
                  placeholder="Share your thoughts..."
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowFeedbackDialog(false);
                    setFeedbackForm({ name: "", place: "", feedback: "" });
                  }}
                  className="font-urbanist font-light"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-black hover:bg-gray-800 font-urbanist font-light"
                >
                  {isSubmitting ? "Sending..." : "Send Feedback"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
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
            {/* Search Bar */}
            <div ref={searchRef} className="hidden md:block relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.trim() && setShowSearchResults(true)}
                  className="pl-10 pr-10 w-80 md:w-96 h-9 text-sm font-urbanist font-light border-gray-300 focus:border-gray-400"
                />
                {searchQuery && (
            <button
                    onClick={() => {
                      setSearchQuery("");
                      setShowSearchResults(false);
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
            </button>
                )}
              </div>
              
              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
                  {searchResults.map((page, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearchSelect(page.path)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b last:border-b-0 border-gray-100"
                    >
                      <div className="font-urbanist font-medium text-gray-900">{page.title}</div>
                      <div className="font-urbanist font-light text-sm text-gray-600">{page.category}</div>
              </button>
                  ))}
                </div>
              )}
              {showSearchResults && searchQuery.trim() && searchResults.length === 0 && (
                <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-lg shadow-lg border border-gray-200 z-50 p-4">
                  <div className="font-urbanist font-light text-gray-600 text-sm">No results found</div>
                </div>
              )}
            </div>
            
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

        {/* Hero Section with Emotional Check-In */}
        <EmotionalCheckInHero />

        {/* Wellness Features Section */}
        <section className="relative py-12 md:py-20 bg-white overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          {/* Decorative accent lines */}
          <div className="absolute bottom-20 left-1/4 w-24 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50"></div>
          <div className="absolute bottom-20 right-1/4 w-24 h-px bg-gradient-to-l from-transparent via-gray-300 to-transparent opacity-50"></div>
          
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <p className="text-sm font-urbanist font-light text-purple-600 uppercase tracking-wider mb-3">
                — More Than Quizzes —
              </p>
              <h2 className="text-3xl md:text-5xl font-urbanist font-medium text-gray-700 mb-3 md:mb-4 leading-tight">
                Your Complete Wellness Journey
              </h2>
              <p className="text-base md:text-base font-urbanist font-light text-gray-500 mb-0 md:mb-1 max-w-xl mx-auto leading-relaxed">
                We're here to support you through your care, worries, anxiety, and every step of your journey toward peace through quizzes, CBT tools, and comprehensive wellness resources.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {/* Daily Records */}
                  <div className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">📊</span>
                      </div>
                      <div>
                        <h3 className="text-base font-urbanist font-semibold text-gray-900 mb-2">Daily Records</h3>
                        <p className="text-sm font-urbanist font-light text-gray-600 leading-relaxed">
                          Track your emotional journey and progress over time with detailed analytics
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Water Intake */}
                  <div className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">💧</span>
                      </div>
                      <div>
                        <h3 className="text-base font-urbanist font-semibold text-gray-900 mb-2">Water Intake Tracker</h3>
                        <p className="text-sm font-urbanist font-light text-gray-600 leading-relaxed">
                          Monitor your daily hydration and maintain optimal wellness
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CBT Tools */}
                  <div className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">🧘</span>
                      </div>
                      <div>
                        <h3 className="text-base font-urbanist font-semibold text-gray-900 mb-2">CBT Tools</h3>
                        <p className="text-sm font-urbanist font-light text-gray-600 leading-relaxed">
                          Access thought records, emotional check-ins, and mindfulness practices for peace
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Streak Maintenance */}
                  <div className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">🔥</span>
                      </div>
                      <div>
                        <h3 className="text-base font-urbanist font-semibold text-gray-900 mb-2">Streak Maintenance</h3>
                        <p className="text-sm font-urbanist font-light text-gray-600 leading-relaxed">
                          Build and maintain daily habits with streak tracking to stay motivated
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Emotional Check-In */}
                  <div className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <Heart className="w-5 h-5 text-gray-700" strokeWidth={1} />
                      </div>
                      <div>
                        <h3 className="text-base font-urbanist font-semibold text-gray-900 mb-2">Emotional Check-In</h3>
                        <p className="text-sm font-urbanist font-light text-gray-600 leading-relaxed">
                          Daily mood tracking with personalized insights and Bible verses
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bible Games */}
                  <div className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                        <Play className="w-5 h-5 text-gray-700" strokeWidth={1} />
                      </div>
                      <div>
                        <h3 className="text-base font-urbanist font-semibold text-gray-900 mb-2">Interactive Bible Games</h3>
                        <p className="text-sm font-urbanist font-light text-gray-600 leading-relaxed">
                          Engage with faith-based games that combine fun with spiritual growth
                        </p>
                      </div>
                    </div>
                  </div>
            </div>

            {/* CTA */}
            <div className="flex justify-center">
              <Button 
                className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-urbanist font-light text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                onClick={() => navigate("/signup-today")}
              >
                Start Your Wellness Journey
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Bible Q&A Hub Section */}
        <section className="relative py-12 md:py-20 bg-white overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          {/* Decorative accent lines */}
          <div className="absolute top-0 left-1/4 w-24 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50"></div>
          <div className="absolute top-0 right-1/4 w-24 h-px bg-gradient-to-l from-transparent via-gray-300 to-transparent opacity-50"></div>
          
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <p className="text-sm font-urbanist font-light text-purple-600 uppercase tracking-wider mb-3">
                — Bible Q&A Hub —
              </p>
              <h2 className="text-3xl md:text-5xl font-urbanist font-medium text-gray-700 mb-3 md:mb-4 leading-tight">
                Deepen Your Understanding of Scripture
              </h2>
              <p className="text-base md:text-base font-urbanist font-light text-gray-500 mb-0 md:mb-1 max-w-xl mx-auto leading-relaxed">
                Your comprehensive resource for Bible questions and answers. Explore organized content by book, chapter, difficulty level, and category.
              </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-center">
                    <div className="text-3xl font-urbanist font-semibold text-gray-900 mb-1">66</div>
                    <div className="text-xs font-urbanist font-light text-gray-600">Bible Books</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-center">
                    <div className="text-3xl font-urbanist font-semibold text-gray-900 mb-1">1,000+</div>
                    <div className="text-xs font-urbanist font-light text-gray-600">Questions</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-center">
                    <div className="text-3xl font-urbanist font-semibold text-gray-900 mb-1">3</div>
                    <div className="text-xs font-urbanist font-light text-gray-600">Difficulty Levels</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-center">
                    <div className="text-3xl font-urbanist font-semibold text-gray-900 mb-1">10+</div>
                    <div className="text-xs font-urbanist font-light text-gray-600">Study Categories</div>
                  </div>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-3">
                      <BookOpen className="w-5 h-5 text-gray-700" strokeWidth={1} />
                    </div>
                    <h3 className="text-base font-urbanist font-semibold text-gray-900 mb-2">66 Bible Books</h3>
                    <p className="text-sm font-urbanist font-light text-gray-600 leading-relaxed">
                      Complete coverage of all Old and New Testament books with organized questions and answers.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mb-3">
                      <Brain className="w-5 h-5 text-gray-700" strokeWidth={1} />
                    </div>
                    <h3 className="text-base font-urbanist font-semibold text-gray-900 mb-2">Difficulty Levels</h3>
                    <p className="text-sm font-urbanist font-light text-gray-600 leading-relaxed">
                      Beginner, Intermediate, and Advanced questions to match your knowledge level.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center mb-3">
                      <Trophy className="w-5 h-5 text-gray-700" strokeWidth={1} />
                    </div>
                    <h3 className="text-base font-urbanist font-semibold text-gray-900 mb-2">Chapter Breakdown</h3>
                    <p className="text-sm font-urbanist font-light text-gray-600 leading-relaxed">
                      Study specific chapters in detail with focused questions on key passages and themes.
                    </p>
                  </div>
            </div>

            {/* Popular Study Areas */}
            <div className="mb-8">
                  <h3 className="text-lg font-urbanist font-semibold text-gray-900 mb-4 text-center">Popular Study Areas</h3>
                  <div className="grid md:grid-cols-4 gap-3">
                    <button 
                      onClick={() => navigate("/bible-questions-and-answers-hub/genesis")}
                      className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all text-left"
                    >
                      <div className="text-sm font-urbanist font-semibold text-gray-900 mb-1">Genesis Hub</div>
                      <div className="text-xs font-urbanist font-light text-gray-600">Book of Beginnings</div>
                    </button>
                    <button 
                      onClick={() => navigate("/bible-questions-and-answers-hub/pauline-epistles")}
                      className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all text-left"
                    >
                      <div className="text-sm font-urbanist font-semibold text-gray-900 mb-1">Pauline Epistles</div>
                      <div className="text-xs font-urbanist font-light text-gray-600">Apostle Paul's Letters</div>
                    </button>
                    <button 
                      onClick={() => navigate("/bible-questions-and-answers-hub")}
                      className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all text-left"
                    >
                      <div className="text-sm font-urbanist font-semibold text-gray-900 mb-1">Character Studies</div>
                      <div className="text-xs font-urbanist font-light text-gray-600">Biblical Figures</div>
                    </button>
                    <button 
                      onClick={() => navigate("/bible-questions-and-answers-hub")}
                      className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all text-left"
                    >
                      <div className="text-sm font-urbanist font-semibold text-gray-900 mb-1">True/False</div>
                      <div className="text-xs font-urbanist font-light text-gray-600">Quick Assessment</div>
                    </button>
                  </div>
            </div>

            {/* CTA */}
            <div className="flex justify-center">
              <Button 
                className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-urbanist font-light text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                onClick={() => navigate("/bible-questions-and-answers-hub")}
              >
                Explore Bible Q&A Hub
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="relative py-12 md:py-20 bg-white overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          {/* Decorative accent lines */}
          <div className="absolute top-0 left-1/4 w-24 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50"></div>
          <div className="absolute top-0 right-1/4 w-24 h-px bg-gradient-to-l from-transparent via-gray-300 to-transparent opacity-50"></div>
          
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <p className="text-sm font-urbanist font-light text-purple-600 uppercase tracking-wider mb-3">
                — How It Works —
              </p>
              <h2 className="text-3xl md:text-5xl font-urbanist font-medium text-gray-700 mb-3 md:mb-4 leading-tight">
                Get Started in Minutes
              </h2>
              <p className="text-base md:text-base font-urbanist font-light text-gray-500 mb-0 md:mb-1 max-w-xl mx-auto leading-relaxed">
                Our simple 3-step process to begin your journey
              </p>
            </div>

            {/* Main Content Card */}
            <div className="w-full max-w-4xl mx-auto mb-6 md:mb-8 relative z-10">
              <div className="bg-white rounded-lg p-6 md:p-8 shadow-lg border border-gray-200">
                <div className="grid md:grid-cols-3 gap-6">
                  {howItWorks.map((step, i) => (
                    <div 
                      key={i} 
                      className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all duration-300 relative"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                        <step.icon className="w-5 h-5 text-gray-700" strokeWidth={1} />
                      </div>
                      <div className="text-xs font-urbanist font-semibold text-gray-500 mb-2">Step {i + 1}</div>
                      <h3 className="text-base font-urbanist font-semibold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-sm font-urbanist font-light text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="relative py-12 md:py-20 bg-white overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          {/* Decorative accent lines */}
          <div className="absolute bottom-20 left-1/4 w-24 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50"></div>
          <div className="absolute bottom-20 right-1/4 w-24 h-px bg-gradient-to-l from-transparent via-gray-300 to-transparent opacity-50"></div>
          
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <p className="text-sm font-urbanist font-light text-purple-600 uppercase tracking-wider mb-3">
                — What Our Users Say —
              </p>
              <h2 className="text-3xl md:text-5xl font-urbanist font-medium text-gray-700 mb-3 md:mb-4 leading-tight">
                Join Thousands of Believers
              </h2>
              <p className="text-base md:text-base font-urbanist font-light text-gray-500 mb-0 md:mb-1 max-w-xl mx-auto leading-relaxed">
                See how our platform has helped others grow in faith and wellness
              </p>
            </div>
            
            <div className="relative">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {bibleTestimonials.map((testimonial, i) => (
                    <CarouselItem key={i} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                      <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all duration-300 h-full relative group">
                        {/* Decorative quote mark */}
                        <div className="absolute top-4 left-4 text-4xl text-gray-200 font-serif leading-none opacity-50">"</div>
                        
                        <p className="font-urbanist font-light text-gray-700 mb-4 relative z-10 pl-6">
                          {testimonial.content}
                        </p>
                        <div className="relative z-10 border-t border-gray-100 pt-4 mt-4">
                          <div className="font-urbanist font-semibold text-gray-900">{testimonial.name}</div>
                          <div className="text-sm font-urbanist font-light text-gray-600">{testimonial.role}</div>
              </div>
                        
                        {/* Hover accent */}
                        <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-gray-300 to-transparent group-hover:w-full transition-all duration-300"></div>
            </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0 md:-left-12 border-gray-300 hover:border-gray-400" />
                <CarouselNext className="right-0 md:-right-12 border-gray-300 hover:border-gray-400" />
              </Carousel>
              </div>
            {/* <div className="text-center mt-12">
              <Button 
                className="bg-black hover:bg-gray-800 font-urbanist font-light text-base"
                onClick={() => setShowFeedbackDialog(true)}
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Give Your Feedback
              </Button>
            </div> */}
          </div>
        </section>

       

        <div id="faq">
          <FaqSection />
        </div>
         {/* Bible Study Section */}
         {false && (
          <section className="py-16 bg-gradient-to-br from-green-50 via-blue-100 to-purple-50">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Deepen Your Faith with Bible Study</h2>
                <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
                  Access daily devotionals, structured study plans, and guided spiritual growth. Create an account to save your progress and unlock all features.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {/* Daily Devotionals */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">Daily Devotionals</CardTitle>
                    <CardDescription>
                      Fresh scripture, reflection, and prayer every day
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        New content daily
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Scripture-based insights
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Practical applications
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                {/* Study Plans */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                      <BookOpen className="w-6 h-6 text-green-600" />
                    </div>
                    <CardTitle className="text-xl">Study Plans</CardTitle>
                    <CardDescription>
                      30-day and 90-day guided journeys
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Bible Foundations (30 days)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Discipleship Journey (90 days)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Progress tracking
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                {/* Account Benefits */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl">Create Account</CardTitle>
                    <CardDescription>
                      Unlock personalized features and save progress
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Save study progress
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Personalized dashboard
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Track achievements
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              <div className="text-center">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300" onClick={() => navigate("/auth/register")}> 
                    <BookOpen className="w-5 h-5 mr-2" />
                    Create Account & Start Studying
                  </Button>
                  <Button size="lg" variant="outline" className="px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-300 hover:border-blue-400 transition-all duration-300" onClick={() => navigate("/auth/login")}>
                    <User className="w-5 h-5 mr-2" />
                    Sign In
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Free to join • No credit card required • Start studying immediately
                </p>
              </div>
            </div>
          </section>
        )}
        {/* Contact Section */}
        <section className="relative py-12 md:py-20 bg-white overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          {/* Decorative accent lines */}
          <div className="absolute top-0 left-1/4 w-24 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50"></div>
          <div className="absolute top-0 right-1/4 w-24 h-px bg-gradient-to-l from-transparent via-gray-300 to-transparent opacity-50"></div>
          
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <p className="text-sm font-urbanist font-light text-purple-600 uppercase tracking-wider mb-3">
                — Get Started —
              </p>
              <h2 className="text-3xl md:text-5xl font-urbanist font-medium text-gray-700 mb-3 md:mb-4 leading-tight">
                Ready to Start Your Journey?
              </h2>
              <p className="text-base md:text-base font-urbanist font-light text-gray-500 mb-0 md:mb-1 max-w-xl mx-auto leading-relaxed">
                Join thousands of believers who've enhanced their Bible knowledge and wellness with our platform
              </p>
            </div>

            {/* Main Content Card */}
            <div className="w-full max-w-4xl mx-auto mb-6 md:mb-8 relative z-10">
              <div className="bg-white rounded-lg p-6 md:p-8 shadow-lg border border-gray-200">
                <div className="flex justify-center">
                  <Button 
                    className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-urbanist font-light text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                    onClick={() => navigate("/auth/register")}
                  >
                    Get Started - It's Free!
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              {/* Company Info */}
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                    <Brain className="w-3 h-3 text-white" />
                </div>
                  <span className="text-lg font-urbanist font-light text-gray-900">Bible Quiz Competition</span>
              </div>
                <p className="font-urbanist font-light text-gray-600 mb-4 max-w-md">
                  More than a quiz platform. We support you through Bible study, emotional wellness, CBT tools, water intake tracking, and every step of your journey toward peace.
                </p>
            </div>

              {/* Product Links */}
              <div>
                <h3 className="font-medium text-gray-900 mb-4">Product</h3>
                <ul className="space-y-3">
                  <li><a href="/todays-quiz" className="font-urbanist font-light text-gray-600 hover:text-gray-900 transition-colors">Today's Quiz</a></li>
                  <li><a href="/weekly-quiz" className="font-urbanist font-light text-gray-600 hover:text-gray-900 transition-colors">Weekly Quiz</a></li>
                  {/* <li><a href="/public-leaderboard" className="font-urbanist font-light text-gray-600 hover:text-gray-900 transition-colors">Leaderboard</a></li> */}
                  <li><a href="/help" className="font-urbanist font-light text-gray-600 hover:text-gray-900 transition-colors">Help</a></li>
                </ul>
              </div>

              {/* Support Links */}
              <div>
                <h3 className="font-medium text-gray-900 mb-4">Support</h3>
                <ul className="space-y-3">
                  <li><a href="/help" className="font-urbanist font-light text-gray-600 hover:text-gray-900 transition-colors">Help Center</a></li>
                  <li><a href="#faq" className="font-urbanist font-light text-gray-600 hover:text-gray-900 transition-colors">FAQ</a></li>
                  <li><a href="mailto:info@biblequizcompetition.com" className="font-urbanist font-light text-gray-600 hover:text-gray-900 transition-colors">Contact Us</a></li>
                </ul>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-200 pt-8 mt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center space-x-6 mb-4 md:mb-0">
                  <span className="font-urbanist font-light text-gray-600">© 2024 Bible Quiz Competition. All rights reserved.</span>
          </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
      {/* <StickyLeaderboardPanel /> */}
    </>
  );
};

// Removed TestimonialsCarousel - using simple grid instead

export default Index;