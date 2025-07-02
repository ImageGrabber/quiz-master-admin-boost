import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "James Quiz", description: "Continue to the Book of James.", link: "/bible-questions-and-answers-hub/james" },
  { title: "Philemon Quiz", description: "Go back to Paul's letter to Philemon.", link: "/bible-questions-and-answers-hub/philemon" },
  { title: "1 Peter Quiz", description: "Explore Peter's first letter.", link: "/bible-questions-and-answers-hub/1-peter" }
];

const hebrewsQuestions = [
  { chapter: 1, question: "What is the main theme of the Book of Hebrews?", options: ["The superiority of Christ over all things", "The history of Israel", "The end times", "The law of Moses"], answer: 0 },
  { chapter: 1, question: "Who is described as 'the radiance of God's glory and the exact representation of his being'?", options: ["Moses", "The Son (Jesus)", "The Holy Spirit", "The angels"], answer: 1 },
  { chapter: 1, question: "What does Hebrews say about angels in relation to the Son?", options: ["They are equal to the Son", "They worship the Son", "They are greater than the Son", "They created the Son"], answer: 1 },
  { chapter: 2, question: "What warning does Hebrews give about neglecting salvation?", options: ["It will be easier to escape", "It will be impossible to escape", "It will be delayed", "It will be forgotten"], answer: 1 },
  { chapter: 3, question: "Who is described as 'faithful to the one who appointed him'?", options: ["Moses", "Aaron", "Jesus", "Melchizedek"], answer: 2 },
  { chapter: 3, question: "What does Hebrews call the 'house' that Moses was faithful in?", options: ["The temple", "God's house", "The tabernacle", "The church"], answer: 1 },
  { chapter: 4, question: "What does Hebrews say about entering God's rest?", options: ["It's impossible", "It's only for Jews", "It's available today", "It's only after death"], answer: 2 },
  { chapter: 4, question: "What is the Word of God described as in Hebrews 4:12?", options: ["Living and active", "Dead and powerless", "Silent and still", "Weak and ineffective"], answer: 0 },
  { chapter: 4, question: "Who is our great high priest according to Hebrews?", options: ["Aaron", "Melchizedek", "Jesus the Son of God", "Moses"], answer: 2 },
  { chapter: 4, question: "What can Jesus do because he was tempted in every way?", options: ["Sympathize with our weaknesses", "Ignore our struggles", "Judge us harshly", "Avoid our problems"], answer: 0 },
  { chapter: 7, question: "What does Hebrews say about Melchizedek?", options: ["He was a regular priest", "He was without father or mother", "He was Moses' father", "He was an angel"], answer: 1 },
  { chapter: 7, question: "What is the 'better hope' mentioned in Hebrews?", options: ["The law", "The priesthood", "The new covenant", "The temple"], answer: 2 },
  { chapter: 8, question: "What does Hebrews call the 'copy and shadow' of heavenly things?", options: ["The new covenant", "The law and tabernacle", "The gospel", "The church"], answer: 1 },
  { chapter: 8, question: "What covenant does Hebrews call 'faulty'?", options: ["The new covenant", "The old covenant", "The covenant with Noah", "The covenant with Abraham"], answer: 1 },
  { chapter: 8, question: "What does the new covenant promise to write on hearts?", options: ["The law", "The commandments", "The gospel", "The prophecies"], answer: 0 },
  { chapter: 10, question: "What does Hebrews say about the blood of goats and bulls?", options: ["It cleanses perfectly", "It takes away sins", "It is ineffective", "It is better than Christ's blood"], answer: 2 },
  { chapter: 10, question: "What does Christ's sacrifice do that animal sacrifices could not?", options: ["Make people perfect", "Take away sins", "Both A and B", "Neither A nor B"], answer: 2 },
  { chapter: 11, question: "What does Hebrews call 'the assurance of things hoped for'?", options: ["Love", "Faith", "Hope", "Grace"], answer: 1 },
  { chapter: 11, question: "Who is the first person mentioned in the 'Hall of Faith'?", options: ["Noah", "Abraham", "Moses", "Abel"], answer: 3 },
  { chapter: 11, question: "What did Enoch do that pleased God?", options: ["Built an ark", "Offered sacrifices", "Walked with God", "Led the Israelites"], answer: 2 },
  { chapter: 11, question: "What did Noah do by faith?", options: ["Built an ark", "Left his homeland", "Offered Isaac", "Crossed the Red Sea"], answer: 0 },
  { chapter: 11, question: "What did Abraham do when called to go to a place he would receive as inheritance?", options: ["Refused to go", "Went without knowing where", "Asked for directions", "Sent someone else"], answer: 1 },
  { chapter: 11, question: "What does Hebrews say about the heroes of faith?", options: ["They received what was promised", "They did not receive what was promised", "They were all martyred", "They all lived long lives"], answer: 1 },
  { chapter: 12, question: "What does Hebrews call 'the race marked out for us'?", options: ["The Christian life", "The Olympic games", "The journey to heaven", "The path to success"], answer: 0 },
  { chapter: 12, question: "What does Hebrews say about God's discipline?", options: ["It's always pleasant", "It produces a harvest of righteousness", "It's optional", "It's only for children"], answer: 1 }
];

export default function HebrewsQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(hebrewsQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(hebrewsQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === hebrewsQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== hebrewsQuestions[i].answer).length;
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
              <CardTitle>Hebrews Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {hebrewsQuestions.map((q, qIdx) => (
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