import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  ChevronRight, 
  BookOpen, 
  Sparkles, 
  Quote,
  Flame,
  UserCheck,
  Globe,
  Sun
} from 'lucide-react';
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import RelatedContentWidget from "@/components/RelatedContentWidget";

const LOVE_VERSES = [
  {
    id: "1-cor-13-4-7",
    reference: "1 Corinthians 13:4-7",
    text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs. Love does not delight in evil but rejoices with the truth. It always protects, always trusts, always hopes, always perseveres.",
    reflection: "This 'Hymn to Love' is the definitive definition of agape love—a love that is choice-based, selfless, and enduring. It's not just a feeling, but a series of actions that prioritize others across every season of life.",
    theme: "The Master Definition"
  },
  {
    id: "1-john-4-8",
    reference: "1 John 4:8",
    text: "Whoever does not love does not know God, because God is love.",
    reflection: "God doesn't just 'have' love; He IS love. To know God is to be transformed by His nature. Our ability to love others is the primary evidence of our connection to the Divine source.",
    theme: "God's Essence"
  },
  {
    id: "john-15-13",
    reference: "John 15:13",
    text: "Greater love has no one than this: to lay down one's life for one's friends.",
    reflection: "Sacrifice is the ultimate metric of love. Jesus demonstrated this perfectly, teaching us that the highest form of love is the willingness to give up our own rights and comfort for the sake of another.",
    theme: "Sacrificial Love"
  },
  {
    id: "romans-5-8",
    reference: "Romans 5:8",
    text: "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.",
    reflection: "God's love is not conditional. He didn't wait for us to improve before extending His hand. This verse anchors our security in the fact that we were loved at our lowest point.",
    theme: "Unconditional Grace"
  },
  {
    id: "proverbs-17-17",
    reference: "Proverbs 17:17",
    text: "A friend loves at all times, and a brother is born for a time of adversity.",
    reflection: "Consistency is the watermark of true love. Biblical love isn't fair-weather; it's forged in the fires of shared struggle and remains steady when situations are most difficult.",
    theme: "Faithful Friendship"
  },
  {
    id: "ephesians-3-17-18",
    reference: "Ephesians 3:17-18",
    text: "And I pray that you, being rooted and established in love, may have power, together with all the Lord's holy people, to grasp how wide and long and high and deep is the love of Christ.",
    reflection: "Christ's love is multidimensional. It is wide enough to cover all people, long enough to last forever, deep enough to reach the lowest depth of despair, and high enough to lift us to heaven.",
    theme: "Infinite Dimensions"
  }
];

export default function LoveVerses() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900 font-urbanist selection:bg-rose-100/50 selection:text-rose-900">
      <SEO 
        title="Bible Verses about Love | Agape, Friendship, and Divine Love"
        description="Explore the most powerful Bible verses about love. Discover curated scriptures on God's unconditional love, marital devotion, and selfless friendship with reflections."
        keywords="bible verses about love, scripture on love, god is love verses, 1 corinthians 13, love thy neighbor scripture"
        url="/verses/love"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Bible Verses about Love: Understanding Agape and Devotion",
          "description": "A comprehensive guide to biblical love, featuring curated scriptures and practical reflections for daily life.",
          "author": {
            "@type": "Organization",
            "name": "Bible Quiz Competition"
          },
          "mainEntity": {
            "@type": "FAQPage",
            "mainEntity": LOVE_VERSES.map(v => ({
              "@type": "Question",
              "name": `What does ${v.reference} teach about love?`,
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
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden bg-rose-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-600/30 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=2000" 
            alt="Cinematic Love Backdrop" 
            className="w-full h-full object-cover brightness-[0.4] scale-105 transition-transform duration-[20000ms] hover:scale-100"
          />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white via-white/50 to-transparent z-20" />
        </div>
        
        <div className="relative z-30 max-w-6xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center space-x-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-10">
            <Heart className="w-5 h-5 text-rose-400 fill-rose-400/20" />
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-white/80">The Greatest Commandment</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-[8rem] font-black mb-8 leading-[0.9] tracking-tighter italic">
            Faith, Hope & <span className="text-rose-400 not-italic block mt-2">Love</span>
          </h1>
          <p className="text-lg sm:text-2xl font-light text-white/70 mb-16 max-w-3xl mx-auto leading-relaxed">
            "But the greatest of these is love." Explore the radical, life-altering power of Agapē—the love that initiated creation and redeemed humanity.
          </p>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center text-xs font-light text-gray-400 mb-20 px-2 tracking-widest uppercase">
          <button className="hover:text-black transition-colors" onClick={() => navigate("/")}>Home</button>
          <ChevronRight className="w-3 h-3 mx-4 opacity-30" />
          <span className="text-black font-semibold">Verses on Love</span>
        </div>

        {/* Introduction */}
        <section className="mb-40 text-center max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-gray-400 mb-8 tracking-widest">— The Source of Life —</h2>
          <p className="text-2xl font-light text-gray-600 leading-relaxed italic">
            "Beloved, let us love one another, for love is from God, and whoever loves has been born of God and knows God."
          </p>
          <div className="h-px w-24 bg-gray-200 mx-auto mt-12" />
        </section>

        {/* Verses Grid */}
        <section className="mb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {LOVE_VERSES.map((v) => (
              <div key={v.id} className="space-y-10 group">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-rose-600/60">{v.theme}</span>
                    <div className="h-px flex-1 bg-gray-100" />
                  </div>
                  <h3 className="text-4xl font-normal text-gray-900 italic serif leading-tight group-hover:text-rose-900 transition-colors">
                    {v.reference}
                  </h3>
                </div>
                
                <div className="relative p-12 rounded-[3rem] bg-rose-50/30 border border-rose-100/50 group-hover:bg-white group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500">
                  <Quote className="absolute top-8 left-8 w-12 h-12 text-rose-200 opacity-50" />
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
        <section className="mb-40 py-24 bg-rose-600 rounded-[4rem] text-white px-10 lg:px-20 overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 blur-[150px] rounded-full translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-1/3 h-full bg-white/5 blur-[120px] rounded-full -translate-x-1/2" />
          
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-white/30 mb-8">A Final Thought</h2>
            <h3 className="text-4xl sm:text-6xl font-black leading-tight mb-12 italic">"We love because He first loved us."</h3>
            <p className="text-xl font-light text-white/90 leading-relaxed mb-12">
              The Christian mission is simple but profound: to receive the infinite love of God and extend it to a world that is desperate for it. Let love be your guide in every conversation, decision, and prayer.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button size="lg" className="bg-white text-rose-700 hover:bg-gray-100 px-10 py-8 text-sm sm:text-lg rounded-2xl font-bold transition-all active:scale-95" onClick={() => navigate("/quizzes")}>
                Start Today's Quiz
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-rose-700 transition-all px-10 py-8 text-sm sm:text-lg rounded-2xl font-light active:scale-95" onClick={() => navigate("/verses/peace-and-anxiety")}>
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
