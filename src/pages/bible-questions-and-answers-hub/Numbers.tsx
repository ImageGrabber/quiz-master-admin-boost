import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Deuteronomy Quiz", description: "How well do you know Deuteronomy?", link: "/bible-questions-and-answers-hub/deuteronomy" },
  { title: "Genesis Quiz", description: "Go back to the beginning with Genesis!", link: "/bible-questions-and-answers-hub/genesis" },
  { title: "Exodus Quiz", description: "Test your knowledge of Exodus!", link: "/bible-questions-and-answers-hub/exodus" },
  { title: "Leviticus Quiz", description: "Challenge yourself with Leviticus questions.", link: "/bible-questions-and-answers-hub/leviticus" }
];

const numbersQuestions = [
  { chapter: 1, question: "What was the main purpose of the census in Numbers 1?", options: ["To count the Levites", "To organize the army", "To collect taxes", "To divide the land"], answer: 1 },
  { chapter: 2, question: "How were the Israelites arranged around the tabernacle?", options: ["By tribe", "By age", "By height", "By wealth"], answer: 0 },
  { chapter: 3, question: "Which tribe was set apart for the priesthood?", options: ["Judah", "Levi", "Reuben", "Dan"], answer: 1 },
  { chapter: 6, question: "What vow is described in Numbers 6?", options: ["Nazirite vow", "Priestly vow", "Marriage vow", "Vow of silence"], answer: 0 },
  { chapter: 9, question: "What guided the Israelites by night?", options: ["A pillar of fire", "A pillar of cloud", "A star", "An angel"], answer: 0 },
  { chapter: 11, question: "What did the Israelites complain about in the desert?", options: ["Water", "Meat", "Shelter", "Gold"], answer: 1 },
  { chapter: 12, question: "Who spoke against Moses because of his Cushite wife?", options: ["Aaron and Miriam", "Joshua and Caleb", "Korah and Dathan", "Pharaoh"], answer: 0 },
  { chapter: 13, question: "How many spies were sent to Canaan?", options: ["2", "10", "12", "40"], answer: 2 },
  { chapter: 14, question: "Who encouraged the Israelites to trust God and enter Canaan?", options: ["Moses and Aaron", "Joshua and Caleb", "Korah and Dathan", "Pharaoh"], answer: 1 },
  { chapter: 16, question: "Who led a rebellion against Moses?", options: ["Aaron", "Korah", "Joshua", "Balaam"], answer: 1 },
  { chapter: 17, question: "What budded to show God's chosen priest?", options: ["Moses' staff", "Aaron's staff", "A fig tree", "A vine"], answer: 1 },
  { chapter: 20, question: "Why was Moses not allowed to enter the Promised Land?", options: ["He doubted God", "He struck the rock", "He was too old", "He was afraid"], answer: 1 },
  { chapter: 21, question: "What did God send to punish the Israelites for complaining?", options: ["Fire", "Snakes", "Locusts", "Hail"], answer: 1 },
  { chapter: 22, question: "Who was the prophet hired to curse Israel?", options: ["Balaam", "Balak", "Jethro", "Aaron"], answer: 0 },
  { chapter: 22, question: "What unusual thing did Balaam's donkey do?", options: ["Flew", "Talked", "Died", "Ran away"], answer: 1 },
  { chapter: 25, question: "What sin did Israel commit at Peor?", options: ["Idolatry", "Murder", "Stealing", "Lying"], answer: 0 },
  { chapter: 27, question: "Who was chosen to succeed Moses?", options: ["Aaron", "Joshua", "Caleb", "Eleazar"], answer: 1 },
  { chapter: 31, question: "Who led the army against the Midianites?", options: ["Moses", "Joshua", "Phinehas", "Aaron"], answer: 2 },
  { chapter: 33, question: "What does Numbers 33 list?", options: ["Tribes", "Journeys of Israel", "Sacrifices", "Laws"], answer: 1 },
  { chapter: 35, question: "What were the cities of refuge for?", options: ["Priests", "Lepers", "Accidental killers", "Foreigners"], answer: 2 }
];

export default function NumbersQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(numbersQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(numbersQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === numbersQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== numbersQuestions[i].answer).length;
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
              <CardTitle>Numbers Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {numbersQuestions.map((q, qIdx) => (
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