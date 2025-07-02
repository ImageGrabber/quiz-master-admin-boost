import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Matthew Quiz", description: "Start the New Testament!", link: "/bible-questions-and-answers-hub/matthew" },
  { title: "Zechariah Quiz", description: "Go back to the prophet of visions.", link: "/bible-questions-and-answers-hub/zechariah" },
  { title: "Haggai Quiz", description: "Continue to rebuilding the temple.", link: "/bible-questions-and-answers-hub/haggai" }
];

const malachiQuestions = [
  { chapter: 1, question: "What does Malachi say about God's love for Israel?", options: ["It is conditional", "It is eternal", "It is weak", "It is forgotten"], answer: 1 },
  { chapter: 1, question: "Who does God say He loved?", options: ["Jacob", "Esau", "Both", "Neither"], answer: 0 },
  { chapter: 1, question: "What does God say about Esau?", options: ["He was blessed", "He was hated", "He was chosen", "He was ignored"], answer: 1 },
  { chapter: 1, question: "What does Malachi say about the priests' offerings?", options: ["They were pure", "They were defiled", "They were abundant", "They were rare"], answer: 1 },
  { chapter: 1, question: "What does God say about His name among the nations?", options: ["It is great", "It is unknown", "It is forgotten", "It is cursed"], answer: 0 },
  { chapter: 1, question: "What does God say about the altar?", options: ["It is honored", "It is despised", "It is ignored", "It is blessed"], answer: 1 },
  { chapter: 2, question: "What does Malachi say about the priests?", options: ["They were faithful", "They were corrupt", "They were wise", "They were kind"], answer: 1 },
  { chapter: 2, question: "What does God say about Levi's covenant?", options: ["It was of life and peace", "It was broken", "It was ignored", "It was forgotten"], answer: 0 },
  { chapter: 2, question: "What does Malachi say about marriage?", options: ["It should be honored", "It should be ignored", "It should be broken", "It should be delayed"], answer: 0 },
  { chapter: 2, question: "What does God hate?", options: ["Divorce", "Sacrifice", "Offerings", "Fasting"], answer: 0 },
  { chapter: 2, question: "What does Malachi say about the people's words?", options: ["They wearied the Lord", "They pleased the Lord", "They blessed the Lord", "They ignored the Lord"], answer: 0 },
  { chapter: 3, question: "What does Malachi say about tithes and offerings?", options: ["They should be brought to the storehouse", "They should be ignored", "They should be delayed", "They should be forgotten"], answer: 0 },
  { chapter: 3, question: "What does Malachi say about the coming messenger?", options: ["He will prepare the way", "He will destroy the temple", "He will ignore the people", "He will bless the priests"], answer: 0 },
  { chapter: 3, question: "Who will suddenly come to his temple?", options: ["The Lord", "The king", "The prophet", "The priest"], answer: 0 },
  { chapter: 3, question: "What is the purpose of the refiner's fire?", options: ["To destroy", "To purify", "To ignore", "To curse"], answer: 1 },
  { chapter: 3, question: "What does God promise to do if the people bring the full tithe?", options: ["Open the windows of heaven", "Send a curse", "Ignore them", "Destroy them"], answer: 0 },
  { chapter: 3, question: "What does God say about those who serve Him?", options: ["They will be His treasured possession", "They will be ignored", "They will be cursed", "They will be forgotten"], answer: 0 },
  { chapter: 3, question: "What distinction will be made at the end?", options: ["Between the righteous and the wicked", "Between the rich and the poor", "Between the old and the young", "Between the priests and the people"], answer: 0 },
  { chapter: 4, question: "What does Malachi say about the day of the Lord?", options: ["It will be great and dreadful", "It will be ignored", "It will be delayed", "It will be cancelled"], answer: 0 },
  { chapter: 4, question: "Who will come before the day of the Lord?", options: ["Elijah", "Moses", "David", "Isaiah"], answer: 0 },
  { chapter: 4, question: "What will happen to the arrogant and evildoers?", options: ["They will be stubble", "They will be blessed", "They will be ignored", "They will be saved"], answer: 0 },
  { chapter: 4, question: "What will the sun of righteousness do?", options: ["Rise with healing in its wings", "Set in darkness", "Be hidden", "Be ignored"], answer: 0 },
  { chapter: 4, question: "What are the people commanded to remember?", options: ["The law of Moses", "The law of David", "The law of Elijah", "The law of Aaron"], answer: 0 },
  { chapter: 4, question: "What will Elijah do when he comes?", options: ["Turn the hearts of fathers to their children", "Destroy the temple", "Curse the land", "Ignore the people"], answer: 0 }
];

export default function MalachiQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(malachiQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(malachiQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === malachiQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== malachiQuestions[i].answer).length;
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
              <CardTitle>Malachi Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {malachiQuestions.map((q, qIdx) => (
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