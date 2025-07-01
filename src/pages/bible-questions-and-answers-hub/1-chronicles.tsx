import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "2 Chronicles Quiz", description: "Continue the story of the kings of Judah.", link: "/bible-questions-and-answers-hub/2-chronicles" },
  { title: "Ezra Quiz", description: "Learn about the return from exile.", link: "/bible-questions-and-answers-hub/ezra" },
  { title: "2 Kings Quiz", description: "Go back to the end of the kingdom.", link: "/bible-questions-and-answers-hub/2-kings" },
  { title: "1 Kings Quiz", description: "Review the divided kingdom.", link: "/bible-questions-and-answers-hub/1-kings" }
];

const firstChroniclesQuestions = [
  { chapter: 1, question: "What does 1 Chronicles 1-9 contain?", options: ["Stories", "Genealogies", "Laws", "Prophecies"], answer: 1 },
  { chapter: 1, question: "Who is listed first in the genealogy?", options: ["Adam", "Noah", "Abraham", "Moses"], answer: 0 },
  { chapter: 2, question: "Who was the father of Jesse?", options: ["Obed", "Boaz", "Salmon", "Nahshon"], answer: 0 },
  { chapter: 3, question: "How many sons did David have?", options: ["5", "7", "10", "13"], answer: 2 },
  { chapter: 4, question: "Who was Jabez?", options: ["A king", "A judge", "A man who prayed", "A prophet"], answer: 2 },
  { chapter: 4, question: "What did Jabez pray for?", options: ["Wealth", "Blessing and enlargement", "Victory", "Wisdom"], answer: 1 },
  { chapter: 6, question: "What tribe is emphasized in 1 Chronicles 6?", options: ["Judah", "Levi", "Benjamin", "Ephraim"], answer: 1 },
  { chapter: 7, question: "Which tribes are mentioned in 1 Chronicles 7?", options: ["Issachar, Benjamin, Naphtali", "Judah, Levi, Simeon", "Dan, Asher, Zebulun", "All of these"], answer: 0 },
  { chapter: 9, question: "Who lived in Jerusalem after the exile?", options: ["Only priests", "Only Levites", "Priests, Levites, and others", "Only kings"], answer: 2 },
  { chapter: 10, question: "How did Saul die?", options: ["In battle", "By suicide", "Of old age", "By assassination"], answer: 1 },
  { chapter: 11, question: "Who became king after Saul?", options: ["David", "Ishbosheth", "Abner", "Joab"], answer: 0 },
  { chapter: 11, question: "What city did David capture?", options: ["Jerusalem", "Hebron", "Bethlehem", "Samaria"], answer: 0 },
  { chapter: 12, question: "Who were David's mighty men?", options: ["His sons", "His warriors", "His advisors", "His priests"], answer: 1 },
  { chapter: 13, question: "What happened when Uzzah touched the Ark?", options: ["He was blessed", "He died", "He was healed", "Nothing"], answer: 1 },
  { chapter: 14, question: "How many times did David defeat the Philistines?", options: ["1", "2", "3", "4"], answer: 1 },
  { chapter: 15, question: "Who carried the Ark to Jerusalem?", options: ["The priests", "The Levites", "The people", "The oxen"], answer: 1 },
  { chapter: 16, question: "What did David do when the Ark arrived?", options: ["Built a temple", "Offered sacrifices", "Danced", "All of these"], answer: 3 },
  { chapter: 17, question: "What did God promise David?", options: ["A temple", "A dynasty", "Victory", "Wealth"], answer: 1 },
  { chapter: 18, question: "Who did David defeat to gain control of Edom?", options: ["The Philistines", "The Moabites", "The Ammonites", "The Arameans"], answer: 0 },
  { chapter: 19, question: "What did the Ammonites do to David's messengers?", options: ["Killed them", "Shaved their beards", "Imprisoned them", "Sent them back"], answer: 1 },
  { chapter: 20, question: "What happened to the crown of the Ammonite king?", options: ["It was destroyed", "It was placed on David's head", "It was melted down", "It was hidden"], answer: 1 },
  { chapter: 21, question: "What sin did David commit by taking a census?", options: ["Pride", "Theft", "Murder", "Idolatry"], answer: 0 },
  { chapter: 21, question: "How many people died in the plague?", options: ["7,000", "17,000", "70,000", "170,000"], answer: 2 },
  { chapter: 22, question: "What did David prepare for the temple?", options: ["Plans", "Materials", "Workers", "All of these"], answer: 3 },
  { chapter: 23, question: "How many Levites were there?", options: ["23,000", "30,000", "38,000", "45,000"], answer: 2 },
  { chapter: 24, question: "How were the priests divided?", options: ["By age", "By lot", "By family", "By ability"], answer: 1 },
  { chapter: 25, question: "What were the Levites assigned to do?", options: ["Sacrifice", "Music", "Teaching", "All of these"], answer: 3 },
  { chapter: 26, question: "Who were the gatekeepers?", options: ["Priests", "Levites", "Warriors", "Servants"], answer: 1 },
  { chapter: 27, question: "How many divisions of the army were there?", options: ["10", "11", "12", "13"], answer: 2 },
  { chapter: 28, question: "What did David give Solomon?", options: ["The throne", "The temple plans", "The kingdom", "All of these"], answer: 3 },
  { chapter: 29, question: "How much did David give for the temple?", options: ["3,000 talents of gold", "5,000 talents of gold", "7,000 talents of gold", "10,000 talents of gold"], answer: 0 },
  { chapter: 29, question: "Who was made king after David?", options: ["Adonijah", "Solomon", "Absalom", "Amnon"], answer: 1 }
];

export default function FirstChroniclesQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(firstChroniclesQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(firstChroniclesQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === firstChroniclesQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== firstChroniclesQuestions[i].answer).length;
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
              <CardTitle>1 Chronicles Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {firstChroniclesQuestions.map((q, qIdx) => (
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