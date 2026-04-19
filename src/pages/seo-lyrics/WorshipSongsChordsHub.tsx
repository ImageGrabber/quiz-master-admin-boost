import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Music, 
  Search, 
  ChevronRight, 
  Guitar, 
  Mic2, 
  Sparkles,
  Music2,
  ListMusic,
  Globe,
  Youtube
} from 'lucide-react';
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import RelatedContentWidget from "@/components/RelatedContentWidget";

const SONG_CHORDS = [
  {
    title: "Ho Teri Stuti Aur Aradhana",
    artist: "Classic Hymn",
    key: "G Major",
    category: "Hindi Worship",
    link: "/ho-teri-stuti-aur-aradhana-lyrics-telugu-kannada-malayalam",
    difficulty: "Beginner"
  },
  {
    title: "Apna Bojh Prabhu Par Daal",
    artist: "Christian Devotional",
    key: "C Major",
    category: "Hindi Worship",
    link: "/apna-bojh-prabhu-par-daal-lyrics-chords",
    difficulty: "Easy"
  },
  {
    title: "Hallelujah Stuti Gaye Hum",
    artist: "Sunday School Favorite",
    key: "D Major",
    category: "Hindi Worship",
    link: "/hallelujah-stuti-gaye-hum-lyrics",
    difficulty: "Beginner"
  },
  {
    title: "Amazing Grace",
    artist: "John Newton",
    key: "G Major",
    category: "English Hymn",
    link: "/english-songs",
    difficulty: "Beginner"
  },
  {
    title: "How Great Is Our God",
    artist: "Chris Tomlin",
    key: "G Major",
    category: "Contemporary",
    link: "/english-songs",
    difficulty: "Easy"
  },
  {
    title: "Ithratholam Yahova Sahayichu",
    artist: "Malayalam Worship",
    key: "Am",
    category: "Malayalam",
    link: "/malayalam-songs",
    difficulty: "Intermediate"
  }
];

export default function WorshipSongsChordsHub() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSongs = SONG_CHORDS.filter(song => 
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 font-urbanist selection:bg-indigo-100/50 selection:text-indigo-900">
      <SEO 
        title="Christian Worship Songs Chords & Lyrics | Master Chord List"
        description="Access a comprehensive database of Christian worship songs with chords, lyrics, and guitar video tutorials. Find Hindi, English, and Malayalam worship resources."
        keywords="christian worship songs chords, guitar chords for worship songs, hindi christian song chords, easy worship songs for guitar, worship song lyrics with chords"
        url="/christian-worship-songs-chords"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Christian Worship Songs Chords Hub",
          "description": "A comprehensive directory for Christian worship songs, guitar chords, and musical resources.",
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": SONG_CHORDS.map((song, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": song.title,
              "description": `Chords for ${song.title} in the key of ${song.key}`
            }))
          }
        }}
      />
      <Navigation />

      {/* Cinematic Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80&w=2000" 
            alt="Worship Music Cinematic" 
            className="w-full h-full object-cover brightness-[0.3] scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white via-white/50 to-transparent z-20" />
        </div>
        
        <div className="relative z-30 max-w-6xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center space-x-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-10">
            <Music2 className="w-5 h-5 text-indigo-400" />
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-white/80">Musical Worship Resources</span>
          </div>
          <h1 className="text-4xl sm:text-7xl font-black mb-8 leading-[0.9] tracking-tighter">
            Worship Songs & <span className="text-indigo-400 block mt-2">Chords</span>
          </h1>
          <p className="text-lg sm:text-2xl font-light text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
            Lead your congregation or worship in private with our curated database of accurate chords and lyrics for the most popular Christian songs.
          </p>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-8 py-12">
        {/* Search & Utility Bar */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-blue-50/50 p-8 rounded-[2.5rem] border border-blue-100/50">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input 
                placeholder="Search songs, artists, or languages..." 
                className="pl-12 h-14 rounded-2xl border-white bg-white/80 focus:bg-white transition-all shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="rounded-2xl h-14 px-8 border-gray-200 hover:bg-white hover:border-black transition-all" onClick={() => navigate("/hindi-songs")}>
                <Globe className="w-4 h-4 mr-2" />
                Hindi List
              </Button>
              <Button className="rounded-2xl h-14 px-8 bg-black text-white hover:bg-gray-800 transition-all shadow-xl shadow-black/10" onClick={() => navigate("/english-songs")}>
                English List
              </Button>
            </div>
          </div>
        </section>

        {/* Songs Grid */}
        <section className="mb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSongs.map((song, i) => (
              <Card 
                key={i} 
                className="group border border-gray-100/60 hover:border-indigo-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 rounded-[2rem] overflow-hidden cursor-pointer"
                onClick={() => navigate(song.link)}
              >
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-widest rounded-full">{song.category}</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{song.difficulty}</span>
                  </div>
                  <CardTitle className="text-2xl font-bold group-hover:text-indigo-600 transition-colors">{song.title}</CardTitle>
                  <CardDescription className="text-sm font-medium text-gray-500">{song.artist}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Music className="w-4 h-4" />
                      <span className="text-sm">Key: <strong>{song.key}</strong></span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-400 transition-all group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-40">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-400 mb-12 text-center">Explore by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Hindi Worship", icon: Mic2, color: "bg-orange-50", textColor: "text-orange-600", link: "/hindi-songs" },
              { name: "Guitar Beginner", icon: Guitar, color: "bg-blue-50", textColor: "text-blue-600", link: "/malayalam-songs" },
              { name: "Global Hymns", icon: ListMusic, color: "bg-purple-50", textColor: "text-purple-600", link: "/english-songs" },
              { name: "Video Tutorials", icon: Youtube, color: "bg-red-50", textColor: "text-red-600", link: "/malayalam-songs" }
            ].map((cat, i) => (
              <button 
                key={i}
                onClick={() => navigate(cat.link)}
                className="p-10 rounded-[2.5rem] bg-white border border-gray-50 hover:border-black/5 hover:shadow-2xl transition-all group text-center"
              >
                <div className={`w-16 h-16 ${cat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                  <cat.icon className={`w-8 h-8 ${cat.textColor}`} />
                </div>
                <span className="font-bold text-gray-900 tracking-tight">{cat.name}</span>
              </button>
            ))}
          </div>
        </section>

        <RelatedContentWidget />
      </div>

      <Footer />
    </div>
  );
}
