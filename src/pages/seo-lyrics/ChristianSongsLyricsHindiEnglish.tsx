import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, CheckCircle2, Flame, ShieldCheck, Zap, Trophy } from "lucide-react";
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const featuredLinks = [
  { label: "Hindi Songs", href: "/hindi-songs", color: "bg-blue-50 border-blue-100 text-blue-700" },
  { label: "English Songs", href: "/english-songs", color: "bg-indigo-50 border-indigo-100 text-indigo-700" },
  { label: "Malayalam Songs", href: "/malayalam-songs", color: "bg-purple-50 border-purple-100 text-purple-700" },
  { label: "Hindi Lyrics + Chords", href: "/hindi-christian-songs-lyrics-chords", color: "bg-rose-50 border-rose-100 text-rose-700" },
  { label: "Worship Chords Hub", href: "/christian-worship-songs-chords", color: "bg-emerald-50 border-emerald-100 text-emerald-700" },
  { label: "Beginner Guitar Songs", href: "/easy-worship-songs-for-beginners-guitar", color: "bg-amber-50 border-amber-100 text-amber-700" },
];

const practiceTracks = [
  {
    title: "Hindi Worship",
    description: "Use familiar Hindi lyric pages for congregation and fellowship singing.",
    icon: BookOpen,
    accent: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "English Worship",
    description: "Add globally known hymns and contemporary songs for mixed-language teams.",
    icon: Trophy,
    accent: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    title: "Blended Sets",
    description: "Build bilingual worship sets that transition smoothly across languages.",
    icon: Flame,
    accent: "text-rose-600",
    bg: "bg-rose-50",
  },
];

const faqItems = [
  {
    q: "Where can I find Christian songs lyrics in Hindi and English?",
    a: "This page links directly to Hindi and English song libraries so worship teams can prepare bilingual sets faster.",
  },
  {
    q: "Is this useful for bilingual church services?",
    a: "Yes. It is designed for churches, youth fellowships, and prayer meetings that mix Hindi and English songs.",
  },
  {
    q: "Can beginners use this page too?",
    a: "Absolutely. Beginners can start with language-specific song pages and then move to chord resources.",
  },
];

export default function ChristianSongsLyricsHindiEnglish() {
  const siteUrl = "https://biblequizcompetition.com";

  return (
    <div className="min-h-screen bg-[#FDFDFF] font-urbanist selection:bg-blue-100 selection:text-blue-900">
      <SEO
        title="Christian Songs Lyrics in Hindi and English | Bilingual Worship Hub"
        description="Explore Christian songs lyrics in Hindi and English for church worship, youth fellowship, and prayer meetings. Build better bilingual worship sets."
        keywords="christian songs lyrics hindi and english, bilingual worship songs lyrics, hindi english christian songs"
        url="/christian-songs-lyrics-hindi-english"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              name: "Christian Songs Lyrics in Hindi and English",
              url: `${siteUrl}/christian-songs-lyrics-hindi-english`,
              description: "Bilingual Christian song lyrics hub connecting Hindi and English worship resources.",
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
                <span>Bilingual Worship Resource</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                Christian Songs Lyrics in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Hindi and English</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                Build language-balanced worship sessions for church, fellowship, and youth ministry with quick access to Hindi and English lyric pages.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <a href="#popular" className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center gap-2">
                  Explore Song Libraries <ArrowRight className="h-4 w-4" />
                </a>
                <div className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white border border-slate-200 text-slate-700 font-semibold shadow-sm">
                  <ShieldCheck className="h-5 w-5 text-emerald-500" />
                  <span>Hindi + English Friendly</span>
                </div>
              </div>
            </div>
            <div />
          </section>

          <section id="popular" className="mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Popular Song Resource Links</h2>
            <p className="text-slate-600 mb-8">Start from language libraries and move to chords and beginner practice hubs.</p>
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
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Language Planning Tracks</h2>
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
            <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">Why This Bilingual Hub Matters</h2>
            <div className="space-y-5">
              {[
                "Reduces set-planning time for multi-language worship services.",
                "Improves participation by matching song language to audience comfort.",
                "Connects lyric-first pages with beginner chord resources.",
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
