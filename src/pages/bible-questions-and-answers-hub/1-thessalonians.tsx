import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "2 Thessalonians Quiz", description: "Continue to Paul's second letter to the Thessalonians.", link: "/bible-questions-and-answers-hub/2-thessalonians" },
  { title: "Colossians Quiz", description: "Go back to Paul's letter to the Colossians.", link: "/bible-questions-and-answers-hub/colossians" },
  { title: "1 Timothy Quiz", description: "Explore Paul's letter to Timothy.", link: "/bible-questions-and-answers-hub/1-timothy" }
];

const firstThessaloniansQuestions = [
  { chapter: 1, question: "Who wrote the Book of 1 Thessalonians?", options: ["Peter", "Paul", "John", "Luke"], answer: 1 },
  { chapter: 1, question: "What does 1 Thessalonians 1:3 say about their work?", options: ["Your work of faith, labor of love, and patience of hope", "Your work of doubt", "Your work of fear", "Your work of anger"], answer: 0 },
  { chapter: 1, question: "What does 1 Thessalonians 1:5 say about the gospel?", options: ["Our gospel did not come to you in word only, but also in power", "Our gospel came only in word", "Our gospel came in weakness", "Our gospel came in fear"], answer: 0 },
  { chapter: 1, question: "What does 1 Thessalonians 1:6 say about receiving the word?", options: ["You received the word in much affliction", "You received the word in comfort", "You received the word in peace", "You received the word in joy"], answer: 0 },
  { chapter: 1, question: "What does 1 Thessalonians 1:8 say about their faith?", options: ["Your faith toward God has gone out", "Your faith has stayed hidden", "Your faith has decreased", "Your faith has disappeared"], answer: 0 },
  { chapter: 1, question: "What does 1 Thessalonians 1:9 say about turning to God?", options: ["You turned to God from idols", "You turned to idols from God", "You stayed with idols", "You ignored God"], answer: 0 },
  { chapter: 1, question: "What does 1 Thessalonians 1:10 say about waiting for?", options: ["To wait for His Son from heaven", "To wait for nothing", "To wait for yourself", "To wait for the world"], answer: 0 },
  { chapter: 2, question: "What does 1 Thessalonians 2:4 say about being approved?", options: ["As we have been approved by God", "As we have been approved by men", "As we have been approved by ourselves", "As we have been approved by no one"], answer: 0 },
  { chapter: 2, question: "What does 1 Thessalonians 2:7 say about being gentle?", options: ["We were gentle among you", "We were harsh among you", "We were angry among you", "We were distant among you"], answer: 0 },
  { chapter: 2, question: "What does 1 Thessalonians 2:8 say about sharing?", options: ["We were well pleased to impart to you the gospel", "We were reluctant to share", "We refused to share", "We ignored you"], answer: 0 },
  { chapter: 2, question: "What does 1 Thessalonians 2:10 say about being blameless?", options: ["You are witnesses, and God also, how devoutly and justly and blamelessly we behaved", "We behaved badly", "We behaved selfishly", "We behaved carelessly"], answer: 0 },
  { chapter: 2, question: "What does 1 Thessalonians 2:12 say about walking?", options: ["That you would walk worthy of God", "That you would walk however you want", "That you would walk in sin", "That you would walk away"], answer: 0 },
  { chapter: 2, question: "What does 1 Thessalonians 2:13 say about receiving the word?", options: ["You received it as the word of God", "You received it as the word of men", "You ignored it", "You rejected it"], answer: 0 },
  { chapter: 2, question: "What does 1 Thessalonians 2:19 say about Paul's hope?", options: ["For what is our hope, or joy, or crown of rejoicing?", "For what is our despair?", "For what is our fear?", "For what is our anger?"], answer: 0 },
  { chapter: 3, question: "What does 1 Thessalonians 3:3 say about being appointed?", options: ["For this reason, when I could no longer endure it, I sent to know your faith", "I ignored your faith", "I forgot your faith", "I rejected your faith"], answer: 0 },
  { chapter: 3, question: "What does 1 Thessalonians 3:5 say about the tempter?", options: ["Lest by some means the tempter had tempted you", "The tempter never tempted you", "The tempter helped you", "The tempter ignored you"], answer: 0 },
  { chapter: 3, question: "What does 1 Thessalonians 3:8 say about standing fast?", options: ["For now we live, if you stand fast in the Lord", "We live regardless", "We live in sin", "We live in fear"], answer: 0 },
  { chapter: 3, question: "What does 1 Thessalonians 3:12 say about love?", options: ["May the Lord make you increase and abound in love", "May the Lord decrease your love", "May the Lord ignore your love", "May the Lord reject your love"], answer: 0 },
  { chapter: 3, question: "What does 1 Thessalonians 3:13 say about being blameless?", options: ["To establish your hearts blameless in holiness", "To make you guilty", "To make you sinful", "To make you weak"], answer: 0 },
  { chapter: 4, question: "What does 1 Thessalonians 4:1 say about walking?", options: ["That you should abound more and more", "That you should decrease", "That you should stay the same", "That you should go backwards"], answer: 0 },
  { chapter: 4, question: "What does 1 Thessalonians 4:3 say about sanctification?", options: ["This is the will of God, your sanctification", "This is not God's will", "This is optional", "This is impossible"], answer: 0 },
  { chapter: 4, question: "What does 1 Thessalonians 4:4 say about possessing?", options: ["That each of you should know how to possess his own vessel", "That you should possess others", "That you should possess nothing", "That you should possess everything"], answer: 0 },
  { chapter: 4, question: "What does 1 Thessalonians 4:7 say about calling?", options: ["For God did not call us to uncleanness", "God called us to uncleanness", "God called us to sin", "God called us to evil"], answer: 0 },
  { chapter: 4, question: "What does 1 Thessalonians 4:8 say about rejecting?", options: ["He who rejects this does not reject man, but God", "He who rejects this rejects man", "He who rejects this rejects himself", "He who rejects this rejects nothing"], answer: 0 },
  { chapter: 4, question: "What does 1 Thessalonians 4:9 say about brotherly love?", options: ["Concerning brotherly love you have no need that I should write to you", "You need to learn brotherly love", "You have no brotherly love", "You reject brotherly love"], answer: 0 },
  { chapter: 4, question: "What does 1 Thessalonians 4:11 say about ambition?", options: ["That you aspire to lead a quiet life", "That you aspire to be famous", "That you aspire to be rich", "That you aspire to be powerful"], answer: 0 },
  { chapter: 4, question: "What does 1 Thessalonians 4:11 say about working?", options: ["To work with your own hands", "To let others work for you", "To avoid work", "To ignore work"], answer: 0 },
  { chapter: 4, question: "What does 1 Thessalonians 4:13 say about those who sleep?", options: ["I do not want you to be ignorant, brethren, concerning those who have fallen asleep", "I want you to be ignorant", "I want you to forget them", "I want you to ignore them"], answer: 0 },
  { chapter: 4, question: "What does 1 Thessalonians 4:14 say about believing?", options: ["If we believe that Jesus died and rose again", "If we don't believe", "If we doubt", "If we ignore"], answer: 0 },
  { chapter: 4, question: "What does 1 Thessalonians 4:16 say about the Lord descending?", options: ["The Lord Himself will descend from heaven", "The Lord will stay in heaven", "The Lord will ignore us", "The Lord will reject us"], answer: 0 },
  { chapter: 4, question: "What does 1 Thessalonians 4:17 say about being caught up?", options: ["We shall be caught up together with them", "We shall be left behind", "We shall be ignored", "We shall be rejected"], answer: 0 },
  { chapter: 4, question: "What does 1 Thessalonians 4:18 say about comforting?", options: ["Comfort one another with these words", "Discourage one another", "Ignore one another", "Reject one another"], answer: 0 },
  { chapter: 5, question: "What does 1 Thessalonians 5:2 say about the day of the Lord?", options: ["The day of the Lord so comes as a thief in the night", "The day of the Lord comes openly", "The day of the Lord never comes", "The day of the Lord is predictable"], answer: 0 },
  { chapter: 5, question: "What does 1 Thessalonians 5:4 say about being in darkness?", options: ["You, brethren, are not in darkness", "You are in darkness", "You are in light", "You are in confusion"], answer: 0 },
  { chapter: 5, question: "What does 1 Thessalonians 5:5 say about being children?", options: ["You are all sons of light and sons of the day", "You are sons of darkness", "You are sons of night", "You are sons of confusion"], answer: 0 },
  { chapter: 5, question: "What does 1 Thessalonians 5:6 say about watching?", options: ["Let us watch and be sober", "Let us sleep and be drunk", "Let us ignore and be careless", "Let us reject and be angry"], answer: 0 },
  { chapter: 5, question: "What does 1 Thessalonians 5:8 say about putting on?", options: ["Let us who are of the day be sober, putting on the breastplate of faith and love", "Let us put on nothing", "Let us put on fear", "Let us put on doubt"], answer: 0 },
  { chapter: 5, question: "What does 1 Thessalonians 5:9 say about God's appointment?", options: ["For God did not appoint us to wrath", "God appointed us to wrath", "God appointed us to fear", "God appointed us to doubt"], answer: 0 },
  { chapter: 5, question: "What does 1 Thessalonians 5:11 say about building up?", options: ["Comfort each other and edify one another", "Tear each other down", "Ignore each other", "Reject each other"], answer: 0 },
  { chapter: 5, question: "What does 1 Thessalonians 5:12 say about recognizing?", options: ["To recognize those who labor among you", "To ignore those who labor", "To reject those who labor", "To hate those who labor"], answer: 0 },
  { chapter: 5, question: "What does 1 Thessalonians 5:14 say about the unruly?", options: ["Warn those who are unruly", "Ignore the unruly", "Join the unruly", "Praise the unruly"], answer: 0 },
  { chapter: 5, question: "What does 1 Thessalonians 5:15 say about rendering evil?", options: ["See that no one renders evil for evil", "Render evil for evil", "Ignore evil", "Join evil"], answer: 0 },
  { chapter: 5, question: "What does 1 Thessalonians 5:16 say about rejoicing?", options: ["Rejoice always", "Rejoice never", "Rejoice sometimes", "Rejoice rarely"], answer: 0 },
  { chapter: 5, question: "What does 1 Thessalonians 5:17 say about prayer?", options: ["Pray without ceasing", "Pray sometimes", "Pray never", "Pray rarely"], answer: 0 },
  { chapter: 5, question: "What does 1 Thessalonians 5:18 say about giving thanks?", options: ["In everything give thanks", "Give thanks for nothing", "Give thanks sometimes", "Give thanks rarely"], answer: 0 },
  { chapter: 5, question: "What does 1 Thessalonians 5:19 say about quenching?", options: ["Do not quench the Spirit", "Quench the Spirit", "Ignore the Spirit", "Reject the Spirit"], answer: 0 },
  { chapter: 5, question: "What does 1 Thessalonians 5:20 say about despising?", options: ["Do not despise prophecies", "Despise prophecies", "Ignore prophecies", "Reject prophecies"], answer: 0 },
  { chapter: 5, question: "What does 1 Thessalonians 5:21 say about testing?", options: ["Test all things; hold fast what is good", "Test nothing", "Accept everything", "Reject everything"], answer: 0 },
  { chapter: 5, question: "What does 1 Thessalonians 5:22 say about abstaining?", options: ["Abstain from every form of evil", "Embrace every form of evil", "Ignore evil", "Accept evil"], answer: 0 },
  { chapter: 5, question: "What does 1 Thessalonians 5:23 say about being preserved?", options: ["May your whole spirit, soul, and body be preserved blameless", "May you be destroyed", "May you be ignored", "May you be rejected"], answer: 0 }
];

export default function FirstThessaloniansQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(firstThessaloniansQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(firstThessaloniansQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === firstThessaloniansQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== firstThessaloniansQuestions[i].answer).length;
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
              <CardTitle>1 Thessalonians Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {firstThessaloniansQuestions.map((q, qIdx) => (
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