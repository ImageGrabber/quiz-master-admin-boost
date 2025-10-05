import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Helmet } from "react-helmet-async";
import { Share2, Users, BookOpen, Settings, Clock, Trophy, Shield, CheckCircle, Sparkles, Copy, Link as LinkIcon, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HostingGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Host Live Bible Quizzes with Confidence | Guide & Best Practices</title>
        <meta name="description" content="Step‑by‑step guide to hosting live Bible quizzes. Create quizzes, share join codes, set timers, control flow, and calculate results. Includes tips, FAQs, and best practices." />
        <meta name="keywords" content="host live quiz, bible quiz host, live quiz guide, join code, realtime bible quiz, quiz best practices" />
        <link rel="canonical" href="/host-live-bible-quizzes-with-confidence" />
        <meta property="og:title" content="Host Live Bible Quizzes with Confidence" />
        <meta property="og:description" content="Create, share, and run engaging live Bible quizzes with this complete hosting guide." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'Host Live Bible Quizzes with Confidence',
          description: 'Step‑by‑step guide to creating a quiz, starting a live session, sharing a join code, controlling the flow, and viewing results.',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': '/host-live-bible-quizzes-with-confidence'
          },
          step: [
            { '@type': 'HowToStep', name: 'Create a Quiz', text: 'Add questions A–D, choose correct answers, set visibility and participant feedback.' },
            { '@type': 'HowToStep', name: 'Start a Live Session', text: 'Click Host Live to create a session and share the 8‑character join code or link. Pick a time limit per question.' },
            { '@type': 'HowToStep', name: 'Participants Join', text: 'Attendees enter the code on the Join page. Use guest names or require login.' },
            { '@type': 'HowToStep', name: 'Control the Flow', text: 'Timer auto‑advances questions; optionally show/hide feedback. Final question can auto‑finish and compute results.' },
            { '@type': 'HowToStep', name: 'Review Results', text: 'Top scores highlighted; participants can see completion and results when shared.' }
          ],
          totalTime: 'PT5M',
          estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: 0 }
        })}</script>
      </Helmet>
      <Header />

      <div className="container mx-auto px-4 py-10">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Hero */}
          <div className="relative overflow-hidden rounded-3xl border border-white/60 shadow-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 text-white">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, #fff 0, transparent 25%), radial-gradient(circle at 80% 0%, #fff 0, transparent 25%)' }} />
            <div className="relative p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white/90 text-xs font-semibold mb-3">
                  <Sparkles className="w-4 h-4" /> Realtime hosting guide
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">Host Live Bible Quizzes with Confidence</h1>
                <p className="mt-2 text-white/90 max-w-2xl">Create a quiz, share an 8‑character code, and lead a smooth, engaging event. This guide covers everything from setup to results.</p>
                <div className="mt-4 flex gap-2">
                  <Button className="bg-white text-indigo-700 hover:bg-white/90" onClick={() => navigate('/dashboard/quizzes')}>Create a Quiz</Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-white/20 p-4 backdrop-blur">
                  <div className="font-semibold">Join Code</div>
                  <div className="mt-1 font-mono tracking-widest">ABCD‑1234</div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-white/80"><Copy className="w-4 h-4" /> one‑click copy</div>
                </div>
                <div className="rounded-2xl bg-white/20 p-4 backdrop-blur">
                  <div className="font-semibold">Share Link</div>
                  <div className="mt-1 truncate">yourdomain.com/live-quiz/join/ABCD1234</div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-white/80"><LinkIcon className="w-4 h-4" /> easy sharing</div>
                </div>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/70 backdrop-blur border border-white/60 shadow rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><BookOpen className="w-5 h-5" /> 1) Create a Quiz</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-gray-800">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Add questions (A–D) and pick the correct option.</li>
                  <li>Choose public or private visibility.</li>
                  <li>Optional: require login or allow guest names.</li>
                  <li>Decide if participants see <span className="inline-flex items-center gap-1">feedback <Eye className="w-4 h-4" /> / <EyeOff className="w-4 h-4" /></span> after answering.</li>
                </ul>
                <Button className="mt-2" onClick={() => navigate('/dashboard/quizzes')}>Create a quiz</Button>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur border border-white/60 shadow rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Share2 className="w-5 h-5" /> 2) Start a Live Session</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-gray-800">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Click “Host Live” on any quiz to create a session.</li>
                  <li>We generate an 8‑character join code for participants.</li>
                  <li>Share the code or link—no install required.</li>
                  <li>Pick the time limit per question (e.g., 20–45s).</li>
                </ul>
                <Button variant="outline" className="mt-2" onClick={() => navigate('/live-quiz')}>Live Quiz hub</Button>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur border border-white/60 shadow rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users className="w-5 h-5" /> 3) Participants Join</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-gray-800">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Attendees enter the code at the Join page.</li>
                  <li>Guest mode: they only need a display name.</li>
                  <li>Login mode: responses are tied to accounts.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur border border-white/60 shadow rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Settings className="w-5 h-5" /> 4) You Control the Flow</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-gray-800">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Timer per question auto‑advances the quiz.</li>
                  <li>Optional: show/hide answer feedback for participants.</li>
                  <li>Last question can auto‑finish and compute results.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur border border-white/60 shadow rounded-2xl md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Trophy className="w-5 h-5" /> Results & Safety</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
                <div>
                  <div className="font-semibold mb-2">Results</div>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Scores computed automatically (including time bonus where applicable).</li>
                    <li>Top results highlighted for the host.</li>
                    <li>Participants see completion and, if shared, results.</li>
                  </ul>
                </div>
                <div>
                  <div className="font-semibold mb-2">Best Practices</div>
                  <ul className="list-disc pl-5 space-y-1">
                    <li className="flex items-start gap-2"><Shield className="w-4 h-4 mt-0.5 text-purple-600" /> Keep session codes private for invite‑only events.</li>
                    <li className="flex items-start gap-2"><Clock className="w-4 h-4 mt-0.5 text-purple-600" /> Pick a time limit that fits your audience (e.g., 20–45s).</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-0.5 text-purple-600" /> Do a quick device check with a sample question.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/70 backdrop-blur border border-white/60 shadow rounded-2xl">
              <CardHeader>
                <CardTitle>FAQ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-gray-800">
                <div>
                  <div className="font-semibold">How many can join?</div>
                  <div className="text-sm">As many as your event can support. Share the join link/code and they’re in.</div>
                </div>
                <div>
                  <div className="font-semibold">Can I hide answers?</div>
                  <div className="text-sm">Yes. You can disable participant feedback in settings when creating/starting.</div>
                </div>
                <div>
                  <div className="font-semibold">What if time runs out?</div>
                  <div className="text-sm">Unanswered questions auto‑submit and the quiz proceeds automatically.</div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/70 backdrop-blur border border-white/60 shadow rounded-2xl">
              <CardHeader>
                <CardTitle>Pro Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-gray-800">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Use short, clear questions—avoid double negatives.</li>
                  <li>Have 1–2 warm‑up questions to sync devices.</li>
                  <li>Announce the time per question before you start.</li>
                  <li>Share the join link via chat or QR to speed entry.</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center pt-2">
            <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold" onClick={() => navigate('/dashboard/quizzes')}>
              Create your first quiz
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostingGuide;


