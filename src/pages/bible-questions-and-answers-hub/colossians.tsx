import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "1 Thessalonians Quiz", description: "Continue to Paul's letter to the Thessalonians.", link: "/bible-questions-and-answers-hub/1-thessalonians" },
  { title: "Philippians Quiz", description: "Go back to Paul's letter to the Philippians.", link: "/bible-questions-and-answers-hub/philippians" },
  { title: "2 Thessalonians Quiz", description: "Explore Paul's second letter to the Thessalonians.", link: "/bible-questions-and-answers-hub/2-thessalonians" }
];

const colossiansQuestions = [
  { chapter: 1, question: "Who wrote the Book of Colossians?", options: ["Peter", "Paul", "John", "Luke"], answer: 1 },
  { chapter: 1, question: "What does Colossians 1:3 say about giving thanks?", options: ["We give thanks to God always", "We never give thanks", "We give thanks sometimes", "We give thanks to others"], answer: 0 },
  { chapter: 1, question: "What does Colossians 1:4 say about faith and love?", options: ["Your faith in Christ Jesus and your love for all the saints", "Your faith in yourself", "Your love for money", "Your faith in nothing"], answer: 0 },
  { chapter: 1, question: "What does Colossians 1:6 say about the gospel?", options: ["It is bringing forth fruit", "It is not working", "It is dead", "It is useless"], answer: 0 },
  { chapter: 1, question: "What does Colossians 1:9 say about being filled?", options: ["That you may be filled with the knowledge of His will", "That you may be filled with yourself", "That you may be empty", "That you may be confused"], answer: 0 },
  { chapter: 1, question: "What does Colossians 1:10 say about walking?", options: ["Walk worthy of the Lord", "Walk however you want", "Walk in sin", "Walk away"], answer: 0 },
  { chapter: 1, question: "What does Colossians 1:13 say about being delivered?", options: ["He has delivered us from the power of darkness", "He has delivered us to darkness", "He has ignored us", "He has abandoned us"], answer: 0 },
  { chapter: 1, question: "What does Colossians 1:14 say about redemption?", options: ["In whom we have redemption through His blood", "We have no redemption", "We earn redemption", "Redemption is impossible"], answer: 0 },
  { chapter: 1, question: "What does Colossians 1:15 say about Christ being the image?", options: ["He is the image of the invisible God", "He is not the image", "He is a different image", "He has no image"], answer: 0 },
  { chapter: 1, question: "What does Colossians 1:16 say about all things being created?", options: ["All things were created through Him and for Him", "Nothing was created through Him", "Some things were created through Him", "He didn't create anything"], answer: 0 },
  { chapter: 1, question: "What does Colossians 1:17 say about Christ being before all things?", options: ["He is before all things", "He is after all things", "He is equal to all things", "He is less than all things"], answer: 0 },
  { chapter: 1, question: "What does Colossians 1:18 say about Christ being the head?", options: ["He is the head of the body, the church", "He is not the head", "He is a member", "He is nothing"], answer: 0 },
  { chapter: 1, question: "What does Colossians 1:18 say about Christ being the firstborn?", options: ["He is the firstborn from the dead", "He is not the firstborn", "He is the last born", "He was never born"], answer: 0 },
  { chapter: 1, question: "What does Colossians 1:19 say about the fullness dwelling in Christ?", options: ["For it pleased the Father that in Him all the fullness should dwell", "No fullness dwells in Him", "Some fullness dwells in Him", "Fullness doesn't matter"], answer: 0 },
  { chapter: 1, question: "What does Colossians 1:20 say about reconciling all things?", options: ["To reconcile all things to Himself", "To reject all things", "To ignore all things", "To destroy all things"], answer: 0 },
  { chapter: 1, question: "What does Colossians 1:21 say about being alienated?", options: ["You were once alienated and enemies", "You were never alienated", "You are still alienated", "You are not enemies"], answer: 0 },
  { chapter: 1, question: "What does Colossians 1:22 say about being presented?", options: ["To present you holy, and blameless", "To present you as sinners", "To present you as nothing", "To reject you"], answer: 0 },
  { chapter: 1, question: "What does Colossians 1:23 say about continuing in the faith?", options: ["If indeed you continue in the faith", "If you stop in the faith", "If you ignore the faith", "If you reject the faith"], answer: 0 },
  { chapter: 1, question: "What does Colossians 1:27 say about the riches of the glory?", options: ["The riches of the glory of this mystery among the Gentiles", "The poverty of the glory", "The absence of glory", "The rejection of glory"], answer: 0 },
  { chapter: 1, question: "What does Colossians 1:27 say about Christ in you?", options: ["Christ in you, the hope of glory", "Christ outside you", "Christ against you", "Christ ignoring you"], answer: 0 },
  { chapter: 2, question: "What does Colossians 2:2 say about being knit together?", options: ["That their hearts may be knit together in love", "That their hearts may be separated", "That their hearts may be broken", "That their hearts may be ignored"], answer: 0 },
  { chapter: 2, question: "What does Colossians 2:3 say about all treasures of wisdom?", options: ["In whom are hidden all the treasures of wisdom", "In whom are no treasures", "In whom are some treasures", "In whom are worthless treasures"], answer: 0 },
  { chapter: 2, question: "What does Colossians 2:6 say about walking in Christ?", options: ["As you therefore have received Christ Jesus the Lord, so walk in Him", "Walk away from Him", "Walk against Him", "Walk without Him"], answer: 0 },
  { chapter: 2, question: "What does Colossians 2:8 say about being spoiled?", options: ["Lest anyone should spoil you through philosophy", "Let everyone spoil you", "Ignore philosophy", "Embrace all philosophy"], answer: 0 },
  { chapter: 2, question: "What does Colossians 2:9 say about the fullness of the Godhead?", options: ["In Him dwells all the fullness of the Godhead bodily", "No fullness dwells in Him", "Some fullness dwells in Him", "Fullness doesn't matter"], answer: 0 },
  { chapter: 2, question: "What does Colossians 2:10 say about being complete?", options: ["You are complete in Him", "You are incomplete in Him", "You are nothing in Him", "You are separate from Him"], answer: 0 },
  { chapter: 2, question: "What does Colossians 2:12 say about being buried with Christ?", options: ["Buried with Him in baptism", "Buried without Him", "Not buried at all", "Buried against Him"], answer: 0 },
  { chapter: 2, question: "What does Colossians 2:13 say about being dead in trespasses?", options: ["You, being dead in your trespasses, He has made alive", "You are still dead", "You were never dead", "You are dying"], answer: 0 },
  { chapter: 2, question: "What does Colossians 2:14 say about the handwriting of requirements?", options: ["Having wiped out the handwriting of requirements", "Having kept the handwriting", "Having ignored the handwriting", "Having created the handwriting"], answer: 0 },
  { chapter: 2, question: "What does Colossians 2:15 say about disarming principalities?", options: ["Having disarmed principalities and powers", "Having armed them", "Having ignored them", "Having joined them"], answer: 0 },
  { chapter: 2, question: "What does Colossians 2:16 say about letting no one judge you?", options: ["Let no one judge you in food or drink", "Let everyone judge you", "Judge yourself", "Ignore judgment"], answer: 0 },
  { chapter: 2, question: "What does Colossians 2:18 say about being defrauded?", options: ["Let no one defraud you of your reward", "Let everyone defraud you", "Defraud yourself", "Ignore fraud"], answer: 0 },
  { chapter: 2, question: "What does Colossians 2:20 say about being dead with Christ?", options: ["If you died with Christ from the basic principles of the world", "If you are alive with the world", "If you ignore Christ", "If you reject Christ"], answer: 0 },
  { chapter: 3, question: "What does Colossians 3:1 say about seeking things above?", options: ["Seek those things which are above", "Seek things below", "Seek nothing", "Seek yourself"], answer: 0 },
  { chapter: 3, question: "What does Colossians 3:2 say about setting your mind?", options: ["Set your mind on things above", "Set your mind on things below", "Set your mind on nothing", "Set your mind on yourself"], answer: 0 },
  { chapter: 3, question: "What does Colossians 3:3 say about your life being hidden?", options: ["Your life is hidden with Christ in God", "Your life is visible", "Your life is lost", "Your life is nothing"], answer: 0 },
  { chapter: 3, question: "What does Colossians 3:5 say about putting to death?", options: ["Put to death your members which are on the earth", "Keep them alive", "Ignore them", "Celebrate them"], answer: 0 },
  { chapter: 3, question: "What does Colossians 3:8 say about putting off?", options: ["Put off all these: anger, wrath, malice", "Keep them all", "Ignore them", "Embrace them"], answer: 0 },
  { chapter: 3, question: "What does Colossians 3:9 say about lying to one another?", options: ["Do not lie to one another", "Lie to everyone", "Lie sometimes", "Ignore lying"], answer: 0 },
  { chapter: 3, question: "What does Colossians 3:10 say about being renewed?", options: ["And have put on the new man who is renewed", "Stay in the old man", "Ignore renewal", "Reject renewal"], answer: 0 },
  { chapter: 3, question: "What does Colossians 3:12 say about putting on?", options: ["Put on tender mercies, kindness, humility", "Put on anger", "Put on nothing", "Put on pride"], answer: 0 },
  { chapter: 3, question: "What does Colossians 3:13 say about bearing with one another?", options: ["Bearing with one another, and forgiving one another", "Bearing grudges", "Ignoring others", "Rejecting others"], answer: 0 },
  { chapter: 3, question: "What does Colossians 3:14 say about love?", options: ["But above all these things put on love", "Put on hate", "Put on nothing", "Put on anger"], answer: 0 },
  { chapter: 3, question: "What does Colossians 3:15 say about the peace of God?", options: ["Let the peace of God rule in your hearts", "Let anger rule", "Let nothing rule", "Let yourself rule"], answer: 0 },
  { chapter: 3, question: "What does Colossians 3:16 say about the word of Christ?", options: ["Let the word of Christ dwell in you richly", "Let it dwell poorly", "Let it not dwell", "Let it dwell elsewhere"], answer: 0 },
  { chapter: 3, question: "What does Colossians 3:17 say about doing things?", options: ["Whatever you do in word or deed, do all in the name of the Lord", "Do nothing in His name", "Do some things in His name", "Do things for yourself"], answer: 0 },
  { chapter: 3, question: "What does Colossians 3:18 say about wives?", options: ["Wives, submit to your own husbands", "Wives, dominate your husbands", "Wives, ignore your husbands", "Wives, reject your husbands"], answer: 0 },
  { chapter: 3, question: "What does Colossians 3:19 say about husbands?", options: ["Husbands, love your wives", "Husbands, hate your wives", "Husbands, ignore your wives", "Husbands, control your wives"], answer: 0 },
  { chapter: 3, question: "What does Colossians 3:20 say about children?", options: ["Children, obey your parents", "Children, disobey your parents", "Children, ignore your parents", "Children, hate your parents"], answer: 0 },
  { chapter: 3, question: "What does Colossians 3:21 say about fathers?", options: ["Fathers, do not provoke your children", "Fathers, always provoke your children", "Fathers, ignore your children", "Fathers, abandon your children"], answer: 0 },
  { chapter: 3, question: "What does Colossians 3:23 say about doing work?", options: ["Whatever you do, do it heartily, as to the Lord", "Do it half-heartedly", "Do it for yourself", "Don't do it at all"], answer: 0 },
  { chapter: 4, question: "What does Colossians 4:2 say about prayer?", options: ["Continue earnestly in prayer", "Stop praying", "Pray sometimes", "Pray only for yourself"], answer: 0 },
  { chapter: 4, question: "What does Colossians 4:3 say about praying for Paul?", options: ["Praying also for us", "Don't pray for us", "Pray against us", "Ignore us"], answer: 0 },
  { chapter: 4, question: "What does Colossians 4:5 say about walking in wisdom?", options: ["Walk in wisdom toward those who are outside", "Walk in foolishness", "Walk in ignorance", "Walk in anger"], answer: 0 },
  { chapter: 4, question: "What does Colossians 4:6 say about speech?", options: ["Let your speech always be with grace", "Let your speech be harsh", "Let your speech be silent", "Let your speech be angry"], answer: 0 }
];

export default function ColossiansQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(colossiansQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(colossiansQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === colossiansQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== colossiansQuestions[i].answer).length;
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
              <CardTitle>Colossians Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {colossiansQuestions.map((q, qIdx) => (
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