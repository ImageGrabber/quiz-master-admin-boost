import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, ArrowRight, Menu, Search, X } from "lucide-react";
import { Helmet } from 'react-helmet';

const publicPages = [
  { title: "Bible Q&A Hub", path: "/bible-questions-and-answers-hub", category: "Bible Study" },
  { title: "Articles", path: "/articles", category: "Resources" },
  { title: "Help & Support", path: "/help", category: "Support" },
  { title: "Leaderboard", path: "/public-leaderboard", category: "Competition" },
  { title: "Daily Verse", path: "/daily-verse", category: "Bible Study" },
  { title: "Prayer Requests", path: "/prayer-requests", category: "Community" },
  { title: "Today's Quiz", path: "/todays-quiz", category: "Quizzes" },
  { title: "Weekly Quiz", path: "/weekly-quiz", category: "Quizzes" },
];

const SignUpToday = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof publicPages>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

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

  const handleSearchSelect = (path: string) => {
    navigate(path);
    setSearchQuery("");
    setShowSearchResults(false);
  };

  return (
    <>
      <Helmet>
        <title>Sign Up Today - Unlock Your Full Journey</title>
        <meta name="description" content="Track your daily records, water intake, take quizzes, read Bible, maintain streak, ease your mind and fight your sorrows, worries and more by signing up!" />
      </Helmet>
      
      <div className="min-h-screen bg-white">
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

      <main className="relative flex flex-col items-center justify-center px-6 py-12 md:py-20 bg-white">
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
        
        <div className="text-center max-w-4xl mx-auto relative z-10 mb-8">
          {/* Subtitle */}
          <p className="text-sm font-urbanist font-light text-purple-600 uppercase tracking-wider mb-3 mt-0 md:mt-2">
            — Unlock Your Full Journey —
          </p>
          
          {/* Main Headline */}
          <h1 className="text-3xl md:text-5xl font-urbanist font-medium text-gray-700 mb-3 md:mb-4 leading-tight">
            We're More Than a Bible Quiz Competition Site
          </h1>
          
        </div>

        {/* Main Content Card */}
        <div className="w-full max-w-4xl mx-auto mb-6 md:mb-8 relative z-10">
          <div className="bg-white rounded-lg p-6 md:p-8 shadow-lg border border-gray-200">
            {/* We're More Than a Quiz Platform */}
            <div className="mb-8">
              <div className="text-center">
                <p className="text-base md:text-lg font-urbanist font-light text-gray-700 leading-relaxed max-w-3xl mx-auto">
                  We're here to support you through your care, worries, anxiety, and every step of your journey toward peace through quizzes, CBT tools, and comprehensive wellness resources.
                </p>
              </div>
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
                      Track your emotional journey and progress over time
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
                      Monitor your daily hydration and maintain wellness
                    </p>
                  </div>
                </div>
              </div>

              {/* Quizzes */}
              <div className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📝</span>
                  </div>
                  <div>
                    <h3 className="text-base font-urbanist font-semibold text-gray-900 mb-2">Interactive Quizzes</h3>
                    <p className="text-sm font-urbanist font-light text-gray-600 leading-relaxed">
                      Test your knowledge with Bible quizzes and CBT assessments
                    </p>
                  </div>
                </div>
              </div>

              {/* Bible Reading */}
              <div className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📖</span>
                  </div>
                  <div>
                    <h3 className="text-base font-urbanist font-semibold text-gray-900 mb-2">Bible Reading</h3>
                    <p className="text-sm font-urbanist font-light text-gray-600 leading-relaxed">
                      Access daily verses and scripture-based content
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
                      Build and maintain daily habits with streak tracking
                    </p>
                  </div>
                </div>
              </div>

              {/* Mental Wellness */}
              <div className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🧘</span>
                  </div>
                  <div>
                    <h3 className="text-base font-urbanist font-semibold text-gray-900 mb-2">Ease Your Mind</h3>
                    <p className="text-sm font-urbanist font-light text-gray-600 leading-relaxed">
                      Access CBT tools, thought records, and mindfulness practices
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex justify-center mb-4 md:mb-6">
              <Button
                onClick={() => navigate("/auth/register")}
                className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-urbanist font-light text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                Sign Up Now - It's Free!
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </main>
      </div>
    </>
  );
};

export default SignUpToday;

