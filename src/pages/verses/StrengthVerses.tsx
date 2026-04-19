import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dumbbell, 
  ChevronRight, 
  BookOpen, 
  Sparkles, 
  Quote,
  Shield,
  Zap,
  Award,
  Sun
} from 'lucide-react';
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import RelatedContentWidget from "@/components/RelatedContentWidget";

const STRENGTH_VERSES = [
  {
    id: "isaiah-40-31",
    reference: "Isaiah 40:31",
    text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
    reflection: "Strength is not just about our own energy, but about where we place our hope. When we wait on the Lord, He provides a supernatural endurance that allows us to rise above our circumstances.",
    theme: "Renewed Power"
  },
  {
    id: "phil-4-13",
    reference: "Philippians 4:13",
    text: "I can do all this through him who gives me strength.",
    reflection: "This isn't a magic formula for success, but a promise of contentment and capability in every situation. Christ's strength is made perfect in our weakness.",
    theme: "Divine Capability"
  },
  {
    id: "joshua-1-9",
    reference: "Joshua 1:9",
    text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
    reflection: "Courage is a command, but it's based on a promise. We can be strong because God's presence is constant. We don't walk into our battles alone.",
    theme: "Courageous Faith"
  },
  {
    id: "2-tim-1-7",
    reference: "2 Timothy 1:7",
    text: "For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.",
    reflection: "Our default as believers should not be fear. The Holy Spirit provides a threefold gift: the power to act, the love to care, and the discipline to stay focused.",
    theme: "Spirit-Led Power"
  },
  {
    id: "psalm-28-7",
    reference: "Psalm 28:7",
    text: "The Lord is my strength and my shield; my heart trusts in him, and he helps me. My heart leaps for joy, and with my song I praise him.",
    reflection: "God is both our offensive strength and our defensive shield. When we trust Him, our worry turns to joy and our struggle turns to praise.",
    theme: "Shield & Support"
  },
  {
    id: "isaiah-41-10",
    reference: "Isaiah 41:10",
    text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
    reflection: "God's help is active. He doesn't just watch us from afar; He upholds us. Dismay loses its grip when we realize the Almighty is literally holding us up.",
    theme: "Active Deliverance"
  }
];

export default function StrengthVerses() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900 font-urbanist selection:bg-amber-100/50 selection:text-amber-900">
      <SEO 
        title="Bible Verses for Strength and Courage | Find Daily Empowerment"
        description="Discover powerful Bible verses for strength in hard times. Find spiritual empowerment and courage through curated scriptures, reflections, and prayers."
        keywords="bible verses for strength, scripture for courage, strength in hard times, spiritual empowerment, bible verses for endurance"
        url="/verses/strength-and-courage"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Bible Verses for Strength and Courage: Finding Daily Empowerment",
          "description": "A curated collection of Bible verses to help you find strength and courage in every season of life.",
          "author": {
            "@type": "Organization",
            "name": "Bible Quiz Competition"
          },
          "mainEntity": {
            "@type": "FAQPage",
            "mainEntity": STRENGTH_VERSES.map(v => ({
              "@type": "Question",
              "name": `How does ${v.reference} provide strength?`,
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
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000" 
            alt="Mountain Strength Cinematic" 
            className="w-full h-full object-cover brightness-[0.4] scale-105 transition-transform duration-[20000ms] hover:scale-100"
          />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white via-white/50 to-transparent z-20" />
        </div>
        
        <div className="relative z-30 max-w-6xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center space-x-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-10">
            <Dumbbell className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-white/80">Spiritual Fortitude</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-[8rem] font-black mb-8 leading-[0.9] tracking-tighter italic">
            Strength & <span className="text-amber-400 not-italic block mt-2">Courage</span>
          </h1>
          <p className="text-lg sm:text-2xl font-light text-white/70 mb-16 max-w-3xl mx-auto leading-relaxed">
            When your own power fades, His begins. Discover the ancient promises that have empowered believers to overcome the impossible for generations.
          </p>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center text-xs font-light text-gray-400 mb-20 px-2 tracking-widest uppercase">
          <button className="hover:text-black transition-colors" onClick={() => navigate("/")}>Home</button>
          <ChevronRight className="w-3 h-3 mx-4 opacity-30" />
          <span className="text-black font-semibold">Verses for Strength</span>
        </div>

        {/* Introduction */}
        <section className="mb-40 text-center max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-gray-400 mb-8 tracking-widest">— The Source of Power —</h2>
          <p className="text-2xl font-light text-gray-600 leading-relaxed italic">
            "God is our refuge and strength, an ever-present help in trouble."
          </p>
          <div className="h-px w-24 bg-gray-200 mx-auto mt-12" />
        </section>

        {/* Verses Grid */}
        <section className="mb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {STRENGTH_VERSES.map((v) => (
              <div key={v.id} className="space-y-10 group">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-600/60">{v.theme}</span>
                    <div className="h-px flex-1 bg-gray-100" />
                  </div>
                  <h3 className="text-4xl font-normal text-gray-900 italic serif leading-tight group-hover:text-amber-900 transition-colors">
                    {v.reference}
                  </h3>
                </div>
                
                <div className="relative p-12 rounded-[3rem] bg-amber-50/30 border border-amber-100/50 group-hover:bg-white group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500">
                  <Quote className="absolute top-8 left-8 w-12 h-12 text-amber-200 opacity-50" />
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
        <section className="mb-40 py-24 bg-amber-600 rounded-[4rem] text-white px-10 lg:px-20 overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 blur-[150px] rounded-full translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-1/3 h-full bg-orange-500/5 blur-[120px] rounded-full -translate-x-1/2" />
          
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-white/30 mb-8">A Final Thought</h2>
            <h3 className="text-4xl sm:text-6xl font-black leading-tight mb-12 italic">"He gives strength to the weary."</h3>
            <p className="text-xl font-light text-white/80 leading-relaxed mb-12">
              Strength in the Bible is rarely about muscles; it's about the heart. When you feel at your breaking point, remember that God's grace is sufficient for you, for His power is made perfect in weakness.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button size="lg" className="bg-white text-amber-700 hover:bg-gray-100 px-10 py-8 text-sm sm:text-lg rounded-2xl font-bold transition-all active:scale-95" onClick={() => navigate("/quizzes")}>
                Test Your Knowledge
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-amber-700 transition-all px-10 py-8 text-sm sm:text-lg rounded-2xl font-light active:scale-95" onClick={() => navigate("/verses/peace-and-anxiety")}>
                Verses for Peace
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
