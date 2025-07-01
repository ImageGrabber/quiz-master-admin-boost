import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "1 Kings Quiz", description: "Learn about Solomon and the divided kingdom.", link: "/bible-questions-and-answers-hub/1-kings" },
  { title: "2 Kings Quiz", description: "Continue the story of the divided kingdom.", link: "/bible-questions-and-answers-hub/2-kings" },
  { title: "1 Samuel Quiz", description: "Go back to the beginning of David's story.", link: "/bible-questions-and-answers-hub/1-samuel" },
  { title: "Ruth Quiz", description: "Review the story of David's ancestors.", link: "/bible-questions-and-answers-hub/ruth" }
];

const secondSamuelQuestions = [
  { chapter: 1, question: "Who brought news of Saul's death to David?", options: ["An Amalekite", "A Philistine", "An Israelite", "A messenger"], answer: 0 },
  { chapter: 2, question: "Who was made king over Israel after Saul?", options: ["David", "Ishbosheth", "Abner", "Joab"], answer: 1 },
  { chapter: 3, question: "Who was Abner?", options: ["Saul's son", "Saul's commander", "David's son", "A prophet"], answer: 1 },
  { chapter: 4, question: "Who killed Ishbosheth?", options: ["Joab", "Abner", "Rechab and Baanah", "David"], answer: 2 },
  { chapter: 5, question: "How long did David reign over all Israel?", options: ["20 years", "30 years", "40 years", "50 years"], answer: 2 },
  { chapter: 5, question: "What city did David capture and make his capital?", options: ["Jerusalem", "Hebron", "Bethlehem", "Samaria"], answer: 0 },
  { chapter: 6, question: "What happened to Uzzah when he touched the Ark?", options: ["He was blessed", "He died", "He was healed", "Nothing"], answer: 1 },
  { chapter: 7, question: "What did God promise David?", options: ["A temple", "A dynasty", "Victory", "Wealth"], answer: 1 },
  { chapter: 8, question: "Who did David defeat to gain control of Edom?", options: ["The Philistines", "The Moabites", "The Ammonites", "The Arameans"], answer: 0 },
  { chapter: 9, question: "Who was Mephibosheth?", options: ["David's son", "Jonathan's son", "Saul's son", "A servant"], answer: 1 },
  { chapter: 10, question: "What did the Ammonites do to David's messengers?", options: ["Killed them", "Shaved their beards", "Imprisoned them", "Sent them back"], answer: 1 },
  { chapter: 11, question: "Who was Bathsheba's husband?", options: ["Uriah", "Joab", "Abner", "Ahithophel"], answer: 0 },
  { chapter: 11, question: "What did David do to Uriah?", options: ["Promoted him", "Killed him", "Banished him", "Forgave him"], answer: 1 },
  { chapter: 12, question: "Who confronted David about his sin?", options: ["Nathan", "Samuel", "Gad", "Ahithophel"], answer: 0 },
  { chapter: 12, question: "What happened to David and Bathsheba's first child?", options: ["He lived", "He died", "He was adopted", "He was exiled"], answer: 1 },
  { chapter: 13, question: "Who raped his sister Tamar?", options: ["Absalom", "Amnon", "Adonijah", "Solomon"], answer: 1 },
  { chapter: 14, question: "Who helped Absalom return to Jerusalem?", options: ["Joab", "Nathan", "Ahithophel", "Hushai"], answer: 0 },
  { chapter: 15, question: "What did Absalom do to win the hearts of the people?", options: ["Gave them money", "Judged their cases", "Built cities", "Fought battles"], answer: 1 },
  { chapter: 16, question: "Who cursed David as he fled?", options: ["Shimei", "Ahithophel", "Hushai", "Ziba"], answer: 0 },
  { chapter: 17, question: "What advice did Ahithophel give Absalom?", options: ["Make peace", "Pursue David", "Wait", "Flee"], answer: 1 },
  { chapter: 18, question: "How did Absalom die?", options: ["In battle", "By hanging", "By drowning", "By disease"], answer: 1 },
  { chapter: 19, question: "Who wanted to kill Shimei for cursing David?", options: ["Joab", "Abishai", "Amasa", "All of these"], answer: 1 },
  { chapter: 20, question: "Who led a rebellion against David?", options: ["Sheba", "Absalom", "Adonijah", "Amnon"], answer: 0 },
  { chapter: 21, question: "What did the Gibeonites ask for to avenge Saul?", options: ["Money", "Seven of Saul's descendants", "Land", "Servants"], answer: 1 },
  { chapter: 22, question: "What is 2 Samuel 22 called?", options: ["David's Song", "David's Prayer", "David's Psalm", "David's Lament"], answer: 0 },
  { chapter: 23, question: "Who were David's mighty men?", options: ["His sons", "His warriors", "His advisors", "His priests"], answer: 1 },
  { chapter: 24, question: "What sin did David commit by taking a census?", options: ["Pride", "Theft", "Murder", "Idolatry"], answer: 0 },
  { chapter: 24, question: "Where did David build an altar to stop the plague?", options: ["Mount Moriah", "Mount Sinai", "Mount Carmel", "Mount Zion"], answer: 0 }
];

export default function SecondSamuelQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(secondSamuelQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(secondSamuelQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === secondSamuelQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== secondSamuelQuestions[i].answer).length;
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
              <CardTitle>2 Samuel Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {secondSamuelQuestions.map((q, qIdx) => (
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