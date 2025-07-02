import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Galatians Quiz", description: "Continue to Paul's letter to the Galatians.", link: "/bible-questions-and-answers-hub/galatians" },
  { title: "1 Corinthians Quiz", description: "Go back to Paul's first letter to the Corinthians.", link: "/bible-questions-and-answers-hub/1-corinthians" },
  { title: "Ephesians Quiz", description: "Explore Paul's letter to the Ephesians.", link: "/bible-questions-and-answers-hub/ephesians" }
];

const secondCorinthiansQuestions = [
  { chapter: 1, question: "Who wrote the Book of 2 Corinthians?", options: ["Peter", "Paul", "John", "Luke"], answer: 1 },
  { chapter: 1, question: "What does 2 Corinthians 1:3 say about God?", options: ["He is the Father of mercies", "He is angry", "He is distant", "He is silent"], answer: 0 },
  { chapter: 1, question: "What does 2 Corinthians 1:4 say about comfort?", options: ["We comfort others with the comfort we receive", "We keep comfort to ourselves", "We ignore comfort", "We reject comfort"], answer: 0 },
  { chapter: 1, question: "What does 2 Corinthians 1:20 say about God's promises?", options: ["All are yes in Christ", "Some are yes", "None are yes", "They are conditional"], answer: 0 },
  { chapter: 2, question: "What does 2 Corinthians 2:14 say about God?", options: ["He always leads us in triumph", "He sometimes leads us", "He never leads us", "He abandons us"], answer: 0 },
  { chapter: 2, question: "What does 2 Corinthians 2:15 say about believers?", options: ["We are the aroma of Christ", "We have no smell", "We are offensive", "We are invisible"], answer: 0 },
  { chapter: 3, question: "What does 2 Corinthians 3:6 say about the letter and Spirit?", options: ["The letter kills, the Spirit gives life", "Both give life", "Both kill", "Neither matters"], answer: 0 },
  { chapter: 3, question: "What does 2 Corinthians 3:18 say about transformation?", options: ["We are being transformed into His image", "We stay the same", "We get worse", "We disappear"], answer: 0 },
  { chapter: 4, question: "What does 2 Corinthians 4:7 say about treasure?", options: ["We have treasure in jars of clay", "We have no treasure", "We are the treasure", "Treasure is worthless"], answer: 0 },
  { chapter: 4, question: "What does 2 Corinthians 4:16 say about our inner self?", options: ["It is being renewed day by day", "It gets worse", "It stays the same", "It disappears"], answer: 0 },
  { chapter: 4, question: "What does 2 Corinthians 4:17 say about affliction?", options: ["It is light and momentary", "It is heavy and permanent", "It doesn't exist", "It is punishment"], answer: 0 },
  { chapter: 4, question: "What does 2 Corinthians 4:18 say about what we look at?", options: ["We look at what is unseen", "We look at what is seen", "We don't look at anything", "We look at ourselves"], answer: 0 },
  { chapter: 5, question: "What does 2 Corinthians 5:7 say about walking?", options: ["We walk by faith, not by sight", "We walk by sight", "We don't walk", "We walk by works"], answer: 0 },
  { chapter: 5, question: "What does 2 Corinthians 5:10 say about judgment?", options: ["We must appear before Christ's judgment seat", "We won't be judged", "We judge ourselves", "We judge others"], answer: 0 },
  { chapter: 5, question: "What does 2 Corinthians 5:17 say about being in Christ?", options: ["We are a new creation", "We stay the same", "We get worse", "We disappear"], answer: 0 },
  { chapter: 5, question: "What does 2 Corinthians 5:20 say about our role?", options: ["We are ambassadors for Christ", "We are soldiers", "We are kings", "We are servants"], answer: 0 },
  { chapter: 5, question: "What does 2 Corinthians 5:21 say about Christ?", options: ["He became sin for us", "He never sinned", "He was always sin", "He ignored sin"], answer: 0 },
  { chapter: 6, question: "What does 2 Corinthians 6:2 say about the time?", options: ["Now is the day of salvation", "Tomorrow is the day", "Yesterday was the day", "There is no day"], answer: 0 },
  { chapter: 6, question: "What does 2 Corinthians 6:14 say about being unequally yoked?", options: ["Do not be unequally yoked", "It's okay to be unequally yoked", "Always be unequally yoked", "It doesn't matter"], answer: 0 },
  { chapter: 7, question: "What does 2 Corinthians 7:10 say about godly sorrow?", options: ["It produces repentance", "It produces death", "It produces nothing", "It produces anger"], answer: 0 },
  { chapter: 8, question: "What does 2 Corinthians 8:9 say about Christ's poverty?", options: ["He became poor for our sake", "He stayed rich", "He ignored poverty", "He caused poverty"], answer: 0 },
  { chapter: 9, question: "What does 2 Corinthians 9:7 say about giving?", options: ["God loves a cheerful giver", "God hates giving", "God doesn't care", "God requires giving"], answer: 0 },
  { chapter: 10, question: "What does 2 Corinthians 10:4 say about our weapons?", options: ["They are not of the flesh", "They are of the flesh", "We have no weapons", "Weapons don't matter"], answer: 0 },
  { chapter: 10, question: "What does 2 Corinthians 10:5 say about thoughts?", options: ["We take every thought captive", "We ignore thoughts", "We follow all thoughts", "We have no thoughts"], answer: 0 },
  { chapter: 11, question: "What does 2 Corinthians 11:14 say about Satan?", options: ["He disguises himself as an angel of light", "He is always visible", "He doesn't exist", "He is good"], answer: 0 },
  { chapter: 12, question: "What does 2 Corinthians 12:9 say about God's grace?", options: ["My grace is sufficient for you", "My grace is not enough", "I have no grace", "Grace is temporary"], answer: 0 },
  { chapter: 12, question: "What does 2 Corinthians 12:10 say about weakness?", options: ["When I am weak, I am strong", "Weakness is bad", "Weakness doesn't matter", "Weakness is permanent"], answer: 0 },
  { chapter: 13, question: "What does 2 Corinthians 13:5 say about examining ourselves?", options: ["Examine yourselves to see if you are in the faith", "Don't examine yourself", "Examine others", "Examination is useless"], answer: 0 },
  { chapter: 13, question: "What does 2 Corinthians 13:14 mention about the Trinity?", options: ["Grace of Lord Jesus, love of God, fellowship of Holy Spirit", "Only Jesus matters", "Only God matters", "Only Spirit matters"], answer: 0 }
];

