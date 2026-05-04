import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Leaf, 
  ChevronRight, 
  ChevronLeft,
  BookOpen, 
  Compass,
  Quote,
  Flame,
  Globe,
  Sun,
  Moon,
  Copy,
  Check,
  Share2,
  ArrowRight
} from 'lucide-react';
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PEACE_VERSES } from "@/data/peace-verses";
import { toast } from "sonner";

export default function BibleVersesPeace() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for right, -1 for left
  const [copied, setCopied] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentVerse = PEACE_VERSES[currentIndex];

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % PEACE_VERSES.length);
      setIsAnimating(false);
    }, 300);
  }, [isAnimating]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + PEACE_VERSES.length) % PEACE_VERSES.length);
      setIsAnimating(false);
    }, 300);
  }, [isAnimating]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${currentVerse.text}" - ${currentVerse.reference}`);
    setCopied(true);
    toast.success("Verse copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch Swipe Logic
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] text-gray-900 font-urbanist selection:bg-blue-100/50 selection:text-blue-900 overflow-x-hidden">
      <SEO 
        title="100 Bible Verses for Peace and Anxiety | Interactive Scripture Experience"
        description="Explore 100 powerful Bible verses for peace, anxiety, and strength. An interactive, one-at-a-time scripture experience designed for spiritual tranquility."
        keywords="bible verses for peace, bible verses for anxiety, 100 peace verses, interactive bible, scripture for comfort, spiritual strength"
        url="/verses/peace-and-anxiety"
      />
      <Navigation />

      {/* Cinematic Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero/peace-anxiety.png" 
            alt="Peaceful Landscape Cinematic" 
            className="w-full h-full object-cover brightness-[0.6] scale-105 transition-transform duration-[20000ms]"
          />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#FDFDFF] via-[#FDFDFF]/50 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white pt-10">
          <div className="inline-flex items-center space-x-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-6">
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/80">Sanctuary of Peace</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-4 leading-tight tracking-tight">
            Peace & <span className="italic font-serif text-white/90">Strength</span>
          </h1>
          <p className="text-base sm:text-lg font-light text-white/70 max-w-2xl mx-auto leading-relaxed">
            100 Curated Scriptures to Calm Your Mind and Anchor Your Soul.
          </p>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 -mt-20 relative z-20">
        
        {/* Interactive Slider Container */}
        <div 
          className="relative group max-w-4xl mx-auto"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-8 px-6">
            <div className="flex items-center gap-4">
               <div className="h-1.5 w-32 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-500 ease-out" 
                    style={{ width: `${((currentIndex + 1) / PEACE_VERSES.length) * 100}%` }}
                  />
               </div>
               <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                 {currentIndex + 1} <span className="opacity-40">/</span> {PEACE_VERSES.length}
               </span>
            </div>
            <div className="flex gap-2">
               <button onClick={handleCopy} className="p-2 rounded-full bg-white border border-slate-100 text-slate-400 hover:text-blue-500 transition-colors shadow-sm">
                 {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
               </button>
               <button className="p-2 rounded-full bg-white border border-slate-100 text-slate-400 hover:text-slate-600 transition-colors shadow-sm">
                 <Share2 className="w-4 h-4" />
               </button>
            </div>
          </div>

          {/* Navigation Arrows (Desktop) */}
          <div className="hidden md:block absolute top-1/2 -left-20 -translate-y-1/2">
            <button 
              onClick={handlePrev}
              className="w-14 h-14 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-100 hover:shadow-xl transition-all active:scale-90"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          <div className="hidden md:block absolute top-1/2 -right-20 -translate-y-1/2">
            <button 
              onClick={handleNext}
              className="w-14 h-14 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-100 hover:shadow-xl transition-all active:scale-90"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Verse Card */}
          <div 
            className={`relative min-h-[450px] p-8 sm:p-16 rounded-[3rem] bg-white border border-slate-100 shadow-2xl transition-all duration-300 ${
              isAnimating 
                ? direction > 0 ? "opacity-0 translate-x-12" : "opacity-0 -translate-x-12"
                : "opacity-100 translate-x-0"
            }`}
          >
            <Quote className="absolute top-12 left-12 w-16 h-16 text-blue-50 opacity-40 -z-10" />
            
            <div className="space-y-10">
              <div className="space-y-4">
                <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-[10px] font-black text-blue-600 uppercase tracking-widest">
                  {currentVerse.theme}
                </span>
                <h2 className="text-3xl sm:text-5xl font-normal text-slate-900 serif italic leading-tight">
                  {currentVerse.reference}
                </h2>
              </div>

              <p className="text-2xl sm:text-4xl font-light text-slate-800 leading-[1.3] italic relative z-10">
                "{currentVerse.text}"
              </p>

              <div className="pt-10 border-t border-slate-50">
                 <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4">Daily Reflection</p>
                 <p className="text-lg sm:text-xl font-light text-slate-500 leading-relaxed italic">
                   {currentVerse.reflection}
                 </p>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center justify-center gap-6 mt-10">
            <button 
              onClick={handlePrev}
              className="w-16 h-16 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 active:scale-90 transition-all shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={handleNext}
              className="w-16 h-16 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 active:scale-90 transition-all shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

        </div>

        {/* Introduction / How it works */}
        <section className="mt-40 mb-20 text-center max-w-3xl mx-auto">
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-slate-300 mb-8">— Guided Journey —</h2>
          <p className="text-xl font-light text-slate-400 leading-relaxed italic">
            This interactive sanctuary is designed to help you focus on one promise at a time. Use the arrows or swipe to navigate through 100 paths to peace.
          </p>
          <div className="h-px w-24 bg-slate-100 mx-auto mt-12" />
        </section>

        {/* Quick Topics Grid */}
        <section className="mb-40">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Deliverance", count: 12, icon: Compass, color: "blue" },
                { name: "Refuge", count: 15, icon: Heart, color: "rose" },
                { name: "Strength", count: 20, icon: Flame, color: "amber" },
                { name: "Trust", count: 18, icon: Globe, color: "indigo" },
              ].map((topic) => (
                <div key={topic.name} className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                  <div className={`w-12 h-12 rounded-2xl bg-${topic.color}-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <topic.icon className={`w-6 h-6 text-${topic.color}-500`} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{topic.name}</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{topic.count} Verses</p>
                </div>
              ))}
           </div>
        </section>

        {/* Final Action Card */}
        <section className="mb-40 py-24 bg-slate-900 rounded-[4rem] text-white px-10 lg:px-20 overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 blur-[150px] rounded-full translate-x-1/3" />
          
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 mb-8">Continuing Your Walk</h2>
            <h3 className="text-4xl sm:text-6xl font-normal leading-tight mb-12 italic serif">Need personal prayer today?</h3>
            <p className="text-xl font-light text-white/50 leading-relaxed mb-12 max-w-2xl mx-auto">
              Our community of prayer warriors is standing by. Submit a private or public prayer request and let us carry the burden with you.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-10 h-16 text-sm rounded-2xl font-black uppercase tracking-widest shadow-2xl" onClick={() => navigate("/prayer-requests")}>
                Submit Request <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-slate-900 px-10 h-16 text-sm rounded-2xl font-black uppercase tracking-widest" onClick={() => navigate("/prayers")}>
                Browse Prayers
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
