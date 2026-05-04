import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, CheckCircle2, Flame, ShieldCheck, Zap, Trophy } from "lucide-react";
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const featuredLinks = [
  { label: "Genesis Quiz", href: "/public-quiz/genesis", color: "bg-blue-50 border-blue-100 text-blue-700" },
  { label: "Exodus Quiz", href: "/public-quiz/exodus", color: "bg-indigo-50 border-indigo-100 text-indigo-700" },
  { label: "Psalms Quiz", href: "/public-quiz/psalms", color: "bg-purple-50 border-purple-100 text-purple-700" },
  { label: "Matthew Quiz", href: "/public-quiz/matthew", color: "bg-rose-50 border-rose-100 text-rose-700" },
  { label: "John Quiz", href: "/public-quiz/john", color: "bg-emerald-50 border-emerald-100 text-emerald-700" },
  { label: "Romans Quiz", href: "/public-quiz/romans", color: "bg-amber-50 border-amber-100 text-amber-700" },
];

const practiceTracks = [
  {
    title: "Beginner Track",
    description: "Start with simpler question patterns and build confidence with repeatable rounds.",
    icon: BookOpen,
    accent: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Competition Track",
    description: "Train with chapter-aware questions designed for speed and accuracy under pressure.",
    icon: Trophy,
    accent: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    title: "Daily Streak Track",
    description: "Keep momentum with one Old Testament, one New Testament, and one revision round daily.",
    icon: Flame,
    accent: "text-rose-600",
    bg: "bg-rose-50",
  },
];

const faqItems = [
  {
    q: "Are these Bible quiz questions suitable for preparation?",
    a: "Yes. The public quiz section is built for competition-focused study with chapter-aware questions, answer options, and explanations.",
  },
  {
    q: "Can beginners use these Bible trivia quizzes?",
    a: "Absolutely. You can start with easier books and practice frequently. The format is friendly for both beginners and teams.",
  },
  {
    q: "Do public quizzes cover both Testaments?",
    a: "Yes. You can practice across all major Bible sections including Pentateuch, History, Psalms, Prophets, and Gospels.",
  },
];

const oldTestamentBookLinks = [
  { label: "Genesis Quiz", href: "/public-quiz/genesis" },
  { label: "Exodus Quiz", href: "/public-quiz/exodus" },
  { label: "Leviticus Quiz", href: "/public-quiz/leviticus" },
  { label: "Numbers Quiz", href: "/public-quiz/numbers" },
  { label: "Deuteronomy Quiz", href: "/public-quiz/deuteronomy" },
  { label: "Joshua Quiz", href: "/public-quiz/joshua" },
  { label: "Judges Quiz", href: "/public-quiz/judges" },
  { label: "Ruth Quiz", href: "/public-quiz/ruth" },
  { label: "1 Samuel Quiz", href: "/public-quiz/1-samuel" },
  { label: "2 Samuel Quiz", href: "/public-quiz/2-samuel" },
  { label: "1 Kings Quiz", href: "/public-quiz/1-kings" },
  { label: "2 Kings Quiz", href: "/public-quiz/2-kings" },
  { label: "1 Chronicles Quiz", href: "/public-quiz/1-chronicles" },
  { label: "2 Chronicles Quiz", href: "/public-quiz/2-chronicles" },
  { label: "Ezra Quiz", href: "/public-quiz/ezra" },
  { label: "Nehemiah Quiz", href: "/public-quiz/nehemiah" },
  { label: "Esther Quiz", href: "/public-quiz/esther" },
  { label: "Job Quiz", href: "/public-quiz/job" },
  { label: "Psalms Quiz", href: "/public-quiz/psalms" },
  { label: "Proverbs Quiz", href: "/public-quiz/proverbs" },
  { label: "Ecclesiastes Quiz", href: "/public-quiz/ecclesiastes" },
  { label: "Song of Solomon Quiz", href: "/public-quiz/song-of-solomon" },
  { label: "Isaiah Quiz", href: "/public-quiz/isaiah" },
  { label: "Jeremiah Quiz", href: "/public-quiz/jeremiah" },
  { label: "Lamentations Quiz", href: "/public-quiz/lamentations" },
  { label: "Ezekiel Quiz", href: "/public-quiz/ezekiel" },
  { label: "Daniel Quiz", href: "/public-quiz/daniel" },
  { label: "Hosea Quiz", href: "/public-quiz/hosea" },
  { label: "Joel Quiz", href: "/public-quiz/joel" },
  { label: "Amos Quiz", href: "/public-quiz/amos" },
  { label: "Obadiah Quiz", href: "/public-quiz/obadiah" },
  { label: "Jonah Quiz", href: "/public-quiz/jonah" },
  { label: "Micah Quiz", href: "/public-quiz/micah" },
  { label: "Nahum Quiz", href: "/public-quiz/nahum" },
  { label: "Habakkuk Quiz", href: "/public-quiz/habakkuk" },
  { label: "Zephaniah Quiz", href: "/public-quiz/zephaniah" },
  { label: "Haggai Quiz", href: "/public-quiz/haggai" },
  { label: "Zechariah Quiz", href: "/public-quiz/zechariah" },
  { label: "Malachi Quiz", href: "/public-quiz/malachi" },
];

