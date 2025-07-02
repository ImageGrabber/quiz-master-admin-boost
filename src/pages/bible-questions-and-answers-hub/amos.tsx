import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Obadiah Quiz", description: "Learn about Edom's judgment.", link: "/bible-questions-and-answers-hub/obadiah" },
  { title: "Jonah Quiz", description: "Discover the prophet and the great fish.", link: "/bible-questions-and-answers-hub/jonah" },
  { title: "Joel Quiz", description: "Go back to the day of the Lord.", link: "/bible-questions-and-answers-hub/joel" },
  { title: "Hosea Quiz", description: "Continue to the prophet of love.", link: "/bible-questions-and-answers-hub/hosea" }
];

const amosQuestions = [
  { chapter: 1, question: "What was Amos's occupation?", options: ["Priest", "Shepherd", "Farmer", "King"], answer: 1 },
  { chapter: 1, question: "What did Amos say about Damascus?", options: ["It would be blessed", "It would be destroyed", "It would be ignored", "It would be saved"], answer: 1 },
  { chapter: 1, question: "What did Amos say about Gaza?", options: ["It would be blessed", "It would be destroyed", "It would be ignored", "It would be saved"], answer: 1 },
  { chapter: 1, question: "What did Amos say about Tyre?", options: ["It would be blessed", "It would be destroyed", "It would be ignored", "It would be saved"], answer: 1 },
  { chapter: 1, question: "What did Amos say about Edom?", options: ["It would be blessed", "It would be destroyed", "It would be ignored", "It would be saved"], answer: 1 },
  { chapter: 1, question: "What did Amos say about Ammon?", options: ["It would be blessed", "It would be destroyed", "It would be ignored", "It would be saved"], answer: 1 },
  { chapter: 1, question: "What did Amos say about Moab?", options: ["It would be blessed", "It would be destroyed", "It would be ignored", "It would be saved"], answer: 1 },
  { chapter: 2, question: "What did Amos say about Judah?", options: ["It would be blessed", "It would be destroyed", "It would be ignored", "It would be saved"], answer: 1 },
  { chapter: 2, question: "What did Amos say about Israel?", options: ["It would be blessed", "It would be destroyed", "It would be ignored", "It would be saved"], answer: 1 },
  { chapter: 2, question: "What did Amos say about Israel's sins?", options: ["They were few", "They were many", "They were minor", "They were major"], answer: 1 },
  { chapter: 2, question: "What did Amos say about Israel's oppression?", options: ["It was good", "It was bad", "It was justified", "It was wrong"], answer: 1 },
  { chapter: 2, question: "What did Amos say about Israel's justice?", options: ["It was good", "It was bad", "It was fair", "It was unfair"], answer: 1 },
  { chapter: 3, question: "What did Amos say about Israel's privilege?", options: ["It was earned", "It was given", "It was deserved", "It was undeserved"], answer: 1 },
  { chapter: 3, question: "What did Amos say about Israel's responsibility?", options: ["It was light", "It was heavy", "It was optional", "It was required"], answer: 1 },
  { chapter: 3, question: "What did Amos say about Israel's punishment?", options: ["It would be light", "It would be heavy", "It would be delayed", "It would be cancelled"], answer: 1 },
  { chapter: 4, question: "What did Amos call the women of Samaria?", options: ["Cows of Bashan", "Sheep of Israel", "Doves of Judah", "Lions of Judah"], answer: 0 },
  { chapter: 4, question: "What did Amos say about Israel's worship?", options: ["It was good", "It was bad", "It was sincere", "It was insincere"], answer: 1 },
  { chapter: 4, question: "What did Amos say about Israel's offerings?", options: ["They were good", "They were bad", "They were acceptable", "They were unacceptable"], answer: 1 },
  { chapter: 4, question: "What did Amos say about Israel's repentance?", options: ["It was genuine", "It was false", "It was partial", "It was complete"], answer: 1 },
  { chapter: 5, question: "What did Amos tell Israel to seek?", options: ["Wealth", "Power", "God", "Pleasure"], answer: 2 },
  { chapter: 5, question: "What did Amos tell Israel to seek?", options: ["Life", "Death", "Wealth", "Power"], answer: 0 },
  { chapter: 5, question: "What did Amos say about Israel's justice?", options: ["It was good", "It was bad", "It was fair", "It was unfair"], answer: 1 },
  { chapter: 5, question: "What did Amos say about Israel's righteousness?", options: ["It was good", "It was bad", "It was strong", "It was weak"], answer: 1 },
  { chapter: 5, question: "What did Amos say about the day of the Lord?", options: ["It would be good", "It would be bad", "It would be delayed", "It would be cancelled"], answer: 1 },
  { chapter: 6, question: "What did Amos say about the complacent?", options: ["They were blessed", "They were cursed", "They were wise", "They were foolish"], answer: 1 },
  { chapter: 6, question: "What did Amos say about Israel's luxury?", options: ["It was good", "It was bad", "It was justified", "It was wrong"], answer: 1 },
  { chapter: 6, question: "What did Amos say about Israel's pride?", options: ["It was good", "It was bad", "It was justified", "It was wrong"], answer: 1 },
  { chapter: 6, question: "What did Amos say about Israel's future?", options: ["It would be good", "It would be bad", "It would be uncertain", "It would be bright"], answer: 1 },
  { chapter: 7, question: "What did Amos see in his first vision?", options: ["Locusts", "Fire", "A plumb line", "A basket of fruit"], answer: 0 },
  { chapter: 7, question: "What did Amos see in his second vision?", options: ["Locusts", "Fire", "A plumb line", "A basket of fruit"], answer: 1 },
  { chapter: 7, question: "What did Amos see in his third vision?", options: ["Locusts", "Fire", "A plumb line", "A basket of fruit"], answer: 2 },
  { chapter: 7, question: "What did Amaziah tell Amos to do?", options: ["Stay", "Leave", "Speak", "Be silent"], answer: 1 },
  { chapter: 7, question: "What did Amos say about his calling?", options: ["It was his choice", "It was God's choice", "It was accidental", "It was temporary"], answer: 1 },
  { chapter: 8, question: "What did Amos see in his fourth vision?", options: ["Locusts", "Fire", "A plumb line", "A basket of fruit"], answer: 3 },
  { chapter: 8, question: "What did Amos say about Israel's greed?", options: ["It was good", "It was bad", "It was justified", "It was wrong"], answer: 1 },
  { chapter: 8, question: "What did Amos say about Israel's dishonesty?", options: ["It was good", "It was bad", "It was justified", "It was wrong"], answer: 1 },
  { chapter: 8, question: "What did Amos say about Israel's oppression?", options: ["It was good", "It was bad", "It was justified", "It was wrong"], answer: 1 },
  { chapter: 8, question: "What did Amos say about Israel's future?", options: ["It would be good", "It would be bad", "It would be uncertain", "It would be bright"], answer: 1 },
  { chapter: 9, question: "What did Amos see in his fifth vision?", options: ["The Lord at the altar", "The Lord in heaven", "The Lord on earth", "The Lord in the temple"], answer: 0 },
  { chapter: 9, question: "What did Amos say about Israel's escape?", options: ["It would be easy", "It would be impossible", "It would be delayed", "It would be cancelled"], answer: 1 },
  { chapter: 9, question: "What did Amos say about Israel's hiding?", options: ["It would be easy", "It would be impossible", "It would be delayed", "It would be cancelled"], answer: 1 },
  { chapter: 9, question: "What did Amos say about Israel's destruction?", options: ["It would be partial", "It would be complete", "It would be delayed", "It would be cancelled"], answer: 1 },
  { chapter: 9, question: "What did Amos say about Israel's restoration?", options: ["It would not happen", "It would happen", "It would be delayed", "It would be cancelled"], answer: 1 },
  { chapter: 9, question: "What did Amos say about the fallen tent?", options: ["It would stay fallen", "It would be raised", "It would be ignored", "It would be destroyed"], answer: 1 },
  { chapter: 9, question: "What did Amos say about Israel's future?", options: ["It would be bad", "It would be good", "It would be uncertain", "It would be dark"], answer: 1 }
];

export default function AmosQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(amosQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(amosQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === amosQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== amosQuestions[i].answer).length;
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
              <CardTitle>Amos Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {amosQuestions.map((q, qIdx) => (
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