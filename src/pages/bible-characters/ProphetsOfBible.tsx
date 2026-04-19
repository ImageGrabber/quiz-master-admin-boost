import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Flame, 
  ChevronRight, 
  ScrollText, 
  Eye, 
  BookOpen, 
  Quote,
  Zap,
  Star,
  Globe,
  Wind
} from 'lucide-react';
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import RelatedContentWidget from "@/components/RelatedContentWidget";

const PROPHETS = [
  {
    name: "Isaiah",
    title: "The Messianic Prophet",
    description: "The most quoted prophet in the New Testament, known for his profound visions of the coming Messiah and the future glory of God's people.",
    theme: "Vision & Redemption",
    icon: Eye,
    category: "Major Prophet"
  },
  {
    name: "Jeremiah",
    title: "The Weeping Prophet",
    description: "A faithful voice during Israel's darkest hours, he preached repentance to a stubborn nation and prophesied the New Covenant written on hearts.",
    theme: "Faithfulness & Sorrow",
    icon: Flame,
    category: "Major Prophet"
  },
  {
    name: "Ezekiel",
    title: "The Visionary Priest",
    description: "Known for his surreal and complex visions while in exile in Babylon, including the valley of dry bones and the glory of God's temple.",
    theme: "Holiness & Glory",
    icon: Wind,
    category: "Major Prophet"
  },
  {
    name: "Daniel",
    title: "Statesman & Seer",
    description: "Served in the courts of Babylon and Persia while remaining uncompromising in his faith. His visions provide the blueprint for biblical eschatology.",
    theme: "Integrity & Future",
    icon: ScrollText,
    category: "Major Prophet"
  },
  {
    name: "Elijah",
    title: "Prophet of Fire",
    description: "A bold reformer who successfully challenged the prophets of Baal on Mount Carmel and was eventually taken to heaven in a whirlwind.",
    theme: "Reform & Power",
    icon: Zap,
    category: "Legacy Prophet"
  },
  {
    name: "Elisha",
    title: "The Miracle Worker",
    description: "Successor to Elijah, who received a double portion of his spirit and performed twice as many miracles, demonstrating God's compassion.",
    theme: "Compassion & Miracles",
    icon: Star,
    category: "Legacy Prophet"
  }
];

export default function ProphetsOfBible() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900 font-urbanist selection:bg-amber-100/50 selection:text-amber-900">
      <SEO 
        title="Prophets of the Bible List | Major and Minor Prophets Guide"
        description="Comprehensive list of biblical prophets. Explore the lives and visions of Isaiah, Jeremiah, Daniel, and Elijah with theological insights and historical context."
        keywords="prophets of the bible list, major and minor prophets, isaiah prophecy, jeremiah weeping prophet, daniel in the bible, elijah book of kings"
        url="/prophets-of-the-bible"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Chronicle of the Biblical Prophets",
          "description": "A detailed resource detailing the lives, prophecies, and historical impact of the prophets throughout the Old Testament.",
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": PROPHETS.map((p, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": p.name,
              "description": p.description
            }))
          }
        }}
      />
      <Navigation />

      {/* Cinematic Hero Section */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-600/30 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1501233321399-6ee212a4f61f?auto=format&fit=crop&q=80&w=2000" 
            alt="Biblical Prophet Cinematic" 
            className="w-full h-full object-cover brightness-[0.4] scale-105 transition-transform duration-[20000ms] hover:scale-100"
          />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white via-white/50 to-transparent z-20" />
        </div>
        
        <div className="relative z-30 max-w-6xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center space-x-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-10">
            <Flame className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-white/80">Voices of the Eternal</span>
          </div>
          <h1 className="text-4xl sm:text-7xl font-black mb-8 leading-[0.9] tracking-tighter italic">
            Prophets of <span className="text-amber-400 not-italic block mt-2">The Bible</span>
          </h1>
          <p className="text-lg sm:text-2xl font-light text-white/70 mb-16 max-w-3xl mx-auto leading-relaxed">
            They were the mouthpieces of God, speaking truth to power and hope to the hopeless. Discover the men who foresaw the light in the midst of darkness.
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
          <span className="text-black font-semibold">Prophets</span>
        </div>

        {/* Intro Section */}
        <section className="mb-40 text-center max-w-3xl mx-auto">
          <ScrollText className="w-12 h-12 text-amber-500 mx-auto mb-8 opacity-40" />
          <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-gray-400 mb-8 tracking-widest">— The Prophetic Word —</h2>
          <p className="text-2xl font-light text-gray-600 leading-relaxed italic">
            "The Word of the Lord came to me..." — A common beginning to stories that shifted the destiny of nations.
          </p>
          <div className="h-px w-24 bg-gray-200 mx-auto mt-12" />
        </section>

        {/* Prophets Grid */}
        <section className="mb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {PROPHETS.map((p, i) => (
              <Card 
                key={i} 
                className="group border border-gray-100/60 hover:border-amber-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 rounded-[3rem] overflow-hidden cursor-pointer bg-white"
                onClick={() => navigate("/bible-questions-and-answers-hub")}
              >
                <CardHeader className="pt-12 px-10">
                  <div className={`w-16 h-16 rounded-[1.5rem] bg-amber-50 flex items-center justify-center mb-8 transition-colors group-hover:bg-amber-600`}>
                    <p.icon className="w-8 h-8 text-amber-600 group-hover:text-white transition-colors" />
                  </div>
                  <CardTitle className="text-4xl font-normal italic serif group-hover:text-amber-900 transition-colors mb-2">{p.name}</CardTitle>
                  <CardDescription className="text-[10px] font-bold text-amber-600 uppercase tracking-[0.25em]">{p.category}</CardDescription>
                </CardHeader>
                <CardContent className="px-10 pb-12 space-y-6 text-left">
                  <div className="space-y-4">
                    <h4 className="text-xl font-medium text-gray-800 italic">{p.theme}</h4>
                    <p className="text-xl font-light text-gray-500 leading-relaxed">{p.description}</p>
                  </div>
                  <div className="flex items-center text-amber-600 font-bold text-xs tracking-widest uppercase pt-6">
                    Read Prophecy <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-40 py-24 bg-amber-600 rounded-[4rem] text-white px-10 lg:px-20 overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 blur-[150px] rounded-full translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-1/3 h-full bg-white/5 blur-[120px] rounded-full -translate-x-1/2" />
          
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-white/30 mb-8">Uncover the Visions</h2>
            <h3 className="text-4xl sm:text-6xl font-black leading-tight mb-12 italic">"Surely the Sovereign Lord does nothing without revealing his plan to his servants the prophets."</h3>
            <p className="text-xl font-light text-white/80 leading-relaxed mb-12">
              Deepen your understanding of Old Testament prophecy through our curated study materials and chapter-by-chapter quiz modules.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button size="lg" className="bg-white text-amber-700 hover:bg-gray-100 px-10 py-8 text-sm sm:text-lg rounded-2xl font-bold transition-all active:scale-95" onClick={() => navigate("/bible-questions-and-answers-hub/isaiah")}>
                Study Isaiah
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-amber-700 transition-all px-10 py-8 text-sm sm:text-lg rounded-2xl font-light active:scale-95" onClick={() => navigate("/bible-characters")}>
                All Characters
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
