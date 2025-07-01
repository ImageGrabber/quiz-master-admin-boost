import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Esther Quiz", description: "Learn about the Jewish queen in Persia.", link: "/bible-questions-and-answers-hub/esther" },
  { title: "Ezra Quiz", description: "Go back to the return from exile.", link: "/bible-questions-and-answers-hub/ezra" },
  { title: "2 Chronicles Quiz", description: "Review the end of the kingdom.", link: "/bible-questions-and-answers-hub/2-chronicles" },
  { title: "1 Chronicles Quiz", description: "Review David's reign.", link: "/bible-questions-and-answers-hub/1-chronicles" }
];

const nehemiahQuestions = [
  { chapter: 1, question: "Who was Nehemiah?", options: ["A priest", "A prophet", "A cupbearer", "A scribe"], answer: 2 },
  { chapter: 1, question: "What did Nehemiah hear about Jerusalem?", options: ["It was prosperous", "The walls were broken", "The temple was built", "The people were happy"], answer: 1 },
  { chapter: 1, question: "What did Nehemiah do when he heard the news?", options: ["Celebrated", "Prayed and fasted", "Went to Jerusalem", "Wrote a letter"], answer: 1 },
  { chapter: 2, question: "Who was the king when Nehemiah served as cupbearer?", options: ["Cyrus", "Darius", "Artaxerxes", "Xerxes"], answer: 2 },
  { chapter: 2, question: "What did Nehemiah ask the king for?", options: ["Money", "Permission to go to Jerusalem", "Soldiers", "All of these"], answer: 3 },
  { chapter: 2, question: "How long did Nehemiah stay in Jerusalem before telling anyone his plan?", options: ["1 day", "3 days", "7 days", "1 month"], answer: 1 },
  { chapter: 3, question: "Who helped rebuild the walls?", options: ["Only priests", "Only Levites", "Priests, Levites, and others", "Only foreigners"], answer: 2 },
  { chapter: 3, question: "What did the high priest Eliashib do?", options: ["Built the Sheep Gate", "Built the Fish Gate", "Built the Old Gate", "Built the Valley Gate"], answer: 0 },
  { chapter: 4, question: "Who opposed the rebuilding of the walls?", options: ["Sanballat", "Tobiah", "Geshem", "All of these"], answer: 3 },
  { chapter: 4, question: "What did the enemies plan to do?", options: ["Attack Jerusalem", "Write to the king", "Bribe officials", "Join the work"], answer: 0 },
  { chapter: 5, question: "What problem arose among the Jews?", options: ["Poverty and debt", "Disease", "Famine", "War"], answer: 0 },
  { chapter: 5, question: "What did Nehemiah do about the problem?", options: ["Ignored it", "Called a meeting", "Asked the king for help", "Left Jerusalem"], answer: 1 },
  { chapter: 6, question: "How many times did Sanballat try to meet with Nehemiah?", options: ["1 time", "3 times", "5 times", "7 times"], answer: 2 },
  { chapter: 6, question: "What did Sanballat accuse Nehemiah of planning?", options: ["Rebellion", "Theft", "Idolatry", "Murder"], answer: 0 },
  { chapter: 6, question: "How long did it take to complete the walls?", options: ["21 days", "42 days", "52 days", "62 days"], answer: 2 },
  { chapter: 7, question: "Who was put in charge of Jerusalem?", options: ["Nehemiah", "Hanani", "Hananiah", "Ezra"], answer: 1 },
  { chapter: 7, question: "What did Nehemiah find when he checked the genealogies?", options: ["Everyone was registered", "Some could not prove their ancestry", "Many were missing", "All were foreigners"], answer: 1 },
  { chapter: 8, question: "What did Ezra read to the people?", options: ["The Law", "The Prophets", "The Psalms", "The Chronicles"], answer: 0 },
  { chapter: 8, question: "How long did the people listen to the reading?", options: ["1 hour", "3 hours", "6 hours", "All day"], answer: 2 },
  { chapter: 8, question: "What did the people do when they heard the Law?", options: ["Rejoiced", "Wept", "Fasted", "Sacrificed"], answer: 1 },
  { chapter: 9, question: "What did the people do on the 24th day?", options: ["Fasted", "Feasted", "Worked", "Traveled"], answer: 0 },
  { chapter: 9, question: "What did they confess in their prayer?", options: ["Their sins", "God's faithfulness", "Their ancestors' sins", "All of these"], answer: 3 },
  { chapter: 10, question: "What did the people promise to do?", options: ["Not intermarry", "Keep the Sabbath", "Support the temple", "All of these"], answer: 3 },
  { chapter: 11, question: "What did they do with Jerusalem?", options: ["Abandoned it", "Repopulated it", "Destroyed it", "Expanded it"], answer: 1 },
  { chapter: 12, question: "What did they do when the walls were dedicated?", options: ["Had a feast", "Offered sacrifices", "Had a procession", "All of these"], answer: 3 },
  { chapter: 13, question: "What did Nehemiah find when he returned to Jerusalem?", options: ["The temple was destroyed", "Tobiah was living in the temple", "The walls were broken", "The people were gone"], answer: 1 },
  { chapter: 13, question: "What did Nehemiah do about the Sabbath violations?", options: ["Ignored them", "Closed the gates", "Punished violators", "Made new laws"], answer: 1 },
  { chapter: 13, question: "What did Nehemiah do about intermarriage?", options: ["Encouraged it", "Allowed it", "Forbade it", "Ignored it"], answer: 2 }
];

export default function NehemiahQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(nehemiahQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(nehemiahQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === nehemiahQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== nehemiahQuestions[i].answer).length;
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
              <CardTitle>Nehemiah Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {nehemiahQuestions.map((q, qIdx) => (
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