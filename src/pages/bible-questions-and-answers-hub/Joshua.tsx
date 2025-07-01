import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Judges Quiz", description: "Test your knowledge of the Book of Judges!", link: "/bible-questions-and-answers-hub/judges" },
  { title: "Ruth Quiz", description: "Explore the beautiful story of Ruth.", link: "/bible-questions-and-answers-hub/ruth" },
  { title: "1 Samuel Quiz", description: "Learn about Samuel, Saul, and David.", link: "/bible-questions-and-answers-hub/1-samuel" },
  { title: "Deuteronomy Quiz", description: "Go back to the last book of the Law.", link: "/bible-questions-and-answers-hub/deuteronomy" }
];

const joshuaQuestions = [
  { chapter: 1, question: "Who became the leader after Moses died?", options: ["Caleb", "Joshua", "Aaron", "Eleazar"], answer: 1 },
  { chapter: 2, question: "Who hid the spies in Jericho?", options: ["Rahab", "Deborah", "Jael", "Miriam"], answer: 0 },
  { chapter: 3, question: "How did the Israelites cross the Jordan River?", options: ["By boat", "On dry ground", "By bridge", "By swimming"], answer: 1 },
  { chapter: 4, question: "What did Joshua set up as a memorial at Gilgal?", options: ["An altar", "12 stones", "A pillar", "A tent"], answer: 1 },
  { chapter: 5, question: "What did the Israelites do at Gilgal?", options: ["Built a city", "Were circumcised", "Made sacrifices", "Planted crops"], answer: 1 },
  { chapter: 6, question: "How many days did the Israelites march around Jericho?", options: ["3 days", "6 days", "7 days", "10 days"], answer: 2 },
  { chapter: 7, question: "Who sinned by taking devoted things from Jericho?", options: ["Achan", "Joshua", "Caleb", "Eleazar"], answer: 0 },
  { chapter: 8, question: "What happened to Ai after the ambush?", options: ["It surrendered", "It was destroyed", "It fled", "It made peace"], answer: 1 },
  { chapter: 9, question: "Who deceived Joshua by pretending to be from far away?", options: ["The Gibeonites", "The Amorites", "The Canaanites", "The Hittites"], answer: 0 },
  { chapter: 10, question: "What miracle happened during the battle with the Amorites?", options: ["The sun stood still", "The moon fell", "The stars disappeared", "The earth shook"], answer: 0 },
  { chapter: 11, question: "Who was the king of Hazor?", options: ["Jabin", "Adoni-zedek", "Hoham", "Piram"], answer: 0 },
  { chapter: 13, question: "What did God tell Joshua about the remaining land?", options: ["It was already conquered", "He would give it to Joshua", "It was too difficult", "It belonged to others"], answer: 1 },
  { chapter: 14, question: "Who asked for Hebron as his inheritance?", options: ["Joshua", "Caleb", "Eleazar", "Phinehas"], answer: 1 },
  { chapter: 15, question: "Which tribe received the largest territory?", options: ["Judah", "Ephraim", "Manasseh", "Benjamin"], answer: 0 },
  { chapter: 18, question: "Where did Joshua set up the tabernacle?", options: ["Jerusalem", "Shiloh", "Bethel", "Gilgal"], answer: 1 },
  { chapter: 20, question: "What were the cities of refuge for?", options: ["Priests", "Lepers", "Accidental killers", "Foreigners"], answer: 2 },
  { chapter: 21, question: "How many cities were given to the Levites?", options: ["12", "24", "48", "72"], answer: 2 },
  { chapter: 22, question: "What did the eastern tribes build that caused concern?", options: ["An altar", "A tower", "A wall", "A temple"], answer: 0 },
  { chapter: 23, question: "What did Joshua warn Israel about?", options: ["Famine", "War", "Mixing with other nations", "Disease"], answer: 2 },
  { chapter: 24, question: "Where did Joshua make his final speech?", options: ["Shechem", "Shiloh", "Gilgal", "Jerusalem"], answer: 0 },
  { chapter: 24, question: "What did Joshua say about serving God?", options: ["Choose this day", "Wait and see", "Follow Moses", "Ask the priests"], answer: 0 }
];

export default function JoshuaQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(joshuaQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(joshuaQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === joshuaQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== joshuaQuestions[i].answer).length;
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
              <CardTitle>Joshua Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {joshuaQuestions.map((q, qIdx) => (
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