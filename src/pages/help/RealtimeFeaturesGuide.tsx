import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CheckCircle2, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function RealtimeFeaturesGuide() {
  return (
    <div className="min-h-screen bg-[#FDFDFF] font-urbanist">
      <SEO
        title="Real-time Features | Bible Quiz Help Guide"
        description="Explore leaderboard updates, scoring flow, timer behavior, and live quiz host controls."
        keywords="real-time quiz features, quiz leaderboard updates, live quiz scoring flow"
        url="/help/realtime-features"
      />
      <Navigation />

      <main className="mx-auto max-w-5xl px-4 py-12 md:px-8">
        <section className="rounded-3xl border border-slate-100 bg-white p-6 md:p-10 shadow-sm">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-2 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <Zap className="h-3.5 w-3.5" />
            Real-time Guide
          </div>
          <h1 className="mt-4 text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Real-time Features
          </h1>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Explore leaderboard updates, scoring flow, and live quiz behavior.
          </p>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-100 bg-white p-6 md:p-10 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900">What Happens Live</h2>
          <div className="mt-5 space-y-4">
            {[
              "Each question runs on a host-defined timer and auto-advances when time ends.",
              "Scores are updated after answers are submitted and validated.",
              "Leaderboards refresh as rounds progress to show current rankings.",
              "Host settings can control answer feedback visibility and session pacing.",
              "Final results are computed automatically at quiz completion.",
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
