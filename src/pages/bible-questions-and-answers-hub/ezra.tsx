import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Nehemiah Quiz", description: "Discover the rebuilding of Jerusalem's walls.", link: "/bible-questions-and-answers-hub/nehemiah" },
  { title: "Esther Quiz", description: "Learn about the Jewish queen in Persia.", link: "/bible-questions-and-answers-hub/esther" },
  { title: "2 Chronicles Quiz", description: "Go back to the end of the kingdom.", link: "/bible-questions-and-answers-hub/2-chronicles" },
  { title: "1 Chronicles Quiz", description: "Review David's reign.", link: "/bible-questions-and-answers-hub/1-chronicles" }
];

const ezraQuestions = [
  { chapter: 1, question: "Who issued the decree to rebuild the temple?", options: ["Cyrus", "Darius", "Artaxerxes", "Xerxes"], answer: 0 },
  { chapter: 1, question: "What did Cyrus return to the Jews?", options: ["Gold", "Silver", "Temple vessels", "Land"], answer: 2 },
  { chapter: 2, question: "Who led the first group of exiles back to Jerusalem?", options: ["Ezra", "Nehemiah", "Zerubbabel", "Joshua"], answer: 2 },
  { chapter: 2, question: "How many people returned in the first group?", options: ["About 30,000", "About 40,000", "About 50,000", "About 60,000"], answer: 2 },
  { chapter: 3, question: "What did they build first when they returned?", options: ["The temple", "The altar", "The walls", "The palace"], answer: 1 },
  { chapter: 3, question: "What did they celebrate when the foundation was laid?", options: ["Passover", "Tabernacles", "Trumpets", "Pentecost"], answer: 2 },
  { chapter: 4, question: "Who opposed the rebuilding of the temple?", options: ["The Samaritans", "The Egyptians", "The Babylonians", "The Assyrians"], answer: 0 },
  { chapter: 4, question: "What did the enemies do to stop the work?", options: ["Attacked them", "Wrote letters to the king", "Bribed officials", "All of these"], answer: 3 },
  { chapter: 5, question: "Who encouraged the people to continue building?", options: ["Haggai", "Zechariah", "Both prophets", "The king"], answer: 2 },
  { chapter: 6, question: "Who ordered the temple to be completed?", options: ["Cyrus", "Darius", "Artaxerxes", "Xerxes"], answer: 1 },
  { chapter: 6, question: "When was the temple completed?", options: ["In the 2nd year", "In the 4th year", "In the 6th year", "In the 8th year"], answer: 2 },
  { chapter: 7, question: "Who was Ezra?", options: ["A priest", "A scribe", "A prophet", "All of these"], answer: 3 },
  { chapter: 7, question: "What did Artaxerxes give Ezra permission to do?", options: ["Rebuild the temple", "Rebuild the walls", "Teach the law", "All of these"], answer: 2 },
  { chapter: 8, question: "How many people went with Ezra to Jerusalem?", options: ["About 1,500", "About 2,000", "About 5,000", "About 10,000"], answer: 0 },
  { chapter: 8, question: "What did Ezra proclaim before the journey?", options: ["A fast", "A feast", "A sacrifice", "A celebration"], answer: 0 },
  { chapter: 9, question: "What problem did Ezra discover in Jerusalem?", options: ["Poverty", "Intermarriage with foreigners", "Idolatry", "Rebellion"], answer: 1 },
  { chapter: 9, question: "What did Ezra do when he heard about the problem?", options: ["Prayed", "Tore his clothes", "Pulled his hair", "All of these"], answer: 3 },
  { chapter: 10, question: "What did the people agree to do?", options: ["Send away foreign wives", "Pay a fine", "Make sacrifices", "Fast"], answer: 0 },
  { chapter: 10, question: "How long did it take to complete this task?", options: ["1 month", "2 months", "3 months", "4 months"], answer: 2 }
];

export default function EzraQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(ezraQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(ezraQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === ezraQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== ezraQuestions[i].answer).length;
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
              <CardTitle>Ezra Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {ezraQuestions.map((q, qIdx) => (
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