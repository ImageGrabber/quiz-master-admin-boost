import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CheckCircle2, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CreateQuizGuide() {
  return (
    <div className="min-h-screen bg-[#FDFDFF] font-urbanist">
      <SEO
        title="How to Create a Quiz | Bible Quiz Help Guide"
        description="Learn how to create your first live Bible quiz session with smooth host controls, question setup, and publishing flow."
        keywords="how to create quiz, bible quiz host guide, create live quiz, quiz setup help"
        url="/help/create-quiz"
      />
      <Navigation />

      <main className="mx-auto max-w-5xl px-4 py-12 md:px-8">
        <section className="rounded-3xl border border-slate-100 bg-white p-6 md:p-10 shadow-sm">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-2 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="h-3.5 w-3.5" />
            Host Guide
          </div>
          <h1 className="mt-4 text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            How to Create a Quiz
          </h1>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Learn how to create your first live quiz session with smooth host controls.
          </p>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-100 bg-white p-6 md:p-10 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900">Step-by-Step</h2>
          <div className="mt-5 space-y-4">
            {[
              "Go to your dashboard and open Create Quiz.",
              "Add each question with four options and mark the correct answer.",
              "Set visibility and participation preferences (login required or guest mode).",
              "Review order and wording, then save and publish your quiz.",
              "Open Host Live to start a session and share join code/link.",
            ].map((step) => (
              <div key={step} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <CheckCircle2 className="h-5 w-5 mt-0.5 text-emerald-600" />
                <p className="text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-8">
          <Link to="/help" className="inline-flex items-center gap-2 text-blue-700 font-bold hover:underline">
            Back to Help Center <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
