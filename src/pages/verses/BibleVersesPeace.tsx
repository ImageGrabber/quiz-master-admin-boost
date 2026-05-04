import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Leaf, 
  ChevronRight, 
  BookOpen, 
  Compass,
  Quote,
  Flame,
  Globe,
  Sun,
  Moon
} from 'lucide-react';
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const PEACE_VERSES = [
  {
    id: "phil-4-6-7",
    reference: "Philippians 4:6-7",
    text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
    reflection: "This verse is a powerful antidote to anxiety. It calls us to shift our focus from our worries to God's presence through prayer and gratitude. The promise is not just a feeling of calm, but a 'guard'—a divine sentry that protects our inner world.",
    theme: "Divine Protection"
  },
  {
    id: "isaiah-26-3",
    reference: "Isaiah 26:3",
    text: "You will keep in perfect peace those whose minds are steadfast, because they trust in you.",
    reflection: "Perfect peace is not the absence of trouble, but the presence of trust. When we anchor our minds on God's character rather than our circumstances, He stabilizes our soul in a way the world cannot replicate.",
    theme: "Steadfast Mind"
  },
  {
    id: "john-14-27",
    reference: "John 14:27",
    text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.",
    reflection: "Jesus gives us a peace that is fundamentally different from worldly peace. Worldly peace depends on favorable conditions, but the peace of Christ is a gift that remains even in the midst of the storm.",
    theme: "The Gift of Christ"
  },
  {
    id: "psalm-23-4",
    reference: "Psalm 23:4",
    text: "Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.",
    reflection: "Comfort comes from companionship. The psalmist doesn't say the valley isn't dark; he says he isn't afraid because the Shepherd is present. God's presence is the ultimate source of courage in our darkest moments.",
    theme: "Divine Presence"
  },
  {
    id: "1-peter-5-7",
    reference: "1 Peter 5:7",
    text: "Cast all your anxiety on him because he cares for you.",
    reflection: "The image here is of throwing a heavy burden onto someone else. We aren't meant to carry the weight of the world on our shoulders. We can trust God with our worries because His care for us is personal and profound.",
    theme: "Releasing Burdens"
  },
  {
    id: "matthew-11-28",
    reference: "Matthew 11:28",
    text: "Come to me, all you who are weary and burdened, and I will give you rest.",
    reflection: "This is a radical invitation from Jesus. He doesn't just offer advice; He offers Himself. True rest for the soul is found in a relationship with Him, where we trade our exhaustion for His grace.",
    theme: "Soul Rest"
  }
];

export default function BibleVersesPeace() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900 font-urbanist selection:bg-blue-100/50 selection:text-blue-900">
      <SEO 
        title="Bible Verses for Peace and Anxiety | Find Comfort in Scripture"
        description="Discover powerful Bible verses for peace, anxiety, and strength. Find spiritual comfort and tranquility through curated scriptures, reflections, and prayers."
        keywords="bible verses for peace, bible verses for anxiety, scripture for comfort, spiritual strength verses, finding peace in the bible, calm bible verses"
        url="/verses/peace-and-anxiety"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Bible Verses for Peace and Anxiety: Finding Comfort in Scripture",
          "description": "A curated collection of Bible verses to help overcome anxiety and find divine peace.",
          "image": "/images/hero/peace-anxiety.png",
          "author": {
            "@type": "Organization",
            "name": "Bible Quiz Competition"
          },
          "mainEntity": {
            "@type": "FAQPage",
            "mainEntity": PEACE_VERSES.map(v => ({
              "@type": "Question",
              "name": `What does the Bible say about peace in ${v.reference}?`,
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
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero/peace-anxiety.png" 
            alt="Peaceful Landscape Cinematic" 
            className="w-full h-full object-cover brightness-[0.6] scale-105 transition-transform duration-[20000ms] hover:scale-100"
          />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white via-white/50 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center space-x-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-10 animate-in fade-in slide-in-from-top-6 duration-1000">
            <Leaf className="w-5 h-5 text-sky-400" />
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-white/80">Spiritual Wellness</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-[8rem] font-normal mb-8 leading-[0.9] tracking-tighter animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            Peace & <span className="italic font-serif block mt-2 text-white/90">Anxiety</span>
          </h1>
          <p className="text-lg sm:text-2xl font-light text-white/70 mb-16 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-400">
            In a world of noise, find the silence of God. Explore curated scriptures designed to calm your mind and anchor your soul in His eternal peace.
          </p>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center text-xs font-light text-gray-400 mb-20 px-2 tracking-widest uppercase">
          <button className="hover:text-black transition-colors" onClick={() => navigate("/")}>Home</button>
          <ChevronRight className="w-3 h-3 mx-4 opacity-30" />
          <span className="text-black font-semibold">Verses for Peace</span>
        </div>

        {/* Introduction */}
        <section className="mb-40 text-center max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-gray-400 mb-8 tracking-widest">— The Source of Calm —</h2>
          <p className="text-2xl font-light text-gray-600 leading-relaxed italic">
            "Peace is not the absence of trouble, but the presence of God."
          </p>
          <div className="h-px w-24 bg-gray-200 mx-auto mt-12" />
        </section>

        {/* Verses Grid */}
        <section className="mb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {PEACE_VERSES.map((v) => (
              <div key={v.id} className="space-y-10 group">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-500/60">{v.theme}</span>
                    <div className="h-px flex-1 bg-gray-100" />
                  </div>
                  <h3 className="text-4xl font-normal text-gray-900 italic serif leading-tight group-hover:text-blue-900 transition-colors">
                    {v.reference}
                  </h3>
                </div>
                
                <div className="relative p-12 rounded-[3rem] bg-gray-50 border border-gray-100 group-hover:bg-white group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500">
                  <Quote className="absolute top-8 left-8 w-12 h-12 text-blue-100 opacity-50" />
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
        <section className="mb-40 py-24 bg-blue-900 rounded-[4rem] text-white px-10 lg:px-20 overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 blur-[150px] rounded-full translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-1/3 h-full bg-sky-500/5 blur-[120px] rounded-full -translate-x-1/2" />
          
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-white/30 mb-8">A Final Thought</h2>
            <h3 className="text-4xl sm:text-6xl font-normal leading-tight mb-12 italic serif">"The Lord is near to all who call on him."</h3>
            <p className="text-xl font-light text-white/50 leading-relaxed mb-12">
              If you are struggling with anxiety today, remember that you are not alone. God invites you to cast your cares upon Him. He is a refuge for the weary and a source of strength for the faint of heart.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 px-10 py-8 text-sm sm:text-lg rounded-2xl font-light shadow-2xl transition-all active:scale-95" onClick={() => navigate("/prayer-requests")}>
                Request Prayer
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-blue-900 transition-all px-10 py-8 text-sm sm:text-lg rounded-2xl font-light active:scale-95" onClick={() => navigate("/daily-verse")}>
                Today's Daily Verse
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
