import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Genesis Quiz", description: "Go back to the beginning with Genesis!", link: "/bible-questions-and-answers-hub/genesis" },
  { title: "Exodus Quiz", description: "Test your knowledge of Exodus!", link: "/bible-questions-and-answers-hub/exodus" },
  { title: "Leviticus Quiz", description: "Challenge yourself with Leviticus questions.", link: "/bible-questions-and-answers-hub/leviticus" },
  { title: "Numbers Quiz", description: "Explore the Book of Numbers in quiz form.", link: "/bible-questions-and-answers-hub/numbers" }
];

const deuteronomyQuestions = [
  { chapter: 1, question: "Who is the main speaker in Deuteronomy?", options: ["Joshua", "Moses", "Aaron", "Caleb"], answer: 1 },
  { chapter: 2, question: "What land did God give to Esau?", options: ["Moab", "Edom", "Canaan", "Egypt"], answer: 1 },
  { chapter: 4, question: "What did Moses urge Israel to obey?", options: ["The king", "The law", "The priests", "The prophets"], answer: 1 },
  { chapter: 5, question: "Where are the Ten Commandments repeated?", options: ["Deuteronomy 5", "Deuteronomy 10", "Deuteronomy 20", "Deuteronomy 30"], answer: 0 },
  { chapter: 6, question: "What is the 'Shema'?", options: ["A festival", "A prayer: 'Hear, O Israel'", "A sacrifice", "A city"], answer: 1 },
  { chapter: 7, question: "What were the Israelites to do with the Canaanite idols?", options: ["Worship them", "Ignore them", "Destroy them", "Sell them"], answer: 2 },
  { chapter: 8, question: "What did God provide in the wilderness?", options: ["Manna", "Quail", "Water", "All of these"], answer: 3 },
  { chapter: 9, question: "Why did God drive out the nations before Israel?", options: ["Israel's righteousness", "The nations' wickedness", "Israel's strength", "Their numbers"], answer: 1 },
  { chapter: 10, question: "What did God require of Israel?", options: ["Sacrifices", "Fear, love, and serve Him", "Wealth", "Kingship"], answer: 1 },
  { chapter: 11, question: "What would obedience bring?", options: ["Curses", "Blessings", "Exile", "Famine"], answer: 1 },
  { chapter: 13, question: "What was the penalty for false prophets?", options: ["Exile", "Death", "Fines", "Imprisonment"], answer: 1 },
  { chapter: 14, question: "What animals were clean to eat?", options: ["Camel", "Pig", "Sheep", "Rabbit"], answer: 2 },
  { chapter: 16, question: "Which festival is NOT mentioned in Deuteronomy 16?", options: ["Passover", "Feast of Weeks", "Feast of Booths", "Hanukkah"], answer: 3 },
  { chapter: 17, question: "What was the punishment for idolatry?", options: ["Exile", "Death", "Fines", "Imprisonment"], answer: 1 },
  { chapter: 18, question: "Who was not to receive land inheritance?", options: ["Levites", "Judah", "Reuben", "Dan"], answer: 0 },
  { chapter: 20, question: "What were the Israelites to offer before attacking a city?", options: ["Peace", "Gold", "Sacrifice", "Slaves"], answer: 0 },
  { chapter: 22, question: "What law is found in Deuteronomy 22:8?", options: ["Build a parapet on your roof", "Do not steal", "Honor your parents", "Keep the Sabbath"], answer: 0 },
  { chapter: 24, question: "What was required for divorce?", options: ["A sacrifice", "A certificate", "A witness", "A prayer"], answer: 1 },
  { chapter: 27, question: "Where were the curses to be pronounced?", options: ["Mount Sinai", "Mount Ebal", "Mount Zion", "Mount Carmel"], answer: 1 },
  { chapter: 28, question: "What does Deuteronomy 28 list?", options: ["Blessings and curses", "Kings", "Prophets", "Priests"], answer: 0 },
  { chapter: 30, question: "What choice does God set before Israel?", options: ["Life and death", "Riches and poverty", "Kingship and slavery", "Peace and war"], answer: 0 },
  { chapter: 31, question: "Who would lead Israel after Moses?", options: ["Aaron", "Joshua", "Caleb", "Eleazar"], answer: 1 },
  { chapter: 34, question: "Where did Moses die?", options: ["Mount Sinai", "Mount Nebo", "Mount Carmel", "Mount Zion"], answer: 1 }
];

export default function DeuteronomyQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(deuteronomyQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(deuteronomyQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === deuteronomyQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== deuteronomyQuestions[i].answer).length;
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
              <CardTitle>Deuteronomy Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {deuteronomyQuestions.map((q, qIdx) => (
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