export default function SecondCorinthiansQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(secondCorinthiansQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(secondCorinthiansQuestions.length).fill(false));
  const navigate = useNavigate();

  const handleSelect = (qIdx: number, oIdx: number) => {
    if (showAnswer[qIdx]) return;
    const newSelected = [...selected];
    newSelected[qIdx] = oIdx;
    setSelected(newSelected);
    const newShow = [...showAnswer];
    newShow[qIdx] = true;
    setShowAnswer(newShow);
  };

  const correctCount = selected.filter((sel, i) => sel !== null && sel === secondCorinthiansQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== secondCorinthiansQuestions[i].answer).length;
  const notAttemptedCount = selected.filter((sel) => sel === null).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white flex flex-col">
      <header className="bg-white/70 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/bible-questions-and-answers-hub')}> 
            <img src="/sword.png" alt="BibleBattles Logo" className="w-7 h-7 mr-2 inline-block align-middle" />
            <span className="text-lg font-semibold text-gray-900">BibleBattles</span>
          </div>
          <nav className="flex items-center space-x-2">
            <a href="/" className="text-gray-700 hover:text-blue-700 font-medium px-3 py-2 rounded transition">Home</a>
            <a href="/bible-questions-and-answers-hub" className="text-blue-700 font-semibold px-3 py-2 rounded transition">Bible Q&amp;A</a>
            <a href="/public-leaderboard" className="text-gray-700 hover:text-blue-700 font-medium px-3 py-2 rounded transition">Leaderboard</a>
            <Button variant="ghost" onClick={() => navigate("/auth/register")}>Sign Up</Button>
            <Button onClick={() => navigate("/auth/login")}>Sign In</Button>
          </nav>
        </div>
      </header>
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-8">
        {/* Left: Quiz */}
        <div className="flex-1 min-w-0">
          {/* Summary Bar */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center md:justify-start">
            <div className="px-4 py-2 rounded-lg bg-green-100 text-green-800 font-semibold flex items-center">
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block mr-2"></span>
              Correct: {correctCount}
            </div>
            <div className="px-4 py-2 rounded-lg bg-red-100 text-red-800 font-semibold flex items-center">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block mr-2"></span>
              Wrong: {wrongCount}
            </div>
            <div className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800 font-semibold flex items-center">
              <span className="w-3 h-3 rounded-full bg-gray-400 inline-block mr-2"></span>
              Not Attempted: {notAttemptedCount}
            </div>
          </div>
          <Card className="mb-8 shadow-lg border-0">
            <CardHeader>
              <CardTitle>2 Corinthians Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {secondCorinthiansQuestions.map((q, qIdx) => (
                  <div key={qIdx} className="bg-white/80 rounded-xl p-6 shadow border border-blue-100">
                    <div className="mb-2 text-sm text-blue-600 font-semibold">Chapter {q.chapter}</div>
                    <div className="font-bold text-lg mb-4">{qIdx + 1}. {q.question}</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = selected[qIdx] === oIdx;
                        const isCorrect = q.answer === oIdx;
                        const show = showAnswer[qIdx];
                        return (
                          <button
                            key={oIdx}
                            className={`text-left px-4 py-3 rounded-lg border transition-all font-medium text-base
                              ${show
                                ? isCorrect
                                  ? 'bg-green-100 border-green-400 text-green-800'
                                  : isSelected
                                    ? 'bg-red-100 border-red-400 text-red-700'
                                    : 'bg-gray-100 border-gray-200 text-gray-700'
                                : 'bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-300'}
                            `}
                            disabled={show}
                            onClick={() => handleSelect(qIdx, oIdx)}
                          >
                            {opt}
                            {show && isCorrect && (
                              <span className="ml-2 font-bold text-green-600">✓</span>
                            )}
                            {show && isSelected && !isCorrect && (
                              <span className="ml-2 font-bold text-red-600">✗</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    {showAnswer[qIdx] && (
                      <div className="mt-3 text-sm font-semibold text-green-700">
                        Correct answer: {q.options[q.answer]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Right: Sidebar */}
        <aside className="w-full md:w-80 flex-shrink-0 space-y-8">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg">Next Quizzes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {nextQuizzes.map((quiz) => (
                  <div key={quiz.title} className="bg-blue-50 rounded-lg p-4 flex flex-col gap-1 border border-blue-100 hover:shadow-md transition cursor-pointer" onClick={() => navigate(quiz.link)}>
                    <div className="font-semibold text-blue-800">{quiz.title}</div>
                    <div className="text-sm text-blue-600">{quiz.description}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg">Compete for Prizes!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 text-gray-700 text-sm">Sign in or sign up to join Bible quiz competitions, track your progress, and win exciting rewards.</div>
              <div className="flex gap-2">
                <Button className="flex-1" onClick={() => navigate('/auth/login')}>Sign In</Button>
                <Button className="flex-1" variant="outline" onClick={() => navigate('/auth/register')}>Sign Up</Button>
              </div>
            </CardContent>
          </Card>
        </aside>
      </main>
    </div>
  );
} 