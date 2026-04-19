import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Crown, 
  ChevronRight, 
  ShieldCheck, 
  ShieldAlert, 
  BookOpen, 
  Quote,
  Flame,
  Star,
  Zap,
  History
} from 'lucide-react';
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import RelatedContentWidget from "@/components/RelatedContentWidget";

const KINGS = [
  {
    name: "Saul",
    title: "The First King",
    status: "Fallen",
    summary: "Israel's first king who started with great humility but ended in disobedience and tragedy.",
    kingdom: "United Kingdom",
    icon: ShieldAlert,
    iconColor: "text-red-500",
    bg: "bg-red-50"
  },
  {
    name: "David",
    title: "Man After God's Heart",
    status: "Great",
    summary: "The shepherd boy who became Israel's greatest king and established the royal lineage of the Messiah.",
    kingdom: "United Kingdom",
    icon: ShieldCheck,
    iconColor: "text-amber-500",
    bg: "bg-amber-50"
  },
  {
    name: "Solomon",
    title: "The Wisest King",
    status: "Mixed",
    summary: "Built the First Temple and brought Israel to its peak of wealth and wisdom, but later fell into idolatry.",
    kingdom: "United Kingdom",
    icon: Crown,
    iconColor: "text-purple-500",
    bg: "bg-purple-50"
  },
  {
    name: "Hezekiah",
    title: "The Reformer",
    status: "Great",
    summary: "Purged the temple of idols and trusted God during the Assyrian siege of Jerusalem.",
    kingdom: "Kingdom of Judah",
    icon: ShieldCheck,
    iconColor: "text-blue-500",
    bg: "bg-blue-50"
  },
  {
    name: "Josiah",
    title: "The Law-Finder",
    status: "Great",
    summary: "The boy king who rediscovered the Law of Moses and initiated the greatest spiritual revival in Judah.",
    kingdom: "Kingdom of Judah",
    icon: ShieldCheck,
    iconColor: "text-emerald-500",
    bg: "bg-emerald-50"
  },
  {
    name: "Ahab",
    title: "The Idolater",
    status: "Evil",
    summary: "Led Israel into systemic Baal worship and famously opposed the prophet Elijah.",
    kingdom: "Kingdom of Israel",
    icon: ShieldAlert,
    iconColor: "text-slate-500",
    bg: "bg-slate-50"
  }
];

export default function KingsOfIsrael() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900 font-urbanist selection:bg-amber-100/50 selection:text-amber-900">
      <SEO 
        title="Kings of Israel and Judah List | Chronology of Biblical Kings"
        description="Comprehensive list of the kings of Israel and Judah. Explore the reigns of Saul, David, Solomon, Josiah, and Hezekiah with historical and spiritual insights."
        keywords="kings of israel list, kings of judah chronological order, king david bible story, solomon wisest king, hezekiah reform"
        url="/kings-of-israel"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Chronicle of the Kings of Israel and Judah",
          "description": "A detailed directory of the monarchs that ruled over the ancient kingdoms of Israel and Judah.",
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": KINGS.map((k, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": k.name,
              "description": k.summary
            }))
          }
        }}
      />
      <Navigation />

      {/* Cinematic Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-600/30 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?auto=format&fit=crop&q=80&w=2000" 
            alt="Crown and Scepter Cinematic" 
            className="w-full h-full object-cover brightness-[0.3] scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white via-white/50 to-transparent z-20" />
        </div>
        
        <div className="relative z-30 max-w-6xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center space-x-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-10">
            <Crown className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-white/80">The Throne of the Covenant</span>
          </div>
          <h1 className="text-4xl sm:text-7xl font-black mb-8 leading-[0.9] tracking-tighter">
            Kings of <span className="text-amber-400 block mt-2">Israel & Judah</span>
          </h1>
          <p className="text-lg sm:text-2xl font-light text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
            Witness the rise and fall of the monarchs who led God's people. From the glory of David to the tragic exile, discover the history that shaped the Old Testament.
          </p>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center text-xs font-light text-gray-400 mb-20 px-2 tracking-widest uppercase">
          <button className="hover:text-black transition-colors" onClick={() => navigate("/")}>Home</button>
          <ChevronRight className="w-3 h-3 mx-4 opacity-30" />
          <button className="hover:text-black transition-colors" onClick={() => navigate("/bible-characters")}>Characters</button>
          <ChevronRight className="w-3 h-3 mx-4 opacity-30" />
          <span className="text-black font-semibold">Kings of Israel</span>
        </div>

        {/* Timeline Intro */}
        <section className="mb-40 text-center max-w-3xl mx-auto">
          <History className="w-12 h-12 text-amber-500 mx-auto mb-8 opacity-40" />
          <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-gray-400 mb-8 tracking-widest">— The Chronology of Kings —</h2>
          <p className="text-2xl font-light text-gray-600 leading-relaxed italic">
            "And they did what was right in the eyes of the Lord..." — or they did what was evil. The evaluation of every king rested on their faithfulness to the Word of God.
          </p>
        </section>

        {/* Kings Grid */}
        <section className="mb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {KINGS.map((k, i) => (
              <Card 
                key={i} 
                className="group border border-gray-100 hover:border-amber-100 hover:shadow-2xl transition-all duration-500 rounded-[3rem] overflow-hidden bg-white cursor-pointer"
                onClick={() => navigate("/bible-questions-and-answers-hub")}
              >
                <div className="p-12 flex flex-col md:flex-row gap-10 items-start">
                  <div className={`w-20 h-20 rounded-2xl ${k.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                    <k.icon className={`w-10 h-10 ${k.iconColor}`} />
                  </div>
                  <div className="space-y-6 flex-grow">
                    <div className="flex justify-between items-start w-full">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{k.kingdom}</span>
                        <h3 className="text-4xl font-normal italic serif text-gray-900 leading-tight group-hover:text-amber-700 transition-colors">{k.name}</h3>
                      </div>
                      <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${k.status === 'Great' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>{k.status}</span>
                    </div>
                    <p className="text-xl font-medium text-gray-700 italic">{k.title}</p>
                    <p className="text-lg font-light text-gray-500 leading-relaxed">{k.summary}</p>
                    <div className="flex items-center text-amber-600 font-bold text-xs tracking-widest uppercase pt-4 transition-all group-hover:pl-2">
                       Explore Reign <ChevronRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mb-40 relative group">
          <div className="absolute inset-0 bg-gray-900 rounded-[4rem] shadow-2xl overflow-hidden">
             <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-500/10 blur-[120px] translate-x-1/2" />
          </div>
          <div className="relative z-10 p-16 lg:p-24 text-center">
            <h3 className="text-4xl md:text-6xl font-light text-white italic serif mb-10 leading-tight max-w-4xl mx-auto">
              "The heart of the king is in the hand of the Lord."
            </h3>
            <p className="text-xl font-light text-white/50 max-w-2xl mx-auto mb-16 italic">
              Study the intricate history of the monarchy through our specialized quizzes and study guides.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white rounded-2xl px-12 py-8 text-lg shadow-xl shadow-amber-600/20" onClick={() => navigate("/quizzes")}>Take Royal History Quiz</Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white hover:text-black rounded-2xl px-12 py-8 text-lg" onClick={() => navigate("/bible-characters")}>Back to Characters</Button>
            </div>
          </div>
        </section>

        <RelatedContentWidget />
      </div>

      <Footer />
    </div>
  );
}
