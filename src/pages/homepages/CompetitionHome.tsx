import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, BookOpen, Trophy, Sparkles, Brain, Clock, Mail, Star, Users, Calendar, TrendingUp, ChevronLeft, ChevronRight, Quote, Zap, Globe, Gamepad2 } from 'lucide-react';

import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { featuredQuizzes, categories } from "@/data/bible-data";

const CompetitionHome = () => {
  const navigate = useNavigate();
  const [competitions, setCompetitions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dailyChallenge, setDailyChallenge] = useState<any>(null);
  const [timeRemaining, setTimeRemaining] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [todayStats, setTodayStats] = useState({ winners: 0, levelsUnlocked: 0, participants: 120 });
  const [recentWinners, setRecentWinners] = useState<string[]>([
    'Sarah J.', 'Mark T.', 'Emily R.', 'David K.', 'Lisa M.',
    'John P.', 'Maria S.', 'Alex B.', 'Rachel W.', 'Chris L.'
  ]);
  const [currentWinnerIndex, setCurrentWinnerIndex] = useState(0);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      initials: "SJ",
      role: "Daily Participant",
      quote: "The daily Bible quiz challenges have become part of my morning routine. I've learned so much and love competing with others. The Bible Quiz Competition 2025-2026 is amazing!",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-white via-blue-50/40 to-cyan-50/30",
      borderColor: "border-blue-100/50",
      quoteColor: "text-blue-400/40",
      blurColor: "from-blue-400/10 to-cyan-400/10"
    },
    {
      id: 2,
      name: "Michael Thompson",
      initials: "MT",
      role: "Prize Winner",
      quote: "I won my first prize last month! The leaderboard keeps me motivated, and I've made friends with other Bible quiz lovers. This competition has deepened my faith.",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-white via-purple-50/40 to-pink-50/30",
      borderColor: "border-purple-100/50",
      quoteColor: "text-purple-400/40",
      blurColor: "from-purple-400/10 to-pink-400/10"
    },
    {
      id: 3,
      name: "David Kim",
      initials: "DK",
      role: "Quiz Master",
      quote: "Creating quizzes and seeing people grow in their knowledge has been incredible. The new daily format keeps everyone engaged!",
      gradient: "from-amber-500 to-orange-500",
      bgGradient: "from-white via-amber-50/40 to-orange-50/30",
      borderColor: "border-amber-100/50",
      quoteColor: "text-amber-400/40",
      blurColor: "from-amber-400/10 to-orange-400/10"
    },
    {
      id: 4,
      name: "Esther White",
      initials: "EW",
      role: "Bible Challenger",
      quote: "Checking the bible quiz competition 2025-2026 results every week is so exciting. I love seeing my name climb the leaderboard!",
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-white via-emerald-50/40 to-teal-50/30",
      borderColor: "border-emerald-100/50",
      quoteColor: "text-emerald-400/40",
      blurColor: "from-emerald-400/10 to-teal-400/10"
    }
  ];

  // Mock Data for Articles
  const featuredArticles = [
    {
      id: "quiz-strategies",
      title: "5 Proven Strategies for Bible Quiz Success",
      excerpt: "Expert techniques used by top performers to consistently achieve high scores.",
      readTime: "8 min read",
      author: "Dr. Sarah Johnson",
      category: "Strategy"
    },
    {
      id: "david-king-israel",
      title: "King David: From Shepherd to King",
      excerpt: "Explore the life of David and the lessons we can learn from his journey.",
      readTime: "10 min read",
      author: "Dr. David Thompson",
      category: "Characters"
    },
    {
      id: "understanding-grace",
      title: "Understanding God's Grace",
      excerpt: "Dive deep into the concept of grace and how it transforms lives.",
      readTime: "11 min read",
      author: "Pastor Michael Chen",
      category: "Theology"
    },
    {
      id: "power-of-psalms",
      title: "The Power of Psalms in Daily Life",
      excerpt: "How the book of Psalms can provide comfort and guidance in modern times.",
      readTime: "7 min read",
      author: "Esther White",
      category: "Devotional"
    },
    {
      id: "bible-study-101",
      title: "Bible Study 101: Where to Start?",
      excerpt: "A beginner's guide to effective bible study habits and resources.",
      readTime: "5 min read",
      author: "Mark Taylor",
      category: "Education"
    },
    {
      id: "2025-competition-overview",
      title: "2025-2026 Competition Overview",
      excerpt: "Everything you need to know about the upcoming quiz season and prizes.",
      readTime: "4 min read",
      author: "Competition Team",
      category: "News"
    }
  ];


  const [testimonialsPerViewState, setTestimonialsPerViewState] = useState(3);

  useEffect(() => {
    // Load Tidio chat script
    const script = document.createElement('script');
    script.src = '//code.tidio.co/enkm7pw3z2k1zidnow6e2wj9fdt7jwo2.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up script when component unmounts
      const existingScript = document.querySelector('script[src*="tidio.co"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  useEffect(() => {
    const updateTestimonialsPerView = () => {
      setTestimonialsPerViewState(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1);
    };
    updateTestimonialsPerView();
    window.addEventListener('resize', updateTestimonialsPerView);
    return () => window.removeEventListener('resize', updateTestimonialsPerView);
  }, []);

  const totalSlides = Math.ceil(testimonials.length / testimonialsPerViewState);

  useEffect(() => {
    fetchDailyChallenge();
    fetchActiveCompetitions();

    // Rotate winners every 5 seconds
    const winnerInterval = setInterval(() => {
      if (recentWinners.length > 0) {
        setCurrentWinnerIndex((prev) => (prev + 1) % recentWinners.length);
      }
    }, 5000);

    return () => {
      clearInterval(winnerInterval);
    };
  }, [recentWinners.length]);

  // Auto-rotate testimonials
  useEffect(() => {
    const totalSlides = Math.ceil(testimonials.length / testimonialsPerViewState);
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % totalSlides);
    }, 8000); // Slower rotation for readability

    return () => {
      clearInterval(testimonialInterval);
    };
  }, [testimonialsPerViewState, testimonials.length]);

  useEffect(() => {
    if (dailyChallenge?.end_time) {
      // Update countdown every second
      const countdownInterval = setInterval(() => {
        updateCountdown();
      }, 1000);

      // Initial update
      updateCountdown();

      return () => {
        clearInterval(countdownInterval);
      };
    }
  }, [dailyChallenge?.end_time]);

  const fetchDailyChallenge = async () => {
    try {
      // Call the Supabase function to get or create today's challenge
      const { data, error } = await (supabase as any)
        .rpc('get_or_create_daily_challenge');

      if (error) throw error;

      // Handle both array and single object responses
      const challenge = Array.isArray(data) ? data[0] : data;

      if (challenge) {
        setDailyChallenge(challenge);
        // Fetch stats and winners after challenge is loaded
        fetchTodayStats(challenge.id);
        fetchRecentWinners(challenge.id);
      }
    } catch (error) {
      console.error('Error fetching daily challenge:', error);
      // Fallback: use end of day
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      setDailyChallenge({ end_time: endOfDay.toISOString() });
    }
  };

  const updateCountdown = () => {
    if (!dailyChallenge?.end_time) return;

    const now = new Date();
    const endTime = new Date(dailyChallenge.end_time);

    const diff = endTime.getTime() - now.getTime();

    if (diff > 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining({ hours, minutes, seconds });
    } else {
      setTimeRemaining({ hours: 0, minutes: 0, seconds: 0 });
      // Refresh challenge if time expired
      fetchDailyChallenge();
    }
  };

  const fetchTodayStats = async (challengeId?: number) => {
    // Generate random numbers based on today's date so they are consistent for the day but refresh daily
    const today = new Date();
    const dateString = today.toDateString();

    // Simple hash function to generate a seed from the date string
    let hash = 0;
    for (let i = 0; i < dateString.length; i++) {
      hash = ((hash << 5) - hash) + dateString.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    // Helper to get random number between min and max using the hash
    const getSeededRandom = (min: number, max: number, offset: number) => {
      const seed = Math.abs(hash + offset);
      return (seed % (max - min + 1)) + min;
    };

    // Participants: Random between 1500 and 3000
    const mockParticipants = getSeededRandom(1500, 3000, 1);

    // Winners: Random between 200 and 500
    const mockWinners = getSeededRandom(200, 500, 2);

    // Levels unlocked: Random between 1000 and 2000
    const mockLevels = getSeededRandom(1000, 2000, 3);

    setTodayStats({
      winners: mockWinners,
      levelsUnlocked: mockLevels,
      participants: mockParticipants
    });
  };

  const fetchRecentWinners = async (challengeId?: number) => {
    try {
      if (!challengeId && !dailyChallenge?.id) {
        // Fallback demo winners
        setRecentWinners([
          'Sarah J.', 'Mark T.', 'Emily R.', 'David K.', 'Lisa M.',
          'John P.', 'Maria S.', 'Alex B.', 'Rachel W.', 'Chris L.'
        ]);
        return;
      }

      const id = challengeId || dailyChallenge.id;

      // Fetch recent winners from daily challenge attempts
      const { data } = await (supabase as any)
        .from('daily_challenge_attempts')
        .select(`
          user:profiles(full_name, username),
          score,
          completed,
          completed_at
        `)
        .eq('daily_challenge_id', id)
        .eq('completed', true)
        .order('completed_at', { ascending: false })
        .limit(10);

      if (data && data.length > 0) {
        const names = data.map((entry: any) => {
          const name = entry.user?.full_name || entry.user?.username || 'Anonymous';
          return name.split(' ')[0] + (name.includes(' ') ? ' ' + name.split(' ')[1][0] + '.' : '');
        });
        setRecentWinners(names);
      } else {
        // Fallback demo winners
        setRecentWinners([
          'Sarah J.', 'Mark T.', 'Emily R.', 'David K.', 'Lisa M.',
          'John P.', 'Maria S.', 'Alex B.', 'Rachel W.', 'Chris L.'
        ]);
      }
    } catch (error) {
      console.error('Error fetching recent winners:', error);
      // Fallback demo winners
      setRecentWinners([
        'Sarah J.', 'Mark T.', 'Emily R.', 'David K.', 'Lisa M.',
        'John P.', 'Maria S.', 'Alex B.', 'Rachel W.', 'Chris L.'
      ]);
    }
  };


  const fetchActiveCompetitions = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('competitions')
        .select(`
          *,
          quiz:quizzes(id, title, description)
        `)
        .in('status', ['active', 'upcoming'])
        .order('start_date', { ascending: true })
        .limit(3);

      if (error) throw error;

      const competitionsWithDetails = (data || []).map((competition: any) => ({
        ...competition,
        entries_count: 0, // Simplified for now
      }));

      setCompetitions(competitionsWithDetails);
    } catch (error) {
      console.error('Error fetching competitions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Bible Quiz Competition 2025-2026 | Play Daily"
        description="Join the Bible Quiz Competition 2025-2026. Engage in daily Bible quizzes, test your knowledge, win prizes, and join a global community."
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "name": "Bible Quiz Competition",
              "url": "https://biblequizcompetition.com",
              "sameAs": [
                "https://www.facebook.com/biblequizcompetition",
                "https://twitter.com/biblequiz"
              ]
            },
            {
              "@type": "WebSite",
              "name": "Bible Quiz Competition",
              "url": "https://biblequizcompetition.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://biblequizcompetition.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          ]
        }}
      />

      <div className="min-h-screen bg-slate-50 font-urbanist">
        <Navigation />

        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center pt-24 lg:pt-0 px-6 overflow-hidden bg-slate-50">
          {/* Refined Background - Sleeker with Pattern */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute top-0 right-0 w-[80vw] h-[80vw] bg-gradient-to-br from-blue-100/30 via-violet-100/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] bg-gradient-to-tr from-indigo-100/30 via-purple-100/20 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          </div>

          <div className="max-w-5xl mx-auto w-full relative z-10">
            <div className="flex flex-col items-center text-center space-y-8">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-semibold font-inter-tight text-slate-500 tracking-tight mb-4">
                    Online Bible Quiz Competition 2025-2026
                  </h1>

                  <h2 className="text-5xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-[1.05] drop-shadow-sm">
                    Master the Word,<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-600 to-indigo-600">
                      Join the Glory.
                    </span>
                  </h2>
                </div>

                <p className="text-xl text-slate-500 font-light max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Join thousands of believers in the ultimate online Bible quiz competition 2025-2026. Test your knowledge as a Bible Challenger, track your growth, and compete for amazing prizes.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                  <Button
                    onClick={() => navigate('/auth/login')}
                    className="h-14 px-8 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
                  >
                    Start Playing Now <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/scripture-match-multiplayer')}
                    className="h-14 px-8 border-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 rounded-full font-semibold text-lg transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  >
                    Play Scripture Game <Gamepad2 className="ml-2 w-5 h-5" />
                  </Button>
                </div>
            </div>
          </div>
        </section >

        {/* Features - Clean Grid */}
        < section className="py-24 bg-white relative" >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Designed for Growth</h2>
              <p className="text-lg text-slate-500 font-light">
                More than just a game. It's a journey to deepen your understanding of the Scripture through consistent, engaging practice.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Calendar className="w-6 h-6 text-blue-600" />,
                  title: "Daily Habits",
                  desc: "Build consistency with fresh bible quiz 2025-2026 challenges every single day.",
                  color: "bg-blue-50"
                },
                {
                  icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
                  title: "Track Progress",
                  desc: "Visualize your growth and see how much you've learned as a bible challenger.",
                  color: "bg-emerald-50"
                },
                {
                  icon: <Users className="w-6 h-6 text-violet-600" />,
                  title: "Community",
                  desc: "Connect with like-minded believers in this online bible quiz competition.",
                  color: "bg-violet-50"
                },
                {
                  icon: <Zap className="w-6 h-6 text-amber-600" />,
                  title: "Instant Feedback",
                  desc: "Get immediate answers and explanations to learn faster after every quiz.",
                  color: "bg-amber-50"
                },
                {
                  icon: <Sparkles className="w-6 h-6 text-pink-600" />,
                  title: "Expert Insights",
                  desc: "Deepen understanding with commentary on Genesis 8 and more.",
                  color: "bg-pink-50"
                },
                {
                  icon: <Globe className="w-6 h-6 text-cyan-600" />,
                  title: "Global Ranking",
                  desc: "Compare your 2025-2026 results with challengers worldwide on the leaderboard.",
                  color: "bg-cyan-50"
                }
              ].map((feature, idx) => (
                <div key={idx} className="group p-8 rounded-[2rem] bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500">
                  <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed font-light">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section >

        {/* How It Works - Bible Challenger Journey */}
        <section className="py-24 bg-slate-50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">How to Become a Bible Challenger</h2>
              <p className="text-lg text-slate-500 font-light max-w-2xl mx-auto">
                Your journey to mastering the Word starts here. Follow these simple steps to join the online bible quiz competition.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { title: "1. Register Free", desc: "Sign up instantly to join the bible competition 2025-2026.", icon: Users },
                { title: "2. Study Daily", desc: "Use our hubs for Genesis 8 quiz prep and more.", icon: BookOpen },
                { title: "3. Take Quizzes", desc: "Compete in daily and weekly online bible quizzes.", icon: Brain },
                { title: "4. Win Prizes", desc: "Check bible quiz competition 2025-2026 results weekly.", icon: Trophy }
              ].map((step, idx) => (
                <div key={idx} className="relative flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-white border-2 border-blue-100 flex items-center justify-center mb-6 shadow-sm z-10">
                    <step.icon className="w-8 h-8 text-blue-600" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-500 text-sm font-light leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Browse by Category - Replaces old Featured Hubs */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Browse by Category</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
                Explore bible quizzes organized by biblical categories.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category, idx) => (
                <Card key={idx} className="group hover:shadow-xl transition-all duration-300 border border-slate-100 shadow-sm bg-slate-50 overflow-hidden cursor-pointer" onClick={() => navigate('/bible-questions-and-answers-hub')}>
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-blue-600">
                        <category.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">{category.name}</h3>
                    </div>
                    <p className="text-slate-600 font-light leading-relaxed mb-6">
                      {category.description}
                    </p>
                    <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform">
                      Explore Category <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg" className="rounded-full px-8 border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200" onClick={() => navigate("/bible-questions-and-answers-hub")}>
                View All Categories
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Quizzes Preview */}
        <section className="py-24 bg-slate-50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Featured Quizzes</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
                Test your knowledge with our most popular bible quizzes.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredQuizzes.slice(0, 6).map((quiz) => (
                <Card key={quiz.title} className="border border-white hover:border-blue-200 transition-all duration-300 cursor-pointer group bg-white shadow-sm hover:shadow-md" onClick={() => navigate(quiz.link)}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                        <quiz.icon className="w-6 h-6 text-blue-600" strokeWidth={1.5} />
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-urbanist font-medium text-slate-600">{quiz.difficulty}</div>
                        <div className="text-sm font-urbanist font-light text-slate-500">{quiz.questions} questions</div>
                      </div>
                    </div>
                    <CardTitle className="text-xl font-urbanist font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{quiz.title}</CardTitle>
                    <CardDescription className="font-urbanist font-light text-slate-600">{quiz.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full font-urbanist font-light border-slate-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50" variant="outline">
                      Start Quiz
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button variant="outline" size="lg" className="rounded-full px-8 border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200" onClick={() => navigate("/bible-questions-and-answers-hub")}>
                View All Quizzes
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        < section className="py-24 bg-white" >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Latest Insights</h2>
                <p className="text-lg text-slate-600 max-w-2xl font-light">
                  Strategies, devotionals, and updates from our community.
                </p>
              </div>
              <div className="hidden md:block">
                <Button variant="ghost" className="text-slate-500 hover:text-blue-600" onClick={() => navigate("/articles")}>
                  Read all articles <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {featuredArticles.map((article) => (
                <article key={article.id} className="group cursor-pointer flex flex-col h-full bg-slate-50 p-8 rounded-[2rem] hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-xl transition-all duration-300" onClick={() => navigate("/articles")}>
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
                      {article.category}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{article.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-slate-500 font-light leading-relaxed line-clamp-3 mb-6 flex-1">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-200/50 mt-auto">
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                      By {article.author}
                    </span>
                    <div className="text-blue-600 font-medium text-sm flex items-center group-hover:translate-x-1 transition-transform">
                      Read <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 text-center md:hidden">
              <Button variant="outline" className="w-full rounded-full" onClick={() => navigate("/articles")}>
                Read All Articles
              </Button>
            </div>
          </div>
        </section >

        {/* Newsletter */}
        < section className="py-24 bg-slate-50" >
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-3">
              <Mail className="w-8 h-8" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Stay Connected</h2>
            <p className="text-lg text-slate-600 max-w-xl mx-auto font-light mb-10">
              Get the latest quiz schedules, study tips, and daily inspiration delivered straight to your inbox.
            </p>

            <form className="max-w-md mx-auto relative flex items-center" onSubmit={(e) => e.preventDefault()}>
              <div className="absolute left-4 text-slate-400">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full h-14 pl-12 pr-36 rounded-full border border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-slate-600 placeholder:text-slate-400 bg-white"
              />
              <Button type="submit" className="absolute right-1.5 h-11 px-6 rounded-full bg-slate-900 text-white hover:bg-blue-600 transition-colors">
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-slate-400 mt-6">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </section >

        {/* Testimonials - Human Centric */}
        < section className="py-24 bg-white relative overflow-hidden" >
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Stories from the Community</h2>
            </div>

            <div className="relative">
              {/* Controls */}
              <div className="flex justify-end gap-3 mb-6">
                <button
                  onClick={() => setCurrentTestimonialIndex(i => (i - 1 + totalSlides) % totalSlides)}
                  className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50"
                >
                  <ChevronLeft className="w-5 h-5 text-slate-600" />
                </button>
                <button
                  onClick={() => setCurrentTestimonialIndex(i => (i + 1) % totalSlides)}
                  className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50"
                >
                  <ChevronRight className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              <div className="overflow-hidden rounded-[2.5rem]">
                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${currentTestimonialIndex * 100}%)` }}
                >
                  {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                    <div key={slideIndex} className="min-w-full grid md:grid-cols-3 gap-6">
                      {testimonials
                        .slice(slideIndex * testimonialsPerViewState, slideIndex * testimonialsPerViewState + testimonialsPerViewState)
                        .map((testimonial) => (
                          <div key={testimonial.id} className="bg-slate-50 p-8 rounded-[2rem] hover:bg-blue-50/50 transition-colors duration-300">
                            <Quote className="w-8 h-8 text-blue-200 mb-6" />
                            <p className="text-slate-600 font-light text-lg mb-8 leading-relaxed">
                              "{testimonial.quote}"
                            </p>
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs">
                                {testimonial.initials}
                              </div>
                              <div>
                                <div className="font-bold text-slate-900 text-sm">{testimonial.name}</div>
                                <div className="text-xs text-slate-400 font-medium uppercase tracking-wide">{testimonial.role}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section >

        {/* FAQ Section */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
              <p className="text-lg text-slate-500 font-light">
                Everything you need to know about the online bible quiz competition 2025-2026.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { q: "Is the Bible Quiz Competition 2025-2026 free to join?", a: "Yes! It is completely free to register and participate in the online bible quiz competition. We believe Bible knowledge should be accessible to everyone." },
                { q: "How do I check the 2025 results?", a: "Results are updated instantly after every quiz. You can view the global leaderboard and your personal progress on the 'Results' page." },
                { q: "What topics are covered in the quizzes?", a: "We cover the entire Bible! You'll find specific challenges like the Genesis 8 quiz, Matthew quiz, and thematic quizzes on characters and theology." },
                { q: "Who can become a Bible Challenger?", a: "Anyone! Whether you're a beginner or a scholar, our bible challenger levels adapt to your knowledge, helping you grow step-by-step." }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{faq.q}</h3>
                  <p className="text-slate-500 font-light leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Minimal */}
        < section className="py-24 px-6" >
          <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-12 lg:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-500/20 rounded-full blur-[100px]"></div>

            <div className="relative z-10">
              <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
                Ready to start your journey?
              </h2>
              <p className="text-lg text-slate-300 font-light mb-12 max-w-2xl mx-auto">
                Join our community of believers and start your online bible quiz journey today. Become a top Bible Challenger. It's free and always will be.
              </p>
              <Button
                size="lg"
                className="h-16 px-10 rounded-full bg-white text-slate-900 font-bold text-lg hover:bg-blue-50 transition-colors"
                onClick={() => navigate("/auth/register")}
              >
                Join for Free
              </Button>
            </div>
          </div>
        </section >

        {/* Simple Footer */}
        < footer className="py-12 border-t border-slate-100 bg-white" >
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-slate-900" />
              <span className="font-bold text-slate-900 tracking-tight">Bible Quiz Competition</span>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex gap-6 text-sm font-medium text-slate-500">
                <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
                <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
                <a href="#" className="hover:text-slate-900 transition-colors">Support</a>
              </div>
              <div className="hidden md:block w-px h-4 bg-slate-200"></div>
              <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-500">
                <button onClick={() => navigate("/bible-quiz-questions-and-answers")} className="hover:text-blue-600 transition-colors">Questions & Answers</button>
                <button onClick={() => navigate("/rules-and-prizes")} className="hover:text-blue-600 transition-colors">Rules & Prizes</button>
                <button onClick={() => navigate("/hardest-bible-trivia-questions")} className="hover:text-blue-600 transition-colors">Hardest Trivia</button>
                <button onClick={() => navigate("/bible-quiz-with-answers-for-youth")} className="hover:text-blue-600 transition-colors">Youth Quiz</button>
              </div>
            </div>

            <div className="text-sm text-slate-400">
              © 2025-2026 All rights reserved.
            </div>
          </div>
        </footer >
      </div >
    </>
  );
};

export default CompetitionHome;
