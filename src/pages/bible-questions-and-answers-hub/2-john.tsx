import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "1 John Quiz", description: "Go back to John's first letter.", link: "/bible-questions-and-answers-hub/1-john" },
  { title: "3 John Quiz", description: "Continue to John's third letter.", link: "/bible-questions-and-answers-hub/3-john" },
  { title: "Jude Quiz", description: "Explore the Book of Jude.", link: "/bible-questions-and-answers-hub/jude" }
];

const secondJohnQuestions = [
  { chapter: 1, question: "Who wrote the Book of 2 John?", options: ["John", "Peter", "Paul", "James"], answer: 0 },
  { chapter: 1, question: "How does John address the elect lady?", options: ["Whom I love in truth", "Whom I fear", "Whom I respect", "Whom I know"], answer: 0 },
  { chapter: 1, question: "What does John say about the truth?", options: ["It abides in us and will be with us forever", "It changes", "It is temporary", "It is unknown"], answer: 0 },
  { chapter: 1, question: "What does John say about grace, mercy, and peace?", options: ["They will be with us from God the Father and from the Lord Jesus Christ", "They are earned", "They are temporary", "They are unknown"], answer: 0 },
  { chapter: 1, question: "What commandment did we have from the beginning?", options: ["That we love one another", "That we fear God", "That we pray", "That we fast"], answer: 0 },
  { chapter: 1, question: "What is love?", options: ["That we walk according to His commandments", "That we feel good", "That we are happy", "That we are rich"], answer: 0 },
  { chapter: 1, question: "What commandment is not new but the same we had from the beginning?", options: ["That you should walk in it", "That you should fear", "That you should pray", "That you should give"], answer: 0 },
  { chapter: 1, question: "What does John say about many deceivers?", options: ["They have gone out into the world", "They are good", "They are wise", "They are helpful"], answer: 0 },
  { chapter: 1, question: "Who do not confess that Jesus Christ has come in the flesh?", options: ["Deceivers and antichrists", "Good people", "Wise people", "Holy people"], answer: 0 },
  { chapter: 1, question: "What should we watch ourselves for?", options: ["That we do not lose those things we worked for", "That we become rich", "That we become famous", "That we become wise"], answer: 0 },
  { chapter: 1, question: "What should we receive a full reward for?", options: ["Our work", "Our wealth", "Our wisdom", "Our strength"], answer: 0 },
  { chapter: 1, question: "Whoever transgresses and does not abide in the doctrine of Christ does not have what?", options: ["God", "Wealth", "Wisdom", "Strength"], answer: 0 },
  { chapter: 1, question: "Whoever abides in the doctrine of Christ has what?", options: ["Both the Father and the Son", "Wealth", "Wisdom", "Strength"], answer: 0 },
  { chapter: 1, question: "What should we not receive into our house?", options: ["Anyone who does not bring this doctrine", "Anyone who is poor", "Anyone who is weak", "Anyone who is young"], answer: 0 },
  { chapter: 1, question: "What should we not bid to those who do not bring the doctrine?", options: ["Godspeed", "Goodbye", "Hello", "Thank you"], answer: 0 },
  { chapter: 1, question: "What does bidding Godspeed to such a person make us?", options: ["Partakers in his evil deeds", "Good people", "Wise people", "Holy people"], answer: 0 },
  { chapter: 1, question: "What did John have many things to write about?", options: ["Paper and ink", "Wealth and riches", "Wisdom and knowledge", "Strength and power"], answer: 0 },
  { chapter: 1, question: "What did John not want to do with paper and ink?", options: ["Write to you", "Throw away", "Burn", "Give away"], answer: 0 },
  { chapter: 1, question: "What did John hope to do?", options: ["Come to you and speak face to face", "Write more letters", "Send messengers", "Stay away"], answer: 0 },
  { chapter: 1, question: "What would speaking face to face make?", options: ["Our joy may be full", "Our wealth complete", "Our wisdom perfect", "Our strength great"], answer: 0 },
  { chapter: 1, question: "Who sends greetings to the elect lady?", options: ["The children of your elect sister", "The angels", "The prophets", "The kings"], answer: 0 },
  { chapter: 1, question: "What does John say about the truth?", options: ["It will be with us forever", "It changes daily", "It is temporary", "It is unknown"], answer: 0 },
  { chapter: 1, question: "What does John emphasize about love?", options: ["It is walking according to commandments", "It is feeling good", "It is being happy", "It is being rich"], answer: 0 },
  { chapter: 1, question: "What is the main theme of 2 John?", options: ["Truth and love", "Wealth and riches", "Wisdom and knowledge", "Strength and power"], answer: 0 },
  { chapter: 1, question: "What does John warn against?", options: ["Deceivers and antichrists", "Good people", "Wise people", "Holy people"], answer: 0 }
];

export default function SecondJohnQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(secondJohnQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(secondJohnQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === secondJohnQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== secondJohnQuestions[i].answer).length;
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
              <CardTitle>2 John Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {secondJohnQuestions.map((q, qIdx) => (
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
