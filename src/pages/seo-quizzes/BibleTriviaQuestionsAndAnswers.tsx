import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function BibleTriviaQuestionsAndAnswers() {
  return (
    <div className="min-h-screen bg-slate-50 font-urbanist">
      <SEO
        title="Bible Trivia Questions and Answers | Free Online Practice"
        description="Challenge yourself with Bible trivia questions and answers online. Practice Old and New Testament trivia with fast, repeatable quiz rounds."
        keywords="bible trivia questions and answers, bible trivia online, christian trivia quiz"
        url="/bible-trivia-questions-and-answers"
      />
      <Navigation />

      <main className="mx-auto max-w-6xl px-4 py-12 md:px-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-10 shadow-sm">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900">Bible Trivia Questions and Answers</h1>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Use these Bible trivia practice paths to sharpen recall and compete confidently in church, youth, and classroom quiz events.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Link to="/public-quiz" className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 font-semibold text-blue-800">Browse All Trivia Quizzes</Link>
            <Link to="/top-100-bible-quiz-questions" className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-800">Top 100 Bible Questions</Link>
            <Link to="/bible-questions-and-answers-hub" className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-800">Bible Q&A Hub</Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
