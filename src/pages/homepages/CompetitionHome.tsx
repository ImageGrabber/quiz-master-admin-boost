import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, BookOpen, Trophy, Brain, Clock, Mail, Star, Users, Calendar, TrendingUp, ChevronLeft, ChevronRight, Quote, Zap, Globe, Gamepad2, Heart } from 'lucide-react';

import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
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

  const heroExploreLinks = [
    {
      label: "Bible Q&A Hub",
      description: "66 books with chapter quizzes and study paths.",
      path: "/bible-questions-and-answers-hub",
      icon: BookOpen
    },
    {
      label: "Bible Characters",
      description: "Study the lives of Abraham, Moses, David, and Paul.",
      path: "/bible-characters",
      icon: Users
    },
    {
      label: "Peace & Anxiety",
      description: "Find comfort through curated scriptural reflections.",
      path: "/verses/peace-and-anxiety",
      icon: Heart
    },
    {
      label: "Top 100 Questions",
      description: "Master the most searched Bible trivia questions.",
      path: "/top-100-bible-quiz-questions",
      icon: Trophy
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

  return (
    <>
      <SEO
        title="Free Bible Quiz Competition | Play Online & Win Prizes"
        description="Join free online Bible quizzes with daily challenges, weekly competitions, and prize-ready leaderboards. Explore Bible Q&A hubs, Hindi songs, English songs, and kids stories to study, worship, and grow in Scripture."
        keywords="bible quiz competition 2026, free bible quiz with prizes, online bible competition, bible trivia 2026, scripture match game, kids bible stories, christian song library"
        url="/"
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
              "description": "Participate in the Free Online Bible Quiz Competition 2026. Features include daily challenges, timer bonuses, and real bible quiz prizes. Study Genesis, Nehemiah, and more.",
              "about": [
                { "@type": "Thing", "name": "Bible quiz competition 2026" },
                { "@type": "Thing", "name": "Free Bible Quizzes with Prizes" },
                { "@type": "Thing", "name": "Bible Study Hub" },
                { "@type": "Thing", "name": "Kids Bible Stories" },
                { "@type": "Thing", "name": "Christian Song Library" },
                { "@type": "Thing", "name": "Online Bible Trivia" }
              ]
            },
            {
              "@type": "ItemList",
              "name": "Featured Services",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Bible Study Hub", "url": "https://biblequizcompetition.com/bible-questions-and-answers-hub" },
                { "@type": "ListItem", "position": 2, "name": "Kids Bible Stories", "url": "https://biblequizcompetition.com/kids-stories" },
                { "@type": "ListItem", "position": 3, "name": "Christian Song Library", "url": "https://biblequizcompetition.com/malayalam-songs" }
              ]
            }
          ]
        }}
      />

      <div className="min-h-screen bg-white text-gray-900 font-urbanist selection:bg-black/5">
        <Navigation transparent={true} />

        <section className="relative min-h-[100svh] lg:min-h-screen flex items-center overflow-hidden py-20 sm:py-24 lg:py-0">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(56,189,248,0.32),transparent_40%),radial-gradient(circle_at_86%_14%,rgba(14,165,233,0.24),transparent_44%),radial-gradient(circle_at_72%_80%,rgba(168,85,247,0.18),transparent_46%),linear-gradient(135deg,#030712_0%,#0b1228_48%,#111827_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.14)_1px,transparent_1px)] bg-[size:34px_34px] opacity-20" />
            <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl animate-pulse" />
            <div className="absolute top-20 right-[-3rem] h-64 w-64 rounded-full bg-blue-400/18 blur-3xl animate-pulse [animation-delay:900ms]" />
            <div className="absolute -bottom-24 right-16 h-80 w-80 rounded-full bg-violet-500/18 blur-3xl animate-pulse [animation-delay:1600ms]" />
            <div className="absolute top-[-8rem] right-[24%] h-80 w-80 rounded-full border border-white/10" />
            <div className="absolute bottom-[-10rem] left-[20%] h-96 w-96 rounded-full border border-white/10" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/52 via-black/18 to-white/35" />
          </div>

          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 relative z-10 grid lg:grid-cols-[1.15fr_0.85fr] gap-6 sm:gap-8 md:gap-10 items-start lg:items-end pt-16 sm:pt-20 md:pt-28 lg:pt-32 pb-6 sm:pb-10 md:pb-16">
            <div className="self-center space-y-5 sm:space-y-6 md:space-y-8 text-white">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white backdrop-blur-md">
                <Trophy className="w-4 h-4" />
                Live Season 2026
              </span>

              <div>
                <h1 className="text-sm sm:text-xl lg:text-3xl font-semibold tracking-tight mb-3 md:mb-4 text-white/75">
                  Online Bible Quiz Competition 2026
                </h1>

                <h2 className="text-3xl sm:text-5xl lg:text-7xl font-normal tracking-tight leading-[1.08] md:leading-[1.05]">
                  Master the Word,<br className="hidden sm:block" />
                  <span className="italic font-serif text-white block sm:inline">Join the Glory.</span>
                </h2>
              </div>

              <p className="text-sm sm:text-lg md:text-xl text-white/80 font-light max-w-2xl leading-relaxed">
                Join thousands of believers in a free bible competition with daily challenges, transparent scoring, and real bible quiz prizes. Start with our most searched quizzes and grow your Scripture mastery.
              </p>
              <p className="text-xs sm:text-base text-white/70 font-light max-w-2xl leading-relaxed">
                Also explore Hindi songs, English songs, and kids stories with structured pages built for learning, worship, and family Bible engagement.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 md:pt-2 w-full sm:w-auto">
                <Button
                  onClick={() => navigate('/quiz-arena/name')}
                  className="h-12 sm:h-14 px-6 sm:px-9 w-full sm:w-auto bg-white text-black hover:bg-black hover:text-white rounded-full font-bold text-[11px] sm:text-sm tracking-[0.12em] sm:tracking-[0.2em] uppercase transition-all duration-300 shadow-2xl"
                >
                  Start Playing Now <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/scripture-match-multiplayer')}
                  className="h-12 sm:h-14 px-6 sm:px-9 w-full sm:w-auto border border-white/40 text-white hover:bg-white hover:text-black rounded-full font-bold text-[11px] sm:text-sm tracking-[0.12em] sm:tracking-[0.2em] uppercase transition-all duration-300 bg-transparent"
                >
                  Play Scripture Game <Gamepad2 className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
            </div>

            <div className="lg:pt-10 w-full max-w-xl mx-auto lg:mx-0">
              <Card className="border border-gray-100/70 bg-white shadow-2xl shadow-black/10 rounded-[2.5rem] overflow-hidden">
                <CardHeader className="pb-4 px-5 sm:px-6">
                  <CardDescription className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gray-400 mb-2">
                    Explore The Platform
                  </CardDescription>
                  <CardTitle className="text-3xl sm:text-5xl font-normal italic font-serif text-gray-900">Start Anywhere</CardTitle>
                  <CardDescription className="text-sm sm:text-base text-gray-500">
                    Everything available on Bible Quiz Competition, one click away.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-5 px-5 sm:px-6 pb-6 sm:pb-7">
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 flex items-center justify-between gap-3">
                    <p className="text-[11px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.22em] text-gray-400 font-bold">Popular Destinations</p>
                    <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] sm:tracking-[0.2em] text-gray-500">{heroExploreLinks.length} Sections</span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {heroExploreLinks.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => navigate(item.path)}
                        className="rounded-2xl border border-gray-100 bg-white px-4 py-3 text-left hover:bg-black hover:text-white transition-colors group"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="h-8 w-8 rounded-xl bg-gray-100 group-hover:bg-white/15 flex items-center justify-center transition-colors">
                            <item.icon className="w-4 h-4 text-gray-700 group-hover:text-white" />
                          </div>
                          <p className="text-base font-semibold text-gray-800 group-hover:text-white">{item.label}</p>
                        </div>
                        <p className="text-sm text-gray-500 group-hover:text-white/75 leading-relaxed">{item.description}</p>
                      </button>
                    ))}
                  </div>

                  <div className="pt-1">
                    <Button
                      onClick={() => navigate("/bible-questions-and-answers-hub")}
                      className="w-full h-11 rounded-full bg-black text-white hover:bg-gray-800 text-xs font-bold uppercase tracking-[0.2em]"
                    >
                      Explore Bible Q&A Hub <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Premium Bible Study Hub Section */}
        <section className="py-24 bg-white relative overflow-hidden border-b border-gray-100">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(17,24,39,0.06),transparent_40%)]" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
              <div className="max-w-2xl">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-5">The Eternal Library</p>
                <h2 className="text-4xl lg:text-6xl font-normal italic font-serif text-gray-900 mb-6 tracking-tight">Premium Bible Study Hub</h2>
                <p className="text-lg text-gray-500 font-light leading-relaxed">
                  Deep-dive into all 66 books with chapter-specific quizzes and theological summaries. Each book is a gateway to deeper understanding.
                </p>
              </div>
              <Button
                onClick={() => navigate("/bible-questions-and-answers-hub")}
                className="rounded-full bg-black hover:bg-gray-800 text-white px-8 h-12 shadow-lg hover:scale-105 transition-all text-[10px] font-bold uppercase tracking-[0.2em]"
              >
                Browse Full Library <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {allBooks.slice(0, 10).map((book) => {
                const info = getBookInfo(book);
                const slug = getBookSlug(book);
                return (
                  <div
                    key={book}
                    className="w-full"
                    onClick={() => navigate(`/bible-questions-and-answers-hub/${slug}`)}
                  >
                    <Card className="border border-gray-100/60 hover:border-black/10 transition-all duration-500 bg-white overflow-hidden group shadow-2xl shadow-gray-200/30 hover:shadow-2xl cursor-pointer rounded-[2rem] relative hover:-translate-y-1">
                      <div className="aspect-[3/4] w-full bg-gray-50 overflow-hidden relative">
                        <img
                          src={`/images/books/${slug}.png`}
                          alt={`${book} Study Hub`}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent && !parent.querySelector('.fallback-icon')) {
                              const fallback = document.createElement('div');
                              fallback.className = 'absolute inset-0 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center opacity-70';
                              fallback.innerHTML = `<div class="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100">
                                <span class="text-2xl font-bold text-gray-400 font-urbanist">${book.charAt(0)}</span>
                              </div>`;
                              parent.appendChild(fallback);
                            }
                          }}
                        />

                        {/* Discovery Overlay */}
                        <div className="absolute inset-x-0 bottom-0 top-0 bg-black/78 translate-y-full group-hover:translate-y-0 transition-transform duration-500 backdrop-blur-md p-6 flex flex-col justify-end text-white z-20">
                          <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/70 mb-2">{info.chapters} Chapters</p>
                          <p className="text-sm font-light leading-relaxed mb-6 line-clamp-4 italic opacity-90">{info.summary}</p>
                          <Button size="sm" className="w-full bg-white text-black hover:bg-gray-100 text-xs h-9 rounded-full font-bold tracking-[0.16em] uppercase shadow-lg">Start Study</Button>
                        </div>
                      </div>
                      <CardContent className="p-4 text-center">
                        <span className="text-sm font-bold text-gray-800 line-clamp-1 group-hover:text-black transition-colors uppercase tracking-wider">{book}</span>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Kids & Songs Featured Section */}
        <section className="py-24 bg-gray-50 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-10">
              {/* Kids Stories Card */}
              <div
                className="group relative overflow-hidden rounded-[2.5rem] bg-black p-10 cursor-pointer shadow-2xl hover:scale-[1.02] transition-all duration-500 border border-white/10"
                onClick={() => navigate("/kids-stories")}
              >
                <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-125 transition-transform duration-700">
                  <Star className="w-48 h-48 text-white fill-white" />
                </div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                      <Star className="w-4 h-4 fill-white" /> Kids Corner
                    </span>
                    <h3 className="text-4xl lg:text-5xl font-normal italic font-serif text-white tracking-tight">Interactive Bible Stories</h3>
                    <p className="text-xl text-white/70 font-light max-w-md leading-relaxed">
                      Beautifully illustrated stories of faith for children, featuring the David & Goliath quiz, Noah's Ark, and more.
                    </p>
                  </div>
                  <div className="pt-10 flex items-center gap-4">
                    <Button className="bg-white text-black hover:bg-gray-100 rounded-full font-bold px-8 h-12 text-[10px] uppercase tracking-[0.2em]">
                      Explore Stories
                    </Button>
                    <span className="text-white/60 text-sm font-medium italic group-hover:translate-x-2 transition-transform">Free Quizzes Included →</span>
                  </div>
                </div>
              </div>

              {/* Songs Card */}
              <div
                className="group relative overflow-hidden rounded-[2.5rem] bg-white p-10 cursor-pointer shadow-2xl hover:scale-[1.02] transition-all duration-500 border border-gray-200"
                onClick={() => navigate("/malayalam-songs")}
              >
                <div className="absolute bottom-0 right-0 p-12 opacity-10 group-hover:scale-125 transition-transform duration-700">
                  <Globe className="w-48 h-48 text-black" />
                </div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 backdrop-blur-md">
                      <Zap className="w-4 h-4" /> Global Worship
                    </span>
                    <h3 className="text-4xl lg:text-5xl font-normal italic font-serif text-gray-900 tracking-tight">Christian Song Library</h3>
                    <p className="text-xl text-gray-500 font-light max-w-md leading-relaxed">
                      Browse 500+ Hindi & International Christian songs with lyrics and video embeds. Perfect for worship and personal study.
                    </p>
                  </div>
                  <div className="pt-10 flex items-center gap-4">
                    <Button className="bg-black text-white hover:bg-gray-800 rounded-full font-bold px-8 h-12 border-none text-[10px] uppercase tracking-[0.2em]">
                      Find Songs
                    </Button>
                    <span className="text-gray-500 text-sm font-medium italic group-hover:translate-x-2 transition-transform">A-Z Directory Available →</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features - Clean Grid */}
        < section className="py-24 bg-white relative overflow-hidden border-b border-gray-100" >
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="mb-8 lg:mb-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-5">Growth Architecture</p>
                <h2 className="text-4xl lg:text-6xl font-normal italic font-serif text-gray-900 mb-6">Designed for Growth</h2>
                <p className="text-lg text-gray-500 font-light leading-relaxed mb-10">
                  More than just a game. It's a journey to deepen your understanding of the Scripture through consistent, engaging practice.
                </p>
                <img
                  src="/images/home/bible_quiz_glowing.png"
                  alt="Glowing open Bible with insightful quiz questions floating, highly effective for scripture learning and bible knowledge"
                  className="rounded-[2.25rem] shadow-2xl w-full border border-gray-200 hidden lg:block"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
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
                  <div key={idx} className="group p-8 rounded-[2rem] bg-white border border-gray-200 hover:border-black/20 shadow-xl shadow-black/5 hover:-translate-y-1 transition-all duration-500">
                    <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-black transition-colors">{feature.title}</h3>
                    <p className="text-gray-500 leading-relaxed font-light">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section >

        {/* How It Works - Bible Challenger Journey */}
        <section className="py-24 bg-gray-50 relative overflow-hidden border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-5">Journey Blueprint</p>
              <h2 className="text-4xl lg:text-6xl font-normal italic font-serif text-gray-900 mb-6">How to Become a Bible Challenger</h2>
              <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
                Your journey to mastering the Word starts here. Follow these simple steps to join the online bible quiz competition.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <img
                src="/images/home/bible_study_group.png"
                alt="Diverse group of young adults studying the Bible together in a modern bright cafe, preparing for the upcoming bible challenge"
                className="rounded-[2.5rem] shadow-2xl w-full object-cover hidden lg:block"
              />

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { title: "1. Register Free", desc: "Sign up instantly to join the online bible quiz competition 2026.", icon: Users },
                  { title: "2. Study Daily", desc: "Use our hubs for Genesis 8 quiz prep and more.", icon: BookOpen },
                  { title: "3. Take Quizzes", desc: "Compete in daily and weekly online bible quizzes.", icon: Brain },
                  { title: "4. Win Prizes", desc: "Review bible quiz prize rules and check live results weekly.", icon: Trophy }
                ].map((step, idx) => (
                  <div key={idx} className="relative flex flex-col items-center text-center p-6 rounded-[2rem] bg-white border border-gray-200 shadow-xl shadow-black/5 hover:-translate-y-1 transition-all">
                    <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mb-6 shadow-sm z-10">
                      <step.icon className="w-8 h-8 text-blue-600" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-500 text-sm font-light leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Browse by Category - Replaces old Featured Hubs */}
        <section className="py-24 bg-white relative overflow-hidden border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-5">Organized Discovery</p>
              <h2 className="text-4xl lg:text-6xl font-normal italic font-serif text-gray-900 mb-6">Browse by Category</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
                Explore bible quizzes organized by biblical categories.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category, idx) => (
                <Card key={idx} className="group transition-all duration-300 border border-gray-200 shadow-xl shadow-black/5 bg-white overflow-hidden cursor-pointer rounded-[2rem] hover:-translate-y-1 hover:border-black/20" onClick={() => navigate('/bible-questions-and-answers-hub')}>
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shadow-sm text-blue-600">
                        <category.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
                    </div>
                    <p className="text-gray-600 font-light leading-relaxed mb-6">
                      {category.description}
                    </p>
                    <div className="flex items-center text-gray-800 font-semibold group-hover:translate-x-2 transition-transform">
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
        <section className="py-24 bg-gray-50 relative overflow-hidden border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-5">Curated Challenges</p>
              <h2 className="text-4xl lg:text-6xl font-normal italic font-serif text-gray-900 mb-6">Featured Quizzes</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
                Test your knowledge with our most popular bible quizzes.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prioritizedFeaturedQuizzes.map((quiz) => (
                <Card key={quiz.title} className="border border-gray-200 hover:border-black/20 transition-all duration-300 cursor-pointer group bg-white shadow-xl shadow-black/5 hover:shadow-2xl rounded-[2rem] hover:-translate-y-1" onClick={() => navigate(quiz.link)}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                        <quiz.icon className="w-6 h-6 text-blue-600" strokeWidth={1.5} />
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-urbanist font-medium text-gray-600">{quiz.difficulty}</div>
                        <div className="text-sm font-urbanist font-light text-gray-500">{quiz.questions} questions</div>
                      </div>
                    </div>
                    <CardTitle className="text-xl font-urbanist font-semibold text-gray-900 group-hover:text-black transition-colors">{quiz.title}</CardTitle>
                    <CardDescription className="font-urbanist font-light text-gray-600">{quiz.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full font-urbanist font-light border-gray-200 hover:border-black hover:text-black hover:bg-gray-50" variant="outline">
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

        {/* Specialized Biblical Resources - New SEO High-Impact Section */}
        <section className="py-24 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
              <div className="max-w-2xl">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-indigo-600 mb-5">Deepening Your Walk</p>
                <h2 className="text-4xl lg:text-6xl font-normal italic font-serif text-gray-900 mb-6">Specialized Biblical Resources</h2>
                <p className="text-lg text-gray-500 font-light leading-relaxed">
                  Explore our curated collection of resources designed for specific study needs, from character deep-dives to finding peace in difficult times.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Bible Characters Hub */}
              <div className="group cursor-pointer rounded-[2.5rem] border border-gray-100 p-8 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all duration-500" onClick={() => navigate("/bible-characters")}>
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Users className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-normal italic font-serif text-gray-900 mb-4">Bible Characters</h3>
                <p className="text-gray-500 font-light leading-relaxed mb-8">
                  Meet the people of the Bible. From Abraham's faith to Paul's journey, explore the humans God used to change history.
                </p>
                <Button variant="ghost" className="p-0 text-indigo-600 hover:bg-transparent group-hover:translate-x-1 transition-transform">
                  Meet the Heroes <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>

              {/* Peace & Anxiety */}
              <div className="group cursor-pointer rounded-[2.5rem] border border-gray-100 p-8 hover:border-sky-100 hover:bg-sky-50/30 transition-all duration-500" onClick={() => navigate("/verses/peace-and-anxiety")}>
                <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Heart className="w-7 h-7 text-sky-600" />
                </div>
                <h3 className="text-2xl font-normal italic font-serif text-gray-900 mb-4">Finding Peace</h3>
                <p className="text-gray-500 font-light leading-relaxed mb-8">
                  Are you feeling anxious? Discover the promises of God for peace, rest, and strength during life's most challenging seasons.
                </p>
                <Button variant="ghost" className="p-0 text-sky-600 hover:bg-transparent group-hover:translate-x-1 transition-transform">
                  Find Comfort <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>

              {/* Parables Quiz */}
              <div className="group cursor-pointer rounded-[2.5rem] border border-gray-100 p-8 hover:border-amber-100 hover:bg-amber-50/30 transition-all duration-500" onClick={() => navigate("/quizzes/parables-of-jesus")}>
                <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Zap className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="text-2xl font-normal italic font-serif text-gray-900 mb-4">Parables of Jesus</h3>
                <p className="text-gray-500 font-light leading-relaxed mb-8">
                  Step into the stories of Jesus. Test your understanding of the wisdom He shared through earthly tales with heavenly meanings.
                </p>
                <Button variant="ghost" className="p-0 text-amber-600 hover:bg-transparent group-hover:translate-x-1 transition-transform">
                  Start Parables Quiz <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>

              {/* Top 100 Questions */}
              <div className="group cursor-pointer rounded-[2.5rem] border border-gray-100 p-8 hover:border-emerald-100 hover:bg-emerald-50/30 transition-all duration-500" onClick={() => navigate("/top-100-bible-quiz-questions")}>
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Trophy className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-normal italic font-serif text-gray-900 mb-4">The Mega Trivia</h3>
                <p className="text-gray-500 font-light leading-relaxed mb-8">
                  Master the ultimate list of 100 Bible questions. Perfect for individual study or preparing for our global competitions.
                </p>
                <Button variant="ghost" className="p-0 text-emerald-600 hover:bg-transparent group-hover:translate-x-1 transition-transform">
                  Master the List <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        < section className="py-24 bg-white border-b border-gray-100" >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="text-center md:text-left">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-5">Editorial Picks</p>
                <h2 className="text-4xl lg:text-6xl font-normal italic font-serif text-gray-900 mb-4">Latest Insights</h2>
                <p className="text-lg text-gray-600 max-w-2xl font-light leading-relaxed">
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
                <article key={article.id} className="group cursor-pointer flex flex-col h-full bg-white p-8 rounded-[2rem] border border-gray-200 hover:border-black/20 shadow-xl shadow-black/5 hover:-translate-y-1 transition-all duration-300" onClick={() => navigate("/articles")}>
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">{article.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-black transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-500 font-light leading-relaxed line-clamp-3 mb-6 flex-1">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-200/60 mt-auto">
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                      By {article.author}
                    </span>
                    <div className="text-gray-900 font-medium text-sm flex items-center group-hover:translate-x-1 transition-transform">
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
        < section className="py-24 bg-gray-50 border-b border-gray-100" >
          <div className="max-w-4xl mx-auto px-6 text-center bg-white border border-gray-200 rounded-[2.75rem] p-10 md:p-14 shadow-2xl shadow-black/10">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Mail className="w-8 h-8" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-5">Community Updates</p>
            <h2 className="text-4xl lg:text-6xl font-normal italic font-serif text-gray-900 mb-6">Stay Connected</h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto font-light mb-10">
              Get the latest quiz schedules, study tips, and daily inspiration delivered straight to your inbox.
            </p>

            <form className="max-w-md mx-auto relative flex items-center" onSubmit={(e) => e.preventDefault()}>
              <div className="absolute left-4 text-gray-400">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full h-14 pl-12 pr-36 rounded-full border border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-gray-600 placeholder:text-gray-400 bg-white shadow-sm"
              />
              <Button type="submit" className="absolute right-1.5 h-11 px-6 rounded-full bg-black text-white hover:bg-gray-800 transition-colors font-semibold text-[10px] uppercase tracking-[0.2em]">
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-gray-400 mt-6">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </section >

        {/* Testimonials - Human Centric */}
        < section className="py-24 bg-white relative overflow-hidden border-b border-gray-100" >
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-5">Verified Voices</p>
              <h2 className="text-4xl lg:text-6xl font-normal italic font-serif text-gray-900 mb-6">Stories from the Community</h2>
            </div>

            <div className="relative">
              {/* Controls */}
              <div className="flex justify-end gap-3 mb-6">
                <button
                  onClick={() => setCurrentTestimonialIndex(i => (i - 1 + totalSlides) % totalSlides)}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={() => setCurrentTestimonialIndex(i => (i + 1) % totalSlides)}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
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
                          <div key={testimonial.id} className="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-xl shadow-black/5 hover:-translate-y-1 transition-all duration-300">
                            <Quote className="w-8 h-8 text-blue-200 mb-6" />
                            <p className="text-gray-600 font-light text-lg mb-8 leading-relaxed">
                              "{testimonial.quote}"
                            </p>
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-xs">
                                {testimonial.initials}
                              </div>
                              <div>
                                <div className="font-bold text-gray-900 text-sm">{testimonial.name}</div>
                                <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">{testimonial.role}</div>
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
        <section className="py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-5">Need Help?</p>
              <h2 className="text-4xl lg:text-6xl font-normal italic font-serif text-gray-900 mb-6">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-500 font-light leading-relaxed">
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
                <div key={idx} className="bg-white rounded-[2rem] p-8 border border-gray-200 shadow-xl shadow-black/5 hover:-translate-y-1 transition-all">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.q}</h3>
                  <p className="text-gray-500 font-light leading-relaxed">{faq.a}</p>
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

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 text-left">
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
                  Ready to start your journey?
                </h2>
                <p className="text-lg text-slate-300 font-light mb-12 max-w-2xl mx-auto md:mx-0">
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
              <div className="flex-1 w-full max-w-sm mx-auto">
                <img
                  src="/images/home/bible_quiz_trophy.png"
                  alt="Majestic golden trophy representing excellence and victory in the global Bible Quiz Competition"
                  className="w-full rounded-3xl shadow-2xl border-4 border-slate-800/50 transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </section >

        <Footer />
      </div>
    </>
  );
};

export default CompetitionHome;
