import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Clock, Users, Brain, ArrowRight, Play, BookOpen, Star, Award, User, Calendar, HelpCircle, TrendingUp, MessageCircle, CheckCircle, Globe, Home, Settings, Medal, Crown, Bolt, ArrowLeft, Book, Menu } from "lucide-react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { MoveDirection } from "tsparticles-engine";
import { Helmet } from 'react-helmet';
import { supabase } from "@/integrations/supabase/client";

const features = [
  {
    icon: Brain,
    title: "25 Questions",
    description: "Challenging questions across various topics"
  },
  {
    icon: Clock,
    title: "10 Minutes",
    description: "Fast-paced quiz with time bonus scoring"
  },
  {
    icon: Trophy,
    title: "Leaderboards",
    description: "Compete with others and track your progress"
  },
  {
    icon: Users,
    title: "Real-time Results",
    description: "Instant scoring and performance analytics"
  }
];

const howItWorks = [
  {
    icon: BookOpen,
    title: "Sign Up or Log In",
    description: "Create your free account or log in to access all quiz features, track your progress, and compete for prizes."
  },
  {
    icon: Settings,
    title: "Explore Categories",
    description: "Browse a wide range of Bible quiz categories, including Old Testament, New Testament, Characters, and Events. Choose your favorite to get started."
  },
  {
    icon: Calendar,
    title: "Join a Live Event",
    description: "Participate in scheduled live competitions or take quizzes at your own pace. Weekly and monthly events offer special rewards and leaderboards."
  },
  {
    icon: Play,
    title: "Answer Questions",
    description: "Each quiz consists of 25 multiple-choice questions. Read carefully, answer quickly, and earn more points for correct and fast responses."
  },
  {
    icon: TrendingUp,
    title: "Track Your Progress",
    description: "See instant results, review your answers, and monitor your ranking on the leaderboard. Analyze your strengths and areas for improvement."
  },
  {
    icon: Trophy,
    title: "Win Prizes & Recognition",
    description: "Top scorers win exciting prizes, certificates, and global recognition. Come back every week to improve your score and win more!"
  }
];

const categories = [
  { name: "Old Testament", icon: BookOpen, border: "border-orange-200", iconBg: "bg-orange-400", shadow: "shadow-orange-100", description: "Stories & laws" },
  { name: "New Testament", icon: BookOpen, border: "border-blue-200", iconBg: "bg-blue-400", shadow: "shadow-blue-100", description: "Gospels & letters" },
  { name: "Bible Characters", icon: Users, border: "border-green-200", iconBg: "bg-green-400", shadow: "shadow-green-100", description: "People of the Bible" },
  { name: "Events", icon: Calendar, border: "border-purple-200", iconBg: "bg-purple-400", shadow: "shadow-purple-100", description: "Major events" },
  { name: "Parables", icon: MessageCircle, border: "border-yellow-200", iconBg: "bg-yellow-400", shadow: "shadow-yellow-100", description: "Jesus' parables" },
  { name: "Miracles", icon: Star, border: "border-pink-200", iconBg: "bg-pink-400", shadow: "shadow-pink-100", description: "Wonders & signs" },
  { name: "Geography", icon: Globe, border: "border-teal-200", iconBg: "bg-teal-400", shadow: "shadow-teal-100", description: "Places & lands" },
  { name: "Prophecies", icon: Award, border: "border-indigo-200", iconBg: "bg-indigo-400", shadow: "shadow-indigo-100", description: "Biblical prophecies" }
];

const leaderboard = [
  { name: "Sarah J.", score: 98, avatar: "SJ" },
  { name: "Michael C.", score: 95, avatar: "MC" },
  { name: "Emily R.", score: 92, avatar: "ER" }
];

