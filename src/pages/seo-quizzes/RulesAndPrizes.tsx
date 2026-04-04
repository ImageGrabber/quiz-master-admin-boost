import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { AlertCircle, CheckCircle2, Crown, Trophy, Zap } from "lucide-react";

const currentYear = new Date().getFullYear();

const faqItems = [
  {
    q: `How does the Bible quiz scoring system work in ${currentYear}?`,
    a: "Scoring depends on quiz mode. Public book quizzes display accuracy percentage. Daily and weekly quizzes use points (+4 correct, -1 wrong) plus a timer bonus. Competition quizzes use percentage scores for placements.",
  },
  {
    q: "What is the timer bonus in Bible Quiz Competition?",
    a: "For points-based quiz modes, faster completion adds bonus points. The bonus gets smaller as time runs down, so both accuracy and pace matter.",
  },
  {
    q: "Are there Bible quiz prizes in the online competition?",
    a: "Yes. Prizes vary by event and season and may include leaderboard recognition, badges, bonus XP, and featured winner highlights. Some special competitions include prize pools.",
  },
  {
    q: "How does Britannica quiz scoring work timer bonus compared to this platform?",
    a: "Britannica and Bible Quiz Competition are separate platforms with different scoring rules. On Bible Quiz Competition, timer bonus applies in points-based quiz modes, while public book quizzes emphasize percentage accuracy.",
  },
  {
    q: `Can I join the online Bible quiz competition ${currentYear} for free?`,
    a: "Yes. You can register and start with free quiz modes. Certain premium competition events may include optional entry fees.",
  },
];

const RulesAndPrizes = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-urbanist">
      <Helmet>
        <title>{`Bible Quiz Competition ${currentYear} Rules, Prizes & Scoring System`}</title>
        <meta
          name="description"
          content={`Official Bible Quiz Competition ${currentYear} rules and prize guide. Get a clear quiz scoring system explanation, timer bonus details, and eligibility rules for online Bible quiz competitions.`}
        />
        <meta
          name="keywords"
          content={`bible quiz prize, quiz scoring system explanation, bible competition, bible quiz competition ${currentYear}, online bible quiz competition ${currentYear}, timer bonus quiz scoring`}
        />
        <link rel="canonical" href="https://biblequizcompetition.com/rules-and-prizes" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "name": `Bible Quiz Competition ${currentYear} Rules, Prizes & Scoring System`,
                "url": "https://biblequizcompetition.com/rules-and-prizes",
                "description": `Official rules, prize details, and scoring explanation for Bible Quiz Competition ${currentYear}.`,
                "publisher": {
                  "@type": "Organization",
                  "name": "Bible Quiz Competition",
                  "url": "https://biblequizcompetition.com",
                },
              },
              {
                "@type": "FAQPage",
                "mainEntity": faqItems.map((item) => ({
                  "@type": "Question",
                  "name": item.q,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.a,
                  },
                })),
              },
            ],
          })}
        </script>
      </Helmet>

      <Navigation />

      <main className="container mx-auto px-4 py-8 pt-24">
        <header className="text-center mb-14 max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-5">
            <Trophy className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-5 tracking-tight">
            {`Bible Quiz Competition ${currentYear} Rules, Prizes & Scoring System`}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Looking for a clear <strong>quiz scoring system explanation</strong> or details about
            <strong> bible quiz prizes</strong>? This page explains how scores are calculated,
            how timer bonus works, and what rules apply to the online Bible competition.
          </p>
        </header>

        <section className="mb-16" id="scoring-system">
          <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
            <Zap className="h-7 w-7 text-amber-500" />
            <h2 className="text-3xl font-bold text-slate-900">Quiz Scoring System Explanation</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Public Book Quizzes</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600 space-y-2 text-sm">
                <p>Score is shown as percentage accuracy.</p>
                <p>Great for practice and chapter-level review.</p>
                <p>No account required to start.</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Daily & Weekly Quizzes</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600 space-y-2 text-sm">
                <p>Correct answer: +4 points.</p>
                <p>Wrong answer: -1 point.</p>
                <p>Timer bonus is added for faster completion.</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Competition Quizzes</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600 space-y-2 text-sm">
                <p>Rankings are based on score percentage.</p>
                <p>Completion time is tracked for event reporting.</p>
                <p>Used for official event placements.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16" id="prizes">
          <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
            <Crown className="h-7 w-7 text-amber-500" />
            <h2 className="text-3xl font-bold text-slate-900">Bible Quiz Prizes & Rewards</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <Card className="border-blue-100 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-700">Daily Recognition</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700 space-y-2">
                <p>Top daily performers can earn leaderboard visibility.</p>
                <p>Bonus XP and digital badge opportunities.</p>
              </CardContent>
            </Card>

            <Card className="border-amber-100 bg-amber-50">
              <CardHeader>
                <CardTitle className="text-amber-700">Season Highlights</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700 space-y-2">
                <p>Monthly and seasonal standout recognition.</p>
                <p>Featured winner placements and community highlights.</p>
              </CardContent>
            </Card>

            <Card className="border-emerald-100 bg-emerald-50">
              <CardHeader>
                <CardTitle className="text-emerald-700">Event Prize Pools</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700 space-y-2">
                <p>Some official competitions include paid prize pools.</p>
                <p>Prize distribution depends on event settings and rank.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16 bg-white rounded-3xl p-8 border border-slate-200" id="rules">
          <h2 className="text-2xl font-bold text-slate-900 mb-5 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-slate-500" />
            Official Competition Rules
          </h2>
          <ol className="list-decimal pl-6 space-y-3 text-slate-600">
            <li>One participant account per person to protect leaderboard integrity.</li>
            <li>No external help during timed quizzes.</li>
            <li>Respectful conduct is required in usernames, chats, and community posts.</li>
            <li>Prize eligibility requires valid registration details and timely response.</li>
            <li>Violation of fair-play rules may result in disqualification.</li>
          </ol>
        </section>

        <section className="mb-16" id="faq">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">FAQ</h2>
          <div className="space-y-4">
            {faqItems.map((faq, idx) => (
              <Card key={idx} className="border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-600">{faq.a}</CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12 bg-white rounded-3xl p-8 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-5">Popular Bible Quiz Pages</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            <a href="/public-quiz/nehemiah" className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700">
              Nehemiah Quiz
            </a>
            <a href="/public-quiz/2-thessalonians" className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700">
              2 Thessalonians Quiz
            </a>
            <a href="/public-quiz/philemon" className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700">
              Philemon Bible Quiz
            </a>
            <a href="/competition-home" className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700">
              Online Bible Competition
            </a>
          </div>
        </section>

        <div className="text-center pb-10">
          <Button
            size="lg"
            className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate("/todays-quiz")}
          >
            Start Today&apos;s Quiz <CheckCircle2 className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default RulesAndPrizes;
