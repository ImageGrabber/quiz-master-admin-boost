import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const featuredLinks = [
  { label: "Genesis Quiz", href: "/public-quiz/genesis" },
  { label: "Exodus Quiz", href: "/public-quiz/exodus" },
  { label: "Psalms Quiz", href: "/public-quiz/psalms" },
  { label: "Matthew Quiz", href: "/public-quiz/matthew" },
  { label: "John Quiz", href: "/public-quiz/john" },
  { label: "Romans Quiz", href: "/public-quiz/romans" },
];

const faqItems = [
  {
    q: "Are these Bible quiz questions suitable for Bible quiz competition 2026 preparation?",
    a: "Yes. The public quiz section is built for competition-focused study with chapter-aware questions, answer options, and explanations that help you review quickly.",
  },
  {
    q: "Can beginners use these Bible trivia quizzes?",
    a: "Absolutely. You can start with easier books and practice frequently. The format is friendly for both beginners and experienced church quiz teams.",
  },
  {
    q: "Do public quizzes cover both Old Testament and New Testament books?",
    a: "Yes. You can practice across major Bible sections including Pentateuch, Historical books, Psalms and Wisdom books, Prophets, Gospels, and Epistles.",
  },
];

export default function PublicQuizLanding() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Public Bible Quiz - Free Bible Quiz Questions and Answers",
    url: "https://biblequizcompetition.com/public-quiz",
    description:
      "Practice free public Bible quiz questions and answers for Bible quiz competition 2026. Explore chapter quizzes, Bible trivia, and study-friendly explanations.",
    mainEntity: {
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO
        title="Public Bible Quiz 2026 | Free Bible Quiz Questions and Answers"
        description="Public Bible quiz page with free Bible quiz questions and answers for Bible quiz competition 2026. Practice chapter quizzes, Bible trivia, and study-ready explanations."
        keywords="public bible quiz, bible quiz competition 2026, bible quiz questions and answers, free bible quiz, bible trivia questions, chapter wise bible quiz, christian quiz competition"
        url="/public-quiz"
        structuredData={structuredData}
      />

      <main className="mx-auto max-w-6xl px-4 py-12 md:px-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">
            Bible Quiz Competition 2026
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            Public Bible Quiz Questions and Answers for Serious Competition Practice
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-700">
            Welcome to the public quiz library for Bible Quiz Competition 2026. This page is designed for students,
            youth teams, Sunday school learners, Bible study groups, and church quiz coordinators who want reliable,
            chapter-focused practice with clear answer explanations. If your goal is to improve speed, accuracy, and
            confidence in real quiz rounds, this public Bible quiz section gives you a strong daily practice path.
            Instead of random trivia alone, these quizzes are organized to help you build memory of key passages,
            people, events, and themes across both the Old Testament and New Testament.
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-700">
            Many users searching for “bible quiz questions and answers,” “free bible quiz,” and “bible quiz
            competition 2026” are looking for practice that is both accessible and structured. That is exactly what
            this hub offers. You can open a book quiz directly, work through chapter-level quizzes, and repeat sections
            as many times as you want. Every attempt helps you identify weak areas, revise context, and gain the kind
            of repetition that competition performance requires. Whether you are preparing for a local church contest
            or a larger regional event, this page is meant to be your stable practice base.
          </p>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4">
            <div className="aspect-video rounded-xl bg-slate-100" />
            <p className="mt-3 text-sm text-slate-600">Image placeholder: Add your hero competition banner here.</p>
          </div>
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4">
            <div className="aspect-video rounded-xl bg-slate-100" />
            <p className="mt-3 text-sm text-slate-600">Image placeholder: Add your public quiz screenshot or poster here.</p>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Why This Public Quiz Hub Helps You Rank Better in Real Competitions</h2>
          <p className="mt-5 text-base leading-8 text-slate-700">
            Strong competition preparation is not only about how many questions you attempt; it is about how you learn
            from each attempt. In this public Bible quiz experience, each question is framed to improve both recall and
            understanding. That matters for competition environments where similar questions appear with different
            wording. By practicing with question variety and answer explanations, you train yourself to recognize the
            biblical idea, not only a memorized sentence. This is essential for “bible trivia questions” performance
            under time pressure.
          </p>
          <p className="mt-5 text-base leading-8 text-slate-700">
            The platform also supports chapter-level revision, which is a major advantage for teams preparing topic-wise
            or chapter-wise rounds. If your event includes targeted content from a specific book and chapter, you can
            revisit that exact chapter route and keep training until your response speed improves. This page connects you
            to those routes quickly so your study time goes into actual practice, not searching.
          </p>
          <p className="mt-5 text-base leading-8 text-slate-700">
            Another key benefit is consistency. Competitive growth happens when you maintain a regular rhythm. Use this
            public quiz page as your daily checkpoint: choose one Old Testament quiz, one New Testament quiz, and one
            revision round from a previous attempt. Over several weeks, this pattern builds stronger retention and better
            cross-book understanding. For Bible quiz competition 2026, that consistency can make the difference between
            average participation and top-tier performance.
          </p>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Start Practicing Popular Bible Quizzes</h2>
          <p className="mt-4 text-base leading-8 text-slate-700">
            Use these direct links to begin now. Each quiz is free to access and designed for study-focused repetition.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featuredLinks.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 font-semibold text-blue-800 transition hover:bg-blue-100"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">FAQ: Public Bible Quiz Practice</h2>
          <div className="mt-6 space-y-5">
            {faqItems.map((item) => (
              <div key={item.q} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-lg font-semibold text-slate-900">{item.q}</h3>
                <p className="mt-2 text-slate-700">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
