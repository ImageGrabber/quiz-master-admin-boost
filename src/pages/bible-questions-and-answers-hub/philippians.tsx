import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Colossians Quiz", description: "Continue to Paul's letter to the Colossians.", link: "/bible-questions-and-answers-hub/colossians" },
  { title: "Ephesians Quiz", description: "Go back to Paul's letter to the Ephesians.", link: "/bible-questions-and-answers-hub/ephesians" },
  { title: "1 Thessalonians Quiz", description: "Explore Paul's letter to the Thessalonians.", link: "/bible-questions-and-answers-hub/1-thessalonians" }
];

const philippiansQuestions = [
  { chapter: 1, question: "Who wrote the Book of Philippians?", options: ["Peter", "Paul", "John", "Luke"], answer: 1 },
  { chapter: 1, question: "What does Philippians 1:6 say about the work God began?", options: ["He will complete it until the day of Jesus Christ", "He will abandon it", "He will ignore it", "He will destroy it"], answer: 0 },
  { chapter: 1, question: "What does Philippians 1:9 say about love?", options: ["That your love may abound still more", "That your love may decrease", "That your love may disappear", "That your love may be hidden"], answer: 0 },
  { chapter: 1, question: "What does Philippians 1:12 say about Paul's circumstances?", options: ["The things which happened to me have actually turned out for the furtherance of the gospel", "They have hindered the gospel", "They have stopped the gospel", "They have nothing to do with the gospel"], answer: 0 },
  { chapter: 1, question: "What does Philippians 1:21 say about living and dying?", options: ["For to me, to live is Christ, and to die is gain", "For to me, to live is gain, and to die is loss", "For to me, to live is nothing, and to die is nothing", "For to me, to live is pain, and to die is pain"], answer: 0 },
  { chapter: 1, question: "What does Philippians 1:27 say about conduct?", options: ["Let your conduct be worthy of the gospel of Christ", "Let your conduct be whatever you want", "Let your conduct be hidden", "Let your conduct be ignored"], answer: 0 },
  { chapter: 2, question: "What does Philippians 2:3 say about doing things?", options: ["Let nothing be done through selfish ambition", "Do everything for yourself", "Ignore others", "Put yourself first"], answer: 0 },
  { chapter: 2, question: "What does Philippians 2:4 say about looking out for others?", options: ["Look out not only for your own interests, but also for the interests of others", "Look out only for yourself", "Ignore others' interests", "Hurt others' interests"], answer: 0 },
  { chapter: 2, question: "What does Philippians 2:5 say about having the mind of Christ?", options: ["Let this mind be in you which was also in Christ Jesus", "Have your own mind", "Have no mind", "Have a different mind"], answer: 0 },
  { chapter: 2, question: "What does Philippians 2:6 say about Christ's form?", options: ["He did not consider it robbery to be equal with God", "He considered it robbery", "He was not equal with God", "He was less than God"], answer: 0 },
  { chapter: 2, question: "What does Philippians 2:7 say about Christ making Himself?", options: ["He made Himself of no reputation", "He made Himself famous", "He made Himself rich", "He made Himself powerful"], answer: 0 },
  { chapter: 2, question: "What does Philippians 2:8 say about Christ's obedience?", options: ["He became obedient to the point of death", "He was never obedient", "He was partially obedient", "He was disobedient"], answer: 0 },
  { chapter: 2, question: "What does Philippians 2:9 say about God exalting Christ?", options: ["God has highly exalted Him", "God has humbled Him", "God has ignored Him", "God has rejected Him"], answer: 0 },
  { chapter: 2, question: "What does Philippians 2:10 say about every knee bowing?", options: ["At the name of Jesus every knee should bow", "No knee should bow", "Only some knees should bow", "Knees don't matter"], answer: 0 },
  { chapter: 2, question: "What does Philippians 2:12 say about working out salvation?", options: ["Work out your own salvation with fear and trembling", "Don't work at all", "Let others work for you", "Ignore salvation"], answer: 0 },
  { chapter: 2, question: "What does Philippians 2:13 say about God working in us?", options: ["It is God who works in you both to will and to do", "God doesn't work in us", "We work alone", "No one works"], answer: 0 },
  { chapter: 2, question: "What does Philippians 2:14 say about doing things?", options: ["Do all things without complaining", "Complain about everything", "Complain sometimes", "Ignore complaints"], answer: 0 },
  { chapter: 2, question: "What does Philippians 2:15 say about being blameless?", options: ["That you may become blameless and harmless", "That you may become guilty", "That you may become harmful", "That you may become nothing"], answer: 0 },
  { chapter: 3, question: "What does Philippians 3:3 say about worshiping in Spirit?", options: ["We are the circumcision, who worship God in the Spirit", "We worship in the flesh", "We don't worship", "We worship ourselves"], answer: 0 },
  { chapter: 3, question: "What does Philippians 3:7 say about Paul's gains?", options: ["I count all things loss for the excellence of the knowledge of Christ", "I count all things gain", "I count nothing", "I count only some things"], answer: 0 },
  { chapter: 3, question: "What does Philippians 3:8 say about counting all things loss?", options: ["I count all things loss for Christ", "I count nothing loss", "I count some things loss", "I count everything gain"], answer: 0 },
  { chapter: 3, question: "What does Philippians 3:10 say about knowing Christ?", options: ["That I may know Him and the power of His resurrection", "That I may ignore Him", "That I may reject Him", "That I may fear Him"], answer: 0 },
  { chapter: 3, question: "What does Philippians 3:13 say about forgetting?", options: ["Forgetting those things which are behind", "Remembering everything", "Ignoring the past", "Living in the past"], answer: 0 },
  { chapter: 3, question: "What does Philippians 3:14 say about pressing toward?", options: ["I press toward the goal for the prize", "I press toward nothing", "I press toward the past", "I don't press at all"], answer: 0 },
  { chapter: 3, question: "What does Philippians 3:20 say about our citizenship?", options: ["Our citizenship is in heaven", "Our citizenship is on earth", "We have no citizenship", "Our citizenship is nowhere"], answer: 0 },
  { chapter: 4, question: "What does Philippians 4:4 say about rejoicing?", options: ["Rejoice in the Lord always", "Rejoice never", "Rejoice sometimes", "Rejoice in yourself"], answer: 0 },
  { chapter: 4, question: "What does Philippians 4:6 say about being anxious?", options: ["Be anxious for nothing", "Be anxious for everything", "Be anxious sometimes", "Be anxious always"], answer: 0 },
  { chapter: 4, question: "What does Philippians 4:6 say about prayer?", options: ["Let your requests be made known to God", "Keep your requests to yourself", "Tell no one your requests", "Ignore your requests"], answer: 0 },
  { chapter: 4, question: "What does Philippians 4:7 say about the peace of God?", options: ["The peace of God will guard your hearts and minds", "The peace of God will leave you", "The peace of God doesn't exist", "The peace of God is temporary"], answer: 0 },
  { chapter: 4, question: "What does Philippians 4:8 say about thinking?", options: ["Whatever things are true, noble, just, pure, lovely, of good report, think on these things", "Think on whatever you want", "Think on nothing", "Think on evil things"], answer: 0 },
  { chapter: 4, question: "What does Philippians 4:11 say about being content?", options: ["I have learned to be content", "I am never content", "I am sometimes content", "I don't know what content means"], answer: 0 },
  { chapter: 4, question: "What does Philippians 4:13 say about all things?", options: ["I can do all things through Christ who strengthens me", "I can do nothing", "I can do some things", "I can do things alone"], answer: 0 },
  { chapter: 4, question: "What does Philippians 4:19 say about God supplying needs?", options: ["My God shall supply all your need", "God will supply nothing", "God will supply some things", "God doesn't supply anything"], answer: 0 }
];

export default function PhilippiansQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(philippiansQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(philippiansQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === philippiansQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== philippiansQuestions[i].answer).length;
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
              <CardTitle>Philippians Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {philippiansQuestions.map((q, qIdx) => (
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