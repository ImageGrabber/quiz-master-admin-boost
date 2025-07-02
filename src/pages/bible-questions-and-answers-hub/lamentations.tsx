import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Ezekiel Quiz", description: "Learn about the prophet of visions.", link: "/bible-questions-and-answers-hub/ezekiel" },
  { title: "Daniel Quiz", description: "Discover the prophet of dreams.", link: "/bible-questions-and-answers-hub/daniel" },
  { title: "Jeremiah Quiz", description: "Go back to the weeping prophet.", link: "/bible-questions-and-answers-hub/jeremiah" },
  { title: "Isaiah Quiz", description: "Review the prince of prophets.", link: "/bible-questions-and-answers-hub/isaiah" }
];

const lamentationsQuestions = [
  { chapter: 1, question: "What is Jerusalem like?", options: ["A queen", "A widow", "A princess", "A servant"], answer: 1 },
  { chapter: 1, question: "What has become of Jerusalem?", options: ["Prosperous", "Desolate", "Powerful", "Famous"], answer: 1 },
  { chapter: 1, question: "What did Jerusalem do among the nations?", options: ["Ruled", "Served", "Wept", "Rejoiced"], answer: 1 },
  { chapter: 1, question: "What has happened to Jerusalem's lovers?", options: ["They remained faithful", "They became enemies", "They helped her", "They ignored her"], answer: 1 },
  { chapter: 1, question: "What has happened to Jerusalem's children?", options: ["They prospered", "They went into captivity", "They stayed home", "They were blessed"], answer: 1 },
  { chapter: 2, question: "What did the Lord do to Zion?", options: ["Blessed it", "Destroyed it", "Protected it", "Ignored it"], answer: 1 },
  { chapter: 2, question: "What did the Lord do to Israel's beauty?", options: ["Increased it", "Destroyed it", "Protected it", "Ignored it"], answer: 1 },
  { chapter: 2, question: "What did the Lord do to his altar?", options: ["Built it", "Destroyed it", "Protected it", "Ignored it"], answer: 1 },
  { chapter: 2, question: "What did the Lord do to his sanctuary?", options: ["Built it", "Destroyed it", "Protected it", "Ignored it"], answer: 1 },
  { chapter: 2, question: "What did the Lord do to the walls of Zion?", options: ["Built them", "Destroyed them", "Protected them", "Ignored them"], answer: 1 },
  { chapter: 3, question: "What is the man who has seen affliction like?", options: ["Blessed", "Cursed", "Wise", "Foolish"], answer: 1 },
  { chapter: 3, question: "What did the Lord do to the man?", options: ["Blessed him", "Led him into darkness", "Protected him", "Ignored him"], answer: 1 },
  { chapter: 3, question: "What did the Lord do to the man's flesh?", options: ["Healed it", "Made it waste away", "Protected it", "Ignored it"], answer: 1 },
  { chapter: 3, question: "What did the Lord do to the man's bones?", options: ["Strengthened them", "Broke them", "Protected them", "Ignored them"], answer: 1 },
  { chapter: 3, question: "What did the Lord do to the man's path?", options: ["Made it straight", "Blocked it", "Protected it", "Ignored it"], answer: 1 },
  { chapter: 3, question: "What did the Lord do to the man?", options: ["Blessed him", "Surrounded him", "Protected him", "Ignored him"], answer: 1 },
  { chapter: 3, question: "What did the Lord do to the man's teeth?", options: ["Strengthened them", "Broke them", "Protected them", "Ignored them"], answer: 1 },
  { chapter: 3, question: "What did the Lord do to the man?", options: ["Blessed him", "Covered him with ashes", "Protected him", "Ignored him"], answer: 1 },
  { chapter: 3, question: "What did the Lord do to the man's soul?", options: ["Refreshed it", "Deprived it of peace", "Protected it", "Ignored it"], answer: 1 },
  { chapter: 3, question: "What did the man say about the Lord's mercies?", options: ["They are few", "They are many", "They are new every morning", "They are old"], answer: 2 },
  { chapter: 3, question: "What did the man say about the Lord's faithfulness?", options: ["It is great", "It is small", "It is new", "It is old"], answer: 0 },
  { chapter: 3, question: "What did the man say about the Lord?", options: ["He is my portion", "He is my enemy", "He is my friend", "He is my king"], answer: 0 },
  { chapter: 3, question: "What did the man say about waiting for the Lord?", options: ["It is good", "It is bad", "It is useless", "It is foolish"], answer: 0 },
  { chapter: 3, question: "What did the man say about the Lord's salvation?", options: ["It is near", "It is far", "It is gone", "It is delayed"], answer: 0 },
  { chapter: 4, question: "What has happened to the gold?", options: ["It has increased", "It has become dim", "It has disappeared", "It has been stolen"], answer: 1 },
  { chapter: 4, question: "What has happened to the sacred stones?", options: ["They are preserved", "They are scattered", "They are destroyed", "They are hidden"], answer: 1 },
  { chapter: 4, question: "What has happened to the children?", options: ["They are blessed", "They are starving", "They are playing", "They are learning"], answer: 1 },
  { chapter: 4, question: "What has happened to the infants?", options: ["They are healthy", "They are dying", "They are growing", "They are sleeping"], answer: 1 },
  { chapter: 4, question: "What has happened to the princes?", options: ["They are ruling", "They are wandering", "They are hiding", "They are fighting"], answer: 1 },
  { chapter: 4, question: "What has happened to the elders?", options: ["They are respected", "They are not respected", "They are honored", "They are ignored"], answer: 1 },
  { chapter: 4, question: "What has happened to the young men?", options: ["They are strong", "They are weak", "They are dead", "They are missing"], answer: 1 },
  { chapter: 4, question: "What has happened to the women?", options: ["They are blessed", "They are eating their children", "They are cooking", "They are working"], answer: 1 },
  { chapter: 4, question: "What has happened to the priests?", options: ["They are serving", "They are killed", "They are hiding", "They are praying"], answer: 1 },
  { chapter: 4, question: "What has happened to the prophets?", options: ["They are prophesying", "They are killed", "They are hiding", "They are silent"], answer: 1 },
  { chapter: 5, question: "What do the people ask the Lord to remember?", options: ["Their sins", "Their righteousness", "Their wealth", "Their power"], answer: 0 },
  { chapter: 5, question: "What has happened to their inheritance?", options: ["It has increased", "It has been turned over to strangers", "It has been blessed", "It has been protected"], answer: 1 },
  { chapter: 5, question: "What has happened to their homes?", options: ["They are safe", "They are given to foreigners", "They are blessed", "They are protected"], answer: 1 },
  { chapter: 5, question: "What has happened to their fathers?", options: ["They are alive", "They are dead", "They are missing", "They are hiding"], answer: 1 },
  { chapter: 5, question: "What has happened to their mothers?", options: ["They are blessed", "They are widows", "They are missing", "They are hiding"], answer: 1 },
  { chapter: 5, question: "What do they have to pay for water?", options: ["Nothing", "Silver", "Gold", "Food"], answer: 1 },
  { chapter: 5, question: "What do they have to pay for wood?", options: ["Nothing", "Silver", "Gold", "Food"], answer: 1 },
  { chapter: 5, question: "What has happened to their skin?", options: ["It is healthy", "It is hot as an oven", "It is cold", "It is pale"], answer: 1 },
  { chapter: 5, question: "What has happened to the women?", options: ["They are blessed", "They are raped", "They are honored", "They are protected"], answer: 1 },
  { chapter: 5, question: "What has happened to the princes?", options: ["They are ruling", "They are hanged", "They are hiding", "They are fighting"], answer: 1 },
  { chapter: 5, question: "What has happened to the elders?", options: ["They are respected", "They are not respected", "They are honored", "They are ignored"], answer: 1 },
  { chapter: 5, question: "What has happened to the young men?", options: ["They are strong", "They are grinding", "They are working", "They are playing"], answer: 1 },
  { chapter: 5, question: "What has happened to the children?", options: ["They are playing", "They are staggering", "They are learning", "They are working"], answer: 1 },
  { chapter: 5, question: "What has happened to the elders?", options: ["They are at the gate", "They are missing", "They are hiding", "They are dead"], answer: 1 },
  { chapter: 5, question: "What has happened to the young men?", options: ["They are playing music", "They are missing", "They are hiding", "They are dead"], answer: 1 },
  { chapter: 5, question: "What has happened to their joy?", options: ["It has increased", "It has turned to mourning", "It has remained", "It has been shared"], answer: 1 },
  { chapter: 5, question: "What has happened to their dancing?", options: ["It has increased", "It has turned to mourning", "It has remained", "It has been shared"], answer: 1 },
  { chapter: 5, question: "What has fallen from their heads?", options: ["Their hair", "Their crowns", "Their hats", "Their scarves"], answer: 1 },
  { chapter: 5, question: "What do they ask the Lord to do?", options: ["Curse them", "Bless them", "Restore them", "Ignore them"], answer: 2 },
  { chapter: 5, question: "What do they ask the Lord to do?", options: ["Reject them", "Accept them", "Renew them", "Ignore them"], answer: 2 }
];

export default function LamentationsQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(lamentationsQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(lamentationsQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === lamentationsQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== lamentationsQuestions[i].answer).length;
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
              <CardTitle>Lamentations Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {lamentationsQuestions.map((q, qIdx) => (
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