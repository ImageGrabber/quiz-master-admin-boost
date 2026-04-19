import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Guitar, 
  ChevronRight, 
  Sparkles, 
  Music, 
  BookOpen, 
  Flame,
  Star,
  Zap,
  Youtube
} from 'lucide-react';
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import RelatedContentWidget from "@/components/RelatedContentWidget";

const BEGINNER_SONGS = [
  {
    title: "How Great Is Our God",
    artist: "Chris Tomlin",
    chords: "G, Em7, Cadd9, D",
    tip: "Use the same finger positions for G and Em7 to make transitions faster.",
    difficulty: "Very Easy"
  },
  {
    title: "Amazing Grace (My Chains Are Gone)",
    artist: "Classic Hymn / Chris Tomlin",
    chords: "G, C, D, Em",
    tip: "Focus on keeping the strumming pattern steady (D-DU-DU).",
    difficulty: "Beginner"
  },
  {
    title: "Blessed Be Your Name",
    artist: "Matt Redman",
    chords: "A, E, F#m, D",
    tip: "A great song for practicing the F#m barre chord or a simplified power chord version.",
    difficulty: "Easy"
  },
  {
    title: "10,000 Reasons",
    artist: "Matt Redman",
    chords: "C, G, D, Em",
    tip: "The G-C-D progression is the foundation for thousands of other worship songs.",
    difficulty: "Beginner"
  }
];

export default function BeginnerGuitarSongs() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900 font-urbanist selection:bg-emerald-100/50 selection:text-emerald-900">
      <SEO 
        title="Easy Bible Worship Songs for Beginner Guitar | 3-Chord Songs"
        description="Learn to play the most popular worship songs on guitar with these easy beginner guides. Simple chords, strumming patterns, and curated song lists for new players."
        keywords="easy worship songs guitar, beginner worship songs chords, 3 chord worship songs, learn worship guitar, simple christian songs for guitar"
        url="/easy-worship-songs-for-beginners-guitar"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to Play Easy Worship Songs on Guitar",
          "description": "A guide for beginner guitarists to learn foundational worship songs using only 3 or 4 simple chords.",
          "step": [
            { "@type": "HowToStep", "name": "Learn G, C, and D Chords", "text": "These three chords are the foundation of 80% of worship music." },
            { "@type": "HowToStep", "name": "Practice Steady Strumming", "text": "Focus on keeping a consistent 4/4 down-up pattern." },
            { "@type": "HowToStep", "name": "Start with How Great Is Our God", "text": "This song uses a 'frozen finger' technique making it perfect for beginners." }
          ]
        }}
      />
      <Navigation />

      {/* Cinematic Hero Section */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden bg-emerald-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/30 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1549289141-19833613462a?auto=format&fit=crop&q=80&w=2000" 
            alt="Guitar Beginner Cinematic" 
            className="w-full h-full object-cover brightness-[0.4] scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white via-white/50 to-transparent z-20" />
        </div>
        
        <div className="relative z-30 max-w-6xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center space-x-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-10">
            <Guitar className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-white/80">Beginner Mastery Series</span>
          </div>
          <h1 className="text-4xl sm:text-7xl font-black mb-8 leading-[0.9] tracking-tighter italic">
            Easy Worship <span className="text-emerald-400 not-italic block mt-2">Guitar Songs</span>
          </h1>
          <p className="text-lg sm:text-2xl font-light text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
            You don't need years of practice to lead worship. Start today with these simple, high-impact songs using only a few basic chords.
          </p>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-8 py-12">
        {/* Quick Start Tip */}
        <section className="mb-32">
          <div className="bg-emerald-50 rounded-[3rem] p-10 md:p-16 border border-emerald-100 flex flex-col md:flex-row items-center gap-12">
            <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center flex-shrink-0 shadow-xl shadow-emerald-200/50">
              <Zap className="w-12 h-12 text-emerald-600" />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">The "Golden Three" Strategy</h2>
              <p className="text-xl font-light text-gray-600 leading-relaxed">
                If you learn just **G Major, C Major, and D Major**, you can play over **5,000 worship songs**. Don't get overwhelmed by complex chords—perfect these three first.
              </p>
            </div>
          </div>
        </section>

        {/* Lessons Grid */}
        <section className="mb-40">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-400 mb-16 text-center">Top Beginner Song List</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {BEGINNER_SONGS.map((song, i) => (
              <Card 
                key={i} 
                className="group border border-gray-100/60 hover:border-emerald-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 rounded-[2.5rem] bg-white overflow-hidden shadow-xl shadow-gray-100"
              >
                <CardHeader className="pt-10 px-10">
                  <div className="flex justify-between items-center mb-6">
                    <span className="px-4 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-widest rounded-full">{song.difficulty}</span>
                    <Star className="w-5 h-5 text-emerald-300" />
                  </div>
                  <CardTitle className="text-3xl font-bold group-hover:text-emerald-600 transition-colors mb-2">{song.title}</CardTitle>
                  <CardDescription className="text-lg font-medium text-gray-500">{song.artist}</CardDescription>
                </CardHeader>
                <CardContent className="px-10 pb-12 space-y-8">
                  <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 italic">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Chords to Use:</span>
                    <span className="text-2xl font-bold text-gray-800 tracking-tighter">{song.chords}</span>
                  </div>
                  <div className="space-y-4">
                    <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 flex items-center">
                      <Lightbulb className="w-4 h-4 mr-2" /> Pro Tip
                    </p>
                    <p className="text-lg font-light text-gray-600 leading-relaxed">{song.tip}</p>
                  </div>
                  <Button className="w-full h-16 rounded-2xl bg-black text-white hover:bg-emerald-600 transition-all text-sm tracking-widest uppercase font-bold" onClick={() => navigate("/malayalam-songs")}>
                    View Full Chords & Lyrics
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Video Tutorial Hub */}
        <section className="mb-40 relative group">
          <div className="absolute inset-0 bg-emerald-600 rounded-[4rem] group-hover:scale-[1.02] transition-transform duration-700 shadow-2xl" />
          <div className="relative z-10 p-16 lg:p-24 flex flex-col items-center text-center">
            <Youtube className="w-20 h-20 text-white/50 mb-10 group-hover:text-white transition-colors" />
            <h3 className="text-4xl md:text-6xl font-light text-white italic serif mb-8 leading-tight">"Seeing it is half the battle."</h3>
            <p className="text-xl font-light text-white/80 max-w-3xl mb-12">
              Browse our YouTube-integrated video lessons where we show you exactly where to place your fingers for these beginner songs.
            </p>
            <Button size="lg" className="bg-white text-emerald-900 hover:bg-gray-100 px-12 py-8 rounded-2xl font-bold text-lg" onClick={() => navigate("/hindi-songs")}>
              Watch Video Lessons
            </Button>
          </div>
        </section>
        
        <RelatedContentWidget />
      </div>

      <Footer />
    </div>
  );
}
