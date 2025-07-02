import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "1 Corinthians Quiz", description: "Continue to Paul's letter to the Corinthians.", link: "/bible-questions-and-answers-hub/1-corinthians" },
  { title: "Acts Quiz", description: "Go back to the Book of Acts.", link: "/bible-questions-and-answers-hub/acts" },
  { title: "Galatians Quiz", description: "Explore Paul's letter to the Galatians.", link: "/bible-questions-and-answers-hub/galatians" }
];

const romansQuestions = [
  { chapter: 1, question: "Who wrote the Book of Romans?", options: ["Peter", "Paul", "John", "Luke"], answer: 1 },
  { chapter: 1, question: "What is the main theme of Romans 1:16?", options: ["The power of the gospel", "The law of Moses", "The importance of circumcision", "The role of works"], answer: 0 },
  { chapter: 1, question: "What does Romans 1:17 say about the righteousness of God?", options: ["It is revealed from faith to faith", "It comes through the law", "It is earned by works", "It is hidden from sinners"], answer: 0 },
  { chapter: 2, question: "What does Romans 2:4 say about God's goodness?", options: ["It leads to repentance", "It is only for Jews", "It is conditional", "It is temporary"], answer: 0 },
  { chapter: 3, question: "What does Romans 3:23 state about all people?", options: ["All have sinned and fall short", "All are righteous", "All are saved", "All are condemned"], answer: 0 },
  { chapter: 3, question: "How are we justified according to Romans 3:24?", options: ["By works of the law", "By grace through faith", "By circumcision", "By keeping commandments"], answer: 1 },
  { chapter: 4, question: "Who is used as an example of faith in Romans 4?", options: ["Moses", "Abraham", "David", "Isaac"], answer: 1 },
  { chapter: 4, question: "What was credited to Abraham as righteousness?", options: ["His works", "His faith", "His circumcision", "His obedience"], answer: 1 },
  { chapter: 5, question: "What does Romans 5:1 say we have through faith?", options: ["Peace with God", "Wealth", "Power", "Knowledge"], answer: 0 },
  { chapter: 5, question: "What does Romans 5:8 say about God's love?", options: ["God loves those who love Him", "God demonstrates His love through Christ's death", "God's love is conditional", "God's love is hidden"], answer: 1 },
  { chapter: 6, question: "What does Romans 6:4 say about our new life?", options: ["We walk in newness of life", "We continue in sin", "We are bound by law", "We are free from God"], answer: 0 },
  { chapter: 6, question: "What does Romans 6:23 say is the wages of sin?", options: ["Life", "Death", "Punishment", "Suffering"], answer: 1 },
  { chapter: 6, question: "What is the gift of God according to Romans 6:23?", options: ["Eternal life", "Wealth", "Power", "Knowledge"], answer: 0 },
  { chapter: 7, question: "What does Romans 7:24-25 say about deliverance?", options: ["Through Jesus Christ", "Through the law", "Through works", "Through self-effort"], answer: 0 },
  { chapter: 8, question: "What does Romans 8:1 say about condemnation?", options: ["There is no condemnation for those in Christ", "All are condemned", "Only Jews are free", "Only Gentiles are condemned"], answer: 0 },
  { chapter: 8, question: "What does Romans 8:28 say about all things?", options: ["They work together for good", "They are meaningless", "They are random", "They are bad"], answer: 0 },
  { chapter: 8, question: "What does Romans 8:31 say about God being for us?", options: ["If God is for us, who can be against us?", "God is sometimes for us", "God is against sinners", "God is neutral"], answer: 0 },
  { chapter: 8, question: "What can separate us from God's love according to Romans 8:38-39?", options: ["Nothing", "Sin", "Death", "Angels"], answer: 0 },
  { chapter: 9, question: "What does Romans 9:16 say about salvation?", options: ["It depends on human will", "It depends on God's mercy", "It depends on works", "It depends on race"], answer: 1 },
  { chapter: 10, question: "What does Romans 10:9 say about salvation?", options: ["Confess with mouth, believe in heart", "Keep the law perfectly", "Be circumcised", "Give to the poor"], answer: 0 },
  { chapter: 10, question: "What does Romans 10:13 say about calling on the Lord?", options: ["Whoever calls will be saved", "Only Jews will be saved", "Only the righteous will be saved", "Only the elect will be saved"], answer: 0 },
  { chapter: 12, question: "What does Romans 12:1 say about our bodies?", options: ["Present them as living sacrifices", "Ignore them", "Punish them", "Hide them"], answer: 0 },
  { chapter: 12, question: "What does Romans 12:2 say about transformation?", options: ["Be transformed by renewing your mind", "Be transformed by works", "Be transformed by law", "Be transformed by rituals"], answer: 0 },
  { chapter: 13, question: "What does Romans 13:1 say about governing authorities?", options: ["They are established by God", "They are all evil", "They should be ignored", "They are temporary"], answer: 0 },
  { chapter: 15, question: "What does Romans 15:13 say about hope?", options: ["May the God of hope fill you with joy and peace", "Hope is meaningless", "Hope comes from works", "Hope is temporary"], answer: 0 }
];

export default function RomansQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(romansQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(romansQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === romansQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== romansQuestions[i].answer).length;
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
              <CardTitle>Romans Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {romansQuestions.map((q, qIdx) => (
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