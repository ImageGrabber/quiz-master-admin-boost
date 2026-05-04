import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { 
  Heart, 
  PlusCircle, 
  Activity, 
  CloudRain, 
  Sun, 
  ShieldCheck, 
  Copy, 
  Check, 
  BookOpen, 
  ArrowRight,
  Anchor,
  Compass
} from "lucide-react";
import { toast } from "sonner";

const prayerCategories = [
  { id: "healing", name: "Healing", icon: Activity, color: "blue" },
  { id: "sadness", name: "Comfort", icon: CloudRain, color: "indigo" },
  { id: "health", name: "Health", icon: Heart, color: "rose" },
  { id: "strength", name: "Strength", icon: ShieldCheck, color: "amber" },
];

const prayers = [
  {
    id: 1,
    category: "healing",
    title: "A Prayer for Physical Healing",
    content: "Heavenly Father, I come before You today in need of Your healing hand. In You, all things are possible. Hold my heart within Yours, and renew my mind, body, and soul. I ask that You would touch me with Your healing power, removing any sickness or pain. Grant me the strength to face each day with hope and trust in Your perfect plan.",
    verse: "Jeremiah 17:14 - Heal me, O Lord, and I shall be healed; save me, and I shall be saved, for you are my praise.",
    tags: ["Physical", "Restoration"]
  },
  {
    id: 2,
    category: "sadness",
    title: "Comfort in Times of Grief",
    content: "Lord, in this time of deep sorrow, I cast all my cares upon You. You are the God of all comfort and the Father of mercies. Please wrap Your loving arms around me and give me the peace that passes all understanding. When my heart is heavy and my tears are many, remind me that You are near to the brokenhearted and that Your grace is sufficient for me.",
    verse: "Psalm 34:18 - The Lord is near to the brokenhearted and saves the crushed in spirit.",
    tags: ["Peace", "Mourning"]
  },
  {
    id: 3,
    category: "health",
    title: "Prayer for Sustained Health",
    content: "God of Grace, I thank You for the gift of life and the breath in my lungs. I pray for Your continued protection over my health and well-being. Strengthen my immune system, grant me restful sleep, and guide me in making choices that honor the body You have given me. May I use the energy You provide to serve You and love others with all my heart.",
    verse: "3 John 1:2 - Beloved, I pray that all may go well with you and that you may be in good health, as it goes well with your soul.",
    tags: ["Vitality", "Gratitude"]
  },
  {
    id: 4,
    category: "strength",
    title: "Seeking Spiritual Strength",
    content: "Father, some days the path feels long and my spirit grows weary. I ask for Your divine strength to rise up within me. Help me to wait upon You, that I might renew my strength, mount up with wings like eagles, run and not be weary, walk and not faint. Let Your joy be my strength and Your Spirit be my guide in every decision I make today.",
    verse: "Isaiah 40:31 - But they who wait for the Lord shall renew their strength; they shall mount up with wings like eagles...",
    tags: ["Endurance", "Power"]
  },
  {
    id: 5,
    category: "healing",
    title: "Restoring the Broken Mind",
    content: "Lord Jesus, You are the Prince of Peace. I bring my anxious thoughts and mental exhaustion to Your feet. I ask for Your healing touch upon my mind. Calm the storms of worry, clear the fog of confusion, and replace every lie with Your truth. Guard my heart and mind in Christ Jesus, and give me a spirit of power, love, and a sound mind.",
    verse: "2 Timothy 1:7 - For God gave us a spirit not of fear but of power and love and self-control.",
    tags: ["Mental Health", "Peace"]
  },
  {
    id: 6,
    category: "sadness",
    title: "Light in the Darkness",
    content: "Almighty God, when the darkness of depression or loneliness feels overwhelming, be my light. Remind me that I am never alone, for You have promised never to leave me nor forsake me. Shine Your hope into the hidden corners of my heart and restore the joy of my salvation. Help me to see the small blessings You provide even in the middle of the struggle.",
    verse: "Psalm 18:28 - For it is you who light my lamp; the Lord my God lightens my darkness.",
    tags: ["Hope", "Loneliness"]
  }
];

