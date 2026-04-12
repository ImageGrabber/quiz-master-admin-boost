import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Layers, Swords, ListOrdered, Brain, Home, ChevronRight, Search, Quote, Sparkles, Compass, ShieldCheck, Users } from "lucide-react";
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

// Cinematic assets generated for the Exodus Hub
const EXODUS_IMAGES = {
  hero: "/images/hubs/exodus/hero.png",
  call: "/images/hubs/exodus/call.png",
  plagues: "/images/hubs/exodus/plagues.png",
  sinai: "/images/hubs/exodus/sinai.png",
  tabernacle: "/images/hubs/exodus/tabernacle.png",
};

export default function ExodusHub() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const chapterNumbers = Array.from({ length: 40 }, (_, i) => i + 1);
  const filteredChapters = useMemo(() => {
    if (!query.trim()) return chapterNumbers;
    const q = query.replace(/[^0-9]/g, "");
    if (!q) return chapterNumbers;
    const num = parseInt(q, 10);
    return chapterNumbers.filter((n) => n === num || String(n).startsWith(q));
  }, [query]);

  const pageSize = 4;
  const [chapterPage, setChapterPage] = useState(0);
  const totalChapterPages = Math.max(1, Math.ceil(filteredChapters.length / pageSize));
  useEffect(() => { setChapterPage(0); }, [query]);
  const startIdx = chapterPage * pageSize;
  const endIdx = Math.min(startIdx + pageSize, filteredChapters.length);
  const visibleChapters = filteredChapters.slice(startIdx, endIdx);

  // Detailed bullet points for chapters 1–8
  const chapterPoints: Record<number, string[]> = {
    1: [
      "Israel multiplies in Egypt",
      "New Pharaoh's oppression",
      "Midwives Shiphrah and Puah obey God",
    ],
    2: [
      "Birth and hiding of Moses",
      "Pharaoh's daughter finds Moses",
      "Moses flees to Midian; marries Zipporah",
    ],
    3: [
      "The Burning Bush at Horeb",
      "The Name of God: 'I AM WHO I AM'",
      "Moses commissioned to deliver Israel",
    ],
    4: [
      "Three signs for Moses (staff, hand, water)",
      "Aaron appointed as spokesman",
      "Return to Egypt; circumcision incident",
    ],
    5: [
      "First audience with Pharaoh",
      "Bricks without straw decree",
      "Israelite officers' complaint",
    ],
    6: [
      "God's promise of deliverance renewed",
      "Genealogy of Reuben, Simeon, and Levi",
      "Moses and Aaron's charge",
    ],
    7: [
      "Moses' staff becomes a serpent",
      "Plague 1: Nile turned to blood",
      "Egyptian magicians' imitation",
    ],
    8: [
      "Plague 2: Frogs cover the land",
      "Plague 3: Gnats (Dust to lice)",
      "Plague 4: Swarms of flies",
    ],
  };

  // Detailed bullet points for chapters 9–12
  const chapterPoints9to12: Record<number, string[]> = {
    9: [
      "Plague 5: Egyptian livestock die",
      "Plague 6: Boils on man and beast",
      "Plague 7: Thunder and hail",
    ],
    10: [
      "Plague 8: Locusts consume the land",
      "Plague 9: Three days of darkness",
      "Pharaoh's heart remains hardened",
    ],
    11: [
      "Final plague announced: death of firstborn",
      "Israelites ask for silver and gold",
      "Pharaoh refuses to let the people go",
    ],
    12: [
      "Passover instructions; the blood sign",
      "Feast of Unleavened Bread instituted",
      "Death of firstborn; the Exodus begins",
    ],
  };

  // Detailed bullet points for chapters 13–16
  const chapterPoints13to16: Record<number, string[]> = {
    13: [
      "Consecration of the firstborn",
      "God leads by pillars of cloud and fire",
      "Bones of Joseph carried out",
    ],
    14: [
      "Crossing of the Red Sea",
      "Egyptians pursue and are drowned",
      "Israel fears and trusts the Lord",
    ],
    15: [
      "The Song of Moses and Miriam",
      "Waters of Marah made sweet",
      "Arrival at Elim's springs and palms",
    ],
    16: [
      "Manna and quail provided in the desert",
      "Sabbath regulations for manna",
      "Pot of manna kept as a testimony",
    ],
  };

  // Detailed bullet points for chapters 17–24
  const chapterPoints17to24: Record<number, string[]> = {
    17: [
      "Water from the rock at Rephidim",
      "Victory over Amalek; Moses' hands held up",
      "The Lord is my Banner (Jehovah Nissi)",
    ],
    18: [
      "Jethro (Moses' father-in-law) visits",
      "Advice on delegating judgment",
      "Appointment of capable leaders",
    ],
    19: [
      "Arrival at Mount Sinai",
      "Consecration of the people",
      "God's descent in fire and cloud",
    ],
    20: [
      "The Ten Commandments given",
      "People's fear of the divine voice",
      "Altar laws: unhewn stones",
    ],
    21: [
      "Laws concerning Hebrew slaves",
      "Legislation on personal injuries",
      "Restitution and property rights",
    ],
    22: [
      "Laws on social responsibility",
      "Protection of widows and orphans",
      "Moral and religious regulations",
    ],
    23: [
      "Justice for all; Sabbath years/days",
      "Three annual feasts commanded",
      "Promise of the Angel's guidance",
    ],
    24: [
      "The Covenant confirmed with blood",
      "Moses and elders see God on the sapphire pavement",
      "Moses enters the cloud for forty days",
    ],
  };

  // Detailed bullet points for chapters 25–32
  const chapterPoints25to32: Record<number, string[]> = {
    25: [
      "Offering for the Tabernacle",
      "Ark of the Covenant design",
      "Table for the Bread and Lampstand",
    ],
    26: [
      "Curtains and frames of the Tabernacle",
      "The Veil and the Screen",
      "The Most Holy Place design",
    ],
    27: [
      "The Bronze Altar construction",
      "The Court of the Tabernacle",
      "Oil for the lamp regulations",
    ],
    28: [
      "Garments for the priesthood",
      "The Ephod and Breastpiece",
      "Urim and Thummim",
    ],
    29: [
      "Consecration of the priests",
      "Daily offerings on the altar",
      "God's promise to dwell among Israel",
    ],
    30: [
      "Altar of Incense and Ransom Money",
      "The Bronze Basin for washing",
      "Anointing Oil and Incense formulas",
    ],
    31: [
      "Bezalel and Oholiab called",
      "Sabbath as a sign",
      "Moses receives the two tablets",
    ],
    32: [
      "The Golden Calf rebellion",
      "Moses' intercession and anger",
      "The Levites' loyalty",
    ],
  };

  // Detailed bullet points for chapters 33–40
  const chapterPoints33to40: Record<number, string[]> = {
    33: [
      "The Command to leave Sinai",
      "The Tent of Meeting",
      "Moses sees God's glory",
    ],
    34: [
      "The New Tablets of Stone",
      "The Covenant renewed",
      "The radiant face of Moses",
    ],
    35: [
      "Sabbath laws and contributions",
      "The Tabernacle artisans begin",
      "Heart-stirred offerings from the people",
    ],
    36: [
      "Restraint of the offerings",
      "Curtains and boards constructed",
      "The Veil and Screen made",
    ],
    37: [
      "Making the Ark and Mercy Seat",
      "Making the Table and Lampstand",
      "Making the Altars and Anointing Oil",
    ],
    38: [
      "Making the Bronze Altar and Basin",
      "Construction of the Court",
      "Inventory of materials used",
    ],
    39: [
      "Making the Priestly garments",
      "Completion of the Tabernacle work",
      "Moses inspects and blesses the work",
    ],
    40: [
      "Setting up the Tabernacle",
      "Consecration of priests",
      "The Glory of the Lord fills the Tabernacle",
    ],
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-urbanist selection:bg-black/5">
      <SEO 
        title="Exodus Quiz Hub | Deliverance & The Law Study Guide"
        description="Master the second book of the Bible with our comprehensive Exodus study hub. From the burning bush to the glorious Tabernacle. Deep insights and interactive quizzes."
        url="/bible-questions-and-answers-hub/exodus"
      />
      <Navigation />

      {/* Modern Hero Section with Cinematic Background */}
      <section className="relative min-h-[68vh] sm:min-h-[75vh] lg:h-[75vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={EXODUS_IMAGES.hero} 
            alt="Exodus Red Sea Parting Cinematic" 
            className="w-full h-full object-cover brightness-[0.4] transition-transform duration-[20000ms] hover:scale-110"
          />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-light tracking-widest uppercase">The Book of Deliverance</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-9xl font-normal mb-8 leading-tight tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Exodus <span className="italic font-serif">Hub</span>
          </h1>
          <p className="text-base sm:text-xl md:text-2xl font-light text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            From the oppression of Egypt to the glory of the Tabernacle. A cinematic interactive portal to master the epic journey of Israel.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 px-5 sm:px-10 py-4 sm:py-8 text-sm sm:text-lg rounded-2xl font-light shadow-2xl transition-all active:scale-95" onClick={() => document.getElementById('difficulty')?.scrollIntoView({ behavior: 'smooth' })}>
              Begin Quiz Journey
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-black transition-all px-5 sm:px-10 py-4 sm:py-8 text-sm sm:text-lg rounded-2xl font-light active:scale-95" onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore Content
            </Button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent" />
      </section>

      <div className="w-full max-w-7xl mx-auto px-6 py-10">
        {/* Breadcrumb - Clean & Minimal */}
        <div className="flex items-center text-xs font-light text-gray-400 mb-20 px-2 tracking-widest uppercase">
          <button className="hover:text-black transition-colors" onClick={() => navigate("/")}>Home</button>
          <ChevronRight className="w-3 h-3 mx-4 opacity-30" />
          <button className="hover:text-black transition-colors" onClick={() => navigate("/bible-questions-and-answers-hub")}>Bible Hub</button>
          <ChevronRight className="w-3 h-3 mx-4 opacity-30" />
          <span className="text-black font-semibold">Exodus</span>
        </div>

        {/* Narrative Overview Segment: Intro */}
        <section id="overview" className="mb-40 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-gray-400 flex items-center">
                  <span className="w-12 h-px bg-gray-200 mr-6" />
                  The Call of Moses
                </h2>
                <h3 className="text-3xl sm:text-5xl md:text-6xl font-normal leading-tight text-gray-900">A Divine Revelation from the Burning Bush</h3>
              </div>
              <p className="text-2xl font-light text-gray-600 leading-[1.8] first-letter:text-6xl first-letter:font-serif first-letter:mr-4 first-letter:float-left first-letter:text-black first-letter:leading-none">
                Exodus, the book of 'departure,' chronicles one of the most significant events in human history: the liberation of Israel from Egyptian bondage. It begins with the cries of an oppressed people and leads to the mountain where God reveals His holy Name and His holy Law.
              </p>
              <div className="p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 flex items-start space-x-8 hover:shadow-xl transition-all duration-500">
                <Quote className="w-12 h-12 text-gray-200 flex-shrink-0" />
                <div className="space-y-4">
                  <p className="text-xl italic font-light text-gray-500 leading-relaxed">
                    "I have surely seen the affliction of My people... and have heard their cry."
                  </p>
                  <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">— Exodus 3:7</p>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-6 bg-gray-50 rounded-[3rem] -rotate-1 group-hover:rotate-0 transition-transform duration-700" />
              <img 
                src={EXODUS_IMAGES.call} 
                alt="Moses and the Burning Bush" 
                className="relative z-10 w-full rounded-[2.5rem] shadow-2xl object-cover h-[600px] border border-white"
              />
              <div className="absolute -bottom-10 -left-10 z-20 p-10 bg-white/90 backdrop-blur-2xl rounded-3xl border border-gray-100 shadow-2xl max-w-xs transition-transform group-hover:translate-x-4">
                <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center mb-6">
                  <Compass className="w-6 h-6 text-white" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Key Pillar</p>
                <p className="text-xl font-light text-gray-900 leading-snug tracking-tight italic">God's Personal Name & The Commission of a Leader</p>
              </div>
            </div>
          </div>
        </section>

        {/* Theological Insight Section - High End Dark Mode Card */}
        <section className="mb-24 sm:mb-40 py-14 sm:py-24 bg-gray-900 rounded-[2rem] sm:rounded-[4rem] text-white px-5 sm:px-10 lg:px-20 overflow-hidden relative shadow-2xl shadow-gray-900/40">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/10 blur-[150px] rounded-full translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-1/3 h-full bg-orange-500/5 blur-[120px] rounded-full -translate-x-1/2" />
          
          <div className="relative z-10">
            <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-white/30 mb-16">Theological Significance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
              <div className="space-y-10 group">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                  <Layers className="w-8 h-8 text-blue-400" strokeWidth={1} />
                </div>
                <div className="space-y-6">
                  <h3 className="text-4xl font-normal leading-tight italic serif">Redemption by Blood</h3>
                  <p className="text-xl font-light text-white/50 leading-relaxed">
                    The Passover in Exodus 12 introduces the central theme of 'Redemption by Blood.' This lamb points directly to Jesus Christ, the 'Lamb of God' who takes away the sin of the world, through whose blood we find true exodus from the power of death.
                  </p>
                </div>
              </div>
              <div className="space-y-10 group">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                  <ShieldCheck className="w-8 h-8 text-orange-400" strokeWidth={1} />
                </div>
                <div className="space-y-6">
                  <h3 className="text-4xl font-normal leading-tight italic serif">The Holiness of God's Law</h3>
                  <p className="text-xl font-light text-white/50 leading-relaxed">
                    From the lightning of Sinai, God reveals His perfect moral character through the Ten Commandments. The Law serves as a tutor, showing us our need for a Savior while defining the lifestyle of a redeemed community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Challenge/Difficulty Section - Preserving Existing Functionality with Better UI */}
        <section id="difficulty" className="mb-40 scroll-mt-24">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal text-gray-900 mb-6 italic serif">Master Exodus</h2>
            <p className="text-2xl font-light text-gray-400 max-w-3xl mx-auto leading-relaxed">Choose your study depth and test your grasp of the second book of the Bible.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { 
                level: "Beginner", 
                desc: "Focus on iconic stories: Plagues, Passover, and the Red Sea.", 
                icon: BookOpen, 
                color: "bg-green-50", 
                iconColor: "text-green-600",
                link: "beginner",
                accent: "bg-green-500",
                features: ["Visual storytelling", "Major events", "Essential characters"]
              },
              { 
                level: "Intermediate", 
                desc: "Deep dive into wilderness laws, Sinai, and Jethro's advice.", 
                icon: Brain, 
                color: "bg-yellow-50", 
                iconColor: "text-yellow-600",
                link: "intermediate",
                accent: "bg-yellow-500",
                features: ["Wilderness journey", "Sinai commandments", "Social laws"]
              },
              { 
                level: "Advanced", 
                desc: "Master Tabernacle dimensions, rituals, and theological depths.", 
                icon: Swords, 
                color: "bg-red-50", 
                iconColor: "text-red-600",
                link: "advanced",
                accent: "bg-red-500",
                features: ["Tabernacle specifics", "Hebrew terms", "Theological parallels"]
              }
            ].map((d) => (
              <Card 
                key={d.level} 
                className="group relative border border-gray-100/60 hover:border-black/5 hover:-translate-y-2 transition-all duration-500 flex flex-col bg-white overflow-hidden shadow-2xl shadow-gray-200/40 cursor-pointer rounded-[2.5rem]" 
                onClick={() => navigate(`/bible-questions-and-answers-hub/exodus/${d.link}`)}
              > 
                <div className={`h-2 w-full ${d.accent} absolute top-0`} />
                <CardHeader className="pt-12 pb-8 px-10">
                  <div className={`w-16 h-16 rounded-2xl ${d.color} flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-500`}>
                    <d.icon className={`w-8 h-8 ${d.iconColor}`} strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-4xl font-normal text-gray-900 italic serif mb-3">{d.level}</CardTitle>
                  <CardDescription className="text-sm font-semibold text-gray-400 uppercase tracking-[0.25em]">Exodus Study Track</CardDescription>
                </CardHeader>
                <CardContent className="px-10 pb-12 flex-grow flex flex-col justify-between">
                  <p className="text-xl font-light text-gray-500 leading-relaxed mb-10">{d.desc}</p>
                  <ul className="space-y-4 mb-10">
                    {d.features.map(f => (
                      <li key={f} className="flex items-center text-sm font-light text-gray-400">
                        <div className={`w-1.5 h-1.5 rounded-full ${d.accent} mr-3 opacity-50`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full font-light bg-black text-white hover:bg-gray-800 rounded-2xl py-8 tracking-[0.2em] uppercase text-xs transition-all shadow-xl shadow-black/10">Start Challenge</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Narrative Flow: Judgment & Mercy */}
        <section className="mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1 relative group">
              <div className="absolute -inset-6 bg-orange-50 rounded-[3rem] rotate-1 group-hover:rotate-0 transition-transform duration-700" />
              <img 
                src={EXODUS_IMAGES.plagues} 
                alt="The Plagues over Egypt" 
                className="relative z-10 w-full rounded-[2.5rem] shadow-2xl object-cover h-[700px] border border-white"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-10">
              <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-gray-400 flex items-center">
                <span className="w-12 h-px bg-gray-200 mr-6" />
                Judgment & Deliverance
              </h2>
              <h3 className="text-5xl font-normal leading-tight text-gray-900 italic serif">The Path to Freedom Through Miracles</h3>
              <p className="text-2xl font-light text-gray-600 leading-[1.8]">
                Through ten powerful plagues, God demonstrated His sovereignty over the gods of Egypt. From the Nile turned to blood to the darkness that could be felt, each judgment was a direct challenge to Pharaoh's authority, leading to the ultimate deliverance of God's people.
              </p>
              <div className="flex items-center space-x-6 p-10 bg-orange-50/40 rounded-[2.5rem] border border-orange-100/50 hover:bg-orange-50 transition-colors">
                <div className="w-16 h-16 bg-orange-100 rounded-3xl flex items-center justify-center shrink-0 shadow-lg shadow-orange-200/50">
                  <Quote className="w-7 h-7 text-orange-600" />
                </div>
                <div className="space-y-2">
                  <p className="text-gray-700 text-xl font-light italic leading-relaxed">"Who is like You, O Lord, among the gods?"</p>
                  <p className="text-xs font-semibold tracking-widest text-orange-400 uppercase">— Exodus 15:11</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specialized Hubs Section */}
        <section className="mb-40 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-gray-400 mb-8">Specialized Hubs</h2>
              <h3 className="text-3xl sm:text-5xl md:text-7xl font-normal text-gray-900 mb-8 italic serif">Targeted Training</h3>
              <p className="text-2xl font-light text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Specific training tools for targeted memorization and logic.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { 
                  title: "Fill in the Blanks", 
                  desc: "Scripture memorization", 
                  icon: Quote, 
                  link: "fill-in-the-blanks",
                  color: "bg-amber-50",
                  iconColor: "text-amber-600"
                },
                { 
                  title: "True or False", 
                  desc: "Rapid logic testing", 
                  icon: ShieldCheck, 
                  link: "true-false",
                  color: "bg-blue-50",
                  iconColor: "text-blue-600"
                },
                { 
                  title: "Characters", 
                  desc: "Moses, Aaron, Miriam", 
                  icon: Users, 
                  link: "characters",
                  color: "bg-emerald-50",
                  iconColor: "text-emerald-600"
                },
                { 
                  title: "Timeline Match", 
                  desc: "The Plagues & Journey", 
                  icon: ListOrdered, 
                  link: "match-the-following",
                  color: "bg-indigo-50",
                  iconColor: "text-indigo-600"
                }
              ].map((tool) => (
                <Card 
                  key={tool.title}
                  className="group hover:scale-105 hover:shadow-2xl transition-all duration-500 cursor-pointer border-none bg-white rounded-[2rem] overflow-hidden"
                  onClick={() => navigate(`/bible-questions-and-answers-hub/exodus/${tool.link}`)}
                >
                  <CardHeader className="pt-12 pb-8 px-8">
                    <div className={`w-14 h-14 rounded-2xl ${tool.color} flex items-center justify-center mb-8`}>
                      <tool.icon className={`w-7 h-7 ${tool.iconColor}`} strokeWidth={1.5} />
                    </div>
                    <CardTitle className="text-2xl font-normal text-gray-900 italic serif mb-2">{tool.title}</CardTitle>
                    <CardDescription className="text-sm font-light text-gray-500 leading-relaxed">
                      {tool.desc}
                    </CardDescription>
                  </CardHeader>
                  <div className="px-8 pb-8">
                    <div className="h-1 w-full bg-gray-50 rounded-full overflow-hidden">
                      <div className={`h-full w-0 group-hover:w-full transition-all duration-700 bg-black/10`} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Integrated Search & Chapter Wisdom */}
        <section id="exodus-chapter-wise" className="mb-40 scroll-mt-24 pt-32 border-t border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal text-gray-900 mb-6 italic serif">The Chapter Library</h2>
              <p className="text-2xl font-light text-gray-400 leading-relaxed">Each of the 40 chapters contains unique study materials, summaries, and specialized quizzes.</p>
            </div>
            {/* Search Bar - Modern & Large */}
            <div className="w-full lg:w-[450px]">
              <div className="relative group">
                <div className="absolute inset-x-0 bottom-0 h-1 bg-black/0 group-focus-within:bg-black/10 transition-colors" />
                <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-300 w-6 h-6" strokeWidth={1} />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Chapter # or keyword (e.g. '12' or 'Manna')..."
                  className="pl-20 pr-10 py-10 text-xl font-light border-0 bg-gray-50/50 focus:bg-white focus:ring-0 rounded-[2rem] shadow-inner transition-all duration-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {visibleChapters.map((ch) => {
              let currentChapterPoints = null;
              if (ch >= 1 && ch <= 8) currentChapterPoints = chapterPoints[ch];
              else if (ch >= 9 && ch <= 12) currentChapterPoints = chapterPoints9to12[ch];
              else if (ch >= 13 && ch <= 16) currentChapterPoints = chapterPoints13to16[ch];
              else if (ch >= 17 && ch <= 24) currentChapterPoints = chapterPoints17to24[ch];
              else if (ch >= 25 && ch <= 32) currentChapterPoints = chapterPoints25to32[ch];
              else if (ch >= 33 && ch <= 40) currentChapterPoints = chapterPoints33to40[ch];

              return (
                <Card 
                  key={ch} 
                  className="group relative border border-gray-100 hover:border-black/5 hover:translate-y-[-8px] transition-all duration-500 flex flex-col h-full cursor-pointer bg-white shadow-xl shadow-gray-200/20 rounded-[2.5rem] overflow-hidden p-2" 
                  onClick={() => navigate(`/bible-questions-and-answers-hub/exodus/chapter-${ch}`)}
                >
                  <CardHeader className="p-10 pb-6">
                    <div className="flex items-center justify-between mb-8">
                      <div className="text-sm font-bold text-gray-300 tracking-[0.2em] group-hover:text-black transition-colors">CHAPTER {ch}</div>
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-normal text-gray-900 mb-6 italic serif line-clamp-1">Narrative Summary</CardTitle>
                    <div className="space-y-4">
                      {currentChapterPoints?.map((pt, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-200 mt-2 shrink-0 group-hover:bg-black transition-colors" />
                          <p className="text-sm font-light text-gray-500 leading-relaxed group-hover:text-gray-900 transition-colors">{pt}</p>
                        </div>
                      ))}
                    </div>
                  </CardHeader>
                  <div className="mt-auto p-10 pt-0">
                    <Button variant="ghost" className="w-full justify-start px-0 text-xs font-semibold tracking-widest text-gray-400 uppercase group-hover:text-black hover:bg-transparent">
                      Explore Chapter
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Chapters Pagination */}
          {totalChapterPages > 1 && (
            <div className="mt-32 flex items-center justify-between border-t border-gray-100 pt-12">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em]">
                Page {chapterPage + 1} of {totalChapterPages}
              </div>
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-2xl px-8 font-light tracking-widest uppercase text-xs"
                  disabled={chapterPage === 0} 
                  onClick={() => setChapterPage(p => p - 1)}
                >
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-2xl px-8 font-light tracking-widest uppercase text-xs"
                  disabled={chapterPage >= totalChapterPages - 1} 
                  onClick={() => setChapterPage(p => p + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
}
