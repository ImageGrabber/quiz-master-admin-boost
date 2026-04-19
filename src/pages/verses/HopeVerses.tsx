import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  ChevronRight, 
  BookOpen, 
  Anchor, 
  Quote,
  Sun,
  Sunrise,
  Lightbulb,
  CloudSun
} from 'lucide-react';
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import RelatedContentWidget from "@/components/RelatedContentWidget";

const HOPE_VERSES = [
  {
    id: "jeremiah-29-11",
    reference: "Jeremiah 29:11",
    text: "For I know the plans I have for you,' declares the Lord, 'plans to prosper you and not to harm you, plans to give you hope and a future.",
    reflection: "Even in exile and hardship, God's intentions for His people are rooted in ultimate restoration. Hope is not a wish for things to get better, but a confidence in God's pre-existing plan for our good.",
    theme: "The Divine Blueprint"
  },
  {
    id: "romans-15-13",
    reference: "Romans 15:13",
    text: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.",
    reflection: "Hope is not something we manufacture; it is something God fills us with. As we trust Him, hope becomes an internal spring that overflows even when external circumstances are dry.",
    theme: "Overflowing Hope"
  },
  {
    id: "isaiah-40-31",
    reference: "Isaiah 40:31",
    text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
    reflection: "Hope is the fuel for endurance. When our eyes are on the Lord, we are supernaturally energized to keep moving forward, neither collapsing under the weight of the present nor fearing the distance of the future.",
    theme: "Active Endurance"
  },
  {
    id: "hebrews-6-19",
    reference: "Hebrews 6:19",
    text: "We have this hope as an anchor for the soul, firm and secure.",
    reflection: "The world is a turbulent ocean, but hope in Christ is an anchor. It doesn't stop the storm from happening, but it prevents us from being swept away by the waves of doubt or despair.",
    theme: "The Soul's Anchor"
  },
  {
    id: "romans-8-24-25",
    reference: "Romans 8:24-25",
    text: "For in this hope we were saved. But hope that is seen is no hope at all. Who hopes for what they already have? But if we hope for what we do not yet have, we wait for it patiently.",
    reflection: "Hope lives in the 'not yet.' It requires a holy patience that looks past current pain toward the guaranteed glory of the future. It is the bridge between our present reality and God's eternal promise.",
    theme: "Patient Expectation"
  },
  {
    id: "psalm-130-5",
    reference: "Psalm 130:5",
    text: "I wait for the Lord, my whole being waits, and in his word I put my hope.",
    reflection: "Hope is anchored in the Word. When we feel lost, the promises written in scripture provide the map back to peace. Waiting for the Lord is never wasted time; it is the posture of a soul that knows help is coming.",
    theme: "Waiting in Word"
  }
];

export default function HopeVerses() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900 font-urbanist selection:bg-sky-100/50 selection:text-sky-900">
      <SEO 
        title="Bible Verses about Hope | Find Comfort and Future Strength"
        description="Discover the most encouraging Bible verses about hope. Find scriptures to sustain you in difficult times and provide a firm anchor for your soul."
        keywords="bible verses about hope, scripture for hope in hard times, an anchor for the soul verse, hope and a future scripture"
        url="/verses/hope"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Bible Verses about Hope: Finding Future Strength in Present Struggles",
          "description": "A curated collection of biblical promises focused on hope, endurance, and God's faithful plans.",
          "author": {
            "@type": "Organization",
            "name": "Bible Quiz Competition"
          },
          "mainEntity": {
            "@type": "FAQPage",
            "mainEntity": HOPE_VERSES.map(v => ({
              "@type": "Question",
              "name": `How does ${v.reference} provide hope?`,
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
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden bg-sky-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-600/30 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1470252649358-96957c053e9a?auto=format&fit=crop&q=80&w=2000" 
            alt="Horizon of Hope Cinematic" 
            className="w-full h-full object-cover brightness-[0.4] scale-105 transition-transform duration-[20000ms] hover:scale-100"
          />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white via-white/50 to-transparent z-20" />
        </div>
        
        <div className="relative z-30 max-w-6xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center space-x-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-10">
            <Anchor className="w-5 h-5 text-sky-400" />
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-white/80">The Incorruptible Promise</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-[8rem] font-black mb-8 leading-[0.9] tracking-tighter italic">
            Future & <span className="text-sky-400 not-italic block mt-2">Hope</span>
          </h1>
          <p className="text-lg sm:text-2xl font-light text-white/70 mb-16 max-w-3xl mx-auto leading-relaxed">
            Hope is not the absence of trouble, but the presence of a guaranteed future. Discover the verses that have lit the way through the darkest nights of history.
          </p>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center text-xs font-light text-gray-400 mb-20 px-2 tracking-widest uppercase">
          <button className="hover:text-black transition-colors" onClick={() => navigate("/")}>Home</button>
          <ChevronRight className="w-3 h-3 mx-4 opacity-30" />
          <span className="text-black font-semibold">Verses on Hope</span>
        </div>

        {/* Introduction */}
        <section className="mb-40 text-center max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-gray-400 mb-8 tracking-widest">— The Anchor of the Soul —</h2>
          <p className="text-2xl font-light text-gray-600 leading-relaxed italic">
            "Now faith is confidence in what we hope for and assurance about what we do not see."
          </p>
          <div className="h-px w-24 bg-gray-200 mx-auto mt-12" />
        </section>

        {/* Verses Grid */}
        <section className="mb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {HOPE_VERSES.map((v) => (
              <div key={v.id} className="space-y-10 group">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-sky-600/60">{v.theme}</span>
                    <div className="h-px flex-1 bg-gray-100" />
                  </div>
                  <h3 className="text-4xl font-normal text-gray-900 italic serif leading-tight group-hover:text-sky-900 transition-colors">
                    {v.reference}
                  </h3>
                </div>
                
                <div className="relative p-12 rounded-[3rem] bg-sky-50/30 border border-sky-100/50 group-hover:bg-white group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500">
                  <Quote className="absolute top-8 left-8 w-12 h-12 text-sky-200 opacity-50" />
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
        <section className="mb-40 py-24 bg-sky-600 rounded-[4rem] text-white px-10 lg:px-20 overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 blur-[150px] rounded-full translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-1/3 h-full bg-white/5 blur-[120px] rounded-full -translate-x-1/2" />
          
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-white/30 mb-8">Keep Looking Forward</h2>
            <h3 className="text-4xl sm:text-6xl font-black leading-tight mb-12 italic">"Your hope will not be cut off."</h3>
            <p className="text-xl font-light text-white/90 leading-relaxed mb-12">
              Biblical hope is a certainty based on the character of God. No matter what you are facing today, the story is not over. God is still on the throne, and His promises remain true.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button size="lg" className="bg-white text-sky-700 hover:bg-gray-100 px-10 py-8 text-sm sm:text-lg rounded-2xl font-bold transition-all active:scale-95" onClick={() => navigate("/daily-verse")}>
                Today's Daily Verse
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-sky-700 transition-all px-10 py-8 text-sm sm:text-lg rounded-2xl font-light active:scale-95" onClick={() => navigate("/verses/love")}>
                Verses for Love
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