export default function PrayersLanding() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const filteredPrayers = activeCategory === "all" 
    ? prayers 
    : prayers.filter(p => p.category === activeCategory);

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Prayer copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] font-urbanist selection:bg-blue-100 selection:text-blue-900">
      <SEO
        title="Prayers for Healing, Health, and Comfort | Bible Quiz Competition"
        description="A sanctuary of Christian prayers for healing, physical health, comfort in sadness, and spiritual strength. Explore scripture-based prayers and find peace."
        keywords="healing prayers, prayers for health, prayers for sadness, comfort prayers, bible based prayers, daily christian prayer hub"
        url="/prayers"
      />
      <Navigation />

      <main className="relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-blue-50/50 via-indigo-50/30 to-transparent -z-10" />
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-100/20 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-rose-50/20 rounded-full blur-[100px] -z-10" />

        <div className="mx-auto max-w-7xl px-4 pb-24 pt-12 md:px-8">
          {/* Hero Section */}
          <section className="text-center mb-16 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-[0.2em]">
              <Sun className="h-3.5 w-3.5" />
              <span>Sanctuary of Peace</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              Prayers for Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 italic font-serif">Season of Life</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-light">
              Find words when your own are hard to find. Explore our collection of scripture-based prayers designed to bring healing, comfort, and renewed strength.
            </p>
          </section>

          {/* Quick Links & Categories */}
          <section className="mb-12">
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                  activeCategory === "all" 
                    ? "bg-slate-900 text-white border-slate-900 shadow-lg" 
                    : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                }`}
              >
                All Prayers
              </button>
              {prayerCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                      activeCategory === cat.id 
                        ? "bg-white text-slate-900 border-slate-200 shadow-md" 
                        : "bg-white/50 text-slate-400 border-transparent hover:border-slate-200"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${activeCategory === cat.id ? "text-blue-500" : ""}`} />
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* Prayer Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPrayers.map((prayer) => (
                <div 
                  key={prayer.id}
                  className="group relative flex flex-col p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
                    <PlusCircle className="w-32 h-32 rotate-12" />
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-2">
                      {prayer.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button 
                      onClick={() => handleCopy(prayer.content, prayer.id)}
                      className="p-2.5 rounded-full bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-500 transition-colors"
                      title="Copy Prayer"
                    >
                      {copiedId === prayer.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">{prayer.title}</h3>
                  <p className="text-slate-600 leading-relaxed font-light mb-8 italic">
                    "{prayer.content}"
                  </p>

                  <div className="mt-auto pt-6 border-t border-slate-50">
                    <div className="flex items-start gap-3 p-4 rounded-2xl bg-blue-50/50 border border-blue-100/50">
                      <BookOpen className="w-4 h-4 text-blue-500 mt-1 shrink-0" />
                      <p className="text-xs font-semibold text-blue-700 leading-relaxed">
                        {prayer.verse}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Resources Section */}
          <section className="mt-24 grid lg:grid-cols-2 gap-8 items-stretch">
            <div className="p-10 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <Compass className="w-48 h-48" />
              </div>
              <div className="relative z-10 space-y-6">
                <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-widest">
                  Guided Support
                </span>
                <h2 className="text-3xl md:text-4xl font-bold">Submit a Prayer Request</h2>
                <p className="text-slate-300 font-light leading-relaxed max-w-md">
                  Our community and team would love to pray with you. Share your needs privately or publicly with our prayer warriors.
                </p>
                <Link to="/prayer-requests" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold hover:bg-blue-50 transition-all">
                  Open Prayer Wall <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="p-10 rounded-[3rem] border border-slate-200 bg-white relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 p-12 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
                <Anchor className="w-48 h-48" />
              </div>
              <div className="relative z-10 space-y-6">
                <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest">
                  Scriptural Anchor
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Peace & Anxiety Hub</h2>
                <p className="text-slate-500 font-light leading-relaxed max-w-md">
                  Explore a deep collection of verses specifically curated to bring peace to troubled hearts and calm anxious minds.
                </p>
                <Link to="/verses/peace-and-anxiety" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all">
                  Explore Verses <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* Daily Routine Section */}
          <section className="mt-24 text-center py-20 px-8 rounded-[4rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl shadow-blue-200/50">
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Cultivate a Life of Prayer</h2>
            <p className="text-lg text-white/80 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
              Join thousands of believers who start their day with our daily verses and prayer challenges. Build a habit that transforms your spiritual walk.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-3 px-8 py-4 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20">
                <div className="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center">
                  <Check className="w-5 h-5 text-emerald-900" />
                </div>
                <span className="font-bold uppercase tracking-widest text-xs">Daily Devotionals</span>
              </div>
              <div className="flex items-center gap-3 px-8 py-4 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20">
                <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center">
                  <PlusCircle className="w-5 h-5 text-amber-900" />
                </div>
                <span className="font-bold uppercase tracking-widest text-xs">New Prayers Weekly</span>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
