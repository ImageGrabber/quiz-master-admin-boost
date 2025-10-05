import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchLeaders() {
      try {
        const { data, error } = await supabase
          .from('attempts')
          .select('user_id, score, created_at')
          .order('score', { ascending: false });

        if (error) {
          console.error('Error fetching homepage leaders:', error);
          return;
        }

        const userStats = new Map();
        data?.forEach((attempt) => {
          const userId = attempt.user_id;
          if (userStats.has(userId)) {
            const existing = userStats.get(userId);
            userStats.set(userId, {
              ...existing,
              maxScore: Math.max(existing.maxScore, attempt.score),
              totalScore: existing.totalScore + attempt.score,
              attempts: existing.attempts + 1
            });
          } else {
            userStats.set(userId, {
              id: userId,
              name: 'Loading...', // Will be updated with real name
              maxScore: attempt.score,
              totalScore: attempt.score,
              attempts: 1
            });
          }
        });

        // Get user names from profiles table
        const userIds = Array.from(userStats.keys());
        if (userIds.length > 0) {
          const { data: profiles, error: profilesError } = await supabase
            .from('profiles')
            .select('id, full_name, email')
            .in('id', userIds);

          if (!profilesError && profiles) {
            const profileMap = new Map();
            profiles.forEach(profile => {
              profileMap.set(profile.id, profile);
            });

            // Update user stats with real names
            userStats.forEach((user, userId) => {
              const profile = profileMap.get(userId);
              user.name = profile?.full_name || profile?.email || 'Anonymous User';
            });
          }
        }
        
        const leaderboardData = Array.from(userStats.values())
          .map((user) => ({
            id: user.id,
            name: user.name,
            score: user.maxScore,
            attempts: user.attempts,
          }))
          .sort((a, b) => b.score - a.score)
          .filter((user, index, self) => 
            index === self.findIndex(u => u.id === user.id)
          )
          .slice(0, 3);
        setLeaders(leaderboardData);
      } catch (error) {
        console.error('Unexpected error in fetchLeaders:', error);
      }
    }
    fetchLeaders();
  }, []);

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
            <ul className="flex-1 overflow-y-auto">
              {leaders.slice(0, 3).map((user, i) => (
                <li key={user.id} className="flex items-center justify-between py-2 border-b last:border-b-0 border-blue-50">
                  <div className="flex items-center gap-2">
                    {getRankIcon(i)}
                    <span className="font-semibold text-gray-800">{user.name}</span>
                  </div>
                  <span className="text-blue-700 font-bold">{user.score}</span>
                </li>
              ))}
            </ul>
            <button onClick={() => navigate('/public-leaderboard')} className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">View Full Leaderboard</button>
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
      q: "How do I join a Bible quiz event?",
      a: "Simply sign up for a free account, then join any scheduled quiz event from your dashboard. You can participate in the Bible Quiz Competition 2024, Bible Quiz Competition 2025, and our Online Bible Quiz Competition 2025 from anywhere."
    },
    {
      q: "Are there prizes for top scorers?",
      a: "Yes! Weekly and monthly top scorers win prizes, certificates, and recognition on the leaderboard in every Bible competition."
    },
    {
      q: "Is the Bible Quiz suitable for all ages?",
      a: "Yes, our quizzes are designed for all ages, from kids to adults, with questions for every level. Join the Bible competition 2025 with your family or group!"
    },
    {
      q: "How is my score calculated?",
      a: "You earn points for correct answers, speed, and bonus rounds. Wrong answers may deduct points. This applies to all our Bible quiz competitions."
    },
    {
      q: "Do I need to pay to participate?",
      a: "Most quizzes are free to join. Some special events, like the Online Bible Quiz Competition 2025, may require a small entry fee for prizes."
    }
  ];
  const [open, setOpen] = useState(null);
  return (
    <section className="py-24 bg-white">
      <div className="max-w-2xl mx-auto px-4">
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
        <div className="space-y-4">
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Calculate days until next Saturday
  const [nextQuizLabel, setNextQuizLabel] = useState("");
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
        <title>Bible Quiz Competition 2024 & 2025 | Online Bible Quiz Events</title>
        <meta name="description" content="Join the biggest Bible Quiz Competition 2024 and Online Bible Quiz Competition 2025. Compete online, win prizes, and test your biblical knowledge!" />
        <meta property="og:title" content="Bible Quiz Competition 2024 & 2025 | Online Bible Quiz Events" />
        <meta property="og:description" content="Join the biggest Bible Quiz Competition 2024 and Online Bible Quiz Competition 2025. Compete online, win prizes, and test your biblical knowledge!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/bible-quiz-competition-2024-2025" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bible Quiz Competition 2024 & 2025 | Online Bible Quiz Events" />
        <meta name="twitter:description" content="Join the biggest Bible Quiz Competition 2024 and Online Bible Quiz Competition 2025. Compete online, win prizes, and test your biblical knowledge!" />
      </Helmet>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white/70 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex flex-row justify-between items-center relative">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}> 
              <img src="/sword.png" alt="Bible Quiz Competition Logo" className="w-7 h-7 mr-2 inline-block align-middle" />
              <span className="text-lg font-semibold text-gray-900">Bible Quiz Competition</span>
            </div>
            {/* Hamburger for mobile */}
            <button
              className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Open navigation menu"
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              <Menu className="w-7 h-7 text-gray-900" />
            </button>
            {/* Nav links for desktop */}
            <nav className="hidden md:flex items-center space-x-2">
              <button className="text-black font-semibold px-4 py-2 bg-transparent border-none shadow-none hover:underline" onClick={() => navigate("/bible-questions-and-answers-hub/genesis")}>Bible Q&A Hub</button>
              <button className="text-black font-semibold px-4 py-2 bg-transparent border-none shadow-none hover:underline" onClick={() => navigate("/articles")}>Articles</button>
              <button className="text-black font-semibold px-4 py-2 bg-transparent border-none shadow-none hover:underline" onClick={() => navigate("/auth/login")}>Sign In</button>
              <Button variant="ghost" className="bg-black text-white font-semibold px-4 py-2 rounded" onClick={() => navigate("/auth/register")}>Sign Up</Button>
            </nav>
            {/* Mobile dropdown menu */}
            {mobileMenuOpen && (
              <div className="md:hidden absolute top-full right-4 mt-2 w-48 bg-white rounded-lg shadow-lg border border-blue-100 z-50 flex flex-col items-stretch">
                <button className="text-black font-semibold px-4 py-3 text-left hover:bg-blue-50 rounded-t-lg" onClick={() => { setMobileMenuOpen(false); navigate("/bible-questions-and-answers-hub/genesis"); }}>Bible Q&A Hub</button>
                <button className="text-black font-semibold px-4 py-3 text-left hover:bg-blue-50" onClick={() => { setMobileMenuOpen(false); navigate("/articles"); }}>Articles</button>
                <button className="text-black font-semibold px-4 py-3 text-left hover:bg-blue-50" onClick={() => { setMobileMenuOpen(false); navigate("/auth/login"); }}>Sign In</button>
                <button className="bg-black text-white font-semibold px-4 py-3 text-left hover:bg-gray-900 rounded-b-lg" onClick={() => { setMobileMenuOpen(false); navigate("/auth/register"); }}>Sign Up</button>
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
              <div className="flex justify-center mb-4">
                <span className="inline-flex items-center px-4 py-1 mt-20 mb-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm shadow">
                  <Calendar className="w-4 h-4 mr-2" />
                  Next Quiz: Saturday, 8 AM – 8 PM <span className="ml-2 text-white font-normal">{nextQuizLabel}</span>
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 leading-tight  mb-4">
                Join the <span className="text-blue-700">Bible Quiz Challenge!</span>
              </h1>
              <p className="text-xl text-gray-700 mb-6 max-w-4xl mx-auto leading-relaxed">
                Test your knowledge, compete with others, and climb the leaderboard every Saturday.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold rounded shadow-lg hover:shadow-xl transition-all duration-300" onClick={() => navigate("/auth/login")}> <Play className="w-5 h-5 mr-2" /> Start Quiz Now <ArrowRight className="w-5 h-5 ml-2" /> </Button>
                <Button variant="outline" size="lg" className="px-8 py-6 text-lg font-medium border-2 border-grey-200 hover:border-transparent rounded bg-white/60 backdrop-blur-md hover:text-white hover:bg-black" onClick={() => navigate("/public-leaderboard")}> <Trophy className="w-5 h-5 mr-2" /> View Leaderboard</Button>
              </div>
              
            </div>
            
          </div>
           {/* Statistics */}
        <section className="mb-40 mt-32">
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

        {/* Get Started CTA Section */}
        <section className="py-10 md:py-20 bg-gradient-to-br from-blue-50 via-purple-100 to-white relative overflow-hidden px-2 sm:px-4">
          
          <div className="container mx-auto px-2 sm:px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Ready to Test Your Bible Knowledge?
              </h2>
              <p className="text-base sm:text-xl text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Join thousands of participants—compete with others and test your biblical knowledge every Saturday.
                <span className="font-semibold text-yellow-600"> Don't miss this week's competition!</span>
              </p>
              {/* Urgency Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10 max-w-md sm:max-w-2xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-700 mb-1 sm:mb-2">500+</div>
                  <div className="text-gray-700 text-xs sm:text-sm">Questions Available</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-700 mb-1 sm:mb-2">1,250+</div>
                  <div className="text-gray-700 text-xs sm:text-sm">Already Competing</div>
                </div>
              </div>
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8 w-full max-w-md mx-auto">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-6 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl rounded-xl shadow-2xl hover:shadow-yellow-400/25 transition-all duration-300 transform hover:scale-105" 
                  onClick={() => navigate("/auth/register")}
                >
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                  JOIN NOW - IT'S FREE!
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2 sm:ml-3" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto border-2 border-white bg-white text-black hover:bg-gray-100 font-semibold px-6 sm:px-8 py-4 sm:py-6 text-lg rounded-xl transition-all duration-300" 
                  onClick={() => navigate("/auth/login")}
                >
                  <User className="w-5 h-5 mr-2" />
                  Sign In
                </Button>
              </div>
              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-6 text-gray-700 text-xs sm:text-sm mb-4 sm:mb-0">
                <div className="flex items-center gap-1 sm:gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  No Credit Card Required
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Instant Access
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Free to Join
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Win Real Prizes
                </div>
              </div>
              {/* Final Message */}
              <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-green-500/20 border border-green-400/30 rounded-xl">
                <p className="text-green-800 font-semibold text-xs sm:text-base">
                  🎯 <span className="text-yellow-600">JOIN ANYTIME!</span> Registration is always open. 
                  Start competing today and improve your Bible knowledge with every quiz!
                </p>
              </div>
            </div>
          </div>
        </section>

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