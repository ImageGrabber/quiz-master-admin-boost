import React from "react";
import SEO from "@/components/SEO";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, PlayCircle, Languages, Layout, AudioLines, Sparkles, ArrowRight, Star, ChevronRight } from "lucide-react";

const SongsHub = () => {
  const navigate = useNavigate();

  const collections = [
    {
      title: "Malayalam Christian Songs",
      subtitle: "House of David Collection",
      description: "Experience the rich heritage of Malayalam worship. Over 100+ songs with detailed lyrics and video worship.",
      icon: AudioLines,
      path: "/malayalam-songs",
      color: "from-blue-600 to-indigo-600",
      image: "/assets/songs/malayalam_card.png",
      count: "100+ Songs"
    },
    {
      title: "Hindi Christian Songs",
      subtitle: "Lyrics & Guitar Chords",
      description: "Modern Hindi worship with precision chords, English translations, and professional song details.",
      icon: Music,
      path: "/hindi-songs",
      color: "from-rose-500 to-orange-500",
      image: "/assets/songs/hindi_card.png",
      count: "25+ Enhanced"
    },
    {
      title: "English Hymns & Worship",
      subtitle: "Global Praise Collection",
      description: "A growing library of English hymns and contemporary worship songs to lift your spirit.",
      icon: Sparkles,
      path: "/english-songs",
      color: "from-emerald-500 to-teal-600",
      image: "/assets/songs/english_card.png",
      count: "Growing Library"
    }
  ];

  const featuredSongs = [
    { title: "Sirf Yeshu Ka Naam Hai", lang: "Hindi", path: "/hindi-songs/sirf-yeshu-ka-naam-hai" },
    { title: "Ek Aag Har Dil Mai", lang: "Hindi", path: "/hindi-songs/ek-aag-har-dil-mai" },
    { title: "Hallelujah Stuti Gaye Hum", lang: "Hindi", path: "/hindi-songs/hallelujah-stuti-gaye-hum" },
    { title: "Prabhu Yeshu Namam", lang: "Malayalam", path: "/malayalam-songs/prabhu-yeshu-namam" }
  ];

  return (
    <div className="min-h-screen bg-gray-50/30 flex flex-col font-urbanist selection:bg-blue-100 selection:text-blue-900">
      <SEO
        title="Christian Song Lyrics Hub 2026 | Malayalam, Hindi & English Worship"
        description="The ultimate Christian music hub for 2026. Explore thousands of Malayalam, Hindi, and English worship song lyrics, guitar chords, and English translations."
        keywords="christian song lyrics 2026, malayalam worship songs, hindi christian songs with chords, english hymns lyrics, christian music hub"
      />

      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.08),transparent_50%)]" />
        <div className="max-w-7xl mx-auto text-center relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-8 border border-blue-100 uppercase tracking-widest">
            Premium Worship Hub 2026
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-[1.1] tracking-tight">
            Voices of Praise: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600">Pure Worship</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-12 font-light">
            Explore your favorite worship songs with <span className="font-medium text-gray-900 underline decoration-blue-200 underline-offset-4">verified lyrics</span>, professional guitar chords, and bilingual translations.
          </p>
        </div>
      </section>

      {/* Collections Grid - Neater & More Consistent */}
      <section className="py-24 px-6 relative -mt-12 z-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          {collections.map((item, idx) => (
            <div
              key={item.title}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'both' }}
            >
              <Card
                className="group h-full bg-white border border-gray-100 shadow-xl shadow-gray-200/40 rounded-[2.5rem] overflow-hidden cursor-pointer hover:-translate-y-2 hover:border-blue-200 transition-all duration-500 flex flex-col"
                onClick={() => navigate(item.path)}
              >
                {/* Fixed Aspect Image Header */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* Floating Icon */}
                  <div className={`absolute -bottom-6 left-8 w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-2xl border-4 border-white transform transition-transform group-hover:rotate-6`}>
                    <item.icon className="w-7 h-7" />
                  </div>
                </div>

                <CardContent className="p-10 pt-12 flex-grow flex flex-col">
                  <div className="mb-8">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-3 block">{item.subtitle}</span>
                    <h2 className="text-2xl font-black text-gray-900 mb-4 tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-gray-500 font-light leading-relaxed text-[15px]">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-8 border-t border-gray-50">
                    <span className="text-[11px] font-black text-gray-900 bg-gray-100 px-4 py-2 rounded-xl uppercase tracking-wider">
                      {item.count}
                    </span>
                    <div className="flex items-center gap-1.5 text-blue-600 font-black text-sm uppercase tracking-widest group-hover:gap-3 transition-all">
                      Explore <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy & Storytelling - Neater Sections */}
      <section className="py-32 px-6 bg-white overflow-hidden border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-24">

            {/* The Heart of Worship */}
            <div className="text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="flex items-center justify-center gap-3 mb-8">
                <span className="w-8 h-px bg-gray-200" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">The Power of Praise</h4>
                <span className="w-8 h-px bg-gray-200" />
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight tracking-tight">
                Spirit & Truth: Exploring the Heart of Worship
              </h3>
              <div className="space-y-6 text-xl text-gray-500 font-light leading-relaxed max-w-3xl mx-auto">
                <p>
                  Music has always been the heartbeat of the Christian faith. From the ancient psalms of King David to the contemporary worship songs of today, melodies serve as a bridge between the human soul and the Divine.
                </p>
                <p className="text-base font-normal text-gray-400">
                  That’s why we’ve built the ultimate 2026 Christian Songs Hub, a space dedicated to preserving sacred music in its most accessible form. Beyond just lyrics, we focus on the emotional and spiritual resonance of every track.
                </p>
              </div>
            </div>

            {/* Heritage Rows */}
            <div className="grid md:grid-cols-2 gap-16">
              <div className="group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                    <Star className="w-5 h-5 fill-blue-50" />
                  </div>
                  <h5 className="text-xl font-black text-gray-900">Malayalam Heritage</h5>
                </div>
                <p className="text-gray-500 font-light leading-relaxed">
                  Our Malayalam collection, known as the "House of David," is a cornerstone of our music library. Rooted in centuries of devotion, we have meticulously curated over 100+ songs, ensuring every lyric is verified for accuracy.
                </p>
              </div>
              <div className="group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
                    <PlayCircle className="w-5 h-5" />
                  </div>
                  <h5 className="text-xl font-black text-gray-900">Modern Hindi Praise</h5>
                </div>
                <p className="text-gray-500 font-light leading-relaxed">
                  The Hindi worship movement is soaring. We offer professional-grade guitar chords and English translations for every batch-optimized song, allowing worshippers of all languages to find beauty in the praise.
                </p>
              </div>
            </div>

            {/* Premium CTA / Technical Info */}
            <Card className="border border-indigo-100 bg-gradient-to-br from-indigo-50/50 to-white p-12 md:p-16 rounded-[3rem] relative overflow-hidden shadow-2xl shadow-indigo-100/20">
              <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
                <Music className="w-48 h-48 text-indigo-900" />
              </div>
              <div className="relative z-10 max-w-2xl text-center md:text-left">
                <h5 className="text-4xl font-black text-indigo-950 mb-8 tracking-tight">The Musician's Resource 2026</h5>
                <div className="space-y-6 text-indigo-900/60 text-lg font-light leading-relaxed">
                  <p>
                    In 2026, we recognize that worship leaders and musicians need more than just text. Our "Chord-Wala" system is designed to empower every guitarist and pianist to lead worship with confidence.
                  </p>
                  <p>
                    By providing accurate chord sheets alongside English meaning translations, we break down language barriers and musical hurdles. Our mission is to ensure that "every tribe and every tongue" has the tools to praise the Lord.
                  </p>
                </div>
              </div>
            </Card>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SongsHub;
