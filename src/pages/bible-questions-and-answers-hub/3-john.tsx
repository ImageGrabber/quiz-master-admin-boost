import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "2 John Quiz", description: "Go back to John's second letter.", link: "/bible-questions-and-answers-hub/2-john" },
  { title: "Jude Quiz", description: "Continue to the Book of Jude.", link: "/bible-questions-and-answers-hub/jude" },
  { title: "Revelation Quiz", description: "Explore the Book of Revelation.", link: "/bible-questions-and-answers-hub/revelation" }
];

const thirdJohnQuestions = [
  { chapter: 1, question: "Who wrote the Book of 3 John?", options: ["John", "Peter", "Paul", "James"], answer: 0 },
  { chapter: 1, question: "How does John address Gaius?", options: ["Whom I love in truth", "Whom I fear", "Whom I respect", "Whom I know"], answer: 0 },
  { chapter: 1, question: "What does John pray for Gaius?", options: ["That you may prosper and be in health", "That you may be rich", "That you may be wise", "That you may be strong"], answer: 0 },
  { chapter: 1, question: "What does John say about Gaius's soul?", options: ["It prospers", "It is weak", "It is lost", "It is confused"], answer: 0 },
  { chapter: 1, question: "What did John rejoice greatly about?", options: ["When brethren came and testified of the truth that is in you", "When he received money", "When he received gifts", "When he received praise"], answer: 0 },
  { chapter: 1, question: "How does Gaius walk in the truth?", options: ["Faithfully", "Carelessly", "Slowly", "Quickly"], answer: 0 },
  { chapter: 1, question: "What is John's greatest joy?", options: ["To hear that my children walk in truth", "To receive gifts", "To receive praise", "To receive money"], answer: 0 },
  { chapter: 1, question: "What did Gaius do for the brethren and strangers?", options: ["You do faithfully whatever you do for the brethren and for strangers", "You ignored them", "You rejected them", "You feared them"], answer: 0 },
  { chapter: 1, question: "What have the brethren testified about Gaius?", options: ["Of your love before the church", "Of your wealth", "Of your wisdom", "Of your strength"], answer: 0 },
  { chapter: 1, question: "What will Gaius do well to send them forward?", options: ["In a manner worthy of God", "In a hurry", "In secret", "In fear"], answer: 0 },
  { chapter: 1, question: "Why did the brethren go forth?", options: ["For His name's sake", "For money", "For fame", "For power"], answer: 0 },
  { chapter: 1, question: "What did the brethren take nothing from the Gentiles?", options: ["That we might become fellow workers for the truth", "Because they were poor", "Because they were afraid", "Because they were lazy"], answer: 0 },
  { chapter: 1, question: "What should we receive such people as?", options: ["Fellow workers for the truth", "Strangers", "Enemies", "Servants"], answer: 0 },
  { chapter: 1, question: "What did John write to the church about?", options: ["But Diotrephes, who loves to have the preeminence among them, does not receive us", "About money", "About gifts", "About praise"], answer: 0 },
  { chapter: 1, question: "What does Diotrephes love to have?", options: ["The preeminence among them", "Money", "Gifts", "Praise"], answer: 0 },
  { chapter: 1, question: "What does Diotrephes not receive?", options: ["Us", "Money", "Gifts", "Praise"], answer: 0 },
  { chapter: 1, question: "What will John do when he comes?", options: ["Call to mind his deeds which he does", "Give him money", "Give him gifts", "Give him praise"], answer: 0 },
  { chapter: 1, question: "What does Diotrephes do with malicious words?", options: ["He prates against us", "He praises us", "He ignores us", "He helps us"], answer: 0 },
  { chapter: 1, question: "What does Diotrephes not receive?", options: ["The brethren", "Money", "Gifts", "Praise"], answer: 0 },
  { chapter: 1, question: "What does Diotrephes forbid others to do?", options: ["To receive the brethren", "To give money", "To give gifts", "To give praise"], answer: 0 },
  { chapter: 1, question: "What does Diotrephes cast out of the church?", options: ["Those who wish to receive the brethren", "Those who give money", "Those who give gifts", "Those who give praise"], answer: 0 },
  { chapter: 1, question: "What should Gaius not imitate?", options: ["What is evil", "What is good", "What is wise", "What is strong"], answer: 0 },
  { chapter: 1, question: "What should Gaius imitate?", options: ["What is good", "What is evil", "What is foolish", "What is weak"], answer: 0 },
  { chapter: 1, question: "Who does good?", options: ["He who does good is of God", "He who is rich", "He who is wise", "He who is strong"], answer: 0 },
  { chapter: 1, question: "Who has not seen God?", options: ["He who does evil has not seen God", "He who is poor", "He who is foolish", "He who is weak"], answer: 0 }
];

export default function ThirdJohnQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(thirdJohnQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(thirdJohnQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === thirdJohnQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== thirdJohnQuestions[i].answer).length;
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
              <CardTitle>3 John Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {thirdJohnQuestions.map((q, qIdx) => (
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