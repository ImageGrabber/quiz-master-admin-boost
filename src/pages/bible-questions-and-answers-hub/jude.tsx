import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "3 John Quiz", description: "Go back to John's third letter.", link: "/bible-questions-and-answers-hub/3-john" },
  { title: "Revelation Quiz", description: "Continue to the Book of Revelation.", link: "/bible-questions-and-answers-hub/revelation" },
  { title: "1 John Quiz", description: "Explore John's first letter.", link: "/bible-questions-and-answers-hub/1-john" }
];

const judeQuestions = [
  { chapter: 1, question: "Who wrote the Book of Jude?", options: ["Jude", "Peter", "Paul", "James"], answer: 0 },
  { chapter: 1, question: "How does Jude identify himself?", options: ["A bondservant of Jesus Christ", "A king", "A prophet", "A teacher"], answer: 0 },
  { chapter: 1, question: "Who is Jude's brother?", options: ["James", "Peter", "Paul", "John"], answer: 0 },
  { chapter: 1, question: "Who are the called?", options: ["Sanctified by God the Father", "The rich", "The wise", "The strong"], answer: 0 },
  { chapter: 1, question: "Who are preserved in Jesus Christ?", options: ["The called", "The rich", "The wise", "The strong"], answer: 0 },
  { chapter: 1, question: "What does Jude wish to be multiplied to the called?", options: ["Mercy, peace, and love", "Wealth and riches", "Wisdom and knowledge", "Strength and power"], answer: 0 },
  { chapter: 1, question: "What was Jude's original intention?", options: ["To write to you about our common salvation", "To write about money", "To write about wisdom", "To write about strength"], answer: 0 },
  { chapter: 1, question: "What did Jude find it necessary to write about?", options: ["Exhorting you to contend earnestly for the faith", "About money", "About wisdom", "About strength"], answer: 0 },
  { chapter: 1, question: "What was once for all delivered to the saints?", options: ["The faith", "Wealth", "Wisdom", "Strength"], answer: 0 },
  { chapter: 1, question: "Who have crept in unnoticed?", options: ["Certain men", "Angels", "Prophets", "Kings"], answer: 0 },
  { chapter: 1, question: "What were these men marked out for?", options: ["This condemnation", "Praise", "Reward", "Honor"], answer: 0 },
  { chapter: 1, question: "What do these men turn the grace of our God into?", options: ["Lewdness", "Goodness", "Wisdom", "Strength"], answer: 0 },
  { chapter: 1, question: "What do these men deny?", options: ["The only Lord God and our Lord Jesus Christ", "Money", "Wisdom", "Strength"], answer: 0 },
  { chapter: 1, question: "What does Jude remind the readers about?", options: ["The Lord, having saved the people out of the land of Egypt", "About money", "About wisdom", "About strength"], answer: 0 },
  { chapter: 1, question: "What did the Lord do to those who did not believe?", options: ["Destroyed them", "Blessed them", "Rewarded them", "Honored them"], answer: 0 },
  { chapter: 1, question: "What did the angels who did not keep their proper domain do?", options: ["Left their own abode", "Stayed in heaven", "Worshipped God", "Served others"], answer: 0 },
  { chapter: 1, question: "What has God reserved for the angels in everlasting chains?", options: ["Under darkness for the judgment of the great day", "Heaven", "Paradise", "Glory"], answer: 0 },
  { chapter: 1, question: "What did Sodom and Gomorrah and the cities around them do?", options: ["Gave themselves over to sexual immorality", "Worshipped God", "Helped others", "Built cities"], answer: 0 },
  { chapter: 1, question: "What are these men like?", options: ["Dreamers", "Prophets", "Teachers", "Kings"], answer: 0 },
  { chapter: 1, question: "What do these men defile?", options: ["The flesh", "The spirit", "The mind", "The heart"], answer: 0 },
  { chapter: 1, question: "What do these men reject?", options: ["Authority", "Money", "Wisdom", "Strength"], answer: 0 },
  { chapter: 1, question: "What do these men speak evil of?", options: ["Dignitaries", "God", "Angels", "Prophets"], answer: 0 },
  { chapter: 1, question: "What did Michael the archangel not dare to do?", options: ["Bring a reviling accusation against the devil", "Fight the devil", "Speak to the devil", "Ignore the devil"], answer: 0 },
  { chapter: 1, question: "What did Michael say to the devil?", options: ["The Lord rebuke you", "I will fight you", "I will ignore you", "I will help you"], answer: 0 },
  { chapter: 1, question: "What do these men speak evil of?", options: ["Whatever they do not know", "What they know", "What they see", "What they hear"], answer: 0 },
  { chapter: 1, question: "What do these men corrupt themselves with?", options: ["Whatever they know naturally", "What they learn", "What they see", "What they hear"], answer: 0 }
];

export default function JudeQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(judeQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(judeQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === judeQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== judeQuestions[i].answer).length;
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
              <CardTitle>Jude Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {judeQuestions.map((q, qIdx) => (
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