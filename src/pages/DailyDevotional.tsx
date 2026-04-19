import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Sun, 
  ChevronRight, 
  BookOpen, 
  Heart, 
  Sparkles, 
  Quote,
  Zap,
  Star,
  Globe,
  Compass,
  Sunrise,
  ArrowLeft
} from 'lucide-react';
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import RelatedContentWidget from "@/components/RelatedContentWidget";

export default function DailyDevotional() {
  const navigate = useNavigate();

  // For now, this is a premium template for today's devotional
  // In a real app, this would fetch from a database or use a date-based logic
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-white text-gray-900 font-urbanist selection:bg-amber-100/50 selection:text-amber-900">
      <SEO 
        title="Daily Devotional for Today | Spiritual Growth and Reflection"
        description="Start your morning with our daily biblical devotional. Find deep spiritual reflections, scripture readings, and prayer prompts to anchor your day in faith."
        keywords="daily devotional for today, morning devotion, christian daily reflection, bible study today, spiritual growth devotional"
        url="/daily-devotional-for-today"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Daily Devotional for Today: Anchoring Your Soul",
          "description": "A morning resource for spiritual reflection, scripture study, and prayer.",
          "author": {
            "@type": "Organization",
            "name": "Bible Quiz Competition"
          },
          "datePublished": new Date().toISOString().split('T')[0],
        }}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-orange-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600/30 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1499002238440-d264eaa14952?auto=format&fit=crop&q=80&w=2000" 
            alt="Sunrise Devotional Cinematic" 
            className="w-full h-full object-cover brightness-[0.4]"
          />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white via-white/50 to-transparent z-20" />
        </div>
        
        <div className="relative z-30 max-w-6xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center space-x-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-10">
            <Sunrise className="w-5 h-5 text-orange-400" />
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-white/80">Morning Stillness</span>
          </div>
          <h1 className="text-4xl sm:text-7xl font-black mb-6 leading-[0.9] tracking-tighter">
            Daily <span className="text-orange-400 block mt-2">Devotional</span>
          </h1>
          <p className="text-lg sm:text-2xl font-light text-white/70 mb-8 tracking-widest uppercase">{today}</p>
        </div>
      </section>

      <div className="w-full max-w-5xl mx-auto px-8 py-12">
        {/* Navigation / Back */}
        <div className="mb-12">
          <Button variant="ghost" onClick={() => navigate("/")} className="text-gray-400 hover:text-black">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Content Card */}
        <Card className="border-0 shadow-2xl rounded-[3rem] overflow-hidden bg-white mb-20">
          <CardContent className="p-12 md:p-20 space-y-20">
            {/* Scripture Section */}
            <section className="space-y-10">
              <div className="flex items-center space-x-4">
                <span className="px-4 py-1 bg-orange-100 text-orange-700 text-[10px] font-bold uppercase tracking-widest rounded-full">Step 1: Scripture</span>
                <div className="h-px flex-1 bg-gray-100" />
              </div>
              <div className="space-y-6">
                <h2 className="text-4xl font-normal italic serif text-gray-900">Psalm 119:105</h2>
                <blockquote className="text-3xl font-light text-gray-800 leading-relaxed border-l-4 border-orange-500 pl-8 italic">
                  "Your word is a lamp for my feet, a light on my path."
                </blockquote>
              </div>
            </section>

            {/* Reflection Section */}
            <section className="space-y-10">
              <div className="flex items-center space-x-4">
                <span className="px-4 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-widest rounded-full">Step 2: Reflection</span>
                <div className="h-px flex-1 bg-gray-100" />
              </div>
              <div className="space-y-8">
                <h3 className="text-5xl font-black tracking-tighter text-gray-900 leading-tight">Walking in the Dark</h3>
                <div className="space-y-6 text-xl font-light text-gray-600 leading-relaxed prose prose-orange max-w-none">
                  <p>
                    In ancient times, a lamp didn't illuminate the entire horizon. It provided just enough light for the very next step. The Psalmist captures a profound truth about our spiritual journey: God rarely shows us the final destination in vivid detail. Instead, He gives us His Word to guide our immediate path.
                  </p>
                  <p>
                    We often want a floodlight that reveals the next ten years, but God offers a lamp for our feet. This requires trust. It requires us to keep our eyes on the light we have right now, rather than worrying about the shadows in the distance. When you feel overwhelmed by the unknown 'future,' return to the known 'Word.'
                  </p>
                  <p>
                    Today, ask yourself: What is the very next step God is asking me to take? Not the next year, not the next month—just the next step of obedience.
                  </p>
                </div>
              </div>
            </section>

            {/* Prayer Section */}
            <section className="bg-orange-50 rounded-[2.5rem] p-12 space-y-8 border border-orange-100">
              <div className="flex items-center space-x-4">
                <Heart className="w-6 h-6 text-orange-600" />
                <h4 className="text-2xl font-bold text-gray-900 tracking-tight">Step 3: Prayer</h4>
              </div>
              <p className="text-2xl font-light text-gray-800 italic leading-relaxed">
                "Father, thank You for Your Word. When the world feels dark and the future uncertain, help me to focus on the light You've given me for today. Give me the courage to take the next step of faith, trusting that You are holding my hand. Amen."
              </p>
            </section>

            {/* Action Section */}
            <section className="space-y-8 pt-10 border-t border-gray-100">
               <div className="flex items-center space-x-4">
                <Zap className="w-6 h-6 text-amber-500" />
                <h4 className="text-2xl font-bold text-gray-900 tracking-tight">Today's Application</h4>
              </div>
              <p className="text-xl font-light text-gray-600 leading-relaxed">
                Take five minutes of intentional silence today. Whenever your mind drifts to a worry about 'tomorrow,' repeat the verse: "Your word is a lamp for my feet."
              </p>
              <Button size="lg" className="w-full bg-black text-white hover:bg-orange-600 transition-all rounded-2xl h-16 text-sm tracking-[0.2em] uppercase" onClick={() => navigate("/quizzes")}>
                Test Your Knowledge
              </Button>
            </section>
          </CardContent>
        </Card>

        {/* Explore More */}
        <section className="mb-40">
          <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-gray-400 mb-12 text-center">Spiritual Growth Hub</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 border-gray-100 hover:border-black/5 hover:shadow-xl transition-all rounded-[2rem] cursor-pointer" onClick={() => navigate("/daily-verse")}>
              <CardTitle className="flex items-center mb-4">
                <Sun className="w-6 h-6 mr-3 text-orange-500" />
                Daily Bible Verse
              </CardTitle>
              <CardDescription className="text-lg font-light">Short, impactful scripture for quick meditation.</CardDescription>
            </Card>
            <Card className="p-8 border-gray-100 hover:border-black/5 hover:shadow-xl transition-all rounded-[2rem] cursor-pointer" onClick={() => navigate("/verses/peace-and-anxiety")}>
              <CardTitle className="flex items-center mb-4">
                <Compass className="w-6 h-6 mr-3 text-blue-500" />
                Topic-Based Study
              </CardTitle>
              <CardDescription className="text-lg font-light">Explore verses on peace, strength, love, and hope.</CardDescription>
            </Card>
          </div>
        </section>

        <RelatedContentWidget />
      </div>

      <Footer />
    </div>
  );
}
