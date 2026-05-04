import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function BibleQuizForKidsTeensAdults() {
  return (
    <div className="min-h-screen bg-slate-50 font-urbanist">
      <SEO
        title="Bible Quiz for Kids, Teens, and Adults | Free Practice"
        description="Free Bible quiz practice for kids, teens, youth, and adults. Explore age-friendly Bible quiz questions with easy navigation and repeat rounds."
        keywords="bible quiz for kids, bible quiz for teens, bible quiz for adults, youth bible quiz"
        url="/bible-quiz-for-kids-teens-adults"
      />
      <Navigation />

      <main className="mx-auto max-w-6xl px-4 py-12 md:px-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-10 shadow-sm">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900">Bible Quiz for Kids, Teens, and Adults</h1>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Find Bible quiz routes that fit every age group. Start easy for kids, increase difficulty for teens, and build deep chapter-level practice for adults.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Link to="/public-quiz" className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 font-semibold text-blue-800">Start Free Public Quizzes</Link>
            <Link to="/bible-trivia-for-kids-under-10" className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-800">Kids Trivia</Link>
            <Link to="/bible-quiz-with-answers-for-youth" className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-800">Youth Quiz</Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
