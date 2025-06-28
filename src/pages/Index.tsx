import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Clock, Users, Brain, ArrowRight, Play, BookOpen, Star, Award, User, Calendar, HelpCircle, TrendingUp, MessageCircle, CheckCircle, Globe, Home, Settings, Medal, Crown } from "lucide-react";
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

const testimonials = [
  {
    name: "Sarah Johnson",
    content: "The quiz platform is fun and challenging! I love seeing my progress on the leaderboard.",
    avatar: "SJ"
  },
  {
    name: "Michael Chen",
    content: "Great for Bible study groups. The transparent design is beautiful!",
    avatar: "MC"
  },
  {
    name: "Emily Rodriguez",
    content: "I learned so much and the UI is so modern and easy to use.",
    avatar: "ER"
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
  { label: "Prizes Awarded", value: "$15,000+", icon: Award }
];

function StickyLeaderboardPanel() {
  const [leaders, setLeaders] = useState([]);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchLeaders() {
      let query = supabase
        .from('attempts')
        .select(`user_id, score, created_at, profiles!inner(full_name, email)`);
      const { data, error } = await query;
      if (error) return;
      const userStats = new Map();
      data?.forEach((attempt) => {
        const userId = attempt.user_id;
        const userName = attempt.profiles?.full_name || attempt.profiles?.email || 'Anonymous';
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
            name: userName,
            maxScore: attempt.score,
            totalScore: attempt.score,
            attempts: 1
          });
        }
      });
      const leaderboardData = Array.from(userStats.values())
        .map((user) => ({
          id: user.id,
          name: user.name,
          score: user.maxScore,
          attempts: user.attempts,
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
      setLeaders(leaderboardData);
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
      <div className={`h-[420px] ${open ? 'bg-white/80 p-4 border-l border-blue-100 shadow-xl' : 'bg-white/60 p-1 border-l border-blue-100 shadow'} rounded-l-2xl backdrop-blur-md flex flex-col items-stretch relative`}>
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
              {leaders.map((user, i) => (
                <li key={user.id} className="flex items-center justify-between py-2 border-b last:border-b-0 border-blue-50">
                  <div className="flex items-center gap-2">
                    {getRankIcon(i)}
                    <span className="font-semibold text-gray-800">{user.name}</span>
                  </div>
                  <span className="text-blue-700 font-bold">{user.score}</span>
                </li>
              ))}
            </ul>
            <button onClick={() => navigate('/leaderboard')} className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">View Full Leaderboard</button>
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

const Index = () => {
  const navigate = useNavigate();
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

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
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}> 
              <Brain className="w-7 h-7 text-black" />
              <span className="text-lg font-semibold text-gray-900">QuizMaster</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" onClick={() => navigate("/leaderboard")}> <Trophy className="w-4 h-4 mr-1 inline" /> Leaderboard </Button>
              <Button variant="ghost" onClick={() => navigate("/auth/register")}>Sign Up</Button>
              <Button onClick={() => navigate("/auth/login")}>Sign In</Button>
            </div>
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
                  <Calendar className="w-4 h-4 mr-2" /> Next Quiz: Saturday, 8 AM – 8 PM
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 leading-tight  mb-4">
                Join the Bible Quiz Competition 2024 & 2025<br />
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent text-5xl md:text-6xl   mt-4">Online Bible Quiz Competition</span>
              </h1>
              <p className="text-xl text-gray-700 mb-6 max-w-4xl mx-auto leading-relaxed">
                Join our weekly Bible Quiz every <span className="font-semibold text-blue-700">Saturday, 8 AM – 8 PM</span>! Participate in the Bible Quiz Competition 2024 and get ready for the Online Bible Quiz Competition 2025. Compete with believers from around the world, answer 25 challenging questions, and win exciting prizes. Climb the leaderboard and become a Bible Quiz Champion!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" onClick={() => navigate("/auth/login")}> <Play className="w-5 h-5 mr-2" /> Start Quiz Now <ArrowRight className="w-5 h-5 ml-2" /> </Button>
                <Button variant="outline" size="lg" className="px-8 py-6 text-lg font-medium border-2 border-grey-200 hover:border-blue-300 rounded-xl bg-white/60 backdrop-blur-md" onClick={() => navigate("/leaderboard")}> <Trophy className="w-5 h-5 mr-2" /> View Leaderboard</Button>
              </div>
              
            </div>
            
          </div>
           {/* Statistics */}
        <section className="mb-40 mt-5">
          <div className="container mx-auto px-4 mb-10">
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1"><Users className="w-4 h-4 text-blue-500" /> 1,250+ participants</div>
              <div className="flex items-center gap-1"><Award className="w-4 h-4 text-purple-500" /> $15,000+ prizes awarded</div>
              <div className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500" /> Weekly winners & special rewards</div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-4xl mx-auto mt-20">
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

       

        {/* How It Works */}
        <section className="py-24 mb-24 mt-10 bg-gradient-to-br from-white via-blue-50 to-purple-50 overflow-hidden">
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

        {/* Quiz Categories */}
        <section className="py-4 bg-white">
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

        

        {/* Testimonials */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50/60">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-10">What Our Users Say</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-white/60 backdrop-blur-md rounded-2xl shadow p-6 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold text-2xl mb-4">{t.avatar}</div>
                  <div className="italic text-gray-700 mb-2">"{t.content}"</div>
                  <div className="font-semibold text-blue-700">{t.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-10">Upcoming Events</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {events.map((e, i) => (
                <div key={i} className="bg-white/60 backdrop-blur-md rounded-2xl shadow p-6 flex flex-col items-center">
                  <Calendar className="w-8 h-8 text-purple-500 mb-2" />
                  <div className="font-semibold text-lg mb-1">{e.title}</div>
                  <div className="text-blue-700 mb-1">{e.date}</div>
                  <div className="text-gray-600 text-center">{e.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Bible Quiz Competitions 2024 & 2025 */}
        <section className="py-6">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl font-bold mb-2 text-center">Upcoming Bible Quiz Competitions 2024 & 2025</h2>
            <p className="text-gray-700 text-center mb-4">Stay tuned for our special Bible Quiz Competition 2024 and Online Bible Quiz Competition 2025. Register now to secure your spot and get updates about the biggest online Bible quiz events!</p>
            <ul className="list-disc list-inside text-left text-gray-700">
              <li><strong>Bible Quiz Competition 2024:</strong> Major event with prizes and global participation.</li>
              <li><strong>Online Bible Quiz Competition 2025:</strong> Compete from anywhere in the world, test your knowledge, and win rewards.</li>
              <li><strong>Bible Quiz Competition 2025:</strong> Details coming soon. Subscribe for updates!</li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-6">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl font-bold mb-4 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">How do I join the Bible Quiz Competition 2024?</h3>
                <p>Register online for the Bible Quiz Competition 2024 using our sign-up form. The event is open to all ages and will be held online.</p>
              </div>
              <div>
                <h3 className="font-semibold">Is there an online Bible quiz competition in 2025?</h3>
                <p>Yes! Our Online Bible Quiz Competition 2025 is scheduled for next year. Stay tuned for updates and registration details.</p>
              </div>
              <div>
                <h3 className="font-semibold">What are the prizes for the Bible Quiz Competition 2024 and 2025?</h3>
                <p>Winners of the Bible Quiz Competition 2024 and Online Bible Quiz Competition 2025 will receive exciting prizes, certificates, and global recognition.</p>
              </div>
              <div>
                <h3 className="font-semibold">Can I participate in both the 2024 and 2025 Bible quiz competitions?</h3>
                <p>Absolutely! You can register and participate in both the Bible Quiz Competition 2024 and the Online Bible Quiz Competition 2025.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white/70 backdrop-blur-md border-t border-blue-100 py-8 mt-8">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900">QuizMaster</span>
            </div>
            <p className="text-gray-600">© 2024 QuizMaster. Challenge your knowledge.</p>
          </div>
        </footer>
      </div>
      <StickyLeaderboardPanel />
    </>
  );
};

export default Index;