const newTestamentBookLinks = [
  { label: "Matthew Quiz", href: "/public-quiz/matthew" },
  { label: "Mark Quiz", href: "/public-quiz/mark" },
  { label: "Luke Quiz", href: "/public-quiz/luke" },
  { label: "John Quiz", href: "/public-quiz/john" },
  { label: "Acts Quiz", href: "/public-quiz/acts" },
  { label: "Romans Quiz", href: "/public-quiz/romans" },
  { label: "1 Corinthians Quiz", href: "/public-quiz/1-corinthians" },
  { label: "2 Corinthians Quiz", href: "/public-quiz/2-corinthians" },
  { label: "Galatians Quiz", href: "/public-quiz/galatians" },
  { label: "Ephesians Quiz", href: "/public-quiz/ephesians" },
  { label: "Philippians Quiz", href: "/public-quiz/philippians" },
  { label: "Colossians Quiz", href: "/public-quiz/colossians" },
  { label: "1 Thessalonians Quiz", href: "/public-quiz/1-thessalonians" },
  { label: "2 Thessalonians Quiz", href: "/public-quiz/2-thessalonians" },
  { label: "1 Timothy Quiz", href: "/public-quiz/1-timothy" },
  { label: "2 Timothy Quiz", href: "/public-quiz/2-timothy" },
  { label: "Titus Quiz", href: "/public-quiz/titus" },
  { label: "Philemon Quiz", href: "/public-quiz/philemon" },
  { label: "Hebrews Quiz", href: "/public-quiz/hebrews" },
  { label: "James Quiz", href: "/public-quiz/james" },
  { label: "1 Peter Quiz", href: "/public-quiz/1-peter" },
  { label: "2 Peter Quiz", href: "/public-quiz/2-peter" },
  { label: "1 John Quiz", href: "/public-quiz/1-john" },
  { label: "2 John Quiz", href: "/public-quiz/2-john" },
  { label: "3 John Quiz", href: "/public-quiz/3-john" },
  { label: "Jude Quiz", href: "/public-quiz/jude" },
  { label: "Revelation Quiz", href: "/public-quiz/revelation" },
];

export default function PublicQuizLanding() {
  const siteUrl = "https://biblequizcompetition.com";
  const allBookLinks = [...oldTestamentBookLinks, ...newTestamentBookLinks];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Public Bible Quiz - Free Bible Quiz Questions and Answers",
        url: `${siteUrl}/public-quiz`,
        description:
          "Practice free public Bible quiz questions and answers for Bible quiz competition 2026. Explore chapter quizzes, Bible trivia, and study-friendly explanations.",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Public Quiz", item: `${siteUrl}/public-quiz` },
        ],
      },
      {
        "@type": "ItemList",
        name: "Bible Public Quiz Books",
        itemListElement: allBookLinks.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          url: `${siteUrl}${item.href}`,
        })),
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
  };

  const renderBookLinks = (links: { label: string; href: string }[]) => (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {links.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className="group relative flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:scale-[1.01] hover:shadow-md"
        >
          <span className="text-base font-extrabold text-slate-800">{item.label}</span>
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRight className="h-4 w-4 text-slate-700" />
          </div>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFF] font-urbanist selection:bg-blue-100 selection:text-blue-900">
      <SEO
        title="Public Bible Quiz 2026 | All 66 Books Free Questions and Answers"
        description="Practice all 66 books with free public Bible quiz questions and answers for Bible Quiz Competition 2026. Explore Old Testament and New Testament chapter quiz practice."
        keywords="public bible quiz, all bible books quiz, old testament quiz, new testament quiz, bible quiz competition 2026, bible quiz questions and answers, chapter wise bible quiz"
        url="/public-quiz"
        structuredData={structuredData}
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
                <span>Bible Quiz Competition 2026</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                Public Bible Quizzes for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">All 66 Books</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                Practice chapter-focused quizzes to improve recall speed, biblical understanding, and competition confidence.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <a href="#all-books" className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center gap-2">
                  Explore All Books <ArrowRight className="h-4 w-4" />
                </a>
                <div className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white border border-slate-200 text-slate-700 font-semibold shadow-sm">
                  <ShieldCheck className="h-5 w-5 text-emerald-500" />
                  <span>Free Public Access</span>
                </div>
              </div>
            </div>
            <div />
          </section>

          <section id="quizzes" className="mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Popular Bible Quizzes</h2>
            <p className="text-slate-600 mb-8">Start with top picks, then continue to all 66 books below.</p>
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

          <section id="all-books" className="mb-20 rounded-[2.5rem] bg-white border border-slate-100 p-6 md:p-10 shadow-sm">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">All Bible Book Quiz Pages</h2>
            <p className="mt-3 text-slate-600 mb-8">Complete internal-link hub for Old and New Testament pages.</p>
            <div className="space-y-10">
              <div>
                <h3 className="text-xl font-black text-slate-900 mb-4">Old Testament Books</h3>
                {renderBookLinks(oldTestamentBookLinks)}
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 mb-4">New Testament Books</h3>
                {renderBookLinks(newTestamentBookLinks)}
              </div>
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Choose Your Practice Track</h2>
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
            <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">Why This Public Quiz Hub Works</h2>
            <div className="space-y-5">
              {[
                "Improve both recall and understanding, not just memorization.",
                "Targeted rounds help you focus on specific books and chapters.",
                "Daily routines build long-term retention.",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 text-emerald-400" />
                  <p className="text-slate-200">{point}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">FAQ: Public Bible Quiz</h2>
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
