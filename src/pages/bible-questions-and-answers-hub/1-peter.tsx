import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "2 Peter Quiz", description: "Continue to Peter's second letter.", link: "/bible-questions-and-answers-hub/2-peter" },
  { title: "James Quiz", description: "Go back to the Book of James.", link: "/bible-questions-and-answers-hub/james" },
  { title: "1 John Quiz", description: "Explore John's first letter.", link: "/bible-questions-and-answers-hub/1-john" }
];

const firstPeterQuestions = [
  { chapter: 1, question: "Who wrote the Book of 1 Peter?", options: ["Peter", "Paul", "John", "James"], answer: 0 },
  { chapter: 1, question: "What does 1 Peter 1:3 say about God?", options: ["Blessed be the God and Father of our Lord Jesus Christ", "God is angry", "God is distant", "God is silent"], answer: 0 },
  { chapter: 1, question: "What has God given us through His mercy?", options: ["A living hope", "A dead hope", "No hope", "False hope"], answer: 0 },
  { chapter: 1, question: "What is the inheritance described as?", options: ["Imperishable, undefiled, and unfading", "Perishable and fading", "Defiled and fading", "Temporary and weak"], answer: 0 },
  { chapter: 1, question: "What are believers kept by?", options: ["The power of God", "Their own strength", "The world", "Their works"], answer: 0 },
  { chapter: 1, question: "What does 1 Peter 1:7 say about trials?", options: ["They test the genuineness of your faith", "They destroy faith", "They are meaningless", "They are punishments"], answer: 0 },
  { chapter: 1, question: "What is more precious than gold?", options: ["Faith", "Wealth", "Wisdom", "Strength"], answer: 0 },
  { chapter: 1, question: "What do the prophets search and inquire about?", options: ["The grace that would come to you", "The past", "The present", "The world"], answer: 0 },
  { chapter: 1, question: "What does 1 Peter 1:13 say to do?", options: ["Gird up the loins of your mind", "Relax your mind", "Empty your mind", "Close your mind"], answer: 0 },
  { chapter: 1, question: "What should believers be?", options: ["Holy in all your conduct", "Like the world", "Careless", "Indifferent"], answer: 0 },
  { chapter: 1, question: "What was used to redeem believers?", options: ["Precious blood of Christ", "Silver and gold", "Good works", "Human effort"], answer: 0 },
  { chapter: 1, question: "What was foreknown before the foundation of the world?", options: ["Christ", "The church", "The law", "The prophets"], answer: 0 },
  { chapter: 1, question: "What does 1 Peter 1:23 say about being born again?", options: ["Not of corruptible seed, but incorruptible", "Of corruptible seed", "Of human seed", "Of earthly seed"], answer: 0 },
  { chapter: 1, question: "What endures forever?", options: ["The word of God", "The world", "Human wisdom", "Earthly things"], answer: 0 },
  { chapter: 2, question: "What should believers lay aside?", options: ["All malice, all deceit, hypocrisy, envy", "Good works", "Faith", "Hope"], answer: 0 },
  { chapter: 2, question: "What does 1 Peter 2:2 say to desire?", options: ["Pure milk of the word", "Worldly wisdom", "Human praise", "Earthly riches"], answer: 0 },
  { chapter: 2, question: "What are believers called?", options: ["A chosen generation, a royal priesthood", "A rejected people", "A worldly people", "A sinful people"], answer: 0 },
  { chapter: 2, question: "What should believers proclaim?", options: ["The praises of Him who called you", "Their own works", "Worldly wisdom", "Human achievements"], answer: 0 },
  { chapter: 2, question: "What does 1 Peter 2:9 say believers are?", options: ["A peculiar people", "A common people", "A worldly people", "A sinful people"], answer: 0 },
  { chapter: 2, question: "What should believers submit to?", options: ["Every ordinance of man", "Only good rulers", "No one", "Only the church"], answer: 0 },
  { chapter: 2, question: "What is the will of God?", options: ["That by doing good you may put to silence the ignorance of foolish men", "That you rebel", "That you hide", "That you complain"], answer: 0 },
  { chapter: 2, question: "What example does Peter give for suffering?", options: ["Christ", "Moses", "David", "Elijah"], answer: 0 },
  { chapter: 2, question: "What did Christ do when He was reviled?", options: ["Did not revile in return", "Reviled back", "Fought back", "Ran away"], answer: 0 },
  { chapter: 2, question: "What did Christ do when He suffered?", options: ["Did not threaten", "Threatened back", "Fought back", "Complained"], answer: 0 },
  { chapter: 2, question: "What did Christ do with our sins?", options: ["Bore them in His own body", "Ignored them", "Forgot them", "Left them"], answer: 0 }
];

export default function FirstPeterQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(firstPeterQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(firstPeterQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === firstPeterQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== firstPeterQuestions[i].answer).length;
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
              <CardTitle>1 Peter Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {firstPeterQuestions.map((q, qIdx) => (
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