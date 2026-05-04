import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CheckCircle2 } from "lucide-react";

const faqs = [
  {
    q: "Are these free Bible quiz questions and answers good for competition prep?",
    a: "Yes. These quizzes are designed for structured practice with chapter-focused questions and clear answer flow.",
  },
  {
    q: "Can I practice without registering?",
    a: "Many public quiz routes can be started directly, making quick practice easy for individuals and groups.",
  },
  {
    q: "Do you cover all Bible books?",
    a: "Yes. Public quiz pages are available across Old Testament and New Testament books.",
  },
];

export default function FreeBibleQuizQuestionsAndAnswers() {
  const siteUrl = "https://biblequizcompetition.com";
  return (
    <div className="min-h-screen bg-slate-50 font-urbanist">
      <SEO
        title="Free Bible Quiz Questions and Answers | Bible Quiz Competition"
        description="Practice free Bible quiz questions and answers with book-wise and chapter-wise quizzes. Improve speed, recall, and confidence for church and youth competitions."
        keywords="free bible quiz questions and answers, bible quiz practice, chapter wise bible quiz, church bible quiz"
        url="/free-bible-quiz-questions-and-answers"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              name: "Free Bible Quiz Questions and Answers",
              url: `${siteUrl}/free-bible-quiz-questions-and-answers`,
              description:
                "Practice free Bible quiz questions and answers with book-wise and chapter-wise quizzes.",
            },
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            },
          ],
        }}
      />
      <Navigation />

      <main className="mx-auto max-w-6xl px-4 py-12 md:px-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-10 shadow-sm">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900">Free Bible Quiz Questions and Answers</h1>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Build Bible knowledge with structured quiz practice. Use book-wise and chapter-wise routes to train memory,
            improve response speed, and prepare for church quiz rounds.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Link to="/public-quiz" className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 font-semibold text-blue-800">Explore Public Quiz Hub</Link>
            <Link to="/public-quiz/genesis" className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-800">Start Genesis Quiz</Link>
            <Link to="/public-quiz/matthew" className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-800">Start Matthew Quiz</Link>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-10 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900">Why this helps your scores</h2>
          <div className="mt-5 space-y-3">
            {[
              "Practice by chapter, not random guessing only.",
              "Reinforces key passages and event recall.",
              "Useful for youth teams, Sunday school, and church competition prep.",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <CheckCircle2 className="h-5 w-5 mt-0.5 text-emerald-600" />
                <p className="text-slate-700">{point}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-10 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900">FAQ</h2>
          <div className="mt-5 space-y-4">
            {faqs.map((item) => (
              <div key={item.q} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="font-bold text-slate-900">{item.q}</h3>
                <p className="mt-1 text-slate-700">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
