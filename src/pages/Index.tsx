import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Clock, Users, Brain, ArrowRight, Play, BookOpen, Star, Award, User, Calendar, HelpCircle, TrendingUp, MessageCircle, CheckCircle, Globe, Home, Settings } from "lucide-react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { MoveDirection } from "tsparticles-engine";

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
    description: "Create your account or log in to get started."
  },
  {
    icon: Play,
    title: "Start a Quiz",
    description: "Choose a category and begin your quiz journey."
  },
  {
    icon: Star,
    title: "Answer Questions",
    description: "Test your knowledge and earn points for correct answers."
  },
  {
    icon: Trophy,
    title: "Climb the Leaderboard",
    description: "See how you rank against other participants."
  }
];

const categories = [
  { name: "Old Testament", icon: BookOpen, color: "from-orange-400 to-yellow-400" },
  { name: "New Testament", icon: BookOpen, color: "from-blue-400 to-indigo-400" },
  { name: "Bible Characters", icon: Users, color: "from-green-400 to-emerald-400" },
  { name: "Events", icon: Calendar, color: "from-purple-400 to-pink-400" }
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

const Index = () => {
  const navigate = useNavigate();
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
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
      <section className="relative w-full px-4 py-5 text-center overflow-hidden">
        <div className="relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-4">
              <span className="inline-flex items-center px-4 py-1 mt-28 mb-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm shadow">
                <Calendar className="w-4 h-4 mr-2" /> Next Quiz: Saturday, 8 AM – 8 PM
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-10 leading-tight">
              Test Your Faith & Knowledge<br />
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Bible Quiz Competition</span>
            </h1>
            <p className="text-xl text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
              Join our weekly Bible Quiz every <span className="font-semibold text-blue-700">Saturday, 8 AM – 8 PM</span>! Compete with believers from around the world, answer 25 challenging questions, and win exciting prizes. Climb the leaderboard and become a Bible Quiz Champion!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" onClick={() => navigate("/auth/login")}> <Play className="w-5 h-5 mr-2" /> Start Quiz Now <ArrowRight className="w-5 h-5 ml-2" /> </Button>
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg font-medium border-2 border-blue-200 hover:border-blue-300 rounded-xl bg-white/60 backdrop-blur-md" onClick={() => navigate("/leaderboard")}> <Trophy className="w-5 h-5 mr-2" /> View Leaderboard</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-0">
        <div className="container mx-auto px-4 mb-10">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1"><Users className="w-4 h-4 text-blue-500" /> 1,250+ participants</div>
            <div className="flex items-center gap-1"><Award className="w-4 h-4 text-purple-500" /> $15,000+ prizes awarded</div>
            <div className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500" /> Weekly winners & special rewards</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-4xl mx-auto mt-20">
            {stats.map((stat, i) => (
              <div key={i} className="rounded-2xl shadow-none p-2 flex flex-col items-center bg-transparent">
                <stat.icon className="w-8 h-8 text-blue-500 mb-2" />
                <div className="text-2xl font-bold text-blue-700">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-10">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {howItWorks.map((step, i) => (
              <div key={i} className="bg-white/60 backdrop-blur-md rounded-2xl shadow p-6 flex flex-col items-center">
                <step.icon className="w-10 h-10 text-purple-500 mb-4" />
                <div className="text-lg font-semibold mb-2">{step.title}</div>
                <div className="text-gray-600 text-center">{step.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz Categories */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50/60">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-10">Quiz Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {categories.map((cat, i) => (
              <div key={i} className={`rounded-2xl shadow p-6 flex flex-col items-center bg-gradient-to-br ${cat.color} bg-opacity-60 backdrop-blur-md`}>
                <cat.icon className="w-10 h-10 text-white mb-4" />
                <div className="text-lg font-semibold text-white mb-2">{cat.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-10">Leaderboard Preview</h3>
          <div className="max-w-xl mx-auto bg-white/60 backdrop-blur-md rounded-2xl shadow p-8">
            <div className="flex flex-col gap-4">
              {leaderboard.map((user, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold text-lg">{user.avatar}</div>
                    <span className="font-semibold text-gray-800">{user.name}</span>
                  </div>
                  <span className="text-xl font-bold text-blue-700">{user.score}</span>
                </div>
              ))}
            </div>
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

      {/* FAQ */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50/60">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h3>
          <div className="max-w-2xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white/60 backdrop-blur-md rounded-2xl shadow p-6 cursor-pointer" onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-gray-800">{faq.q}</div>
                  <HelpCircle className="w-5 h-5 text-blue-400" />
                </div>
                {faqOpen === i && <div className="mt-2 text-gray-600">{faq.a}</div>}
              </div>
            ))}
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
  );
};

export default Index;
