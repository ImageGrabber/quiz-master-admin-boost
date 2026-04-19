import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  ChevronRight, 
  BookOpen, 
  ShieldCheck, 
  Quote,
  Sun,
  Key,
  Flame,
  UserCheck
} from 'lucide-react';
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import RelatedContentWidget from "@/components/RelatedContentWidget";

const FAITH_VERSES = [
  {
    id: "hebrews-11-1",
    reference: "Hebrews 11:1",
    text: "Now faith is confidence in what we hope for and assurance about what we do not see.",
    reflection: "Faith is the bridge between the invisible realm of God's promises and the visible realm of our daily experiences. it's not a blind leap, but a confident stance based on the character of the One who promised.",
    theme: "The Core Definition"
  },
  {
    id: "matthew-17-20",
    reference: "Matthew 17:20",
    text: "Truly I tell you, if you have faith as small as a mustard seed, you can say to this mountain, 'Move from here to there,' and it will move. Nothing will be impossible for you.",
    reflection: "The power of faith doesn't lie in the size of the person's belief, but in the size of the God they believe in. Even a small, fragile faith can move massive obstacles when anchored in Christ.",
    theme: "Mountain-Moving Faith"
  },
  {
    id: "2-cor-5-7",
    reference: "2 Corinthians 5:7",
    text: "For we live by faith, not by sight.",
    reflection: "Walking by faith means trusting God's direction even when our physical senses can't see the path ahead. It's an internal orientation that values God's Word more than our circumstances.",
    theme: "The Christian Walk"
  },
  {
    id: "ephesians-2-8-9",
    reference: "Ephesians 2:8-9",
    text: "For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God—not by works, so that no one can boast.",
    reflection: "Faith is the hand that receives God's gift of grace. We aren't saved by the 'work' of believing, but by the mercy of God which we accept through simple, humble faith.",
    theme: "The Hand of Grace"
  },
  {
    id: "james-2-17",
    reference: "James 2:17",
    text: "In the same way, faith by itself, if it is not accompanied by action, is dead.",
    reflection: "True faith always translates into movement. If our belief doesn't change how we live, how we talk, and how we treat others, it may just be intellectual agreement rather than saving faith.",
    theme: "Faith in Motion"
  },
  {
    id: "proverbs-3-5-6",
    reference: "Proverbs 3:5-6",
    text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reflection: "Faith involves a conscious decision to stop relying on our own limited perspective and start relying on God's infinite wisdom. When we yield control, He takes the lead.",
    theme: "Trusting the Lead"
  }
];

export default function FaithVerses() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900 font-urbanist selection:bg-indigo-100/50 selection:text-indigo-900">
      <SEO 
        title="Bible Verses about Faith and Trust | Strengthening Your Belief"
        description="Explore the best Bible verses about faith. Discover curated scriptures to build your trust in God, overcome doubt, and live with spiritual confidence."
        keywords="bible verses about faith, scripture for trust in god, mustard seed faith verse, walk by faith not by sight scripture"
        url="/verses/faith"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Bible Verses about Faith: Growing in Trust and Spiritual Confidence",
          "description": "A comprehensive guide to biblical faith, featuring key scriptures and reflective commentary for the modern believer.",
          "author": {
            "@type": "Organization",
            "name": "Bible Quiz Competition"
          },
          "mainEntity": {
            "@type": "FAQPage",
            "mainEntity": FAITH_VERSES.map(v => ({
              "@type": "Question",
              "name": `What does ${v.reference} say about faith?`,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": v.text
              }
            }))
          }
        }}
      />
      <Navigation />

      {/* Cinematic Hero Section */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden bg-indigo-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=2000" 
            alt="Faith and Trust Cinematic" 
            className="w-full h-full object-cover brightness-[0.4] scale-105 transition-transform duration-[20000ms] hover:scale-100"
          />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white via-white/50 to-transparent z-20" />
        </div>
        
        <div className="relative z-30 max-w-6xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center space-x-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-10">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-white/80">The Shield of Belief</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-[8rem] font-black mb-8 leading-[0.9] tracking-tighter italic">
            Trust & <span className="text-indigo-400 not-italic block mt-2">Faith</span>
          </h1>
          <p className="text-lg sm:text-2xl font-light text-white/70 mb-16 max-w-3xl mx-auto leading-relaxed">
            Faith is the conviction that God is who He says He is. Step into a deeper trust with the ancient truths that have anchored millions of believers through the ages.
          </p>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center text-xs font-light text-gray-400 mb-20 px-2 tracking-widest uppercase">
          <button className="hover:text-black transition-colors" onClick={() => navigate("/")}>Home</button>
          <ChevronRight className="w-3 h-3 mx-4 opacity-30" />
          <span className="text-black font-semibold">Verses on Faith</span>
        </div>

        {/* Introduction */}
        <section className="mb-40 text-center max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-gray-400 mb-8 tracking-widest">— The Foundation of Belief —</h2>
          <p className="text-2xl font-light text-gray-600 leading-relaxed italic">
            "And without faith it is impossible to please God, because anyone who comes to him must believe that he exists and that he rewards those who earnestly seek him."
          </p>
          <div className="h-px w-24 bg-gray-200 mx-auto mt-12" />
        </section>

        {/* Verses Grid */}
        <section className="mb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {FAITH_VERSES.map((v) => (
              <div key={v.id} className="space-y-10 group">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-indigo-600/60">{v.theme}</span>
                    <div className="h-px flex-1 bg-gray-100" />
                  </div>
                  <h3 className="text-4xl font-normal text-gray-900 italic serif leading-tight group-hover:text-indigo-900 transition-colors">
                    {v.reference}
                  </h3>
                </div>
                
                <div className="relative p-12 rounded-[3rem] bg-indigo-50/30 border border-indigo-100/50 group-hover:bg-white group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500">
                  <Quote className="absolute top-8 left-8 w-12 h-12 text-indigo-200 opacity-50" />
                  <p className="text-2xl font-light text-gray-800 leading-relaxed mb-10 relative z-10 italic">
                    "{v.text}"
                  </p>
                  <div className="space-y-6 border-t border-gray-100 pt-10">
                    <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">Reflection</p>
                    <p className="text-lg font-light text-gray-500 leading-relaxed">
                      {v.reflection}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final Encouragement Section */}
        <section className="mb-40 py-24 bg-indigo-600 rounded-[4rem] text-white px-10 lg:px-20 overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 blur-[150px] rounded-full translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-1/3 h-full bg-white/5 blur-[120px] rounded-full -translate-x-1/2" />
          
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-white/30 mb-8">Take the Next Step</h2>
            <h3 className="text-4xl sm:text-6xl font-black leading-tight mb-12 italic">"He rewards those who seek Him."</h3>
            <p className="text-xl font-light text-white/90 leading-relaxed mb-12">
              Faith is a journey of a thousand steps. Today, choose to trust God with just one area of your life—the one you've been holding onto most tightly. Watch as He proves His faithfulness in the small things.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button size="lg" className="bg-white text-indigo-700 hover:bg-gray-100 px-10 py-8 text-sm sm:text-lg rounded-2xl font-bold transition-all active:scale-95" onClick={() => navigate("/dashboard/bible-study")}>
                Begin Your Study
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-indigo-700 transition-all px-10 py-8 text-sm sm:text-lg rounded-2xl font-light active:scale-95" onClick={() => navigate("/verses/hope")}>
                Verses for Hope
              </Button>
            </div>
          </div>
        </section>

        <RelatedContentWidget />
      </div>

      <Footer />
    </div>
  );
}
