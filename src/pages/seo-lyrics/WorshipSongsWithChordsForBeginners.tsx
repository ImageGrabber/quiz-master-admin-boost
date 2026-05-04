import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, CheckCircle2, Flame, ShieldCheck, Zap, Trophy } from "lucide-react";
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const featuredLinks = [
  { label: "Beginner Guitar Worship Hub", href: "/easy-worship-songs-for-beginners-guitar", color: "bg-blue-50 border-blue-100 text-blue-700" },
  { label: "Christian Worship Chords", href: "/christian-worship-songs-chords", color: "bg-indigo-50 border-indigo-100 text-indigo-700" },
  { label: "Hindi Lyrics + Chords", href: "/hindi-christian-songs-lyrics-chords", color: "bg-purple-50 border-purple-100 text-purple-700" },
  { label: "English Songs", href: "/english-songs", color: "bg-rose-50 border-rose-100 text-rose-700" },
  { label: "Hindi Songs", href: "/hindi-songs", color: "bg-emerald-50 border-emerald-100 text-emerald-700" },
  { label: "Malayalam Songs", href: "/malayalam-songs", color: "bg-amber-50 border-amber-100 text-amber-700" },
];

const practiceTracks = [
  {
    title: "Chord Basics",
    description: "Master foundational worship chords and clean transitions.",
    icon: BookOpen,
    accent: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Rhythm Practice",
    description: "Use consistent strumming patterns for smooth congregational flow.",
    icon: Trophy,
    accent: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    title: "Set Building",
    description: "Create simple beginner worship sets with confidence.",
    icon: Flame,
    accent: "text-rose-600",
    bg: "bg-rose-50",
  },
];

const faqItems = [
  {
    q: "What are easy worship songs with chords for beginners?",
    a: "Begin with songs that use common chords like G, C, D, Em, and Am. These are easiest for most new guitar players.",
  },
  {
    q: "Can youth worship teams use this page?",
    a: "Yes. This page is intended for beginner-friendly church and youth worship preparation.",
  },
  {
    q: "How often should beginners practice?",
    a: "Daily 15-30 minute practice with repeated chord transitions and one full song is ideal.",
  },
];

export default function WorshipSongsWithChordsForBeginners() {
  const siteUrl = "https://biblequizcompetition.com";

  return (
    <div className="min-h-screen bg-[#FDFDFF] font-urbanist selection:bg-blue-100 selection:text-blue-900">
      <SEO
        title="Worship Songs with Chords for Beginners | Easy Christian Guitar Guide"
        description="Practice worship songs with chords for beginners using easy Christian guitar progressions, rhythm guidance, and simple worship set planning."
        keywords="worship songs with chords for beginners, easy christian guitar worship songs, beginner worship chords"
        url="/worship-songs-with-chords-for-beginners"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              name: "Worship Songs with Chords for Beginners",
              url: `${siteUrl}/worship-songs-with-chords-for-beginners`,
              description: "Beginner worship chord and song planning hub for church guitar practice.",
            },
            {
              "@type": "FAQPage",
              mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            },
          ],
        }}
      />
      <Navigation />

      <main className="relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-50/50 to-transparent -z-10" />
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-[20%] left-[-5%] w-[400px] h-[400px] bg-indigo-100/20 rounded-full blur-3xl -z-10" />

        <div className="mx-auto max-w-7xl px-4 pb-24 pt-12 md:px-8">
          <section className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="flex flex-col space-y-6 animate-in fade-in slide-in-from-left duration-1000">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider w-fit">
                <Zap className="h-3.5 w-3.5" />
                <span>Beginner Worship Guitar</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                Worship Songs with Chords for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Beginners</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                Learn easy Christian worship guitar with beginner-friendly chords, practical rhythm guidance, and simple set-building direction.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <a href="#popular" className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center gap-2">
                  Explore Beginner Resources <ArrowRight className="h-4 w-4" />
                </a>
                <div className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white border border-slate-200 text-slate-700 font-semibold shadow-sm">
                  <ShieldCheck className="h-5 w-5 text-emerald-500" />
                  <span>Church Team Friendly</span>
                </div>
              </div>
            </div>
            <div />
          </section>

          <section id="popular" className="mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Popular Beginner Worship Links</h2>
            <p className="text-slate-600 mb-8">Start with easy hubs, then expand into language-specific song libraries.</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredLinks.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`group relative flex items-center justify-between p-6 rounded-3xl border transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${item.color} shadow-sm hover:shadow-md`}
                >
                  <span className="text-lg font-black">{item.label}</span>
                  <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Beginner Learning Tracks</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {practiceTracks.map((track) => {
                const Icon = track.icon;
                return (
                  <div key={track.title} className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm">
                    <div className={`inline-flex rounded-2xl ${track.bg} p-4 ${track.accent} mb-6`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-3">{track.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm">{track.description}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="relative rounded-[3rem] bg-slate-900 p-8 md:p-16 text-white overflow-hidden mb-16 shadow-2xl shadow-slate-900/20">
            <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">Why This Beginner Page Works</h2>
            <div className="space-y-5">
              {[
                "Starts from low-friction beginner chord pathways.",
                "Connects progression learning with actual worship song pages.",
                "Reduces overwhelm for youth and first-time worship guitarists.",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 text-emerald-400" />
                  <p className="text-slate-200">{point}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">FAQ</h2>
            <div className="grid gap-4 max-w-4xl">
              {faqItems.map((item) => (
                <div key={item.q} className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-black text-slate-900 mb-3">{item.q}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
