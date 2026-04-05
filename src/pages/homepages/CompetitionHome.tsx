import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, BookOpen, Trophy, Sparkles, Brain, Clock, Mail, Star, Users, Calendar, TrendingUp, ChevronLeft, ChevronRight, Quote, Zap, Globe, Gamepad2 } from 'lucide-react';

import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { bibleBooks, featuredQuizzes, categories, bibleStructure } from "@/data/bible-data";

const CompetitionHome = () => {
  const navigate = useNavigate();

  const getBookSlug = (book: string) => book.toLowerCase().replace(/ /g, "-");

  const getBookInfo = (book: string) => {
    const slug = getBookSlug(book);
    const quiz = featuredQuizzes.find(q => q.link.includes(slug));
    const chapters = (bibleStructure as any)[slug] || 0;
    return {
      summary: quiz?.description || `Study the ${book} with deep-dive chapter quizzes and guided learning.`,
      chapters: chapters
    };
  };

  const allBooks = useMemo(() => [
    ...bibleBooks.oldTestament.Pentateuch,
    ...bibleBooks.oldTestament.Historical,
    ...bibleBooks.oldTestament.Wisdom,
    ...bibleBooks.oldTestament.MajorProphets,
    ...bibleBooks.oldTestament.MinorProphets,
    ...bibleBooks.newTestament.Gospels,
    ...bibleBooks.newTestament.Historical,
    ...bibleBooks.newTestament.PaulineEpistles,
    ...bibleBooks.newTestament.GeneralEpistles,
    ...bibleBooks.newTestament.Apocalyptic,
  ], []);
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
      quote: "The daily Bible quiz challenges have become part of my morning routine. I've learned so much and love competing with others. The Bible Quiz Competition 2026 is amazing!",
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
      quote: "Checking the bible quiz competition 2026 results every week is so exciting. I love seeing my name climb the leaderboard!",
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-white via-emerald-50/40 to-teal-50/30",
      borderColor: "border-emerald-100/50",
      quoteColor: "text-emerald-400/40",
      blurColor: "from-emerald-400/10 to-teal-400/10"
    },
    {
      id: 5,
      name: "Lucas Martinez",
      initials: "LM",
      role: "Multiplayer Fan",
      quote: "The Scripture Match game is so addictive! My friends and I play it every weekend. It's the most fun way to memorize verses we've ever found.",
      gradient: "from-rose-500 to-orange-500",
      bgGradient: "from-white via-rose-50/40 to-orange-50/30",
      borderColor: "border-rose-100/50",
      quoteColor: "text-rose-400/40",
      blurColor: "from-rose-400/10 to-orange-400/10"
    },
    {
      id: 6,
      name: "Rachel Singh",
      initials: "RS",
      role: "Worship Leader",
      quote: "The new Hindi Christian song library is a blessing. Having the lyrics and videos all in one place makes my service preparation so much easier!",
      gradient: "from-indigo-500 to-blue-500",
      bgGradient: "from-white via-indigo-50/40 to-blue-50/30",
      borderColor: "border-indigo-100/50",
      quoteColor: "text-indigo-400/40",
      blurColor: "from-indigo-400/10 to-blue-400/10"
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
      id: "2026-competition-overview",
      title: "2026 Competition Overview",
      excerpt: "Everything you need to know about the upcoming quiz season and prizes.",
      readTime: "4 min read",
      author: "Competition Team",
      category: "News"
    }
  ];

  const trendingSearchLinks = [
    {
      label: "Nehemiah Quiz",
      description: "Leadership, rebuilding the wall, and covenant renewal.",
      path: "/public-quiz/nehemiah"
    },
    {
      label: "2 Thessalonians Quiz",
      description: "Day of the Lord, perseverance, and Christian discipline.",
      path: "/public-quiz/2-thessalonians"
    },
    {
      label: "Philemon Bible Quiz",
      description: "Forgiveness, restoration, and brotherhood in Christ.",
      path: "/public-quiz/philemon"
    },
    {
      label: "Bible Quiz Prize Guide",
      description: "See prize rules, eligibility, and winner updates.",
      path: "/bible-quiz-prize"
    },
    {
      label: "Quiz Scoring System Explanation",
      description: "Learn points, timer bonus, and tie-break rules.",
      path: "/quiz-scoring-system-explanation"
    },
    {
      label: "Online Bible Quiz Competition 2026",
      description: "Join free challenges and climb the leaderboard.",
      path: "/online-bible-quiz-competition-2026"
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
  const highIntentQuizLinks = new Set([
    "/public-quiz/nehemiah",
    "/public-quiz/2-thessalonians",
    "/public-quiz/philemon"
  ]);

  const prioritizedFeaturedQuizzes = [
    ...featuredQuizzes.filter((quiz) => highIntentQuizLinks.has(quiz.link)),
    ...featuredQuizzes.filter((quiz) => !highIntentQuizLinks.has(quiz.link))
  ].slice(0, 6);

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
        title="Online Bible Quiz Competition 2026 | Free Quizzes, Prizes, and Leaderboards"
        description="Join the Bible Quiz Competition 2026. Play Nehemiah quiz, 2 Thessalonians quiz, and Philemon Bible quiz, earn timer bonuses, and win bible quiz prizes."
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
            },
            {
              "@type": "WebPage",
              "name": "Online Bible Quiz Competition 2026",
              "url": "https://biblequizcompetition.com/",
              "description": "Free online Bible quiz competition with daily challenges, score timer bonuses, bible quiz prizes, and chapter quizzes including Nehemiah, 2 Thessalonians, and Philemon.",
              "about": [
                { "@type": "Thing", "name": "Bible quiz competition 2026" },
                { "@type": "Thing", "name": "Bible Study Hub" },
                { "@type": "Thing", "name": "Kids Bible Stories" },
                { "@type": "Thing", "name": "Christian Song Library" },
                { "@type": "Thing", "name": "Nehemiah quiz" },
                { "@type": "Thing", "name": "2 Thessalonians quiz" },
                { "@type": "Thing", "name": "Philemon Bible quiz" }
              ]
            },
            {
              "@type": "ItemList",
              "name": "Featured Services",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Bible Study Hub", "url": "https://biblequizcompetition.com/bible-questions-and-answers-hub" },
                { "@type": "ListItem", "position": 2, "name": "Kids Bible Stories", "url": "https://biblequizcompetition.com/kids-stories" },
                { "@type": "ListItem", "position": 3, "name": "Christian Song Library", "url": "https://biblequizcompetition.com/songs" }
              ]
            }
          ]
        }}
      />

      <div className="min-h-screen bg-slate-50 font-urbanist">
        <Navigation />

        <section className="relative overflow-hidden px-6 pt-10 pb-20 lg:pt-16 lg:pb-24 bg-gradient-to-b from-white via-slate-50 to-white">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.1),transparent_45%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#64748b10_1px,transparent_1px),linear-gradient(to_bottom,#64748b10_1px,transparent_1px)] bg-[size:22px_22px]" />
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
            <div className="space-y-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700">
                <Trophy className="w-4 h-4" />
                Live Season 2026
              </span>

              <div>
                <h1 className="text-2xl lg:text-3xl font-semibold font-inter-tight text-slate-500 tracking-tight mb-4">
                  Online Bible Quiz Competition 2026
                </h1>

                <h2 className="text-5xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-[1.05]">
                  Master the Word,<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600">
                    Join the Glory.
                  </span>
                </h2>
              </div>

              <p className="text-xl text-slate-500 font-light max-w-2xl leading-relaxed">
                Join thousands of believers in a free bible competition with daily challenges, transparent scoring, and real bible quiz prizes. Start with our most searched quizzes and grow your Scripture mastery.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <Button
                  onClick={() => navigate('/auth/login')}
                  className="h-14 px-8 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-semibold text-lg hover:scale-[1.02] transition-all duration-300 shadow-lg"
                >
                  Start Playing Now <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/scripture-match-multiplayer')}
                  className="h-14 px-8 border-2 border-slate-200 text-slate-700 hover:border-blue-200 hover:bg-blue-50 rounded-full font-semibold text-lg transition-all duration-300 bg-white"
                >
                  Play Scripture Game <Gamepad2 className="ml-2 w-5 h-5" />
                </Button>
              </div>

            </div>

            <div className="lg:pt-10">
              <Card className="border-slate-200 bg-white/95 backdrop-blur-sm shadow-xl rounded-3xl overflow-hidden">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl text-slate-900">Today's Challenge Pulse</CardTitle>
                  <CardDescription className="text-slate-500">
                    Live momentum from the global bible challenger community.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                    <p className="text-xs uppercase tracking-widest text-blue-600 font-semibold mb-2">Recent Winner</p>
                    <p className="text-xl font-bold text-blue-900">{recentWinners[currentWinnerIndex] || "Community Player"}</p>
                  </div>

                  <div className="space-y-3">
                    {trendingSearchLinks.slice(0, 3).map((item) => (
                      <button
                        key={item.label}
                        onClick={() => navigate(item.path)}
                        className="w-full flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left hover:bg-white hover:border-slate-300 transition-all"
                      >
                        <span className="text-sm font-semibold text-slate-700">{item.label}</span>
                        <ArrowRight className="w-4 h-4 text-slate-500" />
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Premium Bible Study Hub Section */}
        <section className="py-24 bg-white relative overflow-hidden border-b border-slate-100">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(59,130,246,0.05),transparent_40%)]" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Premium Bible Study Hub</h2>
                <p className="text-lg text-slate-500 font-light leading-relaxed">
                  Deep-dive into all 66 books with chapter-specific quizzes and theological summaries. Each book is a gateway to deeper understanding.
                </p>
              </div>
              <Button
                onClick={() => navigate("/bible-questions-and-answers-hub")}
                className="rounded-full bg-slate-900 hover:bg-slate-800 text-white px-8 h-12 shadow-lg hover:scale-105 transition-all"
              >
                Browse Full Library <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            <div className="flex overflow-x-auto pb-8 gap-6 no-scrollbar -mx-4 px-4 snap-x snap-mandatory">
              {allBooks.slice(0, 10).map((book) => {
                const info = getBookInfo(book);
                const slug = getBookSlug(book);
                return (
                  <div
                    key={book}
                    className="flex-shrink-0 w-44 sm:w-56 snap-start"
                    onClick={() => navigate(`/bible-questions-and-answers-hub/${slug}`)}
                  >
                    <Card className="border border-slate-100 hover:border-blue-200 transition-all duration-500 bg-white overflow-hidden group shadow-sm hover:shadow-2xl cursor-pointer rounded-3xl relative">
                      <div className="aspect-[3/4] w-full bg-slate-50 overflow-hidden relative">
                        <img
                          src={`/images/books/${slug}.png`}
                          alt={`${book} Study Hub`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent && !parent.querySelector('.fallback-icon')) {
                              const fallback = document.createElement('div');
                              fallback.className = 'absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center opacity-60';
                              fallback.innerHTML = `<div class="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm border border-blue-100">
                                <span class="text-2xl font-bold text-blue-400 font-urbanist">${book.charAt(0)}</span>
                              </div>`;
                              parent.appendChild(fallback);
                            }
                          }}
                        />

                        {/* Discovery Overlay */}
                        <div className="absolute inset-x-0 bottom-0 top-0 bg-slate-900/80 translate-y-full group-hover:translate-y-0 transition-transform duration-500 backdrop-blur-md p-6 flex flex-col justify-end text-white z-20">
                          <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-blue-400 mb-2">{info.chapters} Chapters</p>
                          <p className="text-sm font-light leading-relaxed mb-6 line-clamp-4 italic opacity-90">{info.summary}</p>
                          <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-500 text-xs h-9 rounded-full font-semibold shadow-lg">Start Study</Button>
                        </div>
                      </div>
                      <CardContent className="p-4 text-center">
                        <span className="text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors uppercase tracking-wider">{book}</span>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Kids & Songs Featured Section */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-10">
              {/* Kids Stories Card */}
              <div
                className="group relative overflow-hidden rounded-[2.5rem] bg-indigo-600 p-10 cursor-pointer shadow-2xl hover:scale-[1.02] transition-all duration-500"
                onClick={() => navigate("/kids-stories")}
              >
                <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-125 transition-transform duration-700">
                  <Sparkles className="w-48 h-48 text-white" />
                </div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-sm font-bold text-white backdrop-blur-md">
                      <Star className="w-4 h-4 fill-white" /> Kids Corner
                    </span>
                    <h3 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">Interactive Bible Stories</h3>
                    <p className="text-xl text-indigo-100 font-light max-w-md leading-relaxed">
                      Beautifully illustrated stories of faith for children, featuring the David & Goliath quiz, Noah's Ark, and more.
                    </p>
                  </div>
                  <div className="pt-10 flex items-center gap-4">
                    <Button className="bg-white text-indigo-600 hover:bg-indigo-50 rounded-full font-bold px-8 h-12">
                      Explore Stories
                    </Button>
                    <span className="text-white/60 text-sm font-medium italic group-hover:translate-x-2 transition-transform">Free Quizzes Included →</span>
                  </div>
                </div>
              </div>

              {/* Songs Card */}
              <div
                className="group relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-10 cursor-pointer shadow-2xl hover:scale-[1.02] transition-all duration-500"
                onClick={() => navigate("/songs")}
              >
                <div className="absolute bottom-0 right-0 p-12 opacity-10 group-hover:scale-125 transition-transform duration-700">
                  <Globe className="w-48 h-48 text-white" />
                </div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm font-bold text-white backdrop-blur-md">
                      <Zap className="w-4 h-4" /> Global Worship
                    </span>
                    <h3 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">Christian Song Library</h3>
                    <p className="text-xl text-slate-400 font-light max-w-md leading-relaxed">
                      Browse 500+ Hindi & International Christian songs with lyrics and video embeds. Perfect for worship and personal study.
                    </p>
                  </div>
                  <div className="pt-10 flex items-center gap-4">
                    <Button className="bg-blue-600 text-white hover:bg-blue-500 rounded-full font-bold px-8 h-12 border-none">
                      Find Songs
                    </Button>
                    <span className="text-slate-500 text-sm font-medium italic group-hover:translate-x-2 transition-transform">A-Z Directory Available →</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features - Clean Grid */}
        < section className="py-24 bg-white relative overflow-hidden" >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">Designed for Growth</h2>
              <p className="text-lg text-slate-500 font-light leading-relaxed">
                More than just a game. It's a journey to deepen your understanding of the Scripture through consistent, engaging practice.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Calendar className="w-6 h-6 text-blue-600" />,
                  title: "Daily Habits",
                  desc: "Build consistency with fresh bible quiz competition 2026 challenges every single day.",
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
                  icon: <Clock className="w-6 h-6 text-pink-600" />,
                  title: "Fair Scoring",
                  desc: "Read our quiz scoring system explanation, including timer bonus and tie-break rules.",
                  color: "bg-pink-50"
                },
                {
                  icon: <Globe className="w-6 h-6 text-cyan-600" />,
                  title: "Global Ranking",
                  desc: "Compare your bible quiz competition 2026 results with challengers worldwide on the leaderboard.",
                  color: "bg-cyan-50"
                }
              ].map((feature, idx) => (
                <div key={idx} className="group p-8 rounded-3xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-500">
                  <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed font-light">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section >

        {/* How It Works - Bible Challenger Journey */}
        <section className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">How to Become a Bible Challenger</h2>
              <p className="text-lg text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
                Your journey to mastering the Word starts here. Follow these simple steps to join the online bible quiz competition.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { title: "1. Register Free", desc: "Sign up instantly to join the online bible quiz competition 2026.", icon: Users },
                { title: "2. Study Daily", desc: "Use our hubs for Genesis 8 quiz prep and more.", icon: BookOpen },
                { title: "3. Take Quizzes", desc: "Compete in daily and weekly online bible quizzes.", icon: Brain },
                { title: "4. Win Prizes", desc: "Review bible quiz prize rules and check live results weekly.", icon: Trophy }
              ].map((step, idx) => (
                <div key={idx} className="relative flex flex-col items-center text-center p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all">
                  <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mb-6 shadow-sm z-10">
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
              <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">Browse by Category</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
                Explore bible quizzes organized by biblical categories.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category, idx) => (
                <Card key={idx} className="group hover:shadow-xl transition-all duration-300 border border-slate-200 shadow-sm bg-white overflow-hidden cursor-pointer rounded-3xl hover:-translate-y-1" onClick={() => navigate('/bible-questions-and-answers-hub')}>
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shadow-sm text-blue-600">
                        <category.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">{category.name}</h3>
                    </div>
                    <p className="text-slate-600 font-light leading-relaxed mb-6">
                      {category.description}
                    </p>
                    <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
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
        <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">Featured Quizzes</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
                Test your knowledge with our most popular bible quizzes.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prioritizedFeaturedQuizzes.map((quiz) => (
                <Card key={quiz.title} className="border border-slate-200 hover:border-blue-200 transition-all duration-300 cursor-pointer group bg-white shadow-sm hover:shadow-lg rounded-3xl hover:-translate-y-1" onClick={() => navigate(quiz.link)}>
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
                <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-4">Latest Insights</h2>
                <p className="text-lg text-slate-600 max-w-2xl font-light leading-relaxed">
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
                <article key={article.id} className="group cursor-pointer flex flex-col h-full bg-slate-50 p-8 rounded-3xl hover:bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300" onClick={() => navigate("/articles")}>
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
        < section className="py-24 bg-gradient-to-b from-slate-50 to-white" >
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Mail className="w-8 h-8" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">Stay Connected</h2>
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
                className="w-full h-14 pl-12 pr-36 rounded-full border border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-slate-600 placeholder:text-slate-400 bg-white shadow-sm"
              />
              <Button type="submit" className="absolute right-1.5 h-11 px-6 rounded-full bg-slate-900 text-white hover:bg-blue-600 transition-colors font-semibold">
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
              <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">Stories from the Community</h2>
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
                          <div key={testimonial.id} className="bg-slate-50 p-8 rounded-3xl border border-slate-200 hover:bg-blue-50/50 hover:border-blue-100 transition-colors duration-300">
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
              <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
              <p className="text-lg text-slate-500 font-light leading-relaxed">
                Everything you need to know about the online bible quiz competition 2026.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { q: "Is the Bible Quiz Competition 2026 free to join?", a: "Yes. It is completely free to register and participate in this online bible quiz competition. Bible study and healthy competition should be accessible to everyone." },
                { q: "How do I check Bible Quiz Competition 2026 results?", a: "Results are updated after each quiz attempt. You can track your rank on the leaderboard and compare your progress over time." },
                { q: "Where can I find a quiz scoring system explanation?", a: "Open our scoring guide to see exactly how points are calculated, how timer bonus points work, and how tie-breaks are decided in prize rounds." },
                { q: "What topics are covered in the quizzes?", a: "We cover the entire Bible! You'll find specific challenges like the Genesis 8 quiz, Matthew quiz, and thematic quizzes on characters and theology." },
                { q: "Who can become a Bible Challenger?", a: "Anyone! Whether you're a beginner or a scholar, our bible challenger levels adapt to your knowledge, helping you grow step-by-step." }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:border-slate-300 transition-colors">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{faq.q}</h3>
                  <p className="text-slate-500 font-light leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Minimal */}
        < section className="py-24 px-6" >
          <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-12 lg:p-24 text-center relative overflow-hidden border border-slate-700">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[100px]"></div>

            <div className="relative z-10">
              <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
                Ready to start your journey?
              </h2>
              <p className="text-lg text-slate-300 font-light mb-12 max-w-2xl mx-auto">
                Join our community of believers and start your online bible quiz journey today. Become a top Bible Challenger. It's free and always will be.
              </p>
              <Button
                size="lg"
                className="h-16 px-10 rounded-full bg-white text-slate-900 font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg"
                onClick={() => navigate("/auth/register")}
              >
                Join for Free
              </Button>
            </div>
          </div>
        </section >

        {/* Simple Footer */}
        < footer className="py-14 border-t border-slate-200 bg-white" >
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-slate-900" />
              <span className="font-bold text-slate-900 tracking-tight">Bible Quiz Competition</span>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex gap-6 text-sm font-medium text-slate-500">
                <button onClick={() => navigate("/privacy")} className="hover:text-slate-900 transition-colors">Privacy</button>
                <button onClick={() => navigate("/terms")} className="hover:text-slate-900 transition-colors">Terms</button>
                <button onClick={() => navigate("/help")} className="hover:text-slate-900 transition-colors">Support</button>
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
              © 2026 All rights reserved.
            </div>
          </div>
        </footer >
      </div >
    </>
  );
};

export default CompetitionHome;
