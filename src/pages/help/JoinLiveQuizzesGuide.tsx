import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CheckCircle2, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function JoinLiveQuizzesGuide() {
  return (
    <div className="min-h-screen bg-[#FDFDFF] font-urbanist">
      <SEO
        title="Joining Live Quizzes | Bible Quiz Help Guide"
        description="Understand how participants can join live quizzes quickly using a code and display name."
        keywords="join live quiz, quiz join code, bible quiz participant guide"
        url="/help/join-live-quizzes"
      />
      <Navigation />

      <main className="mx-auto max-w-5xl px-4 py-12 md:px-8">
        <section className="rounded-3xl border border-slate-100 bg-white p-6 md:p-10 shadow-sm">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-2 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <Users className="h-3.5 w-3.5" />
            Participant Guide
          </div>
          <h1 className="mt-4 text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Joining Live Quizzes
          </h1>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Understand how participants can join quickly with code and display name.
          </p>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-100 bg-white p-6 md:p-10 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900">How Participants Join</h2>
          <div className="mt-5 space-y-4">
            {[
              "Open the join page from the host-shared link.",
              "Enter the session code exactly as shown by the host.",
              "Type a display name (or login if the host requires account-based entry).",
              "Wait in the lobby until the host starts the first question.",
              "Answer each question before timer runs out to maximize score.",
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
