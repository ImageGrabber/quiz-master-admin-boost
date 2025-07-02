import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Jonah Quiz", description: "Discover the prophet and the great fish.", link: "/bible-questions-and-answers-hub/jonah" },
  { title: "Micah Quiz", description: "Learn about justice and mercy.", link: "/bible-questions-and-answers-hub/micah" },
  { title: "Amos Quiz", description: "Go back to the prophet of justice.", link: "/bible-questions-and-answers-hub/amos" },
  { title: "Joel Quiz", description: "Continue to the day of the Lord.", link: "/bible-questions-and-answers-hub/joel" }
];

const obadiahQuestions = [
  { chapter: 1, question: "What did Obadiah say about Edom?", options: ["It would be blessed", "It would be destroyed", "It would be ignored", "It would be saved"], answer: 1 },
  { chapter: 1, question: "What did Obadiah say about Edom's pride?", options: ["It was good", "It was bad", "It was justified", "It was wrong"], answer: 1 },
  { chapter: 1, question: "What did Obadiah say about Edom's location?", options: ["In the valleys", "In the mountains", "In the plains", "In the desert"], answer: 1 },
  { chapter: 1, question: "What did Obadiah say about Edom's security?", options: ["It was secure", "It was insecure", "It was strong", "It was weak"], answer: 1 },
  { chapter: 1, question: "What did Obadiah say about Edom's wisdom?", options: ["It was great", "It was small", "It was good", "It was bad"], answer: 1 },
  { chapter: 1, question: "What did Obadiah say about Edom's violence?", options: ["It was good", "It was bad", "It was justified", "It was wrong"], answer: 1 },
  { chapter: 1, question: "What did Obadiah say about Edom's treatment of Jacob?", options: ["It was kind", "It was cruel", "It was fair", "It was just"], answer: 1 },
  { chapter: 1, question: "What did Obadiah say about Edom's future?", options: ["It would prosper", "It would be destroyed", "It would be ignored", "It would be saved"], answer: 1 },
  { chapter: 1, question: "What did Obadiah say about the day of the Lord?", options: ["It was near", "It was far", "It was delayed", "It was cancelled"], answer: 0 },
  { chapter: 1, question: "What did Obadiah say about Edom's punishment?", options: ["It would be light", "It would be heavy", "It would be delayed", "It would be cancelled"], answer: 1 },
  { chapter: 1, question: "What did Obadiah say about Edom's allies?", options: ["They would help", "They would not help", "They would fight", "They would flee"], answer: 1 },
  { chapter: 1, question: "What did Obadiah say about Edom's friends?", options: ["They would be faithful", "They would betray", "They would stay", "They would leave"], answer: 1 },
  { chapter: 1, question: "What did Obadiah say about Edom's destruction?", options: ["It would be partial", "It would be complete", "It would be delayed", "It would be cancelled"], answer: 1 },
  { chapter: 1, question: "What did Obadiah say about Edom's survivors?", options: ["There would be many", "There would be few", "There would be none", "There would be some"], answer: 2 },
  { chapter: 1, question: "What did Obadiah say about Mount Esau?", options: ["It would be blessed", "It would be destroyed", "It would be ignored", "It would be saved"], answer: 1 },
  { chapter: 1, question: "What did Obadiah say about the house of Jacob?", options: ["It would be destroyed", "It would be restored", "It would be ignored", "It would be cursed"], answer: 1 },
  { chapter: 1, question: "What did Obadiah say about the house of Joseph?", options: ["It would be destroyed", "It would be restored", "It would be ignored", "It would be cursed"], answer: 1 },
  { chapter: 1, question: "What did Obadiah say about the deliverers?", options: ["They would not come", "They would come", "They would be delayed", "They would be cancelled"], answer: 1 },
  { chapter: 1, question: "What did Obadiah say about the kingdom?", options: ["It would be destroyed", "It would be the Lord's", "It would be ignored", "It would be cursed"], answer: 1 },
  { chapter: 1, question: "What did Obadiah say about the nations?", options: ["They would rule", "They would be judged", "They would be ignored", "They would be blessed"], answer: 1 },
  { chapter: 1, question: "What did Obadiah say about the land?", options: ["It would be destroyed", "It would be restored", "It would be ignored", "It would be cursed"], answer: 1 }
];

export default function ObadiahQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(obadiahQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(obadiahQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === obadiahQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== obadiahQuestions[i].answer).length;
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
        <div className="flex-1 min-w-0">
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
              <CardTitle>Obadiah Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {obadiahQuestions.map((q, qIdx) => (
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