// Lightweight daily Bible verses (rotates locally without external API)
const dailyVerses = [
  { ref: "John 3:16", text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." },
  { ref: "Psalm 119:105", text: "Your word is a lamp to my feet and a light to my path." },
  { ref: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight." },
  { ref: "Philippians 4:6-7", text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God... will guard your hearts and your minds in Christ Jesus." },
  { ref: "Isaiah 40:31", text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint." },
  { ref: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose." },
  { ref: "Joshua 1:9", text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go." },
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
    name: "David Mathew",
    role: "Church Volunteer",
    content: "The quiz platform is easy to use and brings our community together every week."
  },
  {
    name: "Rachel Thomas",
    role: "Parent",
    content: "My kids love the Bible quizzes! It's a fun way for them to learn scripture."
  },
  {
    name: "Elder John Abraham",
    role: "Bible Study Leader",
    content: "The variety of questions and instant results make this the best Bible quiz app I've used."
  }
];

const events = [
  { title: "Monthly Bible Challenge", date: "1st Sunday", description: "Compete for the top spot and win prizes!" },
  { title: "Family Quiz Night", date: "Every Friday", description: "Fun for all ages and families." }
];

const faqs = [
  { q: "How does scoring work?", a: "4 points for correct, -1 for wrong, plus time bonus." },
  { q: "Can I retake quizzes?", a: "Yes, you can retry as many times as you like." },
  { q: "Are there prizes?", a: "Top scorers each month win special rewards." }
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
    <div className={`hidden md:flex flex-col fixed top-1/2 right-0 z-50 transform -translate-y-1/2 transition-all duration-300 ${open ? 'w-80' : 'w-14'}`}>
      <div className={`h-[300px] ${open ? 'bg-white/80 p-4 border-l border-blue-100 shadow-xl' : 'bg-white/60 p-1 border-l border-blue-100 shadow'} rounded-l-2xl backdrop-blur-md flex flex-col items-stretch relative`}>
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

function FaqSection() {
  const faqs = [
    {
      q: "How do I join a Bible quiz?",
      a: "Simply visit our homepage and click 'Today's Quiz' to start immediately, or sign up for a free account to access weekly quizzes, create your own quizzes, and track your progress on the leaderboard."
    },
    {
      q: "What types of quizzes are available?",
      a: "We offer Today's Quiz (Romans), Weekly Bible Challenges, public quizzes for all 66 Bible books, and the ability to create and host your own live quizzes with an 8-character join code."
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
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
              <CheckCircle className="w-5 h-5 mr-1" /> You're in good hands
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-700 text-center max-w-xl mb-2">
            Everything you need to know about QuizMaster. Can't find your answer?{' '}
            <a href="mailto:info@biblequizcompetition.com" className="text-blue-600 underline">Contact our support team.</a>
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-2xl border-2 border-purple-200 bg-white p-0 overflow-hidden transition-all">
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-lg font-semibold text-gray-900 focus:outline-none"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                aria-controls={`faq-panel-${i}`}
              >
                <span>{faq.q}</span>
                <span className={`ml-4 transition-transform ${open === i ? 'rotate-45 text-blue-600' : 'text-gray-400'}`}>+</span>
              </button>
              <div
                id={`faq-panel-${i}`}
                className={`px-6 pb-5 text-gray-700 text-base transition-all duration-300 ${open === i ? 'block' : 'hidden'}`}
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

const Index = () => {
  const navigate = useNavigate();
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const location = useLocation();
  const [showGuestComplete, setShowGuestComplete] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

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
  // Calculate days until next Saturday
  const [nextQuizLabel, setNextQuizLabel] = useState("");
  const [verse, setVerse] = useState<{ref: string; text: string} | null>(null);
  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0=Sun, 6=Sat
    let daysUntilSaturday = (6 - dayOfWeek + 7) % 7;
    let label = "";
    if (daysUntilSaturday === 0) label = "(today)";
    else if (daysUntilSaturday === 1) label = "(tomorrow)";
    else label = `(in ${daysUntilSaturday} days)`;
    setNextQuizLabel(label);
  }, []);

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

  // Pick a daily verse deterministically based on today's date
  useEffect(() => {
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const idx = dayOfYear % dailyVerses.length;
    setVerse(dailyVerses[idx]);
  }, []);

  useEffect(() => {
    async function checkAuthAndRedirect() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        if (profile?.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }
    }
    checkAuthAndRedirect();
  }, [navigate]);

  // Particle options for dots and confetti
  const particlesOptions = {
    fullScreen: false,
    background: {
      color: { value: "transparent" }
    },
    particles: {
      number: { value: 120, density: { enable: true, value_area: 800 } },
      color: { value: ["#6366f1", "#a21caf", "#60a5fa", "#fbbf24", "#7c3aed", "#f472b6"] },
      shape: {
        type: ["circle", "square"],
        options: {
          polygon: { nb_sides: 5 }
        }
      },
      opacity: { value: 0.8, random: false },
      size: { value: 6, random: { enable: true, minimumValue: 3 } },
      move: {
        enable: true,
        speed: 1.5,
        direction: 'none' as MoveDirection,
        random: true,
        straight: false,
        outModes: { default: 'out' as const }
      }
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        onClick: { enable: true, mode: "push" }
      },
      modes: {
        repulse: { distance: 80, duration: 0.4 },
        push: { quantity: 4 }
      }
    },
    detectRetina: true
  };

  return (
    <>
      <Helmet>
        <title>Bible Quiz Competition | Weekly Online Bible Quiz Events</title>
        <meta name="description" content="Test your knowledge with weekly Bible quizzes, host live sessions, and climb the leaderboard. Free and fun for all ages." />
        <link rel="canonical" href="/" />
        <meta property="og:title" content="Bible Quiz Competition | Weekly Online Bible Quiz Events" />
        <meta property="og:description" content="Test your knowledge with weekly Bible quizzes, host live sessions, and climb the leaderboard." />
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
        {/* Header */}
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
        <section className="relative w-full px-4 py-10 text-center overflow-hidden">
          {/* Background Lines Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(90deg,rgb(38, 100, 199) 1px, transparent 1px),
                linear-gradient(180deg,rgb(40, 96, 185) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              transform: 'perspective(1000px) rotateX(60deg) rotateY(0deg)',
              transformOrigin: 'center center',
              animation: 'moveRoad 2s linear infinite'
            }}></div>
          </div>
          <style>{`
            @keyframes moveRoad {
              0% {
                background-position: 0 0;
              }
              100% {
                background-position: 0 50px;
              }
            }
          `}</style>
          <div className="relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* <div className="flex justify-center mb-4">
                <span className="inline-flex items-center px-4 py-1 mt-20 mb-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm shadow">
                  <Calendar className="w-4 h-4 mr-2" />
                  Next Quiz: Saturday, 8 AM – 8 PM <span className="ml-2 text-white font-normal">{nextQuizLabel}</span>
                </span>
              </div> */}
              
              <div className="mt-20 mb-4"></div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 leading-tight  mb-4">
                Join the <span className="text-blue-700">Free Bible Quiz Challenge!</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
                Test your knowledge, compete with others, and climb the leaderboard every week. <span className="font-semibold text-green-600">100% Free</span> - No subscription required!
              </p>
              
              {/* Today's Quiz Button - Moved above verse and made bigger */}
              <div className="flex justify-center mb-8">
                <Button size="lg" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-12 py-8 text-xl font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 border-0 transform hover:scale-105" onClick={() => navigate("/todays-quiz")}> 
                  <Calendar className="w-6 h-6 mr-3" /> 
                  Today's Quiz - Romans 
                  <ArrowRight className="w-6 h-6 ml-3" /> 
                </Button>
              </div>
              
              {verse && (
                <div className="max-w-3xl mx-auto mb-8">
                  <div className="rounded-2xl bg-white/70 backdrop-blur border border-blue-100 shadow p-4 md:p-5">
                    <div className="text-gray-800 text-base md:text-lg leading-relaxed">"{verse.text}"</div>
                    <div className="mt-2 text-sm font-semibold text-blue-700">— {verse.ref}</div>
                  </div>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {/* <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold rounded shadow-lg hover:shadow-xl transition-all duration-300 border-0" onClick={() => navigate("/auth/login")}> <Play className="w-5 h-5 mr-2" /> Start Quiz Now <ArrowRight className="w-5 h-5 ml-2" /> </Button> */}
                <Button size="lg" className="px-8 py-6 text-lg font-medium rounded bg-green-500 hover:bg-green-600 text-white transition-all duration-300 border-0" onClick={() => navigate('/host-live-bible-quizzes-with-confidence')}> <Play className="w-5 h-5 mr-2" /> Host a Live Quiz</Button>
                <Button size="lg" className="px-8 py-6 text-lg font-medium rounded bg-purple-500 hover:bg-purple-600 text-white transition-all duration-300 border-0" onClick={() => navigate('/weekly-quiz')}> <Calendar className="w-5 h-5 mr-2" /> Weekly Quiz</Button>
                <Button size="lg" className="px-8 py-6 text-lg font-medium rounded bg-orange-500 hover:bg-orange-600 text-white transition-all duration-300 border-0" onClick={() => navigate('/bible-questions-and-answers-hub')}> <Book className="w-5 h-5 mr-2" /> Bible Q&A Hub</Button>
              </div>
              
            </div>
            
          </div>
           {/* Statistics */}
        <section className="mb-24 mt-10">
          <div className="container mx-auto px-4 mb-10">
            <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-600">
              <div className="flex items-center gap-1"><Users className="w-4 h-4 text-blue-500" /> 1,250+ participants</div>
              <div className="flex items-center gap-1"><Calendar className="w-4 h-4 text-green-500" /> 52+ weekly quizzes</div>
              <div className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500" /> Weekly winners & special rewards</div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-4xl mx-auto mt-10">
              {stats.map((stat, i) => (
                <div key={i} className="rounded-2xl shadow-none p-2 flex flex-col items-center bg-transparent">
                  <stat.icon className="w-6 h-6 text-gray-500 mb-2" />
                  <div className="text-2xl font-bold text-blue-700">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        </section>

        {/* Get Started CTA Section - split left/right */}
        <section className="py-10 md:py-20 bg-gradient-to-br from-blue-50 via-purple-100 to-white relative overflow-hidden px-2 sm:px-4">
          <div className="container mx-auto px-2 sm:px-4 relative z-10">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8 sm:mb-12 text-center leading-tight">
              Ready to Test Your Bible Knowledge?
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 max-w-6xl mx-auto">
              {/* Left: Participate CTA */}
              <div className="bg-white/70 backdrop-blur rounded-3xl border border-white/60 p-6 sm:p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow">For participants</span>
                </div>
                <p className="text-lg sm:text-xl text-gray-800 mb-6 leading-relaxed">
                  Join thousands of participants—compete with others and test your biblical knowledge every Saturday.
                  <span className="font-bold text-yellow-600"> Don’t miss this week’s competition!</span>
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white rounded-2xl p-5 border border-blue-100 shadow-sm">
                    <div className="text-3xl font-extrabold text-blue-700 tracking-tight">500+</div>
                    <div className="text-gray-700 text-sm mt-1">Questions Available</div>
                  </div>
                  <div className="bg-white rounded-2xl p-5 border border-blue-100 shadow-sm">
                    <div className="text-3xl font-extrabold text-blue-700 tracking-tight">1,250+</div>
                    <div className="text-gray-700 text-sm mt-1">Already Competing</div>
                  </div>
                </div>
                <div className="relative">
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-extrabold px-6 sm:px-10 py-5 sm:py-6 text-lg sm:text-xl rounded-md shadow-[0_10px_30px_rgba(16,185,129,0.35)] transition-all duration-300 transform hover:scale-[1.02]" 
                    onClick={() => navigate("/auth/register")}
                  >
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                    JOIN NOW - IT'S FREE!
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2 sm:ml-3" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-800 text-sm mt-6">
                  <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-green-100"><CheckCircle className="w-4 h-4 text-green-500" /> No Credit Card Required</div>
                  <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-green-100"><CheckCircle className="w-4 h-4 text-green-500" /> Instant Access</div>
                  <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-green-100"><CheckCircle className="w-4 h-4 text-green-500" /> Free to Join</div>
                  <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-green-100"><CheckCircle className="w-4 h-4 text-green-500" /> Win Real Prizes</div>
                </div>
              </div>

              {/* Right: Create quizzes info */}
              <div className="bg-white/70 backdrop-blur rounded-3xl border border-white/60 p-6 sm:p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow">For creators</span>
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight">Create and Host Live Quizzes</h3>
                <p className="text-gray-800 mb-5 leading-relaxed">Build your own Bible quizzes, host live sessions, and share an 8‑character join code with participants.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <div className="flex items-start gap-2 bg-white rounded-xl p-3 border border-gray-100"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5" /> <span className="text-gray-800 text-base md:text-lg">Add questions (A–D) and mark the correct answer</span></div>
                  <div className="flex items-start gap-2 bg-white rounded-xl p-3 border border-gray-100"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5" /> <span className="text-gray-800 text-base md:text-lg">Choose public or private visibility</span></div>
                  <div className="flex items-start gap-2 bg-white rounded-xl p-3 border border-gray-100"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5" /> <span className="text-gray-800 text-base md:text-lg">Require login or allow guest names</span></div>
                  <div className="flex items-start gap-2 bg-white rounded-xl p-3 border border-gray-100"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5" /> <span className="text-gray-800 text-base md:text-lg">Automatic scoring and top results</span></div>
                </div>

                <div className="flex flex-col gap-3 sm:gap-4">
                  <Button size="lg" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 font-extrabold px-6 py-5 text-lg rounded-md shadow-[0_10px_30px_rgba(79,70,229,0.35)]" onClick={() => setCreateDialogOpen(true)}>
                    Create Quiz
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Create Quiz Mode Dialog */}
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">Choose participation mode</DialogTitle>
              <DialogDescription className="text-base">
                Decide how participants will join your live quiz. You can change this later in quiz settings.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="rounded-xl border p-5 bg-white hover:shadow-md transition cursor-pointer" onClick={() => { setCreateDialogOpen(false); navigate('/create-quiz?requiresLogin=1'); }}>
                <div className="text-base font-semibold text-indigo-700 mb-2">Require login</div>
                <ul className="text-base text-gray-700 list-disc pl-4 space-y-1">
                  <li>Verified identities, reduced impersonation</li>
                  <li>Badges and history saved to accounts</li>
                  <li>Best for classes and recurring groups</li>
                </ul>
                <Button size="sm" className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700">Use login</Button>
              </div>
              <div className="rounded-xl border p-5 bg-white hover:shadow-md transition cursor-pointer" onClick={() => { setCreateDialogOpen(false); navigate('/create-quiz/guest'); }}>
                <div className="text-base font-semibold text-emerald-700 mb-2">No login (guest names)</div>
                <ul className="text-base text-gray-700 list-disc pl-4 space-y-1">
                  <li>Fast join with display name only</li>
                  <li>No account required</li>
                  <li>Great for public events and quick sessions</li>
                </ul>
                <Button size="sm" variant="outline" className="mt-3 w-full">Use guest mode</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* How It Works */}
        <section id="features" className="py-24 mb-0 mt-[-50px] bg-gradient-to-br from-white via-blue-50 to-purple-50 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="uppercase tracking-widest text-sm font-semibold text-blue-500">How it works</span>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent leading-[1.25] py-2">
                So Easy, So Fun, Bible Quiz Magic ✨
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Follow these simple steps to join, compete, and win in the Bible Quiz Competition. Whether you're a first-timer or a returning champion, it's easy to get started!</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {howItWorks.map((step, i) => (
                <div key={i} className="relative bg-white/80 border border-blue-100 rounded-2xl shadow-lg p-8 flex flex-col items-center">
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl mb-4" style={{ background: 'linear-gradient(135deg, #a78bfa 0%, #6366f1 100%)' }}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-xl font-bold text-gray-900 mb-2 text-center">{step.title}</div>
                  <div className="text-gray-600 text-center text-base">{step.description}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-12">
              <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                Ready to join the quiz?
              </button>
            </div>
          </div>
        </section>

              {/* Testimonials */}
        <section id="testimonials" className="py-20 px-2 bg-gradient-to-br from-blue-50 via-purple-100 to-white text-gray-900 relative">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              Join <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-extrabold">5,000+ believers</span> who trust us
            </h3>
            {/* Carousel */}
            <div className="max-w-7xl mx-auto">
              <TestimonialsCarousel />
            </div>
            {/* Features Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-10">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-4">
                  <Bolt className="w-8 h-8 text-white" />
                </div>
                <div className="font-bold text-lg mb-1 text-gray-900">Instant Results</div>
                <div className="text-gray-800 text-center">See your score and correct answers immediately after each quiz.</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-400 to-blue-400 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <div className="font-bold text-lg mb-1 text-gray-900">Variety of Categories</div>
                <div className="text-gray-800 text-center">Quizzes on Old Testament, New Testament, Parables, Miracles, and more.</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="font-bold text-lg mb-1 text-gray-900">Compete & Connect</div>
                <div className="text-gray-800 text-center">Join friends, family, and believers worldwide in friendly competition.</div>
              </div>
            </div>
          </div>
        </section>
        {/* Quiz Categories */}
        <section id="categories" className="py-4 bg-white mt-24 mb-24">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-4">Quiz Categories</h3>
            <p className="text-lg text-gray-600 text-center mb-10 max-w-2xl mx-auto">Choose from a variety of Bible quiz categories. Each category is designed to challenge your knowledge and help you grow in your understanding of the Scriptures.</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {categories.map((cat, i) => (
                <div key={i} className={`rounded-2xl border ${cat.border} ${cat.shadow} bg-white/40 backdrop-blur-md p-8 flex flex-col items-center transition-all duration-200 hover:scale-105 hover:shadow-lg`}> 
                  <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 ${cat.iconBg} bg-opacity-90 shadow-md`}>
                    <cat.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-lg font-bold text-gray-900 mb-2">{cat.name}</div>
                  <div className="text-gray-700 text-center text-base">{cat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        

        

     

      

       

        {/* Bible Quiz Features Section */}
        <section className="py-24 bg-gradient-to-br from-blue-50 via-purple-100 to-white">
          <div className="max-w-7xl mx-auto px-4 flex flex-col gap-24">
            {/* Card 1: Icon right, text left */}
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Text */}
              <div className="flex-1 max-w-xl">
                <span className="inline-block mb-4 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold shadow">Bible Quiz Platform</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Everything you need to master the Bible Quiz</h2>
                <p className="text-lg text-gray-800 mb-6">From fun practice quizzes to live competitions and detailed analytics, QuizMaster is your all-in-one platform for Bible knowledge and friendly competition.</p>
                <ul className="space-y-2 text-base text-gray-900">
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /> 1,000+ Bible questions across all categories</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /> Weekly live quiz events with prizes</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /> Instant feedback and detailed answer explanations</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /> Leaderboards and progress tracking</li>
                </ul>
              </div>
              {/* Icon */}
              <div className="flex-1 flex justify-center">
                <div className="rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 shadow-2xl border-4 border-blue-400/30 p-10 flex items-center justify-center">
                  <BookOpen className="w-24 h-24 text-white drop-shadow-xl" />
                </div>
              </div>
            </div>
            {/* Card 2: Icon left, text right */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              {/* Text */}
              <div className="flex-1 max-w-xl">
                <span className="inline-block mb-4 px-4 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-semibold shadow">Live Events & Analytics</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Compete, Learn, and Grow Every Week</h2>
                <p className="text-lg text-gray-800 mb-6">Join weekly live Bible quiz events, climb the leaderboard, and get instant feedback to help you grow in your knowledge and faith.</p>
                <ul className="space-y-2 text-base text-gray-900">
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /> Real-time scoring and global leaderboards</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /> Compete with friends, family, and churches worldwide</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /> Detailed analytics and progress reports</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /> Earn badges, certificates, and prizes</li>
                </ul>
              </div>
              {/* Icon */}
              <div className="flex-1 flex justify-center">
                <div className="rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 shadow-2xl border-4 border-pink-400/30 p-10 flex items-center justify-center">
                  <Trophy className="w-24 h-24 text-white drop-shadow-xl" />
                </div>
              </div>
            </div>
            {/* Card 3: Icon right, text left */}
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Text */}
              <div className="flex-1 max-w-xl">
                <span className="inline-block mb-4 px-4 py-1 rounded-full bg-gradient-to-r from-green-500 to-blue-600 text-white text-xs font-semibold shadow">Family & Group Play</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Fun for All Ages and Groups</h2>
                <p className="text-lg text-gray-800 mb-6">Host Bible quiz nights for your family, youth group, or church. Enjoy friendly competition and grow together in faith and knowledge.</p>
                <ul className="space-y-2 text-base text-gray-900">
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /> Team and solo play modes</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /> Customizable quiz sessions</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /> Share results and challenge friends</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /> Perfect for all ages and group sizes</li>
                </ul>
              </div>
              {/* Icon */}
              <div className="flex-1 flex justify-center">
                <div className="rounded-full bg-gradient-to-br from-green-400 via-blue-500 to-indigo-500 shadow-2xl border-4 border-green-400/30 p-10 flex items-center justify-center">
                  <Users className="w-24 h-24 text-white drop-shadow-xl" />
                </div>
              </div>
            </div>
            {/* Card 4: Icon left, text right */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              {/* Text */}
              <div className="flex-1 max-w-xl">
                <span className="inline-block mb-4 px-4 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-pink-500 text-white text-xs font-semibold shadow">Scripture Mastery</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Deepen Your Knowledge of the Bible</h2>
                <p className="text-lg text-gray-800 mb-6">Track your progress, review detailed explanations, and master scripture with every quiz you take.</p>
                <ul className="space-y-2 text-base text-gray-900">
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /> In-depth answer explanations</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /> Progress tracking and achievements</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /> Scripture references for every question</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /> Designed for lifelong learning</li>
                </ul>
              </div>
              {/* Icon */}
              <div className="flex-1 flex justify-center">
                <div className="rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-500 shadow-2xl border-4 border-yellow-400/30 p-10 flex items-center justify-center">
                  <Book className="w-24 h-24 text-white drop-shadow-xl" />
                </div>
              </div>
            </div>
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
        {/* Footer */}
        <footer className="bg-[#181c3a] text-gray-200 pt-16 pb-8 mt-0">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:justify-between md:items-start gap-12">
            {/* Left: Logo and description */}
            <div className="flex-1 min-w-[220px] flex flex-col items-start mb-8 md:mb-0">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-2">
                  <Brain className="w-6 h-6 text-white" />
                </div>
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
                  <li><a href="#about" className="hover:underline text-gray-300">About</a></li>
                  <li><a href="#features" className="hover:underline text-gray-300">Features</a></li>
                  <li><a href="/public-leaderboard" className="hover:underline text-gray-300">Leaderboard</a></li>
                  <li><a href="#faq" className="hover:underline text-gray-300">FAQ</a></li>
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
            © 2024 QuizMaster. All rights reserved.
          </div>
        </footer>
      </div>
      <StickyLeaderboardPanel />
    </>
  );
};

function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const testimonials = bibleTestimonials;
  // Responsive: 1 on mobile, 2 on md, 3 on lg+
  let visible = 1;
  if (typeof window !== 'undefined') {
    if (window.innerWidth >= 1024) visible = 3;
    else if (window.innerWidth >= 768) visible = 2;
  }
  // Clamp current
  const max = testimonials.length - visible;
  const goLeft = () => setCurrent((c) => Math.max(0, c - 1));
  const goRight = () => setCurrent((c) => Math.min(max, c + 1));
  // Show only visible testimonials
  const shown = testimonials.slice(current, current + visible);
  return (
    <div className="relative w-full flex items-center justify-center gap-8">
      <button
        className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-2 transition disabled:opacity-30"
        onClick={goLeft}
        disabled={current === 0}
        aria-label="Previous testimonials"
        style={{ minWidth: 40, minHeight: 40 }}
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <div className="flex gap-8 justify-center flex-1">
        {shown.map((t, i) => (
          <div key={i} className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 flex flex-col items-center border border-gray-200 min-w-[280px] max-w-[350px] w-full">
            <div className="flex mb-2">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="w-5 h-5 text-yellow-400" fill="#facc15" />
              ))}
            </div>
            <div className="text-lg text-gray-900 text-center mb-4">"{t.content}"</div>
            <div className="font-bold text-gray-900">{t.name}</div>
            <div className="text-sm text-gray-700">{t.role}</div>
          </div>
        ))}
      </div>
      <button
        className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-2 transition disabled:opacity-30"
        onClick={goRight}
        disabled={current >= max}
        aria-label="Next testimonials"
        style={{ minWidth: 40, minHeight: 40 }}
      >
        <ArrowRight className="w-6 h-6" />
      </button>
    </div>
  );
}

export default Index;