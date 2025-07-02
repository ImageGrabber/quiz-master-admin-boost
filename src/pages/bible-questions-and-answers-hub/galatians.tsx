import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Ephesians Quiz", description: "Continue to Paul's letter to the Ephesians.", link: "/bible-questions-and-answers-hub/ephesians" },
  { title: "2 Corinthians Quiz", description: "Go back to Paul's second letter to the Corinthians.", link: "/bible-questions-and-answers-hub/2-corinthians" },
  { title: "Philippians Quiz", description: "Explore Paul's letter to the Philippians.", link: "/bible-questions-and-answers-hub/philippians" }
];

const galatiansQuestions = [
  { chapter: 1, question: "Who wrote the Book of Galatians?", options: ["Peter", "Paul", "John", "Luke"], answer: 1 },
  { chapter: 1, question: "What does Galatians 1:4 say Christ gave Himself for?", options: ["To deliver us from this present evil age", "To make us rich", "To give us power", "To make us famous"], answer: 0 },
  { chapter: 1, question: "What does Galatians 1:8 say about preaching a different gospel?", options: ["Let him be accursed", "It's okay", "It's acceptable", "It's normal"], answer: 0 },
  { chapter: 1, question: "What does Galatians 1:10 say about pleasing men?", options: ["If I were still pleasing men, I would not be a servant of Christ", "I should always please men", "Pleasing men is my goal", "Men don't matter"], answer: 0 },
  { chapter: 2, question: "What does Galatians 2:16 say about justification?", options: ["A man is not justified by works of the law", "A man is justified by works", "Works are everything", "Law is everything"], answer: 0 },
  { chapter: 2, question: "What does Galatians 2:20 say about living?", options: ["I have been crucified with Christ", "I live for myself", "I am dead", "I am perfect"], answer: 0 },
  { chapter: 2, question: "What does Galatians 2:20 say about who lives in Paul?", options: ["Christ lives in me", "I live alone", "No one lives in me", "Satan lives in me"], answer: 0 },
  { chapter: 3, question: "What does Galatians 3:3 ask about being perfected?", options: ["Are you so foolish? Having begun in the Spirit, are you now being made perfect by the flesh?", "Are you perfect?", "Are you foolish?", "Are you spiritual?"], answer: 0 },
  { chapter: 3, question: "What does Galatians 3:6 say about Abraham?", options: ["He believed God, and it was accounted to him for righteousness", "He worked for righteousness", "He was born righteous", "He earned righteousness"], answer: 0 },
  { chapter: 3, question: "What does Galatians 3:11 say about the just?", options: ["The just shall live by faith", "The just shall live by works", "The just shall live by law", "The just shall live by sight"], answer: 0 },
  { chapter: 3, question: "What does Galatians 3:13 say Christ became?", options: ["A curse for us", "A blessing", "A king", "A priest"], answer: 0 },
  { chapter: 3, question: "What does Galatians 3:16 say about the seed?", options: ["He does not say 'seeds' but 'seed'", "He says 'seeds'", "He doesn't mention seed", "Seed is not important"], answer: 0 },
  { chapter: 3, question: "What does Galatians 3:22 say the Scripture has concluded?", options: ["All under sin", "All are righteous", "All are saved", "All are perfect"], answer: 0 },
  { chapter: 3, question: "What does Galatians 3:26 say about being sons of God?", options: ["You are all sons of God through faith", "You are sons by works", "You are sons by birth", "You are not sons"], answer: 0 },
  { chapter: 3, question: "What does Galatians 3:28 say about being in Christ?", options: ["There is neither Jew nor Greek, slave nor free, male nor female", "There are differences", "There is separation", "There is division"], answer: 0 },
  { chapter: 4, question: "What does Galatians 4:4 say about the fullness of time?", options: ["God sent forth His Son", "God sent an angel", "God sent a prophet", "God sent nothing"], answer: 0 },
  { chapter: 4, question: "What does Galatians 4:5 say about adoption?", options: ["To redeem those under the law, that we might receive adoption", "To keep us under law", "To reject us", "To ignore us"], answer: 0 },
  { chapter: 4, question: "What does Galatians 4:6 say about crying out?", options: ["Abba, Father", "Help me", "Save me", "Nothing"], answer: 0 },
  { chapter: 4, question: "What does Galatians 4:9 ask about turning back?", options: ["How is it that you turn again to the weak and beggarly elements?", "Why are you strong?", "Why are you free?", "Why are you saved?"], answer: 0 },
  { chapter: 5, question: "What does Galatians 5:1 say about freedom?", options: ["Stand fast in the liberty by which Christ has made us free", "Stay in bondage", "Return to law", "Ignore freedom"], answer: 0 },
  { chapter: 5, question: "What does Galatians 5:4 say about being justified by law?", options: ["You have become estranged from Christ", "You are saved", "You are blessed", "You are perfect"], answer: 0 },
  { chapter: 5, question: "What does Galatians 5:6 say about faith?", options: ["Faith working through love", "Faith working through works", "Faith working through law", "Faith working through fear"], answer: 0 },
  { chapter: 5, question: "What does Galatians 5:13 say about freedom?", options: ["Do not use liberty as an opportunity for the flesh", "Use liberty for sin", "Ignore liberty", "Reject liberty"], answer: 0 },
  { chapter: 5, question: "What does Galatians 5:14 say about the law?", options: ["Love your neighbor as yourself", "Hate your neighbor", "Ignore your neighbor", "Judge your neighbor"], answer: 0 },
  { chapter: 5, question: "What does Galatians 5:16 say about walking?", options: ["Walk in the Spirit", "Walk in the flesh", "Walk in the law", "Walk alone"], answer: 0 },
  { chapter: 5, question: "What does Galatians 5:22-23 list as the fruit of the Spirit?", options: ["Love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control", "Anger, hatred, violence", "Pride, arrogance, selfishness", "Fear, doubt, worry"], answer: 0 },
  { chapter: 6, question: "What does Galatians 6:2 say about bearing burdens?", options: ["Bear one another's burdens", "Ignore burdens", "Create burdens", "Reject burdens"], answer: 0 },
  { chapter: 6, question: "What does Galatians 6:7 say about sowing and reaping?", options: ["Whatever a man sows, that he will also reap", "Sowing doesn't matter", "Reaping is random", "There is no connection"], answer: 0 },
  { chapter: 6, question: "What does Galatians 6:9 say about doing good?", options: ["Let us not grow weary while doing good", "Stop doing good", "Ignore doing good", "Do good only sometimes"], answer: 0 },
  { chapter: 6, question: "What does Galatians 6:14 say about boasting?", options: ["God forbid that I should boast except in the cross", "Boast in yourself", "Boast in works", "Boast in law"], answer: 0 },
  { chapter: 6, question: "What does Galatians 6:15 say about what matters?", options: ["Neither circumcision nor uncircumcision avails anything", "Circumcision matters", "Uncircumcision matters", "Both matter"], answer: 0 },
  { chapter: 6, question: "What does Galatians 6:17 say about Paul's marks?", options: ["I bear in my body the marks of the Lord Jesus", "I have no marks", "My marks are from men", "Marks don't matter"], answer: 0 }
];

export default function GalatiansQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(galatiansQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(galatiansQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === galatiansQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== galatiansQuestions[i].answer).length;
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
              <CardTitle>Galatians Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {galatiansQuestions.map((q, qIdx) => (
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