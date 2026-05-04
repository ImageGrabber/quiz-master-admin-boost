import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function MediaKit() {
  return (
    <div className="min-h-screen bg-slate-50 font-urbanist">
      <SEO
        title="Media Kit | Bible Quiz Competition"
        description="Official media kit for Bible Quiz Competition with brand summary, mission, and approved links for churches, bloggers, and education partners."
        keywords="bible quiz competition media kit, christian education media kit, church quiz platform"
        url="/media-kit"
      />
      <Navigation />

      <main className="mx-auto max-w-5xl px-4 py-12 md:px-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-10 shadow-sm">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900">Media Kit</h1>
          <p className="mt-4 text-slate-600 leading-relaxed">
            This page provides official wording and links for churches, bloggers, teachers, and partners who want to reference Bible Quiz Competition.
          </p>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-10 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900">Short Description</h2>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Bible Quiz Competition is a free, faith-first platform with book-wise Bible quizzes, chapter-based practice routes, and community-oriented learning tools for families, youth groups, and churches.
          </p>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-10 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900">Official Links</h2>
          <ul className="mt-4 space-y-2 text-slate-700">
            <li>Homepage: https://biblequizcompetition.com/</li>
            <li>Public Quiz Hub: https://biblequizcompetition.com/public-quiz</li>
            <li>Bible Questions: https://biblequizcompetition.com/bible-questions</li>
            <li>Prayers: https://biblequizcompetition.com/prayers</li>
            <li>Articles: https://biblequizcompetition.com/articles</li>
          </ul>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-10 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900">Suggested Attribution</h2>
          <p className="mt-3 text-slate-700 leading-relaxed">
            “Bible Quiz Competition offers free Bible quiz questions and answers with chapter-wise study and public quiz practice.”
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
