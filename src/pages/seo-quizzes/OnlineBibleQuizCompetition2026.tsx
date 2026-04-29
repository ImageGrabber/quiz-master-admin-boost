import { useNavigate } from "react-router-dom";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";

export default function OnlineBibleQuizCompetition2026() {
  const navigate = useNavigate();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How can I join the online Bible quiz competition 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Create a free account, choose an active quiz category, and join from the competition dashboard during the event window."
        }
      },
      {
        "@type": "Question",
        "name": "Is there a registration fee?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Participation is free for users who register on Bible Quiz Competition."
        }
      },
      {
        "@type": "Question",
        "name": "What topics are covered in the competition?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Questions cover Old Testament, New Testament, chapter-level quizzes, Bible characters, and thematic categories."
        }
      }
    ]
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <SEO
        title="Online Bible Quiz Competition 2026 | Free Bible Quiz with Prizes"
        description="Join the Online Bible Quiz Competition 2026. Play free Bible quizzes, improve your scripture knowledge, climb the leaderboard, and compete for prizes."
        keywords="online bible quiz competition 2026, bible quiz competition 2026, free bible quiz with prizes, christian quiz competition"
        url="/online-bible-quiz-competition-2026"
        structuredData={faqSchema}
      />

      <section className="max-w-5xl mx-auto px-4 py-14">
        <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
            Online Bible Quiz Competition 2026
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            The <strong>Online Bible Quiz Competition 2026</strong> is designed for students, church groups, families,
            and individual learners who want to test and grow their Bible knowledge in a structured, encouraging format.
            Every quiz is built to improve scripture memory, chapter understanding, and confidence in biblical interpretation.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mb-3">What You Get</h2>
          <p className="text-slate-700 mb-8">
            Free participation, chapter-based practice quizzes, public leaderboard tracking, and recurring competition windows
            throughout 2026. You can train using themed quizzes and then compete with a better strategy.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mb-3">How To Participate</h2>
          <p className="text-slate-700 mb-8">
            Create your account, choose your study path (book-wise or topic-wise), attempt quizzes regularly, and monitor your
            rank. Consistent practice improves speed, verse recall, and score accuracy during live or scheduled competition events.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mb-3">Recommended 7-Day Practice Plan</h2>
          <p className="text-slate-700 mb-8">
            Day 1-2: start with Genesis and Matthew chapter quizzes. Day 3-4: practice Psalms and Proverbs for wisdom/poetry recall.
            Day 5: attempt mixed Old and New Testament rounds. Day 6: review wrong answers. Day 7: run one timed mock challenge before competition day.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mb-3">Who This Is For</h2>
          <p className="text-slate-700 mb-8">
            Sunday school participants, youth fellowship members, competitive Bible quiz teams, and self-learners preparing
            for church, school, or ministry-level Bible quiz programs in 2026.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mb-3">Frequently Asked Questions</h2>
          <div className="space-y-5 mb-10">
            <div>
              <h3 className="font-bold text-slate-900">Do I need to pay to join?</h3>
              <p className="text-slate-700">No. The platform offers free access to core quiz participation.</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Can beginners join?</h3>
              <p className="text-slate-700">Yes. Beginner-friendly quizzes are available, plus chapter progression paths.</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900">How do I improve my rank?</h3>
              <p className="text-slate-700">Practice daily chapter quizzes, review explanations, and focus on weak books.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-3">Most Popular Practice Categories</h2>
          <p className="text-slate-700 mb-8">
            Chapter-based quizzes, beginner book challenges, and public leaderboard practice are currently the fastest ways to build consistency.
            Learners who mix chapter practice with weekly full-book review usually improve rank stability over time.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button onClick={() => navigate("/competition-home")} className="bg-slate-900 hover:bg-black text-white">
              Go To Competition Home
            </Button>
            <Button variant="outline" onClick={() => navigate("/bible-questions-and-answers-hub")}>
              Start Practicing Quizzes
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
