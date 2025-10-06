import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Helmet } from "react-helmet-async";
import { Share2, Users, BookOpen, Settings, Clock, Trophy, Shield, CheckCircle, Sparkles, Copy, Link as LinkIcon, Eye, EyeOff } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
        <div className="max-w-7xl mx-auto space-y-10">
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
                  <div className="mt-1 truncate">biblequizcompetition.com/live-quiz/join/ABCD1234</div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-white/80"><LinkIcon className="w-4 h-4" /> easy sharing</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Full-Width */}
          <div className="rounded-3xl bg-white/70 backdrop-blur border border-white/60 shadow p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button size="lg" onClick={() => navigate('/dashboard/quizzes')} className="h-12 md:h-14 text-base md:text-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white">Create a Quiz</Button>
              <Button size="lg" onClick={() => navigate('/live-quiz')} variant="outline" className="h-12 md:h-14 text-base md:text-lg">Host Live Now</Button>
              <Button size="lg" onClick={() => navigate('/articles')} variant="outline" className="h-12 md:h-14 text-base md:text-lg">Read Best Practices</Button>
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
                  <li>Reorder questions using drag & drop in the editor.</li>
                  <li>Keep questions concise (under 120 chars) for readability on mobile.</li>
                  <li>Use distinctive distractors; avoid “All of the above.”</li>
                </ul>
                <div className="mt-3 p-3 rounded-lg bg-indigo-50 border border-indigo-100 text-sm">
                  <div className="font-semibold text-indigo-800 mb-1">Checklist</div>
                  <ul className="list-disc pl-5 space-y-0.5 text-indigo-900">
                    <li>At least 5 questions added</li>
                    <li>Correct answers verified</li>
                    <li>Feedback option chosen</li>
                  </ul>
                </div>
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
                  <li>Optionally enable/disable participant feedback for this session.</li>
                  <li>Copy the join link to share via chat, email, or QR.</li>
                </ul>
                <div className="mt-3 p-3 rounded-lg bg-purple-50 border border-purple-100 text-sm">
                  <div className="font-semibold text-purple-800 mb-1">Pro Setup Tips</div>
                  <ul className="list-disc pl-5 space-y-0.5 text-purple-900">
                    <li>Do a 30‑second sound/device check</li>
                    <li>Share link and code in multiple places</li>
                    <li>Announce time limit and rules before starting</li>
                  </ul>
                </div>
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
                  <li>Encourage consistent naming (e.g., first name + initial) for awards.</li>
                  <li>Late arrivals can still join while the session is active.</li>
                </ul>
                <div className="mt-3 p-3 rounded-lg bg-emerald-50 border border-emerald-100 text-sm">
                  <div className="font-semibold text-emerald-800 mb-1">Share Faster</div>
                  <ul className="list-disc pl-5 space-y-0.5 text-emerald-900">
                    <li>Display QR code to the join link on the projector</li>
                    <li>Pin the link in your chat/announcement feed</li>
                  </ul>
                </div>
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
                  <li>Host can show interim results without ending the session.</li>
                  <li>Use consistent pacing: short pause before each question.</li>
                </ul>
                <div className="mt-3 p-3 rounded-lg bg-orange-50 border border-orange-100 text-sm">
                  <div className="font-semibold text-orange-800 mb-1">Timing Guidance</div>
                  <ul className="list-disc pl-5 space-y-0.5 text-orange-900">
                    <li>Facts & verses: 15–25s</li>
                    <li>Story/logic: 25–35s</li>
                    <li>Large events: prefer 20–25s for cadence</li>
                  </ul>
                </div>
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
                    <li>Export or screenshot the leaderboard for announcements.</li>
                  </ul>
                </div>
                <div>
                  <div className="font-semibold mb-2">Best Practices</div>
                  <ul className="list-disc pl-5 space-y-1">
                    <li className="flex items-start gap-2"><Shield className="w-4 h-4 mt-0.5 text-purple-600" /> Keep session codes private for invite‑only events.</li>
                    <li className="flex items-start gap-2"><Clock className="w-4 h-4 mt-0.5 text-purple-600" /> Pick a time limit that fits your audience (e.g., 20–45s).</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-0.5 text-purple-600" /> Do a quick device check with a sample question.</li>
                    <li>Rotate codes between events to prevent re‑use.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Playbooks (Expandable) & FAQ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/70 backdrop-blur border border-white/60 shadow rounded-2xl">
              <CardHeader>
                <CardTitle>Hosting Playbooks</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="classroom">
                    <AccordionTrigger>Classroom (20–30 participants)</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-1 text-gray-800 text-sm">
                        <li>Project the host screen; students join on phones.</li>
                        <li>Time per question: 25–35s; feedback: on.</li>
                        <li>Do a 2‑question warm‑up to sync devices.</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="youth">
                    <AccordionTrigger>Youth night (50–100 participants)</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-1 text-gray-800 text-sm">
                        <li>Share QR join link on slides and chat.</li>
                        <li>Time per question: 20–30s; feedback: off for suspense.</li>
                        <li>Announce codes verbally and in chat.</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="online">
                    <AccordionTrigger>Online stream (unlimited viewers)</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-1 text-gray-800 text-sm">
                        <li>Pin the join link; auto‑advance via timer only.</li>
                        <li>Keep questions short; 15–25s timer.</li>
                        <li>Share top results between rounds.</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            <Card className="bg-white/70 backdrop-blur border border-white/60 shadow rounded-2xl">
              <CardHeader>
                <CardTitle>FAQ</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-800">
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="capacity">
                    <AccordionTrigger>How many participants can join?</AccordionTrigger>
                    <AccordionContent className="text-base md:text-lg text-gray-900">There’s no hard limit in the app; practical capacity depends on your network/stream. For 100+, use timers only and keep questions short.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="answers">
                    <AccordionTrigger>Can I hide “Correct/Incorrect” feedback?</AccordionTrigger>
                    <AccordionContent className="text-sm">Yes. When creating a quiz or starting a session you can disable feedback. We’ll still score everything in the background.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="timeout">
                    <AccordionTrigger>What happens when time runs out?</AccordionTrigger>
                    <AccordionContent className="text-sm">If no answer is selected, we auto‑submit a neutral incorrect answer and move to the next question. The host can also show results at the end.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="security">
                    <AccordionTrigger>How do I prevent impersonation?</AccordionTrigger>
                    <AccordionContent className="text-sm">Enable “Require login” for sessions where identity matters. For public events, use guest mode and moderate via session code rotation.</AccordionContent>
                  </AccordionItem>
                </Accordion>
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
                  <li>For big screens, increase browser zoom 110–125% for readability.</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Full-width CTA */}
          <div className="text-center pt-2">
            <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold" onClick={() => navigate('/dashboard/quizzes')}>
              Create your first quiz
            </Button>
          </div>
        </div>
      </div>
      {/* Footer (same as homepage) */}
      <footer className="bg-[#181c3a] text-gray-200 pt-16 pb-8 mt-0">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:justify-between md:items-start gap-12">
          {/* Left: Logo and description */}
          <div className="flex-1 min-w-[220px] flex flex-col items-start mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-2">
                <img src="/sword.png" alt="Bible Quiz Competition Logo" className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-white">Bible Quiz Competition</span>
            </div>
            <p className="mb-4 text-gray-300 max-w-xs">Empower your faith with fun, challenging Bible quizzes for all ages. Compete, learn, and grow in your knowledge of Scripture!</p>
            <p className="text-gray-400 text-sm">Need help? Email <a href="mailto:info@biblequizcompetition.com" className="underline">info@biblequizcompetition.com</a></p>
          </div>
          {/* Center/Right: Links */}
          <div className="flex flex-1 flex-col sm:flex-row justify-end gap-12">
            <div>
              <h4 className="font-bold text-white mb-3">Company</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="hover:underline text-gray-300">About</a></li>
                <li><a href="#features" className="hover:underline text-gray-300">Features</a></li>
                <li><a href="/public-leaderboard" className="hover:underline text-gray-300">Leaderboard</a></li>
                <li><a href="#faq" className="hover:underline text-gray-300">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#privacy" className="hover:underline text-gray-300">Privacy</a></li>
                <li><a href="#terms" className="hover:underline text-gray-300">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 border-t border-blue-900 pt-6 text-center text-white text-sm">
          © 2025 Bible Quiz Competition. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HostingGuide;


