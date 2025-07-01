import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "2 Kings Quiz", description: "Continue the story of the divided kingdom.", link: "/bible-questions-and-answers-hub/2-kings" },
  { title: "1 Chronicles Quiz", description: "Learn about the genealogies and David's reign.", link: "/bible-questions-and-answers-hub/1-chronicles" },
  { title: "2 Samuel Quiz", description: "Go back to David's reign.", link: "/bible-questions-and-answers-hub/2-samuel" },
  { title: "Ruth Quiz", description: "Review the story of David's ancestors.", link: "/bible-questions-and-answers-hub/ruth" }
];

const firstKingsQuestions = [
  { chapter: 1, question: "Who tried to make himself king instead of Solomon?", options: ["Adonijah", "Absalom", "Amnon", "Amasa"], answer: 0 },
  { chapter: 1, question: "Who was Bathsheba's son?", options: ["Solomon", "Adonijah", "Absalom", "Amnon"], answer: 0 },
  { chapter: 2, question: "What did David tell Solomon to do to Joab?", options: ["Promote him", "Kill him", "Exile him", "Forgive him"], answer: 1 },
  { chapter: 3, question: "What did Solomon ask God for?", options: ["Wealth", "Wisdom", "Long life", "Victory"], answer: 1 },
  { chapter: 3, question: "What was the famous case of the two women and the baby about?", options: ["Theft", "Murder", "Child custody", "Property"], answer: 2 },
  { chapter: 4, question: "How many districts did Solomon divide Israel into?", options: ["10", "11", "12", "13"], answer: 2 },
  { chapter: 5, question: "Who helped Solomon build the temple?", options: ["Hiram of Tyre", "Pharaoh", "The Philistines", "The Ammonites"], answer: 0 },
  { chapter: 6, question: "How long did it take to build the temple?", options: ["3 years", "5 years", "7 years", "10 years"], answer: 2 },
  { chapter: 7, question: "How long did it take to build Solomon's palace?", options: ["7 years", "10 years", "13 years", "15 years"], answer: 2 },
  { chapter: 8, question: "What happened when the Ark was brought into the temple?", options: ["Fire came down", "The cloud filled the temple", "Earthquake", "Nothing"], answer: 1 },
  { chapter: 9, question: "What did God promise Solomon about the temple?", options: ["It would last forever", "His eyes would be there", "It would be destroyed", "It would be moved"], answer: 1 },
  { chapter: 10, question: "Who came to test Solomon with hard questions?", options: ["The Queen of Sheba", "The Queen of Egypt", "The Queen of Ethiopia", "The Queen of Arabia"], answer: 0 },
  { chapter: 11, question: "How many wives did Solomon have?", options: ["300", "500", "700", "1000"], answer: 2 },
  { chapter: 11, question: "What did Solomon's foreign wives lead him to do?", options: ["Worship other gods", "Build more cities", "Make more alliances", "Write more books"], answer: 0 },
  { chapter: 12, question: "Who succeeded Solomon as king?", options: ["Rehoboam", "Jeroboam", "Abijah", "Asa"], answer: 0 },
  { chapter: 12, question: "What did Rehoboam say to the people about his rule?", options: ["I will be kind", "I will be harsh", "I will be fair", "I will be weak"], answer: 1 },
  { chapter: 12, question: "Which tribes remained loyal to Rehoboam?", options: ["Judah and Benjamin", "Ephraim and Manasseh", "Dan and Naphtali", "All tribes"], answer: 0 },
  { chapter: 13, question: "Who was the first king of the northern kingdom?", options: ["Rehoboam", "Jeroboam", "Nadab", "Baasha"], answer: 1 },
  { chapter: 14, question: "What did Jeroboam's son become?", options: ["King", "Priest", "Prophet", "Sick"], answer: 3 },
  { chapter: 15, question: "Who was Asa's father?", options: ["Rehoboam", "Abijah", "Jehoshaphat", "Jehoram"], answer: 1 },
  { chapter: 16, question: "Who killed Baasha's son Elah?", options: ["Zimri", "Omri", "Ahab", "Jehu"], answer: 0 },
  { chapter: 16, question: "How long did Zimri reign?", options: ["1 day", "7 days", "1 month", "1 year"], answer: 1 },
  { chapter: 17, question: "Who was the prophet during Ahab's reign?", options: ["Elijah", "Elisha", "Isaiah", "Jeremiah"], answer: 0 },
  { chapter: 17, question: "Where did Elijah hide during the drought?", options: ["Mount Carmel", "Mount Sinai", "Cherith Brook", "Jordan River"], answer: 2 },
  { chapter: 18, question: "How many prophets of Baal did Elijah challenge?", options: ["50", "100", "250", "450"], answer: 3 },
  { chapter: 18, question: "What happened on Mount Carmel?", options: ["Fire from heaven", "Rain", "Earthquake", "Wind"], answer: 0 },
  { chapter: 19, question: "Where did God speak to Elijah in a still small voice?", options: ["Mount Carmel", "Mount Horeb", "Mount Sinai", "Mount Zion"], answer: 1 },
  { chapter: 20, question: "Who was Ahab's wife?", options: ["Jezebel", "Athaliah", "Zibiah", "Abigail"], answer: 0 },
  { chapter: 21, question: "What did Ahab want from Naboth?", options: ["His vineyard", "His house", "His money", "His daughter"], answer: 0 },
  { chapter: 22, question: "How did Ahab die?", options: ["In battle", "By assassination", "Of old age", "By disease"], answer: 0 }
];

export default function FirstKingsQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(firstKingsQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(firstKingsQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === firstKingsQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== firstKingsQuestions[i].answer).length;
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
              <CardTitle>1 Kings Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {firstKingsQuestions.map((q, qIdx) => (
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