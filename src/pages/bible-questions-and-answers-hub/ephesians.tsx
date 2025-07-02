import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Philippians Quiz", description: "Continue to Paul's letter to the Philippians.", link: "/bible-questions-and-answers-hub/philippians" },
  { title: "Galatians Quiz", description: "Go back to Paul's letter to the Galatians.", link: "/bible-questions-and-answers-hub/galatians" },
  { title: "Colossians Quiz", description: "Explore Paul's letter to the Colossians.", link: "/bible-questions-and-answers-hub/colossians" }
];

const ephesiansQuestions = [
  { chapter: 1, question: "Who wrote the Book of Ephesians?", options: ["Peter", "Paul", "John", "Luke"], answer: 1 },
  { chapter: 1, question: "What does Ephesians 1:3 say about God?", options: ["He has blessed us with every spiritual blessing", "He has cursed us", "He has ignored us", "He has abandoned us"], answer: 0 },
  { chapter: 1, question: "What does Ephesians 1:4 say about being chosen?", options: ["He chose us before the foundation of the world", "He chose us after we were born", "He didn't choose anyone", "He chose only some"], answer: 0 },
  { chapter: 1, question: "What does Ephesians 1:7 say about redemption?", options: ["We have redemption through His blood", "We have no redemption", "We earn redemption", "Redemption is impossible"], answer: 0 },
  { chapter: 1, question: "What does Ephesians 1:13 say about the Holy Spirit?", options: ["You were sealed with the Holy Spirit", "You were ignored by the Spirit", "You rejected the Spirit", "The Spirit doesn't exist"], answer: 0 },
  { chapter: 1, question: "What does Ephesians 1:18 say about the eyes of understanding?", options: ["That the eyes of your understanding may be enlightened", "That your eyes may be closed", "That your eyes may be blind", "That your eyes may be dark"], answer: 0 },
  { chapter: 1, question: "What does Ephesians 1:22 say about Christ?", options: ["He put all things under His feet", "He put nothing under His feet", "He is under all things", "He ignores all things"], answer: 0 },
  { chapter: 2, question: "What does Ephesians 2:1 say about being dead?", options: ["You were dead in trespasses and sins", "You were alive", "You were sleeping", "You were healthy"], answer: 0 },
  { chapter: 2, question: "What does Ephesians 2:4 say about God?", options: ["God is rich in mercy", "God is poor", "God is angry", "God is distant"], answer: 0 },
  { chapter: 2, question: "What does Ephesians 2:5 say about being alive?", options: ["He made us alive together with Christ", "He made us dead", "He ignored us", "He abandoned us"], answer: 0 },
  { chapter: 2, question: "What does Ephesians 2:8 say about salvation?", options: ["By grace you have been saved through faith", "By works you are saved", "By law you are saved", "By birth you are saved"], answer: 0 },
  { chapter: 2, question: "What does Ephesians 2:8 say about salvation being a gift?", options: ["It is the gift of God", "It is earned", "It is bought", "It is inherited"], answer: 0 },
  { chapter: 2, question: "What does Ephesians 2:10 say about being God's workmanship?", options: ["We are His workmanship, created for good works", "We are our own workmanship", "We are no one's workmanship", "We are the devil's workmanship"], answer: 0 },
  { chapter: 2, question: "What does Ephesians 2:13 say about being brought near?", options: ["You who were far off have been brought near", "You were always near", "You are still far off", "You can never be near"], answer: 0 },
  { chapter: 2, question: "What does Ephesians 2:14 say about Christ being our peace?", options: ["He is our peace, who made both one", "He is our enemy", "He is our judge", "He is our teacher"], answer: 0 },
  { chapter: 2, question: "What does Ephesians 2:19 say about being fellow citizens?", options: ["You are fellow citizens with the saints", "You are strangers", "You are enemies", "You are outsiders"], answer: 0 },
  { chapter: 2, question: "What does Ephesians 2:20 say about the foundation?", options: ["Built on the foundation of the apostles and prophets", "Built on sand", "Built on nothing", "Built on ourselves"], answer: 0 },
  { chapter: 2, question: "What does Ephesians 2:22 say about being a dwelling place?", options: ["You are being built together for a dwelling place of God", "You are being destroyed", "You are being ignored", "You are being rejected"], answer: 0 },
  { chapter: 3, question: "What does Ephesians 3:6 say about the Gentiles?", options: ["They should be fellow heirs, of the same body", "They should be excluded", "They should be ignored", "They should be rejected"], answer: 0 },
  { chapter: 3, question: "What does Ephesians 3:8 say about Paul?", options: ["I am the least of all the saints", "I am the greatest", "I am average", "I am nothing"], answer: 0 },
  { chapter: 3, question: "What does Ephesians 3:12 say about access?", options: ["We have boldness and access with confidence", "We have no access", "We have limited access", "We have conditional access"], answer: 0 },
  { chapter: 3, question: "What does Ephesians 3:17 say about Christ dwelling in hearts?", options: ["That Christ may dwell in your hearts through faith", "That Christ may ignore your hearts", "That Christ may reject your hearts", "That Christ may destroy your hearts"], answer: 0 },
  { chapter: 3, question: "What does Ephesians 3:19 say about knowing the love of Christ?", options: ["To know the love of Christ which passes knowledge", "To ignore the love of Christ", "To reject the love of Christ", "To fear the love of Christ"], answer: 0 },
  { chapter: 4, question: "What does Ephesians 4:1 say about walking?", options: ["Walk worthy of the calling with which you were called", "Walk however you want", "Walk in sin", "Walk away"], answer: 0 },
  { chapter: 4, question: "What does Ephesians 4:3 say about unity?", options: ["Endeavoring to keep the unity of the Spirit", "Breaking unity", "Ignoring unity", "Rejecting unity"], answer: 0 },
  { chapter: 4, question: "What does Ephesians 4:4 say about the body?", options: ["There is one body", "There are many bodies", "There is no body", "There are no bodies"], answer: 0 },
  { chapter: 4, question: "What does Ephesians 4:11 say about gifts?", options: ["He gave some to be apostles, prophets, evangelists, pastors, teachers", "He gave nothing", "He took away gifts", "He ignored gifts"], answer: 0 },
  { chapter: 4, question: "What does Ephesians 4:15 say about speaking the truth?", options: ["Speaking the truth in love", "Speaking lies", "Speaking nothing", "Speaking hate"], answer: 0 },
  { chapter: 4, question: "What does Ephesians 4:26 say about anger?", options: ["Be angry, and do not sin", "Never be angry", "Always be angry", "Ignore anger"], answer: 0 },
  { chapter: 4, question: "What does Ephesians 4:32 say about being kind?", options: ["Be kind to one another, tenderhearted, forgiving", "Be cruel to one another", "Be indifferent to one another", "Be angry with one another"], answer: 0 },
  { chapter: 5, question: "What does Ephesians 5:1 say about being followers?", options: ["Be followers of God as dear children", "Be followers of the world", "Be followers of no one", "Be followers of yourself"], answer: 0 },
  { chapter: 5, question: "What does Ephesians 5:2 say about walking in love?", options: ["Walk in love, as Christ also has loved us", "Walk in hate", "Walk in fear", "Walk in anger"], answer: 0 },
  { chapter: 5, question: "What does Ephesians 5:8 say about being light?", options: ["You were once darkness, but now you are light", "You were always light", "You are still darkness", "You can never be light"], answer: 0 },
  { chapter: 5, question: "What does Ephesians 5:18 say about being filled?", options: ["Be filled with the Spirit", "Be filled with wine", "Be filled with anger", "Be filled with nothing"], answer: 0 },
  { chapter: 5, question: "What does Ephesians 5:25 say about husbands?", options: ["Husbands, love your wives", "Husbands, hate your wives", "Husbands, ignore your wives", "Husbands, control your wives"], answer: 0 },
  { chapter: 6, question: "What does Ephesians 6:1 say about children?", options: ["Children, obey your parents", "Children, disobey your parents", "Children, ignore your parents", "Children, hate your parents"], answer: 0 },
  { chapter: 6, question: "What does Ephesians 6:4 say about fathers?", options: ["Do not provoke your children to wrath", "Always provoke your children", "Ignore your children", "Abandon your children"], answer: 0 },
  { chapter: 6, question: "What does Ephesians 6:10 say about being strong?", options: ["Be strong in the Lord", "Be strong in yourself", "Be weak", "Be nothing"], answer: 0 },
  { chapter: 6, question: "What does Ephesians 6:11 say about putting on armor?", options: ["Put on the whole armor of God", "Put on no armor", "Put on worldly armor", "Put on nothing"], answer: 0 },
  { chapter: 6, question: "What does Ephesians 6:12 say about our struggle?", options: ["We do not wrestle against flesh and blood", "We wrestle against flesh and blood", "We don't wrestle at all", "We wrestle against God"], answer: 0 },
  { chapter: 6, question: "What does Ephesians 6:17 say about the sword?", options: ["The sword of the Spirit, which is the word of God", "A physical sword", "No sword", "A wooden sword"], answer: 0 },
  { chapter: 6, question: "What does Ephesians 6:18 say about prayer?", options: ["Praying always with all prayer and supplication", "Never pray", "Pray sometimes", "Pray only for yourself"], answer: 0 }
];

export default function EphesiansQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(ephesiansQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(ephesiansQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === ephesiansQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== ephesiansQuestions[i].answer).length;
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
              <CardTitle>Ephesians Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {ephesiansQuestions.map((q, qIdx) => (
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