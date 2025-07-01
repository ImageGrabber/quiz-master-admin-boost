import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "2 Samuel Quiz", description: "Continue the story of King David.", link: "/bible-questions-and-answers-hub/2-samuel" },
  { title: "1 Kings Quiz", description: "Learn about Solomon and the divided kingdom.", link: "/bible-questions-and-answers-hub/1-kings" },
  { title: "Ruth Quiz", description: "Go back to the beautiful story of Ruth.", link: "/bible-questions-and-answers-hub/ruth" },
  { title: "Judges Quiz", description: "Review the time of the judges.", link: "/bible-questions-and-answers-hub/judges" }
];

const firstSamuelQuestions = [
  { chapter: 1, question: "Who was Samuel's mother?", options: ["Hannah", "Peninnah", "Ruth", "Naomi"], answer: 0 },
  { chapter: 1, question: "What did Hannah pray for?", options: ["A son", "A daughter", "Wealth", "Health"], answer: 0 },
  { chapter: 2, question: "What is 1 Samuel 2 called?", options: ["Hannah's Song", "Mary's Song", "Deborah's Song", "Miriam's Song"], answer: 0 },
  { chapter: 3, question: "How many times did God call Samuel?", options: ["1", "2", "3", "4"], answer: 2 },
  { chapter: 4, question: "What happened to the Ark of the Covenant?", options: ["It was captured", "It was destroyed", "It was hidden", "It was moved"], answer: 0 },
  { chapter: 5, question: "What happened to the Philistines when they had the Ark?", options: ["They prospered", "They were plagued", "Nothing", "They worshipped it"], answer: 1 },
  { chapter: 7, question: "What did Samuel do to help Israel defeat the Philistines?", options: ["Built a wall", "Offered a sacrifice", "Prayed", "Led the army"], answer: 1 },
  { chapter: 8, question: "What did the Israelites ask for?", options: ["A judge", "A king", "A prophet", "A priest"], answer: 1 },
  { chapter: 9, question: "Who was Saul's father?", options: ["Kish", "Abner", "Ner", "Jesse"], answer: 0 },
  { chapter: 10, question: "What happened when Samuel anointed Saul?", options: ["He became king", "The Spirit came upon him", "He was crowned", "He was rejected"], answer: 1 },
  { chapter: 11, question: "Who threatened to gouge out the right eye of the men of Jabesh?", options: ["Nahash", "Saul", "David", "Goliath"], answer: 0 },
  { chapter: 13, question: "What sin did Saul commit?", options: ["Offered sacrifice", "Killed someone", "Stole", "Lied"], answer: 0 },
  { chapter: 14, question: "Who was Saul's son that David loved?", options: ["Jonathan", "Ishbosheth", "Abner", "Mephibosheth"], answer: 0 },
  { chapter: 15, question: "What did Saul fail to do with the Amalekites?", options: ["Defeat them", "Destroy them completely", "Make peace", "Capture them"], answer: 1 },
  { chapter: 16, question: "Who was David's father?", options: ["Jesse", "Boaz", "Obed", "Salmon"], answer: 0 },
  { chapter: 16, question: "What did Samuel do to David?", options: ["Made him king", "Anointed him", "Crowned him", "Blessed him"], answer: 1 },
  { chapter: 17, question: "How tall was Goliath?", options: ["6 cubits", "7 cubits", "8 cubits", "9 cubits"], answer: 0 },
  { chapter: 17, question: "What weapon did David use against Goliath?", options: ["A sword", "A sling and stone", "A spear", "A bow"], answer: 1 },
  { chapter: 18, question: "What did Saul give David for killing Goliath?", options: ["His daughter", "His armor", "His sword", "His crown"], answer: 0 },
  { chapter: 19, question: "Who helped David escape from Saul?", options: ["Jonathan", "Michal", "Samuel", "All of these"], answer: 3 },
  { chapter: 20, question: "What sign did Jonathan give David?", options: ["A dove", "An arrow", "A stone", "A flag"], answer: 1 },
  { chapter: 21, question: "What did David take from the priest at Nob?", options: ["The showbread", "The Ark", "The ephod", "The sword"], answer: 0 },
  { chapter: 22, question: "Who betrayed David to Saul?", options: ["Doeg", "Ahimelech", "Abiathar", "Jonathan"], answer: 0 },
  { chapter: 23, question: "Where did David hide from Saul?", options: ["In the wilderness", "In Egypt", "In Moab", "In Philistia"], answer: 0 },
  { chapter: 24, question: "What did David do when he had the chance to kill Saul?", options: ["Killed him", "Cut off his robe", "Spared him", "Captured him"], answer: 1 },
  { chapter: 25, question: "Who was Abigail's first husband?", options: ["Nabal", "David", "Saul", "Jonathan"], answer: 0 },
  { chapter: 26, question: "What did David take from Saul while he slept?", options: ["His crown", "His spear", "His sword", "His robe"], answer: 1 },
  { chapter: 28, question: "Who did Saul consult at Endor?", options: ["A prophet", "A medium", "A priest", "A wise man"], answer: 1 },
  { chapter: 31, question: "How did Saul die?", options: ["In battle", "By suicide", "Of old age", "By assassination"], answer: 1 }
];

export default function FirstSamuelQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(firstSamuelQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(firstSamuelQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === firstSamuelQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== firstSamuelQuestions[i].answer).length;
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
              <CardTitle>1 Samuel Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {firstSamuelQuestions.map((q, qIdx) => (
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