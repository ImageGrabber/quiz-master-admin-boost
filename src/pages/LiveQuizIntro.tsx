import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Users,
  BookOpen,
  Play,
  Plus,
  ListChecks,
  HelpCircle,
} from "lucide-react";

const LiveQuizIntro = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Live Quiz Hub | Bible Quiz Competition</title>
        <meta
          name="description"
          content="Learn how live quizzes work. Create a quiz, host a session, or join with a code."
        />
      </Helmet>

      <Header />
      {/* Hero */}
      <div className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto py-10 md:py-14 text-white">
            <div className="flex items-start md:items-center justify-between gap-6 flex-col md:flex-row">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Live Quiz Hub</h1>
                <p className="mt-2 text-white/90 max-w-2xl">Create, host, and manage realtime Bible quizzes. Share a code, engage your audience, and see results instantly.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge className="bg-white/20 text-white border-white/30">Realtime</Badge>
                  <Badge className="bg-white/20 text-white border-white/30">Host‑controlled</Badge>
                  <Badge className="bg-white/20 text-white border-white/30">Share by code</Badge>
                </div>
              </div>
              <div className="flex-shrink-0">
                <Button onClick={() => navigate('/create-quiz')} className="h-11 px-5 font-semibold bg-white text-indigo-700 hover:bg-white/90">Create Quiz</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/70 backdrop-blur border border-white/60 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Live Quiz: How it works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-800">
                <ol className="list-decimal pl-5 space-y-3">
                  <li>
                    Create your quiz in <span className="font-semibold">Create Quiz</span>.
                    Add questions and choose the correct answers.
                  </li>
                  <li>
                    Host the quiz to generate an <span className="font-semibold">8‑character session code</span>.
                    Share the code or join link with participants.
                  </li>
                  <li>
                    Participants can join from any device using the code. You control when each
                    question appears and finish when done.
                  </li>
                  <li>
                    Results are calculated automatically and the top scores are highlighted.
                  </li>
                </ol>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="secondary">Realtime</Badge>
                  <Badge variant="secondary">Host‑controlled</Badge>
                  <Badge variant="secondary">Share by code</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur border border-white/60 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-800">
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="participation">
                    <AccordionTrigger>Participation modes</AccordionTrigger>
                    <AccordionContent className="space-y-6 text-base">
                      <div>
                        <h3 className="font-semibold mb-2">Attempting with login</h3>
                        <ol className="list-decimal pl-5 space-y-2">
                          <li>Users sign in or create an account.</li>
                          <li>They enter the <span className="font-semibold">session code</span> or open the join link.</li>
                          <li>Their name and results are tied to their account for badges and history.</li>
                        </ol>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Attempting without login</h3>
                        <ol className="list-decimal pl-5 space-y-2">
                          <li>When creating a quiz, turn off <span className="font-semibold">Require login</span>.</li>
                          <li>Participants join using the session code and enter a display name only.</li>
                          <li>Results are stored for the session but not attached to a user account.</li>
                        </ol>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        Tip: Prefer login for persistent stats and anti‑impersonation; use no‑login for frictionless events.
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="questions">
                    <AccordionTrigger>Create questions and settings</AccordionTrigger>
                    <AccordionContent className="text-base">
                      <ol className="list-decimal pl-5 space-y-2">
                        <li>Open <span className="font-semibold">Create Quiz</span> and give your quiz a title and optional description.</li>
                        <li>Use <span className="font-semibold">Add Question</span> to add as many questions as you like.</li>
                        <li>Provide options A–D and mark the correct answer with the selector.</li>
                        <li>Decide visibility: <span className="font-semibold">Public</span> so others can discover it, or keep it private.</li>
                        <li>Toggle <span className="font-semibold">Require login</span> to control whether participants must sign in.</li>
                        <li>Save the quiz; you can host it immediately or return later via My Quizzes.</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="features">
                    <AccordionTrigger>Host features</AccordionTrigger>
                    <AccordionContent className="text-base">
                      <ul className="list-disc pl-5 space-y-2">
                        <li><span className="font-semibold">Realtime control</span>: Start, move to next question, and finish the quiz for everyone.</li>
                        <li><span className="font-semibold">Shareable join code</span>: Auto‑generated 8‑character code with one‑click copy link.</li>
                        <li><span className="font-semibold">Participant list</span>: See who joined and whether they’re ready.</li>
                        <li><span className="font-semibold">Optional answer reveal</span>: Show or hide correct answers while hosting.</li>
                        <li><span className="font-semibold">Automatic results</span>: Scores calculated and top results highlighted when you finish.</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="scoring">
                    <AccordionTrigger>Scoring & results</AccordionTrigger>
                    <AccordionContent className="text-base">
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Correct answers earn points; faster responses gain a time bonus.</li>
                        <li>Top results are displayed to the host after finishing.</li>
                        <li>Results are saved to the session and can be viewed later from the host page.</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="moderation">
                    <AccordionTrigger>Security & moderation</AccordionTrigger>
                    <AccordionContent className="text-base">
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Use <span className="font-semibold">Require login</span> to ensure unique participants and reduce impersonation.</li>
                        <li>Share codes privately; regenerate a new session for each event.</li>
                        <li>Remove uncooperative attendees by ending the session and starting a fresh one.</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="tips">
                    <AccordionTrigger>Tips for hosting</AccordionTrigger>
                    <AccordionContent className="text-base">
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Test with a small group first to confirm devices and connectivity.</li>
                        <li>Explain answer timing before you start to avoid confusion.</li>
                        <li>Keep questions concise and avoid ambiguous wording.</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="troubleshooting">
                    <AccordionTrigger>Troubleshooting</AccordionTrigger>
                    <AccordionContent className="text-base">
                      <ul className="list-disc pl-5 space-y-2">
                        <li>If someone can’t join: verify the 8‑char code and internet connection.</li>
                        <li>If results don’t appear: wait a few seconds or refresh the host page, then try again.</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            

          </div>

          <div className="space-y-6 lg:sticky lg:top-24 self-start">
            <Card className="bg-white/70 backdrop-blur border border-white/60 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle>Get started</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  <Button
                    className="justify-start h-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
                    onClick={() => navigate("/create-quiz")}
                  >
                    <Plus className="w-4 h-4 mr-3" /> Create Quiz
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start h-12"
                    onClick={() => navigate("/dashboard/quizzes")}
                  >
                    <BookOpen className="w-4 h-4 mr-3" /> My Quizzes
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start h-12"
                    onClick={() => navigate("/help")}
                  >
                    <HelpCircle className="w-4 h-4 mr-3" /> Help & Support
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/70 backdrop-blur border border-white/60 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Host an existing quiz
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-700">
                  Go to <span className="font-semibold">My Quizzes</span>, pick a quiz, and click
                  <span className="font-semibold"> Host Live</span>. A session code will be created
                  for you to share.
                </p>
                <Button className="w-full" onClick={() => navigate("/dashboard/quizzes")}> 
                  <ListChecks className="w-4 h-4 mr-2" /> Choose a quiz to host
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur border border-white/60 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Want to take a solo quiz?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-3">Use the regular quiz flow instead.</p>
                <Button variant="outline" className="w-full" onClick={() => navigate("/quiz-selection")}>Browse quizzes</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveQuizIntro;


