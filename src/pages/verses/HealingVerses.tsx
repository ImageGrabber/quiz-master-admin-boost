import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  HeartPulse, 
  ChevronRight, 
  BookOpen, 
  Sparkles, 
  Quote,
  ShieldCheck,
  Zap,
  Award,
  Sun,
  HandHelping
} from 'lucide-react';
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import RelatedContentWidget from "@/components/RelatedContentWidget";

const HEALING_VERSES = [
  {
    id: "psalm-147-3",
    reference: "Psalm 147:3",
    text: "He heals the brokenhearted and binds up their wounds.",
    reflection: "God's specialty is restoring what has been shattered. He doesn't just watch our pain; He is the Great Physician who tenderly cares for our deepest emotional and spiritual wounds.",
    theme: "Emotional Restoration"
  },
  {
    id: "jeremiah-17-14",
    reference: "Jeremiah 17:14",
    text: "Heal me, Lord, and I will be healed; save me and I will be saved, for you are the one I praise.",
    reflection: "This is a prayer of absolute confidence. When God heals, the healing is complete and profound. It reminds us that our primary source of wellness is found in Him alone.",
    theme: "Absolute Confidence"
  },
  {
    id: "james-5-15",
    reference: "James 5:15",
    text: "And the prayer offered in faith will make the sick person well; the Lord will raise them up.",
    reflection: "Faith and prayer are powerful conduits for God's healing energy. This verse encourages the community of believers to support one another in seeking God's restorative touch.",
    theme: "Power of Prayer"
  },
  {
    id: "exodus-15-26",
    reference: "Exodus 15:26",
    text: "I am the Lord, who heals you.",
    reflection: "One of God's names is 'Jehovah Rapha'—The Lord Who Heals. Healing is not just something He does; it is part of who He is. We can rest in His character as our restorer.",
    theme: "Divine Identity"
  },
  {
    id: "matthew-11-28",
    reference: "Matthew 11:28",
    text: "Come to me, all you who are weary and burdened, and I will give you rest.",
    reflection: "Rest is often the first step in healing. Jesus invites us to trade our heavy burdens for His light yoke, providing the quiet space our souls need to recover.",
    theme: "Soul Recovery"
  },
  {
    id: "proverbs-4-20-22",
    reference: "Proverbs 4:20-22",
    text: "My son, pay attention to what I say... for they are life to those who find them and health to one’s whole body.",
    reflection: "Scripture itself has a medicinal quality. Immersing our minds in the Word of God brings health not just to our spirits, but has a calming, restorative effect on our physical bodies.",
    theme: "Medicinal Word"
  }
];

export default function HealingVerses() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900 font-urbanist selection:bg-teal-100/50 selection:text-teal-900">
      <SEO 
        title="Bible Verses for Healing and Restoration | Trust God's Mercy"
        description="Find comfort and hope in Bible verses for healing. Discover curated scriptures for physical, emotional, and spiritual restoration through God's Word."
        keywords="bible verses for healing, scripture for restoration, healing prayer, bible verses for sickness, finding hope in god's word"
        url="/verses/healing-and-restoration"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Bible Verses for Healing and Restoration: Trusting the Great Physician",
          "description": "A curated collection of Bible verses to remind you of God's power and desire to restore and heal.",
          "author": {
            "@type": "Organization",
            "name": "Bible Quiz Competition"
          },
          "mainEntity": {
            "@type": "FAQPage",
            "mainEntity": HEALING_VERSES.map(v => ({
              "@type": "Question",
              "name": `What is the meaning of ${v.reference} regarding healing?`,
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
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden bg-teal-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-600/20 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=2000" 
            alt="Healing Waters Cinematic" 
            className="w-full h-full object-cover brightness-[0.4] scale-105 transition-transform duration-[20000ms] hover:scale-100"
          />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white via-white/50 to-transparent z-20" />
        </div>
        
        <div className="relative z-30 max-w-6xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center space-x-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-10">
            <HeartPulse className="w-5 h-5 text-teal-400" />
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-white/80">Spiritual Restorative</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-[8rem] font-black mb-8 leading-[0.9] tracking-tighter italic">
            Healing & <span className="text-teal-400 not-italic block mt-2">Restoration</span>
          </h1>
          <p className="text-lg sm:text-2xl font-light text-white/70 mb-16 max-w-3xl mx-auto leading-relaxed">
            In seasons of pain, find the touch of the Great Physician. Let these ancient truths wash over your soul and bring renewal to your heart and body.
          </p>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center text-xs font-light text-gray-400 mb-20 px-2 tracking-widest uppercase">
          <button className="hover:text-black transition-colors" onClick={() => navigate("/")}>Home</button>
          <ChevronRight className="w-3 h-3 mx-4 opacity-30" />
          <span className="text-black font-semibold">Verses for Healing</span>
        </div>

        {/* Introduction */}
        <section className="mb-40 text-center max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-gray-400 mb-8 tracking-widest">— The Great Physician —</h2>
          <p className="text-2xl font-light text-gray-600 leading-relaxed italic">
            "Heal me, Lord, and I will be healed; save me and I will be saved."
          </p>
          <div className="h-px w-24 bg-gray-200 mx-auto mt-12" />
        </section>

        {/* Verses Grid */}
        <section className="mb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {HEALING_VERSES.map((v) => (
              <div key={v.id} className="space-y-10 group">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-teal-600/60">{v.theme}</span>
                    <div className="h-px flex-1 bg-gray-100" />
                  </div>
                  <h3 className="text-4xl font-normal text-gray-900 italic serif leading-tight group-hover:text-teal-900 transition-colors">
                    {v.reference}
                  </h3>
                </div>
                
                <div className="relative p-12 rounded-[3rem] bg-teal-50/30 border border-teal-100/50 group-hover:bg-white group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500">
                  <Quote className="absolute top-8 left-8 w-12 h-12 text-teal-100 opacity-50" />
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
        <section className="mb-40 py-24 bg-teal-600 rounded-[4rem] text-white px-10 lg:px-20 overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 blur-[150px] rounded-full translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-1/3 h-full bg-emerald-500/5 blur-[120px] rounded-full -translate-x-1/2" />
          
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-white/30 mb-8">A Final Thought</h2>
            <h3 className="text-4xl sm:text-6xl font-black leading-tight mb-12 italic">"By His wounds, we are healed."</h3>
            <p className="text-xl font-light text-white/80 leading-relaxed mb-12">
              Healing is often a journey rather than a single event. Be patient with yourself and trust in the timing of God. He is near to the brokenhearted and saves those who are crushed in spirit.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button size="lg" className="bg-white text-teal-700 hover:bg-gray-100 px-10 py-8 text-sm sm:text-lg rounded-2xl font-bold transition-all active:scale-95" onClick={() => navigate("/quizzes")}>
                Daily Bible Quiz
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-teal-700 transition-all px-10 py-8 text-sm sm:text-lg rounded-2xl font-light active:scale-95" onClick={() => navigate("/verses/strength-and-courage")}>
                Verses for Strength
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
