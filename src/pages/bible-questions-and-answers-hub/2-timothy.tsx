import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Titus Quiz", description: "Continue to Paul's letter to Titus.", link: "/bible-questions-and-answers-hub/titus" },
  { title: "1 Timothy Quiz", description: "Go back to Paul's first letter to Timothy.", link: "/bible-questions-and-answers-hub/1-timothy" },
  { title: "Philemon Quiz", description: "Explore Paul's letter to Philemon.", link: "/bible-questions-and-answers-hub/philemon" }
];

const secondTimothyQuestions = [
  { chapter: 1, question: "Who wrote the Book of 2 Timothy?", options: ["Peter", "Paul", "John", "Luke"], answer: 1 },
  { chapter: 1, question: "What does 2 Timothy 1:7 say about the spirit of fear?", options: ["For God hath not given us the spirit of fear", "The spirit of love", "The spirit of power", "The spirit of might"], answer: 0 },
  { chapter: 1, question: "What does 2 Timothy 1:7 say about the spirit of power?", options: ["But of power", "Of fear", "Of weakness", "Of doubt"], answer: 0 },
  { chapter: 1, question: "What does 2 Timothy 1:8 say about being ashamed?", options: ["Be not thou therefore ashamed of the testimony of our Lord", "Be ashamed", "Be afraid", "Be worried"], answer: 0 },
  { chapter: 1, question: "What does 2 Timothy 1:9 say about calling us with a holy calling?", options: ["Who hath saved us, and called us with an holy calling", "An unholy calling", "No calling", "Some calling"], answer: 0 },
  { chapter: 1, question: "What does 2 Timothy 1:10 say about life and immortality?", options: ["But is now made manifest by the appearing of our Saviour Jesus Christ, who hath abolished death", "Who hath caused death", "Who hath ignored death", "Who hath accepted death"], answer: 0 },
  { chapter: 1, question: "What does 2 Timothy 1:12 say about being persuaded?", options: ["For I know whom I have believed, and am persuaded", "Am doubtful", "Am afraid", "Am worried"], answer: 0 },
  { chapter: 1, question: "What does 2 Timothy 1:13 say about the form of sound words?", options: ["Hold fast the form of sound words", "Let go of sound words", "Ignore sound words", "Reject sound words"], answer: 0 },
  { chapter: 1, question: "What does 2 Timothy 1:14 say about the good thing committed unto thee?", options: ["That good thing which was committed unto thee keep", "Ignore it", "Reject it", "Hate it"], answer: 0 },
  { chapter: 1, question: "What does 2 Timothy 1:15 say about all they which are in Asia?", options: ["This thou knowest, that all they which are in Asia be turned away from me", "Turned toward me", "Ignored me", "Accepted me"], answer: 0 },
  { chapter: 2, question: "What does 2 Timothy 2:1 say about being strong?", options: ["Thou therefore, my son, be strong in the grace that is in Christ Jesus", "Be weak", "Be afraid", "Be worried"], answer: 0 },
  { chapter: 2, question: "What does 2 Timothy 2:2 say about committing to faithful men?", options: ["And the things that thou hast heard of me among many witnesses, the same commit thou to faithful men", "To unfaithful men", "To no men", "To some men"], answer: 0 },
  { chapter: 2, question: "What does 2 Timothy 2:3 say about enduring hardness?", options: ["Thou therefore endure hardness, as a good soldier of Jesus Christ", "Avoid hardness", "Ignore hardness", "Reject hardness"], answer: 0 },
  { chapter: 2, question: "What does 2 Timothy 2:4 say about entangling himself with the affairs of this life?", options: ["No man that warreth entangleth himself with the affairs of this life", "Entangles himself", "Ignores himself", "Rejects himself"], answer: 0 },
  { chapter: 2, question: "What does 2 Timothy 2:5 say about striving for masteries?", options: ["And if a man also strive for masteries, yet is he not crowned, except he strive lawfully", "Strive unlawfully", "Not strive", "Ignore striving"], answer: 0 },
  { chapter: 2, question: "What does 2 Timothy 2:8 say about remembering Jesus Christ?", options: ["Remember that Jesus Christ of the seed of David was raised from the dead", "Forget Jesus Christ", "Ignore Jesus Christ", "Reject Jesus Christ"], answer: 0 },
  { chapter: 2, question: "What does 2 Timothy 2:9 say about the word of God not being bound?", options: ["Wherein I suffer trouble, as an evil doer, even unto bonds; but the word of God is not bound", "Is bound", "Is limited", "Is restricted"], answer: 0 },
  { chapter: 2, question: "What does 2 Timothy 2:11 say about a faithful saying?", options: ["It is a faithful saying", "A false saying", "No saying", "Some saying"], answer: 0 },
  { chapter: 2, question: "What does 2 Timothy 2:12 say about suffering with Him?", options: ["If we suffer, we shall also reign with him", "Not reign", "Ignore reigning", "Reject reigning"], answer: 0 },
  { chapter: 2, question: "What does 2 Timothy 2:13 say about being faithless?", options: ["If we believe not, yet he abideth faithful", "Unfaithful", "No faithful", "Some faithful"], answer: 0 },
  { chapter: 2, question: "What does 2 Timothy 2:15 say about studying to shew thyself approved?", options: ["Study to shew thyself approved unto God", "Not approved", "Some approved", "Little approved"], answer: 0 },
  { chapter: 2, question: "What does 2 Timothy 2:16 say about profane and vain babblings?", options: ["But shun profane and vain babblings", "Accept them", "Ignore them", "Reject them"], answer: 0 },
  { chapter: 2, question: "What does 2 Timothy 2:19 say about the foundation of God?", options: ["Nevertheless the foundation of God standeth sure", "Does not stand", "Is weak", "Is uncertain"], answer: 0 },
  { chapter: 2, question: "What does 2 Timothy 2:22 say about fleeing youthful lusts?", options: ["Flee also youthful lusts", "Embrace them", "Ignore them", "Accept them"], answer: 0 },
  { chapter: 2, question: "What does 2 Timothy 2:24 say about the servant of the Lord?", options: ["And the servant of the Lord must not strive", "Must strive", "Should strive", "Can strive"], answer: 0 },
  { chapter: 3, question: "What does 2 Timothy 3:1 say about perilous times?", options: ["This know also, that in the last days perilous times shall come", "Good times", "Easy times", "Safe times"], answer: 0 },
  { chapter: 3, question: "What does 2 Timothy 3:2 say about men being lovers of their own selves?", options: ["For men shall be lovers of their own selves", "Lovers of others", "Lovers of God", "Lovers of truth"], answer: 0 },
  { chapter: 3, question: "What does 2 Timothy 3:5 say about having a form of godliness?", options: ["Having a form of godliness, but denying the power thereof", "Having power", "Having truth", "Having love"], answer: 0 },
  { chapter: 3, question: "What does 2 Timothy 3:7 say about ever learning?", options: ["Ever learning, and never able to come to the knowledge of the truth", "Never learning", "Sometimes learning", "Rarely learning"], answer: 0 },
  { chapter: 3, question: "What does 2 Timothy 3:12 say about all that will live godly?", options: ["Yea, and all that will live godly in Christ Jesus shall suffer persecution", "Shall be blessed", "Shall be praised", "Shall be honoured"], answer: 0 },
  { chapter: 3, question: "What does 2 Timothy 3:14 say about continuing in the things learned?", options: ["But continue thou in the things which thou hast learned", "Stop learning", "Ignore learning", "Reject learning"], answer: 0 },
  { chapter: 3, question: "What does 2 Timothy 3:15 say about the holy scriptures?", options: ["And that from a child thou hast known the holy scriptures", "The unholy scriptures", "No scriptures", "Some scriptures"], answer: 0 },
  { chapter: 3, question: "What does 2 Timothy 3:16 say about all scripture being given by inspiration?", options: ["All scripture is given by inspiration of God", "Some scripture", "No scripture", "Little scripture"], answer: 0 },
  { chapter: 3, question: "What does 2 Timothy 3:17 say about the man of God being perfect?", options: ["That the man of God may be perfect", "Imperfect", "Weak", "Uncertain"], answer: 0 },
  { chapter: 4, question: "What does 2 Timothy 4:1 say about charging Timothy before God?", options: ["I charge thee therefore before God, and the Lord Jesus Christ", "Before men", "Before angels", "Before nothing"], answer: 0 },
  { chapter: 4, question: "What does 2 Timothy 4:2 say about preaching the word?", options: ["Preach the word", "Ignore the word", "Reject the word", "Hate the word"], answer: 0 },
  { chapter: 4, question: "What does 2 Timothy 4:3 say about the time coming?", options: ["For the time will come when they will not endure sound doctrine", "Will endure", "Will accept", "Will love"], answer: 0 },
  { chapter: 4, question: "What does 2 Timothy 4:4 say about turning away their ears from the truth?", options: ["And they shall turn away their ears from the truth", "Toward the truth", "To the truth", "For the truth"], answer: 0 },
  { chapter: 4, question: "What does 2 Timothy 4:5 say about watching in all things?", options: ["But watch thou in all things", "Ignore all things", "Reject all things", "Hate all things"], answer: 0 },
  { chapter: 4, question: "What does 2 Timothy 4:6 say about being ready to be offered?", options: ["For I am now ready to be offered", "Not ready", "Some ready", "Little ready"], answer: 0 },
  { chapter: 4, question: "What does 2 Timothy 4:7 say about fighting a good fight?", options: ["I have fought a good fight", "A bad fight", "No fight", "Some fight"], answer: 0 },
  { chapter: 4, question: "What does 2 Timothy 4:7 say about finishing the course?", options: ["I have finished my course", "Not finished", "Some finished", "Little finished"], answer: 0 },
  { chapter: 4, question: "What does 2 Timothy 4:7 say about keeping the faith?", options: ["I have kept the faith", "Lost the faith", "Ignored the faith", "Rejected the faith"], answer: 0 },
  { chapter: 4, question: "What does 2 Timothy 4:8 say about the crown of righteousness?", options: ["Henceforth there is laid up for me a crown of righteousness", "A crown of thorns", "No crown", "Some crown"], answer: 0 },
  { chapter: 4, question: "What does 2 Timothy 4:10 say about Demas forsaking Paul?", options: ["For Demas hath forsaken me", "Helped me", "Stayed with me", "Accepted me"], answer: 0 },
  { chapter: 4, question: "What does 2 Timothy 4:11 say about Luke being with Paul?", options: ["Only Luke is with me", "No one", "Many", "Some"], answer: 0 },
  { chapter: 4, question: "What does 2 Timothy 4:17 say about the Lord standing with Paul?", options: ["Notwithstanding the Lord stood with me", "Left me", "Ignored me", "Rejected me"], answer: 0 },
  { chapter: 4, question: "What does 2 Timothy 4:18 say about the Lord delivering Paul?", options: ["And the Lord shall deliver me from every evil work", "From some evil", "From no evil", "From little evil"], answer: 0 },
  { chapter: 4, question: "What does 2 Timothy 4:22 say about the Lord being with Timothy's spirit?", options: ["The Lord Jesus Christ be with thy spirit", "With thy body", "With thy mind", "With thy heart"], answer: 0 }
];

export default function SecondTimothyQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(secondTimothyQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(secondTimothyQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === secondTimothyQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== secondTimothyQuestions[i].answer).length;
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
              <CardTitle>2 Timothy Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {secondTimothyQuestions.map((q, qIdx) => (
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