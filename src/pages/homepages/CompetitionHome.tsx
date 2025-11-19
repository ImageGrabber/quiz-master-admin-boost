import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Play, TrendingUp, Calendar, Sparkles, ArrowRight, Clock, Users, Unlock, Star, Quote, CheckCircle, Heart, Award, MessageCircle, HelpCircle, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { Helmet } from 'react-helmet';
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";

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
      quote: "The daily Bible quiz challenges have become part of my morning routine. I've learned so much and love competing with others. The Bible Quiz Competition 2025 is amazing!",
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
      name: "Emily Rodriguez",
      initials: "ER",
      role: "Teacher & Participant",
      quote: "As a Sunday school teacher, I use these quizzes to prepare my lessons. The questions are thoughtful and help me engage my students better. Highly recommend!",
      gradient: "from-amber-500 to-orange-500",
      bgGradient: "from-white via-amber-50/40 to-orange-50/30",
      borderColor: "border-amber-100/50",
      quoteColor: "text-amber-400/40",
      blurColor: "from-amber-400/10 to-orange-400/10"
    },
    {
      id: 4,
      name: "David Kim",
      initials: "DK",
      role: "Bible Study Leader",
      quote: "Our Bible study group uses these quizzes every week. It's brought our group closer together and made learning fun. The competition aspect adds excitement!",
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-white via-emerald-50/40 to-teal-50/30",
      borderColor: "border-emerald-100/50",
      quoteColor: "text-emerald-400/40",
      blurColor: "from-emerald-400/10 to-teal-400/10"
    },
    {
      id: 5,
      name: "Lisa Martinez",
      initials: "LM",
      role: "Youth Leader",
      quote: "Perfect for engaging teenagers! The daily challenges keep them interested in Bible study. I've seen such growth in their knowledge and enthusiasm.",
      gradient: "from-rose-500 to-pink-500",
      bgGradient: "from-white via-rose-50/40 to-pink-50/30",
      borderColor: "border-rose-100/50",
      quoteColor: "text-rose-400/40",
      blurColor: "from-rose-400/10 to-pink-400/10"
    },
    {
      id: 6,
      name: "James Wilson",
      initials: "JW",
      role: "Pastor",
      quote: "I recommend this to my congregation regularly. It's a wonderful way to deepen biblical knowledge while having fun. The questions are well-crafted and meaningful.",
      gradient: "from-indigo-500 to-blue-500",
      bgGradient: "from-white via-indigo-50/40 to-blue-50/30",
      borderColor: "border-indigo-100/50",
      quoteColor: "text-indigo-400/40",
      blurColor: "from-indigo-400/10 to-blue-400/10"
    },
    {
      id: 7,
      name: "Rachel Chen",
      initials: "RC",
      role: "Top Performer",
      quote: "I've been in the top 10 for three months straight! The daily challenges are challenging but fair. It's amazing how much I've learned about the Bible.",
      gradient: "from-violet-500 to-purple-500",
      bgGradient: "from-white via-violet-50/40 to-purple-50/30",
      borderColor: "border-violet-100/50",
      quoteColor: "text-violet-400/40",
      blurColor: "from-violet-400/10 to-purple-400/10"
    },
    {
      id: 8,
      name: "Mark Anderson",
      initials: "MA",
      role: "New Participant",
      quote: "I just started last week and I'm already hooked! The interface is easy to use, and I love seeing my progress. Can't wait to climb the leaderboard!",
      gradient: "from-cyan-500 to-blue-500",
      bgGradient: "from-white via-cyan-50/40 to-blue-50/30",
      borderColor: "border-cyan-100/50",
      quoteColor: "text-cyan-400/40",
      blurColor: "from-cyan-400/10 to-blue-400/10"
    },
    {
      id: 9,
      name: "Patricia Brown",
      initials: "PB",
      role: "Long-time Member",
      quote: "Been participating for over a year now. The community is wonderful, and I've made lasting friendships. The Bible Quiz Competition 2025 keeps getting better!",
      gradient: "from-orange-500 to-amber-500",
      bgGradient: "from-white via-orange-50/40 to-amber-50/30",
      borderColor: "border-orange-100/50",
      quoteColor: "text-orange-400/40",
      blurColor: "from-orange-400/10 to-amber-400/10"
    }
  ];

  const [testimonialsPerViewState, setTestimonialsPerViewState] = useState(3);
  
  useEffect(() => {
    const updateTestimonialsPerView = () => {
      setTestimonialsPerViewState(window.innerWidth >= 768 ? 3 : 1);
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
    }, 6000); // Change slide every 6 seconds

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
    try {
      if (!challengeId && !dailyChallenge?.id) {
        // Fallback values if no challenge - always show at least 120
        setTodayStats({
          winners: 0,
          levelsUnlocked: 0,
          participants: 120
        });
        return;
      }

      const id = challengeId || dailyChallenge.id;
      const today = new Date().toISOString().split('T')[0];

      // Fetch completed attempts to calculate levels unlocked
      const { data: attemptsData } = await (supabase as any)
        .from('daily_challenge_attempts')
        .select('user_id, completed, score, daily_challenge_id')
        .eq('daily_challenge_id', id)
        .eq('completed', true);

      // Calculate levels unlocked (unique users who completed)
      const uniqueCompletedUsers = new Set(attemptsData?.map((a: any) => a.user_id) || []);
      const levelsUnlocked = uniqueCompletedUsers.size;

      // Use the database function to get other stats
      const { data: statsData, error: statsError } = await (supabase as any)
        .rpc('get_daily_challenge_stats', { challenge_date_param: today });

      if (statsError) throw statsError;

      // Handle both array and single object responses
      const stats = Array.isArray(statsData) ? statsData[0] : statsData;
      
      if (stats) {
        const realParticipants = stats.total_participants || 0;
        setTodayStats({
          winners: stats.total_winners || 0,
          levelsUnlocked: levelsUnlocked || 0,
          participants: Math.max(120, realParticipants) // Always show at least 120, or real value if higher
        });
      } else {
        // Fallback: count from attempts table
        const { data: allAttemptsData } = await (supabase as any)
          .from('daily_challenge_attempts')
          .select('id, score, daily_challenge_id, user_id, completed')
          .eq('daily_challenge_id', id);

        const realParticipants = allAttemptsData?.length || 0;
        const winners = allAttemptsData?.filter((a: any) => a.completed && a.score === dailyChallenge?.total_questions).length || 0;

        setTodayStats({
          winners,
          levelsUnlocked: levelsUnlocked || 0,
          participants: Math.max(120, realParticipants) // Always show at least 120, or real value if higher
        });
      }
    } catch (error) {
      console.error('Error fetching today stats:', error);
      // Fallback values - always show at least 120
      setTodayStats({
        winners: 0,
        levelsUnlocked: 0,
        participants: 120 // Minimum value
      });
    }
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
          quiz:quizzes(id, title, description),
          entries_count:competition_entries(count)
        `)
        .in('status', ['active', 'upcoming'])
        .order('start_date', { ascending: true })
        .limit(3);

      if (error) throw error;
      
      const competitionsWithDetails = (data || []).map((competition: any) => ({
        ...competition,
        entries_count: competition.entries_count?.[0]?.count || 0,
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
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Bible Quiz Competition 2025 | Daily Challenges, Prizes & Leaderboards</title>
        <meta name="title" content="Bible Quiz Competition 2025 | Daily Challenges, Prizes & Leaderboards" />
        <meta name="description" content="Join the Bible Quiz Competition 2025! Participate in daily Bible quiz challenges, compete for prizes, and climb live leaderboards. Test your Bible knowledge against thousands of players worldwide. Free to join, win amazing prizes in the ultimate Bible quiz competition of 2025." />
        <meta name="keywords" content="bible quiz competition 2025, bible quiz competition, bible quiz 2025, daily bible quiz, bible quiz challenges, bible quiz prizes, bible quiz leaderboard, online bible quiz competition, christian quiz competition 2025, bible knowledge competition, bible quiz tournament, weekly bible quiz, bible study competition, interactive bible quiz, bible quiz app 2025, bible competition prizes, bible quiz games, bible trivia competition, bible quiz contest 2025" />
        <meta name="author" content="Bible Quiz Competition" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="application-name" content="Bible Quiz Competition" />
        <meta name="apple-mobile-web-app-title" content="Bible Quiz 2025" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://biblequizcompetition.com/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://biblequizcompetition.com/" />
        <meta property="og:title" content="Bible Quiz Competition 2025 | Daily Challenges, Prizes & Leaderboards" />
        <meta property="og:description" content="Join the Bible Quiz Competition 2025! Participate in daily Bible quiz challenges, compete for prizes, and climb live leaderboards. Free to join!" />
        <meta property="og:site_name" content="Bible Quiz Competition" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="https://biblequizcompetition.com/sword.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Bible Quiz Competition 2025 - Daily Challenges and Prizes" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://biblequizcompetition.com/" />
        <meta name="twitter:title" content="Bible Quiz Competition 2025 | Daily Challenges & Prizes" />
        <meta name="twitter:description" content="Join the Bible Quiz Competition 2025! Participate in daily challenges, compete for prizes, and climb leaderboards. Free to join!" />
        <meta name="twitter:image" content="https://biblequizcompetition.com/sword.png" />
        <meta name="twitter:image:alt" content="Bible Quiz Competition 2025" />
        
        {/* Structured Data - Organization */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Bible Quiz Competition",
          "url": "https://biblequizcompetition.com",
          "logo": "https://biblequizcompetition.com/sword.png",
          "description": "Join the Bible Quiz Competition 2025 - Daily challenges, prizes, and leaderboards for Bible knowledge enthusiasts.",
          "sameAs": [
            "https://www.facebook.com/",
            "https://twitter.com/"
          ]
        })}</script>
        
        {/* Structured Data - WebApplication */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Bible Quiz Competition 2025",
          "url": "https://biblequizcompetition.com/",
          "applicationCategory": "EducationalApplication",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Participate in daily Bible quiz challenges, compete for prizes, and climb leaderboards in the Bible Quiz Competition 2025.",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "1000"
          }
        })}</script>
        
        {/* Structured Data - BreadcrumbList */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://biblequizcompetition.com/"
            }
          ]
        })}</script>
        
        {/* Structured Data - FAQPage */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Is the Bible Quiz Competition 2025 free to join?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! The Bible Quiz Competition 2025 is completely free to join. Create your account and start participating in daily challenges immediately. No credit card or payment required."
              }
            },
            {
              "@type": "Question",
              "name": "How do I win prizes in the Bible Quiz Competition?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Top performers on the leaderboard earn prizes. The more daily challenges you complete and the higher your scores, the better your chances of winning. Prizes are awarded regularly to active participants."
              }
            },
            {
              "@type": "Question",
              "name": "How often are new Bible quiz challenges available?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "New Bible quiz challenges are available every day! Each daily challenge is unique and designed to test different aspects of your Bible knowledge. You can complete one challenge per day."
              }
            },
            {
              "@type": "Question",
              "name": "Can I participate if I'm new to Bible study?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely! The Bible Quiz Competition 2025 is perfect for all levels, from beginners to Bible scholars. The quizzes help you learn and grow at your own pace, making it an excellent way to deepen your understanding of Scripture."
              }
            },
            {
              "@type": "Question",
              "name": "How does the leaderboard work?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The leaderboard ranks participants based on their performance in daily challenges. Points are awarded for correct answers and completion. Your rank updates in real-time as you complete quizzes, allowing you to track your progress and compete with others."
              }
            }
          ]
        })}</script>
        
        {/* Structured Data - HowTo */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to Join the Bible Quiz Competition 2025",
          "description": "Learn how to participate in the Bible Quiz Competition 2025 and start competing for prizes",
          "step": [
            {
              "@type": "HowToStep",
              "position": 1,
              "name": "Create Account",
              "text": "Sign up for free in seconds. No credit card required. Start your Bible learning journey today."
            },
            {
              "@type": "HowToStep",
              "position": 2,
              "name": "Choose Activities",
              "text": "Participate in daily quizzes, special challenges, Bible reading plans, and various learning activities."
            },
            {
              "@type": "HowToStep",
              "position": 3,
              "name": "Track Progress",
              "text": "Watch your knowledge grow and your rank improve on the leaderboard. Compete with players worldwide."
            },
            {
              "@type": "HowToStep",
              "position": 4,
              "name": "Win Prizes",
              "text": "Top performers earn amazing prizes. The more you participate, the better your chances of winning!"
            }
          ]
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-blue-50/30 via-indigo-50/20 to-white">
        <Navigation />

        {/* Hero Section - Modern & Stylish */}
        <section className="relative py-20 md:py-32 px-6 bg-gradient-to-br from-indigo-50 via-purple-50/80 to-pink-50 overflow-hidden">
          {/* Animated background orbs */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left Column - Content */}
              <div className="text-center md:text-left w-full md:w-auto">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-slate-900 mb-6 leading-[1.1] tracking-tight">
                  Bible Quiz Competition 
                  <span className="block mt-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-medium">
                    2025
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-slate-600 font-light max-w-xl leading-relaxed mb-10 mx-auto md:mx-0">
                  Join thousands in daily Bible quiz competitions. Climb leaderboards, earn prizes, and grow your knowledge every day in the ultimate Bible quiz competition of 2025.
                </p>

                {/* Modern CTA Buttons - Desktop only */}
                <div className="hidden md:flex flex-col sm:flex-row gap-4 mb-12">
                  <Button 
                    size="lg" 
                    className="group relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-6 text-base font-medium tracking-wide rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
                    onClick={() => navigate("/competitions")}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                    <span className="relative flex items-center">
                      <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                      Start Competing
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="bg-white/60 backdrop-blur-md border-2 border-indigo-200 text-slate-700 hover:bg-white/80 hover:border-indigo-300 px-8 py-6 text-base font-medium tracking-wide rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    onClick={() => navigate("/auth/register")}
                  >
                    Create Account
                  </Button>
                </div>

                {/* Today's Stats Grid - Desktop only */}
                <div className="hidden md:grid grid-cols-3 gap-6">
                  <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 border border-indigo-100/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-3 group-hover:rotate-6 transition-transform">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1">{todayStats.participants}+</div>
                    <div className="text-xs text-slate-500 font-medium">Playing Today</div>
                  </div>
                  <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 border border-purple-100/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-3 group-hover:rotate-6 transition-transform">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">{todayStats.winners}</div>
                    <div className="text-xs text-slate-500 font-medium">Winners Today</div>
                  </div>
                  <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 border border-pink-100/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-3 group-hover:rotate-6 transition-transform">
                      <Unlock className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-1">{todayStats.levelsUnlocked}</div>
                    <div className="text-xs text-slate-500 font-medium">Levels Unlocked Today</div>
                  </div>
                </div>
              </div>

              {/* Right Column - Live Countdown */}
              <div className="relative w-full md:w-auto md:ml-48">
                {/* Winner Notifications above Daily Challenge */}
                {recentWinners.length > 0 && (
                  <div className="mb-5 w-full max-w-sm md:w-96 mx-auto">
                    <div 
                      key={currentWinnerIndex}
                      className="relative bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50/90 backdrop-blur-xl border border-amber-200/60 rounded-2xl px-6 py-4 shadow-xl flex items-center gap-4 transition-all duration-700 hover:shadow-2xl hover:scale-[1.02] overflow-hidden group"
                      style={{
                        animation: 'fadeInSlideUp 0.7s ease-out'
                      }}
                    >
                      {/* Animated background glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 via-yellow-400/5 to-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Decorative sparkle effect */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-300/20 to-amber-300/10 rounded-full blur-2xl"></div>
                      
                      {/* Trophy icon with enhanced styling */}
                      <div className="relative z-10 flex-shrink-0">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                          <Trophy className="w-5 h-5 text-white drop-shadow-sm" />
                        </div>
                      </div>
                      
                      {/* Winner text with better typography */}
                      <div className="flex-1 min-w-0 relative z-10">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-semibold text-slate-700 leading-tight">
                            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
                              {recentWinners[currentWinnerIndex]}
                            </span>
                            <span className="text-slate-600 ml-2 font-medium">just scored</span>
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-amber-600 bg-amber-100/60 px-2 py-0.5 rounded-md">
                              100%
                            </span>
                            <span className="text-xs text-slate-500 font-medium">Perfect Score!</span>
                            <span className="text-base animate-bounce">🎉</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Shine effect on hover */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    </div>
                  </div>
                )}
                
                <div className="w-full max-w-sm md:w-96 mx-auto">
                  <Card className="bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 backdrop-blur-xl border-2 border-indigo-200/60 shadow-2xl rounded-3xl overflow-hidden relative group hover:shadow-[0_25px_50px_rgba(99,102,241,0.3)] transition-all duration-500 hover:scale-[1.02]">
                    {/* Decorative gradient overlay */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-400/30 via-purple-400/25 to-pink-400/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-cyan-400/25 to-blue-400/20 rounded-full blur-2xl"></div>
                    
                    <CardContent className="p-7 relative z-10">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-5 py-2.5 rounded-full shadow-lg">
                          <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                          <span className="text-xs font-semibold tracking-wide">Daily Challenge</span>
                        </div>
                        <div className="text-xs text-slate-600 font-semibold bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-slate-200/60 shadow-sm">
                          <Clock className="w-3.5 h-3.5 inline mr-1" />
                          Live
                        </div>
                      </div>

                      {/* Countdown Timer */}
                      <div className="text-center mb-6">
                        <p className="text-sm text-slate-600 font-medium mb-4">Time remaining for Today's Challenge</p>
                        <div className="flex items-center justify-center gap-3">
                          <div className="flex flex-col items-center">
                            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tabular-nums">
                              {String(timeRemaining.hours).padStart(2, '0')}
                            </div>
                            <div className="text-xs text-slate-500 font-medium mt-1">Hours</div>
                          </div>
                          <div className="text-3xl md:text-4xl font-bold text-slate-400 pb-6">:</div>
                          <div className="flex flex-col items-center">
                            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tabular-nums">
                              {String(timeRemaining.minutes).padStart(2, '0')}
                            </div>
                            <div className="text-xs text-slate-500 font-medium mt-1">Minutes</div>
                          </div>
                          <div className="text-3xl md:text-4xl font-bold text-slate-400 pb-6">:</div>
                          <div className="flex flex-col items-center">
                            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tabular-nums animate-pulse">
                              {String(timeRemaining.seconds).padStart(2, '0')}
                            </div>
                            <div className="text-xs text-slate-500 font-medium mt-1">Seconds</div>
                          </div>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Button
                        onClick={() => {
                          if (dailyChallenge?.id) {
                            navigate(`/daily-challenge/${dailyChallenge.id}`);
                          } else {
                            navigate("/competitions");
                          }
                        }}
                        className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 font-semibold py-6 text-base"
                      >
                        <Play className="w-5 h-5 mr-2" />
                        Start Challenge Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      
                      <div className="text-center mt-4">
                        <p className="text-xs text-slate-500">
                          <span className="font-semibold text-indigo-600">{todayStats.participants}+</span> people playing today
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Mobile-only: Buttons and Stats after Quiz */}
            <div className="md:hidden mt-8 space-y-8">
              {/* CTA Buttons */}
              <div className="flex flex-col gap-4">
                <Button 
                  size="lg" 
                  className="group relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-6 text-base font-medium tracking-wide rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden w-full"
                  onClick={() => navigate("/competitions")}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                  <span className="relative flex items-center justify-center">
                    <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Start Competing
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-white/60 backdrop-blur-md border-2 border-indigo-200 text-slate-700 hover:bg-white/80 hover:border-indigo-300 px-8 py-6 text-base font-medium tracking-wide rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full"
                  onClick={() => navigate("/auth/register")}
                >
                  Create Account
                </Button>
              </div>

              {/* Today's Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 border border-indigo-100/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-2 group-hover:rotate-6 transition-transform mx-auto">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1 text-center">{todayStats.participants}+</div>
                  <div className="text-xs text-slate-500 font-medium text-center">Playing Today</div>
                </div>
                <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 border border-purple-100/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-2 group-hover:rotate-6 transition-transform mx-auto">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1 text-center">{todayStats.winners}</div>
                  <div className="text-xs text-slate-500 font-medium text-center">Winners Today</div>
                </div>
                <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 border border-pink-100/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-2 group-hover:rotate-6 transition-transform mx-auto">
                    <Unlock className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-xl font-semibold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-1 text-center">{todayStats.levelsUnlocked}</div>
                  <div className="text-xs text-slate-500 font-medium text-center">Levels Unlocked Today</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <style>{`
          @keyframes fadeInSlideUp {
            from {
              opacity: 0;
              transform: translateY(-15px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>

        {/* Daily Engagement - Key Feature */}
        <section className="relative py-24 md:py-32 px-6 bg-gradient-to-br from-white via-purple-50/40 to-indigo-50/30 overflow-hidden">
          {/* Animated background orbs */}
          <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6 tracking-tight">
                Why Join the <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-medium">Bible Quiz Competition 2025</span>?
              </h2>
              <p className="text-lg md:text-xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
                Build a daily habit, improve your Bible knowledge, and compete in the ultimate Bible quiz competition. Track your progress and see how you rank against thousands of players worldwide.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1 - Daily Challenge */}
              <Card className="relative border-0 shadow-2xl hover:shadow-[0_25px_50px_rgba(59,130,246,0.25)] transition-all duration-700 rounded-[2rem] bg-white/90 backdrop-blur-2xl border-2 border-blue-200/30 hover:border-blue-300/50 hover:scale-[1.03] hover:-translate-y-2 group overflow-hidden">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/20 via-cyan-500/15 to-transparent rounded-bl-[6rem] blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-400/10 to-cyan-400/10 rounded-tr-[4rem] blur-2xl"></div>
                
                {/* Shine effect on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                
                {/* Pattern overlay */}
                <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, #3b82f6 1px, transparent 0)`,
                  backgroundSize: '24px 24px'
                }}></div>
                
                <CardContent className="p-10 relative z-10">
                  {/* Icon with enhanced styling */}
                  <div className="relative mb-4">
                    <div className="relative w-28 h-28 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <Calendar className="w-14 h-14 text-blue-600 drop-shadow-lg" />
                    </div>
                    {/* Badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg border-2 border-white">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">
                    Daily Bible Quiz Challenge
                  </h3>
                  <p className="text-slate-600 font-light leading-relaxed text-base mb-6">
                    Participate in a new Bible quiz challenge every day. Test your knowledge, track your streak, and improve your understanding of Scripture in the Bible Quiz Competition 2025.
                  </p>
                  
                  {/* Feature highlight */}
                  <div className="flex items-center gap-2 text-sm text-blue-600 font-semibold">
                    <CheckCircle className="w-4 h-4" />
                    <span>New challenge daily</span>
                  </div>
                </CardContent>
              </Card>

              {/* Card 2 - Leaderboard */}
              <Card className="relative border-0 shadow-2xl hover:shadow-[0_25px_50px_rgba(168,85,247,0.25)] transition-all duration-700 rounded-[2rem] bg-white/90 backdrop-blur-2xl border-2 border-purple-200/30 hover:border-purple-300/50 hover:scale-[1.03] hover:-translate-y-2 group overflow-hidden">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500/20 via-pink-500/15 to-transparent rounded-bl-[6rem] blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-tr-[4rem] blur-2xl"></div>
                
                {/* Shine effect on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                
                {/* Pattern overlay */}
                <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, #a855f7 1px, transparent 0)`,
                  backgroundSize: '24px 24px'
                }}></div>
                
                <CardContent className="p-10 relative z-10">
                  {/* Icon with enhanced styling */}
                  <div className="relative mb-4">
                    <div className="relative w-28 h-28 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <TrendingUp className="w-14 h-14 text-purple-600 drop-shadow-lg" />
                    </div>
                    {/* Badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-lg border-2 border-white">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">
                    Live Bible Quiz Leaderboard
                  </h3>
                  <p className="text-slate-600 font-light leading-relaxed text-base mb-6">
                    See your rank in real-time on our live leaderboard. Compete with Bible quiz enthusiasts worldwide and watch your position change as you complete challenges.
                  </p>
                  
                  {/* Feature highlight */}
                  <div className="flex items-center gap-2 text-sm text-purple-600 font-semibold">
                    <CheckCircle className="w-4 h-4" />
                    <span>Real-time rankings</span>
                  </div>
                </CardContent>
              </Card>

              {/* Card 3 - Prizes */}
              <Card className="relative border-0 shadow-2xl hover:shadow-[0_25px_50px_rgba(251,146,60,0.25)] transition-all duration-700 rounded-[2rem] bg-white/90 backdrop-blur-2xl border-2 border-amber-200/30 hover:border-amber-300/50 hover:scale-[1.03] hover:-translate-y-2 group overflow-hidden">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-500/20 via-orange-500/15 to-transparent rounded-bl-[6rem] blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-amber-400/10 to-orange-400/10 rounded-tr-[4rem] blur-2xl"></div>
                
                {/* Shine effect on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                
                {/* Pattern overlay */}
                <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, #f59e0b 1px, transparent 0)`,
                  backgroundSize: '24px 24px'
                }}></div>
                
                <CardContent className="p-10 relative z-10">
                  {/* Icon with enhanced styling */}
                  <div className="relative mb-4">
                    <div className="relative w-28 h-28 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <Trophy className="w-14 h-14 text-amber-600 drop-shadow-lg" />
                    </div>
                    {/* Badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-lg border-2 border-white">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">
                    Win Prizes in Bible Quiz Competition
                  </h3>
                  <p className="text-slate-600 font-light leading-relaxed text-base mb-6">
                    Top performers in the Bible Quiz Competition 2025 earn amazing prizes. Climb the ranks, complete daily challenges, and compete for rewards.
                  </p>
                  
                  {/* Feature highlight */}
                  <div className="flex items-center gap-2 text-sm text-amber-600 font-semibold">
                    <CheckCircle className="w-4 h-4" />
                    <span>Amazing rewards</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CTA */}
            <div className="text-center mt-16">
              <Button
                onClick={() => navigate("/auth/register")}
                className="group relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-10 py-7 text-base font-semibold tracking-wide rounded-2xl shadow-2xl hover:shadow-[0_25px_50px_rgba(99,102,241,0.4)] transition-all duration-500 hover:scale-105 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                <span className="relative flex items-center">
                  Join Bible Quiz Competition 2025
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </div>
          </div>
        </section>

        {/* Active Competitions - Simplified */}
        {!loading && competitions.length > 0 && (
          <section className="relative py-24 md:py-32 px-6 bg-gradient-to-br from-indigo-50/30 via-white to-emerald-50/30 overflow-hidden">
            {/* Animated background orbs */}
            <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
              backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}></div>
            
            <div className="max-w-6xl mx-auto relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6 tracking-tight">
                  Active <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-medium">Bible Quiz Competitions</span>
                </h2>
                <p className="text-lg md:text-xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
                  Join active Bible quiz competitions and compete for prizes. Participate in weekly challenges and climb the leaderboard in the Bible Quiz Competition 2025.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {competitions.map((competition, idx) => {
                  const gradients = [
                    "from-blue-50/90 via-cyan-50/70 to-white",
                    "from-purple-50/90 via-pink-50/70 to-white",
                    "from-emerald-50/90 via-teal-50/70 to-white"
                  ];
                  const iconGradients = [
                    "from-blue-500 to-cyan-500",
                    "from-purple-500 to-pink-500",
                    "from-emerald-500 to-teal-500"
                  ];
                  const borderColors = [
                    "border-blue-100/60",
                    "border-purple-100/60",
                    "border-emerald-100/60"
                  ];
                  const gradient = gradients[idx % gradients.length];
                  const iconGradient = iconGradients[idx % iconGradients.length];
                  const borderColor = borderColors[idx % borderColors.length];
                  
                  return (
                    <Card 
                      key={competition.id} 
                      className={`relative border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl bg-gradient-to-br ${gradient} backdrop-blur-xl border ${borderColor} hover:scale-105 cursor-pointer group overflow-hidden`}
                      onClick={() => navigate("/competitions")}
                    >
                      {/* Decorative gradient overlay */}
                      <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${iconGradient.replace('500', '400')}/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700`}></div>
                      
                      <CardContent className="p-8 relative z-10">
                        <div className="flex items-start justify-between mb-6">
                          <h3 className="text-2xl font-semibold text-slate-900 flex-1 leading-tight">
                            {competition.title}
                          </h3>
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${iconGradient} flex items-center justify-center flex-shrink-0 ml-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                            <Trophy className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <p className="text-slate-600 font-light text-base mb-6 leading-relaxed">
                          {competition.description || "Test your Bible knowledge and compete for prizes in this exciting Bible quiz competition."}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-slate-200/60">
                          <span className="text-sm text-slate-500 font-medium">{competition.entries_count} participants</span>
                          <span className="flex items-center text-indigo-600 font-semibold group-hover:text-indigo-700 transition-colors">
                            Join Competition
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* CTA */}
              <div className="text-center mt-16">
                <Button
                  onClick={() => navigate("/competitions")}
                  className="group relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-10 py-7 text-base font-semibold tracking-wide rounded-2xl shadow-2xl hover:shadow-[0_25px_50px_rgba(99,102,241,0.4)] transition-all duration-500 hover:scale-105 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                  <span className="relative flex items-center">
                    View All Competitions
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Testimonials Section */}
        <section className="relative py-24 md:py-32 px-6 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden">
          {/* Animated background orbs */}
          <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tr from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2.5s' }}></div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6 tracking-tight">
                What <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-medium">Participants Say</span>
              </h2>
              <p className="text-lg md:text-xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
                Join thousands of Bible quiz enthusiasts who are growing their knowledge and having fun in the Bible Quiz Competition 2025.
              </p>
            </div>

            {/* Slider Container */}
            <div className="relative">
              {/* Navigation Arrows */}
              <button
                onClick={() => {
                  const total = Math.ceil(testimonials.length / testimonialsPerViewState);
                  setCurrentTestimonialIndex((prev) => (prev - 1 + total) % total);
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md shadow-xl border border-indigo-100 flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 group"
                aria-label="Previous testimonials"
              >
                <ChevronLeft className="w-6 h-6 text-indigo-600 group-hover:text-indigo-700" />
              </button>

              <button
                onClick={() => {
                  const total = Math.ceil(testimonials.length / testimonialsPerViewState);
                  setCurrentTestimonialIndex((prev) => (prev + 1) % total);
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md shadow-xl border border-indigo-100 flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 group"
                aria-label="Next testimonials"
              >
                <ChevronRight className="w-6 h-6 text-indigo-600 group-hover:text-indigo-700" />
              </button>

              {/* Slider Wrapper */}
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${currentTestimonialIndex * 100}%)` }}
                >
                  {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                    <div key={slideIndex} className="min-w-full grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                      {testimonials
                        .slice(slideIndex * testimonialsPerViewState, slideIndex * testimonialsPerViewState + testimonialsPerViewState)
                        .map((testimonial) => (
                          <Card
                            key={testimonial.id}
                            className={`relative border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl bg-gradient-to-br ${testimonial.bgGradient} backdrop-blur-xl border ${testimonial.borderColor} hover:scale-105 group overflow-hidden mb-8 mx-2`}
                          >
                            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${testimonial.blurColor} rounded-full blur-2xl`}></div>
                            <CardContent className="p-8 relative z-10">
                              <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                                ))}
                              </div>
                              <Quote className={`w-8 h-8 ${testimonial.quoteColor} mb-4`} />
                              <p className="text-slate-700 font-light leading-relaxed mb-6 text-base">
                                "{testimonial.quote}"
                              </p>
                              <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-semibold text-lg shadow-lg`}>
                                  {testimonial.initials}
                                </div>
                                <div>
                                  <div className="font-semibold text-slate-900">{testimonial.name}</div>
                                  <div className="text-sm text-slate-500">{testimonial.role}</div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center items-center gap-2 mt-12">
                {Array.from({ length: Math.ceil(testimonials.length / testimonialsPerViewState) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonialIndex(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentTestimonialIndex
                        ? 'w-8 h-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600'
                        : 'w-3 h-3 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* CTA */}
              <div className="text-center mt-16">
                <Button
                  onClick={() => navigate("/auth/register")}
                  className="group relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-10 py-7 text-base font-semibold tracking-wide rounded-2xl shadow-2xl hover:shadow-[0_25px_50px_rgba(99,102,241,0.4)] transition-all duration-500 hover:scale-105 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                  <span className="relative flex items-center">
                    Start Your Journey Today
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="relative py-24 md:py-32 px-6 bg-gradient-to-br from-indigo-50/40 via-white to-purple-50/30 overflow-hidden">
          {/* Animated background orbs */}
          <div className="absolute top-10 right-20 w-72 h-72 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6 tracking-tight">
                How the <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-medium">Bible Quiz Competition</span> Works
              </h2>
              <p className="text-lg md:text-xl text-slate-600 font-light max-w-3xl mx-auto leading-relaxed">
                Join thousands of participants in the Bible Quiz Competition 2025. Engage in daily quizzes, special challenges, Bible reading plans, and more. Track your progress and compete for amazing prizes!
              </p>
            </div>

            {/* Steps */}
            <div className="grid md:grid-cols-4 gap-8 mb-20">
              {/* Step 1 */}
              <div className="relative text-center group">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-all duration-300 relative z-10">
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Create Account</h3>
                <p className="text-slate-600 font-light leading-relaxed text-sm">
                  Sign up for free in seconds. No credit card required. Start your Bible learning journey today.
                </p>
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full h-0.5 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 hidden md:block"></div>
              </div>

              {/* Step 2 */}
              <div className="relative text-center group">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-all duration-300 relative z-10">
                  <span className="text-3xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Choose Activities</h3>
                <p className="text-slate-600 font-light leading-relaxed text-sm">
                  Participate in daily quizzes, special challenges, Bible reading plans, and various learning activities.
                </p>
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full h-0.5 bg-gradient-to-r from-purple-200 via-pink-200 to-amber-200 hidden md:block"></div>
              </div>

              {/* Step 3 */}
              <div className="relative text-center group">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500 to-amber-500 flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-all duration-300 relative z-10">
                  <span className="text-3xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Track Progress</h3>
                <p className="text-slate-600 font-light leading-relaxed text-sm">
                  Watch your knowledge grow and your rank improve on the leaderboard. Compete with players worldwide.
                </p>
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full h-0.5 bg-gradient-to-r from-amber-200 via-orange-200 to-violet-200 hidden md:block"></div>
              </div>

              {/* Step 4 */}
              <div className="relative text-center group">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-all duration-300 relative z-10">
                  <span className="text-3xl font-bold text-white">4</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Win Prizes</h3>
                <p className="text-slate-600 font-light leading-relaxed text-sm">
                  Top performers earn amazing prizes. The more you participate, the better your chances of winning!
                </p>
              </div>
            </div>

            {/* Activities Section */}
            <div className="mt-20">
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-light text-slate-900 mb-4 tracking-tight">
                  What You Can <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-medium">Do</span>
                </h3>
                <p className="text-lg text-slate-600 font-light max-w-2xl mx-auto">
                  The Bible Quiz Competition 2025 offers multiple ways to engage, learn, and grow in your faith
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Activity 1 - Daily Quiz */}
                <Card className="relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl bg-gradient-to-br from-blue-50/80 to-cyan-50/60 backdrop-blur-xl border border-blue-100/50 hover:scale-105 group overflow-hidden">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-all duration-300">
                      <Calendar className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">Daily Quiz</h4>
                    <p className="text-sm text-slate-600 font-light leading-relaxed">
                      New Bible quiz questions every day to test and improve your knowledge
                    </p>
                  </CardContent>
                </Card>

                {/* Activity 2 - Challenges */}
                <Card className="relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl bg-gradient-to-br from-purple-50/80 to-pink-50/60 backdrop-blur-xl border border-purple-100/50 hover:scale-105 group overflow-hidden">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-all duration-300">
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">Special Challenges</h4>
                    <p className="text-sm text-slate-600 font-light leading-relaxed">
                      Participate in themed challenges and competitions with special rewards
                    </p>
                  </CardContent>
                </Card>

                {/* Activity 3 - Bible Reading */}
                <Card className="relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl bg-gradient-to-br from-emerald-50/80 to-teal-50/60 backdrop-blur-xl border border-emerald-100/50 hover:scale-105 group overflow-hidden">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-all duration-300">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">Bible Reading</h4>
                    <p className="text-sm text-slate-600 font-light leading-relaxed">
                      Follow structured reading plans and track your progress through Scripture
                    </p>
                  </CardContent>
                </Card>

                {/* Activity 4 - Bible QA Hub */}
                <Card 
                  className="relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl bg-gradient-to-br from-amber-50/80 to-orange-50/60 backdrop-blur-xl border border-amber-100/50 hover:scale-105 group overflow-hidden cursor-pointer"
                  onClick={() => navigate("/bible-questions-and-answers-hub")}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-all duration-300">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">Bible QA Hub</h4>
                    <p className="text-sm text-slate-600 font-light leading-relaxed">
                      Access 1,000+ Bible questions and answers organized by book, chapter, and difficulty level
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-16">
              <Button
                onClick={() => navigate("/auth/register")}
                className="group relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-10 py-7 text-base font-semibold tracking-wide rounded-2xl shadow-2xl hover:shadow-[0_25px_50px_rgba(99,102,241,0.4)] transition-all duration-500 hover:scale-105 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                <span className="relative flex items-center">
                  Get Started Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </div>
          </div>
        </section>

        {/* Community & Success Stories */}
        <section className="relative py-24 md:py-32 px-6 bg-gradient-to-br from-emerald-50/40 via-white to-teal-50/30 overflow-hidden">
          {/* Animated background orbs */}
          <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-emerald-400/15 to-teal-400/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tr from-teal-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3.5s' }}></div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6 tracking-tight">
                Join Our <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent font-medium">Growing Community</span>
              </h2>
              <p className="text-lg md:text-xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
                Be part of a vibrant community of Bible quiz enthusiasts. Share your progress, celebrate wins, and grow together in faith.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Community Stats */}
              <Card className="relative border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl bg-gradient-to-br from-white via-emerald-50/40 to-teal-50/30 backdrop-blur-xl border border-emerald-100/50 hover:scale-105 group overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-all duration-300">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-4">Active Community</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span className="text-slate-700 font-light">Join discussions with fellow participants</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span className="text-slate-700 font-light">Share your Bible quiz achievements</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span className="text-slate-700 font-light">Connect with Bible study groups</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span className="text-slate-700 font-light">Get tips from top performers</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Success Stories */}
              <Card className="relative border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl bg-gradient-to-br from-white via-amber-50/40 to-orange-50/30 backdrop-blur-xl border border-amber-100/50 hover:scale-105 group overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-400/10 to-orange-400/10 rounded-full blur-3xl"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-all duration-300">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-4">Success Stories</h3>
                  <div className="space-y-4">
                    <div className="bg-white/60 rounded-xl p-4 backdrop-blur-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <Heart className="w-5 h-5 text-rose-500" />
                        <span className="font-semibold text-slate-900">Maria's Journey</span>
                      </div>
                      <p className="text-sm text-slate-600 font-light">
                        "Started at rank 500, now in top 50! The daily challenges keep me motivated."
                      </p>
                    </div>
                    <div className="bg-white/60 rounded-xl p-4 backdrop-blur-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <Trophy className="w-5 h-5 text-amber-500" />
                        <span className="font-semibold text-slate-900">David's Win</span>
                      </div>
                      <p className="text-sm text-slate-600 font-light">
                        "Won my first prize after 30 days of consistent participation. Worth it!"
                      </p>
                    </div>
                    <div className="bg-white/60 rounded-xl p-4 backdrop-blur-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-5 h-5 text-emerald-500" />
                        <span className="font-semibold text-slate-900">Lisa's Growth</span>
                      </div>
                      <p className="text-sm text-slate-600 font-light">
                        "My Bible knowledge has improved so much. Perfect for my Bible study group!"
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CTA */}
            <div className="text-center mt-16">
              <Button
                onClick={() => navigate("/auth/register")}
                className="group relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 text-white px-10 py-7 text-base font-semibold tracking-wide rounded-2xl shadow-2xl hover:shadow-[0_25px_50px_rgba(16,185,129,0.4)] transition-all duration-500 hover:scale-105 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                <span className="relative flex items-center">
                  Join the Community
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative py-24 md:py-32 px-6 bg-gradient-to-br from-slate-50 via-white to-indigo-50/20 overflow-hidden">
          {/* Animated background orbs */}
          <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-indigo-400/15 to-purple-400/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-tr from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
          
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mx-auto mb-6 shadow-xl">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6 tracking-tight">
                Frequently Asked <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-medium">Questions</span>
              </h2>
              <p className="text-lg md:text-xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
                Everything you need to know about the Bible Quiz Competition 2025
              </p>
            </div>

            <div className="space-y-6">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl bg-white/80 backdrop-blur-xl border border-indigo-100/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Is the Bible Quiz Competition 2025 free to join?</h3>
                  <p className="text-slate-600 font-light leading-relaxed">
                    Yes! The Bible Quiz Competition 2025 is completely free to join. Create your account and start participating in daily challenges immediately. No credit card or payment required.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl bg-white/80 backdrop-blur-xl border border-purple-100/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">How do I win prizes in the Bible Quiz Competition?</h3>
                  <p className="text-slate-600 font-light leading-relaxed">
                    Top performers on the leaderboard earn prizes. The more daily challenges you complete and the higher your scores, the better your chances of winning. Prizes are awarded regularly to active participants.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl bg-white/80 backdrop-blur-xl border border-pink-100/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">How often are new Bible quiz challenges available?</h3>
                  <p className="text-slate-600 font-light leading-relaxed">
                    New Bible quiz challenges are available every day! Each daily challenge is unique and designed to test different aspects of your Bible knowledge. You can complete one challenge per day.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl bg-white/80 backdrop-blur-xl border border-amber-100/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Can I participate if I'm new to Bible study?</h3>
                  <p className="text-slate-600 font-light leading-relaxed">
                    Absolutely! The Bible Quiz Competition 2025 is perfect for all levels, from beginners to Bible scholars. The quizzes help you learn and grow at your own pace, making it an excellent way to deepen your understanding of Scripture.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl bg-white/80 backdrop-blur-xl border border-emerald-100/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">How does the leaderboard work?</h3>
                  <p className="text-slate-600 font-light leading-relaxed">
                    The leaderboard ranks participants based on their performance in daily challenges. Points are awarded for correct answers and completion. Your rank updates in real-time as you complete quizzes, allowing you to track your progress and compete with others.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* CTA */}
            <div className="text-center mt-16">
              <Button
                onClick={() => navigate("/auth/register")}
                className="group relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-10 py-7 text-base font-semibold tracking-wide rounded-2xl shadow-2xl hover:shadow-[0_25px_50px_rgba(99,102,241,0.4)] transition-all duration-500 hover:scale-105 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                <span className="relative flex items-center">
                  Ready to Get Started?
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </div>
          </div>
        </section>

        {/* Simple CTA */}
        <section className="relative py-28 md:py-36 px-6 bg-gradient-to-br from-violet-50/50 via-purple-50/40 to-indigo-50/50 overflow-hidden">
          {/* Animated background orbs */}
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-violet-400/20 via-purple-400/15 to-indigo-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-l from-indigo-400/20 via-purple-400/15 to-pink-400/20 rounded-full blur-3xl"></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
          
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 flex items-center justify-center mx-auto mb-8 shadow-2xl hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 mb-6 tracking-tight leading-tight">
              Start Your <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent font-medium">Bible Quiz Competition</span> Journey Today
            </h2>
            <p className="text-lg md:text-xl text-slate-600 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of participants in the Bible Quiz Competition 2025. Grow your Bible knowledge through daily practice, compete for prizes, and climb the leaderboard. Free to join, fun for all ages.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="group relative bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700 text-white px-10 py-7 text-base font-semibold tracking-wide rounded-2xl shadow-2xl hover:shadow-[0_25px_50px_rgba(139,92,246,0.4)] transition-all duration-500 hover:scale-105 overflow-hidden"
                onClick={() => navigate("/auth/register")}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                <span className="relative flex items-center">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/80 backdrop-blur-md border-2 border-violet-200 text-slate-700 hover:bg-white hover:border-violet-300 px-10 py-7 text-base font-semibold tracking-wide rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
                onClick={() => navigate("/competitions")}
              >
                View Competitions
              </Button>
            </div>
          </div>
        </section>

        {/* Minimal Footer */}
        <footer className="relative border-t border-indigo-100/60 py-16 px-6 bg-gradient-to-b from-white via-indigo-50/20 to-purple-50/10 overflow-hidden">
          {/* Subtle background effect */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-indigo-50/30 to-transparent"></div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div className="mb-6 md:mb-0">
                <h3 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  Bible Quiz Competition 2025
                </h3>
                <p className="text-slate-500 font-light text-sm max-w-md">
                  Join the ultimate Bible quiz competition. Test your knowledge, compete for prizes, and grow in your faith.
                </p>
              </div>
              <nav className="flex flex-wrap gap-6 text-sm" aria-label="Footer navigation">
                <a href="/competitions" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Bible Quiz Competitions</a>
                <a href="/leaderboard" className="text-slate-600 hover:text-purple-600 font-medium transition-colors">Leaderboard</a>
                <a href="/daily-challenge" className="text-slate-600 hover:text-pink-600 font-medium transition-colors">Daily Challenge</a>
                <a href="/help" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Help</a>
              </nav>
            </div>
            <div className="pt-8 border-t border-slate-200/60 text-center">
              <p className="text-xs text-slate-400 font-light">
                © 2025 Bible Quiz Competition. All rights reserved. | Join the Bible Quiz Competition 2025 and test your knowledge today.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default CompetitionHome;
