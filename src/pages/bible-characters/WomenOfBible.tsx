import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  ChevronRight, 
  BookOpen, 
  Star, 
  Sparkles, 
  Quote,
  Shield,
  Flower2,
  Users,
  Crown
} from 'lucide-react';
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import RelatedContentWidget from "@/components/RelatedContentWidget";

const BIBLE_WOMEN = [
  {
    name: "Esther",
    title: "The Courageous Queen",
    description: "A Jewish orphan became Queen of Persia and risked her life to save her entire nation from a genocidal plot. Her story is the foundation of the festival of Purim.",
    theme: "Courage & Sovereignty",
    icon: Crown
  },
  {
    name: "Deborah",
    title: "The Judge and Prophetess",
    description: "The only female judge named in the Bible, she led Israel into battle and provided wise counsel under a palm tree. She was a military leader and a songwriter.",
    theme: "Leadership & Vision",
    icon: Shield
  },
  {
    name: "Mary of Nazareth",
    title: "The Mother of Jesus",
    description: "A humble teenager who said 'yes' to God's radical plan, bearing the Messiah and demonstrating absolute surrender to the Holy Spirit.",
    theme: "Surrender & Favor",
    icon: Heart
  },
  {
    name: "Ruth",
    title: "The Loyal Moabite",
    description: "A widow from a foreign land who chose to follow her mother-in-law's God. Her loyalty led her into the royal lineage of King David and eventually Jesus.",
    theme: "Loyalty & Redemption",
    icon: Flower2
  },
  {
    name: "Mary Magdalene",
    title: "Witness of the Resurrection",
    description: "One of Jesus' most devoted followers, she was the first person to see the risen Christ and was commissioned to tell the other disciples.",
    theme: "Devotion & Testimony",
    icon: Star
  },
  {
    name: "Sarah",
    title: "Mother of Nations",
    description: "Though she laughed at the promise, she eventually gave birth to Isaac in her old age, proving that nothing is impossible for God.",
    theme: "Patience & Promise",
    icon: Users
  }
];

export default function WomenOfBible() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900 font-urbanist selection:bg-rose-100/50 selection:text-rose-900">
      <SEO 
        title="Women of the Bible List | Most Famous Female Biblical Figures"
        description="Comprehensive list of influential women in the Bible. Study the lives of Esther, Deborah, Ruth, and Mary with insights into their faith, leadership, and legacy."
        keywords="women of the bible list, famous women in the bible, esther bible story, ruth and naomi, female prophets in the bible"
        url="/women-of-the-bible"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Women of the Bible Directory",
          "description": "A curated collection of the most significant female figures in biblical history.",
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": BIBLE_WOMEN.map((w, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": w.name,
              "description": w.description
            }))
          }
        }}
      />
      <Navigation />

      {/* Cinematic Hero Section */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden bg-rose-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-600/30 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=2000" 
            alt="Women of Bible Hero" 
            className="w-full h-full object-cover brightness-[0.4] scale-105 transition-transform duration-[20000ms] hover:scale-100"
          />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white via-white/50 to-transparent z-20" />
        </div>
        
        <div className="relative z-30 max-w-6xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center space-x-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-10">
            <Flower2 className="w-5 h-5 text-rose-400" />
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-white/80">Strength & Grace</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-[8rem] font-black mb-8 leading-[0.9] tracking-tighter italic">
            Women of <span className="text-rose-400 not-italic block mt-2">The Bible</span>
          </h1>
          <p className="text-lg sm:text-2xl font-light text-white/70 mb-16 max-w-3xl mx-auto leading-relaxed">
            From queens and prophets to mothers and missionaries, discover the women who shaped the biblical narrative and proved that God's favor is not limited by gender.
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
          <span className="text-black font-semibold">Women of the Bible</span>
        </div>

        {/* Introduction */}
        <section className="mb-40 text-center max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-gray-400 mb-8 tracking-widest">— Heroes of Faith —</h2>
          <p className="text-2xl font-light text-gray-600 leading-relaxed italic">
            "Many women do noble things, but you surpass them all."
          </p>
          <div className="h-px w-24 bg-gray-200 mx-auto mt-12" />
        </section>

        {/* Character Grid */}
        <section className="mb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {BIBLE_WOMEN.map((w, i) => (
              <Card 
                key={i} 
                className="group border border-gray-100/60 hover:border-rose-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 rounded-[3rem] overflow-hidden cursor-pointer bg-white"
                onClick={() => navigate("/bible-questions-and-answers-hub")}
              >
                <CardHeader className="pt-12 px-10">
                  <div className={`w-16 h-16 rounded-[1.5rem] bg-rose-50 flex items-center justify-center mb-8 transition-colors group-hover:bg-rose-600`}>
                    <w.icon className="w-8 h-8 text-rose-600 group-hover:text-white transition-colors" />
                  </div>
                  <CardTitle className="text-4xl font-normal italic serif group-hover:text-rose-900 transition-colors mb-2">{w.name}</CardTitle>
                  <CardDescription className="text-[10px] font-bold text-rose-600 uppercase tracking-[0.25em]">{w.theme}</CardDescription>
                </CardHeader>
                <CardContent className="px-10 pb-12 space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-xl font-medium text-gray-800 italic">{w.title}</h4>
                    <p className="text-xl font-light text-gray-500 leading-relaxed">{w.description}</p>
                  </div>
                  <div className="flex items-center text-rose-600 font-bold text-xs tracking-widest uppercase pt-6">
                    Study Her Story <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-40 py-24 bg-rose-600 rounded-[4rem] text-white px-10 lg:px-20 overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 blur-[150px] rounded-full translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-1/3 h-full bg-white/5 blur-[120px] rounded-full -translate-x-1/2" />
          
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-white/30 mb-8">Go Deeper</h2>
            <h3 className="text-4xl sm:text-6xl font-black leading-tight mb-12 italic">"For such a time as this."</h3>
            <p className="text-xl font-light text-white/80 leading-relaxed mb-12">
              The legacies of these women continue to inspire millions today. Join our community to access character-specific quizzes and devotionals for every major biblical figure.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button size="lg" className="bg-white text-rose-700 hover:bg-gray-100 px-10 py-8 text-sm sm:text-lg rounded-2xl font-bold transition-all active:scale-95" onClick={() => navigate("/auth/register")}>
                Join the Community
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-rose-700 transition-all px-10 py-8 text-sm sm:text-lg rounded-2xl font-light active:scale-95" onClick={() => navigate("/bible-characters")}>
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
