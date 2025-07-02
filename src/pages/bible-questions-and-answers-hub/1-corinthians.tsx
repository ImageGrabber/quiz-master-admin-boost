import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "2 Corinthians Quiz", description: "Continue to Paul's second letter to the Corinthians.", link: "/bible-questions-and-answers-hub/2-corinthians" },
  { title: "Romans Quiz", description: "Go back to Paul's letter to the Romans.", link: "/bible-questions-and-answers-hub/romans" },
  { title: "Galatians Quiz", description: "Explore Paul's letter to the Galatians.", link: "/bible-questions-and-answers-hub/galatians" }
];

const firstCorinthiansQuestions = [
  { chapter: 1, question: "Who wrote the Book of 1 Corinthians?", options: ["Peter", "Paul", "John", "Luke"], answer: 1 },
  { chapter: 1, question: "What does 1 Corinthians 1:10 say about divisions?", options: ["They are good", "They should be avoided", "They are necessary", "They are temporary"], answer: 1 },
  { chapter: 1, question: "What does 1 Corinthians 1:18 say about the message of the cross?", options: ["It is foolishness to those perishing", "It is wisdom to all", "It is hidden from everyone", "It is easy to understand"], answer: 0 },
  { chapter: 1, question: "What does 1 Corinthians 1:25 say about God's foolishness?", options: ["It is wiser than human wisdom", "It is the same as human wisdom", "It doesn't exist", "It is meaningless"], answer: 0 },
  { chapter: 2, question: "What does 1 Corinthians 2:9 say about what God has prepared?", options: ["Eye has not seen, ear has not heard", "It is already revealed", "It is only for Jews", "It is temporary"], answer: 0 },
  { chapter: 2, question: "What does 1 Corinthians 2:14 say about the natural person?", options: ["They accept spiritual things", "They reject spiritual things", "They are neutral", "They are saved"], answer: 1 },
  { chapter: 3, question: "What does 1 Corinthians 3:6 say about planting and watering?", options: ["Paul planted, Apollos watered", "Both planted and watered", "Neither planted nor watered", "Only Paul planted"], answer: 0 },
  { chapter: 3, question: "What does 1 Corinthians 3:16 say about the church?", options: ["It is God's temple", "It is just a building", "It is temporary", "It is not important"], answer: 0 },
  { chapter: 4, question: "What does 1 Corinthians 4:2 say about stewards?", options: ["They must be found faithful", "They can be unfaithful", "They are not accountable", "They are above the law"], answer: 0 },
  { chapter: 5, question: "What does 1 Corinthians 5:6 say about a little leaven?", options: ["It leavens the whole lump", "It is harmless", "It can be ignored", "It is beneficial"], answer: 0 },
  { chapter: 6, question: "What does 1 Corinthians 6:19 say about our bodies?", options: ["They are temples of the Holy Spirit", "They are unimportant", "They belong to us alone", "They are temporary"], answer: 0 },
  { chapter: 6, question: "What does 1 Corinthians 6:20 say about glorifying God?", options: ["Glorify God in your body", "Glorify yourself", "Glorify others", "Don't glorify anyone"], answer: 0 },
  { chapter: 7, question: "What does 1 Corinthians 7:1 say about marriage?", options: ["It is good for a man not to touch a woman", "It is required for all", "It is forbidden", "It is optional"], answer: 0 },
  { chapter: 7, question: "What does 1 Corinthians 7:7 say about Paul's wish?", options: ["All were single like him", "All were married", "All were divorced", "All were widowed"], answer: 0 },
  { chapter: 8, question: "What does 1 Corinthians 8:1 say about knowledge?", options: ["Knowledge puffs up, love builds up", "Knowledge is everything", "Knowledge is useless", "Knowledge is dangerous"], answer: 0 },
  { chapter: 9, question: "What does 1 Corinthians 9:24 say about running the race?", options: ["Run to win the prize", "Run for fun", "Run slowly", "Don't run at all"], answer: 0 },
  { chapter: 9, question: "What does 1 Corinthians 9:27 say about Paul's body?", options: ["He disciplines it", "He ignores it", "He indulges it", "He punishes it"], answer: 0 },
  { chapter: 10, question: "What does 1 Corinthians 10:13 say about temptation?", options: ["God provides a way of escape", "God causes temptation", "God ignores temptation", "God punishes for temptation"], answer: 0 },
  { chapter: 10, question: "What does 1 Corinthians 10:31 say about doing things?", options: ["Do all for God's glory", "Do all for yourself", "Do all for others", "Do nothing"], answer: 0 },
  { chapter: 11, question: "What does 1 Corinthians 11:1 say about following Paul?", options: ["Follow me as I follow Christ", "Follow me alone", "Don't follow anyone", "Follow only Christ"], answer: 0 },
  { chapter: 11, question: "What does 1 Corinthians 11:24 say about the bread?", options: ["This is my body", "This is just bread", "This is a symbol", "This is nothing"], answer: 0 },
  { chapter: 12, question: "What does 1 Corinthians 12:4 say about spiritual gifts?", options: ["There are varieties of gifts", "There is only one gift", "There are no gifts", "Gifts are not important"], answer: 0 },
  { chapter: 12, question: "What does 1 Corinthians 12:12 say about the body?", options: ["It is one body with many members", "It is many bodies", "It has no members", "It is not important"], answer: 0 },
  { chapter: 13, question: "What does 1 Corinthians 13:4 say about love?", options: ["Love is patient and kind", "Love is jealous and boastful", "Love is rude and selfish", "Love is temporary"], answer: 0 },
  { chapter: 13, question: "What does 1 Corinthians 13:13 say about faith, hope, and love?", options: ["The greatest is love", "The greatest is faith", "The greatest is hope", "They are equal"], answer: 0 },
  { chapter: 14, question: "What does 1 Corinthians 14:1 say about pursuing love?", options: ["Pursue love and desire spiritual gifts", "Ignore love", "Only pursue gifts", "Don't pursue anything"], answer: 0 },
  { chapter: 15, question: "What does 1 Corinthians 15:3 say about Christ's death?", options: ["He died for our sins", "He died by accident", "He didn't really die", "His death was meaningless"], answer: 0 },
  { chapter: 15, question: "What does 1 Corinthians 15:20 say about Christ's resurrection?", options: ["He is the firstfruits", "He didn't rise", "He rose last", "He rose alone"], answer: 0 },
  { chapter: 15, question: "What does 1 Corinthians 15:55 say about death?", options: ["Where is your victory, O death?", "Death wins", "Death is final", "Death is good"], answer: 0 },
  { chapter: 16, question: "What does 1 Corinthians 16:14 say about doing things?", options: ["Do everything in love", "Do everything for yourself", "Do everything quickly", "Do nothing"], answer: 0 }
];

export default function FirstCorinthiansQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(firstCorinthiansQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(firstCorinthiansQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === firstCorinthiansQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== firstCorinthiansQuestions[i].answer).length;
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
              <CardTitle>1 Corinthians Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {firstCorinthiansQuestions.map((q, qIdx) => (
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