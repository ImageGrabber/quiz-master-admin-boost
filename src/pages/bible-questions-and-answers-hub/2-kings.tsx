import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "1 Chronicles Quiz", description: "Learn about the genealogies and David's reign.", link: "/bible-questions-and-answers-hub/1-chronicles" },
  { title: "2 Chronicles Quiz", description: "Continue the story of the kings of Judah.", link: "/bible-questions-and-answers-hub/2-chronicles" },
  { title: "1 Kings Quiz", description: "Go back to the beginning of the divided kingdom.", link: "/bible-questions-and-answers-hub/1-kings" },
  { title: "2 Samuel Quiz", description: "Review David's reign.", link: "/bible-questions-and-answers-hub/2-samuel" }
];

const secondKingsQuestions = [
  { chapter: 1, question: "Who succeeded Ahab as king of Israel?", options: ["Ahaziah", "Jehoram", "Jehu", "Joram"], answer: 0 },
  { chapter: 1, question: "What happened to Ahaziah's messengers who came to Elijah?", options: ["They were blessed", "Fire came down and consumed them", "They were healed", "They were arrested"], answer: 1 },
  { chapter: 2, question: "How did Elijah go to heaven?", options: ["He died", "He was taken in a chariot of fire", "He walked up a mountain", "He disappeared"], answer: 1 },
  { chapter: 2, question: "What did Elisha ask for from Elijah?", options: ["Wealth", "A double portion of his spirit", "Long life", "Victory"], answer: 1 },
  { chapter: 3, question: "What did Elisha do to help the kings in battle?", options: ["Led the army", "Provided water", "Built a wall", "Made weapons"], answer: 1 },
  { chapter: 4, question: "What did the widow's oil do?", options: ["It multiplied", "It turned to wine", "It disappeared", "It became gold"], answer: 0 },
  { chapter: 4, question: "What did Elisha do for the Shunammite woman's son?", options: ["Healed him", "Raised him from the dead", "Blessed him", "Adopted him"], answer: 1 },
  { chapter: 5, question: "Who was Naaman?", options: ["A prophet", "A Syrian commander", "An Israelite king", "A priest"], answer: 1 },
  { chapter: 5, question: "How was Naaman healed of leprosy?", options: ["By prayer", "By washing in the Jordan", "By medicine", "By sacrifice"], answer: 1 },
  { chapter: 6, question: "What did Elisha do to help his servant see the army of God?", options: ["Prayed", "Opened his eyes", "Gave him glasses", "Built a tower"], answer: 0 },
  { chapter: 7, question: "What happened to the Syrian army that besieged Samaria?", options: ["They were defeated", "They fled", "They surrendered", "They were killed"], answer: 1 },
  { chapter: 8, question: "Who was Hazael?", options: ["A prophet", "A king of Syria", "An Israelite", "A priest"], answer: 1 },
  { chapter: 9, question: "Who anointed Jehu as king?", options: ["Elisha", "A young prophet", "The people", "The priests"], answer: 1 },
  { chapter: 9, question: "What did Jehu do to Jezebel?", options: ["Married her", "Killed her", "Exiled her", "Imprisoned her"], answer: 1 },
  { chapter: 10, question: "What did Jehu do to the house of Ahab?", options: ["Spared them", "Killed them all", "Exiled them", "Made them servants"], answer: 1 },
  { chapter: 11, question: "Who was Athaliah?", options: ["A prophetess", "A queen who killed the royal family", "A priestess", "A judge"], answer: 1 },
  { chapter: 11, question: "Who was hidden from Athaliah?", options: ["Joash", "Jehoash", "Ahaziah", "Jehoram"], answer: 0 },
  { chapter: 12, question: "What did Joash do with the temple money?", options: ["Stole it", "Used it for repairs", "Gave it to the poor", "Buried it"], answer: 1 },
  { chapter: 13, question: "How many times did Elisha tell Joash to strike the ground?", options: ["1", "2", "3", "4"], answer: 2 },
  { chapter: 14, question: "Who was Amaziah's father?", options: ["Joash", "Jehoash", "Ahaziah", "Jehoram"], answer: 0 },
  { chapter: 15, question: "How long did Azariah (Uzziah) reign?", options: ["20 years", "30 years", "40 years", "52 years"], answer: 3 },
  { chapter: 16, question: "Who was Ahaz's father?", options: ["Jotham", "Uzziah", "Hezekiah", "Manasseh"], answer: 0 },
  { chapter: 17, question: "Who conquered the northern kingdom of Israel?", options: ["Assyria", "Babylon", "Egypt", "Syria"], answer: 0 },
  { chapter: 17, question: "What happened to the Israelites?", options: ["They were killed", "They were exiled", "They were enslaved", "They were scattered"], answer: 1 },
  { chapter: 18, question: "Who was Hezekiah's father?", options: ["Ahaz", "Jotham", "Uzziah", "Manasseh"], answer: 0 },
  { chapter: 18, question: "What did Hezekiah do that was good?", options: ["Removed the high places", "Built temples", "Made alliances", "Collected taxes"], answer: 0 },
  { chapter: 19, question: "What did the Assyrian king send to Hezekiah?", options: ["Gifts", "A threatening letter", "An army", "A treaty"], answer: 1 },
  { chapter: 20, question: "What sign did God give Hezekiah?", options: ["The sun went backward", "A rainbow", "A star", "A dove"], answer: 0 },
  { chapter: 21, question: "Who was Manasseh's father?", options: ["Hezekiah", "Ahaz", "Jotham", "Uzziah"], answer: 0 },
  { chapter: 21, question: "How long did Manasseh reign?", options: ["22 years", "35 years", "45 years", "55 years"], answer: 3 },
  { chapter: 22, question: "Who was Josiah's father?", options: ["Amon", "Manasseh", "Hezekiah", "Jehoahaz"], answer: 0 },
  { chapter: 22, question: "What was found in the temple during Josiah's reign?", options: ["Gold", "The Book of the Law", "Weapons", "Idols"], answer: 1 },
  { chapter: 23, question: "What did Josiah do when he heard the Law?", options: ["Ignored it", "Tore his clothes", "Burned it", "Buried it"], answer: 1 },
  { chapter: 24, question: "Who was the first king taken to Babylon?", options: ["Jehoiakim", "Jehoiachin", "Zedekiah", "Josiah"], answer: 1 },
  { chapter: 25, question: "Who destroyed Jerusalem and the temple?", options: ["Assyria", "Babylon", "Egypt", "Syria"], answer: 1 },
  { chapter: 25, question: "What happened to Zedekiah?", options: ["He escaped", "He was killed", "His eyes were put out", "He was exiled"], answer: 2 }
];

export default function SecondKingsQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(secondKingsQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(secondKingsQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === secondKingsQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== secondKingsQuestions[i].answer).length;
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
              <CardTitle>2 Kings Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {secondKingsQuestions.map((q, qIdx) => (
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