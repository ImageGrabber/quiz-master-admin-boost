import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Music, 
  ChevronRight, 
  Globe, 
  Youtube, 
  BookOpen, 
  Mic2,
  ListMusic,
  Download,
  Flame,
  Star
} from 'lucide-react';
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import RelatedContentWidget from "@/components/RelatedContentWidget";

const HINDI_FEATURED = [
  {
    title: "Ho Teri Stuti Aur Aradhana",
    description: "The most searched Hindi worship song with lyrics in multiple languages and guitar chords.",
    link: "/ho-teri-stuti-aur-aradhana-lyrics-telugu-kannada-malayalam",
    tag: "Popular"
  },
  {
    title: "Apna Bojh Prabhu Par Daal",
    description: "Classical devotional song focusing on surrendering burdens to Christ. Includes full guitar chords.",
    link: "/apna-bojh-prabhu-par-daal-lyrics-chords",
    tag: "Devotional"
  },
  {
    title: "Hallelujah Stuti Gaye Hum",
    description: "A joyful praise song perfect for youth groups and Sunday school meetings.",
    link: "/hallelujah-stuti-gaye-hum-lyrics",
    tag: "Joyful"
  }
];

export default function HindiWorshipLanding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900 font-urbanist selection:bg-orange-100/50 selection:text-orange-900">
      <SEO 
        title="Hindi Christian Songs Lyrics & Chords | हिंदी मसीही गीत"
        description="Explore the best collection of Hindi Christian songs with lyrics and guitar chords. Free access to 'Ho Teri Stuti', 'Apna Bojh Prabhu', and many more."
        keywords="hindi christian songs lyrics chords, yeshu ke geet lyrics, hindi worship songs with chords, ho teri stuti lyrics download, hindi christian devotional songs"
        url="/hindi-songs"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Hindi Christian Worship Songs Hub",
          "description": "A dedicated portal for Hindi Christian lyrics, chords, and musical resources.",
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://biblequizcompetition.com/" },
              { "@type": "ListItem", "position": 2, "name": "Hindi Songs", "item": "https://biblequizcompetition.com/hindi-songs" }
            ]
          }
        }}
      />
      <Navigation />

      {/* Cinematic Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-orange-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600/30 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1514302240736-2313642340b0?auto=format&fit=crop&q=80&w=2000" 
            alt="Hindi Worship Cinematic" 
            className="w-full h-full object-cover brightness-[0.4] scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white via-white/50 to-transparent z-20" />
        </div>
        
        <div className="relative z-30 max-w-6xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center space-x-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-10">
            <Globe className="w-5 h-5 text-orange-400" />
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-white/80">हिंदी मसीही आराधना</span>
          </div>
          <h1 className="text-4xl sm:text-7xl font-black mb-8 leading-[0.9] tracking-tighter italic">
            Hindi Worship <span className="text-orange-400 not-italic block mt-2">Lyrics & Chords</span>
          </h1>
          <p className="text-lg sm:text-2xl font-light text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
            आराधना के माध्यम से परमेश्वर की स्तुति करें। Accurate chords and lyrics for the most beloved Hindi Christian songs and psalms.
          </p>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-8 py-12">
        {/* Featured Section */}
        <section className="mb-40">
          <div className="flex items-center justify-between mb-16">
            <div className="space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-orange-600">Featured Songs</h2>
              <h3 className="text-4xl font-normal text-gray-900 italic serif">Most Searched This Week</h3>
            </div>
            <Button variant="outline" className="hidden md:flex rounded-2xl px-8 border-gray-200" onClick={() => navigate("/hindi-songs-list")}>
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {HINDI_FEATURED.map((song, i) => (
              <Card 
                key={i} 
                className="group border border-gray-100/60 hover:border-orange-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 rounded-[2.5rem] cursor-pointer bg-white"
                onClick={() => navigate(song.link)}
              >
                <CardHeader className="pt-10 px-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-colors">
                      <Music className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">{song.tag}</span>
                  </div>
                  <CardTitle className="text-2xl font-bold group-hover:text-orange-600 transition-colors mb-4">{song.title}</CardTitle>
                  <CardDescription className="text-lg font-light text-gray-500 leading-relaxed">{song.description}</CardDescription>
                </CardHeader>
                <CardContent className="px-8 pb-10">
                  <div className="flex items-center text-orange-600 font-bold text-sm tracking-widest uppercase mt-4">
                    Learn Chords <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Collections Section */}
        <section className="mb-40 py-20 bg-gray-50 rounded-[4rem] px-10 lg:px-20 border border-gray-100">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-gray-400">Curated Collections</h2>
            <h3 className="text-5xl font-normal italic serif text-gray-900 leading-tight">Hindi Worship Resources for Every Occasion</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 bg-white rounded-[3rem] shadow-xl shadow-gray-200/50 flex items-center space-x-10 group cursor-pointer hover:bg-orange-600 transition-all" onClick={() => navigate("/hindi-songs")}>
              <div className="w-20 h-20 bg-orange-100 rounded-[2rem] flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-all">
                <Youtube className="w-10 h-10 text-orange-600 group-hover:text-white" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-gray-900 group-hover:text-white mb-2 tracking-tight">Hindi Video Lessons</h4>
                <p className="text-gray-500 group-hover:text-white/80 font-light leading-relaxed text-lg">Step-by-step guitar tutorials for popular Hindi worship songs.</p>
              </div>
            </div>

            <div className="p-10 bg-white rounded-[3rem] shadow-xl shadow-gray-200/50 flex items-center space-x-10 group cursor-pointer hover:bg-black transition-all" onClick={() => navigate("/christian-worship-songs-chords")}>
              <div className="w-20 h-20 bg-gray-100 rounded-[2rem] flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-all">
                <Download className="w-10 h-10 text-gray-600 group-hover:text-white" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-gray-900 group-hover:text-white mb-2 tracking-tight">Printable Chord Sheets</h4>
                <p className="text-gray-500 group-hover:text-white/80 font-light leading-relaxed text-lg">Clean, easy-to-read PDF chord sheets for your worship team.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-40 relative">
          <div className="bg-black rounded-[4rem] p-16 lg:p-24 text-center overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-500/10 blur-[100px] translate-x-1/2" />
            <div className="relative z-10 space-y-10">
              <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-white/40 italic">New Songs Weekly</h2>
              <h3 className="text-4xl md:text-6xl font-light text-white italic serif leading-tight max-w-3xl mx-auto">"Let your light so shine before men..."</h3>
              <p className="text-xl font-light text-white/60 max-w-2xl mx-auto italic">Stay updated with the latest Hindi Christian songs, chords, and music tips released every week.</p>
              <div className="flex flex-wrap justify-center gap-6">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white rounded-2xl px-12 py-8 text-lg" onClick={() => navigate("/auth/register")}>Join Our Worship Community</Button>
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white hover:text-black rounded-2xl px-12 py-8 text-lg" onClick={() => navigate("/malayalam-songs")}>All Collections</Button>
              </div>
            </div>
          </div>
        </section>

        <RelatedContentWidget />
      </div>

      <Footer />
    </div>
  );
}
