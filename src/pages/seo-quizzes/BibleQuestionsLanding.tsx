import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CheckCircle2 } from "lucide-react";

export default function BibleQuestionsLanding() {
  return (
    <div className="min-h-screen bg-slate-50 font-urbanist">
      <SEO
        title="Bible Questions and Answers | Free Study and Quiz Practice"
        description="Explore Bible questions and answers with chapter-wise study routes, book hubs, and quiz practice paths for beginners to advanced learners."
        keywords="bible questions and answers, bible study questions, chapter wise bible questions, christian quiz questions"
        url="/bible-questions"
      />
      <Navigation />

      <main className="mx-auto max-w-6xl px-4 py-12 md:px-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-10 shadow-sm">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900">Bible Questions and Answers</h1>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Study scripture with structured Bible questions and answers. Practice by book, chapter, and topic to build strong biblical understanding.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Link to="/bible-questions-and-answers-hub" className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 font-semibold text-blue-800">
              Bible Q&A Hub
            </Link>
            <Link to="/bible-questions-answered" className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 font-semibold text-blue-800">
              Got Questions?
            </Link>
            <Link to="/public-quiz" className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-800">
              Public Quiz Hub
            </Link>
            <Link to="/top-100-bible-quiz-questions" className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-800">
              Top 100 Bible Questions
            </Link>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-10 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900">Best Way to Practice</h2>
          <div className="mt-5 space-y-3">
            {[
              "Start with one book hub and finish chapter-level routes.",
              "Repeat weak chapters to improve response speed and confidence.",
              "Mix Old and New Testament practice for broad recall.",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <CheckCircle2 className="h-5 w-5 mt-0.5 text-emerald-600" />
                <p className="text-slate-700">{point}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
